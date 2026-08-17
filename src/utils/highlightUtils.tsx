import React from "react";
import { HighlightPhrase } from "../types";
export type { HighlightPhrase };

export interface HighlightColorOption {
  id: string;
  name: string;
  colorHex: string;
  textClass: string;
  bgClass: string;
  category?: "warm" | "vibrant" | "cool" | "classic" | "neutral";
}

// 22 Curated High-Impact Accent Colors
export const HIGHLIGHT_COLORS: HighlightColorOption[] = [
  // Warm & Passionate (Reds, Corals, Pinks, Magentas)
  { id: "red", name: "Red", colorHex: "#EF4444", textClass: "text-red-500 font-bold", bgClass: "bg-red-500", category: "warm" },
  { id: "dark-red", name: "Dark Red", colorHex: "#991B1B", textClass: "text-red-800 font-bold", bgClass: "bg-red-800", category: "warm" },
  { id: "coral", name: "Coral", colorHex: "#F43F5E", textClass: "text-rose-500 font-bold", bgClass: "bg-rose-500", category: "warm" },
  { id: "pink", name: "Pink", colorHex: "#EC4899", textClass: "text-pink-500 font-bold", bgClass: "bg-pink-500", category: "warm" },
  { id: "magenta", name: "Magenta", colorHex: "#D946EF", textClass: "text-fuchsia-500 font-bold", bgClass: "bg-fuchsia-500", category: "warm" },
  { id: "rose-gold", name: "Rose Gold", colorHex: "#FB7185", textClass: "text-rose-400 font-bold", bgClass: "bg-rose-400", category: "warm" },

  // Vibrant & Energetic (Oranges, Golds, Yellows)
  { id: "orange", name: "Orange", colorHex: "#F97316", textClass: "text-orange-500 font-bold", bgClass: "bg-orange-500", category: "vibrant" },
  { id: "golden-yellow", name: "Golden Yellow", colorHex: "#F59E0B", textClass: "text-amber-500 font-bold", bgClass: "bg-amber-500", category: "vibrant" },
  { id: "gold", name: "Gold", colorHex: "#FBBF24", textClass: "text-amber-400 font-bold", bgClass: "bg-amber-400", category: "vibrant" },
  { id: "yellow", name: "Yellow", colorHex: "#EAB308", textClass: "text-yellow-500 font-bold", bgClass: "bg-yellow-500", category: "vibrant" },
  { id: "bronze", name: "Bronze", colorHex: "#B45309", textClass: "text-amber-700 font-bold", bgClass: "bg-amber-700", category: "vibrant" },

  // Cool & Serene (Greens, Emeralds, Teals, Limes)
  { id: "green", name: "Green", colorHex: "#22C55E", textClass: "text-green-500 font-bold", bgClass: "bg-green-500", category: "cool" },
  { id: "emerald", name: "Emerald", colorHex: "#10B981", textClass: "text-emerald-500 font-bold", bgClass: "bg-emerald-500", category: "cool" },
  { id: "teal", name: "Teal", colorHex: "#14B8A6", textClass: "text-teal-500 font-bold", bgClass: "bg-teal-500", category: "cool" },
  { id: "lime", name: "Lime", colorHex: "#84CC16", textClass: "text-lime-500 font-bold", bgClass: "bg-lime-500", category: "cool" },

  // Majestic & Ocean Blues
  { id: "blue", name: "Blue", colorHex: "#3B82F6", textClass: "text-blue-500 font-bold", bgClass: "bg-blue-500", category: "cool" },
  { id: "royal-blue", name: "Royal Blue", colorHex: "#1D4ED8", textClass: "text-blue-700 font-bold", bgClass: "bg-blue-700", category: "cool" },
  { id: "cyan", name: "Cyan", colorHex: "#06B6D4", textClass: "text-cyan-500 font-bold", bgClass: "bg-cyan-500", category: "cool" },

  // Royal & Classic Purples
  { id: "purple", name: "Purple", colorHex: "#A855F7", textClass: "text-purple-500 font-bold", bgClass: "bg-purple-500", category: "classic" },
  { id: "violet", name: "Violet", colorHex: "#8B5CF6", textClass: "text-violet-500 font-bold", bgClass: "bg-violet-500", category: "classic" },

  // Elegant Neutrals & Monochromes
  { id: "charcoal", name: "Charcoal", colorHex: "#1E293B", textClass: "text-slate-800 font-bold", bgClass: "bg-slate-800", category: "neutral" },
  { id: "white", name: "White", colorHex: "#FFFFFF", textClass: "text-white font-bold", bgClass: "bg-white", category: "neutral" },
];

