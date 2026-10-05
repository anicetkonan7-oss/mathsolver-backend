/* MathSolver - Cours : moteur des figures (géométrie, angles, repère, courbes) en SVG, hors ligne */
(function (w) {
  "use strict";
  if (w.MSCOF) { return; }
  var W = 320, HM = 240, PX = 46, PY = 30, M = Math;
  var POS = { n: [0, -1], s: [0, 1], e: [1, 0], o: [-1, 0], ne: [0.8, -0.8], no: [-0.8, -0.8], se: [0.8, 0.8], so: [-0.8, 0.8] };
  function e(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function r(v) { return Math.round(v * 10) / 10; }
  function pa(c, d) { return '<path class="' + c + '" d="' + d + '"/>'; }
  function pt(x, y) { return r(x) + " " + r(y); }
  function q(s) { return s && s.charAt(0) === '"' ? s.slice(1, -1) : s; }
  // style : c1 à c4 couleurs, b épais, d pointillés, - étiquette de l'autre côté
  function st(a) { var o = { k: "", b: 0, d: 0, f: 0 }; a.forEach(function (t) { if (/^c[1-4]$/.test(t)) { o.k = " qk" + t.charAt(1); } else if (t === "b") { o.b = 1; } else if (t === "d") { o.d = 1; } else if (t === "-") { o.f = 1; } }); return o; }
  function cl(o, c) { return c + o.k + (o.b ? " qb" : "") + (o.d ? " qd" : ""); }
  // courbe : x, nombres, + - * / ^ ( ) et sqrt abs sin cos tan exp log PI
  function fx(s) {
    if (/[^0-9a-z.+\-*\/^() ]/i.test(s) || (s.match(/[a-z]+/gi) || []).some(function (m) { return !/^(x|sqrt|abs|sin|cos|tan|exp|log|PI)$/.test(m); })) { return null; }
    try { return new Function("x", "return " + s.replace(/\^/g, "**").replace(/[a-z]+/gi, function (m) { return m === "x" ? "x" : "Math." + m; })); } catch (x) { return null; }
  }

  function svg(src) {
    var P = {}, C = [], b = [1e9, 1e9, -1e9, -1e9], o = "", z = "", k, X, Y, H, cx = 0, cy = 0, n = 0;
    function grow(x, y) { b[0] = M.min(b[0], x); b[1] = M.min(b[1], y); b[2] = M.max(b[2], x); b[3] = M.max(b[3], y); }
    String(src).split(";").forEach(function (l) {
      var a = l.match(/"[^"]*"|\S+/g);
      if (!a) { return; }
      var c = { c: a[0], a: a.slice(1) };
      C.push(c);
      if (c.c === "P" || c.c === "p") { P[c.a[0]] = [+c.a[1], +c.a[2]]; grow(+c.a[1], +c.a[2]); if (c.c === "P") { cx += +c.a[1]; cy += +c.a[2]; n++; } }
      else if (c.c === "C" && P[c.a[0]]) { grow(P[c.a[0]][0] - c.a[1], P[c.a[0]][1] - c.a[1]); grow(P[c.a[0]][0] + +c.a[1], P[c.a[0]][1] + +c.a[1]); }
      else if (c.c === "L") { grow(+c.a[0], +c.a[1]); }
      else if (c.c === "X") { grow(+c.a[0], +c.a[2]); grow(+c.a[1], +c.a[3]); }
    });
    if (b[0] > b[2]) { return ""; }
    k = M.min((W - 2 * PX) / M.max(b[2] - b[0], 0.1), (HM - 2 * PY) / M.max(b[3] - b[1], 0.1));
    H = M.round((b[3] - b[1]) * k + 2 * PY);
    X = function (x) { return r((W - (b[2] - b[0]) * k) / 2 + (x - b[0]) * k); };
    Y = function (y) { return r(PY + (b[3] - y) * k); };
    cx = n ? X(cx / n) : W / 2; cy = n ? Y(cy / n) : H / 2;
    function xy(p) { return [X(P[p][0]), Y(P[p][1])]; }
    function tx(x, y, t, c, a) { return '<text class="' + c + '" x="' + r(x) + '" y="' + r(y) + '"' + ' text-anchor="' + a + '">' + e(t) + "</text>"; }
    C.forEach(function (c) {
      var a = c.a, g = c.c, s, p, u, v, m, d, f, i, L;
      try {
      if (g === "X") {
        for (i = M.ceil(+a[0]); i <= +a[1]; i++) { o += pa("qgr", "M" + X(i) + " " + Y(+a[2]) + "V" + Y(+a[3])); if (i) { o += tx(X(i), Y(0) + 15, i, "qtg", "middle"); } }
        for (i = M.ceil(+a[2]); i <= +a[3]; i++) { o += pa("qgr", "M" + X(+a[0]) + " " + Y(i) + "H" + X(+a[1])); if (i) { o += tx(X(0) - 6, Y(i) + 4, i, "qtg", "end"); } }
        o += pa("qs qax", "M" + X(+a[0]) + " " + Y(0) + "H" + X(+a[1]) + "M" + X(0) + " " + Y(+a[2]) + "V" + Y(+a[3])) + tx(X(0) - 6, Y(0) + 15, "O", "qtg", "end");
      } else if (g === "F") {
        f = fx(q(a[0])); s = st(a.slice(3)); d = "";
        for (i = 0; f && i <= 120; i++) { u = +a[1] + (a[2] - a[1]) * i / 120; v = f(u); m = isFinite(v) && v >= b[1] && v <= b[3]; d += m ? (d && L ? "L" : "M") + X(u) + " " + Y(v) : ""; L = m; }
        o += pa(cl(s, "qs"), d);
      } else if (g === "S" || g === "G") {
        p = g === "S" ? a.slice(0, 2) : a.filter(function (t) { return P[t]; });
        s = st(a.slice(p.length));
        o += pa(cl(s, g === "G" ? "qs qg" : "qs"), "M" + p.map(function (t) { return xy(t).join(" "); }).join("L") + (g === "G" ? "Z" : ""));
      } else if (g === "R") {
        p = xy(a[1]); u = xy(a[0]); v = xy(a[2]);
        u = [u[0] - p[0], u[1] - p[1]]; v = [v[0] - p[0], v[1] - p[1]];
        m = 11 / M.hypot(u[0], u[1]); d = 11 / M.hypot(v[0], v[1]);
        o += pa("qs qra", "M" + pt(p[0] + u[0] * m, p[1] + u[1] * m) + "l" + pt(v[0] * d, v[1] * d) + "l" + pt(-u[0] * m, -u[1] * m));
      } else if (g === "T" || g === "K") {
        u = xy(a[0]); v = xy(a[1]); s = st(a.slice(3));
        m = [(u[0] + v[0]) / 2, (u[1] + v[1]) / 2]; L = M.hypot(v[0] - u[0], v[1] - u[1]);
        d = [(u[1] - v[1]) / L, (v[0] - u[0]) / L];
        if ((m[0] - cx) * d[0] + (m[1] - cy) * d[1] < 0) { d = [-d[0], -d[1]]; }
        if (s.f) { d = [-d[0], -d[1]]; }
        if (g === "K") { for (i = 0; i < +a[2]; i++) { f = (i - (a[2] - 1) / 2) * 4; p = [m[0] + (v[0] - u[0]) / L * f, m[1] + (v[1] - u[1]) / L * f]; o += pa("qs", "M" + pt(p[0] - d[0] * 6, p[1] - d[1] * 6) + "l" + pt(d[0] * 12, d[1] * 12)); } }
        else { o += tx(m[0] + d[0] * 13, m[1] + d[1] * 13 + 5, q(a[2]), cl(s, "qtl"), M.abs(d[0]) > 0.3 ? (d[0] > 0 ? "start" : "end") : "middle"); }
      } else if (g === "Q") {
        p = xy(a[1]); u = xy(a[0]); v = xy(a[2]); s = st(a.slice(3));
        u = M.atan2(u[1] - p[1], u[0] - p[0]); v = M.atan2(v[1] - p[1], v[0] - p[0]);
        d = v - u; d += d > M.PI ? -2 * M.PI : d < -M.PI ? 2 * M.PI : 0; f = u + d / 2;
        o += pa(cl(s, "qs"), "M" + pt(p[0] + 20 * M.cos(u), p[1] + 20 * M.sin(u)) + "A20 20 0 0 " + (d > 0 ? 1 : 0) + " " + pt(p[0] + 20 * M.cos(v), p[1] + 20 * M.sin(v)));
        L = a.filter(function (t) { return t.charAt(0) === '"'; })[0];
        if (L) { o += tx(p[0] + 36 * M.cos(f), p[1] + 36 * M.sin(f) + 5, q(L), cl(s, "qtl"), "middle"); }
      } else if (g === "C") {
        p = xy(a[0]); s = st(a.slice(2));
        o += '<circle class="' + cl(s, "qs") + '" cx="' + p[0] + '" cy="' + p[1] + '" r="' + r(a[1] * k) + '"/>';
      } else if (g === "L") {
        s = st(a.slice(3));
        o += tx(X(+a[0]), Y(+a[1]) + 5, q(a[2]), cl(s, "qtl"), "middle");
      } else if (g === "P") {
        p = xy(a[0]); d = POS[a[3]];
        if (!d) { d = [p[0] - cx, p[1] - cy]; L = M.hypot(d[0], d[1]) || 1; d = [d[0] / L, d[1] / L]; }
        z += '<circle class="qpt" cx="' + p[0] + '" cy="' + p[1] + '" r="2.6"/>' + tx(p[0] + d[0] * 14, p[1] + d[1] * 14 + 5, a[0], "qtp", "middle");
      }
      } catch (x) { }
    });
    return '<svg viewBox="0 0 ' + W + " " + H + '" aria-hidden="true">' + o + z + "</svg>";
  }

  w.MSCOF = { svg: svg };
})(window);