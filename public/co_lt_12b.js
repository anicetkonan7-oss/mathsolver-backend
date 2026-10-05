/* MathSolver - Cours Terminale, chapitre 13 : Arithmétique, série C (2/3) */
MSCOP("lt.12", { s: [
["Méthodes", String.raw`## Méthode 1 : calculer un PGCD (Euclide)
Faire des divisions euclidiennes successives : on remplace $(a \,;\, b)$ par $(b \,;\, r)$ jusqu'à un reste nul. Le PGCD est le dernier reste non nul.
## Méthode 2 : trouver u et v (Bézout)
Remonter l'algorithme d'Euclide en exprimant chaque reste avec $a$ et $b$.
## Méthode 3 : calculer un reste avec les congruences
1) Chercher une petite puissance congrue à 1 (ou à $-1$).
2) Écrire l'exposant avec la division euclidienne, puis simplifier.
## Méthode 4 : résoudre ax + by = c
1) Trouver une solution particulière $(x_0 \,;\, y_0)$.
2) Soustraire : $a(x - x_0) = -b(y - y_0)$.
3) Appliquer le théorème de Gauss pour obtenir toutes les solutions.
[!] Condition :: $ax + by = c$ a des solutions entières si et seulement si $\text{PGCD}(a, b)$ divise $c$.`],
["Exemples corrigés", String.raw`## Exemple 1 : division euclidienne
Effectuer la division euclidienne de 247 par 12.
> $247 = 12 \times 20 + 7$, avec $0 \leq 7 < 12$ : quotient 20, reste 7.
## Exemple 2 : algorithme d'Euclide
Calculer $\text{PGCD}(1071, 462)$.
> $1071 = 462 \times 2 + 147$
> $462 = 147 \times 3 + 21$
> $147 = 21 \times 7 + 0$
> Le dernier reste non nul est 21 : $\text{PGCD}(1071, 462) = 21$.
## Exemple 3 : coefficients de Bézout
Trouver $u$ et $v$ tels que $1071u + 462v = 21$.
> $21 = 462 - 3 \times 147$ et $147 = 1071 - 2 \times 462$.
> $21 = 462 - 3 \times (1071 - 2 \times 462) = 7 \times 462 - 3 \times 1071$.
> Donc $u = -3$ et $v = 7$.
## Exemple 4 : reste d'une grande puissance
Quel est le reste de $2^{2026}$ dans la division par 7 ?
> $2^3 = 8 \equiv 1 \ [7]$ et $2026 = 3 \times 675 + 1$.
> $2^{2026} = (2^3)^{675} \times 2 \equiv 1 \times 2 \ [7]$ : le reste est 2.
## Exemple 5 : équation diophantienne
Résoudre dans $\mathbb{Z}^2$ : $5x + 3y = 1$.
> $(2 \,;\, -3)$ est solution : $10 - 9 = 1$.
> Par soustraction : $5(x - 2) = -3(y + 3)$.
> 3 divise $5(x - 2)$ et $\text{PGCD}(3, 5) = 1$, donc (Gauss) 3 divise $x - 2$ : $x = 2 + 3k$.
> Alors $y = -3 - 5k$. Solutions : $(2 + 3k \,;\, -3 - 5k)$, $k \in \mathbb{Z}$.
## Exemple 6 : facteurs premiers
Décomposer 360 et 84, puis calculer leur PGCD et leur PPCM.
> $360 = 2^3 \times 3^2 \times 5$ et $84 = 2^2 \times 3 \times 7$.
> PGCD : $2^2 \times 3 = 12$. PPCM : $2^3 \times 3^2 \times 5 \times 7 = 2520$.
> Contrôle : $12 \times 2520 = 30\,240 = 360 \times 84$.`]
] });
