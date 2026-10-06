/* MathSolver - espace Progression : niveau et points, jours d'affilée, badges, maîtrise de chaque chapitre, notes des évaluations */
(function (w) {
  "use strict";
  var D = document, app = D.getElementById("app"), A = w.MSAC, SP = w.MSSP, BASE = "https://mathsolver-backend-gray.vercel.app/", got = {};
  if (w.MSPROG || !A || !app || !SP) { return; }
  var FL = { l3: "c", lt: "f" };
  var CSS = ".pgl{display:flex;align-items:center;gap:14px;margin:4px 0 12px;padding:16px;border-radius:18px;background:linear-gradient(135deg,#1a62e8,#5b3fd6);color:#fff;}" +
    ".pgl .pgn{flex:none;width:58px;height:58px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:22px;font-weight:800;line-height:1;}.pgl .pgn small{font-size:9.5px;font-weight:700;letter-spacing:.05em;opacity:.9;}" +
    ".pgl span{flex:1;min-width:0;}.pgl b{display:block;font-size:17px;}.pgl small{display:block;font-size:12.5px;opacity:.9;}.pgl .hxp{display:block;height:7px;margin-top:7px;border-radius:7px;background:rgba(255,255,255,.25);overflow:hidden;}.pgl .hxp i{display:block;height:100%;background:#ffd43b;border-radius:7px;}" +
    ".pbd{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px;}.pbd div{padding:10px 6px;border-radius:14px;background:#fff;border:1px solid #e1e7f2;text-align:center;}.pbd i{display:block;font-style:normal;font-size:26px;line-height:1.1;}" +
    ".pbd b{display:block;margin-top:3px;font-size:12px;line-height:1.25;color:#0f1b33;}.pbd small{display:block;font-size:10.5px;line-height:1.25;color:#5b6784;}.pbd .no{opacity:.45;filter:grayscale(1);}" +
    ".dk .pbd div{background:#172033;border-color:#26324a;}.dk .pbd b{color:#eef2fb;}.dk .pbd small{color:#93a2c4;}.dk .pgl{background:linear-gradient(135deg,#1d3f8f,#3b2a8a);}";
  function e(s) { return A.esc(s); }
  function css(id, f) { if (D.getElementById(id)) { return; } var l = D.createElement("link"); l.id = id; l.rel = "stylesheet"; l.href = BASE + f; D.head.appendChild(l); }
  function ld(a, cb) {
    var todo = a.filter(function (u) { return !got[u]; }), n = todo.length, ok = 1;
    if (!n) { cb(1); return; }
    todo.forEach(function (u) { var s = D.createElement("script"); s.async = false; s.src = BASE + u; s.onload = function () { got[u] = 1; if (!--n) { cb(ok); } }; s.onerror = function () { ok = 0; if (!--n) { cb(ok); } }; D.head.appendChild(s); });
  }
  function day(t) { try { return new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }); } catch (x) { return ""; } }
  function bar(p, t) { return '<span class="ebar"><i style="width:' + p + '%"></i></span><span class="elb' + (p >= 75 ? " xok" : "") + '">' + e(w.MSPRG.label(p, t)) + (t ? " · " + p + " %" : "") + "</span>"; }
  function page() {
    var M = w.MSPRG, lv = A.P().lv || "", L = M.level(), tt = M.total(), nb = M.NB[lv] || [], nm = ((w.MSFM || {})[lv] || []).map(function (c) { return c[0]; }), bd = M.badges(), ev = M.evals(lv).slice(0, 8), s, all = 0;
    s = '<div class="ac xs pgs"><div class="ach"><button class="bkb" id="home" aria-label="Retour"></button><b class="ht">Progression</b></div>';
    s += '<div class="pgl"><div class="pgn">' + L.n + "<small>NIVEAU</small></div><span><b>" + L.t + "</b><small>" + L.a + " / " + L.b + " points pour le niveau " + (L.n + 1) + '</small><span class="hxp"><i style="width:' + L.p + '%"></i></span></span></div>';
    nb.forEach(function (n, c) { all += M.chap(M.ids(lv, c)); });
    s += '<div class="estat"><div><b>' + M.streak() + "</b><small>jour" + (M.streak() > 1 ? "s" : "") + " d'affilée (record " + M.best() + ")</small></div><div><b>" + tt.ok + "</b><small>exercice" + (tt.ok > 1 ? "s" : "") + " réussi" + (tt.ok > 1 ? "s" : "") + "</small></div><div><b>" + (nb.length ? Math.round(all / nb.length) : 0) + " %</b><small>maîtrise du programme</small></div></div>";
    s += '<h3 class="gh">Mes badges · ' + bd.filter(function (b) { return b[4]; }).length + " / " + bd.length + '</h3><div class="pbd">' + bd.map(function (b) { return '<div class="' + (b[4] ? "" : "no") + '"><i aria-hidden="true">' + b[1] + "</i><b>" + e(b[2]) + "</b><small>" + e(b[3]) + "</small></div>"; }).join("") + "</div>";
    if (nb.length) {
      s += '<h3 class="gh">Maîtrise par chapitre</h3>';
      nb.forEach(function (n, c) { var g = M.ids(lv, c), p = M.chap(g), t = g.some(function (x) { return M.tried(x.id); }); s += '<div class="esk xst"><span class="ect"><b>' + (c + 1) + ". " + e(nm[c] || "Chapitre " + (c + 1)) + "</b>" + bar(p, t) + "</span></div>"; });
    }
    s += '<h3 class="gh">Mes notes</h3>' + (ev.length ? ev.map(function (o) { return '<div class="evh"><b>' + o.n + '/20</b><span>' + e(o.t) + "<small>" + day(o.d) + "</small></span></div>"; }).join("") : '<p class="esub">Pas encore d\'évaluation. Fais une interrogation pour voir ta note ici.</p>');
    app.innerHTML = s + "</div>";
  }
  function open() {
    css("accss", "acct.css?v=1"); css("fmcss", "fm.css?v=1"); css("excss", "ex.css?v=1");
    if (!D.getElementById("pgcss")) { var st = D.createElement("style"); st.id = "pgcss"; st.textContent = CSS; D.head.appendChild(st); }
    try { w.MSNav.solved(); } catch (x) { }
    var lv = A.P().lv || "";
    ld(["ms_prg.js?v=1"].concat(FL[lv] ? ["fm_" + FL[lv] + ".js?v=1"] : []), function () {
      if (!w.MSPRG) { A.toast(A.t("net")); return; }
      page(); w.scrollTo(0, 0);
    });
  }
  SP.live.progres = open;
  w.MSPROG = { open: open };
})(window);
