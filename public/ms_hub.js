/* MathSolver - accueil vivant : ta progression (niveau, jours d'affilée, objectif et défi du jour), « Continuer », « À revoir » ; confettis et badges */
(function (w) {
  "use strict";
  if (w.MSHUB) { return; }
  var D = document, P = function () { return w.MSPRG; };
  var CSS = ".hub{margin:0 12px 14px;padding:12px;border-radius:18px;background:linear-gradient(135deg,#1a62e8,#5b3fd6);color:#fff;}" +
    ".hb1{display:flex;align-items:center;gap:10px;}.hb1 svg{flex:none;width:46px;height:46px;}.hb1 .rg{fill:none;stroke:rgba(255,255,255,.25);stroke-width:5;}.hb1 .rv{fill:none;stroke:#ffd43b;stroke-width:5;stroke-linecap:round;transform:rotate(-90deg);transform-origin:50% 50%;}" +
    ".hb1 text{fill:#fff;font-size:12px;font-weight:800;text-anchor:middle;}.hbt{flex:1;min-width:0;line-height:1.25;}.hbt b{display:block;font-size:15px;}.hbt small{display:block;font-size:11.5px;opacity:.9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}" +
    ".hxp{display:block;height:5px;margin-top:5px;border-radius:5px;background:rgba(255,255,255,.25);overflow:hidden;}.hxp i{display:block;height:100%;border-radius:5px;background:#ffd43b;}" +
    ".hfl{flex:none;text-align:center;line-height:1;}.hfl svg{width:20px;height:20px;fill:#ffd43b;}.hfl b{display:block;font-size:16px;}.hfl small{display:block;font-size:10px;font-weight:700;opacity:.9;}" +
    ".hdf{display:flex;align-items:center;gap:8px;margin-top:9px;padding:6px 10px;border-radius:10px;background:rgba(255,255,255,.14);font-size:12.5px;line-height:1.3;}.hdf span{flex:1;min-width:0;}.hdf b{font-size:10.5px;letter-spacing:.06em;opacity:.85;}.hdf em{flex:none;font-style:normal;font-weight:800;}" +
    ".hbr{display:flex;gap:8px;margin-top:9px;}.hbr button{flex:1 1 0;min-width:0;height:46px;display:flex;align-items:center;gap:8px;padding:0 9px;border-radius:12px;background:#fff;color:#0f1b33;text-align:left;font-family:inherit;}.hbr .pm{flex:1.25 1 0;}" +
    ".hbr .pl{flex:none;min-width:44px;height:30px;padding:0 6px;box-sizing:border-box;border-radius:9px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:800;font-style:normal;font-variant-numeric:tabular-nums;}" +
    ".hbr .tx{min-width:0;line-height:1.2;}.hbr .tx b{display:block;font-size:13px;}.hbr .tx small{display:block;font-size:11px;color:#5b6784;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}" +
    ".hbr .rv{color:#b4510a;}.hbr .rv svg{flex:none;width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}" +
    ".dk .yb{background:#2f6df0;}.dk .hub{background:linear-gradient(135deg,#1d3f8f,#3b2a8a);}.dk .hbr button{background:#0e1424;color:#eef2fb;}.dk .hbr .rv{color:#ffb070;}.dk .hbr .tx small{color:#93a2c4;}" +
    "#yay{position:fixed;inset:0;z-index:120;pointer-events:none;}.yb{position:fixed;left:50%;top:18%;z-index:121;transform:translateX(-50%);max-width:86%;padding:12px 18px;border-radius:16px;background:#0f1b33;color:#fff;font-size:15px;font-weight:700;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.25);animation:ybi .35s ease-out;pointer-events:none;}.yb small{display:block;margin-top:2px;font-size:12.5px;font-weight:600;opacity:.85;}" +
    "@keyframes ybi{from{opacity:0;transform:translate(-50%,-10px) scale(.95);}to{opacity:1;transform:translateX(-50%);}}@media (prefers-reduced-motion:reduce){.yb{animation:none;}}";
  function e(s) { return w.MSAC ? w.MSAC.esc(s) : String(s); }
    function ring(a, b) {
    var r = 19, c = 2 * Math.PI * r, p = Math.min(1, b ? a / b : 0);
    return '<svg viewBox="0 0 46 46" aria-label="Objectif du jour : ' + a + " sur " + b + ' exercices"><circle class="rg" cx="23" cy="23" r="' + r + '"/><circle class="rv" cx="23" cy="23" r="' + r + '" stroke-dasharray="' + (c * p).toFixed(1) + " " + c.toFixed(1) + '"/><text x="23" y="27.5">' + Math.min(a, b) + "/" + b + "</text></svg>";
  }
  var FIRE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c.6 3.4 3.4 5 4.6 7.6 1.3 2.9.5 6.6-2.2 8.3-2.9 1.9-7 1-8.5-2-1.2-2.4-.4-4.8 1.2-6.4.2 1.6 1 2.6 2.1 3-.5-3.6 1.1-7.1 2.8-10.5z"/></svg>';
  // carte « ma journée » : niveau, objectif, jours d'affilée, défi ; bouton prioritaire (pr) et « À revoir »
  // pr = { pill, bg, t, s, at (attributs du bouton), id (chrono) }
  function html(lv, pr) {
    var M = P(), L, t, f, s, k;
    if (!M) { return ""; }
    L = M.level(); t = M.today(); f = M.defi(); s = M.streak(); k = M.weak(lv);
    var h = '<div class="hub" id="hub"><div class="hb1">' + ring(t.n, t.goal) + '<div class="hbt"><b>Niveau ' + L.n + " · " + e(L.t) + "</b><small>" + L.a + " / " + L.b + ' points · objectif : 5 exercices</small><span class="hxp"><i style="width:' + Math.max(2, L.p) + '%"></i></span></div><div class="hfl">' + FIRE + "<b>" + s + "</b><small>jour" + (s > 1 ? "s" : "") + "</small></div></div>";
    h += '<div class="hdf"><b>DÉFI</b><span>' + e(f.t) + "</span><em>" + (f.got ? "✓ +20" : f.a + "/" + f.b) + "</em></div>";
    h += '<div class="hbr"><button class="pm" ' + pr.at + '><i class="pl" style="background:' + pr.bg + '"' + (pr.id ? ' id="' + pr.id + '"' : "") + ">" + e(pr.pill) + '</i><span class="tx"><b>' + e(pr.t) + "</b><small>" + e(pr.s) + "</small></span></button>";
    if (k) { h += '<button class="rv" data-hub="rv" data-c="' + k.c + '" data-v="' + e(k.id) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5"/></svg><span class="tx"><b>À revoir</b><small>' + e(k.n || "Chapitre " + (k.c + 1)) + "</small></span></button>"; }
    return h + "</div></div>";
  }
  // fête : confettis, petite vibration, bandeau
  var cv = null;
  function confetti() {
    if (w.matchMedia && w.matchMedia("(prefers-reduced-motion: reduce)").matches) { return; }
    if (cv) { cv.remove(); }
    cv = D.createElement("canvas"); cv.id = "yay"; D.body.appendChild(cv);
    var x = cv.getContext("2d"), W = cv.width = w.innerWidth, H = cv.height = w.innerHeight, C = ["#1a62e8", "#ffd43b", "#e8590c", "#2b8a3e", "#c2255c", "#7048e8"], a = [], i, t0 = Date.now(), me = cv;
    if (!x) { return; }
    for (i = 0; i < 90; i++) { a.push({ x: W / 2 + (Math.random() - .5) * 60, y: H * .35, vx: (Math.random() - .5) * 9, vy: -Math.random() * 9 - 3, s: 4 + Math.random() * 5, c: C[i % C.length], r: Math.random() * 6 }); }
    (function fr() {
      if (cv !== me) { return; }
      var k = Date.now() - t0;
      x.clearRect(0, 0, W, H);
      a.forEach(function (p) { p.vy += .32; p.x += p.vx; p.y += p.vy; p.r += .2; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); });
      if (k < 1600) { w.requestAnimationFrame(fr); } else { me.remove(); if (cv === me) { cv = null; } }
    })();
  }
  function buzz() { try { if (navigator.vibrate) { navigator.vibrate(35); } } catch (x) { } }
  var bt = 0;
  function banner(t, s) {
    var b = D.querySelector(".yb");
    if (b) { b.remove(); }
    b = D.createElement("div"); b.className = "yb"; b.setAttribute("role", "status");
    b.innerHTML = e(t) + (s ? "<small>" + e(s) + "</small>" : "");
    D.body.appendChild(b);
    clearTimeout(bt); bt = setTimeout(function () { b.remove(); }, 2600);
  }
  // à appeler après un résultat : badges gagnés, niveau, défi réussi
  function check() {
    var M = P(), o;
    if (!M) { return; }
    o = M.news();
    if (o.b.length) { confetti(); buzz(); banner(o.b[0][1] + " Nouveau badge : " + o.b[0][2], o.b[0][3]); }
    else if (o.lv) { confetti(); buzz(); banner("🚀 Niveau " + o.lv + " atteint !", M.level().t); }
    else if (o.df) { confetti(); buzz(); banner("🎯 Défi du jour réussi !", "+20 points"); }
  }
  function yay(t, s) { confetti(); buzz(); if (t) { banner(t, s); } }
  var st = D.createElement("style"); st.id = "hubcss"; st.appendChild(D.createTextNode(CSS)); D.head.appendChild(st);
  w.MSHUB = { html: html };
  w.MSYAY = { go: yay, check: check, buzz: buzz };
})(window);
