/* MathSolver - Cours 3e, chapitre 11 : Angles (3/3) */
MSCOP("l3.10", { s: [
["Cas particuliers", String.raw`[R] Triangle rectangle :: Les deux angles aigus d'un triangle rectangle sont complémentaires : leur somme vaut $90^\circ$.
[R] Demi-cercle :: Si un triangle est inscrit dans un cercle et qu'un de ses côtés est un diamètre, alors il est rectangle. L'angle inscrit qui intercepte un demi-cercle mesure $90^\circ$.
[R] Polygone régulier :: Chaque angle d'un polygone régulier à $n$ côtés mesure $\dfrac{(n - 2) \times 180^\circ}{n}$ : $60^\circ$ pour le triangle équilatéral, $90^\circ$ pour le carré, $108^\circ$ pour le pentagone, $120^\circ$ pour l'hexagone.
[R] Quadrilatère :: La somme des angles d'un quadrilatère vaut $(4 - 2) \times 180^\circ = 360^\circ$.`],
["Erreurs fréquentes", String.raw`[!] Angle au centre et inscrit inversés :: C'est l'angle **au centre** qui est le **double** : $\widehat{AOB} = 2\widehat{ACB}$, et non l'inverse.
[!] Parallèles non vérifiées :: L'égalité des angles alternes-internes n'est vraie que si les droites sont **parallèles**.
[!] Complémentaire et supplémentaire :: Complémentaires : somme $90^\circ$. Supplémentaires : somme $180^\circ$.
[!] Lire l'angle :: $\widehat{ABC}$ a pour sommet la lettre du **milieu**, B.
[!] Polygone :: Pour un pentagone, $(5 - 2) \times 180^\circ = 540^\circ$, et non $5 \times 180^\circ$.`],
["À retenir", String.raw`[K] L'essentiel :: Triangle : $\widehat{A} + \widehat{B} + \widehat{C} = 180^\circ$. Polygone à $n$ côtés : $(n - 2) \times 180^\circ$. // Parallèles et sécante : angles alternes-internes et correspondants égaux (et réciproquement). // Cercle : angle au centre $= 2 \times$ angle inscrit qui intercepte le même arc.
- Angles opposés par le sommet : égaux.
- Triangle isocèle : angles à la base égaux ; équilatéral : $60^\circ$.
- Triangle inscrit dans un demi-cercle : rectangle.`]
], q: [
[String.raw`Les angles d'un triangle mesurent $2x$, $3x$ et $4x$. Calculer $x$ et les trois angles.`, String.raw`> $2x + 3x + 4x = 180^\circ$, donc $9x = 180^\circ$ et $x = 20^\circ$.
> Les angles mesurent $40^\circ$, $60^\circ$ et $80^\circ$.`],
[String.raw`Deux droites sécantes forment un angle de $115^\circ$. Calculer les trois autres angles.`, String.raw`> L'angle opposé par le sommet mesure aussi $115^\circ$.
> Les deux autres sont supplémentaires : $180^\circ - 115^\circ = 65^\circ$ chacun.`],
[String.raw`Calculer la mesure de chaque angle d'un octogone régulier (8 côtés).`, String.raw`> Somme : $(8 - 2) \times 180^\circ = 1\,080^\circ$. Chaque angle : $\dfrac{1\,080^\circ}{8} = 135^\circ$.`],
[String.raw`Dans un cercle de centre O, l'angle au centre $\widehat{AOB}$ mesure $124^\circ$. Que mesure un angle inscrit qui intercepte le même arc ?`, String.raw`> L'angle inscrit est la moitié de l'angle au centre : $\dfrac{124^\circ}{2} = 62^\circ$.`],
[String.raw`Un triangle isocèle a deux angles à la base de $50^\circ$. Calculer son angle au sommet.`, String.raw`> $180^\circ - 2 \times 50^\circ = 80^\circ$.`],
[String.raw`Une sécante coupe deux droites $(d)$ et $(d')$ en formant deux angles alternes-internes de $73^\circ$ et $74^\circ$. Les droites sont-elles parallèles ?`, String.raw`> Si elles étaient parallèles, les angles alternes-internes seraient égaux. Or $73^\circ \neq 74^\circ$ : les droites $(d)$ et $(d')$ ne sont **pas** parallèles.`]
] });