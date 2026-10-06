/* MathSolver - Exercices 3e, chapitre 3 : Équations et inéquations */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("l3", 2, [
    { id: "l32a", n: "Équation du premier degré", d: 1, f: (H) => {
      const a = H.nz(-9, 9), b = H.ri(-12, 12), c = H.ri(-12, 12);
      return { t: L`Résous l'équation $${H.lin(a, b)} = ${c}$.`, a: { k: "set", v: [(c - b) / a] }, r: "x = " + H.frt(c - b, a),
        h: [L`Isole $${H.lin(a, 0)}$ : ${b > 0 ? L`soustrais $${b}$ aux deux membres.` : b < 0 ? L`ajoute $${-b}$ aux deux membres.` : "il est déjà seul."}`, L`Divise ensuite par $${a}$.`],
        s: [L`$${H.lin(a, 0)} = ${c} - ${pw(b)} = ${c - b}$.`, L`$x = \dfrac{${c - b}}{${a}}${H.gcd(c - b, a) > 1 || a < 0 ? " = " + H.fr(c - b, a) : ""}$.`] };
    } },
    { id: "l32b", n: "Équation produit nul", d: 2, f: (H) => {
      const a = H.nz(-5, 5), b = H.ri(-9, 9), c = H.nz(-5, 5), d = H.ri(-9, 9), r1 = -b / a, r2 = -d / c;
      if (M.abs(r1 - r2) < 1e-9) { return null; }
      return { t: L`Résous l'équation $(${H.lin(a, b)})(${H.lin(c, d)}) = 0$.`, a: { k: "set", v: [r1, r2] }, r: "x = " + H.frt(-b, a) + " ou x = " + H.frt(-d, c),
        h: ["Un produit est nul si et seulement si l'un de ses facteurs est nul.", L`Résous $${H.lin(a, b)} = 0$, puis $${H.lin(c, d)} = 0$.`],
        s: [L`$${H.lin(a, b)} = 0$ ou $${H.lin(c, d)} = 0$.`, L`$x = ${H.fr(-b, a)}$ ou $x = ${H.fr(-d, c)}$.`] };
    } },
    { id: "l32c", n: "Équation x² = a", d: 2, f: (H) => {
      const t = H.pick([0, 0, 1, 2]), k = H.ri(1, 12), a = t === 0 ? k * k : t === 1 ? H.pick([2, 3, 5, 7, 10, 11]) : -k;
      const V = a < 0 ? [] : [M.sqrt(a), -M.sqrt(a)], q = t === 0 ? String(k) : "√" + a, ql = t === 0 ? String(k) : "\\sqrt{" + a + "}";
      return { t: L`Résous l'équation $x^2 = ${a}$.`, a: { k: "set", v: V }, r: a < 0 ? "S = ∅" : "x = " + q + " ou x = −" + q,
        h: [L`Si $a > 0$, $x^2 = a$ a deux solutions : $\sqrt{a}$ et $-\sqrt{a}$.`, "Si a < 0, un carré ne peut pas être négatif."],
        s: [a < 0 ? L`Un carré est toujours positif ou nul : pas de solution, $S = \varnothing$.` : L`$x = ${ql}$ ou $x = -${ql}$.`] };
    } },
    { id: "l32d", n: "Inéquation du premier degré", d: 3, f: (H) => {
      const a = H.nz(-6, 6), b = H.ri(-10, 10), c = H.ri(-10, 10), op = H.pick(["<", ">", "\\le", "\\ge"]), O = { "<": "<", ">": ">", "\\le": "<=", "\\ge": ">=" }[op];
      const fl = { "<": ">", ">": "<", "<=": ">=", ">=": "<=" }, R = a < 0 ? fl[O] : O, sym = { "<": "<", ">": ">", "<=": "≤", ">=": "≥" }, lt = { "<": "<", ">": ">", "<=": "\\le", ">=": "\\ge" };
      return { t: L`Résous l'inéquation $${H.lin(a, b)} ${op} ${c}$.`, a: { k: "ineq", op: R, v: (c - b) / a }, r: "x " + sym[R] + " " + H.frt(c - b, a),
        h: [L`Isole $${H.lin(a, 0)}$, puis divise par $${a}$.`, a < 0 ? "Attention : diviser par un nombre négatif change le sens de l'inégalité." : "Diviser par un nombre positif ne change pas le sens de l'inégalité."],
        s: [L`$${H.lin(a, 0)} ${op} ${c - b}$.`, L`$x ${lt[R]} ${H.fr(c - b, a)}$${a < 0 ? " (on change le sens car on divise par " + a + ")" : ""}.`] };
    } }
  ]);
})(window);
