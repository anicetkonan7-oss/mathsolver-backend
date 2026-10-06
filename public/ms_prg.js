/* MathSolver - Progression : ce que l'élève réussit, compétence par compétence (exercices et évaluations), points, niveaux, badges, objectif et défi du jour */
(function (w) {
  "use strict";
  if (w.MSPRG) { return; }
  var KEY = "prg", D = null, M = Math;
  // nombre de compétences par chapitre (identifiants lt0a, lt0b…)
  var NB = { lt: [3, 4, 4, 4, 5, 5, 5, 4, 5, 5, 3, 5, 5, 4, 5], l3: [4, 4, 4, 2, 3, 3, 3, 4, 4, 4, 4, 4] };
  var TT = ["Débutant", "Apprenti", "Curieux", "Calculateur", "Logicien", "Mathématicien", "Expert", "Champion", "Maître", "Génie"];
  function load() {
    if (D) { return D; }
    try { D = JSON.parse(w.MSStore.get(KEY) || "null"); } catch (x) { D = null; }
    if (!D || typeof D !== "object") { D = {}; }
    D.s = D.s || {}; D.e = D.e || []; D.x = D.x || 0; D.j = D.j || [];
    D.nm = D.nm || {}; D.c = D.c || { n: 0, ok: 0 }; D.b = D.b || []; D.bs = D.bs || 0;
    return D;
  }
  function save() { try { w.MSStore.set(KEY, JSON.stringify(load())); } catch (x) { } }
  function key(d) { return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); }
  function today() { return key(new Date()); }
  // compteurs du jour (remis à zéro chaque jour)
  function day() { var d = load(), t = today(); if (!d.t || d.t.k !== t) { d.t = { k: t, n: 0, ok: 0, ev: 0, best: 0 }; } return d.t; }
  // une tentative : ok (réussie sans voir la correction), poids 1 (exercice) ou 2 (question d'évaluation), nom de la compétence
  function rec(id, ok, wt, name) {
    var d = load(), s = d.s[id] || "", i, t = today(), y = day();
    for (i = 0; i < (wt || 1); i++) { s += ok ? "1" : "0"; }
    d.s[id] = s.slice(-12);
    if (name) { d.nm[id] = String(name).slice(0, 80); }
    if ((wt || 1) === 1) { y.n++; d.c.n++; if (ok) { y.ok++; d.c.ok++; } }
    if (d.j[d.j.length - 1] !== t) { d.j.push(t); d.j = d.j.slice(-60); }
    d.bs = M.max(d.bs, streak());
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
  function ids(lv, c) { var n = (NB[lv] || [])[c] || 0, o = [], i; for (i = 0; i < n; i++) { o.push({ id: lv + c + "abcdefgh".charAt(i) }); } return o; }
  function label(p, t) { return !t ? "À découvrir" : p < 40 ? "En cours" : p < 75 ? "Bien" : "Maîtrisé"; }
  function xp(n) { var d = load(); if (n) { d.x += n; save(); } return d.x; }
  // niveau : 50 points pour le niveau 2, puis de plus en plus
  function level(x) {
    var n = 1;
    x = x === undefined ? load().x : x;
    while (x >= 25 * n * (n + 1)) { n++; }
    var a = 25 * (n - 1) * n, b = 25 * n * (n + 1);
    return { n: n, t: TT[M.min(n - 1, TT.length - 1)], a: x - a, b: b - a, p: M.round(100 * (x - a) / (b - a)) };
  }
  // jours d'affilée avec au moins un exercice
  function streak() {
    var j = load().j, set = {}, d = new Date(), n = 0;
    j.forEach(function (v) { set[v] = 1; });
    if (!set[key(d)]) { d.setDate(d.getDate() - 1); }
    while (set[key(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function addEval(o) {
    var d = load(), y = day();
    o.d = Date.now(); d.e.unshift(o); d.e = d.e.slice(0, 30);
    y.ev++; y.best = M.max(y.best, o.n || 0);
    if (d.j[d.j.length - 1] !== today()) { d.j.push(today()); d.j = d.j.slice(-60); }
    d.bs = M.max(d.bs, streak());
    save();
  }
  function evals(lv) { return load().e.filter(function (o) { return !lv || o.lv === lv; }); }
  // dernier chapitre travaillé (pour « Continuer »)
  function last(lv, c, nm) { var d = load(); if (c !== undefined) { d.lc = { lv: lv, c: c, n: nm || "" }; save(); return c; } return d.lc && d.lc.lv === lv ? d.lc.c : -1; }
  function lastName(lv) { var d = load(); return d.lc && d.lc.lv === lv ? d.lc.n || "" : ""; }
  // compétence à revoir : une erreur récente, la plus faible sous 60 %
  function weak(lv) {
    var d = load(), best = null;
    Object.keys(d.s).forEach(function (id) {
      if (id.indexOf(lv) !== 0 || !/^\d+[a-h]$/.test(id.slice(lv.length))) { return; }
      var p = skill(id);
      if (d.s[id].slice(-4).indexOf("0") < 0) { return; }
      if (p < 60 && (!best || p < best.p)) { best = { id: id, p: p, c: parseInt(id.slice(lv.length), 10), n: d.nm[id] || "" }; }
    });
    return best;
  }
  // défi du jour : un par jour, +20 points une fois réussi
  var DF = [
    ["Réussis 3 exercices aujourd'hui", function (y) { return [y.ok, 3]; }],
    ["Fais 5 exercices aujourd'hui", function (y) { return [y.n, 5]; }],
    ["Fais une interrogation ou un devoir aujourd'hui", function (y) { return [y.ev, 1]; }],
    ["Réussis 5 exercices aujourd'hui", function (y) { return [y.ok, 5]; }],
    ["Obtiens au moins 12/20 à une évaluation aujourd'hui", function (y) { return [y.best >= 12 ? 1 : 0, 1]; }]
  ];
  function defi() {
    var y = day(), k = DF[today() % DF.length], v = k[1](y);
    return { t: k[0], a: M.min(v[0], v[1]), b: v[1], done: v[0] >= v[1], got: load().dc === today() };
  }
  // badges : calculés depuis les résultats ; « news » rend ceux qu'on vient de gagner
  function chapMax() { var m = 0; Object.keys(NB).forEach(function (lv) { NB[lv].forEach(function (n, c) { m = M.max(m, chap(ids(lv, c))); }); }); return m; }
  function badges() {
    var d = load(), bs = M.max(d.bs, streak()), e = d.e, n20 = e.some(function (o) { return o.n >= 20; }), n16 = e.some(function (o) { return o.n >= 16; }), lv = level().n, cm = chapMax();
    return [
      ["b1", "🎯", "Premier pas", "Réussir ton premier exercice", d.c.ok >= 1],
      ["b2", "🔥", "3 jours d'affilée", "Travailler 3 jours de suite", bs >= 3],
      ["b3", "🔥", "Une semaine", "Travailler 7 jours de suite", bs >= 7],
      ["b4", "🏆", "Un mois", "Travailler 30 jours de suite", bs >= 30],
      ["b5", "✅", "10 réussites", "Réussir 10 exercices", d.c.ok >= 10],
      ["b6", "⭐", "50 réussites", "Réussir 50 exercices", d.c.ok >= 50],
      ["b7", "🌟", "100 réussites", "Réussir 100 exercices", d.c.ok >= 100],
      ["b8", "📝", "Première copie", "Rendre ta première évaluation", e.length >= 1],
      ["b9", "🥈", "Très bien", "Avoir 16/20 ou plus", n16],
      ["b10", "🥇", "Sans faute", "Avoir 20/20", n20],
      ["b11", "📘", "Chapitre maîtrisé", "Maîtriser un chapitre à 75 %", cm >= 75],
      ["b12", "🚀", "Niveau 5", "Atteindre le niveau 5", lv >= 5]
    ];
  }
  function news() {
    var d = load(), o = { b: [], lv: 0, df: 0 }, L = level(), f = defi();
    badges().forEach(function (b) { if (b[4] && d.b.indexOf(b[0]) < 0) { d.b.push(b[0]); o.b.push(b); } });
    if (f.done && d.dc !== today()) { d.dc = today(); d.x += 20; o.df = 1; }
    L = level();
    if (d.lvl && L.n > d.lvl) { o.lv = L.n; }
    d.lvl = L.n;
    save();
    return o;
  }
  function today_() { var y = day(); return { n: y.n, ok: y.ok, ev: y.ev, goal: 5 }; }
  w.MSPRG = { rec: rec, skill: skill, tried: tried, chap: chap, ids: ids, NB: NB, label: label, xp: xp, level: level, streak: streak, addEval: addEval, evals: evals, last: last, lastName: lastName, weak: weak, defi: defi, badges: badges, news: news, today: today_, best: function () { return M.max(load().bs, streak()); }, total: function () { return load().c; } };
})(window);
