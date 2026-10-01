export default async function handler(req, res) {
    // 1. Autoriser les requêtes (CORS)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée. Utilisez POST.' });
    }

    try {
        // 2. Extraction stricte des données envoyées par l'app (nommage corrigé)
        const { promptText, imageBase64 } = req.body;

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'Configuration serveur incomplète : Clé API absente.' });
        }

        const systemInstruction = "Tu es un professeur de mathématiques expert. Résous l'exercice fourni de manière complète, rigoureuse et étape par étape en français. Utilise du texte simple pour les explications, et encadre obligatoirement TOUTES les expressions mathématiques, équations et formules avec le symbole $ (par exemple : $x = 2$, ou $y = ax + b$). Ne fais jamais de liste à puces pour les étapes de calcul. Va à la ligne pour chaque étape.";
        const userText = promptText || 'Résous cet exercice de mathématiques pas à pas en détaillant chaque étape en français.';

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

        const reqBody = {
            "system_instruction": {
                "parts": [{ "text": systemInstruction }]
            },
            "contents": [{ "parts": partsArray }]
        };

        // 3. Appel de l'API Google Gemini
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqBody)
        });

        const data = await response.json();

        if (!response.ok) {
             return res.status(response.status).json({ error: data.error ? data.error.message : 'Erreur API externe.' });
        }

        // 4. Renvoi de la réponse à l'application
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

