/* MathSolver - affichage 4/4 : actions (replier, copier, partager, barre du bas, historique) */
(function (w) {
  "use strict";
  var A = w.MSApp, N = w.MSNav, L = w.MSLib && w.MSLib.save ? w.MSLib : null, D = document, sid = "";
  function $(id) { return D.getElementById(id); }
  function svg(p) { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>"; }
  var IC = {
    copy: svg('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    share: svg('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4"/><path d="M15.4 6.5l-6.8 4"/>'),
    pen: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
    plus: svg('<path d="M12 5v14"/><path d="M5 12h14"/>'),
    bm: svg('<path d="M6 3h12v18l-6-4-6 4z"/>')
  };
  var SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹", SUB = "₀₁₂₃₄₅₆₇₈₉";
  var SYM = {
    infty: "∞", leq: "≤", le: "≤", geq: "≥", ge: "≥", neq: "≠", approx: "≈", cdot: "·", times: "×",
    pi: "π", to: "→", rightarrow: "→", Rightarrow: "⇒", "in": "∈", "int": "∫", pm: "±", alpha: "α",
    beta: "β", theta: "θ", lambda: "λ", Delta: "Δ", delta: "δ", sum: "∑", left: "", right: "", quad: " "
  };

  // Formule LaTeX -> texte lisible (pour copier ou partager)
  function plain(s) {
    var t = String(s), p;
    for (p = 0; p < 4; p++) {
      t = t.replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "($1)/($2)").replace(/\\sqrt\s*\{([^{}]*)\}/g, "√($1)");
    }
    t = t.replace(/\\mathbb\s*\{([RNZQC])\}/g, function (m, c) { return { R: "ℝ", N: "ℕ", Z: "ℤ", Q: "ℚ", C: "ℂ" }[c]; });
    t = t.replace(/\\text\s*\{([^{}]*)\}/g, "$1");
    t = t.replace(/\\([A-Za-z]+|[,;! ])/g, function (m, n) { return SYM.hasOwnProperty(n) ? SYM[n] : (/^[A-Za-z]+$/.test(n) ? n : " "); });
    t = t.replace(/\^\{?(\d+)\}?/g, function (m, d) { return d.replace(/\d/g, function (c) { return SUP.charAt(+c); }); });
    t = t.replace(/_\{?(\d+)\}?/g, function (m, d) { return d.replace(/\d/g, function (c) { return SUB.charAt(+c); }); });
    return t.replace(/\^\{([^{}]*)\}/g, "^($1)").replace(/[${}]/g, "").replace(/[ \t]+/g, " ").trim();
  }

  function shareText() {
    var c = w.MS_CTX || {}, a = String(c.a || ""), q = String(c.q || "").trim(), i = a.indexOf("@@REPONSE"), L = [], k, l;
    k = (i >= 0 ? a.slice(i + 9) : a.replace(/@@[A-Z]+/g, "")).split("\n");
    for (i = 0; i < k.length; i++) { l = plain(k[i]).replace(/^•\s*/, "").replace(/\*\*/g, ""); if (l) { L.push(l); } }
    return "MathSolver" + (q ? "\n\nExercice : " + q : "") + "\n\nRéponse :\n" + L.join("\n");
  }

  function fold(c, on) {
    c.className = on ? "card" : "card shut";
    c.firstChild.setAttribute("aria-expanded", on ? "true" : "false");
  }

  function call(f) { try { f(); } catch (e) { } }

  // Enregistrer la correction : le bouton se coche, un second appui la retire
  function mark() {
    var b = $("bsave");
    if (!b) { return; }
    b.className = sid ? "act wide on" : "act wide";
    b.lastChild.nodeValue = sid ? "Correction enregistrée" : "Enregistrer la correction";
  }
  function keep() {
    var c = w.MS_CTX || {};
    if (sid) { L.remove(sid); sid = ""; L.toast("Retirée des enregistrées"); }
    else { sid = String(L.save(JSON.stringify({ q: String(c.q || ""), a: String(c.a || "") }))); if (sid) { L.toast("Correction enregistrée ✓"); } }
    mark();
  }

  D.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button") : null, cs, i, open, h, ans;
    if (!t) { return; }
    if (t.className.indexOf("head") >= 0) {
      fold(t.parentNode, t.parentNode.className.indexOf("shut") >= 0);
      if (w.msFit) { w.msFit(); }
    } else if (t.id === "fold") {
      cs = D.querySelectorAll(".card");
      open = false;
      for (i = 0; i < cs.length; i++) { if (cs[i].className.indexOf("shut") < 0) { open = true; } }
      for (i = 0; i < cs.length; i++) { fold(cs[i], !open); }
      t.firstChild.nodeValue = open ? "Tout déplier" : "Tout replier";
      if (w.msFit) { w.msFit(); }
    } else if (t.id === "goans") {
      ans = $("ans");
      h = D.querySelector(".photo");
      if (ans) { w.scrollTo({ top: ans.getBoundingClientRect().top + w.pageYOffset - (h ? h.offsetHeight : 0) - 8, behavior: "smooth" }); }
    } else if (t.id === "bcopy") {
      call(function () { A.copy(shareText()); });
    } else if (t.id === "bshare") {
      call(function () { A.share(shareText()); });
    } else if (t.id === "bsave") {
      call(keep);
    } else if (t.id === "bedit") {
      call(function () { N.edit(); });
    } else if (t.id === "bnew") {
      call(function () { N.newEx(); });
    }
  });

  // Boutons qui dépendent du pont Android (absents tant qu'il n'est pas installé)
  var box = $("acts"), bar, st, cs = D.querySelectorAll(".card"), lc = cs[cs.length - 1];
  if (!box && lc && A && A.copy && A.share) {
    box = D.createElement("div");
    box.className = "acts solo";
    lc.parentNode.insertBefore(box, lc.nextSibling);
  }
  if (box && A && A.copy && A.share) {
    box.innerHTML = '<button class="act" id="bcopy">' + IC.copy + 'Copier</button><button class="act" id="bshare">' + IC.share + "Partager</button>";
    if (L && w.MS_CTX && w.MS_CTX.a) {
      box.innerHTML += '<button class="act wide" id="bsave">' + IC.bm + "Enregistrer la correction</button>";
      call(function () { sid = String(L.find(String(w.MS_CTX.q || "")) || ""); mark(); });
      st = D.createElement("style");
      st.textContent = ".acts{flex-wrap:wrap}.act.wide{flex:1 1 100%}.act.on{background:#e6f6ec;border-color:#34a06a}.solo .act.on{background:#e6eeff;border-color:#1a62e8}.act.on svg{fill:currentColor}.dk .act.on{background:#17301f}.dk .solo .act.on{background:#1f2c4a}";
      D.head.appendChild(st);
    }
  }
  if (N && N.newEx) {
    bar = D.createElement("div");
    bar.className = "bar";
    bar.innerHTML = '<button class="b2" id="bedit">' + IC.pen + 'Modifier</button><button class="b1" id="bnew">' + IC.plus + "Nouvel exercice</button>";
    D.body.appendChild(bar);
    D.body.className += " hasbar";
  }
  if (A && A.saveRecent && w.MS_CTX && w.MS_CTX.q) { call(function () { A.saveRecent(w.MS_CTX.q); }); }
  if (N && N.solved) { call(function () { N.solved(); }); }
  w.MSUI = { plain: plain, shareText: shareText };
})(window);