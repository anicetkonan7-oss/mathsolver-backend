/* MathSolver - Exercices Terminale, chapitre 13 : Arithmétique (série C) */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 12, [
    { id: "lt12a", n: "Calculer un PGCD", d: 1, f: (H) => {
      const g = H.ri(2, 30), m = H.ri(2, 25), n = H.ri(2, 25);
      if (H.gcd(m, n) !== 1 || m === n) { return null; }
      const a = g * M.max(m, n), b = g * M.min(m, n), st = [];
      let x = a, y = b;
      while (y) { st.push(L`$${x} = ${y} \times ${M.floor(x / y)} + ${x % y}$`); [x, y] = [y, x % y]; }
      return { t: L`Calcule $\text{PGCD}(${a}, ${b})$ avec l'algorithme d'Euclide.`, a: { k: "num", v: g }, r: String(g),
        h: [L`Fais des divisions euclidiennes successives : $\text{PGCD}(a, b) = \text{PGCD}(b, r)$.`, "Le PGCD est le dernier reste non nul."],
        s: st.concat([L`Le dernier reste non nul est $${g}$.`]) };
    } },
    { id: "lt12b", n: "Reste d'une grande puissance", d: 2, f: (H) => {
      const m = H.pick([5, 7, 9, 11, 13]), a = H.ri(2, 12), n = H.ri(25, 2030);
      if (H.gcd(a, m) !== 1 || a % m === 1) { return null; }
      let p = 1; while (mp(a, p, m) !== 1) { p++; }
      const r = mp(a, n, m);
      return { t: L`Quel est le reste de la division de $${a}^{${n}}$ par $${m}$ ?`, a: { k: "num", v: r }, r: String(r),
        h: [L`Cherche la plus petite puissance $p$ telle que $${a}^p \equiv 1 \ [${m}]$.`, L`Ici $${a}^{${p}} \equiv 1 \ [${m}]$ : écris $${n} = ${p}q + r$.`],
        s: [L`$${a}^{${p}} \equiv 1 \ [${m}]$ et $${n} = ${p} \times ${M.floor(n / p)} + ${n % p}$.`, L`$${a}^{${n}} \equiv ${a}^{${n % p}} \equiv ${r} \ [${m}]$ : le reste est $${r}$.`] };
    } },
    { id: "lt12c", n: "Résoudre ax ≡ b [n]", d: 2, f: (H) => {
      const m = H.pick([5, 7, 11, 13]), a = H.ri(2, m - 1), b = H.ri(1, m - 1);
      let inv = 1; while (a * inv % m !== 1) { inv++; }
      const x = b * inv % m;
      return { t: L`Résous dans $\mathbb{Z}$ : $${a}x \equiv ${b} \ [${m}]$.`, a: { k: "mod", v: x, m: m }, r: "x ≡ " + x + " [" + m + "]",
        h: [L`Cherche un entier $k$ tel que $${a}k \equiv 1 \ [${m}]$ (un inverse de $${a}$).`, L`$${a} \times ${inv} = ${a * inv} \equiv 1 \ [${m}]$ : multiplie par $${inv}$.`],
        s: [L`$${a} \times ${inv} \equiv 1 \ [${m}]$, donc $x \equiv ${b} \times ${inv} \equiv ${x} \ [${m}]$.`, L`Les solutions sont $x = ${x} + ${m}k$, $k \in \mathbb{Z}$.`] };
    } },
    { id: "lt12d", n: "Division euclidienne", d: 1, f: (H) => {
      const b = H.ri(3, 30), a = H.ri(-300, 900), q = M.floor(a / b), r = a - b * q;
      return { t: L`Donne le reste de la division euclidienne de $${a}$ par $${b}$.`, a: { k: "num", v: r }, r: String(r),
        h: [L`Écris $a = bq + r$ avec $0 \le r < b$.`, a < 0 ? "Attention : le reste est toujours positif, même si a est négatif." : L`Cherche le plus grand multiple de $${b}$ inférieur ou égal à $${a}$.`],
        s: [L`$${a} = ${b} \times ${pw(q)} + ${r}$, avec $0 \le ${r} < ${b}$.`, L`Le reste est $${r}$.`] };
    } },
    { id: "lt12e", n: "Coefficients de Bézout", d: 3, f: (H) => {
      const a = H.ri(7, 60), b = H.ri(5, 40);
      if (H.gcd(a, b) !== 1 || a <= b) { return null; }
      let r0 = a, r1 = b, u0 = 1, u1 = 0, v0 = 0, v1 = 1;
      while (r1) { const q = M.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [u0, u1] = [u1, u0 - q * u1]; [v0, v1] = [v1, v0 - q * v1]; }
      return { t: L`Trouve deux entiers $u$ et $v$ tels que $${a}u + ${b}v = 1$.`, a: { k: "pred", p: (t) => t.length === 2 && a * t[0] + b * t[1] === 1 }, r: "u = " + H.mt(u0) + " et v = " + H.mt(v0),
        h: ["Applique l'algorithme d'Euclide, puis remonte les calculs.", L`$\text{PGCD}(${a}, ${b}) = 1$ : de tels entiers existent (théorème de Bézout).`],
        s: [L`En remontant l'algorithme d'Euclide : $${a} \times ${pw(u0)} + ${b} \times ${pw(v0)} = 1$.`, L`Donc $u = ${u0}$ et $v = ${v0}$ conviennent (il y en a d'autres).`] };
    } }
  ]);
})(window);
