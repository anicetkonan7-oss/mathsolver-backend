// Reçoit un signalement d'erreur depuis l'appli et l'envoie sur ton Telegram.
// Variables à créer sur Vercel : TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID
const API_BASE = process.env.TELEGRAM_API_BASE || "https://api.telegram.org";
const KINDS = ["Résultat final faux", "Étape de calcul fausse", "Solution incomplète", "Exercice mal compris", "Graphique ou tableau faux", "Autre problème"];
const MAX_PER_10_MIN = 20; // petite barrière anti-spam (par instance du serveur)
const stamps = [];

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
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
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

  const header =
    "⚠️ ERREUR SIGNALÉE (MathSolver)\n" +
    "Type : " + kind + "\n" +
    "Commentaire : " + (comment || "(aucun)") + "\n" +
    "Date : " + when + "\n\n" +
    "Exercice :\n" + (question || "(photo ou texte vide)").slice(0, 1200) +
    "\n\n(La solution complète est dans le fichier joint.)";

  const okMsg = await tgText(token, chat, header.slice(0, 4000)).catch(() => false);
  if (!okMsg) {
    return res.status(502).json({ error: "telegram a refusé le message (vérifie le token et l'identifiant)" });
  }

  const file =
    "SIGNALEMENT D'ERREUR - MathSolver\n" +
    "Date : " + when + "\n" +
    "Type : " + kind + "\n" +
    "Commentaire : " + (comment || "(aucun)") + "\n" +
    "Appareil : " + ua + "\n\n" +
    "===== EXERCICE =====\n" + (question || "(photo ou texte vide)") + "\n\n" +
    "===== SOLUTION DE L'IA (texte brut reçu) =====\n" + answer + "\n\n" +
    "===== GRAPHIQUES DEMANDÉS PAR L'IA =====\n" + (funcs || "(aucun)") + "\n";
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