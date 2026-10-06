/* MathSolver - Exercices Terminale, chapitre 11 : Statistiques à deux variables */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  const sum = (a) => a.reduce((s, v) => s + v, 0);
  X.add("lt", 10, [
    { id: "lt10a", n: "Point moyen", d: 1, f: (H) => {
      const n = H.ri(4, 5), x = [], y = [];
      for (let i = 0, v = 0; i < n; i++) { v += H.ri(1, 3); x.push(v); y.push(H.ri(1, 20)); }
      const mx = sum(x) / n, my = sum(y) / n;
      return { t: L`Calcule les coordonnées du point moyen $G$ de la série :` + "\n" + tb(x, y), a: { k: "pt", v: [mx, my] }, r: "G(" + dec(mx) + " ; " + dec(my) + ")",
        h: [L`$G(\bar{x} \,;\, \bar{y})$, avec $\bar{x}$ et $\bar{y}$ les moyennes.`, L`Il y a $${n}$ valeurs : divise chaque somme par $${n}$.`],
        s: [L`$\bar{x} = \dfrac{${sum(x)}}{${n}} = ${ldec(mx)}$ et $\bar{y} = \dfrac{${sum(y)}}{${n}} = ${ldec(my)}$.`, L`$G(${ldec(mx)} \,;\, ${ldec(my)})$.`] };
    } },
    { id: "lt10b", n: "Covariance", d: 2, f: (H) => {
      const x = [1, 2, 3, 4], y = x.map(() => H.ri(1, 12)), sxy = sum(x.map((v, i) => v * y[i])), sy = sum(y), cv = sxy / 4 - 2.5 * sy / 4;
      return { t: L`Calcule la covariance $\text{cov}(x, y)$ de la série :` + "\n" + tb(x, y), a: { k: "num", v: cv }, r: dec(cv),
        h: [L`$\text{cov}(x, y) = \dfrac{1}{n}\sum x_iy_i - \bar{x}\,\bar{y}$.`, L`$\bar{x} = 2{,}5$ ; calcule $\sum x_iy_i$ et $\bar{y}$.`],
        s: [L`$\sum x_iy_i = ${sxy}$ et $\bar{y} = ${ldec(sy / 4)}$.`, L`$\text{cov}(x, y) = \dfrac{${sxy}}{4} - 2{,}5 \times ${ldec(sy / 4)} = ${ldec(cv)}$.`] };
    } },
    { id: "lt10c", n: "Droite de régression", d: 3, f: (H) => {
      const a = H.nz(-3, 4), b = H.ri(-2, 8), t = H.ri(-2, 2), x = [1, 2, 3, 4, 5], e = [1, -2, 0, 2, -1], y = x.map((v, i) => a * v + b + t * e[i]);
      return { t: L`Détermine la droite de régression de $y$ en $x$ de la série :` + "\n" + tb(x, y), a: { k: "lin", v: [a, -1, 0, b] }, r: "y = " + H.poly([a, b], "x", 1),
        h: [L`$a = \dfrac{\text{cov}(x, y)}{V(x)}$ et $b = \bar{y} - a\bar{x}$.`, L`Ici $\bar{x} = 3$ et $V(x) = 2$.`],
        s: [L`$\bar{x} = 3$, $\bar{y} = ${ldec(3 * a + b)}$, $V(x) = 2$ et $\text{cov}(x, y) = ${2 * a}$.`, L`$a = \dfrac{${2 * a}}{2} = ${a}$ et $b = ${ldec(3 * a + b)} - ${pw(a)} \times 3 = ${b}$.`, L`$y = ${H.poly([a, b])}$.`] };
    } }
  ]);
})(window);
