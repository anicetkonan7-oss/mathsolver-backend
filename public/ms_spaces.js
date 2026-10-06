/* MathSolver - les espaces de l'accueil (Cours, Formules, Exercices, Évaluation, Examens, Progression) et les exemples du niveau */
(function (w) {
  "use strict";
  var D = document, sel = "", LIVE = {}, SRC = { formules: "ms_form.js?v=1", cours: "ms_cours.js?v=1", exercices: "ms_exo.js?v=1", eval: "ms_eval.js?v=1", progres: "ms_prog.js?v=1" }, FMOK = { l3: 1, l2: 1, lt: 1 }, EXOK = { l3: 1, lt: 1 }, busy = {}, K = ["cours", "formules", "exercices", "eval", "examens", "progres"];
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
      h: "Tes espaces", s: "Bientôt", o: "Ouvert", w: "Nouveau", p: "Bientôt disponible",
      n: ["Cours", "Formules", "Exercices", "Évaluation", "Examens", "Progression"],
      d: ["Les leçons de ton niveau{l}, expliquées simplement, avec des exemples.", "Toutes les formules de ton niveau{l}, classées par chapitre, à retrouver en un instant.", "Des exercices de ton niveau{l}, du plus facile au plus difficile, avec correction détaillée.", "Un test noté avec un temps limité, puis une correction comme sur une copie.", "Des sujets d'examens blancs pour t'entraîner dans les conditions réelles.", "Suis tes points, tes séries de jours et tes badges."]
    },
    en: {
      h: "Your spaces", s: "Soon", o: "Open", w: "New", p: "Coming soon",
      n: ["Lessons", "Formulas", "Exercises", "Assessment", "Mock exams", "Progress"],
      d: ["Lessons for your level{l}, explained simply, with examples.", "All the formulas for your level{l}, by chapter, in one tap.", "Exercises for your level{l}, from easy to hard, with detailed solutions.", "A timed, graded test, then a correction like on a real paper.", "Mock exam papers to practise in real conditions.", "Follow your points, your day streaks and your badges."]
    }
  };
  var CSS = ".sp{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:0 12px;}" +
    ".sp button{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 2px 9px;background:#fff;border:1px solid #e1e7f2;border-radius:16px;color:#0f1b33;font-size:13px;font-weight:700;line-height:1.2;text-align:center;}" +
    ".sp button:active{background:#eef3ff;}.sp button.on{border-color:#1a62e8;box-shadow:0 0 0 2px #cfe0ff;}" +
    ".sp i{display:flex;align-items:center;justify-content:center;width:44px;height:44px;margin-bottom:2px;border-radius:12px;}" +
    ".sp svg{width:25px;height:25px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}" +
    ".sp small{font-size:11px;font-weight:600;color:#5b6784;}.sp small.lv{color:#1a4db5;font-weight:700;}.dk .sp small.lv{color:#8fb4ff;}.sp small.nw{padding:1px 8px;border-radius:9px;background:#fff1cc;color:#7a4f00;font-weight:800;}" +
    ".spi{margin:10px 12px 0;padding:14px 16px;border-radius:16px;background:#e8f0ff;color:#1741a6;font-size:14px;line-height:1.5;}" +
    ".spi b{display:block;margin-bottom:2px;font-size:16px;color:#0f1b33;}" +
    ".spi em{display:inline-block;margin-top:8px;padding:3px 10px;border-radius:99px;background:#fff;font-style:normal;font-size:12px;font-weight:700;color:#1a4db5;}" +
    ".dk .sp button{background:#172033;border-color:#26324a;color:#eef2fb;}.dk .sp button:active{background:#1d2a47;}" +
    ".dk .sp button.on{border-color:#4d8bff;box-shadow:0 0 0 2px #1f3b78;}.dk .sp small{color:#93a2c4;}.dk .sp small.nw{background:#3a2f12;color:#ffd77a;}" +
    ".dk .spi{background:#16264a;color:#b9cffd;}.dk .spi b{color:#eef2fb;}.dk .spi em{background:#0e1424;color:#8fb4ff;}" +
    ".sp button{position:relative;}.sp .bdg{position:absolute;top:6px;right:6px;padding:1px 7px;border-radius:9px;background:#e03131;color:#fff;font-size:10.5px;font-weight:800;font-variant-numeric:tabular-nums;}.sp .bdg.s{background:#e8590c;}" +
    ".spd{display:flex;align-items:center;gap:12px;box-sizing:border-box;width:calc(100% - 24px);margin:0 12px 10px;padding:12px 14px;border-radius:16px;background:#fff4f4;border:1.5px solid #f3b4b4;color:#0f1b33;text-align:left;font-size:13.5px;line-height:1.35;}" +
    ".spd.s{background:#fff7ec;border-color:#f5c99a;}.spd .spk{flex:none;font-style:normal;min-width:58px;padding:6px 8px;border-radius:12px;background:#e03131;color:#fff;font-size:16px;font-weight:800;text-align:center;font-variant-numeric:tabular-nums;}.spd.s .spk{background:#e8590c;font-size:13px;}" +
    ".spd span{flex:1;min-width:0;}.spd b{display:block;font-size:15px;}.spd em{flex:none;font-style:normal;font-weight:800;color:#c92a2a;}.spd.s em{color:#b4510a;}" +
    ".dk .spd{background:#2a1618;border-color:#6b2a2a;color:#eef2fb;}.dk .spd.s{background:#2a1f12;border-color:#6b4a22;}.dk .spd em{color:#ff8a80;}.dk .spd.s em{color:#ffb070;}" +
    ".sp button{min-height:96px;justify-content:center;transition:opacity .25s;}.sp button.tdim{opacity:.22;}.sp small.so{padding:1px 8px;border-radius:9px;background:#eef2fa;}.dk .sp small.so{background:#1f2a42;}";

  function lg() { return w.MSAC && w.MSAC.lang() === "en" ? "en" : "fr"; }
  function pf() { return w.MSAC ? w.MSAC.P() : {}; }

  function rs(k) { try { return w.MSStore.get(k) || ""; } catch (x) { return ""; } }
  function rj(k) { try { return JSON.parse(rs(k) || "null"); } catch (x) { return null; } }
  function mm(t) { t = Math.max(0, Math.ceil(t)); var m = Math.floor(t / 60), r = t % 60; return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r; }
  // devoir en cours du niveau : temps restant réel (le chrono tourne même appli fermée, sauf pendant une pause)
  function left(d) { var t = Date.now(); if (d.paused) { return Math.max(0, d.left - (t > d.pend ? (t - d.pend) / 1000 : 0)); } return Math.max(0, d.end ? (d.end - t) / 1000 : d.left); }
  function dv() { var d = rj("evcur"), P = pf(); return d && !d.done && (!P.lv || d.lv === P.lv) ? d : null; }
  function serie() { var r = rj("excur"), P = pf(); return r && (!P.lv || r.lv === P.lv) ? r : null; }
  // un espace est ouvert seulement s'il a du contenu pour le niveau de l'élève (exercices et évaluations : 3e et Terminale)
  function on(k) { var P = pf(); return !!(LIVE[k] || SRC[k]) && ((k !== "formules" && k !== "cours") || !P.lv || !!FMOK[P.lv]) && ((k !== "exercices" && k !== "eval") || !!EXOK[P.lv]); }

  function bar() { return !!(w.MSBAR && w.MSBAR.on()); }
  function inner() {
    var T = TX[lg()], P = pf(), s = "", i, k, b, d = on("eval") ? dv() : null, r = on("exercices") ? serie() : null, z;
    // sans la barre de l'accueil (ancienne version de l'appli) : la zone du haut reste, et le retour propose de quitter pendant un devoir
    if (d && left(d) > 0 && !bar()) { s += '<button id="home" class="splk" hidden aria-hidden="true"></button>'; }
    s += '<div class="sp">';
    for (i = 0; i < K.length; i++) {
      b = on(K[i]) ? (rs("seen_" + K[i]) ? "" : '<small class="nw">' + T.w + "</small>") : '<small class="so">' + T.s + "</small>";
      z = K[i] === "eval" && d ? '<span class="bdg" id="spdb">' + mm(left(d)) + "</span>" : K[i] === "exercices" && r ? '<span class="bdg s">En cours</span>' : "";
      s += '<button data-sp="' + K[i] + '"' + (sel === K[i] ? ' class="on"' : "") + ">" + z + '<i style="background:' + CO[i] + '"><svg viewBox="0 0 24 24">' + IC[i] + "</svg></i>" + T.n[i] + b + "</button>";
    }
    s += "</div>";
    k = K.indexOf(sel);
    if (k >= 0) {
      s += '<div class="spi"><b>' + T.n[k] + "</b>" + T.d[k].replace("{l}", P.ln ? " (" + w.MSAC.esc(P.ln) + ")" : "") + "<br><em>" + T.p + "</em></div>";
    }
    return s;
  }

  function devoir() { var d = on("eval") ? dv() : null; return !!(d && left(d) > 0); }
  // pendant un devoir : la barre « Résoudre » est cachée, et le retour du téléphone propose de quitter l'appli
  function lock() { if (!devoir()) { return; } [60, 450].forEach(function (t) { setTimeout(function () { if (devoir() && D.querySelector("#app .sp")) { try { w.MSNav.solved(); } catch (x) { } } }, t); }); }
  // la chose la plus importante à faire : devoir en cours, sinon série en cours, sinon dernier chapitre, sinon premier exercice
  function prio() {
    var d = on("eval") ? dv() : null, r = serie(), M = w.MSPRG, c = M ? M.last(pf().lv || "") : -1, z;
    if (d) { z = left(d); return { pill: z > 0 ? mm(z) : "0:00", bg: "#e03131", t: z > 0 ? "Devoir en cours" : "Temps écoulé", s: (z > 0 ? "Reprendre · " : "Voir ma note · ") + (d.ttl || ""), at: 'data-sp="eval"', id: "spdt" }; }
    if (r && r.i < 5) { return { pill: (r.i + 1) + "/5", bg: "#c2410c", t: "Série en cours", s: "Reprendre · " + (r.ttl || ""), at: 'data-sp="exercices" data-r="1"' }; }
    if (c >= 0) { return { pill: "▶", bg: "#1a62e8", t: "Continuer", s: (M.lastName(pf().lv || "") || "Chapitre " + (c + 1)), at: 'data-hub="go" data-c="' + c + '"' }; }
    return { pill: "▶", bg: "#1a62e8", t: "Premier exercice", s: "Chapitre 1 · 5 exercices guidés", at: 'data-hub="go" data-c="0"' };
  }
  function hub() { return on("exercices") && w.MSHUB && w.MSPRG ? w.MSHUB.html(pf().lv || "", prio()) : on("exercices") ? '<div id="hub0"></div>' : ""; }
  // changement d'écran : on referme ce qui pourrait rester ouvert par-dessus (page de réponse, feuilles, pause, calculatrice…)
  function clean() {
    try { if (w.MSCPB && w.MSCPB.on()) { w.MSCPB.kill(); } } catch (x) { }
    try { if (w.MSCPA) { w.MSCPA.stop(); } } catch (x) { }
    try { if (w.MSCPC) { w.MSCPC.close(); } } catch (x) { }
    try { if (w.MSBAR) { w.MSBAR.shut(); } } catch (x) { }
    ["xveil", "xdict", "evcf", "evpz", "msscr", "msdi"].forEach(function (id) { var z = D.getElementById(id); if (z) { z.remove(); } });
    D.querySelectorAll(".yb,#yay").forEach(function (z) { z.remove(); });
  }
  function home(on) { try { if (w.MSHome && w.MSHome.mode) { w.MSHome.mode(!!on); } } catch (x) { } }
  function grid() {
    var b = bar(), h = b ? w.MSBAR.html() : "";
    ret = null;
    clean();
    if (b) { home(true); [80, 500].forEach(function (t) { setTimeout(function () { if (D.getElementById("msbar")) { home(true); } }, t); }); } else { lock(); }
    setTimeout(function () { if (w.MSTOUR) { w.MSTOUR.auto(); } }, 700);
    return h + hub() + '<div class="hh"><span class="st">' + TX[lg()].h + '</span></div><div id="spg">' + inner() + "</div>";
  }

  // n exemples du niveau : [affichage, texte envoyé] ; null si niveau inconnu
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

  // espace actif : script chargé au 1er appui, puis ouvert
  function go(k) {
    var c;
    if (busy[k]) { return; }
    busy[k] = 1;
    c = D.createElement("script");
    c.src = "https://mathsolver-backend-gray.vercel.app/" + SRC[k];
    c.onload = function () { busy[k] = 0; if (LIVE[k]) { LIVE[k](); } };
    c.onerror = function () { busy[k] = 0; try { w.MSAC.toast(w.MSAC.t("net")); } catch (x) { } };
    D.head.appendChild(c);
  }

  // carte de progression : « Continuer » et « À revoir » ouvrent les exercices
  function exo(c, id) {
    if (devoir()) { try { w.MSAC.toast("Tu as un devoir en cours. Rends ta copie d'abord."); } catch (x) { } return; }
    // une série en cours dans ce chapitre : on la reprend
    var r = serie();
    home(false);
    if (r && r.ch === c && !id && r.i < 5) { sp("exercices", true); return; }
    if (w.MSEXO) { w.MSEXO.open(c, id); return; }
    w.MSEXGO = { c: c, id: id || "" };
    sp("exercices", false);
  }
  D.addEventListener("click", function (e) {
    var h = e.target.closest ? e.target.closest("[data-hub]") : null;
    if (h) { exo(+h.getAttribute("data-c"), h.getAttribute("data-hub") === "rv" ? h.getAttribute("data-v") : ""); return; }
    // pendant un devoir : pas de solution d'un exercice récent ni de correction enregistrée
    var f = e.target.closest ? e.target.closest('[data-a="fill"],[data-a="open"]') : null;
    // accueil avec sa barre : un exemple remplit la barre (rien ne part avant « Résoudre »)
    if (f && !devoir() && bar() && f.getAttribute("data-a") === "fill" && D.getElementById("msbar")) { e.stopImmediatePropagation(); e.preventDefault(); w.MSBAR.put(f.getAttribute("data-v") || "", false); return; }
    if (f && devoir()) { e.stopImmediatePropagation(); e.preventDefault(); try { w.MSAC.toast("Tu as un devoir en cours. Rends ta copie avant de résoudre un exercice."); } catch (x) { } return; }
  }, true);
  D.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-sp]") : null, k, g;
    if (!b) { return; }
    k = b.getAttribute("data-sp");
    // pendant un devoir : pas de cours, de formules ni d'exercices (comme en classe)
    if (/^(cours|formules|exercices)$/.test(k) && on("eval") && dv() && left(dv()) > 0) { try { w.MSAC.toast("Tu as un devoir en cours. Rends ta copie avant d'ouvrir " + (k === "cours" ? "le cours." : k === "formules" ? "les formules." : "les exercices.")); } catch (x) { } return; }
    if (on(k)) { sp(k, b.getAttribute("data-r") === "1"); return; }
    sel = sel === k ? "" : k;
    g = D.getElementById("spg");
    if (g) { g.innerHTML = inner(); }
  });

  // ouvrir un espace (r : reprendre la série en cours)
  function sp(k, r) {
    if (k === "exercices") { w.MSEXR = !!r; }
    clean();
    home(false);
    try { if (!rs("seen_" + k)) { w.MSStore.set("seen_" + k, "1"); } } catch (x) { }
    if (LIVE[k]) { try { LIVE[k](); } catch (x) { } return; }
    go(k);
  }
  // retour vers l'écran d'où l'on vient (ex. : la copie corrigée) au lieu de l'accueil
  var ret = null;
  D.body.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("#home") : null, f = ret;
    if (t && t.classList.contains("splk")) { e.stopPropagation(); e.preventDefault(); try { w.MSNav.quit(); } catch (x) { } return; }
    if (!t || !f) { return; }
    e.stopPropagation(); e.preventDefault();
    ret = null;
    f();
  });
  // chrono de la carte et de la pastille (à la fin du temps, la carte passe à « Temps écoulé », une seule fois)
  var gone = "";
  setInterval(function () {
    var a = D.getElementById("spdt"), b = D.getElementById("spdb"), d;
    if (!a && !b) { return; }
    d = dv(); if (!d) { return; }
    if (left(d) <= 0) { if (gone !== d.end + "") { gone = d.end + ""; refresh(); if (!bar()) { try { w.MSNav.show(); } catch (x) { } } } return; }
    if (a) { a.textContent = mm(left(d)); }
    if (b) { b.textContent = mm(left(d)); }
  }, 1000);

  // la carte et les tuiles se mettent à jour sans recharger l'accueil
  function refresh() {
    var h = D.getElementById("hub"), g = D.getElementById("spg"), z = D.getElementById("hub0");
    if (h || z) { (h || z).outerHTML = hub(); }
    if (g) { g.innerHTML = inner(); }
  }
  var st = D.createElement("style");
  st.id = "spcss";
  st.appendChild(D.createTextNode(CSS));
  D.head.appendChild(st);

  // au démarrage de l'accueil : progression, carte de l'accueil et guide
  ["ms_prg.js?v=1", "ms_hub.js?v=1", "ms_tour.js?v=1"].forEach(function (u) {
    var c = D.createElement("script"); c.async = false; c.src = "https://mathsolver-backend-gray.vercel.app/" + u;
    c.onload = function () { var z = D.getElementById("hub0"); if (z && w.MSHUB && w.MSPRG) { z.outerHTML = hub(); } if (/tour/.test(u) && w.MSTOUR && D.querySelector("#app .sp")) { setTimeout(w.MSTOUR.auto, 700); } };
    D.head.appendChild(c);
  });
  w.MSSP = { grid: grid, ex: ex, live: LIVE, busy: devoir, clean: clean, refresh: refresh, home: home, from: function (f) { ret = f; } };
})(window);
