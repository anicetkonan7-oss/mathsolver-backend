/* MathSolver - les espaces de l'accueil (Cours, Formules, Exercices, Évaluation, Examens, Progression) et les exemples du niveau */
(function (w) {
  "use strict";
  var D = document, sel = "", LIVE = {}, K = ["cours", "formules", "exercices", "eval", "examens", "progres"];
  var CO = ["#1a62e8", "#7048e8", "#e8590c", "#2b8a3e", "#c2255c", "#0b7285"];
  var IC = [
    '<path d="M12 6c-2-1.3-4.5-2-8-2v13c3.5 0 6 .7 8 2 2-1.3 4.5-2 8-2V4c-3.5 0-6 .7-8 2zM12 6v13"/>',
    '<path d="M18 5H7l6 7-6 7h11"/>',
    '<path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3"/>',
    '<path d="M6 4h12v17H6zM9 4V3h6v1M9 13l2 2 4-4"/>',
    '<path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2.5 9 2.5 12 0v-5"/>',
    '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>'
  ];
  var TX = {
    fr: {
      h: "Tes espaces", s: "Bientôt", p: "Bientôt disponible",
      n: ["Cours", "Formules", "Exercices", "Évaluation", "Examens", "Progression"],
      d: ["Les leçons de ton niveau{l}, expliquées simplement, avec des exemples.", "Toutes les formules de ton niveau{l}, classées par chapitre, à retrouver en un instant.", "Des exercices de ton niveau{l}, du plus facile au plus difficile, avec correction détaillée.", "Un test noté avec un temps limité, puis une correction comme sur une copie.", "Des sujets d'examens blancs pour t'entraîner dans les conditions réelles.", "Suis tes points, tes séries de jours et tes badges."]
    },
    en: {
      h: "Your spaces", s: "Soon", p: "Coming soon",
      n: ["Lessons", "Formulas", "Exercises", "Assessment", "Mock exams", "Progress"],
      d: ["Lessons for your level{l}, explained simply, with examples.", "All the formulas for your level{l}, by chapter, in one tap.", "Exercises for your level{l}, from easy to hard, with detailed solutions.", "A timed, graded test, then a correction like on a real paper.", "Mock exam papers to practise in real conditions.", "Follow your points, your day streaks and your badges."]
    }
  };
  var CSS = ".sp{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:0 12px;}" +
    ".sp button{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 2px 9px;background:#fff;border:1px solid #e1e7f2;border-radius:16px;color:#0f1b33;font-size:13px;font-weight:700;line-height:1.2;text-align:center;}" +
    ".sp button:active{background:#eef3ff;}.sp button.on{border-color:#1a62e8;box-shadow:0 0 0 2px #cfe0ff;}" +
    ".sp i{display:flex;align-items:center;justify-content:center;width:46px;height:46px;margin-bottom:2px;border-radius:15px;}" +
    ".sp svg{width:25px;height:25px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}" +
    ".sp small{font-size:11px;font-weight:600;color:#6b7791;}" +
    ".spi{margin:10px 12px 0;padding:14px 16px;border-radius:16px;background:#e8f0ff;color:#1741a6;font-size:14px;line-height:1.5;}" +
    ".spi b{display:block;margin-bottom:2px;font-size:16px;color:#0f1b33;}" +
    ".spi em{display:inline-block;margin-top:8px;padding:3px 10px;border-radius:99px;background:#fff;font-style:normal;font-size:12px;font-weight:700;color:#1a4db5;}" +
    ".dk .sp button{background:#172033;border-color:#26324a;color:#eef2fb;}.dk .sp button:active{background:#1d2a47;}" +
    ".dk .sp button.on{border-color:#4d8bff;box-shadow:0 0 0 2px #1f3b78;}.dk .sp small{color:#93a2c4;}" +
    ".dk .spi{background:#16264a;color:#b9cffd;}.dk .spi b{color:#eef2fb;}.dk .spi em{background:#0e1424;color:#8fb4ff;}";

  function lg() { return w.MSAC && w.MSAC.lang() === "en" ? "en" : "fr"; }
  function pf() { return w.MSAC ? w.MSAC.P() : {}; }

  function inner() {
    var T = TX[lg()], P = pf(), s = "", i, k;
    s += '<div class="sp">';
    for (i = 0; i < K.length; i++) {
      s += '<button data-sp="' + K[i] + '"' + (sel === K[i] ? ' class="on"' : "") + '><i style="background:' + CO[i] + '"><svg viewBox="0 0 24 24">' + IC[i] + "</svg></i>" + T.n[i] + (LIVE[K[i]] ? "" : "<small>" + T.s + "</small>") + "</button>";
    }
    s += "</div>";
    k = K.indexOf(sel);
    if (k >= 0) {
      s += '<div class="spi"><b>' + T.n[k] + "</b>" + T.d[k].replace("{l}", P.ln ? " (" + w.MSAC.esc(P.ln) + ")" : "") + "<br><em>" + T.p + "</em></div>";
    }
    return s;
  }

  // la grille des espaces, avec son titre
  function grid() {
    return '<div class="hh"><span class="st">' + TX[lg()].h + '</span></div><div id="spg">' + inner() + "</div>";
  }

  // jusqu'à n exemples du niveau de l'élève : [affichage, texte envoyé] ; null si le niveau est inconnu
  function ex(n) {
    var P = pf(), a = w.MS_EXL && P.lv ? w.MS_EXL[P.lv] : null, c = [], o = [], i, j, t;
    if (!a || !a.length) { return null; }
    for (i = 0; i < a.length; i++) { c.push(i); }
    for (i = c.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = c[i]; c[i] = c[j]; c[j] = t; }
    for (i = 0; i < Math.min(n, a.length); i++) {
      t = a[c[i]];
      o.push(typeof t === "string" ? [t, t] : t);
    }
    return o;
  }

  D.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-sp]") : null, k, g;
    if (!b) { return; }
    k = b.getAttribute("data-sp");
    if (LIVE[k]) { try { LIVE[k](); } catch (x) { } return; }
    sel = sel === k ? "" : k;
    g = D.getElementById("spg");
    if (g) { g.innerHTML = inner(); }
  });

  var st = D.createElement("style");
  st.id = "spcss";
  st.appendChild(D.createTextNode(CSS));
  D.head.appendChild(st);

  w.MSSP = { grid: grid, ex: ex, live: LIVE };
})(window);