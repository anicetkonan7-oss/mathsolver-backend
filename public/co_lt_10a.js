/* MathSolver - Cours Terminale, chapitre 11 : Statistiques à deux variables (1/3) */
MSCOP("lt.10", { t: "Statistiques à deux variables", s: [
["Introduction", String.raw`On étudie deux caractères $x$ et $y$ mesurés sur une même population, pour savoir s'il existe un **lien** entre eux. Si les points sont presque alignés, on fait un **ajustement affine** : on trace une droite qui résume la série, et on l'utilise pour faire des **prévisions**.
[R] Dans la vie courante :: Lien entre la taille et le poids, entre les dépenses de publicité et les ventes, entre la température et la consommation d'électricité ; prévisions de production ou de population.`],
["Définitions", String.raw`[D] Série statistique double :: C'est une liste de couples $(x_i \,;\, y_i)$, pour $i = 1$ à $n$.
[D] Nuage de points :: C'est l'ensemble des points $M_i(x_i \,;\, y_i)$ dans un repère.
[D] Point moyen :: $G(\bar{x} \,;\, \bar{y})$, avec $\bar{x} = \dfrac{1}{n}\sum x_i$ et $\bar{y} = \dfrac{1}{n}\sum y_i$.
[D] Variance et écart-type :: $V(x) = \dfrac{1}{n}\sum x_i^2 - \bar{x}^2$ et $\sigma_x = \sqrt{V(x)}$. De même pour $y$.
[D] Covariance :: $\text{cov}(x, y) = \dfrac{1}{n}\sum x_iy_i - \bar{x}\,\bar{y}$.
[D] Coefficient de corrélation linéaire :: $r = \dfrac{\text{cov}(x, y)}{\sigma_x\,\sigma_y}$.
[D] Droite de régression de y en x :: C'est la droite $y = ax + b$ obtenue par la méthode des **moindres carrés** : elle rend minimale la somme des carrés des écarts verticaux entre les points et la droite.`],
["Propriétés", String.raw`[P] Coefficients de la droite de y en x :: $a = \dfrac{\text{cov}(x, y)}{V(x)}$ et $b = \bar{y} - a\bar{x}$. La droite passe par le point moyen $G$.
[F] Nuage de 5 points, point moyen $G(3 \,;\, 3{,}1)$ et droite de régression $y = 0{,}75x + 0{,}85$. :: X 0 6 0 5 ; p a 1 1.5 ; C a 0.08 c1 b ; p b 2 2.5 ; C b 0.08 c1 b ; p c 3 3 ; C c 0.08 c1 b ; p d 4 4 ; C d 0.08 c1 b ; p e 5 4.5 ; C e 0.08 c1 b ; F "0.75*x+0.85" 0 5.8 c2 b ; P G 3 3.1 no ; L 4.4 1.3 "y = 0,75x + 0,85" c2
[P] Droite de régression de x en y :: $x = a'y + b'$, avec $a' = \dfrac{\text{cov}(x, y)}{V(y)}$ et $b' = \bar{x} - a'\bar{y}$. Elle passe aussi par $G$.
[P] Coefficient de corrélation :: $-1 \leq r \leq 1$. Le signe de $r$ est celui de la covariance : $r > 0$ quand $y$ a tendance à augmenter avec $x$, $r < 0$ sinon.
[P] Qualité de l'ajustement :: Plus $|r|$ est proche de 1, plus les points sont proches d'une droite. On admet souvent qu'un ajustement affine est justifié lorsque $|r| \geq \dfrac{\sqrt{3}}{2} \approx 0{,}87$.
[F] Corrélation négative : $y$ diminue quand $x$ augmente, $r$ est proche de $-1$. :: X 0 6 0 5 ; p a 1 4.6 ; C a 0.08 c1 b ; p b 2 4.2 ; C b 0.08 c1 b ; p c 3 3.2 ; C c 0.08 c1 b ; p d 4 2.4 ; C d 0.08 c1 b ; p e 5 1.6 ; C e 0.08 c1 b ; F "-0.78*x+5.54" 0 6 c3 d`]
] });
