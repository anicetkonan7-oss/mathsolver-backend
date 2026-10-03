/* MathSolver - animations de fête : confettis (désactivés si l'appareil demande moins d'animations) */
(function (w) {
  "use strict";
  var D = document, COL = ["#1a62e8", "#e8590c", "#2b8a3e", "#f59f00", "#c2255c", "#0b7285"];
  function confetti() {
    var c, x, W, H, p = [], i, t0 = Date.now(), R = w.requestAnimationFrame;
    try { if (w.matchMedia && w.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; } } catch (e) { }
    if (!R || !D.body) { return; }
    c = D.createElement("canvas");
    c.className = "cvs";
    W = c.width = w.innerWidth;
    H = c.height = w.innerHeight;
    x = c.getContext("2d");
    if (!x) { return; }
    D.body.appendChild(c);
    for (i = 0; i < 90; i++) {
      p.push({ x: W * (0.2 + 0.6 * Math.random()), y: H * 0.35, vx: (Math.random() - 0.5) * 9, vy: -4 - Math.random() * 9, s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: COL[i % COL.length] });
    }
    (function tick() {
      var k, q, a = (Date.now() - t0) / 2400;
      if (a >= 1) { if (c.parentNode) { c.parentNode.removeChild(c); } return; }
      x.clearRect(0, 0, W, H);
      x.globalAlpha = a > 0.7 ? (1 - a) / 0.3 : 1;
      for (k = 0; k < p.length; k++) {
        q = p[k];
        q.vy += 0.28; q.vx *= 0.99; q.x += q.vx; q.y += q.vy; q.r += q.vr;
        x.save();
        x.translate(q.x, q.y);
        x.rotate(q.r);
        x.fillStyle = q.c;
        x.fillRect(-q.s / 2, -q.s / 4, q.s, q.s / 2);
        x.restore();
      }
      R(tick);
    })();
  }
  w.MSFUN = { confetti: confetti };
})(window);