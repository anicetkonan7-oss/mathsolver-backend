/* MathSolver - formules 5/6 : dessin d'une formule en image PNG (noir sur fond transparent) */
(function (E) {
  "use strict";
  function css() {
    var o = "", i, j, r;
    for (i = 0; i < document.styleSheets.length; i++) {
      try { r = document.styleSheets[i].cssRules; for (j = 0; j < r.length; j++) { o += r[j].cssText; } } catch (e) { }
    }
    return o;
  }
  E.snap = function (root, o, cb) {
    var box = document.getElementById("snap"), c0 = E.cur, r = o.r || 2, w, h, a, c, svg, img, st;
    E.cur = { s: null, i: -1 };
    st = "font-size:" + o.fs + "px;max-width:" + o.mw + "px";
    box.innerHTML = "";
    box.appendChild(document.createElement("div")).className = "sn";
    box.firstChild.setAttribute("style", st);
    box.firstChild.appendChild(E.rs(root, true));
    E.cur = c0;
    w = Math.ceil(box.firstChild.getBoundingClientRect().width);
    h = Math.ceil(box.firstChild.getBoundingClientRect().height);
    c = box.querySelector(".top > .ln > .wd > .c, .top > .ln > .c");
    a = c ? (c.getBoundingClientRect().top + c.getBoundingClientRect().bottom) / 2 - box.firstChild.getBoundingClientRect().top : h / 2;
    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><foreignObject width="' + w + '" height="' + h + '"><style>' + css() + '</style><div xmlns="http://www.w3.org/1999/xhtml" class="sn" style="' + st + ';width:' + w + 'px">' + new XMLSerializer().serializeToString(box.firstChild.firstChild) + '</div></foreignObject></svg>';
    img = new Image();
    img.onload = function () {
      var cv = document.createElement("canvas");
      cv.width = Math.round(w * r);
      cv.height = Math.round(h * r);
      cv.getContext("2d").scale(r, r);
      cv.getContext("2d").drawImage(img, 0, 0, w, h);
      try { cb({ b: cv.toDataURL("image/png").split(",")[1], a: a * r, w: cv.width, h: cv.height }); } catch (e) { cb(null); }
    };
    img.onerror = function () { cb(null); };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  };
})(window.ED);