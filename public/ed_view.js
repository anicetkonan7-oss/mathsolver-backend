/* MathSolver - éditeur de formules 2/4 : affichage 2D, curseur, clic, boutons Insérer et abc */
(function (E) {
  "use strict";
  var RD = '<svg class="rd" viewBox="0 0 12 20" preserveAspectRatio="none"><path d="M.5 11.5l2.5-1.5 3 8.5L11.5 1"/></svg>';
  var PL = '<svg class="pa" viewBox="0 0 8 20" preserveAspectRatio="none"><path d="M7 .5C2 5 2 15 7 19.5"/></svg>';
  var PR = '<svg class="pa" viewBox="0 0 8 20" preserveAspectRatio="none"><path d="M1 .5C6 5 6 15 1 19.5"/></svg>';
  var host;
  function sh(c, h) { var e = document.createElement("span"); e.className = c; e.innerHTML = h || ""; return e; }
  function put(e, k, x) { e.children[k].appendChild(x); }
  function rn(n) {
    var e, f;
    if (n.t === "c") {
      e = sh(n.k === "b" ? "br" : "c k" + n.k);
      if (n.k !== "b") { e.textContent = n.v === " " ? " " : n.v; }
      e.__n = n;
      return e;
    }
    f = n.f.map(function (s) { return rs(s, false); });
    if (n.t === "frac") { e = sh("fr", "<span class=nu></span><span class=fb></span><span class=de></span>"); put(e, 0, f[0]); put(e, 2, f[1]); }
    else if (n.t === "sup" || n.t === "sub") { e = sh(n.t === "sup" ? "su" : "sb"); e.appendChild(f[0]); }
    else if (n.t === "ss") { e = sh("ss", "<span class=ssu></span><span class=ssb></span>"); put(e, 0, f[1]); put(e, 1, f[0]); }
    else if (n.t === "sqrt") { e = sh("sr", RD + "<span class=rb></span>"); put(e, 1, f[0]); }
    else if (n.t === "root") { e = sh("sr", "<span class=ri></span>" + RD + "<span class=rb></span>"); put(e, 0, f[0]); put(e, 2, f[1]); }
    else if (n.t === "abs") { e = sh("ab", "<i class=bl></i><span class=gb></span><i class=bl></i>"); put(e, 1, f[0]); }
    else { e = sh("gp", PL + "<span class=gb></span>" + PR); put(e, 1, f[0]); }
    return e;
  }
  function rs(s, top) {
    var e = sh("sq" + (top ? " top" : "") + (s.n.length ? "" : " e") + (s === E.bad ? " bad" : "")), a = s.n, c = E.cur, w = null, i, n, x, sp;
    s.el = e;
    e.__s = s;
    for (i = 0; i <= a.length; i++) {
      if (c.s === s && c.i === i) { (w || e).appendChild(sh("cr")); }
      if (i === a.length) { break; }
      n = a[i];
      x = rn(n);
      n.el = x;
      sp = n.t === "c" && (n.k === "s" || n.k === "b");
      if (top && !sp) {
        if (!w || (n.t === "c" && n.k === "o")) { w = sh("wd"); e.appendChild(w); }
        w.appendChild(x);
      } else {
        w = null;
        e.appendChild(x);
      }
    }
    return e;
  }
  E.render = function () {
    var cr;
    host = host || document.getElementById("ed");
    host.innerHTML = "";
    host.appendChild(rs(E.root, true));
    document.getElementById("fld").className = E.root.n.length ? "" : "em";
    cr = host.querySelector(".cr");
    if (cr && cr.scrollIntoView) { cr.scrollIntoView({ block: "nearest", inline: "nearest" }); }
  };
  E.flash = function (s) {
    E.bad = s;
    E.render();
    setTimeout(function () { E.bad = null; E.render(); }, 1100);
  };
  E.hit = function (ev) {
    var t = ev.target.closest ? ev.target.closest(".c,.sq") : null, c = E.cur, n, s, a, i, r;
    if (!t) { c.s = E.root; c.i = E.root.n.length; E.render(); return; }
    if (t.__n) {
      n = t.__n;
      s = n.q;
      r = t.getBoundingClientRect();
      c.s = s;
      c.i = s.n.indexOf(n) + (ev.clientX > r.left + r.width / 2 ? 1 : 0);
    } else {
      s = t.__s;
      a = s.n;
      for (i = 0; i < a.length; i++) {
        r = a[i].el.getBoundingClientRect();
        if (ev.clientY < r.top || (ev.clientY <= r.bottom && ev.clientX < r.left + r.width / 2)) { break; }
      }
      c.s = s;
      c.i = i;
    }
    E.render();
  };
  var mt = 0;
  function $(s) { return document.getElementById(s); }
  function msg(t) {
    var m = $("msg");
    m.textContent = t;
    m.className = "on";
    clearTimeout(mt);
    mt = setTimeout(function () { m.className = ""; }, 1800);
  }
  function go(ph) {
    var e = E.empty(), t;
    if (e) { E.cur.s = e; E.cur.i = 0; E.flash(e); msg("Remplis la case vide"); return; }
    t = E.out();
    if (!t && !ph) { msg("Écris d'abord ta formule"); return; }
    if (window.MSEd) { if (ph) { window.MSEd.phone(t); } else { window.MSEd.done(t); } } else if (E.done) { E.done(t, ph); }
  }
  E.ok = function () { go(false); };
  E.phone = function () { go(true); };
  document.addEventListener("DOMContentLoaded", function () {
    if (/[?&]d=1/.test(location.search)) { document.documentElement.className = "dk"; }
    $("cl").addEventListener("pointerdown", function (ev) { ev.preventDefault(); if (window.MSEd) { window.MSEd.close(); } });
    $("fld").addEventListener("pointerup", E.hit);
    E.buildKeys();
    E.render();
  });
})(window.ED);