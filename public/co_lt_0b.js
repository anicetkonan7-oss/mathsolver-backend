/* MathSolver - Cours Terminale, chapitre 1 : Limites et continuité (2/3) */
MSCOP("lt.0", { s: [
["Méthodes", String.raw`## Méthode 1 : polynôme ou fraction rationnelle en l'infini
Garder seulement les termes de plus haut degré, puis simplifier.
## Méthode 2 : limite en une valeur interdite
1) Calculer la limite du numérateur.
2) Étudier le **signe** du dénominateur à gauche et à droite de la valeur (tableau de signes).
3) Conclure : $+\infty$ ou $-\infty$, et donner l'asymptote verticale.
## Méthode 3 : lever une forme indéterminée
- Factoriser par le terme dominant : $x^2 - 3x = x^2\left(1 - \dfrac{3}{x}\right)$.
- Avec des racines, multiplier par l'**expression conjuguée**.
## Méthode 4 : prouver une asymptote oblique
Calculer $f(x) - (ax + b)$ et montrer que sa limite vaut 0. Le signe de cette différence donne la **position** de la courbe par rapport à l'asymptote.
## Méthode 5 : appliquer le théorème des valeurs intermédiaires
Vérifier la continuité et la stricte monotonie (avec la dérivée), calculer les images aux bornes, conclure, puis encadrer la solution par balayage.`],
["Exemples corrigés", String.raw`## Exemple 1 : fraction rationnelle
Calculer $\lim_{x \to +\infty} \dfrac{2x^2 + 3x - 1}{x^2 + 1}$.
> On garde les termes dominants : $\lim_{x \to +\infty} \dfrac{2x^2}{x^2} = 2$. La droite $y = 2$ est asymptote horizontale.
## Exemple 2 : valeur interdite
Soit $f(x) = \dfrac{2x + 1}{x - 1}$. Calculer les limites en 1.
> Le numérateur tend vers 3. Si $x \to 1^+$, $x - 1 \to 0^+$, donc $f(x) \to +\infty$. Si $x \to 1^-$, $x - 1 \to 0^-$, donc $f(x) \to -\infty$.
> La droite $x = 1$ est asymptote verticale.
## Exemple 3 : formes indéterminées
Calculer $\lim_{x \to +\infty} (x^2 - 3x)$ et $\lim_{x \to +\infty} (\sqrt{x + 1} - \sqrt{x})$.
> $x^2 - 3x = x^2\left(1 - \dfrac{3}{x}\right)$ : la limite est $+\infty$.
> $\sqrt{x + 1} - \sqrt{x} = \dfrac{(x + 1) - x}{\sqrt{x + 1} + \sqrt{x}} = \dfrac{1}{\sqrt{x + 1} + \sqrt{x}}$, qui tend vers 0.
## Exemple 4 : asymptote oblique
Soit $f(x) = \dfrac{x^2 + x + 1}{x}$ pour $x > 0$. Montrer que $y = x + 1$ est asymptote.
> $f(x) = x + 1 + \dfrac{1}{x}$, donc $f(x) - (x + 1) = \dfrac{1}{x}$, qui tend vers 0 en $+\infty$.
> Comme $\dfrac{1}{x} > 0$, la courbe est **au-dessus** de l'asymptote.
[F] La courbe de $f(x) = x + 1 + \dfrac{1}{x}$ se rapproche de la droite $y = x + 1$. :: X 0 5 0 7 ; F "x+1" 0 5 c2 d ; F "x+1+1/x" 0.2 5 c1 b ; L 4 6.3 "y = x + 1" c2
## Exemple 5 : valeurs intermédiaires
Montrer que $x^3 - 3x + 1 = 0$ a une unique solution $\alpha$ dans $]0 \,;\, 1[$ et l'encadrer à $0{,}1$ près.
> $f(x) = x^3 - 3x + 1$ est continue ; $f'(x) = 3x^2 - 3 < 0$ sur $]0 \,;\, 1[$ : $f$ est strictement décroissante.
> $f(0) = 1 > 0$ et $f(1) = -1 < 0$ : l'équation a une unique solution $\alpha$ dans $]0 \,;\, 1[$.
> $f(0{,}3) \approx 0{,}127 > 0$ et $f(0{,}4) \approx -0{,}136 < 0$, donc $0{,}3 < \alpha < 0{,}4$.
## Exemple 6 : théorème des gendarmes
Calculer $\lim_{x \to +\infty} \dfrac{\sin x}{x}$.
> Pour $x > 0$ : $-\dfrac{1}{x} \leq \dfrac{\sin x}{x} \leq \dfrac{1}{x}$. Les deux bornes tendent vers 0, donc la limite vaut 0.`]
] });
