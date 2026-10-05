/* MathSolver - Cours 3e, chapitre 8 : Fonctions linéaires et affines (2/3) */
MSCOP("l3.7", { s: [
["Méthodes", String.raw`## Méthode 1 : calculer une image
Remplacer $x$ par le nombre dans l'expression de $f(x)$, puis calculer en respectant les priorités.
## Méthode 2 : calculer un antécédent
Résoudre l'équation $f(x) = k$, c'est-à-dire $ax + b = k$, donc $x = \dfrac{k - b}{a}$ (si $a \neq 0$).
## Méthode 3 : tracer la droite
1) Calculer les images de **deux** nombres bien choisis (par exemple 0 et un nombre positif).
2) Placer les deux points dans le repère.
3) Tracer la droite qui passe par ces deux points ; un troisième point permet de vérifier.
## Méthode 4 : trouver une fonction affine à partir de deux images
1) Calculer $a = \dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$.
2) Trouver $b$ en remplaçant dans $f(x_1) = a x_1 + b$.
3) Vérifier avec la deuxième image.
## Méthode 5 : lire $a$ et $b$ sur un graphique
1) $b$ est l'ordonnée du point où la droite coupe l'axe des ordonnées.
2) À partir d'un point de la droite, on avance de 1 vers la droite : on monte (ou on descend) de $a$.
[!] Image ou antécédent :: L'**image** se lit sur l'axe des ordonnées (verticalement), l'**antécédent** sur l'axe des abscisses (horizontalement).`],
["Exemples corrigés", String.raw`## Exemple 1 : image, antécédent et tracé
Soit $f(x) = 2x - 3$. Calculer $f(4)$, puis l'antécédent de 7, et tracer la droite.
> $f(4) = 2 \times 4 - 3 = 8 - 3 = 5$.
> Antécédent de 7 : $2x - 3 = 7$, donc $2x = 10$ et $x = 5$.
> Pour tracer : $f(0) = -3$ et $f(3) = 3$. On place $A(0 \,;\, -3)$ et $B(3 \,;\, 3)$.
[F] La droite de $f(x) = 2x - 3$ passe par $A(0 \,;\, -3)$ et $B(3 \,;\, 3)$. :: X -1 4 -4 4 ; F "2*x-3" -0.5 3.5 c1 b ; P A 0 -3 e ; P B 3 3 o
## Exemple 2 : fonction linéaire
$g$ est une fonction linéaire telle que $g(4) = 10$. Trouver $g(x)$, puis calculer $g(-2)$.
> $g(x) = ax$ et $g(4) = 4a = 10$, donc $a = \dfrac{10}{4} = 2{,}5$ : $g(x) = 2{,}5x$.
> $g(-2) = 2{,}5 \times (-2) = -5$.
## Exemple 3 : fonction affine à partir de deux images
$f$ est affine, avec $f(1) = 3$ et $f(4) = 9$. Trouver $f(x)$.
> $a = \dfrac{f(4) - f(1)}{4 - 1} = \dfrac{9 - 3}{3} = 2$.
> $f(1) = 2 \times 1 + b = 3$, donc $b = 1$ : $f(x) = 2x + 1$.
> Vérification : $f(4) = 2 \times 4 + 1 = 9$.
## Exemple 4 : lecture graphique
Lire l'expression de la fonction $h$ représentée ci-dessous.
[F] La droite coupe l'axe des ordonnées en 2 ; en avançant de 1, elle descend de 1. :: X -1 4 -2 3 ; F "-x+2" -1 4 c1 b ; P A 0 2 ne ; p M 1 1 ; p N 2 1 ; p Q 2 0 ; S M N c2 d ; S N Q c2 d ; T M N "+1" c2 - ; T N Q "−1" c2
> L'ordonnée à l'origine est $b = 2$. Quand on avance de 1, on descend de 1 : $a = -1$.
> Donc $h(x) = -x + 2$.
## Exemple 5 : pourcentages
Un article coûte 12 000 F CFA. Son prix augmente de 15 %. Quel est le nouveau prix ?
> Augmenter de 15 %, c'est multiplier par $1 + \dfrac{15}{100} = 1{,}15$.
> Nouveau prix : $12\,000 \times 1{,}15 = 13\,800$ F CFA.
## Exemple 6 : comparer deux tarifs
Une salle de sport propose deux tarifs. Tarif A : 1 000 F par séance. Tarif B : abonnement de 2 000 F, puis 500 F par séance. À partir de combien de séances le tarif B est-il plus avantageux ?
> Pour $x$ séances : $A(x) = 1\,000x$ (linéaire) et $B(x) = 500x + 2\,000$ (affine).
> $A(x) = B(x)$ : $1\,000x = 500x + 2\,000$, donc $500x = 2\,000$ et $x = 4$.
> Au-delà de 4 séances, $B(x) < A(x)$ : le tarif B est plus avantageux.
[F] Prix en milliers de F selon le nombre de séances : les droites se coupent pour 4 séances. :: X 0 8 0 8 ; F "x" 0 8 c1 b ; F "0.5*x+2" 0 8 c2 b ; P I 4 4 no ; L 7.3 7.9 "A" c1 ; L 7.5 5.2 "B" c2`]
] });