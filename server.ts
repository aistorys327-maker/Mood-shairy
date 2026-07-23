import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini SDK helper to ensure robust startup
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in Settings > Secrets!");
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

// Helper function to detect and parse rate limit / quota exceeded errors from Gemini API
function parseRateLimitError(err: any) {
  if (!err) return { isRateLimit: false, retryAfterSeconds: null, fullError: null };

  const status = err.status || err.statusCode || err.response?.status || err.response?.statusCode;
  const msg = typeof err.message === "string" ? err.message : JSON.stringify(err);
  const msgLower = msg.toLowerCase();

  const is429Status = status === 429;
  const isRateLimitMsg =
    msgLower.includes("429") ||
    msgLower.includes("resource_exhausted") ||
    msgLower.includes("quota") ||
    msgLower.includes("rate limit") ||
    msgLower.includes("too many requests");

  const isRateLimit = is429Status || isRateLimitMsg;

  let retryAfterSeconds: number | null = null;

  if (isRateLimit) {
    // 1. Check response headers for Retry-After
    const retryHeader = err.response?.headers?.get?.("retry-after") ||
                        err.response?.headers?.["retry-after"] ||
                        err.headers?.["retry-after"] ||
                        err.headers?.get?.("retry-after");

    if (retryHeader) {
      const parsed = parseInt(String(retryHeader), 10);
      if (!isNaN(parsed) && parsed > 0) {
        retryAfterSeconds = parsed;
      }
    }

    // 2. Check for retryAfter in error body or message pattern
    if (!retryAfterSeconds && msg) {
      const match = msg.match(/retry\s+(?:in|after)\s+(\d+)\s*s?/i) || msg.match(/reset\s+(?:in|after)\s+(\d+)\s*s?/i);
      if (match && match[1]) {
        const secs = parseInt(match[1], 10);
        if (!isNaN(secs) && secs > 0) {
          retryAfterSeconds = secs;
        }
      }
    }

    if (!retryAfterSeconds && typeof err.retryAfterSeconds === "number" && err.retryAfterSeconds > 0) {
      retryAfterSeconds = err.retryAfterSeconds;
    }
  }

  return {
    isRateLimit,
    retryAfterSeconds: retryAfterSeconds || null,
    fullError: err
  };
}

