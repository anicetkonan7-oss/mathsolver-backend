/* MathSolver - Cours Terminale, chapitre 4 : Fonction logarithme népérien (2/3) */
MSCOP("lt.3", { s: [
["Méthodes", String.raw`## Méthode 1 : résoudre une équation avec ln
1) Chercher les conditions d'existence (tout ce qui est dans un ln doit être $> 0$).
2) Se ramener à $\ln A = \ln B$, puis résoudre $A = B$.
3) Garder seulement les solutions qui respectent les conditions.
## Méthode 2 : résoudre une inéquation avec ln
Mêmes conditions, puis $\ln A < \ln B \iff A < B$ ; l'ensemble des solutions est l'intersection avec le domaine.
## Méthode 3 : inconnue en exposant
Pour $a^n > b$ (avec $a > 0$, $b > 0$), on applique ln : $n\ln a > \ln b$, puis on divise par $\ln a$ en faisant attention à son **signe**.
## Méthode 4 : étudier une fonction avec ln
Domaine, limites (croissances comparées), dérivée avec $(\ln u)' = \dfrac{u'}{u}$, tableau de variations.
[!] Domaine d'abord :: Dans $\ln(x - 2)$, il faut $x > 2$. Une « solution » qui ne vérifie pas cette condition est à rejeter.`],
["Exemples corrigés", String.raw`## Exemple 1 : propriétés algébriques
Exprimer $\ln 72$ en fonction de $\ln 2$ et $\ln 3$.
> $72 = 8 \times 9 = 2^3 \times 3^2$, donc $\ln 72 = 3\ln 2 + 2\ln 3$.
## Exemple 2 : équation
Résoudre $\ln(2x - 1) = \ln(x + 3)$.
> Conditions : $2x - 1 > 0$ et $x + 3 > 0$, soit $x > \dfrac{1}{2}$.
> $2x - 1 = x + 3$ donne $x = 4$, qui vérifie la condition. Solution : $x = 4$.
## Exemple 3 : inéquation
Résoudre $\ln(x - 1) < 2$.
> Condition : $x > 1$. Comme $2 = \ln(e^2)$ : $x - 1 < e^2$, soit $x < 1 + e^2$.
> Solutions : $1 < x < 1 + e^2$ (environ 8,39).
## Exemple 4 : dérivées
Dériver $f(x) = x\ln x - x$ et $g(x) = \ln(x^2 + 1)$.
> $f'(x) = \ln x + x \times \dfrac{1}{x} - 1 = \ln x$.
> $g'(x) = \dfrac{2x}{x^2 + 1}$.
## Exemple 5 : étude de fonction
Étudier $f(x) = \dfrac{\ln x}{x}$ sur $]0 \,;\, +\infty[$.
> $f'(x) = \dfrac{\frac{1}{x} \times x - \ln x}{x^2} = \dfrac{1 - \ln x}{x^2}$ : positive si $x < e$, négative si $x > e$.
> Maximum $f(e) = \dfrac{1}{e}$. Limites : $-\infty$ en $0^+$, et 0 en $+\infty$ (croissances comparées).
[F] La courbe de $f(x) = \dfrac{\ln x}{x}$ atteint son maximum $\dfrac{1}{e}$ en $x = e$. :: X 0 8 -1 1 ; F "log(x)/x" 0.55 8 c1 b ; P M 2.718 0.368 n
## Exemple 6 : placement
Une somme est placée à 5 % par an. Au bout de combien d'années aura-t-elle doublé ?
> On cherche le plus petit entier $n$ tel que $1{,}05^n > 2$, soit $n\ln 1{,}05 > \ln 2$.
> $\ln 1{,}05 > 0$, donc $n > \dfrac{\ln 2}{\ln 1{,}05} \approx 14{,}2$. Il faut **15 ans**.`]
] });
