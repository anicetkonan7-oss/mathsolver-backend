/* MathSolver - Cours 3e, chapitre 9 : Statistiques (2/3) */
MSCOP("l3.8", { s: [
["Méthodes", String.raw`## Méthode 1 : calculer une moyenne
1) Additionner toutes les valeurs (ou les produits « valeur × effectif »).
2) Diviser par l'effectif total.
## Méthode 2 : trouver la médiane
1) Ranger les valeurs dans l'ordre croissant et compter l'effectif total $N$.
2) Si $N$ est **impair**, la médiane est la valeur du milieu, au rang $\dfrac{N + 1}{2}$.
3) Si $N$ est **pair**, la médiane est la moyenne des deux valeurs du milieu, aux rangs $\dfrac{N}{2}$ et $\dfrac{N}{2} + 1$.
4) Avec un tableau, on utilise les **effectifs cumulés** pour trouver ces rangs.
## Méthode 3 : construire un diagramme circulaire
1) Calculer la fréquence de chaque valeur.
2) Multiplier chaque fréquence par $360^\circ$ pour obtenir l'angle.
3) Vérifier que la somme des angles vaut $360^\circ$, puis tracer au rapporteur.
[!] Ranger d'abord :: On ne cherche jamais la médiane sans avoir rangé la série dans l'ordre croissant.`],
["Exemples corrigés", String.raw`## Exemple 1 : moyenne, médiane et étendue
Calculer la moyenne, la médiane et l'étendue de la série : 12 ; 15 ; 9 ; 14 ; 10.
> Moyenne : $\bar{x} = \dfrac{12 + 15 + 9 + 14 + 10}{5} = \dfrac{60}{5} = 12$.
> Série rangée : 9 ; 10 ; 12 ; 14 ; 15. $N = 5$ est impair : la médiane est la 3e valeur, soit **12**.
> Étendue : $e = 15 - 9 = 6$.
## Exemple 2 : moyenne pondérée et effectifs cumulés
Voici les notes d'une classe de 25 élèves : 8 (3 élèves), 10 (5), 12 (8), 14 (6), 16 (3).
[F] Les notes de la classe : la barre la plus haute est celle du mode, 12. :: BAR c1 ; "8" 3 ; "10" 5 ; "12" 8 ; "14" 6 ; "16" 3
> Somme des notes : $3 \times 8 + 5 \times 10 + 8 \times 12 + 6 \times 14 + 3 \times 16 = 302$.
> Moyenne : $\bar{x} = \dfrac{302}{25} = 12{,}08$.
> Effectifs cumulés : 3 ; 8 ; 16 ; 22 ; 25. $N = 25$ : la médiane est la 13e valeur. Elle se trouve dans le groupe des 12 (rangs 9 à 16), donc la médiane est **12**.
> Fréquence de la note 12 : $\dfrac{8}{25} = 0{,}32$, soit **32 %**. Le mode est 12.
## Exemple 3 : médiane d'une série d'effectif pair
Trouver la médiane de : 4 ; 7 ; 8 ; 10 ; 11 ; 15.
> La série est déjà rangée et $N = 6$ est pair. Les valeurs du milieu sont la 3e (8) et la 4e (10).
> Médiane $= \dfrac{8 + 10}{2} = 9$.
## Exemple 4 : diagramme circulaire
Sur 40 élèves, 18 préfèrent le football, 10 le basket, 8 l'athlétisme et 4 le handball. Calculer les angles du diagramme circulaire.
> Football : $\dfrac{18}{40} \times 360^\circ = 162^\circ$. Basket : $\dfrac{10}{40} \times 360^\circ = 90^\circ$.
> Athlétisme : $\dfrac{8}{40} \times 360^\circ = 72^\circ$. Handball : $\dfrac{4}{40} \times 360^\circ = 36^\circ$.
> Vérification : $162 + 90 + 72 + 36 = 360$.
[F] Chaque angle est proportionnel à l'effectif. :: PIE ; "Football" 18 ; "Basket" 10 ; "Athlétisme" 8 ; "Handball" 4
## Exemple 5 : données regroupées en classes
Le temps de trajet de 25 élèves : $[0 \,;\, 10[$ : 6 élèves, $[10 \,;\, 20[$ : 10, $[20 \,;\, 30[$ : 7, $[30 \,;\, 40[$ : 2 (en minutes). Estimer la moyenne.
[F] Temps de trajet en minutes, par classes. :: BAR c5 ; "0 à 10" 6 ; "10 à 20" 10 ; "20 à 30" 7 ; "30 à 40" 2
> On remplace chaque classe par son **centre** : 5, 15, 25 et 35.
> Somme : $6 \times 5 + 10 \times 15 + 7 \times 25 + 2 \times 35 = 425$.
> $\bar{x} = \dfrac{425}{25} = 17$ minutes.
## Exemple 6 : trouver une note manquante
Awa a eu 11, 13 et 9. Quelle note doit-elle avoir au 4e devoir pour avoir 12 de moyenne ?
> Pour une moyenne de 12 sur 4 devoirs, il faut un total de $4 \times 12 = 48$.
> Elle a déjà $11 + 13 + 9 = 33$, donc il lui faut $48 - 33 = 15$.`]
] });