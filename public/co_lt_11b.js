/* MathSolver - Cours Terminale, chapitre 12 : Géométrie dans l'espace (2/3) */
MSCOP("lt.11", { s: [
["Méthodes", String.raw`## Méthode 1 : équation d'un plan (point et vecteur normal)
1) Écrire $ax + by + cz + d = 0$ avec $(a \,;\, b \,;\, c)$ = coordonnées de $\vec{n}$.
2) Trouver $d$ en remplaçant par les coordonnées du point.
## Méthode 2 : plan passant par trois points
1) Calculer $\overrightarrow{AB}$ et $\overrightarrow{AC}$ (non colinéaires).
2) Chercher $\vec{n}(a \,;\, b \,;\, c)$ tel que $\vec{n} \cdot \overrightarrow{AB} = 0$ et $\vec{n} \cdot \overrightarrow{AC} = 0$.
3) Appliquer la méthode 1.
## Méthode 3 : intersection d'une droite et d'un plan
Remplacer $x$, $y$, $z$ de la représentation paramétrique dans l'équation du plan, trouver $t$, puis le point.
## Méthode 4 : un point est-il sur une droite ?
Chercher un même $t$ qui vérifie les trois équations paramétriques.
[!] Vérifier :: Après avoir trouvé une équation de plan, vérifier que les points donnés la satisfont.`],
["Exemples corrigés", String.raw`## Exemple 1 : vecteur et distance
$A(1 \,;\, 2 \,;\, 0)$ et $B(3 \,;\, -1 \,;\, 2)$. Calculer $\overrightarrow{AB}$ et $AB$.
> $\overrightarrow{AB}(2 \,;\, -3 \,;\, 2)$ et $AB = \sqrt{4 + 9 + 4} = \sqrt{17}$.
## Exemple 2 : orthogonalité
$\vec{u}(1 \,;\, 2 \,;\, -1)$ et $\vec{v}(3 \,;\, -1 \,;\, 1)$ sont-ils orthogonaux ?
> $\vec{u} \cdot \vec{v} = 3 - 2 - 1 = 0$ : oui, ils sont orthogonaux.
## Exemple 3 : équation d'un plan
Plan passant par $A(1 \,;\, 2 \,;\, 0)$, de vecteur normal $\vec{n}(2 \,;\, -1 \,;\, 3)$.
> Équation : $2x - y + 3z + d = 0$. Avec $A$ : $2 - 2 + 0 + d = 0$, donc $d = 0$.
> Le plan a pour équation $2x - y + 3z = 0$.
## Exemple 4 : intersection droite-plan
$D$ : $x = 1 + 2t$, $y = t$, $z = 2 - t$ et $\mathcal{P}$ : $x + y + z = 6$.
> $(1 + 2t) + t + (2 - t) = 6 \iff 3 + 2t = 6 \iff t = 1{,}5$.
> Le point d'intersection est $I(4 \,;\, 1{,}5 \,;\, 0{,}5)$.
## Exemple 5 : distance d'un point à un plan
Distance de $M(1 \,;\, 1 \,;\, 1)$ au plan $2x - y + 2z + 3 = 0$.
> $d = \dfrac{|2 - 1 + 2 + 3|}{\sqrt{4 + 1 + 4}} = \dfrac{6}{3} = 2$.
## Exemple 6 : plan passant par trois points
$A(1 \,;\, 0 \,;\, 0)$, $B(0 \,;\, 2 \,;\, 0)$, $C(0 \,;\, 0 \,;\, 3)$.
> $\overrightarrow{AB}(-1 \,;\, 2 \,;\, 0)$ et $\overrightarrow{AC}(-1 \,;\, 0 \,;\, 3)$.
> $\vec{n}(6 \,;\, 3 \,;\, 2)$ convient : $-6 + 6 + 0 = 0$ et $-6 + 0 + 6 = 0$.
> $6x + 3y + 2z + d = 0$ et $A$ donne $d = -6$ : le plan est $6x + 3y + 2z = 6$.`]
] });
