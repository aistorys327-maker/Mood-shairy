import React, { useState, useEffect } from "react";
import { 
  Copy, 
  Check, 
  Sparkles, 
  AlertCircle, 
  Info, 
  Smartphone, 
  Monitor, 
  Wifi, 
  Battery, 
  Signal, 
  Heart, 
  Share2, 
  BookOpen, 
  ChevronLeft, 
  Home, 
  Trash2,
  BookmarkCheck,
  Compass,
  Palette,
  ArrowRight,
  BookMarked,
  Download,
  Edit,
  X,
  Upload,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Move
} from "lucide-react";
import { toPng } from "html-to-image";
import { motion, AnimatePresence } from "motion/react";
import { Shayari } from "./types";

interface ThemeConfig {
  id: "purple" | "pink" | "blue" | "green" | "orange";
  name: string;
  colorClass: string;
  bgGrad: string;
  headerBorder: string;
  iconBg: string;
  iconColor: string;
  titleSpan: string;
  cardShadow: string;
  cardBorderHover: string;
  inputFocus: string;
  buttonGrad: string;
  spinnerBorder: string;
  spinnerIcon: string;
  tagAi: string;
  tagClassic: string;
  separatorDot: string;
  separatorLine: string;
  poetTag: string;
  poetBold: string;
  cardDecoration: string;
  toastBg: string;
  accentGlow: string;
  headerBg: string;
  navBg: string;
  navBorder: string;
  activeTabBg: string;
  cardBg: string;
  cardBorder: string;
  formCardBg: string;
  subCardBg: string;
  borderAccent: string;
  textColor: string;
  tagMood: string;
  outerBg: string;
  glowColors: string[];
  chassisBorder: string;
}

const THEMES: ThemeConfig[] = [
  {
    id: "purple",
    name: "Royal Velvet",
    colorClass: "bg-purple-600",
    bgGrad: "from-purple-50/70 via-slate-50 to-purple-100/40",
    headerBorder: "border-purple-200/40",
    iconBg: "bg-purple-50/80 border-purple-100/60",
    iconColor: "text-purple-600",
    titleSpan: "text-purple-700",
    cardShadow: "shadow-[0_24px_60px_-15px_rgba(147,51,234,0.12)]",
    cardBorderHover: "hover:border-purple-350/80 hover:shadow-md",
    inputFocus: "focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 focus:bg-white",
    buttonGrad: "from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
    spinnerBorder: "border-purple-600/20 border-t-purple-600",
    spinnerIcon: "text-purple-600",
    tagAi: "text-purple-700 bg-purple-50/70 border-purple-100/80",
    tagClassic: "text-slate-700 bg-slate-50 border-slate-200/60",
    separatorDot: "text-purple-600",
    separatorLine: "bg-purple-900/10",
    poetTag: "text-purple-800 bg-purple-50/60 border-purple-100/50",
    poetBold: "text-purple-900",
    cardDecoration: "text-purple-50/40 group-hover:text-purple-100/45",
    toastBg: "bg-purple-950/95 border-purple-900",
    accentGlow: "bg-purple-500/10",
    headerBg: "bg-purple-50/85",
    navBg: "bg-purple-50/95",
    navBorder: "border-purple-200/40",
    activeTabBg: "bg-purple-100/80 text-purple-700",
    cardBg: "bg-purple-50/50",
    cardBorder: "border-purple-200/60",
    formCardBg: "bg-purple-50/65",
    subCardBg: "bg-purple-100/30",
    borderAccent: "border-purple-500",
    textColor: "text-purple-950",
    tagMood: "text-purple-700 bg-purple-50/80 border-purple-100/80",
    outerBg: "bg-[#0f091a]",
    glowColors: ["bg-purple-500/10", "bg-indigo-500/10"],
    chassisBorder: "border-purple-950"
  },
  {
    id: "pink",
    name: "Rose Petal",
    colorClass: "bg-pink-600",
    bgGrad: "from-pink-50/70 via-slate-50 to-pink-100/40",
    headerBorder: "border-pink-200/40",
    iconBg: "bg-pink-50/80 border-pink-100/60",
    iconColor: "text-pink-600",
    titleSpan: "text-pink-700",
    cardShadow: "shadow-[0_24px_60px_-15px_rgba(219,39,119,0.12)]",
    cardBorderHover: "hover:border-pink-350/80 hover:shadow-md",
    inputFocus: "focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 focus:bg-white",
    buttonGrad: "from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700",
    spinnerBorder: "border-pink-600/20 border-t-pink-600",
    spinnerIcon: "text-pink-600",
    tagAi: "text-pink-700 bg-pink-50/70 border-pink-100/80",
    tagClassic: "text-slate-700 bg-slate-50 border-slate-200/60",
    separatorDot: "text-pink-600",
    separatorLine: "bg-pink-900/10",
    poetTag: "text-pink-800 bg-pink-50/60 border-pink-100/50",
    poetBold: "text-pink-900",
    cardDecoration: "text-pink-50/40 group-hover:text-pink-100/45",
    toastBg: "bg-pink-950/95 border-pink-900",
    accentGlow: "bg-pink-500/10",
    headerBg: "bg-pink-50/85",
    navBg: "bg-pink-50/95",
    navBorder: "border-pink-200/40",
    activeTabBg: "bg-pink-100/80 text-pink-700",
    cardBg: "bg-pink-50/50",
    cardBorder: "border-pink-200/60",
    formCardBg: "bg-pink-50/65",
    subCardBg: "bg-pink-100/30",
    borderAccent: "border-pink-500",
    textColor: "text-pink-950",
    tagMood: "text-pink-700 bg-pink-50/80 border-pink-100/80",
    outerBg: "bg-[#1a0810]",
    glowColors: ["bg-pink-500/10", "bg-rose-500/10"],
    chassisBorder: "border-pink-950"
  },
  {
    id: "blue",
    name: "Ocean Breeze",
    colorClass: "bg-blue-600",
    bgGrad: "from-blue-50/70 via-slate-50 to-blue-100/40",
    headerBorder: "border-blue-200/40",
    iconBg: "bg-blue-50/80 border-blue-100/60",
    iconColor: "text-blue-600",
    titleSpan: "text-blue-700",
    cardShadow: "shadow-[0_24px_60px_-15px_rgba(37,99,235,0.12)]",
    cardBorderHover: "hover:border-blue-350/80 hover:shadow-md",
    inputFocus: "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white",
    buttonGrad: "from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700",
    spinnerBorder: "border-blue-600/20 border-t-blue-600",
    spinnerIcon: "text-blue-600",
    tagAi: "text-blue-700 bg-blue-50/70 border-blue-100/80",
    tagClassic: "text-slate-700 bg-slate-50 border-slate-200/60",
    separatorDot: "text-blue-600",
    separatorLine: "bg-blue-900/10",
    poetTag: "text-blue-800 bg-blue-50/60 border-blue-100/50",
    poetBold: "text-blue-900",
    cardDecoration: "text-blue-50/40 group-hover:text-blue-100/45",
    toastBg: "bg-blue-950/95 border-blue-900",
    accentGlow: "bg-blue-500/10",
    headerBg: "bg-blue-50/85",
    navBg: "bg-blue-50/95",
    navBorder: "border-blue-200/40",
    activeTabBg: "bg-blue-100/80 text-blue-700",
    cardBg: "bg-blue-50/50",
    cardBorder: "border-blue-200/60",
    formCardBg: "bg-blue-50/65",
    subCardBg: "bg-blue-100/30",
    borderAccent: "border-blue-500",
    textColor: "text-blue-950",
    tagMood: "text-blue-700 bg-blue-50/80 border-blue-100/80",
    outerBg: "bg-[#050e1e]",
    glowColors: ["bg-blue-500/10", "bg-sky-500/10"],
    chassisBorder: "border-[#0a1424]"
  },
  {
    id: "green",
    name: "Mint Meadow",
    colorClass: "bg-emerald-600",
    bgGrad: "from-emerald-50/70 via-slate-50 to-emerald-100/40",
    headerBorder: "border-emerald-200/40",
    iconBg: "bg-emerald-50/80 border-emerald-100/60",
    iconColor: "text-emerald-600",
    titleSpan: "text-emerald-700",
    cardShadow: "shadow-[0_24px_60px_-15px_rgba(16,185,129,0.12)]",
    cardBorderHover: "hover:border-emerald-350/80 hover:shadow-md",
    inputFocus: "focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white",
    buttonGrad: "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
    spinnerBorder: "border-emerald-600/20 border-t-emerald-600",
    spinnerIcon: "text-emerald-600",
    tagAi: "text-emerald-700 bg-emerald-50/70 border-emerald-100/80",
    tagClassic: "text-slate-700 bg-slate-50 border-slate-200/60",
    separatorDot: "text-emerald-600",
    separatorLine: "bg-emerald-900/10",
    poetTag: "text-emerald-800 bg-emerald-50/60 border-emerald-100/50",
    poetBold: "text-emerald-900",
    cardDecoration: "text-emerald-50/40 group-hover:text-emerald-100/45",
    toastBg: "bg-emerald-950/95 border-emerald-900",
    accentGlow: "bg-emerald-500/10",
    headerBg: "bg-emerald-50/85",
    navBg: "bg-emerald-50/95",
    navBorder: "border-emerald-200/40",
    activeTabBg: "bg-emerald-100/80 text-emerald-700",
    cardBg: "bg-emerald-50/50",
    cardBorder: "border-emerald-200/60",
    formCardBg: "bg-emerald-50/65",
    subCardBg: "bg-emerald-100/30",
    borderAccent: "border-emerald-500",
    textColor: "text-emerald-950",
    tagMood: "text-emerald-700 bg-emerald-50/80 border-emerald-100/80",
    outerBg: "bg-[#04120a]",
    glowColors: ["bg-emerald-500/10", "bg-teal-500/10"],
    chassisBorder: "border-[#06180d]"
  },
  {
    id: "orange",
    name: "Sunset Glow",
    colorClass: "bg-amber-600",
    bgGrad: "from-amber-50/70 via-slate-50 to-amber-100/40",
    headerBorder: "border-amber-200/40",
    iconBg: "bg-amber-50/80 border-amber-100/60",
    iconColor: "text-amber-600",
    titleSpan: "text-amber-700",
    cardShadow: "shadow-[0_24px_60px_-15px_rgba(245,158,11,0.12)]",
    cardBorderHover: "hover:border-amber-350/80 hover:shadow-md",
    inputFocus: "focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:bg-white",
    buttonGrad: "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
    spinnerBorder: "border-amber-600/20 border-t-amber-600",
    spinnerIcon: "text-amber-600",
    tagAi: "text-indigo-700 bg-indigo-50/70 border-indigo-100/80",
    tagClassic: "text-amber-800 bg-amber-50/70 border-amber-100/80",
    separatorDot: "text-amber-600",
    separatorLine: "bg-amber-900/10",
    poetTag: "text-amber-800 bg-amber-50/60 border-amber-100/50",
    poetBold: "text-amber-900",
    cardDecoration: "text-amber-50/40 group-hover:text-amber-100/45",
    toastBg: "bg-amber-950/95 border-amber-900",
    accentGlow: "bg-amber-500/10",
    headerBg: "bg-amber-50/85",
    navBg: "bg-amber-50/95",
    navBorder: "border-amber-200/45",
    activeTabBg: "bg-amber-100/80 text-amber-800",
    cardBg: "bg-amber-50/45",
    cardBorder: "border-amber-200/55",
    formCardBg: "bg-amber-50/65",
    subCardBg: "bg-amber-100/35",
    borderAccent: "border-amber-500",
    textColor: "text-amber-950",
    tagMood: "text-amber-800 bg-amber-50/80 border-amber-150/80",
    outerBg: "bg-[#170e04]",
    glowColors: ["bg-amber-500/10", "bg-orange-500/10"],
    chassisBorder: "border-[#1f1307]"
  }
];

type FontStyleId = "classic" | "elegant" | "modern" | "romantic" | "simple";

interface FontConfig {
  id: FontStyleId;
  name: string;
  class: string;
}

const FONTS: FontConfig[] = [
  { id: "classic", name: "Classic", class: "font-style-classic" },
  { id: "elegant", name: "Elegant", class: "font-style-elegant" },
  { id: "modern", name: "Modern", class: "font-style-modern" },
  { id: "romantic", name: "Romantic", class: "font-style-romantic" },
  { id: "simple", name: "Simple", class: "font-style-simple" }
];

interface PoetLegend {
  name: string;
  era: string;
  desc: string;
  famousSher: string;
  transliteration: string;
  translation: string;
  style: string;
}