export function resolveHighlightHex(colorIdOrHex?: string, fallback = "#EF4444"): string {
  if (!colorIdOrHex) return fallback;
  if (colorIdOrHex.startsWith("#") || colorIdOrHex.startsWith("rgb")) return colorIdOrHex;
  const match = HIGHLIGHT_COLORS.find(c => c.id === colorIdOrHex);
  return match ? match.colorHex : fallback;
}

export function getMoodDefaultAccentColor(mood?: string): string {
  if (!mood) return "#EF4444";
  const m = mood.toLowerCase().trim();
  if (m.includes("love") || m.includes("romantic")) return "#EF4444"; // Red
  if (m.includes("sad") || m.includes("broken") || m.includes("pain") || m.includes("alone") || m.includes("emotional")) return "#3B82F6"; // Blue
  if (m.includes("motivat") || m.includes("inspire") || m.includes("attitude") || m.includes("royal") || m.includes("power") || m.includes("success")) return "#F97316"; // Orange
  if (m.includes("nature") || m.includes("rain") || m.includes("islamic")) return "#10B981"; // Emerald Green
  if (m.includes("friend") || m.includes("dosti") || m.includes("life")) return "#F59E0B"; // Golden Amber
  if (m.includes("funny") || m.includes("comedy")) return "#D946EF"; // Magenta
  return "#EF4444";
}

// Mood-based vibrant accent color palettes designed for pristine readability and social-media quote cards
export const MOOD_COLOR_PALETTES: Record<string, string[]> = {
  love: ["#EF4444", "#F43F5E", "#EC4899", "#F97316"],         // Red, Coral, Pink, Orange
  romantic: ["#EF4444", "#F43F5E", "#EC4899", "#F59E0B"],     // Red, Coral, Pink, Gold
  sad: ["#3B82F6", "#8B5CF6", "#64748B", "#F97316"],          // Blue, Violet, Slate, Rust
  emotional: ["#3B82F6", "#8B5CF6", "#F43F5E", "#F59E0B"],    // Blue, Violet, Coral, Gold
  broken: ["#EF4444", "#991B1B", "#8B5CF6", "#3B82F6"],       // Red, Dark Red, Violet, Blue
  alone: ["#3B82F6", "#8B5CF6", "#64748B", "#F59E0B"],        // Blue, Purple, Muted Gray, Gold
  pain: ["#EF4444", "#991B1B", "#3B82F6", "#F97316"],         // Red, Dark Crimson, Blue, Orange
  funny: ["#F59E0B", "#F97316", "#22C55E", "#D946EF"],        // Gold, Orange, Green, Magenta
  comedy: ["#F59E0B", "#F97316", "#22C55E", "#D946EF"],       // Gold, Orange, Green, Magenta
  motivational: ["#F97316", "#F59E0B", "#EF4444", "#10B981"],  // Orange, Gold, Red, Emerald
  inspire: ["#F97316", "#F59E0B", "#10B981", "#3B82F6"],      // Orange, Gold, Emerald, Blue
  attitude: ["#EF4444", "#F97316", "#991B1B", "#F59E0B"],     // Bold Red, Orange, Dark Red, Gold
  powerful: ["#EF4444", "#F97316", "#991B1B", "#1D4ED8"],     // Red, Orange, Royal Blue
  royal: ["#F59E0B", "#FBBF24", "#EF4444", "#8B5CF6"],        // Gold, Bright Gold, Red, Violet
  friendship: ["#F59E0B", "#F97316", "#22C55E", "#3B82F6"],   // Gold, Orange, Green, Blue
  dosti: ["#F59E0B", "#F97316", "#22C55E", "#3B82F6"],        // Gold, Orange, Green, Blue
  life: ["#F59E0B", "#10B981", "#EF4444", "#3B82F6"],         // Gold, Emerald, Red, Blue
  success: ["#10B981", "#F97316", "#F59E0B", "#EF4444"],      // Emerald, Orange, Gold, Red
  nature: ["#10B981", "#14B8A6", "#22C55E", "#F59E0B"],       // Emerald, Teal, Green, Gold
  rain: ["#06B6D4", "#3B82F6", "#14B8A6", "#8B5CF6"],         // Cyan, Blue, Teal, Violet
  islamic: ["#10B981", "#F59E0B", "#14B8A6", "#FBBF24"],      // Islamic Emerald, Gold, Teal, Amber
  festival: ["#EC4899", "#F97316", "#F59E0B", "#22C55E"],     // Festive Rose, Orange, Gold, Green
  default: ["#EF4444", "#F97316", "#F59E0B", "#10B981"]       // Standard Red, Orange, Gold, Green
};

