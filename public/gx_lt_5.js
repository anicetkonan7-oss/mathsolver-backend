/* MathSolver - Exercices Terminale, chapitre 6 : Suites numériques */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 5, [
    { id: "lt5a", n: "Terme d'une suite arithmétique", d: 1, f: (H) => {
      const u = H.ri(-10, 20), r = H.nz(-6, 8), n = H.ri(5, 30);
      return { t: L`$(u_n)$ est arithmétique de premier terme $u_0 = ${u}$ et de raison $${r}$. Calcule $u_{${n}}$.`, a: { k: "num", v: u + n * r }, r: H.mt(u + n * r),
        h: [L`$u_n = u_0 + nr$.`, L`Calcule $${u} + ${n} \times ${pw(r)}$.`],
        s: [L`$u_{${n}} = ${u} + ${n} \times ${pw(r)} = ${u + n * r}$.`] };
    } },
    { id: "lt5b", n: "Terme d'une suite géométrique", d: 1, f: (H) => {
      const u = H.nz(-5, 6), q = H.pick([2, 3, -2, -3]), n = H.ri(3, 7), v = u * q ** n;
      return { t: L`$(u_n)$ est géométrique de premier terme $u_0 = ${u}$ et de raison $${q}$. Calcule $u_{${n}}$.`, a: { k: "num", v: v }, r: H.mt(v),
        h: [L`$u_n = u_0 \times q^n$.`, L`Calcule $${u} \times ${pw(q)}^{${n}}$.`],
        s: [L`$u_{${n}} = ${u} \times ${pw(q)}^{${n}} = ${u} \times ${pw(q ** n)} = ${v}$.`] };
    } },
    { id: "lt5c", n: "Somme de termes arithmétiques", d: 2, f: (H) => {
      const u = H.ri(-5, 15), r = H.nz(-4, 6), n = H.ri(8, 40), un = u + n * r, S = (n + 1) * (u + un) / 2;
      return { t: L`$(u_n)$ est arithmétique avec $u_0 = ${u}$ et $r = ${r}$. Calcule $S = u_0 + u_1 + \dots + u_{${n}}$.`, a: { k: "num", v: S }, r: H.mt(S),
        h: [L`$S = \text{nombre de termes} \times \dfrac{\text{premier} + \text{dernier}}{2}$.`, L`Il y a $${n + 1}$ termes et $u_{${n}} = ${un}$.`],
        s: [L`$u_{${n}} = ${u} + ${n} \times ${pw(r)} = ${un}$.`, L`$S = ${n + 1} \times \dfrac{${u} + ${pw(un)}}{2} = ${S}$.`] };
    } },
    { id: "lt5d", n: "Somme de termes géométriques", d: 2, f: (H) => {
      const u = H.ri(1, 5), q = H.pick([2, 3]), n = H.ri(3, 7), S = u * (q ** (n + 1) - 1) / (q - 1);
      return { t: L`$(u_n)$ est géométrique avec $u_0 = ${u}$ et $q = ${q}$. Calcule $S = u_0 + u_1 + \dots + u_{${n}}$.`, a: { k: "num", v: S }, r: H.mt(S),
        h: [L`$S = u_0 \times \dfrac{1 - q^{N}}{1 - q}$, où $N$ est le nombre de termes.`, L`Ici $N = ${n + 1}$.`],
        s: [L`$S = ${u} \times \dfrac{1 - ${q}^{${n + 1}}}{1 - ${q}} = ${u} \times \dfrac{${1 - q ** (n + 1)}}{${1 - q}} = ${S}$.`] };
    } },
    { id: "lt5e", n: "Limite d'une suite géométrique", d: 3, f: (H) => {
      const t = H.pick([0, 1]), a = H.ri(1, 9), b = H.ri(-6, 6), q = t ? H.pick([2, 3, 5]) : H.pick([[1, 2], [1, 3], [-1, 2], [2, 3], [3, 4]]);
      const Q = t ? q : H.fr(q[0], q[1]), U = L`${a}\times\left(${Q}\right)^n ${b < 0 ? "-" : "+"} ${M.abs(b)}`;
      return { t: L`Calcule la limite de la suite $u_n = ${U}$.`, a: { k: "lim", v: t ? Infinity : b }, r: t ? "+∞" : H.mt(b),
        h: [L`Si $-1 < q < 1$, $q^n \to 0$ ; si $q > 1$, $q^n \to +\infty$.`, L`Ici $q = ${Q}$.`],
        s: [t ? L`$${q} > 1$ donc $${q}^n \to +\infty$, et comme $${a} > 0$ : $u_n \to +\infty$.` : L`$-1 < ${Q} < 1$ donc $\left(${Q}\right)^n \to 0$.`, t ? L`La suite diverge vers $+\infty$.` : L`Donc $u_n \to ${b}$.`] };
    } }
  ]);
})(window);
