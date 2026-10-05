/* MathSolver - Cours 3e, chapitre 1 : Racines carrées (3/3) */
MSCOP("l3.0", { s: [
["Cas particuliers", String.raw`[R] Racine d'un carré négatif :: $\sqrt{(-5)^2} = \sqrt{25} = 5$, et non $-5$ : une racine carrée est toujours positive. En général, $\sqrt{a^2} = |a|$.
[R] Nombres entre deux entiers :: Comme $36 < 40 < 49$, on a $6 < \sqrt{40} < 7$. Cela permet de vérifier un résultat à la calculatrice.
[R] Racines qu'on ne simplifie pas :: $\sqrt{2}$, $\sqrt{3}$, $\sqrt{5}$, $\sqrt{7}$… n'ont pas de facteur carré : elles sont déjà simplifiées.
[R] Lien avec Pythagore :: Les longueurs trouvées avec Pythagore s'écrivent souvent avec une racine : un carré de côté $a$ a pour diagonale $a\sqrt{2}$.`],
["Erreurs fréquentes", String.raw`[!] Additionner sous la racine :: $\sqrt{9} + \sqrt{16} \neq \sqrt{25}$. On ne peut pas additionner les nombres sous des racines.
[!] Additionner des racines différentes :: $\sqrt{2} + \sqrt{3} \neq \sqrt{5}$, et $2\sqrt{3} + 3\sqrt{2}$ ne se regroupe pas.
[!] Oublier la solution négative :: $x^2 = 16$ donne $x = 4$ **ou** $x = -4$.
[!] Mal simplifier :: $\sqrt{72} = \sqrt{36 \times 2} = 6\sqrt{2}$ ; écrire $\sqrt{72} = \sqrt{9 \times 8} = 3\sqrt{8}$ n'est pas fini, car $\sqrt{8}$ se simplifie encore.
[!] Carré d'un produit :: $(3\sqrt{2})^2 = 9 \times 2 = 18$, et non $3 \times 2 = 6$.`],
["À retenir", String.raw`[K] L'essentiel :: Pour $a \geq 0$ : $\sqrt{a}$ est le nombre positif dont le carré vaut $a$ ; $(\sqrt{a})^2 = a$. // $\sqrt{ab} = \sqrt{a}\sqrt{b}$ et $\sqrt{\dfrac{a}{b}} = \dfrac{\sqrt{a}}{\sqrt{b}}$, mais $\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}$. // $x^2 = a$ avec $a > 0$ : $x = \sqrt{a}$ ou $x = -\sqrt{a}$.
- Simplifier : sortir le plus grand carré parfait.
- Additionner seulement les racines identiques.
- Pas de racine au dénominateur dans un résultat final.`]
], q: [
[String.raw`Simplifier $\sqrt{12}$, $\sqrt{45}$ et $\sqrt{98}$.`, String.raw`> $\sqrt{12} = \sqrt{4 \times 3} = 2\sqrt{3}$ ; $\sqrt{45} = \sqrt{9 \times 5} = 3\sqrt{5}$ ; $\sqrt{98} = \sqrt{49 \times 2} = 7\sqrt{2}$.`],
[String.raw`Écrire $A = 2\sqrt{27} - \sqrt{12} + \sqrt{3}$ sous la forme $a\sqrt{3}$.`, String.raw`> $2\sqrt{27} = 2 \times 3\sqrt{3} = 6\sqrt{3}$ et $\sqrt{12} = 2\sqrt{3}$.
> $A = 6\sqrt{3} - 2\sqrt{3} + \sqrt{3} = 5\sqrt{3}$.`],
[String.raw`Calculer $\sqrt{8} \times \sqrt{2}$, $\sqrt{\dfrac{4}{9}}$ et $(3\sqrt{2})^2$.`, String.raw`> $\sqrt{8} \times \sqrt{2} = \sqrt{16} = 4$ ; $\sqrt{\dfrac{4}{9}} = \dfrac{2}{3}$ ; $(3\sqrt{2})^2 = 9 \times 2 = 18$.`],
[String.raw`Écrire $\dfrac{5}{\sqrt{5}}$ et $\dfrac{5}{\sqrt{3}}$ sans racine au dénominateur.`, String.raw`> $\dfrac{5}{\sqrt{5}} = \dfrac{5\sqrt{5}}{5} = \sqrt{5}$ et $\dfrac{5}{\sqrt{3}} = \dfrac{5\sqrt{3}}{3}$.`],
[String.raw`Développer et réduire $(\sqrt{2} - 3)^2$.`, String.raw`> $(\sqrt{2} - 3)^2 = (\sqrt{2})^2 - 2 \times 3 \times \sqrt{2} + 3^2 = 2 - 6\sqrt{2} + 9 = 11 - 6\sqrt{2}$.`],
[String.raw`Résoudre l'équation $2x^2 - 18 = 0$.`, String.raw`> $2x^2 = 18$, donc $x^2 = 9$.
> $x = 3$ ou $x = -3$.`]
] });