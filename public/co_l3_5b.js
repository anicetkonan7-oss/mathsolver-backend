/* MathSolver - Cours 3e, chapitre 6 : Théorème de Thalès (2/3) */
MSCOP("l3.5", { s: [
["Méthodes", String.raw`## Méthode 1 : calculer une longueur
1) Citer les deux droites sécantes et leur point commun.
2) Citer les deux droites parallèles (c'est une donnée de l'énoncé).
3) Écrire les trois rapports égaux $\dfrac{AM}{AB} = \dfrac{AN}{AC} = \dfrac{MN}{BC}$.
4) Remplacer par les longueurs connues, garder les deux rapports utiles.
5) Calculer la longueur inconnue avec un produit en croix.
## Méthode 2 : prouver que deux droites sont parallèles
1) Vérifier que A, M, B et A, N, C sont alignés **dans le même ordre**.
2) Calculer **séparément** $\dfrac{AM}{AB}$ et $\dfrac{AN}{AC}$.
3) S'ils sont égaux, conclure avec la **réciproque** du théorème de Thalès.
## Méthode 3 : prouver que deux droites ne sont pas parallèles
Mêmes calculs qu'à la méthode 2. Si les deux rapports sont **différents**, conclure avec la **contraposée** : les droites ne sont pas parallèles.
[!] Comparer des rapports :: Pour comparer $\dfrac{a}{b}$ et $\dfrac{c}{d}$, on compare les produits en croix $a \times d$ et $b \times c$, ou on calcule des valeurs exactes. On ne compare jamais des valeurs arrondies.`],
["Exemples corrigés", String.raw`## Exemple 1 : calculer deux longueurs
Les droites $(BM)$ et $(CN)$ sont sécantes en A, avec $M \in [AB]$, $N \in [AC]$ et $(MN) \parallel (BC)$. On sait que $AM = 3$, $AB = 7{,}5$, $AN = 4$ et $MN = 2{,}4$ (en cm). Calculer $AC$ et $BC$.
[F] $AM = 3$, $AB = 7{,}5$, $AN = 4$, $MN = 2{,}4$ ; on cherche $AC$ et $BC$. :: P A -0.43 4.98 ; P B 0 0 ; P C 4 0 ; P M -0.26 2.99 o ; P N 1.34 2.99 e ; S A B ; S A C c2 ; S M N c1 b ; S B C c1 b ; T A M "3" ; T A N "4" ; T M N "2,4" c1 ; T A C "?" c2 ; T B C "?" c2
> Les droites $(BM)$ et $(CN)$ sont sécantes en A et $(MN) \parallel (BC)$. D'après le théorème de Thalès :
> $\dfrac{AM}{AB} = \dfrac{AN}{AC} = \dfrac{MN}{BC}$, soit $\dfrac{3}{7{,}5} = \dfrac{4}{AC} = \dfrac{2{,}4}{BC}$.
> $AC = \dfrac{4 \times 7{,}5}{3} = \dfrac{30}{3} = 10$ cm.
> $BC = \dfrac{2{,}4 \times 7{,}5}{3} = \dfrac{18}{3} = 6$ cm.
## Exemple 2 : configuration papillon
Les droites $(BM)$ et $(CN)$ se coupent en A, et $(MN) \parallel (BC)$. On sait que $AB = 6$, $AC = 8$, $AM = 3$ et $MN = 4{,}5$ (en cm). Calculer $AN$ et $BC$.
[F] Configuration papillon : A est entre B et M, et entre C et N. :: P A 0 0 n ; P B 2.32 1.9 ; P C 3.1 -2.53 ; P M -1.16 -0.95 ; P N -1.55 1.27 ; S B M ; S C N ; S M N c1 b ; S B C c1 b ; T A B "6" ; T A C "8" ; T A M "3" ; T M N "4,5" c1 ; T B C "?" c2
> D'après le théorème de Thalès : $\dfrac{AM}{AB} = \dfrac{AN}{AC} = \dfrac{MN}{BC}$, soit $\dfrac{3}{6} = \dfrac{AN}{8} = \dfrac{4{,}5}{BC}$.
> $AN = \dfrac{3 \times 8}{6} = 4$ cm et $BC = \dfrac{4{,}5 \times 6}{3} = 9$ cm.
## Exemple 3 : prouver que deux droites sont parallèles
A, M, B et A, N, C sont alignés dans le même ordre, avec $AM = 4$, $AB = 10$, $AN = 6$ et $AC = 15$. Les droites $(MN)$ et $(BC)$ sont-elles parallèles ?
> D'une part : $\dfrac{AM}{AB} = \dfrac{4}{10} = 0{,}4$. D'autre part : $\dfrac{AN}{AC} = \dfrac{6}{15} = 0{,}4$.
> Les rapports sont égaux et les points sont dans le même ordre. D'après la réciproque du théorème de Thalès, $(MN) \parallel (BC)$.
## Exemple 4 : prouver que deux droites ne sont pas parallèles
A, M, B et A, N, C sont alignés dans le même ordre, avec $AM = 5$, $AB = 8$, $AN = 6$ et $AC = 10$.
> Produits en croix : $AM \times AC = 5 \times 10 = 50$ et $AB \times AN = 8 \times 6 = 48$.
> $50 \neq 48$, donc $\dfrac{AM}{AB} \neq \dfrac{AN}{AC}$ : les droites $(MN)$ et $(BC)$ ne sont pas parallèles.
## Exemple 5 : la hauteur d'un arbre
Un bâton vertical de 1,5 m a une ombre qui se termine au même point A que celle d'un arbre. Le pied du bâton est à 2 m de A, le pied de l'arbre à 12 m de A. Quelle est la hauteur de l'arbre ?
[F] Le bâton et l'arbre sont verticaux, donc parallèles ; le rayon de soleil passe par A, N et C. :: P A 0 0 so ; P M 2 0 s ; P N 2 1.5 no ; P B 12 0 s ; P C 12 9 ; S A B ; S A C c2 d ; S M N c1 b ; S B C c1 b ; R A M N ; R A B C ; T M N "1,5 m" c1 - ; T B C "h" c1 ; L 1 -2.2 "AM = 2 m" ; L 8 -2.2 "AB = 12 m"
> Les droites $(MB)$ et $(NC)$ sont sécantes en A et $(MN) \parallel (BC)$. D'après le théorème de Thalès : $\dfrac{AM}{AB} = \dfrac{MN}{BC}$.
> $\dfrac{2}{12} = \dfrac{1{,}5}{h}$, donc $h = \dfrac{1{,}5 \times 12}{2} = 9$ m.
## Exemple 6 : agrandissement et réduction
Le triangle ABC a une aire de $15$ cm². $M \in [AB]$, $N \in [AC]$, $(MN) \parallel (BC)$ et $\dfrac{AM}{AB} = 0{,}4$. Calculer l'aire du triangle AMN.
> AMN est une réduction de ABC de coefficient $k = 0{,}4$. Les aires sont multipliées par $k^2 = 0{,}16$.
> Aire de AMN $= 0{,}16 \times 15 = 2{,}4$ cm².`]
] });