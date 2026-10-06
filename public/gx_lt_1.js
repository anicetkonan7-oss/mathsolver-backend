/* MathSolver - Exercices Terminale, chapitre 2 : Dérivabilité et étude de fonctions */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 1, [
    { id: "lt1a", n: "Dériver un polynôme", d: 1, f: (H) => {
      const c = [H.nz(-4, 4), H.ri(-6, 6), H.ri(-9, 9), H.ri(-9, 9)], d = H.dp(c);
      return { t: L`Calcule $f'(x)$ pour $f(x) = ${H.poly(c)}$.`, a: { k: "expr", f: (x) => H.pv(d, x) }, r: "f'(x) = " + H.poly(d, "x", 1),
        h: [L`Dérive terme à terme : $(x^n)' = nx^{n-1}$.`, L`La dérivée d'une constante est 0.`],
        s: [L`$f'(x) = ${H.poly(d)}$.`] };
    } },
    { id: "lt1b", n: "Dériver un quotient", d: 2, f: (H) => {
      const a = H.nz(-5, 5), b = H.ri(-6, 6), c = H.nz(-3, 3), d = H.ri(-6, 6), k = a * d - b * c;
      if (!k) { return null; }
      const U = H.lin(a, b), V = H.lin(c, d);
      return { t: L`Calcule $f'(x)$ pour $f(x) = \dfrac{${U}}{${V}}$.`, a: { k: "expr", f: (x) => k / M.pow(c * x + d, 2) }, r: H.mt(k) + "/(" + V + ")²",
        h: [L`Utilise $\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$.`, L`Ici $u' = ${a}$ et $v' = ${c}$.`],
        s: [L`$f'(x) = \dfrac{${a}(${V}) - ${c}(${U})}{(${V})^2}$.`, L`$f'(x) = \dfrac{${k}}{(${V})^2}$.`],
        z: () => { const g = (x) => (a * x + b) / (c * x + d), x = 0.37 - d / c; return M.abs((g(x + 1e-5) - g(x - 1e-5)) / 2e-5 - k / M.pow(c * x + d, 2)) < 1e-4; } };
    } },
    { id: "lt1c", n: "Équation de la tangente", d: 2, f: (H) => {
      const b = H.ri(-6, 6), c = H.ri(-6, 6), x0 = H.ri(-3, 3), y0 = x0 * x0 + b * x0 + c, m = 2 * x0 + b, p = y0 - m * x0;
      return { t: L`Soit $f(x) = ${H.poly([1, b, c])}$. Donne l'équation de la tangente à la courbe de $f$ au point d'abscisse $${x0}$.`, a: { k: "lin", v: [m, -1, 0, p] }, r: "y = " + H.poly([m, p], "x", 1),
        h: [L`La tangente en $a$ a pour équation $y = f'(a)(x - a) + f(a)$.`, L`Calcule $f(${x0})$ et $f'(${x0})$ avec $f'(x) = ${H.poly([2, b])}$.`],
        s: [L`$f'(x) = ${H.poly([2, b])}$, donc $f'(${x0}) = ${m}$ et $f(${x0}) = ${y0}$.`, L`$y = ${m}(x ${x0 < 0 ? "+" : "-"} ${M.abs(x0)}) ${y0 < 0 ? "-" : "+"} ${M.abs(y0)}$, soit $y = ${H.poly([m, p])}$.`] };
    } },
    { id: "lt1d", n: "Résoudre f′(x) = 0", d: 3, f: (H) => {
      const k = H.ri(1, 4), c = H.ri(-5, 5), K = 3 * k * k;
      return { t: L`Soit $f(x) = ${H.poly([1, 0, -K, c])}$. Résous $f'(x) = 0$.`, a: { k: "set", v: [k, -k] }, r: "x = " + k + " ou x = −" + k,
        h: [L`Commence par calculer $f'(x)$.`, L`$f'(x) = 3x^2 - ${K}$ : factorise par 3.`],
        s: [L`$f'(x) = 3x^2 - ${K} = 3(x^2 - ${k * k})$.`, L`$f'(x) = 0 \iff x^2 = ${k * k} \iff x = ${k}$ ou $x = -${k}$.`] };
    } }
  ]);
})(window);
