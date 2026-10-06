/* MathSolver - Exercices 3e, chapitre 11 : Angles */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("l3", 10, [
    { id: "l310a", n: "Angle manquant d'un triangle", d: 1, f: (H) => {
      const a = H.ri(20, 100), b = H.ri(15, 150 - a), c = 180 - a - b;
      return { t: L`Dans le triangle $ABC$, $\widehat{A} = ${a}^\circ$ et $\widehat{B} = ${b}^\circ$. Calcule $\widehat{C}$.`, a: { k: "num", v: c }, r: c + "°",
        h: [L`La somme des angles d'un triangle vaut $180^\circ$.`, L`Calcule $180 - ${a} - ${b}$.`],
        s: [L`$\widehat{C} = 180^\circ - ${a}^\circ - ${b}^\circ = ${c}^\circ$.`] };
    } },
    { id: "l310b", n: "Somme des angles d'un polygone", d: 2, f: (H) => {
      const n = H.ri(4, 12), N = ["", "", "", "", "quadrilatère", "pentagone", "hexagone", "heptagone", "octogone", "ennéagone", "décagone", "hendécagone", "dodécagone"][n], s = (n - 2) * 180;
      return { t: L`Calcule la somme des angles d'un ${N} convexe (polygone à $${n}$ côtés).`, a: { k: "num", v: s }, r: s + "°",
        h: [L`Un polygone convexe à $n$ côtés se découpe en $n - 2$ triangles.`, L`La somme vaut donc $(n - 2) \times 180^\circ$.`],
        s: [L`$(${n} - 2) \times 180^\circ = ${n - 2} \times 180^\circ = ${s}^\circ$.`] };
    } },
    { id: "l310c", n: "Angle inscrit et angle au centre", d: 2, f: (H) => {
      const t = H.pick([0, 1]), a = 2 * H.ri(15, 85);
      return { t: t ? L`Dans un cercle de centre $O$, l'angle au centre $\widehat{AOB}$ mesure $${a}^\circ$. Calcule l'angle inscrit $\widehat{AMB}$ qui intercepte le même arc.` : L`Dans un cercle de centre $O$, l'angle inscrit $\widehat{AMB}$ mesure $${a / 2}^\circ$. Calcule l'angle au centre $\widehat{AOB}$ qui intercepte le même arc.`, a: { k: "num", v: t ? a / 2 : a }, r: (t ? a / 2 : a) + "°",
        h: ["L'angle au centre est le double de l'angle inscrit qui intercepte le même arc.", t ? L`Divise $${a}$ par 2.` : L`Multiplie $${a / 2}$ par 2.`],
        s: [t ? L`$\widehat{AMB} = \dfrac{${a}^\circ}{2} = ${a / 2}^\circ$.` : L`$\widehat{AOB} = 2 \times ${a / 2}^\circ = ${a}^\circ$.`] };
    } },
    { id: "l310d", n: "Angles d'un triangle isocèle", d: 1, f: (H) => {
      const s = 2 * H.ri(10, 80), b = (180 - s) / 2;
      return { t: L`$ABC$ est isocèle en $A$ et $\widehat{BAC} = ${s}^\circ$. Calcule $\widehat{ABC}$.`, a: { k: "num", v: b }, r: b + "°",
        h: [L`Dans un triangle isocèle en $A$, les angles $\widehat{B}$ et $\widehat{C}$ sont égaux.`, L`$\widehat{B} + \widehat{C} = 180^\circ - ${s}^\circ$.`],
        s: [L`$\widehat{B} + \widehat{C} = 180^\circ - ${s}^\circ = ${180 - s}^\circ$.`, L`$\widehat{ABC} = \dfrac{${180 - s}^\circ}{2} = ${b}^\circ$.`] };
    } }
  ]);
})(window);
