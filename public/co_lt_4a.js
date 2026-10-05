/* MathSolver - Cours Terminale, chapitre 5 : Fonction exponentielle (1/3) */
MSCOP("lt.4", { t: "Fonction exponentielle", s: [
["Introduction", String.raw`La **fonction exponentielle** est la seule fonction égale à sa propre dérivée et qui vaut 1 en 0. Elle décrit les phénomènes dont la vitesse de croissance est proportionnelle à la quantité : populations, intérêts composés, refroidissement, désintégration radioactive.
[R] Dans la vie courante :: Une population de 2 000 habitants qui augmente de 3 % par an suit à peu près $P(t) = 2\,000\,e^{0{,}03t}$ : elle double en environ 23 ans.`],
["Définitions", String.raw`[D] Fonction exponentielle :: La fonction exponentielle, notée $\exp$, est la fonction réciproque de $\ln$ : pour tout réel $x$, $\exp(x) = e^x$ est l'unique réel strictement positif dont le logarithme vaut $x$.
[D] Caractérisation :: $\exp$ est l'unique fonction dérivable sur $\mathbb{R}$ telle que $f' = f$ et $f(0) = 1$.
[D] Valeurs particulières :: $e^0 = 1$, $e^1 = e \approx 2{,}718$. Pour tout réel $x$ : $e^x > 0$.
[D] Réciproque de ln :: Pour tout réel $x$ : $\ln(e^x) = x$. Pour tout $x > 0$ : $e^{\ln x} = x$.
[F] Les courbes de $\exp$ (bleue) et de $\ln$ (orange) sont symétriques par rapport à la droite $y = x$. :: X -3 4 -3 4 ; F "x" -3 4 c4 d ; F "exp(x)" -3 1.38 c1 b ; F "log(x)" 0.05 4 c2 b ; P A 0 1 o ; P B 1 0 s ; L 1.6 3.6 "exp" c1 ; L 3.5 1.6 "ln" c2`],
["Propriétés", String.raw`[P] Propriétés algébriques :: Pour tous réels $a$ et $b$ et tout entier $n$ : // $e^{a + b} = e^a \times e^b$ ; $e^{a - b} = \dfrac{e^a}{e^b}$ ; $e^{-a} = \dfrac{1}{e^a}$ ; $(e^a)^n = e^{na}$.
[P] Équations et inéquations :: $e^a = e^b \iff a = b$ et $e^a < e^b \iff a < b$ (car exp est strictement croissante). // Pour $y > 0$ : $e^x = y \iff x = \ln y$.
[P] Limites :: $\lim_{x \to +\infty} e^x = +\infty$ et $\lim_{x \to -\infty} e^x = 0$ : l'axe des abscisses est asymptote en $-\infty$. // Croissances comparées : $\lim_{x \to +\infty} \dfrac{e^x}{x} = +\infty$ et $\lim_{x \to -\infty} xe^x = 0$.
[P] Dérivée et primitive :: $(e^x)' = e^x$ ; $(e^u)' = u'e^u$. Une primitive de $u'e^u$ est $e^u$.
[P] Limite remarquable :: $\lim_{x \to 0} \dfrac{e^x - 1}{x} = 1$.`]
] });
