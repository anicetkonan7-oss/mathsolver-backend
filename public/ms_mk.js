/* MathSolver - Copie : clavier mathématique 2D (même disposition que le clavier général : 123, f(x), αβ, abc) */
(function (w) {
  "use strict";
  if (w.MSMK) { return; }
  var PB = '<i class="xmp"></i>', PS = '<i class="xmp s"></i>', tab = 0, H = null, cur = null, rt = 0, rp = 0;
  function E() { return w.ED; }
  // [affiché, action, classe]
  function C(v, lb, cl) { return [lb || v, function () { E().put(v); }, cl || ""]; }
  function F(n) { return [n, function () { E().fn(n); }, "fn"]; }
  function X(lb, fn, cl) { return [lb, fn, cl === undefined ? "op" : cl]; }
  function G(lb, ch) { return X(lb, function () { E().put(ch); E().box("grp", 1); }, "fn"); }
  function Z(v) { return [v, function () { E().put(v); }, "op it"]; }
  function O(v) { return C(v, 0, "op"); }
  // fraction : ce qui précède le curseur monte au numérateur ; une parenthèse seule y devient inutile
  function frac() {
    var f, a;
    E().frac();
    f = E().cur.s.p; a = f && f.f[0].n;
    if (a && a.length === 1 && a[0].t === "grp") { f.f[0].n = a[0].f[0].n; f.f[0].n.forEach(function (n) { n.q = f.f[0]; }); }
  }
  var T = [
    { n: "123", c: "repeat(4,1fr) .3fr repeat(5,1fr)", r: [
      [X(PB + "<sup>2</sup>", function () { E().sup("2"); }), X(PB + "<sup>" + PS + "</sup>", function () { E().sup(); }), X(PB + "<sup>−1</sup>", function () { E().sup("−1"); }), X('√<span class="xmr">' + PB + "</span>", function () { E().box("sqrt", 1); }), 0, C("7", 0, "dg"), C("8", 0, "dg"), C("9", 0, "dg"), O("×"), O("÷")],
      [F("sin"), F("cos"), F("tan"), Z("π"), 0, C("4", 0, "dg"), C("5", 0, "dg"), C("6", 0, "dg"), O("+"), O("−")],
      [F("ln"), F("log"), X('<span class="xmf">' + PS + "<u></u>" + PS + "</span>", frac), X("|" + PS + "|", function () { E().box("abs", 1); }), 0, C("1", 0, "dg"), C("2", 0, "dg"), C("3", 0, "dg"), O("="), X("(", function () { E().box("grp", 1); })],
      [C("x", 0, "it"), C("y", 0, "it"), C("n", 0, "it"), C("e", 0, "it"), 0, C("0", 0, "dg"), C(".", 0, "dg"), C(",", 0, "dg"), O(";"), O("%")]
    ] },
    { n: "f(x)", c: "repeat(6,1fr)", r: [
      [F("sin"), F("cos"), F("tan"), F("ln"), F("log"), F("exp")],
      [X("lim<sub>+∞</sub>", function () { E().fl("lim"); E().sub("x→+∞"); E().right(); }, "fn"), X("lim<sub>−∞</sub>", function () { E().fl("lim"); E().sub("x→−∞"); E().right(); }, "fn"), X(PB + "<sub>" + PS + "</sub>", function () { E().sub(); }), X("e<sup>" + PS + "</sup>", function () { E().put("e"); E().sup(); }), X("10<sup>" + PS + "</sup>", function () { E().put("1"); E().put("0"); E().sup(); }), X("<sup>" + PS + "</sup>√", function () { E().box("root", 2); })],
      [X("lim", function () { E().fl("lim"); E().sub("x→"); }, "fn"), X("∑", function () { E().big("∑"); }), O("∫"), X('∫<span class="xms"><span>b</span><span>a</span></span>', function () { E().big("∫"); }), X("n!", function () { E().put("n"); E().put("!"); }, "it"), C("'", "′", "op")],
      [G("f( )", "f"), G("g( )", "g"), X("u<sub>n</sub>", function () { E().put("u"); E().sub(); }, "it"), X("x<sub>n</sub>", function () { E().put("x"); E().sub(); }, "it"), G("C( )", "C"), G("A( )", "A")]
    ] },
    { n: "αβ", c: "repeat(8,1fr)", r: [
      ["π", "∞", "θ", "α", "β", "λ", "Δ"].map(Z).concat([Z("i")]),
      ["≤", "≥", "≠", "<", ">", "±", "°", "≈"].map(O),
      ["∈", "∉", "∪", "∩", "∅", "[", "]", "⊂"].map(O),
      ["ℝ", "ℕ", "ℤ", "ℚ", "ℂ", "⇒", "⇔", "→"].map(O)
    ] }
  ];
  // touches du bas : ← → ⌫ espace, À la ligne (gérées par la page de réponse)
  var BAR = [["←", "L", "ct rp"], ["→", "R", "ct rp"], ["⌫", "BS", "ct rp"], ["espace", "SP", "ct sp"], ["↵ À la ligne", "NL", "pr"]];
  var K = [];
  function html() {
    var s = '<div class="xmt" role="tablist">', g = T[tab];
    K = [];
    T.forEach(function (t, i) { s += '<button type="button" class="' + (i === tab ? "on" : "") + '" data-mt="' + i + '" role="tab" aria-selected="' + (i === tab) + '">' + t.n + "</button>"; });
    s += '<button type="button" class="ph" id="xabc" data-b="abc">abc</button></div><div class="xmg" style="grid-template-columns:' + g.c + '">';
    g.r.forEach(function (row) { row.forEach(function (k) { if (!k) { s += "<span></span>"; return; } K.push(k); s += '<button type="button" class="xmk ' + k[2] + '" data-mk="' + (K.length - 1) + '">' + k[0] + "</button>"; }); });
    s += '</div><div class="xmg xmb">';
    BAR.forEach(function (b) { s += '<button type="button" class="xmk ' + b[2] + '" data-mc="' + b[1] + '"' + (b[1] === "L" ? ' aria-label="Curseur à gauche"' : b[1] === "R" ? ' aria-label="Curseur à droite"' : b[1] === "BS" ? ' aria-label="Effacer"' : "") + ">" + b[0] + "</button>"; });
    return s + "</div>";
  }
  function fire(b) {
    var m = b.getAttribute("data-mk"), c = b.getAttribute("data-mc");
    if (m !== null) { K[+m][1](); H("ed"); } else if (c) { H(c); }
  }
  function stop() { clearTimeout(rt); clearInterval(rp); if (cur) { cur.classList.remove("dn"); cur = null; } }
  // el : conteneur ; h(code) avec code = "ed" (formule modifiée) | "L" | "R" | "BS" | "SP" | "NL"
  function mount(el, h) {
    H = h;
    el.innerHTML = html();
    el.onclick = null;
    el.onpointerdown = function (ev) {
      var t = ev.target.closest ? ev.target.closest("[data-mt],[data-mk],[data-mc]") : null;
      if (!t) { return; }
      ev.preventDefault();
      if (t.hasAttribute("data-mt")) { tab = +t.getAttribute("data-mt"); el.innerHTML = html(); return; }
      stop();
      cur = t; t.classList.add("dn");
      fire(t);
      if (/\brp\b/.test(t.className)) { rt = setTimeout(function () { rp = setInterval(function () { if (cur) { fire(cur); } }, 70); }, 380); }
    };
    // clavier physique ou lecteur d'écran : la touche Entrée envoie un clic sans pointeur
    el.onkeydown = function (ev) {
      var t = ev.target.closest ? ev.target.closest("[data-mt],[data-mk],[data-mc]") : null;
      if (!t || (ev.key !== "Enter" && ev.key !== " ")) { return; }
      ev.preventDefault();
      if (t.hasAttribute("data-mt")) { tab = +t.getAttribute("data-mt"); el.innerHTML = html(); } else { fire(t); }
    };
  }
  ["pointerup", "pointercancel"].forEach(function (n) { document.addEventListener(n, stop); });
  w.MSMK = { mount: mount };
})(window);
