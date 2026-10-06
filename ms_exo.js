/* MathSolver - espace Exercices : chapitres et compétences du niveau, séries de 5 exercices avec indices, correction et suivi du niveau */
(function (w) {
  "use strict";
  var D = document, app = D.getElementById("app"), A = w.MSAC, SP = w.MSSP, got = {}, BASE = "https://mathsolver-backend-gray.vercel.app/";
  if (w.MSEXO || !A || !app || !SP) { return; }
  var FL = { l3: "c", lt: "f" }, DL = ["", "Facile", "Moyen", "Difficile"], N = 5;
  var lv = "", scr = "list", ch = -1, R = null, sy = 0, KEY = "excur";
  // nombre de compétences par chapitre (identifiants lt0a, lt0b…) : la maîtrise s'affiche sans charger les exercices
  var NB = { lt: [3, 4, 4, 4, 5, 5, 5, 4, 5, 5, 3, 5, 5, 4, 5], l3: [4, 4, 4, 2, 3, 3, 3, 4, 4, 4, 4, 4] };
  function rd() { try { var r = JSON.parse(w.MSStore.get(KEY) || "null"); return r && r.lv === lv ? r : null; } catch (x) { return null; } }
  function wr(v) { try { if (v) { w.MSStore.set(KEY, JSON.stringify(v)); } else { w.MSStore.del(KEY); } } catch (x) { } }
  function e(s) { return A.esc(s); }
  function tx(s) { return w.MSCOV ? w.MSCOV.tx(s) : e(s); }
  function css(id, f) { if (D.getElementById(id)) { return; } var l = D.createElement("link"); l.id = id; l.rel = "stylesheet"; l.href = BASE + f; D.head.appendChild(l); }
  function ld(a, cb) {
    var todo = a.filter(function (u) { return !got[u]; }), n = todo.length, ok = 1;
    if (!n) { cb(1); return; }
    todo.forEach(function (u) { var s = D.createElement("script"); s.async = false; s.src = BASE + u; s.onload = function () { got[u] = 1; if (!--n) { cb(ok); } }; s.onerror = function () { ok = 0; if (!--n) { cb(ok); } }; D.head.appendChild(s); });
  }
  function names() { return ((w.MSFM || {})[lv] || []).map(function (c) { return c[0]; }); }
  function gens(c) { return w.MSGX.of(lv, c); }
  function ids(c) { var g = gens(c), n = (NB[lv] || [])[c] || 0, o = [], i; if (g.length) { return g; } for (i = 0; i < n; i++) { o.push({ id: lv + c + "abcdefgh".charAt(i) }); } return o; }
  function bar(p, t) { return '<span class="ebar"><i style="width:' + p + '%"></i></span><span class="elb' + (p >= 75 ? " xok" : "") + '">' + e(w.MSPRG.label(p, t)) + (t ? " · " + p + " %" : "") + "</span>"; }
  function head(t) { return '<div class="ac xs exo"><div class="ach"><button class="bkb" id="home" aria-label="Retour"></button><b class="ht">' + e(t) + "</b></div>"; }
  function dots(d) { var s = ""; for (var i = 1; i <= 3; i++) { s += "<i" + (i <= d ? ' class="on"' : "") + "></i>"; } return '<span class="edot" aria-label="' + DL[d] + '">' + s + "</span>"; }

  // 1. liste des chapitres avec la maîtrise de chacun
  function list() {
    scr = "list"; ch = -1;
    var n = names(), s = head("Exercices"), all = 0, k = 0, i, g, p, t;
    for (i = 0; i < w.MSGX.n(lv); i++) { g = ids(i); if (g.length) { all += w.MSPRG.chap(g); k++; } }
    s += '<div class="estat"><div><b>' + w.MSPRG.streak() + "</b><small>jour" + (w.MSPRG.streak() > 1 ? "s" : "") + ' d\'affilée</small></div><div><b>' + w.MSPRG.xp() + '</b><small>points</small></div><div><b>' + (k ? Math.round(all / k) : 0) + ' %</b><small>maîtrise du programme</small></div></div>';
    t = rd();
    if (t && t.i < N) { s += '<div class="evw"><b>Série en cours : ' + e(t.ttl) + " · exercice " + (t.i + 1) + " sur " + N + '</b><div class="row2"><button data-ex="resume">Reprendre ma série</button></div></div>'; }
    s += '<p class="esub">Choisis un chapitre. Ton niveau se met à jour à chaque exercice.</p>';
    for (i = 0; i < w.MSGX.n(lv); i++) {
      g = ids(i); p = w.MSPRG.chap(g); t = g.some(function (x) { return w.MSPRG.tried(x.id); });
      s += '<button class="ech" data-ex="ch" data-v="' + i + '"><span class="cn">' + (i + 1) + '</span><span class="ect"><b>' + e(n[i] || "Chapitre " + (i + 1)) + "</b>" + bar(p, t) + '</span><span class="chv"></span></button>';
    }
    app.innerHTML = s + "</div>";
    w.scrollTo(0, sy);
  }
  // 2. un chapitre : série mixte ou une compétence
  function chap(c) {
    scr = "chap"; ch = c;
    ld(["gx_" + lv + "_" + c + ".js?v=1"], function (ok) {
      var g = gens(c), s;
      if (!ok || !g.length) { A.toast(A.t("net")); list(); return; }
      s = head(names()[c] || "Chapitre " + (c + 1)) + '<p class="esub">Maîtrise du chapitre</p><div class="echb">' + bar(w.MSPRG.chap(g), g.some(function (x) { return w.MSPRG.tried(x.id); })) + "</div>";
      s += '<button class="pb" data-ex="mix">Série mixte · ' + N + " exercices</button><p class=\"esub\">Du plus facile au plus difficile, selon tes réussites.</p><h3 class=\"gh\">Compétences</h3>";
      g.forEach(function (x) { s += '<button class="esk" data-ex="sk" data-v="' + x.id + '"><span class="ect"><b>' + e(x.n) + "</b>" + bar(w.MSPRG.skill(x.id), w.MSPRG.tried(x.id)) + "</span>" + dots(x.d) + "</button>"; });
      app.innerHTML = s + "</div>";
      w.scrollTo(0, 0);
    });
  }
  // 3. une série de 5 exercices
  function pickGen(d, ex) {
    var g = gens(ch), c = g.filter(function (x) { return x.d === d && ex.indexOf(x.id) < 0; });
    if (!c.length) { c = g.filter(function (x) { return x.d === d; }); }
    if (!c.length) { c = g; }
    return c[Math.floor(Math.random() * c.length)];
  }
  function item(g) { var it, i, sd; for (i = 0; i < 6; i++) { sd = Math.floor(Math.random() * 2147483647); it = w.MSGX.make(g, sd); it.sd = sd; if (!R.items.some(function (o) { return o.t === it.t; })) { break; } } return it; }
  // la série est enregistrée à chaque étape : on la reprend même après avoir quitté l'appli
  function save() { wr({ lv: lv, ch: ch, ttl: names()[ch] || "Chapitre " + (ch + 1), sk: R.sk, q: R.items.map(function (o) { return { g: o.g.id, sd: o.sd }; }), st: R.st, i: R.i, pts: R.pts, d: R.d }); }
  function start(id) {
    var g = id ? w.MSGX.byId(id) : null;
    R = { sk: id || "", items: [], st: [], i: 0, pts: 0, d: 1 };
    R.items.push(item(g || pickGen(1, [])));
    save();
    run();
  }
  function resume() {
    var r = rd();
    if (!r) { list(); return; }
    ch = r.ch;
    ld(["gx_" + lv + "_" + r.ch + ".js?v=1"], function (ok) {
      if (!ok) { A.toast(A.t("net")); list(); return; }
      try { R = { sk: r.sk, st: r.st, i: r.i, pts: r.pts, d: r.d, items: r.q.map(function (o) { var it = w.MSGX.make(w.MSGX.byId(o.g), o.sd); it.sd = o.sd; return it; }) }; } catch (x) { wr(null); list(); return; }
      run();
    });
  }
  function cur() { return R.st[R.i] || (R.st[R.i] = { L: [], f: -1, ok: null, tr: 0, h: 0, cor: 0, done: 0 }); }
  function run() {
    scr = "run";
    var it = R.items[R.i], q = cur(), s = head((R.sk ? it.g.n : "Série mixte")), i, v = "";
    s += '<div class="eprog">';
    for (i = 0; i < N; i++) { s += "<i" + (i < R.i ? ' class="' + (R.st[i] && R.st[i].ok && !R.st[i].cor ? "xok" : "xko") + '"' : i === R.i ? ' class="cur"' : "") + "></i>"; }
    s += '</div><article class="ecard"><div class="eqh"><b>Exercice ' + (R.i + 1) + " sur " + N + "</b>" + dots(it.g.d) + '</div><div class="eqt">' + tx(it.t) + "</div>";
    for (i = 0; i < q.h; i++) { s += '<div class="ehint"><b>Indice ' + (i + 1) + "</b>" + tx(it.h[i]) + "</div>"; }
    if (q.L.length) {
      s += '<div class="eans">' + q.L.map(function (l, j) { return '<div class="' + (j === q.f ? "fin" : "l") + '">' + w.MSCPB.pr(l) + "</div>"; }).join("") + "</div>";
      v = q.ok ? '<div class="ever xok">Bravo, c\'est juste ! ' + (q.cor ? "" : "+" + q.pts + " points") + "</div>" : q.cor ? "" : '<div class="ever xko">Ce n\'est pas encore ça. Corrige ta réponse ou demande un indice.</div>';
      s += v;
    }
    if (q.cor) { s += '<div class="ecor"><b>Correction</b>' + it.s.map(function (l) { return "<p>" + tx(l) + "</p>"; }).join("") + '<p class="erep">Réponse attendue : <span>' + e(it.r) + "</span></p></div>"; }
    s += '</article><div class="ebtn">';
    if (!q.done) {
      s += '<button class="pb" data-ex="ans">' + (q.L.length ? "Modifier ma réponse" : "Répondre") + "</button>";
      if (q.h < it.h.length) { s += '<button class="sb2" data-ex="hint">Indice ' + (q.h + 1) + "</button>"; }
      if (q.L.length || q.h) { s += '<button class="tl" data-ex="cor">Voir la correction</button>'; }
    } else {
      if (!q.cor) { s += '<button class="tl" data-ex="cor">Voir la correction</button>'; }
      s += '<button class="pb" data-ex="next">' + (R.i < N - 1 ? "Exercice suivant" : "Voir mon bilan") + "</button>";
    }
    app.innerHTML = s + "</div></div>";
    w.scrollTo(0, 0);
  }
  function answer() {
    var it = R.items[R.i], q = cur();
    w.MSCPB.open({ title: "Exercice " + (R.i + 1) + " sur " + N, sub: it.g.n, ctx: '<div class="xq cur"><b>Énoncé</b>' + tx(it.t) + "</div>", lines: q.L.length ? q.L : [""],
      onValid: function (L, f) {
        q.L = L; q.f = f; q.tr++;
        q.ok = f >= 0 && w.MSCK.check(it.a, L[f]);
        if (q.ok) { q.pts = Math.max(2, 10 - 3 * q.h - 3 * (q.tr - 1)); R.pts += q.pts; w.MSPRG.xp(q.pts); finish(q, true); }
        save();
        run();
      } });
  }
  function finish(q, ok) { if (q.done) { return; } q.done = 1; w.MSPRG.rec(R.items[R.i].g.id, ok && !q.cor, 1); }
  function next() {
    var q = cur(), ids;
    if (R.i >= N - 1) { end(); return; }
    if (!R.sk) { R.d = q.ok && !q.cor && !q.h && q.tr === 1 ? Math.min(3, R.d + 1) : q.ok ? R.d : Math.max(1, R.d - 1); }
    ids = R.items.map(function (o) { return o.g.id; });
    R.i++;
    R.items.push(item(R.sk ? w.MSGX.byId(R.sk) : pickGen(R.d, ids)));
    save();
    run();
  }
  // 4. bilan de la série
  function end() {
    scr = "end";
    wr(null);
    var k = R.st.filter(function (q) { return q.ok && !q.cor; }).length, ids = [], s = head("Bilan");
    R.items.forEach(function (o) { if (ids.indexOf(o.g.id) < 0) { ids.push(o.g.id); } });
    s += '<div class="eend"><div class="escore">' + k + "<small>/" + N + "</small></div><p>" + (k === N ? "Parfait, toutes tes réponses sont justes !" : k >= 3 ? "Bon travail, continue comme ça." : "Courage : relis les corrections, puis refais une série.") + '</p><div class="epts">+' + R.pts + " points</div></div><h3 class=\"gh\">Ton niveau maintenant</h3>";
    ids.forEach(function (id) { var g = w.MSGX.byId(id); s += '<div class="esk xst"><span class="ect"><b>' + e(g.n) + "</b>" + bar(w.MSPRG.skill(id), 1) + "</span></div>"; });
    s += '<button class="pb" data-ex="again">Nouvelle série</button><button class="sb2" data-ex="back">Retour au chapitre</button>';
    app.innerHTML = s + "</div>";
    w.scrollTo(0, 0);
  }

  // retour (flèche ou bouton du téléphone) : on remonte d'un écran
  D.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target.closest("#home") : null;
    if (!t || scr === "list" || !D.querySelector("#app .exo") || (w.MSCPB && w.MSCPB.on())) { return; }
    ev.stopImmediatePropagation(); ev.preventDefault();
    if (scr === "chap") { list(); } else { chap(ch); }
  }, true);
  D.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("[data-ex]") : null, a, q;
    if (!b || !D.querySelector("#app .exo")) { return; }
    a = b.getAttribute("data-ex");
    if (a === "ch") { sy = w.pageYOffset; chap(+b.getAttribute("data-v")); }
    else if (a === "mix") { start(""); }
    else if (a === "sk") { start(b.getAttribute("data-v")); }
    else if (a === "ans") { answer(); }
    else if (a === "hint") { cur().h++; save(); run(); }
    else if (a === "cor") { q = cur(); q.cor = 1; finish(q, false); save(); run(); }
    else if (a === "resume") { sy = w.pageYOffset; resume(); }
    else if (a === "next") { next(); }
    else if (a === "again") { start(R.sk); }
    else if (a === "back") { chap(ch); }
  });

  function boot(c, id) {
    css("accss", "acct.css?v=1"); css("fmcss", "fm.css?v=1"); css("cpcss", "cp.css?v=1"); css("excss", "ex.css?v=1");
    try { w.MSNav.solved(); } catch (x) { }
    lv = A.P().lv || "";
    ld((w.ED && w.ED.parse && w.ED.out ? [] : ["ed_model.js?v=2", "ed_parse.js?v=2"]).concat(["ms_co_view.js?v=4", "ms_cpk.js?v=1", "ms_mk.js?v=1", "ms_cpc.js?v=1", "ms_cpb.js?v=1", "ms_prg.js?v=1", "gx_core.js?v=1"]).concat(FL[lv] ? ["fm_" + FL[lv] + ".js?v=1"] : []), function (ok) {
      if (!ok || !w.MSGX) { A.toast(A.t("net")); return; }
      if (!w.MSGX.has(lv)) { app.innerHTML = head("Exercices") + '<p class="fe">Les exercices de ton niveau arrivent bientôt. Ils sont déjà prêts pour la 3e et la Terminale.</p></div>'; return; }
      var r = w.MSEXR; w.MSEXR = false;
      if (c >= 0) { ch = c; ld(["gx_" + lv + "_" + c + ".js?v=1"], function () { if (id) { start(id); } else { chap(c); } }); } else if (r && rd()) { sy = 0; resume(); } else { sy = 0; list(); }
    });
  }
  SP.live.exercices = function () { boot(-1); };
  w.MSEXO = { open: boot };
})(window);
