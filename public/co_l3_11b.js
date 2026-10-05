/* MathSolver - Cours 3e, chapitre 12 : Volumes (2/3) */
MSCOP("l3.11", { s: [
["Méthodes", String.raw`## Méthode 1 : calculer un volume
1) Reconnaître le solide et choisir la formule.
2) Mettre toutes les longueurs dans la **même unité**.
3) Calculer l'aire de la base si besoin, puis le volume ; donner la valeur exacte avec $\pi$, puis l'arrondi.
## Méthode 2 : convertir
- Volumes : on multiplie ou on divise par **1 000** à chaque rang (m³ → dm³ → cm³).
- Contenances : $1 \text{ dm}^3 = 1$ L, $1 \text{ cm}^3 = 1$ mL.
## Méthode 3 : agrandissement et réduction
Si les longueurs sont multipliées par $k$, le volume est multiplié par $k^3$.
[!] Rayon et diamètre :: Les formules utilisent le **rayon**. Un diamètre de 8 cm donne $r = 4$ cm.`],
["Exemples corrigés", String.raw`## Exemple 1 : cylindre
Calculer le volume d'un cylindre de rayon 3 cm et de hauteur 10 cm (valeur exacte puis arrondi).
> $V = \pi r^2 h = \pi \times 3^2 \times 10 = 90\pi$ cm³.
> $V \approx 282{,}74$ cm³.
## Exemple 2 : pavé droit
Une boîte a la forme d'un pavé droit de 5 cm sur 4 cm sur 3 cm. Calculer son volume en cm³ puis en mL.
> $V = 5 \times 4 \times 3 = 60$ cm³ $= 60$ mL.
## Exemple 3 : cône
Calculer le volume d'un cône de rayon 4 cm et de hauteur 9 cm.
> $V = \dfrac{1}{3}\pi r^2 h = \dfrac{1}{3} \times \pi \times 16 \times 9 = 48\pi$ cm³ $\approx 150{,}80$ cm³.
## Exemple 4 : pyramide
Une pyramide a une base carrée de 6 cm de côté et une hauteur de 10 cm. Calculer son volume.
> Aire de la base : $6^2 = 36$ cm². $V = \dfrac{36 \times 10}{3} = 120$ cm³.
## Exemple 5 : boule et sphère
Calculer le volume d'une boule de rayon 6 cm et l'aire de sa sphère.
> $V = \dfrac{4}{3}\pi \times 6^3 = \dfrac{4}{3}\pi \times 216 = 288\pi \approx 904{,}78$ cm³.
> $A = 4\pi \times 6^2 = 144\pi \approx 452{,}39$ cm².
## Exemple 6 : citerne
Une citerne cylindrique a un rayon de 1 m et une hauteur de 2 m. Combien de litres d'eau contient-elle ?
> $V = \pi \times 1^2 \times 2 = 2\pi$ m³ $\approx 6{,}283$ m³.
> Comme $1 \text{ m}^3 = 1\,000$ L, la citerne contient environ $6\,283$ L.`]
] });