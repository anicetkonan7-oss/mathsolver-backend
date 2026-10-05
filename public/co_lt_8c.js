/* MathSolver - Cours Terminale, chapitre 9 : Nombres complexes (3/3) */
MSCOP("lt.8", { s: [
["Cas particuliers", String.raw`[R] Réel ou imaginaire pur :: $z$ est réel $\iff \bar{z} = z \iff \text{Im}(z) = 0$. $z$ est imaginaire pur $\iff \bar{z} = -z \iff \text{Re}(z) = 0$.
[R] Module 1 :: Les complexes de module 1 sont les $e^{i\theta}$ ; leurs points sont sur le cercle de centre $O$ et de rayon 1.
[R] Racines n-ièmes de l'unité :: Les solutions de $z^n = 1$ sont $e^{2ik\pi/n}$, pour $k = 0, 1, \ldots, n - 1$. Elles forment un polygone régulier.
[F] Les racines cubiques de 1 : $1$, $e^{2i\pi/3}$ et $e^{4i\pi/3}$ forment un triangle équilatéral. :: p O 0 0 ; C O 1 c2 ; X -1 1 -1 1 ; P A 1 0 e ; P B -0.5 0.866 no ; P D -0.5 -0.866 so ; G A B D c1
[R] Valeurs à connaître :: $e^{i\pi} = -1$ ; $e^{i\pi/2} = i$ ; $e^{2i\pi} = 1$ ; $i^3 = -i$ ; $i^4 = 1$.
[R] Lieux géométriques :: $|z - z_A| = R$ : cercle de centre $A$ et de rayon $R$. $|z - z_A| = |z - z_B|$ : médiatrice de $[AB]$.`],
["Erreurs fréquentes", String.raw`[!] Carré de i :: $i^2 = -1$, et non $1$ : $(3i)^2 = -9$.
[!] Module :: $|a + ib| = \sqrt{a^2 + b^2}$, et non $a + b$ ni $\sqrt{a^2 - b^2}$.
[!] Argument :: Il faut **les deux** : $\cos\theta$ et $\sin\theta$. Avec la tangente seule, on peut se tromper de $\pi$.
[!] Module d'une somme :: $|z + z'| \neq |z| + |z'|$ en général.
[!] Partie imaginaire :: Pour $z = 3 - 5i$, $\text{Im}(z) = -5$, et non $-5i$.`],
["À retenir", String.raw`[K] L'essentiel :: $z = a + ib = re^{i\theta}$, avec $r = \sqrt{a^2 + b^2}$, $\cos\theta = \dfrac{a}{r}$, $\sin\theta = \dfrac{b}{r}$. // $z\bar{z} = |z|^2$ ; $|zz'| = |z||z'|$ ; $\arg(zz') = \arg z + \arg z'$. // $\Delta < 0$ : $z = \dfrac{-b \pm i\sqrt{-\Delta}}{2a}$.
- Quotient : multiplier par le conjugué du dénominateur.
- Puissances : forme exponentielle.
- Géométrie : $AB = |z_B - z_A|$ et angle $= \arg\dfrac{z_C - z_A}{z_B - z_A}$.`]
], q: [
[String.raw`Écrire sous forme algébrique $(3 - 2i)^2$.`, String.raw`> $(3 - 2i)^2 = 9 - 12i + 4i^2 = 5 - 12i$.`],
[String.raw`Écrire sous forme algébrique $\dfrac{5 + 5i}{1 + 2i}$.`, String.raw`> $\dfrac{(5 + 5i)(1 - 2i)}{1 + 4} = \dfrac{5 - 10i + 5i + 10}{5} = \dfrac{15 - 5i}{5} = 3 - i$.`],
[String.raw`Écrire $z = -1 + i\sqrt{3}$ sous forme exponentielle.`, String.raw`> $|z| = \sqrt{1 + 3} = 2$ ; $\cos\theta = -\dfrac{1}{2}$ et $\sin\theta = \dfrac{\sqrt{3}}{2}$.
> Donc $\theta = \dfrac{2\pi}{3}$ et $z = 2e^{2i\pi/3}$.`],
[String.raw`Résoudre dans $\mathbb{C}$ : $z^2 + 4z + 13 = 0$.`, String.raw`> $\Delta = 16 - 52 = -36 = (6i)^2$.
> $z = \dfrac{-4 \pm 6i}{2}$, soit $z_1 = -2 - 3i$ et $z_2 = -2 + 3i$.`],
[String.raw`Calculer $(\sqrt{3} + i)^6$.`, String.raw`> $\sqrt{3} + i = 2e^{i\pi/6}$.
> $(\sqrt{3} + i)^6 = 2^6e^{i\pi} = 64 \times (-1) = -64$.`],
[String.raw`Déterminer l'ensemble des points $M$ d'affixe $z$ tels que $|z - 1 - i| = 2$.`, String.raw`> $|z - (1 + i)| = 2$ signifie $AM = 2$, avec $A$ d'affixe $1 + i$.
> C'est le cercle de centre $A(1 \,;\, 1)$ et de rayon 2.`]
] });
