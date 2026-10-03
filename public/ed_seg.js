/* MathSolver - formules 6/6 : repere les formules dans un texte et les dessine */
(function (E) {
  "use strict";
  var LT = "A-Za-zÀ-ÖØ-öø-ÿ";
  var STRONG = /[=^_<>≤≥≠±√∫∑∞π×÷→≈∈∉∪∩⇒⇔*+]/;
  var HY = new RegExp("\\d-|-\\d|\\)-|-\\(|\\(-|(^|[^" + LT + "])[A-Za-z]-[A-Za-z]($|[^" + LT + "])");
  var SL = new RegExp("\\d/|/\\d|\\)/|/\\(|(^|[^" + LT + "])[A-Za-z]/[A-Za-z]($|[^" + LT + "])");
  var CALL = /^(?:[A-Za-z]'*|arcsin|arccos|arctan|sin|cos|tan|ln|log|exp|sqrt|lim)\(.+\)$/;
  function cnt(w, c) { return w.split(c).length - 1; }
  function cls(w) {
    if (!w || w.indexOf("\u0001") >= 0 || /\d{1,2}\/\d{1,2}\/\d{2,4}|:\/\/|www\.|@/.test(w)) { return 0; }
    if (STRONG.test(w) || /\|[^|]+\|/.test(w) || CALL.test(w)) { return 2; }
    if (/[-−–]/.test(w) && w.length > 1 && HY.test(w)) { return 2; }
    if (w.indexOf("/") >= 0 && SL.test(w)) { return 2; }
    if (/^[-−–]$/.test(w)) { return 1; }
    if (/^(\d+([.,]\d+)?[%°!]?|[A-Za-zα-ωΑ-Ω]!?|\d+[A-Za-zα-ω]|pi|[ℝℕℤℚℂ]|\([\dA-Za-z.,]+\))$/.test(w)) { return 1; }
    return 0;
  }
  function words(t, a, b) {
    var re = /\S+/g, o = [], m, w, s, e;
    re.lastIndex = a;
    while ((m = re.exec(t)) && m.index < b) {
      w = m[0];
      s = m.index;
      e = Math.min(s + w.length, b);
      w = t.slice(s, e);
      while (/[.,;:?…»”"]$/.test(w)) { w = w.slice(0, -1); }
      while (/^[«“"]/.test(w)) { w = w.slice(1); s++; }
      if (w.slice(-1) === ")" && cnt(w, ")") > cnt(w, "(")) { w = w.slice(0, -1); }
      if (w.charAt(0) === "(" && cnt(w, "(") > cnt(w, ")")) { w = w.slice(1); s++; }
      o.push({ s: s, e: s + w.length, w: w, c: cls(w) });
    }
    o.forEach(function (x, k) {
      if (/^[-−–]$/.test(x.w) && o[k - 1] && o[k + 1] && o[k - 1].c && o[k + 1].c) { x.c = 2; }
    });
    return o;
  }
  E.segs = function (t, a, b, force, cov) {
    var m = t.split(""), out = [], ls = a, le, k, ws, run, sg, x;
    (cov || []).forEach(function (r) { for (k = r[0]; k < r[1] && k < m.length; k++) { m[k] = "\u0001"; } });
    t = m.join("");
    while (ls < b) {
      le = t.indexOf("\n", ls);
      if (le < 0 || le > b) { le = b; }
      ws = words(t, ls, le);
      if (force) {
        if (ws.length && ws.every(function (x) { return x.w.indexOf("\u0001") < 0; })) { out.push([ws[0].s, ws[ws.length - 1].e]); }
      } else {
        run = null;
        sg = false;
        ws.concat([{ c: 0 }]).forEach(function (x) {
          if (x.c) {
            if (!run) { run = [x.s, x.e]; sg = false; }
            run[1] = x.e;
            if (x.c > 1) { sg = true; }
          } else {
            if (run && sg) { out.push(run); }
            run = null;
          }
        });
      }
      ls = le + 1;
    }
    return out;
  };
  window.MSF = {
    run: function (json) {
      var q = JSON.parse(json), sg = E.segs(q.t, q.a, q.b, q.m, q.x), out = [], k = 0, f = window.MSFmt;
      function next() {
        var g, x;
        if (k >= sg.length) { f.res(JSON.stringify(out)); return; }
        g = sg[k++];
        x = q.t.slice(g[0], g[1]);
        E.snap(E.parse(x), { fs: q.fs, r: q.r, mw: q.mw }, function (v) {
          if (v) { out.push({ o: g[0], e: g[1], x: x, b: v.b, a: v.a }); }
          next();
        });
      }
      next();
    }
  };
})(window.ED);