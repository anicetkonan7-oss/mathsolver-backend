/* MathSolver - accueil : récents, exemples variés, astuce ; page Historique */
(function (w) {
  "use strict";
  var A = w.MSApp, N = w.MSNav, D = document, app = D.getElementById("app");
  var BASE = "https://mathsolver-backend-gray.vercel.app/";
  var mode = (w.MS_HOME && w.MS_HOME.mode === "history") ? "history" : "home", armed = 0;
  if (!app) { return; }
  var EX = [[["Résoudre $2x+6=0$", "Résoudre 2x + 6 = 0"]]], TIPS = ["Pour une photo, cadre bien l'énoncé, sans ombre ni reflet."];

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  // Mode nuit : charge dark.css si l'appli le demande (pont MSPref)
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
    var c = [], out = [], i, j, t;
    for (i = 0; i < EX.length; i++) { c.push(i); }
    for (i = c.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = c[i]; c[i] = c[j]; c[j] = t; }
    for (i = 0; i < Math.min(5, EX.length); i++) { t = EX[c[i]]; out.push(t[Math.floor(Math.random() * t.length)]); }
    return out;
  }

  function list() {
    try { var a = JSON.parse(A.recents()); return a instanceof Array ? a : []; } catch (e) { return []; }
  }

  function row(cls, html, val) {
    return '<button class="' + cls + '" data-v="' + esc(val) + '">' + (cls === "rc" ? '<span class="ri"></span>' : "") + '<span class="it">' + html + '</span><span class="chv"></span></button>';
  }

  function render() {
    var r = A && A.recents ? list() : [], s = "", i, n, ex;
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
      s += '<div class="hh"><span class="st">Essaie un exemple</span><button class="lk" id="again">Autres exemples</button></div>';
      ex = pick();
      for (i = 0; i < ex.length; i++) { s += row("ex", esc(ex[i][0]), ex[i][1]); }
      n = Math.floor(Math.random() * TIPS.length);
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
      if (N && N.show) { try { N.show(); } catch (x) { } }
      if (A && A.fill) { try { A.fill(t.getAttribute("data-v")); } catch (x) { } }
    } else if (t.id === "again") {
      render();
    } else if (t.id === "all" || t.id === "home") {
      mode = t.id === "all" ? "history" : "home";
      if (mode === "home" && N && N.show) { try { N.show(); } catch (x) { } }
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

  // Les exemples sont dans ms_ex.js ; s'il ne charge pas, on garde l'exemple de secours
  var sc = D.createElement("script");
  sc.src = BASE + "ms_ex.js?v=1";
  sc.onload = sc.onerror = function () {
    if (w.MS_EX && w.MS_EX.length > 4) { EX = w.MS_EX; }
    if (w.MS_TIPS && w.MS_TIPS.length) { TIPS = w.MS_TIPS; }
    render();
    w.MS_OK = true;
  };
  theme();
  D.head.appendChild(sc);
})(window);