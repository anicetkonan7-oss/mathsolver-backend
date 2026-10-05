/* MathSolver - Cours Terminale, chapitre 8 : Équations différentielles (1/3) */
MSCOP("lt.7", { t: "Équations différentielles", s: [
["Introduction", String.raw`Une **équation différentielle** relie une fonction inconnue $y$ à ses dérivées $y'$, $y''$. La résoudre, c'est trouver **toutes les fonctions** qui la vérifient. Une condition initiale permet ensuite de choisir **une seule** solution.
[R] Dans la vie courante :: Le refroidissement d'un café, la croissance d'une population, la désintégration radioactive, la charge d'un condensateur ou l'oscillation d'un ressort se modélisent par des équations différentielles.`],
["Définitions", String.raw`[D] Équation différentielle :: C'est une égalité entre une fonction inconnue $y$ (dérivable) et ses dérivées. Exemples : $y' = 2y$ ; $y' = -y + 3$ ; $y'' + 4y = 0$.
[D] Solution :: Une solution sur $I$ est une fonction $f$ dérivable sur $I$ telle que l'égalité est vraie pour tout $x$ de $I$, en remplaçant $y$ par $f$.
[D] Condition initiale :: Donnée de la valeur $y(x_0) = y_0$ (et de $y'(x_0)$ pour une équation du second ordre). Elle fixe les constantes.
[D] Ordre :: L'ordre est celui de la dérivée la plus élevée : $y' = ay + b$ est du premier ordre, $y'' + \omega^2 y = 0$ du second ordre.`],
["Propriétés", String.raw`[P] Équation y' = ay :: Les solutions sur $\mathbb{R}$ sont les fonctions $x \mapsto Ce^{ax}$, avec $C$ réel quelconque. // Pour la condition $y(x_0) = y_0$, la solution unique est $y = y_0\,e^{a(x - x_0)}$.
[F] Quelques solutions de $y' = 0{,}5y$ : $y = Ce^{0{,}5x}$ pour $C = 2$ ; $1$ ; $0{,}5$ ; $-1$. :: X -3 3 -3 4 ; F "2*exp(0.5*x)" -3 3 c2 b ; F "exp(0.5*x)" -3 3 c1 b ; F "0.5*exp(0.5*x)" -3 3 c4 b ; F "-exp(0.5*x)" -3 3 c3 b ; L -1.9 3.5 "C = 2" c2 ; L -1.9 2.8 "C = 1" c1 ; L -1.9 2.1 "C = 0,5" c4 ; L -1.9 -1.6 "C = −1" c3
[P] Équation y' = ay + b (a ≠ 0) :: Les solutions sont les fonctions $x \mapsto Ce^{ax} - \dfrac{b}{a}$, avec $C$ réel. // La fonction constante $y = -\dfrac{b}{a}$ est la solution particulière constante.
[F] Solutions de $y' = -y + 2$ : $y = Ce^{-x} + 2$. Toutes se rapprochent de la droite $y = 2$. :: X 0 5 0 4 ; F "2" 0 5 d ; F "2+2*exp(-x)" 0 5 c2 b ; F "2-2*exp(-x)" 0 5 c1 b ; F "2+exp(-x)" 0 5 c4 b ; L 4.4 2.4 "y = 2"
[P] Équation y'' + ω²y = 0 :: Les solutions sont les fonctions $x \mapsto A\cos(\omega x) + B\sin(\omega x)$, avec $A$ et $B$ réels. // Avec $y(0)$ et $y'(0)$ donnés, la solution est unique.
[F] La solution de $y'' + 4y = 0$ avec $y(0) = 2$ et $y'(0) = 0$ est $y = 2\cos(2x)$, de période $\pi$. :: X 0 6 -2 2 ; F "2*cos(2*x)" 0 6.3 c1 b ; p a 0 2.4 ; p b 3.14 2.4 ; V a b c2 ; V b a c2 ; L 1.57 2.8 "période π" c2
[P] Équation y'' + ay' + by = 0 (série C) :: On résout l'équation caractéristique $r^2 + ar + b = 0$ de discriminant $\Delta$. // $\Delta > 0$ : $y = Ae^{r_1x} + Be^{r_2x}$. // $\Delta = 0$ : $y = (Ax + B)e^{r_0x}$. // $\Delta < 0$, racines $\alpha \pm i\beta$ : $y = e^{\alpha x}(A\cos\beta x + B\sin\beta x)$.`]
] });
