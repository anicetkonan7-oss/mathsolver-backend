/* MathSolver - Copie : clavier mathématique à onglets (chiffres, lettres, fonctions, ensembles, lettres grecques) */
(function (w) {
  "use strict";
  if (w.MSMK) { return; }
  // [affiché, inséré] ; § = place du curseur après l'insertion
  var T = [
    ["123", [["7", "7"], ["8", "8"], ["9", "9"], ["÷", "÷"], ["(", "("], [")", ")"],
      ["4", "4"], ["5", "5"], ["6", "6"], ["×", "×"], ["x²", "²"], ["xⁿ", "^"],
      ["1", "1"], ["2", "2"], ["3", "3"], ["−", "−"], ["√", "√(§)"], ["π", "π"],
      ["0", "0"], [",", ","], ["=", " = "], ["+", "+"], ["x", "x"], ["a/b", "/"]]],
    ["x y", [["x", "x"], ["y", "y"], ["z", "z"], ["t", "t"], ["n", "n"], ["i", "i"],
      ["a", "a"], ["b", "b"], ["c", "c"], ["k", "k"], ["f", "f"], ["g", "g"],
      ["′", "′"], ["(", "("], [")", ")"], ["[", "["], ["]", "]"], [";", " ; "],
      ["{", "{"], ["}", "}"], ["|", "|"], ["e", "e"], ["uₙ", "u_n"], ["ou", " ou "]]],
    ["f(x)", [["sin", "sin(§)"], ["cos", "cos(§)"], ["tan", "tan(§)"], ["ln", "ln(§)"], ["eˣ", "e^(§)"], ["log", "log(§)"],
      ["√", "√(§)"], ["|x|", "|§|"], ["x³", "³"], ["xⁿ", "^"], ["x⁻¹", "^(−1)"], ["n!", "!"],
      ["lim", "lim "], ["→", " → "], ["∞", "∞"], ["∫", "∫"], ["dx", " dx"], ["∑", "∑"],
      ["f(x)", "f(x)"], ["f′(x)", "f′(x)"], ["Δ", "Δ"], ["(", "("], [")", ")"], ["=", " = "]]],
    ["≤ ∈", [["<", " < "], [">", " > "], ["≤", " ≤ "], ["≥", " ≥ "], ["≠", " ≠ "], ["≈", " ≈ "],
      ["⇔", " ⇔ "], ["⇒", " ⇒ "], ["∈", " ∈ "], ["∉", " ∉ "], ["⊂", " ⊂ "], ["∅", "∅"],
      ["ℝ", "ℝ"], ["ℕ", "ℕ"], ["ℤ", "ℤ"], ["ℚ", "ℚ"], ["ℂ", "ℂ"], ["±", "±"],
      ["∪", " ∪ "], ["∩", " ∩ "], ["≡", " ≡ "], ["[", "["], ["]", "]"], ["°", "°"]]],
    ["α β", [["α", "α"], ["β", "β"], ["γ", "γ"], ["δ", "δ"], ["θ", "θ"], ["λ", "λ"],
      ["μ", "μ"], ["σ", "σ"], ["ω", "ω"], ["φ", "φ"], ["Δ", "Δ"], ["Ω", "Ω"],
      ["ε", "ε"], ["∀", "∀"], ["∃", "∃"], ["⊥", " ⊥ "], ["∥", " ∥ "], ["%", "%"],
      ["→", "→"], ["AB", "AB"], ["∠", "∠"], ["′", "′"], ["(", "("], [")", ")"]]]
  ];
  var tab = 0;
  function e(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function html() {
    var s = '<div class="xkt" role="tablist">';
    T.forEach(function (t, i) { s += '<button class="xkb' + (i === tab ? " on" : "") + '" data-mk="tab" data-v="' + i + '" role="tab" aria-selected="' + (i === tab) + '">' + e(t[0]) + "</button>"; });
    s += '</div><div class="xkg">';
    T[tab][1].forEach(function (k) { s += '<button class="xk' + (/^[0-9,]$/.test(k[0]) ? " d" : "") + '" data-mk="k" data-v="' + e(k[1]) + '">' + e(k[0]) + "</button>"; });
    return s + '</div><div class="xkg b"><button class="xk f" data-mk="L" aria-label="Curseur à gauche">←</button><button class="xk f" data-mk="R" aria-label="Curseur à droite">→</button><button class="xk f" data-mk="k" data-v=" " aria-label="Espace">␣</button><button class="xk f" data-mk="BS" aria-label="Effacer">⌫</button><button class="xk nl" data-mk="NL">↵ À la ligne</button></div>';
  }
  // el : conteneur ; act(type, valeur) avec type = "ins" | "BS" | "L" | "R" | "NL"
  function mount(el, act) {
    el.innerHTML = html();
    el.onclick = function (ev) {
      var b = ev.target.closest ? ev.target.closest("[data-mk]") : null, a;
      if (!b) { return; }
      a = b.getAttribute("data-mk");
      if (a === "tab") { tab = +b.getAttribute("data-v"); el.innerHTML = html(); return; }
      if (a === "k") { act("ins", b.getAttribute("data-v")); return; }
      act(a);
    };
  }
  w.MSMK = { mount: mount };
})(window);
