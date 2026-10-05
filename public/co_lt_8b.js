/* MathSolver - Cours Terminale, chapitre 9 : Nombres complexes (2/3) */
MSCOP("lt.8", { s: [
["Méthodes", String.raw`## Méthode 1 : forme algébrique d'un quotient
Multiplier le numérateur et le dénominateur par le **conjugué du dénominateur**, qui devient réel.
## Méthode 2 : module et argument
1) Calculer $r = |z| = \sqrt{a^2 + b^2}$.
2) Calculer $\cos\theta = \dfrac{a}{r}$ et $\sin\theta = \dfrac{b}{r}$, puis reconnaître l'angle.
3) Écrire $z = re^{i\theta}$.
## Méthode 3 : équation du second degré
Calculer $\Delta = b^2 - 4ac$. Si $\Delta < 0$, écrire $\Delta = (i\sqrt{-\Delta})^2$ et appliquer la formule.
## Méthode 4 : interpréter géométriquement
Pour une nature de triangle, calculer $\dfrac{z_C - z_A}{z_B - z_A}$ : son module compare $AC$ et $AB$, son argument donne l'angle en $A$.
[!] Puissances :: Pour calculer $z^n$, passer par la forme exponentielle : $(re^{i\theta})^n = r^ne^{in\theta}$.`],
["Exemples corrigés", String.raw`## Exemple 1 : produit
Écrire sous forme algébrique $(2 + 3i)(1 - i)$.
> $(2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i$.
## Exemple 2 : quotient
Écrire sous forme algébrique $\dfrac{1 + 2i}{3 - i}$.
> $\dfrac{(1 + 2i)(3 + i)}{(3 - i)(3 + i)} = \dfrac{3 + i + 6i + 2i^2}{9 + 1} = \dfrac{1 + 7i}{10}$.
## Exemple 3 : forme exponentielle et puissance
Écrire $z = 1 + i$ sous forme exponentielle, puis calculer $z^8$.
> $|z| = \sqrt{2}$ ; $\cos\theta = \sin\theta = \dfrac{\sqrt{2}}{2}$, donc $\theta = \dfrac{\pi}{4}$ et $z = \sqrt{2}\,e^{i\pi/4}$.
> $z^8 = (\sqrt{2})^8e^{2i\pi} = 16$.
## Exemple 4 : de l'exponentielle à l'algébrique
Écrire $z = 2e^{i\pi/3}$ sous forme algébrique.
> $z = 2\left(\cos\dfrac{\pi}{3} + i\sin\dfrac{\pi}{3}\right) = 2\left(\dfrac{1}{2} + i\dfrac{\sqrt{3}}{2}\right) = 1 + i\sqrt{3}$.
## Exemple 5 : équation
Résoudre dans $\mathbb{C}$ : $z^2 - 2z + 5 = 0$.
> $\Delta = 4 - 20 = -16 = (4i)^2$.
> $z_1 = \dfrac{2 - 4i}{2} = 1 - 2i$ et $z_2 = 1 + 2i$.
## Exemple 6 : nature d'un triangle
$A$, $B$, $C$ ont pour affixes $1 + i$, $3 + 2i$ et $3i$. Quelle est la nature de $ABC$ ?
[F] $\dfrac{z_C - z_A}{z_B - z_A} = i$ : $AB = AC$ et l'angle en $A$ est droit. :: X -1 3 -1 3 ; P A 1 1 so ; P B 3 2 e ; P C 0 3 n ; S A B c1 b ; S A C c1 b ; S B C c2 ; R B A C ; K A B 1 ; K A C 1
> $\dfrac{z_C - z_A}{z_B - z_A} = \dfrac{-1 + 2i}{2 + i} = \dfrac{(-1 + 2i)(2 - i)}{5} = \dfrac{5i}{5} = i$.
> $|i| = 1$, donc $AC = AB$ ; $\arg i = \dfrac{\pi}{2}$, donc l'angle en $A$ est droit.
> $ABC$ est rectangle isocèle en $A$.`]
] });
