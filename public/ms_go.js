/* MathSolver - navigation sans rechargement : Accueil, Historique et Menu, depuis l'accueil comme depuis une solution */
(function (w) {
  "use strict";
  var D = document, BASE = "https://mathsolver-backend-gray.vercel.app/", busy = 0, tm = 0, ob = null, cur = "", nx = "";
  if (w.MSGO) { return; }

  // fin de la bascule (réussie ou non)
  function end() {
    if (ob) { ob.disconnect(); ob = null; }
    clearTimeout(tm);
    busy = 0;
    nx = "";
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
  function boot(k) {
    var app = D.getElementById("app"), s;
    busy = 1;
    cur = k;
    ob = new MutationObserver(function () {
      var b = D.querySelector("body > .bar"), t = nx;
      if (b) { b.parentNode.removeChild(b); }
      D.body.className = D.body.className.replace(/\s*\bhasbar\b/g, "");
      w.scrollTo(0, 0);
      end();
      if (t && t !== cur) { w.MSGO(t); }
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

  // k : "home", "history" ou "menu" ; renvoie 1 si la page s'en charge, 0 si l'appli doit la recharger
  // MS_NAV change à chaque bascule : un écran qui se charge encore (menu, profil) ne s'affiche pas par-dessus la suivante
  w.MSGO = function (k) {
    var H = w.MSHOME;
    if (!D.getElementById("app")) { return 0; }
    if (busy) { nx = k; return 1; }
    w.MS_NAV = (w.MS_NAV || 0) + 1;
    if (!H) { boot(k === "menu" || k === "history" ? k : "home"); return 1; }
    if (!w.MS_OK) { return 0; }
    if (k === "menu") {
      if (!H.menu) { return 0; }
      H.menu();
      return 1;
    }
    H.home(k === "history" ? "history" : "home");
    w.scrollTo(0, 0);
    return 1;
  };
})(window);