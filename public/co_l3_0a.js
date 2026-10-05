/* MathSolver - Cours 3e, chapitre 1 : Racines carrées (1/3) */
MSCOP("l3.0", { t: "Racines carrées", s: [
["Introduction", String.raw`La racine carrée répond à la question : **quel nombre positif, multiplié par lui-même, donne ce nombre ?** Elle apparaît dès qu'on cherche le côté d'un carré dont on connaît l'aire, ou une longueur avec Pythagore.
[R] Dans la vie courante :: Un terrain carré de 400 m² a un côté de $\sqrt{400} = 20$ m. Un carré de 50 cm² a un côté de $\sqrt{50} \approx 7{,}07$ cm : ce n'est pas un nombre entier.`],
["Définitions", String.raw`[D] Racine carrée :: Pour un nombre $a \geq 0$, la racine carrée de $a$, notée $\sqrt{a}$, est le nombre **positif** dont le carré vaut $a$. // Exemples : $\sqrt{49} = 7$ car $7^2 = 49$ et $7 \geq 0$ ; $\sqrt{0} = 0$ ; $\sqrt{1} = 1$.
[F] Un carré d'aire $a$ a pour côté $\sqrt{a}$. Ici, l'aire vaut 25 et le côté vaut $\sqrt{25} = 5$. :: p A 0 0 ; p B 5 0 ; p C 5 5 ; p D 0 5 ; G A B C D c1 b ; T A B "côté = √25 = 5" ; L 2.5 2.5 "aire = 25" c1
[D] Carrés parfaits :: Les nombres 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144… sont des **carrés parfaits** : leur racine carrée est un entier.
[!] Nombre négatif :: $\sqrt{-4}$ n'existe pas : aucun nombre au carré ne donne un résultat négatif.
[R] Valeur approchée :: $\sqrt{2}$ n'est pas un nombre décimal : $\sqrt{2} \approx 1{,}414$. On garde l'écriture $\sqrt{2}$ pour la **valeur exacte**.
[F] La diagonale d'un carré de côté 1 mesure $\sqrt{2}$ (Pythagore : $1^2 + 1^2 = 2$). :: P A 0 0 ; P B 4 0 ; P C 4 4 ; P D 0 4 ; G A B C D ; S A C c2 b ; R B A D ; T A B "1" ; T A D "1" ; T A C "√2" c2 -`],
["Propriétés", String.raw`[P] Carré d'une racine :: Pour $a \geq 0$ : $(\sqrt{a})^2 = a$ et $\sqrt{a^2} = a$.
[P] Produit :: Pour $a \geq 0$ et $b \geq 0$ : $\sqrt{a \times b} = \sqrt{a} \times \sqrt{b}$.
[P] Quotient :: Pour $a \geq 0$ et $b > 0$ : $\sqrt{\dfrac{a}{b}} = \dfrac{\sqrt{a}}{\sqrt{b}}$.
[!] Pas pour la somme :: En général $\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}$. // Exemple : $\sqrt{9 + 16} = \sqrt{25} = 5$, mais $\sqrt{9} + \sqrt{16} = 3 + 4 = 7$.
[P] Équation $x^2 = a$ :: Si $a > 0$, l'équation a **deux** solutions : $\sqrt{a}$ et $-\sqrt{a}$. // Si $a = 0$, une seule solution : 0. // Si $a < 0$, aucune solution.
[P] Dénominateur sans racine :: $\dfrac{1}{\sqrt{a}} = \dfrac{\sqrt{a}}{a}$ (on multiplie en haut et en bas par $\sqrt{a}$).`]
] });