/* MathSolver - Cours Terminale, chapitre 7 : Calcul intégral (3/3) */
MSCOP("lt.6", { s: [
["Cas particuliers", String.raw`[R] Fonction impaire :: Si $f$ est impaire, $\int_{-a}^a f = 0$ : les aires positive et négative se compensent. Exemple : $\int_{-1}^1 x^3\,dx = 0$.
[R] Fonction paire :: Si $f$ est paire, $\int_{-a}^a f = 2\int_0^a f$.
[R] Fonction définie par une intégrale :: $G(x) = \int_a^x f(t)\,dt$ est la primitive de $f$ qui s'annule en $a$ : $G'(x) = f(x)$.
[R] Volume de révolution :: En faisant tourner la courbe de $f$ autour de l'axe des abscisses, on obtient un solide de volume $V = \pi\int_a^b f(x)^2\,dx$.`],
["Erreurs fréquentes", String.raw`[!] Ordre des bornes :: $\big[F(x)\big]_a^b = F(b) - F(a)$, et non $F(a) - F(b)$.
[!] Oublier une borne :: Même si $F(0)$ semble nul, il faut le calculer : $\big[e^x\big]_0^1 = e - 1$, et non $e$.
[!] Aire négative :: Une aire ne peut pas être négative : si $f < 0$, l'aire vaut $-\int_a^b f$.
[!] Unités :: Une aire en u.a. doit être convertie en cm² avec l'unité graphique.
[!] Intégration par parties :: Le signe « moins » devant la deuxième intégrale est souvent oublié.`],
["À retenir", String.raw`[K] L'essentiel :: $\int_a^b f(x)\,dx = F(b) - F(a)$, avec $F$ primitive de $f$. // Si $f \geq 0$, l'intégrale est l'aire sous la courbe ; entre deux courbes : $\int_a^b (f - g)$. // Valeur moyenne : $\dfrac{1}{b - a}\int_a^b f$ ; IPP : $\int uv' = \big[uv\big] - \int u'v$.
- Chasles et linéarité permettent de découper et de regrouper.
- Étudier le signe avant de parler d'aire.
- Toujours écrire les crochets $\big[F(x)\big]_a^b$.`]
], q: [
[String.raw`Calculer $\int_{-1}^2 (3x^2 - 2x)\,dx$.`, String.raw`> $\big[x^3 - x^2\big]_{-1}^2 = (8 - 4) - (-1 - 1) = 4 + 2 = 6$.`],
[String.raw`Calculer $\int_0^{\pi} \sin x\,dx$.`, String.raw`> $\big[-\cos x\big]_0^{\pi} = -\cos\pi + \cos 0 = 1 + 1 = 2$.`],
[String.raw`Calculer $\int_1^2 \dfrac{1}{x^2}\,dx$.`, String.raw`> $\left[-\dfrac{1}{x}\right]_1^2 = -\dfrac{1}{2} + 1 = \dfrac{1}{2}$.`],
[String.raw`Calculer $\int_0^1 \dfrac{2x}{x^2 + 1}\,dx$.`, String.raw`> Forme $\dfrac{u'}{u}$ : $\big[\ln(x^2 + 1)\big]_0^1 = \ln 2 - \ln 1 = \ln 2$.`],
[String.raw`Calculer $\int_1^e \ln x\,dx$ par intégration par parties.`, String.raw`> On pose $u = \ln x$, $v' = 1$ : $u' = \dfrac{1}{x}$, $v = x$.
> $\int_1^e \ln x\,dx = \big[x\ln x\big]_1^e - \int_1^e 1\,dx = e - (e - 1) = 1$.`],
[String.raw`Calculer la valeur moyenne de la fonction sinus sur $[0 \,;\, \pi]$.`, String.raw`> $\mu = \dfrac{1}{\pi}\int_0^{\pi} \sin x\,dx = \dfrac{2}{\pi} \approx 0{,}64$.`]
] });
