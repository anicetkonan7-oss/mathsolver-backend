/* MathSolver - pseudo : nettoyage, caractères permis, mots interdits (FR/EN), délai de 30 jours entre deux changements */
(function (w) {
  "use strict";
  if (w.MSNICK) { return; }
  // mots interdits n'importe où dans le pseudo (même déguisés : c0n.n4rd, mmerde, s-a-l-o-p-e…)
  var IN = ["merde", "putain", "salope", "salaud", "connard", "connasse", "encule", "batard", "bordel", "pouffiasse", "petasse", "enfoire", "negre", "nigger", "nigga",
    "fuck", "bitch", "bastard", "asshole", "whore", "porno", "hitler", "pedophil", "suicide", "baiser", "branleur", "couille", "zizi", "penis", "vagin"];
  // mots courts interdits seulement en mot entier (pour ne pas bloquer Conan, Monique, Nazir, Ashita…)
  var WD = ["con", "cul", "pd", "pede", "fdp", "ntm", "tg", "nique", "niquer", "pute", "bite", "zob", "chier", "shit", "dick", "cock", "cunt", "slut", "sex", "sexe", "nazi", "kkk", "ass", "fag", "pussy", "porn", "chatte"];
  var ACC = new RegExp("[" + String.fromCharCode(768) + "-" + String.fromCharCode(879) + "]", "g");
  var LEET = { "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "8": "b", "@": "a", "$": "s", "!": "i" };
  var DAY = 86400000, WAIT = 30 * DAY;

  // minuscules, sans accents, chiffres « déguisés » remplacés, lettres répétées réduites (mmerdee → merde)
  function norm(s, keep) {
    s = String(s).normalize("NFD").replace(ACC, "").toLowerCase().replace(/[0-9@$!]/g, function (c) { return LEET[c] || c; });
    return keep ? s : s.replace(/([a-z])\1+/g, "$1");
  }
  var IN2 = IN.map(function (x) { return norm(x); });
  // mot entier : tel quel (ass, kkk) ou lettres répétées réduites (conn → con)
  function word(x) { return WD.indexOf(x) >= 0 || WD.indexOf(norm(x)) >= 0; }

  // espaces en trop retirés
  function clean(s) { return String(s || "").normalize("NFC").replace(/\s+/g, " ").trim(); }

  // "" si le pseudo est accepté ; sinon "len" (longueur), "chr" (caractère interdit) ou "bad" (mot interdit)
  function check(s) {
    var v = clean(s), all, toks, i;
    if (v.length < 2 || v.length > 24) { return "len"; }
    try { if (!new RegExp("^[\\p{L}\\p{M}0-9 _.'’-]+$", "u").test(v)) { return "chr"; } } catch (e) { if (/[<>{}\[\]\\\/|"`~^*=+#%&;:?]/.test(v)) { return "chr"; } }
    all = norm(v.replace(/[\s_.'’-]+/g, ""));
    for (i = 0; i < IN2.length; i++) { if (all.indexOf(IN2[i]) >= 0) { return "bad"; } }
    toks = norm(v, 1).split(/[\s_.'’-]+/);
    for (i = 0; i < toks.length; i++) { if (word(toks[i])) { return "bad"; } }
    // mot court écrit lettre par lettre (p.d, f-d-p)
    if (toks.length > 1 && toks.join("").length === toks.length && word(toks.join(""))) { return "bad"; }
    return "";
  }
  // message à afficher pour un code de check()
  function msg(code, en) {
    if (code === "chr") { return en ? "Use only letters, numbers, spaces and - _ . '" : "Utilise seulement des lettres, des chiffres, des espaces et - _ . '"; }
    if (code === "bad") { return en ? "This nickname isn't allowed. Choose another one." : "Ce pseudo n'est pas autorisé. Choisis-en un autre."; }
    return en ? "Between 2 and 24 characters." : "Entre 2 et 24 caractères.";
  }
  // date (ms) à partir de laquelle le pseudo pourra de nouveau changer ; 0 = dès maintenant
  function next(P) {
    var t = P && +P.nt;
    return t && Date.now() - t < WAIT ? t + WAIT : 0;
  }

  // pseudo bloqué : [texte court sous « Pseudo », message complet] ; null s'il peut changer
  function lock(P, en) {
    var t = next(P), d, L;
    if (!t) { return null; }
    d = new Date(t);
    L = en ? "en-GB" : "fr-FR";
    return [(en ? "can change on " : "modifiable le ") + d.toLocaleDateString(L, { day: "numeric", month: "short" }),
      (en ? "You can change your nickname from " : "Tu pourras changer ton pseudo à partir du ") + d.toLocaleDateString(L, { day: "numeric", month: "long" }) + "."];
  }

  w.MSNICK = { clean: clean, check: check, msg: msg, next: next, lock: lock };
})(window);