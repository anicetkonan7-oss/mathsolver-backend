const MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash"];
const THINKING_LEVEL = "low"; // "minimal", "low", "medium", "high", ou "" pour ne rien imposer
const MAX_OUTPUT_TOKENS = 32768; // pour les longs sujets
const TOTAL_BUDGET_MS = Number(process.env.MS_TOTAL) || 270000; // durée maximale totale : 4 min 30
const FIRST_BYTE_MS = Number(process.env.MS_FIRST) || 45000;    // un modèle qui ne dit rien pendant 45 s est abandonné
const IDLE_MS = Number(process.env.MS_IDLE) || 30000;           // ou qui s'arrête d'écrire pendant 30 s
const BEAT_MS = Number(process.env.MS_BEAT) || 8000;            // signal "je travaille" envoyé à l'appli
const API_BASE = process.env.GEMINI_API_BASE || "https://generativelanguage.googleapis.com/v1beta/models/";
const CONSIGNE =
 "Tu es un professeur de mathématiques. Réponds en français, de façon claire et concise. " +
 "Structure STRICTEMENT ta réponse ainsi : pour chaque étape, une ligne qui commence par @@ETAPE suivie du titre court de l'étape (sans numéro), " +
 "puis le détail du calcul (texte et formules). " +
 "Termine par une ligne qui commence par @@REPONSE suivie directement de la réponse finale (sans écrire le mot Réponse). " +
 "N'écris rien avant la première étape : pas d'introduction ni de conclusion. " +
 "Écris les formules en LaTeX entre $...$ (dans une phrase) ou $$...$$ (sur une ligne seule). " +
 "Chaque formule $$...$$ doit tenir sur UNE SEULE ligne : aucun retour à la ligne à l'intérieur, même pour un tableau. " +
 "MISE EN PAGE : aère la rédaction. Écris UNE phrase par ligne (va à la ligne après chaque phrase), avec des phrases courtes. " +
 "Mets chaque calcul important ou long sur sa propre ligne entre $$...$$, et réserve $...$ aux petites expressions à l'intérieur d'une phrase. " +
 "N'utilise pas de titres avec #. Vérifie ton résultat avant de répondre. " +
 "Si le sujet contient plusieurs exercices ou plusieurs questions, résous-les TOUS, dans l'ordre, sans en omettre aucun. " +
 "GRAPHIQUES (seulement si l'énoncé les exige) : après la ligne @@REPONSE, tu peux ajouter des lignes de la forme @@TABLEAU nom | expression | domaine et/ou @@COURBE nom | expression | domaine. " +
 "N'écris une ligne @@TABLEAU QUE si l'énoncé demande explicitement un tableau de variation(s), ou une étude complète de la fonction. " +
 "N'écris une ligne @@COURBE QUE si l'énoncé demande de tracer, construire ou représenter la courbe (représentation graphique, courbe représentative, dans un repère), ou une étude complète de la fonction. " +
 "Si l'énoncé demande les deux, écris les deux lignes. " +
 "Si l'énoncé ne demande ni tableau ni courbe (calcul de limite ou de dérivée, équation, inéquation, suite, probabilités, géométrie, simple étude du sens de variation sans tableau, etc.), n'écris AUCUNE de ces lignes. " +
 "Au maximum 3 fonctions. Dans ces lignes, n'utilise ni LaTeX ni le signe $ : écris l'expression en texte simple, avec la variable x, * pour multiplier, ^ pour les puissances, " +
 "et les fonctions ln(x), exp(x), sqrt(x), abs(x), sin(x), cos(x), tan(x) et pi. " +
 "Le domaine est l'ensemble de définition (ou l'intervalle d'étude) en texte simple : ]0;+inf[ ou ]-inf;0[ U ]0;+inf[ ou R ou R* ou [0;2*pi]. " +
 "Exemple : @@TABLEAU f | x - 2 + ln(x)/x | ]0;+inf[ puis @@COURBE f | x - 2 + ln(x)/x | ]0;+inf[ . " +
 "Quand tu écris une ligne @@TABLEAU ou @@COURBE, ne dessine PAS toi-même de tableau de variations en LaTeX (pas de \\begin{array}) : l'application le dessine ; résume les variations dans une ou deux phrases, et donne bien dans ta résolution les limites, asymptotes et extremums (l'application les repère aussi sur le graphique). " +
 "N'écris aucune de ces lignes si la fonction contient un paramètre (m, a, k...) ou si elle est définie par morceaux. " +
 "Dans la ligne @@REPONSE aussi, toute formule doit être entre $...$ : n'écris jamais de commande LaTeX (\\frac, \\text, \\sqrt...) en dehors des $. " +
 "Si la réponse finale contient plusieurs résultats, écris chaque résultat sur sa propre ligne (1., 2., ...).";
