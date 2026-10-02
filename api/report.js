// Reçoit un signalement d'erreur depuis l'appli et l'envoie sur ton Telegram.
// Variables à créer sur Vercel : TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID
// Le convertisseur de formules est dans lib/latex.js (s'il manque, le signalement part quand même).
const API_BASE = process.env.TELEGRAM_API_BASE || "https://api.telegram.org";
const KINDS = ["Résultat final faux", "Étape de calcul fausse", "Solution incomplète", "Exercice mal compris", "Graphique ou tableau faux", "Autre problème"];
const MAX_PER_10_MIN = 20; // petite barrière anti-spam (par instance du serveur)
const stamps = [];
const PH0 = String.fromCharCode(57344);
const PH1 = String.fromCharCode(57345);
const MATH_RE = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^$\n]+?\$/g;

let TEX = null;
async function loadTex() {
  if (TEX) return TEX;
  try {
    const m = await import("../lib/latex.js");
    const f = m.texToText || (m.default && m.default.texToText);
    if (typeof f === "function") TEX = f;
  } catch (e) {}
  return TEX;
}

function cut(v, n) {
  return String(v == null ? "" : v).slice(0, n);
}

function now() {
  try {
    return new Date().toLocaleString("fr-FR", { timeZone: "Africa/Abidjan" }) + " (Abidjan)";
  } catch (e) {
    return new Date().toISOString();
  }
}


function lastResort(t) {
  return String(t).replace(/\\[a-zA-Z]+/g, " ").replace(/[$\\{}]/g, "").replace(/\s+/g, " ").trim();
}
function mathToLine(inner) {
  try {
    if (TEX) return TEX(inner.replace(/\s+/g, " "));
  } catch (e) {}
  return lastResort(inner);
}

// Texte d'une partie de la solution -> lignes lisibles (formules converties, balises Markdown retirées)
function textLines(src) {
  const maths = [];
  const prot = String(src).replace(MATH_RE, (m) => {
    let inner;
    let disp = false;
    if (m.startsWith("$$") || m.startsWith("\\[")) {
      inner = m.slice(2, -2);
      disp = true;
    } else if (m.startsWith("\\(")) {
      inner = m.slice(2, -2);
    } else {
      inner = m.slice(1, -1);
    }
    maths.push({ t: mathToLine(inner), disp });
    return PH0 + (maths.length - 1) + PH1;
  });
  const out = [];
  for (const raw of prot.split("\n")) {
    let ln = raw.trim();
    if (!ln || /^-{3,}$/.test(ln)) continue;
    const solo = ln.match(new RegExp("^" + PH0 + "(\\d+)" + PH1 + "$"));
    if (solo && maths[+solo[1]].disp) {
      for (const l of maths[+solo[1]].t.split("\n")) {
        if (l.trim()) out.push("      " + l.trim());
      }
      continue;
    }
    ln = ln.replace(new RegExp(PH0 + "(\\d+)" + PH1, "g"), (_, k) => maths[+k].t.replace(/\n/g, " ; "));
    ln = ln.replace(/^#{1,6}\s*/, "").replace(/^[*-]\s+/, "• ").replace(/\*\*(.+?)\*\*/g, "$1").replace(/`/g, "");
    out.push(ln);
  }
  return out;
}

// Découpe la réponse de l'IA comme le fait l'appli (@@ETAPE, @@REPONSE, @@COURBE, @@TABLEAU)
function parseSolution(text) {
  const titles = [];
  const bodies = [""];
  let final = "";
  let hasFinal = false;
  let mode = 0;
  const funcs = [];
  for (const line of String(text).split("\n")) {
    const t = line.trim();
    const tc = t.replace(/^[\s*`>-]+/, "");
    const tag = tc.startsWith("@@COURBE") ? "curve" : tc.startsWith("@@TABLEAU") ? "table" : "";
    if (tag) {
      const parts = tc.slice(tag === "curve" ? 8 : 9).replace(/[`$]/g, "").split("|");
      if (parts.length >= 3 && parts[1].trim()) {
        let name = parts[0].replace(/^\s*:\s*/, "").replace(/\(.*\)/g, "").trim();
        if (!name || name.length > 10) name = "f";
        funcs.push({ tag, name, expr: parts[1].trim(), domain: parts.slice(2).join("|").trim() });
      }
      continue;
    }
    if (t.startsWith("@@ETAPE")) {
      titles.push(t.slice(7).trim());
      bodies.push("");
      mode = 1;
    } else if (t.startsWith("@@REPONSE")) {
      final = t.slice(9).trim();
      hasFinal = true;
      mode = 2;
    } else if (mode === 2) {
      final += "\n" + line;
    } else {
      bodies[bodies.length - 1] += line + "\n";
    }
  }
  return { titles, bodies, final, hasFinal, funcs };
}

function buildReadable(answer) {
  const sol = parseSolution(answer);
  const L = [];
  if (sol.titles.length === 0) {
    L.push(...textLines(sol.bodies[0]));
  } else {
    if (sol.bodies[0].trim()) L.push(...textLines(sol.bodies[0]), "");
    sol.titles.forEach((t, k) => {
      const title = textLines(t.replace(/^\d+\s*[:.)-]\s*/, "").replace(/\*\*/g, "")).join(" ");
      L.push("ÉTAPE " + (k + 1) + " — " + title);
      L.push(...textLines(sol.bodies[k + 1]), "");
    });
  }
  const finalLines = sol.hasFinal ? textLines(sol.final) : [];
  const graphs = sol.funcs.map(
    (f) => (f.tag === "curve" ? "Courbe de " : "Tableau de variation de ") + f.name + " : " + f.expr + "   sur " + f.domain
  );
  return { solution: L.join("\n").trim(), final: finalLines.map((l) => l.trim()).join("\n").trim(), hasFinal: sol.hasFinal, graphs };
}

