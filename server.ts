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

// Search classical default catalog as a safe fallback
function getOfflineFallbackShayaris(inputMood: string) {
  const normalized = inputMood.toLowerCase().trim();
  let matchedMood = "love";

  if (/\b(love|romantic|romance|pyar|pyaar|mohabbat|ishq|dil|heart|beloved|girlfriend|boyfriend|lover|yaar|shadi|sweet|affection)\b/.test(normalized)) {
    matchedMood = "love";
  } else if (/\b(sad|lonely|alone|breakup|cry|pain|hurt|grief|sorrow|tear|tears|broken|heartbreak|dard|gam|tanhai|miserable|blue|depressed)\b/.test(normalized)) {
    matchedMood = "sad";
  } else if (/\b(attitude|style|swag|king|queen|pride|self|ego|killer|angry|royal|tevar|khuddari|bold|proud|boss)\b/.test(normalized)) {
    matchedMood = "attitude";
  } else if (/\b(motivate|motivation|inspire|inspiring|success|hope|dream|dreams|hardwork|hard|work|struggle|focus|goal|power|achieve|courage|h हौसला|h हौसले|win|strength)\b/.test(normalized)) {
    matchedMood = "motivational";
  } else if (/\b(friend|friends|friendship|dost|dosti|yaar|yaari|companion|brother|sis|sister|buddies|buddy|pal|pals)\b/.test(normalized)) {
    matchedMood = "friendship";
  } else if (/\b(funny|laugh|joke|jokes|comedy|smile|humor|masti|fun|funny|hilarious|sarcastic|mock|tickle|entertainment)\b/.test(normalized)) {
    matchedMood = "funny";
  } else {
    // Direct Hindi script matching
    const directKeywords = {
      love: ["प्यार", "मोहब्बत", "इश्क", "दिल", "रोमांचक"],
      sad: ["दर्द", "तन्हाई", "अकेला", "आंसू", "उदासी", "ग़म", "गम"],
      attitude: ["तेवर", "अकड़", "नखरे", "रुतबा", "attitude", "swag"],
      motivational: ["हौसला", "उम्मीद", "मेहनत", "लक्ष्य", "मंजिल", "सफलता"],
      friendship: ["दोस्ती", "दोस्त", "यारी", "मित्र"],
      funny: ["मजाक", "हंसना", "चुटकुला", "मस्ती", "funny"]
    };

    let found = false;
    for (const [moodKey, list] of Object.entries(directKeywords)) {
      if (list.some(word => normalized.includes(word))) {
        matchedMood = moodKey;
        found = true;
        break;
      }
    }

    if (!found) {
      const moods = ["love", "sad", "attitude", "motivational", "friendship", "funny"];
      const charCodeSum = Array.from(normalized).reduce((acc, char) => acc + char.charCodeAt(0), 0);
      matchedMood = moods[charCodeSum % moods.length];
    }
  }

  // Filter and return exactly 5 shayaris
  return DEFAULT_SHAYARIS.filter(s => s.mood === matchedMood).slice(0, 5);
}

// API Endpoint to generate 5 beautiful Hindi/Urdu shayaris based on user mood (3 AI + 2 Classic)
app.post("/api/generate", async (req, res) => {
  try {
    const { mood } = req.body;
    if (!mood || !mood.trim()) {
      return res.status(400).json({ error: "Pehle apna mood likhiye." });
    }

    const ai = getGeminiClient();
    const prompt = `Write exactly 3 unique Hindi or Urdu shayaris matching the specified user mood/feeling/thoughts: "${mood}". 
Each shayari must be beautifully crafted and emotionally rich, containing exactly 2 to 4 lines.
For each shayari, provide the following pieces of information:
1. Devanagari Hindi text (using clean original Hindi script and layout split by newline characters).
2. Latin transliteration / Hinglish (representing the Urdu or Hindi pronunciation cleanly).
3. Plain English translation capturing the authentic essence and emotional depth of the couplet or verses.
4. Name of the poet (could be Mirza Ghalib, Gulzar, Faiz Ahmed Faiz, Rahat Indori, Allama Iqbal, Bashir Badr, Jaun Elia, or 'Traditional' if anonymous/classical).
5. The associated mood label.`;

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
    const modelsToTry = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-2.5-flash"];
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
          },
        });

        if (response.text) {
          responseText = response.text;
          generationSuccessful = true;
          console.log(`Successfully generated using ${modelName}`);
          break;
        }
      } catch (err: any) {
        console.log(`Model ${modelName} is busy or unavailable. trying next...`);
      }
    }

    if (generationSuccessful && responseText) {
      const parsedShayaris = JSON.parse(responseText);
      const aiShayaris = parsedShayaris.slice(0, 3).map((s: any) => ({ ...s, isAI: true }));
      
      const classicalPool = getOfflineFallbackShayaris(mood);
      let classicShayaris = classicalPool.slice(0, 2).map((s: any) => ({ ...s, isAI: false }));
      
      if (classicShayaris.length < 2) {
        const extraNeeded = 2 - classicShayaris.length;
        const extra = DEFAULT_SHAYARIS.slice(0, extraNeeded).map((s: any) => ({ ...s, isAI: false }));
        classicShayaris = [...classicShayaris, ...extra];
      }

      const combined = [...aiShayaris, ...classicShayaris];
      return res.json({ shayaris: combined, isOfflineFallback: false });
    }

    // Fail-safe graceful fallback to pre-crafted traditional gems under extreme backend loads
    console.warn("API was unavailable. Activating premium classical offline generator fallback.");
    const fallbackShayaris = getOfflineFallbackShayaris(mood).map((s: any) => ({ ...s, isAI: false }));
    return res.json({ 
      shayaris: fallbackShayaris, 
      isOfflineFallback: true,
      notice: "Classical classical library served successfully due to high model traffic." 
    });

  } catch (error: any) {
    console.error("Critical Generation Error:", error);
    // Absolute fallback so the server never drops the request or crashes
    try {
      const fallbackShayaris = getOfflineFallbackShayaris(req.body?.mood || "love").map((s: any) => ({ ...s, isAI: false }));
      return res.json({
        shayaris: fallbackShayaris,
        isOfflineFallback: true,
        notice: "Served classical literary archives. Beautifully crafted."
      });
    } catch (fallbackErr) {
      return res.status(500).json({ 
        error: "Failed to generate beautiful shayaris. Please try again later." 
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
