/* MathSolver - accueil : récents, exemples, astuce ; page Historique */
(function (w) {
  "use strict";
  var A = w.MSApp, D = document, app = D.getElementById("app");
  var mode = (w.MS_HOME && w.MS_HOME.mode === "history") ? "history" : "home", armed = 0;
  if (!app) { return; }
  var EX = [
    ["Résoudre $2x+6=0$", "Résoudre 2x + 6 = 0"],
    ["Étudier $f(x)=x^2-4x+3$", "Étudier la fonction f(x) = x^2 - 4x + 3 : limites, dérivée et tableau de variations."],
    ["Calculer $\\int_0^1 xe^x\\,dx$", "Calculer l'intégrale de 0 à 1 de x*e^x dx."],
    ["Résoudre $x^2-5x+6\\ge 0$", "Résoudre dans R l'inéquation x^2 - 5x + 6 >= 0."],
    ["Suite $u_{n+1}=\\frac{u_n}{2}+1$", "Soit (u_n) définie par u_0 = 0 et u_(n+1) = u_n/2 + 1. Montrer que (u_n) est croissante et majorée par 2."]
  ];
  var TIPS = [
    "Pour une photo, cadre bien l'énoncé, sans ombre ni reflet.",
    "Tu peux coller un sujet entier : l'appli traite chaque question à la suite.",
    "Touche le titre d'une étape pour la replier et mieux suivre la correction.",
    "Une erreur dans la correction ? Utilise « Signaler une erreur » en bas de la page."
  ];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function list() {
    try { var a = JSON.parse(A.recents()); return a instanceof Array ? a : []; } catch (e) { return []; }
  }

  function row(cls, html, val) {
    return '<button class="' + cls + '" data-v="' + esc(val) + '">' + (cls === "rc" ? '<span class="ri"></span>' : "") + '<span class="it">' + html + '</span><span class="chv"></span></button>';
  }

  function render() {
    var r = A && A.recents ? list() : [], s = "", i, n;
    if (mode === "history") {
      s = '<div class="hh"><span class="st">Historique</span>' + (r.length ? '<button class="lk" id="clr">Tout effacer</button>' : "") + "</div>";
      if (!r.length) { s += '<div class="empty"><b>Rien pour le moment</b>Les exercices que tu r&eacute;sous apparaissent ici.</div>'; }
      for (i = 0; i < r.length; i++) { s += row("rc", esc(r[i]), r[i]); }
      s += '<button class="lk bk" id="home">Retour &agrave; l\'accueil</button>';
    } else {
      if (r.length) {
        s += '<div class="hh"><span class="st">R&eacute;cents</span>' + (r.length > 3 ? '<button class="lk" id="all">Tout voir</button>' : "") + "</div>";
        for (i = 0; i < Math.min(3, r.length); i++) { s += row("rc", esc(r[i]), r[i]); }
      }
      s += '<div class="hh"><span class="st">Essaie un exemple</span></div>';
      for (i = 0; i < EX.length; i++) { s += row("ex", esc(EX[i][0]), EX[i][1]); }
      n = Math.floor(Date.now() / 86400000) % TIPS.length;
      s += '<div class="tip"><b>Astuce</b>' + esc(TIPS[n]) + "</div>";
    }
    app.innerHTML = s;
    if (w.renderMathInElement) {
      w.renderMathInElement(app, { delimiters: [{ left: "$", right: "$", display: false }], throwOnError: false });
    } else {
      app.innerHTML = app.innerHTML.replace(/\$/g, "");
    }
  }

  D.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button") : null, c;
    if (!t) { return; }
    c = t.className;
    if (c === "ex" || c === "rc") {
      if (A && A.fill) { try { A.fill(t.getAttribute("data-v")); } catch (x) { } }
    } else if (t.id === "all" || t.id === "home") {
      mode = t.id === "all" ? "history" : "home";
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

  render();
  w.MS_OK = true;
})(window);