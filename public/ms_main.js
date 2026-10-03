/* MathSolver - affichage 3/4 : assemble la page (nécessite ms_parse.js et ms_view.js) */
(function (w) {
  "use strict";
  var P = w.MSP, V = w.MSV, D = w.MS_DATA || {};
  if (!P || !V) { return; }
  var BASE = "https://mathsolver-backend-gray.vercel.app/";
  var RETRY = "Appuie de nouveau sur « Résoudre ».";

  // Que contient la réponse ? { a: texte de la solution } ou { e: [titre, message, conseil, code] }
  function decide() {
    var raw = String(D.r || "").trim(), code = D.code || 0, j;
    if (D.net) {
      var slow = D.net === "timeout";
      return { e: [slow ? "Connexion trop lente" : "Connexion impossible", slow ? "Le réseau met trop de temps à répondre." : "L'appli n'arrive pas à joindre le service de résolution.", "Vérifie ta connexion Internet, puis appuie de nouveau sur « Résoudre ».", D.nd || ""] };
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
      return { a: a };
    }
    if (j.error !== undefined) {
      return { e: [j.title !== undefined ? String(j.title) : "Une erreur est survenue", String(j.error) || "Le service n'a pas pu terminer la résolution.", j.hint !== undefined ? String(j.hint) : "Réessaie dans quelques instants.", j.detail !== undefined ? String(j.detail) : ""] };
    }
    return { e: ["Une erreur est survenue", "La réponse du service est incomplète.", "Réessaie dans quelques instants.", ""] };
  }

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
    var d = decide(), html = V.exo(D.q, D.img), S = null;
    if (d.e) {
      html += V.err(d.e[0], d.e[1], d.e[2], d.e[3]);
    } else {
      S = P.parse(d.a);
      html += V.cards(S);
      if (S.funcs.length) { html += '<div id="extras"></div>'; }
      if (S.titles.length) { html += '<div id="rep"></div>'; }
    }
    app.innerHTML = html;
    V.grip();
    if (S && S.funcs.length) {
      w.MS_FUNCS = S.funcs;
      loadSeq(["https://cdn.jsdelivr.net/npm/mathjs@12.4.2/lib/browser/math.js", BASE + "plot_core.js?v=5", BASE + "plot_draw.js?v=5", BASE + "plot.js?v=5"], 0);
    }
    if (S) {
      w.MS_CTX = { q: String(D.q || ""), a: d.a };
      loadSeq([BASE + "ms_ui.js?v=1"].concat(S.titles.length ? [BASE + "report.js?v=1"] : []), 0);
    }
    w.MS_OK = true;
    if (document.readyState === "complete") { renderMath(); } else { w.addEventListener("load", renderMath); }
  }

  try {
    run();
  } catch (e) {
    var box = document.getElementById("app");
    if (box) { box.innerHTML = V.err("Une erreur est survenue", "L'affichage de la solution a échoué.", RETRY, String(e && e.message || e)); w.MS_OK = true; }
  }
})(window);