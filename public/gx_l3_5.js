/* MathSolver - Exercices 3e, chapitre 6 : Théorème de Thalès */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  const cfg = L`Les points $A$, $M$, $B$ sont alignés, ainsi que $A$, $N$, $C$, et les droites $(MN)$ et $(BC)$ sont parallèles.`;
  X.add("l3", 5, [
    { id: "l35a", n: "Calculer une longueur avec Thalès", d: 1, f: (H) => {
      const k = H.pick([[1, 2], [1, 3], [2, 3], [3, 4], [2, 5], [3, 5]]), AB = k[1] * H.ri(2, 4), AM = AB * k[0] / k[1], BC = k[1] * H.ri(2, 5), MN = BC * k[0] / k[1];
      return { t: cfg + L` On donne $AM = ${AM}$ cm, $AB = ${AB}$ cm et $BC = ${BC}$ cm. Calcule $MN$.`, a: { k: "num", v: MN }, r: "MN = " + H.mt(MN),
        h: [L`D'après Thalès : $\dfrac{AM}{AB} = \dfrac{AN}{AC} = \dfrac{MN}{BC}$.`, L`Utilise $\dfrac{AM}{AB} = \dfrac{MN}{BC}$.`],
        s: [L`$\dfrac{${AM}}{${AB}} = \dfrac{MN}{${BC}}$.`, L`$MN = \dfrac{${AM} \times ${BC}}{${AB}} = ${MN}$ cm.`] };
    } },
    { id: "l35b", n: "Calculer AC avec Thalès", d: 2, f: (H) => {
      const k = H.pick([[1, 2], [1, 3], [2, 3], [3, 4], [2, 5], [3, 5], [4, 5]]), AM = k[0] * H.ri(1, 4), AB = AM * k[1] / k[0], AN = k[0] * H.ri(1, 5), AC = AN * k[1] / k[0];
      return { t: cfg + L` On donne $AM = ${AM}$ cm, $AB = ${AB}$ cm et $AN = ${AN}$ cm. Calcule $AC$.`, a: { k: "num", v: AC }, r: "AC = " + H.mt(AC),
        h: [L`D'après Thalès : $\dfrac{AM}{AB} = \dfrac{AN}{AC}$.`, L`Fais un produit en croix : $AC = \dfrac{AN \times AB}{AM}$.`],
        s: [L`$\dfrac{${AM}}{${AB}} = \dfrac{${AN}}{AC}$.`, L`$AC = \dfrac{${AN} \times ${AB}}{${AM}} = ${AC}$ cm.`] };
    } },
    { id: "l35c", n: "Réciproque de Thalès", d: 2, f: (H) => {
      const ok = H.pick([0, 1]), AM = H.ri(2, 6), AB = AM + H.ri(2, 6), AN = H.ri(2, 6), AC0 = AN * AB / AM, AC = ok ? AC0 : AC0 + H.pick([1, -1]);
      if (AC0 !== M.round(AC0)) { return null; }
      if (AC <= AN) { return null; }
      return { t: L`Les points $A$, $M$, $B$ sont alignés dans cet ordre, ainsi que $A$, $N$, $C$. On a $AM = ${AM}$, $AB = ${AB}$, $AN = ${AN}$ et $AC = ${dec(AC)}$. Les droites $(MN)$ et $(BC)$ sont-elles parallèles ? Réponds par oui ou non.`, a: ok ? { k: "word", v: ["oui"], no: ["non", "pas"] } : { k: "word", v: ["non", "pas"], no: ["oui"] }, r: ok ? "Oui, elles sont parallèles." : "Non, elles ne sont pas parallèles.",
        h: [L`Compare les rapports $\dfrac{AM}{AB}$ et $\dfrac{AN}{AC}$.`, "S'ils sont égaux (et les points dans le même ordre), la réciproque de Thalès s'applique."],
        s: [L`$\dfrac{AM}{AB} = \dfrac{${AM}}{${AB}}$ et $\dfrac{AN}{AC} = \dfrac{${AN}}{${ldec(AC)}}$.`, ok ? L`Les rapports sont égaux : $(MN)$ et $(BC)$ sont parallèles.` : L`$${AM} \times ${ldec(AC)} \neq ${AB} \times ${AN}$ : les rapports sont différents, les droites ne sont pas parallèles.`] };
    } }
  ]);
})(window);
