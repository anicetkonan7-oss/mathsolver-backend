/* MathSolver - Cours 3e, chapitre 11 : Angles (1/3) */
MSCOP("l3.10", { t: "Angles", s: [
["Introduction", String.raw`Les angles décrivent l'**ouverture** entre deux demi-droites. Connaître leurs propriétés permet de calculer un angle sans rapporteur : dans un triangle, avec des droites parallèles, dans un polygone ou dans un cercle.
[R] Dans la vie courante :: Les charpentiers, les architectes et les géomètres calculent des angles pour construire un toit, une route en virage ou un terrain de sport.`],
["Définitions", String.raw`[D] Types d'angles :: Un angle est **aigu** s'il mesure moins de $90^\circ$, **droit** s'il mesure $90^\circ$, **obtus** entre $90^\circ$ et $180^\circ$, **plat** s'il mesure $180^\circ$.
[D] Complémentaires et supplémentaires :: Deux angles sont **complémentaires** si leur somme vaut $90^\circ$, **supplémentaires** si leur somme vaut $180^\circ$.
[D] Opposés par le sommet :: Deux angles opposés par le sommet ont le même sommet et des côtés dans le prolongement l'un de l'autre. Ils ont la **même mesure**.
[D] Alternes-internes et correspondants :: Une droite sécante coupe deux droites $(d)$ et $(d')$. Deux angles **alternes-internes** sont de part et d'autre de la sécante, entre $(d)$ et $(d')$. Deux angles **correspondants** sont du même côté de la sécante, à la même place.
[D] Angle inscrit et angle au centre :: Dans un cercle de centre O, l'angle $\widehat{ACB}$ est **inscrit** (son sommet C est sur le cercle) ; l'angle $\widehat{AOB}$ est l'angle **au centre** qui intercepte le même arc $\overset{\frown}{AB}$.`],
["Propriétés", String.raw`[P] Somme des angles d'un triangle :: Dans tout triangle, $\widehat{A} + \widehat{B} + \widehat{C} = 180^\circ$.
[F] La somme des trois angles vaut $48^\circ + 67^\circ + 65^\circ = 180^\circ$. :: P A 0 0 ; P B 6 0 ; P C 4.08 4.53 ; S A B ; S B C ; S A C ; Q B A C c1 "48°" ; Q C B A c2 "67°" ; Q A C B c3 "65°"
[P] Triangles particuliers :: Dans un triangle **isocèle**, les deux angles à la base sont égaux. Dans un triangle **équilatéral**, chaque angle mesure $60^\circ$.
[P] Droites parallèles :: Si deux droites parallèles sont coupées par une sécante, les angles alternes-internes sont égaux et les angles correspondants sont égaux. // Réciproquement, si deux angles alternes-internes (ou correspondants) sont égaux, les droites sont parallèles.
[F] $(d) \parallel (d')$ : les deux angles alternes-internes mesurent $52^\circ$. :: p A -1 0 ; p B 7 0 ; p C -1 3 ; p D 7 3 ; P P 1 0 s ; P Q 3.34 3 n ; p U -0.17 -1.5 ; p V 4.51 4.5 ; S A B c1 b ; S C D c1 b ; S U V ; Q B P Q c2 "52°" ; Q C Q P c2 "52°" ; L 6.7 0.4 "(d)" c1 ; L 6.7 3.4 "(d')" c1
[P] Somme des angles d'un polygone :: La somme des angles d'un polygone convexe à $n$ côtés vaut $(n - 2) \times 180^\circ$.
[P] Angle inscrit et angle au centre :: Un angle au centre mesure le **double** de l'angle inscrit qui intercepte le même arc : $\widehat{AOB} = 2 \times \widehat{ACB}$. // Deux angles inscrits qui interceptent le même arc sont égaux.
[F] L'angle au centre $\widehat{AOB} = 70^\circ$ est le double de l'angle inscrit $\widehat{ACB} = 35^\circ$. :: P O 0 0 s ; P A 2.82 -1.03 ; P B 1.93 2.3 ; P C -2.82 -1.03 ; C O 3 ; S O A c1 ; S O B c1 ; S C A c2 ; S C B c2 ; Q A O B c1 "70°" ; Q A C B c2 "35°"`]
] });