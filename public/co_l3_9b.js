/* MathSolver - Cours 3e, chapitre 10 : Périmètres et aires (2/3) */
MSCOP("l3.9", { s: [
["Méthodes", String.raw`## Méthode 1 : calculer un périmètre
1) Repérer **tous** les morceaux du contour (côtés, arcs de cercle).
2) Les mettre dans la **même unité**, puis les additionner.
## Méthode 2 : calculer une aire
1) Reconnaître la figure et choisir la bonne formule.
2) Repérer la base et la hauteur **perpendiculaire** (ou les diagonales, le rayon).
3) Remplacer, calculer, et écrire l'unité au carré (cm², m²…).
## Méthode 3 : figure composée
1) Découper la figure en figures simples (rectangle, triangle, demi-disque…).
2) Calculer l'aire de chaque morceau, puis **additionner** (ou **soustraire** un trou).
3) Pour le périmètre, ne compter que le **contour extérieur**.
## Méthode 4 : changer d'unité d'aire
On multiplie ou on divise par **100** à chaque rang : m² → dm² → cm² → mm².
[!] Valeur exacte :: Avec $\pi$, donne d'abord la valeur exacte (par exemple $9\pi$), puis l'arrondi demandé.`],
["Exemples corrigés", String.raw`## Exemple 1 : rectangle
Un terrain rectangulaire mesure 12 m sur 7,5 m. Calculer son périmètre et son aire.
> $P = 2 \times (12 + 7{,}5) = 2 \times 19{,}5 = 39$ m.
> $A = 12 \times 7{,}5 = 90$ m².
## Exemple 2 : triangle
Calculer l'aire d'un triangle de base 10 cm et de hauteur 6 cm.
[F] La hauteur de 6 cm est perpendiculaire à la base de 10 cm. :: P A 0 0 ; P B 10 0 ; P C 3 6 ; p H 3 0 ; S A B ; S B C ; S A C ; S C H c2 d ; R A H C ; T A B "10 cm" ; T C H "6 cm" c2 -
> $A = \dfrac{b \times h}{2} = \dfrac{10 \times 6}{2} = 30$ cm².
## Exemple 3 : trapèze
Un trapèze a pour bases 8 cm et 5 cm et pour hauteur 4 cm. Calculer son aire.
> $A = \dfrac{(B + b) \times h}{2} = \dfrac{(8 + 5) \times 4}{2} = \dfrac{52}{2} = 26$ cm².
## Exemple 4 : cercle et disque
Un disque a pour rayon 3 cm. Calculer le périmètre de son cercle et son aire.
> $P = 2\pi r = 2 \times \pi \times 3 = 6\pi \approx 18{,}85$ cm.
> $A = \pi r^2 = \pi \times 3^2 = 9\pi \approx 28{,}27$ cm².
## Exemple 5 : figure composée
La figure est formée d'un rectangle de 8 m sur 4 m et d'un demi-disque de diamètre 4 m. Calculer son aire et son périmètre.
[F] Rectangle + demi-disque : le côté en pointillés est à l'intérieur, il ne fait pas partie du contour. :: p A 0 0 ; p B 8 0 ; p C 8 4 ; p D 0 4 ; p E 10 2 ; S B A c1 b ; S A D c1 b ; S D C c1 b ; S B C c2 d ; F "2+sqrt(4-(x-8)^2)" 8 10 c1 b ; F "2-sqrt(4-(x-8)^2)" 8 10 c1 b ; T A B "8 m" ; T A D "4 m"
> Aire du rectangle : $8 \times 4 = 32$ m². Aire du demi-disque (rayon 2 m) : $\dfrac{\pi \times 2^2}{2} = 2\pi$ m².
> Aire totale : $32 + 2\pi \approx 38{,}28$ m².
> Contour : $8 + 4 + 8$ m de côtés, plus le demi-cercle $\dfrac{2\pi \times 2}{2} = 2\pi$ m.
> Périmètre : $20 + 2\pi \approx 26{,}28$ m.
## Exemple 6 : hectares et clôture
Un champ rectangulaire mesure 150 m sur 80 m. Calculer son aire en hectares, puis le prix d'une clôture à 1 500 F le mètre.
> $A = 150 \times 80 = 12\,000$ m² $= 1{,}2$ ha (car $1 \text{ ha} = 10\,000$ m²).
> $P = 2 \times (150 + 80) = 460$ m, donc le prix est $460 \times 1\,500 = 690\,000$ F CFA.`]
] });