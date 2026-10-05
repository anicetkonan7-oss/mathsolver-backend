/* MathSolver - Cours 3e, chapitre 3 : Équations et inéquations (2/3) */
MSCOP("l3.2", { s: [
["Méthodes", String.raw`## Méthode 1 : résoudre une équation du premier degré
1) Développer et réduire chaque membre si besoin.
2) Regrouper les termes en $x$ d'un côté et les nombres de l'autre.
3) Diviser par le coefficient de $x$, puis **vérifier** la solution.
## Méthode 2 : résoudre une inéquation
Mêmes étapes que pour une équation, mais **changer le sens** du signe si on multiplie ou divise par un nombre négatif. Représenter ensuite les solutions sur une droite graduée.
## Méthode 3 : équation produit nul
1) Se ramener à « produit $= 0$ » (en factorisant si besoin).
2) Écrire « $A = 0$ ou $B = 0$ » et résoudre chaque petite équation.
## Méthode 4 : mettre un problème en équation
1) Choisir l'inconnue et l'écrire clairement (« soit $x$ le nombre de… »).
2) Traduire l'énoncé par une équation, la résoudre.
3) Vérifier et **répondre par une phrase**.
[!] Le sens de l'inégalité :: Diviser par $-2$ transforme « $\geq$ » en « $\leq$ ». C'est l'erreur la plus fréquente.`],
["Exemples corrigés", String.raw`## Exemple 1 : équation du premier degré
Résoudre $5x - 3 = 2x + 9$.
> $5x - 2x = 9 + 3$, donc $3x = 12$ et $x = 4$.
> Vérification : $5 \times 4 - 3 = 17$ et $2 \times 4 + 9 = 17$. La solution est 4.
## Exemple 2 : inéquation
Résoudre $3x - 5 < 2x + 7$ et représenter les solutions.
> $3x - 2x < 7 + 5$, donc $x < 12$.
> Les solutions sont tous les nombres strictement inférieurs à 12.
[F] Solutions de $x < 12$ : 12 est exclu. :: p A -1 0 ; p B 15 0 ; p Z 12 0 ; S A B ; S A Z c1 b ; p O1 0 -0.25 ; p O2 0 0.25 ; S O1 O2 ; L 0 -1 "0" ; p K1 12 -0.35 ; p K2 12 0.35 ; p K3 12.45 -0.35 ; p K4 12.45 0.35 ; S K1 K2 c2 b ; S K1 K3 c2 b ; S K2 K4 c2 b ; L 12 -1 "12" c2
## Exemple 3 : inéquation avec un nombre négatif
Résoudre $-2x + 4 \geq 10$.
> $-2x \geq 6$. On divise par $-2$, qui est négatif : le sens change. $x \leq -3$.
[F] Solutions de $x \leq -3$ : $-3$ est inclus, le crochet est tourné vers les solutions. :: p A -8 0 ; p B 3 0 ; p Z -3 0 ; S A B ; S A Z c1 b ; p O1 0 -0.25 ; p O2 0 0.25 ; S O1 O2 ; L 0 -1 "0" ; p K1 -3 -0.35 ; p K2 -3 0.35 ; p K3 -3.45 -0.35 ; p K4 -3.45 0.35 ; S K1 K2 c2 b ; S K1 K3 c2 b ; S K2 K4 c2 b ; L -3 -1 "−3" c2
## Exemple 4 : produit nul
Résoudre $(2x - 6)(x + 5) = 0$.
> $2x - 6 = 0$ ou $x + 5 = 0$, donc $x = 3$ ou $x = -5$.
## Exemple 5 : factoriser d'abord
Résoudre $x^2 - 9 = 0$, puis $x^2 = 4x$.
> $x^2 - 9 = (x - 3)(x + 3) = 0$ : $x = 3$ ou $x = -3$.
> $x^2 - 4x = 0$, donc $x(x - 4) = 0$ : $x = 0$ ou $x = 4$.
## Exemple 6 : problème
Koffi a trois fois l'âge de sa sœur. Dans 5 ans, il aura le double de son âge. Quels sont leurs âges ?
> Soit $s$ l'âge de la sœur ; Koffi a $3s$ ans. Dans 5 ans : $3s + 5 = 2(s + 5)$.
> $3s + 5 = 2s + 10$, donc $s = 5$.
> La sœur a 5 ans et Koffi 15 ans (vérification : dans 5 ans, 20 = 2 × 10).`]
] });