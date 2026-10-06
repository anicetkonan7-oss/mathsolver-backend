/* MathSolver - Exercices Terminale, chapitre 9 : Nombres complexes */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 8, [
    { id: "lt8a", n: "Produit de deux complexes", d: 1, f: (H) => {
      const a = H.ri(-5, 5), b = H.nz(-5, 5), c = H.ri(-5, 5), d = H.nz(-5, 5), re = a * c - b * d, im = a * d + b * c;
      return { t: L`Écris sous forme algébrique : $z = (${cz(a, b)})(${cz(c, d)})$.`, a: { k: "cplx", v: [re, im] }, r: "z = " + cz(re, im, 1),
        h: [L`Développe, puis remplace $i^2$ par $-1$.`, L`$(a + bi)(c + di) = (ac - bd) + (ad + bc)i$.`],
        s: [L`$z = ${a * c} + ${pw(a * d)}i + ${pw(b * c)}i + ${pw(b * d)}i^2$.`, L`$z = ${cz(re, im)}$.`] };
    } },
    { id: "lt8b", n: "Quotient de deux complexes", d: 2, f: (H) => {
      const a = H.ri(-5, 5), b = H.nz(-5, 5), c = H.nz(-4, 4), d = H.nz(-4, 4), n = c * c + d * d, re = a * c + b * d, im = b * c - a * d;
      return { t: L`Écris sous forme algébrique : $z = \dfrac{${cz(a, b)}}{${cz(c, d)}}$.`, a: { k: "cplx", v: [re / n, im / n] }, r: "z = " + cz(H.frt(re, n), H.frt(im, n), 1),
        h: [L`Multiplie le numérateur et le dénominateur par le conjugué $${cz(c, -d)}$.`, L`Le dénominateur devient $${c * c} + ${d * d} = ${n}$.`],
        s: [L`$z = \dfrac{(${cz(a, b)})(${cz(c, -d)})}{${n}} = \dfrac{${cz(re, im)}}{${n}}$.`, L`$z = ${cz(H.fr(re, n), H.fr(im, n))}$.`] };
    } },
    { id: "lt8c", n: "Module d'un complexe", d: 1, f: (H) => {
      const T = H.pick([[3, 4], [5, 12], [6, 8], [1, 1], [1, 2], [2, 3], [1, 3], [8, 15]]), a = T[0] * H.pick([1, -1]), b = T[1] * H.pick([1, -1]), s = a * a + b * b, q = M.round(M.sqrt(s));
      return { t: L`Calcule le module de $z = ${cz(a, b)}$.`, a: { k: "num", v: M.sqrt(s) }, r: "|z| = " + (q * q === s ? q : "√" + s),
        h: [L`$|a + bi| = \sqrt{a^2 + b^2}$.`, L`Calcule $${pw(a)}^2 + ${pw(b)}^2$.`],
        s: [L`$|z| = \sqrt{${a * a} + ${b * b}} = \sqrt{${s}}${q * q === s ? " = " + q : ""}$.`] };
    } },
    { id: "lt8d", n: "Équation du second degré dans ℂ", d: 3, f: (H) => {
      const p = H.ri(-4, 4), q = H.ri(1, 5), b = -2 * p, c = p * p + q * q, D = b * b - 4 * c;
      return { t: L`Résous dans $\mathbb{C}$ : $${H.poly([1, b, c], "z")} = 0$.`, a: { k: "cset", v: [[p, q], [p, -q]] }, r: "z = " + cz(p, q, 1) + " ou z = " + cz(p, -q, 1),
        h: [L`Calcule $\Delta = b^2 - 4ac$ : il est négatif.`, L`Si $\Delta < 0$ : $z = \dfrac{-b \pm i\sqrt{-\Delta}}{2a}$.`],
        s: [L`$\Delta = ${b * b} - ${4 * c} = ${D} = (${2 * q}i)^2$.`, L`$z = \dfrac{${-b} \pm ${2 * q}i}{2}$, soit $z_1 = ${cz(p, q)}$ et $z_2 = ${cz(p, -q)}$.`] };
    } },
    { id: "lt8e", n: "Argument d'un complexe", d: 2, f: (H) => {
      const T = H.pick([["\\sqrt{3} + i", 1, "π/6", "\\dfrac{\\pi}{6}"], ["1 + i\\sqrt{3}", 2, "π/3", "\\dfrac{\\pi}{3}"], ["-1 + i\\sqrt{3}", 4, "2π/3", "\\dfrac{2\\pi}{3}"], ["-\\sqrt{3} + i", 5, "5π/6", "\\dfrac{5\\pi}{6}"], ["1 - i\\sqrt{3}", -2, "−π/3", "-\\dfrac{\\pi}{3}"], ["1 + i", 1.5, "π/4", "\\dfrac{\\pi}{4}"], ["-1 + i", 4.5, "3π/4", "\\dfrac{3\\pi}{4}"], ["1 - i", -1.5, "−π/4", "-\\dfrac{\\pi}{4}"], ["-1 - i", -4.5, "−3π/4", "-\\dfrac{3\\pi}{4}"], ["i", 3, "π/2", "\\dfrac{\\pi}{2}"], ["-1", 6, "π", "\\pi"]]), m = H.ri(1, 4);
      const Z = T[0] === "i" ? (m === 1 ? "" : m) + "i" : T[0] === "-1" ? "-" + m : m === 1 ? T[0] : m + "(" + T[0] + ")";
      return { t: L`Donne un argument de $z = ${Z}$.`, a: { k: "arg", v: T[1] * M.PI / 6 }, r: "arg z = " + T[2],
        h: [L`Calcule $|z|$, puis $\cos\theta = \dfrac{a}{|z|}$ et $\sin\theta = \dfrac{b}{|z|}$.`, "Reconnais l'angle grâce aux valeurs remarquables du cercle trigonométrique."],
        s: (m > 1 && T[0].length > 2 ? [L`Le facteur $${m}$, positif, ne change pas l'argument.`] : []).concat([L`Un argument de $z$ est $${T[3]}$ (à $2\pi$ près).`]) };
    } }
  ]);
})(window);
