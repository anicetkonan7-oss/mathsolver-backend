/* MathSolver - Cours Terminale, chapitre 1 : Limites et continuité (3/3) */
MSCOP("lt.0", { s: [
["Cas particuliers", String.raw`[R] Limite remarquable :: $\lim_{x \to 0} \dfrac{\sin x}{x} = 1$ : c'est le nombre dérivé de $\sin$ en 0.
[R] Fonction composée :: Si $\lim_{x \to a} u(x) = b$ et $\lim_{X \to b} v(X) = c$, alors $\lim_{x \to a} v(u(x)) = c$. // Exemple : $\lim_{x \to +\infty} \sqrt{\dfrac{4x + 1}{x}} = \sqrt{4} = 2$.
[R] Bijection :: Une fonction continue et strictement monotone sur un intervalle $I$ réalise une bijection de $I$ sur $f(I)$ : chaque valeur de $f(I)$ a un unique antécédent.
[R] Pas de limite :: $\sin x$ et $\cos x$ n'ont pas de limite en $+\infty$ : elles oscillent entre $-1$ et 1.`],
["Erreurs fréquentes", String.raw`[!] Conclure trop vite :: $\infty - \infty$ n'est pas égal à 0, et $\dfrac{\infty}{\infty}$ n'est pas égal à 1 : ce sont des formes indéterminées.
[!] Oublier le signe :: $\dfrac{3}{0}$ n'a pas de sens : il faut savoir si le dénominateur tend vers $0^+$ ou $0^-$.
[!] Termes dominants en un réel :: La règle des termes de plus haut degré ne vaut **qu'en l'infini**, jamais en un réel.
[!] Théorème des valeurs intermédiaires :: Sans stricte monotonie, il peut y avoir **plusieurs** solutions : l'unicité n'est pas garantie.
[!] Asymptote oblique :: Il faut montrer que la **différence** $f(x) - (ax + b)$ tend vers 0, pas seulement que $f(x)$ tend vers l'infini.`],
["À retenir", String.raw`[K] L'essentiel :: Limite finie en $\pm\infty$ : asymptote horizontale. Limite infinie en $a$ : asymptote verticale $x = a$. // $\lim [f(x) - (ax + b)] = 0$ : asymptote oblique $y = ax + b$. // TVI : $f$ continue strictement monotone sur $[a \,;\, b]$ et $f(a)f(b) < 0$ $\Rightarrow$ une unique solution de $f(x) = 0$.
- En l'infini : termes de plus haut degré.
- Formes indéterminées : factoriser, ou utiliser l'expression conjuguée.
- En une valeur interdite : signe du dénominateur à gauche et à droite.`]
], q: [
[String.raw`Calculer $\lim_{x \to -\infty} (3x^3 - x + 2)$.`, String.raw`> On garde le terme dominant : $\lim_{x \to -\infty} 3x^3 = -\infty$.`],
[String.raw`Calculer $\lim_{x \to +\infty} \dfrac{1 - 4x^2}{2x^2 + x}$.`, String.raw`> Termes dominants : $\dfrac{-4x^2}{2x^2} = -2$. La limite vaut $-2$.`],
[String.raw`Calculer les limites de $f(x) = \dfrac{x + 3}{x - 2}$ en $2^+$ et en $2^-$.`, String.raw`> Le numérateur tend vers 5. En $2^+$, $x - 2 \to 0^+$ : $f(x) \to +\infty$. En $2^-$, $x - 2 \to 0^-$ : $f(x) \to -\infty$.
> La droite $x = 2$ est asymptote verticale.`],
[String.raw`Calculer $\lim_{x \to +\infty} \left(\sqrt{x^2 + 1} - x\right)$.`, String.raw`> Avec l'expression conjuguée : $\sqrt{x^2 + 1} - x = \dfrac{1}{\sqrt{x^2 + 1} + x}$.
> Le dénominateur tend vers $+\infty$, donc la limite vaut 0.`],
[String.raw`Montrer que l'équation $x^3 + x - 1 = 0$ a une unique solution $\alpha$ dans $[0 \,;\, 1]$, puis l'encadrer à $0{,}1$ près.`, String.raw`> $f(x) = x^3 + x - 1$ est continue et $f'(x) = 3x^2 + 1 > 0$ : $f$ est strictement croissante.
> $f(0) = -1 < 0$ et $f(1) = 1 > 0$ : il existe une unique solution $\alpha$.
> $f(0{,}6) \approx -0{,}184$ et $f(0{,}7) \approx 0{,}043$, donc $0{,}6 < \alpha < 0{,}7$.`],
[String.raw`Soit $f(x) = \dfrac{2x^2 - 3x + 1}{x - 2}$. Montrer que $f(x) = 2x + 1 + \dfrac{3}{x - 2}$, puis donner les asymptotes de sa courbe.`, String.raw`> $(2x + 1)(x - 2) + 3 = 2x^2 - 4x + x - 2 + 3 = 2x^2 - 3x + 1$ : l'égalité est vraie.
> $f(x) - (2x + 1) = \dfrac{3}{x - 2}$ tend vers 0 en $\pm\infty$ : la droite $y = 2x + 1$ est asymptote oblique.
> En 2, le dénominateur s'annule et le numérateur vaut 3 : la droite $x = 2$ est asymptote verticale.`]
] });
