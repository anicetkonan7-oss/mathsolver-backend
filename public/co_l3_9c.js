/* MathSolver - Cours 3e, chapitre 10 : Périmètres et aires (3/3) */
MSCOP("l3.9", { s: [
["Cas particuliers", String.raw`[R] Triangle rectangle :: Les deux côtés de l'angle droit sont une base et sa hauteur : $A = \dfrac{\text{côté} \times \text{côté}}{2}$.
[R] Carré et losange :: Un carré est un losange : avec ses diagonales $d$, son aire vaut aussi $\dfrac{d \times d}{2}$.
[R] Figure avec un trou :: Aire de la figure = aire extérieure **moins** aire du trou.
[R] Agrandissement :: Si on multiplie toutes les longueurs par $k$, le périmètre est multiplié par $k$ et l'aire par $k^2$. Doubler les côtés d'un carré multiplie son aire par 4.
[R] Même aire, périmètres différents :: Un carré de 4 cm de côté et un rectangle de 8 cm sur 2 cm ont la même aire (16 cm²), mais des périmètres différents (16 cm et 20 cm).`],
["Erreurs fréquentes", String.raw`[!] Confondre périmètre et aire :: Le périmètre est une **longueur** (m), l'aire une **surface** (m²).
[!] Oublier de diviser par 2 :: Pour le triangle, le trapèze et le losange, la formule contient « $\div 2$ ».
[!] Mauvaise hauteur :: Pour un triangle ou un parallélogramme, la hauteur est perpendiculaire à la base. Le côté oblique n'est pas la hauteur.
[!] Rayon ou diamètre :: Les formules utilisent le **rayon**. Si on te donne le diamètre, divise-le par 2.
[!] Conversions d'aires :: $1 \text{ m}^2 = 10\,000 \text{ cm}^2$, et non 100 cm².
[!] Figure composée :: Dans le périmètre, ne compte pas les côtés intérieurs (le pointillé de l'exemple 5).`],
["À retenir", String.raw`[K] L'essentiel :: Périmètre : longueur du contour. Aire : mesure de la surface, en unités au carré. // Rectangle : $A = L \times \ell$. Triangle : $A = \dfrac{b \times h}{2}$. Trapèze : $A = \dfrac{(B + b) \times h}{2}$. // Disque : $A = \pi r^2$ ; cercle : $P = 2\pi r$.
- La hauteur est toujours perpendiculaire à la base.
- Les unités d'aire vont de 100 en 100 ; $1 \text{ ha} = 10\,000$ m².
- Figure composée : découper, calculer, additionner ou soustraire.`]
], q: [
[String.raw`Un carré a pour côté 7,5 cm. Calculer son périmètre et son aire.`, String.raw`> $P = 4 \times 7{,}5 = 30$ cm.
> $A = 7{,}5^2 = 56{,}25$ cm².`],
[String.raw`Un losange a pour diagonales 10 cm et 6 cm. Calculer son aire.`, String.raw`> $A = \dfrac{D \times d}{2} = \dfrac{10 \times 6}{2} = 30$ cm².`],
[String.raw`Un parallélogramme a une base de 9 cm et une hauteur de 5 cm. Calculer son aire.`, String.raw`> $A = b \times h = 9 \times 5 = 45$ cm².`],
[String.raw`Un disque a pour diamètre 10 cm. Calculer la valeur exacte puis l'arrondi au centième de son aire et du périmètre de son cercle.`, String.raw`> Le rayon vaut $10 \div 2 = 5$ cm.
> $A = \pi \times 5^2 = 25\pi \approx 78{,}54$ cm² et $P = 2 \times \pi \times 5 = 10\pi \approx 31{,}42$ cm.`],
[String.raw`Un triangle rectangle a des côtés de l'angle droit de 6 cm et 8 cm. Calculer son aire et son périmètre.`, String.raw`> $A = \dfrac{6 \times 8}{2} = 24$ cm².
> D'après Pythagore, l'hypoténuse vaut $\sqrt{36 + 64} = \sqrt{100} = 10$ cm, donc $P = 6 + 8 + 10 = 24$ cm.`],
[String.raw`Un jardin rectangulaire de 20 m sur 15 m contient un bassin circulaire de rayon 2 m. Calculer l'aire de gazon, au centième.
[F] Le gazon est la partie colorée : rectangle moins disque. :: p A 0 0 ; p B 20 0 ; p C 20 15 ; p D 0 15 ; p O 13 8 ; p R 15 8 ; G A B C D c3 ; C O 2 c1 b ; S O R c2 ; L 13 11.4 "r = 2 m" c2 ; L 13 5.2 "bassin" c1 ; T A B "20 m" ; T B C "15 m"`, String.raw`> Aire du rectangle : $20 \times 15 = 300$ m². Aire du bassin : $\pi \times 2^2 = 4\pi$ m².
> Aire du gazon : $300 - 4\pi \approx 287{,}43$ m².`]
] });