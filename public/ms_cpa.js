/* MathSolver - Copie : le devoir (questions, bouton Réponse, chrono, pause), puis la copie corrigée comme à l'école */
(function (w) {
  "use strict";
  if (w.MSCPA) { return; }
  var D = document, app = D.getElementById("app"), dv = null, IT = [], H = null, tk = 0, on = false;
  function e(s) { return w.MSAC.esc(s); }
  function tx(s) { return w.MSCOV ? w.MSCOV.tx(s) : e(s); }
  function mm(s) { s = Math.max(0, s); var m = Math.floor(s / 60), r = s % 60; return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r; }
  function A(i) { return dv.ans[i] || { L: [], f: -1 }; }
  function done(i) { return A(i).f >= 0; }
  function ansHTML(a) { return '<div class="eans">' + a.L.map(function (l, j) { return '<div class="' + (j === a.f ? "fin" : "l") + '">' + w.MSCPB.pr(l) + "</div>"; }).join("") + "</div>"; }
  function page() {
    var s = '<div class="ac xs cp"><div class="ach"><button class="bkb" id="home" aria-label="Retour"></button><b class="ht">' + e(dv.ttl) + "</b></div>";
    s += '<div class="evbar"><span class="evp">' + (dv.type === "d" ? "Devoir surveillé" : "Interrogation") + '</span><span class="evp">Sur 20</span><button class="clk" data-cp="pause" aria-label="Mettre en pause"><svg class="xi" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg><span id="evclk">' + mm(dv.left) + "</span></button></div>";
    s += '<p class="esub">Réponds dans l\'ordre que tu veux. Ton travail est enregistré à chaque ligne.</p>';
    IT.forEach(function (it, i) {
      s += '<article class="evq" id="evq' + i + '"><div class="eqh"><b>Question ' + (i + 1) + " · " + dv.qs[i].p + " pt" + (dv.qs[i].p > 1 ? "s" : "") + '</b><span class="evst ' + (done(i) ? 'done">Répondu' : 'todo">À faire') + '</span></div><div class="eqt">' + tx(it.t) + "</div>";
      s += done(i) ? ansHTML(A(i)) + '<button class="sb2" data-cp="ans" data-v="' + i + '">Modifier ma réponse</button>' : '<button class="pb" data-cp="ans" data-v="' + i + '">' + (A(i).L.length ? "Continuer ma réponse" : "Réponse") + "</button>";
      s += "</article>";
    });
    s += '<button class="pb" data-cp="end">Rendre ma copie</button></div>';
    app.innerHTML = s;
  }
  function tick() {
    clearInterval(tk);
    tk = setInterval(function () {
      if (!on || dv.paused) { return; }
      dv.left--;
      var c = D.getElementById("evclk");
      if (c) { c.textContent = mm(dv.left); }
      if (dv.left % 10 === 0) { H.save(dv); }
      if (dv.left <= 0) { try { w.MSCPB.close(); } catch (x) { } sub(true); }
    }, 1000);
  }
  function answer(i) {
    var s = "", it = IT[i];
    IT.forEach(function (o, j) {
      if (j < i) { s += '<div class="xq"><b>Question ' + (j + 1) + "</b>" + tx(o.t) + (done(j) ? '<div class="xr">Résultat : <span>' + w.MSCPB.pr(A(j).L[A(j).f]) + "</span></div>" : '<div class="xn">Pas encore répondue</div>') + "</div>"; }
    });
    s += '<div class="xq cur"><b>Question ' + (i + 1) + " · " + dv.qs[i].p + " pts</b>" + tx(it.t) + "</div>";
    w.MSCPB.open({ title: "Question " + (i + 1) + " sur " + IT.length, sub: dv.ttl, ctx: s, lines: A(i).L.length ? A(i).L : [""], clock: function () { return mm(dv.left); },
      onChange: function (L) { dv.ans[i] = { L: L, f: -1 }; H.save(dv); },
      onValid: function (L, f) { dv.ans[i] = { L: L, f: f }; H.save(dv); page(); var nx = IT.findIndex(function (o, j) { return !done(j); }); go(nx); try { w.MSAC.toast(nx >= 0 ? "Réponse enregistrée. Question " + (nx + 1) + " ensuite." : "Toutes les questions ont une réponse. Relis, puis rends ta copie."); } catch (x) { } },
      onClose: function () { page(); go(i); } });
  }
  function go(i) { var el = i >= 0 ? D.getElementById("evq" + i) : null; if (el) { el.scrollIntoView({ block: "center" }); } else { w.scrollTo(0, 0); } }
  function sheet(h) { var v = D.createElement("div"); v.className = "xveil"; v.id = "xveil"; v.innerHTML = '<div class="xsh" role="dialog">' + h + "</div>"; v.onclick = function (ev) { if (ev.target === v) { v.remove(); } }; D.body.appendChild(v); }
  function shx() { var v = D.getElementById("xveil"); if (v) { v.remove(); } }
  function ask() {
    var miss = IT.map(function (o, i) { return i; }).filter(function (i) { return !done(i); }).map(function (i) { return i + 1; });
    sheet("<h3>Rendre ta copie ?</h3><p>" + (miss.length ? "Sans réponse : question" + (miss.length > 1 ? "s " : " ") + miss.join(", ") + "." : "Toutes les questions ont une réponse.") + ' Une fois rendue, ta copie ne peut plus être modifiée.</p><div class="xrow"><button class="xbt sec" data-cp="shx">Relire encore</button><button class="xbt pri" data-cp="sub">Rendre</button></div>');
  }
  function appr(n) { return n >= 18 ? "Excellent travail !" : n >= 16 ? "Très bien." : n >= 14 ? "Bien, continue." : n >= 12 ? "Assez bien." : n >= 10 ? "Passable : revois les points faibles." : n >= 7 ? "Insuffisant : il faut retravailler." : "Très insuffisant : reprends le cours et les exercices."; }
  // correction officielle (corrigé et barème), hors ligne
  function sub(late) {
    shx(); clearInterval(tk); on = false;
    var n = 0, res = [];
    IT.forEach(function (it, i) {
      var a = A(i), ok = a.f >= 0 && w.MSCK.check(it.a, a.L[a.f]);
      res.push({ g: it.g.id, ch: dv.qs[i].ch, ok: ok, p: dv.qs[i].p });
      if (ok) { n += dv.qs[i].p; }
      w.MSPRG.rec(it.g.id, ok, 2);
    });
    dv.done = 1; dv.note = n; dv.res = res;
    H.done(dv);
    bulletin(late);
  }
  function bulletin(late) {
    var s = '<div class="ac xs cp"><div class="ach"><button class="bkb" id="home" aria-label="Retour"></button><b class="ht">Copie corrigée</b></div>', weak = [];
    s += '<div class="evnote"><b>' + dv.note + '/20</b><span><em>' + appr(dv.note) + "</em>" + e(dv.ttl) + (late ? " · temps écoulé" : "") + "</span></div>";
    s += '<p class="esub">Note indicative : hors ligne, l\'appli vérifie la réponse finale de chaque question avec le corrigé officiel.</p>';
    IT.forEach(function (it, i) {
      var r = dv.res[i], a = A(i);
      if (!r.ok && weak.indexOf(it.g.id) < 0) { weak.push(it.g.id); }
      s += '<article class="evq cq"><div class="mk">' + (r.ok ? r.p : 0) + "<small>/" + r.p + '</small></div><div class="eqh"><b>Question ' + (i + 1) + "</b>" + (r.ok ? '<span class="evok">Juste</span>' : '<span class="evko">' + (a.f >= 0 ? "Faux" : "Sans réponse") + "</span>") + '</div><div class="eqt">' + tx(it.t) + "</div>" + (a.L.length ? ansHTML(a) : "");
      s += "<details><summary>Voir le corrigé</summary>" + it.s.map(function (l) { return "<p>" + tx(l) + "</p>"; }).join("") + "<p>Réponse attendue : <b>" + e(it.r) + "</b></p></details></article>";
    });
    if (weak.length) {
      s += '<h3 class="gh">À retravailler</h3>';
      weak.forEach(function (id) { var g = w.MSGX.byId(id), c = dv.qs.filter(function (q) { return q.g === id; })[0].ch; s += '<div class="evw"><b>' + e(g.n) + '</b><div class="row2"><button data-cp="train" data-v="' + id + '" data-c="' + c + '">S\'entraîner</button><button data-cp="cours">Revoir le cours</button></div></div>'; });
    }
    s += '<button class="pb" data-cp="new">Nouvelle évaluation</button></div>';
    app.innerHTML = s;
    w.scrollTo(0, 0);
  }
  function pause(p) {
    dv.paused = p; H.save(dv);
    var z = D.getElementById("evpz");
    if (p && !z) { z = D.createElement("div"); z.id = "evpz"; z.className = "xB"; z.innerHTML = '<div class="xwr" style="justify-content:center;align-items:center;text-align:center;gap:12px;padding:16px"><b style="font-size:20px">Devoir en pause</b><p class="esub">L\'énoncé est caché pendant la pause.<br>Temps restant : ' + mm(dv.left) + '</p><button class="pb" data-cp="resume" style="max-width:280px">Reprendre</button></div>'; D.body.appendChild(z); }
    if (!p && z) { z.remove(); }
  }
  D.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target.closest("#home") : null;
    if (!t || !D.querySelector("#app .cp")) { return; }
    ev.stopImmediatePropagation(); ev.preventDefault();
    on = false; clearInterval(tk);
    if (D.getElementById("evpz")) { D.getElementById("evpz").remove(); }
    if (!dv.done) { H.save(dv); try { w.MSAC.toast("Ton devoir est enregistré : tu pourras le reprendre."); } catch (x) { } }
    H.quit();
  }, true);
  D.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("[data-cp]") : null, a;
    if (!b) { return; }
    a = b.getAttribute("data-cp");
    if (a === "ans") { answer(+b.getAttribute("data-v")); }
    else if (a === "end") { ask(); }
    else if (a === "shx") { shx(); }
    else if (a === "sub") { sub(false); }
    else if (a === "pause") { pause(true); }
    else if (a === "resume") { pause(false); }
    else if (a === "train") { H.train(+b.getAttribute("data-c"), b.getAttribute("data-v")); }
    else if (a === "cours") { H.cours(); }
    else if (a === "new") { H.quit(); }
  });
  // d : devoir (enregistré), items : exercices régénérés, h : { save, done, quit, train, cours }
  function show(d, items, h) {
    dv = d; IT = items; H = h; on = true;
    if (dv.done) { bulletin(false); return; }
    page(); w.scrollTo(0, 0); tick();
    if (dv.paused) { pause(true); }
  }
  w.MSCPA = { show: show, stop: function () { on = false; clearInterval(tk); } };
})(window);
