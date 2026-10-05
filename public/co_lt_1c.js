/* MathSolver - Cours Terminale, chapitre 2 : Dérivabilité et étude de fonctions (3/3) */
MSCOP("lt.1", { s: [
["Cas particuliers", String.raw`[R] Tangente horizontale :: Si $f'(a) = 0$, la tangente au point d'abscisse $a$ est horizontale : $y = f(a)$.
[R] Dérivée nulle sans extremum :: $f(x) = x^3$ a $f'(0) = 0$, mais $f'$ ne change pas de signe : il n'y a pas d'extremum en 0.
[R] Point anguleux :: $|x|$ n'est pas dérivable en 0 : la courbe forme un angle. Les dérivées à gauche ($-1$) et à droite ($1$) sont différentes.
[R] Tangente verticale :: $\sqrt{x}$ n'est pas dérivable en 0 : $\dfrac{\sqrt{h}}{h} = \dfrac{1}{\sqrt{h}} \to +\infty$, la tangente est verticale.`],
["Erreurs fréquentes", String.raw`[!] Dérivée d'un produit :: $(uv)' \neq u'v'$. Il faut $u'v + uv'$.
[!] Dérivée d'un quotient :: L'ordre compte : $u'v - uv'$ au numérateur, et non $uv' - u'v$.
[!] Oublier $u'$ :: $(\sqrt{x^2 + 1})' = \dfrac{2x}{2\sqrt{x^2 + 1}}$ : on multiplie par la dérivée de l'intérieur.
[!] Signe non étudié :: Trouver $f'(a) = 0$ ne suffit pas ; il faut le tableau de signes de $f'$.
[!] Tableau incomplet :: Le tableau de variations doit contenir les limites aux bornes et les valeurs des extremums.`],
["À retenir", String.raw`[K] L'essentiel :: $f'(a) = \lim_{h \to 0} \dfrac{f(a + h) - f(a)}{h}$ ; tangente : $y = f'(a)(x - a) + f(a)$. // $(uv)' = u'v + uv'$, $\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$, $(u^n)' = nu'u^{n-1}$. // $f' > 0$ : croissante ; $f' < 0$ : décroissante ; $f'$ change de signe : extremum.
- Factoriser $f'(x)$ pour étudier son signe.
- Tableau de variations : signe de $f'$, flèches, extremums, limites.
- Optimisation : une seule variable, puis étude des variations.`]
], q: [
[String.raw`Dériver $f(x) = 4x^3 - 5x^2 + 2x - 7$.`, String.raw`> $f'(x) = 12x^2 - 10x + 2$.`],
[String.raw`Dériver $f(x) = \dfrac{x + 1}{x - 1}$.`, String.raw`> $f'(x) = \dfrac{1 \times (x - 1) - (x + 1) \times 1}{(x - 1)^2} = \dfrac{-2}{(x - 1)^2}$.`],
[String.raw`Équation de la tangente à la courbe de $f(x) = \dfrac{1}{x}$ au point d'abscisse 2.`, String.raw`> $f(2) = \dfrac{1}{2}$ et $f'(x) = -\dfrac{1}{x^2}$, donc $f'(2) = -\dfrac{1}{4}$.
> $y = -\dfrac{1}{4}(x - 2) + \dfrac{1}{2}$, soit $y = -\dfrac{1}{4}x + 1$.`],
[String.raw`Dériver $f(x) = (x^2 + 3)^5$.`, String.raw`> $f'(x) = 5 \times 2x \times (x^2 + 3)^4 = 10x(x^2 + 3)^4$.`],
[String.raw`Étudier les variations de $f(x) = x^2 - 4x + 1$ et donner son minimum.`, String.raw`> $f'(x) = 2x - 4$ : négative si $x < 2$, positive si $x > 2$.
> $f$ est décroissante sur $]-\infty \,;\, 2]$ et croissante sur $[2 \,;\, +\infty[$ ; son minimum vaut $f(2) = 4 - 8 + 1 = -3$.`],
[String.raw`Dériver $f(x) = \sin(2x)$ et $g(x) = \cos^2 x$.`, String.raw`> $f'(x) = 2\cos(2x)$.
> $g(x) = (\cos x)^2$, donc $g'(x) = 2 \times (-\sin x) \times \cos x = -2\sin x \cos x$.`]
] });
