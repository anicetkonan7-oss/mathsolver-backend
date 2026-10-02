const MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash"];

async function askGemini(model, parts) {
  const r = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent",
    {
      method: "POST",
      headers: {
        "x-goog-api-key": process.env.GEMINI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents: [{ parts }] }),
    }
  );
  const data = await r.json().catch(() => ({}));
  return { status: r.status, data };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST uniquement" });
  }

  const { promptText, imageBase64 } = req.body || {};
  if (!promptText && !imageBase64) {
    return res.status(400).json({ error: "Question manquante" });
  }

  const parts = [
    {
      text: "Résous étape par étape, en français : " + (promptText || "l'exercice de la photo"),
    },
  ];
  if (imageBase64) {
    parts.push({ inline_data: { mime_type: "image/jpeg", data: imageBase64 } });
  }

  let lastStatus = 0;
  for (const model of MODELS) {
    try {
      const { status, data } = await askGemini(model, parts);
      lastStatus = status;
      const text = (data?.candidates?.[0]?.content?.parts || [])
        .map((p) => p.text || "")
        .join("");
      if (status === 200 && text) {
        return res.status(200).json({ answer: text });
      }
    } catch (e) {
      lastStatus = 0;
    }
  }

  let message = "Une erreur est survenue. Réessaie dans un instant.";
  if (lastStatus === 503) {
    message = "Le service d'IA est très sollicité en ce moment. Réessaie dans quelques secondes.";
  } else if (lastStatus === 429) {
    message = "La limite d'utilisation gratuite est atteinte pour le moment. Réessaie dans quelques minutes.";
  }
  return res.status(200).json({ answer: message });
}