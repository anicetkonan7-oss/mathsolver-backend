/* MathSolver - Cours Terminale, chapitre 8 : Équations différentielles (2/3) */
MSCOP("lt.7", { s: [
["Méthodes", String.raw`## Méthode 1 : résoudre y' = ay
1) Mettre l'équation sous la forme $y' = ay$ (isoler $y'$).
2) Écrire la solution générale $y = Ce^{ax}$.
3) Utiliser la condition initiale pour trouver $C$.
## Méthode 2 : résoudre y' = ay + b
1) Isoler $y'$ pour lire $a$ et $b$.
2) Solution générale : $y = Ce^{ax} - \dfrac{b}{a}$.
3) Trouver $C$ avec la condition initiale.
## Méthode 3 : résoudre y'' + ω²y = 0
1) Identifier $\omega$ (si $y'' + 9y = 0$, alors $\omega = 3$).
2) Écrire $y = A\cos(\omega x) + B\sin(\omega x)$, puis $y' = -A\omega\sin(\omega x) + B\omega\cos(\omega x)$.
3) $y(0) = A$ et $y'(0) = B\omega$ donnent $A$ et $B$.
## Méthode 4 : vérifier une solution
Calculer $f'$ (et $f''$), remplacer dans l'équation et vérifier que l'égalité est vraie pour tout $x$.
[!] Forme de l'équation :: Avant d'appliquer une formule, l'équation doit être écrite exactement sous la forme du cours : $2y' + y = 0$ devient $y' = -\dfrac{1}{2}y$.`],
["Exemples corrigés", String.raw`## Exemple 1 : y' = ay avec condition initiale
Résoudre $y' = 2y$ avec $y(0) = 3$.
> Solutions : $y = Ce^{2x}$. Or $y(0) = C = 3$.
> Donc $y = 3e^{2x}$.
## Exemple 2 : isoler y'
Résoudre $y' + 3y = 0$ avec $y(1) = 2$.
> $y' = -3y$, donc $y = Ce^{-3x}$.
> $y(1) = Ce^{-3} = 2$, donc $C = 2e^{3}$.
> Donc $y = 2e^{-3(x - 1)}$.
## Exemple 3 : y' = ay + b
Résoudre $y' = -2y + 6$ avec $y(0) = 1$.
> $a = -2$, $b = 6$, $-\dfrac{b}{a} = 3$ : $y = Ce^{-2x} + 3$.
> $y(0) = C + 3 = 1$, donc $C = -2$ et $y = 3 - 2e^{-2x}$.
## Exemple 4 : y'' + ω²y = 0
Résoudre $y'' + 9y = 0$ avec $y(0) = 1$ et $y'(0) = 6$.
> $\omega = 3$ : $y = A\cos 3x + B\sin 3x$.
> $y(0) = A = 1$ ; $y'(0) = 3B = 6$, donc $B = 2$.
> Donc $y = \cos 3x + 2\sin 3x$.
## Exemple 5 : équation caractéristique (série C)
Résoudre $y'' - 3y' + 2y = 0$ avec $y(0) = 0$ et $y'(0) = 1$.
> $r^2 - 3r + 2 = 0$ a pour racines $1$ et $2$ : $y = Ae^{x} + Be^{2x}$.
> $A + B = 0$ et $A + 2B = 1$, donc $B = 1$, $A = -1$.
> Donc $y = e^{2x} - e^{x}$.
## Exemple 6 : refroidissement
Un café à $90°$C refroidit dans une pièce à $20°$C : $\theta' = -0{,}1(\theta - 20)$, $t$ en minutes. Quand atteint-il $55°$C ?
> $\theta' = -0{,}1\theta + 2$ : $\theta = Ce^{-0{,}1t} + 20$, et $\theta(0) = 90$ donne $C = 70$.
> $70e^{-0{,}1t} + 20 = 55 \iff e^{-0{,}1t} = 0{,}5$
> $t = 10\ln 2 \approx 6{,}9$ minutes.`]
] });
