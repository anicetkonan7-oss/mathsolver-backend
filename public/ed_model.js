/* MathSolver - éditeur de formules 1/4 : modèle (arbre), curseur et texte de sortie */
(function (w) {
  "use strict";
  var E = w.ED = { text: false, shift: false };
  var BIN = "+-−×÷=<>≤≥≠±∈∉∪∩⇒⇔→·*", PUN = ",;:[]", BG = "∫∑";
  function seq(p) { return { n: [], p: p || null }; }
  function box(t, k) { var b = { t: t, f: [] }, i; for (i = 0; i < k; i++) { b.f.push(seq(b)); } return b; }
  E.root = seq(null);
  E.cur = { s: E.root, i: 0 };
  function ins(n) { var c = E.cur; c.s.n.splice(c.i, 0, n); n.q = c.s; c.i++; return n; }
  function into(s) { E.cur.s = s; E.cur.i = 0; }
  function leaf(v, txt) {
    var k = v === " " ? "s" : v === "\n" ? "b" : txt ? "t" : BG.indexOf(v) >= 0 ? "g" : /[0-9.]/.test(v) ? "n" : /[A-Za-zÀ-ÖØ-öø-ÿŒœα-ωΑ-Ω]/.test(v) ? "v" : BIN.indexOf(v) >= 0 ? "o" : PUN.indexOf(v) >= 0 ? "p" : "x";
    return { t: "c", v: v, k: k };
  }
  function fill(s, str) { str.split("").forEach(function (v) { var n = leaf(v); n.q = s; s.n.push(n); }); }
  function opd(a, j) {
    var n = a[j];
    if (n.t !== "c") { return true; }
    if ("nvfx".indexOf(n.k) >= 0) { return true; }
    return n.v === "," && !!a[j - 1] && a[j - 1].k === "n" && !!a[j + 1] && a[j + 1].k === "n";
  }
  function dead(n) { return n.f.every(function (s) { return !s.n.length; }); }
  E.put = function (v, txt) { if (v === "\n" && E.cur.s.p) { return; } ins(leaf(v, txt)); };
  E.box = function (t, k) { var b = ins(box(t, k)); into(b.f[0]); return b; };
  E.fl = function (name) { ins({ t: "c", v: name, k: "f" }); };
  E.fn = function (name) { E.fl(name); E.box("grp", 1); };
  E.sup = function (pre) { var b = E.box("sup", 1); if (pre) { fill(b.f[0], pre); E.cur.s = b.q; E.cur.i = b.q.n.indexOf(b) + 1; } return b; };
  E.sub = function (pre) { var b = E.box("sub", 1); if (pre) { fill(b.f[0], pre); E.cur.i = pre.length; } return b; };
  E.big = function (sym) { E.put(sym); E.box("ss", 2); };
  E.frac = function () {
    var c = E.cur, a = c.s.n, j = c.i, f = box("frac", 2), m, p;
    while (j > 0 && opd(a, j - 1)) { j--; }
    for (p = c.i - 1; p >= j; p--) {
      if (a[p].t === "c" && a[p].k === "f" && a[p].v === "lim") { j = p + 1 + (a[p + 1] && a[p + 1].t === "sub" ? 1 : 0); break; }
    }
    m = a.splice(j, c.i - j);
    m.forEach(function (n) { n.q = f.f[0]; });
    f.f[0].n = m;
    c.i = j;
    ins(f);
    into(f.f[m.length ? 1 : 0]);
  };
  E.close = function () {
    var s = E.cur.s;
    while (s && !(s.p && s.p.t === "grp")) { s = s.p ? s.p.q : null; }
    if (s) { E.cur.s = s.p.q; E.cur.i = s.p.q.n.indexOf(s.p) + 1; } else { E.put(")"); }
  };
  E.right = function () {
    var c = E.cur, n = c.s.n[c.i], p, k;
    if (n) { if (n.t === "c") { c.i++; } else { into(n.f[0]); } return; }
    p = c.s.p;
    if (!p) { return; }
    k = p.f.indexOf(c.s);
    if (k < p.f.length - 1) { into(p.f[k + 1]); } else { c.s = p.q; c.i = p.q.n.indexOf(p) + 1; }
  };
  E.left = function () {
    var c = E.cur, n = c.i > 0 && c.s.n[c.i - 1], p, k, s;
    if (n) { if (n.t === "c") { c.i--; } else { s = n.f[n.f.length - 1]; c.s = s; c.i = s.n.length; } return; }
    p = c.s.p;
    if (!p) { return; }
    k = p.f.indexOf(c.s);
    if (k > 0) { s = p.f[k - 1]; c.s = s; c.i = s.n.length; } else { c.s = p.q; c.i = p.q.n.indexOf(p); }
  };
  E.back = function () {
    var c = E.cur, n, s, p, j;
    if (c.i > 0) {
      n = c.s.n[c.i - 1];
      if (n.t === "c" || dead(n)) { c.s.n.splice(--c.i, 1); } else { s = n.f[n.f.length - 1]; c.s = s; c.i = s.n.length; }
      return;
    }
    p = c.s.p;
    if (!p) { return; }
    if (dead(p)) { j = p.q.n.indexOf(p); p.q.n.splice(j, 1); c.s = p.q; c.i = j; } else { E.left(); }
  };
  E.empty = function (s) {
    var i, j, n, r;
    s = s || E.root;
    for (i = 0; i < s.n.length; i++) {
      n = s.n[i];
      if (n.t === "c") { continue; }
      for (j = 0; j < n.f.length; j++) {
        if (!n.f[j].n.length) { return n.f[j]; }
        r = E.empty(n.f[j]);
        if (r) { return r; }
      }
    }
    return null;
  };
})(window);
(function (E) {
  "use strict";
  var SIM = /^[\w.,À-ÖØ-öø-ÿα-ωΑ-Ω]+$/;
  function one(s) {
    var m = s.match(/^[\wÀ-ÖØ-öø-ÿ.]*\(/), d = 0, i;
    if (!m) { return false; }
    for (i = m[0].length - 1; i < s.length; i++) {
      if (s.charAt(i) === "(") { d++; } else if (s.charAt(i) === ")" && --d === 0) { return i === s.length - 1; }
    }
    return false;
  }
  var ATM = /^(\d+([.,]\d+)?|[A-Za-zÀ-ÖØ-öø-ÿα-ωΑ-Ω])$/;
  function wn(s) { return SIM.test(s) || one(s) ? s : "(" + s + ")"; }
  function wr(s) { return ATM.test(s) || one(s) ? s : "(" + s + ")"; }
  function od(n) { return !!n && (n.t !== "c" || "nvfx".indexOf(n.k) >= 0); }
  function tx(s) {
    var a = s.n, o = "", i, n, r, u;
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (n.t === "c") { o += n.v === "−" ? "-" : n.v; continue; }
      u = n.f.map(tx);
      switch (n.t) {
        case "frac": r = wn(u[0]) + "/" + wr(u[1]); if (od(a[i - 1]) || od(a[i + 1])) { r = "(" + r + ")"; } break;
        case "sup": r = "^" + wr(u[0]); break;
        case "sub": r = "_" + wr(u[0]); break;
        case "ss": r = "_" + wr(u[0]) + "^" + wr(u[1]); break;
        case "sqrt": r = "√(" + u[0] + ")"; break;
        case "root": r = "(" + u[1] + ")^(1/" + u[0] + ")"; break;
        case "abs": r = "|" + u[0] + "|"; break;
        default: r = "(" + u[0] + ")";
      }
      o += r;
    }
    return o;
  }
  E.out = function () { return tx(E.root).replace(/[ \t]+\n/g, "\n").replace(/ {2,}/g, " ").trim(); };
})(window.ED);