/* MathSolver - formules 4/6 : lecture du texte (x^2, 1/2, sqrt...) en formule 2D */
(function (E) {
  "use strict";
  var FN = /^(arcsin|arccos|arctan|sin|cos|tan|ln|log|exp|lim)(?![A-Za-zÀ-ÖØ-öø-ÿ]{2})/;
  var LET = /[A-Za-zÀ-ÖØ-öø-ÿα-ωΑ-Ω]/, MAP = { "<=": "≤", ">=": "≥", "!=": "≠", "<>": "≠", "=>": "⇒", "->": "→", "<=>": "⇔" };
  var s, i, ab = 0, rl = {};
  function closing() {
    var p, c, r;
    if (ab <= 0) { return false; }
    p = s.slice(0, i).replace(/\s+$/, "");
    c = p.slice(-1);
    if (c === "|") { r = rl[p.length - 1] === "c" && !/[0-9A-Za-zÀ-ÖØ-öø-ÿα-ωΑ-Ω(√]/.test(s.charAt(i + 1)); }
    else { r = /[0-9A-Za-zÀ-ÖØ-öø-ÿα-ωΑ-Ωπ∞)\]!%°']/.test(c); }
    rl[i] = r ? "c" : "o";
    return r;
  }
  function ch() { return s.charAt(i); }
  function opd(n) { return n.t !== "c" || "nvfx".indexOf(n.k) >= 0; }
  function num() {
    var m = /^(\d+([.,]\d+)?|[.,]\d+)/.exec(s.slice(i));
    if (!m) { return false; }
    m[0].split("").forEach(function (c) { E.put(c); });
    i += m[0].length;
    return true;
  }
  function close() { if (ch() === ")") { i++; } }
  function match(j) {
    var d = 0;
    for (; j < s.length; j++) {
      if (s.charAt(j) === "(") { d++; } else if (s.charAt(j) === ")" && --d === 0) { return j; }
    }
    return -1;
  }
  function prim(chain) {
    var r = s.slice(i), c = ch();
    if (c === "(" || c === "√" || c === "|" || /^sqrt\(/i.test(r)) { item(); }
    else if (num()) { }
    else if (FN.test(r)) { item(); if (ch() === "(") { item(); } }
    else if (c && (LET.test(c) || "∞π°".indexOf(c) >= 0)) { item(); }
    while (chain && (ch() === "^" || ch() === "_")) { item(); }
  }
  function arg() {
    if (ch() === "(") { i++; seq(")"); close(); return; }
    if ("-−+".indexOf(ch()) >= 0 && ch()) { E.put(ch() === "-" ? "−" : ch()); i++; }
    prim();
  }
  function seq(stop) {
    var j;
    while (i < s.length && !(stop === "|" ? ch() === "|" && closing() : ch() === stop)) { j = i; item(); if (i === j) { i++; } }
  }
  function item() {
    var c = ch(), r = s.slice(i), m, a, k, f;
    if (c === " " || c === "\t" || c === "\n") {
      if (/\d/.test(s.charAt(i - 1)) && /\d/.test(r.replace(/^\s+/, "").charAt(0))) { E.put(" "); }
      i++;
      return;
    }
    if (c === "(") { i++; E.box("grp", 1); seq(")"); close(); E.right(); return; }
    if (c === "|") {
      if (closing()) { i++; E.put("|"); return; }
      rl[i] = "o";
      i++;
      if (s.indexOf("|", i) >= 0 && !(ch() === "|" && s.indexOf("|", i + 1) < 0)) { ab++; E.box("abs", 1); seq("|"); if (ch() === "|") { i++; } ab--; E.right(); } else { E.put("|"); }
      return;
    }
    if (c === "√" || /^sqrt\(/i.test(r)) {
      i += c === "√" ? 1 : 4;
      E.box("sqrt", 1);
      if (ch() === "(") { i++; seq(")"); close(); } else { prim(); }
      E.right();
      return;
    }
    if (c === "^" || c === "_") {
      i++;
      if (!/[^\s)|]/.test(ch())) { E.put(c); return; }
      if (c === "^") { E.sup(); } else { E.sub(); }
      arg();
      E.right();
      return;
    }
    if (c === "∑" || c === "∫") {
      E.put(c);
      i++;
      if (ch() === "_") { i++; E.box("ss", 2); arg(); E.right(); if (ch() === "^") { i++; arg(); } E.right(); }
      return;
    }
    if (c === "/") {
      a = E.cur.s.n;
      k = E.cur.i;
      m = s.slice(i + 1).replace(/^\s+/, "").charAt(0);
      if (!k || !opd(a[k - 1]) || !m || ")+=*/<>".indexOf(m) >= 0) { i++; E.put("/"); return; }
      i++;
      E.frac();
      f = E.cur.s.p;
      if (f.f[0].n.length === 1 && f.f[0].n[0].t === "grp") {
        f.f[0].n = f.f[0].n[0].f[0].n;
        f.f[0].n.forEach(function (n) { n.q = f.f[0]; });
      }
      m = ch() === "(" ? match(i) : -1;
      if (m > 0 && "^_".indexOf(s.charAt(m + 1) || "!") < 0) { i++; seq(")"); close(); } else { prim(true); }
      E.right();
      return;
    }
    if ((m = FN.exec(r))) { E.fl(m[1]); i += m[1].length; return; }
    if (/^pi(?![A-Za-zÀ-ÖØ-öø-ÿ])/.test(r) && (!i || !LET.test(s.charAt(i - 1)))) { E.put("π"); i += 2; return; }
    if (num()) { return; }
    m = /^(<=>|<=|>=|!=|<>|=>|->)/.exec(r);
    if (m) { E.put(MAP[m[1]]); i += m[1].length; return; }
    i++;
    E.put(c === "*" ? "×" : c === "-" ? "−" : c);
  }
  E.parse = function (str) {
    var r0 = E.root, c0 = E.cur, root = { n: [], p: null };
    E.root = root;
    E.cur = { s: root, i: 0 };
    s = String(str);
    i = 0;
    ab = 0;
    rl = {};
    try { seq("\u0000"); } catch (e) { }
    E.root = r0;
    E.cur = c0;
    return root;
  };
})(window.ED);