const VARIANTS = [
 { thinking: THINKING_LEVEL, maxOut: MAX_OUTPUT_TOKENS },
 { thinking: "", maxOut: 0 },
];
async function askGemini(model, parts, variant, deadline, outerSignal) {
 const controller = new AbortController();
 let reason = "";
 let timer = null;
 const abort = (why) => {
  if (!reason) reason = why;
  controller.abort();
 };
 const arm = (ms) => {
  clearTimeout(timer);
  const left = deadline - Date.now();
  timer = setTimeout(() => abort(Date.now() >= deadline - 50 ? "délai total" : "silence"), Math.max(0, Math.min(ms, left)));
 };
 const onOuter = () => abort("client");
 if (outerSignal) outerSignal.addEventListener("abort", onOuter);
 let text = "";
 let finish = "";
 try {
  const generationConfig = {};
  if (variant.thinking) generationConfig.thinkingConfig = { thinkingLevel: variant.thinking };
  if (variant.maxOut) generationConfig.maxOutputTokens = variant.maxOut;
  arm(FIRST_BYTE_MS);
  const r = await fetch(API_BASE + model + ":streamGenerateContent?alt=sse", {
   method: "POST",
   headers: {
    "x-goog-api-key": process.env.GEMINI_API_KEY,
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    systemInstruction: { parts: [{ text: CONSIGNE }] },
    contents: [{ parts }],
    generationConfig,
   }),
   signal: controller.signal,
  });
  if (!r.ok) {
   await r.text().catch(() => "");
   return { status: r.status, text: "", finish: "", reason: "" };
  }
  const reader = r.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let errorCode = 0;
  const handleEvent = (block) => {
   const lines = block.split(/\r?\n/).filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim());
   if (!lines.length) return;
   let obj;
   try {
    obj = JSON.parse(lines.join("\n"));
   } catch (e) {
    return;
   }
   if (obj && obj.error) {
    errorCode = Number(obj.error.code) || 500;
    return;
   }
   const cand = obj && obj.candidates && obj.candidates[0];
   if (!cand) return;
   if (cand.finishReason) finish = cand.finishReason;
   const ps = (cand.content && cand.content.parts) || [];
   for (const p of ps) {
    if (p.text && !p.thought) text += p.text;
   }
  };
  for (;;) {
   const { done, value } = await reader.read();
   if (done) break;
   arm(IDLE_MS);
   buffer += decoder.decode(value, { stream: true });
   let m;
   while ((m = buffer.match(/\r?\n\r?\n/))) {
    const block = buffer.slice(0, m.index);
    buffer = buffer.slice(m.index + m[0].length);
    handleEvent(block);
   }
  }
  buffer += decoder.decode();
  if (buffer.trim()) handleEvent(buffer);
  if (errorCode) return { status: errorCode, text, finish, reason: "" };
  return { status: 200, text, finish, reason: "" };
 } catch (e) {
  return { status: reason ? 408 : 0, text, finish, reason };
 } finally {
  clearTimeout(timer);
  if (outerSignal) outerSignal.removeEventListener("abort", onOuter);
 }
}
async function solve(parts, signal) {
 const deadline = Date.now() + TOTAL_BUDGET_MS;
 const dead = {};
 let lastStatus = 0;
 let lastReason = "";
 let partial = "";
 outer: for (let round = 0; round < 2; round++) {
  if (round > 0) await new Promise((ok) => setTimeout(ok, 3000)); // petite pause avant le 2e tour
  for (const model of MODELS) {
   if (dead[model]) continue;
   if (signal.aborted || deadline - Date.now() < 5000) break outer;
   let r = null;
   for (let v = 0; v < VARIANTS.length; v++) {
    r = await askGemini(model, parts, VARIANTS[v], deadline, signal);
    if (r.status === 400 && v < VARIANTS.length - 1) continue;
    break;
   }
   lastStatus = r.status;
   lastReason = r.reason;
   if (r.reason === "client") return "";
   if (r.status === 200 && r.text.trim()) {
    let out = r.text;
    if (r.finish === "MAX_TOKENS") {
     out += "\n\n⚠️ La réponse a été coupée car elle est très longue. Envoie la partie restante de l'exercice pour avoir la suite.";
    }
    return out;
   }
   if (r.text.length > partial.length) partial = r.text;
   if (r.status === 400 || r.status === 403 || r.status === 404) dead[model] = true;
  }
 }
 if (partial.trim().length > 400) {
  return partial + "\n\n⚠️ Réponse incomplète : le service d'IA s'est interrompu. Appuie de nouveau sur Résoudre pour obtenir la solution complète.";
 }
 return failure(lastStatus, lastReason);
}
function failure(status, reason) {
 let title = "Service momentanément indisponible";
 let error = "Le service d'IA ne répond pas correctement pour le moment.";
 let hint = "Réessaie dans quelques instants.";
 if (status === 408) {
  title = "Réponse trop lente";
  error = "Le service d'IA met plus de temps que prévu à répondre.";
  hint = "Ton exercice est conservé : appuie de nouveau sur « Résoudre ».";
 } else if (status === 503 || status === 500 || status === 502 || status === 504) {
  title = "Service très sollicité";
  error = "Le service d'IA est très sollicité en ce moment.";
  hint = "Patiente quelques secondes, puis appuie de nouveau sur « Résoudre ».";
 } else if (status === 429) {
  title = "Limite atteinte pour le moment";
  error = "Trop de demandes ont été envoyées en peu de temps.";
  hint = "Patiente quelques minutes, puis réessaie.";
 } else if (status === 400) {
  title = "Exercice non traité";
  error = "Le service n'a pas réussi à lire cet exercice.";
  hint = "Vérifie que l'énoncé ou la photo est bien lisible, puis réessaie.";
 } else if (status === 0) {
  error = "La connexion au service d'IA a échoué.";
 }
 return { error, title, hint, detail: status + (reason ? " " + reason : "") };
}
// ---- Réparation automatique : formules LaTeX écrites sans $ et réponses numérotées collées sur une ligne ----
const SHORT_WORDS = /^(et|ou|si|on|de|du|le|la|un|en|au|ce|se|sa|ne|ni|où|à|il|par)$/i;
const FN_WORDS = /^(sin|cos|tan|cot|sec|csc|ln|log|exp|lim|max|min|sup|inf|det|arg)$/;
function isProse(w) {
 const x = w.replace(/^\*+|\*+$/g, "").replace(/[.,;:!?]+$/, "");
 if (!x) return /^[*.,;:!?]+$/.test(w);
 if (!/^[A-Za-zÀ-ÿ'’-]+$/.test(x) || FN_WORDS.test(x) || /^[A-Z]{2,}$/.test(x)) return false;
 return x.length >= 3 || SHORT_WORDS.test(x);
}
function wrapRaw(s) {
 const chunks = [];
 const addMath = (str) => {
  let cur = "";
  let d = 0;
  for (const ch of str) {
   if (ch === "{") d++;
   else if (ch === "}") d = Math.max(0, d - 1);
   if (/\s/.test(ch) && d === 0) {
    if (cur) chunks.push({ v: cur, p: isProse(cur) });
    cur = "";
   } else cur += ch;
  }
  if (cur) chunks.push({ v: cur, p: isProse(cur) });
 };
 const re = /\\(?:text|textrm|textit|textbf|mbox|mathrm)\s*\{/g;
 let pos = 0;
 let m;
 while ((m = re.exec(s))) {
  addMath(s.slice(pos, m.index));
  let d = 1;
  let k = re.lastIndex;
  while (k < s.length && d > 0) {
   if (s[k] === "{") d++;
   else if (s[k] === "}") d--;
   k++;
  }
  const inner = s.slice(re.lastIndex, d === 0 ? k - 1 : k).trim();
  if (inner) chunks.push({ v: inner, p: true });
  pos = k;
  re.lastIndex = k;
 }
 addMath(s.slice(pos));
 chunks.forEach((c, i) => {
  const nx = chunks[i + 1];
  if (c.v === "a" && i > 0 && chunks[i - 1].p && !(nx && !nx.p && /^[=<>+*\/≤≥≠≈∈-]/.test(nx.v))) c.p = true;
 });
 let out = "";
 let run = [];
 const flush = () => {
  if (!run.length) return;
  let r = run.join(" ");
  let tail = "";
  const t = r.match(/^([\s\S]*?)([.,;:!?]+)$/);
  if (t && t[1].trim()) {
   r = t[1];
   tail = t[2];
  }
  out += (out ? " " : "") + "$" + r + "$" + tail;
  run = [];
 };
 for (const c of chunks) {
  if (c.p) {
   flush();
   out += (out ? " " : "") + c.v;
  } else run.push(c.v);
 }
 flush();
 return out;
}
function fixLine(line) {
 if (line.includes("$") || /\\[(\[]/.test(line)) return line;
 if (!/\\[a-zA-Z]+|[\^_]\{/.test(line)) return line;
 const m = line.match(/^(\s*(?:@@(?:ETAPE|REPONSE)\b\s*(?:\d+\s*[:.)-]\s*)?)?(?:[-*•]\s+|\d+[.)]\s+)?)([\s\S]*)$/);
 const rest = m[2];
 if (/^@@(COURBE|TABLEAU)/.test(line.trim()) || !rest.trim()) return line;
 if (/^\s*\\begin\{/.test(rest) && /\\end\{[^}]*\}\s*$/.test(rest)) return m[1] + "$$" + rest.trim() + "$$";
 return m[1] + wrapRaw(rest);
}
function fixAnswer(text) {
 try {
  const lines = String(text).split("\n").map(fixLine);
  const i = lines.findIndex((l) => /^\s*@@REPONSE\s*1[.)]\s/.test(l));
  if (i >= 0) {
   let l = lines[i];
   for (let n = 2; n <= 9; n++) {
    const re = new RegExp("([.;!?$)\\]])\\s+(" + n + "[.)]\\s)");
    if (!re.test(l)) break;
    l = l.replace(re, "$1\n$2");
   }
   lines[i] = l;
  }
  return lines.join("\n");
 } catch (e) {
  return text;
 }
}
export default async function handler(req, res) {
 if (req.method !== "POST") {
  return res.status(405).json({ error: "POST uniquement" });
 }
 const { promptText, imageBase64 } = req.body || {};
 if (!promptText && !imageBase64) {
  return res.status(400).json({ error: "Question manquante" });
 }
 const parts = [
  { text: "Exercice : " + (promptText || "voir la photo ci-jointe") },
 ];
 if (imageBase64) {
  parts.push({ inline_data: { mime_type: "image/jpeg", data: imageBase64 } });
 }
 res.statusCode = 200;
 res.setHeader("Content-Type", "application/json; charset=utf-8");
 res.setHeader("Cache-Control", "no-store, no-transform");
 res.setHeader("X-Accel-Buffering", "no");
 res.write(" ");
 const beat = setInterval(() => {
  try {
   res.write(" ");
  } catch (e) {}
 }, BEAT_MS);
 const outer = new AbortController();
 res.on("close", () => {
  if (!res.writableEnded) outer.abort();
 });
 let out;
 try {
  const r = await solve(parts, outer.signal);
  out = typeof r === "string" ? { answer: fixAnswer(r) } : r;
 } catch (e) {
  out = failure(500, "exception");
 }
 clearInterval(beat);
 res.end(JSON.stringify(out));
}