export const getMoodAccentPalette = (mood?: string): string[] => {
  if (!mood) return MOOD_COLOR_PALETTES.default;
  const cleanMood = mood.toLowerCase().trim().replace(/^[^\w\s]+\s*/, "");
  for (const [key, palette] of Object.entries(MOOD_COLOR_PALETTES)) {
    if (cleanMood.includes(key) || key.includes(cleanMood)) {
      return palette;
    }
  }
  return MOOD_COLOR_PALETTES.default;
};

// Curated high-impact multi-word punch phrases (1–3 words max, never full sentences)
const HIGH_IMPACT_PHRASES: string[] = [
  // Multi-word Hinglish Punch Phrases
  "shaitani", "masoom chehra", "tere aage", "sacchi mohabbat", "buland hausla", "apni manzil", 
  "meri jaan", "khuda ki raza", "zindagi ka safar", "hauslon ki udaan", "dil ki baat", "teri yaad",
  "dil toot", "sacchi dosti", "ek-doosre se", "raat bhar", "aankhon mein", "seene se lagakar",
  "bepanaah chaahat", "khamosh ehsaas", "zamaane mein dam", "har taqdeer", "dam nikle", "khud par bharosa",

  // Multi-word Hindi Punch Phrases
  "शैतानी", "मासूम चेहरा", "तेरे आगे", "सच्ची मोहब्बत", "बुलंद हौसला", "अपनी मंज़िल",
  "मेरी जान", "ख़ुदा की रज़ा", "ज़िंदगी का सफ़र", "हौसलों की उड़ान", "दिल की बात", "तेरी याद",
  "दिल टूट", "सच्ची दोस्ती", "एक-दूसरे से", "रात भर", "आँखों में", "सीने से लगाकर",
  "बेपनाह चाहत", "ख़ामोश एहसास", "ज़माने में दम", "हर तक़दीर", "ख़ुद पर भरोसा",

  // Multi-word Urdu Punch Phrases
  "سچی محبت", "بلند حوصلہ", "اپنی منزل", "میری جان", "خدا کی رضا", "زندگی کا سفر", 
  "دل کی بات", "تیری یاد", "دل ٹوٹ", "سچی دوستی", "ایک دوسرے سے", "رات بھر", "آنکھوں میں"
];

