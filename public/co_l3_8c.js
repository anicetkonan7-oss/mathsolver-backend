/* MathSolver - Cours 3e, chapitre 9 : Statistiques (3/3) */
MSCOP("l3.8", { s: [
["Cas particuliers", String.raw`[R] Moyenne et médiane :: La moyenne est sensible aux valeurs extrêmes, la médiane ne l'est pas. Dans la série 5 ; 6 ; 7 ; 8 ; 74, la moyenne vaut 20 mais la médiane vaut 7 : ici, la médiane représente mieux la série.
[R] Moyenne de deux groupes :: Pour réunir deux groupes, on ne fait pas la moyenne des deux moyennes : il faut tenir compte des effectifs (moyenne pondérée).
[R] Classes :: Quand les valeurs sont regroupées en classes, on calcule une moyenne **approchée** en utilisant le centre de chaque classe.
[R] Pourcentages :: Une fréquence de $0{,}32$ s'écrit 32 %. La somme des pourcentages vaut 100 %.`],
["Erreurs fréquentes", String.raw`[!] Oublier les effectifs :: Dans un tableau, la moyenne n'est pas la moyenne des valeurs seules : chaque valeur compte autant de fois que son effectif.
[!] Médiane sans ranger :: La médiane de 15 ; 9 ; 12 n'est pas 9 : rangée, la série donne 9 ; 12 ; 15, et la médiane est 12.
[!] Rang de la médiane :: Pour $N = 25$, la médiane est la 13e valeur, et non la 12,5e.
[!] Moyenne de moyennes :: 20 élèves à 11 et 10 élèves à 14 ne donnent pas 12,5 de moyenne, mais $\dfrac{20 \times 11 + 10 \times 14}{30} = 12$.
[!] Angles du diagramme :: L'angle est $\text{fréquence} \times 360^\circ$, et non $\text{effectif} \times 360^\circ$.
[!] Étendue :: L'étendue est une différence ($x_{\max} - x_{\min}$), pas un intervalle.`],
["À retenir", String.raw`[K] L'essentiel :: Moyenne : $\bar{x} = \dfrac{\text{somme des valeurs}}{\text{effectif total}}$ (pondérée avec un tableau). // Médiane : valeur du milieu de la série rangée. // Étendue : $x_{\max} - x_{\min}$. // Fréquence : $\dfrac{\text{effectif}}{\text{effectif total}}$ ; angle : $f \times 360^\circ$.
- Toujours ranger la série avant de chercher la médiane.
- Avec un tableau, utiliser les effectifs cumulés.
- Vérifier : somme des fréquences = 1, somme des angles = 360°.`]
], q: [
[String.raw`Pour la série 7 ; 12 ; 5 ; 10 ; 8 ; 12 ; 9, calculer la moyenne, la médiane, l'étendue et donner le mode.`, String.raw`> $N = 7$ et la somme vaut 63 : $\bar{x} = \dfrac{63}{7} = 9$.
> Série rangée : 5 ; 7 ; 8 ; 9 ; 10 ; 12 ; 12. La médiane est la 4e valeur : 9.
> Étendue : $12 - 5 = 7$. Mode : 12 (il apparaît deux fois).`],
[String.raw`Les pointures de 20 élèves : 38 (2 élèves), 39 (5), 40 (7), 41 (4), 42 (2). Calculer la moyenne, la fréquence de la pointure 40 et la médiane.`, String.raw`> Somme : $2 \times 38 + 5 \times 39 + 7 \times 40 + 4 \times 41 + 2 \times 42 = 799$, donc $\bar{x} = \dfrac{799}{20} = 39{,}95$.
> Fréquence de 40 : $\dfrac{7}{20} = 0{,}35$, soit 35 %.
> Effectifs cumulés : 2 ; 7 ; 14 ; 18 ; 20. Les 10e et 11e valeurs valent 40 : la médiane est 40.`],
[String.raw`Une famille dépense son budget ainsi : nourriture 50 %, transport 20 %, loisirs 15 %, épargne 15 %. Calculer les angles du diagramme circulaire.`, String.raw`> Nourriture : $0{,}5 \times 360^\circ = 180^\circ$. Transport : $0{,}2 \times 360^\circ = 72^\circ$.
> Loisirs et épargne : $0{,}15 \times 360^\circ = 54^\circ$ chacun. Total : $180 + 72 + 54 + 54 = 360^\circ$.`],
[String.raw`Calculer la moyenne et la médiane de la série : 12 ; 3 ; 8 ; 15 ; 6 ; 10 ; 9 ; 4.`, String.raw`> Somme : 67, $N = 8$ : $\bar{x} = \dfrac{67}{8} = 8{,}375$.
> Série rangée : 3 ; 4 ; 6 ; 8 ; 9 ; 10 ; 12 ; 15. $N$ est pair : médiane $= \dfrac{8 + 9}{2} = 8{,}5$.`],
[String.raw`Dans une classe, 20 élèves ont 11 de moyenne et 10 élèves ont 14 de moyenne. Quelle est la moyenne de la classe ?`, String.raw`> $\bar{x} = \dfrac{20 \times 11 + 10 \times 14}{30} = \dfrac{220 + 140}{30} = \dfrac{360}{30} = 12$.`],
[String.raw`Le diagramme donne les notes (sur 20) d'un groupe d'élèves. Calculer l'effectif total et la moyenne.
[F] Notes du groupe. :: BAR c4 ; "5" 2 ; "10" 6 ; "15" 8 ; "20" 4`, String.raw`> Effectif total : $2 + 6 + 8 + 4 = 20$.
> Somme : $2 \times 5 + 6 \times 10 + 8 \times 15 + 4 \times 20 = 270$, donc $\bar{x} = \dfrac{270}{20} = 13{,}5$.`]
] });