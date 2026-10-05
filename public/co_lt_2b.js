/* MathSolver - Cours Terminale, chapitre 3 : Primitives (2/3) */
MSCOP("lt.2", { s: [
["Méthodes", String.raw`## Méthode 1 : somme de fonctions usuelles
Chercher une primitive de chaque terme avec le tableau, puis additionner.
## Méthode 2 : reconnaître une forme composée
1) Repérer la fonction « intérieure » $u$ et calculer $u'$.
2) Faire apparaître exactement $u'$, quitte à multiplier et diviser par une constante.
3) Appliquer la formule correspondante.
## Méthode 3 : primitive avec une condition
1) Écrire la forme générale $F(x) + C$.
2) Remplacer $x$ par $x_0$ et résoudre $F(x_0) + C = y_0$ pour trouver $C$.
## Méthode 4 : vérifier
On vérifie toujours une primitive en la **dérivant** : on doit retrouver $f$.
[!] Ajuster les constantes :: Pour $\cos(3x)$, $u = 3x$ et $u' = 3$ : $\cos(3x) = \dfrac{1}{3} \times 3\cos(3x)$, donc une primitive est $\dfrac{1}{3}\sin(3x)$.`],
["Exemples corrigés", String.raw`## Exemple 1 : polynôme
Trouver une primitive de $f(x) = 3x^2 - 4x + 5$.
> $F(x) = x^3 - 2x^2 + 5x$. Vérification : $F'(x) = 3x^2 - 4x + 5$.
## Exemple 2 : puissances négatives
Trouver une primitive de $f(x) = \dfrac{2}{x^2} - 3$ sur $]0 \,;\, +\infty[$.
> $\dfrac{1}{x^2} \mapsto -\dfrac{1}{x}$, donc $F(x) = -\dfrac{2}{x} - 3x$.
## Exemple 3 : forme $u'u^n$
Trouver une primitive de $f(x) = 2x(x^2 + 1)^3$.
> Avec $u = x^2 + 1$, $u' = 2x$ : $f = u'u^3$, donc $F(x) = \dfrac{(x^2 + 1)^4}{4}$.
## Exemple 4 : forme $\dfrac{u'}{\sqrt{u}}$
Trouver une primitive de $f(x) = \dfrac{x}{\sqrt{x^2 + 4}}$.
> Avec $u = x^2 + 4$, $u' = 2x$ : $f(x) = \dfrac{1}{2} \times \dfrac{u'}{\sqrt{u}}$, donc $F(x) = \dfrac{1}{2} \times 2\sqrt{u} = \sqrt{x^2 + 4}$.
## Exemple 5 : avec une condition
Trouver la primitive $F$ de $f(x) = 6x - 1$ telle que $F(1) = 4$.
> $F(x) = 3x^2 - x + C$. $F(1) = 3 - 1 + C = 2 + C = 4$, donc $C = 2$.
> $F(x) = 3x^2 - x + 2$.
## Exemple 6 : ajuster une constante
Trouver une primitive de $f(x) = \cos(3x)$ et de $g(x) = \dfrac{3}{(2x + 1)^2}$.
> $\cos(3x) = \dfrac{1}{3} \times 3\cos(3x)$ : $F(x) = \dfrac{1}{3}\sin(3x)$.
> Avec $u = 2x + 1$, $u' = 2$ : $g = \dfrac{3}{2} \times \dfrac{u'}{u^2}$, donc $G(x) = -\dfrac{3}{2(2x + 1)}$.`]
] });
