/* MathSolver - Progression : ce que l'élève réussit, compétence par compétence (exercices et évaluations), points et historique */
(function (w) {
  "use strict";
  if (w.MSPRG) { return; }
  var KEY = "prg", D = null, M = Math;
  function load() {
    if (D) { return D; }
    try { D = JSON.parse(w.MSStore.get(KEY) || "null"); } catch (x) { D = null; }
    if (!D || typeof D !== "object") { D = {}; }
    D.s = D.s || {}; D.e = D.e || []; D.x = D.x || 0; D.j = D.j || [];
    return D;
  }
  function save() { try { w.MSStore.set(KEY, JSON.stringify(load())); } catch (x) { } }
  function key(d) { return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); }
  function today() { return key(new Date()); }
  // une tentative : ok (réussie sans voir la correction), poids 1 (exercice) ou 2 (évaluation)
  function rec(id, ok, wt) {
    var d = load(), s = d.s[id] || "", i, t = today();
    for (i = 0; i < (wt || 1); i++) { s += ok ? "1" : "0"; }
    d.s[id] = s.slice(-12);
    if (d.j[d.j.length - 1] !== t) { d.j.push(t); d.j = d.j.slice(-60); }
    save();
  }
  // maîtrise d'une compétence, de 0 à 100 : taux de réussite récent, prudent tant qu'il y a peu d'essais
  function skill(id) {
    var s = load().s[id] || "", n = s.length, k = 0, i;
    if (!n) { return 0; }
    for (i = 0; i < n; i++) { k += s.charAt(i) === "1" ? 1 + i / n : 0; }
    var r = k / (n + n * (n - 1) / (2 * n));
    return M.round(100 * r * M.min(1, n / 4));
  }
  function tried(id) { return !!(load().s[id] || "").length; }
  // maîtrise d'un chapitre = moyenne de ses compétences
  function chap(gens) { if (!gens || !gens.length) { return 0; } return M.round(gens.reduce(function (a, g) { return a + skill(g.id); }, 0) / gens.length); }
  function label(p, t) { return !t ? "À découvrir" : p < 40 ? "En cours" : p < 75 ? "Bien" : "Maîtrisé"; }
  function xp(n) { var d = load(); if (n) { d.x += n; save(); } return d.x; }
  // jours d'affilée avec au moins un exercice
  function streak() {
    var j = load().j, set = {}, d = new Date(), n = 0;
    j.forEach(function (v) { set[v] = 1; });
    if (!set[key(d)]) { d.setDate(d.getDate() - 1); }
    while (set[key(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function addEval(o) { var d = load(); o.d = Date.now(); d.e.unshift(o); d.e = d.e.slice(0, 30); save(); }
  function evals(lv) { return load().e.filter(function (o) { return !lv || o.lv === lv; }); }
  w.MSPRG = { rec: rec, skill: skill, tried: tried, chap: chap, label: label, xp: xp, streak: streak, addEval: addEval, evals: evals };
})(window);
