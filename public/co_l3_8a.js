/* MathSolver - Cours 3e, chapitre 9 : Statistiques (1/3) */
MSCOP("l3.8", { t: "Statistiques", s: [
["Introduction", String.raw`Les statistiques servent à **organiser**, **représenter** et **résumer** des données : des notes, des tailles, des sports préférés, des températures… On les présente dans des **tableaux** et des **diagrammes**, puis on les résume par quelques nombres : moyenne, médiane, étendue.
[R] Dans la vie courante :: Les résultats d'un examen, les sondages d'opinion, les relevés de pluie, les ventes d'un magasin : tout cela s'étudie avec les statistiques.`],
["Définitions", String.raw`[D] Population, individu, caractère :: La **population** est l'ensemble étudié (par exemple les élèves d'une classe). Chaque élément est un **individu**. Ce qu'on observe est le **caractère** (la note, le sport préféré…).
[D] Caractère qualitatif ou quantitatif :: Un caractère est **quantitatif** s'il se mesure par un nombre (note, taille). Il est **qualitatif** sinon (couleur, sport préféré).
[D] Effectif et effectif total :: L'**effectif** d'une valeur est le nombre d'individus qui ont cette valeur. L'**effectif total** $N$ est la somme de tous les effectifs.
[D] Fréquence :: La fréquence d'une valeur est $f = \dfrac{\text{effectif}}{\text{effectif total}}$. Elle est comprise entre 0 et 1 ; multipliée par 100, elle donne un **pourcentage**.
[D] Effectifs cumulés croissants :: L'effectif cumulé d'une valeur est la somme des effectifs des valeurs **inférieures ou égales** à cette valeur.`],
["Propriétés", String.raw`[P] Moyenne :: La moyenne d'une série de $N$ valeurs est $\bar{x} = \dfrac{x_1 + x_2 + \dots + x_N}{N}$.
[P] Moyenne pondérée :: Si les valeurs $x_1, \dots, x_p$ ont pour effectifs $n_1, \dots, n_p$ : // $\bar{x} = \dfrac{n_1 x_1 + n_2 x_2 + \dots + n_p x_p}{n_1 + n_2 + \dots + n_p}$
[P] Médiane :: La médiane partage la série **rangée dans l'ordre croissant** en deux groupes de même effectif : au moins la moitié des valeurs sont inférieures ou égales à la médiane, et au moins la moitié lui sont supérieures ou égales.
[P] Étendue :: L'étendue est la différence entre la plus grande et la plus petite valeur : $e = x_{\max} - x_{\min}$. Elle mesure la **dispersion** de la série.
[P] Mode :: Le mode est la valeur qui a le **plus grand effectif**.
[P] Somme des fréquences :: La somme de toutes les fréquences vaut 1 (soit 100 %).
## Les diagrammes
- **Diagramme en barres** : une barre par valeur, de hauteur proportionnelle à l'effectif.
- **Diagramme circulaire** : un secteur par valeur, d'angle proportionnel à l'effectif : $\text{angle} = \text{fréquence} \times 360^\circ$.
[F] Diagramme en barres des notes d'une classe de 25 élèves. :: BAR c1 ; "8" 3 ; "10" 5 ; "12" 8 ; "14" 6 ; "16" 3
[F] Diagramme circulaire des sports préférés de 40 élèves. :: PIE ; "Football" 18 ; "Basket" 10 ; "Athlétisme" 8 ; "Handball" 4`]
] });