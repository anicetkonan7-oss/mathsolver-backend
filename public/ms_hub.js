/* MathSolver - accueil vivant : ta progression (niveau, jours d'affilée, objectif et défi du jour), « Continuer », « À revoir » ; confettis et badges */
(function (w) {
  "use strict";
  if (w.MSHUB) { return; }
  var D = document, P = function () { return w.MSPRG; };
  var CSS = ".hub{margin:0 12px 12px;padding:14px;border-radius:18px;background:linear-gradient(135deg,#1a62e8,#5b3fd6);color:#fff;}" +
    ".hb1{display:flex;align-items:center;gap:12px;}.hb1 svg{flex:none;width:58px;height:58px;}.hb1 .rg{fill:none;stroke:rgba(255,255,255,.25);stroke-width:6;}.hb1 .rv{fill:none;stroke:#ffd43b;stroke-width:6;stroke-linecap:round;transform:rotate(-90deg);transform-origin:50% 50%;}" +
    ".hb1 text{fill:#fff;font-size:13px;font-weight:800;text-anchor:middle;}.hbt{flex:1;min-width:0;line-height:1.3;}.hbt b{display:block;font-size:16.5px;}.hbt small{display:block;font-size:12.5px;opacity:.9;}" +
    ".hxp{display:block;height:6px;margin-top:6px;border-radius:6px;background:rgba(255,255,255,.25);overflow:hidden;}.hxp i{display:block;height:100%;border-radius:6px;background:#ffd43b;}" +
    ".hfl{flex:none;text-align:center;font-size:20px;font-weight:800;line-height:1;}.hfl small{display:block;margin-top:3px;font-size:10.5px;font-weight:700;opacity:.9;}" +
    ".hdf{display:flex;align-items:center;gap:10px;margin-top:12px;padding:9px 11px;border-radius:12px;background:rgba(255,255,255,.14);font-size:13px;line-height:1.35;}.hdf span{flex:1;min-width:0;}.hdf b{display:block;font-size:11px;letter-spacing:.06em;text-transform:uppercase;opacity:.85;}.hdf em{flex:none;font-style:normal;font-weight:800;}" +
    ".hbr{display:flex;gap:8px;margin-top:10px;}.hbr button{flex:1;min-width:0;min-height:42px;padding:6px 10px;border-radius:12px;background:#fff;color:#1741a6;font-size:13.5px;font-weight:800;line-height:1.25;text-align:left;}.hbr button small{display:block;font-size:11.5px;font-weight:600;color:#5b6784;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}" +
    ".hbr button.rv{color:#b4510a;}" +
    ".dk .yb{background:#2f6df0;}.dk .hub{background:linear-gradient(135deg,#1d3f8f,#3b2a8a);}.dk .hbr button{background:#0e1424;color:#a9c4ff;}.dk .hbr button.rv{color:#ffb070;}.dk .hbr button small{color:#93a2c4;}" +
    "#yay{position:fixed;inset:0;z-index:120;pointer-events:none;}.yb{position:fixed;left:50%;top:18%;z-index:121;transform:translateX(-50%);max-width:86%;padding:12px 18px;border-radius:16px;background:#0f1b33;color:#fff;font-size:15px;font-weight:700;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.25);animation:ybi .35s ease-out;pointer-events:none;}.yb small{display:block;margin-top:2px;font-size:12.5px;font-weight:600;opacity:.85;}" +
    "@keyframes ybi{from{opacity:0;transform:translate(-50%,-10px) scale(.95);}to{opacity:1;transform:translateX(-50%);}}@media (prefers-reduced-motion:reduce){.yb{animation:none;}}";
  function e(s) { return w.MSAC ? w.MSAC.esc(s) : String(s); }
  function name() { try { var n = w.MSAC.P().n || ""; return n.split(" ")[0]; } catch (x) { return ""; } }
  function ring(a, b) {
    var r = 24, c = 2 * Math.PI * r, p = Math.min(1, b ? a / b : 0);
    return '<svg viewBox="0 0 58 58" aria-label="Objectif du jour : ' + a + " sur " + b + ' exercices"><circle class="rg" cx="29" cy="29" r="' + r + '"/><circle class="rv" cx="29" cy="29" r="' + r + '" stroke-dasharray="' + (c * p).toFixed(1) + " " + c.toFixed(1) + '"/><text x="29" y="33">' + Math.min(a, b) + "/" + b + "</text></svg>";
  }
  // carte d'accueil (lv : niveau scolaire ; names : noms des chapitres si connus)
  function html(lv, names) {
    var M = P(), L, t, f, s, c, k, nm = name();
    if (!M) { return ""; }
    L = M.level(); t = M.today(); f = M.defi(); s = M.streak(); c = M.last(lv); k = M.weak(lv);
    var h = '<div class="hub" id="hub"><div class="hb1">' + ring(t.n, t.goal) + '<div class="hbt"><b>' + (nm ? "Salut " + e(nm) + " !" : "Salut !") + "</b><small>Niveau " + L.n + " · " + L.t + " · " + L.a + "/" + L.b + ' points</small><span class="hxp"><i style="width:' + L.p + '%"></i></span></div><div class="hfl">🔥 ' + s + "<small>jour" + (s > 1 ? "s" : "") + "</small></div></div>";
    h += '<div class="hdf"><span><b>Défi du jour</b>' + e(f.t) + "</span><em>" + (f.got ? "✓ +20" : f.a + "/" + f.b) + "</em></div>";
    if (c >= 0 || k) {
      h += '<div class="hbr">';
      if (c >= 0) { h += '<button data-hub="go" data-c="' + c + '">▶ Continuer<small>' + e(M.lastName(lv) || "Chapitre " + (c + 1)) + "</small></button>"; }
      if (k) { h += '<button class="rv" data-hub="rv" data-c="' + k.c + '" data-v="' + e(k.id) + '">↻ À revoir · ' + k.p + " %<small>" + e(k.n || "Chapitre " + (k.c + 1)) + "</small></button>"; }
      h += "</div>";
    } else {
      h += '<div class="hbr"><button data-hub="go" data-c="0">▶ Commencer mes exercices<small>' + "Chapitre 1" + "</small></button></div>";
    }
    return h + "</div>";
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
