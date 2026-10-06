/* MathSolver - Exercices Terminale, chapitre 7 : Calcul intégral */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 6, [
    { id: "lt6a", n: "Intégrale d'un polynôme", d: 1, f: (H) => {
      const al = H.ri(-2, 2), be = H.ri(-3, 3), ga = H.ri(-5, 5), a = H.ri(-2, 1), b = a + H.ri(1, 3), F = (x) => al * x ** 3 + be * x * x + ga * x, v = F(b) - F(a);
      if (!al && !be) { return null; }
      return { t: L`Calcule $I = \displaystyle\int_{${a}}^{${b}} (${H.poly([3 * al, 2 * be, ga])})\,dx$.`, a: { k: "num", v: v }, r: "I = " + H.mt(v),
        h: [L`Trouve une primitive $F$, puis calcule $F(${b}) - F(${a})$.`, L`$F(x) = ${H.poly([al, be, ga, 0])}$.`],
        s: [L`$F(x) = ${H.poly([al, be, ga, 0])}$.`, L`$I = F(${b}) - F(${a}) = ${F(b)} - ${pw(F(a))} = ${v}$.`] };
    } },
    { id: "lt6b", n: "Intégrale de e^(kx)", d: 2, f: (H) => {
      const k = H.ri(1, 4), m = H.ri(1, 6), c = H.ri(1, 2), K = k * c, F = H.fr(m, k);
      return { t: L`Calcule $I = \displaystyle\int_0^{${c}} ${m === 1 ? "" : m}e^{${ex(k)}x}\,dx$.`, a: { k: "num", v: m * (M.exp(K) - 1) / k }, r: "I = " + H.frt(m, k) + "(e^" + K + " − 1)",
        h: [L`Une primitive de $e^{kx}$ est $\dfrac{1}{k}e^{kx}$.`, L`Calcule $\left[${F}e^{${ex(k)}x}\right]_0^{${c}}$.`],
        s: [L`$I = \left[${F}e^{${ex(k)}x}\right]_0^{${c}} = ${F}e^{${K}} - ${F}$.`, L`$I = ${F}\left(e^{${K}} - 1\right)$.`] };
    } },
    { id: "lt6c", n: "Valeur moyenne", d: 2, f: (H) => {
      const a = H.nz(-6, 6), c = H.ri(1, 6), v = a * c * c / 3;
      return { t: L`Calcule la valeur moyenne $\mu$ de $f(x) = ${H.poly([a, 0, 0])}$ sur $[0 \,;\, ${c}]$.`, a: { k: "num", v: v }, r: "μ = " + H.frt(a * c * c, 3),
        h: [L`$\mu = \dfrac{1}{b - a}\displaystyle\int_a^b f(x)\,dx$.`, L`Une primitive de $${H.poly([a, 0, 0])}$ est $${H.fr(a, 3)}x^3$.`],
        s: [L`$\displaystyle\int_0^{${c}} ${H.poly([a, 0, 0])}\,dx = ${H.fr(a, 3)} \times ${c ** 3} = ${H.fr(a * c ** 3, 3)}$.`, L`$\mu = \dfrac{1}{${c}} \times ${H.fr(a * c ** 3, 3)} = ${H.fr(a * c * c, 3)}$.`] };
    } },
    { id: "lt6d", n: "Intégration par parties", d: 3, f: (H) => {
      const a = H.nz(-3, 4), b = H.nz(-3, 4), v = b * M.E - (b - a);
      return { t: L`À l'aide d'une intégration par parties, calcule $I = \displaystyle\int_0^1 (${H.lin(a, b)})e^x\,dx$.`, a: { k: "num", v: v }, r: "I = " + (b === 1 ? "" : b === -1 ? "−" : H.mt(b)) + "e" + (a - b ? (a - b > 0 ? " + " : " − ") + M.abs(a - b) : ""),
        h: [L`Pose $u(x) = ${H.lin(a, b)}$ et $v'(x) = e^x$.`, L`$\displaystyle\int_0^1 uv' = [uv]_0^1 - \displaystyle\int_0^1 u'v$.`],
        s: [L`$u'(x) = ${a}$, $v(x) = e^x$.`, L`$I = \left[(${H.lin(a, b)})e^x\right]_0^1 - \displaystyle\int_0^1 ${a}e^x\,dx = ${a + b}e - ${pw(b)} - ${pw(a)}(e - 1)$.`, L`$I = ${ex(b)}e ${a - b < 0 ? "-" : "+"} ${M.abs(a - b)}$.`] };
    } },
    { id: "lt6e", n: "Intégrale de k/x", d: 1, f: (H) => {
      const k = H.nz(-5, 6), n = H.ri(1, 4);
      return { t: L`Calcule $I = \displaystyle\int_1^{e^{${n}}} \dfrac{${k}}{x}\,dx$.`, a: { k: "num", v: k * n }, r: "I = " + H.mt(k * n),
        h: [L`Une primitive de $\dfrac{1}{x}$ sur $]0 \,;\, +\infty[$ est $\ln x$.`, L`$\ln(e^{${n}}) = ${n}$ et $\ln 1 = 0$.`],
        s: [L`$I = ${k}\left[\ln x\right]_1^{e^{${n}}} = ${k}(${n} - 0) = ${k * n}$.`] };
    } }
  ]);
})(window);
