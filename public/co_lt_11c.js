/* MathSolver - Cours Terminale, chapitre 12 : Géométrie dans l'espace (3/3) */
MSCOP("lt.11", { s: [
["Cas particuliers", String.raw`[R] Plans de coordonnées :: $(xOy)$ : $z = 0$ ; $(xOz)$ : $y = 0$ ; $(yOz)$ : $x = 0$. Un plan d'équation $z = 2$ est parallèle à $(xOy)$.
[R] Plans parallèles :: $2x - y + z = 1$ et $4x - 2y + 2z = 5$ sont parallèles : leurs vecteurs normaux sont colinéaires.
[R] Produit vectoriel (série C) :: $\vec{u} \wedge \vec{v} = (yz' - zy' \,;\, zx' - xz' \,;\, xy' - yx')$. Il est orthogonal à $\vec{u}$ et à $\vec{v}$ : c'est un vecteur normal au plan qu'ils dirigent. // Aire du triangle $ABC$ : $\dfrac{1}{2}\|\overrightarrow{AB} \wedge \overrightarrow{AC}\|$.
[R] Exemple de produit vectoriel :: Pour l'exemple 6 : $\overrightarrow{AB} \wedge \overrightarrow{AC} = (6 \,;\, 3 \,;\, 2)$, et l'aire de $ABC$ vaut $\dfrac{1}{2}\sqrt{49} = 3{,}5$.
[R] Point sur une sphère :: $M$ est sur la sphère si $\Omega M = R$, intérieur si $\Omega M < R$.`],
["Erreurs fréquentes", String.raw`[!] Vecteur normal et vecteur directeur :: Dans $ax + by + cz + d = 0$, $(a \,;\, b \,;\, c)$ est **normal** au plan, pas un vecteur du plan.
[!] Oublier d :: L'équation $2x - y + 3z = 0$ ne convient que si le plan passe par l'origine.
[!] Valeur absolue :: Dans la formule de distance, le numérateur est en **valeur absolue**.
[!] Paramètre unique :: Pour vérifier qu'un point est sur une droite, il faut **le même** $t$ dans les trois équations.
[!] Ordre dans AB :: $\overrightarrow{AB} = B - A$, et non $A - B$.`],
["À retenir", String.raw`[K] L'essentiel :: $\vec{u} \cdot \vec{v} = xx' + yy' + zz'$ ; orthogonaux si $\vec{u} \cdot \vec{v} = 0$. // Plan de normale $\vec{n}(a \,;\, b \,;\, c)$ : $ax + by + cz + d = 0$. // Distance au plan : $\dfrac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2 + b^2 + c^2}}$.
- Droite : $x = x_A + t\alpha$, $y = y_A + t\beta$, $z = z_A + t\gamma$.
- Intersection droite-plan : remplacer, trouver $t$.
- Sphère : $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$.`]
], q: [
[String.raw`Calculer la norme de $\vec{u}(2 \,;\, -1 \,;\, 2)$.`, String.raw`> $\|\vec{u}\| = \sqrt{4 + 1 + 4} = \sqrt{9} = 3$.`],
[String.raw`$\vec{u}(1 \,;\, -2 \,;\, 3)$ et $\vec{v}(4 \,;\, 5 \,;\, 2)$ sont-ils orthogonaux ?`, String.raw`> $\vec{u} \cdot \vec{v} = 4 - 10 + 6 = 0$ : oui.`],
[String.raw`Déterminer une équation du plan passant par $B(2 \,;\, -1 \,;\, 1)$ et de vecteur normal $\vec{n}(1 \,;\, 3 \,;\, -2)$.`, String.raw`> $x + 3y - 2z + d = 0$ ; avec $B$ : $2 - 3 - 2 + d = 0$, donc $d = 3$.
> Le plan a pour équation $x + 3y - 2z + 3 = 0$.`],
[String.raw`Calculer la distance du point $A(2 \,;\, 0 \,;\, 1)$ au plan $x + 2y + 2z - 1 = 0$.`, String.raw`> $d = \dfrac{|2 + 0 + 2 - 1|}{\sqrt{1 + 4 + 4}} = \dfrac{3}{3} = 1$.`],
[String.raw`$D$ : $x = 1 + t$, $y = 2 - t$, $z = 3t$. Le point $A(0 \,;\, 3 \,;\, -3)$ est-il sur $D$ ?`, String.raw`> $1 + t = 0$ donne $t = -1$. Alors $y = 2 + 1 = 3$ et $z = -3$.
> Les trois équations sont vérifiées avec $t = -1$ : $A$ est sur $D$.`],
[String.raw`Donner une équation de la sphère de centre $\Omega(1 \,;\, -2 \,;\, 0)$ et de rayon 3. Le point $E(3 \,;\, 0 \,;\, 1)$ est-il sur cette sphère ?`, String.raw`> $(x - 1)^2 + (y + 2)^2 + z^2 = 9$.
> Pour $E$ : $4 + 4 + 1 = 9$ : $E$ est sur la sphère.`]
] });
