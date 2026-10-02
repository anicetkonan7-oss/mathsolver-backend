// Convertit une formule LaTeX en texte lisible (utilisé par api/report.js)
const GREEK = {
 alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε", varepsilon: "ε", zeta: "ζ", eta: "η", theta: "θ", vartheta: "θ",
 iota: "ι", kappa: "κ", lambda: "λ", mu: "μ", nu: "ν", xi: "ξ", pi: "π", varpi: "π", rho: "ρ", varrho: "ρ", sigma: "σ",
 varsigma: "ς", tau: "τ", upsilon: "υ", phi: "φ", varphi: "φ", chi: "χ", psi: "ψ", omega: "ω",
 Gamma: "Γ", Delta: "Δ", Theta: "Θ", Lambda: "Λ", Xi: "Ξ", Pi: "Π", Sigma: "Σ", Upsilon: "Υ", Phi: "Φ", Psi: "Ψ", Omega: "Ω",
};
const SYMS = {
 infty: "∞", to: "→", rightarrow: "→", longrightarrow: "→", Rightarrow: "⇒", Longrightarrow: "⇒", implies: "⇒",
 leftarrow: "←", Leftarrow: "⇐", leftrightarrow: "↔", Leftrightarrow: "⇔", Longleftrightarrow: "⇔", iff: "⇔", mapsto: "↦",
 nearrow: "↗", searrow: "↘", uparrow: "↑", downarrow: "↓",
 leq: "≤", le: "≤", leqslant: "≤", geq: "≥", ge: "≥", geqslant: "≥", neq: "≠", ne: "≠", approx: "≈", equiv: "≡", sim: "~",
 cong: "≅", propto: "∝", ll: "≪", gg: "≫", times: "×", cdot: "·", div: "÷", pm: "±", mp: "∓", ast: "*", star: "*",
 bullet: "•", circ: "∘", in: "∈", notin: "∉", ni: "∋", subset: "⊂", subseteq: "⊆", supset: "⊃", supseteq: "⊇",
 cup: "∪", cap: "∩", setminus: "\\", emptyset: "∅", varnothing: "∅", forall: "∀", exists: "∃", nexists: "∄",
 neg: "¬", lnot: "¬", land: "∧", wedge: "∧", lor: "∨", vee: "∨", sum: "∑", prod: "∏", int: "∫", iint: "∬", iiint: "∭", oint: "∮",
 partial: "∂", nabla: "∇", ldots: "…", dots: "…", cdots: "…", vdots: "⋮", ddots: "⋱", prime: "′", degree: "°", angle: "∠",
 perp: "⊥", parallel: "∥", mid: "|", lvert: "|", rvert: "|", vert: "|", Vert: "‖", lVert: "‖", rVert: "‖",
 lbrace: "{", rbrace: "}", langle: "⟨", rangle: "⟩", lfloor: "⌊", rfloor: "⌋", lceil: "⌈", rceil: "⌉",
 therefore: "∴", because: "∵", ell: "ℓ", hbar: "ħ", aleph: "ℵ", triangle: "△", checkmark: "✓", dag: "†",
 quad: " ", qquad: "  ", Re: "Re", Im: "Im",
};
const FUNCS = new Set(["sin", "cos", "tan", "cot", "sec", "csc", "arcsin", "arccos", "arctan", "sinh", "cosh", "tanh", "coth",
 "ln", "log", "exp", "lim", "limsup", "liminf", "max", "min", "sup", "inf", "det", "dim", "ker", "gcd", "lcm", "deg", "arg", "Pr", "argmax", "argmin"]);
const TEXTLIKE = new Set(["text", "textrm", "textit", "textbf", "textsf", "texttt", "mathrm", "mathit", "mathbf", "mathsf", "mathtt",
 "operatorname", "mbox", "boldsymbol", "bm", "emph", "mathnormal", "mathop", "mathcal", "mathscr", "mathfrak", "underline",
 "underbrace", "overbrace", "cancel", "bcancel", "xcancel", "dot", "ddot", "dddot", "mathbin", "mathrel"]);
const IGNORE = new Set(["displaystyle", "textstyle", "scriptstyle", "scriptscriptstyle", "limits", "nolimits", "nonumber", "notag",
 "hline", "mathstrut", "strut", "centering", "relax", "protect", "allowbreak", "noindent", "smallskip", "medskip", "bigskip", "not"]);
