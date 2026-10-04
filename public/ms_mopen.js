/* MathSolver - ouvre le menu dans la page déjà affichée (sans la recharger) et le précharge en tâche de fond */
(function (w) {
  "use strict";
  var D = document, H = w.MSHOME, BASE = "https://mathsolver-backend-gray.vercel.app/";
  if (!H || H.menu) { return; }
  function get(cb) {
    var s;
    if (w.MSMENU) { cb(); return; }
    s = D.createElement("script");
    s.src = BASE + "ms_menu.js?v=1";
    s.onload = s.onerror = cb;
    D.head.appendChild(s);
  }
  H.menu = function () {
    get(function () {
      var app = D.getElementById("app");
      if (w.MSMENU) { w.MSMENU.show("menu"); return; }
      if (app && !app.firstChild) { H.home(); } else { try { w.MSAC.toast(w.MSAC.t("net")); } catch (e) { } }
    });
  };
  setTimeout(function () { get(function () { if (w.MSMENU) { w.MSMENU.pre(); } }); }, 2500);
})(window);