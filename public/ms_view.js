/* MathSolver - affichage 2/3 : cartes, messages d'erreur, exercice glissable (nécessite ms_parse.js) */
(function (w) {
  "use strict";
  var esc = w.MSP.esc;

  var CSS =
    ".err{margin:16px 12px;padding:22px 18px 18px;background:#fff;border:1px solid #e2e7f1;border-radius:18px;text-align:center;box-shadow:0 1px 2px rgba(16,24,40,.05),0 6px 18px rgba(16,24,40,.06)}" +
    ".err .ic{width:48px;height:48px;line-height:48px;margin:0 auto 12px;border-radius:50%;background:#fff3e0;color:#c2410c;font-size:26px;font-weight:bold}" +
    ".err .et{font-size:18px;font-weight:bold;color:#111827;margin:0 0 6px}" +
    ".err .em{margin:0;font-size:15px;line-height:1.5;color:#4b5563}" +
    ".err .eh{margin:14px 0 0;padding:10px 12px;border-radius:12px;background:#eef2fa;color:#334155;font-size:14px;line-height:1.45}" +
    ".err .ed{margin:12px 0 0;font-size:12px;color:#9aa3b5}" +
    ".exo{padding:12px 16px;background:#fff}" +
    ".elab{margin:0 0 6px;font-size:12px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;color:#5b6784}" +
    ".etx{font-size:16px;line-height:1.6;color:#111827;white-space:pre-wrap;overflow-wrap:break-word}" +
    ".pview.txt{height:auto;max-height:32vh}" +
    ".pview .exo+img{border-top:1px solid #e2e7f1}";

  function style() {
    var st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  // Carte d'erreur : titre, explication, conseil, code discret
  function err(t, m, h, d) {
    var s = '<div class="err"><div class="ic">!</div><div class="et">' + esc(t) + '</div><p class="em">' + esc(m) + "</p>";
    if (h) { s += '<div class="eh">' + esc(h) + "</div>"; }
    if (d) { s += '<div class="ed">Code : ' + esc(d) + "</div>"; }
    return s + "</div>";
  }

  // Solution : cartes numérotées + réponse finale en vert
  function cards(P) {
    var r = P.raws, s = "", i;
    if (!P.titles.length) { return '<div class="card"><div class="body">' + r[0] + "</div></div>"; }
    if (r[0]) { s += '<div class="intro">' + r[0] + "</div>"; }
    for (i = 0; i < P.titles.length; i++) {
      var ttl = esc(P.titles[i].replace(/^\d+\s*[:.)-]\s*/, "").replace(/\*\*/g, ""));
      s += '<div class="card"><div class="head"><span class="num">' + (i + 1) + '</span><span class="ttl">' + ttl + '</span></div><div class="body">' + r[i + 1] + "</div></div>";
    }
    if (P.hasAnswer) {
      s += '<div class="answer"><span class="chk">&#10003;</span><div><div class="alabel">R&eacute;ponse</div><div>' + r[r.length - 1] + "</div></div></div>";
    }
    return s;
  }

  // Exercice (texte tapé et/ou photo) : fixe en haut, avec une poignée pour agrandir ou réduire
  function exo(q, img) {
    q = String(q || "").trim();
    if (!q && !img) { return ""; }
    var s = '<div class="photo"><div class="pview' + (img ? "" : " txt") + '" id="pv">';
    if (q) { s += '<div class="exo"><div class="elab">Exercice</div><div class="etx">' + esc(q) + "</div></div>"; }
    if (img) { s += '<img src="data:image/jpeg;base64,' + img + '">'; }
    return s + '</div><div class="grip" id="grip"><span class="pill"></span><span class="gtxt">Glisse pour agrandir ou r&eacute;duire ' + (q ? "l'exercice" : "la photo") + "</span></div></div>";
  }

  function grip() {
    var pv = document.getElementById("pv"), g = document.getElementById("grip");
    if (!pv || !g) { return; }
    var txt = pv.className.indexOf("txt") >= 0, sy = 0, sh = 0, mv = false;
    function top() {
      var m = Math.round(window.innerHeight * 0.8);
      return txt ? Math.max(60, Math.min(m, pv.scrollHeight)) : m;
    }
    function setH(h) {
      pv.style.maxHeight = "none";
      pv.style.height = h + "px";
    }
    g.addEventListener("touchstart", function (e) { mv = false; sy = e.touches[0].clientY; sh = pv.offsetHeight; }, { passive: true });
    g.addEventListener("touchmove", function (e) {
      mv = true;
      e.preventDefault();
      setH(Math.max(60, Math.min(sh + (e.touches[0].clientY - sy), top())));
    }, { passive: false });
    g.addEventListener("touchend", function () {
      if (mv) { return; }
      if (txt) {
        if (pv.style.height) { pv.style.height = ""; pv.style.maxHeight = ""; }
        else if (pv.scrollHeight > pv.clientHeight + 2) { setH(Math.min(Math.round(window.innerHeight * 0.65), pv.scrollHeight)); }
      } else {
        pv.style.height = pv.offsetHeight > window.innerHeight * 0.5 ? "32vh" : "65vh";
      }
    });
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
      var up = u.parentNode, host = k.closest("p");
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