// Single Emotional and Punch Keywords
const HIGH_IMPACT_WORDS: string[] = [
  // Hinglish Impact Words
  "mohabbat", "shaitani", "masoom", "ishq", "pyar", "dard", "aansu", "chaand", "zindagi", "maut", "hausla", "buland",
  "taqdeer", "manzil", "mehnat", "zamaana", "badshah", "tevar", "rutba", "khwaahishein", "deewana", "sanam",
  "chahat", "dil", "tanhai", "judai", "bewafa", "qaraar", "kismat", "roye", "akele", "zakhm", "khamoshi",
  "dosti", "yaar", "sapna", "junoon", "jeet", "raza", "wafa", "dua", "naseeb", "sukoon", "yaad", "phool", "baarish", "aag",
  "armaan", "asar", "roshni", "andhera", "hansi", "muskurahat", "irada", "tabahi", "guroor", "khuddari",

  // Hindi Impact Words
  "शैतानी", "मासूम", "इश्क़", "मोहब्बत", "प्यार", "दर्द", "आँसू", "चाँद", "ज़िन्दगी", "मौत", "हौसला", "बुलंद", "तक़दीर", 
  "मंज़िल", "मेहनत", "ज़माना", "बादशाह", "तेवर", "रुतबा", "ख़्वाहिशें", "दीवाना", "सनम", "चाहत", "दिल", 
  "तन्हाई", "जुदाई", "बेवफ़ा", "क़रार", "किस्मत", "रोए", "अकेले", "ज़ख़्म", "ख़ामोशी", "दोस्ती", "यार", 
  "सपना", "जुनून", "जीत", "रज़ा", "वफ़ा", "दुआ", "नसीब", "सुकून", "याद", "फूल", "बारिश", "आग", "अरमान",
  "असर", "रौशनी", "अंधेरा", "हँसी", "मुस्कुराहट", "इरादा", "तबाही", "गुरूर", "ख़ुद्दारी",

  // Urdu Impact Words
  "عشق", "محبت", "پیار", "درد", "آنسو", "چاند", "زندگی", "موت", "حوصلہ", "بلند", "تقدیر",
  "منزل", "محنت", "زمانہ", "بادشاہ", "انداز", "رتبہ", "خواہشیں", "دیوانہ", "صنم", "چاہت", "دل",
  "تنہائی", "جدائی", "بےوفا", "قرار", "قسمت", "روئے", "اکیلے", "زخم", "خاموشی", "دوستی", "یار",
  "خواب", "جنون", "جیت", "رضا", "وفا", "دعا", "نصیب", "سکون", "یاد", "پھول", "بارش", "آگ",
  "ارمان", "اثر", "روشنی", "اندھیرا", "ہنسی", "مسکراہٹ", "ارادہ", "غرور"
];

// Stop words to never highlight as standalone words
const STOP_WORDS = new Set([
  "है", "हैं", "था", "थी", "थे", "का", "की", "के", "को", "से", "में", "पर", "ने", "और", "भी", "तो", "ना", "न", 
  "यह", "वह", "जो", "कर", "हो", "हम", "तुम", "आप", "मैं", "मुझे", "तुझे", "उसे", "कि", "पे", "ही", "ab", "karo", "karein", "gaya", "gayi", "raha", "rahi",
  "hai", "hain", "tha", "thi", "the", "ka", "ki", "ke", "ko", "se", "mein", "par", "ne", "aur", "bhi", "to", "na",
  "yeh", "woh", "jo", "kar", "ho", "hum", "tum", "aap", "main", "mujhe", "tujhe", "use", "ki", "pe", "hi", "ab", "karo", "karein", "gaya", "gayi", "raha", "rahi",
  "ہے", "ہیں", "تھا", "تھی", "تھے", "کا", "کی", "کے", "کو", "سے", "میں", "پر", "نے", "اور", "بھی", "تو", "نہ"
]);

