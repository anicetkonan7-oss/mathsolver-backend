/* MathSolver - Cours Terminale, chapitre 14 : Similitudes directes, série C (1/3) */
MSCOP("lt.13", { t: "Similitudes directes (série C)", s: [
["Introduction", String.raw`Une **similitude directe** agrandit (ou réduit) une figure et la fait tourner, **sans la déformer** : les angles et les proportions sont conservés. Les translations, les rotations et les homothéties en sont des cas particuliers. Les nombres complexes permettent de les étudier très simplement.
[R] Dans la vie courante :: Zoom et rotation d'une photo, plans et cartes à l'échelle, maquettes, motifs qui s'enroulent comme une coquille d'escargot.`],
["Définitions", String.raw`[D] Similitude directe :: C'est une transformation du plan dont l'écriture complexe est $z' = az + b$, avec $a \neq 0$ et $b$ complexes.
[D] Rapport et angle :: Le **rapport** est $k = |a|$ et l'**angle** est $\theta = \arg a$.
[D] Centre :: Si $a \neq 1$, la similitude a un unique point fixe $\Omega$, son **centre**, d'affixe $\omega = \dfrac{b}{1 - a}$.
[D] Forme réduite :: Si $a \neq 1$ : $z' - \omega = a(z - \omega)$. Ainsi $\Omega M' = k\,\Omega M$ et $(\overrightarrow{\Omega M}, \overrightarrow{\Omega M'}) = \theta$.
[F] Similitude de centre $\Omega$, de rapport $k = 1{,}5$ et d'angle $\theta = \dfrac{\pi}{3}$ : $\Omega M' = 1{,}5\,\Omega M$. :: P Ω 0 0 so ; P M 2 0.5 e ; P M' 0.85 2.97 n ; S Ω M c1 b ; S Ω M' c2 b ; Q M Ω M' "θ" c3 ; T Ω M "r" c1 - ; T Ω M' "1,5 r" c2`],
["Propriétés", String.raw`[P] Cas particuliers :: $a = 1$ : translation de vecteur d'affixe $b$. // $|a| = 1$, $a \neq 1$ : rotation de centre $\Omega$ et d'angle $\arg a$. // $a$ réel, $a \neq 1$ : homothétie de centre $\Omega$ et de rapport $a$.
[P] Conservation :: Une similitude directe conserve l'alignement, le parallélisme, l'orthogonalité, les angles orientés et les rapports de distances. Elle multiplie les distances par $k$ et les aires par $k^2$.
[F] Le triangle $ABC$ et son image $A'B'C'$ par $z' = (1 + i)z$ : rapport $\sqrt{2}$, angle $\dfrac{\pi}{4}$, centre $O$. :: X -1 4 -1 3 ; P A 2 0 s ; P B 3 0 se ; P C 2 1 e ; P A' 2 2 e ; P B' 3 3 ne ; P C' 1 3 n ; G A B C c1 ; G A' B' C' c2 ; p O 0 0 ; S O A d ; S O A' d
[P] Image d'un cercle :: L'image du cercle de centre $I$ et de rayon $R$ est le cercle de centre $I'$ (image de $I$) et de rayon $kR$.
[P] Composée :: La composée de deux similitudes directes de rapports $k$, $k'$ et d'angles $\theta$, $\theta'$ est une similitude directe de rapport $kk'$ et d'angle $\theta + \theta'$. La réciproque a pour rapport $\dfrac{1}{k}$ et pour angle $-\theta$.
[P] Détermination :: Si $A \neq B$ et $A' \neq B'$, il existe une unique similitude directe qui transforme $A$ en $A'$ et $B$ en $B'$. Son coefficient est $a = \dfrac{z_{B'} - z_{A'}}{z_B - z_A}$.`]
] });
