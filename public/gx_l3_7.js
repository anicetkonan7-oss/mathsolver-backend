/* MathSolver - Exercices 3e, chapitre 8 : Fonctions linéaires et affines */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("l3", 7, [
    { id: "l37a", n: "Calculer une image", d: 1, f: (H) => {
      const a = H.nz(-6, 6), b = H.ri(-9, 9), k = H.ri(-6, 6), v = a * k + b;
      return { t: L`Soit $f(x) = ${H.lin(a, b)}$. Calcule l'image de $${k}$ par $f$.`, a: { k: "num", v: v }, r: "f(" + H.mt(k) + ") = " + H.mt(v),
        h: [L`L'image de $${k}$ est $f(${k})$ : remplace $x$ par $${k}$.`, L`Calcule $${a} \times ${pw(k)} ${H.sg(b)}$.`],
        s: [L`$f(${k}) = ${a} \times ${pw(k)} ${H.sg(b)} = ${v}$.`] };
    } },
    { id: "l37b", n: "Calculer un antécédent", d: 1, f: (H) => {
      const a = H.nz(-6, 6), b = H.ri(-9, 9), y = H.ri(-12, 12);
      return { t: L`Soit $f(x) = ${H.lin(a, b)}$. Calcule l'antécédent de $${y}$ par $f$.`, a: { k: "num", v: (y - b) / a }, r: "x = " + H.frt(y - b, a),
        h: [L`Résous l'équation $f(x) = ${y}$.`, L`$${H.lin(a, b)} = ${y}$ donne $${H.lin(a, 0)} = ${y - b}$.`],
        s: [L`$${H.lin(a, b)} = ${y} \iff ${H.lin(a, 0)} = ${y - b} \iff x = ${H.fr(y - b, a)}$.`] };
    } },
    { id: "l37c", n: "Coefficient directeur", d: 2, f: (H) => {
      const x1 = H.ri(-5, 5), x2 = H.ri(-5, 5), y1 = H.ri(-9, 9), y2 = H.ri(-9, 9);
      if (x1 === x2) { return null; }
      return { t: L`La droite $(d)$ passe par $A(${x1} \,;\, ${y1})$ et $B(${x2} \,;\, ${y2})$. Calcule son coefficient directeur.`, a: { k: "num", v: (y2 - y1) / (x2 - x1) }, r: "a = " + H.frt(y2 - y1, x2 - x1),
        h: [L`$a = \dfrac{y_B - y_A}{x_B - x_A}$.`, L`Calcule $\dfrac{${y2} - ${pw(y1)}}{${x2} - ${pw(x1)}}$.`],
        s: [L`$a = \dfrac{${y2} - ${pw(y1)}}{${x2} - ${pw(x1)}} = \dfrac{${y2 - y1}}{${x2 - x1}} = ${H.fr(y2 - y1, x2 - x1)}$.`] };
    } },
    { id: "l37d", n: "Trouver une fonction affine", d: 3, f: (H) => {
      const a = H.nz(-5, 5), b = H.ri(-8, 8), x1 = H.ri(-4, 4), x2 = H.ri(-4, 4);
      if (x1 === x2) { return null; }
      const y1 = a * x1 + b, y2 = a * x2 + b;
      return { t: L`$f$ est une fonction affine telle que $f(${x1}) = ${y1}$ et $f(${x2}) = ${y2}$. Donne l'expression de $f(x)$.`, a: { k: "expr", f: (x) => a * x + b }, r: "f(x) = " + H.poly([a, b], "x", 1),
        h: [L`$f(x) = ax + b$ avec $a = \dfrac{f(${x2}) - f(${x1})}{${x2} - ${pw(x1)}}$.`, L`Trouve ensuite $b$ avec $f(${x1}) = ${y1}$.`],
        s: [L`$a = \dfrac{${y2} - ${pw(y1)}}{${x2} - ${pw(x1)}} = ${a}$.`, L`$${a} \times ${pw(x1)} + b = ${y1}$, donc $b = ${b}$.`, L`$f(x) = ${H.poly([a, b])}$.`] };
    } }
  ]);
})(window);
