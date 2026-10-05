/* MathSolver - Cours 3e, chapitre 8 : Fonctions linéaires et affines (1/3) */
MSCOP("l3.7", { t: "Fonctions linéaires et affines", s: [
["Introduction", String.raw`Une **fonction** est une « machine » qui, à chaque nombre $x$, associe un seul nombre. Les fonctions linéaires et affines sont les plus simples : leur courbe est une **droite**. Elles permettent :
- de modéliser une situation de **proportionnalité** (prix, vitesse, pourcentage) ;
- de comparer des **tarifs**, de prévoir un coût, de lire un graphique.
[R] Dans la vie courante :: Un taxi qui facture 500 F de prise en charge puis 250 F par kilomètre suit la fonction affine $T(x) = 250x + 500$, où $x$ est la distance en km.`],
["Définitions", String.raw`[D] Fonction, image, antécédent :: Une fonction $f$ associe à un nombre $x$ un nombre unique noté $f(x)$, qu'on appelle l'**image** de $x$. On écrit $f : x \mapsto f(x)$. // Si $f(x) = y$, on dit que $x$ est **un antécédent** de $y$.
[D] Fonction linéaire :: Une fonction linéaire est une fonction de la forme $f(x) = ax$, où $a$ est un nombre fixé, appelé **coefficient**. Elle traduit une situation de proportionnalité.
[D] Fonction affine :: Une fonction affine est une fonction de la forme $f(x) = ax + b$. Le nombre $a$ est le **coefficient directeur**, le nombre $b$ est l'**ordonnée à l'origine**.
[R] Cas particuliers :: Si $b = 0$, la fonction affine est linéaire : $f(x) = ax$. // Si $a = 0$, la fonction est **constante** : $f(x) = b$.
[F] $f(x) = 0{,}5x$ est linéaire, sa droite passe par l'origine O. $g(x) = 0{,}5x + 2$ est affine, sa droite coupe l'axe des ordonnées en 2. :: X -4 4 -2 4 ; F "0.5*x" -4 4 c1 b ; F "0.5*x+2" -4 4 c2 b ; L 3.2 1 "f" c1 ; L 2.6 3.9 "g" c2 ; P B 0 2 se`],
["Propriétés", String.raw`[P] Représentation graphique :: La courbe d'une fonction **linéaire** $f(x) = ax$ est une droite qui passe par l'**origine** du repère. // La courbe d'une fonction **affine** $f(x) = ax + b$ est une droite qui passe par le point $(0 \,;\, b)$.
[P] Coefficient directeur :: Pour deux nombres $x_1 \neq x_2$ : $a = \dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$. // Les accroissements de $f(x)$ sont proportionnels aux accroissements de $x$.
[F] Pour $f(x) = 2x + 1$ : quand on avance de 1, on monte de 2. Le coefficient directeur est $a = 2$. :: X -1 3 -1 6 ; F "2*x+1" -1 2.5 c1 b ; p A 1 3 ; p B 2 3 ; p C 2 5 ; S A B c2 d ; S B C c2 d ; T A B "+1" c2 - ; T B C "+2" c2 ; P M 0 1 se
[P] Sens de variation :: Si $a > 0$, la fonction est **croissante** (la droite monte). // Si $a < 0$, elle est **décroissante** (la droite descend). // Si $a = 0$, elle est **constante** (droite horizontale).
[F] En bleu $a > 0$ : la droite monte. En orange $a < 0$ : elle descend. En vert $a = 0$ : elle est horizontale. :: X -3 3 -2 4 ; F "x+1" -3 3 c1 b ; F "-x+1" -3 3 c2 b ; F "3" -3 3 c3 b
[P] Pourcentages :: Augmenter de $t\,\%$, c'est multiplier par $1 + \dfrac{t}{100}$. Diminuer de $t\,\%$, c'est multiplier par $1 - \dfrac{t}{100}$. Ce sont des fonctions linéaires.`]
] });