// MathSolver - nettoyage du texte lu par l'IA (LaTeX éventuel -> texte simple, repères [[FIGURE]] et [[VIDE]])
const SYM = {
 le: "≤", leq: "≤", leqslant: "≤", ge: "≥", geq: "≥", geqslant: "≥", ne: "≠", neq: "≠", approx: "≈", pm: "±", infty: "∞", pi: "π",
 times: "×", cdot: "·", div: "÷", in: "∈", notin: "∉", cup: "∪", cap: "∩", Rightarrow: "⇒", implies: "⇒", Leftrightarrow: "⇔", iff: "⇔",
 to: "→", rightarrow: "→", sum: "∑", int: "∫", circ: "°", alpha: "α", beta: "β", gamma: "γ", delta: "δ", theta: "θ", lambda: "λ",
 mu: "μ", sigma: "σ", varphi: "φ", phi: "φ", omega: "ω", Delta: "Δ", Omega: "Ω", ldots: "...", dots: "...", emptyset: "∅", varnothing: "∅",
};
const BB = { R: "ℝ", N: "ℕ", Z: "ℤ", Q: "ℚ", C: "ℂ" };
function one(a) {
 a = a.trim();
 return /^[\w.,]+$/.test(a) ? a : "(" + a + ")";
}
// Si le modèle écrit quand même du LaTeX, on le remet en texte simple lisible par l'appli
export function plain(s) {
 if (!/[\\$]|[\^_]\s*\{/.test(s)) return s;
 s = s.replace(/\$+|\\[()[\]]/g, "").replace(/\\(?:left|right)\s*\./g, "");
 for (let k = 0; k < 8; k++) {
  const p = s;
  s = s
   .replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, (m, a, b) => one(a) + "/" + one(b))
   .replace(/\\sqrt\s*\[([^\]]*)\]\s*\{([^{}]*)\}/g, (m, n, a) => one(a) + "^(1/" + n.trim() + ")")
   .replace(/\\sqrt\s*\{([^{}]*)\}/g, "sqrt($1)")
   .replace(/\\(?:text|textrm|mathrm|mathbf|mbox|operatorname)\s*\{([^{}]*)\}/g, "$1")
   .replace(/\\mathbb\s*\{([RNZQC])\}/g, (m, c) => BB[c])
   .replace(/([\^_])\s*\{([^{}]*)\}/g, (m, o, a) => o + (/^\w$/.test(a.trim()) ? a.trim() : "(" + a.trim() + ")"));
  if (s === p) break;
 }
 return s
  .replace(/\\(?:left|right|big|Big|bigg|displaystyle|quad|qquad)(?![A-Za-z])\s?/g, "")
  .replace(/\\\\/g, "\n")
  .replace(/\\[,;:! ]/g, " ")
  .replace(/\\([{}%&#_])/g, "$1")
  .replace(/\\([A-Za-z]+)/g, (m, w) => (SYM.hasOwnProperty(w) ? SYM[w] : w))
  .replace(/[ \t]{2,}/g, " ");
}
export function tidy(raw) {
 let t = String(raw || "").replace(/`{3}[a-z]*\n?/gi, "").replace(/\*\*([^*\n]+)\*\*/g, "$1");
 const fig = /\[\[\s*FIGURE\s*\]\]/i.test(t);
 const vide = /\[\[\s*VIDE\s*\]\]/i.test(t);
 t = plain(t.replace(/\[\[\s*(FIGURE|VIDE)\s*\]\]/gi, ""))
  .replace(/[ \t]+\n/g, "\n")
  .replace(/\n{3,}/g, "\n\n")
  .trim();
 return { text: vide ? "" : t, fig: fig && !vide && !!t, empty: vide || !t };
}