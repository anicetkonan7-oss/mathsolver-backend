/* MathSolver - Cours 3e, chapitre 12 : Volumes (1/3) */
MSCOP("l3.11", { t: "Volumes", s: [
["Introduction", String.raw`Le **volume** mesure l'espace occupé par un solide, ou la quantité qu'il peut contenir. On l'utilise pour une citerne, un réservoir, une boîte, un ballon, un tas de sable…
[R] Dans la vie courante :: Une citerne cylindrique de 1 m de rayon et 2 m de haut contient environ 6 283 litres d'eau : c'est un calcul de volume.`],
["Définitions", String.raw`[D] Unités de volume :: $1 \text{ m}^3 = 1\,000 \text{ dm}^3$ et $1 \text{ dm}^3 = 1\,000 \text{ cm}^3$. Chaque rang se multiplie par **1 000**.
[D] Volume et contenance :: $1 \text{ dm}^3 = 1$ L (litre) et $1 \text{ cm}^3 = 1$ mL. Donc $1 \text{ m}^3 = 1\,000$ L.
[D] Solides usuels :: Le **pavé droit** et le **cube**, le **prisme droit** et le **cylindre** (deux bases identiques et parallèles), la **pyramide** et le **cône** (une base et un sommet), la **boule** (limitée par une sphère).
[F] Pavé droit de longueur $L$, largeur $\ell$ et hauteur $h$ ; les arêtes cachées sont en pointillés. :: p A 0 0 ; p B 5 0 ; p C 6.5 1 ; p D 1.5 1 ; p E 0 3 ; p F 5 3 ; p G 6.5 4 ; p H 1.5 4 ; G A B F E c1 b ; S B C c1 b ; S C G c1 b ; S G F c1 b ; S E H c1 b ; S H G c1 b ; S A D c1 d ; S D C c1 d ; S D H c1 d ; T A B "L" ; T B C "ℓ" - ; T A E "h"
[F] Cylindre de rayon $r$ et de hauteur $h$ : ses deux bases sont des disques. :: p L -2 0 ; p R 2 0 ; p T1 -2 4 ; p T2 2 4 ; p B1 0 -0.6 ; p B2 0 4.6 ; p O 0 0 ; p O2 0 4 ; F "4+0.6*sqrt(1-(x/2)^2)" -2 2 c1 b ; F "4-0.6*sqrt(1-(x/2)^2)" -2 2 c1 b ; F "-0.6*sqrt(1-(x/2)^2)" -2 2 c1 b ; F "0.6*sqrt(1-(x/2)^2)" -2 2 c1 d ; S L T1 c1 b ; S R T2 c1 b ; S O R c2 ; S O O2 c4 d ; T O R "r" c2 - ; T O O2 "h" c4`],
["Propriétés", String.raw`## Les formules à connaître
- **Pavé droit** : $V = L \times \ell \times h$. **Cube** d'arête $a$ : $V = a^3$.
- **Prisme droit** et **cylindre** : $V = \text{aire de la base} \times h$. Cylindre : $V = \pi r^2 h$.
- **Pyramide** et **cône** : $V = \dfrac{\text{aire de la base} \times h}{3}$. Cône : $V = \dfrac{1}{3}\pi r^2 h$.
- **Boule** de rayon $r$ : $V = \dfrac{4}{3}\pi r^3$. Aire de la **sphère** : $A = 4\pi r^2$.
[P] Un tiers :: Une pyramide (ou un cône) a un volume égal au **tiers** de celui du prisme (ou du cylindre) de même base et de même hauteur.
[F] Cône de rayon $r$ et de hauteur $h$ : $V = \dfrac{1}{3}\pi r^2 h$, le tiers du cylindre de même base et même hauteur. :: p L -2 0 ; p R 2 0 ; p S 0 4.5 ; p B1 0 -0.6 ; p O 0 0 ; F "-0.6*sqrt(1-(x/2)^2)" -2 2 c1 b ; F "0.6*sqrt(1-(x/2)^2)" -2 2 c1 d ; S L S c1 b ; S R S c1 b ; S O R c2 ; S O S c4 d ; R R O S ; T O R "r" c2 - ; T O S "h" c4
[F] Pyramide à base carrée : la hauteur relie le sommet au centre de la base. :: p A 0 0 ; p B 4 0 ; p C 5.5 1.5 ; p D 1.5 1.5 ; p S 2.75 5 ; p H 2.75 0.75 ; S A B c1 b ; S B C c1 b ; S A D c1 d ; S D C c1 d ; S S A c1 b ; S S B c1 b ; S S C c1 b ; S S D c1 d ; S S H c4 d ; T S H "h" c4
[F] Boule de rayon $r$ : $V = \dfrac{4}{3}\pi r^3$. :: p O 0 0 ; p R 2.5 0 ; C O 2.5 c1 b ; F "-0.7*sqrt(1-(x/2.5)^2)" -2.5 2.5 c1 ; F "0.7*sqrt(1-(x/2.5)^2)" -2.5 2.5 c1 d ; S O R c2 ; T O R "r" c2`]
] });