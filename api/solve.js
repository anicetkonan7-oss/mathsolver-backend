export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST uniquement" });
  }
  const question = req.body && req.body.question;
  if (!question) {
    return res.status(400).json({ error: "Question manquante" });
  }
  const r = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
    {
      method: "POST",
      headers: {
        "x-goog-api-key": process.env.GEMINI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Résous étape par étape, en français : " + question }] }],
      }),
    }
  );
  const data = await r.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur";
  res.status(200).json({ answer: text });
}