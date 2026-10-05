/* MathSolver - Cours Terminale, chapitre 15 : Coniques, série C (2/3) */
MSCOP("lt.14", { s: [
["Méthodes", String.raw`## Méthode 1 : reconnaître une conique
1) Regrouper les termes en $x$ et en $y$, puis faire apparaître des carrés : $x^2 - 2x = (x - 1)^2 - 1$.
2) Mettre sous forme réduite (diviser pour obtenir 1 au second membre).
3) Signes $+$ et $+$ : ellipse ; signes $+$ et $-$ : hyperbole ; un seul carré : parabole.
## Méthode 2 : éléments caractéristiques
Lire $a$, $b$ (ou $p$), calculer $c$, puis les foyers, l'excentricité, les directrices (et les asymptotes pour une hyperbole).
## Méthode 3 : conique définie par F, D et e
Écrire $MF^2 = e^2MH^2$ avec $M(x \,;\, y)$, développer, puis réduire.
## Méthode 4 : tangente
Vérifier que le point est sur la courbe, puis appliquer la formule du dédoublement.
[!] Rôle de a :: Pour l'ellipse, $a$ est le plus grand des deux demi-axes ; c'est sur son axe que sont les foyers.`],
["Exemples corrigés", String.raw`## Exemple 1 : parabole
Éléments de la parabole $y^2 = 8x$.
> $2p = 8$, donc $p = 4$ : foyer $F(2 \,;\, 0)$, directrice $x = -2$, sommet $O$.
## Exemple 2 : ellipse
Éléments de l'ellipse $\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1$.
> $a = 5$, $b = 3$, $c^2 = 25 - 9 = 16$, donc $c = 4$.
> Foyers $(\pm 4 \,;\, 0)$ ; $e = \dfrac{4}{5} = 0{,}8$ ; directrices $x = \pm\dfrac{25}{4}$.
## Exemple 3 : hyperbole
Éléments de l'hyperbole $\dfrac{x^2}{16} - \dfrac{y^2}{9} = 1$.
> $a = 4$, $b = 3$, $c^2 = 16 + 9 = 25$, donc $c = 5$.
> Foyers $(\pm 5 \,;\, 0)$ ; $e = \dfrac{5}{4}$ ; asymptotes $y = \pm\dfrac{3}{4}x$.
## Exemple 4 : réduire une équation
Nature de $x^2 + 4y^2 - 2x - 3 = 0$.
> $(x - 1)^2 - 1 + 4y^2 - 3 = 0 \iff (x - 1)^2 + 4y^2 = 4$
> $\iff \dfrac{(x - 1)^2}{4} + y^2 = 1$.
> Ellipse de centre $\Omega(1 \,;\, 0)$, $a = 2$, $b = 1$, $c = \sqrt{3}$, $e = \dfrac{\sqrt{3}}{2}$.
> Foyers $(1 \pm \sqrt{3} \,;\, 0)$.
## Exemple 5 : foyer et directrice
Conique de foyer $F(1 \,;\, 0)$, de directrice $x = -1$ et d'excentricité 1.
> $MF^2 = MH^2 \iff (x - 1)^2 + y^2 = (x + 1)^2 \iff y^2 = 4x$.
> C'est la parabole $y^2 = 4x$.
## Exemple 6 : tangente à une ellipse
Tangente à $\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1$ au point $M_0(4 \,;\, 1{,}8)$.
> $M_0$ est sur l'ellipse : $\dfrac{16}{25} + \dfrac{3{,}24}{9} = 0{,}64 + 0{,}36 = 1$.
> Tangente : $\dfrac{4x}{25} + \dfrac{1{,}8y}{9} = 1 \iff \dfrac{4x}{25} + \dfrac{y}{5} = 1 \iff 4x + 5y = 25$.`]
] });