async function safeReadable(answer) {
  try {
    await loadTex();
    return buildReadable(answer);
  } catch (e) {
    return { solution: "(mise en forme impossible : voir le texte brut en bas du fichier)", final: "", hasFinal: false, graphs: [] };
  }
}

function shortUa(ua) {
  const m = String(ua || "").match(/Android\s+([\d.]+);\s*([^;)]*?)\s*(?:Build\/|[;)])/);
  if (m) return "Android " + m[1] + " · " + (m[2] || "modèle inconnu");
  return ua ? String(ua).slice(0, 80) : "(inconnu)";
}

/* ==================== Telegram ==================== */

async function tgText(token, chat, text) {
  const r = await fetch(API_BASE + "/bot" + token + "/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
    signal: AbortSignal.timeout(15000),
  });
  const j = await r.json().catch(() => ({}));
  return r.ok && j.ok === true;
}

async function tgFile(token, chat, method, field, data, filename, mime, caption) {
  const form = new FormData();
  form.append("chat_id", String(chat));
  if (caption) form.append("caption", caption);
  form.append(field, new Blob([data], { type: mime }), filename);
  const r = await fetch(API_BASE + "/bot" + token + "/" + method, {
    method: "POST",
    body: form,
    signal: AbortSignal.timeout(25000),
  });
  const j = await r.json().catch(() => ({}));
  return r.ok && j.ok === true;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method === "GET") {
    // Page de contrôle : ouvre /api/report dans le navigateur pour vérifier que le serveur fonctionne
    let conv = false;
    try {
      const f = await loadTex();
      conv = !!f && f("\\frac{1}{2}") === "1/2";
    } catch (e) {}
    return res.status(200).json({ ok: true, service: "report", version: 8, converter: conv });
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST uniquement" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) {
    return res.status(500).json({ error: "signalement non configuré" });
  }

  let b = req.body;
  if (typeof b === "string") {
    try {
      b = JSON.parse(b);
    } catch (e) {
      b = {};
    }
  }
  b = b && typeof b === "object" ? b : {};

  const answer = cut(b.answer, 80000);
  if (!answer.trim()) {
    return res.status(400).json({ error: "solution manquante" });
  }

  const t = Date.now();
  while (stamps.length && t - stamps[0] > 600000) stamps.shift();
  if (stamps.length >= MAX_PER_10_MIN) {
    return res.status(429).json({ error: "trop de signalements, réessaie dans quelques minutes" });
  }
  stamps.push(t);

  const kind = KINDS.includes(b.kind) ? b.kind : b.kind ? "Autre problème" : "(non précisé)";
  const comment = cut(b.comment, 1500).trim();
  const question = cut(b.question, 6000).trim();
  const funcs = cut(b.funcs, 2000);
  const ua = cut(b.ua, 200);
  const when = now();
  const rd = await safeReadable(answer);
  const exo = question || "(exercice envoyé en photo : voir l'image jointe)";
  const finalOne = rd.hasFinal ? rd.final.replace(/\s*\n\s*/g, " ").slice(0, 300) || "(vide)" : "(aucune réponse finale détectée)";

  const header =
    "⚠️ ERREUR SIGNALÉE (MathSolver)\n" +
    "Type : " + kind + "\n" +
    "Commentaire : " + (comment || "(aucun)") + "\n" +
    "Date : " + when + "\n\n" +
    "📝 Exercice :\n" + exo.slice(0, 1200) + "\n\n" +
    "✅ Réponse de l'IA : " + finalOne +
    "\n\n(La solution détaillée est dans le fichier joint.)";

  const okMsg = await tgText(token, chat, header.slice(0, 4000)).catch(() => false);
  if (!okMsg) {
    return res.status(502).json({ error: "telegram a refusé le message (vérifie le token et l'identifiant)" });
  }

  const file =
    "⚠️ SIGNALEMENT D'ERREUR - MathSolver\n" +
    "Date : " + when + "\n" +
    "Type : " + kind + "\n" +
    "Commentaire : " + (comment || "(aucun)") + "\n" +
    "Appareil : " + shortUa(ua) + "\n\n" +
    "📝 EXERCICE\n" + exo + "\n\n" +
    "🤖 SOLUTION DONNÉE PAR L'IA\n" + (rd.solution || "(vide)") + "\n\n" +
    "✅ RÉPONSE FINALE\n" + (rd.hasFinal ? rd.final || "(vide)" : "(aucune réponse finale détectée)") + "\n\n" +
    "📈 GRAPHIQUES DEMANDÉS PAR L'IA\n" + (rd.graphs.length ? rd.graphs.join("\n") : "(aucun)") + "\n\n\n" +
    "————————————————————\n" +
    "🔧 ANNEXE TECHNIQUE (réservée au développeur, à ignorer)\n" +
    "Appareil complet : " + (ua || "(inconnu)") + "\n" +
    "Graphiques (données) : " + (funcs || "(aucun)") + "\n\n" +
    "Texte brut reçu de l'IA :\n" + answer + "\n";
  const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
  await tgFile(token, chat, "sendDocument", "document", Buffer.from(file, "utf-8"), "signalement-" + stamp + ".txt", "text/plain", "").catch(() => false);

  const img = cut(b.imageBase64, 12000000);
  if (img) {
    const buf = Buffer.from(img, "base64");
    if (buf.length > 100) {
      await tgFile(token, chat, "sendPhoto", "photo", buf, "exercice.jpg", "image/jpeg", "Photo de l'exercice").catch(() => false);
    }
  }

  return res.status(200).json({ ok: true });
}