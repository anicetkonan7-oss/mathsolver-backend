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

/* ==================== Mise en forme lisible (LaTeX -> texte) ==================== */

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
const CELL = String.fromCharCode(1); // séparateur de colonnes (&) pendant la conversion
const ROW = String.fromCharCode(2); // séparateur de lignes (\\) pendant la conversion
const PH0 = String.fromCharCode(57344); // repères pour mettre les formules à l'abri
const PH1 = String.fromCharCode(57345);
const MATH_RE = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^$\n]+?\$/g;

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
// plus strict (dénominateurs, racines) : "2x" et "xy" prennent des parenthèses
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

// Transforme une formule LaTeX en texte lisible (ex. \frac{-6}{2} -> -6/2)
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

function lastResort(t) {
  return String(t).replace(/\\[a-zA-Z]+/g, " ").replace(/[$\\{}]/g, "").replace(/\s+/g, " ").trim();
}
function mathToLine(inner) {
  try {
    return texToText(inner.replace(/\s+/g, " "));
  } catch (e) {
    return lastResort(inner);
  }
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

function safeReadable(answer) {
  try {
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
  const rd = safeReadable(answer);
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
    "🤖 SOLUTION DONNÉE PAR L'IA\n" + (rd.solut