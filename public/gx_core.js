/* MathSolver - Exercices : outils des générateurs (tirages, fractions, polynômes) et registre des exercices par niveau et chapitre */
(function (w) {
  "use strict";
  if (w.MSGX) { return; }
  var M = Math, RND = M.random;
  // tirage reproductible (même graine → même exercice) pour reprendre un devoir
  function seeded(a) { return function () { a = (a + 0x6D2B79F5) | 0; var t = M.imul(a ^ (a >>> 15), 1 | a); t = (t + M.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function ri(a, b) { return a + M.floor(RND() * (b - a + 1)); }
  function nz(a, b) { var v; do { v = ri(a, b); } while (!v); return v; }
  function pick(a) { return a[M.floor(RND() * a.length)]; }
  function gcd(a, b) { a = M.abs(a); b = M.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function red(p, q) { var g = gcd(p, q); if (q < 0) { g = -g; } return [p / g, q / g]; }
  // fraction p/q : en LaTeX (fr) et telle que l'élève la tape (frt)
  function fr(p, q) { var f = red(p, q); return f[1] === 1 ? String(f[0]) : (f[0] < 0 ? "-" : "") + "\\dfrac{" + M.abs(f[0]) + "}{" + f[1] + "}"; }
  function frt(p, q) { var f = red(p, q); return f[1] === 1 ? mt(f[0]) : (f[0] < 0 ? "−" : "") + M.abs(f[0]) + "/" + f[1]; }
  function mt(n) { return String(n).replace("-", "−").replace(".", ","); }
  // nombre décimal à la française dans LaTeX : 1{,}5
  function dc(n) { return String(+n.toFixed(6)).replace("-", "−").replace(".", "{,}"); }
  // polynôme de coefficients c (degré décroissant) en x
  function poly(c, v, typed) {
    var s = "", n = c.length - 1;
    v = v || "x";
    c.forEach(function (a, i) {
      var p = n - i, b = M.abs(a), t;
      if (!a) { return; }
      t = (b === 1 && p > 0 ? "" : String(b)) + (p > 1 ? v + (typed ? "^" + p : "^{" + p + "}") : p === 1 ? v : "");
      s += s ? (a < 0 ? (typed ? " − " : " - ") : " + ") + t : (a < 0 ? (typed ? "−" : "-") : "") + t;
    });
    return s || "0";
  }
  function pv(c, x) { return c.reduce(function (s, a) { return s * x + a; }, 0); }
  function dp(c) { var n = c.length - 1; return c.slice(0, -1).map(function (a, i) { return a * (n - i); }); }
  // terme signé : « + 3 », « - 3 » (pour écrire ax + b)
  function sg(n, t) { return n === 0 ? "" : (n < 0 ? " - " : " + ") + (M.abs(n) === 1 && t ? "" : M.abs(n)) + (t || ""); }
  function lin(a, b, v) { v = v || "x"; return (a === 1 ? "" : a === -1 ? "-" : a) + v + sg(b); }

  // aides d'écriture partagées par les fichiers d'exercices
  function pw(v) { return v < 0 ? "(" + v + ")" : String(v); }
  function ex(k) { return k === 1 ? "" : k === -1 ? "-" : k; }
  function inf(s) { return s > 0 ? "+\\infty" : "-\\infty"; }
  function infT(s) { return s > 0 ? "+∞" : "−∞"; }
  // a + bi en LaTeX (ou tapé si typed) ; a et b : nombres ou textes déjà écrits
  function cz(a, b, typed) {
    var m = typed ? "−" : "-", A = String(a), B = String(b), n = B.charAt(0) === "-" || B.charAt(0) === "−", bb = n ? B.slice(1) : B, im = (bb === "1" ? "" : bb) + "i";
    if (A === "0") { return B === "0" ? "0" : (n ? m : "") + im; }
    return (typed ? A.replace("-", "−") : A) + (B === "0" ? "" : (n ? " " + m + " " : " + ") + im);
  }
  function dec(v) { return String(+v.toFixed(4)).replace(".", ",").replace("-", "−"); }
  function ldec(v) { return String(+v.toFixed(4)).replace(".", "{,}"); }
  function vc(u) { return "\\begin{pmatrix} " + u.join(" \\\\ ") + " \\end{pmatrix}"; }
  function tb(x, y, a, b) { return "$$\\begin{array}{c|" + "c".repeat(x.length) + "} " + (a || "x_i") + " & " + x.map(ldec).join(" & ") + " \\\\ \\hline " + (b || "y_i") + " & " + y.map(ldec).join(" & ") + " \\end{array}$$"; }
  function mp(a, n, m) { var r = 1; a %= m; while (n > 0) { if (n & 1) { r = r * a % m; } a = a * a % m; n >>= 1; } return r; }
  var H = { pw: pw, ex: ex, inf: inf, infT: infT, cz: cz, dec: dec, ldec: ldec, vc: vc, tb: tb, mp: mp, ri: ri, nz: nz, pick: pick, gcd: gcd, red: red, fr: fr, frt: frt, mt: mt, dc: dc, poly: poly, pv: pv, dp: dp, sg: sg, lin: lin };
  var REG = {};
  // chapitres qui ont des exercices, par niveau (fichiers gx_<niveau>_<chapitre>.js)
  var LV = { lt: 15, l3: 12 };
  w.MSGXH = H;
  w.MSGX = {
    // gens : [{ id, n : nom de la compétence, d : 1 facile · 2 moyen · 3 difficile, f : (H) → item }]
    add: function (lv, ch, gens) { REG[lv] = REG[lv] || {}; REG[lv][ch] = gens; },
    of: function (lv, ch) { return (REG[lv] || {})[ch] || []; },
    has: function (lv) { return !!LV[lv]; },
    n: function (lv) { return LV[lv] || 0; },
    ok: function (lv, ch) { return !!(REG[lv] && REG[lv][ch]); },
    C: function (n, k) { var r = 1, i; for (i = 1; i <= k; i++) { r = r * (n - k + i) / i; } return M.round(r); },
    // item : { t énoncé, a réponse attendue (pour MSCK), r réponse tapée, h [2 indices], s [étapes du corrigé] }
    make: function (g, sd) {
      var it, i;
      if (sd === undefined) { sd = M.floor(M.random() * 2147483647); }
      RND = seeded(sd);
      try { for (i = 0; i < 60; i++) { it = g.f(H); if (it) { break; } } } finally { RND = M.random; }
      it.g = g; it.sd = sd;
      return it;
    },
    byId: function (id) { var lv, ch, i, a; for (lv in REG) { for (ch in REG[lv]) { a = REG[lv][ch]; for (i = 0; i < a.length; i++) { if (a[i].id === id) { return a[i]; } } } } return null; }
  };
})(window);
