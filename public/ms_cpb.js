/* MathSolver - Copie : page de réponse (énoncé figé en haut, raisonnement ligne par ligne en écriture mathématique 2D, clavier, abc, dictée, calculatrice) */
(function (w) {
  "use strict";
  if (w.MSCPB) { return; }
  var D = document, O = null, B = null, L = [], T = [], li = 0, abc = false, ch = null, tm = 0, tk = 0, R0 = null, C0 = null, bad = null;
  var WD = { ou: 1, et: 1, si: 1, or: 1, on: 1, de: 1, la: 1, le: 1, en: 1, un: 1, il: 1, ne: 1, pas: 1 };
  var RD = '<svg class="xfrd" viewBox="0 0 12 20" preserveAspectRatio="none"><path d="M.5 11.5l2.5-1.5 3 8.5L11.5 1"/></svg>';
  var PL = '<svg class="xfpa" viewBox="0 0 8 20" preserveAspectRatio="none"><path d="M7 .5C2 5 2 15 7 19.5"/></svg>';
  var PR = '<svg class="xfpa" viewBox="0 0 8 20" preserveAspectRatio="none"><path d="M1 .5C6 5 6 15 1 19.5"/></svg>';
  function e(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function ok() { return !!(w.ED && w.ED.parse && w.ED.empty); }
  // --- écriture 2D : arbre de l'éditeur (ED) → éléments ---
  function sh(c, h) { var x = D.createElement("span"); x.className = c; x.innerHTML = h || ""; return x; }
  function letter(n) { return n && n.t === "c" && n.k === "v" && /^[A-Za-zÀ-ÖØ-öø-ÿ]$/.test(n.v); }
  // les mots (« donc », « car »…) s'écrivent droits, les lettres seules en italique
  function words(a) {
    var m = [], i = 0, j, wd;
    while (i < a.length) {
      if (!letter(a[i])) { i++; continue; }
      for (j = i; j < a.length && letter(a[j]); j++) { }
      wd = a.slice(i, j).map(function (n) { return n.v; }).join("");
      if (j - i >= 3 || WD[wd.toLowerCase()]) { for (; i < j; i++) { m[i] = 1; } }
      i = j;
    }
    return m;
  }
  function rn(n, wd, cu) {
    var x, f;
    if (n.t === "c") { x = sh("xfc xfk" + (wd ? "t" : n.k)); x.textContent = n.v === "−" ? "−" : n.v; x.__n = n; return x; }
    f = n.f.map(function (s) { return rs(s, false, cu); });
    if (n.t === "frac") { x = sh("xffr", '<span class="xfnu"></span><span class="xffb"></span><span class="xfde"></span>'); x.children[0].appendChild(f[0]); x.children[2].appendChild(f[1]); }
    else if (n.t === "sup" || n.t === "sub") { x = sh(n.t === "sup" ? "xfsu" : "xfsb"); x.appendChild(f[0]); }
    else if (n.t === "ss") { x = sh("xfss", '<span class="xfsa"></span><span class="xfsz"></span>'); x.children[0].appendChild(f[1]); x.children[1].appendChild(f[0]); }
    else if (n.t === "sqrt") { x = sh("xfsr", RD + '<span class="xfrb"></span>'); x.children[1].appendChild(f[0]); }
    else if (n.t === "root") { x = sh("xfsr", '<span class="xfri"></span>' + RD + '<span class="xfrb"></span>'); x.children[0].appendChild(f[0]); x.children[2].appendChild(f[1]); }
    else if (n.t === "abs") { x = sh("xfab", '<i class="xfbl"></i><span class="xfgb"></span><i class="xfbl"></i>'); x.children[1].appendChild(f[0]); }
    else { x = sh("xfgp", PL + '<span class="xfgb"></span>' + PR); x.children[1].appendChild(f[0]); }
    x.__n = n;
    return x;
  }
  function rs(s, top, cu) {
    var x = sh("xfq" + (top ? " top" : "") + (s.n.length ? "" : " e") + (s === bad ? " bad" : "")), a = s.n, wd = words(a), g = null, i, n, y;
    x.__s = s;
    for (i = 0; i <= a.length; i++) {
      if (cu && cu.s === s && cu.i === i) { (g || x).appendChild(sh("xcar")); }
      if (i === a.length) { break; }
      n = a[i];
      y = rn(n, wd[i], cu);
      if (n.t === "c" && n.v === "," && a[i - 1] && a[i - 1].k === "n" && a[i + 1] && a[i + 1].k === "n") { y.className = "xfc xfkn"; }
      // signe « − » ou « + » d'un nombre (en début ou après =, <, une parenthèse…) : collé au nombre
      else if (n.t === "c" && n.k === "o" && /^[−+-]$/.test(n.v) && (!a[i - 1] || (a[i - 1].t === "c" && /[op]/.test(a[i - 1].k)) || (i > 1 && a[i - 1].k === "s" && a[i - 2].t === "c" && a[i - 2].k === "o"))) { y.className = "xfc xfku"; }
      n.el = y;
      // en haut : les groupes sans opérateur restent sur la même ligne à l'écran
      if (top && !(n.t === "c" && n.k === "s")) { if (!g || (n.t === "c" && n.k === "o")) { g = sh("xfw"); x.appendChild(g); } g.appendChild(y); }
      else { g = null; x.appendChild(y); }
    }
    return x;
  }
  // affichage d'une ligne (copie, corrigé, choix de la réponse) : formule 2D sans curseur
  function pr(s) {
    s = String(s == null ? "" : s);
    if (!ok()) { return e(s).replace(/\^(\([^)]*\)|[0-9a-zA-Zπ−-]+)/g, "<sup>$1</sup>").replace(/_(\([^)]*\)|[0-9a-zA-Z]+)/g, "<sub>$1</sub>"); }
    try { var x = sh("xf"); x.appendChild(rs(parse(s), true, null)); return x.outerHTML; } catch (z) { return e(s); }
  }
  // texte → arbre : ², ³ deviennent des exposants ; les espaces autour des mots (« donc x ») sont gardés
  var FNW = /^(arcsin|arccos|arctan|sin|cos|tan|ln|log|exp|lim|sqrt|pi)$/i, SPC = "\u2009";
  function prep(t) {
    t = String(t).replace(/²/g, "^2").replace(/³/g, "^3").replace(/\u2009/g, " ");
    return t.replace(/([A-Za-zÀ-ÖØ-öø-ÿ]*)( +)(?=([A-Za-zÀ-ÖØ-öø-ÿ]*))/g, function (m, a, sp, b) {
      return a + ((a.length >= 2 && !FNW.test(a)) || (b.length >= 2 && !FNW.test(b)) ? SPC : sp);
    });
  }
  function fix(s) { s.n.forEach(function (n) { n.q = s; if (n.t === "c") { if (n.v === SPC) { n.v = " "; n.k = "s"; } } else { n.f.forEach(fix); } }); return s; }
  function parse(t) { return fix(w.ED.parse(prep(t))); }
  // arbre → texte lu par la correction (un produit comme 2(x − 1) en exposant garde ses parenthèses)
  var SIM = /^[\w.,À-ÖØ-öø-ÿα-ωΑ-Ω]+$/, ATM = /^(\d+([.,]\d+)?|[A-Za-zÀ-ÖØ-öø-ÿα-ωΑ-Ω])$/;
  function one(s) {
    var m = s.match(/^[A-Za-zÀ-ÖØ-öø-ÿ]+'*\(/), d = 0, i;
    if (!m) { return false; }
    for (i = m[0].length - 1; i < s.length; i++) { if (s.charAt(i) === "(") { d++; } else if (s.charAt(i) === ")" && --d === 0) { return i === s.length - 1; } }
    return false;
  }
  function wn(s) { return SIM.test(s) || one(s) ? s : "(" + s + ")"; }
  function wr(s) { return ATM.test(s) || one(s) ? s : "(" + s + ")"; }
  function od(n) { return !!n && (n.t !== "c" || "nvfx".indexOf(n.k) >= 0); }
  function tx(s) {
    var a = s.n, o = "", i, n, r, u;
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (n.t === "c") { o += n.v === "−" ? "-" : n.v; continue; }
      u = n.f.map(tx);
      if (n.t === "frac") { r = wn(u[0]) + "/" + wr(u[1]); if (od(a[i - 1]) || od(a[i + 1])) { r = "(" + r + ")"; } }
      else if (n.t === "sup") { r = "^" + wr(u[0]); }
      else if (n.t === "sub") { r = "_" + wr(u[0]); }
      else if (n.t === "ss") { r = "_" + wr(u[0]) + "^" + wr(u[1]); }
      else if (n.t === "sqrt") { r = "√(" + u[0] + ")"; }
      else if (n.t === "root") { r = "(" + u[1] + ")^(1/" + u[0] + ")"; }
      else if (n.t === "abs") { r = "|" + u[0] + "|"; }
      else { r = "(" + u[0] + ")"; }
      o += r;
    }
    return o;
  }
  function txt(r) { return tx(r).replace(/ {2,}/g, " ").trim(); }
  function at(i, end) { li = i; w.ED.root = T[i]; w.ED.cur = { s: T[i], i: end ? T[i].n.length : 0 }; }
  // --- page ---
  var IC = {
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"/>',
    ok: '<path d="M5 12l5 5 9-10"/>'
  };
  function ic(n) { return '<svg class="xi" viewBox="0 0 24 24" aria-hidden="true">' + IC[n] + "</svg>"; }
  function saved() { var b = D.getElementById("xsv"); if (b) { b.classList.add("on"); clearTimeout(tm); tm = setTimeout(function () { b.classList.remove("on"); }, 1200); } }
  function chg() { if (O.onChange) { O.onChange(L.slice()); } saved(); }
  function work() {
    var wk = D.getElementById("xwk"), on, cr;
    wk.innerHTML = "";
    T.forEach(function (t, i) {
      var c = i === li, r = D.createElement("div"), x;
      r.className = "xln" + (c ? " on" : ""); r.setAttribute("data-b", "ln"); r.setAttribute("data-i", i);
      r.innerHTML = '<span class="xno">' + (i + 1) + '</span><div class="xtx"></div>' + (T.length > 1 ? '<button class="xdl" data-b="del" data-i="' + i + '" aria-label="Supprimer la ligne ' + (i + 1) + '">×</button>' : "");
      x = r.children[1];
      if (!t.n.length && !(c && !abc)) { x.innerHTML = '<span class="xph">' + (i ? "Ligne vide" : "Écris ton raisonnement ici, ligne par ligne.") + "</span>"; }
      else { x.appendChild(rs(t, true, c && !abc ? w.ED.cur : null)); }
      wk.appendChild(r);
    });
    on = wk.querySelector(".xln.on"); cr = wk.querySelector(".xcar");
    if (on) { on.scrollIntoView({ block: "nearest" }); }
    if (cr && cr.scrollIntoView) { cr.scrollIntoView({ block: "nearest", inline: "nearest" }); }
  }
  function edited() { L[li] = txt(T[li]); work(); chg(); }
  function pad() {
    var p = D.getElementById("xpd"), inp;
    if (abc) {
      p.onpointerdown = null; p.onkeydown = null;
      p.innerHTML = '<div class="xab"><button class="xtb on" id="xabc" data-b="abc">123</button><input id="xabi" type="text" autocomplete="off" placeholder="Écris en lettres : donc, car, d\'après…" aria-label="Texte de la ligne"><button class="xtb" data-b="nl" aria-label="À la ligne">↵</button></div>';
      inp = D.getElementById("xabi");
      inp.value = L[li]; inp.focus();
      inp.oninput = function () { L[li] = inp.value; T[li] = parse(inp.value); at(li, true); work(); chg(); };
      inp.onkeydown = function (ev) { if (ev.key === "Enter") { ev.preventDefault(); key("NL"); } };
    } else { w.MSMK.mount(p, key); }
  }
  // touches du clavier : "ed" (la formule a changé), flèches, effacer, espace, à la ligne
  function key(a) {
    var E = w.ED, c = E.cur, r = T[li], p, k, rest, nr;
    if (a === "ed") { edited(); return; }
    if (a === "SP") { E.put(" "); edited(); return; }
    if (a === "L") { if (c.s === r && c.i === 0) { if (li > 0) { at(li - 1, true); } } else { E.left(); } work(); return; }
    if (a === "R") { if (c.s === r && c.i === r.n.length) { if (li < T.length - 1) { at(li + 1, false); } } else { E.right(); } work(); return; }
    if (a === "BS") {
      if (c.s === r && c.i === 0) {
        if (li === 0) { return; }
        p = T[li - 1]; k = p.n.length;
        r.n.forEach(function (n) { n.q = p; p.n.push(n); });
        T.splice(li, 1); L.splice(li, 1);
        at(li - 1, false); E.cur.i = k;
      } else { E.back(); }
      edited();
      return;
    }
    if (a === "NL") {
      while (c.s.p) { p = c.s.p; c.s = p.q; c.i = p.q.n.indexOf(p) + 1; }
      rest = r.n.splice(c.i);
      nr = { n: rest, p: null };
      rest.forEach(function (n) { n.q = nr; });
      T.splice(li + 1, 0, nr); L.splice(li + 1, 0, "");
      L[li] = txt(r);
      at(li + 1, false);
      if (abc) { var inp = D.getElementById("xabi"); if (inp) { inp.value = txt(nr); inp.focus(); } }
      edited();
    }
  }
  // texte reçu (dictée, calculatrice) : ajouté en 2D à la place du curseur
  function insert(t) {
    var E = w.ED, c = E.cur, a = parse(t).n;
    if (!a.length) { return; }
    if (c.i > 0 && c.s.n[c.i - 1] && c.s.n[c.i - 1].k !== "s" && /^[=<>≤≥≠]/.test(String(t).trim())) { a.unshift({ t: "c", v: " ", k: "s" }); }
    a.forEach(function (n) { n.q = c.s; });
    Array.prototype.splice.apply(c.s.n, [c.i, 0].concat(a));
    c.i += a.length;
    edited();
    if (abc) { var i = D.getElementById("xabi"); if (i) { i.value = L[li]; } }
  }
  // toucher une ligne : la choisir ; toucher dans la ligne choisie : placer le curseur
  function hit(ev, i) {
    var E = w.ED, t, n, s, a, k, r;
    if (i !== li || abc) { at(i, true); work(); if (abc) { pad(); } return; }
    t = ev.target.closest ? ev.target.closest(".xfc,.xfq") : null;
    if (!t || !(t.__n || t.__s)) { E.cur = { s: T[i], i: T[i].n.length }; work(); return; }
    if (t.__n) { n = t.__n; s = n.q; r = t.getBoundingClientRect(); E.cur = { s: s, i: s.n.indexOf(n) + (ev.clientX > r.left + r.width / 2 ? 1 : 0) }; }
    else {
      s = t.__s; a = s.n;
      for (k = 0; k < a.length; k++) { r = a[k].el.getBoundingClientRect(); if (ev.clientY < r.top || (ev.clientY <= r.bottom && ev.clientX < r.left + r.width / 2)) { break; } }
      E.cur = { s: s, i: k };
    }
    work();
  }
  // dictée : mots dits → symboles (les expressions longues d'abord)
  var SPK = [[/inférieur ou égal à/g, " ≤ "], [/supérieur ou égal à/g, " ≥ "], [/inférieur à/g, " < "], [/supérieur à/g, " > "], [/différent de/g, " ≠ "], [/ouvre(z)? la parenthèse/g, "("], [/ferme(z)? la parenthèse/g, ")"],
    [/racine carrée de /g, "√"], [/racine de /g, "√"], [/f prime de x/g, "f′(x)"], [/f de x/g, "f(x)"], [/ au carré| carré/g, "²"], [/ au cube/g, "³"], [/ puissance | exposant /g, "^"],
    [/ plus /g, " + "], [/ moins /g, " − "], [/ fois /g, " × "], [/ divisé par | sur /g, " / "], [/ égale? /g, " = "], [/ égale?$/g, " ="], [/point-virgule|point virgule/g, " ; "], [/ virgule /g, ","], [/\bpi\b/g, "π"], [/\bdelta\b/g, "Δ"], [/l'infini|infini/g, "∞"]];
  function spoken(t) { var s = " " + String(t).toLowerCase() + " "; SPK.forEach(function (r) { s = s.replace(r[0], r[1]); }); return s.replace(/\s+/g, " ").trim(); }
  function dshut() { var v = D.getElementById("xdict"); if (v) { v.remove(); } }
  function dmsg(c) { return c === 9 ? "Autorise le micro dans la fenêtre qui s'est ouverte, puis touche à nouveau le micro." : c === 6 || c === 7 ? "Je n'ai rien compris. Réessaie en parlant près du téléphone." : c === 1 || c === 2 || c === 4 ? "La dictée a besoin d'Internet sur ce téléphone. Vérifie ta connexion." : c === -1 ? "La reconnaissance vocale n'est pas disponible sur ce téléphone." : "La dictée n'a pas marché. Réessaie."; }
  function dict() {
    var R = w.SpeechRecognition || w.webkitSpeechRecognition, nat = false, r, v;
    try { nat = !!(w.MSDict && w.MSDict.start); } catch (x) { }
    if (!nat && !R) { toast("La dictée arrive avec la prochaine mise à jour de l'application."); return; }
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
    g.onpointerup = function () { if (mv) { return; } var H = B.clientHeight, st = [48, Math.round(H * 0.24), Math.round(H * 0.55)], i = st.findIndex(function (v) { return Math.abs(v - c.offsetHeight) < 24; }); ch = st[(i + 1) % 3]; c.style.height = ch + "px"; };
  }
  function sheet(h) { var v = D.createElement("div"); v.className = "xveil"; v.id = "xveil"; v.innerHTML = '<div class="xsh" role="dialog">' + h + "</div>"; v.onclick = function (ev) { if (ev.target === v) { v.remove(); } }; D.body.appendChild(v); }
  function valid() {
    var ix = [], pk, i, z;
    // une case vide (exposant, fraction, racine…) doit être remplie avant de valider
    for (i = 0; i < T.length; i++) {
      z = w.ED.empty(T[i]);
      if (z) { abc = false; pad(); at(i, false); w.ED.cur = { s: z, i: 0 }; bad = z; work(); setTimeout(function () { bad = null; if (B) { work(); } }, 1100); toast("Remplis la case vide de la ligne " + (i + 1) + "."); return; }
    }
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
  function shut() {
    if (D.getElementById("xdict")) { dstop(true); }
    clearInterval(tk);
    try { w.MSCPC.close(); } catch (x) { }
    if (B) { B.remove(); B = null; }
    if (w.ED && R0) { w.ED.root = R0; w.ED.cur = C0; R0 = C0 = null; }
  }
  function close() { var cb = O && O.onClose, l = L.slice(); shut(); if (cb) { cb(l); } }
  function open(o) {
    if (!ok()) { toast("Le clavier se prépare. Réessaie dans un instant."); return; }
    O = o; L = o.lines && o.lines.length ? o.lines.slice() : [""]; abc = false; bad = null;
    R0 = w.ED.root; C0 = w.ED.cur;
    T = L.map(parse);
    at(L.length - 1, true);
    B = D.createElement("div"); B.className = "xB"; B.id = "xB";
    B.innerHTML = '<div class="xwr"><div class="xhd"><button class="xbk" data-b="x" aria-label="Revenir"></button><div class="xtt"><b>' + e(o.title) + "</b><small>" + e(o.sub || "") + ' <span class="xsv" id="xsv">Enregistré ✓</span></small></div>' + (o.clock ? '<span class="xclk" id="xclk"></span>' : "") + '</div><div class="xctx" id="xctx">' + o.ctx + '</div><div class="xgr" id="xgr" role="separator" aria-label="Agrandir ou réduire l\'énoncé"><i></i></div><div class="xwk" id="xwk"></div>' +
      '<div class="xtools"><button class="xtb" data-b="dict" aria-label="Dicter">' + ic("mic") + '</button><button class="xtb" data-b="calc" aria-label="Calculatrice">' + ic("calc") + '</button><button class="xtb val" data-b="val">' + ic("ok") + 'Valider</button></div><div id="xpd" class="xpd"></div></div>';
    D.body.appendChild(B);
    var c = D.getElementById("xctx");
    // énoncé court : la zone s'ajuste à son contenu pour laisser plus de place à la réponse
    c.style.height = (ch === null ? Math.max(48, Math.min(Math.round(B.clientHeight * 0.24), c.scrollHeight + 2)) : ch) + "px"; c.scrollTop = c.scrollHeight;
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
    else if (a === "ln") { if (ev.target.closest(".xdl")) { return; } hit(ev, i); }
    else if (a === "del") { T.splice(i, 1); L.splice(i, 1); if (!T.length) { T.push({ n: [], p: null }); L.push(""); } at(Math.min(li, T.length - 1), true); work(); chg(); if (abc) { pad(); } }
    else if (a === "abc") { abc = !abc; if (!abc) { at(li, true); } pad(); work(); }
    else if (a === "nl") { key("NL"); }
    else if (a === "calc") { w.MSCPC.open(insert); }
    else if (a === "dict") { dict(); }
    else if (a === "dcx") { dstop(true); }
    else if (a === "dok") { dstop(false); var p = D.getElementById("xdt"); if (p) { p.textContent = "Je termine…"; } }
    else if (a === "val") { valid(); }
    else if (a === "pk") { D.querySelectorAll("#xveil .xo").forEach(function (o) { o.classList.toggle("on", o === b); }); }
    else if (a === "shx") { D.getElementById("xveil").remove(); }
    else if (a === "ok") { finish(); }
  });
  w.MSCPB = { open: open, close: close, pr: pr, norm: function (t) { return ok() ? txt(parse(t)) : String(t); }, on: function () { return !!B; } };
})(window);
