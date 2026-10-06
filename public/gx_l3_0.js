/* MathSolver - Exercices 3e, chapitre 1 : Racines carrées */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  const SF = [2, 3, 5, 6, 7, 10, 11];
  const rt = (k, m) => (k === 1 ? "" : k) + "\\sqrt{" + m + "}", rtT = (k, m) => (k === 1 ? "" : H0(k)) + "√" + m, H0 = (v) => String(v).replace("-", "−");
  X.add("l3", 0, [
    { id: "l30a", n: "Écrire √n sous la forme a√b", d: 1, f: (H) => {
      const k = H.ri(2, 7), m = H.pick(SF), n = k * k * m;
      return { t: L`Écris $\sqrt{${n}}$ sous la forme $a\sqrt{b}$, avec $b$ le plus petit possible.`, a: { k: "num", v: k * M.sqrt(m), form: "rad" }, r: rtT(k, m),
        h: [L`Cherche le plus grand carré parfait qui divise $${n}$.`, L`$${n} = ${k * k} \times ${m}$.`],
        s: [L`$\sqrt{${n}} = \sqrt{${k * k} \times ${m}} = \sqrt{${k * k}} \times \sqrt{${m}} = ${rt(k, m)}$.`] };
    } },
    { id: "l30b", n: "Somme de racines carrées", d: 2, f: (H) => {
      const m = H.pick([2, 3, 5]), p = H.ri(2, 5), q = H.ri(2, 5), a = H.nz(-4, 5), b = H.nz(-4, 5), c = a * p + b * q;
      if (p === q || !c) { return null; }
      return { t: L`Écris $A = ${a === 1 ? "" : a === -1 ? "-" : a}\sqrt{${p * p * m}} ${b < 0 ? "-" : "+"} ${M.abs(b) === 1 ? "" : M.abs(b)}\sqrt{${q * q * m}}$ sous la forme $a\sqrt{${m}}$.`, a: { k: "num", v: c * M.sqrt(m), form: "rad" }, r: "A = " + rtT(c, m),
        h: [L`Simplifie chaque racine : $\sqrt{${p * p * m}} = ${p}\sqrt{${m}}$.`, L`De même, $\sqrt{${q * q * m}} = ${q}\sqrt{${m}}$ ; puis regroupe.`],
        s: [L`$A = ${a} \times ${p}\sqrt{${m}} ${b < 0 ? "-" : "+"} ${M.abs(b)} \times ${q}\sqrt{${m}}$.`, L`$A = ${a * p}\sqrt{${m}} ${b < 0 ? "-" : "+"} ${M.abs(b * q)}\sqrt{${m}} = ${rt(c, m)}$.`] };
    } },
    { id: "l30c", n: "Produit de racines carrées", d: 1, f: (H) => {
      const m = H.pick(SF), u = H.ri(1, 4), v = H.ri(2, 5), a = m * u * u, b = m * v * v;
      if (u === v) { return null; }
      return { t: L`Calcule $B = \sqrt{${a}} \times \sqrt{${b}}$.`, a: { k: "num", v: m * u * v }, r: "B = " + m * u * v,
        h: [L`$\sqrt{a} \times \sqrt{b} = \sqrt{a \times b}$.`, L`$${a} \times ${b} = ${a * b} = ${m * u * v}^2$.`],
        s: [L`$B = \sqrt{${a} \times ${b}} = \sqrt{${a * b}} = ${m * u * v}$.`] };
    } },
    { id: "l30d", n: "Rendre rationnel un dénominateur", d: 3, f: (H) => {
      const b = H.pick([2, 3, 5, 6, 7]), a = H.ri(1, 12), g = H.gcd(a, b), p = a / g, q = b / g;
      return { t: L`Écris $C = \dfrac{${a}}{\sqrt{${b}}}$ sans racine carrée au dénominateur.`, a: { k: "num", v: a / M.sqrt(b), form: "rat" }, r: "C = " + (q === 1 ? rtT(p, b) : (p === 1 ? "" : p) + "√" + b + "/" + q),
        h: [L`Multiplie le numérateur et le dénominateur par $\sqrt{${b}}$.`, L`$\sqrt{${b}} \times \sqrt{${b}} = ${b}$.`],
        s: [L`$C = \dfrac{${a}\sqrt{${b}}}{\sqrt{${b}} \times \sqrt{${b}}} = \dfrac{${a}\sqrt{${b}}}{${b}}$.`, L`$C = ${q === 1 ? rt(p, b) : "\\dfrac{" + rt(p, b) + "}{" + q + "}"}$.`] };
    } }
  ]);
})(window);
