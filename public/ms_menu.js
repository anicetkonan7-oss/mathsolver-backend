/* MathSolver - menu principal, Comment ça marche, Questions fréquentes, À propos */
(function (w) {
  "use strict";
  var D = document, app = D.getElementById("app"), A = w.MSAC, BASE = "https://mathsolver-backend-gray.vercel.app/";
  // à compléter à la publication : e-mail, pages légales (https), rate = 1 pour « Noter »
  var CFG = { mail: "", privacy: "", terms: "", rate: 0 };
  var K, T, got = {}, cur = "menu";
  if (w.MSMENU || !A || !app) { return; }
  var e = A.esc;
  var P = function (d) { return '<path d="' + d + '"/>'; };
  var I = {
    home: P("M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6"),
    fx: P("M18 5H7l6 7-6 7h11"),
    clk: '<circle cx="12" cy="12" r="9"/>' + P("M12 7v5l3 2"),
    bm: P("M6 3h12v18l-6-4-6 4z"),
    usr: '<circle cx="12" cy="8" r="4"/>' + P("M4 21c0-4 4-6 8-6s8 2 8 6"),
    inn: P("M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"),
    bulb: P("M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"),
    help: '<circle cx="12" cy="12" r="9"/>' + P("M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17h.01"),
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/>' + P("M3 7l9 6 9-6"),
    set: P("M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1") + '<circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>' + P("M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"),
    star: P("M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"),
    info: '<circle cx="12" cy="12" r="9"/>' + P("M12 16v-5M12 8h.01"),
    shield: P("M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"),
    doc: P("M7 3h8l4 4v14H7zM15 3v4h4M10 13h6M10 17h6")
  };
  function lg() { return A.lang() === "en" ? "en" : "fr"; }
  function t(k, v) { var s = T && T[k] !== undefined ? T[k] : k; return v ? s.replace("{v}", v) : s; }
  // cb quand la feuille est chargée
  function css(id, f, cb) {
    var l = D.getElementById(id);
    if (l) { cb(); return; }
    l = D.createElement("link");
    l.id = id; l.rel = "stylesheet"; l.href = BASE + f;
    l.onload = l.onerror = cb;
    D.head.appendChild(l);
  }
  function ld(a, cb) {
    var todo = a.filter(function (u) { return !got[u]; }), n = todo.length;
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
  function ver() { try { return w.MSAct && w.MSAct.version ? String(w.MSAct.version()) : ""; } catch (x) { return ""; } }
  function row(o, p, k, s) {
    return '<button class="mr" data-o="' + o + '"><i class="mi"><svg viewBox="0 0 24 24">' + p + '</svg></i><span class="mt">' + e(t(k)) + (s ? "<small>" + e(t(s)) + "</small>" : "") + '</span><span class="chv"></span></button>';
  }
  function grp(k, r) { return r ? '<div class="gh">' + e(t(k)) + '</div><div class="mg">' + r + "</div>" : ""; }

  function menu() {
    var v = ver(), s = K.head(1, 0, t("ttl")) + '<div class="mm">' + A.chip() + "</div>";
    s += grp("g1", row("home", I.home, "home") + row("fm", I.fx, "fm") + row("hi", I.clk, "hi") + row("sv", I.bm, "sv"));
    s += grp("g2", row("pf", I.usr, "pf") + (A.sess() ? "" : row("ac", I.inn, "ac", "acs")));
    s += grp("g3", row("how", I.bulb, "how") + row("faq", I.help, "faq") + (CFG.mail ? row("ml", I.mail, "ml") : ""));
    s += grp("g4", row("st", I.set, "st") + row("sh", I.share, "sh") + (CFG.rate ? row("rt", I.star, "rt") : "") + row("ab", I.info, "ab"));
    s += grp("g5", (CFG.privacy ? row("pr", I.shield, "pr") : "") + (CFG.terms ? row("tm", I.doc, "tm") : ""));
    return s + '<p class="mv">MathSolver' + (v ? " · " + e(t("ver", v)) : "") + "</p>";
  }
  function how() {
    var a = T.how_ || [], s = K.head(1, 0, t("hwt")), i;
    for (i = 0; i < a.length; i++) { s += '<div class="hw"><span class="hn">' + (i + 1) + "</span><div><b>" + e(a[i][0]) + "</b><p>" + e(a[i][1]) + "</p></div></div>"; }
    return s;
  }
  function faq() {
    var a = T.faq_ || [], s = K.head(1, 0, t("faqt")), i;
    for (i = 0; i < a.length; i++) { s += '<div class="fq"><button data-fq="1">' + e(a[i][0]) + "</button><div>" + e(a[i][1]) + "</div></div>"; }
    return s;
  }
  function about() {
    var v = ver();
    return K.head(1, 0, t("abt")) + '<div class="mab"><div class="hero">∑</div><p><b>MathSolver</b></p>' + (v ? "<p>" + e(t("ver", v)) + "</p>" : "") + "<p>" + e(t("ab1")) + "</p><p>" + e(t("ab2")) + "</p><p>© 2026 MathSolver</p></div>";
  }
  function show(v) {
    cur = v === "how" || v === "faq" || v === "ab" ? v : "menu";
    K.show(cur === "how" ? how() : cur === "faq" ? faq() : cur === "ab" ? about() : menu(), on);
  }
  function go(f) { try { f(); } catch (x) { A.toast(t("net")); } }
  function fm() {
    if (w.MSFOR) { go(w.MSFOR.open); return; }
    ld(["ms_form.js?v=1"], function () { if (w.MSFOR) { go(w.MSFOR.open); } else { A.toast(A.t("net")); } });
  }
  function on(o) {
    if (o === "back") { if (cur === "menu") { A.close(); } else { show("menu"); } }
    else if (o === "home") { A.close(); }
    else if (o === "fm") { fm(); }
    else if (o === "hi" || o === "sv") { if (w.MSHOME) { w.MSHOME.home("history", o === "sv" ? "sav" : "rec"); } }
    else if (o === "pf") { A.open("prof"); }
    else if (o === "ac") { A.open("up"); }
    else if (o === "st") { go(function () { w.MSAct.settings(); }); }
    else if (o === "sh") { go(function () { w.MSAct.share(); }); }
    else if (o === "rt") { go(function () { w.MSAct.rate(); }); }
    else if (o === "ml") { go(function () { w.MSAct.mail(CFG.mail, "MathSolver"); }); }
    else if (o === "pr") { go(function () { w.MSAct.url(CFG.privacy); }); }
    else if (o === "tm") { go(function () { w.MSAct.url(CFG.terms); }); }
    else { show(o); }
  }
  app.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("[data-fq]") : null;
    if (b && b.parentNode) { b.parentNode.classList.toggle("on"); }
  });
  w.MSMENU = {
    show: function (v) {
      var n = 3, fin = function () {
        if (--n) { return; }
        K = w.MSKIT; T = (w.MSMT && w.MSMT[lg()]) || null;
        if (K && T) { show(v); } else { A.toast(A.t("net")); A.close(); }
      };
      css("accss", "acct.css?v=1", fin);
      css("mncss", "menu.css?v=1", fin);
      ld(["ms_geo.js?v=1", "i18n_" + lg() + ".js?v=1", "ms_kit.js?v=1", "menu_" + lg() + ".js?v=1"], fin);
    }
  };
})(window);