/* MathSolver - signalement d'une erreur (bouton + petit formulaire sous la solution) */
(function () {
  "use strict";
  var API = (window.MS_REPORT_API || "https://mathsolver-backend-gray.vercel.app") + "/api/report";
  var host = document.getElementById("rep");
  var ctx = window.MS_CTX;
  if (!host || !ctx || !ctx.a) { return; }

  var KINDS = ["Résultat final faux", "Étape de calcul fausse", "Solution incomplète", "Exercice mal compris", "Graphique ou tableau faux", "Autre problème"];

  var st = document.createElement("style");
  st.textContent =
    ".rp-card{margin:12px 12px 28px;background:#fff;border:1px solid #e2e7f1;border-radius:16px;padding:14px 16px;box-shadow:0 1px 2px rgba(16,24,40,.05),0 3px 10px rgba(16,24,40,.04);color:#1f2937}" +
    ".rp-min,.dk .rp-min{background:none;border-color:transparent;box-shadow:none;padding:0 12px}.rp-min .rp-row{justify-content:center;gap:4px}.rp-min .rp-q{flex:none;min-width:0}" +
    ".rp-min .rp-btn,.dk .rp-min .rp-btn{border:0;background:none;padding:0 8px;color:#b42318}.dk .rp-min .rp-btn{color:#ff8a80}.rp-min .rp-btn:before{content:\"⚑ \"}" +
    ".rp-row{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}" +
    ".rp-q{font-size:14px;line-height:1.4;color:#5b6784;flex:1;min-width:150px}" +
    ".rp-btn{font:inherit;font-size:14px;font-weight:bold;border-radius:999px;min-height:44px;padding:9px 14px;border:1.5px solid #dc2626;background:#fff;color:#b91c1c}" +
    ".rp-lab{font-size:14px;font-weight:bold;color:#111827;margin:0 0 10px}" +
    ".rp-chips{display:flex;flex-wrap:wrap;gap:8px}" +
    ".rp-chip{font:inherit;font-size:14px;min-height:44px;border:1px solid #cbd5e1;background:#f4f6fb;color:#334155;border-radius:999px;padding:8px 12px}" +
    ".rp-chip[aria-pressed=true]{background:#fee2e2;border-color:#dc2626;color:#991b1b;font-weight:bold}" +
    ".rp-ta{display:block;width:100%;box-sizing:border-box;min-height:84px;margin-top:12px;border:1px solid #cbd5e1;border-radius:10px;padding:10px;font:inherit;font-size:16px;color:#1f2937;background:#fff;resize:vertical}" +
    ".rp-act{display:flex;gap:8px;margin-top:12px}" +
    ".rp-send{flex:1;font:inherit;font-size:15px;font-weight:bold;background:#1d4ed8;color:#fff;border:0;border-radius:10px;padding:12px}" +
    ".rp-send[disabled]{opacity:.6}" +
    ".rp-cancel{font:inherit;font-size:15px;background:#eef2fa;color:#334155;border:0;border-radius:10px;padding:12px 16px}" +
    ".rp-msg{font-size:14px;line-height:1.45;margin-top:10px}" +
    ".rp-err{color:#b91c1c}" +
    ".rp-ok{color:#14532d;background:#ecf8f0;border:1px solid #9bd5b0;border-radius:10px;padding:12px 14px;font-size:15px;line-height:1.5}";
  document.head.appendChild(st);

  function mk(tag, cls, txt, parent) {
    var e = document.createElement(tag);
    if (cls) { e.className = cls; }
    if (txt) { e.textContent = txt; }
    if (parent) { parent.appendChild(e); }
    return e;
  }

  function photo() {
    try {
      var im = document.querySelector(".pview img");
      var s = im ? (im.getAttribute("src") || "") : "";
      var i = s.indexOf("base64,");
      return i >= 0 ? s.slice(i + 7) : "";
    } catch (e) { return ""; }
  }

  var card = mk("div", "rp-card", "", host);
  var kind = "";

  // en temps normal : une ligne discrète ; le formulaire s'ouvre au toucher
  function showButton() {
    card.innerHTML = "";
    card.className = "rp-card rp-min";
    var row = mk("div", "rp-row", "", card);
    mk("span", "rp-q", "Une erreur dans la correction ?", row);
    var b = mk("button", "rp-btn", "Signaler", row);
    b.type = "button";
    b.onclick = showForm;
  }

  function showForm() {
    card.innerHTML = "";
    card.className = "rp-card";
    kind = "";
    mk("p", "rp-lab", "Quel est le problème ?", card).style.margin = "0 0 10px";
    var chips = mk("div", "rp-chips", "", card), btns = [];
    KINDS.forEach(function (k) {
      var c = mk("button", "rp-chip", k, chips);
      c.type = "button";
      c.setAttribute("aria-pressed", "false");
      c.onclick = function () {
        kind = (kind === k) ? "" : k;
        btns.forEach(function (x) { x.setAttribute("aria-pressed", x.textContent === kind ? "true" : "false"); });
      };
      btns.push(c);
    });
    var ta = mk("textarea", "rp-ta", "", card);
    ta.placeholder = "Explique en une phrase ce qui est faux (facultatif)";
    ta.maxLength = 1000;
    var msg = mk("div", "rp-msg", "", card);
    var act = mk("div", "rp-act", "", card);
    var send = mk("button", "rp-send", "Envoyer", act);
    send.type = "button";
    var cancel = mk("button", "rp-cancel", "Annuler", act);
    cancel.type = "button";
    cancel.onclick = showButton;
    send.onclick = function () {
      var comment = ta.value.trim();
      if (!kind && !comment) {
        msg.className = "rp-msg rp-err";
        msg.textContent = "Choisis le type de problème ou écris un commentaire.";
        return;
      }
      send.disabled = true; cancel.disabled = true;
      send.textContent = "Envoi…";
      msg.className = "rp-msg"; msg.textContent = "";
      var ctl = (typeof AbortController === "function") ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctl) { ctl.abort(); } }, 30000);
      var body = JSON.stringify({
        kind: kind, comment: comment, question: String(ctx.q || ""), answer: String(ctx.a || ""),
        funcs: window.MS_FUNCS ? JSON.stringify(window.MS_FUNCS).slice(0, 2000) : "",
        imageBase64: photo(), ua: (navigator.userAgent || "").slice(0, 200)
      });
      fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: body, signal: ctl ? ctl.signal : undefined })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (j) {
            clearTimeout(timer);
            if (r.ok && j && j.ok) { done(); return; }
            fail(msg, send, cancel, (j && j.error) ? r.status + " " + j