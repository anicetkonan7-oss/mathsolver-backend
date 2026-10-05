/* MathSolver - Cours Terminale, chapitre 2 : Dérivabilité et étude de fonctions (1/3) */
MSCOP("lt.1", { t: "Dérivabilité et étude de fonctions", s: [
["Introduction", String.raw`La **dérivée** mesure la vitesse à laquelle une fonction varie. Son **signe** donne le sens de variation, ses zéros donnent les extremums, et le nombre dérivé donne la pente de la **tangente**. C'est l'outil central pour étudier une fonction.
[R] Dans la vie courante :: La vitesse est la dérivée de la distance par rapport au temps. Une entreprise cherche le prix qui rend son bénéfice maximal : elle annule une dérivée.`],
["Définitions", String.raw`[D] Nombre dérivé :: $f$ est dérivable en $a$ si $\dfrac{f(a + h) - f(a)}{h}$ a une limite finie quand $h \to 0$. Cette limite est le **nombre dérivé** $f'(a)$.
[D] Tangente :: Si $f$ est dérivable en $a$, la tangente à la courbe au point d'abscisse $a$ a pour équation $y = f'(a)(x - a) + f(a)$. Son coefficient directeur est $f'(a)$.
[F] La tangente à la courbe de $f(x) = x^2$ au point d'abscisse 1 a pour équation $y = 2x - 1$. :: X -1 3 -2 5 ; F "x^2" -1 2.3 c1 b ; F "2*x-1" -0.5 3 c2 ; P A 1 1 no
[D] Dérivées usuelles :: $(x^n)' = nx^{n-1}$ ; $\left(\dfrac{1}{x}\right)' = -\dfrac{1}{x^2}$ ; $(\sqrt{x})' = \dfrac{1}{2\sqrt{x}}$ ; $(\sin x)' = \cos x$ ; $(\cos x)' = -\sin x$.
[R] Dérivable et continue :: Une fonction dérivable en $a$ est continue en $a$. La réciproque est fausse : $|x|$ est continue en 0 mais n'y est pas dérivable.`],
["Propriétés", String.raw`[P] Opérations :: $(u + v)' = u' + v'$ ; $(ku)' = ku'$ ; $(uv)' = u'v + uv'$ ; $\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$.
[P] Composées :: $(u^n)' = nu'u^{n - 1}$ ; $(\sqrt{u})' = \dfrac{u'}{2\sqrt{u}}$ ; $(v \circ u)' = u' \times v' \circ u$. // Exemple : $(\sin(2x))' = 2\cos(2x)$.
[P] Sens de variation :: Sur un intervalle : si $f' > 0$, $f$ est strictement croissante ; si $f' < 0$, $f$ est strictement décroissante ; si $f' = 0$, $f$ est constante.
[P] Extremum :: Si $f'$ s'annule en $a$ **en changeant de signe**, $f$ admet un extremum local en $a$ (maximum si $f'$ passe de $+$ à $-$, minimum si $f'$ passe de $-$ à $+$).
[F] $f(x) = x^3 - 3x + 1$ : maximum local 3 en $-1$, minimum local $-1$ en 1, là où la dérivée s'annule. :: X -2 2 -2 4 ; F "x^3-3*x+1" -2 2 c1 b ; P M -1 3 n ; P N 1 -1 s`]
] });
