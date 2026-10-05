/* MathSolver - Cours 3e, chapitre 5 : Théorème de Pythagore (3/3) */
MSCOP("l3.4", { s: [
["Cas particuliers", String.raw`[R] Triplets pythagoriciens :: Certains triangles rectangles ont trois côtés entiers. À connaître : (3 ; 4 ; 5), (5 ; 12 ; 13), (8 ; 15 ; 17), (7 ; 24 ; 25). Leurs multiples aussi : (6 ; 8 ; 10), (9 ; 12 ; 15)…
[R] Diagonale d'un carré :: Un carré de côté $a$ a pour diagonale $d = a\sqrt{2}$, car $d^2 = a^2 + a^2 = 2a^2$.
[R] Diagonale d'un rectangle :: Un rectangle de longueur $L$ et de largeur $\ell$ a pour diagonale $d = \sqrt{L^2 + \ell^2}$.
[F] Diagonale d'un carré et diagonale d'un rectangle. :: p A 0 0 ; p B 3 0 ; p C 3 3 ; p D 0 3 ; p E 4.5 0 ; p F 9.5 0 ; p G 9.5 3 ; p H 4.5 3 ; G A B C D ; S A C c2 b ; T A B "a" ; T D A "a" ; T A C "a√2" c2 ; G E F G H ; S E G c2 b ; T E F "L" ; T F G "ℓ" ; T E G "d" c2 -
[R] Unités :: Toutes les longueurs doivent être dans la **même unité** avant de calculer.`],
["Erreurs fréquentes", String.raw`[!] Triangle non rectangle :: Le théorème ne s'applique qu'à un triangle **rectangle**. Il faut d'abord le justifier.
[!] Mauvaise hypoténuse :: L'hypoténuse est en face de l'angle droit, pas n'importe quel côté. Elle est seule dans un membre de l'égalité.
[!] Additionner les longueurs :: $BC \neq AB + AC$. Ce sont les **carrés** qui s'additionnent : avec 6 et 8, on obtient 10, pas 14.
[!] Oublier la racine :: $BC^2 = 100$ ne donne pas $BC = 100$, mais $BC = 10$.
[!] Arrondir trop tôt :: Garde la valeur exacte (par exemple $\sqrt{34}$) pendant les calculs, et arrondis seulement à la fin.
[!] Mauvaise réciproque :: Pour la réciproque, on compare toujours le carré du **plus long** côté à la somme des deux autres.`],
["À retenir", String.raw`[K] L'essentiel :: Si ABC est rectangle en A, alors $BC^2 = AB^2 + AC^2$. // Si $BC^2 = AB^2 + AC^2$, alors ABC est rectangle en A. // Si $BC^2 \neq AB^2 + AC^2$ ([BC] étant le plus long côté), alors ABC n'est pas rectangle.
- Hypoténuse = côté opposé à l'angle droit = plus long côté.
- Calculer une longueur : théorème. Prouver un angle droit : réciproque.
- Toujours terminer par la racine carrée, et arrondir à la fin.`]
], q: [
[String.raw`ABC est rectangle en B, avec $AB = 9$ cm et $BC = 12$ cm. Calculer $AC$.`, String.raw`> ABC est rectangle en B, donc $AC^2 = AB^2 + BC^2 = 81 + 144 = 225$.
> $AC = \sqrt{225} = 15$ cm.`],
[String.raw`MNP est rectangle en M, avec $NP = 17$ cm et $MN = 8$ cm. Calculer $MP$.`, String.raw`> L'hypoténuse est $[NP]$ : $MP^2 = NP^2 - MN^2 = 289 - 64 = 225$.
> $MP = \sqrt{225} = 15$ cm.`],
[String.raw`Dans le triangle RST : $RS = 6{,}5$ cm, $ST = 7{,}2$ cm et $RT = 9{,}7$ cm. Le triangle RST est-il rectangle ?`, String.raw`> Le plus long côté est $[RT]$ : $RT^2 = 9{,}7^2 = 94{,}09$.
> $RS^2 + ST^2 = 42{,}25 + 51{,}84 = 94{,}09$.
> $RT^2 = RS^2 + ST^2$, donc d'après la réciproque du théorème de Pythagore, RST est rectangle en S.`],
[String.raw`Un rectangle mesure 12 cm de long et 5 cm de large. Calculer la longueur de sa diagonale.`, String.raw`> La diagonale est l'hypoténuse d'un triangle rectangle de côtés 12 et 5 :
> $d^2 = 12^2 + 5^2 = 144 + 25 = 169$, donc $d = 13$ cm.`],
[String.raw`Un triangle a pour côtés 4 cm, 6 cm et 7 cm. Est-il rectangle ?`, String.raw`> Le plus long côté mesure 7 cm : $7^2 = 49$.
> $4^2 + 6^2 = 16 + 36 = 52$.
> $49 \neq 52$, donc ce triangle n'est pas rectangle.`],
[String.raw`Un carré a pour côté 4 cm. Calculer la longueur exacte de sa diagonale, puis son arrondi au centième.`, String.raw`> $d^2 = 4^2 + 4^2 = 32$, donc $d = \sqrt{32} = 4\sqrt{2}$ cm.
> Arrondi au centième : $d \approx 5{,}66$ cm.`]
] });