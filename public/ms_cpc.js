/* MathSolver - Copie : petite calculatrice scientifique flottante, à déplacer avec le doigt, qui insère son résultat dans la ligne */
(function (w) {
  "use strict";
  if (w.MSCPC) { return; }
  var D = document, el = null, ex = "", res = "", deg = true, pos = null, put = null;
  var K = [["sin", "sin("], ["cos", "cos("], ["tan", "tan("], ["√", "√("], ["x²", "²"],
    ["sin⁻¹", "asin("], ["cos⁻¹", "acos("], ["tan⁻¹", "atan("], ["ln", "ln("], ["xⁿ", "^"],
    ["7", "7"], ["8", "8"], ["9", "9"], ["÷", "÷"], ["(", "("],
    ["4", "4"], ["5", "5"], ["6", "6"], ["×", "×"], [")", ")"],
    ["1", "1"], ["2", "2"], ["3", "3"], ["−", "−"], ["π", "π"],
    ["0", "0"], [",", ","], ["C", "C"], ["+", "+"], ["=", "="]];
  function show() {
    if (!el) { return; }
    el.querySelector(".xce").textContent = ex || " ";
    el.querySelector(".xcr").textContent = res || "0";
    el.querySelector(".xcd").textContent = deg ? "DEG" : "RAD";
  }
  function place(x, y) {
    x = Math.max(4, Math.min(w.innerWidth - el.offsetWidth - 4, x));
    y = Math.max(4, Math.min(w.innerHeight - el.offsetHeight - 4, y));
    el.style.left = x + "px"; el.style.top = y + "px"; pos = [x, y];
  }
  function key(k) {
    if (k === "C") { ex = ""; res = ""; }
    else if (k === "BS") { ex = ex.replace(/(asin\(|acos\(|atan\(|sin\(|cos\(|tan\(|ln\(|√\(|.)$/, ""); }
    else if (k === "=") { try { res = w.MSCK.fmt(w.MSCK.compile(ex, deg)({})); } catch (x) { res = "Calcul incomplet"; } }
    else if (k === "DEG") { deg = !deg; }
    else if (k === "INS") {
      if (!res || !/^[−0-9]/.test(res) || res === "Erreur") { try { w.MSAC.toast("Appuie d'abord sur = pour obtenir un résultat."); } catch (x) { } return; }
      if (put) { put(res); }
    }
    else { ex += k; }
    show();
  }
  function open(insert) {
    put = insert;
    if (el) { close(); return; }
    el = D.createElement("div");
    el.className = "xcal";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Calculatrice");
    el.innerHTML = '<div class="xch"><span>Calculatrice</span><button class="xcd" data-c="DEG" aria-label="Degrés ou radians"></button><button class="xcx" data-c="X" aria-label="Fermer">×</button></div><div class="xcs"><div class="xce"></div><div class="xcr"></div></div><div class="xcg">' +
      K.map(function (k) { return '<button data-c="' + k[1] + '"' + (k[1] === "=" ? ' class="eq"' : /^[0-9,]$/.test(k[0]) ? ' class="n"' : "") + ">" + k[0] + "</button>"; }).join("") +
      '<button data-c="BS" aria-label="Effacer">⌫</button><button class="ins" data-c="INS">Insérer dans ma ligne</button></div>';
    D.body.appendChild(el);
    var p = pos || [w.innerWidth - el.offsetWidth - 10, Math.round(w.innerHeight * 0.12)], hd = el.querySelector(".xch"), s = null;
    place(p[0], p[1]);
    hd.addEventListener("pointerdown", function (ev) { if (ev.target.closest("[data-c]")) { return; } s = [ev.clientX, ev.clientY, el.offsetLeft, el.offsetTop]; hd.setPointerCapture(ev.pointerId); });
    hd.addEventListener("pointermove", function (ev) { if (s && hd.hasPointerCapture(ev.pointerId)) { place(s[2] + ev.clientX - s[0], s[3] + ev.clientY - s[1]); } });
    hd.addEventListener("pointerup", function () { s = null; });
    el.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-c]");
      if (!b) { return; }
      if (b.getAttribute("data-c") === "X") { close(); return; }
      key(b.getAttribute("data-c"));
    });
    show();
  }
  function close() { if (el) { el.remove(); el = null; } }
  w.MSCPC = { open: open, close: close, on: function () { return !!el; } };
})(window);