function stripEmojisAndPunctuation(str: string): string {
  return str
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, "")
    .replace(/[।!?,.:;—–"“”'‘’()\[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Intelligently extracts strictly 1–2 (maximum 3) high-impact keywords or short phrases
 * from the Shayari verse.
 * - Never highlights full sentences
 * - Never highlights repeated occurrences
 * - Prioritizes the main punch word / memorable phrase
 */
export function getIntelligentHighlights(
  sher: string,
  mood?: string,
  existingHighlights?: HighlightPhrase[]
): HighlightPhrase[] {
  const palette = getMoodAccentPalette(mood);

  // If valid highlights already exist, sanitize and strictly cap to 1-2 (max 3)
  if (existingHighlights && Array.isArray(existingHighlights) && existingHighlights.length > 0) {
    const cleanSherLower = sher.toLowerCase();
    const valid = existingHighlights
      .filter((h) => {
        if (!h || typeof h.phrase !== "string") return false;
        const p = h.phrase.trim();
        const wordCount = p.split(/\s+/).length;
        return (
          p.length >= 2 &&
          p.length <= 25 &&
          wordCount <= 4 &&
          cleanSherLower.includes(p.toLowerCase()) &&
          !STOP_WORDS.has(p.toLowerCase())
        );
      })
      .slice(0, 2) // prefer 1-2
      .map((h, idx) => ({
        phrase: h.phrase.trim(),
        color: h.color && h.color.startsWith("#") ? h.color : palette[idx % palette.length]
      }));

    if (valid.length > 0) {
      return valid;
    }
  }

  const cleanSher = sher.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, "");
  const lowerSher = cleanSher.toLowerCase();
  const candidates: { phrase: string; index: number; score: number }[] = [];

  // Priority 1: Curated multi-word punch phrases (1–3 words, <= 22 chars)
  for (const phrase of HIGH_IMPACT_PHRASES) {
    const pLower = phrase.toLowerCase();
    const idx = lowerSher.indexOf(pLower);
    if (idx !== -1) {
      const originalText = cleanSher.slice(idx, idx + phrase.length).trim();
      const overlaps = candidates.some(
        (c) => (idx >= c.index && idx < c.index + c.phrase.length) ||
               (idx + phrase.length > c.index && idx + phrase.length <= c.index + c.phrase.length)
      );
      if (!overlaps && originalText.length <= 22) {
        candidates.push({ phrase: originalText, index: idx, score: 100 - (candidates.length * 5) });
        if (candidates.length >= 2) break;
      }
    }
  }

  // Priority 2: Curated single emotional/punch words
  if (candidates.length < 2) {
    for (const word of HIGH_IMPACT_WORDS) {
      const regex = new RegExp(`(^|[^\\p{L}\\p{N}])(${escapeRegExp(word)})([^\\p{L}\\p{N}]|$)`, "gui");
      let match: RegExpExecArray | null;
      while ((match = regex.exec(cleanSher)) !== null) {
        const matchedWord = match[2].trim();
        const matchIdx = match.index + match[1].length;
        const overlaps = candidates.some(
          (c) => (matchIdx >= c.index && matchIdx < c.index + c.phrase.length) ||
                 (matchIdx + matchedWord.length > c.index && matchIdx + matchedWord.length <= c.index + c.phrase.length)
        );
        if (!overlaps && !STOP_WORDS.has(matchedWord.toLowerCase())) {
          candidates.push({ phrase: matchedWord, index: matchIdx, score: 80 - (candidates.length * 5) });
          break;
        }
      }
      if (candidates.length >= 2) break;
    }
  }

  // Priority 3: Salient content word fallback if no matches found
  if (candidates.length === 0) {
    const rawWords = cleanSher.split(/[\s,।!?.—–\n\r"“”'‘’]+/);
    for (const rw of rawWords) {
      const w = rw.trim().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
      if (w.length >= 4 && !STOP_WORDS.has(w.toLowerCase())) {
        const idx = cleanSher.indexOf(w);
        if (idx !== -1 && !candidates.some(c => c.phrase.toLowerCase() === w.toLowerCase())) {
          candidates.push({ phrase: w, index: idx, score: 50 });
          if (candidates.length >= 1) break;
        }
      }
    }
  }

  // Strictly cap at max 2 (prefer 1–2, never exceed 3)
  candidates.sort((a, b) => a.index - b.index);
  const finalHighlights = candidates.slice(0, 2).map((item, idx) => ({
    phrase: item.phrase,
    color: palette[idx % palette.length]
  }));

  return finalHighlights;
}

export interface SegmentedSpan {
  text: string;
  isHighlight: boolean;
  color?: string;
}

/**
 * Segments an entire array of lines for a Shayari card.
 * Guarantees:
 * - Highlights only the selected 1–3 keywords across the whole card
 * - Highlights each keyword AT MOST ONCE in the entire card (no repeated highlights)
 * - Rest of the text is crisp normal text color
 * - Applies activeAccentColorHex to highlighted spans
 */
export function segmentPoetryLinesForHighlighting(
  lines: string[],
  highlights: HighlightPhrase[],
  activeAccentColorHex?: string,
  isHighlightEnabled: boolean = true
): SegmentedSpan[][] {
  if (!isHighlightEnabled || !highlights || highlights.length === 0) {
    return lines.map((l) => [{ text: l, isHighlight: false }]);
  }

  const usedPhrases = new Set<string>();
  let totalHighlightedCount = 0;
  const maxHighlightsAllowed = 3;

  const result: SegmentedSpan[][] = [];

  for (const line of lines) {
    if (totalHighlightedCount >= maxHighlightsAllowed || !line.trim()) {
      result.push([{ text: line, isHighlight: false }]);
      continue;
    }

    interface MatchPos {
      start: number;
      end: number;
      text: string;
      phraseKey: string;
      color: string;
    }

    const matches: MatchPos[] = [];
    const lineLower = line.toLowerCase();

    // Check each highlight phrase that hasn't been used yet
    for (const h of highlights) {
      if (!h || !h.phrase) continue;
      const phraseKey = h.phrase.trim().toLowerCase();
      if (usedPhrases.has(phraseKey)) continue;

      const idx = lineLower.indexOf(phraseKey);
      if (idx !== -1) {
        const end = idx + phraseKey.length;
        const collides = matches.some((m) => idx < m.end && end > m.start);
        if (!collides) {
          matches.push({
            start: idx,
            end,
            text: line.slice(idx, end),
            phraseKey,
            color: activeAccentColorHex || h.color || "#EF4444"
          });
        }
      }
    }

    if (matches.length === 0) {
      result.push([{ text: line, isHighlight: false }]);
      continue;
    }

    // Sort matches by appearance in this line
    matches.sort((a, b) => a.start - b.start);

    const lineSegments: SegmentedSpan[] = [];
    let cursor = 0;

    for (const m of matches) {
      if (totalHighlightedCount >= maxHighlightsAllowed) {
        break;
      }

      if (m.start > cursor) {
        lineSegments.push({
          text: line.slice(cursor, m.start),
          isHighlight: false
        });
      }

      lineSegments.push({
        text: m.text,
        isHighlight: true,
        color: m.color
      });

      usedPhrases.add(m.phraseKey);
      totalHighlightedCount++;
      cursor = m.end;
    }

    if (cursor < line.length) {
      lineSegments.push({
        text: line.slice(cursor),
        isHighlight: false
      });
    }

    result.push(lineSegments);
  }

  return result;
}

/**
 * Single-line segmenter helper for backward compatibility
 */
export function segmentLineForHighlighting(
  line: string,
  highlights: HighlightPhrase[],
  customHighlightColorHex?: string
): SegmentedSpan[] {
  const [segmented] = segmentPoetryLinesForHighlighting([line], highlights, customHighlightColorHex, true);
  return segmented || [{ text: line, isHighlight: false }];
}
