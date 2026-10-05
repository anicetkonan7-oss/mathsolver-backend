/* MathSolver - Cours 3e, chapitre 2 : Calcul littéral (1/3) */
MSCOP("l3.1", { t: "Calcul littéral", s: [
["Introduction", String.raw`Le calcul littéral, c'est calculer avec des **lettres** qui représentent des nombres. Il permet d'écrire une formule générale, de transformer une expression pour la rendre plus simple, et de **prouver** qu'une propriété est vraie pour tous les nombres.
[R] Dans la vie courante :: L'aire d'un carré de côté $x$ est $x^2$, le prix de $n$ cahiers à 350 F est $350n$ : ce sont des expressions littérales.`],
["Définitions", String.raw`[D] Expression littérale :: Une expression littérale contient une ou plusieurs lettres qui désignent des nombres, par exemple $3x^2 - 5x + 2$.
[D] Développer :: Développer, c'est transformer un **produit** en **somme** : $3(x + 2) = 3x + 6$.
[D] Factoriser :: Factoriser, c'est transformer une **somme** en **produit** : $3x + 6 = 3(x + 2)$. C'est l'opération inverse du développement.
[D] Réduire :: Réduire, c'est regrouper les termes de même nature : $5x + 3 - 2x + 1 = 3x + 4$.
[R] Signe devant une parenthèse :: $-(a + b) = -a - b$ : un signe « moins » devant une parenthèse change tous les signes à l'intérieur.`],
["Propriétés", String.raw`[P] Distributivité simple :: $k(a + b) = ka + kb$ et $k(a - b) = ka - kb$.
[P] Double distributivité :: $(a + b)(c + d) = ac + ad + bc + bd$.
[P] Identités remarquables :: $(a + b)^2 = a^2 + 2ab + b^2$ // $(a - b)^2 = a^2 - 2ab + b^2$ // $(a + b)(a - b) = a^2 - b^2$
[F] Pourquoi $(a + b)^2 = a^2 + 2ab + b^2$ : le grand carré de côté $a + b$ se découpe en un carré $a^2$, un carré $b^2$ et deux rectangles $ab$. :: p A 0 0 ; p B 3 0 ; p C 5 0 ; p D 5 2 ; p E 5 5 ; p F 3 5 ; p G 0 5 ; p H 0 2 ; p I 3 2 ; G A B I H c3 ; G B C D I c2 ; G H I F G c1 ; G I D E F c3 ; T A B "a" ; T B C "b" ; T C D "b" ; T D E "a" ; L 1.5 3.5 "a²" c1 ; L 4 1 "b²" c2 ; L 1.5 1 "ab" c3 ; L 4 3.5 "ab" c3
[F] Double distributivité : l'aire du rectangle $(a + b)(c + d)$ est la somme des quatre aires $ac$, $ad$, $bc$ et $bd$. :: p A 0 0 ; p B 4 0 ; p C 6 0 ; p D 6 1.5 ; p E 6 4 ; p F 4 4 ; p G 0 4 ; p H 0 1.5 ; p I 4 1.5 ; G A B I H c1 ; G B C D I c3 ; G H I F G c2 ; G I D E F c4 ; T A B "a" ; T B C "b" ; T A H "d" ; T H G "c" ; L 2 2.75 "ac" c2 ; L 5 2.75 "bc" c4 ; L 2 0.75 "ad" c1 ; L 5 0.75 "bd" c3`]
] });