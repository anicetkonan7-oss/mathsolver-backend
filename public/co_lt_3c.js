/* MathSolver - Cours Terminale, chapitre 4 : Fonction logarithme népérien (3/3) */
MSCOP("lt.3", { s: [
["Cas particuliers", String.raw`[R] Logarithme décimal :: $\log x = \dfrac{\ln x}{\ln 10}$, avec $\log 10 = 1$, $\log 100 = 2$. Il sert pour le pH, les décibels, l'échelle de Richter.
[R] Valeur absolue :: $\ln|x|$ est définie pour $x \neq 0$ ; c'est une primitive de $\dfrac{1}{x}$ sur chacun des intervalles $]-\infty \,;\, 0[$ et $]0 \,;\, +\infty[$.
[R] Tangente en 1 :: La tangente à la courbe de ln au point d'abscisse 1 est la droite $y = x - 1$ ; la courbe est toujours en dessous : $\ln x \leq x - 1$.
[R] Limite remarquable :: $\lim_{x \to 0} \dfrac{\ln(1 + x)}{x} = 1$.`],
["Erreurs fréquentes", String.raw`[!] Logarithme d'une somme :: $\ln(a + b) \neq \ln a + \ln b$. C'est le logarithme d'un **produit** qui se décompose.
[!] Oublier le domaine :: $\ln x + \ln(x - 2) = \ln 3$ donne $x = 3$ ou $x = -1$, mais $x = -1$ est à rejeter.
[!] Diviser par un nombre négatif :: $\ln 0{,}5 < 0$ : en divisant une inéquation par $\ln 0{,}5$, le sens change.
[!] $\ln$ d'un négatif :: $\ln(-2)$ n'existe pas, et $\ln 0$ non plus.
[!] Puissance :: $\ln(a^n) = n\ln a$, mais $(\ln a)^n \neq n\ln a$.`],
["À retenir", String.raw`[K] L'essentiel :: $\ln$ est définie sur $]0 \,;\, +\infty[$, $\ln 1 = 0$, $\ln e = 1$, $(\ln x)' = \dfrac{1}{x}$. // $\ln(ab) = \ln a + \ln b$ ; $\ln\dfrac{a}{b} = \ln a - \ln b$ ; $\ln a^n = n\ln a$. // $\lim_{+\infty} \dfrac{\ln x}{x} = 0$ ; $\lim_{0^+} x\ln x = 0$ ; $(\ln u)' = \dfrac{u'}{u}$.
- Toujours écrire les conditions d'existence.
- $\ln a = \ln b \iff a = b$ ; $\ln a < \ln b \iff a < b$.
- Inconnue en exposant : appliquer ln.`]
], q: [
[String.raw`Écrire $A = \ln 50 - 2\ln 5 + \ln 4$ sous la forme $k\ln 2$.`, String.raw`> $A = \ln\dfrac{50 \times 4}{25} = \ln 8 = \ln 2^3 = 3\ln 2$.`],
[String.raw`Résoudre $\ln x + \ln(x - 2) = \ln 3$.`, String.raw`> Conditions : $x > 0$ et $x > 2$, soit $x > 2$.
> $\ln[x(x - 2)] = \ln 3$, donc $x^2 - 2x - 3 = 0$, soit $(x - 3)(x + 1) = 0$.
> $x = 3$ convient, $x = -1$ est rejeté. Solution : $x = 3$.`],
[String.raw`Résoudre $2\ln x - 1 = 0$.`, String.raw`> $\ln x = \dfrac{1}{2}$, donc $x = e^{1/2} = \sqrt{e} \approx 1{,}65$.`],
[String.raw`Dériver $f(x) = \ln(3x + 2)$ sur $\left]-\dfrac{2}{3} \,;\, +\infty\right[$.`, String.raw`> $f'(x) = \dfrac{3}{3x + 2}$.`],
[String.raw`Trouver une primitive de $f(x) = \dfrac{2x}{x^2 + 5}$.`, String.raw`> Avec $u = x^2 + 5 > 0$ et $u' = 2x$ : $f = \dfrac{u'}{u}$, donc $F(x) = \ln(x^2 + 5)$.`],
[String.raw`Calculer $\lim_{x \to +\infty} (x - \ln x)$.`, String.raw`> $x - \ln x = x\left(1 - \dfrac{\ln x}{x}\right)$. Comme $\dfrac{\ln x}{x} \to 0$, la parenthèse tend vers 1.
> La limite vaut $+\infty$.`]
] });
