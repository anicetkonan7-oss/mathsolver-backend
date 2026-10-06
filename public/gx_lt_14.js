/* MathSolver - Exercices Terminale, chapitre 15 : Coniques (série C) */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 14, [
    { id: "lt14a", n: "Foyer d'une parabole", d: 1, f: (H) => {
      const p = H.ri(1, 10), v = H.pick([0, 1]), F = v ? [0, p / 2] : [p / 2, 0], P = H.fr(p, 2);
      return { t: L`Donne les coordonnées du foyer de la parabole $${v ? "x^2 = " + 2 * p + "y" : "y^2 = " + 2 * p + "x"}$.`, a: { k: "pt", v: F }, r: v ? "F(0 ; " + H.frt(p, 2) + ")" : "F(" + H.frt(p, 2) + " ; 0)",
        h: [v ? L`Pour $x^2 = 2py$, le foyer est $F\left(0 \,;\, \dfrac{p}{2}\right)$.` : L`Pour $y^2 = 2px$, le foyer est $F\left(\dfrac{p}{2} \,;\, 0\right)$.`, L`Ici $2p = ${2 * p}$, donc $p = ${p}$.`],
        s: [L`$2p = ${2 * p}$ donc $p = ${p}$.`, v ? L`$F\left(0 \,;\, ${P}\right)$ et la directrice est $y = -${P}$.` : L`$F\left(${P} \,;\, 0\right)$ et la directrice est $x = -${P}$.`] };
    } },
    { id: "lt14b", n: "Excentricité d'une ellipse", d: 2, f: (H) => {
      const k = H.ri(1, 3), T = H.pick([[5, 3, 4], [5, 4, 3], [13, 12, 5], [10, 6, 8], [10, 8, 6], [17, 15, 8], [25, 24, 7], [25, 7, 24]]).map((v) => v * k);
      return { t: L`Calcule l'excentricité de l'ellipse $\dfrac{x^2}{${T[0] ** 2}} + \dfrac{y^2}{${T[1] ** 2}} = 1$.`, a: { k: "num", v: T[2] / T[0] }, r: "e = " + H.frt(T[2], T[0]),
        h: [L`$c^2 = a^2 - b^2$ et $e = \dfrac{c}{a}$.`, L`Ici $a = ${T[0]}$ et $b = ${T[1]}$.`],
        s: [L`$c^2 = ${T[0] ** 2} - ${T[1] ** 2} = ${T[2] ** 2}$, donc $c = ${T[2]}$.`, L`$e = \dfrac{${T[2]}}{${T[0]}}${H.gcd(T[2], T[0]) > 1 ? " = " + H.fr(T[2], T[0]) : ""}$.`] };
    } },
    { id: "lt14c", n: "Foyers d'une hyperbole", d: 2, f: (H) => {
      const T = H.pick([[3, 4], [4, 3], [6, 8], [5, 12], [8, 6], [12, 5], [1, 1], [2, 1], [1, 2], [2, 3], [3, 1], [1, 3]]), s = T[0] ** 2 + T[1] ** 2, q = M.round(M.sqrt(s)), ok = q * q === s;
      const C = ok ? String(q) : "\\sqrt{" + s + "}", fq = (v, n) => (n === 1 ? v + "^2" : "\\dfrac{" + v + "^2}{" + n + "}");
      return { t: L`Donne l'abscisse positive $c$ des foyers de l'hyperbole $${fq("x", T[0] ** 2)} - ${fq("y", T[1] ** 2)} = 1$.`, a: { k: "num", v: M.sqrt(s) }, r: "c = " + (ok ? q : "√" + s),
        h: [L`Pour une hyperbole : $c^2 = a^2 + b^2$.`, L`Ici $a^2 = ${T[0] ** 2}$ et $b^2 = ${T[1] ** 2}$.`],
        s: [L`$c^2 = ${T[0] ** 2} + ${T[1] ** 2} = ${s}$, donc $c = ${C}$.`, L`Les foyers sont $F(${C} \,;\, 0)$ et $F'(-${C} \,;\, 0)$.`] };
    } },
    { id: "lt14d", n: "Asymptotes d'une hyperbole", d: 2, f: (H) => {
      const a = H.ri(1, 6), b = H.ri(1, 6);
      return { t: L`Donne l'équation de l'asymptote de coefficient directeur positif de l'hyperbole $\dfrac{x^2}{${a * a}} - \dfrac{y^2}{${b * b}} = 1$.`, a: { k: "lin", v: [b / a, -1, 0, 0] }, r: "y = " + (b === a ? "" : H.frt(b, a)) + "x",
        h: [L`Les asymptotes sont $y = \pm\dfrac{b}{a}x$.`, L`Ici $a = ${a}$ et $b = ${b}$.`],
        s: [L`$a = ${a}$, $b = ${b}$ : l'asymptote cherchée est $y = ${b === a ? "" : H.fr(b, a)}x$.`] };
    } },
    { id: "lt14e", n: "Reconnaître une conique", d: 1, f: (H) => {
      const t = H.pick([0, 1, 2]), A = H.ri(1, 9), B = H.ri(1, 9), C = H.ri(1, 30), N = ["ellipse", "hyperbole", "parabole"][t], a1 = A === 1 ? "" : A, b1 = B === 1 ? "" : B;
      const E = [L`${a1}x^2 + ${b1}y^2 = ${C}`, L`${a1}x^2 - ${b1}y^2 = ${C}`, L`y^2 = ${C}x`][t];
      return { t: L`Quelle est la nature de la courbe d'équation $${E}$ ?`, a: { k: "word", v: [N], no: ["ellipse", "hyperbole", "parabole"].filter((v) => v !== N) }, r: "C'est une " + N + ".",
        h: ["Regarde les termes au carré et leurs signes.", "Deux carrés de même signe : ellipse ; de signes contraires : hyperbole ; un seul carré : parabole."],
        s: [[L`Deux carrés avec le même signe $+$ : c'est une ellipse.`, L`Deux carrés de signes contraires : c'est une hyperbole.`, L`Un seul terme au carré : c'est une parabole.`][t]] };
    } }
  ]);
})(window);
