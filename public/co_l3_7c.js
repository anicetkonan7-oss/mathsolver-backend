/* MathSolver - Cours 3e, chapitre 8 : Fonctions linéaires et affines (3/3) */
MSCOP("l3.7", { s: [
["Cas particuliers", String.raw`[R] Fonction constante :: Si $a = 0$, $f(x) = b$ pour tout $x$ : la droite est **horizontale**. Tous les nombres ont la même image $b$.
[R] Fonction identité :: $f(x) = x$ est linéaire de coefficient 1 : chaque nombre est sa propre image.
[R] Droites parallèles :: Deux fonctions affines qui ont le **même coefficient directeur** ont des droites **parallèles**, comme $0{,}5x$ et $0{,}5x + 2$.
[R] Proportionnalité :: Une situation de proportionnalité se modélise toujours par une fonction **linéaire** : le coefficient $a$ est le coefficient de proportionnalité.
[R] Pourcentages successifs :: Augmenter de 10 % puis baisser de 10 % revient à multiplier par $1{,}1 \times 0{,}9 = 0{,}99$ : on ne revient pas au prix de départ.`],
["Erreurs fréquentes", String.raw`[!] Confondre image et antécédent :: $f(2)$ est l'image de 2. Chercher l'antécédent de 2, c'est résoudre $f(x) = 2$.
[!] Oublier les parenthèses :: Pour $f(x) = -3x + 5$, on calcule $f(-2) = -3 \times (-2) + 5 = 11$, et non $-3 - 2 + 5$.
[!] Inverser a et b :: Dans $f(x) = 4 - 2x$, le coefficient directeur est $a = -2$ et $b = 4$ : on regarde le nombre **devant** $x$.
[!] Linéaire ou affine :: $f(x) = 3x + 1$ n'est **pas** linéaire : sa droite ne passe pas par l'origine, car $f(0) = 1$.
[!] Calcul de a :: Dans $a = \dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$, il faut garder le même ordre en haut et en bas.
[!] Pourcentage :: Baisser de 20 %, c'est multiplier par $0{,}8$, et non par $0{,}2$.`],
["À retenir", String.raw`[K] L'essentiel :: Fonction linéaire : $f(x) = ax$, droite qui passe par l'origine. // Fonction affine : $f(x) = ax + b$, droite qui passe par $(0 \,;\, b)$. // Coefficient directeur : $a = \dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$ ; si $a > 0$ la droite monte, si $a < 0$ elle descend.
- Image : on remplace $x$. Antécédent : on résout $f(x) = k$.
- Deux points suffisent pour tracer la droite.
- Augmenter de $t\,\%$ : $\times \left(1 + \dfrac{t}{100}\right)$ ; diminuer de $t\,\%$ : $\times \left(1 - \dfrac{t}{100}\right)$.`]
], q: [
[String.raw`Soit $f(x) = -3x + 5$. Calculer $f(2)$ et $f(-1)$, puis l'antécédent de $-7$.`, String.raw`> $f(2) = -3 \times 2 + 5 = -1$ et $f(-1) = -3 \times (-1) + 5 = 8$.
> $-3x + 5 = -7$, donc $-3x = -12$ et $x = 4$.`],
[String.raw`$g$ est une fonction linéaire telle que $g(5) = -15$. Trouver $g(x)$, puis calculer $g(-2)$.`, String.raw`> $5a = -15$, donc $a = -3$ : $g(x) = -3x$.
> $g(-2) = -3 \times (-2) = 6$.`],
[String.raw`$f$ est affine, avec $f(2) = 1$ et $f(6) = -7$. Trouver $f(x)$.`, String.raw`> $a = \dfrac{-7 - 1}{6 - 2} = \dfrac{-8}{4} = -2$.
> $f(2) = -2 \times 2 + b = 1$, donc $b = 5$ : $f(x) = -2x + 5$. Vérification : $f(6) = -12 + 5 = -7$.`],
[String.raw`Un téléphone coûte 8 000 F CFA. Pendant les soldes, son prix baisse de 25 %. Quel est le prix soldé ?`, String.raw`> Baisser de 25 %, c'est multiplier par $1 - 0{,}25 = 0{,}75$.
> Prix soldé : $8\,000 \times 0{,}75 = 6\,000$ F CFA.`],
[String.raw`Un taxi facture 500 F de prise en charge, puis 250 F par kilomètre. Exprimer le prix $T(x)$ pour $x$ km, calculer le prix d'une course de 12 km, puis la distance parcourue pour 4 500 F.`, String.raw`> $T(x) = 250x + 500$ (fonction affine).
> $T(12) = 250 \times 12 + 500 = 3\,500$ F.
> $250x + 500 = 4\,500$, donc $250x = 4\,000$ et $x = 16$ km.`],
[String.raw`Lire l'expression de la fonction affine $f$ représentée ci-dessous.
[F] La droite de la fonction $f$. :: X -1 3 -2 5 ; F "2*x-1" -0.5 3 c1 b ; P A 0 -1 e ; P B 2 3 o`, String.raw`> La droite coupe l'axe des ordonnées en $-1$ : $b = -1$.
> Elle passe par $A(0 \,;\, -1)$ et $B(2 \,;\, 3)$ : $a = \dfrac{3 - (-1)}{2 - 0} = \dfrac{4}{2} = 2$.
> Donc $f(x) = 2x - 1$.`]
] });