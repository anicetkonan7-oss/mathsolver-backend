/* MathSolver - affichage 2/4 : cartes repliables, réponse numérotée, exercice (nécessite ms_parse.js) */
(function (w) {
  "use strict";
  var esc = w.MSP.esc;

  function $(id) { return document.getElementById(id); }

  // Les styles sont dans solver.css (cette fonction reste pour compatibilité)
  function style() { }

  // Carte d'erreur : titre, explication, conseil, code discret
  function err(t, m, h, d) {
    var s = '<div class="err"><div class="ic">!</div><div class="et">' + esc(t) + '</div><p class="em">' + esc(m) + "</p>";
    if (h) { s += '<div class="eh">' + esc(h) + "</div>"; }
    if (d) { s += '<div class="ed">Code : ' + esc(d) + "</div>"; }
    return s + "</div>";
  }

  // Réponse finale : un résultat par ligne, numéroté (on garde le numéro donné par l'IA)
  function answer(h) {
    var rows = String(h).split("</p>"), li = "", k = 0, j, t, m, nb;
    for (j = 0; j < rows.length; j++) {
      t = rows[j].replace(/^<p[^>]*>/, "").replace(/<\/?b>/g, "").replace(/^•\s*/, "").trim();
      if (!t) { continue; }
      k++;
      m = t.match(/^(\d{1,2})\s*[.)]\s+/);
      nb = m ? m[1] : String(k);
      if (m) { t = t.slice(m[0].length); }
      li += '<li><span class="rn">' + nb + '</span><span class="rt">' + t + "</span></li>";
    }
    if (!k) { return ""; }
    return '<div class="answer" id="ans"><div class="ahead"><span class="chk">&#10003;</span><span class="alabel">R&eacute;ponse finale</span></div><ol class="res' + (k === 1 ? " one" : "") + '">' + li + '</ol><div class="acts" id="acts"></div></div>';
  }

  // Solution : étapes repliables (les premières ouvertes) puis réponse finale
  function cards(P) {
    var r = P.raws, s = "", n = P.titles.length, i, shut, ttl;
    if (!n) { return '<div class="card"><div class="body">' + r[0] + "</div></div>"; }
    if (r[0]) { s += '<div class="intro">' + r[0] + "</div>"; }
    if (n > 2) {
      s += '<div class="tb"><span>' + n + ' &eacute;tapes</span><span><button id="fold">Tout replier</button>' + (P.hasAnswer ? '<button id="goans">R&eacute;ponse &#8595;</button>' : "") + "</span></div>";
    }
    for (i = 0; i < n; i++) {
      ttl = esc(P.titles[i].replace(/^\d+\s*[:.)-]\s*/, "").replace(/\*\*/g, ""));
      shut = n > 3 && i > 1;
      s += '<div class="card' + (shut ? " shut" : "") + '"><button class="head" aria-expanded="' + (shut ? "false" : "true") + '"><span class="num">' + (i + 1) + '</span><span class="ttl">' + ttl + '</span><span class="chev"></span></button><div class="body">' + r[i + 1] + "</div></div>";
    }
    if (P.hasAnswer) { s += answer(r[r.length - 1]); }
    return s;
  }

  // Exercice (texte et/ou photo) : fixe en haut, poignée pour agrandir ou réduire ; le texte défile à l'intérieur
  function exo(q, img) {
    q = String(q || "").trim();
    if (!q && !img) { return ""; }
    var s = '<div class="photo"><div class="pview' + (img ? "" : " txt") + '" id="pv">';
    if (q) { s += '<div class="exo"><div class="elab">Exercice</div><div class="etx">' + esc(q) + "</div></div>"; }
    if (img) { s += '<img src="data:image/jpeg;base64,' + img + '">'; }
    return s + '</div><div class="grip" id="grip"><span class="pill"></span>' + (img ? "" : '<span class="gtxt">Glisse pour agrandir ou r&eacute;duire</span>') + "</div></div>";
  }

  function grip() {
    var pv = $("pv"), g = $("grip");
    if (!pv || !g) { return; }
    var txt = pv.className.indexOf("txt") >= 0, sy = 0, sh = 0, mv = false;
    function top() {
      var m = Math.round(window.innerHeight * 0.8);
      return txt ? Math.max(60, Math.min(m, pv.scrollHeight)) : m;
    }
    function setH(h) { pv.style.maxHeight = "none"; pv.style.height = h + "px"; }
    function chk() {
      if (txt && !pv.style.height) { g.style.display = pv.scrollHeight > pv.clientHeight + 6 ? "" : "none"; }
    }
    g.addEventListener("touchstart", function (e) { mv = false; sy = e.touches[0].clientY; sh = pv.offsetHeight; }, { passive: true });
    g.addEventListener("touchmove", function (e) {
      mv = true;
      e.preventDefault();
      setH(Math.max(60, Math.min(sh + (e.touches[0].clientY - sy), top())));
    }, { passive: false });
    g.addEventListener("touchend", function () {
      if (mv) { return; }
      if (!txt) { pv.style.height = pv.offsetHeight > window.innerHeight * 0.5 ? "32vh" : "65vh"; }
      else if (pv.style.height) { pv.style.height = ""; pv.style.maxHeight = ""; chk(); }
      else { setH(Math.min(Math.round(window.innerHeight * 0.65), pv.scrollHeight)); }
    });
    if (txt) {
      chk();
      if (window.ResizeObserver && pv.firstChild) { new window.ResizeObserver(chk).observe(pv.firstChild); }
      else { setTimeout(chk, 400); setTimeout(chk, 1500); }
    }
  }

  // Les formules larges défilent, la ponctuation reste collée à la formule
  function fit() {
    var old = document.querySelectorAll(".hs,.nb"), i;
    for (i = 0; i < old.length; i++) {
      var w0 = old[i], p0 = w0.parentNode;
      while (w0.firstChild) { p0.insertBefore(w0.firstChild, w0); }
      p0.removeChild(w0);
    }
    if (document.body.clientWidth < 120) { return; }
    var ks = document.querySelectorAll(".body .katex,.answer .katex,.intro .katex");
    for (i = 0; i < ks.length; i++) {
      var k = ks[i], pn = k.parentNode;
      if (pn.className.indexOf("katex-display") >= 0) { continue; }
      var u = (pn.nodeName === "SPAN" && pn.className === "" && pn.childNodes.length === 1) ? pn : k;
      var up = u.parentNode, host = k.closest("p,.rt");
      if (!host) { continue; }
      var wide = k.getBoundingClientRect().width > host.clientWidth + 1;
      var n = u.nextSibling, m = null;
      if (n && n.nodeType === 3) { m = n.nodeValue.match(/^[.,;:!?)]+/); }
      if (!wide && !m) { continue; }
      var wr = document.createElement("span");
      wr.className = wide ? "hs" : "nb";
      up.insertBefore(wr, u);
      wr.appendChild(u);
      if (m) {
        wr.appendChild(document.createTextNode(m[0]));
        n.nodeValue = n.nodeValue.slice(m[0].length);
      }
    }
  }

  w.msFit = fit;
  w.MSV = { style: style, err: err, cards: cards, exo: exo, grip: grip, fit: fit };
})(window);