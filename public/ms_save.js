/* MathSolver - bouton « Enregistrer la correction » (confirmation avant de retirer) */
(function (w) {
  "use strict";
  var L = w.MSLib, C = w.MS_CTX, D = document, box = D.getElementById("acts") || D.querySelector(".acts.solo"), sid = "", ask = 0, W, st, tm = 0;
  if (!L || !L.save || !L.find || !C || !C.a || !box) { return; }
  var BM = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg>';

  function draw() {
    W.innerHTML = ask
      ? '<div class="cfm"><span>Retirer des enregistr&eacute;es&nbsp;?</span><button class="cn" id="sno">Annuler</button><button class="cy" id="syes">Retirer</button></div>'
      : '<button class="act wide' + (sid ? " on" : "") + '" id="bsave">' + BM + (sid ? "Correction enregistrée" : "Enregistrer la correction") + "</button>";
  }
  function stop() { ask = 0; clearTimeout(tm); draw(); }

  D.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button") : null;
    if (!t || !W || !W.contains(t)) { return; }
    try {
      if (t.id === "bsave" && !sid) {
        sid = String(L.save(JSON.stringify({ q: String(C.q || ""), a: String(C.a || "") })) || "");
        if (sid) { L.toast("Correction enregistrée ✓"); }
        draw();
      } else if (t.id === "bsave") {
        ask = 1;
        draw();
        tm = setTimeout(stop, 5000);
      } else if (t.id === "syes") {
        L.remove(sid);
        sid = "";
        L.toast("Retirée des enregistrées");
        stop();
      } else if (t.id === "sno") {
        stop();
      }
    } catch (x) { }
  });

  W = D.createElement("div");
  W.className = "svw";
  box.appendChild(W);
  try { sid = String(L.find(String(C.q || "")) || ""); } catch (x) { }
  draw();
  st = D.createElement("style");
  st.textContent = ".acts{flex-wrap:wrap}.svw{flex:1 1 100%}.svw .act{width:100%}.act.on{background:#e6f6ec;border-color:#34a06a}.solo .act.on{background:#e6eeff;border-color:#1a62e8}.act.on svg{fill:currentColor}.cfm{display:flex;align-items:center;gap:8px;min-height:44px}.cfm span{flex:1;font-size:14px;font-weight:600;line-height:1.3}.cfm button{flex:none;height:44px;padding:0 14px;border-radius:12px;font-size:14px;font-weight:700}.cfm .cn{background:#e6eeff;color:#1741a6}.cfm .cy{background:#dc2626;color:#fff}.dk .act.on{background:#17301f}.dk .solo .act.on{background:#1f2c4a}.dk .cfm .cn{background:#1f2c4a;color:#c9d4ec}";
  D.head.appendChild(st);
})(window);