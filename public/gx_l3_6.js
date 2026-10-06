/* MathSolver - Exercices 3e, chapitre 7 : Trigonométrie */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  const R = M.PI / 180, r1 = (v) => M.round(v * 10) / 10;
  X.add("l3", 6, [
    { id: "l36a", n: "Calculer une longueur", d: 1, f: (H) => {
      const al = H.ri(15, 75), hy = H.ri(4, 15), t = H.pick([0, 1]), v = hy * (t ? M.sin(al * R) : M.cos(al * R)), sd = t ? "BC" : "AB";
      return { t: L`Le triangle $ABC$ est rectangle en $B$, avec $AC = ${hy}$ cm et $\widehat{BAC} = ${al}^\circ$. Calcule $${sd}$, arrondie au dixième.`, a: { k: "num", v: r1(v), tol: 0.051 / M.max(1, r1(v)) }, r: sd + " ≈ " + dec(r1(v)),
        h: [t ? L`$[BC]$ est le côté opposé à l'angle $\widehat{A}$ : utilise le sinus.` : L`$[AB]$ est le côté adjacent à l'angle $\widehat{A}$ : utilise le cosinus.`, t ? L`$\sin \widehat{A} = \dfrac{BC}{AC}$, donc $BC = AC \times \sin \widehat{A}$.` : L`$\cos \widehat{A} = \dfrac{AB}{AC}$, donc $AB = AC \times \cos \widehat{A}$.`],
        s: [L`$${sd} = ${hy} \times ${t ? "\\sin" : "\\cos"} ${al}^\circ$.`, L`$${sd} \approx ${ldec(r1(v))}$ cm.`] };
    } },
    { id: "l36b", n: "Calculer un angle", d: 2, f: (H) => {
      const o = H.ri(2, 12), a = H.ri(2, 12), v = M.round(M.atan(o / a) / R);
      return { t: L`Le triangle $ABC$ est rectangle en $B$, avec $AB = ${a}$ cm et $BC = ${o}$ cm. Calcule l'angle $\widehat{BAC}$, arrondi au degré.`, a: { k: "num", v: v, tol: 0.51 / v }, r: "≈ " + v + "°",
        h: [L`Par rapport à $\widehat{A}$ : $[BC]$ est opposé et $[AB]$ est adjacent. Utilise la tangente.`, L`$\tan \widehat{A} = \dfrac{${o}}{${a}}$, puis utilise la touche $\tan^{-1}$ de la calculatrice.`],
        s: [L`$\tan \widehat{BAC} = \dfrac{BC}{AB} = \dfrac{${o}}{${a}}$.`, L`$\widehat{BAC} \approx ${v}^\circ$.`] };
    } },
    { id: "l36c", n: "Utiliser cos² + sin² = 1", d: 2, f: (H) => {
      const T = H.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [7, 24, 25]]), t = H.pick([0, 1]);
      const g = t ? "\\sin" : "\\cos", o = t ? "\\cos" : "\\sin";
      return { t: L`$x$ est la mesure d'un angle aigu tel que $${g} x = \dfrac{${T[0]}}{${T[2]}}$. Calcule la valeur exacte de $${o} x$.`, a: { k: "num", v: T[1] / T[2] }, r: (t ? "cos x = " : "sin x = ") + T[1] + "/" + T[2],
        h: [L`$\cos^2 x + \sin^2 x = 1$.`, L`Donc $${o}^2 x = 1 - \left(\dfrac{${T[0]}}{${T[2]}}\right)^2$, et $${o} x > 0$ car l'angle est aigu.`],
        s: [L`$${o}^2 x = 1 - \dfrac{${T[0] ** 2}}{${T[2] ** 2}} = \dfrac{${T[1] ** 2}}{${T[2] ** 2}}$.`, L`$${o} x = \dfrac{${T[1]}}{${T[2]}}$.`] };
    } }
  ]);
})(window);
