/* MathSolver - Exercices Terminale, chapitre 12 : Géométrie dans l'espace */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  // équation ax + by + cz (+ d) sans terme nul ni coefficient 1 écrit
  const eq = (H, n, d) => { let s = ""; ["x", "y", "z"].forEach((v, i) => { if (n[i]) { s += s ? H.sg(n[i], v) : H.lin(n[i], 0, v); } }); return s + (d === undefined ? "" : H.sg(d)); };
  X.add("lt", 11, [
    { id: "lt11a", n: "Produit scalaire", d: 1, f: (H) => {
      const u = [H.ri(-5, 5), H.ri(-5, 5), H.ri(-5, 5)], v = [H.ri(-5, 5), H.ri(-5, 5), H.ri(-5, 5)], p = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
      return { t: L`Calcule $\vec{u} \cdot \vec{v}$ avec $\vec{u}${vc(u)}$ et $\vec{v}${vc(v)}$.`, a: { k: "num", v: p }, r: H.mt(p),
        h: [L`$\vec{u} \cdot \vec{v} = xx' + yy' + zz'$.`, "Multiplie les coordonnées deux à deux, puis additionne."],
        s: [L`$\vec{u} \cdot \vec{v} = ${pw(u[0])} \times ${pw(v[0])} + ${pw(u[1])} \times ${pw(v[1])} + ${pw(u[2])} \times ${pw(v[2])} = ${p}$.`] };
    } },
    { id: "lt11b", n: "Norme d'un vecteur", d: 1, f: (H) => {
      const T = H.pick([[1, 2, 2], [2, 3, 6], [1, 4, 8], [2, 6, 9], [1, 1, 1], [1, 2, 3], [2, 1, 4], [0, 3, 4]]), u = T.map((v) => v * H.pick([1, -1])), s = u[0] ** 2 + u[1] ** 2 + u[2] ** 2, q = M.round(M.sqrt(s));
      return { t: L`Calcule la norme du vecteur $\vec{u}${vc(u)}$.`, a: { k: "num", v: M.sqrt(s) }, r: q * q === s ? String(q) : "√" + s,
        h: [L`$\|\vec{u}\| = \sqrt{x^2 + y^2 + z^2}$.`, "Additionne les carrés des trois coordonnées."],
        s: [L`$\|\vec{u}\| = \sqrt{${u[0] ** 2} + ${u[1] ** 2} + ${u[2] ** 2}} = \sqrt{${s}}${q * q === s ? " = " + q : ""}$.`] };
    } },
    { id: "lt11c", n: "Équation d'un plan", d: 2, f: (H) => {
      const A = [H.ri(-4, 4), H.ri(-4, 4), H.ri(-4, 4)], n = [H.nz(-4, 4), H.ri(-4, 4), H.nz(-4, 4)], d = -(n[0] * A[0] + n[1] * A[1] + n[2] * A[2]), E = eq(H, n, d) + " = 0";
      return { t: L`Donne une équation du plan passant par $A(${A.join(" \\,;\\, ")})$ et de vecteur normal $\vec{n}${vc(n)}$.`, a: { k: "lin", v: [n[0], n[1], n[2], d] }, r: E.replace(/-/g, "−"),
        h: [L`Le plan a une équation $${eq(H, n)} + d = 0$.`, "Trouve d en remplaçant x, y, z par les coordonnées de A."],
        s: [L`Avec $A$ : $${n[0]} \times ${pw(A[0])} + ${pw(n[1])} \times ${pw(A[1])} + ${pw(n[2])} \times ${pw(A[2])} + d = 0$, donc $d = ${d}$.`, L`$${E}$.`] };
    } },
    { id: "lt11d", n: "Distance d'un point à un plan", d: 2, f: (H) => {
      const T = H.pick([[1, 2, 2, 3], [2, 1, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [0, 3, 4, 5], [2, 2, 1, 3]]), n = T.slice(0, 3).map((v) => v * H.pick([1, -1])), d = H.ri(-6, 6), P = [H.ri(-4, 4), H.ri(-4, 4), H.ri(-4, 4)];
      const N = M.abs(n[0] * P[0] + n[1] * P[1] + n[2] * P[2] + d);
      return { t: L`Calcule la distance du point $M(${P.join(" \\,;\\, ")})$ au plan $\mathcal{P} : ${eq(H, n, d)} = 0$.`, a: { k: "num", v: N / T[3] }, r: "d = " + H.frt(N, T[3]),
        h: [L`$d = \dfrac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}$.`, L`Ici $\sqrt{a^2 + b^2 + c^2} = ${T[3]}$.`],
        s: [L`Numérateur : $|${n[0] * P[0]} + ${pw(n[1] * P[1])} + ${pw(n[2] * P[2])} + ${pw(d)}| = ${N}$.`, L`$d = \dfrac{${N}}{${T[3]}}${N % T[3] ? "" : " = " + N / T[3]}$.`] };
    } },
    { id: "lt11e", n: "Intersection d'une droite et d'un plan", d: 3, f: (H) => {
      const A = [H.ri(-3, 3), H.ri(-3, 3), H.ri(-3, 3)], u = [H.ri(-2, 2), H.ri(-2, 2), H.nz(-2, 2)], n = [H.ri(-2, 2), H.ri(-2, 2), H.nz(-2, 2)], t0 = H.nz(-2, 3);
      const nu = n[0] * u[0] + n[1] * u[1] + n[2] * u[2]; if (!nu) { return null; }
      const I = A.map((v, i) => v + t0 * u[i]), k = n[0] * I[0] + n[1] * I[1] + n[2] * I[2], co = (a, v) => (a ? a + (v ? H.sg(v, "t") : "") : (v ? H.lin(v, 0, "t") : "0"));
      return { t: L`La droite $D$ : $x = ${co(A[0], u[0])}$, $y = ${co(A[1], u[1])}$, $z = ${co(A[2], u[2])}$ ($t \in \mathbb{R}$) coupe le plan $\mathcal{P} : ${eq(H, n)} = ${k}$. Donne les coordonnées du point d'intersection.`, a: { k: "pt", v: I }, r: "(" + I.map(H.mt).join(" ; ") + ")",
        h: ["Remplace x, y et z par leurs expressions en t dans l'équation du plan.", L`Tu dois trouver $t = ${t0}$.`],
        s: [L`En remplaçant : $${nu}t + ${pw(n[0] * A[0] + n[1] * A[1] + n[2] * A[2])} = ${k}$, donc $t = ${t0}$.`, L`Le point est $I(${I.join(" \\,;\\, ")})$.`] };
    } }
  ]);
})(window);
