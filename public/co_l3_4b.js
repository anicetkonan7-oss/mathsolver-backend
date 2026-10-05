/* MathSolver - Cours 3e, chapitre 5 : Théorème de Pythagore (2/3) */
MSCOP("l3.4", { s: [
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
[!] Rédaction :: On ne part jamais de l'égalité à prouver. On calcule les deux membres chacun de son côté, puis on compare.`],
["Exemples corrigés", String.raw`## Exemple 1 : calculer l'hypoténuse
ABC est rectangle en A, avec $AB = 6$ cm et $AC = 8$ cm. Calculer $BC$.
[F] On cherche l'hypoténuse $[BC]$. :: P A 0 0 ; P B 6 0 ; P C 0 8 ; S A B ; S A C ; S B C c2 b ; R B A C ; T A B "6 cm" ; T A C "8 cm" ; T B C "?" c2
> Le triangle ABC est rectangle en A, donc d'après le théorème de Pythagore :
> $BC^2 = AB^2 + AC^2 = 6^2 + 8^2 = 36 + 64 = 100$
> Donc $BC = \sqrt{100} = 10$ cm.
## Exemple 2 : calculer un côté de l'angle droit
DEF est rectangle en E, avec $DF = 13$ cm et $DE = 5$ cm. Calculer $EF$.
[F] On cherche un côté de l'angle droit : $[EF]$. :: P E 0 0 ; P F 12 0 ; P D 0 5 ; S E D ; S E F c2 b ; S D F ; R D E F ; T E D "5 cm" ; T D F "13 cm" ; T E F "?" c2
> DEF est rectangle en E, donc l'hypoténuse est $[DF]$ et : $DF^2 = DE^2 + EF^2$.
> $EF^2 = DF^2 - DE^2 = 13^2 - 5^2 = 169 - 25 = 144$
> Donc $EF = \sqrt{144} = 12$ cm.
## Exemple 3 : valeur exacte et valeur arrondie
RST est rectangle en R, avec $RS = 3$ cm et $RT = 5$ cm. Calculer $ST$, arrondi au dixième.
> $ST^2 = RS^2 + RT^2 = 9 + 25 = 34$
> Valeur exacte : $ST = \sqrt{34}$ cm. Valeur arrondie : $ST \approx 5{,}8$ cm.
## Exemple 4 : prouver qu'un triangle est rectangle
Dans le triangle IJK : $IJ = 7$ cm, $JK = 24$ cm et $IK = 25$ cm. Ce triangle est-il rectangle ?
[F] Le plus long côté est $[IK]$ : on compare $IK^2$ et $IJ^2 + JK^2$. :: P J 0 0 ; P K 24 0 ; P I 0 7 ; S I J ; S J K ; S I K c2 b ; T I J "7 cm" ; T J K "24 cm" ; T I K "25 cm" c2
> Le plus long côté est $[IK]$.
> D'une part : $IK^2 = 25^2 = 625$.
> D'autre part : $IJ^2 + JK^2 = 49 + 576 = 625$.
> On constate que $IK^2 = IJ^2 + JK^2$. D'après la réciproque du théorème de Pythagore, IJK est rectangle en J.
## Exemple 5 : prouver qu'un triangle n'est pas rectangle
Dans le triangle LMN : $LM = 5$ cm, $MN = 7$ cm et $LN = 9$ cm.
> Le plus long côté est $[LN]$ : $LN^2 = 81$, et $LM^2 + MN^2 = 25 + 49 = 74$.
> $81 \neq 74$ : l'égalité de Pythagore n'est pas vérifiée, donc LMN n'est pas rectangle.
## Exemple 6 : un problème concret
Une échelle de 5 m est posée contre un mur vertical. Son pied est à 1,4 m du mur. À quelle hauteur touche-t-elle le mur ?
[F] Le mur, le sol et l'échelle forment un triangle rectangle. :: p O 0 0 ; p W 0 5.6 ; p A -0.8 0 ; p B 2.8 0 ; p P 1.4 0 ; p H 0 4.8 ; S O W b ; S A B b ; S P H c2 b ; R H O P ; T O P "1,4 m" ; T P H "5 m" c2 - ; T O H "h" c1 ; L -0.9 5.3 "mur" ; L 2.4 -0.5 "sol"
> Le mur, le sol et l'échelle forment un triangle rectangle ; l'échelle est l'hypoténuse.
> $h^2 = 5^2 - 1{,}4^2 = 25 - 1{,}96 = 23{,}04$, donc $h = \sqrt{23{,}04} = 4{,}8$ m.`]
] });