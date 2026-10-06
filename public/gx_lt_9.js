/* MathSolver - Exercices Terminale, chapitre 10 : Probabilités */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 9, [
    { id: "lt9a", n: "Probabilité d'une intersection", d: 1, f: (H) => {
      const p = H.ri(2, 8) / 10, q = H.ri(1, 9) / 10, v = p * q;
      return { t: L`On sait que $P(A) = ${ldec(p)}$ et $P_A(B) = ${ldec(q)}$. Calcule $P(A \cap B)$.`, a: { k: "num", v: v }, r: dec(v),
        h: [L`$P(A \cap B) = P(A) \times P_A(B)$.`, "Sur l'arbre, on multiplie les probabilités le long du chemin."],
        s: [L`$P(A \cap B) = ${ldec(p)} \times ${ldec(q)} = ${ldec(v)}$.`] };
    } },
    { id: "lt9b", n: "Probabilités totales", d: 2, f: (H) => {
      const p = H.ri(2, 8) / 10, q1 = H.ri(1, 9) / 10, q2 = H.ri(1, 9) / 10, v = p * q1 + (1 - p) * q2;
      return { t: L`$P(A) = ${ldec(p)}$, $P_A(B) = ${ldec(q1)}$ et $P_{\bar{A}}(B) = ${ldec(q2)}$. Calcule $P(B)$.`, a: { k: "num", v: v }, r: dec(v),
        h: [L`$P(B) = P(A \cap B) + P(\bar{A} \cap B)$.`, L`$P(\bar{A}) = 1 - ${ldec(p)} = ${ldec(1 - p)}$.`],
        s: [L`$P(B) = ${ldec(p)} \times ${ldec(q1)} + ${ldec(1 - p)} \times ${ldec(q2)}$.`, L`$P(B) = ${ldec(p * q1)} + ${ldec((1 - p) * q2)} = ${ldec(v)}$.`] };
    } },
    { id: "lt9c", n: "Inverser un conditionnement", d: 3, f: (H) => {
      const p = H.ri(2, 8) / 10, q1 = H.ri(1, 9) / 10, q2 = H.ri(1, 9) / 10, b = p * q1 + (1 - p) * q2, v = p * q1 / b;
      return { t: L`$P(A) = ${ldec(p)}$, $P_A(B) = ${ldec(q1)}$ et $P_{\bar{A}}(B) = ${ldec(q2)}$. Calcule $P_B(A)$, arrondie au centième.`, a: { k: "num", v: v, tol: 0.006 / M.max(1, v) }, r: "≈ " + dec(+v.toFixed(2)),
        h: [L`$P_B(A) = \dfrac{P(A \cap B)}{P(B)}$.`, "Calcule d'abord P(B) avec la formule des probabilités totales."],
        s: [L`$P(A \cap B) = ${ldec(p * q1)}$ et $P(B) = ${ldec(b)}$.`, L`$P_B(A) = \dfrac{${ldec(p * q1)}}{${ldec(b)}} \approx ${ldec(+v.toFixed(2))}$.`] };
    } },
    { id: "lt9d", n: "Loi binomiale : P(X = k)", d: 2, f: (H) => {
      const n = H.ri(3, 6), k = H.ri(0, n), p = H.pick([0.5, 0.2, 0.3, 0.4]), C = X.C(n, k), v = C * p ** k * (1 - p) ** (n - k);
      return { t: L`$X$ suit la loi binomiale $\mathcal{B}(${n} \,;\, ${ldec(p)})$. Calcule $P(X = ${k})$, arrondie au millième.`, a: { k: "num", v: v, tol: 0.0006 / M.max(v, 1e-9) }, r: "≈ " + dec(+v.toFixed(3)),
        h: [L`$P(X = k) = \dbinom{n}{k}p^k(1 - p)^{n - k}$.`, L`Ici $\dbinom{${n}}{${k}} = ${C}$.`],
        s: [L`$P(X = ${k}) = ${C} \times ${ldec(p)}^{${k}} \times ${ldec(1 - p)}^{${n - k}}$.`, L`$P(X = ${k}) \approx ${ldec(+v.toFixed(3))}$.`] };
    } },
    { id: "lt9e", n: "Espérance d'une loi binomiale", d: 1, f: (H) => {
      const n = H.ri(5, 60), p = H.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75]), v = n * p;
      return { t: L`$X$ suit la loi $\mathcal{B}(${n} \,;\, ${ldec(p)})$. Calcule $E(X)$.`, a: { k: "num", v: v }, r: "E(X) = " + dec(v),
        h: [L`Pour une loi binomiale : $E(X) = np$.`, L`Calcule $${n} \times ${ldec(p)}$.`],
        s: [L`$E(X) = ${n} \times ${ldec(p)} = ${ldec(v)}$.`] };
    } }
  ]);
})(window);
