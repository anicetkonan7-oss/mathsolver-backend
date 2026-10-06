/* MathSolver - Exercices Terminale, chapitre 4 : Fonction logarithme népérien */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 3, [
    { id: "lt3a", n: "Simplifier avec ln", d: 1, f: (H) => {
      const a = H.ri(2, 9), b = H.ri(2, 9), c = H.pick([2, 3, 4, 6].filter((v) => (a * b) % v === 0 && a * b / v > 1)) || 1, k = a * b / c;
      if (c === 1) { return null; }
      return { t: L`Écris sous la forme $\ln k$ : $A = \ln ${a} + \ln ${b} - \ln ${c}$.`, a: { k: "num", v: M.log(k) }, r: "A = ln " + k,
        h: [L`$\ln a + \ln b = \ln(ab)$ et $\ln a - \ln b = \ln\dfrac{a}{b}$.`, L`Calcule $\dfrac{${a} \times ${b}}{${c}}$.`],
        s: [L`$A = \ln\dfrac{${a} \times ${b}}{${c}} = \ln ${k}$.`] };
    } },
    { id: "lt3b", n: "Résoudre ln(u) = ln(v)", d: 2, f: (H) => {
      const x0 = H.ri(-3, 5), a = H.ri(1, 5), c = H.ri(1, 5), v = H.ri(1, 9), b = v - a * x0, d = v - c * x0;
      if (a === c) { return null; }
      return { t: L`Résous dans $\mathbb{R}$ : $\ln(${H.lin(a, b)}) = \ln(${H.lin(c, d)})$.`, a: { k: "set", v: [x0] }, r: "x = " + H.mt(x0),
        h: [L`$\ln A = \ln B \iff A = B$, avec $A > 0$ et $B > 0$.`, L`Résous $${H.lin(a, b)} = ${H.lin(c, d)}$, puis vérifie que les deux sont positifs.`],
        s: [L`$${H.lin(a, b)} = ${H.lin(c, d)} \iff ${a - c}x = ${d - b} \iff x = ${x0}$.`, L`Pour $x = ${x0}$, les deux expressions valent $${v} > 0$ : $S = \{${x0}\}$.`] };
    } },
    { id: "lt3c", n: "Dériver avec ln", d: 2, f: (H) => {
      const a = H.nz(-4, 4), b = H.nz(-5, 5);
      return { t: L`Calcule $f'(x)$ pour $f(x) = (${H.lin(a, b)})\ln x$ sur $]0 \,;\, +\infty[$.`, a: { k: "expr", f: (x) => a * M.log(x) + (a * x + b) / x, xs: [0.4, 1.3, 2.2, 3.7] }, r: "f'(x) = " + a + "ln x + (" + H.lin(a, b) + ")/x",
        h: [L`C'est un produit : $(uv)' = u'v + uv'$.`, L`Avec $u(x) = ${H.lin(a, b)}$ et $v(x) = \ln x$, $v'(x) = \dfrac{1}{x}$.`],
        s: [L`$f'(x) = ${a}\ln x + (${H.lin(a, b)}) \times \dfrac{1}{x}$.`, L`$f'(x) = ${a}\ln x + \dfrac{${H.lin(a, b)}}{x}$.`] };
    } },
    { id: "lt3d", n: "Résoudre ln x = k ou eˣ = m", d: 1, f: (H) => {
      if (H.pick([0, 1])) {
        const k = H.nz(-3, 5);
        return { t: L`Résous dans $]0 \,;\, +\infty[$ : $\ln x = ${k}$.`, a: { k: "set", v: [M.exp(k)] }, r: "x = e^(" + k + ")",
          h: [L`$\ln x = k \iff x = e^k$.`, "Donne la valeur exacte, pas une valeur arrondie."],
          s: [L`$\ln x = ${k} \iff x = e^{${k}}$.`, L`$S = \{e^{${k}}\}$.`] };
      }
      const m = H.ri(2, 20);
      return { t: L`Résous dans $\mathbb{R}$ : $e^x = ${m}$.`, a: { k: "set", v: [M.log(m)] }, r: "x = ln " + m,
        h: [L`$e^x = m \iff x = \ln m$ (avec $m > 0$).`, "Donne la valeur exacte, pas une valeur arrondie."],
        s: [L`$e^x = ${m} \iff x = \ln ${m}$.`, L`$S = \{\ln ${m}\}$.`] };
    } }
  ]);
})(window);
