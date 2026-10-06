/* MathSolver - visite guidée de l'accueil : une bulle montre chaque élément et explique son rôle (au premier lancement, puis depuis le menu) */
(function (w) {
  "use strict";
  if (w.MSTOUR) { return; }
  var D = document, i = 0, ov = null, S = [], done = false;
  var CSS = "#tour{position:fixed;inset:0;z-index:130;}#tour .tsp{position:fixed;border-radius:18px;box-shadow:0 0 0 9999px rgba(8,14,28,.62),inset 0 0 0 3px #fff;transition:all .3s ease;pointer-events:none;}" +
    "#tour .tsp.no{width:0;height:0;left:50%;top:40%;box-shadow:0 0 0 9999px rgba(8,14,28,.62);}" +
    "#tour .tbl{position:fixed;left:12px;right:12px;max-width:440px;margin:0 auto;padding:16px;border-radius:18px;background:#fff;color:#0f1b33;box-shadow:0 14px 36px rgba(0,0,0,.3);animation:tbi .28s ease-out;}" +
    "#tour .tbl b{display:block;margin-bottom:6px;font-size:17px;}#tour .tbl p{margin:0;font-size:14.5px;line-height:1.5;color:#33415e;}" +
    "#tour .tnt{position:absolute;width:16px;height:16px;background:#fff;border-radius:3px;transform:rotate(45deg);}" +
    "#tour .tup{position:fixed;top:4px;font-size:30px;line-height:1;color:#fff;animation:tbo 1s ease-in-out infinite;}" +
    "#tour .trw{display:flex;align-items:center;gap:8px;margin-top:14px;}#tour .tdt{flex:1;display:flex;gap:5px;}#tour .tdt i{width:6px;height:6px;border-radius:6px;background:#cfd8ea;transition:all .25s;}#tour .tdt i.on{width:18px;background:#1a62e8;}" +
    "#tour .tbn{min-height:42px;padding:0 16px;border-radius:12px;font-size:14.5px;font-weight:800;}#tour .tbn.p{background:#1a62e8;color:#fff;}#tour .tbn.s{background:#eef2fa;color:#41507a;font-weight:700;}" +
    "#tour label{display:flex;align-items:center;gap:10px;margin:12px 0 0;font-size:14px;color:#33415e;}#tour input{width:20px;height:20px;margin:0;}" +
    "@keyframes tbo{50%{transform:translateY(-6px);}}@keyframes tbi{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}" +
    "@media (prefers-reduced-motion:reduce){#tour .tsp{transition:none;}#tour .tup,#tour .tbl{animation:none;}}" +
    ".dk #tour .tbl,.dk #tour .tnt{background:#172033;color:#eef2fb;}.dk #tour .tbl p,.dk #tour label{color:#c5d1ea;}.dk #tour .tbn.s{background:#1f2a42;color:#c5d1ea;}";
  var G = '.sp [data-sp="', LIT = { a: ["cours", "formules"], e: ["exercices", "eval", "examens"], p: ["progres"] };
  // [cible, titre, texte, tuiles éclairées] ; « < » et « > » : flèche vers le menu ou les réglages de la barre bleue
  function steps() {
    var bar = !!D.querySelector("#msbar"), gear = !!(w.MSHome && w.MSHome.settings);
    return [
      [null, "Bienvenue sur MathSolver 👋", "Ton prof de maths de poche : il résout tes exercices étape par étape, t'explique tes cours et t'entraîne pour tes devoirs, le BEPC et le BAC. Visite en 30 secondes."],
      [bar ? "#msbar" : "^", "Résoudre un exercice", bar ? "Touche la barre pour écrire ton exercice : elle s'agrandit pour tout voir. Tu peux aussi le dicter ou le prendre en photo, puis touche la flèche bleue." : "Écris ton exercice ou prends-le en photo dans la barre tout en haut, puis touche « Résoudre » : la solution arrive étape par étape."],
      ["#hub", "Ta journée", "Ton niveau et tes points, tes jours d'affilée, l'objectif et le défi du jour. Le bouton blanc te ramène à ce qui compte : ton devoir, ta série ou ton dernier chapitre."],
      [".sp", "Apprendre", "Cours : les leçons de ton niveau, avec des exemples. Formules : toutes les formules par chapitre, à retrouver en un instant.", "a"],
      [".sp", "S'entraîner", "Exercices du plus facile au plus difficile, Évaluation chronométrée sur une vraie copie, et Examens : des sujets type BEPC et BAC dans les conditions réelles.", "e"],
      [".sp", "Se suivre", "Progression : ton niveau, tes points, tes badges et ta maîtrise de chaque chapitre.", "p"],
      ["<", "Le menu", "En haut à gauche : ton profil, l'historique, tes corrections enregistrées… et ce guide, à revoir quand tu veux."],
      gear ? [">", "Les paramètres", "En haut à droite : la taille du texte, le mode nuit, la langue et les sons."] : null
    ].filter(function (s) { return s && (!s[0] || s[0].length === 1 || D.querySelector(s[0])); });
  }
  function rs(k) { try { return w.MSStore.get(k) || ""; } catch (x) { return ""; } }
  function ws(k, v) { try { w.MSStore.set(k, v); } catch (x) { } }
  function dim(k) {
    D.querySelectorAll(".sp [data-sp]").forEach(function (b) { b.classList.toggle("tdim", !!k && LIT[k].indexOf(b.getAttribute("data-sp")) < 0); });
  }
  function draw() {
    var s = S[i], t = s[0] && s[0].length > 1 ? D.querySelector(s[0]) : null, sp = ov.querySelector(".tsp"), b = ov.querySelector(".tbl"), up = ov.querySelector(".tup"), last = i === S.length - 1, dots = "", k, r, y, nt;
    for (k = 0; k < S.length; k++) { dots += "<i" + (k === i ? ' class="on"' : "") + "></i>"; }
    dim(s[3] || "");
    if (t) { t.scrollIntoView({ block: "center" }); }
    b.innerHTML = '<span class="tnt" hidden></span><b>' + s[1] + "</b><p>" + s[2] + "</p>" + (last ? '<label><input type="checkbox" id="tall"' + (rs("tour") === "all" ? " checked" : "") + "> Revoir ce guide à chaque ouverture</label>" : "") +
      '<div class="trw"><span class="tdt" aria-label="Étape ' + (i + 1) + " sur " + S.length + '">' + dots + "</span>" + (last ? "" : '<button class="tbn s" data-t="x">Passer</button>') + '<button class="tbn p" data-t="n">' + (last ? "C'est parti !" : i ? "Suivant" : "Visiter") + "</button></div>";
    up.style.display = s[0] && s[0].length === 1 ? "" : "none";
    up.style.left = s[0] === "<" ? "18px" : s[0] === ">" ? "auto" : "50%";
    up.style.right = s[0] === ">" ? "18px" : "auto";
    up.style.transform = s[0] === "^" ? "translateX(-50%)" : "none";
    setTimeout(function () {
      if (!ov) { return; }
      nt = b.querySelector(".tnt");
      if (t) {
        r = t.getBoundingClientRect();
        sp.className = "tsp"; sp.style.cssText = "left:" + (r.left - 5) + "px;top:" + (r.top - 5) + "px;width:" + (r.width + 10) + "px;height:" + (r.height + 10) + "px";
        if (r.bottom + 18 + b.offsetHeight < w.innerHeight - 8) { y = r.bottom + 18; nt.style.cssText = "top:-7px"; } else { y = Math.max(10, r.top - 18 - b.offsetHeight); nt.style.cssText = "bottom:-7px"; }
        nt.style.left = Math.max(14, Math.min(b.offsetWidth - 30, r.left + r.width / 2 - b.getBoundingClientRect().left - 8)) + "px";
        nt.hidden = false;
      } else { sp.className = "tsp no"; sp.style.cssText = ""; y = s[0] ? 56 : Math.max(20, (w.innerHeight - b.offsetHeight) / 2); }
      b.style.top = y + "px";
    }, t ? 140 : 0);
  }
  function end() {
    var c = D.getElementById("tall");
    ws("tour", c ? (c.checked ? "all" : "1") : rs("tour") || "1");
    ws("tourT", String(Date.now()));
    dim("");
    if (ov) { ov.remove(); ov = null; }
    w.scrollTo(0, 0);
  }
  function start() {
    if (ov || !D.querySelector("#app .sp")) { return; }
    if (w.MSSP && w.MSSP.busy && w.MSSP.busy()) { try { w.MSAC.toast("Termine d'abord ton devoir : le guide sera là après."); } catch (x) { } return; }
    done = true;
    try { if (w.MSBAR) { w.MSBAR.shut(); } } catch (x) { }
    S = steps(); i = 0;
    if (!D.getElementById("tourcss")) { var st = D.createElement("style"); st.id = "tourcss"; st.textContent = CSS; D.head.appendChild(st); }
    ov = D.createElement("div"); ov.id = "tour"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", "Visite guidée");
    ov.innerHTML = '<div class="tsp no"></div><div class="tup" aria-hidden="true">↑</div><div class="tbl"></div>';
    ov.addEventListener("click", function (ev) {
      var b = ev.target.closest ? ev.target.closest("[data-t]") : null;
      if (!b) { return; }
      if (b.getAttribute("data-t") === "x" || i === S.length - 1) { end(); return; }
      i++; draw();
    });
    D.body.appendChild(ov);
    draw();
  }
  // au premier lancement ; ensuite seulement si l'élève a choisi « à chaque ouverture » (au plus une fois toutes les 20 minutes)
  function auto() {
    var t = rs("tour");
    if (done || ov) { return; }
    if (w.MSSP && w.MSSP.busy && w.MSSP.busy()) { return; }
    if (!t || (t === "all" && Date.now() - (+rs("tourT") || 0) > 20 * 60000)) { start(); }
  }
  // retour du téléphone pendant la visite : on la ferme
  D.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target.closest("#home") : null;
    if (t && ov) { ev.stopImmediatePropagation(); ev.preventDefault(); end(); }
  }, true);
  w.MSTOUR = { start: start, auto: auto, on: function () { return !!ov; } };
})(window);
