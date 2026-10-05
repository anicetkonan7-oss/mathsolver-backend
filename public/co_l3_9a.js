/* MathSolver - Cours 3e, chapitre 10 : Périmètres et aires (1/3) */
MSCOP("l3.9", { t: "Périmètres et aires", s: [
["Introduction", String.raw`Le **périmètre** mesure le **tour** d'une figure ; l'**aire** mesure la **surface** qu'elle occupe. Ces calculs servent dès qu'on clôture, peint, carrelle ou achète un terrain.
[R] Dans la vie courante :: Pour clôturer un champ, on a besoin de son périmètre (longueur de grillage). Pour le semer ou le vendre, on a besoin de son aire (en m² ou en hectares).`],
["Définitions", String.raw`[D] Périmètre :: Le périmètre d'une figure est la **longueur de son contour**. Il s'exprime en unités de longueur : mm, cm, m, km.
[D] Aire :: L'aire d'une figure est la **mesure de la surface** qu'elle occupe. Elle s'exprime en unités d'aire : mm², cm², m², km².
[F] Pour un rectangle de longueur $L$ et de largeur $\ell$ : le contour (en bleu) donne le périmètre, l'intérieur (coloré) donne l'aire. :: p A 0 0 ; p B 6 0 ; p C 6 3.5 ; p D 0 3.5 ; G A B C D c1 b ; T A B "L" ; T B C "ℓ" ; L 3 1.75 "aire" c1
[D] Unités d'aire :: $1 \text{ m}^2 = 100 \text{ dm}^2 = 10\,000 \text{ cm}^2$. // Pour les terrains : $1 \text{ a} = 100 \text{ m}^2$ (are) et $1 \text{ ha} = 10\,000 \text{ m}^2$ (hectare).
[R] Pourquoi 100 et pas 10 :: $1 \text{ m} = 10 \text{ dm}$, donc un carré de 1 m de côté contient $10 \times 10 = 100$ carrés de 1 dm de côté.`],
["Propriétés", String.raw`## Les formules à connaître
- **Carré** de côté $c$ : $P = 4c$ ; $A = c^2$.
- **Rectangle** : $P = 2(L + \ell)$ ; $A = L \times \ell$.
- **Triangle** de base $b$ et de hauteur $h$ : $A = \dfrac{b \times h}{2}$.
- **Parallélogramme** : $A = b \times h$.
- **Trapèze** de bases $B$ et $b$ : $A = \dfrac{(B + b) \times h}{2}$.
- **Losange** de diagonales $D$ et $d$ : $A = \dfrac{D \times d}{2}$.
- **Cercle et disque** de rayon $r$ : $P = 2\pi r$ ; $A = \pi r^2$.
[P] Hauteur :: La hauteur est **perpendiculaire** à la base. Elle peut tomber à l'extérieur de la figure (triangle obtus).
[F] Triangle : la hauteur $h$ relie un sommet à la base, en formant un angle droit. :: P A 0 0 ; P B 6 0 ; P C 2 4 ; p H 2 0 ; S A B ; S B C ; S A C ; S C H c2 d ; R A H C ; T A B "base b" ; T C H "h" c2 -
[F] Trapèze : les bases $B$ et $b$ sont parallèles, la hauteur $h$ leur est perpendiculaire. :: P A 0 0 ; P B 8 0 ; P C 6 4 ; P D 1 4 ; p H 1 0 ; G A B C D c1 ; S D H c2 d ; R A H D ; T A B "B" ; T D C "b" ; T D H "h" c2 -
[F] Losange : $A = \dfrac{D \times d}{2}$, où $D$ et $d$ sont les diagonales, perpendiculaires. :: P A -5 0 ; P B 0 3 ; P C 5 0 ; P E 0 -3 ; p O 0 0 ; G A B C E c4 ; S A C c2 d ; S B E c2 d ; R C O B ; L 2.5 -0.5 "D" c2 ; L 0.5 1.5 "d" c2
[F] Cercle de centre O et de rayon $r$ : $P = 2\pi r$ et $A = \pi r^2$. :: P O 0 0 so ; p A 3 0 ; C O 3 c1 b ; S O A c2 ; T O A "r" c2`]
] });