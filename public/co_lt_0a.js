/* MathSolver - Cours Terminale, chapitre 1 : Limites et continuité (1/3) */
MSCOP("lt.0", { t: "Limites et continuité", s: [
["Introduction", String.raw`La **limite** décrit le comportement d'une fonction quand $x$ devient très grand, très petit, ou s'approche d'une valeur interdite. Elle permet de trouver les **asymptotes** d'une courbe. La **continuité** traduit le fait qu'on trace la courbe « sans lever le crayon » ; elle garantit l'existence de solutions d'équations.
[R] Dans la vie courante :: La température d'un café qui refroidit tend vers celle de la pièce : c'est une limite. Une population qui se stabilise suit aussi une asymptote horizontale.`],
["Définitions", String.raw`[D] Limite finie en l'infini :: $\lim_{x \to +\infty} f(x) = \ell$ signifie que $f(x)$ devient aussi proche de $\ell$ qu'on veut quand $x$ est assez grand. La droite $y = \ell$ est alors **asymptote horizontale** à la courbe.
[D] Limite infinie en un réel :: $\lim_{x \to a} f(x) = +\infty$ (ou $-\infty$) : la droite $x = a$ est **asymptote verticale** à la courbe.
[D] Asymptote oblique :: La droite $y = ax + b$ est asymptote à la courbe en $+\infty$ si $\lim_{x \to +\infty} [f(x) - (ax + b)] = 0$.
[F] $f(x) = \dfrac{2x + 1}{x - 1}$ : la courbe s'approche de l'asymptote verticale $x = 1$ et de l'asymptote horizontale $y = 2$. :: X -3 5 -3 7 ; p A1 1 -3 ; p A2 1 7 ; p H1 -3 2 ; p H2 5 2 ; S A1 A2 c2 d ; S H1 H2 c2 d ; F "(2*x+1)/(x-1)" -3 0.7 c1 b ; F "(2*x+1)/(x-1)" 1.4 5 c1 b ; L 2.3 6.5 "x = 1" c2 ; L 4.3 2.6 "y = 2" c2
[D] Continuité :: $f$ est continue en $a$ si $\lim_{x \to a} f(x) = f(a)$. Elle est continue sur un intervalle si on trace sa courbe sans lever le crayon. Les polynômes, les fonctions rationnelles (sur leur domaine), $\sqrt{x}$, $\ln$, $\exp$, $\cos$ et $\sin$ sont continues.
[D] Formes indéterminées :: $\infty - \infty$, $\dfrac{\infty}{\infty}$, $0 \times \infty$ et $\dfrac{0}{0}$ : on ne peut pas conclure directement, il faut transformer l'expression.`],
["Propriétés", String.raw`[P] Limites de référence :: $\lim_{x \to \pm\infty} \dfrac{1}{x} = 0$ ; $\lim_{x \to +\infty} \sqrt{x} = +\infty$ ; $\lim_{x \to 0^+} \dfrac{1}{x} = +\infty$ et $\lim_{x \to 0^-} \dfrac{1}{x} = -\infty$.
[P] Polynômes et fonctions rationnelles :: En $\pm\infty$, un polynôme a la même limite que son terme de plus haut degré. Une fonction rationnelle a la même limite que le quotient des termes de plus haut degré.
[P] Théorème des gendarmes :: Si $g(x) \leq f(x) \leq h(x)$ et si $g$ et $h$ ont la même limite $\ell$, alors $\lim f(x) = \ell$.
[P] Théorème des valeurs intermédiaires :: Si $f$ est continue sur $[a \,;\, b]$, alors $f$ prend toutes les valeurs comprises entre $f(a)$ et $f(b)$. // Si de plus $f$ est **strictement monotone** et $f(a) \times f(b) < 0$, l'équation $f(x) = 0$ a une **unique** solution dans $]a \,;\, b[$.
[F] $f(x) = x^3 - 3x + 1$ est continue et décroissante sur $[0 \,;\, 1]$, avec $f(0) = 1$ et $f(1) = -1$ : elle s'annule une seule fois, en $\alpha \approx 0{,}35$. :: X -1 2 -2 3 ; F "x^3-3*x+1" -1 2 c1 b ; P α 0.347 0 se`]
] });
