/* MathSolver - Exercices 3e, chapitre 4 : Systèmes de deux équations */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  const eq = (H, a, b, c) => (a ? H.lin(a, 0) : "") + (b ? (a ? H.sg(b, "y") : H.lin(b, 0, "y")) : "") + " = " + c;
  const sys = (e1, e2) => L`$$\begin{cases} ${e1} \\ ${e2} \end{cases}$$`;
  X.add("l3", 3, [
    { id: "l33a", n: "Système par substitution", d: 1, f: (H) => {
      const x = H.ri(-6, 6), y = H.ri(-6, 6), a = H.nz(-4, 4), b = H.nz(-4, 4), c = H.nz(-3, 3);
      if (a + b * c === 0) { return null; }
      return { t: L`Résous le système :` + "\n" + sys(L`y = ${H.lin(c, x === 0 ? y : y - c * x)}`, eq(H, a, b, a * x + b * y)), a: { k: "pt", v: [x, y] }, r: "(" + H.mt(x) + " ; " + H.mt(y) + ")",
        h: [L`Remplace $y$ par $${H.lin(c, y - c * x)}$ dans la deuxième équation.`, L`Tu obtiens une équation en $x$ seulement ; trouve $x$, puis $y$.`],
        s: [L`$${a}x + ${pw(b)}(${H.lin(c, y - c * x)}) = ${a * x + b * y}$, soit $${a + b * c}x = ${(a + b * c) * x}$.`, L`$x = ${x}$, puis $y = ${c} \times ${pw(x)} ${H.sg(y - c * x)} = ${y}$.`, L`La solution est le couple $(${x} \,;\, ${y})$.`] };
    } },
    { id: "l33b", n: "Système par combinaison", d: 2, f: (H) => {
      const x = H.ri(-5, 5), y = H.ri(-5, 5), a = H.nz(-5, 5), b = H.nz(-5, 5), c = H.nz(-5, 5), d = H.nz(-5, 5), D = a * d - b * c;
      if (!D) { return null; }
      return { t: L`Résous le système :` + "\n" + sys(eq(H, a, b, a * x + b * y), eq(H, c, d, c * x + d * y)), a: { k: "pt", v: [x, y] }, r: "(" + H.mt(x) + " ; " + H.mt(y) + ")",
        h: ["Multiplie les équations pour que les coefficients de y soient opposés, puis additionne.", L`Par exemple : $${d} \times$ (1) $- ${pw(b)} \times$ (2) élimine $y$.`],
        s: [L`$${d} \times (1) - ${pw(b)} \times (2)$ : $${D}x = ${D * x}$, donc $x = ${x}$.`, L`En remplaçant dans (1) : $${b}y = ${a * x + b * y} - ${pw(a * x)}$, donc $y = ${y}$.`, L`La solution est le couple $(${x} \,;\, ${y})$.`] };
    } }
  ]);
})(window);
