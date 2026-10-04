/* MathSolver - espace Formules : formules du niveau par chapitre, recherche, favoris, exercice à essayer */
(function (w) {
  "use strict";
  var D = document, app = D.getElementById("app"), A = w.MSAC, S = w.MSStore, SP = w.MSSP, got = {};
  var BASE = "https://mathsolver-backend-gray.vercel.app/";
  if (w.MSFOR || !A || !app || !SP) { return; }
  var FL = { p1: "a", p2: "a", l6: "a", l5: "b", l4: "b", l3: "c", l2: "d", l1: "e", lt: "f", s1: "g", s2: "h" };
  var T = {
    fr: { t: "Formules", q: "Rechercher une formule", f: "Favoris", z: "Aucune formule trouvée.", y: "Touche l'étoile d'une formule pour la retrouver ici.", s: "Les formules de ce niveau arrivent bientôt.", x: "Essayer un exercice", b: "Retour" },
    en: { t: "Formulas", q: "Search a formula", f: "Favourites", z: "No formula found.", y: "Tap the star on a formula to find it here.", s: "Formulas for this level are coming soon.", x: "Try an exercise", b: "Back" }
  };
  var ACC = new RegExp("[" + String.fromCharCode(768) + "-" + String.fromCharCode(879) + "]", "g");
  var lv = "l3", q = "", fv = 0, op = {}, fa = [];

  function t(k) { return T[A.lang() === "en" ? "en" : "fr"][k]; }
  function e(s) { return A.esc(s); }
  function pl(s) { return String(s).normalize("NFD").replace(ACC, "").toLowerCase(); }
  function tx(s) { try { return w.katex.renderToString(s, { throwOnError: false }); } catch (x) { return e(s); } }
  function rd() { try { var a = JSON.parse(S.get("fav")); return a instanceof Array ? a : []; } catch (x) { return []; } }
  function css(id, f) {
    var l;
    if (D.getElementById(id)) { return; }
    l = D.createElement("link");
    l.id = id; l.rel = "stylesheet"; l.href = BASE + f;
    D.head.appendChild(l);
  }
  // scripts téléchargés en parallèle, exécutés dans l'ordre
  function ld(a, cb) {
    var n, todo = a.filter(function (u) { return !got[u]; });
    n = todo.length;
    if (!n) { cb(); return; }
    todo.forEach(function (u) {
      var s = D.createElement("script");
      s.async = false;
      s.src = BASE + u;
      s.onload = function () { got[u] = 1; if (!--n) { cb(); } };
      s.onerror = function () { if (!--n) { cb(); } };
      D.head.appendChild(s);
    });
  }

  // chapitres du niveau : [titre, [[nom, latex, note]], exercice]
  function list() {
    var d = (w.MSFM && w.MSFM[lv]) || [], z = pl(q.trim()), s = "", c, f, i, j, n, id, b, o;
    for (i = 0; i < d.length; i++) {
      c = d[i]; b = ""; n = 0;
      for (j = 0; j < c[1].length; j++) {
        f = c[1][j]; id = lv + "." + i + "." + j;
        if (fv && fa.indexOf(id) < 0) { continue; }
        if (z && pl(c[0] + " " + f[0] + " " + f[1] + " " + (f[2] || "")).indexOf(z) < 0) { continue; }
        n++;
        b += '<div class="fr"><div class="fh"><span class="fnm">' + e(f[0]) + '</span><button class="fst' + (fa.indexOf(id) >= 0 ? " on" : "") + '" data-fm="fav" data-v="' + id + '" aria-label="' + e(t("f")) + '"></button></div><div class="ffo">' + tx(f[1]) + "</div>" + (f[2] ? '<div class="fno">' + e(f[2]) + "</div>" : "") + "</div>";
      }
      if (!n) { continue; }
      o = op[i] || z || fv;
      s += '<button class="fch' + (o ? " on" : "") + '" data-fm="ch" data-v="' + i + '"><span>' + e(c[0]) + "</span><i>" + n + "</i></button>";
      if (o) { s += '<div class="fb">' + b + (c[2] ? '<button class="fx" data-fm="ex" data-v="' + i + '">' + e(t("x")) + "</button>" : "") + "</div>"; }
    }
    return s || '<p class="fe">' + e(!d.length ? t("s") : fv && !z ? t("y") : t("z")) + "</p>";
  }

  function view() {
    var L = w.MSGEO ? w.MSGEO.levels(A.lang()) : [], o = "", i;
    for (i = 0; i < L.length; i++) { o += '<option value="' + L[i].id + '"' + (L[i].id === lv ? " selected" : "") + ">" + e(L[i].n) + "</option>"; }
    app.innerHTML = '<div class="ac"><div class="ach"><button class="bkb" id="home" aria-label="' + e(t("b")) + '"></button><b class="ht">' + e(t("t")) + '</b></div><div class="fmc"><select id="fms">' + o + '</select><button class="fmv' + (fv ? " on" : "") + '" data-fm="fv">&#9733; ' + e(t("f")) + '</button></div><input class="si fmq" id="fmq" type="search" autocomplete="off" placeholder="' + e(t("q")) + '" value="' + e(q) + '"><div id="fmo">' + list() + "</div></div>";
    w.scrollTo(0, 0);
  }
  function redraw() { var o = D.getElementById("fmo"); if (o) { o.innerHTML = list(); } }

  // envoie l'exercice du chapitre dans la zone de saisie et revient à l'accueil
  function exo(i) {
    var c = ((w.MSFM || {})[lv] || [])[i];
    if (!c || !c[2]) { return; }
    try { w.MSNav.show(); } catch (x) { }
    try { (w.MSLib && w.MSLib.fill ? w.MSLib : w.MSApp).fill(c[2]); } catch (x) { }
    if (w.MSHOME) { w.MSHOME.home(); }
  }

  D.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("[data-fm]") : null, a, v, i;
    if (!b) { return; }
    a = b.getAttribute("data-fm");
    v = b.getAttribute("data-v");
    if (a === "ex") { exo(v); return; }
    if (a === "fv") { fv = fv ? 0 : 1; b.className = "fmv" + (fv ? " on" : ""); }
    if (a === "ch") { op[v] = !op[v]; }
    if (a === "fav") {
      i = fa.indexOf(v);
      if (i < 0) { fa.push(v); } else { fa.splice(i, 1); }
      try { S.set("fav", JSON.stringify(fa)); } catch (x) { }
    }
    redraw();
  });
  D.addEventListener("input", function (ev) {
    if (ev.target.id === "fmq") { q = ev.target.value; redraw(); }
  });
  D.addEventListener("change", function (ev) {
    if (ev.target.id !== "fms") { return; }
    lv = ev.target.value;
    op = {};
    ld(["fm_" + FL[lv] + ".js?v=1"], redraw);
  });

  function open() {
    css("accss", "acct.css?v=1");
    css("fmcss", "fm.css?v=1");
    try { w.MSNav.solved(); } catch (x) { }
    lv = FL[A.P().lv] ? A.P().lv : "l3"; q = ""; fv = 0; op = {}; fa = rd();
    ld(["ms_geo.js?v=1", "fm_" + FL[lv] + ".js?v=1"], view);
  }
  SP.live.formules = open;
  w.MSFOR = { open: open };
})(window);