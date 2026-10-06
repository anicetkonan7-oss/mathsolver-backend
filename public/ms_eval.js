/* MathSolver - espace Évaluation : interrogation (1 chapitre) ou devoir surveillé (2 ou 3 chapitres), séries C et D, copie notée et historique */
(function (w) {
  "use strict";
  var D = document, app = D.getElementById("app"), A = w.MSAC, SP = w.MSSP, S = w.MSStore, got = {}, BASE = "https://mathsolver-backend-gray.vercel.app/";
  if (w.MSEVAL || !A || !app || !SP) { return; }
  var FL = { l3: "c", lt: "f" }, ONLYC = { 12: 1, 13: 1, 14: 1 }, lv = "", mode = "i", pick = [], KEY = "evcur";
  function e(s) { return A.esc(s); }
  function css(id, f) { if (D.getElementById(id)) { return; } var l = D.createElement("link"); l.id = id; l.rel = "stylesheet"; l.href = BASE + f; D.head.appendChild(l); }
  function ld(a, cb) {
    var todo = a.filter(function (u) { return !got[u]; }), n = todo.length, ok = 1;
    if (!n) { cb(1); return; }
    todo.forEach(function (u) { var s = D.createElement("script"); s.async = false; s.src = BASE + u; s.onload = function () { got[u] = 1; if (!--n) { cb(ok); } }; s.onerror = function () { ok = 0; if (!--n) { cb(ok); } }; D.head.appendChild(s); });
  }
  function rd(k) { try { return JSON.parse(S.get(k) || "null"); } catch (x) { return null; } }
  function wr(k, v) { try { if (v === null) { S.del(k); } else { S.set(k, JSON.stringify(v)); } } catch (x) { } }
  function names() { return ((w.MSFM || {})[lv] || []).map(function (c) { return c[0]; }); }
  function serie() { return rd("serie") || "D"; }
  function chs() { var a = [], i; for (i = 0; i < w.MSGX.n(lv); i++) { if (lv !== "lt" || serie() === "C" || !ONLYC[i]) { a.push(i); } } return a; }
  function day(t) { try { return new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }); } catch (x) { return ""; } }

  function home() {
    var cur = rd(KEY), n = names(), s = '<div class="ac xs ev"><div class="ach"><button class="bkb" id="home" aria-label="Retour"></button><b class="ht">Évaluation</b></div>', h = w.MSPRG.evals(lv).slice(0, 5);
    if (cur && cur.lv === lv && !cur.done) { s += '<div class="evw"><b>Devoir en cours : ' + e(cur.ttl) + '</b><div class="row2"><button data-ev="resume">Reprendre (' + Math.ceil(cur.left / 60) + " min restantes)</button></div></div>"; }
    if (lv === "lt") { s += '<p class="esub">Ta série :</p><div class="evs"><button class="' + (serie() === "C" ? "on" : "") + '" data-ev="serie" data-v="C">Terminale C</button><button class="' + (serie() === "D" ? "on" : "") + '" data-ev="serie" data-v="D">Terminale D</button></div>'; }
    s += '<div class="evm"><button class="evc' + (mode === "i" ? " on" : "") + '" data-ev="mode" data-v="i"><b>Interrogation</b><small>1 chapitre · 5 questions · 20 minutes</small></button><button class="evc' + (mode === "d" ? " on" : "") + '" data-ev="mode" data-v="d"><b>Devoir surveillé</b><small>2 ou 3 chapitres · 6 questions · 50 minutes</small></button></div>';
    s += '<p class="esub">' + (mode === "i" ? "Choisis le chapitre :" : "Choisis 2 ou 3 chapitres :") + "</p>";
    chs().forEach(function (i) { s += '<button class="evk' + (pick.indexOf(i) >= 0 ? " on" : "") + '" data-ev="ch" data-v="' + i + '"><i></i><span>' + e(n[i] || "Chapitre " + (i + 1)) + "</span></button>"; });
    s += '<button class="pb" data-ev="go"' + (ready() ? "" : " disabled") + '>Commencer</button><p class="esub">Pendant l\'évaluation : pas d\'indice, une calculatrice, et une pause possible.</p>';
    if (h.length) { s += '<h3 class="gh">Tes dernières notes</h3>' + h.map(function (o) { return '<div class="evh"><b>' + o.n + '/20</b><span>' + e(o.t) + "<small>" + day(o.d) + "</small></span></div>"; }).join(""); }
    app.innerHTML = s + "</div>";
  }
  function ready() { return mode === "i" ? pick.length === 1 : pick.length >= 2 && pick.length <= 3; }
  // points sur 20 selon la difficulté (3, 4 ou 5 avant mise à l'échelle)
  function pts(ds) {
    var W = [0, 3, 4, 5], t = ds.reduce(function (s, d) { return s + W[d]; }, 0), p = ds.map(function (d) { return Math.floor(20 * W[d] / t); }), r = 20 - p.reduce(function (s, v) { return s + v; }, 0), i;
    for (i = 0; r > 0; i = (i + 1) % p.length, r--) { p[ds.length - 1 - i] += 1; }
    return p;
  }
  function choose(c, d, used) {
    var g = w.MSGX.of(lv, c), k = g.filter(function (x) { return x.d === d && used.indexOf(x.id) < 0; });
    if (!k.length) { k = g.filter(function (x) { return used.indexOf(x.id) < 0; }); }
    if (!k.length) { k = g; }
    return k[Math.floor(Math.random() * k.length)];
  }
  function build() {
    var plan = [], qs = [], used = [], n = names(), ds, p;
    if (mode === "i") { [1, 1, 2, 2, 3].forEach(function (d) { plan.push([pick[0], d]); }); }
    else if (pick.length === 2) { pick.forEach(function (c) { [1, 2, 3].forEach(function (d) { plan.push([c, d]); }); }); }
    else { pick.forEach(function (c, i) { [[1, 2], [2, 3], [1, 3]][i].forEach(function (d) { plan.push([c, d]); }); }); }
    plan.forEach(function (x) { var g = choose(x[0], x[1], used); used.push(g.id); qs.push({ g: g.id, sd: Math.floor(Math.random() * 2147483647), ch: x[0], d: g.d }); });
    ds = qs.map(function (q) { return q.d; }); p = pts(ds);
    qs.forEach(function (q, i) { q.p = p[i]; });
    return { lv: lv, type: mode, ch: pick.slice(), ttl: mode === "i" ? "Interrogation · " + (n[pick[0]] || "") : "Devoir surveillé · " + pick.length + " chapitres", dur: mode === "i" ? 1200 : 3000, left: mode === "i" ? 1200 : 3000, qs: qs, ans: {}, paused: false, done: 0 };
  }
  function launch(dv) {
    ld(dv.ch.map(function (c) { return "gx_" + lv + "_" + c + ".js?v=1"; }), function (ok) {
      if (!ok) { A.toast(A.t("net")); return; }
      var items = dv.qs.map(function (q) { return w.MSGX.make(w.MSGX.byId(q.g), q.sd); });
      wr(KEY, dv);
      w.MSCPA.show(dv, items, {
        save: function (d) { wr(KEY, d); },
        done: function (d) { wr(KEY, null); w.MSPRG.addEval({ lv: lv, t: d.ttl, n: d.note }); },
        quit: function () { home(); w.scrollTo(0, 0); },
        train: function (c, id) { ld(["ms_exo.js?v=1"], function () { if (w.MSEXO) { w.MSEXO.open(c, id); } }); },
        cours: function () { var b = D.createElement("button"); b.setAttribute("data-sp", "cours"); b.hidden = true; D.body.appendChild(b); b.click(); b.remove(); }
      });
    });
  }
  D.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("[data-ev]") : null, a, v;
    if (!b || !D.querySelector("#app .ev")) { return; }
    a = b.getAttribute("data-ev"); v = b.getAttribute("data-v");
    if (a === "serie") { wr("serie", v); pick = pick.filter(function (c) { return chs().indexOf(c) >= 0; }); home(); }
    else if (a === "mode") { mode = v; pick = mode === "i" ? pick.slice(0, 1) : pick; home(); }
    else if (a === "ch") { v = +v; if (mode === "i") { pick = [v]; } else if (pick.indexOf(v) >= 0) { pick.splice(pick.indexOf(v), 1); } else if (pick.length < 3) { pick.push(v); } else { A.toast("3 chapitres au maximum."); } home(); }
    else if (a === "go" && ready()) { ld(pick.map(function (c) { return "gx_" + lv + "_" + c + ".js?v=1"; }), function (ok) { if (ok) { launch(build()); } else { A.toast(A.t("net")); } }); }
    else if (a === "resume") { launch(rd(KEY)); }
  });
  function open() {
    css("accss", "acct.css?v=1"); css("fmcss", "fm.css?v=1"); css("cpcss", "cp.css?v=1"); css("excss", "ex.css?v=1");
    try { w.MSNav.solved(); } catch (x) { }
    lv = A.P().lv || ""; pick = [];
    ld(["ms_co_view.js?v=4", "ms_cpk.js?v=1", "ms_mk.js?v=1", "ms_cpc.js?v=1", "ms_cpb.js?v=1", "ms_cpa.js?v=1", "ms_prg.js?v=1", "gx_core.js?v=1"].concat(FL[lv] ? ["fm_" + FL[lv] + ".js?v=1"] : []), function (ok) {
      if (!ok || !w.MSGX) { A.toast(A.t("net")); return; }
      if (!w.MSGX.has(lv)) { app.innerHTML = '<div class="ac xs ev"><div class="ach"><button class="bkb" id="home" aria-label="Retour"></button><b class="ht">Évaluation</b></div><p class="fe">Les évaluations de ton niveau arrivent bientôt. Elles sont déjà prêtes pour la 3e et la Terminale.</p></div>'; return; }
      home(); w.scrollTo(0, 0);
    });
  }
  SP.live.eval = open;
  w.MSEVAL = { open: open };
})(window);
