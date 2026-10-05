/* MathSolver - Cours 3e, chapitre 4 : Systèmes de deux équations (2/3) */
MSCOP("l3.3", { s: [
["Méthodes", String.raw`## Méthode 1 : par substitution
1) Dans une équation, isoler une inconnue (celle qui a pour coefficient 1 ou $-1$ si possible).
2) Remplacer dans l'autre équation et résoudre.
3) Calculer la deuxième inconnue, puis vérifier dans les **deux** équations.
## Méthode 2 : par combinaison
1) Multiplier une ou deux équations pour obtenir des coefficients opposés devant une inconnue.
2) Additionner membre à membre : cette inconnue disparaît.
3) Résoudre, remplacer pour trouver l'autre inconnue, vérifier.
## Méthode 3 : résoudre un problème
1) Choisir les deux inconnues et les nommer.
2) Traduire l'énoncé par deux équations.
3) Résoudre le système, vérifier, et répondre par une phrase.
[!] Vérification :: Une solution doit vérifier **les deux** équations. Vérifier une seule ne suffit pas.`],
["Exemples corrigés", String.raw`## Exemple 1 : par combinaison (addition)
Résoudre $\begin{cases} 2x + y = 7 \\ x - y = -1 \end{cases}$
> En additionnant les deux équations : $3x = 6$, donc $x = 2$.
> Dans la 1re équation : $2 \times 2 + y = 7$, donc $y = 3$. La solution est $(2 \,;\, 3)$.
## Exemple 2 : par substitution
Résoudre $\begin{cases} x = 2y + 1 \\ 3x - 4y = 7 \end{cases}$
> On remplace $x$ : $3(2y + 1) - 4y = 7$, donc $2y + 3 = 7$ et $y = 2$.
> Puis $x = 2 \times 2 + 1 = 5$. Vérification : $3 \times 5 - 4 \times 2 = 7$. Solution : $(5 \,;\, 2)$.
## Exemple 3 : combinaison avec multiplication
Résoudre $\begin{cases} 3x + 2y = 12 \\ 5x - 3y = 1 \end{cases}$
> On multiplie la 1re par 3 et la 2e par 2 : $9x + 6y = 36$ et $10x - 6y = 2$.
> En additionnant : $19x = 38$, donc $x = 2$. Puis $3 \times 2 + 2y = 12$, donc $y = 3$. Solution : $(2 \,;\, 3)$.
## Exemple 4 : cahiers et stylos
3 cahiers et 2 stylos coûtent 1 700 F ; 2 cahiers et 5 stylos coûtent 2 050 F. Trouver le prix d'un cahier et d'un stylo.
> Soit $c$ le prix d'un cahier et $s$ celui d'un stylo : $3c + 2s = 1\,700$ et $2c + 5s = 2\,050$.
> On multiplie par 2 et par 3 : $6c + 4s = 3\,400$ et $6c + 15s = 6\,150$. En soustrayant : $11s = 2\,750$, donc $s = 250$.
> $3c = 1\,700 - 500 = 1\,200$, donc $c = 400$. Un cahier coûte 400 F et un stylo 250 F.
## Exemple 5 : pas de solution
Résoudre $\begin{cases} x + y = 3 \\ 2x + 2y = 10 \end{cases}$
> La 2e équation donne $x + y = 5$, ce qui contredit $x + y = 3$. Le système n'a **pas de solution** : les droites sont parallèles.
[F] $y = 3 - x$ et $y = 5 - x$ ont le même coefficient directeur : les droites sont parallèles et ne se coupent pas. :: X -1 6 -1 6 ; F "3-x" -1 4 c1 b ; F "5-x" -1 6 c2 b
## Exemple 6 : poules et lapins
Dans une ferme, on compte 20 têtes et 56 pattes. Combien y a-t-il de poules et de lapins ?
> Soit $p$ le nombre de poules et $\ell$ celui de lapins : $p + \ell = 20$ et $2p + 4\ell = 56$.
> On multiplie la 1re par 2 : $2p + 2\ell = 40$. En soustrayant : $2\ell = 16$, donc $\ell = 8$ et $p = 12$.
> Il y a 12 poules et 8 lapins (vérification : $24 + 32 = 56$ pattes).`]
] });