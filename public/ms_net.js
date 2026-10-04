/* MathSolver - hors ligne : bandeau « Hors ligne » et exercice en attente, sur l'accueil */
(function (w) {
  "use strict";
  var D = document, S = w.MSStore, BASE = "https://mathsolver-backend-gray.vercel.app/", off = navigator.onLine === false ? 1 : 0, tm = 0, busy = 0, last = 0;
  if (w.MSNET) { return; }

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function pend() { try { return String(S.get("pend") || "").trim(); } catch (e) { return ""; } }

  function style() {
    var st = D.createElement("style");
    st.textContent = ".netb{display:flex;align-items:center;gap:10px;margin:12px 12px 0;padding:10px 14px;border-radius:14px;background:#fff4e5;color:#8a4b00;font-size:14px;line-height:1.4;}" +
      ".netb:before{content:\"\";flex:none;width:9px;height:9px;border-radius:50%;background:#e8890c;}.netb[hidden]{display:none;}" +
      ".pdh{margin:-4px 16px 4px;font-size:13px;line-height:1.45;color:#6b7791;}" +
      ".dk .netb{background:#3a2a12;color:#ffd59a;}.dk .pdh{color:#93a2c4;}";
    D.head.appendChild(st);
  }

  // affiche ou cache le bandeau ; au retour du réseau, le profil modifié hors ligne repart vers le serveur
  function set(o) {
    var b = D.getElementById("netb");
    clearTimeout(tm);
    if (o) { tm = setTimeout(check, 20000); }
    if (b) { b.hidden = !o; }
    if (o === off) { return; }
    off = o;
    if (!o) { try { if (w.MSAC && w.MSAC.sess()) { w.MSAC.save({}); } } catch (e) { } }
  }

  // petite requête sans contenu vers le serveur : réponse = en ligne, échec ou 6 s sans réponse = hors ligne
  function check() {
    var ac = w.AbortController ? new w.AbortController() : null, t;
    if (busy) { return; }
    busy = 1;
    last = Date.now();
    function done(o) { clearTimeout(t); busy = 0; set(o); }
    t = setTimeout(function () { if (ac) { ac.abort(); } done(1); }, 6000);
    try {
      fetch(BASE + "offline.json", { method: "HEAD", mode: "no-cors", cache: "no-store", signal: ac ? ac.signal : undefined }).then(function () { done(0); }, function () { done(1); });
    } catch (e) { done(0); }
  }

  w.addEventListener("online", check);
  w.addEventListener("offline", function () { set(1); });

  // « Retirer » : l'exercice en attente est oublié
  D.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("#pdx") : null;
    if (!b) { return; }
    try { S.del("pend"); } catch (x) { }
    if (w.MSHOME) { w.MSHOME.home(); }
  });

  w.MSNET = {
    // haut de l'accueil : bandeau (caché si en ligne) + exercice en attente ; B = outils de liste de l'accueil
    card: function (B) {
      var q = pend(), s = '<div class="netb" id="netb"' + (off ? "" : " hidden") + ">Hors ligne : tes formules et tes corrections enregistrées restent disponibles.</div>";
      if (Date.now() - last > 15000) { setTimeout(check, 0); }
      if (q && B) {
        s += B.head("En attente", "pdx", "Retirer") + B.rc("rc", esc(q), q);
        s += '<p class="pdh">Touche-le, puis appuie sur « Résoudre » quand tu es connecté.</p>';
      }
      return s;
    },
    off: function () { return !!off; }
  };
  style();
})(window);