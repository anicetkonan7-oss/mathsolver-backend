/* MathSolver - Cours Terminale, chapitre 14 : Similitudes directes, série C (3/3) */
MSCOP("lt.13", { s: [
["Cas particuliers", String.raw`[R] Translation :: $z' = z + b$ : il n'y a pas de centre (aucun point fixe si $b \neq 0$).
[R] Rotation :: $z' = e^{i\theta}z + b$ : rapport 1, les distances sont conservées. Exemple : $z' = iz$ est le quart de tour de centre $O$.
[R] Homothétie de rapport négatif :: $z' = -z$ est la symétrie centrale de centre $O$ : homothétie de rapport $-1$, ou rotation d'angle $\pi$.
[R] Composée commutative ? :: En général $s_1 \circ s_2 \neq s_2 \circ s_1$ : les angles et les rapports sont les mêmes, mais pas les centres.
[R] Identité :: $z' = z$ ($a = 1$, $b = 0$) : tous les points sont fixes.`],
["Erreurs fréquentes", String.raw`[!] Rapport et a :: Le rapport est $|a|$, et non $a$ : pour $a = 1 + i$, $k = \sqrt{2}$.
[!] Centre :: $\omega = \dfrac{b}{1 - a}$, et non $\dfrac{b}{a - 1}$ : il faut résoudre $\omega = a\omega + b$.
[!] Angle d'une homothétie :: Si $a < 0$, l'angle est $\pi$ et le rapport de la similitude est $|a|$.
[!] Ordre des points :: Dans $a = \dfrac{z_{B'} - z_{A'}}{z_B - z_A}$, les images sont au numérateur.
[!] Aires :: Les aires sont multipliées par $k^2$, et non par $k$.`],
["À retenir", String.raw`[K] L'essentiel :: $z' = az + b$, $a \neq 0$ : rapport $k = |a|$, angle $\theta = \arg a$. // Centre ($a \neq 1$) : $\omega = \dfrac{b}{1 - a}$ et $z' - \omega = a(z - \omega)$. // Distances $\times k$, aires $\times k^2$, angles conservés.
- $a = 1$ : translation ; $|a| = 1$ : rotation ; $a$ réel : homothétie.
- Deux points et leurs images déterminent la similitude.
- Toujours vérifier que le centre est fixe.`]
], q: [
[String.raw`Déterminer la nature et les éléments de $z' = 2z - 3i$.`, String.raw`> $a = 2$ réel : homothétie de rapport 2.
> Centre : $\omega = \dfrac{-3i}{1 - 2} = 3i$.`],
[String.raw`Déterminer la nature et les éléments de $z' = iz + 1 + i$.`, String.raw`> $|i| = 1$ : rotation d'angle $\dfrac{\pi}{2}$.
> $\omega = \dfrac{1 + i}{1 - i} = \dfrac{(1 + i)^2}{2} = i$. Contrôle : $i \times i + 1 + i = i$.`],
[String.raw`Écrire la similitude de centre $O$, de rapport 3 et d'angle $\dfrac{\pi}{3}$.`, String.raw`> $z' = 3e^{i\pi/3}z = \left(\dfrac{3}{2} + \dfrac{3\sqrt{3}}{2}i\right)z$.`],
[String.raw`Déterminer le rapport et l'angle de $z' = (1 - i\sqrt{3})z$.`, String.raw`> $|1 - i\sqrt{3}| = \sqrt{1 + 3} = 2$.
> $\cos\theta = \dfrac{1}{2}$ et $\sin\theta = -\dfrac{\sqrt{3}}{2}$, donc $\theta = -\dfrac{\pi}{3}$. Centre $O$.`],
[String.raw`Calculer l'image de $B(2 - i)$ par $z' = (1 + i)z + 2$.`, String.raw`> $(1 + i)(2 - i) + 2 = 2 - i + 2i + 1 + 2 = 5 + i$ : $B'(5 + i)$.`],
[String.raw`Déterminer la similitude qui envoie $A(1)$ sur $A'(i)$ et $B(2)$ sur $B'(3i)$, puis son centre.`, String.raw`> $a = \dfrac{3i - i}{2 - 1} = 2i$ ; $i = 2i \times 1 + b$, donc $b = -i$ : $z' = 2iz - i$.
> $\omega = \dfrac{-i}{1 - 2i} = \dfrac{-i(1 + 2i)}{5} = \dfrac{2 - i}{5}$.`]
] });
