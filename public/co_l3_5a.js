/* MathSolver - Cours 3e, chapitre 6 : Théorème de Thalès (1/3) */
MSCOP("l3.5", { t: "Théorème de Thalès", s: [
["Introduction", String.raw`Le théorème de Thalès relie des longueurs dans une figure où deux droites **parallèles** coupent deux droites **sécantes**. Il permet :
- de **calculer une longueur** inconnue à partir de longueurs connues ;
- de **prouver que deux droites sont parallèles** (ou qu'elles ne le sont pas).
[R] Dans la vie courante :: Pour mesurer la hauteur d'un arbre sans y grimper, on compare son ombre à celle d'un bâton : les rayons du soleil sont parallèles. C'est le théorème de Thalès.`],
["Définitions", String.raw`[D] Droites sécantes :: Deux droites sont sécantes lorsqu'elles se coupent en un seul point.
[D] Configuration de Thalès :: Deux droites (d) et (d') sont sécantes en A. Les points B et M sont sur (d), les points C et N sont sur (d'), tous distincts de A. Les droites (MN) et (BC) sont parallèles.
[F] Configuration « triangle » : M est sur $[AB]$, N est sur $[AC]$, et $(MN) \parallel (BC)$. :: P A -0.43 4.98 ; P B 0 0 ; P C 4 0 ; P M -0.26 2.99 o ; P N 1.34 2.99 e ; S A B ; S A C ; S M N c1 b ; S B C c1 b
[F] Configuration « papillon » : les droites $(BM)$ et $(CN)$ se coupent en A, et $(MN) \parallel (BC)$. :: P A 0 0 n ; P B 2.32 1.9 ; P C 3.1 -2.53 ; P M -1.16 -0.95 ; P N -1.55 1.27 ; S B M ; S C N ; S M N c1 b ; S B C c1 b
[D] Rapport de longueurs :: Le rapport $\dfrac{AM}{AB}$ compare deux longueurs. Dans une configuration de Thalès, il vaut aussi $\dfrac{AN}{AC}$ et $\dfrac{MN}{BC}$ : les longueurs sont **proportionnelles**.`],
["Propriétés", String.raw`[P] Théorème de Thalès :: Si les droites $(BM)$ et $(CN)$ sont sécantes en A et si les droites $(MN)$ et $(BC)$ sont parallèles, alors : // $\dfrac{AM}{AB} = \dfrac{AN}{AC} = \dfrac{MN}{BC}$
[P] Réciproque du théorème de Thalès :: Si les points A, M, B et les points A, N, C sont alignés **dans le même ordre**, et si $\dfrac{AM}{AB} = \dfrac{AN}{AC}$, alors les droites $(MN)$ et $(BC)$ sont parallèles.
[P] Conséquence (contraposée) :: Si $\dfrac{AM}{AB} \neq \dfrac{AN}{AC}$, alors les droites $(MN)$ et $(BC)$ **ne sont pas** parallèles.
[R] Le bon tableau :: Les trois rapports mettent toujours au numérateur les côtés du **petit** triangle AMN, et au dénominateur les côtés correspondants du **grand** triangle ABC. On peut les ranger dans un tableau de proportionnalité : // $AM$, $AN$, $MN$ (triangle AMN) // $AB$, $AC$, $BC$ (triangle ABC)
[R] Produit en croix :: Si $\dfrac{a}{b} = \dfrac{c}{d}$, alors $a \times d = b \times c$. C'est l'outil pour calculer la longueur inconnue.`]
] });