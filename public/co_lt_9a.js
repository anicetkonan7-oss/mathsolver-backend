/* MathSolver - Cours Terminale, chapitre 10 : Probabilités (1/3) */
MSCOP("lt.9", { t: "Probabilités", s: [
["Introduction", String.raw`Les probabilités mesurent les **chances** qu'un événement se produise lors d'une expérience aléatoire. En Terminale, on étudie les probabilités **conditionnelles** (quand on sait déjà quelque chose), l'**indépendance**, les **variables aléatoires** et la **loi binomiale**.
[R] Dans la vie courante :: Fiabilité d'un test médical, contrôle qualité dans une usine, assurances, jeux de hasard, prévisions météo : tous utilisent ces outils.`],
["Définitions", String.raw`[D] Univers et événement :: L'univers $\Omega$ est l'ensemble des issues. Un événement est une partie de $\Omega$. $\bar{A}$ est l'événement contraire de $A$.
[D] Équiprobabilité :: Si toutes les issues ont la même probabilité : $P(A) = \dfrac{\text{nombre d'issues de } A}{\text{nombre d'issues de } \Omega}$.
[D] Dénombrement :: Nombre de façons de choisir $k$ objets parmi $n$ (sans ordre) : $\dbinom{n}{k} = \dfrac{n!}{k!\,(n - k)!}$. Nombre d'arrangements (avec ordre) : $A_n^k = \dfrac{n!}{(n - k)!}$.
[D] Probabilité conditionnelle :: Si $P(B) \neq 0$, la probabilité de $A$ sachant $B$ est $P_B(A) = \dfrac{P(A \cap B)}{P(B)}$.
[D] Indépendance :: $A$ et $B$ sont indépendants si $P(A \cap B) = P(A) \times P(B)$.
[D] Variable aléatoire :: Une variable aléatoire $X$ associe un nombre à chaque issue. Sa **loi** donne les valeurs $x_i$ et les probabilités $p_i = P(X = x_i)$.
[D] Espérance, variance, écart-type :: $E(X) = \sum x_ip_i$ ; $V(X) = \sum p_i(x_i - E(X))^2$ ; $\sigma(X) = \sqrt{V(X)}$.`],
["Propriétés", String.raw`[P] Règles de base :: $P(\bar{A}) = 1 - P(A)$ ; $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
[P] Probabilité d'une intersection :: $P(A \cap B) = P(A) \times P_A(B)$ : on multiplie les probabilités le long d'un chemin de l'arbre.
[F] Arbre pondéré : $P(A) = 0{,}6$, $P_A(B) = 0{,}7$ et $P_{\bar{A}}(B) = 0{,}2$. La somme des branches issues d'un même nœud vaut 1. :: p r 0 0 ; p a 2 1.2 ; p c 2 -1.2 ; p b1 4.4 1.8 ; p b2 4.4 0.6 ; p b3 4.4 -0.6 ; p b4 4.4 -1.8 ; S r a c1 b ; S r c c1 b ; S a b1 c2 ; S a b2 c2 ; S c b3 c2 ; S c b4 c2 ; T r a "0,6" ; T r c "0,4" ; T a b1 "0,7" ; T a b2 "0,3" - ; T c b3 "0,2" - ; T c b4 "0,8" ; L 2 1.6 "A" c1 ; L 2 -1.65 "Ā" c1 ; L 4.75 1.8 "B" ; L 4.75 0.6 "B̄" ; L 4.75 -0.6 "B" ; L 4.75 -1.8 "B̄"
[P] Probabilités totales :: Si $A$ et $\bar{A}$ partagent l'univers : $P(B) = P(A \cap B) + P(\bar{A} \cap B)$. On additionne les chemins qui mènent à $B$.
[P] Variance (calcul pratique) :: $V(X) = E(X^2) - E(X)^2$.
[P] Loi binomiale :: On répète $n$ fois, de façon indépendante, une épreuve à deux issues (succès de probabilité $p$). Le nombre $X$ de succès suit la loi $\mathcal{B}(n \,;\, p)$ : // $P(X = k) = \dbinom{n}{k}p^k(1 - p)^{n - k}$ ; $E(X) = np$ ; $V(X) = np(1 - p)$.
[F] Loi binomiale $\mathcal{B}(5 \,;\, 0{,}5)$ : probabilités $P(X = k)$ en %, pour $k = 0$ à 5. :: BAR c1 ; "0" 3.125 ; "1" 15.625 ; "2" 31.25 ; "3" 31.25 ; "4" 15.625 ; "5" 3.125`]
] });
