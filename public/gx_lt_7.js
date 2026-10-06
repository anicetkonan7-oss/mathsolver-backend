/* MathSolver - Exercices Terminale, chapitre 8 : Équations différentielles */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 7, [
    { id: "lt7a", n: "Résoudre y′ = ay", d: 1, f: (H) => {
      const a = H.nz(-4, 4), k = H.nz(-6, 6);
      return { t: L`Résous $y' = ${ex(a)}y$ avec la condition $y(0) = ${k}$.`, a: { k: "expr", f: (x) => k * M.exp(a * x) }, r: "y = " + (k === 1 ? "" : k === -1 ? "−" : H.mt(k)) + "e^(" + a + "x)",
        h: [L`Les solutions de $y' = ay$ sont $y = Ce^{ax}$.`, L`Utilise $y(0) = C$.`],
        s: [L`$y = Ce^{${ex(a)}x}$ et $y(0) = C = ${k}$.`, L`$y = ${ex(k)}e^{${ex(a)}x}$.`] };
    } },
    { id: "lt7b", n: "Résoudre y′ = ay + b", d: 2, f: (H) => {
      const a = H.nz(-3, 3), c0 = H.nz(-4, 4), b = -a * c0, y0 = H.ri(-6, 6), C = y0 - c0;
      if (!C) { return null; }
      return { t: L`Résous $y' = ${ex(a)}y ${b < 0 ? "-" : "+"} ${M.abs(b)}$ avec $y(0) = ${y0}$.`, a: { k: "expr", f: (x) => C * M.exp(a * x) + c0 }, r: "y = " + H.mt(C) + "e^(" + a + "x) " + (c0 < 0 ? "− " : "+ ") + M.abs(c0),
        h: [L`Les solutions de $y' = ay + b$ sont $y = Ce^{ax} - \dfrac{b}{a}$.`, L`Ici $-\dfrac{b}{a} = ${c0}$ ; trouve $C$ avec $y(0) = ${y0}$.`],
        s: [L`$y = Ce^{${ex(a)}x} ${c0 < 0 ? "-" : "+"} ${M.abs(c0)}$.`, L`$y(0) = C ${c0 < 0 ? "-" : "+"} ${M.abs(c0)} = ${y0}$, donc $C = ${C}$.`, L`$y = ${ex(C)}e^{${ex(a)}x} ${c0 < 0 ? "-" : "+"} ${M.abs(c0)}$.`] };
    } },
    { id: "lt7c", n: "Résoudre y″ + ω²y = 0", d: 2, f: (H) => {
      const o = H.ri(1, 4), A = H.ri(-4, 4), B = H.nz(-4, 4), d0 = B * o;
      return { t: L`Résous $y'' + ${o * o}y = 0$ avec $y(0) = ${A}$ et $y'(0) = ${d0}$.`, a: { k: "expr", f: (x) => A * M.cos(o * x) + B * M.sin(o * x) }, r: "y = " + (A ? H.mt(A) + "cos(" + o + "x) " + (B < 0 ? "− " : "+ ") : (B < 0 ? "−" : "")) + M.abs(B) + "sin(" + o + "x)",
        h: [L`Les solutions sont $y = A\cos(\omega x) + B\sin(\omega x)$, avec $\omega = ${o}$.`, L`$y(0) = A$ et $y'(0) = ${o}B$.`],
        s: [L`$\omega = ${o}$ : $y = A\cos(${o}x) + B\sin(${o}x)$.`, L`$A = ${A}$ et $${o}B = ${d0}$, donc $B = ${B}$.`] };
    } },
    { id: "lt7d", n: "Condition en un autre point", d: 3, f: (H) => {
      const a = H.nz(-3, 3), k = H.nz(-5, 5);
      return { t: L`Résous $y' = ${ex(a)}y$ avec $y(1) = ${k}$.`, a: { k: "expr", f: (x) => k * M.exp(a * (x - 1)) }, r: "y = " + H.mt(k) + "e^(" + a + "(x − 1))",
        h: [L`$y = Ce^{${ex(a)}x}$ ; remplace $x$ par 1.`, L`$Ce^{${a}} = ${k}$ donne $C = ${k}e^{${-a}}$.`],
        s: [L`$y(1) = Ce^{${a}} = ${k}$, donc $C = ${k}e^{${-a}}$.`, L`$y = ${ex(k)}e^{${a}(x - 1)}$.`] };
    } }
  ]);
})(window);
