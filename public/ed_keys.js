/* MathSolver - éditeur de formules 3/4 : claviers 123, f(x), symboles et touche abc (clavier du téléphone) */
(function (E) {
  "use strict";
  var PB = "<i class=pb></i>", PS = "<i class='pb s'></i>", cur = null, rt = 0, rp = 0;
  function C(v, lb, cl) { return [lb || v, () => E.put(v), cl || "", v]; }
  function F(n) { return [n, () => E.fn(n), "fn", n]; }
  function X(id, lb, fn, cl) { return [lb, fn, cl === undefined ? "op" : cl, id]; }
  function G(id, lb, ch) { return X(id, lb, () => { E.put(ch); E.box("grp", 1); }, "fn"); }
  function Z(v) { return [v, () => E.put(v), "op it", v]; }
  var T = [
    { n: "123", c: "repeat(4,1fr) .3fr repeat(5,1fr)", r: [
      [X("sq", PB + "<sup>2</sup>", () => E.sup("2")), X("pw", PB + "<sup>" + PS + "</sup>", () => E.sup()), X("inv", PB + "<sup>−1</sup>", () => E.sup("−1")), X("sqrt", "√<span class=rt>" + PB + "</span>", () => E.box("sqrt", 1)), 0, C("7", 0, "dg"), C("8", 0, "dg"), C("9", 0, "dg"), C("×", 0, "op"), C("÷", 0, "op")],
      [F("sin"), F("cos"), F("tan"), C("π", 0, "op it"), 0, C("4", 0, "dg"), C("5", 0, "dg"), C("6", 0, "dg"), C("+", 0, "op"), C("−", 0, "op")],
      [F("ln"), F("log"), X("frac", "<span class=fi>" + PS + "<u></u>" + PS + "</span>", () => E.frac()), X("abs", "|" + PS + "|", () => E.box("abs", 1)), 0, C("1", 0, "dg"), C("2", 0, "dg"), C("3", 0, "dg"), C("=", 0, "op"), X("(", "(", () => E.box("grp", 1))],
      [C("x", 0, "it"), C("y", 0, "it"), C("n", 0, "it"), C("e", 0, "it"), 0, C("0", 0, "dg"), C(".", 0, "dg"), C(",", 0, "dg"), C(";", 0, "op"), C("%", 0, "op")]
    ] },
    { n: "f(x)", c: "repeat(6,1fr)", r: [
      [F("sin"), F("cos"), F("tan"), F("ln"), F("log"), F("exp")],
      [X("limp", "lim<sub>+∞</sub>", () => { E.fl("lim"); E.sub("x→+∞"); E.right(); }, "fn"), X("limm", "lim<sub>−∞</sub>", () => { E.fl("lim"); E.sub("x→−∞"); E.right(); }, "fn"), X("sub", PB + "<sub>" + PS + "</sub>", () => E.sub()), X("ex", "e<sup>" + PS + "</sup>", () => { E.put("e"); E.sup(); }), X("10x", "10<sup>" + PS + "</sup>", () => { E.put("1"); E.put("0"); E.sup(); }), X("root", "<sup>" + PS + "</sup>√", () => E.box("root", 2))],
      [X("lim", "lim", () => { E.fl("lim"); E.sub("x→"); }, "fn"), X("sum", "∑", () => E.big("∑")), C("∫", 0, "op"), X("intab", "∫<span class=st><span>b</span><span>a</span></span>", () => E.big("∫")), X("fact", "n!", () => { E.put("n"); E.put("!"); }, "it"), C("'", "′", "op")],
      [G("f(", "f( )", "f"), G("g(", "g( )", "g"), X("un", "u<sub>n</sub>", () => { E.put("u"); E.sub(); }, "it"), X("xn", "x<sub>n</sub>", () => { E.put("x"); E.sub(); }, "it"), G("C(", "C( )", "C"), G("A(", "A( )", "A")]
    ] },
    { n: "αβ", c: "repeat(7,1fr)", r: [
      ["π", "∞", "θ", "α", "β", "λ", "Δ"].map(Z),
      ["≤", "≥", "≠", "<", ">", "±", "°"].map(function (v) { return C(v, 0, "op"); }),
      ["∈", "∉", "∪", "∩", "∅", "[", "]"].map(function (v) { return C(v, 0, "op"); }),
      ["ℝ", "ℕ", "ℤ", "ℚ", "ℂ", "⇒", "⇔"].map(function (v) { return C(v, 0, "op"); })
    ] }
  ];
  var BAR = [X("left", "←", () => E.left(), "ct rp"), X("right", "→", () => E.right(), "ct rp"), X("bs", "⌫", () => E.back(), "ct rp"), X("sp", "espace", () => E.put(" "), "ct sp"), X("nl", "↵", () => E.put("\n"), "ct"), X("ok", "Insérer", () => E.ok(), "pr")];
  function mk(s) {
    var k = document.createElement("div");
    k.className = "k " + s[2];
    k.innerHTML = s[0];
    k.setAttribute("data-k", s[3]);
    k.__f = s[1];
    return k;
  }
  E.show = function (i) {
    var t = document.querySelectorAll("#tabs div"), p = document.querySelectorAll(".pg"), j;
    for (j = 0; j < p.length; j++) { t[j].className = j === i ? "on" : ""; p[j].className = j === i ? "pg on" : "pg"; }
    E.tab = i;
  };
  function fire(k) {
    k.__f();
    E.render();
    try { if (window.MSEd) { window.MSEd.tick(); } } catch (e) { }
  }
  function stop() {
    clearTimeout(rt);
    clearInterval(rp);
    if (cur) { cur.className = cur.className.replace(" dn", ""); cur = null; }
  }
  E.buildKeys = function () {
    var tabs = document.getElementById("tabs"), kb = document.getElementById("kb"), bar = document.createElement("div"), d;
    T.forEach(function (t, i) {
      var d = document.createElement("div"), g = document.createElement("div");
      d.textContent = t.n;
      d.addEventListener("pointerdown", function (ev) { ev.preventDefault(); E.show(i); });
      tabs.appendChild(d);
      g.className = "pg";
      g.style.gridTemplateColumns = t.c;
      t.r.forEach(function (row) { row.forEach(function (s) { if (s) { g.appendChild(mk(s)); } else { g.appendChild(document.createElement("span")); } }); });
      kb.appendChild(g);
    });
    bar.className = "bar";
    BAR.forEach(function (s) { bar.appendChild(mk(s)); });
    kb.appendChild(bar);
    kb.addEventListener("pointerdown", function (ev) {
      var k = ev.target.closest ? ev.target.closest(".k") : null;
      if (!k) { return; }
      ev.preventDefault();
      stop();
      cur = k;
      k.className += " dn";
      fire(k);
      if (k.className.indexOf(" rp") > 0) { rt = setTimeout(function () { rp = setInterval(() => fire(k), 70); }, 380); }
    });
    ["pointerup", "pointercancel"].forEach(function (n) { document.addEventListener(n, stop); });
    d = document.createElement("div");
    d.className = "ph";
    d.textContent = "abc";
    d.addEventListener("pointerdown", function (ev) { ev.preventDefault(); E.phone(); });
    tabs.appendChild(d);
    E.show(0);
  };
})(window.ED);
