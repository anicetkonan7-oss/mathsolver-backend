/* MathSolver - éléments communs des écrans : en-tête, options, listes pays / niveaux, gestion des clics */
(function (w) {
  "use strict";
  var A = w.MSAC, G = w.MSGEO, D = document, app = D.getElementById("app"), fn = null, cs = "";
  if (w.MSKIT || !A || !G || !app) { return; }
  var t = A.t, e = A.esc;

  var ACC = new RegExp("[" + String.fromCharCode(768) + "-" + String.fromCharCode(879) + "]", "g");
  function plain(s) { return String(s).normalize("NFD").replace(ACC, "").toLowerCase(); }
  // en-tête : retour (id="home" = retour système), progression (1 à 3), titre
  function head(back, dots, ttl) {
    var i, s = '<div class="ach"><button class="bkb" id="home" data-o="back" aria-label="' + e(t("bk")) + '"' + (back ? "" : ' style="visibility:hidden"') + "></button>";
    if (ttl) { s += '<b class="ht">' + e(ttl) + "</b>"; }
    if (dots) {
      s += '<div class="dots">';
      for (i = 1; i <= 3; i++) { s += "<i" + (i <= dots ? ' class="on"' : "") + "></i>"; }
      s += "</div>";
    }
    return s + "</div>";
  }
  function opt(o, v, fl, tx, sm, on) {
    return '<button class="opt' + (on ? " on" : "") + '" data-o="' + o + '" data-v="' + e(v) + '">' + (fl ? '<span class="fl">' + fl + "</span>" : "") + '<span class="tx">' + tx + (sm ? "<small>" + sm + "</small>" : "") + "</span></button>";
  }
  function title(k, s) { return "<h1>" + e(t(k)) + "</h1>" + (s ? '<p class="sub">' + e(t(s)) + "</p>" : ""); }

  // liste des pays (filtrée par la recherche q), « Autre pays » à la fin
  function country(q, sel) {
    var o = "", z = plain(q || ""), a = G.countries(A.lang()), i, n = 0;
    cs = sel;
    a.push(["OT", t("c_o")]);
    for (i = 0; i < a.length; i++) {
      if (z && plain(a[i][1]).indexOf(z) < 0) { continue; }
      o += opt("c", a[i][0], G.flag(a[i][0]), e(a[i][1]), "", a[i][0] === sel);
      n++;
    }
    return n ? o : '<p class="sub ctr">' + e(t("c_n")) + "</p>";
  }
  // niveaux par groupe + « Autre »
  function level(sel, ot) {
    var l = A.lang(), g = G.groups(l), a = G.levels(l), k = ["pri", "col", "lyc", "sup"], s = "", i, j;
    for (i = 0; i < k.length; i++) {
      s += '<div class="gh">' + e(g[k[i]]) + '</div><div class="lvg">';
      for (j = 0; j < a.length; j++) {
        if (a[j].g === k[i]) { s += '<button class="opt' + (a[j].id === sel && !ot ? " on" : "") + '" data-o="lv" data-v="' + a[j].id + '"><span class="tx"><b>' + e(a[j].n) + "</b><small>" + e(a[j].s) + "</small></span></button>"; }
      }
      s += "</div>";
    }
    return s + '<div class="gh">' + e(g.ot) + "</div>" + opt("lv", "ot", "", "<b>" + e(t("v_o")) + "</b>", e(t("v_os")), ot);
  }
  // phrases d'auto-évaluation (niveau « Autre »)
  function cando(sel, ot) {
    var a = G.cando(A.lang()), s = "", i;
    for (i = 0; i < a.length; i++) { s += opt("cd", a[i][0], "", e(a[i][1]), "", ot && a[i][0] === sel); }
    return s;
  }
  // affiche un écran ; f(action, valeur) reçoit les clics sur les boutons data-o
  function show(html, f) {
    fn = f;
    app.innerHTML = '<div class="ac">' + html + "</div>";
    w.scrollTo(0, 0);
  }

  app.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("button") : null, o = b && b.getAttribute("data-o");
    if (o && fn) { ev.stopPropagation(); fn(o, b.getAttribute("data-v")); }
  }, true);
  app.addEventListener("input", function (ev) {
    var l = D.getElementById("cl");
    if (ev.target.id === "cq" && l) { l.innerHTML = country(ev.target.value, cs); }
  });
  app.addEventListener("keydown", function (ev) {
    var b = ev.key === "Enter" && ev.target.tagName === "INPUT" ? app.querySelector(".pb") : null;
    if (b && fn) { fn(b.getAttribute("data-o"), b.getAttribute("data-v")); }
  });

  w.MSKIT = { head: head, opt: opt, title: title, country: country, level: level, cando: cando, show: show };
})(window);