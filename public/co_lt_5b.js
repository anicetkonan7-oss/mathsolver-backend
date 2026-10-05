/* MathSolver - Cours Terminale, chapitre 6 : Suites numériques (2/3) */
MSCOP("lt.5", { s: [
["Méthodes", String.raw`## Méthode 1 : reconnaître une suite
- Arithmétique : montrer que $u_{n+1} - u_n$ est une constante $r$.
- Géométrique : montrer que $u_{n+1} = q \times u_n$ avec $q$ constant.
## Méthode 2 : sens de variation
Étudier le signe de $u_{n+1} - u_n$, ou comparer $\dfrac{u_{n+1}}{u_n}$ à 1 si tous les termes sont positifs.
## Méthode 3 : suite arithmético-géométrique
Pour $u_{n+1} = au_n + b$ : trouver $\ell$ tel que $\ell = a\ell + b$, poser $v_n = u_n - \ell$, montrer que $(v_n)$ est géométrique de raison $a$, puis revenir à $u_n = v_n + \ell$.
## Méthode 4 : récurrence
Rédiger clairement les deux étapes : initialisation, puis hérédité (on suppose $P(n)$ vraie et on démontre $P(n + 1)$).
[!] Nombre de termes :: De $u_0$ à $u_n$, il y a $n + 1$ termes ; de $u_1$ à $u_n$, il y en a $n$.`],
["Exemples corrigés", String.raw`## Exemple 1 : suite arithmétique
$(u_n)$ est arithmétique, de premier terme $u_0 = 5$ et de raison 3. Calculer $u_{10}$ et $S = u_0 + u_1 + \dots + u_{10}$.
> $u_{10} = 5 + 10 \times 3 = 35$.
> Il y a 11 termes : $S = 11 \times \dfrac{5 + 35}{2} = 220$.
## Exemple 2 : suite géométrique
$(u_n)$ est géométrique, avec $u_0 = 3$ et $q = 2$. Calculer $u_5$ et la somme des 6 premiers termes.
> $u_5 = 3 \times 2^5 = 96$.
> $S = 3 \times \dfrac{1 - 2^6}{1 - 2} = 3 \times 63 = 189$.
## Exemple 3 : sens de variation
Étudier le sens de variation de $u_n = n^2 - 4n$.
> $u_{n+1} - u_n = (n + 1)^2 - 4(n + 1) - n^2 + 4n = 2n - 3$.
> $2n - 3 \geq 0$ dès que $n \geq 2$ : la suite est croissante à partir du rang 2.
## Exemple 4 : récurrence
$u_0 = 0$ et $u_{n+1} = 2u_n + 1$. Montrer que $u_n = 2^n - 1$ pour tout $n$.
> Initialisation : $2^0 - 1 = 0 = u_0$.
> Hérédité : si $u_n = 2^n - 1$, alors $u_{n+1} = 2(2^n - 1) + 1 = 2^{n+1} - 1$. La propriété est vraie pour tout $n$.
## Exemple 5 : suite arithmético-géométrique
$u_0 = 0$ et $u_{n+1} = 0{,}5u_n + 2$. Exprimer $u_n$ en fonction de $n$ et trouver sa limite.
> $\ell = 0{,}5\ell + 2$ donne $\ell = 4$. On pose $v_n = u_n - 4$ : $v_{n+1} = 0{,}5u_n + 2 - 4 = 0{,}5(u_n - 4) = 0{,}5v_n$.
> $(v_n)$ est géométrique de raison $0{,}5$ et $v_0 = -4$ : $u_n = 4 - 4 \times 0{,}5^n$.
> Comme $\lim 0{,}5^n = 0$, la suite converge vers 4.
## Exemple 6 : salaire
Un salaire de 150 000 F augmente de 3 % par an. Combien vaudra-t-il dans 10 ans ?
> $u_n = 150\,000 \times 1{,}03^n$ (suite géométrique de raison $1{,}03$).
> $u_{10} = 150\,000 \times 1{,}03^{10} \approx 201\,587$ F.`]
] });
