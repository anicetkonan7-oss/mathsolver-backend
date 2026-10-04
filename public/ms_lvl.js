/* MathSolver - exercice d'un autre niveau : explication, puis « Nouvel exercice » ou « Résoudre quand même » */
(function (w) {
  "use strict";
  var D = document, box = D.getElementById("nvx"), code = w.MS_NV || "", done = 0;
  var BASE = "https://mathsolver-backend-gray.vercel.app/";
  if (!box) { return; }
  var T = {
    fr: {
      t: "Exercice d'un autre niveau",
      m: "Cet exercice semble être du niveau {x}. Ton niveau : {n}.",
      m2: "Cet exercice semble dépasser ton niveau ({n}).",
      h: "MathSolver te propose des exercices adaptés à ta classe. Tu peux quand même afficher la correction.",
      a: "Nouvel exercice", b: "Résoudre quand même",
      f: "Ce n'est pas ton niveau ? Modifie-le depuis ton profil, sur l'accueil."
    },
    en: {
      t: "Exercise from another level",
      m: "This exercise looks like {x} level. Your level: {n}.",
      m2: "This exercise seems above your level ({n}).",
      h: "MathSolver suggests exercises that fit your class. You can still see the solution.",
      a: "New exercise", b: "Solve anyway",
      f: "Not your level? Change it from your profile, on the home screen."
    }
  };
  var CSS = ".nvb{margin:0 12px 8px;}.nvb button{display:block;box-sizing:border-box;width:100%;height:50px;margin:0 0 10px;border:0;border-radius:14px;font-size:16px;font-weight:700;}" +
    ".nvb .p{background:#1a62e8;color:#fff;}.nvb .s{background:#e8eeff;color:#1741a6;}.nvb button[disabled]{opacity:.55;}" +
    ".nvb p{margin:4px 8px 0;font-size:12px;line-height:1.5;color:#6b7791;text-align:center;}" +
    ".dk .nvb .s{background:#16264a;color:#8fb4ff;}.dk .nvb p{color:#93a2c4;}";

  function rd(k) { try { return w.MSStore.get(k) || ""; } catch (e) { return ""; } }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  function draw() {
    var l = rd("lang") === "en" ? "en" : "fr", x = T[l], me = "", p = {}, G = w.MSGEO, nx = "", s, m, ic;
    try { p = JSON.parse(rd("prof")) || {}; } catch (e) { p = {}; }
    if (G && p.lv) { me = G.lname(p.lv, l); }
    if (G && /^[a-z0-9]{2}$/.test(code)) { nx = G.lname(code, l); }
    m = nx ? x.m.replace("{x}", nx).replace("{n}", me) : x.m2.replace("{n}", me);
    s = w.MSV.err(x.t, m, x.h, "");
    box.innerHTML = s + '<div class="nvb"><button class="p" data-nv="new">' + esc(x.a) + '</button><button class="s" data-nv="go">' + esc(x.b) + "</button><p>" + esc(x.f) + "</p></div>";
    ic = box.querySelector(".err .ic");
    if (ic) { ic.textContent = "↑"; ic.style.background = "#e4edff"; ic.style.color = "#1a4db5"; }
  }

  box.addEventListener("click", function (ev) {
    var b = ev.target.closest ? ev.target.closest("[data-nv]") : null, k;
    if (!b || done) { return; }
    k = b.getAttribute("data-nv");
    done = 1;
    b.disabled = true;
    try {
      if (k === "go") { w.MSNav.force(); } else { w.MSNav.newEx(); }
    } catch (e) { done = 0; b.disabled = false; }
  });

  var st = D.createElement("style");
  st.appendChild(D.createTextNode(CSS));
  D.head.appendChild(st);
  if (w.MSGEO) { draw(); return; }
  var sc = D.createElement("script");
  sc.src = BASE + "ms_geo.js?v=1";
  sc.onload = sc.onerror = draw;
  D.head.appendChild(sc);
})(window);