const MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash"];
const THINKING_LEVEL = "low"; // "minimal", "low", "medium", "high", ou "" pour ne rien imposer
const TOTAL_BUDGET_MS = 22000;

const CONSIGNE =
  "Tu es un professeur de mathématiques. Réponds en français, de façon claire et concise. " +
  "Structure STRICTEMENT ta réponse ainsi : pour chaque étape, une ligne qui commence par @@ETAPE suivie du titre court de l'étape (sans numéro), " +
  "puis le détail du calcul (texte et formules). " +
  "Termine par une ligne qui commence par @@REPONSE suivie directement de la réponse finale (sans écrire le mot Réponse). " +
  "N'écris rien avant la première étape : pas d'introduction ni de conclusion. " +
  "Écris les formules en LaTeX entre $...$ (dans une phrase) ou $$...$$ (sur une ligne seule). " +
  "N'utilise pas de titres avec #. Vérifie ton résultat avant de répondre.";

async function askGemini(model, parts, thinking, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const generationConfig = {};
    if (thinking) {
      generationConfig.thinkingConfig = { thinkingLevel: thinking };
    }
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent",
      {
        method: "POST",
        headers: {
          "x-goog-api-key": process.env.GEMINI_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: CONSIGNE }] },
          contents: [{ parts }],
          generationConfig,
        }),
        signal: controller.signal,
      }
    );
    const data = await r.json().catch(() => ({}));
    return { status: r.status, data };
  } catch (e) {
    return { status: e && e.name === "AbortError" ? 408 : 0, data: {} };
  } finally {
    clearTimeout(timer);
  }
}

function extractText(data) {
  const parts = (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
  return parts
    .filter((p) => p.text && !p.thought)
    .map((p) => p.text)
    .join("");
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
    { text: "Exercice : " + (promptText || "voir la photo ci-jointe") },
  ];
  if (imageBase64) {
    parts.push({ inline_data: { mime_type: "image/jpeg", data: imageBase64 } });
  }

  const start = Date.now();
  let lastStatus = 0;

  for (const model of MODELS) {
    let remaining = TOTAL_BUDGET_MS - (Date.now() - start);
    if (remaining < 4000) break;

    let result = await askGemini(model, parts, THINKING_LEVEL, remaining);

    if (result.status === 400 && THINKING_LEVEL) {
      remaining = TOTAL_BUDGET_MS - (Date.now() - start);
      if (remaining < 4000) {
        lastStatus = 400;
        break;
      }
      result = await askGemini(model, parts, "", remaining);
    }

    lastStatus = result.status;
    const text = extractText(result.data);
    if (result.status === 200 && text) {
      return res.status(200).json({ answer: text });
    }
    if (result.status === 408) break;
  }

  let message = "Une erreur est survenue. Réessaie dans un instant.";
  if (lastStatus === 408) {
    message = "La réponse est trop longue à produire. Essaie une question plus courte, ou découpe l'exercice en plusieurs parties.";
  } else if (lastStatus === 503) {
    message = "Le service d'IA est très sollicité en ce moment. Réessaie dans quelques secondes.";
  } else if (lastStatus === 429) {
    message = "La limite d'utilisation gratuite est atteinte pour le moment. Réessaie dans quelques minutes.";
  }
  return res.status(200).json({ answer: message });
}