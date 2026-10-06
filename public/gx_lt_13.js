/* MathSolver - Exercices Terminale, chapitre 14 : Similitudes directes (série C) */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  const AA = [[1, 1, "\\sqrt{2}", "√2", M.SQRT2], [0, 2, "2", "2", 2], [-3, 0, "3", "3", 3], [3, 4, "5", "5", 5], [0, -1, "1", "1", 1], [1, -1, "\\sqrt{2}", "√2", M.SQRT2], [-2, 0, "2", "2", 2], [0, 3, "3", "3", 3]];
  X.add("lt", 13, [
    { id: "lt13a", n: "Rapport d'une similitude", d: 1, f: (H) => {
      const A = H.pick(AA), b = [H.ri(-4, 4), H.ri(-4, 4)];
      return { t: L`Donne le rapport de la similitude directe $s : z' = (${cz(A[0], A[1])})z + (${cz(b[0], b[1])})$.`, a: { k: "num", v: A[4] }, r: "k = " + A[3],
        h: ["Pour z' = az + b, le rapport est k = |a|.", L`Calcule $|${cz(A[0], A[1])}|$.`],
        s: [L`$k = |${cz(A[0], A[1])}| = ${A[2]}$.`] };
    } },
    { id: "lt13b", n: "Centre d'une similitude", d: 2, f: (H) => {
      const A = H.pick(AA.filter((t) => !(t[0] === 1 && t[1] === 0))), o = [H.ri(-3, 3), H.ri(-3, 3)], c = [1 - A[0], -A[1]], b = [o[0] * c[0] - o[1] * c[1], o[0] * c[1] + o[1] * c[0]];
      return { t: L`Détermine l'affixe $\omega$ du centre de la similitude $s : z' = (${cz(A[0], A[1])})z + (${cz(b[0], b[1])})$.`, a: { k: "cplx", v: o }, r: "ω = " + cz(o[0], o[1], 1),
        h: [L`Le centre est le point fixe : résous $\omega = a\omega + b$.`, L`$\omega = \dfrac{b}{1 - a}$, avec $1 - a = ${cz(c[0], c[1])}$.`],
        s: [L`$\omega = \dfrac{${cz(b[0], b[1])}}{${cz(c[0], c[1])}}$.`, L`$\omega = ${cz(o[0], o[1])}$.`] };
    } },
    { id: "lt13c", n: "Image d'un point", d: 2, f: (H) => {
      const A = H.pick(AA), b = [H.ri(-4, 4), H.ri(-4, 4)], z = [H.ri(-3, 3), H.nz(-3, 3)], r = [A[0] * z[0] - A[1] * z[1] + b[0], A[0] * z[1] + A[1] * z[0] + b[1]];
      return { t: L`Calcule l'affixe de l'image du point $M(${cz(z[0], z[1])})$ par $s : z' = (${cz(A[0], A[1])})z + (${cz(b[0], b[1])})$.`, a: { k: "cplx", v: r }, r: "z' = " + cz(r[0], r[1], 1),
        h: [L`Remplace $z$ par $${cz(z[0], z[1])}$.`, L`Développe avec $i^2 = -1$.`],
        s: [L`$z' = (${cz(A[0], A[1])})(${cz(z[0], z[1])}) + (${cz(b[0], b[1])})$.`, L`$z' = ${cz(r[0], r[1])}$.`] };
    } },
    { id: "lt13d", n: "Écriture complexe d'une similitude", d: 3, f: (H) => {
      const k = H.ri(1, 4), T = H.pick([[0, 1, "\\dfrac{\\pi}{2}"], [-1, 0, "\\pi"], [0, -1, "-\\dfrac{\\pi}{2}"]]), a = [k * T[0], k * T[1]], o = [H.ri(-3, 3), H.ri(-3, 3)];
      const c = [1 - a[0], -a[1]], b = [o[0] * c[0] - o[1] * c[1], o[0] * c[1] + o[1] * c[0]];
      return { t: L`Donne l'écriture complexe de la similitude de centre $\Omega(${cz(o[0], o[1])})$, de rapport $${k}$ et d'angle $${T[2]}$.`, a: { k: "aff", v: [a[0], a[1], b[0], b[1]] }, r: "z' = (" + cz(a[0], a[1], 1) + ")z + (" + cz(b[0], b[1], 1) + ")",
        h: [L`$z' - \omega = ke^{i\theta}(z - \omega)$.`, L`Ici $ke^{i\theta} = ${cz(a[0], a[1])}$.`],
        s: [L`$z' - (${cz(o[0], o[1])}) = (${cz(a[0], a[1])})(z - (${cz(o[0], o[1])}))$.`, L`$z' = (${cz(a[0], a[1])})z + (${cz(b[0], b[1])})$.`] };
    } }
  ]);
})(window);
