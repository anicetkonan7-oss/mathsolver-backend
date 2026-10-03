// MathSolver - /api/extract : lit une photo (ou une dictée) d'exercice et renvoie le texte { text, fig, empty }
import { tidy } from "../lib/clean.js";
const MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash"];
const API_BASE = process.env.GEMINI_API_BASE || "https://generativelanguage.googleapis.com/v1beta/models/";
const TOTAL_MS = Number(process.env.MS_XTOTAL) || 45000;
const CALL_MS = Number(process.env.MS_XCALL) || 25000;
const FORMULES =
 "Écris les formules en texte simple, JAMAIS en LaTeX (ni $ ni \\). " +
 "Puissance : x^2, x^(n+1). Indice : u_n, u_(n+1). Fraction : a/b, et (x+1)/(2x-3) si le haut ou le bas a plusieurs termes. " +
 "Racine : sqrt(x). Valeur absolue : |x|. Produit : * ou ×. Symboles : ≤ ≥ ≠ ≈ ± ∞ π ∈ ∪ ∩ ⇒ ⇔ → ℝ ℕ ℤ ℚ ℂ. " +
 "Fonctions : sin(x), cos(x), tan(x), ln(x), exp(x), lim. " +
 "Mets une espace autour de = + − < > ≤ ≥ ≠, mais aucune dans les puissances, indices et fractions. ";
const SYS_IMG =
 "Tu es le lecteur d'exercices de l'application MathSolver. On te montre la photo d'un énoncé de mathématiques (imprimé ou manuscrit). " +
 "Ta seule mission : recopier fidèlement cet énoncé, sans le résoudre, sans le corriger et sans aucun commentaire. " +
 "Recopie tout le texte de l'énoncé, en français, dans l'ordre de lecture, avec sa numérotation (Exercice 1, 1), a), b)...). Une consigne ou une question par ligne. " +
 FORMULES +
 "Ignore ce qui ne fait pas partie de l'énoncé : nom, date, numéro de page, marges, brouillon, et les réponses ou calculs écrits par l'élève. " +
 "Si un mot ou un nombre est illisible, écris ... à sa place sans le deviner. " +
 "Si l'énoncé comporte une figure, une courbe, un repère, un schéma ou un tableau que le texte ne peut pas remplacer, recopie quand même tout le texte, puis ajoute en dernière ligne exactement : [[FIGURE]] " +
 "Si l'image ne contient aucun énoncé de mathématiques lisible, réponds uniquement : [[VIDE]]";
const SYS_AUDIO =
 "Tu es l'assistant de dictée de l'application MathSolver. Tu écoutes un élève qui lit à voix haute un exercice de mathématiques, en français (accent d'Afrique de l'Ouest possible). " +
 "Écris ce qu'il dit sous forme d'énoncé écrit, sans le résoudre et sans commentaire. Écris les nombres en chiffres : « trois x » → 3x, « deux virgule cinq » → 2,5. " +
 "Passe de l'oral à l'écrit mathématique : « x au carré » → x^2, « x au cube » → x^3, « x puissance n » → x^n, « u indice n » → u_n, « a sur b » → a/b, " +
 "« racine carrée de x » → sqrt(x), « valeur absolue de x » → |x|, « fois » → ×, « inférieur ou égal » → ≤, « supérieur ou égal » → ≥, « différent de » → ≠, " +
 "« pi » → π, « l'infini » → ∞, « appartient à » → ∈, « réels » → ℝ, « logarithme népérien de x » → ln(x), « exponentielle de x » → exp(x), " +
 "« f prime de x » → f'(x), « limite quand x tend vers 2 de f(x) » → lim(x→2) f(x), « intégrale de a à b de f(x) dx » → ∫_a^b f(x) dx. " +
 "Quand il dit « ouvrez la parenthèse » ou « fermez la parenthèse », écris ( et ). " + FORMULES +
 "Supprime les hésitations et les répétitions (euh, je veux dire...). Ponctue normalement. Une consigne ou une question par ligne. " +
 "Si l'enregistrement ne contient aucun énoncé de mathématiques compréhensible, réponds uniquement : [[VIDE]]";
async function ask(model, system, parts, thinking, ms) {
 const ctl = new AbortController();
 const timer = setTimeout(() => ctl.abort(), ms);
 try {
  const generationConfig = { maxOutputTokens: 8192 };
  if (thinking) generationConfig.thinkingConfig = { thinkingLevel: thinking };
  const r = await fetch(API_BASE + model + ":generateContent", {
   method: "POST",
   headers: { "x-goog-api-key": process.env.GEMINI_API_KEY, "Content-Type": "application/json" },
   body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ parts }], generationConfig }),
   signal: ctl.signal,
  });
  if (!r.ok) {
   await r.text().catch(() => "");
   return { status: r.status, text: "" };
  }
  const j = await r.json();
  const c = j && j.candidates && j.candidates[0];
  const ps = (c && c.content && c.content.parts) || [];
  return { status: 200, text: ps.filter((p) => p.text && !p.thought).map((p) => p.text).join("") };
 } catch (e) {
  return { status: ctl.signal.aborted ? 408 : 0, text: "" };
 } finally {
  clearTimeout(timer);
 }
}
async function extract(system, parts) {
 const end = Date.now() + TOTAL_MS;
 let last = 0;
 for (const model of MODELS) {
  for (const th of ["minimal", ""]) {
   const left = end - Date.now();
   if (left < 3000) return { status: last };
   const r = await ask(model, system, parts, th, Math.min(CALL_MS, left));
   last = r.status;
   if (r.status === 200 && r.text.trim()) return { text: r.text };
   if (r.status !== 400) break;
  }
 }
 return { status: last };
}
function failure(status) {
 const busy = status === 429 || status >= 500 || status === 408;
 return {
  error: busy ? "Le service de lecture est très sollicité." : "Le service n'a pas réussi à lire ce document.",
  title: "Lecture impossible",
  hint: busy ? "Patiente quelques secondes et réessaie." : "Vérifie que l'image est nette et bien cadrée.",
  detail: String(status),
 };
}
export default async function handler(req, res) {
 if (req.method !== "POST") {
  return res.status(405).json({ error: "POST uniquement" });
 }
 const b = req.body || {};
 const img = typeof b.imageBase64 === "string" ? b.imageBase64 : "";
 const au = typeof b.audioBase64 === "string" ? b.audioBase64 : "";
 if (!img && !au) {
  return res.status(400).json({ error: "Image ou audio manquant" });
 }
 const mime = /^audio\/[\w.+-]+$/.test(String(b.mime || "")) ? b.mime : "audio/aac";
 const parts = img
  ? [{ text: "Recopie l'énoncé de cette photo." }, { inline_data: { mime_type: "image/jpeg", data: img } }]
  : [{ text: "Écris l'énoncé dicté dans cet enregistrement." }, { inline_data: { mime_type: mime, data: au } }];
 let out;
 try {
  const r = await extract(img ? SYS_IMG : SYS_AUDIO, parts);
  out = r.text !== undefined ? tidy(r.text) : failure(r.status);
 } catch (e) {
  out = failure(500);
 }
 res.setHeader("Cache-Control", "no-store");
 return res.status(200).json(out);
}