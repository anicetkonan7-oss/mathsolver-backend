/* MathSolver - Exercices 3e, chapitre 12 : Volumes */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  const pi = (p, q) => (p === q ? "" : H0(p, q)) + "π", lpi = (p, q) => (p === q ? "" : w.MSGXH.fr(p, q)) + "\\pi", H0 = (p, q) => w.MSGXH.frt(p, q);
  X.add("l3", 11, [
    { id: "l311a", n: "Volume d'un cylindre", d: 1, f: (H) => {
      const r = H.ri(1, 8), h = H.ri(2, 15), k = r * r * h;
      return { t: L`Calcule le volume d'un cylindre de rayon $${r}$ cm et de hauteur $${h}$ cm, en fonction de $\pi$.`, a: { k: "num", v: k * M.PI }, r: pi(k, 1) + " cm³",
        h: [L`$V = \pi r^2 h$.`, L`$${r}^2 \times ${h} = ${k}$.`],
        s: [L`$V = \pi \times ${r}^2 \times ${h} = ${lpi(k, 1)}$ cm³.`] };
    } },
    { id: "l311b", n: "Volume d'un cône", d: 2, f: (H) => {
      const r = H.ri(1, 9), h = H.ri(2, 15), k = r * r * h;
      return { t: L`Calcule le volume d'un cône de rayon $${r}$ cm et de hauteur $${h}$ cm, en fonction de $\pi$.`, a: { k: "num", v: k * M.PI / 3 }, r: pi(k, 3) + " cm³",
        h: [L`$V = \dfrac{1}{3}\pi r^2 h$.`, L`$${r}^2 \times ${h} = ${k}$.`],
        s: [L`$V = \dfrac{1}{3} \times \pi \times ${r}^2 \times ${h} = \dfrac{${k}}{3}\pi${k % 3 ? "" : " = " + lpi(k, 3)}$ cm³.`] };
    } },
    { id: "l311c", n: "Volume d'une sphère", d: 2, f: (H) => {
      const r = H.ri(1, 9), k = 4 * r ** 3;
      return { t: L`Calcule le volume d'une boule de rayon $${r}$ cm, en fonction de $\pi$.`, a: { k: "num", v: k * M.PI / 3 }, r: pi(k, 3) + " cm³",
        h: [L`$V = \dfrac{4}{3}\pi r^3$.`, L`$${r}^3 = ${r ** 3}$.`],
        s: [L`$V = \dfrac{4}{3} \times \pi \times ${r}^3 = \dfrac{${k}}{3}\pi${k % 3 ? "" : " = " + lpi(k, 3)}$ cm³.`] };
    } },
    { id: "l311d", n: "Volume d'une pyramide", d: 1, f: (H) => {
      const c = H.ri(2, 12), h = H.ri(3, 15), V = c * c * h / 3;
      return { t: L`Une pyramide a pour base un carré de côté $${c}$ cm et pour hauteur $${h}$ cm. Calcule son volume.`, a: { k: "num", v: V }, r: H.frt(c * c * h, 3) + " cm³",
        h: [L`$V = \dfrac{\text{aire de la base} \times \text{hauteur}}{3}$.`, L`L'aire de la base est $${c}^2 = ${c * c}$ cm².`],
        s: [L`$V = \dfrac{${c * c} \times ${h}}{3} = ${H.fr(c * c * h, 3)}$ cm³.`] };
    } }
  ]);
})(window);
