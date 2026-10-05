/* MathSolver - Cours 3e, chapitre 5 : Théorème de Pythagore (1/3) */
MSCOP("l3.4", { t: "Théorème de Pythagore", s: [
["Introduction", String.raw`Le théorème de Pythagore relie les **longueurs des trois côtés d'un triangle rectangle**. Il permet :
- de **calculer une longueur** inconnue quand on connaît les deux autres ;
- de **prouver qu'un triangle est rectangle** (ou qu'il ne l'est pas), sans rapporteur ni équerre.
[R] Dans la vie courante :: Un maçon vérifie qu'un angle de mur est bien droit avec une corde de 3 m, 4 m et 5 m. Un électricien calcule la longueur d'une échelle posée contre un mur. Les deux utilisent ce théorème.`],
["Définitions", String.raw`[D] Triangle rectangle :: Un triangle est rectangle lorsqu'il possède un angle droit ($90^\circ$). On dit « ABC est rectangle en A » quand l'angle droit est en A.
[D] Hypoténuse :: Dans un triangle rectangle, l'hypoténuse est le côté **opposé à l'angle droit**. C'est toujours le **plus long** des trois côtés. // Si ABC est rectangle en A, l'hypoténuse est $[BC]$.
[D] Côtés de l'angle droit :: Ce sont les deux autres côtés, ceux qui forment l'angle droit. // Si ABC est rectangle en A : $[AB]$ et $[AC]$.
[F] ABC est rectangle en A : l'hypoténuse $[BC]$ est le côté en face de l'angle droit. :: P A 0 0 ; P B 4 0 ; P C 0 3 ; S A B ; S A C ; S B C c2 b ; R B A C ; T B C "hypoténuse" c2
[D] Carré et racine carrée :: Le carré de $a$ est $a^2 = a \times a$. Pour $b \geq 0$, la racine carrée $\sqrt{b}$ est le nombre positif dont le carré vaut $b$. // Exemple : $5^2 = 25$ donc $\sqrt{25} = 5$.`],
["Propriétés", String.raw`[P] Théorème de Pythagore :: Si un triangle est rectangle, alors le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés. // Si ABC est rectangle en A, alors $BC^2 = AB^2 + AC^2$.
[F] Le carré construit sur l'hypoténuse a la même aire que les deux autres carrés réunis : $BC^2 = AB^2 + AC^2$. :: P A 0 0 ; P B 4 0 ; P C 0 3 ; p D 4 -4 ; p E 0 -4 ; p F -3 3 ; p G -3 0 ; p H 7 4 ; p I 3 7 ; G A B D E c1 ; G A C F G c3 ; G B H I C c2 ; R B A C ; L 2 -2 "AB²" c1 ; L -1.5 1.5 "AC²" c3 ; L 3.5 3.5 "BC²" c2
[P] Réciproque du théorème de Pythagore :: Si, dans un triangle, le carré du plus long côté est égal à la somme des carrés des deux autres côtés, alors ce triangle est rectangle, et l'angle droit est le sommet opposé au plus long côté. // Si $BC^2 = AB^2 + AC^2$, alors ABC est rectangle en A.
[P] Conséquence (contraposée) :: Si le carré du plus long côté n'est **pas** égal à la somme des carrés des deux autres côtés, alors le triangle **n'est pas** rectangle.
## Démonstration du théorème (avec les aires)
On place 4 triangles rectangles identiques, de côtés de l'angle droit $a$ et $b$ et d'hypoténuse $c$, dans un grand carré de côté $a + b$. Au centre, il reste un carré de côté $c$.
[F] 4 triangles rectangles identiques (côtés $a$ et $b$, hypoténuse $c$) dans un carré de côté $a + b$. :: p O 0 0 ; p Q 7 0 ; p U 7 7 ; p V 0 7 ; p M 3 0 ; p N 7 3 ; p K 4 7 ; p J 0 4 ; G O M J c1 ; G Q N M c1 ; G U K N c1 ; G V J K c1 ; G M N K J c2 ; R J O M ; T O M "a" ; T M Q "b" ; T Q N "a" ; T N U "b" ; T M N "c" c2 ; L 3.5 3.5 "c²" c2
1) Aire du grand carré : $(a+b)^2 = a^2 + 2ab + b^2$.
2) La même aire vaut aussi : 4 triangles + le petit carré, soit $4 \times \dfrac{ab}{2} + c^2 = 2ab + c^2$.
3) On égale les deux : $a^2 + 2ab + b^2 = 2ab + c^2$, donc $c^2 = a^2 + b^2$.`]
] });