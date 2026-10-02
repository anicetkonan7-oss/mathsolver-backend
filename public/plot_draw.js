/* MathSolver - fichier 2/3 : dessin de la courbe (nécessite plot_core.js) */
(function (root) {
  "use strict";

  var C = root.MSCore;
  if (!C) { return; }
  var isNum = C.isNum, fmt = C.fmt, inDomain = C.inDomain;
  var FONT = "Arial, Helvetica, sans-serif";
  var COL = { curve: "#1d4ed8", asym: "#dc2626", asymTxt: "#b91c1c", ext: "#ea580c", zero: "#059669", infl: "#7c3aed", grid: "#e9edf5", axis: "#334155", frame: "#94a3b8", text: "#475569" };

  function niceStep(raw) {
    var p = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), m = raw / p;
    return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
  }

  /* ---------- Textes ---------- */
  function pt(x, y) { return "(" + fmt(x) + " ; " + fmt(y) + ")"; }
  function eqO(o) {
    var s = "y = " + (o.a === 1 ? "x" : o.a === -1 ? "−x" : fmt(o.a) + "x");
    if (o.b > 0) { s += " + " + fmt(o.b); } else if (o.b < 0) { s += " − " + fmt(-o.b); }
    return s;
  }
  function sideTxt(s) { return s === "+" ? " (en +∞)" : s === "-" ? " (en −∞)" : ""; }

  function legendItems(F, name) {
    var it = [{ k: "curve", t: "Courbe de " + name }];
    F.vert.forEach(function (p) { it.push({ k: "dash", t: "Asymptote x = " + fmt(p) }); });
    F.horiz.forEach(function (h) { it.push({ k: "dash", t: "Asymptote y = " + fmt(h.y) + sideTxt(h.side) }); });
    F.obl.forEach(function (o) { it.push({ k: "dash", t: "Asymptote " + eqO(o) + sideTxt(o.side) }); });
    F.ext.forEach(function (e) { it.push({ k: "dot", t: (e.kind === "max" ? "Maximum " : "Minimum ") + pt(e.x, e.y) }); });
    if (F.zeros.length) {
      it.push({ k: "ring", t: F.zeros.length === 1 ? "Zéro : x = " + fmt(F.zeros[0].x) : "Zéros : " + F.zeros.slice(0, 5).map(function (z) { return fmt(z.x); }).join(" ; ") });
    }
    if (F.yint) { it.push({ k: "ring", t: "Axe (Oy) : " + pt(0, F.yint.y) }); }
    F.infl.forEach(function (p) { it.push({ k: "dia", t: "Inflexion " + pt(p.x, p.y) }); });
    return it.slice(0, 14);
  }

  function legendHTML(F, name) {
    function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
    var icons = {
      curve: '<path d="M1 8 Q9 -2 17 5" fill="none" stroke="' + COL.curve + '" stroke-width="2.6" stroke-linecap="round"/>',
      dash: '<line x1="1" y1="5" x2="17" y2="5" stroke="' + COL.asym + '" stroke-width="1.8" stroke-dasharray="4 3"/>',
      dot: '<circle cx="9" cy="5" r="4" fill="' + COL.ext + '" stroke="#fff" stroke-width="1.2"/>',
      ring: '<circle cx="9" cy="5" r="3.4" fill="#fff" stroke="' + COL.zero + '" stroke-width="2"/>',
      dia: '<path d="M9 0.5 L13.5 5 L9 9.5 L4.5 5 z" fill="' + COL.infl + '"/>'
    };
    return legendItems(F, name).map(function (i) {
      return '<span class="ms-chip"><svg width="18" height="10" viewBox="0 0 18 10">' + icons[i.k] + "</svg>" + esc(i.t) + "</span>";
    }).join("");
  }

  /* ---------- Fenêtre d'affichage ---------- */
  function computeView(model, F) {
    var P = [], leftInf = false, rightInf = false, f = model.fns.f;
    model.intervals.forEach(function (an) {
      if (an.error) { return; }
      if (isFinite(an.a)) { P.push(an.a); } else { leftInf = true; }
      if (isFinite(an.b)) { P.push(an.b); } else { rightInf = true; }
    });
    F.ext.forEach(function (e) { P.push(e.x); });
    var x0 = -6, x1 = 6;
    if (P.length) {
      var lo = Math.min.apply(null, P), hi = Math.max.apply(null, P), g = 6 * Math.max(hi - lo, 1);
      F.zeros.concat(F.infl).forEach(function (z) { if (z.x > lo - g && z.x < hi + g) { P.push(z.x); } });
      lo = Math.min.apply(null, P); hi = Math.max.apply(null, P);
      var span = Math.max(hi - lo, 1), padInf = Math.max(3, 0.8 * span), padFin = Math.max(0.6, 0.12 * span);
      x0 = lo - (leftInf ? padInf : padFin);
      x1 = hi + (rightInf ? padInf : padFin);
    }
    var w = x1 - x0;
    if (x0 > 0 && x0 < 0.4 * w) { x0 = -0.04 * w; } else if (x1 < 0 && -x1 < 0.4 * w) { x1 = 0.04 * w; }

    var ys = [], k, N = 800;
    for (k = 0; k <= N; k++) {
      var x = x0 + (x1 - x0) * k / N;
      if (!inDomain(x, model.domain)) { continue; }
      var y = f(x);
      if (isNum(y)) { ys.push(y); }
    }
    ys.sort(function (p, q) { return p - q; });
    var y0 = -1, y1 = 1;
    if (ys.length) { y0 = ys[Math.floor(0.03 * (ys.length - 1))]; y1 = ys[Math.ceil(0.97 * (ys.length - 1))]; }
    if (F.ext.length) {
      var cy = F.ext.map(function (e) { return e.y; }), cmin = Math.min.apply(null, cy), cmax = Math.max.apply(null, cy);
      var maxH = 10 * Math.max(cmax - cmin, 1), mid = (cmin + cmax) / 2;
      if (y1 - y0 > maxH) { y0 = Math.max(y0, mid - maxH / 2); y1 = Math.min(y1, mid + maxH / 2); }
      y0 = Math.min(y0, cmin); y1 = Math.max(y1, cmax);
    }
    if (!(y1 - y0 > 1e-9)) { y0 -= 1; y1 += 1; }
    var extra = [];
    F.horiz.forEach(function (h) { extra.push(h.y); });
    F.infl.forEach(function (p) { extra.push(p.y); });
    if (F.yint) { extra.push(F.yint.y); }
    var hh = y1 - y0;
    extra.forEach(function (v) { if (v > y0 - 0.5 * hh && v < y1 + 0.5 * hh) { y0 = Math.min(y0, v); y1 = Math.max(y1, v); } });
    hh = y1 - y0;
    if (y0 > 0 && y0 < 0.4 * hh) { y0 = -0.04 * hh; } else if (y1 < 0 && -y1 < 0.4 * hh) { y1 = 0.04 * hh; }
    var padY = 0.12 * (y1 - y0);
    return { x0: x0, x1: x1, y0: y0 - padY, y1: y1 + padY };
  }

  /* ---------- Dessin ---------- */
  function drawPlot(ctx, W, H, model, F, opts) {
    opts = opts || {};
    var f = model.fns.f, v = computeView(model, F), L = 46, R = 16, T = 16, B = 30, pw = W - L - R, ph = H - T - B;
    function X(x) { return L + (x - v.x0) / (v.x1 - v.x0) * pw; }
    function Y(y) { return T + (v.y1 - y) / (v.y1 - v.y0) * ph; }
    function seg(x1, y1, x2, y2) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
    function inX(x) { return x > v.x0 && x < v.x1; }
    function inY(y) { return y > v.y0 && y < v.y1; }

    ctx.save();
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, W, H);
    ctx.font = "11px " + FONT;
    var sx = niceStep((v.x1 - v.x0) / 6), sy = niceStep((v.y1 - v.y0) / 5), t, tk;
    ctx.lineWidth = 1; ctx.strokeStyle = COL.grid; ctx.fillStyle = COL.text;
    ctx.textAlign = "center"; ctx.textBaseline = "top";
    for (t = Math.ceil(v.x0 / sx); t * sx <= v.x1; t++) {
      tk = t * sx; seg(X(tk), T, X(tk), T + ph);
      ctx.fillText(fmt(Math.round(tk * 1e6) / 1e6), X(tk), T + ph + 7);
    }
    ctx.textAlign = "right"; ctx.textBaseline = "middle";
    for (t = Math.ceil(v.y0 / sy); t * sy <= v.y1; t++) {
      tk = t * sy; seg(L, Y(tk), L + pw, Y(tk));
      ctx.fillText(fmt(Math.round(tk * 1e6) / 1e6), L - 7, Y(tk));
    }
    ctx.strokeStyle = COL.frame; ctx.lineWidth = 1.2;
    ctx.strokeRect(L + 0.5, T + 0.5, pw, ph);
    ctx.save();
    ctx.beginPath(); ctx.rect(L, T, pw, ph); ctx.clip();

    /* axes avec flèches */
    var ax = v.x0 < 0 && v.x1 > 0, ay = v.y0 < 0 && v.y1 > 0;
    ctx.strokeStyle = COL.axis; ctx.fillStyle = COL.axis; ctx.lineWidth = 1.6;
    ctx.font = "italic 12px " + FONT; ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    if (ax) {
      seg(X(0), T, X(0), T + ph);
      ctx.beginPath(); ctx.moveTo(X(0), T + 1); ctx.lineTo(X(0) - 3.5, T + 9); ctx.lineTo(X(0) + 3.5, T + 9); ctx.closePath(); ctx.fill();
      ctx.fillText("y", X(0) + 8, T + 13);
    }
    if (ay) {
      seg(L, Y(0), L + pw, Y(0));
      ctx.beginPath(); ctx.moveTo(L + pw - 1, Y(0)); ctx.lineTo(L + pw - 9, Y(0) - 3.5); ctx.lineTo(L + pw - 9, Y(0) + 3.5); ctx.closePath(); ctx.fill();
      ctx.fillText("x", L + pw - 14, Y(0) + 16);
    }
    if (ax && ay) { ctx.fillText("O", X(0) - 12, Y(0) + 14); }

    /* asymptotes */
    ctx.strokeStyle = COL.asym; ctx.lineWidth = 1.5; ctx.setLineDash([7, 5]);
    F.vert.forEach(function (p) { if (inX(p)) { seg(X(p), T, X(p), T + ph); } });
    F.horiz.forEach(function (h) { if (inY(h.y)) { seg(L, Y(h.y), L + pw, Y(h.y)); } });
    F.obl.forEach(function (o) { seg(X(v.x0), Y(o.a * v.x0 + o.b), X(v.x1), Y(o.a * v.x1 + o.b)); });
    ctx.setLineDash([]);

    /* courbe */
    var xs = [], k, N = Math.max(500, Math.round(pw * 2));
    for (k = 0; k <= N; k++) { xs.push(v.x0 + (v.x1 - v.x0) * k / N); }
    model.intervals.forEach(function (an) {
      if (an.error) { return; }
      [[an.a, 1], [an.b, -1]].forEach(function (e) {
        if (!isFinite(e[0])) { return; }
        for (var j = 2; j <= 9; j++) { xs.push(e[0] + e[1] * Math.pow(10, -j) * Math.max(1, Math.abs(e[0]))); }
      });
    });
    xs.sort(function (p, q) { return p - q; });
    ctx.strokeStyle = COL.curve; ctx.lineWidth = 2.6; ctx.lineJoin = "round"; ctx.lineCap = "round";
    var pen = false, prevY = 0, curvePts = [];
    ctx.beginPath();
    xs.forEach(function (x) {
      var y = x >= v.x0 && x <= v.x1 && inDomain(x, model.domain) ? f(x) : NaN;
      if (!isNum(y)) { pen = false; return; }
      if (pen && Math.abs(y - prevY) > 3 * (v.y1 - v.y0)) { pen = false; }
      if (pen) { ctx.lineTo(X(x), Y(y)); } else { ctx.moveTo(X(x), Y(y)); pen = true; }
      if (inY(y)) { curvePts.push([X(x), Y(y)]); }
      prevY = y;
    });
    ctx.stroke();

    /* bornes ouvertes ou fermées */
    model.intervals.forEach(function (an) {
      if (an.error) { return; }
      [0, an.pts.length - 1].forEach(function (i) {
        var p = an.pts[i], val = an.vals[i];
        if (!val || !isFinite(p) || val.t !== "val" || !inX(p) || !inY(val.v)) { return; }
        var closed = i === 0 ? an.ca : an.cb;
        ctx.beginPath(); ctx.arc(X(p), Y(val.v), 4.2, 0, 2 * Math.PI);
        ctx.fillStyle = closed ? COL.curve : "#ffffff"; ctx.fill();
        ctx.strokeStyle = COL.curve; ctx.lineWidth = 2; ctx.stroke();
      });
    });

    /* points remarquables */
    function ring(x, y, col) {
      ctx.beginPath(); ctx.arc(X(x), Y(y), 4.6, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffffff"; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.stroke();
    }
    F.ext.forEach(function (e) {
      if (!inX(e.x) || !inY(e.y)) { return; }
      ctx.strokeStyle = COL.ext; ctx.lineWidth = 1.6; seg(X(e.x) - 20, Y(e.y), X(e.x) + 20, Y(e.y));
      ctx.beginPath(); ctx.arc(X(e.x), Y(e.y), 5, 0, 2 * Math.PI);
      ctx.fillStyle = COL.ext; ctx.fill(); ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.6; ctx.stroke();
    });
    F.zeros.forEach(function (z) { if (inX(z.x)) { ring(z.x, 0, COL.zero); } });
    if (F.yint && inY(F.yint.y)) { ring(0, F.yint.y, COL.zero); }
    F.infl.forEach(function (p) {
      if (!inX(p.x) || !inY(p.y)) { return; }
      var cx = X(p.x), cy = Y(p.y);
      ctx.beginPath(); ctx.moveTo(cx, cy - 6); ctx.lineTo(cx + 6, cy); ctx.lineTo(cx, cy + 6); ctx.lineTo(cx - 6, cy); ctx.closePath();
      ctx.fillStyle = COL.infl; ctx.fill(); ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.4; ctx.stroke();
    });

    /* étiquettes (sans chevauchement : si la place manque, l'étiquette est omise, la légende donne l'info) */
    var boxes = [];
    function markerBox(x, y) { boxes.push({ x: X(x) - 7, y: Y(y) - 7, w: 14, h: 14 }); }
    F.ext.forEach(function (e) { if (inX(e.x) && inY(e.y)) { markerBox(e.x, e.y); } });
    F.zeros.forEach(function (z) { if (inX(z.x)) { markerBox(z.x, 0); } });
    F.infl.forEach(function (p) { if (inX(p.x) && inY(p.y)) { markerBox(p.x, p.y); } });
    if (F.yint && inY(F.yint.y)) { markerBox(0, F.yint.y); }
    if (ax) { boxes.push({ x: X(0) + 7, y: T + 2, w: 12, h: 15 }); }
    if (ay) { boxes.push({ x: L + pw - 16, y: Y(0) + 3, w: 14, h: 16 }); }
    if (ax && ay) { boxes.push({ x: X(0) - 14, y: Y(0) + 3, w: 14, h: 16 }); }
    function overlaps(b) {
      return boxes.some(function (o) { return b.x < o.x + o.w && b.x + b.w > o.x && b.y < o.y + o.h && b.y + b.h > o.y; });
    }
    function hitsCurve(b) {
      return curvePts.some(function (p) { return p[0] > b.x - 2 && p[0] < b.x + b.w + 2 && p[1] > b.y - 2 && p[1] < b.y + b.h + 2; });
    }
    function label(text, px, py, col, order, must) {
      ctx.font = "bold 11px " + FONT;
      var w = ctx.measureText(text).width + 2, h = 13;
      var cand = { RU: [8, -h - 5], LU: [-w - 8, -h - 5], RD: [8, 5], LD: [-w - 8, 5], U: [-w / 2, -h - 9], D: [-w / 2, 9], R: [9, -h / 2], L: [-w - 9, -h / 2] };
      var tries = order.map(function (o) {
        var c = cand[o], b = { x: px + c[0], y: py + c[1], w: w, h: h };
        b.x = Math.max(L + 3, Math.min(L + pw - w - 3, b.x));
        b.y = Math.max(T + 3, Math.min(T + ph - h - 3, b.y));
        return b;
      });
      var pick = tries.filter(function (b) { return !overlaps(b) && !hitsCurve(b); })[0] ||
        tries.filter(function (b) { return !overlaps(b); })[0] || (must ? tries[0] : null);
      if (!pick) { return false; }
      boxes.push(pick);
      ctx.textAlign = "left"; ctx.textBaseline = "top"; ctx.lineJoin = "round";
      ctx.lineWidth = 4; ctx.strokeStyle = "#ffffff"; ctx.strokeText(text, pick.x, pick.y + 1);
      ctx.fillStyle = col; ctx.fillText(text, pick.x, pick.y + 1);
      return true;
    }
    F.vert.forEach(function (p) {
      if (!inX(p)) { return; }
      [T + 22, T + ph * 0.5, T + ph - 28].some(function (py) { return label("x = " + fmt(p), X(p), py, COL.asymTxt, ["RD", "LD", "R", "L"]); });
    });
    F.horiz.forEach(function (h) {
      if (!inY(h.y)) { return; }
      var txt = "y = " + fmt(h.y);
      label(txt, L + pw - 4, Y(h.y), COL.asymTxt, ["LU", "LD"]) || label(txt, L + 50, Y(h.y), COL.asymTxt, ["RU", "RD"]);
    });
    F.obl.forEach(function (o) {
      [0.85, 0.7, 0.55, 0.4, 0.25].some(function (u) {
        var x = v.x0 + u * (v.x1 - v.x0), y = o.a * x + o.b;
        return Y(y) > T + 16 && Y(y) < T + ph - 16 && label(eqO(o), X(x), Y(y), COL.asymTxt, ["LU", "RD", "LD", "RU"]);
      });
    });
    F.ext.forEach(function (e) {
      if (inX(e.x) && inY(e.y)) { label(pt(e.x, e.y), X(e.x), Y(e.y), COL.ext, e.kind === "max" ? ["U", "RU", "LU", "D"] : ["D", "RD", "LD", "U"], true); }
    });
    F.infl.forEach(function (p) {
      if (inX(p.x) && inY(p.y)) { label(pt(p.x, p.y), X(p.x), Y(p.y), COL.infl, ["RD", "LD", "RU", "LU", "D", "U"]); }
    });
    F.zeros.forEach(function (z) {
      if (inX(z.x)) { label("x = " + fmt(z.x), X(z.x), Y(0), COL.zero, ["RD", "RU", "LD", "LU", "D", "U"]); }
    });
    if (F.yint && inY(F.yint.y)) { label(pt(0, F.yint.y), X(0), Y(F.yint.y), COL.zero, ["RU", "RD", "LU", "LD"]); }

    /* point de lecture (toucher la courbe) */
    var m = opts.mark;
    if (m && inX(m.x)) {
      ctx.strokeStyle = "#64748b"; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
      seg(X(m.x), T, X(m.x), T + ph);
      if (isNum(m.y) && inY(m.y)) {
        seg(L, Y(m.y), L + pw, Y(m.y));
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(X(m.x), Y(m.y), 5.5, 0, 2 * Math.PI);
        ctx.fillStyle = COL.curve; ctx.fill(); ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2; ctx.stroke();
      }
      ctx.setLineDash([]);
      var txt = "x = " + fmt(m.x) + "   " + (opts.name || "f") + "(x) = " + (isNum(m.y) ? fmt(m.y) : "non défini");
      ctx.font = "bold 12px " + FONT;
      var tw = ctx.measureText(txt).width + 16;
      ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fillRect(L + 6, T + 6, tw, 22);
      ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 1; ctx.strokeRect(L + 6.5, T + 6.5, tw, 22);
      ctx.fillStyle = "#0f172a"; ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.fillText(txt, L + 14, T + 17.5);
    }
    ctx.restore();
    ctx.restore();
    return { L: L, T: T, pw: pw, ph: ph, v: v };
  }

  root.MSDraw = { computeView: computeView, drawPlot: drawPlot, legendHTML: legendHTML, legendItems: legendItems };
})(typeof window !== "undefined" ? window : globalThis);