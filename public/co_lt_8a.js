/* MathSolver - Cours Terminale, chapitre 9 : Nombres complexes (1/3) */
MSCOP("lt.8", { t: "Nombres complexes", s: [
["Introduction", String.raw`Dans $\mathbb{R}$, l'équation $x^2 = -1$ n'a pas de solution. On construit un ensemble plus grand, $\mathbb{C}$, qui contient un nombre $i$ tel que $i^2 = -1$. Les nombres complexes permettent de résoudre toutes les équations du second degré et de traduire la **géométrie plane** (distances, angles, rotations) par des calculs.
[R] Dans la vie courante :: Les ingénieurs électriciens utilisent les complexes pour les courants alternatifs ; ils servent aussi en traitement du signal, en mécanique et en infographie (rotations d'images).`],
["Définitions", String.raw`[D] Forme algébrique :: Tout complexe s'écrit de façon unique $z = a + ib$, avec $a, b$ réels et $i^2 = -1$. // $a = \text{Re}(z)$ est la partie réelle, $b = \text{Im}(z)$ la partie imaginaire.
[D] Conjugué :: Le conjugué de $z = a + ib$ est $\bar{z} = a - ib$.
[D] Module :: $|z| = \sqrt{a^2 + b^2}$. C'est la distance $OM$, où $M(a \,;\, b)$ est le point d'affixe $z$.
[D] Argument :: Pour $z \neq 0$, un argument $\theta$ de $z$ est une mesure de l'angle $(\vec{u}, \overrightarrow{OM})$. Il vérifie $\cos\theta = \dfrac{a}{|z|}$ et $\sin\theta = \dfrac{b}{|z|}$ ; il est défini à $2\pi$ près.
[F] Le point $M$ d'affixe $z = \sqrt{3} + i$ : module $r = 2$, argument $\dfrac{\pi}{6}$. :: X -1 3 -1 2 ; P M 1.732 1 ne ; p O 0 0 ; p H 1.732 0 ; p U 1 0 ; S O M c1 b ; S M H d ; S O H c2 ; Q U O M "π/6" c2 ; T O M "r = 2" c1 - ; L 1.732 -0.4 "√3" c2 ; L 2.15 0.5 "1" c2
[D] Forme trigonométrique et exponentielle :: Si $|z| = r$ et $\arg z = \theta$ : $z = r(\cos\theta + i\sin\theta) = re^{i\theta}$.
[D] Affixe :: Le point $M(a \,;\, b)$ et le vecteur $\vec{w}(a \,;\, b)$ ont pour affixe $z = a + ib$. Le vecteur $\overrightarrow{AB}$ a pour affixe $z_B - z_A$.`],
["Propriétés", String.raw`[P] Calculs :: On calcule comme dans $\mathbb{R}$, en remplaçant $i^2$ par $-1$. // $z\bar{z} = a^2 + b^2 = |z|^2$.
[P] Conjugué :: $\overline{z + z'} = \bar{z} + \bar{z'}$ ; $\overline{zz'} = \bar{z}\,\bar{z'}$ ; $\overline{\left(\dfrac{z}{z'}\right)} = \dfrac{\bar{z}}{\bar{z'}}$.
[F] $M'$ d'affixe $\bar{z}$ est le symétrique de $M$ par rapport à l'axe réel ; $N$ d'affixe $-z$ est son symétrique par rapport à $O$. :: X -3 3 -2 2 ; P M(z) 2 1.5 n ; P M'(z̄) 2 -1.5 s ; P N(−z) -2 -1.5 s ; p O 0 0 ; S M(z) M'(z̄) c2 d ; S M(z) N(−z) c3 d
[P] Module et argument :: $|zz'| = |z|\,|z'|$ et $\arg(zz') = \arg z + \arg z'$. // $\left|\dfrac{z}{z'}\right| = \dfrac{|z|}{|z'|}$ et $\arg\dfrac{z}{z'} = \arg z - \arg z'$.
[P] Formule de Moivre :: $(e^{i\theta})^n = e^{in\theta}$, soit $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$.
[P] Formules d'Euler :: $\cos\theta = \dfrac{e^{i\theta} + e^{-i\theta}}{2}$ et $\sin\theta = \dfrac{e^{i\theta} - e^{-i\theta}}{2i}$.
[P] Équation az² + bz + c = 0 (a, b, c réels) :: Si $\Delta < 0$, deux solutions complexes conjuguées : $z = \dfrac{-b \pm i\sqrt{-\Delta}}{2a}$.
[P] Géométrie :: $AB = |z_B - z_A|$ et $(\overrightarrow{AB}, \overrightarrow{AC}) = \arg\dfrac{z_C - z_A}{z_B - z_A}$.`]
] });
