/* MathSolver - Cours Terminale, chapitre 4 : Fonction logarithme népérien (1/3) */
MSCOP("lt.3", { t: "Fonction logarithme népérien", s: [
["Introduction", String.raw`Le **logarithme népérien** transforme les produits en sommes : $\ln(ab) = \ln a + \ln b$. Il permet de résoudre des équations où l'inconnue est en **exposant**, et apparaît dans tous les phénomènes de croissance (population, intérêts, radioactivité, son en décibels).
[R] Dans la vie courante :: Pour savoir en combien d'années une somme placée à 5 % par an double, on résout $1{,}05^n = 2$ avec le logarithme : environ 15 ans.`],
["Définitions", String.raw`[D] Fonction ln :: La fonction logarithme népérien, notée $\ln$, est l'**unique primitive** de $x \mapsto \dfrac{1}{x}$ sur $]0 \,;\, +\infty[$ qui s'annule en 1. // Donc $\ln 1 = 0$ et $(\ln x)' = \dfrac{1}{x}$.
[D] Le nombre e :: $e$ est l'unique réel tel que $\ln e = 1$ ; $e \approx 2{,}718$.
[D] Ensemble de définition :: $\ln x$ n'existe que pour $x > 0$. Pour $\ln(u(x))$, il faut $u(x) > 0$.
[F] La courbe de $\ln$ passe par $(1 \,;\, 0)$ et $(e \,;\, 1)$ ; l'axe des ordonnées est asymptote verticale. :: X -1 6 -3 2 ; F "log(x)" 0.05 6 c1 b ; P A 1 0 se ; P E 2.718 1 n
[R] Signe :: $\ln x < 0$ si $0 < x < 1$ ; $\ln x = 0$ si $x = 1$ ; $\ln x > 0$ si $x > 1$.`],
["Propriétés", String.raw`[P] Propriétés algébriques :: Pour $a > 0$, $b > 0$ et $n$ entier : // $\ln(ab) = \ln a + \ln b$ ; $\ln\dfrac{a}{b} = \ln a - \ln b$ ; $\ln\dfrac{1}{b} = -\ln b$ // $\ln(a^n) = n\ln a$ ; $\ln\sqrt{a} = \dfrac{1}{2}\ln a$.
[P] Équations et inéquations :: Pour $a > 0$ et $b > 0$ : $\ln a = \ln b \iff a = b$ et $\ln a < \ln b \iff a < b$ (car ln est strictement croissante).
[P] Lien avec l'exponentielle :: Pour $x > 0$ : $\ln x = y \iff x = e^y$.
[P] Limites :: $\lim_{x \to +\infty} \ln x = +\infty$ et $\lim_{x \to 0^+} \ln x = -\infty$. // Croissances comparées : $\lim_{x \to +\infty} \dfrac{\ln x}{x} = 0$ et $\lim_{x \to 0^+} x\ln x = 0$.
[P] Dérivée et primitive :: $(\ln u)' = \dfrac{u'}{u}$ (avec $u > 0$). Une primitive de $\dfrac{u'}{u}$ est $\ln|u|$.`]
] });
