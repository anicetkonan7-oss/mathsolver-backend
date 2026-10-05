/* MathSolver - premier lancement et modification du profil : langue, bienvenue, pays, niveau, pseudo, fin */
(function (w) {
  "use strict";
  var A = w.MSAC, K = w.MSKIT, D = document, st = { v: "", ed: 0, d: {} }, pc = "", nl = 0;
  if (w.MSONB || !A || !K) { return; }
  var t = A.t, e = A.esc;
  function skip() { return st.ed ? "" : '<button class="tl" data-o="skip">' + e(t("lt")) + "</button>"; }
  function hd(n) { return K.head(1, st.ed ? 0 : n); }
  var V = {
    lang: function () {
      return K.head(0) + '<h1 class="ctr" style="margin-top:40px">Choisis ta langue</h1><p class="sub ctr">Choose your language</p>' + K.opt("lang", "fr", "", "Français") + K.opt("lang", "en", "", "English");
    },
    welcome: function () {
      return K.head(1) + '<div class="hero">∑</div><h1 class="ctr">' + e(t("w_t")) + '</h1><p class="sub ctr">' + e(t("w_s")) + '</p><button class="pb" data-o="go">' + e(t("w_go")) + '</button><button class="tl" data-o="in">' + e(t("w_in")) + '</button><button class="tl" data-o="later">' + e(t("lt")) + "</button>";
    },
    country: function () {
      return hd(1) + K.title("c_t", "c_s") + '<input class="si" id="cq" type="search" placeholder="' + e(t("c_q")) + '" autocomplete="off"><div id="cl">' + K.country("", st.d.c) + "</div>" + skip();
    },
    // confirmation du pays : il ne pourra plus être changé ensuite
    cfm: function () {
      var G = w.MSGEO, en = A.lang() === "en", a = G ? G.countries(A.lang()) : [], n = pc === "OT" ? t("c_o") : pc, i;
      for (i = 0; i < a.length; i++) { if (a[i][0] === pc) { n = a[i][1]; } }
      return hd(1) + "<h1>" + e(en ? "Confirm your country" : "Confirme ton pays") + '</h1><p class="sub">' + e(en ? "This choice can't be changed later." : "Ce choix ne pourra plus être modifié ensuite.") + '</p><div class="opt on">' + (pc !== "OT" && G ? '<span class="fl">' + G.flag(pc) + "</span>" : "") + '<span class="tx">' + e(n) + '</span></div><button class="pb" data-o="cy">' + e(en ? "Confirm" : "Confirmer") + '</button><button class="tl" data-o="cn">' + e(en ? "Change country" : "Changer de pays") + "</button>";
    },
    level: function () { return hd(2) + K.title("v_t", "v_s") + K.level(st.d.lv, st.d.ot) + skip(); },
    cando: function () { return hd(2) + K.title("d_t", "d_s") + K.cando(st.d.lv, st.d.ot); },
    name: function () {
      return hd(3) + K.title("n_t", "n_s") + '<input class="in" id="nm" maxlength="24" autocomplete="off" placeholder="' + e(t("n_p")) + '" value="' + e(st.d.n || "") + '"><div class="er" id="ner"></div><button class="pb" data-o="nm">' + e(t(st.ed ? "sv" : "nx")) + "</button>" + skip();
    },
    done: function () {
      var P = A.P(), s = '<div class="ctr"><div class="hero">✓</div><h1>' + e(P.n ? t("f_t", { n: P.n }) : t("f_u")) + '</h1><p class="sub">' + e(t("f_s")) + "</p>";
      if (P.ln || P.cn) { s += '<p class="sub"><b>' + e(P.ln || "") + "</b>" + (P.ln && P.cn ? " · " : "") + e(P.cn || "") + "</p>"; }
      return s + '<button class="pb" data-o="fin">' + e(t("f_go")) + '</button><button class="tl" data-o="up">' + e(t("f_ac")) + "</button></div>";
    }
  };

  function show(v, ed, nf) {
    var P = A.P();
    if (v === "onb") { v = P.l ? "welcome" : "lang"; st.ed = 0; st.d = {}; try { w.MSStore.set("onb", "1"); } catch (x) { } }
    if (ed !== undefined) { st.ed = ed ? 1 : 0; }
    if (st.ed || !st.d.k) { st.d = { k: 1, c: P.c, lv: P.lv, n: P.n, ot: P.ot }; }
    st.v = v;
    K.show(V[v](), on);
    if (v === "done" && w.MSFUN && !nf) { w.MSFUN.confetti(); }
    if (v === "name" && !w.MSNICK) { A.ld(["ms_nick.js?v=1"], function () { }); }
    if (v === "name") { setTimeout(function () { var i = D.getElementById("nm"); if (i && st.v === "name") { i.focus(); } }, 350); }
  }
  function commit() {
    var d = st.d, P = A.P();
    // un pseudo existant qui change : le délai de 30 jours démarre
    if (P.n && (d.n || "") !== P.n) { A.save({ nt: Date.now() }); }
    A.save({ c: d.c || "", lv: d.lv || "", ot: d.ot ? 1 : 0, n: d.n || "" });
    A.labels();
    A.toast(t("m_sv"));
    w.MSPROF.show("prof");
  }
  function finish() {
    var d = st.d;
    A.save({ ok: 1, n: d.n || "", c: d.c || "", lv: d.lv || "", ot: d.ot ? 1 : 0, t: Date.now() });
    A.labels();
    st.d = {};
    show("done");
  }
  function guest() {
    A.save({ ok: 1 });
    A.close();
  }
  function back() {
    var p = { welcome: "lang", country: "welcome", cfm: "country", level: "country", cando: "level", name: st.d.ot ? "cando" : "level" }[st.v];
    if (st.v === "lang") { try { w.MSNav.quit(); } catch (x) { } }
    else if (st.ed) { if (st.v === "cando") { show("level"); } else if (st.v === "cfm") { show("country"); } else { w.MSPROF.show("prof"); } }
    else if (p) { show(p); }
  }
  function next(from) {
    var n = { country: "level", level: "name", cando: "name" }[from];
    if (st.ed) { commit(); } else if (n) { show(n); } else { finish(); }
  }
  // pseudo nettoyé et vérifié (longueur, caractères, mots interdits)
  function name() {
    var i = D.getElementById("nm"), N = w.MSNICK, v, r = D.getElementById("ner"), c;
    if (!N && !nl) { nl = 1; A.ld(["ms_nick.js?v=1"], name); return; }
    v = i ? (N ? N.clean(i.value) : i.value.trim()) : "";
    c = N ? N.check(v) : (v.length < 2 || v.length > 24 ? "len" : "");
    if (c) { if (r) { r.textContent = N ? N.msg(c, A.lang() === "en") : t("n_e"); } return; }
    st.d.n = v;
    next("name");
  }
  function on(o, v) {
    if (o === "back") { back(); }
    else if (o === "lang") { A.setLang(v, function () { show("welcome"); }); }
    else if (o === "go") { show("country"); }
    else if (o === "in") { w.MSPROF.show("in", "welcome"); }
    else if (o === "later") { guest(); }
    else if (o === "c") { pc = v; show("cfm"); }
    else if (o === "cy") { st.d.c = pc; next("country"); }
    else if (o === "cn") { show("country"); }
    else if (o === "lv") { if (v === "ot") { show("cando"); } else { st.d.lv = v; st.d.ot = 0; next("level"); } }
    else if (o === "cd") { st.d.lv = v; st.d.ot = 1; next("cando"); }
    else if (o === "nm") { name(); }
    else if (o === "skip") { if (st.v === "name") { st.d.n = ""; } next(st.v); }
    else if (o === "fin") { A.close(); }
    else if (o === "up") { w.MSPROF.show("up", "done"); }
  }
  w.MSONB = { show: show };
})(window);