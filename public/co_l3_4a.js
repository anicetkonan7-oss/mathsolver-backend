/* MathSolver - Cours 3e, chapitre 5 : Théorème de Pythagore (1/2) */
MSCOP("l3.4", { t: "Théorème de Pythagore", s: [
["Introduction", String.raw`Le théorème de Pythagore relie les **longueurs des trois côtés d'un triangle rectangle**. Il permet :
- de **calculer une longueur** inconnue quand on connaît les deux autres ;
- de **prouver qu'un triangle est rectangle** (ou qu'il ne l'est pas), sans rapporteur ni équerre.
[R] Dans la vie courante :: Un maçon vérifie qu'un angle de mur est bien droit avec une corde de 3 m, 4 m et 5 m. Un électricien calcule la longueur d'une échelle posée contre un mur. Les deux utilisent ce théorème.`],
["Définitions", String.raw`[D] Triangle rectangle :: Un triangle est rectangle lorsqu'il possède un angle droit ($90^\circ$). On dit « ABC est rectangle en A » quand l'angle droit est en A.
[D] Hypoténuse :: Dans un triangle rectangle, l'hypoténuse est le côté **opposé à l'angle droit**. C'est toujours le **plus long** des trois côtés. // Si ABC est rectangle en A, l'hypoténuse est $[BC]$.
[D] Côtés de l'angle droit :: Ce sont les deux autres côtés, ceux qui forment l'angle droit. // Si ABC est rectangle en A : $[AB]$ et $[AC]$.
[D] Carré et racine carrée :: Le carré de $a$ est $a^2 = a \times a$. Pour $b \geq 0$, la racine carrée $\sqrt{b}$ est le nombre positif dont le carré vaut $b$. // Exemple : $5^2 = 25$ donc $\sqrt{25} = 5$.`],
["Propriétés", String.raw`[P] Théorème de Pythagore :: Si un triangle est rectangle, alors le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés. // Si ABC est rectangle en A, alors $BC^2 = AB^2 + AC^2$.
[P] Réciproque du théorème de Pythagore :: Si, dans un triangle, le carré du plus long côté est égal à la somme des carrés des deux autres côtés, alors ce triangle est rectangle, et l'angle droit est le sommet opposé au plus long côté. // Si $BC^2 = AB^2 + AC^2$, alors ABC est rectangle en A.
[P] Conséquence (contraposée) :: Si le carré du plus long côté n'est **pas** égal à la somme des carrés des deux autres côtés, alors le triangle **n'est pas** rectangle.
## Démonstration du théorème (avec les aires)
On place 4 triangles rectangles identiques, de côtés de l'angle droit $a$ et $b$ et d'hypoténuse $c$, dans un grand carré de côté $a + b$. Au centre, il reste un carré de côté $c$.
1) Aire du grand carré : $(a+b)^2 = a^2 + 2ab + b^2$.
2) La même aire vaut aussi : 4 triangles + le petit carré, soit $4 \times \dfrac{ab}{2} + c^2 = 2ab + c^2$.
3) On égale les deux : $a^2 + 2ab + b^2 = 2ab + c^2$, donc $c^2 = a^2 + b^2$.`],
["Méthodes", String.raw`## Méthode 1 : calculer l'hypoténuse
1) Repérer l'angle droit et nommer l'hypoténuse (le côté opposé).
2) Écrire l'égalité de Pythagore avec les lettres du triangle.
3) Remplacer par les longueurs connues et calculer le carré de l'hypoténuse.
4) Prendre la racine carrée. Donner la valeur exacte, puis une valeur arrondie si l'énoncé le demande.
## Méthode 2 : calculer un côté de l'angle droit
1) Écrire l'égalité de Pythagore : hypoténuse² = côté² + côté².
2) Isoler le carré cherché : côté² = hypoténuse² − autre côté².
3) Calculer, puis prendre la racine carrée.
## Méthode 3 : prouver qu'un triangle est rectangle
1) Repérer le **plus long côté**.
2) Calculer **séparément** son carré, puis la somme des carrés des deux autres côtés.
3) Comparer. S'ils sont égaux, conclure avec la **réciproque** : le triangle est rectangle au sommet opposé au plus long côté.
## Méthode 4 : prouver qu'un triangle n'est pas rectangle
Mêmes calculs qu'à la méthode 3. Si les deux résultats sont **différents**, conclure : « l'égalité de Pythagore n'est pas vérifiée, donc le triangle n'est pas rectangle ».
[!] Rédaction :: On ne part jamais de l'égalité à prouver. On calcule les deux membres chacun de son côté, puis on compare.`]
] });