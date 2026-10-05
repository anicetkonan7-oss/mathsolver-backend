/* MathSolver - Cours Terminale, chapitre 6 : Suites numériques (1/3) */
MSCOP("lt.5", { t: "Suites numériques", s: [
["Introduction", String.raw`Une **suite** est une liste infinie de nombres $u_0, u_1, u_2, \dots$ Elle modélise une évolution **étape par étape** : chaque année, chaque mois, chaque génération. On cherche à calculer ses termes, son sens de variation et sa **limite**.
[R] Dans la vie courante :: Un salaire qui augmente de 3 % par an, une dette remboursée chaque mois, une population de bactéries qui double toutes les heures : ce sont des suites.`],
["Définitions", String.raw`[D] Suite :: Une suite $(u_n)$ associe à chaque entier naturel $n$ un réel $u_n$. Elle est définie **explicitement** ($u_n = f(n)$) ou **par récurrence** ($u_{n+1} = f(u_n)$ avec $u_0$ donné).
[D] Suite arithmétique :: $u_{n+1} = u_n + r$ : on ajoute toujours la même **raison** $r$.
[D] Suite géométrique :: $u_{n+1} = q \times u_n$ : on multiplie toujours par la même **raison** $q$.
[D] Sens de variation :: $(u_n)$ est **croissante** si $u_{n+1} \geq u_n$ pour tout $n$, **décroissante** si $u_{n+1} \leq u_n$.
[D] Suite bornée :: $(u_n)$ est **majorée** s'il existe $M$ tel que $u_n \leq M$ pour tout $n$, **minorée** s'il existe $m$ tel que $u_n \geq m$.
[D] Convergence :: $(u_n)$ **converge** vers $\ell$ si $u_n$ devient aussi proche de $\ell$ qu'on veut pour $n$ assez grand. Sinon, elle **diverge**.
[F] Pour $u_{n+1} = 0{,}5u_n + 2$ et $u_0 = 0$, l'escalier construit entre la droite $y = 0{,}5x + 2$ et la droite $y = x$ montre que la suite converge vers 4. :: X 0 5 0 5 ; F "x" 0 5 c4 d ; F "0.5*x+2" 0 5 c1 b ; p A 0 0 ; p B 0 2 ; p C 2 2 ; p D 2 3 ; p E 3 3 ; p G 3 3.5 ; p H 3.5 3.5 ; p I 3.5 3.75 ; S A B c2 ; S B C c2 ; S C D c2 ; S D E c2 ; S E G c2 ; S G H c2 ; S H I c2 ; P ℓ 4 4 se`],
["Propriétés", String.raw`[P] Suite arithmétique :: $u_n = u_0 + nr$ et $u_n = u_p + (n - p)r$. // Somme de termes consécutifs : $S = \text{(nombre de termes)} \times \dfrac{\text{premier} + \text{dernier}}{2}$.
[P] Suite géométrique :: $u_n = u_0 \times q^n$. // Somme de termes consécutifs ($q \neq 1$) : $S = \text{premier} \times \dfrac{1 - q^{\text{nombre de termes}}}{1 - q}$.
[P] Limite de $q^n$ :: Si $-1 < q < 1$, $\lim q^n = 0$. Si $q > 1$, $\lim q^n = +\infty$. Si $q \leq -1$, $(q^n)$ n'a pas de limite.
[P] Convergence monotone :: Une suite croissante et majorée converge ; une suite décroissante et minorée converge.
[P] Raisonnement par récurrence :: Pour prouver qu'une propriété $P(n)$ est vraie pour tout $n \geq n_0$ : // **Initialisation** : $P(n_0)$ est vraie. **Hérédité** : si $P(n)$ est vraie, alors $P(n + 1)$ est vraie.
[P] Point fixe :: Si $u_{n+1} = f(u_n)$, que $(u_n)$ converge vers $\ell$ et que $f$ est continue, alors $\ell = f(\ell)$.`]
] });
