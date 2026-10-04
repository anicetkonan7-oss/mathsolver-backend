/* MathSolver - accueil : espaces, récents, enregistrées, exemples du niveau, astuce ; page Historique */
(function (w) {
  "use strict";
  var A = w.MSApp, N = w.MSNav, L = w.MSLib, D = document, app = D.getElementById("app");
  var BASE = "https://mathsolver-backend-gray.vercel.app/";
  var mode = (w.MS_HOME && /^(history|menu)$/.test(w.MS_HOME.mode)) ? w.MS_HOME.mode : "home", armed = 0, tab = "rec", cf = "", ready = 0;
  if (!app) { return; }
  var EX = [[["Résoudre $2x+6=0$", "Résoudre 2x + 6 = 0"]]], TIPS = ["Pour une photo, cadre bien l'énoncé, sans ombre ni reflet."];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function theme() {
    var d = false, r = D.documentElement, l = D.getElementById("msdk");
    try { d = !!(w.MSPref && w.MSPref.dark()); } catch (e) { }
    r.className = d ? "dk" : "";
    r.style.background = d ? "#0e1424" : "";
    if (d && !l) {
      l = D.createElement("link");
      l.id = "msdk"; l.rel = "stylesheet"; l.href = BASE + "dark.css?v=1";
      app.style.visibility = "hidden";
      l.onload = l.onerror = function () { app.style.visibility = ""; };
      setTimeout(function () { app.style.visibility = ""; }, 1500);
      D.head.appendChild(l);
    }
    if (l) { l.disabled = !d; }
  }
  w.msTheme = theme;

  function pick() {
    var c = EX.slice(), o = [], t;
    while (c.length && o.length < 5) { t = c.splice(Math.floor(Math.random() * c.length), 1)[0]; o.push(t[Math.floor(Math.random() * t.length)]); }
    return o;
  }

  function list() {
    try { var a = JSON.parse(A.recents()); return a instanceof Array ? a : []; } catch (e) { return []; }
  }

  function render() {
    var r = A && A.recents ? list() : [], B = w.MSLB, v = B.on ? B.all() : [], s = "", i, n, ex;
    if (mode === "history") {
      s = B.head("Historique", tab === "rec" && r.length ? "clr" : "", "Tout effacer");
      if (B.on) { s += B.tabs(tab, v.length); } else { tab = "rec"; }
      if (tab === "sav") {
        if (!v.length) { s += B.empty("Aucune correction enregistr&eacute;e", "Sous une solution, appuie sur &laquo;&nbsp;Enregistrer la correction&nbsp;&raquo; pour la retrouver ici."); }
        for (i = 0; i < v.length; i++) { s += B.row(v[i], cf); }
      } else {
        if (!r.length) { s += B.empty("Rien pour le moment", "Les exercices que tu r&eacute;sous apparaissent ici."); }
        for (i = 0; i < r.length; i++) { s += B.rc("rc", esc(r[i]), r[i]); }
      }
      s += '<button class="lk bk" id="home">Retour &agrave; l\'accueil</button>';
    } else {
      s = (w.MSAC ? w.MSAC.chip() : "") + (w.MSSP ? w.MSSP.grid() : "");
      if (r.length) {
        s += B.head("R&eacute;cents", r.length > 3 ? "all" : "", "Tout voir");
        for (i = 0; i < Math.min(3, r.length); i++) { s += B.rc("rc", esc(r[i]), r[i]); }
      }
      if (v.length) {
        s += B.head("Enregistr&eacute;es", v.length > 3 ? "allsav" : "", "Tout voir");
        for (i = 0; i < Math.min(3, v.length); i++) { s += B.row(v[i], cf); }
      }
      s += B.head("Essaie un exemple", "again", "Autres exemples");
      ex = (w.MSSP && w.MSSP.ex(4)) || pick();
      for (i = 0; i < ex.length; i++) { s += B.rc("ex", esc(ex[i][0]), ex[i][1]); }
      n = Math.floor(Math.random() * TIPS.length);
      s += '<div class="tip"><b>Astuce</b>' + esc(TIPS[n]) + "</div>";
    }
    app.innerHTML = s;
    if (w.renderMathInElement) {
      w.renderMathInElement(app, { delimiters: [{ left: "$", right: "$", display: false }], ignoredClasses: ["rc", "sv"], throwOnError: false });
    } else {
      app.innerHTML = app.innerHTML.replace(/\$/g, "");
    }
    if (ready) { B.type(app); }
    done();
  }
  function done() { w.MS_RDY = true; }
  function sh() { try { N.show(); } catch (e) { } }

  D.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button") : null, a, id;
    if (!t) { return; }
    a = t.getAttribute("data-a");
    id = t.getAttribute("data-id");
    if (a === "fill") {
      sh();
      try { (L && L.fill ? L : A).fill(t.getAttribute("data-v")); } catch (x) { }
    } else if (a === "open") {
      try { L.open(id); } catch (x) { }
    } else if (a === "del" || a === "no") {
      cf = a === "del" ? id : "";
      render();
    } else if (a === "yes") {
      try { L.remove(id); } catch (x) { }
      cf = "";
      render();
    } else if (a === "tab") {
      tab = t.getAttribute("data-t");
      cf = "";
      render();
    } else if (t.id === "again") {
      render();
    } else if (t.id === "all" || t.id === "allsav" || t.id === "home") {
      mode = t.id === "home" ? "home" : "history";
      tab = t.id === "allsav" ? "sav" : "rec";
      cf = "";
      if (mode === "home") { sh(); }
      render();
    } else if (t.id === "clr") {
      if (!armed) {
        armed = 1;
        t.firstChild.nodeValue = "Appuie pour confirmer";
        setTimeout(function () { armed = 0; if (t.firstChild) { t.firstChild.nodeValue = "Tout effacer"; } }, 3000);
      } else {
        try { A.clearRecents(); } catch (x) { }
        armed = 0;
        render();
      }
    }
  });

  function load(u, cb) {
    var sc = D.createElement("script");
    sc.src = BASE + u;
    sc.onload = sc.onerror = cb;
    D.head.appendChild(sc);
  }
  function seq(a, i, cb) {
    if (i >= a.length) { cb(); return; }
    load(a[i], function () { seq(a, i + 1, cb); });
  }
  var wait = 7;
  function start() {
    if (--wait) { return; }
    if (w.MS_EX && w.MS_EX.length > 4) { EX = w.MS_EX; }
    if (w.MS_TIPS && w.MS_TIPS.length) { TIPS = w.MS_TIPS; }
    if (!w.MSLB) { app.innerHTML = '<p class="empty">&Eacute;cris ton exercice ci-dessus, puis appuie sur &laquo;&nbsp;R&eacute;soudre&nbsp;&raquo;.</p>'; sh(); done(); return; }
    seq(["ed_model.js?v=2", "ed_parse.js?v=2", "ed_seg.js?v=2", "ms_fx.js?v=2"], 0, function () { ready = 1; w.MSLB.type(app); });
    w.MS_OK = true;
    if (w.MSAC && w.MSAC.need()) { w.MSAC.open("onb"); return; }
    if (mode === "menu") { mode = "home"; if (w.MSHOME.menu) { w.MSHOME.menu(); return; } }
    render();
  }
  w.MSHOME = { home: function (m, b) { mode = m === "history" ? "history" : "home"; tab = b === "sav" ? "sav" : "rec"; cf = ""; render(); } };
  theme();
  load("ms_ex.js?v=1", start);
  load("ms_lib.js?v=1", start);
  load("ms_acct.js?v=1", start);
  load("ms_spaces.js?v=1", start);
  load("ms_exl.js?v=1", start);
  load("ms_mopen.js?v=1", start);
  load("ms_go.js?v=1", start);
})(window);