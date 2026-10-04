/* MathSolver - navigation sans rechargement : Accueil, Historique et Menu, depuis l'accueil comme depuis une solution */
(function (w) {
  "use strict";
  var D = document, BASE = "https://mathsolver-backend-gray.vercel.app/", busy = 0, tm = 0, ob = null, cur = "", nx = "", nc = null, mb = 0, mq = 0, mw = 0;
  if (w.MSGO) { return; }

  // fin de la bascule (réussie ou non)
  function end() {
    if (ob) { ob.disconnect(); ob = null; }
    clearTimeout(tm);
    busy = 0;
    nx = "";
    nc = null;
  }

  // retire ce qui appartient à la page solution (barre du bas)
  function clean() {
    var b = D.querySelector("body > .bar");
    if (b) { b.parentNode.removeChild(b); }
    D.body.className = D.body.className.replace(/\s*\bhasbar\b/g, "");
  }

  // arrivée à l'écran demandé : en haut ; sans rappel on referme le panneau, avec rappel c'est lui qui s'en charge
  function fin(c) {
    w.scrollTo(0, 0);
    if (c) { c(); } else if (w.MSDR) { w.MSDR.hide(); }
  }

  function lib(u, cb) {
    var s = D.createElement("script");
    s.src = BASE + u;
    s.onload = s.onerror = cb;
    D.head.appendChild(s);
  }

  // la page solution n'a pas les styles de l'accueil : on les attend avant de toucher à l'écran
  function css(cb) {
    var l = D.getElementById("mshc"), n = 0;
    function go() { if (!n) { n = 1; cb(); } }
    if (l) { go(); return; }
    l = D.createElement("link");
    l.id = "mshc"; l.rel = "stylesheet"; l.href = BASE + "home.css?v=1";
    l.onload = l.onerror = go;
    D.head.appendChild(l);
    setTimeout(go, 4000);
  }

  // depuis une solution : charge l'accueil dans la même page ; la solution reste affichée jusqu'au dernier moment
  function boot(k, c) {
    var app = D.getElementById("app"), s;
    busy = 1;
    cur = k;
    ob = new MutationObserver(function () {
      var t = nx, c2 = nc;
      clean();
      end();
      fin(c);
      if (t && t !== cur) { w.MSGO(t, c2); }
    });
    ob.observe(app, { childList: true });
    tm = setTimeout(end, 15000);
    css(function () {
      w.MS_HOME = { mode: k };
      s = D.createElement("script");
      s.src = BASE + "ms_home.js?v=1";
      s.onerror = function () {
        end();
        try { w.MSLib.toast("Connexion impossible. Réessaie."); } catch (e) { }
      };
      D.head.appendChild(s);
    });
  }

  // le menu n'a pas besoin de l'accueil : il glisse par-dessus la solution (il charge juste ses deux fichiers)
  function chain(cb) {
    function two() { if (w.MSMENU || !w.MSAC) { cb(); } else { lib("ms_menu.js?v=1", cb); } }
    if (w.MSAC) { two(); } else { lib("ms_acct.js?v=1", two); }
  }
  // charge le menu (préchargement discret ou demande de l'utilisateur) ; si l'utilisateur l'a demandé, il s'ouvre dès que c'est prêt
  function run() {
    if (mb) { return; }
    mb = 1;
    chain(function () {
      var want = mw;
      mb = 0;
      mw = 0;
      if (!w.MSMENU) { if (want) { try { w.MSLib.toast("Connexion impossible. Réessaie."); } catch (e) { } } return; }
      if (!want) { w.MSMENU.pre(); } else if (mq === w.MS_NAV) { w.MSMENU.show("menu"); }
    });
  }
  function mopen() {
    mq = w.MS_NAV;
    mw = 1;
    run();
  }
  // sur une page solution, préchargement discret du menu
  setTimeout(function () { if (!w.MSHOME && !mb && !w.MSMENU) { run(); } }, 3000);

  // k : "home", "history" ou "menu" ; renvoie 1 si la page s'en charge, 0 si l'appli doit la recharger
  // c : rappel une fois l'écran affiché (sans rappel, le panneau du menu est refermé)
  // MS_NAV change à chaque bascule : un écran qui se charge encore (menu, profil) ne s'affiche pas par-dessus la suivante
  w.MSGO = function (k, c) {
    var H = w.MSHOME;
    if (!D.getElementById("app")) { return 0; }
    if (busy) { nx = k; nc = c; return 1; }
    w.MS_NAV = (w.MS_NAV || 0) + 1;
    if (k === "menu") {
      if (!H) { mopen(); return 1; }
      if (!w.MS_OK || !H.menu) { return 0; }
      H.menu();
      return 1;
    }
    if (!H) { boot(k === "history" ? k : "home", c); return 1; }
    if (!w.MS_OK) { return 0; }
    H.home(k === "history" ? "history" : "home");
    clean();
    fin(c);
    return 1;
  };
  w.MSGO.clean = clean;
})(window);