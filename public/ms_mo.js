/* MathSolver - couche du menu : voile + panneau qui glisse, posés au-dessus de l'écran (l'accueil dessous ne bouge pas) */
(function (w) {
  "use strict";
  var D = document, R = D.documentElement, N = w.MSMoN, sc = null, ov = null, shut = 0, lk = 0, tm = 0, lt = 0;
  if (w.MO) { return; }
  var st = D.createElement("style");
  // fond transparent ; liste sans effet élastique ; en bas, un fondu signale la suite au lieu de couper net
  st.textContent = "html,body{background:transparent!important;margin:0;overflow:hidden}.mnd{overscroll-behavior:none}" +
    ".mfd{position:sticky;bottom:0;height:40px;margin-top:-40px;pointer-events:none;background:linear-gradient(rgba(243,246,252,0),#f3f6fc 85%);opacity:0;transition:opacity .2s}" +
    ".mnd.mb .mfd{opacity:1}.dk .mfd{background:linear-gradient(rgba(14,20,36,0),#0e1424 85%)}";
  D.head.appendChild(st);

  // une action qui quitte le menu bloque les autres touchers (pas de double ouverture) ; si rien ne se passe, le menu se débloque seul
  function act(o) {
    if (lk || shut) { return; }
    if (/^(x|home|hi|sv|fm|pf|ac|tour)$/.test(o)) { lk = 1; clearTimeout(lt); lt = setTimeout(function () { lk = 0; }, 2500); }
    try { N.act(o); } catch (e) { }
  }
  // ombre sous l'en-tête quand la liste a défilé ; fondu en bas tant qu'il reste des lignes dessous
  function edge() {
    if (!ov) { return; }
    ov.classList.toggle("sc", ov.scrollTop > 2);
    ov.classList.toggle("mb", ov.scrollTop + ov.clientHeight < ov.scrollHeight - 2);
  }
  function build() {
    sc = D.createElement("div");
    sc.className = "mns";
    sc.addEventListener("click", function () { act("x"); });
    ov = D.createElement("div");
    ov.className = "mnd";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.addEventListener("click", function (ev) {
      var t = ev.target.closest ? ev.target : null, b, q;
      if (!t || shut || lk) { return; }
      q = t.closest("[data-fq]");
      if (q && q.parentNode) { q.parentNode.classList.toggle("on"); setTimeout(edge, 30); return; }
      b = t.closest("[data-o]");
      if (b) { ev.stopPropagation(); act(b.getAttribute("data-o")); }
    });
    ov.addEventListener("scroll", edge, { passive: true });
    D.body.appendChild(sc);
    D.body.appendChild(ov);
  }

  // affiche (ou remplace) le contenu du menu ; dk : mode sombre
  function put(html, dk) {
    var nw;
    clearTimeout(tm);
    R.className = dk ? "dk" : "";
    if (!sc) { build(); }
    nw = !ov.classList.contains("mdo") || shut;
    shut = 0;
    lk = 0;
    ov.innerHTML = html + '<div class="mfd"></div>';
    ov.scrollTop = 0;
    if (nw) {
      sc.classList.remove("mdo");
      ov.classList.remove("mdo");
      void ov.offsetWidth;
      sc.classList.add("mdo");
      ov.classList.add("mdo");
    }
    setTimeout(edge, 0);
  }

  // referme : le panneau repart vers la gauche, puis la couche disparaît
  function hide() {
    if (!sc || shut) { return; }
    shut = 1;
    sc.classList.remove("mdo");
    ov.classList.remove("mdo");
    tm = setTimeout(function () { try { N.gone(); } catch (e) { } }, 320);
  }

  w.MO = { put: put, hide: hide };
  try { N.ready(); } catch (e) { }
})(window);
