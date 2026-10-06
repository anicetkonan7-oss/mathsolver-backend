/* MathSolver - Exercices Terminale, chapitre 5 : Fonction exponentielle */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  X.add("lt", 4, [
    { id: "lt4a", n: "Simplifier avec l'exponentielle", d: 1, f: (H) => {
      const a = H.nz(-5, 6), b = H.nz(-5, 6), c = H.nz(-5, 6), k = a + b - c;
      return { t: L`Écris sous la forme $e^k$ : $A = \dfrac{e^{${a}} \times e^{${b}}}{e^{${c}}}$.`, a: { k: "num", v: M.exp(k) }, r: "A = e^(" + k + ")",
        h: [L`$e^a \times e^b = e^{a+b}$ et $\dfrac{e^a}{e^b} = e^{a-b}$.`, L`Calcule $${a} + ${pw(b)} - ${pw(c)}$.`],
        s: [L`$A = e^{${a} + ${pw(b)} - ${pw(c)}} = e^{${k}}$.`] };
    } },
    { id: "lt4b", n: "Dériver (ax + b)eˣ", d: 2, f: (H) => {
      const a = H.nz(-4, 4), b = H.ri(-6, 6), c = a + b;
      return { t: L`Calcule $f'(x)$ pour $f(x) = (${H.lin(a, b)})e^x$.`, a: { k: "expr", f: (x) => (a * x + c) * M.exp(x) }, r: "f'(x) = (" + H.lin(a, c) + ")e^x",
        h: [L`C'est un produit : $(uv)' = u'v + uv'$, avec $(e^x)' = e^x$.`, L`$f'(x) = ${a}e^x + (${H.lin(a, b)})e^x$ : factorise par $e^x$.`],
        s: [L`$f'(x) = ${a}e^x + (${H.lin(a, b)})e^x$.`, L`$f'(x) = (${H.lin(a, c)})e^x$.`] };
    } },
    { id: "lt4c", n: "Équation avec e²ˣ", d: 3, f: (H) => {
      const p = H.ri(1, 6), q = H.ri(1, 6);
      if (p >= q) { return null; }
      return { t: L`Résous dans $\mathbb{R}$ : $e^{2x} - ${p + q}e^x + ${p * q} = 0$.`, a: { k: "set", v: [M.log(p), M.log(q)] }, r: "x = ln " + p + " ou x = ln " + q,
        h: [L`Pose $X = e^x$ : l'équation devient $X^2 - ${p + q}X + ${p * q} = 0$.`, L`Trouve $X$, puis $x = \ln X$ (avec $X > 0$).`],
        s: [L`Avec $X = e^x$ : $X^2 - ${p + q}X + ${p * q} = 0$, $\Delta = ${(p + q) ** 2 - 4 * p * q}$.`, L`$X = ${p}$ ou $X = ${q}$, donc $x = \ln ${p}$ ou $x = \ln ${q}$.`] };
    } },
    { id: "lt4d", n: "Dériver eᵘ", d: 2, f: (H) => {
      const a = H.nz(-2, 2), b = H.ri(-4, 4), U = H.poly([a, b, 0]), D = H.poly([2 * a, b]);
      return { t: L`Calcule $f'(x)$ pour $f(x) = e^{${U}}$.`, a: { k: "expr", f: (x) => (2 * a * x + b) * M.exp(a * x * x + b * x) }, r: "f'(x) = (" + H.poly([2 * a, b], "x", 1) + ")e^(" + H.poly([a, b, 0], "x", 1) + ")",
        h: [L`$(e^u)' = u'e^u$.`, L`Ici $u(x) = ${U}$, donc $u'(x) = ${D}$.`],
        s: [L`$f'(x) = (${D})e^{${U}}$.`] };
    } },
    { id: "lt4e", n: "Croissances comparées", d: 3, f: (H) => {
      const a = H.ri(1, 5), b = H.ri(-5, 5), t = H.pick([0, 1, 2]);
      const T = [L`\displaystyle\lim_{x \to +\infty} (${H.lin(a, b)})e^{-x}`, L`\displaystyle\lim_{x \to +\infty} \dfrac{e^x}{${H.lin(a, 0)}}`, L`\displaystyle\lim_{x \to -\infty} (${H.lin(a, b)})e^{x}`][t];
      return { t: L`Calcule $${T}$.`, a: { k: "lim", v: t === 1 ? Infinity : 0 }, r: t === 1 ? "+∞" : "0",
        h: [L`Retiens : $\displaystyle\lim_{x \to +\infty} \dfrac{e^x}{x} = +\infty$ et $\displaystyle\lim_{x \to -\infty} xe^x = 0$.`, "L'exponentielle l'emporte sur les puissances de x."],
        s: [t === 1 ? L`$\dfrac{e^x}{${H.lin(a, 0)}} = ${H.fr(1, a)} \times \dfrac{e^x}{x} \to +\infty$.` : L`Par croissances comparées, $xe^{${t ? "x" : "-x"}} \to 0$ et $e^{${t ? "x" : "-x"}} \to 0$.`, L`La limite vaut $${t === 1 ? "+\\infty" : "0"}$.`] };
    } }
  ]);
})(window);
