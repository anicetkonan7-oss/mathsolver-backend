/* MathSolver - Cours 3e, chapitre 11 : Angles (2/3) */
MSCOP("l3.10", { s: [
["Méthodes", String.raw`## Méthode 1 : calculer un angle dans un triangle
Soustraire de $180^\circ$ la somme des deux angles connus. Utiliser aussi les propriétés du triangle isocèle ou équilatéral.
## Méthode 2 : utiliser des droites parallèles
1) Repérer la sécante et les deux droites parallèles.
2) Reconnaître des angles alternes-internes ou correspondants : ils sont égaux.
3) Citer la propriété dans la rédaction.
## Méthode 3 : prouver que deux droites sont parallèles
Montrer que deux angles alternes-internes (ou correspondants) sont égaux, puis conclure avec la réciproque.
## Méthode 4 : angles dans un cercle
Repérer l'arc intercepté. L'angle au centre vaut le double de l'angle inscrit ; deux angles inscrits qui interceptent le même arc sont égaux.
[!] Rédaction :: On cite toujours la propriété utilisée : « Dans un triangle, la somme des angles vaut 180° », « Les angles alternes-internes formés par des parallèles sont égaux »…`],
["Exemples corrigés", String.raw`## Exemple 1 : angle d'un triangle
Dans un triangle ABC, $\widehat{A} = 48^\circ$ et $\widehat{B} = 67^\circ$. Calculer $\widehat{C}$.
> Dans un triangle, la somme des angles vaut $180^\circ$ : $\widehat{C} = 180^\circ - 48^\circ - 67^\circ = 65^\circ$.
## Exemple 2 : triangle isocèle
Un triangle isocèle a un angle au sommet de $40^\circ$. Calculer ses angles à la base.
> Les deux angles à la base sont égaux : chacun vaut $\dfrac{180^\circ - 40^\circ}{2} = 70^\circ$.
## Exemple 3 : droites parallèles
Deux droites parallèles sont coupées par une sécante. Un angle alterne-interne mesure $52^\circ$. Que mesure l'autre ? Et l'angle qui lui est adjacent sur la même droite ?
> Les angles alternes-internes formés par des parallèles sont égaux : l'autre mesure $52^\circ$.
> L'angle adjacent forme un angle plat avec lui : $180^\circ - 52^\circ = 128^\circ$.
## Exemple 4 : polygones
Calculer la somme des angles d'un hexagone, puis la mesure de chaque angle d'un hexagone régulier.
> Somme : $(6 - 2) \times 180^\circ = 720^\circ$. Hexagone régulier : $\dfrac{720^\circ}{6} = 120^\circ$ par angle.
[F] Hexagone régulier : chaque angle mesure $120^\circ$. :: P A 2.5 0 ; P B 1.25 2.17 ; P C -1.25 2.17 ; P D -2.5 0 ; P E -1.25 -2.17 ; P F 1.25 -2.17 ; G A B C D E F c1 b ; Q C B A c2 "120°"
## Exemple 5 : angle au centre
Dans un cercle de centre O, l'angle inscrit $\widehat{ACB}$ mesure $35^\circ$. Calculer l'angle au centre $\widehat{AOB}$.
> L'angle au centre est le double de l'angle inscrit qui intercepte le même arc : $\widehat{AOB} = 2 \times 35^\circ = 70^\circ$.
## Exemple 6 : triangle inscrit dans un demi-cercle
$[AB]$ est un diamètre d'un cercle et M un point du cercle, avec $\widehat{MAB} = 32^\circ$. Calculer $\widehat{AMB}$ et $\widehat{MBA}$.
[F] Un triangle inscrit dans un cercle, dont un côté est un diamètre, est rectangle. :: P A -3 0 o ; P B 3 0 e ; P M 1.32 2.7 n ; p O 0 0 ; C O 3 ; S A B c1 ; S A M ; S M B ; R A M B ; Q B A M c2 "32°"
> Le triangle AMB est inscrit dans le cercle de diamètre $[AB]$ : il est rectangle en M, donc $\widehat{AMB} = 90^\circ$.
> $\widehat{MBA} = 180^\circ - 90^\circ - 32^\circ = 58^\circ$.`]
] });