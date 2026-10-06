/* MathSolver - affichage 3/4 : assemble la page (nécessite ms_parse.js et ms_view.js) */
(function (w) {
  "use strict";
  // page de solution : l'icône Accueil de la barre bleue revient
  try { if (w.MSHome && w.MSHome.mode) { w.MSHome.mode(false); } } catch (x) { }
  var P = w.MSP, V = w.MSV, D = w.MS_DATA || {};
  if (!P || !V) { return; }
  var BASE = "https://mathsolver-backend-gray.vercel.app/";
  var RETRY = "Appuie de nouveau sur « Résoudre ».";

  // pas de réseau : l'énoncé écrit (pas une photo) attend sur l'accueil
  function keep() {
    var q = String(D.q || "").trim();
    if (!q || D.img) { return 0; }
    try { w.MSStore.set("pend", q); return 1; } catch (e) { return 0; }
  }

  // { a: solution } ou { e: [titre, message, conseil, code] }
  function decide() {
    var raw = String(D.r || "").trim(), code = D.code || 0, j;
    if (D.net) {
      var slow = D.net === "timeout";
      return { e: [slow ? "Connexion trop lente" : "Connexion impossible", slow ? "Le réseau met trop de temps à répondre." : "L'appli n'arrive pas à joindre le service de résolution.", keep() ? "Ton exercice est gardé : retrouve-le sur l'accueil et appuie sur « Résoudre » dès que tu es connecté." : "Vérifie ta connexion Internet, puis appuie de nouveau sur « Résoudre ».", D.nd || ""] };
    }
    if (raw.charAt(0) !== "{") {
      var big = code === 413;
      return { e: [big ? "Photo trop lourde" : "Réponse inattendue", big ? "L'image envoyée est trop volumineuse pour le service." : "Le service a renvoyé une réponse que l'appli ne comprend pas.", big ? "Cadre la photo plus près de l'exercice, ou choisis une image plus légère." : "Réessaie dans quelques instants.", "HTTP " + code] };
    }
    try {
      j = JSON.parse(raw);
    } catch (e) {
      return { e: ["Une erreur est survenue", "L'affichage de la solution a échoué.", RETRY, String(e.message || e)] };
    }
    if (j.answer !== undefined) {
      var a = String(j.answer);
      if (!a.trim()) { return { e: ["Réponse vide", "Le service n'a rien renvoyé pour cet exercice.", RETRY, ""] }; }
      if (a.indexOf("@@HORSSUJET") >= 0 && a.indexOf("@@ETAPE") < 0) {
        return { o: 1, e: ["Maths uniquement", "MathSolver résout seulement des exercices de mathématiques.", "Écris un énoncé de maths (équation, fonction, suite, géométrie, probabilités…) ou prends-le en photo.", ""] };
      }
      var nv = a.match(/@@NIVEAU\s*:?\s*([a-z0-9]+)/i);
      if (nv && a.indexOf("@@ETAPE") < 0) { return { n: nv[1].toLowerCase() }; }
      return { a: fixNum(a) };
    }
    if (j.error !== undefined) {
      return { e: [j.title !== undefined ? String(j.title) : "Une erreur est survenue", String(j.error) || "Le service n'a pas pu terminer la résolution.", j.hint !== undefined ? String(j.hint) : "Réessaie dans quelques instants.", j.detail !== undefined ? String(j.detail) : ""] };
    }
    return { e: ["Une erreur est survenue", "La réponse du service est incomplète.", "Réessaie dans quelques instants.", ""] };
  }

  // Virgule décimale dans une formule : 2,8 -> 2{,}8 (sinon KaTeX écrit « 2, 8 »)
  var MATH = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^$\n]+?\$/g;
  function fixNum(a) {
    return a.replace(MATH, function (m) {
      return m.replace(/\d+(?:,\d+)+/g, function (t) { return t.split(",").length === 2 ? t.replace(",", "{,}") : t; });
    });
  }

  // Mode nuit (pont MSPref)
  function theme() {
    var d = false, r = document.documentElement, l = document.getElementById("msdk"), app = document.getElementById("app");
    try { d = !!(w.MSPref && w.MSPref.dark()); } catch (e) { }
    r.className = d ? "dk" : "";
    r.style.background = d ? "#0e1424" : "";
    if (d && !l && app) {
      l = document.createElement("link");
      l.id = "msdk"; l.rel = "stylesheet"; l.href = BASE + "dark.css?v=1";
      app.style.visibility = "hidden";
      l.onload = l.onerror = function () { app.style.visibility = ""; };
      setTimeout(function () { app.style.visibility = ""; }, 1500);
      document.head.appendChild(l);
    }
    if (l) { l.disabled = !d; }
  }
  w.msTheme = theme;

  function loadSeq(urls, i) {
    if (i >= urls.length) { return; }
    var s = document.createElement("script");
    s.src = urls[i];
    s.onload = s.onerror = function () { loadSeq(urls, i + 1); };
    document.body.appendChild(s);
  }

  function renderMath() {
    if (w.renderMathInElement) {
      w.renderMathInElement(document.body, {
        delimiters: [{ left: "$$", right: "$$", display: true }, { left: "\\[", right: "\\]", display: true }, { left: "\\(", right: "\\)", display: false }, { left: "$", right: "$", display: false }],
        ignoredClasses: ["etx"],
        throwOnError: false
      });
    }
    V.fit();
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(V.fit); }
    w.addEventListener("resize", V.fit);
  }

  function run() {
    var app = document.getElementById("app");
    if (!app) { return; }
    V.style();
    theme();
    var d = decide(), html = V.exo(D.q, D.img), S = null;
    if (d.n) {
      w.MS_NV = d.n;
      html += '<div id="nvx"></div>';
    } else if (d.e) {
      html += V.err(d.e[0], d.e[1], d.e[2], d.e[3]);
    } else {
      S = P.parse(d.a);
      html += V.cards(S);
      if (S.funcs.length) { html += '<div id="extras"></div>'; }
      html += '<div id="rep"></div>';
    }
    app.innerHTML = html;
    if (d.o) { var ic = app.querySelector(".err .ic"); if (ic) { ic.textContent = "∑"; ic.style.background = "#e4edff"; ic.style.color = "#1a4db5"; } }
    V.grip();
    if (d.n) { loadSeq([BASE + "ms_lvl.js?v=1"], 0); }
    if (S && S.funcs.length) {
      w.MS_FUNCS = S.funcs;
      loadSeq(["https://cdn.jsdelivr.net/npm/mathjs@12.4.2/lib/browser/math.js", BASE + "plot_core.js?v=5", BASE + "plot_draw.js?v=5", BASE + "plot.js?v=5"], 0);
    }
    if (S) {
      w.MS_CTX = { q: String(D.q || ""), a: d.a };
      try { if (w.MSStore.get("pend") === String(D.q || "").trim()) { w.MSStore.del("pend"); } } catch (e) { }
      loadSeq([BASE + "ms_ui.js?v=1"].concat(w.MSVoice ? [BASE + "ms_fr.js?v=1", BASE + "ms_say.js?v=1"] : [], [BASE + "report.js?v=1"]), 0);
    }
    w.MS_OK = true;
    loadSeq([BASE + "ms_go.js?v=1", BASE + "ed_model.js?v=2", BASE + "ed_parse.js?v=2", BASE + "ed_seg.js?v=2", BASE + "ms_fx.js?v=1"], 0);
    if (document.readyState === "complete") { renderMath(); } else { w.addEventListener("load", renderMath); }
  }

  try {
    run();
  } catch (e) {
    var box = document.getElementById("app");
    if (box) { box.innerHTML = V.err("Une erreur est survenue", "L'affichage de la solution a échoué.", RETRY, String(e && e.message || e)); w.MS_OK = true; }
  }
})(window);
