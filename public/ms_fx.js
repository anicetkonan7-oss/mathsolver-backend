/* MathSolver - l'énoncé de la page de résolution en notation mathématique */
(function (w) {
  "use strict";
  var E = w.ED, D = document;
  var SY = {
    "−": "-", "×": "\\times ", "÷": "\\div ", "±": "\\pm ", "≤": "\\le ", "≥": "\\ge ", "≠": "\\ne ", "≈": "\\approx ",
    "∞": "\\infty ", "∈": "\\in ", "∉": "\\notin ", "∪": "\\cup ", "∩": "\\cap ", "⇒": "\\Rightarrow ", "⇔": "\\Leftrightarrow ", "→": "\\to ",
    "∅": "\\emptyset ", "∑": "\\sum ", "∫": "\\int ", "°": "^\\circ ", "·": "\\cdot ", "%": "\\%", "{": "\\{", "}": "\\}", "#": "\\#",
    "$": "\\$", "&": "\\&", "_": "\\_", "^": "\\wedge ", "~": "\\sim ", "\\": "\\backslash ",
    "ℝ": "\\mathbb{R}", "ℕ": "\\mathbb{N}", "ℤ": "\\mathbb{Z}", "ℚ": "\\mathbb{Q}", "ℂ": "\\mathbb{C}",
    "α": "\\alpha ", "β": "\\beta ", "γ": "\\gamma ", "δ": "\\delta ", "θ": "\\theta ", "λ": "\\lambda ", "μ": "\\mu ",
    "π": "\\pi ", "σ": "\\sigma ", "φ": "\\varphi ", "ω": "\\omega ", "Δ": "\\Delta ", "Σ": "\\Sigma ", "Ω": "\\Omega "
  };
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function L(n, p, q) {
    var v = n.v;
    if (n.k === "f") { return "\\" + v + " "; }
    if (n.k === "s") { return "\\ "; }
    if (n.k === "t") { return "\\text{" + v + "}"; }
    if (v === "," && p && q && p.k === "n" && q.k === "n") { return "{,}"; }
    return SY.hasOwnProperty(v) ? SY[v] : v;
  }
  function B(n, first) {
    var u = n.f.map(S), z = first ? "{}" : "";
    switch (n.t) {
      case "frac": return "\\frac{" + u[0] + "}{" + u[1] + "}";
      case "sup": return z + "^{" + u[0] + "}";
      case "sub": return z + "_{" + u[0] + "}";
      case "ss": return "_{" + u[0] + "}^{" + u[1] + "}";
      case "sqrt": return "\\sqrt{" + u[0] + "}";
      case "root": return u[0] ? "\\sqrt[" + u[0] + "]{" + u[1] + "}" : "\\sqrt{" + u[1] + "}";
      case "abs": return T(n) ? "\\left|" + u[0] + "\\right|" : "|" + u[0] + "|";
    }
    return T(n) ? "\\left(" + u[0] + "\\right)" : "(" + u[0] + ")";
  }
  function T(n) {
    return n.f.some(function (s) { return s.n.some(function (x) { return x.t !== "c" && (x.t === "frac" || x.t === "sqrt" || x.t === "root" || x.t === "ss" || T(x)); }); });
  }
  function S(s) {
    var a = s.n, o = "", i, n;
    for (i = 0; i < a.length; i++) {
      n = a[i];
      o += n.t === "c" ? L(n, a[i - 1], a[i + 1]) : B(n, i === 0);
    }
    return o;
  }
  function fm(x) {
    try { return w.katex ? w.katex.renderToString(S(E.parse(x)), { throwOnError: false }) : esc(x); } catch (e) { return esc(x); }
  }
  function html(x) {
    var sg, h = "", p = 0;
    x = String(x || "");
    html.n = 0;
    if (!E || !E.segs || !x) { return esc(x); }
    sg = E.segs(x, 0, x.length, false, []);
    html.n = sg.length;
    sg.forEach(function (g) { h += esc(x.slice(p, g[0])) + fm(x.slice(g[0], g[1])); p = g[1]; });
    return h + esc(x.slice(p));
  }
  w.MSFX = { tex: function (x) { return S(E.parse(x)); }, html: html };
  var el = D.querySelector(".etx"), t = String((w.MS_DATA || {}).q || "").trim(), h, mo;
  if (!el || !t || !E || !E.segs) { return; }
  h = html(t);
  if (!html.n) { return; }
  el.innerHTML = h;
  mo = D.getElementById("more");
  if (mo && w.MSV) { mo.style.display = ""; w.MSV.grip(); }
})(window);