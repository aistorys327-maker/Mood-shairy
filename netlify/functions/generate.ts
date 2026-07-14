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
    const { mood, excludeList, language } = JSON.parse(event.body || "{}");
    if (!mood || !mood.trim()) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Pehle apna mood likhiye." }),
      };
    }

    const trimmedInput = mood.trim();
    const ai = getGeminiClient();
    const targetLanguage = (language || "hindi").toLowerCase();

    let exclusionInstruction = "";
    if (excludeList && Array.isArray(excludeList) && excludeList.length > 0) {
      exclusionInstruction = `\n\nCRITICAL DIRECTIVE: Do NOT write, repeat, paraphrase, translate, or copy any of the following previously seen/generated shayari verses:\n` +
        excludeList.slice(-150).map((s: string, idx: number) => `[Seen Shayari ${idx + 1}]:\n${s}`).join("\n---\n") +
        `\nYou must generate completely brand new, unique, and fresh verses that are totally different from the above list.`;
    }

    let languagePrompt = "";
    let sherDescription = "";
    if (targetLanguage === "urdu") {
      languagePrompt = `Generate 5 original Urdu shayaris. Do not repeat any previous shayari. Create fresh, creative, and unique shayaris every time.
Write exactly 5 completely new, unique, and fresh Urdu shayaris matching the specified user mood/feeling/thoughts: "${trimmedInput}". 
Each shayari must be beautifully crafted and emotionally rich, containing exactly 2 to 4 lines.
The primary 'sher' field MUST be written strictly and entirely in beautiful original Urdu Nastaliq script (NOT Devanagari, NOT Hinglish).
For each shayari, provide the following pieces of information:
1. Urdu Nastaliq text (using clean original Urdu Nastaliq script and layout split by newline characters in the 'sher' field).
2. Latin transliteration / Hinglish (representing the Urdu pronunciation cleanly in the 'transliteration' field).
3. Plain English translation capturing the authentic essence and emotional depth of the couplet or verses (in the 'translation' field).
4. Name of the poet (could be Mirza Ghalib, Gulzar, Faiz Ahmed Faiz, Rahat Indori, Allama Iqbal, Bashir Badr, Jaun Elia, or 'Traditional' if anonymous/classical).
5. The associated mood label.`;
      sherDescription = "2 to 4 lines of original Shayari strictly in beautiful Urdu Nastaliq script (Arabic script for Urdu), separated by newlines";
    } else if (targetLanguage === "hinglish") {
      languagePrompt = `Generate 5 original Hinglish shayaris (Hindi/Urdu written in Latin/Roman script). Do not repeat any previous shayari. Create fresh, creative, and unique shayaris every time.
Write exactly 5 completely new, unique, and fresh Hinglish shayaris matching the specified user mood/feeling/thoughts: "${trimmedInput}". 
Each shayari must be beautifully crafted and emotionally rich, containing exactly 2 to 4 lines.
The primary 'sher' field MUST be written strictly and entirely in Latin/Roman script as Hinglish (NOT Devanagari, NOT Urdu Nastaliq script).
For each shayari, provide the following pieces of information:
1. Hinglish text (using clean Latin/Roman script representation of Hindi/Urdu, split by newline characters in the 'sher' field).
2. Latin transliteration / Hinglish (representing the Urdu or Hindi pronunciation cleanly in the 'transliteration' field).
3. Plain English translation capturing the authentic essence and emotional depth of the couplet or verses (in the 'translation' field).
4. Name of the poet (could be Mirza Ghalib, Gulzar, Faiz Ahmed Faiz, Rahat Indori, Allama Iqbal, Bashir Badr, Jaun Elia, or 'Traditional' if anonymous/classical).
5. The associated mood label.`;
      sherDescription = "2 to 4 lines of original Shayari strictly in beautiful Hinglish (Latin/Roman script representing Hindi/Urdu pronunciation), separated by newlines";
    } else {
      // Default: Hindi
      languagePrompt = `Generate 5 original Hindi shayaris. Do not repeat any previous shayari. Create fresh, creative, and unique shayaris every time.
Write exactly 5 completely new, unique, and fresh Hindi shayaris matching the specified user mood/feeling/thoughts: "${trimmedInput}". 
Each shayari must be beautifully crafted and emotionally rich, containing exactly 2 to 4 lines.
The primary 'sher' field MUST be written strictly and entirely in beautiful Devanagari Hindi script (NOT Urdu Nastaliq script, NOT Hinglish).
For each shayari, provide the following pieces of information:
1. Devanagari Hindi text (using clean original Hindi script and layout split by newline characters in the 'sher' field).
2. Latin transliteration / Hinglish (representing the Hindi pronunciation cleanly in the 'transliteration' field).
3. Plain English translation capturing the authentic essence and emotional depth of the couplet or verses (in the 'translation' field).
4. Name of the poet (could be Mirza Ghalib, Gulzar, Faiz Ahmed Faiz, Rahat Indori, Allama Iqbal, Bashir Badr, Jaun Elia, or 'Traditional' if anonymous/classical).
5. The associated mood label.`;
      sherDescription = "2 to 4 lines of original Shayari strictly in beautiful Hindi Devanagari script, separated by newlines";
    }

    const prompt = `${languagePrompt}${exclusionInstruction}`;

    const schemas = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique random string ID for this card" },
          sher: { type: Type.STRING, description: sherDescription },
          transliteration: { type: Type.STRING, description: "Hinglish / Latin transliteration of the shayari" },
          translation: { type: Type.STRING, description: "A highly elegant English translation of the couplet" },
          poet: { type: Type.STRING, description: "Name of the writer/poet, or Traditional" },
          mood: { type: Type.STRING, description: "Short feeling category of the generated poem (e.g., love, sad, motivated, etc.)" }
        },
        required: ["id", "sher", "transliteration", "translation", "poet", "mood"]
      }
    };

    // Try multiple model endpoints to bypass single-model transient high traffic or 503 limits
    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    let responseText = "";
    let generationSuccessful = false;

    for (const modelName of modelsToTry) {
      try {
        console.log(`[Netlify Function] Attempting secure generation with model: ${modelName}`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: schemas,
            temperature: 1.2,
          },
        });

        if (response.text) {
          responseText = response.text;
          generationSuccessful = true;
          console.log(`[Netlify Function] Successfully generated using ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`[Netlify Function] Model ${modelName} returned an error or is unavailable:`, err?.message || err);
      }
    }

    if (generationSuccessful && responseText) {
      const parsedShayaris = JSON.parse(responseText);
      const aiShayaris = parsedShayaris.slice(0, 5).map((s: any) => ({ ...s, isAI: true }));
      
      if (aiShayaris.length > 0) {
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ shayaris: aiShayaris, isOfflineFallback: false }),
        };
      }
    }

    throw new Error("Unable to generate new shayaris from any Gemini AI models on Netlify. Please ensure your GEMINI_API_KEY is correct or try again shortly.");

  } catch (error: any) {
    console.error("[Netlify Function] Critical Generation Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ 
        error: error?.message || "Gemini AI was unable to generate new shayaris on Netlify." 
      }),
    };
  }
};
