/* MathSolver - Cours Terminale, chapitre 14 : Similitudes directes, série C (2/3) */
MSCOP("lt.13", { s: [
["Méthodes", String.raw`## Méthode 1 : éléments caractéristiques de z' = az + b
1) Rapport $k = |a|$ ; angle $\theta = \arg a$.
2) Centre : résoudre $\omega = a\omega + b$, d'où $\omega = \dfrac{b}{1 - a}$.
## Méthode 2 : écriture complexe à partir des éléments
Avec le centre $\omega$, le rapport $k$ et l'angle $\theta$ : $z' - \omega = ke^{i\theta}(z - \omega)$, puis développer.
## Méthode 3 : similitude qui envoie A sur A' et B sur B'
1) Calculer $a = \dfrac{z_{B'} - z_{A'}}{z_B - z_A}$.
2) Trouver $b$ avec $z_{A'} = az_A + b$.
## Méthode 4 : reconnaître la nature
Regarder $a$ : $a = 1$ (translation), $|a| = 1$ (rotation), $a$ réel (homothétie), sinon similitude de rapport $|a| \neq 1$ et d'angle non nul.
[!] Contrôle :: Vérifier que le centre trouvé est fixe : $a\omega + b$ doit redonner $\omega$.`],
["Exemples corrigés", String.raw`## Exemple 1 : éléments caractéristiques
Déterminer le rapport, l'angle et le centre de $s : z' = (1 + i)z + 2$.
> $k = |1 + i| = \sqrt{2}$ et $\theta = \arg(1 + i) = \dfrac{\pi}{4}$.
> $\omega = \dfrac{2}{1 - (1 + i)} = \dfrac{2}{-i} = 2i$.
> Contrôle : $(1 + i) \times 2i + 2 = 2i - 2 + 2 = 2i$.
## Exemple 2 : écriture complexe
Écrire la similitude de centre $\Omega(1)$, de rapport 2 et d'angle $\dfrac{\pi}{2}$.
> $z' - 1 = 2e^{i\pi/2}(z - 1) = 2i(z - 1)$.
> Donc $z' = 2iz + 1 - 2i$.
## Exemple 3 : image d'un point
Image de $A(1 + i)$ par $s : z' = (1 + i)z + 2$.
> $z_{A'} = (1 + i)^2 + 2 = 2i + 2$ : $A'(2 + 2i)$.
## Exemple 4 : similitude définie par deux points
Similitude qui envoie $A(0)$ sur $A'(1)$ et $B(1)$ sur $B'(1 + 2i)$.
> $a = \dfrac{(1 + 2i) - 1}{1 - 0} = 2i$ et $1 = 2i \times 0 + b$, donc $b = 1$.
> $z' = 2iz + 1$ : rapport 2, angle $\dfrac{\pi}{2}$.
> Centre : $\omega = \dfrac{1}{1 - 2i} = \dfrac{1 + 2i}{5}$.
## Exemple 5 : homothétie
Nature de $z' = -2z + 3$.
> $a = -2$ est réel : homothétie de rapport $-2$, de centre $\omega = \dfrac{3}{1 + 2} = 1$.
> C'est aussi une similitude de rapport 2 et d'angle $\pi$.
## Exemple 6 : image d'un cercle
Image par $s : z' = (1 + i)z + 2$ du cercle de centre $I(1)$ et de rayon 2.
> $z_{I'} = (1 + i) \times 1 + 2 = 3 + i$ et le rayon est multiplié par $\sqrt{2}$.
> C'est le cercle de centre $I'(3 + i)$ et de rayon $2\sqrt{2}$.`]
] });
