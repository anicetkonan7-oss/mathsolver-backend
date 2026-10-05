/* MathSolver - Cours 3e, chapitre 3 : Équations et inéquations (1/3) */
MSCOP("l3.2", { t: "Équations et inéquations", s: [
["Introduction", String.raw`Une **équation** est une égalité qui contient une inconnue ; la résoudre, c'est trouver **toutes** les valeurs qui la rendent vraie. Une **inéquation** est une inégalité ($<$, $>$, $\leq$, $\geq$) : elle a souvent une infinité de solutions, qu'on représente sur une droite graduée.
[R] Dans la vie courante :: « Avec 5 000 F, combien de cahiers à 350 F puis-je acheter ? » se traduit par l'inéquation $350x \leq 5\,000$.`],
["Définitions", String.raw`[D] Équation et solution :: Une équation est une égalité où figure une inconnue, souvent notée $x$. Un nombre est **solution** si, en remplaçant $x$ par ce nombre, l'égalité est vraie. // Exemple : 4 est solution de $5x - 3 = 2x + 9$ car $5 \times 4 - 3 = 17$ et $2 \times 4 + 9 = 17$.
[D] Inéquation :: Une inéquation est une inégalité où figure une inconnue, par exemple $3x - 5 < 2x + 7$. Ses solutions forment en général un **ensemble** de nombres.
[D] Équation produit nul :: C'est une équation de la forme $A \times B = 0$, où $A$ et $B$ sont des expressions en $x$.
[F] Les solutions de $x < 12$ sont tous les nombres situés à gauche de 12 ; le crochet tourné vers l'extérieur indique que 12 n'est pas solution. :: p A -1 0 ; p B 15 0 ; p Z 12 0 ; p O 0 0 ; S A B ; S A Z c1 b ; p O1 0 -0.25 ; p O2 0 0.25 ; S O1 O2 ; L 0 -1 "0" ; p K1 12 -0.35 ; p K2 12 0.35 ; p K3 12.45 -0.35 ; p K4 12.45 0.35 ; S K1 K2 c2 b ; S K1 K3 c2 b ; S K2 K4 c2 b ; L 12 -1 "12" c2 ; L 5 0.9 "solutions" c1`],
["Propriétés", String.raw`[P] Égalités :: On obtient une équation équivalente (mêmes solutions) en **ajoutant** ou **soustrayant** le même nombre aux deux membres, ou en les **multipliant** ou **divisant** par le même nombre **non nul**.
[P] Inégalités et addition :: Ajouter ou soustraire le même nombre aux deux membres ne change pas le sens de l'inégalité.
[P] Inégalités et multiplication :: Multiplier ou diviser par un nombre **positif** ne change pas le sens. Multiplier ou diviser par un nombre **négatif** **change le sens** de l'inégalité. // Exemple : $-2x \geq 6$ donne $x \leq -3$.
[P] Produit nul :: Un produit est nul si et seulement si l'un au moins de ses facteurs est nul : $A \times B = 0 \iff A = 0$ ou $B = 0$.
[P] Équation $x^2 = a$ :: Si $a > 0$ : $x = \sqrt{a}$ ou $x = -\sqrt{a}$. Si $a = 0$ : $x = 0$. Si $a < 0$ : pas de solution.`]
] });