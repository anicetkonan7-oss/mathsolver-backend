/* MathSolver - Cours 3e, chapitre 7 : Trigonométrie (1/3) */
MSCOP("l3.6", { t: "Trigonométrie", s: [
["Introduction", String.raw`La trigonométrie relie les **angles** et les **longueurs** d'un triangle rectangle. Elle permet :
- de **calculer une longueur** quand on connaît un angle et un côté ;
- de **calculer un angle** quand on connaît deux côtés.
Pythagore ne fait intervenir que des longueurs ; la trigonométrie ajoute les angles.
[R] Dans la vie courante :: Un menuisier calcule l'angle d'un toit, un topographe la hauteur d'un bâtiment sans y monter, un pilote l'angle de descente d'un avion : tous utilisent la trigonométrie.`],
["Définitions", String.raw`[D] Les trois côtés vus depuis un angle :: Dans un triangle rectangle, on choisit un angle aigu, par exemple $\widehat{B}$. // L'**hypoténuse** est le côté opposé à l'angle droit. // Le **côté adjacent** à $\widehat{B}$ est le côté de l'angle droit qui touche B. // Le **côté opposé** à $\widehat{B}$ est le côté qui ne touche pas B.
[F] ABC est rectangle en A. Pour l'angle $\widehat{B}$ : $[AB]$ est adjacent, $[AC]$ est opposé, $[BC]$ est l'hypoténuse. :: P A 0 0 ; P B 4 0 ; P C 0 3 ; S A B c1 b ; S A C c3 b ; S B C c2 b ; R B A C ; Q A B C c4 ; T B C "hypoténuse" c2 ; T A B "adjacent" c1 ; T A C "opposé" c3 -
[D] Cosinus, sinus et tangente :: Pour un angle aigu $\widehat{B}$ d'un triangle rectangle : // $\cos \widehat{B} = \dfrac{\text{côté adjacent}}{\text{hypoténuse}}$ // $\sin \widehat{B} = \dfrac{\text{côté opposé}}{\text{hypoténuse}}$ // $\tan \widehat{B} = \dfrac{\text{côté opposé}}{\text{côté adjacent}}$
[!] Ça dépend de l'angle :: Adjacent et opposé changent quand on change d'angle. Repère toujours l'angle avant de nommer les côtés.
[F] Pour l'angle $\widehat{C}$, les rôles s'échangent : $[AC]$ est adjacent et $[AB]$ est opposé. :: P A 0 0 ; P B 4 0 ; P C 0 3 ; S A C c1 b ; S A B c3 b ; S B C c2 b ; R B A C ; Q A C B c4 ; T B C "hypoténuse" c2 ; T A C "adjacent" c1 - ; T A B "opposé" c3
[K] Moyen mnémotechnique :: **CAH SOH TOA** : Cosinus = Adjacent / Hypoténuse ; Sinus = Opposé / Hypoténuse ; Tangente = Opposé / Adjacent.`],
["Propriétés", String.raw`[P] Valeurs du cosinus et du sinus :: Pour un angle aigu $x$ : $0 < \cos x < 1$ et $0 < \sin x < 1$, car l'hypoténuse est le plus long côté. La tangente, elle, peut dépasser 1.
[P] Relation fondamentale :: Pour tout angle aigu $x$ : $\cos^2 x + \sin^2 x = 1$.
[P] Tangente, sinus et cosinus :: Pour tout angle aigu $x$ : $\tan x = \dfrac{\sin x}{\cos x}$.
[P] Angles complémentaires :: Dans un triangle rectangle en A, $\widehat{B} + \widehat{C} = 90^\circ$, et : // $\cos \widehat{B} = \sin \widehat{C}$ et $\sin \widehat{B} = \cos \widehat{C}$.
## Démonstration de la relation fondamentale
ABC est rectangle en A. On pose $a = BC$ (hypoténuse).
1) $\cos \widehat{B} = \dfrac{AB}{a}$ et $\sin \widehat{B} = \dfrac{AC}{a}$.
2) $\cos^2 \widehat{B} + \sin^2 \widehat{B} = \dfrac{AB^2 + AC^2}{a^2}$.
3) D'après Pythagore, $AB^2 + AC^2 = a^2$, donc la somme vaut $\dfrac{a^2}{a^2} = 1$.`]
] });