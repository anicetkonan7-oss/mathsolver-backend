/* MathSolver - menu principal, Comment ça marche, Questions fréquentes, À propos */
(function (w) {
  "use strict";
  var D = document, app = D.getElementById("app"), A = w.MSAC, BASE = "https://mathsolver-backend-gray.vercel.app/";
  // à compléter à la publication : e-mail, pages légales, rate = 1 pour « Noter »
  var CFG = { mail: "", privacy: "", terms: "", rate: 0 };
  var K, T, I, cur = "menu";
  if (w.MSMENU || !A || !app) { return; }
  var e = A.esc;
  function lg() { return A.lang() === "en" ? "en" : "fr"; }
  function t(k, v) { var s = T && T[k] !== undefined ? T[k] : k; return v ? s.replace("{v}", v) : s; }
  function css(id, f, cb) {
    var l = D.getElementById(id);
    if (l) { cb(); return; }
    l = D.createElement("link");
    l.id = id; l.rel = "stylesheet"; l.href = BASE + f;
    l.onload = l.onerror = cb;
    D.head.appendChild(l);
  }
  function libs() { return ["ms_geo.js?v=1", "i18n_" + lg() + ".js?v=1", "ms_kit.js?v=1", "menu_" + lg() + ".js?v=1", "ms_dr.js?v=1"]; }
  function pre() {
    ["menu.css", "acct.css"].forEach(function (f) {
      var l = D.createElement("link");
      l.rel = "preload"; l.as = "style"; l.href = BASE + f + "?v=1";
      D.head.appendChild(l);
    });
    A.ld(libs(), function () { });
  }
  function ver() { try { return w.MSAct && w.MSAct.version ? String(w.MSAct.version()) : ""; } catch (x) { return ""; } }
  function row(o, p, k, s) {
    return '<button class="mr" data-o="' + o + '"><i class="mi"><svg viewBox="0 0 24 24">' + p + '</svg></i><span class="mt">' + e(t(k)) + (s ? "<small>" + e(t(s)) + "</small>" : "") + '</span><span class="chv"></span></button>';
  }
  function grp(k, r) { return r ? '<div class="gh">' + e(t(k)) + '</div><div class="mg">' + r + "</div>" : ""; }

  // en-tête (id mnb : « home » appartient à la page dessous)
  function hd(k) { return K.head(1, 0, t(k)).replace('id="home"', 'id="mnb"'); }
  function menu() {
    var v = ver(), s = hd("ttl") + '<div class="mm">' + A.chip().replace('data-ac="prof"', 'data-o="pf"') + "</div>";
    s += grp("g1", row("home", I.home, "home") + row("fm", I.fx, "fm") + row("hi", I.clk, "hi") + row("sv", I.bm, "sv"));
    s += grp("g2", row("pf", I.usr, "pf") + (A.sess() ? "" : row("ac", I.inn, "ac", "acs")));
    s += grp("g3", row("how", I.bulb, "how") + row("faq", I.help, "faq") + (CFG.mail ? row("ml", I.mail, "ml") : ""));
    s += grp("g4", row("st", I.set, "st") + row("sh", I.share, "sh") + (CFG.rate ? row("rt", I.star, "rt") : "") + row("ab", I.info, "ab"));
    s += grp("g5", (CFG.privacy ? row("pr", I.shield, "pr") : "") + (CFG.terms ? row("tm", I.doc, "tm") : ""));
    return s + '<p class="mv">MathSolver' + (v ? " · " + e(t("ver", v)) : "") + "</p>";
  }
  function how() {
    var a = T.how_ || [], s = hd("hwt"), i;
    for (i = 0; i < a.length; i++) { s += '<div class="hw"><span class="hn">' + (i + 1) + "</span><div><b>" + e(a[i][0]) + "</b><p>" + e(a[i][1]) + "</p></div></div>"; }
    return s;
  }
  function faq() {
    var a = T.faq_ || [], s = hd("faqt"), i;
    for (i = 0; i < a.length; i++) { s += '<div class="fq"><button data-fq="1">' + e(a[i][0]) + "</button><div>" + e(a[i][1]) + "</div></div>"; }
    return s;
  }
  function about() {
    var v = ver();
    return hd("abt") + '<div class="mab"><div class="hero">∑</div><p><b>MathSolver</b></p>' + (v ? "<p>" + e(t("ver", v)) + "</p>" : "") + "<p>" + e(t("ab1")) + "</p><p>" + e(t("ab2")) + "</p><p>© 2026 MathSolver</p></div>";
  }
  function show(v) {
    var d = w.MSDR;
    cur = v === "how" || v === "faq" || v === "ab" ? v : "menu";
    if (!d.is()) { try { w.MSNav.solved(); } catch (x) { } }
    if (!app.firstChild && w.MSHOME) { w.MSHOME.home(); }
    d.put('<div class="ac">' + (cur === "how" ? how() : cur === "faq" ? faq() : cur === "ab" ? about() : menu()) + "</div>", on);
  }
  function go(f) { try { f(); } catch (x) { A.toast(t("net")); } }
  function fm() {
    var q = w.MS_NAV;
    if (w.MSFOR) { go(w.MSFOR.open); return; }
    A.ld(["ms_form.js?v=1"], function () { if (q !== w.MS_NAV) { return; } if (w.MSFOR) { go(w.MSFOR.open); } else { A.toast(A.t("net")); } });
  }
  // referme ; z : rend la zone de saisie si l'accueil est dessous
  function shut(z) {
    if (z && app.querySelector("#again")) { try { w.MSNav.show(); } catch (x) { } }
    w.MSDR.hide();
  }
  // va à l'écran k dessous (caché par le panneau), puis referme
  function nav(k, f) {
    if (w.MSGO && w.MSGO(k, function () { if (f) { f(); } w.MSDR.hide(); })) { return; }
    A.close();
    w.MSDR.hide();
  }
  // ouvre un écran dessous ; le panneau se referme dès qu'il s'affiche
  function so(f) {
    var ob = new MutationObserver(function () { stop(); if (w.MSGO) { w.MSGO.clean(); } w.MSDR.hide(); }), t0 = 0;
    function stop() { ob.disconnect(); clearTimeout(t0); }
    function run() {
      ob.observe(app, { childList: true });
      t0 = setTimeout(function () { stop(); shut(1); }, 5000);
      f();
    }
    if (w.MSHOME || !w.MSGO) { run(); } else { w.MSGO("home", run); }
  }
  function on(o) {
    if (o === "back") { if (cur === "menu") { shut(1); } else { show("menu"); } }
    else if (o === "home") { try { w.MSNav.show(); } catch (x) { } nav("home"); }
    else if (o === "hi") { nav("history"); }
    else if (o === "sv") { nav("history", function () { w.MSHOME.home("history", "sav"); }); }
    else if (o === "fm") { so(fm); }
    else if (o === "pf") { so(function () { A.open("prof"); }); }
    else if (o === "ac") { so(function () { A.open("up"); }); }
    else if (o === "st") { go(function () { w.MSAct.settings(); }); }
    else if (o === "sh") { go(function () { w.MSAct.share(); }); }
    else if (o === "rt") { go(function () { w.MSAct.rate(); }); }
    else if (o === "ml") { go(function () { w.MSAct.mail(CFG.mail, "MathSolver"); }); }
    else if (o === "pr") { go(function () { w.MSAct.url(CFG.privacy); }); }
    else if (o === "tm") { go(function () { w.MSAct.url(CFG.terms); }); }
    else { show(o); }
  }
  D.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("[data-fq]") : null;
    if (b && b.parentNode) { b.parentNode.classList.toggle("on"); }
  });
  w.MSMENU = {
    pre: pre,
    show: function (v) {
      var n = 3, q = w.MS_NAV, fin = function () {
        if (--n || q !== w.MS_NAV) { return; }
        K = w.MSKIT; I = w.MSMI; T = (w.MSMT && w.MSMT[lg()]) || null;
        if (K && T && I && w.MSDR) { show(v); }
        else { A.toast(A.t("net")); if (!app.firstChild && w.MSHOME) { w.MSHOME.home(); } }
      };
      css("accss", "acct.css?v=1", fin);
      css("mncss", "menu.css?v=1", fin);
      A.ld(libs(), fin);
    }
  };
})(window);