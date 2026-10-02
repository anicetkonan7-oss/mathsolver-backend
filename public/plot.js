/* MathSolver - fichier 2/2 : courbe, tableau de variation, affichage (nécessite plot_core.js) */
(function (root) {
  "use strict";

  var C = root.MSCore;
  if (!C) {
    root.MathSolverPlot = { renderInto: function () { throw new Error("plot_core.js n'est pas chargé complètement."); } };
    return;
  }
  var uid = 0;
  var isNum = C.isNum, fmt = C.fmt, fmtVal = C.fmtVal, inDomain = C.inDomain;
  var analyzeFunction = C.analyze, intervalLabel = C.intervalLabel;

  /* ---------- Tableau de variation (SVG) ---------- */
  function tableSVG(an, name) {
    var LABELW = 64, COLW = 104, n = an.pts.length, W = LABELW + n * COLW, H = 164;
    var yHigh = 92, yLow = 140, id = "msah" + (++uid);
    var HALO = ' stroke="#ffffff" stroke-width="7" paint-order="stroke" stroke-linejoin="round"';
    function cx(i) { return LABELW + COLW * (i + 0.5); }
    function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
    var o = [];
    o.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H + '" width="' + W + '" height="' + H + '" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="#1c2333">');
    o.push('<defs><marker id="' + id + '" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#1c2333"/></marker></defs>');
    o.push('<rect x="0.75" y="0.75" width="' + (W - 1.5) + '" height="' + (H - 1.5) + '" fill="#ffffff" stroke="#1c2333" stroke-width="1.5"/>');
    o.push('<line x1="0" y1="34" x2="' + W + '" y2="34" stroke="#1c2333" stroke-width="1.2"/>');
    o.push('<line x1="0" y1="68" x2="' + W + '" y2="68" stroke="#1c2333" stroke-width="1.2"/>');
    o.push('<line x1="' + LABELW + '" y1="0" x2="' + LABELW + '" y2="' + H + '" stroke="#1c2333" stroke-width="1.2"/>');
    o.push('<text x="' + LABELW / 2 + '" y="23" text-anchor="middle" font-style="italic">x</text>');
    o.push('<text x="' + LABELW / 2 + '" y="56" text-anchor="middle" font-style="italic">' + esc(name) + "′(x)</text>");
    o.push('<text x="' + LABELW / 2 + '" y="121" text-anchor="middle" font-style="italic">' + esc(name) + "(x)</text>");
    var i;
    for (i = 1; i < n - 1; i++) {
      o.push('<line x1="' + cx(i) + '" y1="34" x2="' + cx(i) + '" y2="' + H + '" stroke="#8a94ad" stroke-width="1" stroke-dasharray="4 3"/>');
    }
    for (i = 0; i < n; i++) {
      o.push('<text x="' + cx(i) + '" y="23" text-anchor="middle">' + fmt(an.pts[i]) + "</text>");
    }
    for (i = 1; i < n - 1; i++) {
      o.push('<text x="' + cx(i) + '" y="56" text-anchor="middle"' + HALO + '>0</text>');
    }
    for (i = 0; i < n - 1; i++) {
      var s = an.signs[i], mx = (cx(i) + cx(i + 1)) / 2;
      o.push('<text x="' + mx + '" y="58" text-anchor="middle" font-size="22" font-weight="bold">' + (s > 0 ? "+" : s < 0 ? "−" : "?") + "</text>");
    }
    var ys = [];
    for (i = 0; i < n; i++) {
      var left = i > 0 ? an.signs[i - 1] : 0, right = i < n - 1 ? an.signs[i] : 0, high;
      if (i === 0) { high = right < 0; }
      else if (i === n - 1) { high = left > 0; }
      else { high = left > 0; if (left === 0) { high = right < 0; } }
      ys.push(left === 0 && right === 0 ? 116 : (high ? yHigh : yLow));
    }
    for (i = 0; i < n; i++) {
      o.push('<text x="' + cx(i) + '" y="' + (ys[i] + 5) + '" text-anchor="middle"' + HALO + '>' + fmtVal(an.vals[i]) + "</text>");
    }
    for (i = 0; i < n - 1; i++) {
      var s2 = an.signs[i], x1 = cx(i) + 26, x2 = cx(i + 1) - 26, y1, y2;
      if (s2 > 0) { y1 = yLow - 12; y2 = yHigh + 14; }
      else if (s2 < 0) { y1 = yHigh + 14; y2 = yLow - 12; }
      else { y1 = 116; y2 = 116; }
      o.push('<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#1c2333" stroke-width="1.7" marker-end="url(#' + id + ')"/>');
    }
    o.push("</svg>");
    return o.join("");
  }

  /* ---------- Courbe (canvas) ---------- */
  function niceStep(raw) {
    var p = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), m = raw / p;
    return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
  }

  function computeView(model) {
    var P = [], leftInf = false, rightInf = false, crit = [];
    model.intervals.forEach(function (an) {
      if (an.error) { return; }
      if (isFinite(an.a)) { P.push(an.a); } else { leftInf = true; }
      if (isFinite(an.b)) { P.push(an.b); } else { rightInf = true; }
      for (var i = 1; i < an.pts.length - 1; i++) {
        P.push(an.pts[i]);
        var v = model.fns.f(an.pts[i]);
        if (isNum(v)) { crit.push({ x: an.pts[i], y: v }); }
      }
    });
    var x0, x1;
    if (!P.length) { x0 = -6; x1 = 6; }
    else {
      var lo = Math.min.apply(null, P), hi = Math.max.apply(null, P), span = Math.max(hi - lo, 1);
      var padInf = Math.max(3, 0.8 * span), padFin = Math.max(0.6, 0.12 * span);
      x0 = lo - (leftInf ? padInf : padFin);
      x1 = hi + (rightInf ? padInf : padFin);
    }
    var ys = [], k, N = 800;
    for (k = 0; k <= N; k++) {
      var x = x0 + (x1 - x0) * k / N;
      if (!inDomain(x, model.domain)) { continue; }
      var y = model.fns.f(x);
      if (isNum(y)) { ys.push(y); }
    }
    ys.sort(function (p, q) { return p - q; });
    var y0, y1;
    if (ys.length) {
      y0 = ys[Math.floor(0.03 * (ys.length - 1))];
      y1 = ys[Math.ceil(0.97 * (ys.length - 1))];
    } else { y0 = -1; y1 = 1; }
    if (crit.length) {
      var cmin = Math.min.apply(null, crit.map(function (c) { return c.y; }));
      var cmax = Math.max.apply(null, crit.map(function (c) { return c.y; }));
      var crange = Math.max(cmax - cmin, 0.5), maxH = 14 * crange, mid = (cmin + cmax) / 2;
      if (y1 - y0 > maxH) { y0 = Math.max(y0, mid - maxH / 2); y1 = Math.min(y1, mid + maxH / 2); }
      y0 = Math.min(y0, cmin); y1 = Math.max(y1, cmax);
    }
    if (!(y1 - y0 > 1e-9)) { y0 -= 1; y1 += 1; }
    var padY = 0.12 * (y1 - y0);
    return { x0: x0, x1: x1, y0: y0 - padY, y1: y1 + padY, crit: crit };
  }

  function drawPlot(ctx, W, H, model) {
    var v = computeView(model), L = 44, R = 12, T = 12, B = 26;
    var pw = W - L - R, ph = H - T - B;
    function X(x) { return L + (x - v.x0) / (v.x1 - v.x0) * pw; }
    function Y(y) { return T + (v.y1 - y) / (v.y1 - v.y0) * ph; }
    ctx.save();
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, W, H);
    ctx.font = "11px Arial, Helvetica, sans-serif";
    var sx = niceStep((v.x1 - v.x0) / 6), sy = niceStep((v.y1 - v.y0) / 5), t, tk;
    ctx.lineWidth = 1; ctx.strokeStyle = "#e4e8f1"; ctx.fillStyle = "#5b6784";
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    for (t = Math.ceil(v.x0 / sx); t * sx <= v.x1; t++) {
      tk = t * sx;
      ctx.beginPath(); ctx.moveTo(X(tk), T); ctx.lineTo(X(tk), T + ph); ctx.stroke();
      ctx.fillText(fmt(Math.round(tk * 1e6) / 1e6), X(tk), T + ph + 6);
    }
    ctx.textAlign = "right"; ctx.textBaseline = "middle";
    for (t = Math.ceil(v.y0 / sy); t * sy <= v.y1; t++) {
      tk = t * sy;
      ctx.beginPath(); ctx.moveTo(L, Y(tk)); ctx.lineTo(L + pw, Y(tk)); ctx.stroke();
      ctx.fillText(fmt(Math.round(tk * 1e6) / 1e6), L - 6, Y(tk));
    }
    ctx.strokeStyle = "#8a94ad"; ctx.lineWidth = 1.3;
    ctx.strokeRect(L, T, pw, ph);
    ctx.beginPath(); ctx.rect(L, T, pw, ph); ctx.clip();
    ctx.strokeStyle = "#5b6784"; ctx.lineWidth = 1.6;
    if (v.x0 < 0 && v.x1 > 0) { ctx.beginPath(); ctx.moveTo(X(0), T); ctx.lineTo(X(0), T + ph); ctx.stroke(); }
    if (v.y0 < 0 && v.y1 > 0) { ctx.beginPath(); ctx.moveTo(L, Y(0)); ctx.lineTo(L + pw, Y(0)); ctx.stroke(); }
    ctx.strokeStyle = "#e0a3a3"; ctx.lineWidth = 1.4; ctx.setLineDash([6, 4]);
    model.intervals.forEach(function (an) {
      if (an.error) { return; }
      var last = an.pts.length - 1;
      [0, last].forEach(function (idx) {
        var p = an.pts[idx], val = an.vals[idx];
        if (!val) { return; }
        if (isFinite(p) && val.t === "inf") {
          ctx.beginPath(); ctx.moveTo(X(p), T); ctx.lineTo(X(p), T + ph); ctx.stroke();
        } else if (!isFinite(p) && val.t === "val") {
          ctx.beginPath(); ctx.moveTo(L, Y(val.v)); ctx.lineTo(L + pw, Y(val.v)); ctx.stroke();
        }
      });
    });
    ctx.setLineDash([]);
    ctx.strokeStyle = "#1a6bff"; ctx.lineWidth = 2.4; ctx.lineJoin = "round"; ctx.lineCap = "round";
    var N = Math.max(400, Math.round(pw * 1.5)), pen = false, prevY = 0, k;
    ctx.beginPath();
    for (k = 0; k <= N; k++) {
      var x = v.x0 + (v.x1 - v.x0) * k / N, y = inDomain(x, model.domain) ? model.fns.f(x) : NaN;
      if (!isNum(y)) { pen = false; continue; }
      if (pen && Math.abs(y - prevY) > 3 * (v.y1 - v.y0)) { pen = false; }
      if (pen) { ctx.lineTo(X(x), Y(y)); } else { ctx.moveTo(X(x), Y(y)); pen = true; }
      prevY = y;
    }
    ctx.stroke();
    ctx.fillStyle = "#e03a3a";
    v.crit.forEach(function (c) { ctx.beginPath(); ctx.arc(X(c.x), Y(c.y), 4, 0, 2 * Math.PI); ctx.fill(); });
    ctx.restore();
  }

  /* ---------- Affichage dans la page ---------- */
  function injectCss() {
    if (!root.document || root.document.getElementById("ms-css")) { return; }
    var st = root.document.createElement("style");
    st.id = "ms-css";
    st.textContent =
      ".ms-card{margin:10px 12px;background:#fff;border:1px solid #d5dbe8;border-radius:14px;padding:12px 14px;font-family:sans-serif;color:#222}" +
      ".ms-ttl{font-size:16px;font-weight:bold;color:#1c2333;margin:0 0 8px}" +
      ".ms-sub{font-size:14px;font-weight:bold;color:#1c2333;margin:14px 0 6px}" +
      ".ms-canvas{display:block;width:100%;border:1px solid #e4e8f1;border-radius:10px;background:#fff}" +
      ".ms-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}" +
      ".ms-note{font-size:12px;color:#5b6784;margin-top:6px}" +
      ".ms-warn{font-size:13px;color:#8a4b00;background:#fff4e0;border:1px solid #f0c987;border-radius:8px;padding:6px 8px;margin-top:8px}";
    root.document.head.appendChild(st);
  }

  function fitSvg(box) {
    var svg = box.firstChild;
    if (!svg || !svg.getAttribute) { return; }
    var W = Number(svg.getAttribute("width")), H = Number(svg.getAttribute("height")), avail = box.clientWidth;
    if (!(W > 0) || !(avail > 0) || avail >= W) { return; }
    var k = Math.max(0.78, avail / W);
    svg.setAttribute("width", String(Math.round(W * k)));
    svg.setAttribute("height", String(Math.round(H * k)));
  }

  var redraws = [];
  function renderInto(container, funcs) {
    injectCss();
    var doc = root.document;
    funcs.forEach(function (fn) {
      var name = fn.name || "f", card = doc.createElement("div");
      card.className = "ms-card";
      var title = doc.createElement("div");
      title.className = "ms-ttl";
      title.textContent = "Étude de " + name + " : courbe et tableau de variation";
      card.appendChild(title);
      container.appendChild(card);
      try {
        var model = analyzeFunction(fn.expr, fn.domain);
        var cv = doc.createElement("canvas");
        cv.className = "ms-canvas";
        card.appendChild(cv);
        var draw = function () {
          var w = Math.max(240, cv.parentNode.clientWidth - 30 || 320), h = Math.round(Math.min(300, Math.max(210, w * 0.68)));
          var dpr = root.devicePixelRatio || 1;
          cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
          cv.style.height = h + "px";
          var ctx = cv.getContext("2d");
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          drawPlot(ctx, w, h, model);
        };
        draw.cv = cv;
        draw();
        redraws.push(draw);
        var warn = false, shown = 0;
        model.intervals.forEach(function (an, idx) {
          var sub = doc.createElement("div");
          sub.className = "ms-sub";
          sub.textContent = "Tableau de variation de " + name + " sur " + intervalLabel(model.domain[idx]);
          card.appendChild(sub);
          if (an.error) {
            var er = doc.createElement("div"); er.className = "ms-warn"; er.textContent = an.error; card.appendChild(er);
            return;
          }
          var sc = doc.createElement("div");
          sc.className = "ms-scroll";
          sc.innerHTML = tableSVG(an, name);
          card.appendChild(sc);
          fitSvg(sc);
          shown++;
          if (an.warn) { warn = true; }
        });
        var note = doc.createElement("div");
        note.className = "ms-note";
        note.textContent = "Valeurs calculées par l'appli et arrondies à 0,001. Compare-les avec ta résolution.";
        card.appendChild(note);
        if (warn) {
          var w2 = doc.createElement("div");
          w2.className = "ms-warn";
          w2.textContent = "L'expression n'est pas définie partout sur le domaine indiqué : vérifie le domaine.";
          card.appendChild(w2);
        }
      } catch (e) {
        var ne = doc.createElement("div");
        ne.className = "ms-warn";
        ne.textContent = "Courbe indisponible pour cette fonction (expression non reconnue).";
        card.appendChild(ne);
      }
    });
  }

  var API = {
    analyze: analyzeFunction, tableSVG: tableSVG, drawPlot: drawPlot, computeView: computeView,
    renderInto: renderInto, parseDomain: C.parseDomain, normalizeExpr: C.normalizeExpr, fmt: fmt
  };

  if (typeof module !== "undefined" && module.exports) { module.exports = API; }
  root.MathSolverPlot = API;

  if (root.document) {
    root.addEventListener("resize", function () {
      redraws = redraws.filter(function (d) { return d.cv && d.cv.isConnected; });
      redraws.forEach(function (d) { try { d(); } catch (e) {} });
    });
    var run = function () {
      var box = root.document.getElementById("extras");
      if (!box || !root.MS_FUNCS || !root.MS_FUNCS.length) { return; }
      if (!root.math) {
        box.innerHTML = '<div class="ms-card" style="font-family:sans-serif;font-size:14px;color:#5b6784">Courbes indisponibles : vérifie ta connexion internet.</div>';
        return;
      }
      renderInto(box, root.MS_FUNCS);
    };
    if (root.document.readyState === "loading") { root.document.addEventListener("DOMContentLoaded", run); } else { run(); }
  }
})(typeof window !== "undefined" ? window : globalThis);