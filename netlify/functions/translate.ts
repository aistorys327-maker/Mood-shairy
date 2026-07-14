import { Handler } from "@netlify/functions";
import { GoogleGenAI, Type } from "@google/genai";

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in Netlify Environment Variables!");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

export const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { text, targetLanguage, poet, mood } = JSON.parse(event.body || "{}");
    if (!text || !text.trim()) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "No text provided for translation." }),
      };
    }
    if (!targetLanguage) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "No target language provided." }),
      };
    }

    const ai = getGeminiClient();
    const targetLang = targetLanguage.toLowerCase();

    let targetDetails = "";
    if (targetLang === "urdu") {
      targetDetails = "beautiful original Urdu script in Nastaliq (Arabic/Persian characters, NOT Devanagari Hindi, NOT Latin/Roman/Hinglish characters)";
    } else if (targetLang === "hinglish") {
      targetDetails = "Hinglish (Hindi/Urdu pronunciation represented in Latin/Roman script, NOT original Hindi script, NOT Urdu Nastaliq script)";
    } else {
      targetDetails = "beautiful Devanagari Hindi script (NOT Urdu Nastaliq, NOT Latin/Roman/Hinglish characters)";
    }

    const prompt = `You are a master poet and translator. Translate the following poetry/shayari into ${targetDetails}.
Maintain exactly the same meaning, emotion, tone, poetic style, and rhythm as the original.
Only replace the poetry language of the text. Do not generate a new poem. Keep the line structure (exactly the same number of lines) identical to the original.

Original poetry:
${text.trim()}

${poet ? `Written in the style of/by poet: ${poet}` : ""}
${mood ? `Matching the mood/emotion: ${mood}` : ""}

Return the translated poetry text inside a JSON object with a single key 'translatedText' containing the translated lines separated by newlines. Do not include any other commentary or explanations.`;

    const schemas = {
      type: Type.OBJECT,
      properties: {
        translatedText: { 
          type: Type.STRING, 
          description: "The translated poetry lines, maintaining exact structure and line breaks, in the target script/language" 
        }
      },
      required: ["translatedText"]
    };

    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let responseText = "";
    let translationSuccessful = false;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: schemas,
            temperature: 0.3,
          },
        });

        if (response.text) {
          responseText = response.text;
          translationSuccessful = true;
          break;
        }
      } catch (err: any) {
        console.warn(`Translation Netlify function model error on ${modelName}:`, err?.message || err);
      }
    }

    if (translationSuccessful && responseText) {
      const parsed = JSON.parse(responseText);
      if (parsed.translatedText) {
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ translatedText: parsed.translatedText }),
        };
      }
    }

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Translation failed." }),
    };

  } catch (error: any) {
    console.error("Translation Netlify Function error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        error: error?.message || "Gemini AI was unable to translate the poetry." 
      }),
    };
  }
};
