/* MathSolver - Cours Terminale, chapitre 2 : Dérivabilité et étude de fonctions (2/3) */
MSCOP("lt.1", { s: [
["Méthodes", String.raw`## Méthode 1 : étudier une fonction
1) Donner l'ensemble de définition.
2) Calculer les limites aux bornes et en déduire les asymptotes.
3) Calculer $f'(x)$, la **factoriser**, étudier son signe.
4) Dresser le **tableau de variations** (avec les extremums et les limites).
5) Tracer la courbe, ses asymptotes et quelques tangentes.
## Méthode 2 : équation de la tangente
Calculer $f(a)$ et $f'(a)$, puis écrire $y = f'(a)(x - a) + f(a)$ et développer.
## Méthode 3 : problème d'optimisation
Exprimer la grandeur à optimiser en fonction d'une seule variable, étudier ses variations sur l'intervalle utile, conclure avec le maximum ou le minimum.
[!] Signe de la dérivée :: Pour étudier le signe de $f'$, on la **factorise** et on fait un tableau de signes. Un dénominateur au carré est toujours positif.`],
["Exemples corrigés", String.raw`## Exemple 1 : nombre dérivé par la définition
Soit $f(x) = x^2$. Calculer $f'(3)$ avec la définition.
> $\dfrac{f(3 + h) - f(3)}{h} = \dfrac{9 + 6h + h^2 - 9}{h} = 6 + h$, qui tend vers 6 quand $h \to 0$. Donc $f'(3) = 6$.
## Exemple 2 : tangente
Équation de la tangente à la courbe de $f(x) = x^2$ au point d'abscisse 1.
> $f(1) = 1$ et $f'(x) = 2x$, donc $f'(1) = 2$. Tangente : $y = 2(x - 1) + 1$, soit $y = 2x - 1$.
## Exemple 3 : calculs de dérivées
Dériver $f(x) = (2x + 1)(x^2 - 3)$, $g(x) = \dfrac{3x - 1}{x + 2}$ et $h(x) = \sqrt{x^2 + 1}$.
> $f'(x) = 2(x^2 - 3) + (2x + 1) \times 2x = 6x^2 + 2x - 6$.
> $g'(x) = \dfrac{3(x + 2) - (3x - 1)}{(x + 2)^2} = \dfrac{7}{(x + 2)^2}$.
> $h'(x) = \dfrac{2x}{2\sqrt{x^2 + 1}} = \dfrac{x}{\sqrt{x^2 + 1}}$.
## Exemple 4 : étude complète
Étudier $f(x) = x^3 - 3x + 1$ sur $\mathbb{R}$.
> Limites : $\lim_{x \to -\infty} f(x) = -\infty$ et $\lim_{x \to +\infty} f(x) = +\infty$ (terme dominant $x^3$).
> $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$ : positive à l'extérieur des racines $-1$ et 1, négative entre. $f(-1) = 3$ et $f(1) = -1$.
$$\def\arraystretch{1.6}\begin{array}{c|ccccccc} x & -\infty & & -1 & & 1 & & +\infty \\ \hline f'(x) & & + & 0 & - & 0 & + & \\ \hline f(x) & -\infty & \nearrow & 3 & \searrow & -1 & \nearrow & +\infty \end{array}$$
## Exemple 5 : fonction rationnelle
Étudier les variations de $f(x) = \dfrac{x}{x^2 + 1}$.
> $f'(x) = \dfrac{(x^2 + 1) - x \times 2x}{(x^2 + 1)^2} = \dfrac{1 - x^2}{(x^2 + 1)^2}$, du signe de $1 - x^2$.
> $f$ est décroissante sur $]-\infty \,;\, -1]$ et sur $[1 \,;\, +\infty[$, croissante sur $[-1 \,;\, 1]$. Minimum $f(-1) = -\dfrac{1}{2}$, maximum $f(1) = \dfrac{1}{2}$.
## Exemple 6 : optimisation
Parmi les rectangles de périmètre 20 cm, lequel a la plus grande aire ?
> Si une largeur vaut $x$, l'autre côté vaut $10 - x$ : $A(x) = x(10 - x) = 10x - x^2$ pour $x \in [0 \,;\, 10]$.
> $A'(x) = 10 - 2x$ s'annule en $x = 5$, positive avant, négative après : l'aire est maximale pour $x = 5$.
> C'est le carré de côté 5 cm, d'aire 25 cm².`]
] });
