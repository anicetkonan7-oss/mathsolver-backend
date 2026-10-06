/* MathSolver - Exercices Terminale, chapitre 1 : Limites et continuité */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 0, [
    { id: "lt0a", n: "Limite d'un polynôme en l'infini", d: 1, f: (H) => {
      const n = H.pick([2, 3]), a = H.nz(-5, 5), b = H.ri(-6, 6), c = H.ri(-9, 9), sd = H.pick([1, -1]);
      const c0 = n === 3 ? [a, 0, b, c] : [a, b, c], res = M.sign(a) * (sd < 0 && n === 3 ? -1 : 1);
      const P = H.poly(c0), T = H.poly([a].concat(Array(n).fill(0)));
      return { t: L`Soit $f(x) = ${P}$. Calcule $\displaystyle\lim_{x \to ${inf(sd)}} f(x)$.`, a: { k: "lim", v: res * Infinity }, r: infT(res),
        h: ["En l'infini, un polynôme a la même limite que son terme de plus haut degré.", L`Étudie la limite de $${T}$ quand $x \to ${inf(sd)}$.`],
        s: [L`En $${inf(sd)}$, $f(x)$ a la même limite que $${T}$.`, L`$\displaystyle\lim_{x \to ${inf(sd)}} ${T} = ${inf(res)}$, donc $\displaystyle\lim_{x \to ${inf(sd)}} f(x) = ${inf(res)}$.`] };
    } },
    { id: "lt0b", n: "Limite d'une fonction rationnelle en l'infini", d: 2, f: (H) => {
      const a = H.nz(-6, 6), b = H.ri(-5, 5), c = H.ri(-5, 5), d = H.nz(-4, 4), e = H.ri(1, 7);
      return { t: L`Soit $f(x) = \dfrac{${H.poly([a, b, c])}}{${H.poly([d, 0, e])}}$. Calcule $\displaystyle\lim_{x \to +\infty} f(x)$.`, a: { k: "lim", v: a / d }, r: H.frt(a, d),
        h: ["En l'infini, une fraction rationnelle a la même limite que le quotient des termes de plus haut degré.", L`Simplifie $\dfrac{${H.poly([a, 0, 0])}}{${H.poly([d, 0, 0])}}$.`],
        s: [L`En $+\infty$ : $f(x)$ a la même limite que $\dfrac{${H.poly([a, 0, 0])}}{${H.poly([d, 0, 0])}} = ${H.fr(a, d)}$.`, L`Donc $\displaystyle\lim_{x \to +\infty} f(x) = ${H.fr(a, d)}$.`] };
    } },
    { id: "lt0c", n: "Limite de la forme k/0", d: 3, f: (H) => {
      const x0 = H.ri(-4, 4), a = H.nz(-4, 4), b = H.ri(-6, 6), N = a * x0 + b, sd = H.pick([1, -1]);
      if (!N) { return null; }
      const res = M.sign(N) * sd, D = H.lin(1, -x0);
      return { t: L`Soit $f(x) = \dfrac{${H.lin(a, b)}}{${D}}$. Calcule $\displaystyle\lim_{x \to ${x0}^${sd > 0 ? "+" : "-"}} f(x)$.`, a: { k: "lim", v: res * Infinity }, r: infT(res),
        h: [L`Calcule la limite du numérateur quand $x \to ${x0}$.`, L`Le dénominateur tend vers 0 : cherche son signe quand $x ${sd > 0 ? ">" : "<"} ${x0}$.`],
        s: [L`Numérateur : $${a} \times ${x0 < 0 ? "(" + x0 + ")" : x0} ${b < 0 ? "-" : "+"} ${M.abs(b)} = ${N}$.`, L`Dénominateur : $${D} \to 0$ avec $${D} ${sd > 0 ? ">" : "<"} 0$.`, L`Par quotient : $\displaystyle\lim f(x) = ${inf(res)}$.`] };
    } }
  ]);
})(window);
