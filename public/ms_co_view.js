/* MathSolver - Cours : mise en forme d'une leçon (formules, encadrés, figures, étapes, rédaction) */
(function (w) {
  "use strict";
  if (w.MSCOV) { return; }
  // contenu : chaque fichier de chapitre appelle MSCOP(id, morceau) ; les morceaux d'un même chapitre s'ajoutent
  w.MSCO = w.MSCO || {};
  w.MSCOP = function (id, o) {
    var c = w.MSCO[id] || (w.MSCO[id] = { s: [], q: [] }), k;
    for (k in o) { if (k === "s" || k === "q") { c[k] = c[k].concat(o[k]); } else { c[k] = o[k]; } }
  };

  function e(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  // texte : $…$ et $$…$$ en formules, **gras**
  function tx(s) {
    var o = "", r = /\$\$([\s\S]+?)\$\$|\$([^$]+)\$/g, i = 0, m;
    function k(f, d) { try { return w.katex.renderToString(f, { throwOnError: false, displayMode: d }); } catch (x) { return e(f); } }
    function b(t) { return e(t).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>"); }
    while ((m = r.exec(s))) { o += b(s.slice(i, m.index)) + (m[1] ? '<div class="cm">' + k(m[1], true) + "</div>" : k(m[2], false)); i = r.lastIndex; }
    return o + b(s.slice(i));
  }
  // corps d'une partie, ligne par ligne :
  // [D] définition, [P] propriété, [K] à retenir, [!] attention, [R] remarque (« Titre :: texte », // = retour à la ligne),
  // [F] figure (« Légende :: dessin »), ## sous-titre, 1) étape, - puce, > ligne de rédaction, $$…$$ seul = formule centrée, sinon paragraphe
  function body(src) {
    var L = String(src).split("\n"), o = "", i, l, m, g = "", G = { ol: "</ol>", ul: "</ul>", cp: "</div>" };
    function grp(t, open) { if (g !== t) { o += g ? G[g] : ""; g = t; o += t ? open : ""; } }
    for (i = 0; i < L.length; i++) {
      l = L[i].trim();
      if (!l) { grp(""); continue; }
      if ((m = l.match(/^\[F\]\s*(.*)$/))) {
        grp("");
        m = m[1].split("::");
        o += m.length > 1 ? fig(m.slice(1).join("::"), m[0].trim()) : fig(m[0], "");
        continue;
      }
      if ((m = l.match(/^\[([DPK!R])\]\s*(.*)$/))) {
        grp("");
        var p = m[2].split("::"), h = p.length > 1 ? p[0].trim() : "", t = (p.length > 1 ? p.slice(1).join("::") : p[0]).trim();
        o += '<div class="cb c' + { D: "d", P: "p", K: "k", "!": "w", R: "r" }[m[1]] + '">' + (h ? "<b>" + tx(h) + "</b>" : "") + "<p>" + t.split(" // ").map(tx).join("<br>") + "</p></div>";
      } else if ((m = l.match(/^##\s*(.*)$/))) { grp(""); o += "<h3>" + tx(m[1]) + "</h3>"; }
      else if ((m = l.match(/^\d+\)\s*(.*)$/))) { grp("ol", "<ol>"); o += "<li>" + tx(m[1]) + "</li>"; }
      else if ((m = l.match(/^-\s+(.*)$/))) { grp("ul", "<ul>"); o += "<li>" + tx(m[1]) + "</li>"; }
      else if ((m = l.match(/^>\s?(.*)$/))) { grp("cp", '<div class="cop">'); o += "<p>" + tx(m[1]) + "</p>"; }
      else if (/^\$\$[\s\S]+\$\$$/.test(l)) { grp(""); o += tx(l); }
      else { grp(""); o += "<p>" + tx(l) + "</p>"; }
    }
    grp("");
    return o;
  }

  // figure : dessin + légende ; toucher = plein écran
  function fig(src, cap) {
    var g = w.MSCOF ? w.MSCOF.svg(src) : "";
    if (!g) { return ""; }
    return '<figure class="cfg" data-cf tabindex="0" role="button" aria-label="' + e(cap.replace(/\$|\*\*|\\/g, "")) + '"><div class="cfd">' + g + '<i class="cfi"></i></div>' + (cap ? "<figcaption>" + tx(cap) + "</figcaption>" : "") + "</figure>";
  }
  // toucher une figure : plein écran (ms_co_zoom.js)
  document.addEventListener("click", function (ev) {
    var f = ev.target.closest ? ev.target.closest("[data-cf]") : null;
    if (f && w.MSCOZ) { w.MSCOZ.open(f); }
  });

  // page complète d'une leçon : en-tête, sommaire, parties, exercices avec corrections dépliables, liens
  function page(c, ttl, n, T, sv) {
    var s = '<div class="ac co"><div class="ach"><button class="bkb" id="home" aria-label="' + e(T.b) + '"></button><b class="ht">' + e(T.ch) + " " + n + '</b></div><h1 class="cot">' + e(ttl) + "</h1>", k, j;
    s += '<nav class="cos" aria-label="' + e(T.som) + '">';
    for (k = 0; k < c.s.length; k++) { s += '<button data-co="go" data-v="' + k + '">' + e(c.s[k][0]) + "</button>"; }
    if (c.q.length) { s += '<button data-co="go" data-v="q">' + e(T.ex) + "</button>"; }
    s += "</nav>";
    for (k = 0; k < c.s.length; k++) { s += '<section class="csec" id="cs' + k + '"><h2>' + e(c.s[k][0]) + "</h2>" + body(c.s[k][1]) + "</section>"; }
    if (c.q.length) {
      s += '<section class="csec" id="csq"><h2>' + e(T.ex) + "</h2>";
      for (j = 0; j < c.q.length; j++) {
        s += '<div class="coq"><b class="cqn">' + e(T.e) + " " + (j + 1) + "</b>" + body(c.q[j][0]) + "<details><summary>" + e(T.cor) + '</summary><div class="cqc">' + body(c.q[j][1]) + "</div></details></div>";
      }
      s += "</section>";
    }
    return s + '<div class="coa"><button class="sb2" data-co="fm">' + e(T.fm) + "</button>" + (sv ? '<button class="pb" data-co="sv">' + e(T.sv) + "</button>" : "") + "</div></div>";
  }
  w.MSCOV = { tx: tx, body: body, page: page };
})(window);