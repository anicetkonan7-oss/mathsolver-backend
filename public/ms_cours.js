/* MathSolver - espace Cours : chapitres du niveau du profil, leçon complète (sommaire, encadrés, figures, exemples, exercices corrigés) */
(function (w) {
  "use strict";
  var D = document, app = D.getElementById("app"), A = w.MSAC, S = w.MSStore, SP = w.MSSP, got = {};
  var BASE = "https://mathsolver-backend-gray.vercel.app/";
  if (w.MSCOURS || !A || !app || !SP) { return; }
  // niveaux qui ont des cours (même découpage en chapitres que les Formules)
  var FL = { l3: "c", l2: "d", lt: "f" };
  var T = {
    t: "Cours", q: "Rechercher un chapitre", b: "Retour", lv: "Niveau", md: "Modifier", no: "à choisir", ch: "Chapitre",
    nl: "Choisis ton niveau dans ton profil pour voir tes cours.", go: "Choisir mon niveau", s: "Les cours de ce niveau arrivent bientôt.",
    sn: "Bientôt", rd: "Lu", z: "Aucun chapitre trouvé.", som: "Sommaire", ex: "Exercices d'application", e: "Exercice",
    cor: "Voir la correction", fm: "Voir les formules", sv: "Résoudre un exercice avec MathSolver", net: "Connexion impossible. Réessaie."
  };
  var lv = "", q = "", cur = -1, sy = 0;
  var ACC = new RegExp("[" + String.fromCharCode(768) + "-" + String.fromCharCode(879) + "]", "g");

  function e(s) { return A.esc(s); }
  function V() { return w.MSCOV; }
  function pl(s) { return String(s).normalize("NFD").replace(ACC, "").toLowerCase(); }
  function css(id, f) {
    var l;
    if (D.getElementById(id)) { return; }
    l = D.createElement("link");
    l.id = id; l.rel = "stylesheet"; l.href = BASE + f;
    D.head.appendChild(l);
  }
  function ld(a, cb) {
    var n, ok = 1, todo = a.filter(function (u) { return !got[u]; });
    n = todo.length;
    if (!n) { cb(1); return; }
    todo.forEach(function (u) {
      var s = D.createElement("script");
      s.async = false;
      s.src = BASE + u;
      s.onload = function () { got[u] = 1; if (!--n) { cb(ok); } };
      s.onerror = function () { ok = 0; if (!--n) { cb(ok); } };
      D.head.appendChild(s);
    });
  }
  function seen() { try { var a = JSON.parse(S.get("co_seen")); return a instanceof Array ? a : []; } catch (x) { return []; } }
  // fichiers d'un chapitre prêt (co_l3_4a.js?v=2, co_l3_4b.js?v=2…) ; [] s'il n'est pas encore écrit
  function files(i) {
    var x = ((w.MSCOI || {})[lv] || {})[i] || 0, n = x[0] || +x || 0, a = [], j;
    for (j = 0; j < n; j++) { a.push("co_" + lv + "_" + i + "abcdefgh".charAt(j) + ".js?v=" + (x[1] || 1)); }
    return a;
  }

  function badge() {
    var L = w.MSGEO ? w.MSGEO.levels(A.lang()) : [], n = T.no, i;
    for (i = 0; i < L.length; i++) { if (L[i].id === lv) { n = L[i].n; } }
    return '<button class="fml" data-co="pf"><span>' + e(T.lv) + " : <b>" + e(n) + "</b></span><i>" + e(T.md) + "</i></button>";
  }
  function rows() {
    var d = (w.MSFM && w.MSFM[lv]) || [], z = pl(q.trim()), s = "", v = seen(), i, ok, rd;
    if (!lv) { return '<p class="fe">' + e(T.nl) + '</p><button class="pb" data-co="pf">' + e(T.go) + "</button>"; }
    if (!FL[lv]) { return '<p class="fe">' + e(T.s) + "</p>"; }
    for (i = 0; i < d.length; i++) {
      if (z && pl(d[i][0]).indexOf(z) < 0) { continue; }
      ok = files(i).length > 0;
      rd = v.indexOf(lv + "." + i) >= 0;
      s += '<button class="cch' + (ok ? "" : " off") + '" data-co="ch" data-v="' + i + '"><span class="cn">' + (i + 1) + '</span><span class="ct">' + e(d[i][0]) + "</span>" + (ok ? (rd ? '<i class="crd">' + e(T.rd) + " ✓</i>" : "") : '<i class="csn">' + e(T.sn) + "</i>") + "</button>";
    }
    return s || '<p class="fe">' + e(T.z) + "</p>";
  }
  function list() {
    cur = -1;
    try { w.MSCOZ.shut(); } catch (x) { }
    app.innerHTML = '<div class="ac co"><div class="ach"><button class="bkb" id="home" aria-label="' + e(T.b) + '"></button><b class="ht">' + e(T.t) + '</b></div><div class="fmc">' + badge() + '</div><input class="si fmq" id="coq" type="search" autocomplete="off" placeholder="' + e(T.q) + '" value="' + e(q) + '"><div id="col">' + rows() + "</div></div>";
    w.scrollTo(0, sy);
  }

  function lesson(i) {
    var c = w.MSCO && w.MSCO[lv + "." + i], d = ((w.MSFM || {})[lv] || [])[i], v = seen();
    if (!c || !d || !V()) { A.toast(T.net); list(); return; }
    cur = i;
    if (v.indexOf(lv + "." + i) < 0) { v.push(lv + "." + i); try { S.set("co_seen", JSON.stringify(v)); } catch (x) { } }
    app.innerHTML = V().page(c, c.t || d[0], i + 1, T, !!d[2]);
    w.scrollTo(0, 0);
  }
  function chapter(i) {
    var f = files(i);
    if (!f.length) { return; }
    if (w.MSCO && w.MSCO[lv + "." + i] && f.every(function (u) { return got[u]; })) { lesson(i); return; }
    ld(f, function (ok) { if (ok) { lesson(i); } else { A.toast(T.net); } });
  }
  // exercice du chapitre (celui des Formules) envoyé dans la zone de saisie, retour à l'accueil
  function solve(i) {
    var c = ((w.MSFM || {})[lv] || [])[i];
    if (!c || !c[2]) { return; }
    // accueil avec sa barre : l'exercice va dans la barre (la zone native y est cachée)
    if (w.MSBAR && w.MSBAR.on() && w.MSHOME) { w.MSHOME.home(); setTimeout(function () { try { w.MSBAR.put(c[2], false); } catch (x) { } }, 80); return; }
    try { w.MSNav.show(); } catch (x) { }
    try { (w.MSLib && w.MSLib.fill ? w.MSLib : w.MSApp).fill(c[2]); } catch (x) { }
    if (w.MSHOME) { w.MSHOME.home(); }
  }
  function formulas(i) {
    function go() { try { w.MSFOR.open(i); } catch (x) { } }
    if (w.MSFOR) { go(); } else { ld(["ms_form.js?v=1"], go); }
  }

  // retour (flèche ou bouton du téléphone) depuis une leçon : on revient à la liste des chapitres
  D.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target.closest("#home") : null;
    if (t && cur >= 0 && D.querySelector("#app .co")) { ev.stopImmediatePropagation(); ev.preventDefault(); list(); }
  }, true);
  D.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("[data-co]") : null, a, v, el;
    if (!b) { return; }
    a = b.getAttribute("data-co");
    v = b.getAttribute("data-v");
    if (a === "pf") { try { A.open("prof"); } catch (x) { } }
    else if (a === "ch") { sy = w.pageYOffset; chapter(+v); }
    else if (a === "go") {
      el = D.getElementById("cs" + v);
      if (el) { w.scrollTo({ top: el.getBoundingClientRect().top + w.pageYOffset - 8, behavior: "smooth" }); }
    }
    else if (a === "fm") { formulas(cur); }
    else if (a === "sv") { solve(cur); }
  });
  D.addEventListener("input", function (ev) {
    if (ev.target.id === "coq") { q = ev.target.value; var o = D.getElementById("col"); if (o) { o.innerHTML = rows(); } }
  });

  function open() {
    css("accss", "acct.css?v=1");
    css("fmcss", "fm.css?v=1");
    css("cocss", "cours.css?v=6");
    try { w.MSNav.solved(); } catch (x) { }
    lv = A.P().lv || ""; q = ""; sy = 0;
    ld(["ms_geo.js?v=1", "ms_co_fig.js?v=3", "ms_co_chart.js?v=1", "ms_co_plus.js?v=1", "ms_co_zoom.js?v=1", "ms_co_view.js?v=4", "co_idx.js?v=2"].concat(FL[lv] ? ["fm_" + FL[lv] + ".js?v=1"] : []), list);
  }
  SP.live.cours = open;
  w.MSCOURS = { open: open };
})(window);
