/* MathSolver - pays d'Afrique, niveaux (primaire -> université), niveaux d'auto-évaluation */
(function (w) {
  "use strict";
  var C = "ZA|Afrique du Sud|South Africa;DZ|Algérie|Algeria;AO|Angola|Angola;BJ|Bénin|Benin;BW|Botswana|Botswana;BF|Burkina Faso|Burkina Faso;BI|Burundi|Burundi;CV|Cap-Vert|Cabo Verde;CM|Cameroun|Cameroon;CF|Centrafrique|Central African Republic;KM|Comores|Comoros;CG|Congo|Congo;CD|RD Congo|DR Congo;CI|Côte d'Ivoire|Ivory Coast;DJ|Djibouti|Djibouti;EG|Égypte|Egypt;ER|Érythrée|Eritrea;SZ|Eswatini|Eswatini;ET|Éthiopie|Ethiopia;GA|Gabon|Gabon;GM|Gambie|Gambia;GH|Ghana|Ghana;GN|Guinée|Guinea;GW|Guinée-Bissau|Guinea-Bissau;GQ|Guinée équatoriale|Equatorial Guinea;KE|Kenya|Kenya;LS|Lesotho|Lesotho;LR|Libéria|Liberia;LY|Libye|Libya;MG|Madagascar|Madagascar;MW|Malawi|Malawi;ML|Mali|Mali;MA|Maroc|Morocco;MU|Maurice|Mauritius;MR|Mauritanie|Mauritania;MZ|Mozambique|Mozambique;NA|Namibie|Namibia;NE|Niger|Niger;NG|Nigéria|Nigeria;UG|Ouganda|Uganda;RW|Rwanda|Rwanda;ST|Sao Tomé-et-Principe|São Tomé and Príncipe;SN|Sénégal|Senegal;SC|Seychelles|Seychelles;SL|Sierra Leone|Sierra Leone;SO|Somalie|Somalia;SD|Soudan|Sudan;SS|Soudan du Sud|South Sudan;TZ|Tanzanie|Tanzania;TD|Tchad|Chad;TG|Togo|Togo;TN|Tunisie|Tunisia;ZM|Zambie|Zambia;ZW|Zimbabwe|Zimbabwe";
  // id | groupe | nom FR | précision FR | nom EN | précision EN
  var L = "p1|pri|Primaire (début)|CP – CE2 · 6 à 9 ans|Primary (early)|Years 1–3 · ages 6–9;" +
    "p2|pri|Primaire (fin)|CM1 – CM2 · 9 à 11 ans|Primary (late)|Years 4–6 · ages 9–11;" +
    "l6|col|6e|11 à 12 ans|Year 7|Ages 11–12;l5|col|5e|12 à 13 ans|Year 8|Ages 12–13;l4|col|4e|13 à 14 ans|Year 9|Ages 13–14;" +
    "l3|col|3e|14 à 15 ans · fin du collège|Year 10|Ages 14–15 · end of lower secondary;" +
    "l2|lyc|2nde|15 à 16 ans|Year 11|Ages 15–16;l1|lyc|1ère|16 à 17 ans|Year 12|Ages 16–17;" +
    "lt|lyc|Terminale|17 à 18 ans · année du BAC|Year 13|Ages 17–18 · final exam year;" +
    "s1|sup|Licence 1 – 2|Études supérieures|University, years 1–2|Higher education;" +
    "s2|sup|Licence 3 et plus|Licence 3, Master, école d'ingénieur|University, year 3+|Year 3, Master, engineering school";
  // phrases d'auto-évaluation (niveau « Autre ») : niveau associé | FR | EN
  var Q = "p1|Je fais les 4 opérations et de petits problèmes.|I can do the 4 operations and simple problems.;" +
    "l6|Je maîtrise les fractions, les pourcentages et la géométrie de base.|I know fractions, percentages and basic geometry.;" +
    "l4|Je résous des équations du 1er degré, avec Pythagore et Thalès.|I solve linear equations, with Pythagoras and Thales.;" +
    "l2|Je travaille le 2nd degré, les fonctions et la trigonométrie.|I work with quadratics, functions and trigonometry.;" +
    "l1|Je fais des suites, des dérivées et des probabilités.|I do sequences, derivatives and probability.;" +
    "lt|Je fais des limites, des intégrales et des nombres complexes.|I do limits, integrals and complex numbers.;" +
    "s1|Je fais de l'algèbre linéaire, de l'analyse et des statistiques.|I do linear algebra, analysis and statistics.;" +
    "s2|Niveau avancé : Licence 3, Master, ingénieur…|Advanced level: Bachelor year 3, Master, engineer…";
  var G = { fr: { pri: "Primaire", col: "Collège", lyc: "Lycée", sup: "Supérieur", ot: "Autre" }, en: { pri: "Primary", col: "Lower secondary", lyc: "Upper secondary", sup: "University", ot: "Other" } };
  function rows(s) { return s.split(";").map(function (x) { return x.split("|"); }); }
  var CO = rows(C), LV = rows(L), QS = rows(Q);
  function ix(l) { return l === "en" ? 1 : 0; }
  w.MSGEO = {
    groups: function (l) { return G[l] || G.fr; },
    // [[code, nom]] triés dans la langue, « Autre pays » à la fin
    countries: function (l) {
      var o = CO.map(function (c) { return [c[0], c[1 + ix(l)]]; });
      o.sort(function (a, b) { return a[1].localeCompare(b[1], l); });
      return o;
    },
    cname: function (c, l) {
      for (var i = 0; i < CO.length; i++) { if (CO[i][0] === c) { return CO[i][1 + ix(l)]; } }
      return c ? (l === "en" ? "Other country" : "Autre pays") : "";
    },
    flag: function (c) {
      return /^[A-Z]{2}$/.test(c) && c !== "OT" ? String.fromCodePoint(c.charCodeAt(0) + 127397, c.charCodeAt(1) + 127397) : "🌍";
    },
    // [{id, g, n, s}] pour la langue
    levels: function (l) {
      return LV.map(function (v) { return { id: v[0], g: v[1], n: v[2 + 2 * ix(l)], s: v[3 + 2 * ix(l)] }; });
    },
    lname: function (id, l) {
      for (var i = 0; i < LV.length; i++) { if (LV[i][0] === id) { return LV[i][2 + 2 * ix(l)]; } }
      return "";
    },
    cando: function (l) { return QS.map(function (q) { return [q[0], q[1 + ix(l)]]; }); }
  };
})(window);