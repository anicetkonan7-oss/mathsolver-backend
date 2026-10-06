/* MathSolver - accueil : « Bonjour », niveau, et barre de saisie compacte qui s'agrandit par-dessus la page (clavier maths, dictée, photo, Résoudre) */
(function (w) {
  "use strict";
  if (w.MSBAR) { return; }
  var D = document, BASE = "https://mathsolver-backend-gray.vercel.app/", T = "", big = false, got = {};
  var CSS = ".hhd{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:14px 16px 10px;}.hhd b{min-width:0;font-size:20px;font-weight:800;color:#0f1b33;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}" +
    ".hlv{flex:none;padding:6px 12px;border-radius:99px;background:#e3ecff;color:#1741a6;font-size:13px;font-weight:700;}" +
    ".msw{position:relative;height:54px;margin:0 12px 14px;}" +
    ".msb{position:absolute;left:0;right:0;top:0;height:52px;box-sizing:border-box;background:#fff;border:1.5px solid #cfdaf0;border-radius:16px;box-shadow:0 2px 8px rgba(15,27,51,.06);overflow:hidden;z-index:2;transition:height .22s ease,box-shadow .22s ease,border-color .22s;}" +
    ".msb.op{height:300px;z-index:31;border-color:#1a62e8;box-shadow:0 18px 40px rgba(15,27,51,.28);}" +
    ".msr{display:flex;align-items:center;gap:2px;height:49px;padding:0 5px 0 14px;}" +
    ".msp{flex:1;min-width:0;height:44px;padding:0;text-align:left;font-size:15px;color:#6b7794;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.msp.on{color:#0f1b33;}" +
    ".msi{flex:none;width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#41507a;font-size:18px;font-weight:800;}.msi svg,.msg svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}" +
    ".msg{flex:none;width:42px;height:40px;margin-left:3px;border-radius:12px;background:#1a62e8;color:#fff;display:flex;align-items:center;justify-content:center;}" +
    ".mso{display:flex;flex-direction:column;gap:8px;height:100%;box-sizing:border-box;padding:12px 12px 6px 14px;}.mso label{font-size:12px;font-weight:800;letter-spacing:.06em;color:#5b6784;}" +
    ".mso textarea{flex:1;min-height:0;resize:none;border:0;padding:0;background:transparent;color:#0f1b33;font:inherit;font-size:15.5px;line-height:1.5;outline:none;}" +
    ".msk{display:flex;align-items:center;gap:6px;}.msk .msi{width:42px;height:42px;border-radius:12px;background:#eef2fa;}.msk .mkb{width:auto;padding:0 12px;font-size:14px;color:#1741a6;}" +
    ".msgo{margin-left:auto;height:44px;padding:0 16px;border-radius:12px;background:#1a62e8;color:#fff;font-size:15px;font-weight:800;display:flex;align-items:center;gap:6px;}.msgo svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}" +
    ".msx{align-self:center;width:64px;height:16px;display:flex;align-items:center;justify-content:center;}.msx i{width:40px;height:4px;border-radius:4px;background:#cfd8ea;}" +
    "#msscr{position:fixed;inset:0;z-index:30;background:rgba(15,27,51,.35);animation:msf .2s ease-out;}@keyframes msf{from{opacity:0;}to{opacity:1;}}" +
    "#msdi{position:fixed;inset:0;z-index:40;display:flex;align-items:flex-end;justify-content:center;background:rgba(10,16,30,.45);}#msdi>div{width:100%;max-width:560px;box-sizing:border-box;padding:18px 16px 20px;border-radius:20px 20px 0 0;background:#fff;color:#0f1b33;text-align:center;}" +
    "#msdi h3{margin:0 0 8px;font-size:18px;}#msdi .mic{width:76px;height:76px;margin:6px auto 10px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#1a62e8;color:#fff;animation:mspu 1.3s ease-in-out infinite;}#msdi .mic svg{width:34px;height:34px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}" +
    "#msdi p{min-height:22px;margin:0 0 14px;font-size:16px;color:#33415e;}#msdi .row{display:flex;gap:10px;}#msdi .row button{flex:1;min-height:48px;border-radius:14px;font-size:15.5px;font-weight:700;background:#e8eeff;color:#1741a6;}#msdi .row .pri{background:#1a62e8;color:#fff;}" +
    "@keyframes mspu{0%,100%{box-shadow:0 0 0 0 rgba(26,98,232,.45);}50%{box-shadow:0 0 0 16px rgba(26,98,232,0);}}@media (prefers-reduced-motion:reduce){.msb{transition:none;}#msscr,#msdi .mic{animation:none;}}" +
    ".dk .hhd b{color:#eef2fb;}.dk .hlv{background:#1d2b4d;color:#a9c4ff;}.dk .msb{background:#172033;border-color:#26324a;}.dk .msb.op{border-color:#4d8bff;}.dk .msp{color:#93a2c4;}.dk .msp.on,.dk .mso textarea{color:#eef2fb;}" +
    ".dk .msi{color:#c5d1ea;}.dk .msk .msi{background:#1f2a42;}.dk .msk .mkb{color:#a9c4ff;}.dk .msx i{background:#33415f;}.dk #msdi>div{background:#172033;color:#eef2fb;}.dk #msdi p{color:#c5d1ea;}.dk #msdi .row button{background:#1d2b4d;color:#a9c4ff;}.dk #msdi .row .pri{background:#3b7bff;color:#fff;}";
  var IC = {
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    cam: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    go: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };
  function e(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function P() { try { return w.MSAC ? w.MSAC.P() : {}; } catch (x) { return {}; } }
  function toast(m) { try { w.MSAC.toast(m); } catch (x) { } }
  function busy() { return !!(w.MSSP && w.MSSP.busy && w.MSSP.busy()); }
  function rs() { try { return w.MSStore.get("bar") || ""; } catch (x) { return ""; } }
  function ws(v) { try { if (v) { w.MSStore.set("bar", v.slice(0, 4000)); } else { w.MSStore.del("bar"); } } catch (x) { } }
  // la barre n'existe que si l'appli sait cacher la zone du haut et résoudre depuis la page (bloc « MSHome »)
  function on() { try { return !!(w.MSHome && w.MSHome.solve); } catch (x) { return false; } }
  function inner() {
    if (!big) {
      return '<div class="msr"><button class="msp' + (T ? " on" : "") + '" data-bar="open" aria-label="Écrire ton exercice">' + e(T ? T.replace(/\s+/g, " ") : "Écris ou photographie ton exercice…") + "</button>" +
        '<button class="msi" data-bar="kb" aria-label="Clavier maths">Σ</button><button class="msi" data-bar="mic" aria-label="Dicter">' + IC.mic + '</button><button class="msi" data-bar="cam" aria-label="Photo">' + IC.cam + '</button><button class="msg" data-bar="go" aria-label="Résoudre">' + IC.go + "</button></div>";
    }
    return '<div class="mso"><label for="msta">TON EXERCICE</label><textarea id="msta" placeholder="Écris ou colle ton exercice ici…" maxlength="4000">' + e(T) + "</textarea>" +
      '<div class="msk"><button class="msi mkb" data-bar="kb">Σ Clavier maths</button><button class="msi" data-bar="mic" aria-label="Dicter">' + IC.mic + '</button><button class="msi" data-bar="cam" aria-label="Photo">' + IC.cam + '</button><button class="msgo" data-bar="go">Résoudre' + IC.go + '</button></div><button class="msx" data-bar="close" aria-label="Réduire la saisie"><i></i></button></div>';
  }
  function draw() {
    var b = D.getElementById("msbb"), s = D.getElementById("msscr"), t;
    if (!b) { return; }
    b.className = "msb" + (big ? " op" : "");
    b.innerHTML = inner();
    if (big && !s) { s = D.createElement("div"); s.id = "msscr"; s.onclick = function () { shut(); }; D.body.appendChild(s); }
    if (!big && s) { s.remove(); }
    if (big) {
      t = D.getElementById("msta");
      t.oninput = function () { T = t.value; ws(T); };
      setTimeout(function () { try { t.focus(); t.setSelectionRange(t.value.length, t.value.length); } catch (x) { } }, 60);
    }
  }
  function grow() { if (busy()) { toast("Tu as un devoir en cours. Rends ta copie avant de résoudre un exercice."); return; } big = true; draw(); }
  function shut() { var t = D.getElementById("msta"); if (t) { T = t.value; ws(T); } big = false; draw(); }
  function html() {
    var p = P(), n = String(p.n || "").trim().split(" ")[0], lv = [p.ln, p.cn].filter(Boolean).join(" · ");
    T = T || rs(); big = false;
    var s = D.getElementById("msscr"); if (s) { s.remove(); }
    return '<div class="hhd"><b>' + (n ? "Bonjour " + e(n) : "Bonjour") + "</b>" + (lv ? '<button class="hlv" data-bar="lv">' + e(lv) + "</button>" : "") + '</div><div class="msw" id="msbar"><div class="msb" id="msbb">' + inner() + '</div></div><button id="home" class="hmq" hidden aria-hidden="true"></button>';
  }
  // texte reçu (exemple, dictée, clavier maths) : la barre s'ouvre pour qu'on le voie en entier
  function put(t, add) { T = add && T ? T.replace(/\s+$/, "") + " " + t : t; ws(T); grow(); }
  function solve() {
    var t = D.getElementById("msta");
    if (t) { T = t.value; }
    T = String(T || "").trim();
    if (busy()) { toast("Tu as un devoir en cours. Rends ta copie avant de résoudre un exercice."); return; }
    if (T.length < 2) { toast("Écris d'abord ton exercice."); grow(); return; }
    var q = T;
    T = ""; ws(""); big = false; draw();
    try { w.MSHome.solve(q); } catch (x) { toast("La résolution n'a pas pu démarrer. Réessaie."); }
  }
  // clavier maths : le même clavier 2D que la Copie, puis le texte revient dans la barre
  function ld(a, cb) {
    var todo = a.filter(function (u) { return !got[u]; }), n = todo.length, ok = 1;
    if (!n) { cb(1); return; }
    todo.forEach(function (u) { var s = D.createElement("script"); s.async = false; s.src = BASE + u; s.onload = function () { got[u] = 1; if (!--n) { cb(ok); } }; s.onerror = function () { ok = 0; if (!--n) { cb(ok); } }; D.head.appendChild(s); });
  }
  function kb() {
    var t = D.getElementById("msta");
    if (t) { T = t.value; ws(T); }
    if (busy()) { toast("Tu as un devoir en cours. Rends ta copie avant de résoudre un exercice."); return; }
    if (!D.getElementById("cpcss")) { var l = D.createElement("link"); l.id = "cpcss"; l.rel = "stylesheet"; l.href = BASE + "cp.css?v=1"; D.head.appendChild(l); }
    var need = (w.ED && w.ED.parse ? [] : ["ed_model.js?v=2", "ed_parse.js?v=2"]).concat(w.MSCK ? [] : ["ms_cpk.js?v=1"], w.MSMK ? [] : ["ms_mk.js?v=1"], w.MSCPC ? [] : ["ms_cpc.js?v=1"], w.MSCPB ? [] : ["ms_cpb.js?v=1"]);
    ld(need, function (ok) {
      if (!ok || !w.MSCPB) { toast("Connexion nécessaire pour ouvrir le clavier maths."); return; }
      big = false; draw();
      w.MSCPB.open({ simple: 1, title: "Clavier maths", sub: "Ton exercice", ok: "Insérer", ph: "Écris ton exercice ici.", ctx: "", lines: T ? T.split("\n") : [""],
        onValid: function (L) { put(L.join("\n"), false); } });
    });
  }
  // dictée : pont de l'appli (MSDict), sinon reconnaissance vocale du navigateur
  var SPK = [[/inférieur ou égal à/g, " ≤ "], [/supérieur ou égal à/g, " ≥ "], [/inférieur à/g, " < "], [/supérieur à/g, " > "], [/racine carrée de /g, "√"], [/ au carré/g, "²"], [/ au cube/g, "³"], [/ plus /g, " + "], [/ moins /g, " − "], [/ fois /g, " × "], [/ divisé par /g, " / "], [/ égale? /g, " = "], [/\bpi\b/g, "π"], [/l'infini|infini/g, "∞"]];
  function spoken(t) { var s = " " + String(t) + " "; SPK.forEach(function (r) { s = s.replace(r[0], r[1]); }); return s.replace(/\s+/g, " ").trim(); }
  function dshut() { var v = D.getElementById("msdi"); if (v) { v.remove(); } }
  function dict() {
    var R = w.SpeechRecognition || w.webkitSpeechRecognition, nat = false, r, v;
    if (busy()) { toast("Tu as un devoir en cours. Rends ta copie avant de résoudre un exercice."); return; }
    try { nat = !!(w.MSDict && w.MSDict.start); } catch (x) { }
    if (!nat && !R) { toast("La dictée n'est pas disponible sur ce téléphone."); return; }
    var t = D.getElementById("msta"); if (t) { T = t.value; ws(T); }
    dshut();
    v = D.createElement("div"); v.id = "msdi";
    v.innerHTML = '<div role="dialog" aria-label="Dictée"><h3>Dicte ton exercice</h3><div class="mic">' + IC.mic + '</div><p id="msdt">Prépare-toi…</p><div class="row"><button data-bar="dcx">Annuler</button><button class="pri" data-bar="dok">Terminer</button></div></div>';
    D.body.appendChild(v);
    w.msDicteeOn = function () { var p = D.getElementById("msdt"); if (p) { p.textContent = "Je t'écoute… Parle normalement."; } };
    w.msDicteePart = function (s) { var p = D.getElementById("msdt"); if (p) { p.textContent = spoken(s); } };
    w.msDictee = function (s) { dshut(); if (s) { put(spoken(s), true); } };
    w.msDicteeErr = function (c) { dshut(); c = +c; toast(c === 9 ? "Autorise le micro, puis touche à nouveau le micro." : c === 6 || c === 7 ? "Je n'ai rien compris. Réessaie en parlant près du téléphone." : c === 1 || c === 2 || c === 4 ? "La dictée a besoin d'Internet. Vérifie ta connexion." : "La dictée n'a pas marché. Réessaie."); };
    if (nat) { try { w.MSDict.start("fr-FR"); } catch (x) { w.msDicteeErr(-2); } return; }
    try { r = new R(); r.lang = "fr-FR"; r.interimResults = true; r.onstart = w.msDicteeOn; r.onresult = function (ev) { var x = ev.results[ev.results.length - 1]; if (x.isFinal) { w.msDictee(x[0].transcript); } else { w.msDicteePart(x[0].transcript); } }; r.onerror = function () { w.msDicteeErr(7); }; r.start(); w.msDicteeRec = r; } catch (x) { w.msDicteeErr(-2); }
  }
  function dstop(cancel) {
    try { if (w.MSDict && w.MSDict.stop) { if (cancel && w.MSDict.cancel) { w.MSDict.cancel(); } else { w.MSDict.stop(); } } } catch (x) { }
    try { if (w.msDicteeRec) { if (cancel) { w.msDicteeRec.abort(); } else { w.msDicteeRec.stop(); } } } catch (x) { }
    if (cancel) { dshut(); }
  }
  D.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("[data-bar]") : null, a;
    if (!b) { return; }
    a = b.getAttribute("data-bar");
    if (a === "open") { grow(); }
    else if (a === "close") { shut(); }
    else if (a === "go") { solve(); }
    else if (a === "kb") { kb(); }
    else if (a === "mic") { dict(); }
    else if (a === "dcx") { dstop(true); }
    else if (a === "dok") { dstop(false); var p = D.getElementById("msdt"); if (p) { p.textContent = "Je termine…"; } }
    else if (a === "cam") { if (busy()) { toast("Tu as un devoir en cours. Rends ta copie avant de résoudre un exercice."); return; } var t = D.getElementById("msta"); if (t) { T = t.value; ws(T); } big = false; draw(); try { w.MSHome.photo(); } catch (x) { toast("La photo n'est pas disponible."); } }
    else if (a === "lv") { try { w.MSAC.open("prof"); } catch (x) { } }
  });
  // retour du téléphone sur l'accueil : d'abord refermer la saisie ou la dictée, sinon proposer de quitter l'appli
  D.body.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target.closest("#home.hmq") : null;
    if (!t) { return; }
    ev.stopPropagation(); ev.preventDefault();
    if (D.getElementById("msdi")) { dstop(true); return; }
    if (big) { shut(); return; }
    try { w.MSNav.quit(); } catch (x) { }
  });
  var st = D.createElement("style"); st.id = "barcss"; st.appendChild(D.createTextNode(CSS)); D.head.appendChild(st);
  w.MSBAR = { on: on, html: html, put: put, shut: function () { if (big) { shut(); } dshut(); }, open: function () { return big; } };
})(window);
