// MathSolver - /api/account : comptes (Firebase Auth) et profil (Firestore)
// Variables à créer sur Vercel : FIREBASE_API_KEY et FIREBASE_PROJECT_ID
const AUTH = process.env.FB_AUTH_BASE || "https://identitytoolkit.googleapis.com/v1/";
const TOKEN = process.env.FB_TOKEN_BASE || "https://securetoken.googleapis.com/v1/token";
const STORE = process.env.FB_STORE_BASE || "https://firestore.googleapis.com/v1/";
const MAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const KNOWN = ["EMAIL_EXISTS", "INVALID_LOGIN_CREDENTIALS", "WEAK_PASSWORD", "TOO_MANY_ATTEMPTS_TRY_LATER", "INVALID_EMAIL", "USER_DISABLED", "CREDENTIAL_TOO_OLD_LOGIN_AGAIN", "TOKEN_EXPIRED", "INVALID_ID_TOKEN", "INVALID_REFRESH_TOKEN", "USER_NOT_FOUND"];
const COLS = ["saved"];
const key = () => process.env.FIREBASE_API_KEY || "";
const pid = () => process.env.FIREBASE_PROJECT_ID || "";
const root = () => STORE + "projects/" + encodeURIComponent(pid()) + "/databases/(default)/documents/users/";

async function call(url, opt) {
 const ctl = new AbortController();
 const timer = setTimeout(() => ctl.abort(), 15000);
 try {
  const r = await fetch(url, Object.assign({ signal: ctl.signal }, opt));
  let j = {};
  try { j = await r.json(); } catch (e) {}
  return { ok: r.ok, status: r.status, j };
 } catch (e) {
  return { ok: false, status: 0, j: {} };
 } finally {
  clearTimeout(timer);
 }
}
function post(path, body, extra) {
 return call(AUTH + path + "?key=" + encodeURIComponent(key()), {
  method: "POST",
  headers: Object.assign({ "Content-Type": "application/json" }, extra || {}),
  body: JSON.stringify(body),
 });
}
function fail(r) {
 if (!r.status) return { err: "net" };
 const m = String((r.j.error && r.j.error.message) || "");
 if (m.indexOf("INVALID_PASSWORD") === 0 || m.indexOf("EMAIL_NOT_FOUND") === 0) return { err: "INVALID_LOGIN_CREDENTIALS" };
 for (const k of KNOWN) if (m.indexOf(k) === 0) return { err: k };
 if (r.status === 401) return { err: "TOKEN_EXPIRED" };
 if (r.status === 403) return { err: "DENIED" };
 return { err: "server" };
}
const sess = (j) => ({ uid: j.localId || j.user_id, t: j.idToken || j.id_token, rt: j.refreshToken || j.refresh_token, exp: Number(j.expiresIn || j.expires_in) || 3600 });
const bearer = (t) => ({ Authorization: "Bearer " + t, "Content-Type": "application/json" });
const uid = (s) => encodeURIComponent(String(s || "").slice(0, 128));

function clean(p) {
 const o = {};
 if (!p || typeof p !== "object") return o;
 for (const k of Object.keys(p).slice(0, 40)) {
  const v = p[k];
  if (k.length > 8 || !/^\w+$/.test(k)) continue;
  if (typeof v === "string") o[k] = v.slice(0, 200);
  else if (typeof v === "number" && isFinite(v)) o[k] = v;
  else if (typeof v === "boolean") o[k] = v;
 }
 return o;
}
async function getProfile(u, t) {
 const r = await call(root() + uid(u), { headers: bearer(t) });
 if (r.status === 404) return { p: null };
 if (!r.ok) return fail(r);
 const f = r.j.fields && r.j.fields.profile && r.j.fields.profile.stringValue;
 let p = null;
 try { p = f ? JSON.parse(f) : null; } catch (e) {}
 return { p };
}
async function putProfile(u, t, p) {
 const c = clean(p);
 const r = await call(root() + uid(u) + "?updateMask.fieldPaths=profile&updateMask.fieldPaths=up", {
  method: "PATCH",
  headers: bearer(t),
  body: JSON.stringify({ fields: { profile: { stringValue: JSON.stringify(c) }, up: { integerValue: String(Date.now()) } } }),
 });
 return r.ok ? { ok: 1, p: c } : fail(r);
}
async function wipe(u, t) {
 for (const c of COLS) {
  const l = await call(root() + uid(u) + "/" + c + "?pageSize=300", { headers: bearer(t) });
  for (const d of (l.j && l.j.documents) || []) await call(STORE + d.name, { method: "DELETE", headers: bearer(t) });
 }
 await call(root() + uid(u), { method: "DELETE", headers: bearer(t) });
}
async function run(b) {
 const email = String(b.email || "").trim().toLowerCase();
 const pw = String(b.password || "");
 const a = b.a;
 if (a === "up" || a === "in" || a === "del") {
  if (!MAIL.test(email)) return { err: "INVALID_EMAIL" };
  if (a === "up" && (pw.length < 6 || pw.length > 128)) return { err: "WEAK_PASSWORD" };
  const r = await post(a === "up" ? "accounts:signUp" : "accounts:signInWithPassword", { email, password: pw, returnSecureToken: true });
  if (!r.ok) return fail(r);
  const s = sess(r.j);
  if (a === "up") {
   const w = b.p ? await putProfile(s.uid, s.t, b.p) : { p: null };
   return { s, p: w.p || null, warn: w.err || "" };
  }
  if (a === "in") {
   const g = await getProfile(s.uid, s.t);
   return { s, p: g.p || null, warn: g.err || "" };
  }
  await wipe(s.uid, s.t);
  const d = await post("accounts:delete", { idToken: s.t });
  return d.ok ? { ok: 1 } : fail(d);
 }
 if (a === "rf") {
  const r = await call(TOKEN + "?key=" + encodeURIComponent(key()), {
   method: "POST",
   headers: { "Content-Type": "application/x-www-form-urlencoded" },
   body: "grant_type=refresh_token&refresh_token=" + encodeURIComponent(String(b.rt || "")),
  });
  return r.ok ? { s: sess(r.j) } : fail(r);
 }
 if (a === "fg") {
  if (!MAIL.test(email)) return { err: "INVALID_EMAIL" };
  const r = await post("accounts:sendOobCode", { requestType: "PASSWORD_RESET", email }, { "X-Firebase-Locale": b.l === "en" ? "en" : "fr" });
  const e = r.ok ? {} : fail(r);
  return e.err === "net" || e.err === "TOO_MANY_ATTEMPTS_TRY_LATER" ? e : { ok: 1 };
 }
 if (a === "gp" && b.t) return getProfile(b.u, String(b.t));
 if (a === "pp" && b.t) return putProfile(b.u, String(b.t), b.p);
 return { err: "bad" };
}
export default async function handler(req, res) {
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
 res.setHeader("Access-Control-Allow-Headers", "Content-Type");
 res.setHeader("Cache-Control", "no-store");
 if (req.method === "OPTIONS") return res.status(204).end();
 const cfg = !!(key() && pid());
 if (req.method === "GET") return res.status(200).json({ ok: true, cfg });
 if (req.method !== "POST") return res.status(405).json({ err: "bad" });
 if (!cfg) return res.status(200).json({ err: "cfg" });
 let out;
 try {
  out = await run(req.body && typeof req.body === "object" ? req.body : {});
 } catch (e) {
  out = { err: "server" };
 }
 return res.status(200).json(out);
}