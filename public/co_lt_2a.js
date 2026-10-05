/* MathSolver - Cours Terminale, chapitre 3 : Primitives (1/3) */
MSCOP("lt.2", { t: "Primitives", s: [
["Introduction", String.raw`Chercher une **primitive**, c'est faire le chemin inverse de la dérivation : connaissant $f$, on cherche une fonction $F$ dont la dérivée est $f$. Les primitives servent à calculer des **intégrales** (aires) et à résoudre des **équations différentielles**.
[R] Dans la vie courante :: Si on connaît la vitesse d'un véhicule à chaque instant, une primitive de la vitesse donne la distance parcourue.`],
["Définitions", String.raw`[D] Primitive :: Soit $f$ une fonction définie sur un intervalle $I$. Une fonction $F$ est une **primitive** de $f$ sur $I$ si $F$ est dérivable sur $I$ et $F' = f$. // Exemple : $F(x) = x^2$ est une primitive de $f(x) = 2x$.
[D] Toutes les primitives :: Si $F$ est une primitive de $f$, les primitives de $f$ sont les fonctions $F(x) + C$, où $C$ est une constante réelle.
[F] Les fonctions $x^2 + C$ sont toutes des primitives de $2x$ : leurs courbes se déduisent les unes des autres par translation verticale. :: X -2 2 -1 5 ; F "x^2-1" -2 2 c1 ; F "x^2" -2 2 c2 b ; F "x^2+1" -2 2 c3 ; F "x^2+2" -2 2 c4
[D] Condition initiale :: Il existe une **unique** primitive $F$ de $f$ qui vérifie $F(x_0) = y_0$ pour des valeurs $x_0$ et $y_0$ données.
[R] Existence :: Toute fonction **continue** sur un intervalle admet des primitives sur cet intervalle.`],
["Propriétés", String.raw`## Primitives usuelles
- $k \mapsto kx$ ; $x^n \mapsto \dfrac{x^{n+1}}{n + 1}$ (pour $n \neq -1$).
- $\dfrac{1}{x^2} \mapsto -\dfrac{1}{x}$ ; $\dfrac{1}{\sqrt{x}} \mapsto 2\sqrt{x}$.
- $\cos x \mapsto \sin x$ ; $\sin x \mapsto -\cos x$.
## Formes composées
- $u'u^n \mapsto \dfrac{u^{n+1}}{n + 1}$ (pour $n \neq -1$).
- $\dfrac{u'}{u^2} \mapsto -\dfrac{1}{u}$ ; $\dfrac{u'}{\sqrt{u}} \mapsto 2\sqrt{u}$.
- $u'\cos u \mapsto \sin u$ ; $u'\sin u \mapsto -\cos u$.
- $\dfrac{u'}{u} \mapsto \ln|u|$ et $u'e^u \mapsto e^u$ (voir les chapitres Logarithme et Exponentielle).
[P] Linéarité :: Une primitive de $af + bg$ est $aF + bG$.
[!] Pas de règle simple :: Il n'existe pas de formule pour la primitive d'un **produit** ou d'un **quotient** quelconque : il faut reconnaître une forme $u'u^n$, $\dfrac{u'}{u^2}$…`]
] });
