/* MathSolver - Cours 3e, chapitre 1 : Racines carrées (2/3) */
MSCOP("l3.0", { s: [
["Méthodes", String.raw`## Méthode 1 : simplifier une racine carrée
1) Écrire le nombre comme un produit dont un facteur est le **plus grand carré parfait** possible.
2) Utiliser $\sqrt{k^2 \times m} = k\sqrt{m}$.
Exemple : $\sqrt{72} = \sqrt{36 \times 2} = 6\sqrt{2}$.
## Méthode 2 : additionner des racines carrées
1) Simplifier chaque racine.
2) Regrouper les termes qui ont la **même racine**, comme on regroupe des $x$ : $5\sqrt{2} + 3\sqrt{2} = 8\sqrt{2}$.
## Méthode 3 : supprimer la racine du dénominateur
Multiplier le numérateur et le dénominateur par la racine du dénominateur. Avec $\sqrt{a} + \sqrt{b}$ au dénominateur, multiplier par l'**expression conjuguée** $\sqrt{a} - \sqrt{b}$.
## Méthode 4 : résoudre $x^2 = a$
Isoler $x^2$, puis appliquer la propriété : deux solutions opposées si $a > 0$.
[!] Les deux solutions :: $x^2 = 49$ a deux solutions, $7$ et $-7$. N'oublie pas la solution négative.`],
["Exemples corrigés", String.raw`## Exemple 1 : écrire sous la forme $a\sqrt{2}$
Écrire $\sqrt{50} + \sqrt{18} - \sqrt{8}$ sous la forme $a\sqrt{2}$.
> $\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}$ ; $\sqrt{18} = \sqrt{9 \times 2} = 3\sqrt{2}$ ; $\sqrt{8} = \sqrt{4 \times 2} = 2\sqrt{2}$.
> Donc $\sqrt{50} + \sqrt{18} - \sqrt{8} = 5\sqrt{2} + 3\sqrt{2} - 2\sqrt{2} = 6\sqrt{2}$.
## Exemple 2 : simplifier
Simplifier $\sqrt{72}$ et $\sqrt{75}$.
> $\sqrt{72} = \sqrt{36 \times 2} = 6\sqrt{2}$ et $\sqrt{75} = \sqrt{25 \times 3} = 5\sqrt{3}$.
## Exemple 3 : produits et carrés
Calculer $\sqrt{3} \times \sqrt{12}$, $(\sqrt{7})^2$ et $(2\sqrt{5})^2$.
> $\sqrt{3} \times \sqrt{12} = \sqrt{36} = 6$ ; $(\sqrt{7})^2 = 7$.
> $(2\sqrt{5})^2 = 2^2 \times (\sqrt{5})^2 = 4 \times 5 = 20$.
## Exemple 4 : dénominateur sans racine
Écrire $\dfrac{6}{\sqrt{3}}$ et $\dfrac{1}{\sqrt{5} - \sqrt{2}}$ sans racine au dénominateur.
> $\dfrac{6}{\sqrt{3}} = \dfrac{6\sqrt{3}}{3} = 2\sqrt{3}$.
> $\dfrac{1}{\sqrt{5} - \sqrt{2}} = \dfrac{\sqrt{5} + \sqrt{2}}{(\sqrt{5} - \sqrt{2})(\sqrt{5} + \sqrt{2})} = \dfrac{\sqrt{5} + \sqrt{2}}{5 - 2} = \dfrac{\sqrt{5} + \sqrt{2}}{3}$.
## Exemple 5 : développer
Développer $(\sqrt{3} + 1)^2$ et $(2 + \sqrt{5})(2 - \sqrt{5})$.
> $(\sqrt{3} + 1)^2 = 3 + 2\sqrt{3} + 1 = 4 + 2\sqrt{3}$.
> $(2 + \sqrt{5})(2 - \sqrt{5}) = 2^2 - (\sqrt{5})^2 = 4 - 5 = -1$.
## Exemple 6 : équations et problème
Résoudre $x^2 = 49$, $x^2 = 5$ et $x^2 = -4$. Puis trouver le côté d'un carré d'aire 50 cm².
> $x^2 = 49$ : $x = 7$ ou $x = -7$. $x^2 = 5$ : $x = \sqrt{5}$ ou $x = -\sqrt{5}$. $x^2 = -4$ : pas de solution.
> Le côté est positif : $c = \sqrt{50} = 5\sqrt{2} \approx 7{,}07$ cm.`]
] });