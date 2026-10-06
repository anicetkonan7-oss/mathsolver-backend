/* MathSolver - Exercices Terminale, chapitre 3 : Primitives */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 2, [
    { id: "lt2a", n: "Primitive d'un polynôme", d: 1, f: (H) => {
      const a = H.pick([3, 6, -3, 9]), b = H.pick([2, 4, -2, -6, 8]), c = H.ri(-7, 7);
      return { t: L`Donne la primitive $F$ de $f(x) = ${H.poly([a, b, c])}$ qui vérifie $F(0) = 0$.`, a: { k: "expr", f: (x) => a / 3 * x * x * x + b / 2 * x * x + c * x }, r: "F(x) = " + H.poly([a / 3, b / 2, c, 0], "x", 1),
        h: [L`Une primitive de $x^n$ est $\dfrac{x^{n+1}}{n+1}$.`, L`Avec $F(0) = 0$, il n'y a pas de constante à ajouter.`],
        s: [L`$F(x) = ${a}\times\dfrac{x^3}{3} ${b < 0 ? "-" : "+"} ${M.abs(b)}\times\dfrac{x^2}{2} ${c < 0 ? "-" : "+"} ${M.abs(c)}x$.`, L`$F(x) = ${H.poly([a / 3, b / 2, c, 0])}$.`] };
    } },
    { id: "lt2b", n: "Primitive de la forme u′/u", d: 2, f: (H) => {
      const p = H.ri(-3, 3), q = p * p + H.ri(1, 6);
      return { t: L`Donne une primitive de $f(x) = \dfrac{${H.poly([2, p])}}{${H.poly([1, p, q])}}$ sur $\mathbb{R}$.`, a: { k: "prim", f: (x) => (2 * x + p) / (x * x + p * x + q) }, r: "F(x) = ln(" + H.poly([1, p, q], "x", 1) + ")",
        h: [L`Compare le numérateur à la dérivée du dénominateur.`, L`Une primitive de $\dfrac{u'}{u}$ (avec $u > 0$) est $\ln u$.`],
        s: [L`Avec $u(x) = ${H.poly([1, p, q])}$ : $u'(x) = ${H.poly([2, p])}$ et $u(x) > 0$.`, L`$F(x) = \ln(${H.poly([1, p, q])})$.`] };
    } },
    { id: "lt2c", n: "Primitive avec une condition", d: 2, f: (H) => {
      const c = H.ri(-5, 5), x0 = H.ri(-2, 2), y0 = H.ri(-6, 6), K = y0 - (x0 ** 3 - x0 * x0 + c * x0);
      return { t: L`Donne la primitive $F$ de $f(x) = ${H.poly([3, -2, c])}$ telle que $F(${x0}) = ${y0}$.`, a: { k: "expr", f: (x) => x ** 3 - x * x + c * x + K }, r: "F(x) = " + H.poly([1, -1, c, K], "x", 1),
        h: [L`Les primitives sont $F(x) = x^3 - x^2 ${c < 0 ? "-" : "+"} ${M.abs(c)}x + K$.`, L`Remplace $x$ par $${x0}$ et résous $F(${x0}) = ${y0}$.`],
        s: [L`$F(x) = ${H.poly([1, -1, c, 0])} + K$.`, L`$F(${x0}) = ${x0 ** 3 - x0 * x0 + c * x0} + K = ${y0}$, donc $K = ${K}$.`, L`$F(x) = ${H.poly([1, -1, c, K])}$.`] };
    } },
    { id: "lt2d", n: "Primitive de sin et cos", d: 2, f: (H) => {
      const k = H.ri(2, 6), m = H.ri(1, 4), cs = H.pick([1, 0]), K = m === 1 ? "" : m;
      return { t: L`Donne une primitive de $f(x) = ${K}${cs ? "\\cos" : "\\sin"}(${k}x)$.`, a: { k: "prim", f: (x) => m * (cs ? M.cos : M.sin)(k * x) }, r: (cs ? "F(x) = " : "F(x) = −") + H.frt(m, k) + (cs ? " sin(" : " cos(") + k + "x)",
        h: [L`Une primitive de $\cos(ax)$ est $\dfrac{1}{a}\sin(ax)$, et de $\sin(ax)$ est $-\dfrac{1}{a}\cos(ax)$.`, L`Ici $a = ${k}$, et le facteur $${m}$ reste devant.`],
        s: [cs ? L`$F(x) = ${H.fr(m, k)}\sin(${k}x)$.` : L`$F(x) = -${H.fr(m, k)}\cos(${k}x)$.`] };
    } }
  ]);
})(window);
