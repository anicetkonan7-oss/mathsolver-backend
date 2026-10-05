/* MathSolver - Cours 3e, chapitre 3 : Équations et inéquations (3/3) */
MSCOP("l3.2", { s: [
["Cas particuliers", String.raw`[R] Aucune solution :: $2x + 3 = 2x + 5$ donne $3 = 5$ : c'est impossible, l'équation n'a **pas de solution**.
[R] Tous les nombres :: $2(x + 1) = 2x + 2$ est vraie pour **tout** $x$ : tous les nombres sont solutions.
[R] Fractions :: Pour $\dfrac{x}{3} + 1 = \dfrac{x}{2}$, on multiplie tout par 6 (dénominateur commun) : $2x + 6 = 3x$.
[R] Inégalité large ou stricte :: Avec $<$ ou $>$, la valeur limite est exclue (crochet tourné vers l'extérieur). Avec $\leq$ ou $\geq$, elle est incluse (crochet tourné vers les solutions).`],
["Erreurs fréquentes", String.raw`[!] Changer de membre sans changer de signe :: $x + 5 = 12$ donne $x = 12 - 5$, et non $12 + 5$.
[!] Diviser par un négatif :: $-3x < 12$ donne $x > -4$ : le sens change.
[!] Produit nul mal utilisé :: $(x - 2)(x + 1) = 6$ n'est **pas** un produit nul : il faut d'abord se ramener à « $= 0$ ».
[!] Diviser par $x$ :: Pour $x^2 = 4x$, diviser par $x$ fait perdre la solution $x = 0$. Il faut factoriser.
[!] Oublier de vérifier :: Remplacer $x$ par la solution trouvée permet de détecter une erreur de calcul.`],
["À retenir", String.raw`[K] L'essentiel :: Équation : on fait la même opération sur les deux membres. // Inéquation : multiplier ou diviser par un nombre négatif change le sens. // Produit nul : $A \times B = 0 \iff A = 0$ ou $B = 0$.
- Regrouper les $x$ d'un côté, les nombres de l'autre.
- Pour un produit nul, se ramener à « $= 0$ », factoriser, puis séparer.
- Toujours vérifier la solution et répondre par une phrase.`]
], q: [
[String.raw`Résoudre $7x + 2 = 3x - 10$.`, String.raw`> $7x - 3x = -10 - 2$, donc $4x = -12$ et $x = -3$.`],
[String.raw`Résoudre $4(x - 1) = 2x + 6$.`, String.raw`> $4x - 4 = 2x + 6$, donc $2x = 10$ et $x = 5$.`],
[String.raw`Résoudre $\dfrac{x}{3} + 1 = \dfrac{x}{2}$.`, String.raw`> On multiplie par 6 : $2x + 6 = 3x$, donc $x = 6$.
> Vérification : $\dfrac{6}{3} + 1 = 3$ et $\dfrac{6}{2} = 3$.`],
[String.raw`Résoudre l'inéquation $2x + 3 \leq 5x - 9$.`, String.raw`> $2x - 5x \leq -9 - 3$, donc $-3x \leq -12$.
> On divise par $-3$ (négatif), le sens change : $x \geq 4$.`],
[String.raw`Résoudre $(x + 2)(3x - 12) = 0$.`, String.raw`> $x + 2 = 0$ ou $3x - 12 = 0$, donc $x = -2$ ou $x = 4$.`],
[String.raw`Un rectangle a un périmètre de 50 cm, et sa longueur dépasse sa largeur de 7 cm. Calculer ses dimensions.`, String.raw`> Soit $\ell$ la largeur ; la longueur vaut $\ell + 7$. Donc $2(\ell + \ell + 7) = 50$.
> $4\ell + 14 = 50$, donc $4\ell = 36$ et $\ell = 9$.
> La largeur est 9 cm et la longueur 16 cm (vérification : $2 \times (9 + 16) = 50$).`]
] });