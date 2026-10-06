/* MathSolver - guide de l'accueil : une bulle montre chaque élément et explique son rôle (au premier lancement, puis depuis le menu) */
(function (w) {
  "use strict";
  if (w.MSTOUR) { return; }
  var D = document, i = 0, ov = null, S = [], done = false;
  var CSS = "#tour{position:fixed;inset:0;z-index:130;}#tour .tsp{position:fixed;border-radius:16px;box-shadow:0 0 0 9999px rgba(8,14,28,.66);transition:all .25s ease;pointer-events:none;}" +
    "#tour .tsp.no{width:0;height:0;left:50%;top:40%;}#tour .tbl{position:fixed;left:12px;right:12px;max-width:440px;margin:0 auto;padding:16px;border-radius:18px;background:#fff;color:#0f1b33;box-shadow:0 12px 34px rgba(0,0,0,.3);}" +
    "#tour .tbl b{display:block;margin-bottom:4px;font-size:17px;}#tour .tbl p{margin:0 0 12px;font-size:15px;line-height:1.5;color:#33415e;}#tour .tup{position:fixed;left:50%;top:6px;transform:translateX(-50%);font-size:30px;color:#fff;animation:tbo 1s ease-in-out infinite;}" +
    "#tour .tlf{left:22px;transform:none;}#tour .trw{display:flex;align-items:center;gap:8px;}#tour .tdt{flex:1;font-size:12.5px;color:#5b6784;}#tour .tbn{min-height:42px;padding:0 16px;border-radius:12px;font-size:15px;font-weight:800;}" +
    "#tour .tbn.p{background:#1a62e8;color:#fff;}#tour .tbn.s{background:#eef2fa;color:#41507a;}#tour label{display:flex;align-items:center;gap:8px;margin:0 0 12px;font-size:14px;color:#33415e;}#tour input{width:20px;height:20px;}" +
    "@keyframes tbo{50%{transform:translate(-50%,-6px);}}#tour .tlf{animation:none;}@media (prefers-reduced-motion:reduce){#tour .tsp{transition:none;}#tour .tup{animation:none;}}" +
    ".dk #tour .tbl{background:#172033;color:#eef2fb;}.dk #tour .tbl p,.dk #tour label{color:#c5d1ea;}.dk #tour .tbn.s{background:#1f2a42;color:#c5d1ea;}";
  function steps() {
    return [
      [null, "Bienvenue sur MathSolver 👋", "Ton prof de maths de poche : il résout tes exercices étape par étape, t'explique tes cours et t'entraîne pour tes devoirs, le BEPC et le BAC. Je te fais visiter en 1 minute."],
      ["^", "Résoudre un exercice", "Écris ton exercice ou prends-le en photo dans la barre tout en haut, puis touche « Résoudre » : la solution arrive étape par étape."],
      ["#hub", "Ta progression", "Ton niveau, tes jours d'affilée 🔥, l'objectif du jour et un défi pour gagner des points. « Continuer » te ramène là où tu t'étais arrêté."],
      ['.sp [data-sp="cours"]', "Cours", "Les leçons de ton niveau, expliquées simplement, avec des exemples."],
      ['.sp [data-sp="formules"]', "Formules", "Toutes les formules par chapitre, à retrouver en un instant."],
      ['.sp [data-sp="exercices"]', "Exercices", "Entraîne-toi du plus facile au plus difficile, avec des indices et la correction. Ton niveau se met à jour à chaque exercice."],
      ['.sp [data-sp="eval"]', "Évaluation", "Une interrogation ou un devoir chronométré, sur une vraie copie, puis une note sur 20 et une correction comme celle d'un prof."],
      ['.sp [data-sp="examens"]', "Examens", "Bientôt : des sujets type BEPC et BAC dans les conditions réelles."],
      ['.sp [data-sp="progres"]', "Progression", "Tes points, tes badges et ta maîtrise de chaque chapitre."],
      ["<", "Le menu", "En haut à gauche : ton profil, l'historique, tes corrections enregistrées et ce guide."],
      [null, "C'est parti ! 🚀", "Commence par un exercice : chaque réussite te rapporte des points."]
    ].filter(function (s) { return !s[0] || s[0].length === 1 || D.querySelector(s[0]); });
  }
  function rs(k) { try { return w.MSStore.get(k) || ""; } catch (x) { return ""; } }
  function ws(k, v) { try { w.MSStore.set(k, v); } catch (x) { } }
  function draw() {
    var s = S[i], t = s[0] && s[0].length > 1 ? D.querySelector(s[0]) : null, sp = ov.querySelector(".tsp"), b = ov.querySelector(".tbl"), last = i === S.length - 1, r, y;
    if (t) { t.scrollIntoView({ block: "center" }); }
    b.innerHTML = "<b>" + s[1] + "</b><p>" + s[2] + "</p>" + (last ? '<label><input type="checkbox" id="tall"' + (rs("tour") === "all" ? " checked" : "") + "> Revoir ce guide à chaque ouverture</label>" : "") +
      '<div class="trw"><span class="tdt">' + (i + 1) + " / " + S.length + "</span>" + (last ? "" : '<button class="tbn s" data-t="x">Passer</button>') + '<button class="tbn p" data-t="n">' + (last ? "Commencer" : i ? "Suivant" : "Visiter") + "</button></div>";
    ov.querySelector(".tup").style.display = s[0] === "^" || s[0] === "<" ? "" : "none";
    ov.querySelector(".tup").className = "tup" + (s[0] === "<" ? " tlf" : "");
    setTimeout(function () {
      if (!ov) { return; }
      if (t) {
        r = t.getBoundingClientRect();
        sp.className = "tsp"; sp.style.cssText = "left:" + (r.left - 6) + "px;top:" + (r.top - 6) + "px;width:" + (r.width + 12) + "px;height:" + (r.height + 12) + "px";
        y = r.bottom + 16 + b.offsetHeight < w.innerHeight ? r.bottom + 16 : Math.max(10, r.top - 16 - b.offsetHeight);
      } else { sp.className = "tsp no"; sp.style.cssText = ""; y = s[0] ? 56 : Math.max(20, (w.innerHeight - b.offsetHeight) / 2); }
      b.style.top = y + "px";
    }, t ? 120 : 0);
  }
  function end() {
    var c = D.getElementById("tall");
    ws("tour", c ? (c.checked ? "all" : "1") : rs("tour") || "1");
    ws("tourT", String(Date.now()));
    if (ov) { ov.remove(); ov = null; }
    w.scrollTo(0, 0);
  }
  function start(force) {
    if (ov || !D.querySelector("#app .sp")) { return; }
    done = true;
    S = steps(); i = 0;
    if (!D.getElementById("tourcss")) { var st = D.createElement("style"); st.id = "tourcss"; st.textContent = CSS; D.head.appendChild(st); }
    ov = D.createElement("div"); ov.id = "tour"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", "Guide de l'appli");
    ov.innerHTML = '<div class="tsp no"></div><div class="tup">↑</div><div class="tbl"></div>';
    ov.addEventListener("click", function (ev) {
      var b = ev.target.closest ? ev.target.closest("[data-t]") : null;
      if (!b) { return; }
      if (b.getAttribute("data-t") === "x" || i === S.length - 1) { end(); return; }
      i++; draw();
    });
    D.body.appendChild(ov);
    draw();
    return force;
  }
  // au premier lancement ; ensuite seulement si l'élève a choisi « à chaque ouverture » (au plus une fois toutes les 20 minutes)
  function auto() {
    var t = rs("tour");
    if (done || ov) { return; }
    if (w.MSSP && w.MSSP.busy && w.MSSP.busy()) { return; }
    if (!t || (t === "all" && Date.now() - (+rs("tourT") || 0) > 20 * 60000)) { start(0); }
  }
  w.MSTOUR = { start: start, auto: auto, on: function () { return !!ov; } };
})(window);
