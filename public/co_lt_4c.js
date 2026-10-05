/* MathSolver - Cours Terminale, chapitre 5 : Fonction exponentielle (3/3) */
MSCOP("lt.4", { s: [
["Cas particuliers", String.raw`[R] Tangente en 0 :: La tangente à la courbe de exp en 0 est $y = x + 1$ ; la courbe est au-dessus : $e^x \geq x + 1$.
[R] Fonctions $x \mapsto e^{kx}$ :: Si $k > 0$, elle est croissante ; si $k < 0$, décroissante. Sa dérivée est $ke^{kx}$.
[R] Puissances de a :: Pour $a > 0$ : $a^x = e^{x\ln a}$. Exemple : $2^x = e^{x\ln 2}$.
[R] Croissances comparées :: En $+\infty$, l'exponentielle l'emporte sur toute puissance de $x$ : $\lim \dfrac{e^x}{x^n} = +\infty$.`],
["Erreurs fréquentes", String.raw`[!] Exponentielle d'une somme :: $e^{a + b} = e^a \times e^b$, et non $e^a + e^b$.
[!] Oublier $u'$ :: $(e^{3x})' = 3e^{3x}$, et non $e^{3x}$.
[!] Oublier $X > 0$ :: En posant $X = e^x$, une solution $X$ négative est à rejeter.
[!] Limite en $-\infty$ :: $\lim_{x \to -\infty} e^x = 0$, et non $-\infty$ : l'exponentielle reste positive.
[!] Puissance :: $(e^x)^2 = e^{2x}$, et non $e^{x^2}$.`],
["À retenir", String.raw`[K] L'essentiel :: $e^x > 0$, $e^0 = 1$, $(e^x)' = e^x$, $(e^u)' = u'e^u$. // $e^{a + b} = e^ae^b$ ; $e^{-a} = \dfrac{1}{e^a}$ ; $\ln(e^x) = x$ ; $e^{\ln x} = x$. // $\lim_{+\infty} e^x = +\infty$ ; $\lim_{-\infty} e^x = 0$ ; $\lim_{+\infty} \dfrac{e^x}{x} = +\infty$ ; $\lim_{-\infty} xe^x = 0$.
- Équations : $e^A = e^B \iff A = B$, ou poser $X = e^x$.
- Signe de $f'$ : factoriser par l'exponentielle, toujours positive.
- Primitive de $u'e^u$ : $e^u$.`]
], q: [
[String.raw`Simplifier $\dfrac{e^{3x} \times e^{-x}}{e^x}$.`, String.raw`> $\dfrac{e^{3x - x}}{e^x} = e^{2x - x} = e^x$.`],
[String.raw`Résoudre $e^{2x + 1} = 1$.`, String.raw`> $e^{2x + 1} = e^0$, donc $2x + 1 = 0$ et $x = -\dfrac{1}{2}$.`],
[String.raw`Résoudre $e^{2x} - e^x - 6 = 0$.`, String.raw`> On pose $X = e^x > 0$ : $X^2 - X - 6 = 0$, soit $(X - 3)(X + 2) = 0$.
> $X = -2$ est rejeté ; $e^x = 3$ donne $x = \ln 3$.`],
[String.raw`Dériver $f(x) = e^{3x - 2}$ et $g(x) = x^2e^x$.`, String.raw`> $f'(x) = 3e^{3x - 2}$.
> $g'(x) = 2xe^x + x^2e^x = (x^2 + 2x)e^x$.`],
[String.raw`Trouver une primitive de $f(x) = 2xe^{x^2}$.`, String.raw`> Avec $u = x^2$, $u' = 2x$ : $f = u'e^u$, donc $F(x) = e^{x^2}$.`],
[String.raw`Calculer $\lim_{x \to +\infty} (e^x - x)$.`, String.raw`> $e^x - x = e^x\left(1 - \dfrac{x}{e^x}\right)$. Comme $\dfrac{x}{e^x} \to 0$, la parenthèse tend vers 1.
> La limite vaut $+\infty$.`]
] });
