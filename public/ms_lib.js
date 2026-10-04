/* MathSolver - listes de l'accueil : récents, corrections enregistrées (ouvrir, supprimer), formules des listes */
(function (w) {
  "use strict";
  var L = w.MSLib;
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function day(t) {
    try { return new Date(Number(t)).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }); } catch (e) { return ""; }
  }
  function btn(a, id, c, t) { return '<button' + (c ? ' class="' + c + '"' : "") + ' data-a="' + a + '"' + (id ? ' data-id="' + id + '"' : "") + ">" + t + "</button>"; }
  w.MSLB = {
    on: !!(L && L.list && L.open),
    all: function () {
      try { var a = JSON.parse(L.list()); return a instanceof Array ? a : []; } catch (e) { return []; }
    },
    head: function (t, id, lb) {
      return '<div class="hh"><span class="st">' + t + "</span>" + (id ? '<button class="lk" id="' + id + '">' + lb + "</button>" : "") + "</div>";
    },
    empty: function (t, m) { return '<div class="empty"><b>' + t + "</b>" + m + "</div>"; },
    tabs: function (tab, n) {
      return '<div class="tbs"><button class="tg' + (tab === "rec" ? " on" : "") + '" data-a="tab" data-t="rec">R&eacute;cents</button><button class="tg' + (tab === "sav" ? " on" : "") + '" data-a="tab" data-t="sav">Enregistr&eacute;es' + (n ? " (" + n + ")" : "") + "</button></div>";
    },
    // une ligne de la liste des récents ou des exemples
    rc: function (cls, html, val) {
      return '<button class="' + cls + '" data-a="fill" data-v="' + esc(val) + '">' + (cls === "rc" ? '<span class="ri"></span>' : "") + '<span class="it"' + (cls === "rc" ? ' data-q="' + esc(val) + '"' : "") + ">" + html + '</span><span class="chv"></span></button>';
    },
    // une ligne enregistrée ; cf = identifiant en attente de confirmation de suppression
    row: function (o, cf) {
      var id = esc(o.id), q = String(o.q || "").trim() || "Exercice en photo";
      if (String(o.id) === cf) {
        return '<div class="sv"><div class="cf"><span>Supprimer cette correction ?</span>' + btn("no", "", "cn", "Annuler") + btn("yes", id, "cy", "Supprimer") + "</div></div>";
      }
      return '<div class="sv"><button class="sb" data-a="open" data-id="' + id + '"><span class="bi"></span><span class="tx"><span class="it" data-q="' + esc(q) + '">' + esc(q) + '</span><span class="sd">' + esc(day(o.t)) + "</span></span></button>" + btn("del", id, "dl", "").replace(">", ' aria-label="Supprimer">') + "</div>";
    },
    // formules dessinées dans les textes des listes (si les modules de formules sont chargés)
    type: function (root) {
      var f = w.MSFX, els, i;
      if (!f || !f.html) { return; }
      els = root.querySelectorAll(".it[data-q]");
      for (i = 0; i < els.length; i++) {
        try { els[i].innerHTML = f.html(els[i].getAttribute("data-q").replace(/\s*\n+\s*/g, " · ")); } catch (e) { }
      }
    }
  };
})(window);