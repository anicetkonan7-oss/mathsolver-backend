/* MathSolver - narrateur 2/2 : bouton Écouter, lecture étape par étape (nécessite ms_fr.js et le pont MSVoice) */
(function (w) {
  "use strict";
  var V = w.MSVoice, F = w.MSFR, D = document, items = [], last = "", on = false, btn, lab;
  if (!V || !F || !w.MS_CTX) { return; }
  function $(id) { return D.getElementById(id); }
  var chunks = F.chunks;

  function build() {
    var L = String(w.MS_CTX.a || "").split("\n"), cs = D.querySelectorAll(".card"), ci = 0, cur = { el: D.querySelector(".intro"), t: "" }, i, l, tc;
    items = [cur];
    for (i = 0; i < L.length; i++) {
      l = L[i].trim();
      tc = l.replace(/^[\s*`>\-]+/, "");
      if (/^@@(COURBE|TABLEAU)/.test(tc)) { continue; }
      if (l.indexOf("@@ETAPE") === 0) {
        cur = { el: cs[ci] || null, t: "Étape " + (++ci) + ". " + l.slice(7).replace(/^\s*\d+\s*[:.)-]\s*/, "") + "\n" };
        items.push(cur);
      } else if (l.indexOf("@@REPONSE") === 0) {
        cur = { el: $("ans"), t: "Réponse finale.\n" + l.slice(9).replace(/^\s*(\d+)\s*[.)]\s+/, "Résultat $1 : ") + "\n", fin: 1 };
        items.push(cur);
      } else {
        cur.t += (cur.fin ? L[i].replace(/^\s*(\d+)\s*[.)]\s+/, "Résultat $1 : ") : L[i]) + "\n";
      }
    }
    if (items.length === 1) { items[0].el = cs[0] || null; }
  }

  function ui() {
    if (!btn) { return; }
    btn.className = "lbtn" + (on ? " on" : "");
    btn.innerHTML = on ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>' : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';
    lab = D.createElement("span");
    lab.appendChild(D.createTextNode(on ? "Arrêter la lecture" : "Écouter la correction"));
    btn.appendChild(lab);
  }

  function mark(k) {
    var all = D.querySelectorAll(".say"), i, e, it = items[k], h;
    for (i = 0; i < all.length; i++) { all[i].className = all[i].className.replace(/\s*\bsay\b/g, ""); }
    if (!it || !it.el) { return; }
    e = it.el;
    if (/\bshut\b/.test(e.className)) {
      e.className = e.className.replace(/\s*\bshut\b/g, "");
      if (e.firstChild && e.firstChild.setAttribute) { e.firstChild.setAttribute("aria-expanded", "true"); }
      if (w.msFit) { w.msFit(); }
    }
    e.className += " say";
    h = D.querySelector(".photo");
    w.scrollTo({ top: e.getBoundingClientRect().top + w.pageYOffset - (h ? h.offsetHeight : 0) - 10, behavior: "smooth" });
  }

  function done() { on = false; mark(-1); ui(); }
  function stop() { if (on) { try { V.stop(); } catch (e) { } done(); } }

  function start() {
    var q = [], i, j, c;
    build();
    for (i = 0; i < items.length; i++) {
      c = chunks(items[i].t);
      for (j = 0; j < c.length; j++) { q.push([c[j], i + "." + j]); }
    }
    if (!q.length) { return; }
    last = q[q.length - 1][1];
    on = true;
    ui();
    try { for (i = 0; i < q.length; i++) { V.speak(q[i][0], q[i][1], i === 0); } } catch (e) { done(); }
  }

  w.msSay = function (id) { mark(parseInt(id, 10)); };
  w.msEnd = function (id) { if (id === last) { done(); } };
  w.msStopped = done;
  w.msVoiceErr = done;

  var st0 = D.createElement("style");
  st0.appendChild(D.createTextNode(".lsn{margin:10px 12px 0}.lbtn{width:100%;height:46px;display:flex;align-items:center;justify-content:center;gap:8px;border-radius:14px;background:#e4edff;color:#1741a6;font-size:15px;font-weight:600}.lbtn.on{background:#1a62e8;color:#fff}.card.say,.answer.say{box-shadow:0 0 0 2px #1a62e8}.dk .lbtn{background:#1f2c4a;color:#a9c4ff}.dk .lbtn.on{background:#2f6df0;color:#fff}.dk .card.say,.dk .answer.say{box-shadow:0 0 0 2px #5b8ff5}"));
  D.head.appendChild(st0);
  var first = D.querySelector(".card"), box = D.createElement("div");
  if (first) {
    box.className = "lsn";
    btn = D.createElement("button");
    btn.id = "blisten";
    box.appendChild(btn);
    first.parentNode.insertBefore(box, first);
    ui();
  }
  D.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button") : null;
    if (!t) { return; }
    if (t.id === "blisten") { if (on) { stop(); } else { start(); } }
    else if (t.id === "bnew" || t.id === "bedit") { stop(); }
  });
  w.addEventListener("pagehide", stop);
})(window);