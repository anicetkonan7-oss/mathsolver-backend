/* MathSolver - Cours 3e, chapitre 2 : Calcul littéral (3/3) */
MSCOP("l3.1", { s: [
["Cas particuliers", String.raw`[R] Facteur commun caché :: Dans $(x - 2)^2 - (x - 2)(3x + 1)$, le facteur commun $(x - 2)$ apparaît en écrivant $(x - 2)^2 = (x - 2)(x - 2)$.
[R] Différence de deux carrés :: $(2x + 1)^2 - 16$ est de la forme $a^2 - b^2$ avec $a = 2x + 1$ et $b = 4$.
[R] Expression déjà factorisée :: Un produit comme $3x(2x - 3)$ est factorisé ; une somme comme $6x^2 - 9x$ ne l'est pas.
[R] Valeur d'une expression :: Pour calculer une expression pour une valeur de $x$, on choisit la forme la plus simple (souvent la forme factorisée).`],
["Erreurs fréquentes", String.raw`[!] Oublier le double produit :: $(x + 3)^2 = x^2 + 6x + 9$, et non $x^2 + 9$.
[!] Signe moins devant une parenthèse :: $-(x^2 - 16) = -x^2 + 16$ : tous les signes changent.
[!] Carré d'un nombre négatif :: Pour $x = -3$, $x^2 = 9$ (et non $-9$). On écrit $(-3)^2$ avec des parenthèses.
[!] Mal factoriser :: $6x^2 - 9x = 3x(2x - 3)$ : on vérifie en redéveloppant.
[!] Confondre $2x$ et $x^2$ :: $2x = x + x$ alors que $x^2 = x \times x$. Pour $x = 5$ : $2x = 10$ mais $x^2 = 25$.`],
["À retenir", String.raw`[K] L'essentiel :: Développer : produit → somme. Factoriser : somme → produit. // $(a + b)^2 = a^2 + 2ab + b^2$ // $(a - b)^2 = a^2 - 2ab + b^2$ // $(a + b)(a - b) = a^2 - b^2$
- Signe « moins » devant une parenthèse : on change tous les signes.
- Pour factoriser : chercher un facteur commun, sinon une identité remarquable.
- Toujours vérifier avec une valeur simple de $x$.`]
], q: [
[String.raw`Développer et réduire $A = 5(2x - 3) - 2(x - 4)$.`, String.raw`> $A = 10x - 15 - 2x + 8 = 8x - 7$.`],
[String.raw`Développer et réduire $B = (x + 3)(2x - 1)$.`, String.raw`> $B = 2x^2 - x + 6x - 3 = 2x^2 + 5x - 3$.`],
[String.raw`Développer $(2x + 5)^2$ et $(3 - x)^2$.`, String.raw`> $(2x + 5)^2 = 4x^2 + 20x + 25$.
> $(3 - x)^2 = 9 - 6x + x^2$.`],
[String.raw`Factoriser $6x^2 - 9x$.`, String.raw`> Le facteur commun est $3x$ : $6x^2 - 9x = 3x(2x - 3)$.`],
[String.raw`Factoriser $(2x + 1)^2 - 16$.`, String.raw`> C'est $a^2 - b^2$ avec $a = 2x + 1$ et $b = 4$ : $(2x + 1 - 4)(2x + 1 + 4)$.
> Donc $(2x + 1)^2 - 16 = (2x - 3)(2x + 5)$.`],
[String.raw`Soit $E = (x - 2)^2 - (x - 2)(3x + 1)$. Factoriser $E$, puis calculer $E$ pour $x = -1$.`, String.raw`> $E = (x - 2)[(x - 2) - (3x + 1)] = (x - 2)(-2x - 3)$.
> Pour $x = -1$ : $E = (-3) \times (2 - 3) = (-3) \times (-1) = 3$.`]
] });