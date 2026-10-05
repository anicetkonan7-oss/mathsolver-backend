/* MathSolver - Cours 3e, chapitre 4 : Systèmes de deux équations (1/3) */
MSCOP("l3.3", { t: "Systèmes de deux équations", s: [
["Introduction", String.raw`Quand un problème contient **deux inconnues**, il faut en général **deux équations** pour les trouver. On les écrit ensemble : c'est un **système**. On le résout par le calcul (substitution ou combinaison) ou par le graphique (intersection de deux droites).
[R] Dans la vie courante :: « 3 cahiers et 2 stylos coûtent 1 700 F ; 2 cahiers et 5 stylos coûtent 2 050 F. Quel est le prix d'un cahier ? » se résout avec un système.`],
["Définitions", String.raw`[D] Système :: Un système de deux équations à deux inconnues $x$ et $y$ s'écrit : // $\begin{cases} ax + by = c \\ a'x + b'y = c' \end{cases}$
[D] Solution :: Une solution est un **couple** de nombres $(x \,;\, y)$ qui vérifie **les deux** équations en même temps.
[R] Vérifier une solution :: $(2 \,;\, 3)$ est solution de $\begin{cases} 2x + y = 7 \\ x - y = -1 \end{cases}$ car $2 \times 2 + 3 = 7$ et $2 - 3 = -1$.`],
["Propriétés", String.raw`[P] Méthode par substitution :: On exprime une inconnue en fonction de l'autre dans une équation, puis on **remplace** dans l'autre équation : on obtient une équation à une seule inconnue.
[P] Méthode par combinaison :: On multiplie les équations par des nombres bien choisis pour que, en les **additionnant** (ou en les soustrayant), une inconnue disparaisse.
[P] Interprétation graphique :: Chaque équation correspond à une **droite**. La solution du système est le **point d'intersection** des deux droites. // Si les droites sont sécantes : une seule solution. Si elles sont parallèles : aucune solution.
[F] $2x + y = 7$ donne la droite $y = 7 - 2x$ (bleue), $x - y = -1$ donne $y = x + 1$ (orange). Elles se coupent en $(2 \,;\, 3)$. :: X -1 4 -1 6 ; F "7-2*x" 0.5 4 c1 b ; F "x+1" -1 4 c2 b ; P S 2 3 e ; p H 2 0 ; p V 0 3 ; S S H c4 d ; S S V c4 d`]
] });