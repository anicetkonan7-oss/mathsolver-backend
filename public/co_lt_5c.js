/* MathSolver - Cours Terminale, chapitre 6 : Suites numériques (3/3) */
MSCOP("lt.5", { s: [
["Cas particuliers", String.raw`[R] Somme des premiers entiers :: $1 + 2 + \dots + n = \dfrac{n(n + 1)}{2}$ (somme d'une suite arithmétique de raison 1).
[R] Suite géométrique de raison 1 :: Si $q = 1$, la suite est constante et la somme de $N$ termes vaut $N \times u_0$.
[R] Suites définies par une fonction :: Si $u_n = f(n)$, la limite de $(u_n)$ est la limite de $f$ en $+\infty$. Exemple : $\lim \dfrac{2n + 1}{n + 3} = 2$.
[R] Suites adjacentes :: Si $(u_n)$ croît, $(v_n)$ décroît et $\lim(v_n - u_n) = 0$, elles convergent vers la même limite.`],
["Erreurs fréquentes", String.raw`[!] Raison arithmétique ou géométrique :: Une augmentation de 3 % correspond à $q = 1{,}03$ (on **multiplie**), pas à $r = 3$.
[!] Nombre de termes :: $u_0 + \dots + u_{10}$ contient 11 termes, pas 10.
[!] Hérédité mal rédigée :: On doit **utiliser** l'hypothèse $P(n)$ pour démontrer $P(n + 1)$, pas l'affirmer.
[!] Limite de $q^n$ :: $0{,}9^n \to 0$ mais $1{,}1^n \to +\infty$ : la frontière est 1.
[!] Point fixe :: Trouver $\ell = f(\ell)$ ne prouve pas que la suite converge ; il faut d'abord justifier la convergence.`],
["À retenir", String.raw`[K] L'essentiel :: Arithmétique : $u_n = u_0 + nr$ ; géométrique : $u_n = u_0q^n$. // Sommes : $N \times \dfrac{\text{premier} + \text{dernier}}{2}$ ou $\text{premier} \times \dfrac{1 - q^N}{1 - q}$. // $|q| < 1 \Rightarrow q^n \to 0$ ; croissante et majorée $\Rightarrow$ convergente.
- Sens de variation : signe de $u_{n+1} - u_n$.
- Arithmético-géométrique : $v_n = u_n - \ell$ est géométrique.
- Récurrence : initialisation, puis hérédité.`]
], q: [
[String.raw`$(u_n)$ est arithmétique avec $u_1 = 7$ et $u_5 = 19$. Trouver la raison, $u_0$ et $u_n$.`, String.raw`> $u_5 = u_1 + 4r$, donc $19 = 7 + 4r$ et $r = 3$.
> $u_0 = 7 - 3 = 4$, donc $u_n = 4 + 3n$.`],
[String.raw`$(u_n)$ est géométrique avec $u_0 = 64$ et $q = \dfrac{1}{2}$. Calculer $u_6$ et la limite de la suite.`, String.raw`> $u_6 = 64 \times \left(\dfrac{1}{2}\right)^6 = \dfrac{64}{64} = 1$.
> Comme $0 < \dfrac{1}{2} < 1$, $\lim u_n = 0$.`],
[String.raw`Calculer $1 + 2 + 3 + \dots + 100$.`, String.raw`> C'est une suite arithmétique de raison 1 avec 100 termes : $S = 100 \times \dfrac{1 + 100}{2} = 5\,050$.`],
[String.raw`Donner les limites de $(-0{,}8)^n$, $1{,}2^n$ et $\dfrac{2n + 1}{n + 3}$.`, String.raw`> $-1 < -0{,}8 < 1$ : $(-0{,}8)^n \to 0$. $1{,}2 > 1$ : $1{,}2^n \to +\infty$.
> $\dfrac{2n + 1}{n + 3}$ a la même limite que $\dfrac{2n}{n} = 2$.`],
[String.raw`Montrer par récurrence que $1 + 3 + 5 + \dots + (2n - 1) = n^2$ pour tout $n \geq 1$.`, String.raw`> Initialisation : pour $n = 1$, la somme vaut $1 = 1^2$.
> Hérédité : si $1 + 3 + \dots + (2n - 1) = n^2$, alors en ajoutant $2n + 1$ : $n^2 + 2n + 1 = (n + 1)^2$. La propriété est vraie pour tout $n \geq 1$.`],
[String.raw`$u_0 = 20$ et $u_{n+1} = 0{,}8u_n + 10$. Exprimer $u_n$ en fonction de $n$ et donner sa limite.`, String.raw`> $\ell = 0{,}8\ell + 10$ donne $\ell = 50$. On pose $v_n = u_n - 50$ : $v_{n+1} = 0{,}8v_n$ et $v_0 = -30$.
> $u_n = 50 - 30 \times 0{,}8^n$. Comme $0{,}8^n \to 0$, $\lim u_n = 50$.`]
] });
