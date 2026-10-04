/* MathSolver - panneau plein écran qui glisse depuis la gauche (menu) et icônes du menu */
(function (w) {
  "use strict";
  var D = document, ov = null, fn = null, shut = 0, tm = 0;
  if (w.MSDR) { return; }

  function gone() {
    clearTimeout(tm);
    if (ov && ov.parentNode) { ov.parentNode.removeChild(ov); }
    ov = null; fn = null; shut = 0;
  }

  // affiche html dans le panneau (le crée et le fait glisser s'il n'existe pas) ; f(action) reçoit les clics sur [data-o]
  function put(html, f) {
    var nw = !ov;
    if (nw) {
      ov = D.createElement("div");
      ov.className = "mnd";
      ov.setAttribute("role", "dialog");
      ov.setAttribute("aria-modal", "true");
      ov.addEventListener("click", function (ev) {
        var b = ev.target.closest ? ev.target.closest("[data-o]") : null;
        if (b && fn && !shut) { ev.stopPropagation(); fn(b.getAttribute("data-o")); }
      });
    }
    clearTimeout(tm);
    shut = 0;
    fn = f;
    ov.innerHTML = html;
    ov.scrollTop = 0;
    if (nw) { D.body.appendChild(ov); void ov.offsetWidth; }
    ov.className = "mnd mdo";
  }

  // referme : le panneau repart vers la gauche, puis disparaît ; son bouton retour (id mnb) cède la place à celui de la page dessous
  function hide() {
    var b;
    if (!ov || shut) { return; }
    shut = 1;
    ov.className = "mnd";
    b = ov.querySelector("#mnb");
    if (b) { b.removeAttribute("id"); }
    tm = setTimeout(gone, 350);
  }

  // icônes du menu (tracés 24x24)
  var P = function (d) { return '<path d="' + d + '"/>'; };
  w.MSMI = {
    home: P("M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6"),
    fx: P("M18 5H7l6 7-6 7h11"),
    clk: '<circle cx="12" cy="12" r="9"/>' + P("M12 7v5l3 2"),
    bm: P("M6 3h12v18l-6-4-6 4z"),
    usr: '<circle cx="12" cy="8" r="4"/>' + P("M4 21c0-4 4-6 8-6s8 2 8 6"),
    inn: P("M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"),
    bulb: P("M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"),
    help: '<circle cx="12" cy="12" r="9"/>' + P("M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17h.01"),
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/>' + P("M3 7l9 6 9-6"),
    set: P("M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1") + '<circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>' + P("M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"),
    star: P("M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"),
    info: '<circle cx="12" cy="12" r="9"/>' + P("M12 16v-5M12 8h.01"),
    shield: P("M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"),
    doc: P("M7 3h8l4 4v14H7zM15 3v4h4M10 13h6M10 17h6")
  };

  w.MSDR = { put: put, hide: hide, is: function () { return !!ov && !shut; } };
})(window);