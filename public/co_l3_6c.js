/* MathSolver - Cours 3e, chapitre 7 : Trigonométrie (3/3) */
MSCOP("l3.6", { s: [
["Cas particuliers", String.raw`[R] Angles remarquables :: Ces valeurs exactes sont à connaître. Elles viennent du demi-triangle équilatéral (30° et 60°) et du demi-carré (45°).
$$\def\arraystretch{2.4}\begin{array}{c|ccc} x & 30^\circ & 45^\circ & 60^\circ \\ \hline \cos x & \dfrac{\sqrt{3}}{2} & \dfrac{\sqrt{2}}{2} & \dfrac{1}{2} \\ \sin x & \dfrac{1}{2} & \dfrac{\sqrt{2}}{2} & \dfrac{\sqrt{3}}{2} \\ \tan x & \dfrac{\sqrt{3}}{3} & 1 & \sqrt{3} \end{array}$$
[F] Demi-triangle équilatéral de côté 2 : la hauteur mesure $\sqrt{3}$, d'où $\sin 30^\circ = \dfrac{1}{2}$ et $\cos 30^\circ = \dfrac{\sqrt{3}}{2}$. :: P A 0 0 ; P B 2 0 ; P C 1 1.732 ; P H 1 0 s ; S A B ; S B C d ; S A C ; S C H c1 ; R A H C ; Q H A C c4 "60°" ; Q A C H c2 ; L 0.86 1.15 "30°" c2 ; T A H "1" ; T A C "2" ; T C H "√3" c1 -
[R] Angle de 45° :: Dans un triangle rectangle isocèle, les deux angles aigus valent $45^\circ$ et $\tan 45^\circ = 1$ : les deux côtés de l'angle droit sont égaux.
[R] Arrondis :: Garde les valeurs exactes ($\cos 35^\circ$, $\dfrac{4}{7}$…) dans la calculatrice et arrondis seulement le résultat final.`],
["Erreurs fréquentes", String.raw`[!] Triangle non rectangle :: Les formules CAH SOH TOA ne marchent que dans un triangle **rectangle**.
[!] Adjacent et opposé inversés :: Ils dépendent de l'angle choisi. Repasse le côté adjacent en couleur : il touche l'angle.
[!] L'hypoténuse comme côté adjacent :: L'hypoténuse touche aussi l'angle, mais ce n'est **jamais** le côté adjacent.
[!] Mode radians :: $\cos 60 = -0{,}95$ ? La calculatrice est en radians. En degrés, $\cos 60^\circ = 0{,}5$.
[!] Mauvaise touche :: Pour trouver un angle à partir de $\cos \widehat{D} = \dfrac{4}{7}$, il faut $\cos^{-1}$, pas $\cos$.
[!] Cosinus plus grand que 1 :: Si tu trouves $\cos x = 1{,}2$, il y a une erreur : le cosinus et le sinus d'un angle aigu sont entre 0 et 1.`],
["À retenir", String.raw`[K] L'essentiel :: Dans un triangle rectangle, pour un angle aigu $x$ : // $\cos x = \dfrac{\text{adj}}{\text{hyp}}$, $\sin x = \dfrac{\text{opp}}{\text{hyp}}$, $\tan x = \dfrac{\text{opp}}{\text{adj}}$ // $\cos^2 x + \sin^2 x = 1$ et $\tan x = \dfrac{\sin x}{\cos x}$
- Repérer l'angle, puis nommer hypoténuse, adjacent et opposé.
- Longueur : choisir la formule qui contient le connu et l'inconnu. Angle : touches $\cos^{-1}$, $\sin^{-1}$, $\tan^{-1}$.
- Calculatrice en mode degrés, arrondi à la fin.`]
], q: [
[String.raw`ABC est rectangle en A, avec $BC = 12$ cm et $\widehat{C} = 25^\circ$. Calculer $AB$ et $AC$ au dixième.`, String.raw`> Par rapport à $\widehat{C}$ : $[AB]$ est opposé, $[AC]$ est adjacent, $[BC]$ est l'hypoténuse.
> $AB = 12 \times \sin 25^\circ \approx 5{,}1$ cm et $AC = 12 \times \cos 25^\circ \approx 10{,}9$ cm.`],
[String.raw`MNP est rectangle en M, avec $MN = 6$ cm et $MP = 8$ cm. Calculer $\widehat{N}$ et $\widehat{P}$ au dixième de degré.`, String.raw`> Par rapport à $\widehat{N}$ : $[MP]$ est opposé et $[MN]$ est adjacent. $\tan \widehat{N} = \dfrac{8}{6} = \dfrac{4}{3}$, donc $\widehat{N} \approx 53{,}1^\circ$.
> Les angles aigus sont complémentaires : $\widehat{P} = 90^\circ - \widehat{N} \approx 36{,}9^\circ$.`],
[String.raw`Une rampe d'accès mesure 12 m de long et monte de 1 m. Quel angle fait-elle avec le sol (au dixième de degré) ?`, String.raw`> La rampe est l'hypoténuse et la hauteur est opposée à l'angle : $\sin a = \dfrac{1}{12}$.
> Avec $\sin^{-1}$ : $a \approx 4{,}8^\circ$.`],
[String.raw`ABC est rectangle en A, avec $BC = 10$ cm et $\widehat{B} = 45^\circ$. Calculer $AB$ en valeur exacte, puis au centième.`, String.raw`> $AB = 10 \times \cos 45^\circ = 10 \times \dfrac{\sqrt{2}}{2} = 5\sqrt{2}$ cm.
> $AB \approx 7{,}07$ cm.`],
[String.raw`$x$ est un angle aigu tel que $\sin x = 0{,}28$. Calculer $\cos x$ et $\tan x$.`, String.raw`> $\cos^2 x = 1 - 0{,}28^2 = 1 - 0{,}0784 = 0{,}9216$, et $\cos x > 0$, donc $\cos x = 0{,}96$.
> $\tan x = \dfrac{0{,}28}{0{,}96} = \dfrac{7}{24}$.`],
[String.raw`Le fil d'un cerf-volant mesure 50 m et fait un angle de $38^\circ$ avec le sol. À quelle hauteur vole le cerf-volant (au dixième) ?`, String.raw`> Le fil est l'hypoténuse, la hauteur est opposée à l'angle : $h = 50 \times \sin 38^\circ \approx 30{,}8$ m.`]
] });