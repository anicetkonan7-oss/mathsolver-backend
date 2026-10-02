/* MathSolver : courbes et tableaux de variation (calculés par l'appli, pas par l'IA) */
(function (root) {
  "use strict";

  var uid = 0;

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

  /* ---------- Tableau de variation (SVG) ---------- */
  function tableSVG(an, name) {
    var LABELW = 64, COLW = 104, n = an.pts.length, W = LABELW + n * COLW, H = 164;
    var yHigh = 92, yLow = 140, id = "msah" + (++uid);
    var HALO = ' stroke="#ffffff" stroke-width="7" paint-order="stroke" stroke-linejoin="round"';
    function cx(i) { return LABELW + COLW * (i + 0.5); }
    function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
    var o = [];
    o.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H + '" width="' + W + '" height="' + H + '" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="#1c2333">');
    o.push('<defs><marker id="' + id + '" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#1c2333"/></marker></defs>');
    o.push('<rect x="0.75" y="0.75" width="' + (W - 1.5) + '" height="' + (H - 1.5) + '" fill="#ffffff" stroke="#1c2333" stroke-width="1.5"/>');
    o.push('<line x1="0" y1="34" x2="' + W + '" y2="34" stroke="#1c2333" stroke-width="1.2"/>');
    o.push('<line x1="0" y1="68" x2="' + W + '" y2="68" stroke="#1c2333" stroke-width="1.2"/>');
    o.push('<line x1="' + LABELW + '" y1="0" x2="' + LABELW + '" y2="' + H + '" stroke="#1c2333" stroke-width="1.2"/>');
    o.push('<text x="' + LABELW / 2 + '" y="23" text-anchor="middle" font-style="italic">x</text>');
    o.push('<text x="' + LABELW / 2 + '" y="56" text-anchor="middle" font-style="italic">' + esc(name) + "′(x)</text>");
    o.push('<text x="' + LABELW / 2 + '" y="121" text-anchor="middle" font-style="italic">' + esc(name) + "(x)</text>");
    var i;
    for (i = 1; i < n - 1; i++) {
      o.push('<line x1="' + cx(i) + '" y1="34" x2="' + cx(i) + '" y2="' + H + '" stroke="#8a94ad" stroke-width="1" stroke-dasharray="4 3"/>');
    }
    for (i = 0; i < n; i++) {
      o.push('<text x="' + cx(i) + '" y="23" text-anchor="middle">' + fmt(an.pts[i]) + "</text>");
    }
    for (i = 1; i < n - 1; i++) {
      o.push('<text x="' + cx(i) + '" y="56" text-anchor="middle"' + HALO + '>0</text>');
    }
    for (i = 0; i < n - 1; i++) {
      var s = an.signs[i], mx = (cx(i) + cx(i + 1)) / 2;
      o.push('<text x="' + mx + '" y="58" text-anchor="middle" font-size="22" font-weight="bold">' + (s > 0 ? "+" : s < 0 ? "−" : "?") + "</text>");
    }
    var ys = [];
    for (i = 0; i < n; i++) {
      var left = i > 0 ? an.signs[i - 1] : 0, right = i < n - 1 ? an.signs[i] : 0, high;
      if (i === 0) { high = right < 0; }
      else if (i === n - 1) { high = left > 0; }
      else { high = left > 0; if (left === 0) { high = right < 0; } }
      ys.push(left === 0 && right === 0 ? 116 : (high ? yHigh : yLow));
    }
    for (i = 0; i < n; i++) {
      o.push('<text x="' + cx(i) + '" y="' + (ys[i] + 5) + '" text-anchor="middle"' + HALO + '>' + fmtVal(an.vals[i]) + "</text>");
    }
    for (i = 0; i < n - 1; i++) {
      var s2 = an.signs[i], x1 = cx(i) + 26, x2 = cx(i + 1) - 26, y1, y2;
      if (s2 > 0) { y1 = yLow - 12; y2 = yHigh + 14; }
      else if (s2 < 0) { y1 = yHigh + 14; y2 = yLow - 12; }
      else { y1 = 116; y2 = 116; }
      o.push('<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#1c2333" stroke-width="1.7" marker-end="url(#' + id + ')"/>');
    }
    o.push("</svg>");
    return o.join("");
  }

  /* ---------- Courbe (canvas) ---------- */
  function niceStep(raw) {
    var p = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), m = raw / p;
    return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
  }

  function computeView(model) {
    var P = [], leftInf = false, rightInf = false, crit = [];
    model.intervals.forEach(function (an) {
      if (an.error) { return; }
      if (isFinite(an.a)) { P.push(an.a); } else { leftInf = true; }
      if (isFinite(an.b)) { P.push(an.b); } else { rightInf = true; }
      for (var i = 1; i < an.pts.length - 1; i++) {
        P.push(an.pts[i]);
        var v = model.fns.f(an.pts[i]);
        if (isNum(v)) { crit.push({ x: an.pts[i], y: v }); }
      }
    });
    var x0, x1;
    if (!P.length) { x0 = -6; x1 = 6; }
    else {
      var lo = Math.min.apply(null, P), hi = Math.max.apply(null, P), span = Math.max(hi - lo, 1);
      var padInf = Math.max(3, 0.8 * span), padFin = Math.max(0.6, 0.12 * span);
      x0 = lo - (leftInf ? padInf : padFin);
      x1 = hi + (rightInf ? padInf : padFin);
    }
    var ys = [], k, N = 800;
    for (k = 0; k <= N; k++) {
      var x = x0 + (x1 - x0) * k / N;
      if (!inDomain(x, model.domain)) { continue; }
      var y = model.fns.f(x);
      if (isNum(y)) { ys.push(y); }
    }
    ys.sort(function (p, q) { return p - q; });
    var y0, y1;
    if (ys.length) {
      y0 = ys[Math.floor(0.03 * (ys.length - 1))];
      y1 = ys[Math.ceil(0.97 * (ys.length - 1))];
    } else { y0 = -1; y1 = 1; }
    if (crit.length) {
      var cmin = Math.min.apply(null, crit.map(function (c) { return c.y; }));
      var cmax = Math.max.apply(null, crit.map(function (c) { return c.y; }));
      var crange = Math.max(cmax - cmin, 0.5), maxH = 14 * crange, mid = (cmin + cmax) / 2;
      if (y1 - y0 > maxH) { y0 = Math.max(y0, mid - maxH / 2); y1 = Math.min(y1, mid + maxH / 2); }
      y0 = Math.min(y0, cmin); y1 = Math.max(y1, cmax);
    }
    if (!(y1 - y0 > 1e-9)) { y0 -= 1; y1 += 1; }
    var padY = 0.12 * (y1 - y0);
    return { x0: x0, x1: x1, y0: y0 - padY, y1: y1 + padY, crit: crit };
  }

  function drawPlot(ctx, W, H, model) {
    var v = computeView(model), L = 44, R = 12, T = 12, B = 26;
    var pw = W - L - R, ph = H - T - B;
    function X(x) { return L + (x - v.x0) / (v.x1 - v.x0) * pw; }
    function Y(y) { return T + (v.y1 - y) / (v.y1 - v.y0) * ph; }
    ctx.save();
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, W, H);
    ctx.font = "11px Arial, Helvetica, sans-serif";
    var sx = niceStep((v.x1 - v.x0) / 6), sy = niceStep((v.y1 - v.y0) / 5), t, tk;
    ctx.lineWidth = 1; ctx.strokeStyle = "#e4e8f1"; ctx.fillStyle = "#5b6784";
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    for (t = Math.ceil(v.x0 / sx); t * sx <= v.x1; t++) {
      tk = t * sx;
      ctx.beginPath(); ctx.moveTo(X(tk), T); ctx.lineTo(X(tk), T + ph); ctx.stroke();
      ctx.fillText(fmt(Math.round(tk * 1e6) / 1e6), X(tk), T + ph + 6);
    }
    ctx.textAlign = "right"; ctx.textBaseline = "middle";
    for (t = Math.ceil(v.y0 / sy); t * sy <= v.y1; t++) {
      tk = t * sy;
      ctx.beginPath(); ctx.moveTo(L, Y(tk)); ctx.lineTo(L + pw, Y(tk)); ctx.stroke();
      ctx.fillText(fmt(Math.round(tk * 1e6) / 1e6), L - 6, Y(tk));
    }
    ctx.strokeStyle = "#8a94ad"; ctx.lineWidth = 1.3;
    ctx.strokeRect(L, T, pw, ph);
    ctx.beginPath(); ctx.rect(L, T, pw, ph); ctx.clip();
    ctx.strokeStyle = "#5b6784"; ctx.lineWidth = 1.6;
    if (v.x0 < 0 && v.x1 > 0) { ctx.beginPath(); ctx.moveTo(X(0), T); ctx.lineTo(X(0), T + ph); ctx.stroke(); }
    if (v.y0 < 0 && v.y1 > 0) { ctx.beginPath(); ctx.moveTo(L, Y(0)); ctx.lineTo(L + pw, Y(0)); ctx.stroke(); }
    ctx.strokeStyle = "#e0a3a3"; ctx.lineWidth = 1.4; ctx.setLineDash([6, 4]);
    model.intervals.forEach(function (an) {
      if (an.error) { return; }
      var last = an.pts.length - 1;
      [0, last].forEach(function (idx) {
        var p = an.pts[idx], val = an.vals[idx];
        if (!val) { return; }
        if (isFinite(p) && val.t === "inf") {
          ctx.beginPath(); ctx.moveTo(X(p), T); ctx.lineTo(X(p), T + ph); ctx.stroke();
        } else if (!isFinite(p) && val.t === "val") {
          ctx.beginPath(); ctx.moveTo(L, Y(val.v)); ctx.lineTo(L + pw, Y(val.v)); ctx.stroke();
        }
      });
    });
    ctx.setLineDash([]);
    ctx.strokeStyle = "#1a6bff"; ctx.lineWidth = 2.4; ctx.lineJoin = "round"; ctx.lineCap = "round";
    var N = Math.max(400, Math.round(pw * 1.5)), pen = false, prevY = 0, k;
    ctx.beginPath();
    for (k = 0; k <= N; k++) {
      var x = v.x0 + (v.x1 - v.x0) * k / N, y = inDomain(x, model.domain) ? model.fns.f(x) : NaN;
      if (!isNum(y)) { pen = false; continue; }
      if (pen && Math.abs(y - prevY) > 3 * (v.y1 - v.y0)) { pen = false; }
      if (pen) { ctx.lineTo(X(x), Y(y)); } else { ctx.moveTo(X(x), Y(y)); pen = true; }
      prevY = y;
    }
    ctx.stroke();
    ctx.fillStyle = "#e03a3a";
    v.crit.forEach(function (c) { ctx.beginPath(); ctx.arc(X(c.x), Y(c.y), 4, 0, 2 * Math.PI); ctx.fill(); });
    ctx.restore();
  }

  /* ---------- Affichage dans la page ---------- */
  function injectCss() {
    if (!root.document || root.document.getElementById("ms-css")) { return; }
    var st = root.document.createElement("style");
    st.id = "ms-css";
    st.textContent =
      ".ms-card{margin:10px 12px;background:#fff;border:1px solid #d5dbe8;border-radius:14px;padding:12px 14px;font-family:sans-serif;color:#222}" +
      ".ms-ttl{font-size:16px;font-weight:bold;color:#1c2333;margin:0 0 8px}" +
      ".ms-sub{font-size:14px;font-weight:bold;color:#1c2333;margin:14px 0 6px}" +
      ".ms-canvas{display:block;width:100%;border:1px solid #e4e8f1;border-radius:10px;background:#fff}" +
      ".ms-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}" +
      ".ms-note{font-size:12px;color:#5b6784;margin-top:6px}" +
      ".ms-warn{font-size:13px;color:#8a4b00;background:#fff4e0;border:1px solid #f0c987;border-radius:8px;padding:6px 8px;margin-top:8px}";
    root.document.head.appendChild(st);
  }

  function fitSvg(box) {
    var svg = box.firstChild;
    if (!svg || !svg.getAttribute) { return; }
    var W = Number(svg.getAttribute("width")), H = Number(svg.getAttribute("height")), avail = box.clientWidth;
    if (!(W > 0) || !(avail > 0) || avail >= W) { return; }
    var k = Math.max(0.78, avail / W);
    svg.setAttribute("width", String(Math.round(W * k)));
    svg.setAttribute("height", String(Math.round(H * k)));
  }

  var redraws = [];
  function renderInto(container, funcs) {
    injectCss();
    var doc = root.document;
    funcs.forEach(function (fn) {
      var name = fn.name || "f", card = doc.createElement("div");
      card.className = "ms-card";
      var title = doc.createElement("div");
      title.className = "ms-ttl";
      title.textCo