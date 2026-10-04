/* MathSolver - profil et compte : profil, création de compte, connexion, mot de passe oublié, suppression */
(function (w) {
  "use strict";
  var A = w.MSAC, K = w.MSKIT, G = w.MSGEO, D = document, cur = "", org = "", wait = 0;
  if (w.MSPROF || !A || !K) { return; }
  var t = A.t, e = A.esc;
  var F = { up: ["a_ut", "a_us", "a_du"], "in": ["a_it", "a_is", "a_di"], fg: ["a_ft", "a_fs", "a_fd"], del: ["x_t", "x_s", "x_do"] };
  function $(id) { return D.getElementById(id); }
  function row(k, v, o) {
    return '<button class="row" data-o="' + o + '"><span class="k">' + e(k) + '</span><span class="v">' + e(v) + '</span><span class="chv"></span></button>';
  }
  function lb(k) { return '<label class="lb">' + e(t(k)) + "</label>"; }
  function seg(l, id, n) { return '<button data-o="l" data-v="' + id + '"' + (l === id ? ' class="on"' : "") + ">" + n + "</button>"; }

  function prof() {
    var P = A.P(), S = A.sess(), n = P.n || t("gu"), l = A.lang(), s;
    s = K.head(1, 0, t("p_t")) + '<div class="pc">' + A.av(n, 1) + "<b>" + e(n) + "</b><i>" + e(P.ln ? P.ln + (P.cn ? " · " + P.cn : "") : t("p_fill")) + '</i><span class="pill2' + (S ? "" : " g") + '">' + e(t(S ? "p_on" : "p_gs")) + "</span></div>";
    s += '<div class="rows">' + row(t("p_n"), P.n || t("p_fill"), "n") + row(t("p_l"), P.ln || t("p_fill"), "lv") + row(t("p_c"), P.cn ? G.flag(P.c) + " " + P.cn : t("p_fill"), "c") + "</div>";
    s += lb("p_g") + '<div class="sg">' + seg(l, "fr", "Français") + seg(l, "en", "English") + "</div>" + lb("p_a");
    if (S) {
      return s + '<div class="rows"><div class="row"><span class="k">' + e(t("a_em")) + '</span><span class="v">' + e(S.em) + '</span></div></div><button class="sb2" data-o="out">' + e(t("p_out")) + '</button><button class="tl red" data-o="del">' + e(t("p_del")) + "</button>";
    }
    return s + '<button class="pb" data-o="up">' + e(t("p_up")) + '</button><button class="sb2" data-o="in">' + e(t("p_in")) + "</button>";
  }
  function form(k) {
    var m = F[k], s = K.head(1) + K.title(m[0], m[1]), pw = k === "up" || k === "in" || k === "del";
    if (k !== "del") { s += lb("a_em") + '<input class="in" id="em" type="email" autocomplete="email" autocapitalize="none" spellcheck="false">'; }
    if (pw) {
      s += lb(k === "del" ? "x_pw" : "a_pw") + '<input class="in" id="pw" type="password" autocomplete="' + (k === "up" ? "new-password" : "current-password") + '"' + (k === "up" ? ' placeholder="' + e(t("a_pwh")) + '"' : "") + ">";
    }
    s += '<div class="er" id="er"></div><div class="ok" id="ok"></div><button class="pb' + (k === "del" ? " red" : "") + '" id="go" data-o="go">' + e(t(m[2])) + "</button>";
    if (k === "in") { s += '<button class="tl" data-o="fg">' + e(t("a_fg")) + '</button><button class="tl" data-o="up">' + e(t("a_nw")) + "</button>"; }
    if (k === "up") { s += '<button class="tl" data-o="in">' + e(t("a_hv")) + '</button><p class="fn">' + e(t("a_pv")) + "</p>"; }
    return s;
  }
  // from : écran d'où l'on vient quand c'est l'accueil de départ (welcome, done) ; org : où ramène la flèche des formulaires
  function show(v, from) {
    if (v === "del" && !A.sess()) { v = "prof"; }
    if (from) { org = from; }
    else if (!D.querySelector("#app .ac")) { org = ""; }
    else if (cur === "prof") { org = "prof"; }
    cur = v;
    wait = 0;
    K.show(v === "prof" ? prof() : form(v), on);
    if (v !== "prof") { setTimeout(function () { var i = $("em") || $("pw"); if (i && cur === v) { i.focus(); } }, 350); }
  }
  function msg(code, okk) {
    var k = "e_" + code, s = code ? (t(k) !== k ? t(k) : t("e_x")) : "";
    if ($("er")) { $("er").textContent = okk ? "" : s; }
    if ($("ok")) { $("ok").textContent = okk || ""; }
  }
  function go() {
    var em = $("em") ? $("em").value.trim() : "", pw = $("pw") ? $("pw").value : "", b = $("go"), S = A.sess(), lab = b.textContent, p, v = cur;
    if (wait) { return; }
    if (v !== "del" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { msg("INVALID_EMAIL"); return; }
    if (v === "up" && pw.length < 6) { msg("WEAK_PASSWORD"); return; }
    if ((v === "in" || v === "del") && !pw) { msg("INVALID_LOGIN_CREDENTIALS"); return; }
    wait = 1;
    b.disabled = true;
    b.textContent = t("ld");
    msg("");
    p = v === "up" ? A.up(em, pw) : v === "in" ? A.inn(em, pw) : v === "fg" ? A.fg(em) : A.del(S ? S.em : "", pw);
    p.then(function (r) {
      wait = 0;
      if (cur !== v) { return; }
      b.disabled = false;
      b.textContent = lab;
      if (r.err) { msg(r.err); }
      else if (v === "fg") { msg("", t("a_fo")); }
      else if (v === "in") {
        A.setLang(A.lang(), function () { A.toast(t("m_in")); if (A.P().ok) { A.close(); } else { w.MSONB.show("country", 0); } });
      } else if (v === "up" && !A.P().ok) { A.toast(t("m_up")); w.MSONB.show("country", 0); }
      else { A.toast(t(v === "up" ? "m_up" : "m_dl")); A.close(); }
    });
  }
  function back() {
    if (cur === "prof") { A.close(); }
    else if (cur === "fg") { show("in"); }
    else if (org === "welcome" || org === "done") { w.MSONB.show(org, 0, 1); }
    else if (org === "prof") { show("prof"); }
    else { A.close(); }
  }
  function on(o, v) {
    if (o === "back") { back(); }
    else if (o === "go") { go(); }
    else if (o === "n" || o === "lv" || o === "c") { w.MSONB.show(o === "n" ? "name" : o === "lv" ? "level" : "country", 1); }
    else if (o === "l") { A.setLang(v, function () { show("prof"); }); }
    else if (o === "out") { A.out(1); A.toast(t("m_out")); w.MSONB.show("onb"); }
    else if (F[o]) { show(o); }
  }
  w.MSPROF = { show: show };
})(window);