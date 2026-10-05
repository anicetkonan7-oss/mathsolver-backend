/* MathSolver - Cours 3e, chapitre 2 : Calcul littéral (2/3) */
MSCOP("l3.1", { s: [
["Méthodes", String.raw`## Méthode 1 : développer et réduire
1) Repérer les produits et choisir la règle (distributivité ou identité remarquable).
2) Développer chaque produit **entre parenthèses** si un signe « moins » le précède.
3) Supprimer les parenthèses, puis regrouper les $x^2$, les $x$ et les nombres.
## Méthode 2 : factoriser avec un facteur commun
1) Repérer le facteur présent dans **chaque** terme.
2) Le mettre devant : $ka + kb = k(a + b)$, puis réduire ce qui reste dans la parenthèse.
## Méthode 3 : factoriser avec une identité remarquable
- $a^2 - b^2 = (a - b)(a + b)$ : repérer deux carrés séparés par « moins ».
- $a^2 + 2ab + b^2 = (a + b)^2$ et $a^2 - 2ab + b^2 = (a - b)^2$ : vérifier le double produit.
## Méthode 4 : vérifier un résultat
Remplacer $x$ par une valeur simple (par exemple $x = 1$) dans l'expression de départ et dans le résultat : on doit trouver la même valeur.
[!] Le carré d'une somme :: $(a + b)^2 \neq a^2 + b^2$ : il ne faut pas oublier le double produit $2ab$.`],
["Exemples corrigés", String.raw`## Exemple 1 : développer et réduire
Développer et réduire $E = (3x - 2)^2 - (x + 4)(x - 4)$.
> $(3x - 2)^2 = 9x^2 - 12x + 4$ et $(x + 4)(x - 4) = x^2 - 16$.
> $E = 9x^2 - 12x + 4 - (x^2 - 16) = 9x^2 - 12x + 4 - x^2 + 16$.
> $E = 8x^2 - 12x + 20$.
## Exemple 2 : double distributivité
Développer $(2x + 3)(x - 5)$.
> $(2x + 3)(x - 5) = 2x^2 - 10x + 3x - 15 = 2x^2 - 7x - 15$.
## Exemple 3 : facteur commun
Factoriser $F = (x + 1)(2x - 3) + (x + 1)(x + 4)$.
> Le facteur commun est $(x + 1)$ : $F = (x + 1)[(2x - 3) + (x + 4)]$.
> $F = (x + 1)(3x + 1)$.
## Exemple 4 : identités remarquables
Factoriser $x^2 - 25$, $4x^2 + 12x + 9$ et $9x^2 - 6x + 1$.
> $x^2 - 25 = x^2 - 5^2 = (x - 5)(x + 5)$.
> $4x^2 + 12x + 9 = (2x)^2 + 2 \times 2x \times 3 + 3^2 = (2x + 3)^2$.
> $9x^2 - 6x + 1 = (3x)^2 - 2 \times 3x \times 1 + 1^2 = (3x - 1)^2$.
## Exemple 5 : calcul mental
Calculer $101^2$ et $99 \times 101$ sans calculatrice.
> $101^2 = (100 + 1)^2 = 10\,000 + 200 + 1 = 10\,201$.
> $99 \times 101 = (100 - 1)(100 + 1) = 10\,000 - 1 = 9\,999$.
## Exemple 6 : démontrer
Montrer que, pour tout nombre $n$, $(n + 1)^2 - n^2 = 2n + 1$.
> $(n + 1)^2 - n^2 = n^2 + 2n + 1 - n^2 = 2n + 1$.
> Conséquence : la différence des carrés de deux entiers qui se suivent est toujours un nombre impair.`]
] });