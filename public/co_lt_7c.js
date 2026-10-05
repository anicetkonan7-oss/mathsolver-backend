/* MathSolver - Cours Terminale, chapitre 8 : Équations différentielles (3/3) */
MSCOP("lt.7", { s: [
["Cas particuliers", String.raw`[R] Cas a = 0 :: L'équation $y' = b$ a pour solutions $y = bx + C$ : ce sont les primitives de $b$.
[R] Cas ω = 0 :: L'équation $y'' = 0$ a pour solutions les fonctions affines $y = Ax + B$.
[R] Solution particulière :: Pour $y' = ay + f(x)$ : si $g$ est une solution particulière, toutes les solutions sont $y = g + Ce^{ax}$ (solution particulière + solution de $y' = ay$).
[R] Forme amplitude-phase :: $A\cos\omega x + B\sin\omega x$ peut s'écrire $R\cos(\omega x - \varphi)$, avec $R = \sqrt{A^2 + B^2}$ : c'est un mouvement oscillant de période $\dfrac{2\pi}{\omega}$.`],
["Erreurs fréquentes", String.raw`[!] Signe de b/a :: La constante est $-\dfrac{b}{a}$ et non $\dfrac{b}{a}$. Pour $y' = 2y - 4$ : $y = Ce^{2x} + 2$.
[!] Équation non isolée :: Pour $3y' - y = 0$, on a $a = \dfrac{1}{3}$ et non $a = -1$.
[!] Oublier la constante :: La solution générale contient toujours $C$ (ou $A$ et $B$). La condition initiale vient **après**.
[!] Dérivée de cos(ωx) :: $(\cos\omega x)' = -\omega\sin\omega x$ : le facteur $\omega$ est souvent oublié.
[!] Équation caractéristique :: Pour $y'' + ay' + by = 0$, c'est $r^2 + ar + b = 0$ : ne pas oublier le terme $ar$.`],
["À retenir", String.raw`[K] L'essentiel :: $y' = ay$ : $y = Ce^{ax}$. // $y' = ay + b$ : $y = Ce^{ax} - \dfrac{b}{a}$. // $y'' + \omega^2y = 0$ : $y = A\cos\omega x + B\sin\omega x$.
- Isoler $y'$ (ou $y''$) avant de lire les coefficients.
- Solution générale d'abord, condition initiale ensuite.
- Pour vérifier, dériver et remplacer dans l'équation.`]
], q: [
[String.raw`Résoudre $y' = -4y$ avec $y(0) = 5$.`, String.raw`> $y = Ce^{-4x}$ et $y(0) = C = 5$, donc $y = 5e^{-4x}$.`],
[String.raw`Résoudre $2y' + y = 0$ avec $y(0) = 4$.`, String.raw`> $y' = -\dfrac{1}{2}y$, donc $y = Ce^{-x/2}$.
> $y(0) = C = 4$, donc $y = 4e^{-x/2}$.`],
[String.raw`Résoudre $y' = 3y - 6$ avec $y(0) = 5$.`, String.raw`> $a = 3$, $b = -6$, $-\dfrac{b}{a} = 2$ : $y = Ce^{3x} + 2$.
> $y(0) = C + 2 = 5$, donc $C = 3$ et $y = 3e^{3x} + 2$.`],
[String.raw`Résoudre $y'' + 4y = 0$ avec $y(0) = 0$ et $y'(0) = 2$.`, String.raw`> $\omega = 2$ : $y = A\cos 2x + B\sin 2x$.
> $y(0) = A = 0$ ; $y'(0) = 2B = 2$, donc $B = 1$.
> Donc $y = \sin 2x$.`],
[String.raw`(Série C) Résoudre $y'' + 2y' + y = 0$.`, String.raw`> $r^2 + 2r + 1 = (r + 1)^2 = 0$ : racine double $r_0 = -1$.
> Les solutions sont $y = (Ax + B)e^{-x}$, avec $A$ et $B$ réels.`],
[String.raw`On considère $(E) : y' - 2y = 1 - 2x$. Vérifier que $g(x) = x$ est solution de $(E)$, puis donner toutes les solutions.`, String.raw`> $g'(x) = 1$, donc $g' - 2g = 1 - 2x$ : $g$ est solution.
> Les solutions de $y' = 2y$ sont $Ce^{2x}$.
> Les solutions de $(E)$ sont donc $y = Ce^{2x} + x$, $C$ réel.`]
] });
