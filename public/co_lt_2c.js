/* MathSolver - Cours Terminale, chapitre 3 : Primitives (3/3) */
MSCOP("lt.2", { s: [
["Cas particuliers", String.raw`[R] Fonction constante :: Une primitive de la fonction nulle est n'importe quelle constante ; une primitive de $k$ est $kx$.
[R] Fonction $\dfrac{1}{x}$ :: Elle n'entre pas dans la formule $x^n$ (car $n = -1$) : sa primitive est $\ln x$ sur $]0 \,;\, +\infty[$.
[R] Fonctions affines composées :: Pour $f(ax + b)$, une primitive est $\dfrac{1}{a}F(ax + b)$. Exemple : $(2x - 1)^5 \mapsto \dfrac{(2x - 1)^6}{12}$.
[R] Intervalle :: Une primitive se cherche **sur un intervalle** où $f$ est définie : $\dfrac{1}{x^2}$ se primitive sur $]0 \,;\, +\infty[$ ou sur $]-\infty \,;\, 0[$, séparément.`],
["Erreurs fréquentes", String.raw`[!] Dériver au lieu de primitiver :: La primitive de $x^2$ est $\dfrac{x^3}{3}$, et non $2x$.
[!] Oublier la constante :: Quand une condition est donnée, il faut écrire $+ C$ puis la calculer.
[!] Primitive d'un produit :: Une primitive de $x\cos x$ n'est pas $\dfrac{x^2}{2}\sin x$ : on vérifie en dérivant.
[!] Facteur oublié :: Une primitive de $(3x + 1)^2$ est $\dfrac{(3x + 1)^3}{9}$, et non $\dfrac{(3x + 1)^3}{3}$.
[!] Signe de $\sin$ :: Une primitive de $\sin x$ est $-\cos x$ (avec un signe moins).`],
["À retenir", String.raw`[K] L'essentiel :: $F$ est une primitive de $f$ si $F' = f$ ; les autres primitives sont $F + C$. // $x^n \mapsto \dfrac{x^{n+1}}{n + 1}$, $u'u^n \mapsto \dfrac{u^{n+1}}{n + 1}$, $\dfrac{u'}{u^2} \mapsto -\dfrac{1}{u}$, $\dfrac{u'}{\sqrt{u}} \mapsto 2\sqrt{u}$. // $\cos \mapsto \sin$, $\sin \mapsto -\cos$.
- Repérer $u$ et faire apparaître $u'$ en ajustant les constantes.
- Avec une condition $F(x_0) = y_0$ : calculer $C$.
- Toujours vérifier en dérivant.`]
], q: [
[String.raw`Trouver une primitive de $f(x) = 5x^4 - 2x + 1$.`, String.raw`> $F(x) = x^5 - x^2 + x$.`],
[String.raw`Trouver une primitive de $f(x) = \dfrac{1}{x^3}$ sur $]0 \,;\, +\infty[$.`, String.raw`> $\dfrac{1}{x^3} = x^{-3} \mapsto \dfrac{x^{-2}}{-2} = -\dfrac{1}{2x^2}$.`],
[String.raw`Trouver une primitive de $f(x) = (2x - 1)^5$.`, String.raw`> Avec $u = 2x - 1$, $u' = 2$ : $f = \dfrac{1}{2}u'u^5$, donc $F(x) = \dfrac{1}{2} \times \dfrac{(2x - 1)^6}{6} = \dfrac{(2x - 1)^6}{12}$.`],
[String.raw`Trouver une primitive de $f(x) = \dfrac{2}{\sqrt{4x + 1}}$ sur $\left]-\dfrac{1}{4} \,;\, +\infty\right[$.`, String.raw`> Avec $u = 4x + 1$, $u' = 4$ : $f = \dfrac{1}{2} \times \dfrac{u'}{\sqrt{u}}$, donc $F(x) = \dfrac{1}{2} \times 2\sqrt{u} = \sqrt{4x + 1}$.`],
[String.raw`Trouver la primitive $F$ de $f(x) = 2x + 3$ telle que $F(0) = -1$.`, String.raw`> $F(x) = x^2 + 3x + C$ et $F(0) = C = -1$. Donc $F(x) = x^2 + 3x - 1$.`],
[String.raw`Trouver une primitive de $f(x) = \sin(2x)$.`, String.raw`> $\sin(2x) = \dfrac{1}{2} \times 2\sin(2x)$, donc $F(x) = -\dfrac{1}{2}\cos(2x)$.`]
] });
