/* MathSolver - Cours : diagrammes en barres et circulaires, dessinés en SVG, hors ligne */
/* BAR [couleur] ; "étiquette" valeur ; …   |   PIE ; "étiquette" valeur ; … */
(function (w) {
  "use strict";
  var F = w.MSCOF, W = 320, M = Math;
  if (!F || F.chart) { return; }
  function e(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function r(v) { return M.round(v * 10) / 10; }
  function tx(x, y, t, c, a) { return '<text class="' + c + '" x="' + r(x) + '" y="' + r(y) + '" text-anchor="' + (a || "middle") + '">' + e(t) + "</text>"; }
  function nb(v) { return String(r(v)).replace(".", ","); }
  function parse(s) {
    var p = String(s).split(";"), h = p.shift().match(/"[^"]*"|\S+/g) || [], d = [];
    p.forEach(function (l) { var a = l.match(/"[^"]*"|\S+/g); if (a && a.length > 1 && isFinite(+a[1])) { d.push([a[0].replace(/^"|"$/g, ""), +a[1]]); } });
    return { k: h[0], o: h.slice(1), d: d };
  }
  // barres : graduation automatique (1, 2, 5, 10, 20, 50…), valeur au-dessus de chaque barre
  function bar(c) {
    var d = c.d, n = d.length, mx = 0, st = 1, H = 240, L = 34, B = 52, T = 22, ph = H - T - B, top, sc, bw, i, o = "", y, x, h, k = "qk1";
    c.o.forEach(function (t) { if (/^c[1-6]$/.test(t)) { k = "qk" + t.charAt(1); } });
    d.forEach(function (v) { mx = M.max(mx, v[1]); });
    while (mx / st > 6) { st *= String(st).charAt(0) === "2" ? 2.5 : 2; }
    top = M.max(st, M.ceil(mx / st) * st); sc = ph / top; bw = (W - L - 8) / M.max(n, 1);
    for (i = 0; i <= top + 1e-9; i += st) { y = T + ph - i * sc; o += '<path class="qgr" d="M' + L + " " + r(y) + "H" + (W - 8) + '"/>' + tx(L - 6, y + 4, nb(i), "qtg", "end"); }
    d.forEach(function (v, j) {
      x = L + j * bw + bw * 0.18; h = v[1] * sc; y = T + ph - h;
      o += '<rect class="qbar ' + k + '" x="' + r(x) + '" y="' + r(y) + '" width="' + r(bw * 0.64) + '" height="' + r(h) + '" rx="3"/>';
      o += tx(x + bw * 0.32, y - 6, nb(v[1]), "qtl " + k) + tx(x + bw * 0.32, H - B + 18, v[0], "qtl");
    });
    o += '<path class="qs qax" d="M' + L + " " + T + "V" + (T + ph) + "H" + (W - 8) + '"/>';
    return '<svg viewBox="0 0 ' + W + " " + H + '" aria-hidden="true">' + o + "</svg>";
  }
  // circulaire : secteurs proportionnels, légende avec pourcentage et angle
  function pie(c) {
    var d = c.d, t = 0, a = -M.PI / 2, cx = 92, cy = 100, R = 80, H = 200, o = "", g = "", ly;
    d.forEach(function (v) { t += v[1]; });
    ly = M.max(22, cy - d.length * 16 + 8);
    d.forEach(function (v, j) {
      var b = a + v[1] / t * 2 * M.PI, k = "qk" + (j % 6 + 1), p = v[1] / t * 100;
      o += d.length === 1 ? '<circle class="qbar ' + k + '" cx="' + cx + '" cy="' + cy + '" r="' + R + '"/>' : '<path class="qbar ' + k + '" d="M' + cx + " " + cy + "L" + r(cx + R * M.cos(a)) + " " + r(cy + R * M.sin(a)) + "A" + R + " " + R + " 0 " + (b - a > M.PI ? 1 : 0) + " 1 " + r(cx + R * M.cos(b)) + " " + r(cy + R * M.sin(b)) + 'Z"/>';
      g += '<rect class="qbar ' + k + '" x="190" y="' + (ly + j * 32 - 11) + '" width="14" height="14" rx="3"/>' + tx(210, ly + j * 32, v[0], "qtl", "start") + tx(210, ly + j * 32 + 15, nb(p) + " % · " + nb(p * 3.6) + "°", "qtg", "start");
      a = b;
    });
    return '<svg viewBox="0 0 ' + W + " " + H + '" aria-hidden="true">' + o + g + "</svg>";
  }
  var base = F.svg;
  F.chart = function (s) { var c = parse(s); return c.k === "PIE" ? pie(c) : bar(c); };
  F.svg = function (s) { return /^\s*(BAR|PIE)\b/.test(s) ? F.chart(s) : base(s); };
})(window);