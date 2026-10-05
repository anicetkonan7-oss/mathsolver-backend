/* MathSolver - Cours Terminale, chapitre 11 : Statistiques à deux variables (2/3) */
MSCOP("lt.10", { s: [
["Méthodes", String.raw`## Méthode 1 : organiser les calculs
Faire un tableau avec les colonnes $x_i$, $y_i$, $x_i^2$, $y_i^2$, $x_iy_i$, puis calculer les sommes.
## Méthode 2 : droite de régression de y en x
1) Calculer $\bar{x}$, $\bar{y}$, $V(x)$ et $\text{cov}(x, y)$.
2) $a = \dfrac{\text{cov}(x, y)}{V(x)}$, puis $b = \bar{y} - a\bar{x}$.
3) Contrôle : $G$ doit vérifier l'équation.
## Méthode 3 : juger l'ajustement
Calculer $r = \dfrac{\text{cov}(x, y)}{\sigma_x\sigma_y}$. Si $|r| \geq 0{,}87$, l'ajustement affine est justifié.
## Méthode 4 : faire une prévision
Remplacer $x$ par la valeur voulue dans $y = ax + b$ (ou résoudre $ax + b = y_0$ pour trouver $x$).
[!] Arrondis :: Garder des valeurs précises pendant les calculs (au moins 3 ou 4 chiffres), et arrondir seulement le résultat final.`],
["Exemples corrigés", String.raw`On étudie le chiffre d'affaires $y$ (en millions de francs) d'une entreprise selon le rang $x$ de l'année :
$$\begin{array}{c|c|c|c|c|c} x_i & 1 & 2 & 3 & 4 & 5 \\ \hline y_i & 1{,}5 & 2{,}5 & 3 & 4 & 4{,}5 \end{array}$$
## Exemple 1 : point moyen
> $\bar{x} = \dfrac{15}{5} = 3$ et $\bar{y} = \dfrac{15{,}5}{5} = 3{,}1$, donc $G(3 \,;\, 3{,}1)$.
## Exemple 2 : variances
> $\sum x_i^2 = 55$, donc $V(x) = \dfrac{55}{5} - 3^2 = 2$.
> $\sum y_i^2 = 53{,}75$, donc $V(y) = 10{,}75 - 3{,}1^2 = 1{,}14$.
## Exemple 3 : covariance
> $\sum x_iy_i = 1{,}5 + 5 + 9 + 16 + 22{,}5 = 54$.
> $\text{cov}(x, y) = \dfrac{54}{5} - 3 \times 3{,}1 = 10{,}8 - 9{,}3 = 1{,}5$.
## Exemple 4 : droite de régression
> $a = \dfrac{1{,}5}{2} = 0{,}75$ et $b = 3{,}1 - 0{,}75 \times 3 = 0{,}85$.
> La droite de régression de $y$ en $x$ est $y = 0{,}75x + 0{,}85$.
## Exemple 5 : coefficient de corrélation
> $r = \dfrac{1{,}5}{\sqrt{2 \times 1{,}14}} \approx 0{,}993$.
> $r$ est très proche de 1 : l'ajustement affine est justifié.
## Exemple 6 : prévision
Estimer le chiffre d'affaires de l'année de rang 8.
> $y = 0{,}75 \times 8 + 0{,}85 = 6{,}85$ : environ 6,85 millions de francs.`]
] });
