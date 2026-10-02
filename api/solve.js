export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST uniquement" });
  }
  const { promptText, imageBase64 } = req.body || {};
  if (!promptText && !imageBase64) {
    return res.status(400).json({ error: "Question manquante" });
  }
  const parts = [{
    text: "Résous étape par étape, en français : " + (promptText || "l'exercice de la photo"),
  }];
  if (imageBase64) {
    parts.push({ inline_data: { mime_type: "image/jpeg", data: imageBase64 } });
  }
  const r = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
    {
      method: "POST",
      headers: {
        "x-goog-api-key": process.env.GEMINI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: [{ parts }] }),
    }
  );
  const data = await r.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
    || "Erreur : " + JSON.stringify(data.error || data);
  res.status(200).json({ answer: text });
}