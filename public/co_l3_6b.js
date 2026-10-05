/* MathSolver - Cours 3e, chapitre 7 : Trigonométrie (2/3) */
MSCOP("l3.6", { s: [
["Méthodes", String.raw`## Méthode 1 : calculer une longueur
1) Repérer l'angle droit, l'angle connu et nommer les trois côtés par rapport à cet angle.
2) Choisir la formule qui contient le côté connu et le côté cherché (CAH, SOH ou TOA).
3) Écrire l'égalité, puis isoler la longueur cherchée (produit en croix).
4) Calculer avec la calculatrice en **mode degrés**, et arrondir à la fin.
## Méthode 2 : calculer un angle
1) Nommer les deux côtés connus par rapport à l'angle cherché.
2) Calculer le cosinus, le sinus ou la tangente de l'angle.
3) Retrouver l'angle avec la touche $\cos^{-1}$, $\sin^{-1}$ ou $\tan^{-1}$ (parfois notée Arccos, Acs…).
[!] Calculatrice :: Vérifie le **mode degrés** (D ou DEG à l'écran). En mode radians, tous les résultats sont faux.`],
["Exemples corrigés", String.raw`## Exemple 1 : calculer deux longueurs
ABC est rectangle en A, avec $AB = 5$ cm et $\widehat{B} = 35^\circ$. Calculer $BC$ et $AC$ (au dixième).
[F] Par rapport à $\widehat{B}$ : $[AB]$ est adjacent, on cherche l'hypoténuse et le côté opposé. :: P A 0 0 ; P B 5 0 ; P C 0 3.5 ; S A B ; S A C c2 ; S B C c2 ; R B A C ; Q A B C c4 "35°" ; T A B "5 cm" ; T B C "?" c2 ; T A C "?" c2
> On connaît le côté adjacent ; pour l'hypoténuse, on utilise le cosinus : $\cos 35^\circ = \dfrac{AB}{BC}$.
> $BC = \dfrac{5}{\cos 35^\circ} \approx 6{,}1$ cm.
> Pour le côté opposé, on utilise la tangente : $\tan 35^\circ = \dfrac{AC}{AB}$, donc $AC = 5 \times \tan 35^\circ \approx 3{,}5$ cm.
## Exemple 2 : calculer un angle
DEF est rectangle en E, avec $DE = 4$ cm et $DF = 7$ cm. Calculer $\widehat{D}$ au dixième de degré.
[F] On connaît le côté adjacent à $\widehat{D}$ et l'hypoténuse. :: P E 0 0 ; P D 4 0 ; P F 0 5.74 ; S E D c1 ; S E F ; S D F c2 ; R D E F ; Q E D F c4 "?" ; T E D "4 cm" c1 ; T D F "7 cm" c2
> $[DE]$ est adjacent à $\widehat{D}$ et $[DF]$ est l'hypoténuse : $\cos \widehat{D} = \dfrac{DE}{DF} = \dfrac{4}{7}$.
> Avec la touche $\cos^{-1}$ : $\widehat{D} \approx 55{,}2^\circ$.
## Exemple 3 : une échelle
Une échelle de 5 m fait un angle de $70^\circ$ avec le sol horizontal. À quelle hauteur touche-t-elle le mur ? À quelle distance du mur est son pied ?
[F] L'échelle est l'hypoténuse ; l'angle de $70^\circ$ est au pied de l'échelle. :: p O 0 0 ; p W 0 5.4 ; p A -0.5 0 ; p B 2.6 0 ; p P 1.71 0 ; p H 0 4.7 ; S O W b ; S A B b ; S P H c2 b ; R H O P ; Q H P O c4 "70°" ; T P H "5 m" c2 - ; T O H "h" c1 ; L -0.9 5.3 "mur" ; L 2.3 -0.6 "sol"
> La hauteur $h$ est opposée à l'angle : $\sin 70^\circ = \dfrac{h}{5}$, donc $h = 5 \times \sin 70^\circ \approx 4{,}7$ m.
> La distance au mur est adjacente : $d = 5 \times \cos 70^\circ \approx 1{,}71$ m.
## Exemple 4 : valeurs exactes
ABC est rectangle en A, avec $BC = 8$ cm et $\widehat{B} = 60^\circ$. Calculer $AB$ et $AC$ en valeurs exactes.
> $AB = 8 \times \cos 60^\circ = 8 \times \dfrac{1}{2} = 4$ cm.
> $AC = 8 \times \sin 60^\circ = 8 \times \dfrac{\sqrt{3}}{2} = 4\sqrt{3}$ cm $\approx 6{,}93$ cm.
## Exemple 5 : utiliser les relations
$x$ est un angle aigu tel que $\cos x = 0{,}6$. Calculer $\sin x$ et $\tan x$.
> $\sin^2 x = 1 - \cos^2 x = 1 - 0{,}36 = 0{,}64$. Comme $\sin x > 0$ : $\sin x = 0{,}8$.
> $\tan x = \dfrac{\sin x}{\cos x} = \dfrac{0{,}8}{0{,}6} = \dfrac{4}{3}$.
## Exemple 6 : la hauteur d'une tour
Depuis un point O situé à 30 m du pied B d'une tour, on voit le sommet C sous un angle de $40^\circ$ avec l'horizontale. Calculer la hauteur $h$ de la tour au dixième.
[F] OBC est rectangle en B ; $[OB]$ est adjacent à l'angle, $h$ est opposé. :: P O 0 0 so ; P B 30 0 se ; P C 30 25.17 ; S O B ; S B C c1 b ; S O C c2 d ; R O B C ; Q B O C c4 "40°" ; T O B "30 m" ; T B C "h" c1
> $\tan 40^\circ = \dfrac{BC}{OB} = \dfrac{h}{30}$, donc $h = 30 \times \tan 40^\circ \approx 25{,}2$ m.`]
] });