const SKIPARG = new Set(["hspace", "vspace", "phantom", "vphantom", "hphantom", "label", "tag", "cline", "ref", "eqref", "color"]);
const BIGS = new Set(["left", "right", "middle", "big", "Big", "bigg", "Bigg", "bigl", "bigr", "bigm", "Bigl", "Bigr", "Bigm",
 "biggl", "biggr", "biggm", "Biggl", "Biggr", "Biggm"]);
const BB = { R: "ℝ", N: "ℕ", Z: "ℤ", Q: "ℚ", C: "ℂ", P: "ℙ" };
const SUPM = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾", n: "ⁿ", i: "ⁱ" };
const SUBM = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉", "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎" };
const SIMPLE_RE = /^[-+√]?[\p{L}\d.,′°∞⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿⁱ]+(?:\([^()]*\))?$/u;
const CELL = String.fromCharCode(1);
const ROW = String.fromCharCode(2);
function balancedOuter(t) {
 if (t.length < 2 || t[0] !== "(" || t[t.length - 1] !== ")") return false;
 let d = 0;
 for (let k = 0; k < t.length; k++) {
  if (t[k] === "(") d++;
  else if (t[k] === ")") {
   d--;
   if (d === 0 && k < t.length - 1) return false;
  }
 }
 return d === 0;
}
function isSimple(t) {
 return SIMPLE_RE.test(t) || balancedOuter(t);
}
function isAtom(t) {
 return isSimple(t) && !/^\d+\p{L}/u.test(t) && !/^\p{L}{2,}$/u.test(t);
}
function wrap(t, strict) {
 t = t.trim();
 return (strict ? isAtom(t) : isSimple(t)) ? t : "(" + t + ")";
}
function sup(a) {
 a = a.trim();
 if (!a) return "";
 if (a === "∘" || a === "°") return "°";
 if (a === "′" || a === "″" || a === "*") return a;
 const chars = Array.from(a);
 if (chars.every((ch) => SUPM[ch])) return chars.map((ch) => SUPM[ch]).join("");
 if (/^[\p{L}\d]$/u.test(a)) return "^" + a;
 return "^(" + a + ")";
}
function sub(a, before) {
 a = a.trim();
 if (!a) return "";
 if (/(?:lim|limsup|liminf)$/.test(before)) return "(" + a + ")";
 const chars = Array.from(a);
 if (chars.every((ch) => SUBM[ch])) return chars.map((ch) => SUBM[ch]).join("");
 if (/^[\p{L}\d]$/u.test(a)) return "_" + a;
 return "_(" + a + ")";
}
function texToText(src) {
 const s = String(src);
 let i = 0;
 function readName() {
  if (i >= s.length) return "";
  if (/[A-Za-z]/.test(s[i])) {
   let j = i;
   while (j < s.length && /[A-Za-z]/.test(s[j])) j++;
   const name = s.slice(i, j);
   i = j;
   if (s[i] === "*") i++;
   return name;
  }
  return s[i++];
 }
 function skipSpaces() {
  while (i < s.length && /\s/.test(s[i])) i++;
 }
 function readArg() {
  skipSpaces();
  if (i >= s.length) return "";
  const c = s[i];
  if (c === "{") {
   i++;
   const r = parseSeq("}");
   if (s[i] === "}") i++;
   return r;
  }
  if (c === "\\") {
   i++;
   return command(readName(), "");
  }
  i++;
  return c;
 }
 function delim() {
  skipSpaces();
  if (i >= s.length) return "";
  const c = s[i];
  if (c === ".") {
   i++;
   return "";
  }
  if (c === "\\") {
   i++;
   const n = readName();
   if (n === "{" || n === "lbrace") return "{";
   if (n === "}" || n === "rbrace") return "}";
   if (n === "|") return "‖";
   return SYMS[n] || "";
  }
  i++;
  return c;
 }
 function env() {
  const name = readArg().trim();
  if (name === "array" || name === "tabular" || name === "subarray") {
   skipSpaces();
   if (s[i] === "{") readArg();
  }
  const inner = parseSeq("ENV");
  if (s.startsWith("\\end", i)) {
   i += 4;
   readArg();
  }
  const rows = inner
   .split(ROW)
   .map((r) => r.split(CELL).map((c) => c.replace(/[^\S\n]+/g, " ").trim()))
   .filter((r) => r.some((c) => c !== ""));
  const base = name.replace("*", "");
  if (base === "cases" || base === "dcases") {
   return "{ " + rows.map((r) => r.filter(Boolean).join(", ")).join(" ;  ") + " }";
  }
  if (/^[pbBvV]?matrix$|^smallmatrix$/.test(base)) {
   const pair = { pmatrix: ["(", ")"], bmatrix: ["[", "]"], Bmatrix: ["{", "}"], vmatrix: ["|", "|"], Vmatrix: ["‖", "‖"] }[base] || ["[", "]"];
   return pair[0] + rows.map((r) => r.join(", ")).join(" ; ") + pair[1];
  }
  if (base === "array" || base === "tabular" || base === "subarray") {
   return rows.map((r) => r.join(" | ")).join("\n");
  }
  return rows.map((r) => r.join(" ")).join("\n");
 }
 function command(name, before) {
  if (name === "") return "";
  switch (name) {
   case "\\": return ROW;
   case ",": case ";": case ":": case " ": return " ";
   case "!": return "";
   case "{": return "{";
   case "}": return "}";
   case "|": return "‖";
   case "%": return "%";
   case "$": return "$";
   case "&": return "&";
   case "#": return "#";
   case "_": return "_";
   case "^": return "^";
   case "/": return "/";
   default: break;
  }
  if (GREEK[name]) return GREEK[name];
  if (name === "frac" || name === "dfrac" || name === "tfrac" || name === "cfrac") {
   const a = readArg();
   const b = readArg();
   return wrap(a, false) + "/" + wrap(b, true);
  }
  if (name === "binom" || name === "dbinom" || name === "tbinom") {
   const a = readArg();
   const b = readArg();
   return "C(" + a.trim() + ", " + b.trim() + ")";
  }
  if (name === "sqrt") {
   let n = "";
   skipSpaces();
   if (s[i] === "[") {
    i++;
    n = parseSeq("]").trim();
    if (s[i] === "]") i++;
   }
   const a = readArg().trim();
   const root = n === "" || n === "2" ? "√" : n === "3" ? "∛" : n === "4" ? "∜" : sup(n) + "√";
   return root + wrap(a, true);
  }
  if (name === "mathbb") {
   const a = readArg().trim();
   return BB[a] || a;
  }
  if (TEXTLIKE.has(name)) return readArg();
  if (name === "vec" || name === "overrightarrow" || name === "overleftrightarrow") return "vect(" + readArg().trim() + ")";
  if (name === "overline" || name === "bar") return "bar(" + readArg().trim() + ")";
  if (name === "hat" || name === "widehat") return "hat(" + readArg().trim() + ")";
  if (name === "tilde" || name === "widetilde") return "tilde(" + readArg().trim() + ")";
  if (name === "boxed") return "[ " + readArg().trim() + " ]";
  if (name === "overset" || name === "stackrel" || name === "underset") {
   readArg();
   return readArg();
  }
  if (name === "textcolor" || name === "colorbox") {
   readArg();
   return readArg();
  }
  if (name === "pmod") return " (mod " + readArg().trim() + ")";
  if (name === "bmod" || name === "mod") return " mod ";
  if (BIGS.has(name)) return delim();
  if (name === "begin") return env();
  if (name === "end") {
   readArg();
   return "";
  }
  if (SKIPARG.has(name)) {
   readArg();
   return "";
  }
  if (IGNORE.has(name)) return "";
  if (Object.prototype.hasOwnProperty.call(SYMS, name)) return SYMS[name];
  if (FUNCS.has(name)) return name + (s[i] === "\\" ? " " : "");
  return name + " "; // commande inconnue : on garde son nom, sans le "\"
 }
 function parseSeq(stop) {
  let out = "";
  while (i < s.length) {
   const c = s[i];
   if (stop === "}" && c === "}") break;
   if (stop === "]" && c === "]") break;
   if (c === "\\") {
    if (stop === "ENV" && s.startsWith("\\end", i) && !/[A-Za-z]/.test(s[i + 4] || "")) break;
    i++;
    out += command(readName(), out);
    continue;
   }
   if (c === "{") {
    i++;
    out += parseSeq("}");
    if (s[i] === "}") i++;
    continue;
   }
   if (c === "}") {
    i++;
    continue;
   }
   if (c === "^") {
    i++;
    out += sup(readArg());
    continue;
   }
   if (c === "_") {
    i++;
    out += sub(readArg(), out);
    continue;
   }
   if (c === "&") {
    i++;
    out += CELL;
    continue;
   }
   if (c === "~" || c === "\n" || c === "\r") {
    i++;
    out += " ";
    continue;
   }
   out += c;
   i++;
  }
  return out;
 }
 return parseSeq(null)
  .split(CELL).join(" ")
  .split(ROW).join(" ; ")
  .replace(/[^\S\n]+/g, " ")
  .replace(/\( /g, "(")
  .replace(/ \)/g, ")")
  .replace(/ *\n */g, "\n")
  .trim();
}
export { texToText };