/* MathSolver - Cours Terminale, chapitre 5 : Fonction exponentielle (2/3) */
MSCOP("lt.4", { s: [
["Méthodes", String.raw`## Méthode 1 : simplifier une expression
Utiliser $e^a e^b = e^{a + b}$, $\dfrac{e^a}{e^b} = e^{a - b}$ et $(e^a)^n = e^{na}$.
## Méthode 2 : équation avec exponentielle
- Se ramener à $e^A = e^B$, puis $A = B$.
- Si on a $e^{2x}$ et $e^x$, poser $X = e^x$ (avec $X > 0$) : on obtient une équation du second degré.
## Méthode 3 : inéquation
$e^A < e^B \iff A < B$ ; pour $e^x < k$ avec $k > 0$, on écrit $x < \ln k$.
## Méthode 4 : étudier une fonction avec exp
Dériver avec $(e^u)' = u'e^u$, factoriser par l'exponentielle (toujours positive) : le signe de $f'$ est celui de l'autre facteur.
[!] Exponentielle positive :: $e^x > 0$ pour tout $x$ : une équation $e^x = -2$ n'a pas de solution.`],
["Exemples corrigés", String.raw`## Exemple 1 : simplifier
Simplifier $A = (e^{2x})^3 \times e^{-x}$ et $B = \dfrac{e^{x + 1}}{e^{x - 1}}$.
> $A = e^{6x} \times e^{-x} = e^{5x}$ et $B = e^{(x + 1) - (x - 1)} = e^2$.
## Exemple 2 : équation du second degré en $e^x$
Résoudre $e^{2x} - 3e^x + 2 = 0$.
> On pose $X = e^x > 0$ : $X^2 - 3X + 2 = 0$, soit $(X - 1)(X - 2) = 0$.
> $e^x = 1$ donne $x = 0$ ; $e^x = 2$ donne $x = \ln 2$. Solutions : $0$ et $\ln 2$.
## Exemple 3 : inéquations
Résoudre $e^{3x - 1} > e$ et $e^x < 5$.
> $e^{3x - 1} > e^1 \iff 3x - 1 > 1 \iff x > \dfrac{2}{3}$.
> $e^x < 5 \iff x < \ln 5$ (environ 1,61).
## Exemple 4 : dérivées
Dériver $f(x) = (2x + 1)e^x$ et $g(x) = e^{-x^2}$.
> $f'(x) = 2e^x + (2x + 1)e^x = (2x + 3)e^x$.
> $g'(x) = -2xe^{-x^2}$.
## Exemple 5 : étude de fonction
Étudier $f(x) = xe^{-x}$ sur $\mathbb{R}$.
> $f'(x) = e^{-x} - xe^{-x} = (1 - x)e^{-x}$, du signe de $1 - x$ : $f$ croît sur $]-\infty \,;\, 1]$ et décroît sur $[1 \,;\, +\infty[$.
> Maximum : $f(1) = \dfrac{1}{e}$. Limites : $-\infty$ en $-\infty$, et 0 en $+\infty$ (croissances comparées).
[F] La courbe de $f(x) = xe^{-x}$ : maximum $\dfrac{1}{e}$ en $x = 1$, asymptote $y = 0$ en $+\infty$. :: X -1 5 -1 1 ; F "x*exp(-x)" -0.5 5 c1 b ; P M 1 0.368 n
## Exemple 6 : croissance d'une population
Une population vaut $P(t) = 2\,000\,e^{0{,}03t}$ (avec $t$ en années). Quand aura-t-elle doublé ?
> $2\,000\,e^{0{,}03t} = 4\,000 \iff e^{0{,}03t} = 2 \iff 0{,}03t = \ln 2$.
> $t = \dfrac{\ln 2}{0{,}03} \approx 23{,}1$ : la population double en un peu plus de 23 ans.`]
] });
