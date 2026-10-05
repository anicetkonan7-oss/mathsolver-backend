/* MathSolver - Cours : outils de figure en plus (aire sous une courbe, vecteur avec flèche), hors ligne */
/* Z "expression" a b [style] : aire entre la courbe et l'axe des abscisses, de x = a à x = b */
/* V A B [style] : vecteur de A vers B (segment + pointe de flèche) */
(function (w) {
  "use strict";
  var F = w.MSCOF, M = Math;
  if (!F || F.plus) { return; }
  function r(v) { return M.round(v * 1000) / 1000; }
  // même filtre que le moteur : seulement x, nombres, + - * / ^ ( ) et quelques fonctions
  function fx(s) {
    if (/[^0-9a-z.+\-*\/^() ]/i.test(s) || (s.match(/[a-z]+/gi) || []).some(function (m) { return !/^(x|sqrt|abs|sin|cos|tan|exp|log|PI)$/.test(m); })) { return null; }
    try { return new Function("x", "return " + s.replace(/\^/g, "**").replace(/[a-z]+/gi, function (m) { return m === "x" ? "x" : "Math." + m; })); } catch (x) { return null; }
  }
  function rewrite(src) {
    var L = String(src).split(";"), P = {}, b = [1e9, 1e9, -1e9, -1e9], o = [], n = 0;
    L.forEach(function (l) {
      var a = l.match(/"[^"]*"|\S+/g) || [];
      if (a[0] === "P" || a[0] === "p") { P[a[1]] = [+a[2], +a[3]]; b = [M.min(b[0], +a[2]), M.min(b[1], +a[3]), M.max(b[2], +a[2]), M.max(b[3], +a[3])]; }
      else if (a[0] === "X") { b = [M.min(b[0], +a[1]), M.min(b[1], +a[3]), M.max(b[2], +a[2]), M.max(b[3], +a[4])]; }
    });
    L.forEach(function (l) {
      var a = l.match(/"[^"]*"|\S+/g) || [], f, s, i, x, y, nm = [], u, v, d, h, k;
      if (a[0] === "Z" && (f = fx(a[1].replace(/^"|"$/g, "")))) {
        s = a.slice(4).join(" ");
        for (i = 0; i <= 48; i++) {
          x = +a[2] + (a[3] - a[2]) * i / 48; y = f(x);
          if (!isFinite(y)) { continue; }
          y = M.max(b[1], M.min(b[3], y));
          o.push("p _z" + n + "_" + i + " " + r(x) + " " + r(y)); nm.push("_z" + n + "_" + i);
        }
        o.push("p _z" + n + "a " + r(+a[3]) + " 0", "p _z" + n + "b " + r(+a[2]) + " 0");
        o.push("G " + nm.join(" ") + " _z" + n + "a _z" + n + "b " + (s || "c1"));
        n++;
      } else if (a[0] === "V" && P[a[1]] && P[a[2]]) {
        u = P[a[1]]; v = P[a[2]]; s = a.slice(3).join(" ");
        d = M.hypot(v[0] - u[0], v[1] - u[1]) || 1;
        h = M.min(d * 0.3, M.max(b[2] - b[0], b[3] - b[1]) * 0.045); k = [(v[0] - u[0]) / d, (v[1] - u[1]) / d];
        o.push("S " + a[1] + " " + a[2] + " " + s);
        o.push("p _v" + n + "a " + r(v[0] - h * k[0] - h * 0.5 * k[1]) + " " + r(v[1] - h * k[1] + h * 0.5 * k[0]));
        o.push("p _v" + n + "b " + r(v[0] - h * k[0] + h * 0.5 * k[1]) + " " + r(v[1] - h * k[1] - h * 0.5 * k[0]));
        o.push("S " + a[2] + " _v" + n + "a " + s, "S " + a[2] + " _v" + n + "b " + s);
        n++;
      } else { o.push(l); }
    });
    return o.join(";");
  }
  var base = F.svg;
  F.plus = rewrite;
  F.svg = function (s) { return /(^|;)\s*[ZV]\s/.test(s) ? base(rewrite(s)) : base(s); };
})(window);
