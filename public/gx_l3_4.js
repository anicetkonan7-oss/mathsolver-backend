/* MathSolver - Exercices 3e, chapitre 5 : Théorème de Pythagore */
(function (w) {
  "use strict";
  const X = w.MSGX, L = String.raw, M = Math;
  if (!X) { return; }
  const { pw, ex, inf, infT, cz, dec, ldec, vc, tb, mp } = w.MSGXH;
  const TR = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29]];
  const nm = (H) => H.pick([["ABC", "A", "B", "C"], ["EFG", "E", "F", "G"], ["MNP", "M", "N", "P"], ["RST", "R", "S", "T"], ["IJK", "I", "J", "K"]]);
  const sq = (s) => { const q = M.round(M.sqrt(s)); return q * q === s ? [String(q), String(q)] : ["√" + s, "\\sqrt{" + s + "}"]; };
  X.add("l3", 4, [
    { id: "l34a", n: "Calculer l'hypoténuse", d: 1, f: (H) => {
      const N = nm(H), t = H.pick([0, 1]), T = t ? H.pick(TR) : [H.ri(2, 9), H.ri(2, 9)], a = T[0], b = T[1], s = a * a + b * b, q = sq(s);
      return { t: L`Le triangle $${N[0]}$ est rectangle en $${N[1]}$, avec $${N[1]}${N[2]} = ${a}$ cm et $${N[1]}${N[3]} = ${b}$ cm. Calcule $${N[2]}${N[3]}$ (valeur exacte).`, a: { k: "num", v: M.sqrt(s) }, r: N[2] + N[3] + " = " + q[0],
        h: [L`L'hypoténuse est le côté opposé à l'angle droit : $[${N[2]}${N[3]}]$.`, L`$${N[2]}${N[3]}^2 = ${N[1]}${N[2]}^2 + ${N[1]}${N[3]}^2$.`],
        s: [L`$${N[0]}$ est rectangle en $${N[1]}$ : $${N[2]}${N[3]}^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${s}$.`, L`$${N[2]}${N[3]} = ${q[1]}$ cm.`] };
    } },
    { id: "l34b", n: "Calculer un côté de l'angle droit", d: 2, f: (H) => {
      const N = nm(H), t = H.pick([0, 1]), T = t ? H.pick(TR) : [H.ri(2, 8), 0, H.ri(9, 14)], a = T[0], c = T[2], s = c * c - a * a, q = sq(s);
      return { t: L`Le triangle $${N[0]}$ est rectangle en $${N[1]}$, avec $${N[2]}${N[3]} = ${c}$ cm et $${N[1]}${N[2]} = ${a}$ cm. Calcule $${N[1]}${N[3]}$ (valeur exacte).`, a: { k: "num", v: M.sqrt(s) }, r: N[1] + N[3] + " = " + q[0],
        h: [L`L'hypoténuse est $[${N[2]}${N[3]}]$ : $${N[2]}${N[3]}^2 = ${N[1]}${N[2]}^2 + ${N[1]}${N[3]}^2$.`, L`Donc $${N[1]}${N[3]}^2 = ${N[2]}${N[3]}^2 - ${N[1]}${N[2]}^2$.`],
        s: [L`$${N[1]}${N[3]}^2 = ${c}^2 - ${a}^2 = ${c * c} - ${a * a} = ${s}$.`, L`$${N[1]}${N[3]} = ${q[1]}$ cm.`] };
    } },
    { id: "l34c", n: "Réciproque de Pythagore", d: 2, f: (H) => {
      const N = nm(H), ok = H.pick([0, 1]), T = H.pick(TR), k = ok ? 0 : H.pick([-1, 1]), a = T[0], b = T[1], c = T[2] + k;
      return { t: L`Dans le triangle $${N[0]}$ : $${N[1]}${N[2]} = ${a}$ cm, $${N[1]}${N[3]} = ${b}$ cm et $${N[2]}${N[3]} = ${c}$ cm. Ce triangle est-il rectangle ? Réponds par oui ou non.`, a: ok ? { k: "word", v: ["oui"], no: ["non", "pas"] } : { k: "word", v: ["non", "pas"], no: ["oui"] }, r: ok ? "Oui, il est rectangle en " + N[1] + "." : "Non, il n'est pas rectangle.",
        h: [L`Le plus long côté est $[${N[2]}${N[3]}]$ : compare $${N[2]}${N[3]}^2$ et $${N[1]}${N[2]}^2 + ${N[1]}${N[3]}^2$.`, "S'ils sont égaux, la réciproque du théorème de Pythagore s'applique."],
        s: [L`$${N[2]}${N[3]}^2 = ${c * c}$ et $${N[1]}${N[2]}^2 + ${N[1]}${N[3]}^2 = ${a * a} + ${b * b} = ${a * a + b * b}$.`, ok ? L`Ils sont égaux : $${N[0]}$ est rectangle en $${N[1]}$.` : L`$${c * c} \neq ${a * a + b * b}$ : le triangle n'est pas rectangle.`] };
    } }
  ]);
})(window);
