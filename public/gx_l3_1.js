/* MathSolver - Exercices 3e, chapitre 2 : Calcul littéral */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("l3", 1, [
    { id: "l31a", n: "Développer (ax + b)²", d: 1, f: (H) => {
      const a = H.ri(1, 6), b = H.nz(-7, 7), c = [a * a, 2 * a * b, b * b];
      return { t: L`Développe et réduis $A = (${H.lin(a, b)})^2$.`, a: { k: "expr", f: (x) => H.pv(c, x), form: "dev" }, r: "A = " + H.poly(c, "x", 1),
        h: [b > 0 ? L`$(a + b)^2 = a^2 + 2ab + b^2$.` : L`$(a - b)^2 = a^2 - 2ab + b^2$.`, L`Ici $a = ${H.lin(a, 0)}$ et $b = ${M.abs(b)}$.`],
        s: [L`$A = (${H.lin(a, 0)})^2 ${b < 0 ? "-" : "+"} 2 \times ${H.lin(a, 0)} \times ${M.abs(b)} + ${M.abs(b)}^2$.`, L`$A = ${H.poly(c)}$.`] };
    } },
    { id: "l31b", n: "Développer (ax + b)(cx + d)", d: 2, f: (H) => {
      const a = H.nz(-5, 5), b = H.nz(-7, 7), c = H.nz(-5, 5), d = H.nz(-7, 7), P = [a * c, a * d + b * c, b * d];
      return { t: L`Développe et réduis $B = (${H.lin(a, b)})(${H.lin(c, d)})$.`, a: { k: "expr", f: (x) => H.pv(P, x), form: "dev" }, r: "B = " + H.poly(P, "x", 1),
        h: ["Multiplie chaque terme de la première parenthèse par chaque terme de la seconde.", "Tu obtiens 4 termes : regroupe ensuite les termes en x."],
        s: [L`$B = ${a * c}x^2 ${H.sg(a * d, "x")} ${H.sg(b * c, "x")} ${H.sg(b * d)}$.`, L`$B = ${H.poly(P)}$.`] };
    } },
    { id: "l31c", n: "Factoriser a² − b²", d: 2, f: (H) => {
      const a = H.ri(1, 7), b = H.ri(1, 9);
      if (H.gcd(a, b) !== 1) { return null; }
      return { t: L`Factorise $C = ${H.poly([a * a, 0, -b * b])}$.`, a: { k: "expr", f: (x) => a * a * x * x - b * b, form: "fact" }, r: "C = (" + H.lin(a, -b) + ")(" + H.lin(a, b) + ")",
        h: [L`Reconnais $a^2 - b^2 = (a - b)(a + b)$.`, L`$${H.poly([a * a, 0, 0])} = (${H.lin(a, 0)})^2$ et $${b * b} = ${b}^2$.`],
        s: [L`$C = (${H.lin(a, 0)})^2 - ${b}^2$.`, L`$C = (${H.lin(a, -b)})(${H.lin(a, b)})$.`] };
    } },
    { id: "l31d", n: "Factoriser avec un facteur commun", d: 3, f: (H) => {
      const a = H.ri(1, 4), b = H.nz(-6, 6), c = H.nz(-4, 4), d = H.nz(-6, 6), e = H.nz(-4, 4), g = H.nz(-6, 6), u = c + e, v = d + g;
      if (!u) { return null; }
      const F = (x) => (a * x + b) * (u * x + v);
      return { t: L`Factorise $D = (${H.lin(a, b)})(${H.lin(c, d)}) + (${H.lin(a, b)})(${H.lin(e, g)})$.`, a: { k: "expr", f: F, form: "fact" }, r: "D = (" + H.lin(a, b) + ")(" + H.lin(u, v) + ")",
        h: [L`Le facteur commun est $(${H.lin(a, b)})$.`, L`$D = (${H.lin(a, b)})\big[(${H.lin(c, d)}) + (${H.lin(e, g)})\big]$.`],
        s: [L`$D = (${H.lin(a, b)})\big[(${H.lin(c, d)}) + (${H.lin(e, g)})\big]$.`, L`$D = (${H.lin(a, b)})(${H.lin(u, v)})$.`] };
    } }
  ]);
})(window);
