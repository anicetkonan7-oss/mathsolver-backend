/* MathSolver - narrateur 1/2 : transforme les formules LaTeX en phrases françaises à lire */
(function (w) {
  "use strict";
  var W = {
    infty: "l'infini", geq: "supérieur ou égal à", ge: "supérieur ou égal à", leq: "inférieur ou égal à", le: "inférieur ou égal à",
    neq: "différent de", approx: "environ égal à", "in": "appartient à", notin: "n'appartient pas à", cup: "union", cap: "inter",
    subset: "inclus dans", emptyset: "ensemble vide", to: "tend vers", rightarrow: "tend vers", Rightarrow: "donc", implies: "donc",
    Leftrightarrow: "équivaut à", iff: "équivaut à", times: "fois", cdot: "fois", div: "divisé par", pm: "plus ou moins", Delta: "delta",
    ln: "logarithme népérien de", log: "logarithme de", exp: "exponentielle de", sin: "sinus de", cos: "cosinus de", tan: "tangente de",
    lim: "limite de", forall: "pour tout", exists: "il existe", dots: "et ainsi de suite", ldots: "et ainsi de suite", cdots: "et ainsi de suite",
    mid: "divise", "int": "intégrale de", sum: "somme de", prod: "produit de", circ: "rond"
  };
  var U = {
    "≥": " supérieur ou égal à ", "≤": " inférieur ou égal à ", "≠": " différent de ", "≈": " environ égal à ", "∞": " l'infini ", "→": " tend vers ",
    "⇒": " donc ", "⇔": " équivaut à ", "∈": " appartient à ", "∉": " n'appartient pas à ", "∪": " union ", "∩": " inter ", "∅": " ensemble vide ",
    "×": " fois ", "÷": " divisé par ", "±": " plus ou moins ", "√": " racine carrée de ", "π": " pi ", "Δ": " delta ", "²": " au carré ",
    "³": " au cube ", "°": " degrés ", "%": " pour cent ", "=": " égale ", "+": " plus ", "ℝ": " grand R ", "ℕ": " grand N ", "ℤ": " grand Z ", "ℚ": " grand Q ", "ℂ": " grand C ", "−": " moins "
  };
  function g(x) { return /^\s*[-+\w.]+\s*$/.test(x) ? " " + x + " " : " , " + x + " , "; }
  function st(x) { return x.replace(/^\{|\}$/g, ""); }

  // Formule LaTeX -> phrase française
  function say(s) {
    var t = " " + s + " ", i;
    t = t.replace(/\{,\}/g, ",").replace(/\b([fghFGHP])'\s*\(/g, "$1 prime de ( ").replace(/([A-Za-z0-9])'(?![A-Za-z])/g, "$1 prime ").replace(/\\(?:left|right|bigg?|Bigg?|displaystyle|textstyle|limits)(?![A-Za-z])/g, " ")
      .replace(/\\(?:text|textrm|mathrm|mathbf|mathit|operatorname)\s*\{([^{}]*)\}/g, " $1 ")
      .replace(/\\begin\s*\{[^{}]*\}(\s*\{[^{}]*\})?|\\end\s*\{[^{}]*\}/g, " ").replace(/\\\\/g, " . ").replace(/&/g, " , ")
      .replace(/([\[\]])\s*([^;\[\]]+?)\s*;\s*([^;\[\]]+?)\s*([\[\]])/g, function (m, l, a, b, r) {
        return " intervalle de " + a + (l === "[" ? " inclus" : " exclu") + " à " + b + (r === "]" ? " inclus" : " exclu") + " ";
      });
    for (i = 0; i < 6; i++) {
      t = t.replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, function (m, a, b) { return g(a) + "sur" + g(b); })
        .replace(/\\sqrt\s*\[(\d)\]\s*\{([^{}]*)\}/g, function (m, n, x) { return " racine " + (n === "3" ? "cubique" : n + " ième") + " de" + g(x); })
        .replace(/\\sqrt\s*\{([^{}]*)\}/g, function (m, x) { return " racine carrée de" + g(x); })
        .replace(/\\sqrt\s*([\w.])/g, " racine carrée de $1 ")
        .replace(/\\binom\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, " $2 parmi $1 ")
        .replace(/\\(?:vec|overrightarrow)\s*\{([^{}]*)\}/g, " vecteur $1 ")
        .replace(/\\(?:widehat|hat)\s*\{([^{}]*)\}/g, " angle $1 ")
        .replace(/\\(?:overline|bar)\s*\{([^{}]*)\}/g, " $1 barre ")
        .replace(/\\mathbb\s*\{([A-Z])\}/g, " grand $1 ");
    }
    t = t.replace(/\\int\s*_\s*(\{[^{}]*\}|[-\w.\\]+)\s*\^\s*(\{[^{}]*\}|[-\w.\\]+)/g, function (m, a, b) { return " intégrale de " + st(a) + " à " + st(b) + " de "; })
      .replace(/\]\s*_\s*(\{[^{}]*\}|[-\w.\\]+)\s*\^\s*(\{[^{}]*\}|[-\w.\\]+)/g, function (m, a, b) { return " , évalué entre " + st(a) + " et " + st(b) + " "; })
      .replace(/\\lim\s*_\s*\{([^{}]*)\}/g, " limite quand $1 de ")
      .replace(/\\sum\s*_\s*\{([^{}]*)\}\s*\^\s*(\{[^{}]*\}|[-\w.\\]+)/g, function (m, a, b) { return " somme pour " + a + " jusqu'à " + st(b) + " de "; })
      .replace(/\(([^()]*)\)\s*\^/g, " , $1 , ^").replace(/\(([^()]*)\)\s*\^/g, " , $1 , ^")
      .replace(/\^\s*(?:\{\s*2\s*\}|2(?!\d))/g, " au carré ").replace(/\^\s*(?:\{\s*3\s*\}|3(?!\d))/g, " au cube ")
      .replace(/\^\s*\{?\s*\\circ\s*\}?/g, " degrés ")
      .replace(/\^\s*\{([^{}]*)\}/g, function (m, x) { return " puissance" + g(x); }).replace(/\^\s*(\\?\w)/g, " puissance $1 ")
      .replace(/_\s*\{([^{}]*)\}/g, function (m, x) { return " indice" + g(x); }).replace(/_\s*(\\?\w)/g, " indice $1 ")
      .replace(/\\([A-Za-z]+)/g, function (m, n) { return " " + (W.hasOwnProperty(n) ? W[n] : n) + " "; })
      .replace(/\|\s*([^|]*?)\s*\|/g, " valeur absolue de , $1 , ").replace(/\\[{}]/g, " , ").replace(/[{}]/g, " ")
      .replace(/\bd([xtu])\b/g, " d $1 ").replace(/(\w)!/g, "$1 factorielle ").replace(/\b([fghFGHP])\s*\(/g, "$1 de ( ")
      .replace(/=/g, " égale ").replace(/</g, " inférieur à ").replace(/>/g, " supérieur à ").replace(/\+/g, " plus ").replace(/[–-]/g, " moins ")
      .replace(/[*]/g, " fois ").replace(/\//g, " sur ").replace(/%/g, " pour cent ").replace(/[;:]/g, " , ").replace(/[()\[\]]/g, " ");
    return t;
  }

  // Texte de la solution -> texte à lire
  function speak(raw) {
    var t = String(raw).replace(/\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$([^$\n]+?)\$/g, function (m, a, b, c, d) { return " " + say(a || b || c || d) + " "; });
    t = t.replace(/[`#$*]+/g, " ").replace(/[^\s\w.,;:!?'’()\-«»À-ÿŒœ]/g, function (c) { return U.hasOwnProperty(c) ? U[c] : " "; });
    return t.split("\n").map(function (l) {
      l = l.replace(/^\s*[•\-]\s+/, "").replace(/\s+/g, " ").replace(/\s+,/g, ",").replace(/,(\s*,)+/g, ",").replace(/,\s*\./g, ".").replace(/\s+([.!?])/g, "$1").trim();
      return l && !/[.!?:]$/.test(l) ? l + "." : l;
    }).filter(Boolean).join("\n");
  }

  function chunks(t) {
    var out = [], cur = "", L = speak(t).split("\n"), i;
    for (i = 0; i < L.length; i++) {
      if (cur && cur.length + L[i].length > 420) { out.push(cur); cur = ""; }
      cur += (cur ? " " : "") + L[i];
    }
    if (cur) { out.push(cur); }
    return out;
  }
  w.MSFR = { say: say, speak: speak, chunks: chunks };
})(window);