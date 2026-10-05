/* MathSolver - Cours Terminale, chapitre 7 : Calcul intégral (1/3) */
MSCOP("lt.6", { t: "Calcul intégral", s: [
["Introduction", String.raw`L'**intégrale** d'une fonction positive sur un intervalle mesure l'**aire** du domaine situé sous sa courbe. Elle se calcule avec une primitive. Elle sert à calculer des aires, des volumes, des valeurs moyennes, des distances parcourues.
[R] Dans la vie courante :: La distance parcourue par un véhicule est l'intégrale de sa vitesse ; la consommation électrique d'une journée est l'intégrale de la puissance utilisée.`],
["Définitions", String.raw`[D] Intégrale :: Soit $f$ continue sur $[a \,;\, b]$ et $F$ une primitive de $f$. L'intégrale de $f$ de $a$ à $b$ est le nombre : // $\int_a^b f(x)\,dx = F(b) - F(a) = \big[F(x)\big]_a^b$
[D] Interprétation graphique :: Si $f \geq 0$ sur $[a \,;\, b]$, $\int_a^b f(x)\,dx$ est l'**aire** (en unités d'aire) du domaine compris entre la courbe, l'axe des abscisses et les droites $x = a$ et $x = b$.
[F] Aire sous la courbe de $f(x) = x^2$ entre 0 et 2 : $\int_0^2 x^2\,dx = \dfrac{8}{3}$ unités d'aire. :: X 0 3 0 5 ; Z "x^2" 0 2 c1 ; F "x^2" 0 2.2 c1 b ; L 1.5 0.7 "8/3 u.a." c1
[D] Unité d'aire :: L'unité d'aire (u.a.) est l'aire du rectangle construit sur les unités des deux axes. Si l'unité vaut 2 cm sur chaque axe, 1 u.a. $= 4$ cm².
[R] Signe :: Si $f \leq 0$, l'intégrale est **négative** : elle vaut l'opposé de l'aire.
[F] Pour $f(x) = x - 1$ sur $[0 \,;\, 3]$ : la partie sous l'axe (orange) compte négativement. $\int_0^3 (x - 1)\,dx = 2 - 0{,}5 = 1{,}5$. :: X 0 3 -1 2 ; Z "x-1" 0 1 c2 ; Z "x-1" 1 3 c1 ; F "x-1" 0 3 c1 b`],
["Propriétés", String.raw`[P] Linéarité :: $\int_a^b (\alpha f + \beta g) = \alpha\int_a^b f + \beta\int_a^b g$.
[P] Relation de Chasles :: $\int_a^b f + \int_b^c f = \int_a^c f$. En particulier $\int_a^a f = 0$ et $\int_b^a f = -\int_a^b f$.
[P] Positivité et ordre :: Si $a \leq b$ et $f \geq 0$ sur $[a \,;\, b]$, alors $\int_a^b f \geq 0$. Si $f \leq g$, alors $\int_a^b f \leq \int_a^b g$.
[P] Valeur moyenne :: La valeur moyenne de $f$ sur $[a \,;\, b]$ est $\mu = \dfrac{1}{b - a}\int_a^b f(x)\,dx$.
[P] Intégration par parties :: $\int_a^b u(x)v'(x)\,dx = \big[u(x)v(x)\big]_a^b - \int_a^b u'(x)v(x)\,dx$.
[P] Aire entre deux courbes :: Si $f \geq g$ sur $[a \,;\, b]$, l'aire entre les deux courbes vaut $\int_a^b (f - g)$.
[F] Aire entre les courbes de $y = x$ et $y = x^2$ sur $[0 \,;\, 1]$ : elle vaut $\dfrac{1}{6}$ u.a. :: X 0 1 0 1 ; p a0 0 0 ; p a1 0.1 0.1 ; p a2 0.2 0.2 ; p a3 0.3 0.3 ; p a4 0.4 0.4 ; p a5 0.5 0.5 ; p a6 0.6 0.6 ; p a7 0.7 0.7 ; p a8 0.8 0.8 ; p a9 0.9 0.9 ; p a10 1 1 ; p b10 1 1 ; p b9 0.9 0.81 ; p b8 0.8 0.64 ; p b7 0.7 0.49 ; p b6 0.6 0.36 ; p b5 0.5 0.25 ; p b4 0.4 0.16 ; p b3 0.3 0.09 ; p b2 0.2 0.04 ; p b1 0.1 0.01 ; p b0 0 0 ; G a0 a1 a2 a3 a4 a5 a6 a7 a8 a9 a10 b10 b9 b8 b7 b6 b5 b4 b3 b2 b1 b0 c1 ; F "x" 0 1 c2 b ; F "x^2" 0 1 c1 b`]
] });
