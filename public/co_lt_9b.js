/* MathSolver - Cours Terminale, chapitre 10 : Probabilités (2/3) */
MSCOP("lt.9", { s: [
["Méthodes", String.raw`## Méthode 1 : construire et utiliser un arbre
1) Placer au premier niveau l'événement connu en premier ($A$, $\bar{A}$), puis les probabilités conditionnelles au second niveau.
2) Vérifier que les branches issues d'un même nœud ont pour somme 1.
3) Multiplier le long d'un chemin ; additionner les chemins qui mènent au même événement.
## Méthode 2 : « inverser » un conditionnement
Pour $P_B(A)$ : calculer $P(A \cap B)$ avec l'arbre, puis $P(B)$ avec les probabilités totales, et faire le quotient.
## Méthode 3 : reconnaître une loi binomiale
Justifier : $n$ épreuves **identiques et indépendantes**, deux issues (succès / échec), $X$ compte les succès. Donner $n$ et $p$.
## Méthode 4 : espérance et variance
Dresser le tableau de la loi (vérifier que $\sum p_i = 1$), puis calculer $E(X)$ et $E(X^2)$, et enfin $V(X) = E(X^2) - E(X)^2$.
[!] Au moins un :: Pour « au moins un succès », passer par le contraire : $P(X \geq 1) = 1 - P(X = 0)$.`],
["Exemples corrigés", String.raw`## Exemple 1 : tirage simultané
Une urne contient 5 boules rouges et 3 vertes. On tire 2 boules en même temps. Probabilité d'avoir 2 rouges ?
> Nombre de tirages : $\dbinom{8}{2} = 28$ ; tirages de 2 rouges : $\dbinom{5}{2} = 10$.
> $P = \dfrac{10}{28} = \dfrac{5}{14}$.
## Exemple 2 : arbre et probabilités totales
Avec l'arbre du cours : calculer $P(A \cap B)$ et $P(B)$.
> $P(A \cap B) = 0{,}6 \times 0{,}7 = 0{,}42$ ; $P(\bar{A} \cap B) = 0{,}4 \times 0{,}2 = 0{,}08$.
> $P(B) = 0{,}42 + 0{,}08 = 0{,}5$.
## Exemple 3 : inverser le conditionnement
Toujours avec cet arbre, calculer $P_B(A)$.
> $P_B(A) = \dfrac{P(A \cap B)}{P(B)} = \dfrac{0{,}42}{0{,}5} = 0{,}84$.
## Exemple 4 : indépendance
On lance un dé : $A$ « pair », $B$ « inférieur ou égal à 2 ». $A$ et $B$ sont-ils indépendants ?
> $P(A) = \dfrac{1}{2}$, $P(B) = \dfrac{1}{3}$ et $A \cap B = \{2\}$, donc $P(A \cap B) = \dfrac{1}{6}$.
> $P(A) \times P(B) = \dfrac{1}{6} = P(A \cap B)$ : $A$ et $B$ sont indépendants.
## Exemple 5 : espérance d'un jeu
On mise 2 € et on lance un dé : avec 6, on reçoit 10 € ; avec 4 ou 5, on récupère la mise ; sinon on perd. $X$ est le gain net.
$$\begin{array}{c|c|c|c} x_i & -2 & 0 & 8 \\ \hline p_i & \tfrac{1}{2} & \tfrac{1}{3} & \tfrac{1}{6} \end{array}$$
> $E(X) = -2 \times \dfrac{1}{2} + 0 + 8 \times \dfrac{1}{6} = -1 + \dfrac{4}{3} = \dfrac{1}{3}$ : jeu favorable au joueur.
> $E(X^2) = 4 \times \dfrac{1}{2} + 64 \times \dfrac{1}{6} = \dfrac{38}{3}$.
> $V(X) = \dfrac{38}{3} - \dfrac{1}{9} = \dfrac{113}{9}$ et $\sigma \approx 3{,}54$.
## Exemple 6 : loi binomiale
On lance 5 fois une pièce équilibrée. $X$ = nombre de piles. Calculer $P(X = 3)$ et $P(X \geq 1)$.
> 5 lancers identiques et indépendants, succès « pile » avec $p = 0{,}5$ : $X$ suit $\mathcal{B}(5 \,;\, 0{,}5)$.
> $P(X = 3) = \dbinom{5}{3} \times 0{,}5^5 = \dfrac{10}{32} = 0{,}3125$.
> $P(X \geq 1) = 1 - 0{,}5^5 = \dfrac{31}{32}$.`]
] });