// API Endpoint to generate 5 beautiful Hindi/Urdu shayaris based on user mood (100% Pure Gemini AI)
app.post("/api/generate", async (req, res) => {
  try {
    const { mood, excludeList, language } = req.body;
    if (!mood || !mood.trim()) {
      return res.status(400).json({ error: "Pehle apna mood likhiye." });
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
    let rateLimitInfo: { isRateLimit: boolean; retryAfterSeconds: number | null; fullError: any } | null = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting secure generation with model: ${modelName}`);
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
          console.log(`Successfully generated using ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} returned an error or is unavailable:`, err?.message || err);
        const rl = parseRateLimitError(err);
        if (rl.isRateLimit) {
          rateLimitInfo = rl;
        }
      }
    }

    if (generationSuccessful && responseText) {
      const parsedShayaris = JSON.parse(responseText);
      const aiShayaris = parsedShayaris.slice(0, 5).map((s: any) => ({ ...s, isAI: true }));
      
      if (aiShayaris.length > 0) {
        return res.json({ shayaris: aiShayaris, isOfflineFallback: false });
      }
    }

    if (rateLimitInfo && rateLimitInfo.isRateLimit) {
      console.error("Gemini API Rate Limit / Quota Exceeded (429):", rateLimitInfo.fullError);
      return res.status(429).json({
        error: "AI is temporarily busy",
        isRateLimit: true,
        retryAfterSeconds: rateLimitInfo.retryAfterSeconds,
        details: rateLimitInfo.fullError?.message || "RESOURCE_EXHAUSTED"
      });
    }

    throw new Error("Unable to generate new shayaris from any Gemini AI models. Please try again shortly.");

  } catch (error: any) {
    const rl = parseRateLimitError(error);
    if (rl.isRateLimit) {
      console.error("Critical Gemini API Rate Limit Error (429):", error);
      return res.status(429).json({
        error: "AI is temporarily busy",
        isRateLimit: true,
        retryAfterSeconds: rl.retryAfterSeconds,
        details: error?.message || "RESOURCE_EXHAUSTED"
      });
    }
    console.error("Critical Generation Error:", error);
    return res.status(500).json({ 
      error: "Gemini AI was unable to generate new shayaris. Please try again in a moment." 
    });
  }
});

// API Endpoint to translate an existing shayari to a target language instantly using Gemini 3.5
app.post("/api/translate", async (req, res) => {
  try {
    const { text, targetLanguage, poet, mood } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "No text provided for translation." });
    }
    if (!targetLanguage) {
      return res.status(400).json({ error: "No target language provided." });
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
    let rateLimitInfo: { isRateLimit: boolean; retryAfterSeconds: number | null; fullError: any } | null = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting translation using model: ${modelName}`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: schemas,
            temperature: 0.3, // Lower temperature to keep the exact meaning and tone
          },
        });

        if (response.text) {
          responseText = response.text;
          translationSuccessful = true;
          console.log(`Successfully translated using ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.warn(`Translation Model ${modelName} returned an error:`, err?.message || err);
        const rl = parseRateLimitError(err);
        if (rl.isRateLimit) {
          rateLimitInfo = rl;
        }
      }
    }

    if (translationSuccessful && responseText) {
      const parsed = JSON.parse(responseText);
      if (parsed.translatedText) {
        return res.json({ translatedText: parsed.translatedText });
      }
    }

    if (rateLimitInfo && rateLimitInfo.isRateLimit) {
      console.error("Gemini API Translation Rate Limit Exceeded (429):", rateLimitInfo.fullError);
      return res.status(429).json({
        error: "AI is temporarily busy",
        isRateLimit: true,
        retryAfterSeconds: rateLimitInfo.retryAfterSeconds,
        details: rateLimitInfo.fullError?.message || "RESOURCE_EXHAUSTED"
      });
    }

    throw new Error("Unable to translate using Gemini AI models.");

  } catch (error: any) {
    const rl = parseRateLimitError(error);
    if (rl.isRateLimit) {
      console.error("Translation Rate Limit Error (429):", error);
      return res.status(429).json({
        error: "AI is temporarily busy",
        isRateLimit: true,
        retryAfterSeconds: rl.retryAfterSeconds,
        details: error?.message || "RESOURCE_EXHAUSTED"
      });
    }
    console.error("Translation Error:", error);
    return res.status(500).json({ 
      error: "Gemini AI was unable to translate the poetry." 
    });
  }
});

// Ensure public/assets/card_styles directory exists and serve it statically
const publicCardStylesDir = path.join(process.cwd(), "public", "assets", "card_styles");
const distCardStylesDir = path.join(process.cwd(), "dist", "assets", "card_styles");

if (!fs.existsSync(publicCardStylesDir)) {
  fs.mkdirSync(publicCardStylesDir, { recursive: true });
}

app.use("/assets/card_styles", express.static(publicCardStylesDir));
if (fs.existsSync(distCardStylesDir)) {
  app.use("/assets/card_styles", express.static(distCardStylesDir));
}

// API Endpoint to scan and list all card styles from the directory dynamically
app.get("/api/card-styles", (req, res) => {
  try {
    const publicFiles = fs.existsSync(publicCardStylesDir) ? fs.readdirSync(publicCardStylesDir) : [];
    const distFiles = fs.existsSync(distCardStylesDir) ? fs.readdirSync(distCardStylesDir) : [];
    const uniqueFiles = Array.from(new Set([...publicFiles, ...distFiles]));

    const validExtensions = [".webp", ".png", ".jpg", ".jpeg"];
    const cardStyles = uniqueFiles
      .filter((file) => validExtensions.includes(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
      .map((file) => `/assets/card_styles/${file}`);

    return res.json({ cardStyles });
  } catch (error: any) {
    console.error("Error reading card styles folder:", error);
    return res.status(500).json({ error: "Failed to scan card styles directory.", cardStyles: [] });
  }
});

// Setup Vite Development middleware or static folder serving
async function initializeServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

initializeServer().catch((error) => {
  console.error("Failed to initialize full-stack server:", error);
});
