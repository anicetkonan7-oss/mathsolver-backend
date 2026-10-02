/* MathSolver - affichage 1/3 : lecture de la réponse de l'IA */
(function (w) {
  "use strict";
  var P0 = String.fromCharCode(57344), P1 = String.fromCharCode(57345);
  var LET = "A-Za-zÀ-ÖØ-öø-ÿŒœ", UPR = "A-ZÀ-ÖØ-ÞŒ";
  var MATH = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^$\n]+?\$/g;
  var SPLIT1 = new RegExp("([" + LET + "]{2}[.!?])[ \\t]+(?=[" + UPR + P0 + "])", "g");
  var SPLIT2 = new RegExp("([)" + P1 + "][.!?])[ \\t]+(?=[" + UPR + P0 + "])", "g");
  var BACK = new RegExp(P0 + "(\\d+)" + P1, "g");

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // Un morceau de la solution -> paragraphes HTML (les formules $...$ sont mises à l'abri)
  function part(src) {
    var maths = [];
    var prot = String(src).trim().replace(MATH, function (m) {
      maths.push(m.replace(/\r/g, " ").replace(/\n/g, " "));
      return P0 + (maths.length - 1) + P1;
    }).replace(SPLIT1, "$1\n").replace(SPLIT2, "$1\n");
    var lines = prot.split("\n"), out = "";
    for (var i = 0; i < lines.length; i++) {
      var s = lines[i].trim();
      if (!s || /^-{3,}$/.test(s)) { continue; }
      var h = esc(s.replace(BACK, function (_, k) { return maths[+k]; }));
      var cls = "";
      if (/^#{1,6}\s*.+$/.test(h)) {
        h = "<b>" + h.replace(/^#{1,6}\s*/, "") + "</b>";
      } else if (/^[*-]\s+.+$/.test(h)) {
        h = "• " + h.replace(/^[*-]\s+/, "");
        cls = ' class="li"';
      }
      h = h.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
      out += "<p" + cls + ">" + h + "</p>";
    }
    return out;
  }

  // Ligne @@COURBE ou @@TABLEAU : nom | expression | domaine (3 fonctions au maximum)
  function addFunc(rest, tag, funcs, keys) {
    try {
      var s = rest.replace(/`/g, "").replace(/\$/g, "");
      var a = s.indexOf("|"), b = a < 0 ? -1 : s.indexOf("|", a + 1);
      if (b < 0) { return; }
      var name = s.slice(0, a), expr = s.slice(a + 1, b).trim(), dom = s.slice(b + 1).trim();
      if (!expr) { return; }
      var key = (expr + "#" + dom).replace(/\s+/g, ""), found = keys.indexOf(key);
      if (found < 0 && funcs.length < 3) {
        name = name.replace(/^\s*:\s*/, "").replace(/\(.*\)/g, "").trim();
        if (!name || name.length > 10) { name = "f"; }
        funcs.push({ name: name, expr: expr, domain: dom, curve: false, table: false });
        keys.push(key);
        found = keys.length - 1;
      }
      if (found >= 0) { funcs[found][tag] = true; }
    } catch (e) { }
  }

  // Texte complet de l'IA -> étapes (@@ETAPE), réponse (@@REPONSE) et graphiques demandés
  function parse(text) {
    var titles = [], raws = [""], fin = "", has = false, mode = 0, funcs = [], keys = [];
    var lines = String(text).split("\n");
    for (var n = 0; n < lines.length; n++) {
      var line = lines[n], t = line.trim();
      var tc = t.replace(/^[\s*`>\-]+/, "");
      var tag = tc.indexOf("@@COURBE") === 0 ? "curve" : (tc.indexOf("@@TABLEAU") === 0 ? "table" : "");
      if (tag) {
        addFunc(tc.substring(tag === "curve" ? 8 : 9), tag, funcs, keys);
        continue;
      }
      if (t.indexOf("@@ETAPE") === 0) {
        titles.push(t.substring(7).trim());
        raws.push("");
        mode = 1;
      } else if (t.indexOf("@@REPONSE") === 0) {
        fin = t.substring(9).trim();
        has = true;
        mode = 2;
      } else if (mode === 2) {
        fin += "\n" + line;
      } else {
        raws[raws.length - 1] += line + "\n";
      }
    }
    raws.push(fin);
    for (var i = 0; i < raws.length; i++) { raws[i] = part(raws[i]); }
    return { titles: titles, raws: raws, hasAnswer: has, funcs: funcs };
  }

  w.MSP = { esc: esc, parse: parse };
})(window);