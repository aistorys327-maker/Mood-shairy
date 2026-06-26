import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { DEFAULT_SHAYARIS } from "./src/data";

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

// Offline intelligent fallback to matching classical masterpieces if Gemini is down or key is missing
const getOfflineFallbackShayaris = (userMood: string): any[] => {
  const normalizedInput = userMood.toLowerCase().trim();
  
  // 1. Map typical keywords/synonyms to our categories
  let targetCategory = "";
  if (normalizedInput.includes("love") || normalizedInput.includes("pyar") || normalizedInput.includes("pyaar") || normalizedInput.includes("ishq") || normalizedInput.includes("romance") || normalizedInput.includes("romantic") || normalizedInput.includes("dil") || normalizedInput.includes("mohabbat")) {
    targetCategory = "love";
  } else if (normalizedInput.includes("sad") || normalizedInput.includes("dard") || normalizedInput.includes("tanhai") || normalizedInput.includes("breakup") || normalizedInput.includes("broken") || normalizedInput.includes("hurt") || normalizedInput.includes("pain") || normalizedInput.includes("lonely") || normalizedInput.includes("alone")) {
    targetCategory = "sad";
  } else if (normalizedInput.includes("attitude") || normalizedInput.includes("tevar") || normalizedInput.includes("style") || normalizedInput.includes("swag") || normalizedInput.includes("king") || normalizedInput.includes("ghuroor")) {
    targetCategory = "attitude";
  } else if (normalizedInput.includes("motivation") || normalizedInput.includes("motivational") || normalizedInput.includes("success") || normalizedInput.includes("inspire") || normalizedInput.includes("himmat") || normalizedInput.includes("determination") || normalizedInput.includes("koshish")) {
    targetCategory = "motivational";
  } else if (normalizedInput.includes("friend") || normalizedInput.includes("friendship") || normalizedInput.includes("dost") || normalizedInput.includes("yaari") || normalizedInput.includes("dosti") || normalizedInput.includes("yaar")) {
    targetCategory = "friendship";
  } else if (normalizedInput.includes("funny") || normalizedInput.includes("laugh") || normalizedInput.includes("joke") || normalizedInput.includes("comedy") || normalizedInput.includes("masti")) {
    targetCategory = "funny";
  }

  // 2. Score all available shayaris based on category and word matching
  const inputWords = normalizedInput.split(/\s+/).filter(w => w.length > 2);
  
  const scored = DEFAULT_SHAYARIS.map(s => {
    let score = 0;
    
    // Category match is highest priority
    if (targetCategory && s.mood === targetCategory) {
      score += 15;
    } else if (s.mood === normalizedInput) {
      score += 20;
    }
    
    // Check for word matches in text fields
    for (const word of inputWords) {
      if (s.mood.toLowerCase().includes(word)) score += 5;
      if (s.transliteration.toLowerCase().includes(word)) score += 3;
      if (s.translation.toLowerCase().includes(word)) score += 2;
      if (s.sher.toLowerCase().includes(word)) score += 3;
    }
    
    return { ...s, score };
  });

  // 3. Filter and sort by score descending, then select 5 items
  const matched = scored.filter(s => s.score > 0);
  let selected: any[] = [];
  
  if (matched.length >= 3) {
    matched.sort((b, a) => a.score - b.score);
    const pool = matched.slice(0, 10);
    // Shuffle the top pool slightly to keep responses fresh and dynamic
    selected = pool.sort(() => 0.5 - Math.random()).slice(0, 5);
  } else {
    // Return a beautiful dynamic random selection
    selected = [...DEFAULT_SHAYARIS].sort(() => 0.5 - Math.random()).slice(0, 5);
  }

  // 4. Return formatted shayaris matching the exact schema
  return selected.map(s => ({
    id: `fallback-${s.id}-${Math.random().toString(36).substring(2, 7)}`,
    sher: s.sher,
    transliteration: s.transliteration,
    translation: s.translation,
    poet: s.poet,
    mood: s.mood,
    isAI: false
  }));
};

// API Endpoint to generate 5 beautiful Hindi/Urdu shayaris based on user mood (100% Pure Gemini AI)
app.post("/api/generate", async (req, res) => {
  const { mood, excludeList } = req.body;
  if (!mood || !mood.trim()) {
    return res.status(400).json({ error: "Pehle apna mood likhiye." });
  }

  const trimmedInput = mood.trim();

  try {
    const ai = getGeminiClient();

    let exclusionInstruction = "";
    if (excludeList && Array.isArray(excludeList) && excludeList.length > 0) {
      exclusionInstruction = `\n\nCRITICAL DIRECTIVE: Do NOT write, repeat, paraphrase, translate, or copy any of the following previously seen/generated shayari verses:\n` +
        excludeList.slice(-150).map((s: string, idx: number) => `[Seen Shayari ${idx + 1}]:\n${s}`).join("\n---\n") +
        `\nYou must generate completely brand new, unique, and fresh verses that are totally different from the above list.`;
    }

    const prompt = `Generate 5 original Hindi shayaris. Do not repeat any previous shayari. Create fresh, creative, and unique shayaris every time.
Write exactly 5 completely new, unique, and fresh Hindi or Urdu shayaris matching the specified user mood/feeling/thoughts: "${trimmedInput}". 
Each shayari must be beautifully crafted and emotionally rich, containing exactly 2 to 4 lines.
For each shayari, provide the following pieces of information:
1. Devanagari Hindi text (using clean original Hindi script and layout split by newline characters).
2. Latin transliteration / Hinglish (representing the Urdu or Hindi pronunciation cleanly).
3. Plain English translation capturing the authentic essence and emotional depth of the couplet or verses.
4. Name of the poet (could be Mirza Ghalib, Gulzar, Faiz Ahmed Faiz, Rahat Indori, Allama Iqbal, Bashir Badr, Jaun Elia, or 'Traditional' if anonymous/classical).
5. The associated mood label.${exclusionInstruction}`;

    const schemas = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique random string ID for this card" },
          sher: { type: Type.STRING, description: "2 to 4 lines of original Shayari in beautiful Hindi Devanagari script, separated by newlines" },
          transliteration: { type: Type.STRING, description: "Hinglish / Latin transliteration of the Hindi script" },
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
      }
    }

    if (generationSuccessful && responseText) {
      const parsedShayaris = JSON.parse(responseText);
      const aiShayaris = parsedShayaris.slice(0, 5).map((s: any) => ({ ...s, isAI: true }));
      
      if (aiShayaris.length > 0) {
        return res.json({ shayaris: aiShayaris, isOfflineFallback: false });
      }
    }

    // Fall back to local curated masterpieces if model generation failed or returned empty
    console.log("Gemini model generation failed or empty. Resorting to premium curated offline fallback...");
    const fallbackShayaris = getOfflineFallbackShayaris(trimmedInput);
    return res.json({ shayaris: fallbackShayaris, isOfflineFallback: true });

  } catch (error: any) {
    console.error("Critical Generation Error (Initiating Graceful Offline Fallback):", error);
    try {
      const fallbackShayaris = getOfflineFallbackShayaris(trimmedInput);
      return res.json({ shayaris: fallbackShayaris, isOfflineFallback: true });
    } catch (fallbackError) {
      console.error("Failed to generate offline fallback:", fallbackError);
      return res.status(500).json({ 
        error: "Gemini AI was unable to generate new shayaris and local fallback failed. Please verify your API key and try again in a moment." 
      });
    }
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
