/* MathSolver - comptes et profil : noyau (stockage, session, serveur, pastille d'accueil, ouverture des écrans) */
(function (w) {
  "use strict";
  var S = w.MSStore, N = w.MSNav, D = document, BASE = "https://mathsolver-backend-gray.vercel.app/";
  var P = {}, SS = null, tp = 0, got = {}, busy = 0;
  var MINI = {
    fr: { gu: "Invité", fill: "Complète ton profil", net: "Pas de connexion Internet. Réessaie." },
    en: { gu: "Guest", fill: "Complete your profile", net: "No Internet connection. Try again." }
  };
  var COL = ["#1a62e8", "#e8590c", "#2b8a3e", "#9c36b5", "#c2255c", "#0b7285"];
  if (!S) { return; }

  function rd(k) { try { var v = S.get(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function wr(k, v) { try { S.set(k, JSON.stringify(v)); } catch (e) { } }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  P = rd("prof") || {};
  SS = rd("sess");
  if (P.ok) { try { S.del("onb"); } catch (e) { } }

  function lang() { return P.l === "en" || P.l === "fr" ? P.l : (String(navigator.language || "fr").slice(0, 2) === "en" ? "en" : "fr"); }
  function t(k, v) {
    var l = lang(), d = (w.MSTR && w.MSTR[l]) || {}, s = d[k] !== undefined ? d[k] : (MINI[l][k] !== undefined ? MINI[l][k] : k);
    return v ? s.replace(/\{(\w+)\}/g, function (m, x) { return v[x] !== undefined ? v[x] : m; }) : s;
  }
  function toast(m) { try { w.MSLib.toast(m); } catch (e) { } }

  // pastille d'accueil : initiale colorée, pseudo, niveau · pays
  function av(n, big) {
    var h = 0, i;
    n = String(n || "?");
    for (i = 0; i < n.length; i++) { h = (h * 31 + n.charCodeAt(i)) % 997; }
    return '<span class="av' + (big ? " big" : "") + '" style="background:' + COL[h % COL.length] + '">' + esc(n.charAt(0).toUpperCase()) + "</span>";
  }
  function chip() {
    if (!P.ok) { return ""; }
    return '<button class="chip" data-ac="prof">' + av(P.n || t("gu")) + '<span class="ct"><b>' + esc(P.n || t("gu")) + "</b><i>" + esc(P.ln ? P.ln + (P.cn ? " · " + P.cn : "") : t("fill")) + '</i></span><span class="chv"></span></button>';
  }

  // serveur
  function api(b) {
    return fetch(BASE + "api/account", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) })
      .then(function (r) { return r.json().catch(function () { return { err: "server" }; }); }, function () { return { err: "net" }; });
  }
  function adopt(s, em) {
    SS = { uid: s.uid, t: s.t, rt: s.rt, e: Date.now() + (s.exp || 3600) * 1000, em: em || (SS && SS.em) || "" };
    wr("sess", SS);
  }
  function keep() { wr("prof", P); try { S.set("lang", lang()); } catch (e) { } }
  function out(clr) {
    SS = null;
    clearTimeout(tp);
    try { S.del("sess"); } catch (e) { }
    if (clr) { P = P.l ? { l: P.l } : {}; keep(); }
  }
  function token() {
    if (!SS) { return Promise.resolve(""); }
    if (Date.now() < SS.e - 60000) { return Promise.resolve(SS.t); }
    return api({ a: "rf", rt: SS.rt }).then(function (r) {
      if (r.s) { adopt(r.s); return SS.t; }
      if (r.err === "INVALID_REFRESH_TOKEN" || r.err === "USER_NOT_FOUND" || r.err === "USER_DISABLED") { out(); }
      return "";
    });
  }
  function push() {
    clearTimeout(tp);
    if (!SS) { return; }
    tp = setTimeout(function () { token().then(function (k) { if (k && SS) { api({ a: "pp", u: SS.uid, t: k, p: P }); } }); }, 1200);
  }
  function save(o) {
    var k;
    for (k in o) { if (o[k] === null) { delete P[k]; } else { P[k] = o[k]; } }
    keep();
    push();
  }
  // noms du niveau et du pays dans la langue choisie
  function labels() {
    var G = w.MSGEO;
    if (!G) { return; }
    P.ln = P.lv ? G.lname(P.lv, lang()) : "";
    P.cn = P.c ? G.cname(P.c, lang()) : "";
    keep();
    push();
  }
  function up(em, pw) {
    return api({ a: "up", email: em, password: pw, p: P }).then(function (r) { if (r.s) { adopt(r.s, em); } return r; });
  }
  function inn(em, pw) {
    return api({ a: "in", email: em, password: pw }).then(function (r) {
      if (r.s) {
        adopt(r.s, em);
        if (r.p && r.p.ok) { P = r.p; keep(); } else if (P.ok) { push(); }
      }
      return r;
    });
  }
  function fg(em) { return api({ a: "fg", email: em, l: lang() }); }
  function del(em, pw) {
    return api({ a: "del", email: em, password: pw }).then(function (r) { if (r.ok) { out(); } return r; });
  }

  // chargement des écrans : téléchargés en parallèle, exécutés dans l'ordre, une seule fois chacun
  function need(a, cb) {
    var todo = [], n, i;
    for (i = 0; i < a.length; i++) { if (!got[a[i]]) { todo.push(a[i]); } }
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
  function setLang(l, cb) {
    save({ l: l });
    need(["i18n_" + l + ".js?v=1"], function () { labels(); if (cb) { cb(); } });
  }
  function close() {
    try { S.del("onb"); } catch (e) { }
    try { N.show(); } catch (e) { }
    if (w.MSHOME) { w.MSHOME.home(); }
  }
  function open(v) {
    var l, q = w.MS_NAV;
    if (busy) { return; }
    busy = 1;
    if (v === "onb") { try { S.set("onb", "1"); } catch (e) { } }
    try { if (N && N.solved) { N.solved(); } } catch (e) { }
    w.MS_OK = true;
    if (!D.getElementById("accss")) {
      l = D.createElement("link");
      l.id = "accss"; l.rel = "stylesheet"; l.href = BASE + "acct.css?v=1";
      D.head.appendChild(l);
    }
    need(["ms_geo.js?v=1", "ms_fun.js?v=1", "i18n_" + lang() + ".js?v=1", "ms_kit.js?v=1", "ms_onb.js?v=1", "ms_prof.js?v=1"], function () {
      var M = /^(prof|up|in|fg|del)$/.test(v) ? w.MSPROF : w.MSONB;
      busy = 0;
      if (v !== "onb" && q !== w.MS_NAV) { return; }
      if (M && M.show) { M.show(v); } else { toast(t("net")); close(); }
    });
  }

  D.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-ac]") : null;
    if (b) { open(b.getAttribute("data-ac")); }
  });

  w.MSAC = {
    P: function () { return P; }, sess: function () { return SS; }, need: function () { return !P.ok; },
    lang: lang, t: t, esc: esc, av: av, chip: chip, toast: toast, open: open, close: close,
    save: save, labels: labels, setLang: setLang, up: up, inn: inn, out: out, fg: fg, del: del, ld: need
  };
})(window);