const POET_LEGENDS: PoetLegend[] = [
  {
    name: "Mirza Ghalib",
    era: "1797–1869",
    desc: "The ultimate king of Urdu philosophy and romantic longing. Ghalib's verses delve into spiritual despair and the complexities of love.",
    famousSher: "हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले\nबहुत निकले मेरे अरमान, लेकिन फिर भी कम निकले",
    transliteration: "Hazaaron khwahishein aisi ke har khwahish pe dam nikle\nBohat niklay mere armaan, lekin phir bhi kam nikle",
    translation: "Thousands of desires, each so intense that every breath departs for them. Many of my longings were fulfilled, yet so very few.",
    style: "Philosophical & Deeply Emotional"
  },
  {
    name: "Jaun Elia",
    era: "1931–2002",
    desc: "Celebrated for his cynical, raw, and intensely melancholic verses that resonate profoundly with modern existential distress.",
    famousSher: "नया एक रिश्ता पैदा क्यूँ करें हम\nबिछड़ना है तो झगड़ा क्यूँ करें हम",
    transliteration: "Naya ek rishta paida kyun karein hum\nBichhadna hai to jhagda kyun karein hum",
    translation: "Why should we give birth to a brand new relationship? If we are destined to part ways, why should we argue and dispute?",
    style: "Cynical, Intense & Existentialist"
  },
  {
    name: "Allama Iqbal",
    era: "1877–1938",
    desc: "The visionary poet of self-respect (Khudi), determination, and high-flying motivation.",
    famousSher: "ख़ुदी को कर बुलंद इतना कि हर तक़दीर से पहले\nख़ुदा बंदे से ख़ुद पूछे बता तेरी रज़ा क्या है",
    transliteration: "Khudi ko kar buland itna ke har taqdeer se pehle\nKhuda bande se khud pooche bata teri raza kya hai",
    translation: "Elevate your inner Self to such heights that before writing any destiny, God Himself asks you: 'Tell me, what is your desire?'",
    style: "Inspirational, Empowering & Spiritual"
  },
  {
    name: "Faiz Ahmad Faiz",
    era: "1911–1984",
    desc: "The voice of revolution, romanticism, and societal justice. Faiz beautifully blended romantic metaphors with political struggle.",
    famousSher: "और भी दुख हैं ज़माने में मोहब्बत के सिवा\nराहतें और भी हैं वस्ल की राहत के सिवा",
    transliteration: "Aur bhi dukh hain zamaane mein mohabbat ke siwa\nRaahatein aur bhi hain vasl ki raahat ke siwa",
    translation: "There are other griefs in this world besides the pain of love; there are other comforts besides the bliss of union.",
    style: "Revolutionary, Romantic & Metaphorical"
  }
];

function getMoodEmoji(mood: string): string {
  const m = (mood || "").toLowerCase().trim();
  if (m.includes("sad") || m.includes("grief") || m.includes("row")) return "😢";
  if (m.includes("love") || m.includes("romance") || m.includes("romantic") || m.includes("pyar") || m.includes("pyaar") || m.includes("ishq")) return "❤️";
  if (m.includes("happy") || m.includes("joy") || m.includes("smile") || m.includes("khush")) return "😊";
  if (m.includes("motivation") || m.includes("motivational") || m.includes("success") || m.includes("inspire") || m.includes("power") || m.includes("himmat")) return "💪";
  if (m.includes("lonely") || m.includes("alone") || m.includes("breakup") || m.includes("broken") || m.includes("tanhai") || m.includes("hurt") || m.includes("pain") || m.includes("dard")) return "💔";
  if (m.includes("friend") || m.includes("friendship") || m.includes("dost") || m.includes("yaari") || m.includes("yaar")) return "🤝";
  if (m.includes("attitude") || m.includes("style") || m.includes("swag") || m.includes("king") || m.includes("tevar") || m.includes("ghuroor")) return "😎";
  if (m.includes("funny") || m.includes("laugh") || m.includes("comedy") || m.includes("joke") || m.includes("masti")) return "😂";
  return "✨";
}

function getAutoAdjustedCardSpecs(
  ratio: "1:1" | "4:5" | "9:16" | "16:9",
  baseTextSize: string = "text-2xl",
  text: string = "",
  hasPoet: boolean = false
) {
  const cleanText = text || "";
  const length = cleanText.length;

  // Determine line wrap limit based on aspect ratio
  // E.g. narrow columns wrap very early, wide ones take more characters.
  let lineWrapCharLimit = 22;
  if (ratio === "9:16") {
    lineWrapCharLimit = 16;
  } else if (ratio === "16:9") {
    lineWrapCharLimit = 38;
  } else if (ratio === "4:5") {
    lineWrapCharLimit = 22;
  } else {
    lineWrapCharLimit = 24;
  }

  // Estimate the actual visual wrapped lines
  const rawLines = cleanText.split("\n");
  let estimatedLines = 0;
  for (const line of rawLines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    estimatedLines += Math.max(1, Math.ceil(trimmed.length / lineWrapCharLimit));
  }

  const totalVerticalUnits = estimatedLines + (hasPoet ? 1.5 : 0);
  const totalLines = Math.max(1, estimatedLines);

  // Sequential premium tailwind text sizes from smallest to largest (as safe fallbacks)
  const sizeOrder = [
    "text-[10px] sm:text-xs md:text-sm",                    // index 0: micro
    "text-xs sm:text-sm md:text-base",                      // index 1: tiny
    "text-sm sm:text-base md:text-lg",                      // index 2: compact
    "text-base sm:text-lg md:text-xl",                      // index 3: regular
    "text-lg sm:text-xl md:text-2xl",                      // index 4: premium
    "text-xl sm:text-2xl md:text-3xl",                      // index 5: grand
    "text-2xl sm:text-3xl md:text-4xl",                     // index 6: extra grand
    "text-3xl sm:text-4xl md:text-5xl",                     // index 7: large
    "text-4xl sm:text-5xl md:text-6xl",                     // index 8: majestic
    "text-5xl sm:text-6xl md:text-7xl",                     // index 9: monumental
  ];

  // Map incoming Tailwind text size keys to indices
  const sizeKeyMap: Record<string, number> = {
    "text-xs": 1,
    "text-sm": 2,
    "text-base": 3,
    "text-lg": 4,
    "text-xl": 5,
    "text-2xl": 6,
    "text-3xl": 7,
    "text-4xl": 8,
    "text-5xl": 9,
  };

  // Extract the raw text- class from responsive configurations if present
  let cleanBaseTextSize = (baseTextSize || "").trim();
  const textClassMatch = cleanBaseTextSize.match(/\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)\b/);
  if (textClassMatch) {
    cleanBaseTextSize = `text-${textClassMatch[1]}`;
  }

  let baseIndex = sizeKeyMap[cleanBaseTextSize] !== undefined ? sizeKeyMap[cleanBaseTextSize] : 6; // Default to text-2xl

  // Set maximum bounds for indices based on aspect ratios first, then fine-tune
  let maxSafeIndex = 9;

  if (ratio === "16:9") {
    if (totalVerticalUnits >= 8) {
      maxSafeIndex = 2; // compact
    } else if (totalVerticalUnits >= 6) {
      maxSafeIndex = 3; // regular
    } else if (totalVerticalUnits >= 4.5) {
      maxSafeIndex = 4; // premium
    } else if (totalVerticalUnits >= 3) {
      maxSafeIndex = 5; // grand
    } else {
      maxSafeIndex = 6; // extra grand
    }
  } else if (ratio === "9:16") {
    if (totalVerticalUnits >= 12) {
      maxSafeIndex = 4; // premium
    } else if (totalVerticalUnits >= 9) {
      maxSafeIndex = 5; // grand
    } else if (totalVerticalUnits >= 7) {
      maxSafeIndex = 6; // extra grand
    } else if (totalVerticalUnits >= 5) {
      maxSafeIndex = 7; // large
    } else {
      maxSafeIndex = 8; // majestic
    }
  } else if (ratio === "4:5") {
    if (totalVerticalUnits >= 11) {
      maxSafeIndex = 4; // premium
    } else if (totalVerticalUnits >= 8) {
      maxSafeIndex = 5; // grand
    } else if (totalVerticalUnits >= 6) {
      maxSafeIndex = 6; // extra grand
    } else if (totalVerticalUnits >= 4.5) {
      maxSafeIndex = 7; // large
    } else {
      maxSafeIndex = 8; // majestic
    }
  } else {
    if (totalVerticalUnits >= 11) {
      maxSafeIndex = 4; // premium
    } else if (totalVerticalUnits >= 8) {
      maxSafeIndex = 5; // grand
    } else if (totalVerticalUnits >= 6) {
      maxSafeIndex = 6; // extra grand
    } else if (totalVerticalUnits >= 4) {
      maxSafeIndex = 7; // large
    } else {
      maxSafeIndex = 8; // majestic
    }
  }

  // 1. Ratio multiplier: how spacious is the card physically?
  let ratioMultiplier = 1.0;
  if (ratio === "4:5") {
    ratioMultiplier = 1.15;
  } else if (ratio === "9:16") {
    ratioMultiplier = 1.05;
  } else if (ratio === "16:9") {
    ratioMultiplier = 0.8;
  } else {
    ratioMultiplier = 1.0;
  }

  // 2. Length modifier
  let lengthModifier = 0;
  if (length < 35) {
    lengthModifier = 2;
  } else if (length < 55) {
    lengthModifier = 1;
  } else if (length > 95) {
    lengthModifier = -2;
  } else if (length > 75) {
    lengthModifier = -1;
  }

  // Calculate final adjusted index
  let adjustedIndex = baseIndex + lengthModifier;
  adjustedIndex = Math.round(adjustedIndex * ratioMultiplier);

  // Apply maximum safe index cap to prevent overflow
  let finalIndex = Math.min(adjustedIndex, maxSafeIndex);

  // Dynamic configuration fallback tailwind classes
  let paddingClass = "pt-14 pb-5 px-5 sm:pt-16 sm:pb-6 sm:px-6";
  let leadingClass = "leading-relaxed";
  let containerClass = "max-w-[96%] px-2";
  let emojiClass = "text-2xl sm:text-3xl";
  let emojiMarginClass = "mb-3 sm:mb-4";
  let poetMarginClass = "mt-4 sm:mt-6";
  let topBarMarginClass = "mb-4 sm:mb-5 pb-2 sm:pb-3";

  if (ratio === "16:9") {
    if (totalVerticalUnits >= 6) {
      paddingClass = "pt-10 pb-2.5 px-3.5 sm:pt-11 sm:pb-3 sm:px-4";
      leadingClass = "leading-snug";
      containerClass = "max-w-[98%] px-1";
      emojiClass = "text-[14px] sm:text-base";
      emojiMarginClass = "mb-0.5 sm:mb-1";
      poetMarginClass = "mt-1 sm:mt-1.5";
      topBarMarginClass = "mb-1 sm:mb-1.5 pb-0.5";
    } else if (totalVerticalUnits >= 4) {
      paddingClass = "pt-12 pb-3 px-4 sm:pt-14 sm:pb-4 sm:px-5";
      leadingClass = "leading-normal";
      containerClass = "max-w-[97%] px-1.5";
      emojiClass = "text-base sm:text-lg";
      emojiMarginClass = "mb-1.5 sm:mb-2";
      poetMarginClass = "mt-2 sm:mt-2.5";
      topBarMarginClass = "mb-2 pb-1";
    } else {
      paddingClass = "pt-14 pb-4 px-5 sm:pt-16 sm:pb-5 sm:px-6";
      leadingClass = "leading-relaxed";
      containerClass = "max-w-[96%] px-2";
      emojiClass = "text-xl sm:text-2xl";
      emojiMarginClass = "mb-2 sm:mb-3";
      poetMarginClass = "mt-3 sm:mt-4";
      topBarMarginClass = "mb-3 pb-1.5";
    }
  } else if (ratio === "9:16") {
    if (totalVerticalUnits >= 8) {
      paddingClass = "pt-12 pb-4 px-3.5 sm:pt-14 sm:pb-5 sm:px-4.5";
      leadingClass = "leading-normal";
      containerClass = "max-w-[98%] px-1 py-1";
      emojiClass = "text-xl";
      emojiMarginClass = "mb-1.5 sm:mb-2";
      poetMarginClass = "mt-2 sm:mt-3";
      topBarMarginClass = "mb-2 pb-1";
    } else if (totalVerticalUnits >= 5) {
      paddingClass = "pt-14 pb-5 px-4.5 sm:pt-16 sm:pb-6 sm:px-5.5";
      leadingClass = "leading-relaxed";
      containerClass = "max-w-[96%] px-1.5 py-2";
      emojiClass = "text-2xl";
      emojiMarginClass = "mb-3 sm:mb-4";
      poetMarginClass = "mt-3.5 sm:mt-4.5";
      topBarMarginClass = "mb-3 pb-1.5";
    } else {
      paddingClass = "pt-16 pb-6 px-5.5 sm:pt-18 sm:pb-7 sm:px-6.5";
      leadingClass = "leading-loose";
      containerClass = "max-w-[95%] px-2 py-3";
      emojiClass = "text-3xl";
      emojiMarginClass = "mb-4 sm:mb-5";
      poetMarginClass = "mt-5 sm:mt-6";
      topBarMarginClass = "mb-4 pb-2";
    }
  } else {
    if (totalVerticalUnits >= 8) {
      paddingClass = "pt-12 pb-4 px-4 sm:pt-14 sm:pb-5 sm:px-5";
      leadingClass = "leading-normal";
      containerClass = "max-w-[97%] px-1.5 py-1";
      emojiClass = "text-xl sm:text-2xl";
      emojiMarginClass = "mb-2";
      poetMarginClass = "mt-2.5 sm:mt-3.5";
      topBarMarginClass = "mb-2.5 pb-1.5";
    } else if (totalVerticalUnits >= 5) {
      paddingClass = "pt-14 pb-5 px-5 sm:pt-16 sm:pb-6 sm:px-6";
      leadingClass = "leading-relaxed";
      containerClass = "max-w-[96%] px-2 py-1.5";
      emojiClass = "text-2xl sm:text-3xl";
      emojiMarginClass = "mb-3 sm:mb-4";
      poetMarginClass = "mt-4 sm:mt-5";
      topBarMarginClass = "mb-4 pb-2.5";
    } else {
      paddingClass = "pt-16 pb-6 px-6 sm:pt-18 sm:pb-7 sm:px-7";
      leadingClass = "leading-loose";
      containerClass = "max-w-[95%] px-2.5 py-2";
      emojiClass = "text-3xl sm:text-4xl";
      emojiMarginClass = "mb-4 sm:mb-5";
      poetMarginClass = "mt-5 sm:mt-7";
      topBarMarginClass = "mb-5 pb-3";
    }
  }

  // Ensure index is within range [0, sizeOrder.length - 1]
  finalIndex = Math.max(0, Math.min(sizeOrder.length - 1, finalIndex));
  const fontSizeClass = sizeOrder[finalIndex];

  // ==========================================
  // MATHEMATICAL SMART INLINE TEXT LAYOUT SYSTEM
  // ==========================================
  
  // We calculate responsive size parameters using container-relative query units (cqw/cqh)
  // This guarantees that whether the card is tiny in preview or giant in download,
  // the text ratio remains exactly proportional (occupying about 70% of the visual space).
  
  // 1. Calculate optimal padding top & bottom in cqh (percentage of card height)
  // We keep padding tight (7-8%) so more height can be dedicated to natural spacing inside the card
  let ptCqh = 8;
  let pbCqh = 8;
  let pxCqw = 8;
  
  if (ratio === "9:16") {
    ptCqh = 8;
    pbCqh = 8;
    pxCqw = 7;
  } else if (ratio === "16:9") {
    ptCqh = 4;
    pbCqh = 4;
    pxCqw = 10;
  } else if (ratio === "4:5") {
    ptCqh = 7;
    pbCqh = 7;
    pxCqw = 8;
  }

  // If the shayari has many lines or is very long, reduce the card padding to gain precious vertical space!
  if (totalLines >= 6 || length > 110) {
    ptCqh = Math.max(3, ptCqh - 3);
    pbCqh = Math.max(3, pbCqh - 3);
  } else if (totalLines >= 4 || length > 75) {
    ptCqh = Math.max(4, ptCqh - 1.5);
    pbCqh = Math.max(4, pbCqh - 1.5);
  }

  // 2. Calculate optimal font size in container width units (cqw)
  // To keep text prominently sized and fill the visual balance of the card height.
  let baseCqw = 8.0; 
  if (ratio === "9:16") {
    baseCqw = 9.8; // story is narrow but very tall, so font relative to width can be larger
  } else if (ratio === "16:9") {
    baseCqw = 6.0; // landscape is very short, keep it smaller to fit
  } else if (ratio === "4:5") {
    baseCqw = 8.8; // portrait is spacious
  }
  
  // Apply a non-linear scale down based on length & total line count
  // "For short shayaris: Increase font size. For long shayaris: Reduce font size automatically."
  let sizeFactor = 1.0;
  if (length < 25) {
    sizeFactor = 1.45; // ultra-boost for short two-liner couplets
  } else if (length < 45) {
    sizeFactor = 1.25; // boost for short shayaris
  } else if (length < 70) {
    sizeFactor = 1.05; // normal-medium
  } else if (length < 95) {
    sizeFactor = 0.90; // reduction for longer ones
  } else if (length < 120) {
    sizeFactor = 0.78; // further reduction
  } else if (length < 150) {
    sizeFactor = 0.65; // reduction for very long ones
  } else {
    sizeFactor = 0.55; // ultra-aggressive reduction for massive texts to fit perfectly
  }
  
  // Adjust based on line count too to prevent height overflow
  if (totalLines >= 8) {
    sizeFactor = Math.min(sizeFactor, 0.58);
  } else if (totalLines >= 6) {
    sizeFactor = Math.min(sizeFactor, 0.68);
  } else if (totalLines >= 4) {
    sizeFactor = Math.min(sizeFactor, 0.82);
  }
  
  let computedFontSizeCqw = baseCqw * sizeFactor;
  
  // Clamp boundaries to ensure excellent readability
  let minCqwBound = 3.2; // lowered from 4.0 to allow smaller cards to fit perfectly
  let maxCqwBound = 12.0;
  if (ratio === "16:9") {
    minCqwBound = 2.6;
    maxCqwBound = 6.6;
  } else if (ratio === "9:16") {
    minCqwBound = 4.2;
    maxCqwBound = 13.5;
  }
  computedFontSizeCqw = Math.max(minCqwBound, Math.min(maxCqwBound, computedFontSizeCqw));

  // 3. Compute dynamic Line Spacing (lineHeight)
  // "For short shayaris: Add more line spacing. For long shayaris: tighter line-height to fit."
  let computedLineHeight = 1.95; // Very spacious, elegant and premium
  if (length < 30) {
    computedLineHeight = 2.5; // ultra spacious couplet spacing
  } else if (length < 50) {
    computedLineHeight = 2.2; // roomy line spacing
  } else if (length > 100 || totalLines >= 6) {
    computedLineHeight = 1.45; // very compact for massive verses
  } else if (totalLines >= 5) {
    computedLineHeight = 1.6;  // compact line spacing for longer shayari
  } else if (totalLines >= 3) {
    computedLineHeight = 1.8;
  }
  
  if (ratio === "16:9") {
    computedLineHeight = Math.min(computedLineHeight, 1.55); // clamp landscape
  } else if (ratio === "9:16") {
    computedLineHeight = Math.max(computedLineHeight, 2.15);  // boost story aspect
  }

  // 4. Compute Smart Text Position & Vertical alignment offsets
  // "Do not always place the shayari exactly in the center. Automatically position the text based on the amount of content."
  // Short shayaris look much more elegant when placed with a modern asymmetric, slightly top-heavy position.
  let verticalShiftCqh = 0;
  let targetHeightCqh = 78; // occupies about 75-80% height of the card
  let justifyContent: "center" | "space-around" | "space-between" = "space-around";

  if (length < 45) {
    // Short shayari: Offset slightly upwards, group comfortably to keep it balanced and fill up to 74% - 78% card height
    verticalShiftCqh = -1.5;
    targetHeightCqh = 74; 
    justifyContent = "space-around";
    
    if (ratio === "9:16") {
      verticalShiftCqh = -2.0; // elegant story offset
      targetHeightCqh = 78;
    } else if (ratio === "16:9") {
      verticalShiftCqh = -0.5;
      targetHeightCqh = 68;
    }
  } else if (length < 80) {
    // Medium shayari: slight upward shift for elegant balance, utilizing 78% - 82% of card height
    verticalShiftCqh = -0.5;
    targetHeightCqh = 78; 
    justifyContent = "space-around";
    
    if (ratio === "9:16") {
      verticalShiftCqh = -1.0;
      targetHeightCqh = 82;
    } else if (ratio === "16:9") {
      verticalShiftCqh = 0;
      targetHeightCqh = 72;
    }
  } else {
    // Long shayari: use about 80% - 84% height of the card so it spreads naturally and doesn't compress or overflow
    verticalShiftCqh = hasPoet ? -0.5 : 0;
    targetHeightCqh = 80;
    justifyContent = hasPoet ? "space-between" : "space-around"; // spread fully to look majestic
    
    if (ratio === "9:16") {
      targetHeightCqh = 84; // utilize maximum space on stories
    } else if (ratio === "16:9") {
      targetHeightCqh = 74; // constrain slightly to prevent overflow
    }
  }

  // Setup fluid responsive scale-factor hooks for @container query overrides
  const cardVariables = {
    "--card-pt": `${ptCqh}cqh`,
    "--card-pb": `${pbCqh}cqh`,
    "--card-px": `${pxCqw}cqw`,
    "--font-size": `${computedFontSizeCqw}cqw`,
    "--line-height": `${computedLineHeight}`,
    "--paragraph-gap": `${ptCqh * 0.4}cqh`, // Dynamic, tied to padding/margins to maintain visual balance
    "--inner-height": `${targetHeightCqh}cqh`,
    "--vertical-shift": `${verticalShiftCqh}cqh`,
  } as React.CSSProperties;

  const cardStyle: React.CSSProperties = {
    paddingTop: "calc(var(--card-pt) * var(--card-pt-scale, 1))",
    paddingBottom: "calc(var(--card-pb) * var(--card-pb-scale, 1))",
    paddingLeft: "var(--card-px)",
    paddingRight: "var(--card-px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const innerWrapperStyle: React.CSSProperties = {
    transform: "translateY(calc(var(--vertical-shift) * var(--vertical-shift-scale, 1)))",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent, // Dynamic spacing model
    width: "100%",
    height: "calc(var(--inner-height) * var(--inner-height-scale, 1))", 
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "calc(var(--font-size) * var(--font-size-scale, 1))",
    lineHeight: "calc(var(--line-height) * var(--line-height-scale, 1))",
    width: "100%",
    maxWidth: ratio === "9:16" ? "94%" : "96%",
  };

  // Dynamic emoji size & margin scale
  const emojiSizeCqw = Math.max(6, Math.min(13, computedFontSizeCqw * 1.45));
  const emojiMarginCqh = Math.max(2.5, Math.min(6.5, computedFontSizeCqw * 0.75));
  
  const emojiContainerStyle: React.CSSProperties = {
    marginBottom: `${emojiMarginCqh}cqh`,
  };
  
  const emojiStyle: React.CSSProperties = {
    fontSize: `${emojiSizeCqw}cqw`,
  };

  // Dynamic poet size & margin scale
  const poetMarginCqh = Math.max(3.5, Math.min(9, computedFontSizeCqw * 0.95));
  
  const poetContainerStyle: React.CSSProperties = {
    marginTop: `${poetMarginCqh}cqh`,
  };

  const poetStyle: React.CSSProperties = {
    fontSize: `${Math.max(2.6, Math.min(4.6, computedFontSizeCqw * 0.45))}cqw`,
  };

  // 5. Dynamic paragraph/line spacing (gap between lines of shayari) in cqh
  // Reduced by 30% to keep spacing tight, premium, and balanced without massive empty gaps
  let computedParagraphGapCqh = 2.9; 
  if (ratio === "9:16") {
    computedParagraphGapCqh = 4.5; 
  } else if (ratio === "4:5") {
    computedParagraphGapCqh = 3.5;
  } else if (ratio === "16:9") {
    computedParagraphGapCqh = 1.4; 
  }
  
  if (length < 35) {
    computedParagraphGapCqh *= 1.5; // Moderate boost for short couplets, keeping them tight
  } else if (length < 60) {
    computedParagraphGapCqh *= 1.1; // Slight elegant gap boost
  } else if (length > 100) {
    computedParagraphGapCqh *= 0.65; // Much tighter gap to avoid vertical overflow for longer verses
  }

  // Update variables block to use calculated paragraph gap
  cardVariables["--paragraph-gap"] = `${computedParagraphGapCqh}cqh`;

  const verseContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: "calc(var(--paragraph-gap) * var(--paragraph-gap-scale, 1))",
  };

  return {
    paddingClass,
    fontSizeClass,
    leadingClass,
    containerClass,
    emojiClass,
    emojiMarginClass,
    poetMarginClass,
    topBarMarginClass,
    // Smart inline layout properties
    cardVariables,
    cardStyle,
    innerWrapperStyle,
    textStyle,
    emojiContainerStyle,
    emojiStyle,
    poetContainerStyle,
    poetStyle,
    verseContainerStyle, // Added for dynamic paragraph/line spacing
  };
}

