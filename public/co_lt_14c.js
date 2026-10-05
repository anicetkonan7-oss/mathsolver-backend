/* MathSolver - Cours Terminale, chapitre 15 : Coniques, série C (3/3) */
MSCOP("lt.14", { s: [
["Cas particuliers", String.raw`[R] Cercle :: Si $a = b$, l'ellipse est un cercle de rayon $a$ : $c = 0$ et $e = 0$.
[R] Hyperbole équilatère :: Si $a = b$, les asymptotes $y = \pm x$ sont perpendiculaires et $e = \sqrt{2}$. Exemple : $x^2 - y^2 = 1$ ; la courbe de $y = \dfrac{1}{x}$ en est une aussi.
[R] Foyers sur (Oy) :: $\dfrac{x^2}{4} + \dfrac{y^2}{9} = 1$ est une ellipse de grand axe vertical : $c^2 = 9 - 4 = 5$, foyers $(0 \,;\, \pm\sqrt{5})$.
[R] Hyperbole verticale :: $\dfrac{y^2}{b^2} - \dfrac{x^2}{a^2} = 1$ a ses foyers sur $(Oy)$.
[R] Courbe vide ou réduite à un point :: $\dfrac{x^2}{4} + \dfrac{y^2}{9} = -1$ n'a aucun point ; $x^2 + y^2 = 0$ est réduite au point $O$.`],
["Erreurs fréquentes", String.raw`[!] Calcul de c :: Ellipse : $c^2 = a^2 - b^2$ ; hyperbole : $c^2 = a^2 + b^2$. Ne pas les confondre.
[!] Paramètre de la parabole :: Pour $y^2 = 8x$, $2p = 8$ donc $p = 4$ ; le foyer est en $\dfrac{p}{2} = 2$, et non en 8 ni en 4.
[!] Forme réduite :: Le second membre doit valoir 1 : $9x^2 + 4y^2 = 36$ devient $\dfrac{x^2}{4} + \dfrac{y^2}{9} = 1$.
[!] Mise sous forme canonique :: $x^2 - 2x = (x - 1)^2 - 1$ : ne pas oublier le $-1$.
[!] Excentricité :: $e = \dfrac{c}{a}$, et non $\dfrac{a}{c}$ ni $\dfrac{b}{a}$.`],
["À retenir", String.raw`[K] L'essentiel :: $MF = e \times MH$ : $e = 1$ parabole, $e < 1$ ellipse, $e > 1$ hyperbole. // Parabole $y^2 = 2px$ : $F\left(\dfrac{p}{2} \,;\, 0\right)$, directrice $x = -\dfrac{p}{2}$. // Ellipse : $c^2 = a^2 - b^2$ ; hyperbole : $c^2 = a^2 + b^2$, asymptotes $y = \pm\dfrac{b}{a}x$ ; $e = \dfrac{c}{a}$.
- Reconnaître : faire apparaître des carrés, puis la forme réduite.
- Ellipse : $MF + MF' = 2a$ ; hyperbole : $|MF - MF'| = 2a$.
- Tangente : formule du dédoublement.`]
], q: [
[String.raw`Donner le foyer et la directrice de la parabole $y^2 = 6x$.`, String.raw`> $2p = 6$, donc $p = 3$ : foyer $F(1{,}5 \,;\, 0)$, directrice $x = -1{,}5$.`],
[String.raw`Déterminer les foyers et l'excentricité de l'ellipse $\dfrac{x^2}{169} + \dfrac{y^2}{144} = 1$.`, String.raw`> $a = 13$, $b = 12$, $c^2 = 169 - 144 = 25$, donc $c = 5$.
> Foyers $(\pm 5 \,;\, 0)$ et $e = \dfrac{5}{13}$.`],
[String.raw`Déterminer les foyers, l'excentricité et les asymptotes de $\dfrac{x^2}{9} - \dfrac{y^2}{16} = 1$.`, String.raw`> $a = 3$, $b = 4$, $c^2 = 9 + 16 = 25$, donc $c = 5$.
> Foyers $(\pm 5 \,;\, 0)$ ; $e = \dfrac{5}{3}$ ; asymptotes $y = \pm\dfrac{4}{3}x$.`],
[String.raw`Nature et foyers de la courbe $9x^2 + 4y^2 = 36$.`, String.raw`> En divisant par 36 : $\dfrac{x^2}{4} + \dfrac{y^2}{9} = 1$.
> Ellipse de grand axe vertical : $c^2 = 9 - 4 = 5$, foyers $(0 \,;\, \pm\sqrt{5})$.`],
[String.raw`Déterminer la conique de foyer $F(2 \,;\, 0)$, de directrice $x = 8$ et d'excentricité $\dfrac{1}{2}$.`, String.raw`> $MF^2 = \dfrac{1}{4}MH^2$ : $4(x - 2)^2 + 4y^2 = (x - 8)^2$.
> $4x^2 - 16x + 16 + 4y^2 = x^2 - 16x + 64 \iff 3x^2 + 4y^2 = 48$.
> Soit $\dfrac{x^2}{16} + \dfrac{y^2}{12} = 1$ : une ellipse ($e < 1$).`],
[String.raw`Nature et éléments de la courbe $y^2 - 4y - 4x = 0$.`, String.raw`> $(y - 2)^2 - 4 - 4x = 0 \iff (y - 2)^2 = 4(x + 1)$.
> Parabole de sommet $S(-1 \,;\, 2)$, avec $2p = 4$, donc $p = 2$.
> Foyer $F(0 \,;\, 2)$ et directrice $x = -2$.`]
] });
