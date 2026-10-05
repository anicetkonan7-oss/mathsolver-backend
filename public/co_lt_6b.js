/* MathSolver - Cours Terminale, chapitre 7 : Calcul intégral (2/3) */
MSCOP("lt.6", { s: [
["Méthodes", String.raw`## Méthode 1 : calculer une intégrale
1) Trouver une primitive $F$ de $f$.
2) Calculer $F(b) - F(a)$ en écrivant $\big[F(x)\big]_a^b$.
## Méthode 2 : calculer une aire
1) Étudier le signe de $f$ sur l'intervalle (ou de $f - g$ pour deux courbes).
2) Découper l'intervalle si le signe change, et prendre l'opposé des intégrales négatives.
3) Convertir en cm² si l'unité graphique est donnée.
## Méthode 3 : intégration par parties
Choisir $u$ facile à dériver (souvent $x$ ou $\ln x$) et $v'$ facile à primitiver (souvent $e^x$, $\cos x$, 1).
## Méthode 4 : valeur moyenne
Calculer l'intégrale, puis la diviser par la longueur $b - a$ de l'intervalle.
[!] Aire et intégrale :: Une aire est toujours positive ; une intégrale peut être négative. Il faut tenir compte du signe de la fonction.`],
["Exemples corrigés", String.raw`## Exemple 1 : polynôme
Calculer $\int_0^1 (2x + 1)\,dx$.
> $\int_0^1 (2x + 1)\,dx = \big[x^2 + x\big]_0^1 = (1 + 1) - 0 = 2$.
## Exemple 2 : logarithme et exponentielle
Calculer $\int_1^e \dfrac{1}{x}\,dx$ et $\int_0^{\ln 2} e^x\,dx$.
> $\int_1^e \dfrac{1}{x}\,dx = \big[\ln x\big]_1^e = 1 - 0 = 1$.
> $\int_0^{\ln 2} e^x\,dx = \big[e^x\big]_0^{\ln 2} = 2 - 1 = 1$.
## Exemple 3 : aire en cm²
Calculer l'aire sous la courbe de $f(x) = x^2$ entre 0 et 2, avec une unité graphique de 2 cm.
> $\int_0^2 x^2\,dx = \left[\dfrac{x^3}{3}\right]_0^2 = \dfrac{8}{3}$ u.a. Ici 1 u.a. $= 2 \times 2 = 4$ cm².
> Aire $= \dfrac{8}{3} \times 4 = \dfrac{32}{3} \approx 10{,}67$ cm².
## Exemple 4 : valeur moyenne
Calculer la valeur moyenne de $f(x) = x^2$ sur $[0 \,;\, 3]$.
> $\mu = \dfrac{1}{3}\int_0^3 x^2\,dx = \dfrac{1}{3} \times \left[\dfrac{x^3}{3}\right]_0^3 = \dfrac{1}{3} \times 9 = 3$.
## Exemple 5 : intégration par parties
Calculer $\int_0^1 xe^x\,dx$.
> On pose $u = x$, $v' = e^x$, donc $u' = 1$, $v = e^x$.
> $\int_0^1 xe^x\,dx = \big[xe^x\big]_0^1 - \int_0^1 e^x\,dx = e - (e - 1) = 1$.
## Exemple 6 : aire entre deux courbes
Calculer l'aire entre les courbes de $y = x$ et $y = x^2$ sur $[0 \,;\, 1]$.
> Sur $[0 \,;\, 1]$, $x \geq x^2$. Aire $= \int_0^1 (x - x^2)\,dx = \left[\dfrac{x^2}{2} - \dfrac{x^3}{3}\right]_0^1 = \dfrac{1}{2} - \dfrac{1}{3} = \dfrac{1}{6}$ u.a.`]
] });