export default function App() {
  // Input State
  const [userInput, setUserInput] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mood_user_input") || "";
    }
    return "";
  });

  // Results State
  const [generatedShayaris, setGeneratedShayaris] = useState<Shayari[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_generated_shayaris");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  // Saved / Hearted Shayaris List
  const [savedShayaris, setSavedShayaris] = useState<Shayari[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_saved_shayaris");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  // Track all generated/seen shayari texts to ensure we never repeat them
  const [seenShayariTexts, setSeenShayariTexts] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_seen_shayari_texts");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  // UI Flow states
  const [activeTab, setActiveTab] = useState<"generator" | "saved" | "about" | "settings">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_active_tab");
      if (saved === "generator" || saved === "saved" || saved === "about" || saved === "settings") {
        return saved as "generator" | "saved" | "about" | "settings";
      }
    }
    return "generator";
  });

  const [isPhoneView, setIsPhoneView] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_is_phone_view");
      return saved !== "false"; 
    }
    return true;
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineFallback, setIsOfflineFallback] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("12:30");

  // Sync state changes to localStorage immediately to fulfill "Save the current UI layout"
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mood_user_input", userInput);
    }
  }, [userInput]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mood_generated_shayaris", JSON.stringify(generatedShayaris));
    }
  }, [generatedShayaris]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mood_saved_shayaris", JSON.stringify(savedShayaris));
    }
  }, [savedShayaris]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mood_active_tab", activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mood_is_phone_view", String(isPhoneView));
    }
  }, [isPhoneView]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mood_seen_shayari_texts", JSON.stringify(seenShayariTexts));
    }
  }, [seenShayariTexts]);

  // Real-time local digital clock sync for Android Status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Theme & Font states
  const [currentThemeId, setCurrentThemeId] = useState<"purple" | "pink" | "blue" | "green" | "orange">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_shayari_theme");
      if (saved === "purple" || saved === "pink" || saved === "blue" || saved === "green" || saved === "orange") {
        return saved as "purple" | "pink" | "blue" | "green" | "orange";
      }
    }
    return "purple";
  });

  const [selectedFont, setSelectedFont] = useState<FontStyleId>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_shayari_font");
      if (saved === "classic" || saved === "elegant" || saved === "modern" || saved === "romantic" || saved === "simple") {
        return saved as FontStyleId;
      }
    }
    return "classic";
  });

  const [fontWeight, setFontWeight] = useState<"normal" | "bold">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_shayari_font_weight");
      if (saved === "normal" || saved === "bold") {
        return saved;
      }
    }
    return "normal";
  });

  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Card Editor States
  const [editingShayari, setEditingShayari] = useState<Shayari | null>(null);
  const [editedSher, setEditedSher] = useState<string>("");
  const [editedEmoji, setEditedEmoji] = useState<string>("✨");
  const [editedBgColor, setEditedBgColor] = useState<string>("");
  const [editedBgGradient, setEditedBgGradient] = useState<string>("");
  const [editedTextColor, setEditedTextColor] = useState<string>("text-slate-900");
  const [editedFontClass, setEditedFontClass] = useState<string>("");
  const [editedTextSize, setEditedTextSize] = useState<string>("text-2xl");
  const [editedIsBold, setEditedIsBold] = useState<boolean>(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [editedImageMode, setEditedImageMode] = useState<"small" | "fit" | "fill" | "contain" | "cover">("small");
  const [editedImageScale, setEditedImageScale] = useState<number>(1);
  const [editedImageRotate, setEditedImageRotate] = useState<number>(0);
  const [editedRatio, setEditedRatio] = useState<"1:1" | "4:5" | "9:16" | "16:9">("1:1");
  const [imagePos, setImagePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleStartEdit = (shayari: Shayari) => {
    setEditingShayari(shayari);
    setEditedSher(shayari.sher);
    setEditedEmoji(shayari.customEmoji || getMoodEmoji(shayari.mood));
    setEditedBgColor(shayari.customBgColor || "");
    setEditedBgGradient(shayari.customBgGradient || "");
    setEditedTextColor(shayari.customTextColor || "text-slate-900");
    setEditedFontClass(shayari.customFontClass || activeFontConfig.class);
    setEditedTextSize(shayari.customTextSize || "text-2xl");
    setEditedIsBold(shayari.customIsBold !== undefined ? shayari.customIsBold : (fontWeight === "bold"));
    setEditedImage(shayari.customImage || null);
    setEditedImageMode(shayari.customImageMode || "small");
    setEditedImageScale(shayari.customImageScale !== undefined ? shayari.customImageScale : 1);
    setEditedImageRotate(shayari.customImageRotate !== undefined ? shayari.customImageRotate : 0);
    setEditedRatio(shayari.customRatio || "1:1");
    setImagePos({ x: shayari.customImageX || 0, y: shayari.customImageY || 0 });
  };

  const handleSaveChanges = () => {
    if (!editingShayari) return;

    const updatedCard: Shayari = {
      ...editingShayari,
      originalSher: editingShayari.originalSher || editingShayari.sher,
      sher: editedSher,
      customEmoji: editedEmoji,
      customBgColor: editedBgColor,
      customBgGradient: editedBgGradient,
      customTextColor: editedTextColor,
      customFontClass: editedFontClass,
      customTextSize: editedTextSize,
      customIsBold: editedIsBold,
      customImage: editedImage || undefined,
      customImageMode: editedImageMode,
      customImageScale: editedImageScale,
      customImageRotate: editedImageRotate,
      customRatio: editedRatio,
      customImageX: imagePos.x,
      customImageY: imagePos.y,
    };

    // Update in generatedShayaris if it exists there
    setGeneratedShayaris((prev) =>
      prev.map((s) => (s.id === editingShayari.id ? updatedCard : s))
    );

    // Update in savedShayaris if it exists there
    setSavedShayaris((prev) =>
      prev.map((s) => (s.id === editingShayari.id ? updatedCard : s))
    );

    setEditingShayari(null);
    showToast("Poetry card customized successfully! ✨");
  };

  const handleResetCard = () => {
    if (!editingShayari) return;
    
    const origSher = editingShayari.originalSher || editingShayari.sher;
    
    setEditedSher(origSher);
    setEditedEmoji(getMoodEmoji(editingShayari.mood));
    setEditedBgColor("");
    setEditedBgGradient("");
    setEditedTextColor("text-slate-900");
    setEditedFontClass(activeFontConfig.class);
    setEditedTextSize("text-2xl");
    setEditedIsBold(fontWeight === "bold");
    setEditedImage(null);
    setEditedImageMode("small");
    setEditedImageScale(1);
    setEditedImageRotate(0);
    setEditedRatio("1:1");
    setImagePos({ x: 0, y: 0 });
    
    showToast("Card restored to original uncustomized style and text! 🌿");
  };

  const handleAutoFitText = () => {
    if (!editingShayari) return;

    const optimalSpecs = getAutoAdjustedCardSpecs(
      editedRatio,
      "text-4xl",
      editedSher,
      !editingShayari.isAI && !!editingShayari.poet
    );

    let matchedSize = "text-xl";
    const fClass = optimalSpecs.fontSizeClass;
    if (fClass.includes("text-[10px]") || fClass.includes("text-[11px]") || fClass.includes("text-xs") || fClass.includes("text-sm")) {
      matchedSize = "text-base";
    } else if (fClass.includes("text-base")) {
      matchedSize = "text-base";
    } else if (fClass.includes("text-lg")) {
      matchedSize = "text-lg";
    } else if (fClass.includes("text-xl")) {
      matchedSize = "text-xl";
    } else if (fClass.includes("text-2xl")) {
      matchedSize = "text-2xl";
    } else if (fClass.includes("text-3xl")) {
      matchedSize = "text-3xl";
    } else if (fClass.includes("text-4xl")) {
      matchedSize = "text-4xl";
    }

    setEditedTextSize(matchedSize);
    setImagePos({ x: 0, y: 0 });
    showToast("Text layout fitted to ratio perfection! ✨");
  };

  // Drag-to-reposition logic for custom card image
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - imagePos.x, y: e.clientY - imagePos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setImagePos({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - imagePos.x,
        y: e.touches[0].clientY - imagePos.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setImagePos({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setEditedImage(reader.result);
          setImagePos({ x: 0, y: 0 }); // reset drag position
          showToast("Custom image uploaded! Drag inside preview card to position it.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const activeTheme = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];
  const activeFontConfig = FONTS.find((f) => f.id === selectedFont) || FONTS[0];
  const shayariFontWeightClass = fontWeight === "bold" ? "!font-bold" : "";

  const handleThemeChange = (id: "purple" | "pink" | "blue" | "green" | "orange") => {
    setCurrentThemeId(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("mood_shayari_theme", id);
    }
    showToast(`Switched theme to ${THEMES.find(t => t.id === id)?.name}!`);
  };

  const handleFontChange = (id: FontStyleId) => {
    setSelectedFont(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("mood_shayari_font", id);
    }
    showToast(`Changed verse font to ${FONTS.find(f => f.id === id)?.name}!`);
  };

  const handleFontWeightChange = (weight: "normal" | "bold") => {
    setFontWeight(weight);
    if (typeof window !== "undefined") {
      localStorage.setItem("mood_shayari_font_weight", weight);
    }
    showToast(`Changed font weight to ${weight.charAt(0).toUpperCase() + weight.slice(1)}!`);
  };

  const handleDownloadImage = async (shayari: Shayari) => {
    const cardId = `shayari-card-${shayari.id}`;
    const element = document.getElementById(cardId);
    if (!element) {
      showToast("Card element not found");
      return;
    }

    try {
      setDownloadingId(shayari.id);
      showToast("Creating your custom card image... 📸");

      // Give a tiny timeout for state and toast feedback to render smoothly
      await new Promise((resolve) => setTimeout(resolve, 400));

      const width = element.offsetWidth;
      const height = element.offsetHeight;

      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 3, // Ultra-sharp print-quality resolution (3x)
        width: width,
        height: height,
        style: {
          transform: "scale(1)",
          borderRadius: "32px",
          width: `${width}px`,
          height: `${height}px`,
          margin: "0",
        },
        filter: (node: Node) => {
          if (node instanceof HTMLElement) {
            if (node.getAttribute("data-download-ignore") === "true") {
              return false;
            }
          }
          return true;
        },
        cacheBust: true,
      });

      const link = document.createElement("a");
      const cleanMood = shayari.mood ? shayari.mood.trim().toLowerCase().replace(/\s+/g, "-") : "poetry";
      link.download = `shayari-${cleanMood}-${shayari.id.slice(0, 8)}.png`;
      link.href = dataUrl;
      link.click();
      showToast("Poetry card downloaded! ✨");
    } catch (err) {
      console.error("Failed to export card image:", err);
      showToast("Export failed. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadPreview = async () => {
    if (!editingShayari) return;
    const element = document.getElementById("custom-card-preview");
    if (!element) {
      showToast("Preview element not found");
      return;
    }

    try {
      showToast("Creating your custom card image... 📸");
      await new Promise((resolve) => setTimeout(resolve, 400));

      const width = element.offsetWidth;
      const height = element.offsetHeight;

      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 3,
        width: width,
        height: height,
        style: {
          transform: "scale(1)",
          borderRadius: "24px",
          width: `${width}px`,
          height: `${height}px`,
          margin: "0",
        },
        filter: (node: Node) => {
          if (node instanceof HTMLElement) {
            if (node.getAttribute("data-download-ignore") === "true") {
              return false;
            }
          }
          return true;
        },
        cacheBust: true,
      });

      const link = document.createElement("a");
      const cleanMood = editingShayari.mood ? editingShayari.mood.trim().toLowerCase().replace(/\s+/g, "-") : "poetry";
      link.download = `shayari-${cleanMood}-${editingShayari.id.slice(0, 8)}.png`;
      link.href = dataUrl;
      link.click();
      showToast("Custom preview card downloaded! ✨");
    } catch (err) {
      console.error("Failed to export preview card image:", err);
      showToast("Export failed. Please try again.");
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((current) => current === msg ? null : current);
    }, 2500);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsOfflineFallback(false);

    const trimmedInput = userInput.trim();
    if (!trimmedInput) {
      setError("Pehle apna mood likhiye (Please enter your mood first).");
      return;
    }

    setIsLoading(true);
    setGeneratedShayaris([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          mood: trimmedInput,
          excludeList: seenShayariTexts.slice(-150)
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to generate Beautiful Shayaris.");
      }

      const data = await response.json();
      if (data.shayaris && Array.isArray(data.shayaris)) {
        setGeneratedShayaris(data.shayaris.slice(0, 5));
        
        // Add new shayaris to the seen list
        const newTexts = data.shayaris.map((s: Shayari) => s.sher);
        setSeenShayariTexts((prev) => {
          const combined = [...prev, ...newTexts];
          return Array.from(new Set(combined));
        });

        setIsOfflineFallback(!!data.isOfflineFallback);
        showToast("Weaved 5 master verses perfectly matching your mood!");
      } else {
        throw new Error("Invalid response format received from Backend.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to generate shayaris. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (shayari: Shayari) => {
    const poetLine = shayari.isAI ? "" : `\n- Poet: ${shayari.poet}`;
    const formattedText = `"${shayari.sher}"${poetLine}\n\nShared via Mood Shayari App ✨`;
    
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(formattedText)
          .then(() => {
            setCopiedId(shayari.id);
            setToast("Copied to clipboard!");
            setTimeout(() => setCopiedId(null), 2500);
            setTimeout(() => setToast(null), 2500);
          })
          .catch(() => {
            fallbackCopy(formattedText, shayari.id);
          });
      } else {
        fallbackCopy(formattedText, shayari.id);
      }
    } catch {
      fallbackCopy(formattedText, shayari.id);
    }
  };

  const fallbackCopy = (text: string, id: string) => {
    try {
      const text_area = document.createElement("textarea");
      text_area.value = text;
      text_area.style.position = "fixed";
      text_area.style.opacity = "0";
      document.body.appendChild(text_area);
      text_area.focus();
      text_area.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(text_area);
      if (successful) {
        setCopiedId(id);
        setToast("Copied to clipboard!");
        setTimeout(() => setCopiedId(null), 2500);
        setTimeout(() => setToast(null), 2500);
      }
    } catch (e) {
      console.warn("Clipboard fallback copy failed:", e);
    }
  };

  const toggleSaveShayari = (shayari: Shayari) => {
    setSavedShayaris((prev) => {
      const isAlreadySaved = prev.some((s) => s.id === shayari.id || s.sher === shayari.sher);
      let updated;
      if (isAlreadySaved) {
        updated = prev.filter((s) => s.id !== shayari.id && s.sher !== shayari.sher);
        showToast("Removed from your library");
      } else {
        updated = [shayari, ...prev];
        showToast("Added to your library! ❤️");
      }
      return updated;
    });
  };

  const clearSavedAll = () => {
    if (window.confirm("Do you want to clear your saved anthology?")) {
      setSavedShayaris([]);
      showToast("Cleared your saved verses");
    }
  };

  // Reusable core view content (without device bezel) to eliminate code duplication
  const renderAppContent = () => {
    return (
      <div className="flex-1 flex flex-col min-h-0 relative select-none">
        
        {/* App Title & Header Bar */}
        <header className={`px-5 py-3 shrink-0 flex items-center justify-between border-b ${activeTheme.navBorder} ${activeTheme.headerBg} backdrop-blur-md sticky top-0 z-30 transition-all duration-300`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-xl ${activeTheme.iconBg} border ${activeTheme.cardBorder} flex items-center justify-center transition-all duration-300`}>
              <Sparkles className={`w-4 h-4 ${activeTheme.iconColor}`} />
            </div>
            <div>
              <h1 className={`text-base font-bold ${activeTheme.textColor} leading-none tracking-tight font-sans`}>
                Mood <span className={`font-serif italic text-sm ${activeTheme.titleSpan} font-semibold`}>Shayari</span>
              </h1>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold leading-none">Android Version 2.0</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleThemeChange(THEMES[(THEMES.findIndex(t => t.id === currentThemeId) + 1) % THEMES.length].id)}
              className={`p-1.5 rounded-full hover:bg-white/45 active:scale-95 transition-all ${activeTheme.iconColor} cursor-pointer`}
              title="Rotate Palette"
            >
              <Palette className="w-4 h-4" />
            </button>
            <div className={`flex items-center gap-1.5 bg-white/50 border ${activeTheme.cardBorder} px-2 py-0.5 rounded-full`}>
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[8px] font-mono font-bold uppercase text-slate-500">PRO AI</span>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Tab View */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5 space-y-6">
          
          {activeTab === "generator" && (
            <div className="space-y-6">
              
              {/* Generation card */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border rounded-[28px] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.02)] space-y-4 ${activeTheme.formCardBg} ${activeTheme.cardBorder}`}
              >
                <div>
                  <h2 className={`text-sm font-extrabold ${activeTheme.textColor} tracking-tight flex items-center gap-1.5`}>
                    <span>How is your heart feeling?</span>
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                    Let our advanced AI weave beautiful custom Urdu/Hindi poetry matching your emotion perfectly.
                  </p>
                </div>

                <form onSubmit={handleGenerate} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="mood_input"
                      value={userInput}
                      onChange={(e) => {
                        setUserInput(e.target.value);
                        if (e.target.value.trim()) setError(null);
                      }}
                      placeholder="e.g. rain love, melancholic alone, broken trust, motivation..."
                      maxLength={150}
                      className={`w-full bg-white/70 border rounded-xl pl-4 pr-10 py-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all ${activeTheme.inputFocus} ${activeTheme.cardBorder}`}
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm select-none pointer-events-none">✍️</span>
                  </div>

                  {/* Font picker block */}
                  <div className={`p-3 rounded-xl border space-y-2 ${activeTheme.subCardBg} ${activeTheme.cardBorder}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold ${activeTheme.iconColor} tracking-wide uppercase font-sans`}>
                        ✒️ Poetic Font
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      {FONTS.map((font) => (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() => handleFontChange(font.id)}
                          className={`py-1.5 px-0.5 rounded-lg text-[10px] font-medium text-center cursor-pointer transition-all ${
                            selectedFont === font.id
                              ? `bg-gradient-to-r ${activeTheme.buttonGrad} text-white shadow-sm font-semibold`
                              : `bg-white ${activeTheme.iconColor} hover:bg-slate-50 border ${activeTheme.cardBorder}`
                          }`}
                        >
                          {font.name}
                        </button>
                      ))}
                    </div>

                    {/* Font weight option */}
                    <div className="pt-2.5 border-t border-slate-200/50 flex items-center justify-between">
                      <span className={`text-[10px] font-bold ${activeTheme.iconColor} tracking-wide uppercase font-sans flex items-center gap-1`}>
                        <span>⚖️ Font Weight</span>
                      </span>
                      <div className="flex bg-white/70 rounded-lg p-0.5 border border-slate-200/40">
                        {(["normal", "bold"] as const).map((weight) => (
                          <button
                            key={weight}
                            type="button"
                            onClick={() => handleFontWeightChange(weight)}
                            className={`px-3 py-1 rounded-md text-[10px] font-bold capitalize transition-all cursor-pointer ${
                              fontWeight === weight
                                ? `bg-gradient-to-r ${activeTheme.buttonGrad} text-white shadow-xs`
                                : `text-slate-500 hover:text-slate-800`
                            }`}
                          >
                            {weight}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Form Error Container */}
                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-[11px] font-medium">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                          <span>{error}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 bg-gradient-to-r ${activeTheme.buttonGrad} text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                    <span>{isLoading ? "Weaving Classic Poetry..." : "Weave Custom Shayari"}</span>
                  </button>
                </form>
              </motion.div>

              {/* Loading display */}
              {isLoading && (
                <div className="py-16 text-center space-y-4">
                  <div className="relative flex items-center justify-center">
                    <div className={`w-12 h-12 border-2 rounded-full animate-spin ${activeTheme.spinnerBorder}`} />
                    <Sparkles className={`w-4 h-4 absolute animate-pulse ${activeTheme.spinnerIcon}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800 tracking-wide">Weaving poetry matching your heart...</p>
                    <p className="text-[10px] text-slate-400 italic">"Lafz hi to hain jo dil ko chhu lete hain"</p>
                  </div>
                </div>
              )}

              {/* Redesigned Premium Glass Cards Results Section */}
              {!isLoading && generatedShayaris.length > 0 && (
                <div className="space-y-5" id="shayari_list">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Your Custom Poetry Collection
                      </h3>
                    </div>
                    {isOfflineFallback && (
                      <span className="text-[8px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Traditional Gems
                      </span>
                    )}
                  </div>

                  {isOfflineFallback && (
                    <div className="bg-amber-50/70 border border-amber-200/50 rounded-xl p-3 text-amber-900 text-[10px] flex gap-2 shadow-3xs leading-relaxed">
                      <Info className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>
                        <strong className="font-bold text-amber-950">System Notice:</strong> High traffic detected. Presenting curated traditional masterpieces matching your mood!
                      </span>
                    </div>
                  )}

                  <div className="space-y-5">
                    {generatedShayaris.map((shayari, index) => {
                      const isSaved = savedShayaris.some(s => s.sher === shayari.sher);
                      const bgClass = shayari.customBgGradient
                        ? `bg-gradient-to-br ${shayari.customBgGradient}`
                        : shayari.customBgColor
                        ? shayari.customBgColor
                        : activeTheme.cardBg;
                      const textClass = shayari.customTextColor || "text-slate-900";
                      const sizeClass = shayari.customTextSize || "text-2xl xs:text-3xl";
                      const fontClass = shayari.customFontClass || activeFontConfig.class;
                      const weightClass = shayari.customIsBold !== undefined
                        ? (shayari.customIsBold ? "!font-bold" : "!font-normal")
                        : shayariFontWeightClass;
                      const emojiVal = shayari.customEmoji || getMoodEmoji(shayari.mood);

                      const cardSpecs = getAutoAdjustedCardSpecs(
                        (shayari.customRatio || "1:1") as any,
                        sizeClass,
                        shayari.sher,
                        !shayari.isAI && !!shayari.poet
                      );

                      return (
                        <motion.div
                          key={shayari.id || index}
                          id={`shayari-card-${shayari.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          style={{ containerType: "size", ...cardSpecs.cardVariables, ...cardSpecs.cardStyle }}
                          className={`shayari-card relative group overflow-hidden rounded-[32px] ${cardSpecs.paddingClass} backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] ${bgClass} border ${activeTheme.cardBorder} ${activeTheme.cardBorderHover} transition-all duration-500 flex flex-col justify-center items-center ${
                            shayari.customRatio === "4:5" ? "aspect-[4/5]" :
                            shayari.customRatio === "9:16" ? "aspect-[9/16]" :
                            shayari.customRatio === "16:9" ? "aspect-[16/9]" :
                            "aspect-square"
                          }`}
                        >
                          {/* Inner glowing core decoration matching selected theme */}
                          <div className={`absolute -right-12 -bottom-12 w-32 h-32 rounded-full ${activeTheme.accentGlow} blur-3xl pointer-events-none`} />
                          
                          {/* Beautiful background ornament */}
                          <div className={`absolute -right-2 -bottom-6 ${activeTheme.cardDecoration} text-[110px] font-serif select-none pointer-events-none opacity-40 transition-colors duration-500`}>
                            ❦
                          </div>

                          {/* Custom Dragged Image Background if uploaded */}
                          {shayari.customImage && (
                            <div 
                              className="absolute pointer-events-none select-none z-0 overflow-hidden"
                              style={{
                                left: "50%",
                                top: "50%",
                                transform: `translate(calc(-50% + ${shayari.customImageX || 0}px), calc(-50% + ${shayari.customImageY || 0}px)) scale(${shayari.customImageScale !== undefined ? shayari.customImageScale : 1}) rotate(${shayari.customImageRotate || 0}deg)`,
                                width: (shayari.customImageMode || "small") === "small" ? "160px" : "100%",
                                height: (shayari.customImageMode || "small") === "small" ? "160px" : "100%",
                                opacity: (shayari.customImageMode || "small") === "small" ? 0.45 : 0.4,
                              }}
                            >
                              <img 
                                src={shayari.customImage} 
                                alt="Custom ornament" 
                                className={`w-full h-full pointer-events-none ${
                                  (shayari.customImageMode || "small") === "small" ? "object-cover rounded-2xl" :
                                  shayari.customImageMode === "fit" ? "object-contain" :
                                  shayari.customImageMode === "fill" ? "object-fill" :
                                  shayari.customImageMode === "contain" ? "object-contain" :
                                  "object-cover"
                                }`}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}

                          {/* Card top bar: actions & badges */}
                          <div className={`absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 border-b ${activeTheme.cardBorder} z-20`} data-download-ignore="true">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-lg border ${activeTheme.tagClassic} shadow-3xs`}>
                                #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                              </span>
                              {shayari.isAI ? (
                                <span className={`text-[8px] font-extrabold ${activeTheme.tagAi} px-2 py-0.5 rounded-full uppercase tracking-wider border transition-all duration-300`}>
                                  ✨ AI Original
                                </span>
                              ) : (
                                <span className={`text-[8px] font-extrabold ${activeTheme.tagClassic} px-2 py-0.5 rounded-full uppercase tracking-wider border transition-all duration-300`}>
                                  📜 Masterpiece
                                </span>
                              )}
                              <span className={`text-[8px] ${activeTheme.tagMood} px-2 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider flex items-center gap-0.5 shadow-3xs border`}>
                                <span>{emojiVal}</span>
                                <span>{shayari.mood || "Poetry"}</span>
                              </span>
                            </div>

                            {/* Actions layout */}
                            <div className="flex items-center gap-1.5 animate-fade-in" data-download-ignore="true">
                              {/* Edit Card Button */}
                              <button
                                onClick={() => handleStartEdit(shayari)}
                                className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer bg-white/60 ${activeTheme.cardBorder} ${activeTheme.iconColor} hover:text-indigo-600 hover:bg-indigo-50/50`}
                                title="Edit Card Style & Text"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>

                              {/* Download Image Action */}
                              <button
                                onClick={() => handleDownloadImage(shayari)}
                                disabled={downloadingId === shayari.id}
                                className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                                  downloadingId === shayari.id
                                    ? "bg-amber-50 border-amber-100 text-amber-600 animate-pulse"
                                    : `bg-white/60 ${activeTheme.cardBorder} ${activeTheme.iconColor} hover:text-amber-600 hover:bg-amber-50/50`
                                }`}
                                title="Download Card as Image"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>

                              {/* Save Heart Button */}
                              <button
                                onClick={() => toggleSaveShayari(shayari)}
                                className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                                  isSaved
                                    ? "bg-red-50 border-red-100 text-red-500"
                                    : `bg-white/60 ${activeTheme.cardBorder} ${activeTheme.iconColor} hover:text-red-500 hover:bg-red-50/50`
                                }`}
                                title="Favorite"
                              >
                                <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-red-500" : ""}`} />
                              </button>
                              
                              {/* Copy Action */}
                              <button
                                onClick={() => handleCopy(shayari)}
                                className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                                  copiedId === shayari.id
                                    ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                                    : `bg-white/60 ${activeTheme.cardBorder} ${activeTheme.iconColor} hover:text-slate-800 hover:bg-white`
                                }`}
                                title="Copy"
                              >
                                {copiedId === shayari.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          {/* Shayari Core Verses - Redesigned with Oversized Premium font */}
                          <div 
                            className="w-full flex flex-col items-center justify-center relative z-10 py-1"
                            style={{ ...cardSpecs.innerWrapperStyle }}
                          >
                            {/* Centered Emoji Icon Element */}
                            <div 
                              className={`${cardSpecs.emojiMarginClass} flex items-center justify-center`}
                              style={{ ...cardSpecs.emojiContainerStyle }}
                            >
                              <span 
                                className={`${cardSpecs.emojiClass} filter drop-shadow-sm select-none`}
                                style={{ ...cardSpecs.emojiStyle }}
                              >
                                {emojiVal}
                              </span>
                            </div>

                            {/* Urdu / Hindi Script text - Spaced naturally with our dynamic paragraph gap system */}
                            <div 
                              className="w-full flex flex-col items-center justify-center text-center"
                              style={{ ...cardSpecs.verseContainerStyle }}
                            >
                              {shayari.sher.split('\n').map((line, lineIdx) => {
                                const trimmed = line.trim();
                                if (!trimmed) return null;
                                return (
                                  <p 
                                    key={lineIdx}
                                    className={`${cardSpecs.fontSizeClass} ${textClass} text-center ${cardSpecs.leadingClass} tracking-wide ${cardSpecs.containerClass} ${fontClass} ${weightClass} transition-all duration-300`}
                                    style={{ ...cardSpecs.textStyle }}
                                  >
                                    {trimmed}
                                  </p>
                                );
                              })}
                            </div>

                            {/* Poet Detail */}
                            {!shayari.isAI && shayari.poet && (
                              <div 
                                className={`${cardSpecs.poetMarginClass} flex items-center justify-center`}
                                style={{ ...cardSpecs.poetContainerStyle }}
                              >
                                <span 
                                  className={`text-[8px] font-mono tracking-wider ${activeTheme.poetTag} px-3 py-1 rounded-full uppercase shadow-3xs border`}
                                  style={{ ...cardSpecs.poetStyle }}
                                >
                                  Poet: <span className={`font-sans font-extrabold ${activeTheme.poetBold}`}>{shayari.poet}</span>
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Empty state when no generated shayaris exist */}
              {!isLoading && generatedShayaris.length === 0 && (
                <div className={`text-center py-16 px-6 border border-dashed rounded-[24px] ${activeTheme.cardBorder} ${activeTheme.subCardBg} backdrop-blur-xs`}>
                  <div className={`w-12 h-12 rounded-full ${activeTheme.iconBg} border ${activeTheme.cardBorder} flex items-center justify-center mx-auto mb-4`}>
                    <Sparkles className={`w-5 h-5 ${activeTheme.iconColor}`} />
                  </div>
                  <h3 className={`text-xs font-bold mb-1 ${activeTheme.textColor}`}>Your personalized anthology is waiting</h3>
                  <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-normal">
                    Describe your emotions above (e.g. parting rain, nostalgic friendship) and watch your classical compilation appear in beautiful glass cards.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "saved" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <BookMarked className={`w-4 h-4 ${activeTheme.iconColor}`} />
                  <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Your Saved Poetry Library ({savedShayaris.length})
                  </h2>
                </div>
                {savedShayaris.length > 0 && (
                  <button
                    onClick={clearSavedAll}
                    className="text-[9px] font-bold text-red-500 hover:text-red-700 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {savedShayaris.length === 0 ? (
                <div className={`text-center py-20 px-6 border border-dashed rounded-[28px] ${activeTheme.cardBorder} ${activeTheme.subCardBg} backdrop-blur-xs`}>
                  <div className={`w-12 h-12 rounded-full ${activeTheme.iconBg} border ${activeTheme.cardBorder} flex items-center justify-center mx-auto mb-4`}>
                    <Heart className={`w-5 h-5 ${activeTheme.iconColor}`} />
                  </div>
                  <h3 className={`text-xs font-extrabold mb-1 ${activeTheme.textColor}`}>Your library is currently empty</h3>
                  <p className="text-[10px] text-slate-400 max-w-xs mx-auto leading-normal">
                    Whenever you read a poetry you love, tap the heart (❤️) button to save it in your private anthology forever.
                  </p>
                  <button
                    onClick={() => setActiveTab("generator")}
                    className={`mt-4 inline-flex items-center gap-1 text-[10px] font-bold text-white px-4 py-2 bg-gradient-to-r ${activeTheme.buttonGrad} rounded-lg cursor-pointer shadow-sm active:scale-95 transition-all`}
                  >
                    <span>Weave Poetry Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {savedShayaris.map((shayari, index) => {
                    const bgClass = shayari.customBgGradient
                      ? `bg-gradient-to-br ${shayari.customBgGradient}`
                      : shayari.customBgColor
                      ? shayari.customBgColor
                      : activeTheme.cardBg;
                    const textClass = shayari.customTextColor || "text-slate-900";
                    const sizeClass = shayari.customTextSize || "text-2xl";
                    const fontClass = shayari.customFontClass || activeFontConfig.class;
                    const weightClass = shayari.customIsBold !== undefined
                      ? (shayari.customIsBold ? "!font-bold" : "!font-normal")
                      : shayariFontWeightClass;
                    const emojiVal = shayari.customEmoji || getMoodEmoji(shayari.mood);

                    const cardSpecs = getAutoAdjustedCardSpecs(
                      (shayari.customRatio || "1:1") as any,
                      sizeClass,
                      shayari.sher,
                      !shayari.isAI && !!shayari.poet
                    );

                    return (
                      <div
                        key={shayari.id || index}
                        id={`shayari-card-${shayari.id}`}
                        style={{ containerType: "size", ...cardSpecs.cardVariables, ...cardSpecs.cardStyle }}
                        className={`shayari-card relative overflow-hidden rounded-[32px] ${cardSpecs.paddingClass} backdrop-blur-xl ${bgClass} border ${activeTheme.cardBorder} shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-center items-center ${
                          shayari.customRatio === "4:5" ? "aspect-[4/5]" :
                          shayari.customRatio === "9:16" ? "aspect-[9/16]" :
                          shayari.customRatio === "16:9" ? "aspect-[16/9]" :
                          "aspect-square"
                        }`}
                      >
                        {/* Custom Dragged Image Background if uploaded */}
                        {shayari.customImage && (
                          <div 
                            className="absolute pointer-events-none select-none z-0 overflow-hidden"
                            style={{
                              left: "50%",
                              top: "50%",
                              transform: `translate(calc(-50% + ${shayari.customImageX || 0}px), calc(-50% + ${shayari.customImageY || 0}px)) scale(${shayari.customImageScale !== undefined ? shayari.customImageScale : 1}) rotate(${shayari.customImageRotate || 0}deg)`,
                              width: (shayari.customImageMode || "small") === "small" ? "160px" : "100%",
                              height: (shayari.customImageMode || "small") === "small" ? "160px" : "100%",
                              opacity: (shayari.customImageMode || "small") === "small" ? 0.45 : 0.4,
                            }}
                          >
                            <img 
                              src={shayari.customImage} 
                              alt="Custom ornament" 
                              className={`w-full h-full pointer-events-none ${
                                (shayari.customImageMode || "small") === "small" ? "object-cover rounded-2xl" :
                                shayari.customImageMode === "fit" ? "object-contain" :
                                shayari.customImageMode === "fill" ? "object-fill" :
                                shayari.customImageMode === "contain" ? "object-contain" :
                                "object-cover"
                              }`}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        <div className={`absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 border-b ${activeTheme.cardBorder} z-20`} data-download-ignore="true">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[8px] px-2 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider flex items-center gap-0.5 border ${activeTheme.tagMood} shadow-3xs`}>
                              <span>{emojiVal}</span>
                              <span>{shayari.mood || "Poetry"}</span>
                            </span>
                            {shayari.isAI ? (
                              <span className={`text-[8px] font-extrabold ${activeTheme.tagAi} px-2 py-0.5 rounded-full uppercase tracking-wider border transition-all duration-300`}>
                                ✨ AI Original
                              </span>
                            ) : (
                              <span className={`text-[8px] font-extrabold ${activeTheme.tagClassic} px-2 py-0.5 rounded-full uppercase tracking-wider border transition-all duration-300`}>
                                📜 Masterpiece
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5" data-download-ignore="true">
                            {/* Edit Card Button */}
                            <button
                              onClick={() => handleStartEdit(shayari)}
                              className={`p-1.5 rounded-full border border-slate-200 bg-white/60 ${activeTheme.iconColor} hover:text-indigo-600 hover:bg-indigo-50/50 cursor-pointer hover:scale-105 active:scale-95 transition-all`}
                              title="Edit Card Style & Text"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            {/* Download Image Action */}
                            <button
                              onClick={() => handleDownloadImage(shayari)}
                              disabled={downloadingId === shayari.id}
                              className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                                downloadingId === shayari.id
                                  ? "bg-amber-50 border-amber-100 text-amber-600 animate-pulse"
                                  : `bg-white/60 ${activeTheme.cardBorder} ${activeTheme.iconColor} hover:text-amber-600 hover:bg-amber-50/50`
                              }`}
                              title="Download Card as Image"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => toggleSaveShayari(shayari)}
                              className="p-1.5 rounded-full border border-red-100 bg-red-50 text-red-500 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                              title="Remove Favorite"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleCopy(shayari)}
                              className={`p-1.5 rounded-full border ${activeTheme.cardBorder} bg-white/60 ${activeTheme.iconColor} hover:bg-white cursor-pointer hover:scale-105 active:scale-95 transition-all`}
                              title="Copy"
                            >
                              {copiedId === shayari.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <div 
                          className="w-full flex flex-col items-center justify-center py-1 relative z-10"
                          style={{ ...cardSpecs.innerWrapperStyle }}
                        >
                          {/* Centered Emoji Icon Element */}
                          <div 
                            className={`${cardSpecs.emojiMarginClass} flex items-center justify-center`}
                            style={{ ...cardSpecs.emojiContainerStyle }}
                          >
                            <span 
                              className={`${cardSpecs.emojiClass} filter drop-shadow-sm select-none`}
                              style={{ ...cardSpecs.emojiStyle }}
                            >
                              {emojiVal}
                            </span>
                          </div>

                           {/* Urdu / Hindi Script text - Spaced naturally with our dynamic paragraph gap system */}
                           <div 
                             className="w-full flex flex-col items-center justify-center text-center"
                             style={{ ...cardSpecs.verseContainerStyle }}
                           >
                             {shayari.sher.split('\n').map((line, lineIdx) => {
                               const trimmed = line.trim();
                               if (!trimmed) return null;
                               return (
                                 <p 
                                   key={lineIdx}
                                   className={`${cardSpecs.fontSizeClass} ${textClass} text-center ${cardSpecs.leadingClass} tracking-wide ${cardSpecs.containerClass} ${fontClass} ${weightClass} transition-all duration-300`}
                                   style={{ ...cardSpecs.textStyle }}
                                 >
                                   {trimmed}
                                 </p>
                               );
                             })}
                           </div>
                          {!shayari.isAI && shayari.poet && (
                            <div 
                              className={`${cardSpecs.poetMarginClass} flex items-center justify-center`}
                              style={{ ...cardSpecs.poetContainerStyle }}
                            >
                              <span 
                                className={`text-[8px] font-mono tracking-wider ${activeTheme.poetTag} px-2.5 py-0.5 rounded-full border`}
                                style={{ ...cardSpecs.poetStyle }}
                              >
                                Poet: <span className={`font-bold ${activeTheme.poetBold}`}>{shayari.poet}</span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-6">
              
              {/* Educational Card on Poetry styles */}
              <div className={`border rounded-[28px] p-5 shadow-sm space-y-3 ${activeTheme.formCardBg} ${activeTheme.cardBorder}`}>
                <h3 className={`text-xs font-black uppercase tracking-widest ${activeTheme.textColor}`}>
                  Urdu Poetry Formats Explained
                </h3>
                <div className="space-y-3.5 text-[11px] text-slate-600 leading-relaxed">
                  <div className={`border-l-2 ${activeTheme.borderAccent} pl-3.5`}>
                    <strong className={`block ${activeTheme.textColor} font-bold`}>Sher (Couplet):</strong>
                    A self-contained unit of two lines (Misra). It is complete in itself, expressing an independent poetic idea.
                  </div>
                  <div className={`border-l-2 ${activeTheme.borderAccent} pl-3.5`}>
                    <strong className={`block ${activeTheme.textColor} font-bold`}>Ghazal:</strong>
                    A collection of independent shers sharing a common meter, rhyme pattern (Radeef and Qafia). Each sher explores different aspects of pain, existential crisis, or romantic yearning.
                  </div>
                  <div className={`border-l-2 ${activeTheme.borderAccent} pl-3.5`}>
                    <strong className={`block ${activeTheme.textColor} font-bold`}>Nazm:</strong>
                    Unlike Ghazal, a Nazm is a structured, descriptive poem written around a single continuous theme or social concern.
                  </div>
                </div>
              </div>

              {/* Legends Section */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">
                  Legendary Poetic Masters
                </h3>

                <div className="space-y-4">
                  {POET_LEGENDS.map((poet, idx) => (
                    <div 
                      key={idx} 
                      className={`border rounded-[24px] p-4.5 space-y-3 ${activeTheme.cardBg} ${activeTheme.cardBorder}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className={`text-xs font-black ${activeTheme.textColor}`}>{poet.name}</h4>
                          <span className="text-[9px] font-mono font-bold text-slate-400">{poet.era}</span>
                        </div>
                        <span className={`text-[8px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded-full ${activeTheme.tagClassic}`}>
                          {poet.style}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">{poet.desc}</p>

                      <div className={`border rounded-xl p-3 text-center ${activeTheme.subCardBg} ${activeTheme.cardBorder}`}>
                        <p className={`text-sm leading-relaxed font-serif italic whitespace-pre-line ${activeTheme.textColor} ${shayariFontWeightClass}`}>
                          "{poet.famousSher}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-5">
              
              {/* Theme Settings Panel */}
              <div className={`border rounded-[28px] p-5 shadow-sm space-y-4 ${activeTheme.formCardBg} ${activeTheme.cardBorder}`}>
                <div>
                  <h3 className={`text-xs font-black uppercase tracking-widest ${activeTheme.textColor}`}>
                    Interactive Device Palette
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                    Switch the accent tone of your native companion app.
                  </p>
                </div>

                <div className="space-y-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleThemeChange(t.id)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        currentThemeId === t.id
                          ? `bg-gradient-to-r ${t.buttonGrad} text-white font-bold border-transparent shadow-sm`
                          : `bg-white/70 border-slate-200 hover:bg-slate-50 text-slate-750`
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-3.5 h-3.5 rounded-full ${t.colorClass} border border-white/40`} />
                        <span className="text-[11px] font-bold">{t.name}</span>
                      </div>
                      {currentThemeId === t.id && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography Weight Settings Panel */}
              <div className={`border rounded-[28px] p-5 shadow-sm space-y-4 ${activeTheme.formCardBg} ${activeTheme.cardBorder}`}>
                <div>
                  <h3 className={`text-xs font-black uppercase tracking-widest ${activeTheme.textColor}`}>
                    Typography Weight
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                    Select your preferred weight for reading classical couplets.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {(["normal", "bold"] as const).map((weight) => (
                    <button
                      key={weight}
                      onClick={() => handleFontWeightChange(weight)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        fontWeight === weight
                          ? `bg-gradient-to-r ${activeTheme.buttonGrad} text-white font-bold border-transparent shadow-sm`
                          : `bg-white/70 border-slate-200 hover:bg-slate-50 text-slate-750`
                      }`}
                    >
                      <span className="text-[11px] font-bold capitalize">{weight}</span>
                      {fontWeight === weight && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences Summary */}
              <div className="bg-slate-100/60 border border-slate-200/40 rounded-[24px] p-4.5 text-[10px] text-slate-500 space-y-2 leading-relaxed">
                <span className="font-black text-slate-400 uppercase tracking-widest block mb-1">Device Details</span>
                <div className="flex justify-between">
                  <span>Poetry Font Config</span>
                  <span className="font-mono font-bold text-slate-700 capitalize">{selectedFont}</span>
                </div>
                <div className="flex justify-between">
                  <span>Poetic Font Weight</span>
                  <span className="font-mono font-bold text-slate-700 capitalize">{fontWeight}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accent Theme Color</span>
                  <span className="font-mono font-bold text-slate-700 capitalize">{currentThemeId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saved Verses Count</span>
                  <span className="font-mono font-bold text-slate-700">{savedShayaris.length} Coupled</span>
                </div>
                <div className="flex justify-between">
                  <span>Layout Saved Cache</span>
                  <span className="font-mono font-bold text-emerald-600">Active (Auto-Sync)</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Dynamic Android Material Bottom Tab Bar */}
        <nav className={`absolute bottom-0 left-0 right-0 h-16 ${activeTheme.navBg} border-t ${activeTheme.navBorder} backdrop-blur-md flex items-center justify-around z-30 shrink-0`}>
          <button
            onClick={() => setActiveTab("generator")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
              activeTab === "generator" ? activeTheme.iconColor + " scale-105 font-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[9px] font-sans">Weave</span>
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`flex flex-col items-center gap-1 cursor-pointer relative transition-all ${
              activeTab === "saved" ? activeTheme.iconColor + " scale-105 font-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-[9px] font-sans">Saved</span>
            {savedShayaris.length > 0 && (
              <span className={`absolute -top-1.5 -right-2 bg-gradient-to-r ${activeTheme.buttonGrad} text-white text-[8px] font-mono font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce shadow-3xs`}>
                {savedShayaris.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
              activeTab === "about" ? activeTheme.iconColor + " scale-105 font-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[9px] font-sans">Legends</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
              activeTab === "settings" ? activeTheme.iconColor + " scale-105 font-black" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Palette className="w-5 h-5" />
            <span className="text-[9px] font-sans">Theme</span>
          </button>
        </nav>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center font-sans antialiased relative selection:bg-purple-200/70" id="app_root">
      
      {/* Background aesthetics when viewing simulated phone mockup */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-slate-950">
        <div className={`absolute -top-[30%] -left-[20%] w-[80%] h-[80%] rounded-full opacity-15 blur-[160px] bg-current ${activeTheme.iconColor} transition-all duration-700`} />
        <div className={`absolute -bottom-[30%] -right-[20%] w-[80%] h-[80%] rounded-full opacity-15 blur-[160px] bg-current ${activeTheme.iconColor} transition-all duration-700`} />
      </div>

      {/* Floating desktop toolbar switch to toggle Phone shell vs Full Screen */}
      <div className="relative z-20 mb-5 mt-4 flex items-center gap-3 bg-slate-900/80 p-1.5 rounded-full border border-slate-800/80 shadow-xl backdrop-blur-xl shrink-0">
        <button
          onClick={() => setIsPhoneView(true)}
          className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
            isPhoneView
              ? `bg-gradient-to-r ${activeTheme.buttonGrad} text-white shadow-md`
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>📱 Android View</span>
        </button>
        <button
          onClick={() => setIsPhoneView(false)}
          className={`flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
            !isPhoneView
              ? `bg-gradient-to-r ${activeTheme.buttonGrad} text-white shadow-md`
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>💻 Full Screen</span>
        </button>
      </div>

      {/* Real-time Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 ${activeTheme.toastBg} border text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 font-mono uppercase tracking-widest`}
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Layout Engine */}
      {isPhoneView ? (
        /* Real Android Phone Chassis Mockup centering on screen */
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[395px] aspect-[9/19.5] bg-slate-950 rounded-[54px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8)] border-[11px] border-slate-900 flex flex-col relative overflow-hidden shrink-0 outline-none select-none ring-1 ring-white/10"
          id="android_frame"
        >
          {/* Bezel Side buttons */}
          <div className="absolute right-[-11px] top-28 w-[3px] h-10 bg-slate-800 rounded-l-lg z-50" />
          <div className="absolute right-[-11px] top-44 w-[3px] h-16 bg-slate-800 rounded-l-lg z-50" />

          {/* Android Speaker Grill slot */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-800 rounded-full z-50" />
          
          {/* Android Front Camera Notch Hole */}
          <div className="absolute top-4.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 bg-slate-950 rounded-full z-50 flex items-center justify-center ring-1 ring-slate-800/60">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b]" />
          </div>

          {/* Device Screen Area */}
          <div className={`flex-1 flex flex-col overflow-hidden relative bg-gradient-to-b ${activeTheme.bgGrad}`}>
            
            {/* Real-time Android Status Bar widget */}
            <div className={`h-10 pt-4 px-6 flex items-center justify-between text-[11px] font-bold select-none z-40 ${activeTheme.textColor} bg-white/30 backdrop-blur-xs shrink-0 transition-colors duration-300`}>
              <span className="font-sans flex items-center gap-1">
                <span>{currentTime}</span>
                <span className="text-[9px] opacity-75">🪶</span>
              </span>
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3 text-current opacity-80" />
                <span className="text-[8px] font-black tracking-tighter opacity-80">5G</span>
                <Wifi className="w-3.5 h-3.5 text-current opacity-80" />
                <Battery className="w-4 h-4 text-current opacity-80" />
              </div>
            </div>

            {/* Inner App Content Scrollable Container */}
            {renderAppContent()}

            {/* Android Navigation Gesture Indicator pill */}
            <div className="absolute bottom-1.5 left-0 right-0 z-50 pointer-events-none">
              <div className="w-24 h-1 bg-slate-900/20 hover:bg-slate-900/40 rounded-full mx-auto" />
            </div>

          </div>
        </motion.div>
      ) : (
        /* Full Screen fluid landscape mode (still preserves beautiful Android status bar & layouts!) */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`w-full max-w-4xl min-h-[90vh] md:my-6 rounded-3xl overflow-hidden relative flex flex-col bg-gradient-to-b ${activeTheme.bgGrad} shadow-[0_20px_60px_rgba(0,0,0,0.5)] border ${activeTheme.cardBorder}`}
          id="full_screen_content"
        >
          {/* Top Android Status Bar */}
          <div className={`h-9 px-6 flex items-center justify-between text-[11px] font-bold select-none z-40 ${activeTheme.textColor} bg-white/25 backdrop-blur-xs shrink-0 border-b ${activeTheme.cardBorder} transition-colors duration-300`}>
            <span className="font-sans flex items-center gap-1">
              <span>{currentTime}</span>
              <span className="text-[9px] opacity-70">🪶</span>
            </span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3 opacity-80" />
              <span className="text-[8px] font-black tracking-tighter opacity-70">5G</span>
              <Wifi className="w-3.5 h-3.5 opacity-80" />
              <Battery className="w-4 h-4 opacity-80" />
            </div>
          </div>

          {/* Render app contents inside */}
          <div className="flex-1 flex flex-col min-h-0 relative">
            {renderAppContent()}
          </div>
        </motion.div>
      )}

      {/* Shayari Card Custom Editor Modal */}
      <AnimatePresence>
        {editingShayari && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden border border-slate-200/50 shadow-2xl flex flex-col relative max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg bg-indigo-50 ${activeTheme.iconColor}`}>
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Customize Poetry Card</h3>
                    <p className="text-[9px] text-slate-400 font-medium">Design your custom visual masterwork</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingShayari(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body Container (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 select-none">
                
                {/* LIVE PREVIEW SECTION */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Live Design Card Preview</span>
                  
                  {
                    (() => {
                      const modalSpecs = getAutoAdjustedCardSpecs(
                        editedRatio as any,
                        editedTextSize,
                        editedSher,
                        !editingShayari.isAI && !!editingShayari.poet
                      );

                      return (
                        <div 
                          id="custom-card-preview"
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseUp}
                          style={{ containerType: "size", ...modalSpecs.cardVariables, ...modalSpecs.cardStyle }}
                          className={`shayari-card relative overflow-hidden rounded-[24px] ${modalSpecs.paddingClass} border border-slate-150 shadow-md flex flex-col justify-center items-center transition-all duration-300 ${
                            editedRatio === "4:5" ? "aspect-[4/5] w-full max-w-[240px] sm:max-w-[260px] mx-auto" :
                            editedRatio === "9:16" ? "aspect-[9/16] w-full max-w-[180px] sm:max-w-[200px] mx-auto" :
                            editedRatio === "16:9" ? "aspect-[16/9] w-full max-w-[360px] sm:max-w-[400px] mx-auto" :
                            "aspect-square w-full max-w-[280px] sm:max-w-[300px] mx-auto"
                          } ${
                            editedBgGradient ? `bg-gradient-to-br ${editedBgGradient}` : editedBgColor || "bg-slate-50"
                          }`}
                        >
                          {/* Inner glowing core decoration matching selected theme */}
                          <div className="absolute -right-12 -bottom-12 w-28 h-28 rounded-full bg-slate-900/5 blur-2xl pointer-events-none" />

                          {/* Drag instruction overlay if there is an image */}
                          {editedImage && (
                            <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full pointer-events-none z-20">
                              Drag Image to Position
                            </div>
                          )}

                          {/* Base64 Decorative Image Background */}
                          {editedImage ? (
                            <div
                              className={`absolute select-none cursor-move z-0 overflow-hidden ${
                                editedImageMode === "small" ? "border border-white/20 shadow-inner rounded-2xl" : ""
                              }`}
                              style={{
                                left: "50%",
                                top: "50%",
                                transform: `translate(calc(-50% + ${imagePos.x}px), calc(-50% + ${imagePos.y}px)) scale(${editedImageScale}) rotate(${editedImageRotate}deg)`,
                                width: editedImageMode === "small" ? "140px" : "100%",
                                height: editedImageMode === "small" ? "140px" : "100%",
                                opacity: editedImageMode === "small" ? 0.55 : 0.45,
                              }}
                              onMouseDown={handleMouseDown}
                              onTouchStart={handleTouchStart}
                              onTouchMove={handleTouchMove}
                              onTouchEnd={handleTouchEnd}
                            >
                              <img
                                src={editedImage}
                                alt="drag-preview"
                                className={`w-full h-full pointer-events-none ${
                                  editedImageMode === "small" ? "object-cover rounded-2xl" :
                                  editedImageMode === "fit" ? "object-contain" :
                                  editedImageMode === "fill" ? "object-fill" :
                                  editedImageMode === "contain" ? "object-contain" :
                                  "object-cover"
                                }`}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ) : (
                            <div className="absolute -right-2 -bottom-6 text-slate-300 text-8xl font-serif select-none pointer-events-none opacity-20">
                              ❦
                            </div>
                          )}

                          {/* Card preview top metadata bar */}
                          <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4.5 py-3 border-b border-black/5 z-20">
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] bg-black/5 px-2 py-0.5 rounded font-extrabold flex items-center justify-center">
                                {editedEmoji}
                              </span>
                              <span className="text-[8px] uppercase tracking-wider font-black text-slate-500">
                                #{editingShayari.id.slice(0, 4).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-400">
                              Custom Styled
                            </span>
                          </div>

                          {/* Card preview shayari verses */}
                          <div 
                            className="w-full flex flex-col items-center justify-center relative z-10 py-1.5"
                            style={{ ...modalSpecs.innerWrapperStyle }}
                          >
                            {/* Centered Emoji Icon Element */}
                            <div 
                              className={`${modalSpecs.emojiMarginClass} flex items-center justify-center`}
                              style={{ ...modalSpecs.emojiContainerStyle }}
                            >
                              <span 
                                className={`${modalSpecs.emojiClass} filter drop-shadow-sm select-none`}
                                style={{ ...modalSpecs.emojiStyle }}
                              >
                                {editedEmoji}
                              </span>
                            </div>

                            {/* Urdu / Hindi Script text - Spaced naturally with our dynamic paragraph gap system */}
                            <div 
                              className="w-full flex flex-col items-center justify-center text-center"
                              style={{ ...modalSpecs.verseContainerStyle }}
                            >
                              {(editedSher || "Your beautiful verse will appear here...").split('\n').map((line, lineIdx) => {
                                const trimmed = line.trim();
                                if (!trimmed) return null;
                                return (
                                  <p 
                                    key={lineIdx}
                                    className={`${modalSpecs.fontSizeClass} ${editedTextColor} text-center ${modalSpecs.leadingClass} ${modalSpecs.containerClass} ${editedFontClass} ${editedIsBold ? "!font-bold" : "!font-normal"} transition-all duration-300`}
                                    style={{ ...modalSpecs.textStyle }}
                                  >
                                    {trimmed}
                                  </p>
                                );
                              })}
                            </div>
                            {!editingShayari.isAI && editingShayari.poet && (
                              <div 
                                className={`${modalSpecs.poetMarginClass} flex items-center justify-center`}
                                style={{ ...modalSpecs.poetContainerStyle }}
                              >
                                <span 
                                  className={`text-[8px] font-mono tracking-wider ${activeTheme.poetTag} px-2.5 py-0.5 rounded-full border`}
                                  style={{ ...modalSpecs.poetStyle }}
                                >
                                  Poet: <span className={`font-bold ${activeTheme.poetBold}`}>{editingShayari.poet}</span>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()
                  }
                </div>

                {/* EDIT POETRY TEXT */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Poetry Text (Sher)</label>
                  <textarea
                    value={editedSher}
                    onChange={(e) => setEditedSher(e.target.value)}
                    rows={3}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800 leading-relaxed outline-none"
                    placeholder="Enter shayari text here..."
                  />
                </div>

                {/* EDIT MOOD EMOJI */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Custom Card Emoji</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={8}
                      value={editedEmoji}
                      onChange={(e) => setEditedEmoji(e.target.value)}
                      className="w-20 text-center px-2 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-bold outline-none"
                    />
                    <div className="flex gap-1.5 overflow-x-auto flex-1 pb-1">
                      {["✨", "❤️", "😢", "💔", "🤝", "😎", "😂", "💪", "🌹", "🕯️", "🌧️", "🌌"].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setEditedEmoji(emoji)}
                          className={`px-2.5 py-1.5 border rounded-lg text-xs cursor-pointer transition-all hover:bg-slate-50 ${
                            editedEmoji === emoji ? "border-indigo-500 bg-indigo-50 font-bold text-indigo-700" : "border-slate-100 bg-white"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CARD RATIO SELECTION */}
                <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Card Aspect Ratio</label>
                    <button
                      type="button"
                      onClick={handleAutoFitText}
                      className="text-[9px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-wider flex items-center gap-1 cursor-pointer bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100/50 hover:bg-indigo-100 transition-all active:scale-95"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
                      Fit Text
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: "1:1", label: "Square", ratio: "1:1" },
                      { id: "4:5", label: "Portrait", ratio: "4:5" },
                      { id: "9:16", label: "Story", ratio: "9:16" },
                      { id: "16:9", label: "Landscape", ratio: "16:9" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEditedRatio(item.id as any)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer text-center ${
                          editedRatio === item.id
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-[10px] font-extrabold">{item.label}</span>
                        <span className={`text-[9px] font-mono mt-0.5 ${editedRatio === item.id ? "text-indigo-100" : "text-slate-400"}`}>
                          {item.ratio}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-slate-400 font-medium leading-normal mt-1">
                    {editedRatio === "1:1" && "⬜ Square: Perfect for Instagram grid posts and standard layouts."}
                    {editedRatio === "4:5" && "📱 Portrait: Optimized for mobile feeds and high-density posts."}
                    {editedRatio === "9:16" && "🎬 Story: Ideal for Instagram Stories, TikToks, and vertical sharing."}
                    {editedRatio === "16:9" && "🖥️ Landscape: Best for widescreen displays and horizontal banners."}
                  </p>
                </div>

                {/* BACKGROUND OPTIONS */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Card Background style</label>
                  </div>
                  
                  {/* Solid Colors Presets */}
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Solid Background Colors</span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { name: "Cream Soft", class: "bg-slate-50 text-slate-900 border-slate-200" },
                        { name: "Slate Dusk", class: "bg-slate-900 text-slate-100 border-slate-850" },
                        { name: "Sand Glow", class: "bg-amber-50/90 text-amber-950 border-amber-100" },
                        { name: "Velvet Rose", class: "bg-rose-50/90 text-rose-950 border-rose-150" },
                        { name: "Sage Green", class: "bg-emerald-50/90 text-emerald-950 border-emerald-150" },
                        { name: "Midnight Navy", class: "bg-indigo-950 text-indigo-50 border-indigo-900" },
                        { name: "Golden Ebony", class: "bg-amber-950 text-amber-50 border-amber-900" },
                        { name: "Purple Night", class: "bg-purple-950 text-purple-50 border-purple-900" },
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => {
                            setEditedBgColor(item.class.split(" ")[0]);
                            setEditedBgGradient("");
                          }}
                          className={`p-1.5 rounded-lg border text-[9px] font-bold text-center cursor-pointer transition-all ${
                            item.class.split(" ")[0]
                          } ${
                            editedBgColor === item.class.split(" ")[0] && !editedBgGradient
                              ? "ring-2 ring-indigo-500 scale-[1.03] border-indigo-500"
                              : "hover:scale-[1.01]"
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gradient Presets */}
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">Luxury Gradients</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { name: "Sunset Serenade", grad: "from-amber-200 via-orange-100 to-rose-200" },
                        { name: "Cosmic Indigo", grad: "from-violet-600 to-indigo-700" },
                        { name: "Jade Forest", grad: "from-emerald-800 to-teal-950" },
                        { name: "Romantic Rosewood", grad: "from-rose-400 to-pink-600" },
                        { name: "Sky Celestial", grad: "from-sky-400 to-blue-600" },
                        { name: "Obsidian Charcoal", grad: "from-slate-800 via-slate-900 to-slate-950" },
                        { name: "Mystic Velvet", grad: "from-fuchsia-900 via-violet-900 to-indigo-900" },
                        { name: "Mint Emerald", grad: "from-teal-300 via-emerald-100 to-indigo-200" },
                        { name: "Vintage Sepia", grad: "from-amber-100 to-amber-200" },
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => {
                            setEditedBgGradient(item.grad);
                            setEditedBgColor("");
                          }}
                          className={`p-1.5 rounded-lg border text-[9px] font-bold text-center text-white bg-gradient-to-br ${
                            item.grad
                          } ${
                            editedBgGradient === item.grad
                              ? "ring-2 ring-indigo-500 scale-[1.03] border-indigo-500 text-slate-950 font-black"
                              : "hover:scale-[1.01] text-slate-800/80"
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TEXT SETTINGS */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Font Style Selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Font Family</label>
                    <select
                      value={editedFontClass}
                      onChange={(e) => setEditedFontClass(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-bold text-slate-700 bg-white outline-none"
                    >
                      {FONTS.map((font) => (
                        <option key={font.id} value={font.class}>
                          {font.name} Font
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Font Size Selection */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Font Size</label>
                      <button
                        type="button"
                        onClick={handleAutoFitText}
                        className="text-[9px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-wider flex items-center gap-0.5 cursor-pointer hover:underline transition-all active:scale-95"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
                        Auto-Fit
                      </button>
                    </div>
                    <select
                      value={editedTextSize}
                      onChange={(e) => setEditedTextSize(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-bold text-slate-700 bg-white outline-none"
                    >
                      <option value="text-base">Compact (Small)</option>
                      <option value="text-lg">Readable (Medium)</option>
                      <option value="text-xl">Standard (Classic)</option>
                      <option value="text-2xl">Grande (Large)</option>
                      <option value="text-3xl">Oversized (Bold)</option>
                      <option value="text-4xl">Epic (Extra Large)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Text Color Selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Text Color</label>
                    <select
                      value={editedTextColor}
                      onChange={(e) => setEditedTextColor(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-bold text-slate-700 bg-white outline-none"
                    >
                      <option value="text-slate-900">Charcoal Dark Ink</option>
                      <option value="text-slate-100">Alabaster White</option>
                      <option value="text-white">Pure Bright White</option>
                      <option value="text-amber-900">Rich Brown Sepia</option>
                      <option value="text-indigo-900">Royal Indigo Blue</option>
                      <option value="text-rose-950">Intense Rose Crimson</option>
                      <option value="text-emerald-950">Sage Deep Forest</option>
                    </select>
                  </div>

                  {/* Font Weight Toggle */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Font Weight</label>
                    <button
                      type="button"
                      onClick={() => setEditedIsBold(!editedIsBold)}
                      className={`w-full py-2 px-3 border rounded-xl text-xs font-bold transition-all ${
                        editedIsBold
                          ? "bg-indigo-600 border-transparent text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {editedIsBold ? "Bold Weight: Active" : "Normal Weight: Regular"}
                    </button>
                  </div>
                </div>

                {/* DEVICE IMAGE UPLOADER */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Upload Custom Image Decorator</label>
                  
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        id="modal-image-uploader"
                        className="hidden"
                      />
                      <label
                        htmlFor="modal-image-uploader"
                        className="flex items-center justify-center gap-1.5 px-4 py-2 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-500 cursor-pointer bg-slate-50/50 hover:bg-indigo-50/20 transition-all"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Custom Image</span>
                      </label>
                    </div>

                    {editedImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditedImage(null);
                          setImagePos({ x: 0, y: 0 });
                          showToast("Image removed!");
                        }}
                        className="px-3 py-2 border border-red-200 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 cursor-pointer transition-all"
                      >
                        Clear Image
                      </button>
                    )}
                  </div>

                  {editedImage && (
                    <div className="space-y-4 mt-2">
                      {/* Image Placement Mode */}
                      <div className="space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Image Placement Mode</label>
                        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
                          {[
                            { id: "small", label: "Small" },
                            { id: "fit", label: "Fit to Card" },
                            { id: "fill", label: "Fill Card" },
                            { id: "contain", label: "Contain" },
                            { id: "cover", label: "Cover" },
                          ].map((mode) => (
                            <button
                              key={mode.id}
                              type="button"
                              onClick={() => setEditedImageMode(mode.id as any)}
                              className={`px-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer text-center ${
                                editedImageMode === mode.id
                                  ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {mode.label}
                            </button>
                          ))}
                        </div>
                        <p className="text-[9px] text-slate-400 font-medium leading-normal">
                          {editedImageMode === "small" && "🎯 Draggable small ornament in the center of the card."}
                          {editedImageMode === "fit" && "🖼️ Scaled to fit fully inside the card boundaries."}
                          {editedImageMode === "fill" && "📐 Stretched to fill the entire card layout."}
                          {editedImageMode === "contain" && "📦 Stays fully visible inside the card (aspect ratio preserved)."}
                          {editedImageMode === "cover" && "🎨 Covers the entire background of the card (aspect ratio preserved)."}
                        </p>
                      </div>

                      {/* Scale / Zoom Control */}
                      <div className="space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                            <ZoomIn className="w-3 h-3 text-indigo-500" />
                            <span>Scale / Zoom</span>
                          </label>
                          <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                            {Math.round(editedImageScale * 100)}%
                          </span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <button
                            type="button"
                            onClick={() => setEditedImageScale(Math.max(0.1, Number((editedImageScale - 0.1).toFixed(2))))}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer active:scale-95 transition-all text-xs font-bold"
                            title="Zoom Out"
                          >
                            <ZoomOut className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="range"
                            min="0.1"
                            max="4"
                            step="0.05"
                            value={editedImageScale}
                            onChange={(e) => setEditedImageScale(parseFloat(e.target.value))}
                            className="flex-1 accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <button
                            type="button"
                            onClick={() => setEditedImageScale(Math.min(4, Number((editedImageScale + 0.1).toFixed(2))))}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer active:scale-95 transition-all text-xs font-bold"
                            title="Zoom In"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {/* Quick Presets for Zoom */}
                        <div className="flex gap-1 flex-wrap pt-1">
                          {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 3.0].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setEditedImageScale(preset)}
                              className={`px-1.5 py-0.5 text-[9px] font-mono font-bold rounded border cursor-pointer transition-all ${
                                Math.abs(editedImageScale - preset) < 0.01
                                  ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                              }`}
                            >
                              {preset}x
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Rotation Control */}
                      <div className="space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                            <RotateCw className="w-3 h-3 text-indigo-500" />
                            <span>Rotation Angle</span>
                          </label>
                          <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                            {editedImageRotate}°
                          </span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <button
                            type="button"
                            onClick={() => setEditedImageRotate((prev) => (prev - 15 + 360) % 360)}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer active:scale-95 transition-all text-xs font-bold"
                            title="Rotate Left 15°"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            step="1"
                            value={editedImageRotate}
                            onChange={(e) => setEditedImageRotate(parseInt(e.target.value))}
                            className="flex-1 accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <button
                            type="button"
                            onClick={() => setEditedImageRotate((prev) => (prev + 15) % 360)}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer active:scale-95 transition-all text-xs font-bold"
                            title="Rotate Right 15°"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {/* Quick Presets for Rotation */}
                        <div className="flex gap-1 flex-wrap pt-1">
                          {[0, 45, 90, 135, 180, 270].map((angle) => (
                            <button
                              key={angle}
                              type="button"
                              onClick={() => setEditedImageRotate(angle)}
                              className={`px-1.5 py-0.5 text-[9px] font-mono font-bold rounded border cursor-pointer transition-all ${
                                editedImageRotate === angle
                                  ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                                  : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                              }`}
                            >
                              {angle}°
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Repositioning Control Pad */}
                      <div className="space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                          <Move className="w-3 h-3 text-indigo-500" />
                          <span>Reposition Fine-Tuning</span>
                        </label>
                        <div className="flex items-center justify-between gap-4">
                          <div className="grid grid-cols-3 gap-1 w-24 h-24 shrink-0 bg-white p-1 rounded-xl border border-slate-150">
                            <div></div>
                            <button
                              type="button"
                              onClick={() => setImagePos((prev) => ({ ...prev, y: prev.y - 5 }))}
                              className="flex items-center justify-center p-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-md border border-slate-200 active:scale-90 transition-all cursor-pointer text-xs"
                              title="Move Up 5px"
                            >
                              ▲
                            </button>
                            <div></div>
                            
                            <button
                              type="button"
                              onClick={() => setImagePos((prev) => ({ ...prev, x: prev.x - 5 }))}
                              className="flex items-center justify-center p-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-md border border-slate-200 active:scale-90 transition-all cursor-pointer text-xs"
                              title="Move Left 5px"
                            >
                              ◀
                            </button>
                            <button
                              type="button"
                              onClick={() => setImagePos({ x: 0, y: 0 })}
                              className="flex items-center justify-center p-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-md border border-indigo-100 active:scale-90 transition-all cursor-pointer text-[9px] font-extrabold"
                              title="Reset to Center"
                            >
                              Reset
                            </button>
                            <button
                              type="button"
                              onClick={() => setImagePos((prev) => ({ ...prev, x: prev.x + 5 }))}
                              className="flex items-center justify-center p-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-md border border-slate-200 active:scale-90 transition-all cursor-pointer text-xs"
                              title="Move Right 5px"
                            >
                              ▶
                            </button>

                            <div></div>
                            <button
                              type="button"
                              onClick={() => setImagePos((prev) => ({ ...prev, y: prev.y + 5 }))}
                              className="flex items-center justify-center p-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-md border border-slate-200 active:scale-90 transition-all cursor-pointer text-xs"
                              title="Move Down 5px"
                            >
                              ▼
                            </button>
                            <div></div>
                          </div>
                          <div className="flex-1 space-y-1.5 text-[10px] text-slate-400 font-medium leading-normal">
                            <p>🎯 <strong className="text-slate-600">Tip:</strong> Drag the image directly in the live card preview above to position it freely!</p>
                            <div>
                              <strong className="text-slate-600 block mb-0.5">Offsets:</strong>
                              <div className="font-mono bg-slate-150/70 px-2 py-0.5 rounded text-[9px] text-slate-500 inline-flex gap-2">
                                <span>X: {imagePos.x}px</span>
                                <span>Y: {imagePos.y}px</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Modal Footer Controls */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-2 justify-between items-center shrink-0">
                <button
                  type="button"
                  onClick={handleResetCard}
                  className="px-4 py-2 border border-amber-200 bg-amber-50/50 hover:bg-amber-100/50 text-amber-700 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-[0.98]"
                >
                  Reset Card
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPreview}
                    className="px-4 py-2 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-[0.98] flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingShayari(null)}
                    className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 cursor-pointer transition-all active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    className={`px-5 py-2 bg-gradient-to-r ${activeTheme.buttonGrad} hover:opacity-95 text-white rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-[0.98] shadow-sm`}
                  >
                    Save Changes
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Subtle outer metadata tag */}
      <p className="text-[9px] font-mono text-slate-500 tracking-widest uppercase font-black my-5 text-center leading-none">
        © {new Date().getFullYear()} MOOD SHAYARI • POWERED BY ADVANCED POETIC AI
      </p>

    </div>
  );
}
