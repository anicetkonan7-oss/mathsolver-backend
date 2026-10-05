/* MathSolver - Cours 3e, chapitre 4 : Systèmes de deux équations (3/3) */
MSCOP("l3.3", { s: [
["Cas particuliers", String.raw`[R] Infinité de solutions :: Si les deux équations sont équivalentes (par exemple $x + y = 3$ et $2x + 2y = 6$), les droites sont confondues : il y a une infinité de solutions.
[R] Choisir la méthode :: Si une inconnue a pour coefficient 1 ou $-1$, la **substitution** est rapide. Si une inconnue a des coefficients opposés, la **combinaison** est immédiate.
[R] Formule directe :: Si $ab' - a'b \neq 0$, le système a une solution unique : $x = \dfrac{cb' - c'b}{ab' - a'b}$ et $y = \dfrac{ac' - a'c}{ab' - a'b}$.`],
["Erreurs fréquentes", String.raw`[!] Oublier une inconnue :: La solution d'un système est un **couple** $(x \,;\, y)$ : il faut donner les deux valeurs.
[!] Multiplier un seul membre :: En multipliant une équation, on multiplie **tous** les termes, des deux côtés.
[!] Soustraire les signes :: En soustrayant deux équations, attention aux signes : $(6c + 15s) - (6c + 4s) = 11s$.
[!] Ne pas vérifier :: Remplacer la solution dans les **deux** équations permet de détecter les erreurs.`],
["À retenir", String.raw`[K] L'essentiel :: Une solution est un couple $(x \,;\, y)$ qui vérifie les deux équations. // Substitution : isoler, remplacer. Combinaison : faire disparaître une inconnue en additionnant. // Graphiquement : la solution est le point d'intersection des deux droites.
- Bien nommer les inconnues dans un problème.
- Toujours vérifier dans les deux équations.
- Répondre par une phrase avec les unités.`]
], q: [
[String.raw`Résoudre $\begin{cases} x + y = 10 \\ x - y = 4 \end{cases}$`, String.raw`> En additionnant : $2x = 14$, donc $x = 7$. Puis $y = 10 - 7 = 3$. Solution : $(7 \,;\, 3)$.`],
[String.raw`Résoudre par substitution $\begin{cases} y = 3x - 2 \\ 2x + y = 8 \end{cases}$`, String.raw`> $2x + 3x - 2 = 8$, donc $5x = 10$ et $x = 2$. Puis $y = 3 \times 2 - 2 = 4$. Solution : $(2 \,;\, 4)$.`],
[String.raw`Résoudre $\begin{cases} 2x + 3y = 13 \\ 3x - y = 3 \end{cases}$`, String.raw`> La 2e donne $y = 3x - 3$. On remplace : $2x + 3(3x - 3) = 13$, donc $11x - 9 = 13$ et $x = 2$.
> Puis $y = 3 \times 2 - 3 = 3$. Solution : $(2 \,;\, 3)$.`],
[String.raw`Awa a 15 billets, de 1 000 F et de 2 000 F, pour un total de 22 000 F. Combien a-t-elle de billets de chaque sorte ?`, String.raw`> Soit $a$ le nombre de billets de 1 000 F et $b$ celui de 2 000 F : $a + b = 15$ et $1\,000a + 2\,000b = 22\,000$, soit $a + 2b = 22$.
> En soustrayant : $b = 7$, puis $a = 8$. Elle a 8 billets de 1 000 F et 7 billets de 2 000 F.`],
[String.raw`Le couple $(3 \,;\, -1)$ est-il solution de $\begin{cases} 2x + y = 5 \\ x - 3y = 6 \end{cases}$ ?`, String.raw`> $2 \times 3 + (-1) = 5$ et $3 - 3 \times (-1) = 6$ : les deux équations sont vérifiées. Oui, c'est une solution.`],
[String.raw`2 places adultes et 3 places enfants coûtent 5 750 F ; 1 place adulte et 2 places enfants coûtent 3 250 F. Trouver le prix de chaque place.`, String.raw`> Soit $a$ le prix adulte et $e$ le prix enfant : $2a + 3e = 5\,750$ et $a + 2e = 3\,250$.
> La 2e donne $a = 3\,250 - 2e$. On remplace : $6\,500 - 4e + 3e = 5\,750$, donc $e = 750$.
> Puis $a = 3\,250 - 1\,500 = 1\,750$. Place adulte : 1 750 F ; place enfant : 750 F.`]
] });