/* MathSolver - Copie : lecture et vérification des réponses de l'élève (calcul exact, hors ligne) */
(function (w) {
  "use strict";
  if (w.MSCK) { return; }
  var M = Math, R = M.PI / 180, FN = { sin: M.sin, cos: M.cos, tan: M.tan, asin: M.asin, acos: M.acos, atan: M.atan, ln: M.log, log: function (v) { return M.log(v) / M.LN10; }, exp: M.exp, sqrt: M.sqrt, abs: M.abs };
  // calculatrice en degrés
  var DG = { sin: function (v) { return M.sin(v * R); }, cos: function (v) { return M.cos(v * R); }, tan: function (v) { return M.tan(v * R); }, asin: function (v) { return M.asin(v) / R; }, acos: function (v) { return M.acos(v) / R; }, atan: function (v) { return M.atan(v) / R; } };
  // écriture de l'élève → écriture de calcul
  function norm(s) {
    return String(s).replace(/°/g, "").replace(/\s*(mm|cm|dm|km|m)(²|³|\^?[23])?\s*$|\s*u\.?\s*a\.?\s*$/, "").replace(/[×·∙]/g, "*").replace(/÷/g, "/").replace(/[−–]/g, "-").replace(/(\d),(\d)/g, "$1.$2").replace(/²/g, "^2").replace(/³/g, "^3").replace(/\s+/g, "").replace(/≈/g, "=");
  }
  function lex(s) {
    var T = [], i = 0, c, j, m, k;
    while (i < s.length) {
      c = s[i];
      if (/[0-9.]/.test(c)) { j = i; while (j < s.length && /[0-9.]/.test(s[j])) { j++; } T.push({ t: "n", v: parseFloat(s.slice(i, j)) }); i = j; continue; }
      if (/[a-zA-Z]/.test(c)) {
        m = null;
        for (k in FN) { if (s.substr(i, k.length) === k && (!m || k.length > m.length)) { m = k; } }
        if (m) { T.push({ t: "f", v: m }); i += m.length; continue; }
        T.push(c === "e" ? { t: "n", v: M.E } : { t: "v", v: c }); i++; continue;
      }
      if (c === "π") { T.push({ t: "n", v: M.PI }); i++; continue; }
      if (c === "∞") { T.push({ t: "n", v: Infinity }); i++; continue; }
      if (c === "√") { T.push({ t: "f", v: "sqrt" }); i++; continue; }
      if ("+-*/^()|".indexOf(c) >= 0) { T.push({ t: c }); i++; continue; }
      throw new Error("car");
    }
    return T;
  }
  // expression → fonction de l'environnement {x:…, y:…}
  function compile(src, deg) {
    var U = lex(norm(src)), p = 0, ab = 0;
    function pk() { return U[p] && U[p].t; }
    function starts() { var t = pk(); return t === "n" || t === "v" || t === "(" || t === "f" || (t === "|" && !ab); }
    function E() {
      var f = Tm(), o, g, h;
      while (pk() === "+" || pk() === "-") { o = U[p++].t; g = Tm(); h = f; f = o === "+" ? add(h, g) : sub(h, g); }
      return f;
    }
    function add(a, b) { return function (e) { return a(e) + b(e); }; }
    function sub(a, b) { return function (e) { return a(e) - b(e); }; }
    function Tm() {
      var f = Un(), o, g, h;
      while (pk() === "*" || pk() === "/" || starts()) {
        o = pk() === "*" || pk() === "/" ? U[p++].t : "*"; g = Pw(); h = f;
        f = o === "*" ? mul(h, g) : dv(h, g);
      }
      return f;
    }
    function mul(a, b) { return function (e) { return a(e) * b(e); }; }
    function dv(a, b) { return function (e) { return a(e) / b(e); }; }
    function Un() { var g; if (pk() === "-") { p++; g = Un(); return function (e) { return -g(e); }; } if (pk() === "+") { p++; return Un(); } return Pw(); }
    function Pw() { var b = Pr(), x; if (pk() === "^") { p++; x = Un(); return function (e) { return M.pow(b(e), x(e)); }; } return b; }
    function Pr() {
      var t = U[p++], f, g, v;
      if (!t) { throw new Error("fin"); }
      if (t.t === "n") { v = t.v; return function () { return v; }; }
      if (t.t === "v") { v = t.v; return function (e) { return e && e[v] !== undefined ? e[v] : NaN; }; }
      if (t.t === "(") { f = E(); if (pk() !== ")") { throw new Error(")"); } p++; return f; }
      if (t.t === "|") { ab++; f = E(); ab--; if (pk() !== "|") { throw new Error("|"); } p++; return function (e) { return M.abs(f(e)); }; }
      if (t.t === "f") { v = (deg && DG[t.v]) || FN[t.v]; g = pk() === "(" ? Pr() : Pw(); return function (e) { return v(g(e)); }; }
      throw new Error("?");
    }
    var r = E();
    if (p !== U.length) { throw new Error("reste"); }
    return r;
  }
  function val(s, e) { return compile(s)(e || {}); }
  function rhs(s) { var k = s.lastIndexOf("="); return k >= 0 ? s.slice(k + 1) : s; }
  function same(a, b, t) { if (!isFinite(b)) { return a === b; } return M.abs(a - b) <= (t || 1e-7) * M.max(1, M.abs(b)); }
  function nums(s) {
    var b = s.match(/\{([^}]*)\}/), o = [];
    if (/∅|aucun|pasde/.test(s)) { return []; }
    (b ? b[1].split(";") : s.split(/ou|;|et/)).forEach(function (q) {
      if (!b && q.indexOf("=") < 0 && /[a-z]/.test(q.replace(/[πe]|sqrt|ln|exp|log|sin|cos|tan|abs/g, ""))) { return; }
      try { var v = val(rhs(q)); if (isFinite(v)) { o.push(v); } } catch (x) { }
    });
    return o;
  }
  function sameSet(a, b) {
    a = a.slice().sort(function (x, y) { return x - y; }); b = b.slice().sort(function (x, y) { return x - y; });
    return a.length === b.length && a.every(function (v, i) { return same(v, b[i]); });
  }
  function cpx(s) { var f = compile(s), r = f({ i: 0 }), m = f({ i: 1 }) - r; return same(f({ i: 2 }), r + 2 * m) ? [r, m] : null; }
  function lin(s) {
    var q = s.split("="), f = compile(q[0]), g = q.length > 1 ? compile(q[1]) : function () { return 0; };
    function F(x, y, z) { var e = { x: x, y: y, z: z }; return f(e) - g(e); }
    var d = F(0, 0, 0), c = [F(1, 0, 0) - d, F(0, 1, 0) - d, F(0, 0, 1) - d, d];
    return same(F(2, -1, 3), 2 * c[0] - c[1] + 3 * c[2] + d) ? c : null;
  }
  function prop(a, b) {
    var k = 0, i;
    for (i = 0; i < 4; i++) { if (M.abs(b[i]) > 1e-12) { k = a[i] / b[i]; break; } }
    return k !== 0 && isFinite(k) && a.every(function (v, j) { return same(v, k * b[j], 1e-6); });
  }
  function radOk(s) { var m = s.match(/(?:√|sqrt)\(?(\d+)/g) || [], ok = true; m.forEach(function (x) { var n = +x.replace(/\D/g, ""), k; for (k = 2; k * k <= n; k++) { if (n % (k * k) === 0) { ok = false; } } }); return ok; }
  // spec a : {k:type, …} ; ln : ligne finale de l'élève → true / false
  function check(a, ln) {
    var s = norm(ln), r = rhs(s), xs = a.xs || [-2.3, -0.7, 0.4, 1.9, 3.1], n = 0, v, t;
    try {
      if (!s) { return false; }
      if (a.form === "dev" && /\(/.test(r)) { return false; }
      if (a.form === "fact" && !/\)\*?\(|\)\^\d|^-?\d*\*?\([^()]*\)$/.test(r)) { return false; }
      if (a.form === "rad" && !radOk(r)) { return false; }
      if (a.form === "rat" && /\/(√|sqrt|\(.*(√|sqrt))/.test(r)) { return false; }
      switch (a.k) {
        case "num": return same(val(r), a.v, a.tol);
        case "arg": v = (val(r) - a.v) / (2 * M.PI); return M.abs(v - M.round(v)) < 1e-7;
        case "pred": v = s.indexOf("(") >= 0 ? s.slice(s.lastIndexOf("(") + 1).replace(")", "").split(";").map(function (q) { return val(q); }) : nums(s); return !!a.p(v);
        case "aff": t = compile(r); v = function (i, z) { return t({ i: i, z: z }); };
          n = [v(0, 1) - v(0, 0), v(1, 1) - v(1, 0) - v(0, 1) + v(0, 0), v(0, 0), v(1, 0) - v(0, 0)];
          return same(v(2, 3), n[2] + 2 * n[3] + 3 * n[0] + 6 * n[1]) && n.every(function (q, j) { return same(q, a.v[j]); });
        case "lim": v = val(r); return a.v === Infinity || a.v === -Infinity ? v === a.v : same(v, a.v);
        case "expr": case "prim":
          t = compile(r);
          return xs.every(function (x) {
            var e = a.f(x), h = 1e-4, u;
            if (!isFinite(e)) { return true; }
            u = a.k === "prim" ? (t({ x: x + h }) - t({ x: x - h })) / (2 * h) : t({ x: x });
            n++; return same(u, e, a.k === "prim" ? 1e-4 : 1e-7);
          }) && n >= 3;
        case "set": return sameSet(nums(s), a.v);
        case "cplx": v = cpx(r); return !!v && same(v[0], a.v[0]) && same(v[1], a.v[1]);
        case "cset": v = s.split(/ou|;/).map(function (q) { try { return cpx(rhs(q)); } catch (x) { return null; } }).filter(function (q) { return q; });
          return v.length === a.v.length && a.v.every(function (z) { return v.some(function (q) { return same(q[0], z[0]) && same(q[1], z[1]); }); });
        case "pt": v = s.slice(s.lastIndexOf("(") + 1).replace(")", "").split(";").map(function (q) { return val(q); });
          return v.length === a.v.length && v.every(function (q, i) { return same(q, a.v[i], a.tol); });
        case "lin": v = lin(s); return !!v && prop(v, a.v);
        case "mod": v = s.indexOf("≡") >= 0 ? val(s.replace(/^.*≡/, "").replace(/\[.*$/, "")) : val(rhs(s), { k: 0 }); return ((v - a.v) % a.m + a.m) % a.m === 0;
        case "ineq": v = s.match(/x(<=|>=|≤|≥|<|>)(.+)$/); if (!v) { return false; }
          t = { "≤": "<=", "≥": ">=" }[v[1]] || v[1]; return t === a.op && same(val(v[2]), a.v);
        case "word": t = String(ln).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); return a.v.some(function (q) { return t.indexOf(q) >= 0; }) && !(a.no || []).some(function (q) { return t.indexOf(q) >= 0; });
      }
    } catch (x) { }
    return false;
  }
  function fmt(v) { if (!isFinite(v)) { return isNaN(v) ? "Erreur" : (v > 0 ? "+∞" : "−∞"); } return String(M.round(v * 1e10) / 1e10).replace(".", ",").replace("-", "−"); }
  w.MSCK = { compile: compile, val: val, check: check, fmt: fmt, norm: norm };
})(window);
