/* MathSolver - Cours : figure en plein écran (ouverte en entier ; toucher = zoom à cet endroit, pincer = zoom libre, glisser = déplacer) */
(function (w) {
  "use strict";
  if (w.MSCOZ) { return; }
  var D = document, Z = null, MO = null, sv = null, bx = null, s = 1, fw = 0, pz = 0, p0 = null;
  // n : échelle (1 = figure entière) ; vx, vy : point de l'écran qui reste sous le doigt
  // position de la figure dans la zone qui défile
  function off() { var a = sv.getBoundingClientRect(), b = bx.getBoundingClientRect(); return [a.left - b.left + bx.scrollLeft, a.top - b.top + bx.scrollTop, a.width, a.height]; }
  function size(n, vx, vy) {
    var o = off(), cx, cy;
    n = Math.max(1, Math.min(4, n));
    if (vx === undefined) { vx = bx.clientWidth / 2; vy = bx.clientHeight / 2; }
    cx = (bx.scrollLeft + vx - o[0]) / o[2];
    cy = (bx.scrollTop + vy - o[1]) / o[3];
    s = n;
    sv.style.width = Math.round(fw * n) + "px";
    o = off();
    bx.scrollLeft = cx * o[2] + o[0] - vx;
    bx.scrollTop = cy * o[3] + o[1] - vy;
  }
  function rel(t) { var r = bx.getBoundingClientRect(); return [t.clientX - r.left, t.clientY - r.top]; }
  function gap(a, b) { return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); }

  function open(f) {
    var o, c = f.querySelector("figcaption"), a = D.getElementById("app"), v;
    if (Z) { return; }
    Z = o = D.createElement("div");
    o.className = "cfz";
    o.innerHTML = '<button class="cfx" aria-label="Fermer"></button><div class="cfb"><div class="cfw">' + f.querySelector("svg").outerHTML + "</div>" + (c ? "<p>" + c.innerHTML + "</p>" : "") + '<small class="cfh">Touche la figure pour zoomer. Pince pour ajuster.</small></div>';
    D.body.appendChild(o);
    bx = o.querySelector(".cfw");
    sv = bx.querySelector("svg");
    // cadrage serré sur le dessin, pour qu'il occupe toute la largeur
    try { v = sv.getBBox(); v = [v.x - 14, v.y - 14, v.width + 28, v.height + 28]; sv.setAttribute("viewBox", v.map(Math.round).join(" ")); } catch (x) { }
    v = (sv.getAttribute("viewBox") || "0 0 1 1").split(" ");
    // taille « figure entière » : toute la largeur, sans dépasser la hauteur disponible
    fw = Math.min(bx.clientWidth, w.innerHeight * 0.68 * v[2] / v[3]);
    s = 1;
    sv.style.width = Math.round(fw) + "px";
    bx.addEventListener("touchstart", function (ev) {
      if (ev.touches.length === 2) { p0 = [gap(ev.touches[0], ev.touches[1]), s]; }
    }, { passive: true });
    bx.addEventListener("touchmove", function (ev) {
      var m;
      if (ev.touches.length !== 2 || !p0) { return; }
      m = rel({ clientX: (ev.touches[0].clientX + ev.touches[1].clientX) / 2, clientY: (ev.touches[0].clientY + ev.touches[1].clientY) / 2 });
      size(p0[1] * gap(ev.touches[0], ev.touches[1]) / p0[0], m[0], m[1]);
      pz = Date.now();
    }, { passive: true });
    bx.addEventListener("touchend", function (ev) { if (ev.touches.length < 2) { p0 = null; } }, { passive: true });
    o.offsetWidth;
    o.className = "cfz on";
    if (a && w.MutationObserver) { MO = new MutationObserver(function () { if (!D.body.contains(f)) { shut(); } }); MO.observe(a, { childList: true }); }
  }
  function shut() {
    var o = Z;
    Z = null; sv = null; bx = null; p0 = null;
    if (MO) { MO.disconnect(); MO = null; }
    if (!o) { return; }
    o.className = "cfz";
    setTimeout(function () { if (o.parentNode) { o.parentNode.removeChild(o); } }, 180);
  }

  // retour (flèche ou bouton du téléphone) : ferme d'abord la figure agrandie
  w.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target.closest("#home") : null;
    if (t && Z) { ev.stopImmediatePropagation(); ev.preventDefault(); shut(); }
  }, true);
  D.addEventListener("click", function (ev) {
    var t = ev.target, m;
    if (!Z || !t.closest || !Z.contains(t)) { return; }
    if (t === Z || t.closest(".cfx")) { shut(); return; }
    // toucher la figure : zoom ×2,5 à cet endroit, ou retour à la figure entière
    if (t.closest("svg") && Date.now() - pz > 400) { m = rel(ev); size(s > 1.05 ? 1 : 2.5, m[0], m[1]); }
  });
  w.MSCOZ = { open: open, shut: shut };
})(window);