const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); 

app.post('/api/solve', async (req, res) => {
    try {
        const { promptText, imageBase64 } = req.body;
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

        if (!GEMINI_API_KEY) {
            return res.status(500).json({ error: "Configuration serveur incomplète : Clé API absente." });
        }

        const systemInstruction = "Tu es un professeur de mathématiques expert. Résous l'exercice fourni de manière complète, rigoureuse et étape par étape en français. N'utilise JAMAIS d'environnements LaTeX multi-lignes comme \\begin{aligned} ou \\end{aligned}. Utilise STRICTEMENT $...$ pour les formules en ligne et $$...$$ pour les équations centrées. S'il n'y a qu'un seul calcul, ne le numérote pas.";
        const userText = promptText || "Résous cet exercice de mathématiques pas à pas de manière détaillée et pédagogique en français.";
        
        let partsArray = [];
        if (imageBase64) {
            partsArray.push({
                "inline_data": {
                    "mime_type": "image/jpeg",
                    "data": imageBase64
                }
            });
        }
        partsArray.push({ "text": userText });

        const requestBody = {
            "system_instruction": { "parts": [{ "text": systemInstruction }] },
            "contents": [{ "parts": partsArray }]
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error ? data.error.message : "Erreur interne API Gemini" });
        }

        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
