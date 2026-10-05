/* MathSolver - Cours Terminale, chapitre 10 : Probabilités (3/3) */
MSCOP("lt.9", { s: [
["Cas particuliers", String.raw`[R] Incompatibles ou indépendants :: Incompatibles : $A \cap B = \emptyset$. Indépendants : $P(A \cap B) = P(A)P(B)$. Deux événements incompatibles de probabilités non nulles ne sont **jamais** indépendants.
[R] Avec ou sans remise :: Avec remise, les tirages sont indépendants (loi binomiale possible). Sans remise, ils ne le sont pas : on utilise un arbre ou le dénombrement.
[R] Permutations :: Le nombre de façons de ranger $n$ objets est $n! = 1 \times 2 \times \cdots \times n$, avec $0! = 1$.
[R] Au moins un succès :: Pour $\mathcal{B}(n \,;\, p)$ : $P(X \geq 1) = 1 - (1 - p)^n$.
[R] Symétrie :: $\dbinom{n}{k} = \dbinom{n}{n - k}$ ; pour $p = 0{,}5$, la loi binomiale est symétrique (voir le diagramme).`],
["Erreurs fréquentes", String.raw`[!] Confondre P_A(B) et P_B(A) :: « Probabilité d'être malade sachant que le test est positif » n'est pas « probabilité d'un test positif sachant qu'on est malade ».
[!] Incompatible ≠ indépendant :: Ce sont deux notions différentes (voir les cas particuliers).
[!] Oublier un chemin :: Dans les probabilités totales, il faut additionner **tous** les chemins menant à l'événement.
[!] Loi binomiale sans justification :: Il faut citer : épreuves identiques, indépendantes, deux issues, et donner $n$ et $p$.
[!] Variance :: $V(X) = E(X^2) - E(X)^2$, et non $E(X^2) - E(X)$.`],
["À retenir", String.raw`[K] L'essentiel :: $P_B(A) = \dfrac{P(A \cap B)}{P(B)}$ ; $P(A \cap B) = P(A) \times P_A(B)$. // Probabilités totales : $P(B) = P(A \cap B) + P(\bar{A} \cap B)$. // $\mathcal{B}(n \,;\, p)$ : $P(X = k) = \dbinom{n}{k}p^k(1 - p)^{n - k}$, $E = np$, $V = np(1 - p)$.
- Arbre : multiplier sur un chemin, additionner les chemins.
- Indépendance : $P(A \cap B) = P(A)P(B)$.
- « Au moins un » : passer par l'événement contraire.`]
], q: [
[String.raw`$A$ et $B$ sont indépendants, avec $P(A) = 0{,}3$ et $P(B) = 0{,}5$. Calculer $P(A \cap B)$ et $P(A \cup B)$.`, String.raw`> $P(A \cap B) = 0{,}3 \times 0{,}5 = 0{,}15$.
> $P(A \cup B) = 0{,}3 + 0{,}5 - 0{,}15 = 0{,}65$.`],
[String.raw`10 % d'une population est malade. Un test est positif pour 95 % des malades et pour 5 % des non-malades. Calculer $P(T)$, puis la probabilité d'être malade sachant que le test est positif.`, String.raw`> $P(T) = 0{,}1 \times 0{,}95 + 0{,}9 \times 0{,}05 = 0{,}095 + 0{,}045 = 0{,}14$.
> $P_T(M) = \dfrac{0{,}095}{0{,}14} \approx 0{,}68$.`],
[String.raw`$X$ prend les valeurs 0, 1, 2 avec les probabilités 0,2 ; 0,5 ; 0,3. Calculer $E(X)$, $V(X)$ et $\sigma(X)$.`, String.raw`> $E(X) = 0 + 0{,}5 + 0{,}6 = 1{,}1$ ; $E(X^2) = 0 + 0{,}5 + 1{,}2 = 1{,}7$.
> $V(X) = 1{,}7 - 1{,}21 = 0{,}49$ et $\sigma(X) = 0{,}7$.`],
[String.raw`$X$ suit $\mathcal{B}(4 \,;\, 0{,}2)$. Calculer $P(X = 2)$.`, String.raw`> $P(X = 2) = \dbinom{4}{2} \times 0{,}2^2 \times 0{,}8^2 = 6 \times 0{,}04 \times 0{,}64 = 0{,}1536$.`],
[String.raw`$X$ suit $\mathcal{B}(10 \,;\, 0{,}3)$. Calculer $E(X)$ et $V(X)$.`, String.raw`> $E(X) = 10 \times 0{,}3 = 3$ ; $V(X) = 10 \times 0{,}3 \times 0{,}7 = 2{,}1$.`],
[String.raw`De combien de façons peut-on choisir un comité de 3 personnes parmi 10 ?`, String.raw`> L'ordre ne compte pas : $\dbinom{10}{3} = \dfrac{10 \times 9 \times 8}{3 \times 2 \times 1} = 120$.`]
] });
