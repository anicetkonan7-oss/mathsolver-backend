/* MathSolver - Exercices 3e, chapitre 10 : Périmètres et aires */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  const pi = (k) => (k === 1 ? "" : dec(k)) + "π", lpi = (k) => (k === 1 ? "" : ldec(k)) + "\\pi";
  X.add("l3", 9, [
    { id: "l39a", n: "Aire d'un trapèze", d: 1, f: (H) => {
      const B = H.ri(6, 15), b = H.ri(2, B - 1), h = H.ri(2, 10), A = (B + b) * h / 2;
      return { t: L`Un trapèze a pour bases $${B}$ cm et $${b}$ cm, et pour hauteur $${h}$ cm. Calcule son aire.`, a: { k: "num", v: A }, r: dec(A) + " cm²",
        h: [L`$\mathcal{A} = \dfrac{(B + b) \times h}{2}$.`, L`Calcule $\dfrac{(${B} + ${b}) \times ${h}}{2}$.`],
        s: [L`$\mathcal{A} = \dfrac{(${B} + ${b}) \times ${h}}{2} = \dfrac{${(B + b) * h}}{2} = ${ldec(A)}$ cm².`] };
    } },
    { id: "l39b", n: "Aire d'un disque", d: 1, f: (H) => {
      const r = H.ri(1, 12);
      return { t: L`Calcule l'aire d'un disque de rayon $${r}$ cm. Donne la valeur exacte en fonction de $\pi$.`, a: { k: "num", v: r * r * M.PI }, r: pi(r * r) + " cm²",
        h: [L`$\mathcal{A} = \pi r^2$.`, L`$${r}^2 = ${r * r}$.`],
        s: [L`$\mathcal{A} = \pi \times ${r}^2 = ${lpi(r * r)}$ cm².`] };
    } },
    { id: "l39c", n: "Aire d'un losange ou d'un triangle", d: 2, f: (H) => {
      const t = H.pick([0, 1]), a = H.ri(3, 16), b = H.ri(2, 14), A = a * b / 2;
      return { t: t ? L`Un losange a des diagonales de $${a}$ cm et $${b}$ cm. Calcule son aire.` : L`Un triangle a une base de $${a}$ cm et une hauteur de $${b}$ cm. Calcule son aire.`, a: { k: "num", v: A }, r: dec(A) + " cm²",
        h: [t ? L`$\mathcal{A} = \dfrac{D \times d}{2}$.` : L`$\mathcal{A} = \dfrac{\text{base} \times \text{hauteur}}{2}$.`, L`Calcule $\dfrac{${a} \times ${b}}{2}$.`],
        s: [L`$\mathcal{A} = \dfrac{${a} \times ${b}}{2} = ${ldec(A)}$ cm².`] };
    } },
    { id: "l39d", n: "Périmètre d'un cercle", d: 2, f: (H) => {
      const t = H.pick([0, 1]), r = H.ri(1, 15), P = 2 * r;
      return { t: t ? L`Calcule le périmètre d'un cercle de diamètre $${2 * r}$ cm, en fonction de $\pi$.` : L`Calcule le périmètre d'un cercle de rayon $${r}$ cm, en fonction de $\pi$.`, a: { k: "num", v: P * M.PI }, r: pi(P) + " cm",
        h: [L`$\mathcal{P} = 2\pi r = \pi d$.`, t ? L`Le diamètre est $${2 * r}$ cm.` : L`Le rayon est $${r}$ cm.`],
        s: [L`$\mathcal{P} = ${t ? "\\pi \\times " + 2 * r : "2 \\times \\pi \\times " + r} = ${lpi(P)}$ cm.`] };
    } }
  ]);
})(window);
