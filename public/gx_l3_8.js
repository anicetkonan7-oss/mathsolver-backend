/* MathSolver - Exercices 3e, chapitre 9 : Statistiques */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  const sum = (a) => a.reduce((s, v) => s + v, 0), r2 = (v) => M.round(v * 100) / 100;
  X.add("l3", 8, [
    { id: "l38a", n: "Calculer une moyenne", d: 1, f: (H) => {
      const n = H.ri(5, 8), v = [];
      for (let i = 0; i < n; i++) { v.push(H.ri(4, 20)); }
      const m = sum(v) / n, ex2 = r2(m) === m;
      return { t: L`Voici les notes d'un élève : $${v.join(" \\,;\\, ")}$. Calcule sa moyenne${ex2 ? "" : ", arrondie au centième"}.`, a: { k: "num", v: r2(m), tol: ex2 ? 1e-9 : 0.0051 / r2(m) }, r: (ex2 ? "" : "≈ ") + dec(r2(m)),
        h: ["Additionne toutes les notes.", L`Divise la somme par le nombre de notes : $${n}$.`],
        s: [L`Somme : $${sum(v)}$.`, L`Moyenne : $\dfrac{${sum(v)}}{${n}} ${ex2 ? "=" : "\\approx"} ${ldec(r2(m))}$.`] };
    } },
    { id: "l38b", n: "Moyenne pondérée", d: 2, f: (H) => {
      const x = [8, 10, 12, 14, 16].slice(0, H.ri(3, 5)), e = x.map(() => H.ri(1, 9)), S = sum(x.map((v, i) => v * e[i])), N = sum(e), m = S / N, ex2 = r2(m) === m;
      return { t: L`Voici les notes d'une classe et leurs effectifs. Calcule la moyenne de la classe${ex2 ? "" : ", arrondie au centième"}.` + "\n" + tb(x, e, "\\text{Note}", "\\text{Effectif}"), a: { k: "num", v: r2(m), tol: ex2 ? 1e-9 : 0.0051 / r2(m) }, r: (ex2 ? "" : "≈ ") + dec(r2(m)),
        h: ["Multiplie chaque note par son effectif, puis additionne.", L`Divise par l'effectif total : $${N}$.`],
        s: [L`Somme des produits : $${x.map((v, i) => v + " \\times " + e[i]).join(" + ")} = ${S}$.`, L`Moyenne : $\dfrac{${S}}{${N}} ${ex2 ? "=" : "\\approx"} ${ldec(r2(m))}$.`] };
    } },
    { id: "l38c", n: "Calculer une étendue", d: 1, f: (H) => {
      const n = H.ri(6, 9), v = [];
      for (let i = 0; i < n; i++) { v.push(H.ri(2, 40)); }
      const e = M.max(...v) - M.min(...v);
      return { t: L`Voici les âges des membres d'un club : $${v.join(" \\,;\\, ")}$. Calcule l'étendue de cette série.`, a: { k: "num", v: e }, r: String(e),
        h: ["L'étendue est la différence entre la plus grande et la plus petite valeur.", L`La plus grande valeur est $${M.max(...v)}$.`],
        s: [L`Étendue $= ${M.max(...v)} - ${M.min(...v)} = ${e}$.`] };
    } },
    { id: "l38d", n: "Calculer une médiane", d: 2, f: (H) => {
      const n = H.ri(5, 8), v = [];
      for (let i = 0; i < n; i++) { v.push(H.ri(1, 30)); }
      const s = v.slice().sort((a, b) => a - b), md = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
      return { t: L`Détermine la médiane de la série : $${v.join(" \\,;\\, ")}$.`, a: { k: "num", v: md }, r: dec(md),
        h: ["Range d'abord les valeurs dans l'ordre croissant.", n % 2 ? L`Il y a $${n}$ valeurs : la médiane est la $${(n + 1) / 2}$e.` : L`Il y a $${n}$ valeurs : la médiane est la moyenne de la $${n / 2}$e et de la $${n / 2 + 1}$e.`],
        s: [L`Série rangée : $${s.join(" \\,;\\, ")}$.`, L`Médiane : $${ldec(md)}$.`] };
    } }
  ]);
})(window);
