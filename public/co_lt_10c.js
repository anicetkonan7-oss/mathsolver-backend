/* MathSolver - Cours Terminale, chapitre 11 : Statistiques à deux variables (3/3) */
MSCOP("lt.10", { s: [
["Cas particuliers", String.raw`[R] Méthode de Mayer :: On partage le nuage en deux groupes (selon les $x$ croissants), on calcule le point moyen $G_1$, $G_2$ de chaque groupe, et on prend la droite $(G_1G_2)$. Elle passe aussi par $G$. C'est plus rapide, mais moins précis que les moindres carrés.
[R] Changement de variable :: Si le nuage a une allure exponentielle, on pose $z = \ln y$. Si l'ajustement de $z$ en $x$ donne $z = \alpha x + \beta$, alors $y = e^{\beta}e^{\alpha x}$.
[R] r = ±1 :: Si $|r| = 1$, tous les points sont exactement alignés.
[R] Corrélation et cause :: Une forte corrélation ne prouve pas que $x$ est la **cause** de $y$ : les deux peuvent dépendre d'un troisième facteur.
[R] Prévisions lointaines :: Une prévision loin des valeurs observées (extrapolation) est peu fiable.`],
["Erreurs fréquentes", String.raw`[!] Oublier de soustraire :: $V(x) = \dfrac{1}{n}\sum x_i^2 - \bar{x}^2$ : le terme $\bar{x}^2$ est souvent oublié. Même chose pour la covariance.
[!] Confondre les droites :: La droite de $y$ en $x$ utilise $V(x)$ ; celle de $x$ en $y$ utilise $V(y)$.
[!] Écart-type et variance :: Dans $r$, on divise par $\sigma_x\sigma_y$ (les écarts-types), pas par $V(x)V(y)$.
[!] Arrondir trop tôt :: Arrondir $\bar{x}$ ou $a$ dès le début fausse $b$ et les prévisions.
[!] r hors de [−1 ; 1] :: Un résultat $|r| > 1$ signale une erreur de calcul.`],
["À retenir", String.raw`[K] L'essentiel :: $G(\bar{x} \,;\, \bar{y})$ ; $\text{cov}(x, y) = \dfrac{1}{n}\sum x_iy_i - \bar{x}\bar{y}$. // Droite de $y$ en $x$ : $a = \dfrac{\text{cov}(x, y)}{V(x)}$, $b = \bar{y} - a\bar{x}$. // $r = \dfrac{\text{cov}(x, y)}{\sigma_x\sigma_y}$ ; ajustement justifié si $|r| \geq 0{,}87$.
- Toujours présenter les calculs dans un tableau.
- La droite de régression passe par $G$.
- Prévision : remplacer $x$ dans l'équation de la droite.`]
], q: [
[String.raw`Série : $x$ : 2, 4, 6, 8 et $y$ : 1, 3, 4, 6. Calculer les coordonnées du point moyen $G$.`, String.raw`> $\bar{x} = \dfrac{20}{4} = 5$ et $\bar{y} = \dfrac{14}{4} = 3{,}5$, donc $G(5 \,;\, 3{,}5)$.`],
[String.raw`Pour la même série, calculer $V(x)$, $\text{cov}(x, y)$ et la droite de régression de $y$ en $x$.`, String.raw`> $V(x) = \dfrac{120}{4} - 25 = 5$.
> $\sum x_iy_i = 2 + 12 + 24 + 48 = 86$, donc $\text{cov}(x, y) = 21{,}5 - 17{,}5 = 4$.
> $a = \dfrac{4}{5} = 0{,}8$ ; $b = 3{,}5 - 0{,}8 \times 5 = -0{,}5$ : $y = 0{,}8x - 0{,}5$.`],
[String.raw`Pour la même série, calculer le coefficient de corrélation $r$.`, String.raw`> $V(y) = \dfrac{62}{4} - 3{,}5^2 = 3{,}25$.
> $r = \dfrac{4}{\sqrt{5 \times 3{,}25}} \approx 0{,}992$ : très forte corrélation positive.`],
[String.raw`Avec la droite $y = 0{,}8x - 0{,}5$, estimer $y$ pour $x = 10$.`, String.raw`> $y = 0{,}8 \times 10 - 0{,}5 = 7{,}5$.`],
[String.raw`On donne $\text{cov}(x, y) = -6$, $\sigma_x = 3$ et $\sigma_y = 2{,}5$. Calculer $r$ et conclure.`, String.raw`> $r = \dfrac{-6}{3 \times 2{,}5} = -0{,}8$.
> La corrélation est négative, mais $|r| < 0{,}87$ : un ajustement affine n'est pas vraiment justifié.`],
[String.raw`Pour la série de l'exercice 1, déterminer la droite de régression de $x$ en $y$.`, String.raw`> $a' = \dfrac{\text{cov}(x, y)}{V(y)} = \dfrac{4}{3{,}25} = \dfrac{16}{13} \approx 1{,}23$.
> $b' = 5 - \dfrac{16}{13} \times 3{,}5 = \dfrac{9}{13} \approx 0{,}69$.
> La droite est $x = 1{,}23y + 0{,}69$.`]
] });
