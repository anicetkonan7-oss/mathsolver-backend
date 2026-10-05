/* MathSolver - Cours 3e, chapitre 12 : Volumes (3/3) */
MSCOP("l3.11", { s: [
["Cas particuliers", String.raw`[R] Cube :: Un cube est un pavé droit dont les trois dimensions sont égales : $V = a \times a \times a = a^3$.
[R] Prisme à base triangulaire :: L'aire de la base est celle d'un triangle : $\dfrac{b \times h_{\text{triangle}}}{2}$, puis on multiplie par la hauteur du prisme.
[R] Demi-boule :: Le volume d'une demi-boule de rayon $r$ vaut $\dfrac{2}{3}\pi r^3$.
[R] Agrandissement :: Doubler toutes les longueurs multiplie l'aire par 4 et le volume par 8 ($2^3$).`],
["Erreurs fréquentes", String.raw`[!] Oublier le tiers :: Pyramide et cône : on divise par 3. Prisme et cylindre : on ne divise pas.
[!] Conversions :: $1 \text{ m}^3 = 1\,000 \text{ dm}^3$, et non 10 ou 100.
[!] Rayon au carré :: $\pi r^2 h$ avec $r = 3$ donne $\pi \times 9 \times h$, et non $\pi \times 6 \times h$.
[!] Mauvaise hauteur :: La hauteur d'une pyramide ou d'un cône est perpendiculaire à la base ; ce n'est pas la longueur d'une arête oblique.
[!] Volume et aire :: Le volume s'exprime en unités au **cube** (cm³), l'aire en unités au **carré** (cm²).`],
["À retenir", String.raw`[K] L'essentiel :: Prisme et cylindre : $V = B \times h$ ; cylindre : $\pi r^2 h$. // Pyramide et cône : $V = \dfrac{B \times h}{3}$ ; cône : $\dfrac{1}{3}\pi r^2 h$. // Boule : $V = \dfrac{4}{3}\pi r^3$ ; sphère : $A = 4\pi r^2$.
- $1 \text{ dm}^3 = 1$ L et $1 \text{ m}^3 = 1\,000$ L.
- Toutes les longueurs dans la même unité avant de calculer.
- Agrandissement de rapport $k$ : volume multiplié par $k^3$.`]
], q: [
[String.raw`Calculer le volume d'un cube de 4 cm d'arête.`, String.raw`> $V = 4^3 = 64$ cm³.`],
[String.raw`Un prisme droit a pour base un triangle rectangle dont les côtés de l'angle droit mesurent 3 cm et 4 cm. Sa hauteur est 10 cm. Calculer son volume.`, String.raw`> Aire de la base : $\dfrac{3 \times 4}{2} = 6$ cm².
> $V = 6 \times 10 = 60$ cm³.`],
[String.raw`Un cylindre a un diamètre de 8 cm et une hauteur de 5 cm. Calculer son volume (valeur exacte et arrondi au centième).`, String.raw`> $r = 4$ cm. $V = \pi \times 4^2 \times 5 = 80\pi \approx 251{,}33$ cm³.`],
[String.raw`Calculer le volume d'un cône de rayon 3 cm et de hauteur 4 cm.`, String.raw`> $V = \dfrac{1}{3} \times \pi \times 3^2 \times 4 = 12\pi \approx 37{,}70$ cm³.`],
[String.raw`Un ballon a un rayon de 11 cm. Calculer son volume au cm³ près, puis en litres.`, String.raw`> $V = \dfrac{4}{3}\pi \times 11^3 = \dfrac{4}{3}\pi \times 1\,331 \approx 5\,575$ cm³.
> Soit environ $5{,}575$ L.`],
[String.raw`Une pyramide a un volume de 24 cm³. On la réduit en divisant toutes ses longueurs par 2. Quel est le volume de la petite pyramide ?`, String.raw`> Le coefficient de réduction est $k = \dfrac{1}{2}$ ; le volume est multiplié par $k^3 = \dfrac{1}{8}$.
> $V' = \dfrac{24}{8} = 3$ cm³.`]
] });