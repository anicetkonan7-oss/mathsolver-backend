/* MathSolver - Cours 3e, chapitre 6 : Théorème de Thalès (3/3) */
MSCOP("l3.5", { s: [
["Cas particuliers", String.raw`[R] Droite des milieux :: Si M est le milieu de $[AB]$ et N le milieu de $[AC]$, alors $(MN) \parallel (BC)$ et $MN = \dfrac{BC}{2}$. C'est Thalès avec des rapports égaux à $\dfrac{1}{2}$.
[F] M et N sont les milieux : $(MN) \parallel (BC)$ et $MN = \dfrac{BC}{2}$. :: P A 2 4 ; P B 0 0 ; P C 5 0 ; P M 1 2 o ; P N 3.5 2 e ; S A B ; S A C ; S M N c1 b ; S B C c1 b ; K A M 1 ; K M B 1 ; K A N 2 ; K N C 2
[R] Agrandissement et réduction :: Dans une configuration de Thalès, AMN est une réduction (ou un agrandissement) de ABC, de coefficient $k = \dfrac{AM}{AB}$. Les longueurs sont multipliées par $k$, les aires par $k^2$, les volumes par $k^3$.
[R] Papillon :: Dans la configuration papillon, A est **entre** B et M, et **entre** C et N. Les égalités de rapports sont les mêmes.
[R] Unités :: Toutes les longueurs doivent être dans la **même unité**.`],
["Erreurs fréquentes", String.raw`[!] Oublier les parallèles :: Le théorème ne s'applique que si $(MN) \parallel (BC)$ est donné ou démontré. Il faut le citer.
[!] Mauvais rapports :: On écrit $\dfrac{AM}{AB}$ (petit côté sur grand côté), pas $\dfrac{AM}{MB}$. Les trois rapports doivent tous partir de A.
[!] Mélanger les triangles :: Au numérateur, toujours le même triangle (AMN), au dénominateur toujours l'autre (ABC).
[!] Oublier l'ordre des points :: Pour la réciproque, A, M, B et A, N, C doivent être alignés **dans le même ordre**. Sinon, des rapports égaux ne prouvent rien.
[F] Rapports égaux, mais pas le même ordre : $(MN)$ n'est pas parallèle à $(BC)$. :: P A 0 0 n ; P B 4 1 ; P C 4 -2 ; P M -2 -0.5 ; P N 2 -1 s ; S M B ; S A C ; S M N c2 d ; S B C c1 b
[!] Réciproque avec MN :: Pour la réciproque, on compare seulement $\dfrac{AM}{AB}$ et $\dfrac{AN}{AC}$. Le rapport $\dfrac{MN}{BC}$ ne sert pas.
[!] Valeurs arrondies :: $\dfrac{1}{3} \approx 0{,}33$ et $\dfrac{33}{100} = 0{,}33$ ne sont pas égaux. Compare avec les produits en croix.`],
["À retenir", String.raw`[K] L'essentiel :: Si $(BM)$ et $(CN)$ sont sécantes en A et $(MN) \parallel (BC)$, alors $\dfrac{AM}{AB} = \dfrac{AN}{AC} = \dfrac{MN}{BC}$. // Si $\dfrac{AM}{AB} = \dfrac{AN}{AC}$ et que les points sont dans le même ordre, alors $(MN) \parallel (BC)$. // Si $\dfrac{AM}{AB} \neq \dfrac{AN}{AC}$, alors $(MN)$ et $(BC)$ ne sont pas parallèles.
- Calculer une longueur : théorème + produit en croix.
- Prouver un parallélisme : réciproque. Prouver le contraire : contraposée.
- Petit triangle en haut, grand triangle en bas, toujours dans le même sens.`]
], q: [
[String.raw`Les droites $(BM)$ et $(CN)$ sont sécantes en A, avec $M \in [AB]$, $N \in [AC]$ et $(MN) \parallel (BC)$. $AM = 2$, $AB = 5$, $AN = 3$ et $MN = 1{,}8$ (en cm). Calculer $AC$ et $BC$.`, String.raw`> D'après le théorème de Thalès : $\dfrac{2}{5} = \dfrac{3}{AC} = \dfrac{1{,}8}{BC}$.
> $AC = \dfrac{3 \times 5}{2} = 7{,}5$ cm et $BC = \dfrac{1{,}8 \times 5}{2} = 4{,}5$ cm.`],
[String.raw`Les droites $(AD)$ et $(BC)$ se coupent en E, avec E entre A et D, et entre B et C. $(AB) \parallel (CD)$, $EA = 4$, $ED = 6$, $EB = 5$ et $AB = 3$ (en cm). Calculer $EC$ et $CD$.`, String.raw`> Configuration papillon. D'après le théorème de Thalès : $\dfrac{EA}{ED} = \dfrac{EB}{EC} = \dfrac{AB}{DC}$, soit $\dfrac{4}{6} = \dfrac{5}{EC} = \dfrac{3}{DC}$.
> $EC = \dfrac{5 \times 6}{4} = 7{,}5$ cm et $CD = \dfrac{3 \times 6}{4} = 4{,}5$ cm.`],
[String.raw`R, M, S et R, N, T sont alignés dans le même ordre. $RM = 3{,}6$, $RS = 6$, $RN = 4{,}5$ et $RT = 7{,}5$. Les droites $(MN)$ et $(ST)$ sont-elles parallèles ?`, String.raw`> $RM \times RT = 3{,}6 \times 7{,}5 = 27$ et $RS \times RN = 6 \times 4{,}5 = 27$.
> Donc $\dfrac{RM}{RS} = \dfrac{RN}{RT}$ (les deux valent $0{,}6$), et les points sont dans le même ordre : d'après la réciproque du théorème de Thalès, $(MN) \parallel (ST)$.`],
[String.raw`A, M, B et A, N, C sont alignés dans le même ordre. $AM = 4$, $AB = 9$, $AN = 5$ et $AC = 11$. Les droites $(MN)$ et $(BC)$ sont-elles parallèles ?`, String.raw`> $AM \times AC = 4 \times 11 = 44$ et $AB \times AN = 9 \times 5 = 45$.
> $44 \neq 45$, donc $\dfrac{AM}{AB} \neq \dfrac{AN}{AC}$ : les droites $(MN)$ et $(BC)$ ne sont pas parallèles.`],
[String.raw`Une personne de 1,6 m a une ombre de 2,4 m. Au même moment, l'ombre d'un immeuble mesure 18 m, et les deux ombres finissent au même point. Quelle est la hauteur de l'immeuble ?`, String.raw`> La personne et l'immeuble sont verticaux, donc parallèles. D'après le théorème de Thalès : $\dfrac{2{,}4}{18} = \dfrac{1{,}6}{h}$.
> $h = \dfrac{1{,}6 \times 18}{2{,}4} = 12$ m.`],
[String.raw`Dans un triangle ABC, M est le milieu de $[AB]$ et N le milieu de $[AC]$. $BC = 11$ cm. Montrer que $(MN) \parallel (BC)$, puis calculer $MN$.`, String.raw`> $\dfrac{AM}{AB} = \dfrac{1}{2}$ et $\dfrac{AN}{AC} = \dfrac{1}{2}$, et les points sont dans le même ordre : d'après la réciproque du théorème de Thalès, $(MN) \parallel (BC)$.
> D'après le théorème de Thalès : $\dfrac{MN}{BC} = \dfrac{1}{2}$, donc $MN = \dfrac{11}{2} = 5{,}5$ cm.`]
] });