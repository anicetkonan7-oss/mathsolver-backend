/* MathSolver - Copie : page de réponse (énoncé figé en haut, raisonnement ligne par ligne, clavier, abc, dictée, calculatrice) */
(function (w) {
  "use strict";
  if (w.MSCPB) { return; }
  var D = document, O = null, B = null, L = [], li = 0, ci = 0, abc = false, ch = null, tm = 0, tk = 0;
  function e(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  // affichage d'une ligne : exposants et indices
  function pr(s) { return e(s).replace(/\^(\([^)]*\)|[0-9a-zA-Zπ−-]+)/g, "<sup>$1</sup>").replace(/_(\([^)]*\)|[0-9a-zA-Z]+)/g, "<sub>$1</sub>"); }
  var IC = {
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"/>',
    ok: '<path d="M5 12l5 5 9-10"/>'
  };
  function ic(n) { return '<svg class="xi" viewBox="0 0 24 24" aria-hidden="true">' + IC[n] + "</svg>"; }
  function saved() { var b = D.getElementById("xsv"); if (b) { b.classList.add("on"); clearTimeout(tm); tm = setTimeout(function () { b.classList.remove("on"); }, 1200); } }
  function chg() { if (O.onChange) { O.onChange(L.slice()); } saved(); }
  function work() {
    var s = "", wk = D.getElementById("xwk"), on;
    L.forEach(function (l, i) {
      var c = i === li, t = c && !abc ? pr(l.slice(0, ci)) + '<span class="xcar"></span>' + pr(l.slice(ci)) : (pr(l) || '<span class="xph">' + (i ? "Ligne vide" : "Écris ton raisonnement ici, ligne par ligne.") + "</span>");
      s += '<div class="xln' + (c ? " on" : "") + '" data-b="ln" data-i="' + i + '"><span class="xno">' + (i + 1) + '</span><div class="xtx">' + t + "</div>" + (L.length > 1 ? '<button class="xdl" data-b="del" data-i="' + i + '" aria-label="Supprimer la ligne ' + (i + 1) + '">×</button>' : "") + "</div>";
    });
    wk.innerHTML = s;
    on = wk.querySelector(".xln.on");
    if (on) { on.scrollIntoView({ block: "nearest" }); }
  }
  function pad() {
    var p = D.getElementById("xpd"), b = D.getElementById("xabc"), inp;
    b.textContent = abc ? "f(x)" : "abc";
    b.classList.toggle("on", abc);
    if (abc) {
      p.onclick = null;
      p.innerHTML = '<div class="xab"><input id="xabi" type="text" autocomplete="off" placeholder="Écris en lettres : donc, car, d\'après…" aria-label="Texte de la ligne"><button class="xtb" data-b="nl" aria-label="À la ligne">↵</button></div>';
      inp = D.getElementById("xabi");
      inp.value = L[li]; inp.focus();
      inp.oninput = function () { L[li] = inp.value; ci = inp.value.length; work(); chg(); };
      inp.onkeydown = function (ev) { if (ev.key === "Enter") { ev.preventDefault(); act("NL"); inp.value = ""; } };
    } else { w.MSMK.mount(p, act); }
  }
  function act(a, v) {
    var l = L[li], k;
    if (a === "ins") { k = v.indexOf("§"); v = v.replace("§", ""); L[li] = l.slice(0, ci) + v + l.slice(ci); ci += k >= 0 ? k : v.length; }
    else if (a === "BS") { if (ci > 0) { L[li] = l.slice(0, ci - 1) + l.slice(ci); ci--; } else if (li > 0) { ci = L[li - 1].length; L[li - 1] += l; L.splice(li, 1); li--; } }
    else if (a === "L") { if (ci > 0) { ci--; } else if (li > 0) { li--; ci = L[li].length; } }
    else if (a === "R") { if (ci < l.length) { ci++; } else if (li < L.length - 1) { li++; ci = 0; } }
    else if (a === "NL") { L.splice(li + 1, 0, l.slice(ci)); L[li] = l.slice(0, ci); li++; ci = 0; }
    work(); chg();
  }
  function insert(t) { act("ins", t); if (abc) { var i = D.getElementById("xabi"); if (i) { i.value = L[li]; } } }
  // dictée : pont de l'appli s'il existe, sinon reconnaissance vocale du navigateur
  // mots dits → symboles (les expressions longues d'abord)
  var SPK = [[/inférieur ou égal à/g, " ≤ "], [/supérieur ou égal à/g, " ≥ "], [/inférieur à/g, " < "], [/supérieur à/g, " > "], [/différent de/g, " ≠ "], [/ouvre(z)? la parenthèse/g, "("], [/ferme(z)? la parenthèse/g, ")"],
    [/racine carrée de /g, "√"], [/racine de /g, "√"], [/f prime de x/g, "f′(x)"], [/f de x/g, "f(x)"], [/ au carré| carré/g, "²"], [/ au cube/g, "³"], [/ puissance | exposant /g, "^"],
    [/ plus /g, " + "], [/ moins /g, " − "], [/ fois /g, " × "], [/ divisé par | sur /g, " / "], [/ égale? /g, " = "], [/ égale?$/g, " ="], [/point-virgule|point virgule/g, " ; "], [/ virgule /g, ","], [/\bpi\b/g, "π"], [/\bdelta\b/g, "Δ"], [/l'infini|infini/g, "∞"]];
  function spoken(t) { var s = " " + String(t).toLowerCase() + " "; SPK.forEach(function (r) { s = s.replace(r[0], r[1]); }); return s.replace(/\s+/g, " ").trim(); }
  // dictée : pont de l'appli (MSDict), sinon reconnaissance vocale du navigateur ; fenêtre « Je t'écoute »
  function dshut() { var v = D.getElementById("xdict"); if (v) { v.remove(); } }
  function dmsg(c) { return c === 9 ? "Autorise le micro dans la fenêtre qui s'est ouverte, puis touche à nouveau le micro." : c === 6 || c === 7 ? "Je n'ai rien compris. Réessaie en parlant près du téléphone." : c === 1 || c === 2 || c === 4 ? "La dictée a besoin d'Internet sur ce téléphone. Vérifie ta connexion." : c === -1 ? "La reconnaissance vocale n'est pas disponible sur ce téléphone." : "La dictée n'a pas marché. Réessaie."; }
  function dict() {
    var R = w.SpeechRecognition || w.webkitSpeechRecognition, nat = false, r, v;
    try { nat = !!(w.MSDict && w.MSDict.start); } catch (x) { }
    if (!nat && !R) { toast("La dictée arrive avec la prochaine mise à jour de l'application."); return; }
    if (!D.getElementById("xdcss")) { v = D.createElement("style"); v.id = "xdcss"; v.textContent = ".xmic{width:84px;height:84px;margin:8px auto 10px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#1a62e8;color:#fff;animation:xpu 1.3s ease-in-out infinite}.xmic .xi{width:38px;height:38px}#xdt{min-height:24px;text-align:center;font-family:'Cambria Math','STIX Two Text',serif;font-size:18px;color:inherit}@keyframes xpu{0%,100%{box-shadow:0 0 0 0 rgba(26,98,232,.45)}50%{box-shadow:0 0 0 16px rgba(26,98,232,0)}}@media (prefers-reduced-motion:reduce){.xmic{animation:none}}"; D.head.appendChild(v); }
    dshut();
    v = D.createElement("div"); v.className = "xveil"; v.id = "xdict";
    v.innerHTML = '<div class="xsh" role="dialog" aria-label="Dictée"><h3>Dictée</h3><div class="xmic">' + ic("mic") + '</div><p id="xdt">Prépare-toi…</p><p style="text-align:center">Dis par exemple : « f de x égale x au carré moins 3 ».</p><div class="xrow"><button class="xbt sec" data-b="dcx">Annuler</button><button class="xbt pri" data-b="dok">' + ic("ok") + "Terminer</button></div></div>";
    D.body.appendChild(v);
    w.msDicteeOn = function () { var p = D.getElementById("xdt"); if (p) { p.textContent = "Je t'écoute… Parle normalement."; } };
    w.msDicteePart = function (t) { var p = D.getElementById("xdt"); if (p) { p.textContent = spoken(t); } };
    w.msDictee = function (t) { dshut(); if (t && B) { insert(spoken(t)); } };
    w.msDicteeErr = function (c) { dshut(); toast(dmsg(+c)); };
    if (nat) { try { w.MSDict.start("fr-FR"); } catch (x) { w.msDicteeErr(-2); } return; }
    try { r = new R(); r.lang = "fr-FR"; r.interimResults = true; r.onstart = w.msDicteeOn; r.onresult = function (ev) { var x = ev.results[ev.results.length - 1]; if (x.isFinal) { w.msDictee(x[0].transcript); } else { w.msDicteePart(x[0].transcript); } }; r.onerror = function () { w.msDicteeErr(7); }; r.start(); w.msDicteeRec = r; } catch (x) { w.msDicteeErr(-2); }
  }
  function dstop(cancel) {
    try { if (w.MSDict && w.MSDict.stop) { if (cancel && w.MSDict.cancel) { w.MSDict.cancel(); } else { w.MSDict.stop(); } } } catch (x) { }
    try { if (w.msDicteeRec) { if (cancel) { w.msDicteeRec.abort(); } else { w.msDicteeRec.stop(); } } } catch (x) { }
    if (cancel) { dshut(); }
  }
  function toast(m) { try { w.MSAC.toast(m); } catch (x) { } }
  function grip() {
    var g = D.getElementById("xgr"), c = D.getElementById("xctx"), y0 = 0, h0 = 0, mv = false;
    function lim(h) { return Math.max(48, Math.min(B.clientHeight * 0.68, h)); }
    g.onpointerdown = function (ev) { y0 = ev.clientY; h0 = c.offsetHeight; mv = false; g.setPointerCapture(ev.pointerId); };
    g.onpointermove = function (ev) { if (!g.hasPointerCapture(ev.pointerId)) { return; } if (Math.abs(ev.clientY - y0) > 4) { mv = true; } ch = lim(h0 + ev.clientY - y0); c.style.height = ch + "px"; };
    g.onpointerup = function () { if (mv) { return; } var H = B.clientHeight, st = [48, Math.round(H * 0.26), Math.round(H * 0.55)], i = st.findIndex(function (v) { return Math.abs(v - c.offsetHeight) < 24; }); ch = st[(i + 1) % 3]; c.style.height = ch + "px"; };
  }
  function sheet(h) { var v = D.createElement("div"); v.className = "xveil"; v.id = "xveil"; v.innerHTML = '<div class="xsh" role="dialog">' + h + "</div>"; v.onclick = function (ev) { if (ev.target === v) { v.remove(); } }; D.body.appendChild(v); }
  function valid() {
    var ix = [], pk;
    L.forEach(function (l, i) { if (l.trim()) { ix.push(i); } });
    if (!ix.length) { toast("Écris au moins une ligne avant de valider."); return; }
    pk = ix[ix.length - 1];
    sheet('<h3>Quelle est ta réponse finale ?</h3><p>Elle sera encadrée. Tout ton raisonnement est gardé.</p><div class="xop">' + ix.map(function (i) { return '<button class="xo' + (i === pk ? " on" : "") + '" data-b="pk" data-i="' + i + '"><i></i><span>' + pr(L[i]) + "</span></button>"; }).join("") + '</div><div class="xrow"><button class="xbt sec" data-b="shx">Continuer d\'écrire</button><button class="xbt pri" data-b="ok">' + ic("ok") + "Valider</button></div>");
  }
  function finish() {
    var on = D.querySelector("#xveil .xo.on"), f = on ? +on.getAttribute("data-i") : -1, keep = [], nf = -1, cb = O.onValid;
    L.forEach(function (l, i) { if (l.trim()) { if (i === f) { nf = keep.length; } keep.push(l); } });
    D.getElementById("xveil").remove();
    shut();
    cb(keep, nf);
  }
  function shut() { if (D.getElementById("xdict")) { dstop(true); } clearInterval(tk); try { w.MSCPC.close(); } catch (x) { } if (B) { B.remove(); B = null; } }
  function close() { var cb = O && O.onClose, l = L.slice(); shut(); if (cb) { cb(l); } }
  function open(o) {
    O = o; L = o.lines && o.lines.length ? o.lines.slice() : [""]; li = L.length - 1; ci = L[li].length; abc = false;
    B = D.createElement("div"); B.className = "xB"; B.id = "xB";
    B.innerHTML = '<div class="xwr"><div class="xhd"><button class="xbk" data-b="x" aria-label="Revenir"></button><div class="xtt"><b>' + e(o.title) + "</b><small>" + e(o.sub || "") + ' <span class="xsv" id="xsv">Enregistré ✓</span></small></div>' + (o.clock ? '<span class="xclk" id="xclk"></span>' : "") + '</div><div class="xctx" id="xctx">' + o.ctx + '</div><div class="xgr" id="xgr" role="separator" aria-label="Agrandir ou réduire l\'énoncé"><i></i></div><div class="xwk" id="xwk"></div>' +
      '<div class="xtools"><button class="xtb" data-b="dict" aria-label="Dicter">' + ic("mic") + '</button><button class="xtb" id="xabc" data-b="abc">abc</button><button class="xtb" data-b="calc" aria-label="Calculatrice">' + ic("calc") + '</button><button class="xtb val" data-b="val">' + ic("ok") + 'Valider</button></div><div id="xpd" class="xpd"></div></div>';
    D.body.appendChild(B);
    var c = D.getElementById("xctx");
    if (ch === null) { ch = Math.round(B.clientHeight * 0.26); }
    c.style.height = ch + "px"; c.scrollTop = c.scrollHeight;
    work(); pad(); grip();
    if (o.clock) { tk = setInterval(function () { var k = D.getElementById("xclk"); if (k) { k.textContent = o.clock(); } }, 1000); D.getElementById("xclk").textContent = o.clock(); }
  }
  // retour (flèche ou bouton du téléphone) : ferme d'abord la page de réponse
  D.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target.closest("#home") : null;
    if (t && B) { ev.stopImmediatePropagation(); ev.preventDefault(); if (D.getElementById("xveil")) { D.getElementById("xveil").remove(); } else { close(); } }
  }, true);
  D.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("[data-b]") : null, a, i;
    if (!b || !B) { return; }
    a = b.getAttribute("data-b"); i = +b.getAttribute("data-i");
    if (a === "x") { close(); }
    else if (a === "ln") { if (ev.target.closest(".xdl")) { return; } li = i; ci = L[i].length; work(); if (abc) { pad(); } }
    else if (a === "del") { L.splice(i, 1); if (!L.length) { L.push(""); } li = Math.min(li, L.length - 1); ci = L[li].length; work(); chg(); }
    else if (a === "abc") { abc = !abc; pad(); work(); }
    else if (a === "nl") { act("NL"); var inp = D.getElementById("xabi"); if (inp) { inp.value = ""; inp.focus(); } }
    else if (a === "calc") { w.MSCPC.open(insert); }
    else if (a === "dict") { dict(); }
    else if (a === "dcx") { dstop(true); }
    else if (a === "dok") { dstop(false); var p = D.getElementById("xdt"); if (p) { p.textContent = "Je termine…"; } }
    else if (a === "val") { valid(); }
    else if (a === "pk") { D.querySelectorAll("#xveil .xo").forEach(function (o) { o.classList.toggle("on", o === b); }); }
    else if (a === "shx") { D.getElementById("xveil").remove(); }
    else if (a === "ok") { finish(); }
  });
  w.MSCPB = { open: open, close: close, pr: pr, on: function () { return !!B; } };
})(window);
