/* MathSolver - Cours Terminale, chapitre 13 : Arithmétique, série C (1/3) */
MSCOP("lt.12", { t: "Arithmétique (série C)", s: [
["Introduction", String.raw`L'arithmétique étudie les **nombres entiers** : divisibilité, nombres premiers, PGCD, restes. Les **congruences** permettent de calculer facilement des restes, même avec de très grands nombres, et le théorème de **Bézout** sert à résoudre des équations en nombres entiers.
[R] Dans la vie courante :: La cryptographie (cartes bancaires, messageries sécurisées), les clés de contrôle (RIB, codes-barres, numéros ISBN) et les calendriers reposent sur l'arithmétique.`],
["Définitions", String.raw`[D] Divisibilité :: $a$ divise $b$ (on note $a \mid b$) s'il existe un entier $k$ tel que $b = ka$.
[D] Division euclidienne :: Pour $a$ entier et $b$ entier naturel non nul, il existe un unique couple $(q \,;\, r)$ tel que $a = bq + r$ et $0 \leq r < b$. $q$ est le quotient, $r$ le reste.
[D] Nombre premier :: Entier naturel qui a exactement deux diviseurs : 1 et lui-même. Exemples : 2, 3, 5, 7, 11, 13…
[D] PGCD et PPCM :: Le PGCD de $a$ et $b$ est leur plus grand diviseur commun ; le PPCM, leur plus petit multiple commun strictement positif.
[F] Le rectangle de 12 sur 8 se pave avec des carrés de côté $4 = \text{PGCD}(12, 8)$, et pas avec des carrés plus grands. :: p a 0 0 ; p b 12 0 ; p c 12 8 ; p d 0 8 ; G a b c d c1 ; p e 4 0 ; p f 4 8 ; p g 8 0 ; p h 8 8 ; p i 0 4 ; p j 12 4 ; S e f c1 ; S g h c1 ; S i j c1 ; T a b "12" ; T d a "8" ; L 2 2 "4 × 4" c1
[D] Premiers entre eux :: $a$ et $b$ sont premiers entre eux si $\text{PGCD}(a, b) = 1$.
[D] Congruence :: Soit $n \geq 2$. $a \equiv b \ [n]$ ($a$ est congru à $b$ modulo $n$) si $n$ divise $a - b$, c'est-à-dire si $a$ et $b$ ont le même reste dans la division par $n$.
[F] Modulo 5, tous les entiers se répartissent selon leur reste : 0, 1, 2, 3 ou 4. :: p O 0 0 ; C O 2 c2 ; P 0 0 2 s ; P 1 1.9 0.62 o ; P 2 1.18 -1.62 no ; P 3 -1.18 -1.62 ne ; P 4 -1.9 0.62 e ; L 0 2.55 "0, 5, 10…" c1 ; L 3.3 0.62 "1, 6, 11…" c1 ; L 2.2 -2.4 "2, 7, 12…" c1 ; L -2.2 -2.4 "3, 8, 13…" c1 ; L -3.3 0.62 "4, 9, 14…" c1`],
["Propriétés", String.raw`[P] Combinaisons :: Si $a \mid b$ et $a \mid c$, alors $a \mid bu + cv$ pour tous entiers $u$, $v$.
[P] Congruences et opérations :: Si $a \equiv b \ [n]$ et $c \equiv d \ [n]$, alors $a + c \equiv b + d \ [n]$, $ac \equiv bd \ [n]$ et $a^k \equiv b^k \ [n]$.
[P] Algorithme d'Euclide :: Si $a = bq + r$, alors $\text{PGCD}(a, b) = \text{PGCD}(b, r)$. Le dernier reste non nul est le PGCD.
[P] Théorème de Bézout :: $a$ et $b$ sont premiers entre eux $\iff$ il existe des entiers $u$, $v$ tels que $au + bv = 1$. // Plus généralement, il existe $u$, $v$ tels que $au + bv = \text{PGCD}(a, b)$.
[P] Théorème de Gauss :: Si $a \mid bc$ et $\text{PGCD}(a, b) = 1$, alors $a \mid c$.
[P] Décomposition en facteurs premiers :: Tout entier $n \geq 2$ s'écrit de façon unique comme produit de nombres premiers. // $\text{PGCD}(a, b) \times \text{PPCM}(a, b) = ab$.`]
] });
