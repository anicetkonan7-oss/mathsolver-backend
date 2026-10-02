/* MathSolver - fichier 1/2 : calculs (fonction, dérivée, domaine, analyse) */
(function (root) {
  "use strict";

  function getMath() { return root.math; }
  function isNum(v) { return typeof v === "number" && isFinite(v); }

  /* ---------- Affichage des nombres ---------- */
  function fmt(v) {
    if (v === Infinity) { return "+∞"; }
    if (v === -Infinity) { return "−∞"; }
    if (typeof v !== "number" || v !== v) { return "?"; }
    if (Math.abs(v) >= 1e6) { return v.toExponential(2).replace("-", "−").replace(".", ","); }
    var r = Math.round(v * 1000) / 1000;
    if (r === 0) { return "0"; }
    return String(r).replace("-", "−").replace(".", ",");
  }

  function fmtVal(o) {
    if (!o) { return "?"; }
    if (o.t === "inf") { return o.v > 0 ? "+∞" : "−∞"; }
    if (o.t === "val") { return fmt(o.v); }
    return "?";
  }

  /* ---------- Expression et domaine ---------- */
  function normalizeExpr(s) {
    s = String(s == null ? "" : s);
    if (s.indexOf("=") >= 0) { s = s.slice(s.lastIndexOf("=") + 1); }
    s = s.replace(/−/g, "-").replace(/[×·]/g, "*").replace(/÷/g, "/");
    s = s.replace(/²/g, "^2").replace(/³/g, "^3");
    s = s.replace(/√\s*\(/g, "sqrt(").replace(/π/g, "pi");
    s = s.replace(/\bln\s*\(/gi, "log(");
    return s.trim();
  }

  function parseBound(txt) {
    var t = String(txt).replace(/\s+/g, "").replace(/−/g, "-").replace(/∞/g, "inf");
    var sign = 1;
    if (t.charAt(0) === "+") { t = t.slice(1); } else if (t.charAt(0) === "-") { sign = -1; t = t.slice(1); }
    if (/^inf(ini|inity)?$/i.test(t)) { return sign * Infinity; }
    var v = NaN;
    try { v = sign * Number(getMath().evaluate(normalizeExpr(t))); } catch (e) { v = NaN; }
    return v;
  }

  function parseDomain(str) {
    var s = String(str == null ? "" : str).trim();
    var all = [{ a: -Infinity, b: Infinity, ca: false, cb: false }];
    if (!s || /^[Rℝ]$/i.test(s)) { return all; }
    if (/^[Rℝ]\s*\*$/i.test(s)) {
      return [{ a: -Infinity, b: 0, ca: false, cb: false }, { a: 0, b: Infinity, ca: false, cb: false }];
    }
    var ex = s.match(/^[Rℝ]\s*(?:\\|∖|-)\s*\{(.+)\}$/i);
    if (ex) {
      var cuts = ex[1].split(/[;,]/).map(parseBound).filter(function (v) { return isNum(v); }).sort(function (p, q) { return p - q; });
      var out = [], prev = -Infinity;
      cuts.forEach(function (c) { out.push({ a: prev, b: c, ca: false, cb: false }); prev = c; });
      out.push({ a: prev, b: Infinity, ca: false, cb: false });
      return out;
    }
    var res = [];
    s.split(/\s*(?:∪|U|\bou\b)\s*/).forEach(function (part) {
      var m = part.trim().match(/^([\[\]\(])\s*([^;,]+?)\s*[;,]\s*([^;,]+?)\s*([\[\]\)])$/);
      if (!m) { return; }
      var a = parseBound(m[2]), b = parseBound(m[3]);
      if (a !== a || b !== b || !(a < b)) { return; }
      res.push({ a: a, b: b, ca: m[1] === "[" && isFinite(a), cb: m[4] === "]" && isFinite(b) });
    });
    res.sort(function (p, q) { return p.a - q.a; });
    return res.length ? res : all;
  }

  function inDomain(x, ivs) {
    for (var i = 0; i < ivs.length; i++) {
      var iv = ivs[i];
      if ((x > iv.a || (iv.ca && x === iv.a)) && (x < iv.b || (iv.cb && x === iv.b))) { return true; }
    }
    return false;
  }

  /* ---------- Fonction et dérivée ---------- */
  function buildFns(expr) {
    var m = getMath();
    var node = m.parse(normalizeExpr(expr));
    var code = node.compile();
    function real(v) { return typeof v === "number" ? v : NaN; }
    var f = function (x) { try { return real(code.evaluate({ x: x })); } catch (e) { return NaN; } };
    var numd = function (x) {
      var h = 1e-6 * Math.max(1, Math.abs(x));
      var a = f(x + h), b = f(x - h);
      if (isNum(a) && isNum(b)) { return (a - b) / (2 * h); }
      if (isNum(a)) { var c = f(x); return isNum(c) ? (a - c) / h : NaN; }
      if (isNum(b)) { var d = f(x); return isNum(d) ? (d - b) / h : NaN; }
      return NaN;
    };
    var df = numd, analytic = false;
    try {
      if (typeof m.derivative === "function") {
        var dcode = m.derivative(node, "x").compile();
        var dfa = function (x) { try { return real(dcode.evaluate({ x: x })); } catch (e) { return NaN; } };
        var ok = 0, bad = 0, test = [0.37, 1.3, 2.9, 5.1, 0.11, 7.7, -0.6, -2.4, -4.2];
        for (var i = 0; i < test.length; i++) {
          var p = dfa(test[i]), q = numd(test[i]);
          if (isNum(p) && isNum(q)) { if (Math.abs(p - q) <= 1e-4 * (1 + Math.abs(q))) { ok++; } else { bad++; } }
        }
        if (ok > 0 && bad === 0) { df = dfa; analytic = true; }
      }
    } catch (e) { df = numd; analytic = false; }
    return { f: f, df: df, analytic: analytic };
  }

  /* ---------- Analyse d'un intervalle ---------- */
  function mapU(a, b, u) {
    var fa = isFinite(a), fb = isFinite(b);
    if (fa && fb) { return a + (b - a) * u; }
    if (fa) { return a + u / (1 - u); }
    if (fb) { return b - (1 - u) / u; }
    return Math.tan(Math.PI * (u - 0.5));
  }

  function bisect(df, lo, hi) {
    var dlo = df(lo);
    for (var it = 0; it < 200; it++) {
      var mid = (lo + hi) / 2;
      if (mid === lo || mid === hi) { break; }
      var dm = df(mid);
      if (!isNum(dm)) { return null; }
      if (dm === 0) { return mid; }
      if (dm * dlo < 0) { hi = mid; } else { lo = mid; dlo = dm; }
    }
    return (lo + hi) / 2;
  }

  function validRoot(fns, r) {
    var dr = fns.df(r);
    if (isNum(dr) && Math.abs(dr) < 1e-3) { return true; }
    var fr = fns.f(r);
    if (!isNum(fr)) { return false; }
    var e = 1e-9 * Math.max(1, Math.abs(r));
    var l = fns.f(r - e), rr = fns.f(r + e);
    return isNum(l) && isNum(rr) && Math.abs(l - fr) < 1e-6 * (1 + Math.abs(fr)) && Math.abs(rr - fr) < 1e-6 * (1 + Math.abs(fr));
  }

  function classify(seq) {
    var s = seq.filter(function (v) { return !(typeof v === "number" && v !== v); });
    if (s.length < 3) { return { t: "?" }; }
    var n = s.length, a = s[n - 3], b = s[n - 2], c = s[n - 1];
    if (c === Infinity || c === -Infinity) { return { t: "inf", v: c }; }
    if (!isFinite(a) || !isFinite(b)) { return { t: "?" }; }
    var grow = Math.abs(c) > Math.abs(b) && Math.abs(b) > Math.abs(a) && c * b > 0 && b * a > 0;
    if (grow && Math.abs(c) > 10) { return { t: "inf", v: c > 0 ? Infinity : -Infinity }; }
    var d1 = Math.abs(c - b), d0 = Math.abs(b - a);
    if (d1 <= d0 + 1e-12 && d1 < 0.05 * (1 + Math.abs(c))) { return { t: "val", v: c }; }
    return { t: "?" };
  }

  function limitAt(f, p, side) {
    var seq = [], k;
    if (isFinite(p)) {
      var sc = Math.max(1, Math.abs(p)), kmax = p === 0 ? 11 : 8;
      for (k = 2; k <= kmax; k++) { seq.push(f(p + side * Math.pow(10, -k) * sc)); }
    } else {
      var sg = p > 0 ? 1 : -1;
      for (k = 2; k <= 8; k++) { seq.push(f(sg * Math.pow(10, k))); }
    }
    return classify(seq);
  }

  function endValue(f, p, closed, side) {
    if (isFinite(p) && closed) {
      var v = f(p);
      if (isNum(v)) { return { t: "val", v: v }; }
    }
    return limitAt(f, p, side);
  }

  function signAt(df, p, q) {
    var us = [0.5, 0.3, 0.7, 0.2, 0.8];
    for (var i = 0; i < us.length; i++) {
      var d = df(mapU(p, q, us[i]));
      if (isNum(d) && d !== 0) { return d > 0 ? 1 : -1; }
    }
    return 0;
  }

  function analyzeInterval(fns, iv) {
    var f = fns.f, df = fns.df, N = 700, xs = [], ds = [], bad = 0, checked = 0, k;
    for (k = 1; k < N; k++) {
      var x = mapU(iv.a, iv.b, 0.5 * (1 - Math.cos(Math.PI * k / N)));
      if (!isFinite(x)) { continue; }
      xs.push(x);
      ds.push(df(x));
      if (Math.abs(x) <= 1000) {
        /* on ignore les débordements (±Infinity) très loin de l'origine : seul NaN = non défini */
        checked++;
        var fv = f(x);
        if (typeof fv !== "number" || fv !== fv) { bad++; }
      }
    }
    if (checked > 0 && bad === checked) { return { error: "L'expression n'est pas définie sur cet intervalle." }; }

    var roots = [], prev = null;
    for (var i = 0; i < xs.length; i++) {
      var d = ds[i];
      if (!isNum(d)) { prev = null; continue; }
      if (d === 0) { continue; }
      if (prev && prev.d * d < 0) {
        var r = bisect(df, prev.x, xs[i]);
        if (r !== null && validRoot(fns, r)) { roots.push(r); }
      }
      prev = { x: xs[i], d: d };
    }
    roots.sort(function (p, q) { return p - q; });
    roots = roots.filter(function (r, j) { return j === 0 || Math.abs(r - roots[j - 1]) > 1e-9 * Math.max(1, Math.abs(r)); });
    if (roots.length > 12) {
      return { error: "Cette fonction a beaucoup de points critiques sur cet intervalle (fonction oscillante) : le tableau n'est pas affiché, mais la courbe reste visible." };
    }

    var pts = [iv.a].concat(roots, [iv.b]);
    var signs = [];
    for (var j = 0; j < pts.length - 1; j++) { signs.push(signAt(df, pts[j], pts[j + 1])); }
    for (j = signs.length - 2; j >= 0; j--) {
      if (signs[j] !== 0 && signs[j] === signs[j + 1]) { signs.splice(j + 1, 1); pts.splice(j + 1, 1); }
    }
    var vals = pts.map(function (p, idx) {
      if (idx === 0) { return endValue(f, p, iv.ca, 1); }
      if (idx === pts.length - 1) { return endValue(f, p, iv.cb, -1); }
      var v = f(p);
      return isNum(v) ? { t: "val", v: v } : { t: "?" };
    });
    return { a: iv.a, b: iv.b, ca: iv.ca, cb: iv.cb, pts: pts, signs: signs, vals: vals, warn: bad > 0 };
  }

  function analyzeFunction(expr, domainStr) {
    var fns = buildFns(expr);
    var domain = parseDomain(domainStr);
    var intervals = domain.map(function (iv) { return analyzeInterval(fns, iv); });
    return { fns: fns, domain: domain, intervals: intervals };
  }

  function intervalLabel(iv) {
    return (iv.ca ? "[" : "]") + fmt(iv.a) + " ; " + fmt(iv.b) + (iv.cb ? "]" : "[");
  }

  root.MSCore = {
    isNum: isNum, fmt: fmt, fmtVal: fmtVal, normalizeExpr: normalizeExpr, parseDomain: parseDomain,
    inDomain: inDomain, analyze: analyzeFunction, intervalLabel: intervalLabel
  };
})(typeof window !== "undefined" ? window : globalThis);