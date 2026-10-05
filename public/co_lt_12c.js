/* MathSolver - Cours Terminale, chapitre 13 : Arithmétique, série C (3/3) */
MSCOP("lt.12", { s: [
["Cas particuliers", String.raw`[R] Tester si n est premier :: Il suffit de tester la division de $n$ par les nombres premiers $p \leq \sqrt{n}$.
[R] Petit théorème de Fermat :: Si $p$ est premier et ne divise pas $a$, alors $a^{p - 1} \equiv 1 \ [p]$. Exemple : $3^6 \equiv 1 \ [7]$.
[R] Critères de divisibilité :: $10 \equiv 1 \ [9]$, donc un nombre est congru à la somme de ses chiffres modulo 9 (et modulo 3). $10 \equiv -1 \ [11]$ donne le critère par 11.
[R] Reste négatif :: Pour $a < 0$, le reste reste positif : $-17 = 5 \times (-4) + 3$.
[R] Nombre de diviseurs :: Si $n = p_1^{\alpha_1} \cdots p_k^{\alpha_k}$, $n$ a $(\alpha_1 + 1) \cdots (\alpha_k + 1)$ diviseurs positifs. Exemple : 360 en a $4 \times 3 \times 2 = 24$.`],
["Erreurs fréquentes", String.raw`[!] Reste trop grand :: Dans $a = bq + r$, on doit avoir $0 \leq r < b$ : $247 = 12 \times 19 + 19$ n'est pas la division euclidienne.
[!] Diviser une congruence :: On ne peut pas simplifier n'importe comment : $6 \equiv 2 \ [4]$ mais $3 \not\equiv 1 \ [4]$.
[!] Gauss sans hypothèse :: Le théorème de Gauss exige $\text{PGCD}(a, b) = 1$.
[!] Bézout et PGCD :: $au + bv = 3$ ne prouve pas que $\text{PGCD}(a, b) = 3$ : il prouve seulement que le PGCD divise 3.
[!] Oublier k :: Les solutions d'une équation diophantienne dépendent d'un entier $k$ ; il y en a une infinité.`],
["À retenir", String.raw`[K] L'essentiel :: $a = bq + r$, $0 \leq r < b$ ; $\text{PGCD}(a, b) = \text{PGCD}(b, r)$. // Bézout : $\text{PGCD}(a, b) = 1 \iff au + bv = 1$. Gauss : $a \mid bc$ et $\text{PGCD}(a, b) = 1 \Rightarrow a \mid c$. // Les congruences se conservent par somme, produit et puissance.
- PGCD : dernier reste non nul de l'algorithme d'Euclide.
- Grandes puissances : trouver une puissance congrue à 1.
- $\text{PGCD} \times \text{PPCM} = ab$.`]
], q: [
[String.raw`Effectuer la division euclidienne de $-17$ par 5.`, String.raw`> $-17 = 5 \times (-4) + 3$, avec $0 \leq 3 < 5$ : quotient $-4$, reste 3.`],
[String.raw`Calculer $\text{PGCD}(252, 198)$ avec l'algorithme d'Euclide.`, String.raw`> $252 = 198 \times 1 + 54$ ; $198 = 54 \times 3 + 36$ ; $54 = 36 \times 1 + 18$ ; $36 = 18 \times 2 + 0$.
> $\text{PGCD}(252, 198) = 18$.`],
[String.raw`Déterminer le reste de $3^{100}$ dans la division par 4.`, String.raw`> $3 \equiv -1 \ [4]$, donc $3^{100} \equiv (-1)^{100} = 1 \ [4]$ : le reste est 1.`],
[String.raw`Montrer que pour tout entier $n$, $n^2 + n$ est pair.`, String.raw`> $n^2 + n = n(n + 1)$ : produit de deux entiers consécutifs.
> L'un des deux est pair, donc le produit est pair.`],
[String.raw`Résoudre $3x \equiv 2 \ [7]$.`, String.raw`> $3 \times 5 = 15 \equiv 1 \ [7]$ : on multiplie par 5.
> $x \equiv 10 \equiv 3 \ [7]$. Les solutions sont $x = 3 + 7k$, $k \in \mathbb{Z}$.`],
[String.raw`Le nombre 221 est-il premier ?`, String.raw`> $\sqrt{221} \approx 14{,}9$ : on teste 2, 3, 5, 7, 11, 13.
> $221 = 13 \times 17$ : 221 n'est pas premier.`]
] });
