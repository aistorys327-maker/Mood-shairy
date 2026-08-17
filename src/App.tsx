import React, { useState, useEffect, useRef } from "react";
import { 
  Copy, 
  Check, 
  Crown,
  Sparkles, 
  AlertCircle, 
  Info, 
  Heart, 
  Share2, 
  BookOpen, 
  ChevronLeft, 
  Home, 
  Trash2,
  BookmarkCheck,
  Compass,
  Search,
  Palette,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
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
  Move,
  Languages,
  Globe,
  Highlighter,
  Type,
  Layout,
  Ruler,
  Paintbrush,
  Edit3,
  Film,
  Loader2,
  SlidersHorizontal,
  Menu
} from "lucide-react";
import { toPng } from "html-to-image";
import { motion, AnimatePresence } from "motion/react";
import { Shayari } from "./types";
import { PoetryCardEditorControls } from "./components/PoetryCardEditorControls";
import { PoetryMoveResizeWrapper } from "./components/PoetryMoveResizeWrapper";
import { EditShayariBottomSheet } from "./components/EditShayariBottomSheet";
import { RateLimitDialog } from "./components/RateLimitDialog";
import { convertTailwindGradientToCss, solidsMap, resolveTailwindColor } from "./backgroundUtils";
import { DEFAULT_CARD_STYLES, DEFAULT_CATEGORY_CARD_STYLES } from "./data/defaultCardStyles";
import { getShayariTitle, DEFAULT_SHAYARIS } from "./data";
import { ShayariCardTitle } from "./components/ShayariCardTitle";
import { 
  HIGHLIGHT_COLORS, 
  resolveHighlightHex, 
  getIntelligentHighlights, 
  segmentPoetryLinesForHighlighting,
  segmentLineForHighlighting, 
  getMoodDefaultAccentColor,
  HighlightPhrase 
} from "./utils/highlightUtils";
// @ts-ignore
import appLogo from "./assets/images/app_icon_512_1782467463512.jpg";

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
    bgGrad: "bg-white",
    headerBorder: "border-[#F1F5F9]",
    iconBg: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600",
    titleSpan: "text-purple-700",
    cardShadow: "shadow-[0_16px_36px_rgba(0,0,0,0.20),0_5px_14px_rgba(0,0,0,0.12)]",
    cardBorderHover: "hover:border-purple-300 hover:shadow-[0_20px_42px_rgba(0,0,0,0.24),0_8px_18px_rgba(0,0,0,0.14)]",
    inputFocus: "focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 focus:bg-white",
    buttonGrad: "from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
    spinnerBorder: "border-purple-600/20 border-t-purple-600",
    spinnerIcon: "text-purple-600",
    tagAi: "text-purple-700 bg-purple-50 border-purple-100",
    tagClassic: "text-slate-700 bg-slate-50 border-slate-200",
    separatorDot: "text-purple-600",
    separatorLine: "bg-purple-100",
    poetTag: "text-purple-800 bg-purple-50 border-purple-100",
    poetBold: "text-purple-900",
    cardDecoration: "text-purple-100/50 group-hover:text-purple-200/50",
    toastBg: "bg-slate-900 border-slate-800",
    accentGlow: "bg-purple-500/5",
    headerBg: "bg-white",
    navBg: "bg-white",
    navBorder: "border-[#F1F5F9]",
    activeTabBg: "bg-purple-100/80 text-purple-700",
    cardBg: "bg-white",
    cardBorder: "border-[#F1F5F9]",
    formCardBg: "bg-white",
    subCardBg: "bg-[#F8FAFC]",
    borderAccent: "border-purple-500",
    textColor: "text-[#111827]",
    tagMood: "text-purple-700 bg-purple-50 border-purple-100",
    outerBg: "bg-white",
    glowColors: ["bg-purple-500/5", "bg-indigo-500/5"],
    chassisBorder: "border-[#F1F5F9]"
  },
  {
    id: "pink",
    name: "Rose Petal",
    colorClass: "bg-[#FF2E88]",
    bgGrad: "bg-white",
    headerBorder: "border-[#F1F5F9]",
    iconBg: "bg-pink-50 border-pink-100",
    iconColor: "text-[#FF2E88]",
    titleSpan: "text-[#FF2E88]",
    cardShadow: "shadow-[0_16px_36px_rgba(0,0,0,0.20),0_5px_14px_rgba(0,0,0,0.12)]",
    cardBorderHover: "hover:border-[#FF2E88]/60 hover:shadow-[0_20px_42px_rgba(0,0,0,0.24),0_8px_18px_rgba(0,0,0,0.14)]",
    inputFocus: "focus:border-[#FF2E88] focus:ring-4 focus:ring-[#FF2E88]/15 focus:bg-white",
    buttonGrad: "from-[#FF2E88] to-[#7B2FF7] hover:from-[#e00d6c] hover:to-[#6924d6]",
    spinnerBorder: "border-[#FF2E88]/20 border-t-[#FF2E88]",
    spinnerIcon: "text-[#FF2E88]",
    tagAi: "text-[#FF2E88] bg-pink-50 border-pink-100",
    tagClassic: "text-slate-700 bg-slate-50 border-slate-200",
    separatorDot: "text-[#FF2E88]",
    separatorLine: "bg-pink-100",
    poetTag: "text-pink-800 bg-pink-50 border-pink-100",
    poetBold: "text-pink-900",
    cardDecoration: "text-pink-100/50 group-hover:text-pink-200/50",
    toastBg: "bg-slate-900 border-slate-800",
    accentGlow: "bg-[#FF2E88]/5",
    headerBg: "bg-white",
    navBg: "bg-white",
    navBorder: "border-[#F1F5F9]",
    activeTabBg: "bg-pink-100/80 text-[#FF2E88]",
    cardBg: "bg-white",
    cardBorder: "border-[#F1F5F9]",
    formCardBg: "bg-white",
    subCardBg: "bg-[#F8FAFC]",
    borderAccent: "border-[#FF2E88]",
    textColor: "text-[#111827]",
    tagMood: "text-[#FF2E88] bg-pink-50 border-pink-100",
    outerBg: "bg-white",
    glowColors: ["bg-[#FF2E88]/5", "bg-[#7B2FF7]/5"],
    chassisBorder: "border-[#F1F5F9]"
  },
  {
    id: "blue",
    name: "Ocean Breeze",
    colorClass: "bg-blue-600",
    bgGrad: "bg-white",
    headerBorder: "border-[#F1F5F9]",
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600",
    titleSpan: "text-blue-700",
    cardShadow: "shadow-[0_16px_36px_rgba(0,0,0,0.20),0_5px_14px_rgba(0,0,0,0.12)]",
    cardBorderHover: "hover:border-blue-350/80 hover:shadow-[0_20px_42px_rgba(0,0,0,0.24),0_8px_18px_rgba(0,0,0,0.14)]",
    inputFocus: "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white",
    buttonGrad: "from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700",
    spinnerBorder: "border-blue-600/20 border-t-blue-600",
    spinnerIcon: "text-blue-600",
    tagAi: "text-blue-700 bg-blue-50 border-blue-100",
    tagClassic: "text-slate-700 bg-slate-50 border-slate-200",
    separatorDot: "text-blue-600",
    separatorLine: "bg-blue-100",
    poetTag: "text-blue-800 bg-blue-50 border-blue-100",
    poetBold: "text-blue-900",
    cardDecoration: "text-blue-100/50 group-hover:text-blue-200/50",
    toastBg: "bg-slate-900 border-slate-800",
    accentGlow: "bg-blue-500/5",
    headerBg: "bg-white",
    navBg: "bg-white",
    navBorder: "border-[#F1F5F9]",
    activeTabBg: "bg-blue-100/80 text-blue-700",
    cardBg: "bg-white",
    cardBorder: "border-[#F1F5F9]",
    formCardBg: "bg-white",
    subCardBg: "bg-[#F8FAFC]",
    borderAccent: "border-blue-500",
    textColor: "text-[#111827]",
    tagMood: "text-blue-700 bg-blue-50 border-blue-100",
    outerBg: "bg-white",
    glowColors: ["bg-blue-500/5", "bg-sky-500/5"],
    chassisBorder: "border-[#F1F5F9]"
  },
  {
    id: "green",
    name: "Mint Meadow",
    colorClass: "bg-emerald-600",
    bgGrad: "bg-white",
    headerBorder: "border-[#F1F5F9]",
    iconBg: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
    titleSpan: "text-emerald-700",
    cardShadow: "shadow-[0_16px_36px_rgba(0,0,0,0.20),0_5px_14px_rgba(0,0,0,0.12)]",
    cardBorderHover: "hover:border-emerald-350/80 hover:shadow-[0_20px_42px_rgba(0,0,0,0.24),0_8px_18px_rgba(0,0,0,0.14)]",
    inputFocus: "focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white",
    buttonGrad: "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
    spinnerBorder: "border-emerald-600/20 border-t-emerald-600",
    spinnerIcon: "text-emerald-600",
    tagAi: "text-emerald-700 bg-emerald-50 border-emerald-100",
    tagClassic: "text-slate-700 bg-slate-50 border-slate-200",
    separatorDot: "text-emerald-600",
    separatorLine: "bg-emerald-100",
    poetTag: "text-emerald-800 bg-emerald-50 border-emerald-100",
    poetBold: "text-emerald-900",
    cardDecoration: "text-emerald-100/50 group-hover:text-emerald-200/50",
    toastBg: "bg-slate-900 border-slate-800",
    accentGlow: "bg-emerald-500/5",
    headerBg: "bg-white",
    navBg: "bg-white",
    navBorder: "border-[#F1F5F9]",
    activeTabBg: "bg-emerald-100/80 text-emerald-700",
    cardBg: "bg-white",
    cardBorder: "border-[#F1F5F9]",
    formCardBg: "bg-white",
    subCardBg: "bg-[#F8FAFC]",
    borderAccent: "border-emerald-500",
    textColor: "text-[#111827]",
    tagMood: "text-emerald-700 bg-emerald-50 border-emerald-100",
    outerBg: "bg-white",
    glowColors: ["bg-emerald-500/5", "bg-teal-500/5"],
    chassisBorder: "border-[#F1F5F9]"
  },
  {
    id: "orange",
    name: "Sunset Glow",
    colorClass: "bg-amber-600",
    bgGrad: "bg-white",
    headerBorder: "border-[#F1F5F9]",
    iconBg: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
    titleSpan: "text-amber-700",
    cardShadow: "shadow-[0_16px_36px_rgba(0,0,0,0.20),0_5px_14px_rgba(0,0,0,0.12)]",
    cardBorderHover: "hover:border-amber-350/80 hover:shadow-[0_20px_42px_rgba(0,0,0,0.24),0_8px_18px_rgba(0,0,0,0.14)]",
    inputFocus: "focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 focus:bg-white",
    buttonGrad: "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
    spinnerBorder: "border-amber-600/20 border-t-amber-600",
    spinnerIcon: "text-amber-600",
    tagAi: "text-indigo-700 bg-indigo-50 border-indigo-100",
    tagClassic: "text-amber-800 bg-amber-50 border-amber-100",
    separatorDot: "text-amber-600",
    separatorLine: "bg-amber-100",
    poetTag: "text-amber-800 bg-amber-50 border-amber-100",
    poetBold: "text-amber-900",
    cardDecoration: "text-amber-100/50 group-hover:text-amber-200/50",
    toastBg: "bg-slate-900 border-slate-800",
    accentGlow: "bg-amber-500/5",
    headerBg: "bg-white",
    navBg: "bg-white",
    navBorder: "border-[#F1F5F9]",
    activeTabBg: "bg-amber-100/80 text-amber-800",
    cardBg: "bg-white",
    cardBorder: "border-[#F1F5F9]",
    formCardBg: "bg-white",
    subCardBg: "bg-[#F8FAFC]",
    borderAccent: "border-amber-500",
    textColor: "text-[#111827]",
    tagMood: "text-amber-800 bg-amber-50 border-amber-150",
    outerBg: "bg-white",
    glowColors: ["bg-amber-500/5", "bg-orange-500/5"],
    chassisBorder: "border-[#F1F5F9]"
  }
];

type FontStyleId = string;

interface FontConfig {
  id: FontStyleId;
  name: string;
  class: string;
}

const FONTS: FontConfig[] = [
  { id: "classic", name: "Classic Serif", class: "font-style-classic" },
  { id: "elegant", name: "Elegant Garamond", class: "font-style-elegant" },
  { id: "modern", name: "Modern Outfit", class: "font-style-modern" },
  { id: "romantic", name: "Romantic Playfair", class: "font-style-romantic" },
  { id: "simple", name: "Clean Inter", class: "font-style-simple" },
  
  // Premium Serif Collection
  { id: "royal", name: "Royal Cinzel", class: "font-style-royal" },
  { id: "editorial", name: "Editorial Merriweather", class: "font-style-editorial" },
  { id: "literary", name: "Literary Garamond", class: "font-style-literary" },
  { id: "bookish", name: "Bookish Baskerville", class: "font-style-bookish" },
  { id: "magazine", name: "Magazine Display", class: "font-style-magazine" },
  { id: "cardo", name: "Scholarly Cardo", class: "font-style-cardo" },
  { id: "luxury", name: "Luxury Crimson", class: "font-style-luxury" },
  { id: "prata", name: "Fashion Prata", class: "font-style-prata" },
  { id: "bodoni", name: "Bodoni Luxury", class: "font-style-bodoni" },
  { id: "yeseva", name: "Yeseva Bold", class: "font-style-yeseva" },
  { id: "abhaya", name: "Majestic Ceylon", class: "font-style-abhaya" },
  
  // Premium Script & Calligraphy
  { id: "majestic", name: "Majestic Calligraphy", class: "font-style-majestic" },
  { id: "vintage", name: "Vintage Sacramento", class: "font-style-vintage" },
  { id: "french", name: "French Parisienne", class: "font-style-french" },
  { id: "artistic", name: "Artistic Brush", class: "font-style-artistic" },
  { id: "playful", name: "Playful Dancing", class: "font-style-playful" },
  { id: "retro", name: "Retro Pacifico", class: "font-style-retro" },
  { id: "satisfy", name: "Sweet Satisfy", class: "font-style-satisfy" },
  { id: "ornate", name: "Ornate Monsieur", class: "font-style-ornate" },
  { id: "highclass", name: "Pinyon Highclass", class: "font-style-highclass" },
  { id: "tall", name: "Tall Tangerine", class: "font-style-tall" },
  
  // Script / Handwritten & Cultural Display
  { id: "kalam", name: "Kalam Handwriting", class: "font-style-kalam" },
  { id: "yatra", name: "Yatra Traditional", class: "font-style-yatra" },
  { id: "rozha", name: "Rozha Bold Display", class: "font-style-rozha" },
  { id: "halant", name: "Halant Devanagari", class: "font-style-halant" },
  { id: "mukta", name: "Mukta Devanagari", class: "font-style-mukta" },
  { id: "hind", name: "Hind Clean Sans", class: "font-style-hind" },
  { id: "notodev", name: "Noto Sans Devanagari", class: "font-style-notodev" },
  { id: "amiri", name: "Sufi Amiri Serif", class: "font-style-amiri" },
  { id: "aref", name: "Ruqaa Calligraphy", class: "font-style-aref" },
  { id: "reem", name: "Kufi Calligraphy", class: "font-style-reem" },
  { id: "nastaliq", name: "Urdu Nastaliq", class: "font-style-nastaliq" },
  { id: "handdrawn", name: "Caveat Casual", class: "font-style-handdrawn" },
  
  // Premium Sans-Serif & Geometric
  { id: "geometric", name: "Geometric Montserrat", class: "font-style-geometric" },
  { id: "slim", name: "Slim Raleway", class: "font-style-slim" },
  { id: "rounded", name: "Rounded Poppins", class: "font-style-rounded" },
  { id: "nunito", name: "Soft Nunito", class: "font-style-nunito" },
  { id: "bebas", name: "Bold Bebas Neue", class: "font-style-bebas" },
  { id: "narrow", name: "Narrow Oswald", class: "font-style-narrow" },
  { id: "quicksand", name: "Cute Quicksand", class: "font-style-quicksand" },
  { id: "tech", name: "Tech Space Grotesk", class: "font-style-tech" },
  { id: "avantgarde", name: "Avant-Garde Syne", class: "font-style-avantgarde" },
  { id: "roman", name: "Roman Italiana", class: "font-style-roman" },
  { id: "future", name: "Future Rajdhani", class: "font-style-future" },
  { id: "jetbrains", name: "JetBrains Monospace", class: "font-style-jetbrains" },
  { id: "cinzeldec", name: "Cinzel Decorative", class: "font-style-cinzeldec" }
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

function getMoodEmoji(mood: string, sher: string = ""): string {
  const combined = (mood + " " + sher).toLowerCase().trim();
  if (combined.includes("rain") || combined.includes("barish") || combined.includes("baarish") || combined.includes("monsoon") || combined.includes("badal")) return "🌧️";
  if (combined.includes("sad") || combined.includes("grief") || combined.includes("dard") || combined.includes("hurt") || combined.includes("broken") || combined.includes("alone") || combined.includes("tanhai") || combined.includes("bichhad") || combined.includes("yaad") || combined.includes("dukh")) {
    return (combined.includes("broken") || combined.includes("dil") || combined.includes("heart")) ? "💔" : "😢";
  }
  if (combined.includes("love") || combined.includes("romance") || combined.includes("romantic") || combined.includes("pyar") || combined.includes("pyaar") || combined.includes("ishq") || combined.includes("mohabbat") || combined.includes("प्यार")) return "❤️";
  if (combined.includes("motivation") || combined.includes("motivational") || combined.includes("success") || combined.includes("power") || combined.includes("himmat") || combined.includes("khudi") || combined.includes("hazaaron") || combined.includes("inspire") || combined.includes("buland")) return "✨";
  if (combined.includes("happy") || combined.includes("khush") || combined.includes("smile")) return "😊";
  if (combined.includes("friend") || combined.includes("dost") || combined.includes("yaari")) return "🤝";
  if (combined.includes("attitude") || combined.includes("king") || combined.includes("tevar")) return "😎";
  return "✨";
}

function convertTextSizeToPx(textSizeClass: string): number {
  if (!textSizeClass) return 24;
  const cleanSize = (textSizeClass || "").trim();
  if (cleanSize.endsWith("px")) {
    const val = parseInt(cleanSize, 10);
    return isNaN(val) ? 24 : val;
  }
  
  const mapping: Record<string, number> = {
    "text-xs": 12,
    "text-sm": 14,
    "text-base": 16,
    "text-lg": 18,
    "text-xl": 20,
    "text-2xl": 24,
    "text-3xl": 30,
    "text-4xl": 36,
    "text-5xl": 48,
  };
  
  const match = cleanSize.match(/\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)\b/);
  if (match) {
    return mapping[`text-${match[1]}`] || 24;
  }
  
  return 24;
}

export const CARD_RATIO_SPECS: Record<
  "1:1" | "4:5" | "9:16" | "16:9",
  {
    width: number;
    height: number;
    aspectClass: string;
    label: string;
    aspectRatioValue: number;
  }
> = {
  "9:16": { width: 360, height: 640, aspectClass: "aspect-[9/16]", label: "Story (9:16)", aspectRatioValue: 9 / 16 },
  "1:1": { width: 360, height: 360, aspectClass: "aspect-square", label: "Square (1:1)", aspectRatioValue: 1 / 1 },
  "4:5": { width: 360, height: 450, aspectClass: "aspect-[4/5]", label: "Post (4:5)", aspectRatioValue: 4 / 5 },
  "16:9": { width: 360, height: 202.5, aspectClass: "aspect-[16/9]", label: "Banner (16:9)", aspectRatioValue: 16 / 9 },
};

function getAutoAdjustedCardSpecs(
  ratio: "1:1" | "4:5" | "9:16" | "16:9",
  baseTextSize: string = "text-2xl",
  text: string = "",
  hasPoet: boolean = false,
  customLineSpacing?: number,
  customTextBoxWidth?: number,
  customTextBoxHeight?: number,
  customTextWrapping?: "wrap" | "nowrap",
  isCustomized?: boolean,
  hideEmoji?: boolean
) {
  const cleanText = text || "";
  const length = cleanText.length;

  // Determine line wrap limit based on aspect ratio
  let lineWrapCharLimit = 24;
  if (ratio === "9:16") {
    lineWrapCharLimit = 18;
  } else if (ratio === "16:9") {
    lineWrapCharLimit = 38;
  } else if (ratio === "4:5") {
    lineWrapCharLimit = 22;
  }

  // Estimate the actual visual wrapped lines
  const rawLines = cleanText.split("\n");
  let estimatedLines = 0;
  for (const line of rawLines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    estimatedLines += Math.max(1, Math.ceil(trimmed.length / lineWrapCharLimit));
  }

  const totalLines = Math.max(1, estimatedLines);

  // Sequential tailwind text sizes as safe fallbacks
  const sizeOrder = [
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
  ];

  const sizeKeyMap: Record<string, number> = {
    "text-xs": 0,
    "text-sm": 1,
    "text-base": 2,
    "text-lg": 3,
    "text-xl": 4,
    "text-2xl": 5,
    "text-3xl": 6,
  };

  let cleanBaseTextSize = (baseTextSize || "").trim();
  const textClassMatch = cleanBaseTextSize.match(/\btext-(xs|sm|base|lg|xl|2xl|3xl)\b/);
  if (textClassMatch) {
    cleanBaseTextSize = `text-${textClassMatch[1]}`;
  }

  const baseIndex = sizeKeyMap[cleanBaseTextSize] !== undefined ? sizeKeyMap[cleanBaseTextSize] : 4; // Default to text-xl
  const fontSizeClass = sizeOrder[Math.max(0, Math.min(sizeOrder.length - 1, baseIndex))];

  // Dynamic padding classes to ensure safe separation from top bar controls & bottom watermark
  let paddingClass = "pt-[46px] pb-[28px] px-[16px]";
  let leadingClass = "leading-relaxed";
  let containerClass = "max-w-[94%] px-2";

  if (ratio === "16:9") {
    paddingClass = "pt-[38px] pb-[22px] px-[20px]";
    leadingClass = "leading-normal";
    containerClass = "max-w-[96%] px-1";
  } else if (ratio === "9:16") {
    paddingClass = "pt-[48px] pb-[32px] px-[16px]";
    leadingClass = "leading-relaxed";
    containerClass = "max-w-[92%] px-1.5";
  } else if (ratio === "4:5") {
    paddingClass = "pt-[46px] pb-[28px] px-[16px]";
    leadingClass = "leading-relaxed";
    containerClass = "max-w-[94%] px-2";
  }

  // ==========================================
  // UNIFIED PROFESSIONAL TYPOGRAPHY & SPACING SYSTEM
  // ==========================================
  // Hierarchy standard:
  // Heading: ~24–32px (via ShayariCardTitle)
  // Verse body: ~17–20.5px
  // Watermark: ~11–13px (via renderWatermark)
  //
  // Language-independent: Hindi, Urdu, Hinglish, and English follow the exact same visual sizing rules.

  let baseCqw = 4.9; 
  if (ratio === "9:16") {
    baseCqw = 5.1; // story format (narrower width, taller canvas)
  } else if (ratio === "16:9") {
    baseCqw = 3.3; // landscape format
  } else if (ratio === "4:5") {
    baseCqw = 4.8;
  }
  
  // Predictable, bounded scale factor based on length & total line count
  // Keeps verse comfortably between 17px and 20.5px without extreme scaling
  let sizeFactor = 1.0;
  if (length < 35 && totalLines <= 2) {
    sizeFactor = 1.05; // gentle, readable scale for short 2-line couplets (~20px)
  } else if (length < 75 && totalLines <= 4) {
    sizeFactor = 1.0;  // ideal standard (~18.5-19.5px)
  } else if (length < 120 || totalLines <= 6) {
    sizeFactor = 0.94; // controlled reduction (~17.5-18.5px)
  } else {
    sizeFactor = 0.88; // long verses (~16.5-17.5px, never tiny)
  }
  
  // Custom text size adjustments
  let sizeMultiplier = 1.0;
  if (baseTextSize && baseTextSize.endsWith("px")) {
    const pxVal = parseInt(baseTextSize, 10);
    const safePxVal = isNaN(pxVal) ? 19 : pxVal;
    sizeMultiplier = safePxVal / 19;
  } else if (isCustomized) {
    const indexDifference = baseIndex - 4;
    sizeMultiplier = 1.0 + indexDifference * 0.08;
  }
  
  let computedFontSizeCqw = baseCqw * sizeFactor * sizeMultiplier;
  
  // Clamp boundaries to enforce strict typography hierarchy (verse stays 16–21px on standard cards)
  let minCqwBound = 4.0;
  let maxCqwBound = 5.8;
  if (ratio === "16:9") {
    minCqwBound = 2.6;
    maxCqwBound = 3.8;
  } else if (ratio === "9:16") {
    minCqwBound = 4.2;
    maxCqwBound = 6.0;
  }

  if (isCustomized) {
    minCqwBound = 2.0;
    maxCqwBound = 10.0;
  }

  computedFontSizeCqw = Math.max(minCqwBound, Math.min(maxCqwBound, computedFontSizeCqw));

  // Dynamic Line Spacing (lineHeight) - balanced and comfortable for Devanagari, Urdu & Latin
  let computedLineHeight = 1.66;
  if (isCustomized && customLineSpacing !== undefined) {
    computedLineHeight = customLineSpacing;
  } else {
    if (length < 35 && totalLines <= 2) {
      computedLineHeight = 1.74; // spacious couplet
    } else if (length > 90 || totalLines >= 5) {
      computedLineHeight = 1.58; // slightly tighter for longer verses
    }
    
    if (ratio === "16:9") {
      computedLineHeight = Math.min(computedLineHeight, 1.52);
    }
  }

  // Vertical offsets and gaps: clean, consistent vertical gap between headline and verse (24–32px)
  let titleVerseGapPx = 28;
  let titleVerseGapCqw = 5.8;
  if (ratio === "9:16") {
    titleVerseGapPx = 30;
    titleVerseGapCqw = 6.2;
  } else if (ratio === "16:9") {
    titleVerseGapPx = 20;
    titleVerseGapCqw = 3.6;
  } else if (ratio === "4:5") {
    titleVerseGapPx = 28;
    titleVerseGapCqw = 5.8;
  }

  // Paragraph gap between lines of verse
  let paragraphGapCqw = 2.4;
  if (ratio === "9:16") {
    paragraphGapCqw = 2.8;
  } else if (ratio === "16:9") {
    paragraphGapCqw = 1.5;
  } else if (ratio === "4:5") {
    paragraphGapCqw = 2.4;
  }

  if (totalLines <= 2 && length < 40) {
    paragraphGapCqw *= 1.2;
  } else if (totalLines >= 5 || length > 100) {
    paragraphGapCqw *= 0.88;
  }

  // Subtle optical vertical centering offset (slight upward bias for top bar clearance)
  let verticalShiftCqw = -0.5;
  if (ratio === "9:16") {
    verticalShiftCqw = -1.0;
  } else if (ratio === "4:5") {
    verticalShiftCqw = -0.6;
  } else if (ratio === "16:9") {
    verticalShiftCqw = 0;
  }

  const cardVariables = {
    "--card-px": ratio === "16:9" ? "5cqw" : "4cqw",
    "--font-size": `${computedFontSizeCqw}cqw`,
    "--line-height": `${computedLineHeight}`,
    "--paragraph-gap": `${paragraphGapCqw}cqw`,
    "--title-verse-gap": ratio === "16:9" ? "clamp(18px, 3.8cqw, 24px)" : `clamp(${titleVerseGapPx - 4}px, ${titleVerseGapCqw}cqw, ${titleVerseGapPx + 4}px)`,
    "--vertical-shift": `${verticalShiftCqw}cqw`,
  } as React.CSSProperties;

  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  };

  // Cohesive inner wrapper that keeps Heading and Verse grouped naturally without huge blank areas
  const innerWrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    transform: "translateY(calc(var(--vertical-shift) * var(--vertical-shift-scale, 1)))",
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const textStyle: React.CSSProperties = {
    fontSize: "calc(var(--font-size) * var(--font-size-scale, 1))",
    lineHeight: "calc(var(--line-height) * var(--line-height-scale, 1))",
    width: isCustomized && customTextBoxWidth !== undefined ? `${customTextBoxWidth}%` : "100%",
    maxWidth: isCustomized && customTextBoxWidth !== undefined ? `${customTextBoxWidth}%` : (ratio === "9:16" ? "92%" : "94%"),
    whiteSpace: isCustomized && customTextWrapping !== undefined ? (customTextWrapping === "nowrap" ? "nowrap" : "normal") : "normal",
    wordBreak: "normal",
    overflowWrap: "break-word",
  };

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
    emojiClass: "text-lg",
    emojiMarginClass: "mb-1.5",
    poetMarginClass: "mt-2",
    topBarMarginClass: "mb-2 pb-1",
    // Smart inline layout properties
    cardVariables,
    cardStyle,
    innerWrapperStyle,
    textStyle,
    verseContainerStyle,
  };
}

const TEXT_SIZES = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl"
];

const textures = [
  {
    name: "Paper",
    id: "paper",
    bgColor: "bg-[#fafaf7]",
    textColor: "text-slate-800",
    style: {
      backgroundColor: "#fafaf7",
      backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: "24px 24px",
    },
    overlay: (
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0" style={{
        backgroundImage: `radial-gradient(transparent 50%, rgba(0,0,0,0.05) 100%), repeating-linear-gradient(45deg, rgba(0,0,0,0.01) 0px, rgba(0,0,0,0.01) 2px, transparent 2px, transparent 4px)`
      }} />
    )
  },
  {
    name: "Marble",
    id: "marble",
    bgColor: "bg-[#f5f6f8]",
    textColor: "text-slate-800",
    style: {
      backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
    },
    overlay: (
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-multiply z-0" style={{
        backgroundImage: `
          radial-gradient(at 20% 20%, transparent 80%, rgba(0,0,0,0.4) 100%),
          linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.3) 48%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 52%, transparent 55%),
          linear-gradient(-35deg, transparent 38%, rgba(0,0,0,0.2) 41%, rgba(0,0,0,0.3) 43%, rgba(0,0,0,0.2) 45%, transparent 48%)
        `,
        backgroundSize: "100% 100%, 250px 250px, 320px 320px"
      }} />
    )
  },
  {
    name: "Glass",
    id: "glass",
    bgColor: "bg-slate-950",
    textColor: "text-white",
    style: {
      backgroundImage: "radial-gradient(circle at 80% 20%, rgba(236,72,153,0.25) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(59,130,246,0.25) 0%, transparent 50%)"
    },
    overlay: (
      <div className="absolute inset-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] pointer-events-none z-0" />
    )
  },
  {
    name: "Blur",
    id: "blur",
    bgColor: "bg-slate-950",
    textColor: "text-white",
    style: {
      backgroundColor: "#0b0f19"
    },
    overlay: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-44 h-44 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-amber-400/20 blur-3xl" />
      </div>
    )
  },
  {
    name: "Fabric",
    id: "fabric",
    bgColor: "bg-[#e5dec9]",
    textColor: "text-amber-950",
    style: {
      backgroundColor: "#e5dec9"
    },
    overlay: (
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0" style={{
        backgroundImage: `
          linear-gradient(90deg, #000 50%, transparent 50%),
          linear-gradient(#000 50%, transparent 50%)
        `,
        backgroundSize: "4px 4px"
      }} />
    )
  },
  {
    name: "Smoke",
    id: "smoke",
    bgColor: "bg-[#0b0c10]",
    textColor: "text-slate-100",
    style: {
      backgroundColor: "#0a0b10"
    },
    overlay: (
      <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
        <div className="absolute inset-0 bg-radial-gradient" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 40%, rgba(255,255,255,0.08) 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, rgba(255,255,255,0.06) 0%, transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(255,255,255,0.04) 0%, transparent 35%)
          `
        }} />
      </div>
    )
  },
  {
    name: "Watercolor",
    id: "watercolor",
    bgColor: "bg-[#faf9f5]",
    textColor: "text-slate-800",
    style: {
      backgroundColor: "#faf9f5"
    },
    overlay: (
      <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-rose-300/30 blur-2xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-300/30 blur-2xl" />
        <div className="absolute top-[30%] right-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/30 blur-2xl" />
      </div>
    )
  },
  {
    name: "Wooden",
    id: "wooden",
    bgColor: "bg-[#452715]",
    textColor: "text-amber-100",
    style: {
      backgroundColor: "#422513"
    },
    overlay: (
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-0" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 24px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 12px)
        `
      }} />
    )
  },
  {
    name: "Frosted Glass",
    id: "frosted_glass",
    bgColor: "bg-slate-950",
    textColor: "text-white",
    style: {
      backgroundImage: "linear-gradient(135deg, #1e1b4b 0%, #311042 100%)"
    },
    overlay: (
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute inset-3 rounded-[20px] bg-white/[0.07] backdrop-blur-xl border border-white/10 shadow-lg" />
      </div>
    )
  },
  {
    name: "Satin Silk",
    id: "silk",
    bgColor: "bg-rose-50",
    textColor: "text-rose-950",
    style: {
      backgroundImage: "linear-gradient(135deg, #fff5f5 0%, #ffe3e3 50%, #ffd0d0 100%)"
    },
    overlay: (
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-0" style={{
        backgroundImage: `
          radial-gradient(ellipse at top left, rgba(255,255,255,0.8) 0%, transparent 60%),
          radial-gradient(ellipse at bottom right, rgba(0,0,0,0.1) 0%, transparent 60%),
          linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)
        `,
        backgroundSize: "100% 100%"
      }} />
    )
  },
  {
    name: "Gold Leaf",
    id: "gold_leaf",
    bgColor: "bg-amber-50",
    textColor: "text-amber-950",
    style: {
      backgroundImage: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"
    },
    overlay: (
      <div className="absolute inset-0 opacity-[0.14] pointer-events-none z-0" style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(217,119,6,0.15) 0px, rgba(217,119,6,0.15) 2px, transparent 2px, transparent 10px),
          repeating-linear-gradient(-45deg, rgba(251,191,36,0.2) 0px, rgba(251,191,36,0.2) 1px, transparent 1px, transparent 8px)
        `
      }} />
    )
  },
  {
    name: "Nebula",
    id: "nebula",
    bgColor: "bg-indigo-950",
    textColor: "text-white",
    style: {
      backgroundColor: "#03001e"
    },
    overlay: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-radial-gradient opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(white, rgba(255,255,255,0.2) 2px, transparent 40px)`,
          backgroundSize: "40px 40px"
        }} />
      </div>
    )
  },
  {
    name: "Soft Linen",
    id: "linen",
    bgColor: "bg-[#f4f1ea]",
    textColor: "text-stone-800",
    style: {
      backgroundColor: "#f4f1ea"
    },
    overlay: (
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-0" style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(0,0,0,0.1) 50%, transparent 50%),
          linear-gradient(rgba(0,0,0,0.1) 50%, transparent 50%)
        `,
        backgroundSize: "6px 6px"
      }} />
    )
  },
  {
    name: "Velvet",
    id: "velvet",
    bgColor: "bg-[#2d0b17]",
    textColor: "text-rose-100",
    style: {
      backgroundColor: "#2a0814"
    },
    overlay: (
      <div className="absolute inset-0 opacity-[0.25] pointer-events-none z-0" style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(244,63,94,0.1) 0%, transparent 70%),
          linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)
        `
      }} />
    )
  }
];

// Robust helper functions to load texture styles and overlays with graceful fallback
const getTextureStyleWithFallback = (textureId: string, customBgColor?: string) => {
  const match = textures.find(t => t.id === textureId);
  
  // Resolve base color
  let baseColor = "#fafaf7";
  if (textureId === "glass" || textureId === "blur" || textureId === "frosted_glass") {
    baseColor = "#0f172a"; // dark slate base for glass/blur
  } else if (match && match.bgColor) {
    // try to parse hex from match.bgColor (e.g. bg-[#fafaf7])
    if (match.bgColor.startsWith("bg-[")) {
      baseColor = match.bgColor.slice(4, -1);
    } else if (match.bgColor === "bg-slate-950") {
      baseColor = "#0f172a";
    }
  }

  // If a customBgColor was explicitly passed and is a hex color
  if (customBgColor) {
    if (customBgColor.startsWith("bg-[")) {
      baseColor = customBgColor.slice(4, -1);
    } else if (customBgColor === "bg-slate-950") {
      baseColor = "#0f172a";
    }
  }

  const baseStyle: React.CSSProperties = {
    backgroundColor: baseColor,
  };

  if (match) {
    return {
      ...baseStyle,
      ...match.style
    };
  }
  
  return {
    ...baseStyle,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px)`,
    backgroundSize: "20px 20px"
  };
};

const getCardBgStyleAndClass = (
  customBgGradient?: string,
  customBgTexture?: string,
  customBgColor?: string,
  defaultBgClass: string = "bg-slate-50"
) => {
  let bgClass = "";
  let style: React.CSSProperties = {};

  if (customBgGradient) {
    bgClass = `bg-gradient-to-br ${customBgGradient}`;
    style = { backgroundImage: convertTailwindGradientToCss(customBgGradient) };
  } else if (customBgTexture) {
    const textureMatch = textures.find(t => t.id === customBgTexture);
    bgClass = textureMatch?.bgColor || customBgColor || "bg-[#fafaf7]";
    style = getTextureStyleWithFallback(customBgTexture, customBgColor);
  } else if (customBgColor) {
    bgClass = customBgColor;
    if (customBgColor.startsWith("bg-[")) {
      style = { backgroundColor: customBgColor.slice(4, -1) };
    } else {
      const mappedColor = solidsMap[customBgColor];
      if (mappedColor) {
        style = { backgroundColor: mappedColor };
      }
    }
  } else {
    bgClass = defaultBgClass;
    if (defaultBgClass.startsWith("bg-[")) {
      style = { backgroundColor: defaultBgClass.slice(4, -1) };
    } else {
      const mappedColor = solidsMap[defaultBgClass];
      if (mappedColor) {
        style = { backgroundColor: mappedColor };
      }
    }
  }

  return { bgClass, style };
};

const getTextureOverlayWithFallback = (textureId: string) => {
  const match = textures.find(t => t.id === textureId);
  if (match) return match.overlay;
  
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{
      backgroundImage: `radial-gradient(transparent 50%, rgba(0,0,0,0.02) 100%)`
    }} />
  );
};

const filterOptions = [
  { id: "none", name: "Normal", value: "none" },
  { id: "grayscale", name: "Inkwell (B&W)", value: "grayscale(100%)" },
  { id: "sepia", name: "Vintage Sepia", value: "sepia(100%)" },
  { id: "warm", name: "Warm Sun", value: "sepia(30%) saturate(140%) brightness(105%)" },
  { id: "cool", name: "Cool Glacier", value: "hue-rotate(90deg) saturate(120%)" },
  { id: "dramatic", name: "Noir (High Contrast)", value: "grayscale(100%) contrast(160%) brightness(95%)" },
  { id: "lomo", name: "Lofi Retro", value: "contrast(140%) saturate(140%)" },
  { id: "soft_blur", name: "Dreamy Blur", value: "blur(2px) opacity(85%)" },
  { id: "invert", name: "X-Ray Invert", value: "invert(100%)" },
  { id: "fade", name: "Velvet Fade", value: "brightness(105%) contrast(85%) saturate(90%) opacity(80%)" }
];

const premiumTextColors = [
  // Standard Solid Colors
  { value: "text-black", bgClass: "bg-black", name: "Black", category: "Standard Solid Colors" },
  { value: "text-white", bgClass: "bg-white border border-slate-300", name: "White", category: "Standard Solid Colors" },
  { value: "text-slate-800", bgClass: "bg-slate-800", name: "Charcoal", category: "Standard Solid Colors" },
  { value: "text-blue-900", bgClass: "bg-blue-900", name: "Navy Blue", category: "Standard Solid Colors" },
  { value: "text-blue-600", bgClass: "bg-blue-600", name: "Royal Blue", category: "Standard Solid Colors" },
  { value: "text-sky-500", bgClass: "bg-sky-500", name: "Sky Blue", category: "Standard Solid Colors" },
  { value: "text-purple-600", bgClass: "bg-purple-600", name: "Purple", category: "Standard Solid Colors" },
  { value: "text-violet-500", bgClass: "bg-violet-500", name: "Violet", category: "Standard Solid Colors" },
  { value: "text-pink-500", bgClass: "bg-pink-500", name: "Pink", category: "Standard Solid Colors" },
  { value: "text-rose-500", bgClass: "bg-rose-500", name: "Rose", category: "Standard Solid Colors" },
  { value: "text-red-600", bgClass: "bg-red-600", name: "Red", category: "Standard Solid Colors" },
  { value: "text-orange-500", bgClass: "bg-orange-500", name: "Orange", category: "Standard Solid Colors" },
  { value: "text-amber-500", bgClass: "bg-amber-500", name: "Gold", category: "Standard Solid Colors" },
  { value: "text-yellow-400", bgClass: "bg-yellow-400", name: "Yellow", category: "Standard Solid Colors" },
  { value: "text-emerald-600", bgClass: "bg-emerald-600", name: "Emerald Green", category: "Standard Solid Colors" },
  { value: "text-teal-400", bgClass: "bg-teal-400", name: "Mint", category: "Standard Solid Colors" },
  { value: "text-teal-600", bgClass: "bg-teal-600", name: "Teal", category: "Standard Solid Colors" },
  { value: "text-amber-800", bgClass: "bg-amber-800", name: "Brown", category: "Standard Solid Colors" },
  { value: "text-[#4E3629]", bgClass: "bg-[#4E3629]", name: "Coffee", category: "Standard Solid Colors" },
  { value: "text-gray-500", bgClass: "bg-gray-500", name: "Grey", category: "Standard Solid Colors" },
  { value: "text-slate-400", bgClass: "bg-slate-300 border border-slate-400", name: "Silver", category: "Standard Solid Colors" },
  { value: "text-amber-100", bgClass: "bg-amber-100/80 border border-amber-200", name: "Cream", category: "Standard Solid Colors" },

  // Classic Darks
  { value: "text-slate-900", bgClass: "bg-slate-900", name: "Charcoal Dark Ink", category: "Classic Darks" },
  { value: "text-zinc-950", bgClass: "bg-zinc-950", name: "Midnight Obsidian", category: "Classic Darks" },
  { value: "text-slate-800", bgClass: "bg-slate-800", name: "Slate Dusk", category: "Classic Darks" },
  { value: "text-stone-900", bgClass: "bg-stone-900", name: "Sooty Coal", category: "Classic Darks" },
  { value: "text-neutral-900", bgClass: "bg-neutral-900", name: "Pure Ink", category: "Classic Darks" },
  { value: "text-zinc-800", bgClass: "bg-zinc-800", name: "Gunmetal Grey", category: "Classic Darks" },

  // Luminous Lights
  { value: "text-slate-100", bgClass: "bg-slate-100 border border-slate-200", name: "Alabaster White", category: "Luminous Lights" },
  { value: "text-white", bgClass: "bg-white border border-slate-200", name: "Pure Bright White", category: "Luminous Lights" },
  { value: "text-amber-50", bgClass: "bg-amber-50 border border-amber-200", name: "Cream Silk", category: "Luminous Lights" },
  { value: "text-rose-50", bgClass: "bg-rose-50 border border-rose-200", name: "Blush Mist", category: "Luminous Lights" },
  { value: "text-indigo-50", bgClass: "bg-indigo-50 border border-indigo-200", name: "Stardust Glow", category: "Luminous Lights" },
  { value: "text-zinc-100", bgClass: "bg-zinc-100 border border-zinc-200", name: "Soft Porcelain", category: "Luminous Lights" },

  // Warm Earthy
  { value: "text-amber-900", bgClass: "bg-amber-900", name: "Rich Brown Sepia", category: "Warm Earthy" },
  { value: "text-amber-950", bgClass: "bg-amber-950", name: "Golden Ebony", category: "Warm Earthy" },
  { value: "text-amber-800", bgClass: "bg-amber-800", name: "Burnt Terracotta", category: "Warm Earthy" },
  { value: "text-[#4E3629]", bgClass: "bg-[#4E3629]", name: "Roasted Cocoa", category: "Warm Earthy" },
  { value: "text-orange-600", bgClass: "bg-orange-600", name: "Warm Marigold", category: "Warm Earthy" },
  { value: "text-orange-850", bgClass: "bg-orange-800", name: "Rust Terracotta", category: "Warm Earthy" },

  // Royal Jewel
  { value: "text-indigo-900", bgClass: "bg-indigo-900", name: "Royal Indigo Blue", category: "Royal Jewel" },
  { value: "text-indigo-950", bgClass: "bg-indigo-950", name: "Midnight Navy", category: "Royal Jewel" },
  { value: "text-purple-950", bgClass: "bg-purple-950", name: "Velvet Night Plum", category: "Royal Jewel" },
  { value: "text-purple-900", bgClass: "bg-purple-900", name: "Imperial Amethyst", category: "Royal Jewel" },
  { value: "text-fuchsia-950", bgClass: "bg-fuchsia-950", name: "Crimson Orchid", category: "Royal Jewel" },
  { value: "text-rose-950", bgClass: "bg-rose-950", name: "Intense Rose Crimson", category: "Royal Jewel" },
  { value: "text-rose-900", bgClass: "bg-rose-900", name: "Wine Burgundy", category: "Royal Jewel" },
  { value: "text-red-950", bgClass: "bg-red-950", name: "Sufi Maroon", category: "Royal Jewel" },

  // Serene Nature
  { value: "text-emerald-950", bgClass: "bg-emerald-950", name: "Sage Deep Forest", category: "Serene Nature" },
  { value: "text-emerald-900", bgClass: "bg-emerald-900", name: "Mossy Jade", category: "Serene Nature" },
  { value: "text-teal-950", bgClass: "bg-teal-950", name: "Abyssal Teal", category: "Serene Nature" },
  { value: "text-teal-900", bgClass: "bg-teal-900", name: "Peacock Blue-Green", category: "Serene Nature" },
  { value: "text-lime-950", bgClass: "bg-lime-950", name: "Deep Olive Wood", category: "Serene Nature" },

  // Elegant Muted
  { value: "text-slate-600", bgClass: "bg-slate-600", name: "Pewter Mist", category: "Elegant Muted" },
  { value: "text-zinc-600", bgClass: "bg-zinc-600", name: "Vintage Charcoal", category: "Elegant Muted" },
  { value: "text-stone-600", bgClass: "bg-stone-600", name: "Linen Shadow", category: "Elegant Muted" },
  { value: "text-rose-400", bgClass: "bg-rose-400", name: "Satin Coral", category: "Elegant Muted" },
  { value: "text-indigo-400", bgClass: "bg-indigo-400", name: "Soft Lavender", category: "Elegant Muted" },
  { value: "text-teal-500", bgClass: "bg-teal-500", name: "Opal Green", category: "Elegant Muted" },
  { value: "text-amber-500", bgClass: "bg-amber-500", name: "Golden Honey", category: "Elegant Muted" }
];

const gradientTextColors = [
  { value: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent", bgClass: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600", name: "Instagram" },
  { value: "bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600", name: "Sunset" },
  { value: "bg-gradient-to-r from-blue-400 via-teal-500 to-emerald-500 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-blue-400 via-teal-500 to-emerald-500", name: "Ocean" },
  { value: "bg-gradient-to-r from-green-400 via-teal-500 to-indigo-500 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-green-400 via-teal-500 to-indigo-500", name: "Aurora" },
  { value: "bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-500 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-500", name: "Neon Purple" },
  { value: "bg-gradient-to-r from-rose-300 via-pink-400 to-amber-200 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-rose-300 via-pink-400 to-amber-200", name: "Rose Gold" },
  { value: "bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500", name: "Royal Gold" },
  { value: "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500", name: "Fire" },
  { value: "bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600", name: "Emerald" },
  { value: "bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600", name: "Rainbow" },
  { value: "bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-pink-300 via-purple-200 to-blue-300", name: "Cotton Candy" },
  { value: "bg-gradient-to-r from-purple-900 via-indigo-700 to-pink-500 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-purple-900 via-indigo-700 to-pink-500", name: "Galaxy" },
  { value: "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500", name: "Blue Sky" },
  { value: "bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-pink-500 to-purple-600", name: "Pink Purple" },
  { value: "bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent", bgClass: "bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500", name: "Golden Shine" }
];

const POETIC_KEYWORDS = new Set([
  // English
  "love", "life", "heart", "soul", "death", "beautiful", "beauty", "dream", "night", "eyes", "tear", "tears", "pain", "shadow", "silence", "breath", "memory", "moon", "sun", "star", "stars", "sky", "truth", "wind", "rain", "fire", "water", "light", "dark", "path", "time", "world", "flower", "rose", "gold", "silver",
  // Roman Urdu/Hindi / Transliterated
  "dil", "ishq", "mohabbat", "pyar", "dard", "zindagi", "maut", "khwab", "raat", "aankhein", "aansu", "saans", "yaad", "chand", "suraj", "tare", "sitare", "aasman", "sach", "hawa", "baarish", "aag", "paani", "roshni", "andhera", "rasta", "waqt", "duniya", "phool", "gulab", "shayar", "shayari", "gham", "khushi", "sanam", "jaan", "jahan", "wafa", "bewafa", "judai", "milan", "khamoshi", "ghazal", "nazm", "couplet", "sher", "ashaar",
  // Urdu Script
  "دل", "عشق", "محبت", "پیار", "درد", "زندگی", "موت", "خواب", "رات", "آنکھیں", "آنسو", "سانس", "یاد", "چاند", "سورج", "تارے", "ستارے", "آسمان", "ہوا", "بارش", "آگ", "پانی", "روشنی", "اندھیرا", "راستہ", "وقت", "دنیا", "پھول", "گلاب", "شاعر", "غم", "خوشی", "صنم", "جاں", "جہاں", "وفا", "بےوفا", "جدائی", "ملن", "خاموسی", "غزل", "نظم", "شعر",
  // Hindi Script
  "दिल", "इश्क", "मोहब्बत", "प्यार", "दर्द", "ज़िन्दगी", "मौत", "ख्वाब", "रात", "आँखें", "आँसू", "साँस", "याद", "चाँद", "सूरज", "तारे", "सितारे", "आसमान", "सच", "हवा", "बारिश", "आग", "पानी", "रोशनी", "अंधेरा", "रास्ता", "वक्त", "दुनिया", "फूल", "गुलाब", "शायर", "शायरी", "ग़म", "खुशी", "सनम", "जान", "जहाँ", "वफ़ा", "बेवफ़ा", "जुदाई", "मिलन", "खामोशी", "ग़ज़ल", "नज़्म", "शेर"
]);

function getHighlightColorClass(mainColor: string): string {
  if (!mainColor) return "text-amber-400 font-extrabold";
  
  const isGradient = mainColor.includes("bg-gradient-to-") || mainColor.includes("bg-clip-text");
  if (isGradient) {
    return "text-yellow-400 font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] bg-none [-webkit-text-fill-color:initial]";
  }
  
  const isLight = mainColor.includes("text-white") || 
                  mainColor.includes("text-slate-100") || 
                  mainColor.includes("text-zinc-100") || 
                  mainColor.includes("text-amber-50") || 
                  mainColor.includes("text-rose-50") || 
                  mainColor.includes("text-indigo-50") ||
                  mainColor.includes("text-amber-100") ||
                  mainColor.includes("text-rose-100") ||
                  mainColor.includes("text-sky-500") ||
                  mainColor.includes("text-teal-400") ||
                  mainColor.includes("text-amber-500") ||
                  mainColor.includes("text-yellow-400") ||
                  mainColor.includes("text-pink-300");
                  
  if (isLight) {
    return "text-amber-400 font-extrabold drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]";
  } else {
    return "text-amber-500 font-black drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.8)]";
  }
}

const getPoetryAnimationTimings = (
  lines: string[],
  animationStyle: string,
  speedMultiplier: number,
  animDelay: number,
  isHighlightEnabled: boolean,
  highlights: HighlightPhrase[] = [],
  activeAccentHex?: string
) => {
  let currentDelay = animDelay;
  
  // Base durations for one word:
  let baseWordDuration = 0.35; // Default word duration for fade, slide, etc.
  if (animationStyle === "fade-in") {
    baseWordDuration = 0.35;
  } else if (animationStyle === "slide-up" || animationStyle === "slide-left") {
    baseWordDuration = 0.45;
  } else if (animationStyle === "zoom-in") {
    baseWordDuration = 0.35;
  } else if (animationStyle === "typewriter") {
    baseWordDuration = 0.04; // character duration
  } else if (animationStyle === "bounce") {
    baseWordDuration = 0.5;
  } else if (animationStyle === "word-by-word") {
    baseWordDuration = 0.3;
  } else if (animationStyle === "line-by-line") {
    baseWordDuration = 0.8;
  }

  const wordDuration = baseWordDuration * speedMultiplier;
  const charDuration = 0.04 * speedMultiplier;

  interface WordTiming {
    text: string;
    isWhitespace: boolean;
    isKeyword: boolean;
    highlightColor?: string;
    startDelay: number;
    duration: number;
    charTimings?: { char: string; delay: number; duration: number }[];
  }

  interface LineTiming {
    lineIndex: number;
    tokens: WordTiming[];
    startDelay: number;
    duration: number;
  }

  const lineTimings: LineTiming[] = [];

  const segmentedLines = isHighlightEnabled
    ? segmentPoetryLinesForHighlighting(lines, highlights, activeAccentHex, true)
    : lines.map((l) => [{ text: l, isHighlight: false, color: undefined }]);

  lines.forEach((line, lineIdx) => {
    const segments = segmentedLines[lineIdx] || [{ text: line, isHighlight: false, color: undefined }];

    const rawTokens: { text: string; isKeyword: boolean; highlightColor?: string }[] = [];
    for (const seg of segments) {
      const subTokens = seg.text.split(/(\s+)/);
      for (const st of subTokens) {
        if (!st) continue;
        rawTokens.push({
          text: st,
          isKeyword: seg.isHighlight,
          highlightColor: seg.color || activeAccentHex
        });
      }
    }

    const tokens: WordTiming[] = [];
    const lineStartDelay = currentDelay;

    if (animationStyle === "line-by-line") {
      const lineDuration = 0.8 * speedMultiplier;
      rawTokens.forEach((tok) => {
        const isWhitespace = /^\s+$/.test(tok.text);
        tokens.push({
          text: tok.text,
          isWhitespace,
          isKeyword: !isWhitespace && tok.isKeyword,
          highlightColor: tok.highlightColor,
          startDelay: currentDelay,
          duration: lineDuration,
        });
      });
      currentDelay += lineDuration;
    } else if (animationStyle === "none") {
      rawTokens.forEach((tok) => {
        const isWhitespace = /^\s+$/.test(tok.text);
        tokens.push({
          text: tok.text,
          isWhitespace,
          isKeyword: !isWhitespace && tok.isKeyword,
          highlightColor: tok.highlightColor,
          startDelay: currentDelay,
          duration: 0,
        });
      });
    } else {
      rawTokens.forEach((tok) => {
        const isWhitespace = /^\s+$/.test(tok.text);
        if (isWhitespace) {
          tokens.push({
            text: tok.text,
            isWhitespace: true,
            isKeyword: false,
            startDelay: currentDelay,
            duration: 0,
          });
        } else {
          let duration = wordDuration;
          let charTimings: { char: string; delay: number; duration: number }[] = [];

          if (animationStyle === "typewriter") {
            const chars = Array.from(tok.text);
            duration = chars.length * charDuration;
            let runningCharDelay = currentDelay;
            charTimings = chars.map((char) => {
              const timing = {
                char,
                delay: runningCharDelay,
                duration: charDuration,
              };
              runningCharDelay += charDuration;
              return timing;
            });
          }

          tokens.push({
            text: tok.text,
            isWhitespace: false,
            isKeyword: tok.isKeyword,
            highlightColor: tok.highlightColor,
            startDelay: currentDelay,
            duration,
            charTimings: charTimings.length > 0 ? charTimings : undefined,
          });

          currentDelay += duration;
        }
      });
    }

    const lineDuration = currentDelay - lineStartDelay;
    lineTimings.push({
      lineIndex: lineIdx,
      tokens,
      startDelay: lineStartDelay,
      duration: lineDuration,
    });
  });

  const totalPoetryDuration = currentDelay - animDelay;

  return {
    lineTimings,
    totalPoetryDuration,
    cycleDuration: currentDelay,
  };
};

const getAnimationTimingDetails = (
  animationStyle: string,
  lines: string[],
  speed: "slow" | "normal" | "fast",
  delay: number,
  stay: number,
  isHighlightEnabled: boolean = false
) => {
  const speedMultiplier = speed === "slow" ? 2.0 : speed === "fast" ? 0.5 : 1.0;
  
  const timings = getPoetryAnimationTimings(
    lines,
    animationStyle,
    speedMultiplier,
    delay,
    isHighlightEnabled
  );
  
  return {
    speedMultiplier,
    textAnimationDuration: timings.totalPoetryDuration,
    cycleDuration: timings.cycleDuration + stay
  };
};

const renderPoetryText = (
  text: string,
  animationStyle: string,
  replayTrigger: number,
  isHighlightEnabled: boolean,
  textColorClass: string,
  highlightColorId: string | undefined,
  fontSizeClass: string,
  leadingClass: string,
  containerClass: string,
  fontClass: string,
  weightClass: string,
  textStyle: React.CSSProperties,
  textShadow: string | undefined,
  animSpeed: "slow" | "normal" | "fast" = "normal",
  animDelay: number = 0.5,
  animStay: number = 3.0,
  animLoop: boolean = true,
  customHideEmoji: boolean = false,
  emojiVal: string = "",
  mood?: string,
  existingHighlights?: HighlightPhrase[]
) => {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const speedMultiplier = animSpeed === "slow" ? 2.0 : animSpeed === "fast" ? 0.5 : 1.0;

  const defaultMoodColor = getMoodDefaultAccentColor(mood);
  const activeAccentHex = resolveHighlightHex(highlightColorId, defaultMoodColor);
  const highlights = isHighlightEnabled ? getIntelligentHighlights(text, mood, existingHighlights) : [];

  const isDarkText = !textColorClass || 
                     textColorClass.includes("text-black") || 
                     textColorClass.includes("text-[#111111]") || 
                     textColorClass.includes("text-slate-800") || 
                     textColorClass.includes("text-slate-900") || 
                     textColorClass.includes("text-zinc-900") || 
                     textColorClass.includes("text-stone-800") || 
                     textColorClass.includes("text-rose-950") || 
                     textColorClass.includes("text-amber-950");

  const crispTextStyle: React.CSSProperties = {
    fontWeight: 600,
    letterSpacing: 0,
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    filter: "none",
    ...textStyle,
    ...(isDarkText && !textStyle?.backgroundImage && !textStyle?.WebkitBackgroundClip ? { color: "#111111" } : {}),
    textShadow: (textStyle?.backgroundImage || textStyle?.WebkitBackgroundClip) ? "none" : (textShadow || "0 1px 1px rgba(0, 0, 0, 0.04)")
  };

  // If style is "none", render completely statically
  if (animationStyle === "none") {
    const segmentedLines = isHighlightEnabled 
      ? segmentPoetryLinesForHighlighting(lines, highlights, activeAccentHex, true)
      : lines.map((l) => [{ text: l, isHighlight: false, color: undefined }]);

    return (
      <div 
        className="w-full flex flex-col items-center justify-center text-center"
        style={{ gap: "calc(var(--paragraph-gap, 8px) * var(--paragraph-gap-scale, 1))" }}
      >
        {lines.map((line, lineIdx) => {
          const isLastLine = lineIdx === lines.length - 1;
          const segments = segmentedLines[lineIdx] || [{ text: line, isHighlight: false, color: undefined }];

          return (
            <p
              key={lineIdx}
              className={`${fontSizeClass} ${textColorClass} text-center ${leadingClass} ${containerClass} ${fontClass} ${weightClass} transition-all duration-300`}
              style={crispTextStyle}
            >
              {segments.map((seg, sIdx) => {
                if (seg.isHighlight) {
                  return (
                    <span
                      key={sIdx}
                      className="inline font-bold transition-all duration-300"
                      style={{
                        color: seg.color || activeAccentHex,
                        WebkitTextFillColor: seg.color || activeAccentHex,
                        backgroundImage: "none",
                        WebkitBackgroundClip: "initial",
                        fontWeight: 700,
                        textShadow: textShadow || undefined,
                      }}
                    >
                      {seg.text}
                    </span>
                  );
                }
                return (
                  <span key={sIdx} className="inline">
                    {seg.text}
                  </span>
                );
              })}
              {!customHideEmoji && isLastLine && emojiVal && (
                <span className="inline-block ml-1.5 text-base sm:text-lg align-baseline select-none filter drop-shadow-2xs">
                  {emojiVal}
                </span>
              )}
            </p>
          );
        })}
      </div>
    );
  }

  const timings = getPoetryAnimationTimings(
    lines,
    animationStyle,
    speedMultiplier,
    animDelay,
    isHighlightEnabled,
    highlights,
    activeAccentHex
  );

  return (
    <div 
      key={`${animationStyle}-${replayTrigger}`} 
      className="w-full flex flex-col items-center justify-center text-center"
      style={{ gap: "calc(var(--paragraph-gap, 8px) * var(--paragraph-gap-scale, 1))" }}
    >
      {timings.lineTimings.map((lineTiming) => {
        return (
          <p
            key={lineTiming.lineIndex}
            className={`${fontSizeClass} ${textColorClass} text-center ${leadingClass} ${containerClass} ${fontClass} ${weightClass} transition-all duration-300`}
            style={crispTextStyle}
          >
            {lineTiming.tokens.map((token, tokenIdx) => {
              if (token.isWhitespace) {
                return <span key={tokenIdx}>{token.text}</span>;
              }

              let initial: any = { opacity: 0 };
              let animate: any = { opacity: 1 };
              let transition: any = {
                duration: token.duration,
                delay: token.startDelay,
                ease: "easeOut"
              };

              if (animationStyle === "fade-in" || animationStyle === "word-by-word") {
                initial = { opacity: 0 };
                animate = { opacity: 1 };
                transition = {
                  duration: token.duration,
                  delay: token.startDelay,
                  ease: "easeOut"
                };
              } else if (animationStyle === "slide-up") {
                initial = { opacity: 0, y: 15 };
                animate = { opacity: 1, y: 0 };
                transition = {
                  duration: token.duration,
                  delay: token.startDelay,
                  ease: [0.16, 1, 0.3, 1]
                };
              } else if (animationStyle === "slide-left") {
                initial = { opacity: 0, x: 25 };
                animate = { opacity: 1, x: 0 };
                transition = {
                  duration: token.duration,
                  delay: token.startDelay,
                  ease: [0.16, 1, 0.3, 1]
                };
              } else if (animationStyle === "zoom-in") {
                initial = { opacity: 0, scale: 0.8 };
                animate = { opacity: 1, scale: 1 };
                transition = {
                  duration: token.duration,
                  delay: token.startDelay,
                  type: "spring",
                  stiffness: 140,
                  damping: 15
                };
              } else if (animationStyle === "bounce") {
                initial = { opacity: 0, y: -25 };
                animate = { opacity: 1, y: 0 };
                transition = {
                  delay: token.startDelay,
                  type: "spring",
                  stiffness: 200,
                  damping: 12
                };
              } else if (animationStyle === "line-by-line") {
                initial = { opacity: 0, y: 10 };
                animate = { opacity: 1, y: 0 };
                transition = {
                  duration: token.duration,
                  delay: token.startDelay,
                  ease: "easeOut"
                };
              }

              const styleOverride: React.CSSProperties | undefined = token.isKeyword ? {
                color: token.highlightColor || activeAccentHex,
                WebkitTextFillColor: token.highlightColor || activeAccentHex,
                backgroundImage: "none",
                WebkitBackgroundClip: "initial",
                fontWeight: 700,
                textShadow: textShadow || undefined
              } : undefined;

              if (animationStyle === "typewriter" && token.charTimings) {
                return (
                  <span
                    key={tokenIdx}
                    className={`inline-block ${token.isKeyword ? "font-bold" : ""}`}
                    style={styleOverride}
                  >
                    {token.charTimings.map((charObj, charIdx) => (
                      <motion.span
                        key={charIdx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.01,
                          delay: charObj.delay
                        }}
                        className="inline"
                      >
                        {charObj.char}
                      </motion.span>
                    ))}
                  </span>
                );
              }

              return (
                <motion.span
                  key={tokenIdx}
                  initial={initial}
                  animate={animate}
                  transition={transition}
                  className={`inline-block ${token.isKeyword ? "font-bold" : ""}`}
                  style={styleOverride}
                >
                  {token.text}
                </motion.span>
              );
            })}
            {!customHideEmoji && lineTiming.lineIndex === timings.lineTimings.length - 1 && emojiVal && (
              <span className="inline-block ml-1.5 text-base sm:text-lg align-baseline select-none filter drop-shadow-2xs">
                {emojiVal}
              </span>
            )}
          </p>
        );
      })}
    </div>
  );
};

const highlightHexMap: Record<string, string> = {
  gold: "#fbbf24",
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#34d399",
  purple: "#a855f7",
  orange: "#f97316",
  pink: "#ec4899",
  cyan: "#22d3ee",
  yellow: "#fde047"
};

const getGradientStops = (colorClass: string): string[] => {
  if (colorClass.includes("from-yellow-400")) return ["#facc15", "#ec4899", "#9333ea"];
  if (colorClass.includes("from-amber-500")) return ["#f59e0b", "#ea580c", "#f43f5e"];
  if (colorClass.includes("from-blue-400")) return ["#60a5fa", "#14b8a6", "#10b981"];
  if (colorClass.includes("from-green-400")) return ["#4ade80", "#14b8a6", "#6366f1"];
  if (colorClass.includes("from-fuchsia-500")) return ["#d946ef", "#9333ea", "#6366f1"];
  if (colorClass.includes("from-rose-300")) return ["#fda4af", "#f472b6", "#fde68a"];
  if (colorClass.includes("from-amber-200")) return ["#fde68a", "#facc15", "#f59e0b"];
  if (colorClass.includes("from-red-500") && colorClass.includes("via-orange-500")) return ["#ef4444", "#f97316", "#facc15"];
  if (colorClass.includes("from-emerald-400")) return ["#34d399", "#14b8a6", "#16a34a"];
  if (colorClass.includes("from-red-500") && colorClass.includes("via-yellow-400")) return ["#ef4444", "#facc15", "#22c55e", "#3b82f6", "#9333ea"];
  return ["#facc15", "#9333ea"]; // default fallback
};

function getWatermarkSettings(
  _ratio?: string,
  _text?: string,
  _hasPoet?: boolean,
  _customTextY: number = 0,
  _textClass?: string
) {
  // Constant bottom center placement with 14px bottom margin
  const positionClass = "bottom-[14px] left-0 right-0";
  const colorClass = "#FFFFFF";

  return { positionClass, colorClass };
}

function renderWatermark(
  _ratio?: string,
  _text?: string,
  _hasPoet?: boolean,
  _customTextY: number = 0,
  _textClass?: string,
  _customTextShadow?: boolean,
  _futureText?: string,
  _futurePosition?: string,
  _futureOpacity?: number,
  futureEnabled?: boolean
) {
  if (futureEnabled === false) return null;

  return (
    <div 
      className="absolute bottom-[14px] left-0 right-0 w-full select-none pointer-events-none z-30 animate-fade-in flex items-center justify-center text-center px-4"
      style={{
        bottom: "14px",
        left: "0px",
        right: "0px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      <span 
        className="font-sans font-semibold leading-none select-none text-center inline-block whitespace-nowrap"
        style={{
          color: "#FFFFFF",
          fontSize: "clamp(11px, 3.4cqw, 13px)",
          fontWeight: 600,
          WebkitTextStroke: "1.5px #000000",
          paintOrder: "stroke fill",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.6)",
          letterSpacing: "0.2px",
          margin: "0 auto",
        }}
      >
        Moody Shayari ✨
      </span>
    </div>
  );
}

export const getCategoryAndName = (stylePath: string) => {
  const parts = stylePath.split("/").filter(Boolean);
  const fileNameWithExt = parts[parts.length - 1] || stylePath;
  const fileName = fileNameWithExt.replace(/\.[^/.]+$/, "");
  
  let categoryKey = "";
  if (parts.length >= 2 && parts[parts.length - 2] !== "card_styles" && parts[parts.length - 2] !== "assets") {
    categoryKey = parts[parts.length - 2].toLowerCase().trim();
  } else {
    const match = fileName.match(/^([a-zA-Z_]+)/);
    categoryKey = match ? match[1].toLowerCase().trim() : "general";
  }

  const categoryDisplayMap: Record<string, string> = {
    love: "❤️ Love",
    sad: "💔 Sad",
    broken: "🥀 Broken",
    attitude: "😎 Attitude",
    alone: "🧑‍🦲 Alone",
    friendship: "🤝 Friendship",
    motivational: "🔥 Motivational",
    islamic: "🌙 Islamic",
    life: "🌱 Life",
    rain: "🌧️ Rain",
    nature: "🌿 Nature",
    happy: "😊 Happy",
    success: "🏆 Success",
    trust: "🤝 Trust",
    family: "👨‍👩‍👧 Family",
    miss_you: "💌 Miss You",
    romantic: "💖 Romantic",
    pain: "🩹 Pain",
    hope: "🕊️ Hope",
    festival: "🎉 Festival"
  };

  const category = categoryDisplayMap[categoryKey] || (categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1));
  const cleanName = fileName
    .replace(/[-_]/g, " ")
    .replace(/([a-zA-Z])(\d+)/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return { categoryKey, category, cleanName };
};

export const matchesCategory = (stylePath: string, selectedCategory: string): boolean => {
  if (!selectedCategory || selectedCategory === "All") return true;

  const { category, categoryKey } = getCategoryAndName(stylePath);
  const catClean = selectedCategory.replace(/^[^\w\s]+\s*/, "").toLowerCase().trim();

  if (category === selectedCategory || categoryKey === catClean || categoryKey === selectedCategory.toLowerCase()) {
    return true;
  }

  const sadGroup = ["sad", "broken", "alone", "pain"];
  if (sadGroup.includes(catClean) && sadGroup.includes(categoryKey)) {
    return true;
  }

  const loveGroup = ["love", "romantic", "miss_you", "family", "happy", "trust", "friendship"];
  if (loveGroup.includes(catClean) && (categoryKey === "love" || categoryKey === "nature")) {
    return true;
  }

  const attitudeGroup = ["attitude", "motivational", "success"];
  if (attitudeGroup.includes(catClean) && categoryKey === "attitude") {
    return true;
  }

  const natureGroup = ["nature", "rain", "life", "hope", "islamic", "festival"];
  if (natureGroup.includes(catClean) && (categoryKey === "nature" || categoryKey === "love" || categoryKey === "attitude")) {
    return true;
  }

  return false;
};

export const formatCardBgUrl = (urlStr: string) => {
  if (!urlStr) return "";
  if (urlStr.startsWith("/") && typeof window !== "undefined") {
    return `${window.location.origin}${urlStr}`;
  }
  return urlStr;
};

export default function App() {
  const APK_DOWNLOAD_URL = "https://github.com/aistorys327-maker/My-App-data-/releases/download/v1.0/Moody_Shairy_v1.0.apk";

  const handleDownloadApk = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    triggerHapticFeedback();
    try {
      const opened = window.open(APK_DOWNLOAD_URL, "_blank", "noopener,noreferrer");
      if (!opened || opened.closed || typeof opened.closed === "undefined") {
        window.location.href = APK_DOWNLOAD_URL;
      }
    } catch (err) {
      window.location.href = APK_DOWNLOAD_URL;
    }
  };

  const handleShareApk = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    triggerHapticFeedback();
    
    const apkShareMessage = `Moody Shayari – Har Mood ke liye Beautiful Shayari ✨\n\nApni feelings ko Hindi, Urdu aur Hinglish Shayari ke saath express karo. Beautiful card styles, gradients, images aur custom editing ke saath professional Shayari cards banao aur share karo.\n\nMoody Shayari – Beautiful Shayari for Every Mood ✨\n\nCreate, customize, and share Hindi, Urdu, and Hinglish Shayari with elegant card styles, gradients, images, and professional editing tools.\n\nDownload the official Android app:\n${APK_DOWNLOAD_URL}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Moody Shayari",
          text: apkShareMessage,
        });
        showToast("APK link shared! 🚀");
        return;
      } catch (err: any) {
        if (err.name === "AbortError") {
          return; // user cancelled
        }
        console.warn("Native share failed, fallback to copy:", err);
      }
    }

    // Fallback: Copy link
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(apkShareMessage);
        showToast("APK download link copied to clipboard! 📋");
      } else {
        fallbackCopy(apkShareMessage, "apk-link");
        showToast("APK download link copied! 📋");
      }
    } catch (err) {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(apkShareMessage)}`, "_blank");
    }
  };

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

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineFallback, setIsOfflineFallback] = useState<boolean>(false);

  // Rate Limit / 429 Dialog & Cooldown States
  const [isRateLimitDialogOpen, setIsRateLimitDialogOpen] = useState<boolean>(false);
  const [rateLimitResetSeconds, setRateLimitResetSeconds] = useState<number | null>(null);
  const [isGenerateDisabledBy429, setIsGenerateDisabledBy429] = useState<boolean>(false);
  const [generateDisableCountdown, setGenerateDisableCountdown] = useState<number>(0);

  // Auto countdown for Generate button disable period (15-30s cooldown)
  useEffect(() => {
    if (isGenerateDisabledBy429 && generateDisableCountdown > 0) {
      const timer = setInterval(() => {
        setGenerateDisableCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsGenerateDisabledBy429(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isGenerateDisabledBy429, generateDisableCountdown]);

  const handleRateLimitError = (errData: any, rawResponse?: Response) => {
    // Log the complete API error in the console for debugging
    console.error("Gemini API Rate Limit / Quota Error (429):", errData || rawResponse);

    // Never show technical error messages to normal users
    setError(null);

    // Show countdown only if API response provides a valid reset time or Retry-After value
    let resetSecs: number | null = null;
    if (errData && typeof errData.retryAfterSeconds === "number" && errData.retryAfterSeconds > 0) {
      resetSecs = errData.retryAfterSeconds;
    } else if (rawResponse) {
      const headerVal = rawResponse.headers?.get?.("retry-after");
      if (headerVal) {
        const parsed = parseInt(headerVal, 10);
        if (!isNaN(parsed) && parsed > 0) {
          resetSecs = parsed;
        }
      }
    }

    setRateLimitResetSeconds(resetSecs);
    setIsRateLimitDialogOpen(true);

    // Disable Generate button for 20 seconds after 429 response to prevent repeated requests
    setIsGenerateDisabledBy429(true);
    setGenerateDisableCountdown(20);
  };

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
      localStorage.setItem("mood_seen_shayari_texts", JSON.stringify(seenShayariTexts));
    }
  }, [seenShayariTexts]);

  // Theme & Font states
  const [activeToolbarPanel, setActiveToolbarPanel] = useState<"textStyle" | "language" | "weight" | "cardStyle" | null>(null);

  const [selectedCardStyleBg, setSelectedCardStyleBg] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mood_shayari_selected_card_style_bg");
    }
    return null;
  });

  const [loadedCardStyles, setLoadedCardStyles] = useState<string[]>(DEFAULT_CARD_STYLES);
  const [failedCardStyles, setFailedCardStyles] = useState<Set<string>>(new Set());
  const [categoryCardStyles, setCategoryCardStyles] = useState<Record<string, string[]>>(DEFAULT_CATEGORY_CARD_STYLES);
  const [isLoadingStyles, setIsLoadingStyles] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [editedCardStyleBg, setEditedCardStyleBg] = useState<string>("");

  const validCardStyles = loadedCardStyles.filter((s) => !failedCardStyles.has(s));

  const normalizeMoodToCategory = (moodStr: string): string => {
    if (!moodStr) return "general";
    const m = moodStr.toLowerCase().trim();

    if (m.includes("love") || m.includes("pyaar") || m.includes("ishq") || m.includes("मोहब्बत")) return "love";
    if (m.includes("romantic") || m.includes("romance")) return "romantic";
    if (m.includes("broken") || m.includes("toot") || m.includes("heartbreak")) return "broken";
    if (m.includes("sad") || m.includes("udaas") || m.includes("dard") || m.includes("dukh")) return "sad";
    if (m.includes("pain") || m.includes("peeda")) return "pain";
    if (m.includes("attitude") || m.includes("swag") || m.includes("royal") || m.includes("gangster")) return "attitude";
    if (m.includes("alone") || m.includes("lonely") || m.includes("tanhai") || m.includes("tanha")) return "alone";
    if (m.includes("friend") || m.includes("dosti") || m.includes("yaari")) return "friendship";
    if (m.includes("motivat") || m.includes("inspire") || m.includes("himmat")) return "motivational";
    if (m.includes("success") || m.includes("goal") || m.includes("kamyabi")) return "success";
    if (m.includes("islamic") || m.includes("allah") || m.includes("dua") || m.includes("quran") || m.includes("ramadan") || m.includes("eid")) return "islamic";
    if (m.includes("life") || m.includes("zindagi") || m.includes("jiwan")) return "life";
    if (m.includes("rain") || m.includes("baarish") || m.includes("barsaat")) return "rain";
    if (m.includes("nature") || m.includes("prakriti") || m.includes("flower") || m.includes("sky")) return "nature";
    if (m.includes("happy") || m.includes("khushi") || m.includes("joy")) return "happy";
    if (m.includes("trust") || m.includes("bharosa") || m.includes("yaqeen")) return "trust";
    if (m.includes("family") || m.includes("parivar") || m.includes("parent") || m.includes("maa") || m.includes("baap")) return "family";
    if (m.includes("miss") || m.includes("yaad")) return "miss_you";
    if (m.includes("hope") || m.includes("umeed")) return "hope";
    if (m.includes("festival") || m.includes("diwali") || m.includes("holi") || m.includes("eid")) return "festival";

    return "general";
  };

  const getRandomBgForMood = (moodStr: string): string => {
    if (selectedCardStyleBg) {
      return selectedCardStyleBg;
    }

    const catKey = normalizeMoodToCategory(moodStr);
    const catImages = categoryCardStyles[catKey];
    
    if (catImages && catImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * catImages.length);
      return catImages[randomIndex];
    }

    if (loadedCardStyles && loadedCardStyles.length > 0) {
      const randomIndex = Math.floor(Math.random() * loadedCardStyles.length);
      return loadedCardStyles[randomIndex];
    }

    return "";
  };

  // Card Editor States
  const [editingShayari, setEditingShayari] = useState<Shayari | null>(null);

  useEffect(() => {
    if (editingShayari) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [editingShayari]);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const res = await fetch("/api/card-styles");
        if (!res.ok) return;
        const data = await res.json();
        if (data && Array.isArray(data.cardStyles) && data.cardStyles.length > 0) {
          const rawStyles: string[] = data.cardStyles;
          const combinedStyles = Array.from(new Set([...rawStyles, ...DEFAULT_CARD_STYLES])).sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: "base" })
          );
          setLoadedCardStyles(combinedStyles);

          if (data.categories && typeof data.categories === "object") {
            const mergedCategories: Record<string, string[]> = { ...DEFAULT_CATEGORY_CARD_STYLES };
            for (const catKey in data.categories) {
              const apiList = data.categories[catKey] || [];
              const defaultList = mergedCategories[catKey] || [];
              mergedCategories[catKey] = Array.from(new Set([...apiList, ...defaultList])).sort((a, b) =>
                a.localeCompare(b, undefined, { sensitivity: "base" })
              );
            }
            setCategoryCardStyles(mergedCategories);
          }
        }
      } catch (err) {
        console.warn("Using default static card styles:", err);
      } finally {
        setIsLoadingStyles(false);
      }
    };

    fetchStyles();
  }, []);
  const [fontSearchQuery, setFontSearchQuery] = useState("");
  const [recentlyUsedFonts, setRecentlyUsedFonts] = useState<FontStyleId[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_recently_used_fonts");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return ["classic", "elegant", "modern"];
  });

  const [themeMode, setThemeMode] = useState<"light" | "dark" | "auto">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_shayari_theme_mode");
      if (saved === "light" || saved === "dark" || saved === "auto") {
        return saved as "light" | "dark" | "auto";
      }
    }
    return "light";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    if (themeMode === "dark") {
      root.classList.add("dark");
    } else if (themeMode === "light") {
      root.classList.remove("dark");
    } else {
      // auto
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const updateClass = (matches: boolean) => {
        if (matches) root.classList.add("dark");
        else root.classList.remove("dark");
      };
      updateClass(mediaQuery.matches);
      const handleChange = (e: MediaQueryListEvent) => updateClass(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [themeMode]);

  const triggerHapticFeedback = () => {
    if (typeof window !== "undefined" && window.navigator && typeof window.navigator.vibrate === "function") {
      try {
        window.navigator.vibrate(10);
      } catch {
        // ignore vibration block
      }
    }
  };

  const [currentThemeId, setCurrentThemeId] = useState<"purple" | "pink" | "blue" | "green" | "orange">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_shayari_theme");
      if (saved === "purple" || saved === "pink" || saved === "blue" || saved === "green" || saved === "orange") {
        return saved as "purple" | "pink" | "blue" | "green" | "orange";
      }
    }
    return "pink";
  });

  const [selectedFont, setSelectedFont] = useState<FontStyleId>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_shayari_font");
      if (saved && FONTS.some((f) => f.id === saved)) {
        return saved;
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

  const [selectedLanguage, setSelectedLanguage] = useState<"hindi" | "urdu" | "hinglish">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mood_shayari_language");
      if (saved === "hindi" || saved === "urdu" || saved === "hinglish") {
        return saved as "hindi" | "urdu" | "hinglish";
      }
    }
    return "hindi";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mood_shayari_language", selectedLanguage);
    }
  }, [selectedLanguage]);

  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [activeTranslateId, setActiveTranslateId] = useState<string | null>(null);
  const [isTranslatingId, setIsTranslatingId] = useState<string | null>(null);
  const [activeMoveTextId, setActiveMoveTextId] = useState<string | null>(null);
  const [activeEditSheetId, setActiveEditSheetId] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const handleApplyCardStyleToActiveCard = (stylePath: string | null) => {
    const cleanStyle = stylePath || "";
    setSelectedCardStyleBg(cleanStyle || null);
    if (cleanStyle) {
      localStorage.setItem("mood_shayari_selected_card_style_bg", cleanStyle);
    } else {
      localStorage.removeItem("mood_shayari_selected_card_style_bg");
    }

    if (generatedShayaris.length > 0) {
      setGeneratedShayaris((prev) =>
        prev.map((s) => ({
          ...s,
          customCardStyleBg: undefined,
          customBgGradient: undefined,
          customBgColor: undefined,
          customBgTexture: undefined,
        }))
      );
    }

    const { cleanName } = cleanStyle ? getCategoryAndName(cleanStyle) : { cleanName: "Default" };
    showToast(cleanStyle ? `${cleanName} style applied to all cards!` : "Default white card applied to all cards!");
  };

  // Live Preview Resize Observer Refs and States
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const activeEditorScaleRef = useRef<number>(1.0);
  const [previewContainerSize, setPreviewContainerSize] = useState({ width: 300, height: 250 });

  useEffect(() => {
    const el = previewContainerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setPreviewContainerSize({ width, height });
      }
    });

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [editingShayari]);
  const [editedSher, setEditedSher] = useState<string>("");
  const [editedEmoji, setEditedEmoji] = useState<string>("✨");
  const [editedBgColor, setEditedBgColor] = useState<string>("");
  const [editedBgGradient, setEditedBgGradient] = useState<string>("");
  const [editedTextColor, setEditedTextColor] = useState<string>("text-slate-900");
  const [editedFontClass, setEditedFontClass] = useState<string>("");
  const [editedTextSize, setEditedTextSize] = useState<string>("text-2xl");
  const [editedIsBold, setEditedIsBold] = useState<boolean>(false);
  const [editedTextShadow, setEditedTextShadow] = useState<boolean>(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [editedImageMode, setEditedImageMode] = useState<"small" | "fit" | "fill" | "contain" | "cover">("small");
  const [editedImageScale, setEditedImageScale] = useState<number>(1);
  const [editedImageRotate, setEditedImageRotate] = useState<number>(0);
  const [editedRatio, setEditedRatio] = useState<"1:1" | "4:5" | "9:16" | "16:9">("1:1");
  const [imagePos, setImagePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [textPos, setTextPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [editedTextScale, setEditedTextScale] = useState<number>(1.0);
  const [editedLineSpacing, setEditedLineSpacing] = useState<number>(1.95);
  const [editedTextBoxWidth, setEditedTextBoxWidth] = useState<number>(96);
  const [editedTextBoxHeight, setEditedTextBoxHeight] = useState<number>(78);
  const [editedTextWrapping, setEditedTextWrapping] = useState<"wrap" | "nowrap">("wrap");
  const [bgTab, setBgTab] = useState<"cardStyles" | "solids" | "gradients" | "trending" | "textures" | "luxury">("cardStyles");
  const [editedBgTexture, setEditedBgTexture] = useState<string>("");
  const [editedImageFilter, setEditedImageFilter] = useState<string>("none");
  const [editedHighlightKeywords, setEditedHighlightKeywords] = useState<boolean>(true);
  const [editedHighlightColor, setEditedHighlightColor] = useState<string>("gold");
  const [customHideEmoji, setCustomHideEmoji] = useState<boolean>(false);
  const [customHideWatermark, setCustomHideWatermark] = useState<boolean>(false);
  const [editedBgOpacity, setEditedBgOpacity] = useState<number>(1.0);
  const [editedTextGradient, setEditedTextGradient] = useState<string>("");
  const [showPremiumPopup, setShowPremiumPopup] = useState<boolean>(false);
  const [editorTab, setEditorTab] = useState<"verse" | "layout" | "typography" | "decorations">("verse");
  const [expandedSection, setExpandedSection] = useState<string>("verse");
  const [activeTool, setActiveTool] = useState<string>("verse");



  // Keep the global selected font synchronized with the customizer font selection
  useEffect(() => {
    if (editedFontClass) {
      const matchingFont = FONTS.find((f) => f.class === editedFontClass);
      if (matchingFont) {
        setSelectedFont((prev) => {
          if (prev !== matchingFont.id) {
            if (typeof window !== "undefined") {
              localStorage.setItem("mood_shayari_font", matchingFont.id);
            }
            return matchingFont.id;
          }
          return prev;
        });
      }
    }
  }, [editedFontClass]);

  const handleIncreaseTextSize = () => {
    const currentPx = convertTextSizeToPx(editedTextSize);
    const nextPx = Math.min(72, currentPx + 2);
    setEditedTextSize(`${nextPx}px`);
  };

  const handleDecreaseTextSize = () => {
    const currentPx = convertTextSizeToPx(editedTextSize);
    const nextPx = Math.max(18, currentPx - 2);
    setEditedTextSize(`${nextPx}px`);
  };

  const handleMoveText = (direction: "up" | "down" | "left" | "right") => {
    const step = 6; // smaller steps for elegant micro-positioning precision
    
    // Calculate strict safe bounds depending on selected ratio to prevent card escapes or overlap
    let maxX = 40;
    let maxY = 45;
    
    if (editedRatio === "16:9") {
      maxX = 50;
      maxY = 18; // landscape is very short, keep vertical bounds extremely tight
    } else if (editedRatio === "9:16") {
      maxX = 18; // story is narrow, keep horizontal bounds tight
      maxY = 70; // story is tall, can offset more vertically
    } else if (editedRatio === "4:5") {
      maxX = 32;
      maxY = 40;
    }

    setTextPos(prev => {
      let nextX = prev.x;
      let nextY = prev.y;
      if (direction === "up") nextY -= step;
      if (direction === "down") nextY += step;
      if (direction === "left") nextX -= step;
      if (direction === "right") nextX += step;
      
      return {
        x: Math.min(Math.max(nextX, -maxX), maxX),
        y: Math.min(Math.max(nextY, -maxY), maxY)
      };
    });
  };

  // Ratio change boundary safety enforcer
  useEffect(() => {
    let maxX = 40;
    let maxY = 45;
    
    if (editedRatio === "16:9") {
      maxX = 50;
      maxY = 18;
    } else if (editedRatio === "9:16") {
      maxX = 18;
      maxY = 70;
    } else if (editedRatio === "4:5") {
      maxX = 32;
      maxY = 40;
    }

    setTextPos(prev => {
      const nextX = Math.min(Math.max(prev.x, -maxX), maxX);
      const nextY = Math.min(Math.max(prev.y, -maxY), maxY);
      if (nextX !== prev.x || nextY !== prev.y) {
        return { x: nextX, y: nextY };
      }
      return prev;
    });
  }, [editedRatio]);

  const handleStartEdit = (shayari: Shayari) => {
    setEditingShayari(shayari);
    setEditedSher(shayari.sher);
    setEditedEmoji(shayari.customEmoji || getMoodEmoji(shayari.mood));
    setEditedBgColor(shayari.customBgColor || "");
    setEditedBgGradient(shayari.customBgGradient || "");
    setEditedBgTexture(shayari.customBgTexture || "");
    setEditedCardStyleBg(shayari.customCardStyleBg || selectedCardStyleBg || "");
    const cardStyleBg = shayari.customCardStyleBg !== undefined ? shayari.customCardStyleBg : (selectedCardStyleBg || "");
    const isDarkBg = !!cardStyleBg ||
      (!!shayari.customBgGradient && (shayari.customBgGradient.includes("950") || shayari.customBgGradient.includes("900") || shayari.customBgGradient.includes("black"))) ||
      (!!shayari.customBgColor && (shayari.customBgColor.includes("slate-9") || shayari.customBgColor.includes("zinc-9") || shayari.customBgColor.includes("black")));

    let defaultTextColor = "text-slate-900";
    if (shayari.customTextColor) {
      if ((shayari.customTextColor === "text-white" || shayari.customTextColor === "text-slate-100") && !isDarkBg) {
        defaultTextColor = "text-slate-900";
      } else {
        defaultTextColor = shayari.customTextColor;
      }
    } else {
      defaultTextColor = isDarkBg ? "text-white" : "text-slate-900";
    }

    setEditedTextColor(defaultTextColor);
    setEditedFontClass(shayari.customFontClass || activeFontConfig.class);
    setEditedTextSize(shayari.customTextSize || "text-2xl");
    setEditedIsBold(shayari.customIsBold !== undefined ? shayari.customIsBold : (fontWeight === "bold"));
    setEditedTextShadow(shayari.customTextShadow || false);
    setEditedImage(shayari.customImage || null);
    setEditedImageMode(shayari.customImageMode || "small");
    setEditedImageScale(shayari.customImageScale !== undefined ? shayari.customImageScale : 1);
    setEditedImageRotate(shayari.customImageRotate !== undefined ? shayari.customImageRotate : 0);
    setEditedRatio(shayari.customRatio || "9:16");
    setImagePos({ x: shayari.customImageX || 0, y: shayari.customImageY || 0 });
    setTextPos({ x: shayari.customTextX || 0, y: shayari.customTextY || 0 });
    setEditedTextScale(shayari.customTextScale !== undefined ? shayari.customTextScale : 1.0);
    setEditedImageFilter(shayari.customImageFilter || "none");
    setEditedHighlightKeywords(shayari.customHighlightKeywords !== undefined ? shayari.customHighlightKeywords : true);
    setEditedHighlightColor(shayari.customHighlightColor || "gold");
    setCustomHideEmoji(shayari.customHideEmoji || false);
    setCustomHideWatermark(shayari.customHideWatermark || false);
    setEditedBgOpacity(shayari.customBgOpacity !== undefined ? shayari.customBgOpacity : 1.0);
    setEditedTextGradient(shayari.customTextGradient || "");

    // Initialize custom line spacing, box width, box height, text wrapping
    const defaultSpecs = getAutoAdjustedCardSpecs(
      (shayari.customRatio || "1:1") as any,
      shayari.customTextSize || "text-2xl",
      shayari.sher,
      !shayari.isAI && !!shayari.poet,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      shayari.customHideEmoji
    );

    let initialLineSpacing = 1.95;
    if (shayari.customLineSpacing !== undefined) {
      initialLineSpacing = shayari.customLineSpacing;
    } else {
      const defaultLh = parseFloat(defaultSpecs.cardVariables["--line-height"] as string);
      initialLineSpacing = isNaN(defaultLh) ? 1.95 : defaultLh;
    }

    let initialBoxWidth = (shayari.customRatio || "1:1") === "9:16" ? 94 : 96;
    if (shayari.customTextBoxWidth !== undefined) {
      initialBoxWidth = shayari.customTextBoxWidth;
    }

    let initialBoxHeight = 78;
    if (shayari.customTextBoxHeight !== undefined) {
      initialBoxHeight = shayari.customTextBoxHeight;
    } else {
      const defaultIh = parseInt(defaultSpecs.cardVariables["--inner-height"] as string, 10);
      initialBoxHeight = isNaN(defaultIh) ? 78 : defaultIh;
    }

    setEditedLineSpacing(initialLineSpacing);
    setEditedTextBoxWidth(initialBoxWidth);
    setEditedTextBoxHeight(initialBoxHeight);
    setEditedTextWrapping(shayari.customTextWrapping || "wrap");
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
      customBgTexture: editedBgTexture,
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
      customTextX: textPos.x,
      customTextY: textPos.y,
      customTextScale: editedTextScale,
      customTextShadow: editedTextShadow,
      customImageFilter: editedImageFilter,
      customHighlightKeywords: editedHighlightKeywords,
      customHighlightColor: editedHighlightColor,
      customLineSpacing: editedLineSpacing,
      customTextBoxWidth: editedTextBoxWidth,
      customTextBoxHeight: editedTextBoxHeight,
      customTextWrapping: editedTextWrapping,
      customHideEmoji,
      customHideWatermark,
      isCustomized: true,
      customCardStyleBg: editedCardStyleBg,
      customBgOpacity: editedBgOpacity,
      customTextGradient: editedTextGradient,
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
    setEditedBgTexture("");
    setEditedCardStyleBg("");
    setEditedTextColor("text-slate-900");
    setEditedFontClass(activeFontConfig.class);
    setEditedTextSize("text-2xl");
    setEditedIsBold(fontWeight === "bold");
    setEditedTextShadow(false);
    setEditedImage(null);
    setEditedImageMode("small");
    setEditedImageScale(1);
    setEditedImageRotate(0);
    setEditedRatio(editingShayari.customRatio || "9:16");
    setImagePos({ x: 0, y: 0 });
    setTextPos({ x: 0, y: 0 });
    setEditedTextScale(1.0);
    setEditedImageFilter("none");
    setEditedHighlightKeywords(true);
    setEditedHighlightColor("gold");
    setEditedBgOpacity(1.0);
    setEditedTextGradient("");
    
    setEditedLineSpacing(1.95);
    setEditedTextBoxWidth(96);
    setEditedTextBoxHeight(78);
    setEditedTextWrapping("wrap");
    
    showToast("Card restored to original uncustomized style and text! 🌿");
  };

  const handleAutoFitText = () => {
    if (!editingShayari) return;

    const optimalSpecs = getAutoAdjustedCardSpecs(
      editedRatio,
      "text-4xl",
      editedSher,
      !editingShayari.isAI && !!editingShayari.poet,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      customHideEmoji
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
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentScale = activeEditorScaleRef.current || 1.0;
    const dx = (e.clientX - dragStart.x) / currentScale;
    const dy = (e.clientY - dragStart.y) / currentScale;
    setDragStart({ x: e.clientX, y: e.clientY });
    setImagePos((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const currentScale = activeEditorScaleRef.current || 1.0;
    const dx = (e.touches[0].clientX - dragStart.x) / currentScale;
    const dy = (e.touches[0].clientY - dragStart.y) / currentScale;
    setDragStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    setImagePos((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
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
      setRecentlyUsedFonts((prev) => {
        const next = [id, ...prev.filter((f) => f !== id)].slice(0, 5);
        localStorage.setItem("mood_recently_used_fonts", JSON.stringify(next));
        return next;
      });
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

  const handleLanguageChange = (lang: "hindi" | "urdu" | "hinglish") => {
    setSelectedLanguage(lang);
    const langNames = { hindi: "Hindi (हिन्दी)", urdu: "Urdu (اردो)", hinglish: "Hinglish" };
    showToast(`Poetry language set to ${langNames[lang]}! 🌐`);
  };

  const updateShayariText = (id: string, newSher: string) => {
    setGeneratedShayaris((prev) =>
      prev.map((s) => (s.id === id ? { ...s, originalSher: s.originalSher || s.sher, sher: newSher } : s))
    );
    setSavedShayaris((prev) =>
      prev.map((s) => (s.id === id ? { ...s, originalSher: s.originalSher || s.sher, sher: newSher } : s))
    );
  };

  const handleSaveMoveResize = (id: string, updates: Partial<Shayari>) => {
    setGeneratedShayaris((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    setSavedShayaris((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const handleTranslate = async (
    targetLang: "hindi" | "urdu" | "hinglish",
    textToTranslate: string,
    onSuccess: (translated: string) => void,
    poet?: string,
    mood?: string,
    idToMarkLoading?: string
  ) => {
    if (idToMarkLoading) {
      setIsTranslatingId(idToMarkLoading);
    }
    try {
      const endpoint = "/api/translate";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: textToTranslate,
          targetLanguage: targetLang,
          poet,
          mood
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 429 || errData.isRateLimit) {
          handleRateLimitError(errData, response);
          return;
        }
        throw new Error(errData.error || "Failed to translate.");
      }

      const data = await response.json();
      if (data.translatedText) {
        onSuccess(data.translatedText);
      } else {
        throw new Error("Translation failed.");
      }
    } catch (err: any) {
      console.error("Translation failed:", err);
      if (err?.message?.includes("429") || err?.message?.toLowerCase()?.includes("quota") || err?.message?.includes("RESOURCE_EXHAUSTED")) {
        handleRateLimitError({ error: err.message });
      } else {
        showToast("Failed to translate. Please try again.");
      }
    } finally {
      if (idToMarkLoading) {
        setIsTranslatingId(null);
      }
    }
  };

  const [sharingCardId, setSharingCardId] = useState<string | null>(null);

  const getTargetExportDimensions = (ratio?: string): { targetW: number; targetH: number } => {
    switch (ratio) {
      case "1:1":
        return { targetW: 1080, targetH: 1080 };
      case "4:5":
        return { targetW: 1080, targetH: 1350 };
      case "16:9":
        return { targetW: 1920, targetH: 1080 };
      case "9:16":
      default:
        return { targetW: 1080, targetH: 1920 };
    }
  };

  const renderCardToDataUrlAndBlob = async (
    element: HTMLElement,
    ratio: string
  ): Promise<{ dataUrl: string; blob: Blob }> => {
    const { targetW, targetH } = getTargetExportDimensions(ratio);
    const elementWidth = element.offsetWidth || 340;
    
    // Scale pixelRatio so html-to-image renders the DOM vector tree directly to targetW x targetH
    const pixelRatio = targetW / elementWidth;

    // Temporarily remove dark mode so dark mode CSS variables or theme classes do not interfere with export
    const rootEl = document.documentElement;
    const bodyEl = document.body;
    const isRootDark = rootEl.classList.contains("dark");
    const isBodyDark = bodyEl.classList.contains("dark");

    if (isRootDark) rootEl.classList.remove("dark");
    if (isBodyDark) bodyEl.classList.remove("dark");

    let rawDataUrl = "";
    let attempts = 3;

    try {
      while (attempts > 0) {
        try {
          rawDataUrl = await toPng(element, {
            quality: 1.0,
            pixelRatio: pixelRatio,
            width: element.offsetWidth,
            height: element.offsetHeight,
            backgroundColor: "#FFFFFF",
            style: {
              transform: "none",
              margin: "0",
              backgroundColor: "#FFFFFF",
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

          if (rawDataUrl && rawDataUrl.length > 1000) {
            break;
          }
        } catch (retryErr) {
          console.warn(`toPng attempt failed, retrying... (${attempts} remaining)`, retryErr);
        }
        attempts--;
        if (attempts > 0) {
          await new Promise((resolve) => setTimeout(resolve, 250));
        }
      }
    } finally {
      // Restore dark mode if it was active
      if (isRootDark) rootEl.classList.add("dark");
      if (isBodyDark) bodyEl.classList.add("dark");
    }

    if (!rawDataUrl) {
      throw new Error("Unable to render image at high resolution.");
    }

    // Draw onto an exact targetW x targetH HTML5 canvas to guarantee precise output resolution
    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to initialize canvas context.");
    }

    // Fill background with solid white (#FFFFFF) first so there are no transparent/black pixels
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, targetW, targetH);

    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0, targetW, targetH);
        resolve();
      };
      img.onerror = (err) => reject(err);
      img.src = rawDataUrl;
    });

    const finalDataUrl = canvas.toDataURL("image/png", 1.0);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => {
        if (b) resolve(b);
        else reject(new Error("Canvas toBlob failed"));
      }, "image/png", 1.0);
    });

    return { dataUrl: finalDataUrl, blob };
  };

  const exportElementAtExactResolution = async (
    element: HTMLElement,
    ratio: string,
    filename: string
  ) => {
    const { dataUrl } = await renderCardToDataUrlAndBlob(element, ratio);
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  const handleShareCardImage = async (shayari: Shayari) => {
    const cardId = `shayari-card-${shayari.id}`;
    const element = document.getElementById(cardId);
    if (!element) return;

    try {
      setSharingCardId(shayari.id);
      triggerHapticFeedback();

      const ratio = shayari.customRatio || "9:16";
      const cleanMood = shayari.mood ? shayari.mood.trim().toLowerCase().replace(/\s+/g, "-") : "poetry";
      const filename = `shayari-${cleanMood}-${shayari.id.slice(0, 8)}.png`;

      const { dataUrl, blob } = await renderCardToDataUrlAndBlob(element, ratio);
      const file = new File([blob], filename, { type: "image/png" });

      // Direct Web Share API invocation for native Android / mobile share sheet
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        let canShareFiles = false;
        try {
          canShareFiles = typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });
        } catch {
          canShareFiles = false;
        }

        if (canShareFiles || !navigator.canShare) {
          try {
            await navigator.share({
              files: [file],
            });
            return;
          } catch (shareErr: any) {
            if (shareErr.name === "AbortError") {
              return; // user dismissed or cancelled the native share sheet
            }
            console.warn("Direct native file share failed, falling back to download:", shareErr);
          }
        }
      }

      // If Web Share API is unsupported or failed, directly download the image
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to share card image:", err);
    } finally {
      setSharingCardId(null);
    }
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

      const ratio = shayari.customRatio || "9:16";
      const cleanMood = shayari.mood ? shayari.mood.trim().toLowerCase().replace(/\s+/g, "-") : "poetry";
      const filename = `shayari-${cleanMood}-${shayari.id.slice(0, 8)}.png`;

      await exportElementAtExactResolution(element, ratio, filename);
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

      const ratio = editedRatio || editingShayari.customRatio || "9:16";
      const cleanMood = editingShayari.mood ? editingShayari.mood.trim().toLowerCase().replace(/\s+/g, "-") : "poetry";
      const filename = `shayari-${cleanMood}-${editingShayari.id.slice(0, 8)}.png`;

      await exportElementAtExactResolution(element, ratio, filename);
      showToast("Custom preview card downloaded! ✨");
    } catch (err) {
      console.error("Failed to export preview card image:", err);
      showToast("Export failed. Please try again.");
    }
  };

  const handleSharePreview = async () => {
    if (!editingShayari) return;
    const element = document.getElementById("custom-card-preview");
    if (!element) return;

    try {
      triggerHapticFeedback();

      const ratio = editedRatio || editingShayari.customRatio || "9:16";
      const cleanMood = editingShayari.mood ? editingShayari.mood.trim().toLowerCase().replace(/\s+/g, "-") : "poetry";
      const filename = `shayari-${cleanMood}-${editingShayari.id.slice(0, 8)}.png`;

      const { dataUrl, blob } = await renderCardToDataUrlAndBlob(element, ratio);
      const file = new File([blob], filename, { type: "image/png" });

      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        let canShareFiles = false;
        try {
          canShareFiles = typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });
        } catch {
          canShareFiles = false;
        }

        if (canShareFiles || !navigator.canShare) {
          try {
            await navigator.share({
              files: [file],
            });
            return;
          } catch (shareErr: any) {
            if (shareErr.name === "AbortError") {
              return;
            }
            console.warn("Direct preview file share failed, falling back to download:", shareErr);
          }
        }
      }

      // If Web Share API is unsupported or failed, directly download the image
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to share preview card image:", err);
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
      const endpoint = "/api/generate";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          mood: trimmedInput,
          excludeList: seenShayariTexts.slice(-150),
          language: selectedLanguage
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        if (response.status === 429 || errData.isRateLimit) {
          handleRateLimitError(errData, response);
          return;
        }
        throw new Error(errData.error || "Failed to generate Beautiful Shayaris.");
      }

      const data = await response.json();
      if (data.shayaris && Array.isArray(data.shayaris)) {
        const mappedShayaris = data.shayaris.slice(0, 5).map((s: Shayari) => {
          return {
            ...s,
            customRatio: "9:16",
            customTextColor: selectedCardStyleBg ? "text-white" : "text-slate-900",
            customTextShadow: !!selectedCardStyleBg,
            customCardStyleBg: undefined,
            customBgColor: undefined,
            customBgGradient: undefined,
            customBgTexture: undefined,
            customBgOpacity: 1.0,
            customTextGradient: undefined,
          };
        });
        setGeneratedShayaris(mappedShayaris);
        
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
      console.error("Generation error:", err);
      if (err?.message?.includes("429") || err?.message?.toLowerCase()?.includes("quota") || err?.message?.includes("RESOURCE_EXHAUSTED")) {
        handleRateLimitError({ error: err.message });
      } else {
        // Graceful fallback from rich anthology so the user is never blocked by network issues
        const categoryKey = normalizeMoodToCategory(trimmedInput);
        let matchingShayaris = DEFAULT_SHAYARIS.filter(
          (s) => s.mood?.toLowerCase() === categoryKey.toLowerCase()
        );
        if (matchingShayaris.length < 5) {
          const others = DEFAULT_SHAYARIS.filter((s) => !matchingShayaris.some((m) => m.id === s.id));
          matchingShayaris = [...matchingShayaris, ...others];
        }
        const fallbackPicks = matchingShayaris.slice(0, 5).map((s, idx) => {
          let sherText = s.sher;
          if (selectedLanguage === "hinglish" && s.transliteration) {
            sherText = s.transliteration;
          }
          return {
            ...s,
            id: `fallback-${Date.now()}-${idx}`,
            sher: sherText,
            title: getShayariTitle(s),
            customRatio: "9:16",
            customTextColor: selectedCardStyleBg ? "text-white" : "text-slate-900",
            customTextShadow: !!selectedCardStyleBg,
            isAI: false
          };
        });

        setGeneratedShayaris(fallbackPicks);
        setIsOfflineFallback(true);
        setError(null);
        showToast("Curated 5 beautiful verses for your mood! ✨");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (shayari: Shayari) => {
    const formattedText = `"${shayari.sher}"\n\nShared via Moody Shayari App ✨`;
    
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
        
        {/* App Title & Header Bar (Clean Minimal iOS / ChatGPT / Gemini style App Bar) */}
        <header className="h-[56px] px-3 sm:px-4 shrink-0 flex items-center justify-between border-b border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30 transition-all duration-300">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold tracking-tight font-sans flex items-center gap-1 leading-none">
              <span className="text-[#111111] dark:text-white">Moody</span>
              <span className="text-[#FF2D8D]">Shayari</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Header Share APK Button - 20% smaller width, 10% smaller height */}
            <button
              type="button"
              onClick={handleShareApk}
              className="h-[28px] px-2.5 bg-gradient-to-r from-[#FF2D8D] to-[#7B2FF7] hover:opacity-95 text-white text-[11px] font-semibold rounded-full flex items-center gap-1 shadow-2xs active:scale-95 transition-all duration-200 cursor-pointer select-none shrink-0"
              title="Share APK link"
            >
              <Share2 className="w-3 h-3 text-white" />
              <span>Share APK</span>
            </button>

            {/* Download APK Button */}
            <a
              href={APK_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDownloadApk}
              className="h-[28px] px-2.5 bg-gradient-to-r from-[#FF2D8D] to-[#7B2FF7] hover:opacity-95 text-white text-[11px] font-semibold rounded-full flex items-center gap-1 shadow-2xs active:scale-95 transition-all duration-200 cursor-pointer select-none shrink-0"
            >
              <Download className="w-3 h-3 text-white" />
              <span>Download APK</span>
            </a>
          </div>
        </header>

        {/* Dynamic Inner View */}
        {activeTab === "generator" ? (
          <div className="flex-1 min-h-0 flex flex-col justify-between overflow-hidden relative select-none">
            
            {/* Top Fixed Area: Error Banner */}
            {error && (
              <div className="shrink-0 px-2.5 sm:px-3 pt-2 z-10">
                <AnimatePresence>
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center gap-2 p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl text-red-700 dark:text-red-400 text-[11px] font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                      <span>{error}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Center Area: Horizontal Swipe Cards or Loading / Welcome */}
            <div className="flex-1 min-h-0 flex flex-col items-center justify-center relative overflow-hidden py-2 my-auto">
              
              {/* Minimal Welcome Placeholder when no results generated yet */}
              {!isLoading && generatedShayaris.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-6 px-4 text-center space-y-3 select-none max-w-sm mx-auto"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF2E88]/15 to-[#7B2FF7]/15 flex items-center justify-center mx-auto text-[#FF2E88] border border-[#FF2E88]/20 shadow-xs">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Type your mood to generate Shayari</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Express yourself with <span className="text-[#FF2E88] font-semibold">Love, Rain, Sad, Motivation</span> or any custom emotion in the composer below.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Loading display */}
              {isLoading && (
                <div className="py-12 text-center space-y-4">
                  <div className="relative flex items-center justify-center">
                    <div className={`w-12 h-12 border-2 rounded-full animate-spin ${activeTheme.spinnerBorder}`} />
                    <Sparkles className={`w-4 h-4 absolute animate-pulse ${activeTheme.spinnerIcon}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wide">Weaving poetry matching your heart...</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">"Lafz hi to hain jo dil ko chhu lete hain"</p>
                  </div>
                </div>
              )}

              {/* Horizontal Swipe Cards Carousel */}
              {!isLoading && generatedShayaris.length > 0 && (
                <div 
                  className="w-full flex items-center gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar px-[7%] py-1 scroll-smooth select-none"
                  onScroll={(e) => {
                    const container = e.currentTarget;
                    const scrollLeft = container.scrollLeft;
                    const firstChild = container.firstElementChild as HTMLElement;
                    if (firstChild) {
                      const cardWidth = firstChild.offsetWidth + 12;
                      const idx = Math.round(scrollLeft / cardWidth);
                      if (idx >= 0 && idx < generatedShayaris.length && idx !== activeCardIndex) {
                        setActiveCardIndex(idx);
                      }
                    }
                  }}
                >
                  {generatedShayaris.map((shayari, index) => {
                      const isSaved = savedShayaris.some(s => s.sher === shayari.sher);
                      const { bgClass, style: bgStyle } = getCardBgStyleAndClass(
                        shayari.customBgGradient,
                        shayari.customBgTexture,
                        shayari.customBgColor,
                        activeTheme.cardBg
                      );
                      const currentCardStyleBg = shayari.customCardStyleBg !== undefined
                        ? shayari.customCardStyleBg
                        : (selectedCardStyleBg || "");

                      const finalCardBgStyle: React.CSSProperties = {
                        borderRadius: "28px",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                        border: "1px solid #F1F5F9",
                      };

                      if (currentCardStyleBg && !shayari.customBgGradient && !shayari.customBgColor) {
                        finalCardBgStyle.backgroundImage = `url("${formatCardBgUrl(currentCardStyleBg)}")`;
                        finalCardBgStyle.backgroundSize = "cover";
                        finalCardBgStyle.backgroundPosition = "center";
                        finalCardBgStyle.backgroundRepeat = "no-repeat";
                      } else if (shayari.customBgGradient) {
                        if (shayari.customBgGradient.includes("gradient")) {
                          finalCardBgStyle.backgroundImage = shayari.customBgGradient;
                        } else {
                          finalCardBgStyle.backgroundImage = convertTailwindGradientToCss(shayari.customBgGradient);
                        }
                      } else if (shayari.customBgColor) {
                        if (shayari.customBgColor.startsWith("#") || shayari.customBgColor.startsWith("rgb") || shayari.customBgColor.startsWith("hsl")) {
                          finalCardBgStyle.backgroundColor = shayari.customBgColor;
                        } else {
                          finalCardBgStyle.backgroundColor = solidsMap[shayari.customBgColor] || resolveTailwindColor(shayari.customBgColor.replace("bg-", "")) || "#FFFFFF";
                        }
                      } else {
                        finalCardBgStyle.backgroundColor = "#FFFFFF";
                      }

                      const isLightCardBg = !shayari.customBgGradient?.includes("950") && 
                                            !shayari.customBgGradient?.includes("900") && 
                                            !shayari.customBgGradient?.includes("black") && 
                                            !shayari.customBgColor?.includes("slate-9") && 
                                            !shayari.customBgColor?.includes("zinc-9") && 
                                            !shayari.customBgColor?.includes("black");

                      const textClass = (isLightCardBg && (!shayari.customTextColor || shayari.customTextColor === "text-white" || shayari.customTextColor === "text-slate-100")) 
                        ? "text-[#111111]" 
                        : (shayari.customTextColor || "text-[#111111]");
                      const sizeClass = shayari.customTextSize || "text-2xl";
                      const fontClass = shayari.customFontClass || activeFontConfig.class;
                      const weightClass = (shayari.customIsBold !== undefined ? shayari.customIsBold : fontWeight === "bold")
                        ? "!font-bold"
                        : "!font-normal";
                      const emojiVal = shayari.customEmoji || getMoodEmoji(shayari.mood, shayari.sher);

                      const cardSpecs = getAutoAdjustedCardSpecs(
                        (shayari.customRatio || "9:16") as any,
                        sizeClass,
                        shayari.sher,
                        !shayari.isAI && !!shayari.poet,
                        shayari.customLineSpacing,
                        shayari.customTextBoxWidth,
                        shayari.customTextBoxHeight,
                        shayari.customTextWrapping,
                        shayari.isCustomized,
                        shayari.customHideEmoji
                      );

                      return (
                        <div
                          key={shayari.id || index}
                          className="w-[86vw] max-w-[360px] shrink-0 snap-center flex flex-col justify-center items-center py-0.5 transition-all duration-300"
                        >
                          <motion.div
                            id={`shayari-card-${shayari.id}`}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            style={{
                              containerType: "size",
                              backgroundColor: "#FFFFFF",
                              ...cardSpecs.cardVariables,
                              ...cardSpecs.cardStyle,
                            }}
                            className={`shayari-card relative group overflow-hidden rounded-[28px] ${cardSpecs.paddingClass} transition-all duration-500 flex flex-col justify-center items-center w-full max-h-[72vh] ${
                              shayari.customRatio === "4:5" ? "aspect-[4/5]" :
                              shayari.customRatio === "16:9" ? "aspect-[16/9]" :
                              shayari.customRatio === "1:1" ? "aspect-square" :
                              "aspect-[9/16]"
                            }`}
                          >
                          {/* Background Layer with Opacity */}
                          <div 
                            style={{ ...finalCardBgStyle, opacity: shayari.customBgOpacity ?? 1.0 }} 
                            className="absolute inset-0 z-0 pointer-events-none" 
                          />
                          {/* Texture overlay */}
                          {shayari.customBgTexture && getTextureOverlayWithFallback(shayari.customBgTexture)}

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
                                style={{ filter: shayari.customImageFilter || "none" }}
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

                          {/* Card top bar: actions & clean card number */}
                          <div className={`absolute top-0 left-0 right-0 flex items-center justify-between px-3.5 py-2 border-b ${activeTheme.cardBorder} z-20`} data-download-ignore="true">
                            <div className="flex items-center">
                              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-lg border ${activeTheme.tagClassic} shadow-3xs`}>
                                #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                              </span>
                            </div>

                            {/* Actions layout */}
                            <div className="flex items-center gap-1.5 animate-fade-in" data-download-ignore="true">
                              {/* Move & Edit Text Action */}
                              <button
                                data-move-button="true"
                                onClick={() => {
                                  triggerHapticFeedback();
                                  const isActivating = activeMoveTextId !== shayari.id;
                                  setActiveMoveTextId(isActivating ? shayari.id : null);
                                }}
                                className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                                  activeMoveTextId === shayari.id
                                    ? "bg-amber-100 border-amber-300 text-amber-700 font-extrabold scale-105"
                                    : `bg-white/60 ${activeTheme.cardBorder} ${activeTheme.iconColor} hover:text-amber-600 hover:bg-amber-50/50`
                                }`}
                                title="Move, Resize & Edit Shayari"
                              >
                                <Move className="w-3.5 h-3.5" />
                              </button>

                              {activeMoveTextId !== shayari.id && (
                                <>
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
                                className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer bg-white/60 ${activeTheme.cardBorder} ${activeTheme.iconColor} hover:text-amber-600 hover:bg-amber-50/50`}
                                title="Download Card as Image (PNG)"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>

                              {/* Share Card Action */}
                              <button
                                onClick={() => handleShareCardImage(shayari)}
                                disabled={sharingCardId === shayari.id}
                                className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                                  sharingCardId === shayari.id
                                    ? "bg-purple-100 border-purple-300 text-purple-700 font-bold scale-105"
                                    : `bg-white/60 ${activeTheme.cardBorder} ${activeTheme.iconColor} hover:text-purple-600 hover:bg-purple-50/50`
                                }`}
                                title="Share Shayari Card"
                              >
                                {sharingCardId === shayari.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
                                ) : (
                                  <Share2 className="w-3.5 h-3.5" />
                                )}
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

                              {/* Instant Translate Action */}
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() => setActiveTranslateId(activeTranslateId === shayari.id ? null : shayari.id)}
                                  className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                                    activeTranslateId === shayari.id
                                      ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                                      : `bg-white/60 ${activeTheme.cardBorder} ${activeTheme.iconColor} hover:text-indigo-600 hover:bg-indigo-50/50`
                                  }`}
                                  title="Translate Poetry"
                                >
                                  <Languages className="w-3.5 h-3.5" />
                                </button>
                                {activeTranslateId === shayari.id && (
                                  <div className="absolute right-0 mt-1.5 bg-white border border-slate-200/85 rounded-xl shadow-xl p-1.5 z-40 flex flex-col gap-1 min-w-[110px] animate-fade-in">
                                    <span className="text-[7px] font-black text-indigo-500 uppercase px-1.5 py-0.5 tracking-wider select-none">Translate</span>
                                    {[
                                      { id: "hindi", name: "Hindi (हिन्दी)" },
                                      { id: "urdu", name: "Urdu (اردो)" },
                                      { id: "hinglish", name: "Hinglish" }
                                    ].map((lang) => (
                                      <button
                                        key={lang.id}
                                        type="button"
                                        onClick={() => {
                                          handleTranslate(lang.id as any, shayari.sher, (translated) => {
                                            updateShayariText(shayari.id, translated);
                                          }, shayari.poet, shayari.mood, shayari.id);
                                          setActiveTranslateId(null);
                                        }}
                                        className="text-[9px] font-bold text-slate-700 hover:bg-slate-50 px-2 py-1 rounded text-left transition-colors whitespace-nowrap"
                                      >
                                        {lang.name}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                          {/* Translate Loader Overlay */}
                          {isTranslatingId === shayari.id && (
                            <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center z-40 rounded-[32px] animate-fade-in" data-download-ignore="true">
                              <div className={`w-8 h-8 border-2 rounded-full animate-spin ${activeTheme.spinnerBorder}`} />
                              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-2 animate-pulse">Translating...</span>
                            </div>
                          )}

                          {/* Shayari Core Verses - Redesigned with Oversized Premium font */}
                          <div 
                            className="w-full flex flex-col items-center justify-center relative z-10 box-border"
                            style={{ ...cardSpecs.innerWrapperStyle }}
                          >
                            {/* Emotional Title with Automatic Resizing & Safe Horizontal Padding */}
                            <ShayariCardTitle
                              title={getShayariTitle(shayari)}
                              ratio={shayari.customRatio || "9:16"}
                              isLightBg={isLightCardBg}
                              textColor={textClass}
                              hasTextShadow={!!shayari.customTextShadow}
                            />

                            {/* Urdu / Hindi Script text - Spaced naturally with our dynamic paragraph gap system */}
                            <PoetryMoveResizeWrapper
                              shayari={shayari}
                              isActive={activeMoveTextId === shayari.id}
                              onSave={handleSaveMoveResize}
                              onUpdateText={updateShayariText}
                              onClose={() => setActiveMoveTextId(null)}
                            >
                              <div 
                                className="w-full flex flex-col items-center justify-center text-center"
                                style={{ 
                                  ...cardSpecs.verseContainerStyle,
                                  transform: "none",
                                }}
                              >
                                {renderPoetryText(
                                  shayari.sher,
                                  shayari.customAnimation || "none",
                                  0, // no trigger for saved cards except normal render
                                  shayari.customHighlightKeywords !== undefined ? shayari.customHighlightKeywords : true,
                                  textClass,
                                  shayari.customHighlightColor,
                                  cardSpecs.fontSizeClass,
                                  cardSpecs.leadingClass,
                                  cardSpecs.containerClass,
                                  fontClass,
                                  weightClass,
                                  {
                                    ...cardSpecs.textStyle,
                                    ...(shayari.customTextGradient ? {
                                      backgroundImage: shayari.customTextGradient,
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                      color: "transparent"
                                    } : {})
                                  },
                                  shayari.customTextShadow ? "0 2px 8px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.3)" : undefined,
                                  "normal",
                                  0.5,
                                  3.0,
                                  true,
                                  shayari.customHideEmoji,
                                  emojiVal,
                                  shayari.mood,
                                  shayari.highlights
                                )}
                              </div>
                            </PoetryMoveResizeWrapper>
                          </div>

                          {/* Subtle watermark inside poetry card */}
                          {renderWatermark(
                            shayari.customRatio || "1:1",
                            shayari.sher,
                            !shayari.isAI && !!shayari.poet,
                            shayari.customTextY || 0,
                            textClass,
                            shayari.customTextShadow,
                            shayari.customWatermarkText,
                            shayari.customWatermarkPosition,
                            shayari.customWatermarkOpacity,
                            shayari.customWatermarkEnabled
                          )}
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom spacer for fixed composer bar */}
            <div className="shrink-0 h-[105px]" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto no-scrollbar px-3 sm:px-4 pt-2.5 pb-20 space-y-2.5">

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
                    const { bgClass, style: bgStyle } = getCardBgStyleAndClass(
                      shayari.customBgGradient,
                      shayari.customBgTexture,
                      shayari.customBgColor,
                      activeTheme.cardBg
                    );
                    const savedStyleBg = shayari.customCardStyleBg !== undefined
                      ? shayari.customCardStyleBg
                      : (selectedCardStyleBg || "");

                    const finalCardBgStyle: React.CSSProperties = {
                      borderRadius: "28px",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                      border: "1px solid #F1F5F9",
                    };

                    if (savedStyleBg && !shayari.customBgGradient && !shayari.customBgColor) {
                      finalCardBgStyle.backgroundImage = `url("${formatCardBgUrl(savedStyleBg)}")`;
                      finalCardBgStyle.backgroundSize = "cover";
                      finalCardBgStyle.backgroundPosition = "center";
                      finalCardBgStyle.backgroundRepeat = "no-repeat";
                    } else if (shayari.customBgGradient) {
                      if (shayari.customBgGradient.includes("gradient")) {
                        finalCardBgStyle.backgroundImage = shayari.customBgGradient;
                      } else {
                        finalCardBgStyle.backgroundImage = convertTailwindGradientToCss(shayari.customBgGradient);
                      }
                    } else if (shayari.customBgColor) {
                      if (shayari.customBgColor.startsWith("#") || shayari.customBgColor.startsWith("rgb") || shayari.customBgColor.startsWith("hsl")) {
                        finalCardBgStyle.backgroundColor = shayari.customBgColor;
                      } else {
                        finalCardBgStyle.backgroundColor = solidsMap[shayari.customBgColor] || resolveTailwindColor(shayari.customBgColor.replace("bg-", "")) || "#FFFFFF";
                      }
                    } else {
                      finalCardBgStyle.backgroundColor = "#FFFFFF";
                    }
                    const isLightCardBg = !shayari.customBgGradient?.includes("950") && 
                                          !shayari.customBgGradient?.includes("900") && 
                                          !shayari.customBgGradient?.includes("black") && 
                                          !shayari.customBgColor?.includes("slate-9") && 
                                          !shayari.customBgColor?.includes("zinc-9") && 
                                          !shayari.customBgColor?.includes("black");

                    const textClass = (isLightCardBg && (!shayari.customTextColor || shayari.customTextColor === "text-white" || shayari.customTextColor === "text-slate-100")) 
                      ? "text-[#111111]" 
                      : (shayari.customTextColor || "text-[#111111]");
                    const sizeClass = shayari.customTextSize || "text-2xl";
                    const fontClass = shayari.customFontClass || activeFontConfig.class;
                    const weightClass = (shayari.customIsBold !== undefined ? shayari.customIsBold : fontWeight === "bold")
                      ? "!font-bold"
                      : "!font-normal";
                    const emojiVal = shayari.customEmoji || getMoodEmoji(shayari.mood, shayari.sher);

                    const cardSpecs = getAutoAdjustedCardSpecs(
                      (shayari.customRatio || "9:16") as any,
                      sizeClass,
                      shayari.sher,
                      !shayari.isAI && !!shayari.poet,
                      shayari.customLineSpacing,
                      shayari.customTextBoxWidth,
                      shayari.customTextBoxHeight,
                      shayari.customTextWrapping,
                      shayari.isCustomized,
                      shayari.customHideEmoji
                    );

                    return (
                      <div
                        key={shayari.id || index}
                        id={`shayari-card-${shayari.id}`}
                        style={{
                          containerType: "size",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          border: "1px solid #F1F5F9",
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
                          borderRadius: "28px",
                          ...cardSpecs.cardVariables,
                          ...cardSpecs.cardStyle,
                          ...finalCardBgStyle
                        }}
                        className={`shayari-card relative overflow-hidden rounded-[28px] ${cardSpecs.paddingClass} border border-[#F1F5F9] shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex flex-col justify-center items-center ${
                          shayari.customRatio === "4:5" ? "aspect-[4/5]" :
                          shayari.customRatio === "16:9" ? "aspect-[16/9]" :
                          shayari.customRatio === "1:1" ? "aspect-square" :
                          "aspect-[9/16]"
                        }`}
                      >
                        {/* Texture overlay */}
                        {shayari.customBgTexture && getTextureOverlayWithFallback(shayari.customBgTexture)}

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
                              style={{ filter: shayari.customImageFilter || "none" }}
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

                        <div className={`absolute top-0 left-0 right-0 flex items-center justify-between px-3.5 py-2 border-b ${activeTheme.cardBorder} z-20`} data-download-ignore="true">
                          <div className="flex items-center">
                            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-lg border ${activeTheme.tagClassic} shadow-3xs`}>
                              #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5" data-download-ignore="true">
                            {/* Move Text Action */}
                            <button
                              data-move-button="true"
                              onClick={() => setActiveMoveTextId(activeMoveTextId === shayari.id ? null : shayari.id)}
                              className={`p-1.5 rounded-full border border-slate-200 transition-all duration-300 cursor-pointer ${
                                activeMoveTextId === shayari.id
                                  ? "bg-amber-100 border-amber-300 text-amber-700 font-extrabold scale-105"
                                  : `bg-white/60 ${activeTheme.iconColor} hover:text-amber-600 hover:bg-amber-50/50 hover:scale-105 active:scale-95`
                              }`}
                              title="Move & Resize Text"
                            >
                              <Move className="w-3.5 h-3.5" />
                            </button>

                            {activeMoveTextId !== shayari.id && (
                              <>
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
                              className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer bg-white/60 ${activeTheme.cardBorder} ${activeTheme.iconColor} hover:text-amber-600 hover:bg-amber-50/50`}
                              title="Download Card as Image (PNG)"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>

                            {/* Share Card Action */}
                            <button
                              onClick={() => handleShareCardImage(shayari)}
                              disabled={sharingCardId === shayari.id}
                              className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                                sharingCardId === shayari.id
                                  ? "bg-purple-100 border-purple-300 text-purple-700 font-bold scale-105"
                                  : `bg-white/60 ${activeTheme.cardBorder} ${activeTheme.iconColor} hover:text-purple-600 hover:bg-purple-50/50`
                              }`}
                              title="Share Shayari Card"
                            >
                              {sharingCardId === shayari.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
                              ) : (
                                <Share2 className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <button
                              onClick={() => toggleSaveShayari(shayari)}
                              className="p-1.5 rounded-full border border-red-100 bg-red-50 text-red-500 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                              title="Remove from Saved"
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

                            {/* Instant Translate Action */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setActiveTranslateId(activeTranslateId === shayari.id ? null : shayari.id)}
                                className={`p-1.5 rounded-full border border-slate-200 transition-all duration-300 cursor-pointer ${
                                  activeTranslateId === shayari.id
                                    ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                                    : `bg-white/60 ${activeTheme.iconColor} hover:text-indigo-600 hover:bg-indigo-50/50 hover:scale-105 active:scale-95`
                                }`}
                                title="Translate Poetry"
                              >
                                <Languages className="w-3.5 h-3.5" />
                              </button>
                              {activeTranslateId === shayari.id && (
                                <div className="absolute right-0 mt-1.5 bg-white border border-slate-200/85 rounded-xl shadow-xl p-1.5 z-40 flex flex-col gap-1 min-w-[110px] animate-fade-in">
                                  <span className="text-[7px] font-black text-indigo-500 uppercase px-1.5 py-0.5 tracking-wider select-none">Translate</span>
                                  {[
                                    { id: "hindi", name: "Hindi (हिन्दी)" },
                                    { id: "urdu", name: "Urdu (اردो)" },
                                    { id: "hinglish", name: "Hinglish" }
                                  ].map((lang) => (
                                    <button
                                      key={lang.id}
                                      type="button"
                                      onClick={() => {
                                        handleTranslate(lang.id as any, shayari.sher, (translated) => {
                                          updateShayariText(shayari.id, translated);
                                        }, shayari.poet, shayari.mood, shayari.id);
                                        setActiveTranslateId(null);
                                      }}
                                      className="text-[9px] font-bold text-slate-700 hover:bg-slate-50 px-2 py-1 rounded text-left transition-colors whitespace-nowrap"
                                    >
                                      {lang.name}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                        {/* Translate Loader Overlay */}
                        {isTranslatingId === shayari.id && (
                          <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center z-40 rounded-[32px] animate-fade-in" data-download-ignore="true">
                            <div className={`w-8 h-8 border-2 rounded-full animate-spin ${activeTheme.spinnerBorder}`} />
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-2 animate-pulse">Translating...</span>
                          </div>
                        )}

                        <div 
                          className="w-full flex flex-col items-center justify-center relative z-10 box-border"
                          style={{ ...cardSpecs.innerWrapperStyle }}
                        >
                            {/* Emotional Title with Automatic Resizing & Safe Horizontal Padding */}
                            <ShayariCardTitle
                              title={getShayariTitle(shayari)}
                              ratio={shayari.customRatio || "9:16"}
                              isLightBg={isLightCardBg}
                              textColor={textClass}
                              hasTextShadow={!!shayari.customTextShadow}
                            />

                           {/* Urdu / Hindi Script text - Spaced naturally with our dynamic paragraph gap system */}
                           <PoetryMoveResizeWrapper
                             shayari={shayari}
                             isActive={activeMoveTextId === shayari.id}
                             onSave={handleSaveMoveResize}
                             onUpdateText={updateShayariText}
                             onClose={() => setActiveMoveTextId(null)}
                           >
                             <div 
                               className="w-full flex flex-col items-center justify-center text-center"
                               style={{ 
                                 ...cardSpecs.verseContainerStyle,
                                 transform: "none",
                               }}
                             >
                               {renderPoetryText(
                                 shayari.sher,
                                 shayari.customAnimation || "none",
                                 0, // no trigger for saved cards except normal render
                                 shayari.customHighlightKeywords !== undefined ? shayari.customHighlightKeywords : true,
                                 textClass,
                                 shayari.customHighlightColor,
                                 cardSpecs.fontSizeClass,
                                 cardSpecs.leadingClass,
                                 cardSpecs.containerClass,
                                 fontClass,
                                 weightClass,
                                 cardSpecs.textStyle,
                                 shayari.customTextShadow ? "0 2px 8px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.3)" : undefined,
                                 "normal",
                                 0.5,
                                 3.0,
                                 true,
                                 shayari.customHideEmoji,
                                 emojiVal,
                                 shayari.mood,
                                 shayari.highlights
                               )}
                             </div>
                           </PoetryMoveResizeWrapper>
                        </div>

                        {/* Subtle watermark inside poetry card */}
                        {renderWatermark(
                          shayari.customRatio || "9:16",
                          shayari.sher,
                          !shayari.isAI && !!shayari.poet,
                          shayari.customTextY || 0,
                          textClass,
                          shayari.customTextShadow,
                          shayari.customWatermarkText,
                          shayari.customWatermarkPosition,
                          shayari.customWatermarkOpacity,
                          shayari.customWatermarkEnabled
                        )}
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
      )}

        {/* Fixed ChatGPT / Gemini Bottom Composer Bar */}
        {activeTab === "generator" && (
          <div className="fixed bottom-[12px] left-[12px] right-[12px] max-w-lg md:max-w-2xl mx-auto z-[100] space-y-1.5 pointer-events-auto">
            
            {/* Smooth Compact Popover Panel */}
            <AnimatePresence mode="wait">
              {activeToolbarPanel && (
                <motion.div
                  key="popover-settings-panel"
                  initial={{ opacity: 0, height: 0, y: 8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="overflow-hidden bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-2.5 shadow-lg max-h-[220px] overflow-y-auto no-scrollbar space-y-2 select-none"
                >
                  {/* Popover Header Tabs */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/95 dark:bg-slate-900/95 z-10">
                    <div className="flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-0.5 rounded-xl">
                      <button
                        type="button"
                        onClick={() => {
                          triggerHapticFeedback();
                          setActiveToolbarPanel("textStyle");
                        }}
                        className={`px-2 py-0.5 rounded-lg text-[12px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                          activeToolbarPanel === "textStyle"
                            ? "bg-white dark:bg-slate-900 text-[#FF2E88] shadow-2xs"
                            : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        <Palette className="w-4 h-4 text-[#FF2E88]" />
                        <span>Text Style</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          triggerHapticFeedback();
                          setActiveToolbarPanel("language");
                        }}
                        className={`px-2 py-0.5 rounded-lg text-[12px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                          activeToolbarPanel === "language"
                            ? "bg-white dark:bg-slate-900 text-[#FF2E88] shadow-2xs"
                            : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        <Languages className="w-4 h-4 text-[#FF2E88]" />
                        <span>Language</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          triggerHapticFeedback();
                          setActiveToolbarPanel("cardStyle");
                        }}
                        className={`px-2 py-0.5 rounded-lg text-[12px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                          activeToolbarPanel === "cardStyle"
                            ? "bg-white dark:bg-slate-900 text-[#FF2E88] shadow-2xs"
                            : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        <ImageIcon className="w-4 h-4 text-[#FF2E88]" />
                        <span>Card Style</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        triggerHapticFeedback();
                        setActiveToolbarPanel(null);
                      }}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {activeToolbarPanel === "textStyle" && (() => {
                    const filteredFonts = FONTS.filter((font) =>
                      font.name.toLowerCase().includes(fontSearchQuery.toLowerCase()) ||
                      font.id.toLowerCase().includes(fontSearchQuery.toLowerCase())
                    );
                    const recentFontsList = FONTS.filter((font) => recentlyUsedFonts.includes(font.id));

                    return (
                      <div className="space-y-2">
                        {/* Search bar */}
                        <div className="relative">
                          <input
                            type="text"
                            value={fontSearchQuery}
                            onChange={(e) => setFontSearchQuery(e.target.value)}
                            placeholder="Search font (e.g. Garamond, Calligraphy, Devanagari)..."
                            className={`w-full bg-white/70 dark:bg-slate-950/40 border rounded-lg pl-7 pr-7 py-1 text-[10px] text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none transition-all ${activeTheme.inputFocus} ${activeTheme.cardBorder}`}
                          />
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                          {fontSearchQuery && (
                            <button
                              type="button"
                              onClick={() => setFontSearchQuery("")}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-[9px]"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        {/* Recently Used Fonts */}
                        {recentFontsList.length > 0 && !fontSearchQuery && (
                          <div className="space-y-1">
                            <div className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                              Recently Used
                            </div>
                            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                              {recentFontsList.map((font) => {
                                const isSelected = selectedFont === font.id;
                                return (
                                  <button
                                    key={`recent-${font.id}`}
                                    type="button"
                                    onClick={() => handleFontChange(font.id)}
                                    className={`px-2 py-0.5 rounded-md border text-[9px] cursor-pointer transition-all shrink-0 ${
                                      isSelected
                                        ? `bg-gradient-to-r ${activeTheme.buttonGrad} border-transparent text-white font-semibold`
                                        : `bg-white/80 dark:bg-slate-950/30 border-slate-200/40 dark:border-slate-800/40 text-slate-700 dark:text-slate-300 hover:bg-slate-50`
                                    }`}
                                  >
                                    <span className={font.class}>{font.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Font options list */}
                        <div className="space-y-1">
                          <div className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            All Fonts ({filteredFonts.length})
                          </div>
                          <div className="flex flex-row flex-nowrap gap-1.5 overflow-x-auto py-1 px-1 border border-slate-100/60 dark:border-slate-800/60 rounded-xl bg-white/40 dark:bg-slate-950/20 no-scrollbar w-full scroll-smooth">
                            {filteredFonts.map((font) => {
                              const isSelected = selectedFont === font.id;
                              return (
                                <button
                                  key={font.id}
                                  type="button"
                                  onClick={() => handleFontChange(font.id)}
                                  className={`p-1 px-1.5 rounded-lg border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between h-[34px] min-h-[34px] w-[80px] min-w-[80px] max-w-[86px] shrink-0 ${
                                    isSelected
                                      ? `bg-gradient-to-r ${activeTheme.buttonGrad} border-transparent text-white shadow-xs scale-[1.01]`
                                      : `bg-white/90 dark:bg-slate-950/50 border-slate-200/55 dark:border-slate-800/55 hover:border-slate-300 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800`
                                  }`}
                                >
                                  <span className={`text-[6px] font-mono tracking-tight font-bold uppercase line-clamp-1 ${isSelected ? "text-indigo-100" : "text-slate-400"}`}>
                                    {font.name}
                                  </span>
                                  <span className={`text-[8px] mt-0.5 line-clamp-1 block leading-none font-medium ${font.class}`}>
                                    ग़ज़ल Aa
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Selected Live Preview */}
                        <div className="text-center py-1 px-2 rounded bg-white/50 dark:bg-slate-950/20 border border-slate-100/40 dark:border-slate-800/40">
                          <span className={`text-[9px] leading-tight block ${activeFontConfig.class} ${shayariFontWeightClass} ${activeTheme.textColor}`}>
                            धड़कन, एहसास, ग़ज़ल और शायरी... (Selected Preview)
                          </span>
                        </div>
                      </div>
                    );
                  })()}

                  {activeToolbarPanel === "language" && (
                    <div className="flex gap-1.5 py-1">
                      {[
                        { id: "hindi", name: "Hindi (हिन्दी)", desc: "Devanagari script" },
                        { id: "urdu", name: "Urdu (اردو)", desc: "Urdu script style" },
                        { id: "hinglish", name: "Hinglish", desc: "Roman script" }
                      ].map((lang) => {
                        const isSelected = selectedLanguage === lang.id;
                        return (
                          <button
                            key={lang.id}
                            type="button"
                            onClick={() => handleLanguageChange(lang.id as any)}
                            className={`flex-1 py-1.5 px-1 rounded-xl text-[12px] text-center cursor-pointer transition-all border flex flex-col justify-center items-center ${
                              isSelected
                                ? `bg-gradient-to-r ${activeTheme.buttonGrad} text-white border-transparent shadow-2xs font-bold`
                                : `bg-white/80 dark:bg-slate-900/80 ${activeTheme.iconColor} border-slate-200/40 dark:border-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800 ${activeTheme.cardBorder}`
                            }`}
                          >
                            <span className="font-bold">{lang.name}</span>
                            <span className={`text-[9px] mt-0.5 opacity-80 leading-none ${isSelected ? "text-indigo-100" : "text-slate-400"}`}>
                              {lang.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {activeToolbarPanel === "cardStyle" && (
                    <div className="space-y-2 py-0.5 animate-fade-in">
                      {/* Panel Sub Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12px] font-bold text-slate-800 dark:text-slate-200">
                            Card Style
                          </span>
                        </div>
                        {((generatedShayaris[activeCardIndex]?.customCardStyleBg) || selectedCardStyleBg) && (
                          <button
                            type="button"
                            onClick={() => handleApplyCardStyleToActiveCard(null)}
                            className="text-[10px] font-bold text-rose-500 hover:text-rose-600 cursor-pointer flex items-center gap-1 transition-colors"
                          >
                            <span>Reset Theme</span>
                          </button>
                        )}
                      </div>

                      {/* Card Style Image Thumbnails */}
                      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2 pt-1 scroll-smooth select-none min-h-[120px]">
                        {(() => {
                          const activeCard = generatedShayaris[activeCardIndex];
                          const activeStyle = activeCard?.customCardStyleBg !== undefined
                            ? activeCard.customCardStyleBg
                            : (selectedCardStyleBg || "");
                          const isDefaultSelected = !activeStyle;

                          return (
                            <>
                              {/* Default / Reset Thumbnail Option */}
                              <button
                                type="button"
                                onClick={() => handleApplyCardStyleToActiveCard(null)}
                                className={`w-[72px] h-[108px] min-w-[72px] rounded-[18px] border flex flex-col items-center justify-center cursor-pointer transition-all duration-200 active:scale-95 shadow-md shrink-0 ${
                                  isDefaultSelected
                                    ? "border-[#FF2D8D] ring-2 ring-[#FF2D8D]/60 shadow-[0_0_14px_rgba(255,45,141,0.4)] scale-[1.03] bg-rose-50/50 dark:bg-rose-950/20 z-10"
                                    : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:scale-[1.02]"
                                }`}
                              >
                                <span className="text-2xl">🎨</span>
                                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-none mt-1.5">Default</span>
                              </button>

                              {isLoadingStyles ? (
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 italic py-2">
                                  <span className="w-3.5 h-3.5 rounded-full border-2 border-[#FF2D8D] border-t-transparent animate-spin"></span>
                                  Loading styles...
                                </div>
                              ) : (
                                validCardStyles.map((stylePath) => {
                                  const isSelected = activeStyle === stylePath;
                                  const { cleanName } = getCategoryAndName(stylePath);

                                  return (
                                    <button
                                      key={stylePath}
                                      type="button"
                                      onClick={() => handleApplyCardStyleToActiveCard(stylePath)}
                                      className={`w-[72px] h-[108px] min-w-[72px] rounded-[18px] overflow-hidden cursor-pointer transition-all duration-200 active:scale-95 shadow-md relative flex items-center justify-center bg-slate-100 dark:bg-slate-800 shrink-0 ${
                                        isSelected
                                          ? "border-2 border-[#FF2D8D] ring-2 ring-[#FF2D8D]/60 shadow-[0_0_14px_rgba(255,45,141,0.4)] scale-[1.03] z-10"
                                          : "border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 hover:scale-[1.02]"
                                      }`}
                                      title={cleanName}
                                    >
                                      <img
                                        src={stylePath}
                                        alt={cleanName}
                                        className="w-full h-full object-cover rounded-[18px]"
                                        referrerPolicy="no-referrer"
                                        onError={(e) => {
                                          const btn = e.currentTarget.closest("button");
                                          if (btn) btn.style.setProperty("display", "none", "important");
                                          setFailedCardStyles((prev) => {
                                            const next = new Set(prev);
                                            next.add(stylePath);
                                            return next;
                                          });
                                        }}
                                      />
                                    </button>
                                  );
                                })
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ChatGPT / Gemini Compact Bottom Input Composer */}
            {!editingShayari && (
              <form
                onSubmit={handleGenerate}
                className="w-full h-[48px] bg-white border border-slate-200/90 rounded-[24px] px-2.5 flex items-center gap-2 shadow-lg focus-within:border-[#FF2D8D]/60 transition-all"
              >
                {/* 3-Line Menu / Settings Icon on Left */}
                <button
                  type="button"
                  onClick={() => {
                    triggerHapticFeedback();
                    setActiveToolbarPanel(activeToolbarPanel ? null : "textStyle");
                  }}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-all cursor-pointer shrink-0 ${
                    activeToolbarPanel
                      ? "bg-gradient-to-r from-[#FF2D8D] to-[#7B2FF7] text-white shadow-2xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                  title="Settings & Styles"
                >
                  <Menu className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  id="mood_input"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    if (e.target.value.trim()) setError(null);
                  }}
                  placeholder="Type your mood…"
                  maxLength={150}
                  className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none px-1 h-full"
                />

                {userInput.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      triggerHapticFeedback();
                      setUserInput("");
                    }}
                    className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all cursor-pointer mr-0.5"
                    title="Clear text"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Send Button (32px Circle) */}
                <button
                  type="submit"
                  disabled={isLoading || isGenerateDisabledBy429 || !userInput.trim()}
                  onClick={triggerHapticFeedback}
                  className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full bg-gradient-to-r from-[#FF2E88] to-[#7B2FF7] text-white flex items-center justify-center shadow-2xs hover:opacity-95 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  title={isGenerateDisabledBy429 ? `Wait (${generateDisableCountdown}s)` : "Send"}
                >
                  <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </form>
            )}

          </div>
        )}



      </div>
    );
  };

  return (
    <div className={`w-screen h-screen max-h-screen bg-gradient-to-b ${activeTheme.bgGrad} flex flex-col font-sans antialiased relative selection:bg-purple-200/70 transition-colors duration-500 overflow-hidden select-none`} id="app_root">
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[30%] -left-[20%] w-[80%] h-[80%] rounded-full opacity-[0.08] blur-[160px] bg-current ${activeTheme.iconColor} transition-all duration-700`} />
        <div className={`absolute -bottom-[30%] -right-[20%] w-[80%] h-[80%] rounded-full opacity-[0.08] blur-[160px] bg-current ${activeTheme.iconColor} transition-all duration-700`} />
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

      {/* Full-screen Fluid responsive container layout */}
      <div className="flex-1 flex flex-col h-full max-h-screen overflow-hidden relative w-full max-w-lg md:max-w-2xl mx-auto shadow-sm border-x border-[#F1F5F9] bg-white">
        {renderAppContent()}
      </div>

      {/* Shayari Card Custom Editor Modal */}
      <AnimatePresence>
        {editingShayari && (
          <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              className="w-full h-full flex flex-col relative overflow-hidden bg-white max-w-2xl mx-auto shadow-2xl"
            >
              {/* Modal Body Container */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden select-none relative bg-white">
                
                {/* COMPACT EDITOR HEADER WITH RESET / DOWNLOAD / SAVE BUTTONS */}
                <div className="w-full flex items-center justify-between px-3 py-2 z-30 shrink-0 bg-white border-b border-slate-100 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-[#FF2D8D]" />
                      <span>Card Editor</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Reset Button */}
                    <button
                      type="button"
                      onClick={handleResetCard}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1 border border-slate-200/80 shadow-2xs"
                      title="Reset Card"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                      <span>Reset</span>
                    </button>

                    {/* Download Button */}
                    <button
                      type="button"
                      onClick={async () => {
                        handleSaveChanges();
                        await handleDownloadPreview();
                      }}
                      className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1 shadow-2xs"
                      title="Download Image"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Download</span>
                    </button>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={async () => {
                        handleSaveChanges();
                        await handleSharePreview();
                      }}
                      className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200/80 text-[11px] font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1 shadow-2xs"
                      title="Share Card Image"
                    >
                      <Share2 className="w-3.5 h-3.5 text-purple-600" />
                      <span>Share</span>
                    </button>

                    {/* Save / Done Button */}
                    <button
                      type="button"
                      onClick={handleSaveChanges}
                      className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-1 shadow-2xs"
                      title="Save Changes"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>

                {/* EXPANDED LIVE PREVIEW SECTION */}
                <div 
                  className="w-full border-b border-slate-100 bg-slate-50/70 flex-[2.5_2.5_0%] min-h-[360px] max-h-[66vh] flex flex-col justify-center items-center relative overflow-hidden select-none px-2 py-2"
                >
                  <div 
                    ref={previewContainerRef}
                    className="w-full h-full flex items-center justify-center overflow-hidden relative"
                  >
                    {
                      (() => {
                        const currentRatio = (editedRatio || editingShayari.customRatio || "9:16") as "1:1" | "4:5" | "9:16" | "16:9";
                        const baseSpec = CARD_RATIO_SPECS[currentRatio] || CARD_RATIO_SPECS["9:16"];
                        const targetW = baseSpec.width;
                        const targetH = baseSpec.height;

                        const modalSpecs = getAutoAdjustedCardSpecs(
                          currentRatio,
                          editedTextSize,
                          editedSher,
                          !editingShayari.isAI && !!editingShayari.poet,
                          editedLineSpacing,
                          editedTextBoxWidth,
                          editedTextBoxHeight,
                          editedTextWrapping,
                          true,
                          customHideEmoji
                        );

                        const containerW = previewContainerSize.width > 0 ? previewContainerSize.width : 340;
                        const containerH = previewContainerSize.height > 0 ? previewContainerSize.height : 280;

                        // Safe margins to ensure the card never touches container edges and shadow has room
                        const availableW = Math.max(100, containerW - 20);
                        const availableH = Math.max(100, containerH - 20);

                        // Single source of truth proportional scale factor: aspectRatio -> cardWidth/cardHeight -> scale
                        const scale = Math.min(availableW / targetW, availableH / targetH);
                        activeEditorScaleRef.current = scale;

                        const { bgClass, style: bgStyle } = getCardBgStyleAndClass(
                          editedBgGradient,
                          editedBgTexture,
                          editedBgColor,
                          "bg-slate-50"
                        );
                        const editedStyleBg = editedCardStyleBg !== undefined ? editedCardStyleBg : (selectedCardStyleBg || "");

                        const finalCardBgStyle: React.CSSProperties = {
                          borderRadius: "28px",
                          boxShadow: "0 16px 36px rgba(0, 0, 0, 0.20), 0 5px 14px rgba(0, 0, 0, 0.12)",
                          border: "1px solid #F1F5F9",
                        };

                        if (editedStyleBg && !editedBgGradient && !editedBgColor) {
                          finalCardBgStyle.backgroundImage = `url("${formatCardBgUrl(editedStyleBg)}")`;
                          finalCardBgStyle.backgroundSize = "cover";
                          finalCardBgStyle.backgroundPosition = "center";
                          finalCardBgStyle.backgroundRepeat = "no-repeat";
                        } else if (editedBgGradient) {
                          if (editedBgGradient.includes("gradient")) {
                            finalCardBgStyle.backgroundImage = editedBgGradient;
                          } else {
                            finalCardBgStyle.backgroundImage = convertTailwindGradientToCss(editedBgGradient);
                          }
                        } else if (editedBgColor) {
                          if (editedBgColor.startsWith("#") || editedBgColor.startsWith("rgb") || editedBgColor.startsWith("hsl")) {
                            finalCardBgStyle.backgroundColor = editedBgColor;
                          } else {
                            finalCardBgStyle.backgroundColor = solidsMap[editedBgColor] || resolveTailwindColor(editedBgColor.replace("bg-", "")) || "#FFFFFF";
                          }
                        } else {
                          finalCardBgStyle.backgroundColor = "#FFFFFF";
                        }

                        return (
                          <div
                            className="relative flex items-center justify-center select-none"
                            style={{
                              width: `${targetW * scale}px`,
                              height: `${targetH * scale}px`,
                            }}
                          >
                            <div
                              style={{
                                width: `${targetW}px`,
                                height: `${targetH}px`,
                                transform: `scale(${scale})`,
                                transformOrigin: "center center",
                                flexShrink: 0,
                              }}
                            >
                              <div 
                                id="custom-card-preview"
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                style={{ 
                                  containerType: "size", 
                                  width: "100%",
                                  height: "100%",
                                  backgroundColor: "#FFFFFF",
                                  ...modalSpecs.cardVariables, 
                                  "--font-size-scale": editedTextScale,
                                  ...modalSpecs.cardStyle,
                                } as React.CSSProperties}
                                className={`shayari-card relative overflow-hidden rounded-[28px] ${modalSpecs.paddingClass} border border-[#F1F5F9] shadow-[0_16px_36px_rgba(0,0,0,0.20),0_5px_14px_rgba(0,0,0,0.12)] flex flex-col justify-center items-center ${baseSpec.aspectClass}`}
                              >
                                {/* Background Container */}
                                <div
                                  style={{ ...finalCardBgStyle, opacity: editedBgOpacity }}
                                  className={`absolute inset-0 z-0 ${bgClass}`}
                                >
                                  {/* Texture overlay */}
                                  {editedBgTexture && getTextureOverlayWithFallback(editedBgTexture)}

                                  {/* Inner glowing core decoration matching selected theme */}
                                  <div className={`absolute -right-12 -bottom-12 w-32 h-32 rounded-full ${activeTheme.accentGlow} opacity-30 pointer-events-none`} />

                                  {/* Base64 Decorative Image Background */}
                                  {editedImage ? (
                                    <div
                                      className={`absolute select-none cursor-move overflow-hidden ${
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
                                        style={{ filter: editedImageFilter }}
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
                                    <div className={`absolute -right-2 -bottom-6 ${activeTheme.cardDecoration} text-[110px] font-serif select-none pointer-events-none opacity-40 transition-colors duration-500`}>
                                      ❦
                                    </div>
                                  )}
                                </div>

                                {/* Drag instruction overlay if there is an image */}
                                {editedImage && (
                                  <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full pointer-events-none z-20">
                                    Drag Image to Position
                                  </div>
                                )}

                                {/* Card preview top metadata bar */}
                                <div className={`absolute top-0 left-0 right-0 flex justify-between items-center px-3.5 py-2 border-b ${activeTheme.cardBorder} z-20`} data-download-ignore="true">
                                  <div className="flex items-center">
                                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-lg border ${activeTheme.tagClassic} shadow-3xs`}>
                                      #01
                                    </span>
                                  </div>
                                </div>

                                {/* Card preview shayari verses */}
                                <div 
                                  className="w-full flex flex-col items-center justify-center relative z-10 box-border"
                                  style={{ ...modalSpecs.innerWrapperStyle }}
                                >
                                  {/* Emotional Title with Automatic Resizing & Safe Horizontal Padding */}
                                  {editingShayari && (
                                    <ShayariCardTitle
                                      title={getShayariTitle(editingShayari)}
                                      ratio={currentRatio}
                                      isLightBg={
                                        !editedBgGradient?.includes("950") &&
                                        !editedBgGradient?.includes("900") &&
                                        !editedBgGradient?.includes("black") &&
                                        !editedBgColor?.includes("slate-9") &&
                                        !editedBgColor?.includes("zinc-9") &&
                                        !editedBgColor?.includes("black") &&
                                        !editedCardStyleBg
                                      }
                                      textColor={editedTextColor}
                                      hasTextShadow={!!editedTextShadow}
                                    />
                                  )}

                                  {/* Urdu / Hindi Script text */}
                                  <div 
                                    className="w-full flex flex-col items-center justify-center text-center"
                                    style={{ 
                                      ...modalSpecs.verseContainerStyle,
                                      transform: `translate(${textPos.x}px, ${textPos.y}px)`
                                    }}
                                  >
                                    {renderPoetryText(
                                      editedSher || "Your beautiful verse will appear here...",
                                      "none",
                                      0,
                                      editedHighlightKeywords,
                                      editedTextColor,
                                      editedHighlightColor,
                                      modalSpecs.fontSizeClass,
                                      modalSpecs.leadingClass,
                                      modalSpecs.containerClass,
                                      editedFontClass,
                                      editedIsBold ? "!font-bold" : "!font-normal",
                                      {
                                        ...modalSpecs.textStyle,
                                        ...(editedTextGradient ? {
                                          backgroundImage: editedTextGradient,
                                          WebkitBackgroundClip: "text",
                                          WebkitTextFillColor: "transparent",
                                          color: "transparent"
                                        } : {})
                                      },
                                      editedTextShadow ? "0 2px 8px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.3)" : undefined,
                                      "normal",
                                      0.5,
                                      3.0,
                                      true,
                                      customHideEmoji,
                                      editedEmoji,
                                      editingShayari?.mood,
                                      editingShayari?.highlights
                                    )}
                                  </div>
                                </div>

                                {/* Subtle watermark inside poetry card (custom editor) */}
                                {renderWatermark(
                                  currentRatio,
                                  editedSher,
                                  !editingShayari.isAI && !!editingShayari.poet,
                                  textPos.y || 0,
                                  editedTextColor,
                                  editedTextShadow,
                                  editingShayari.customWatermarkText,
                                  editingShayari.customWatermarkPosition,
                                  editingShayari.customWatermarkOpacity,
                                  editingShayari.customWatermarkEnabled
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    }
                  </div>
                </div>

                {/* EDITING CONTROLS SECTION */}
                <PoetryCardEditorControls
                  activeTool={activeTool}
                  setActiveTool={setActiveTool}
                  editedSher={editedSher}
                  setEditedSher={setEditedSher}
                  editedEmoji={editedEmoji}
                  setEditedEmoji={setEditedEmoji}
                  editedRatio={editedRatio}
                  setEditedRatio={setEditedRatio}
                  bgTab={bgTab}
                  setBgTab={setBgTab}
                  editedBgColor={editedBgColor}
                  setEditedBgColor={setEditedBgColor}
                  editedBgGradient={editedBgGradient}
                  setEditedBgGradient={setEditedBgGradient}
                  editedBgTexture={editedBgTexture}
                  setEditedBgTexture={setEditedBgTexture}
                  loadedCardStyles={loadedCardStyles}
                  isLoadingStyles={isLoadingStyles}
                  editedCardStyleBg={editedCardStyleBg}
                  setEditedCardStyleBg={setEditedCardStyleBg}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  editedFontClass={editedFontClass}
                  setEditedFontClass={setEditedFontClass}
                  editedIsBold={editedIsBold}
                  setEditedIsBold={setEditedIsBold}
                  editedTextSize={editedTextSize}
                  handleIncreaseTextSize={handleIncreaseTextSize}
                  handleDecreaseTextSize={handleDecreaseTextSize}
                  convertTextSizeToPx={convertTextSizeToPx}
                  handleAutoFitText={handleAutoFitText}
                  editedLineSpacing={editedLineSpacing}
                  setEditedLineSpacing={setEditedLineSpacing}
                  editedTextBoxWidth={editedTextBoxWidth}
                  setEditedTextBoxWidth={setEditedTextBoxWidth}
                  editedTextBoxHeight={editedTextBoxHeight}
                  setEditedTextBoxHeight={setEditedTextBoxHeight}
                  editedTextWrapping={editedTextWrapping}
                  setEditedTextWrapping={setEditedTextWrapping}
                  editedTextColor={editedTextColor}
                  setEditedTextColor={setEditedTextColor}
                  editedTextShadow={editedTextShadow}
                  setEditedTextShadow={setEditedTextShadow}
                  editedHighlightKeywords={editedHighlightKeywords}
                  setEditedHighlightKeywords={setEditedHighlightKeywords}
                  editedHighlightColor={editedHighlightColor}
                  setEditedHighlightColor={setEditedHighlightColor}
                  textPos={textPos}
                  setTextPos={setTextPos}
                  handleMoveText={handleMoveText}
                  editedImage={editedImage}
                  setEditedImage={setEditedImage}
                  imagePos={imagePos}
                  setImagePos={setImagePos}
                  handleImageUpload={handleImageUpload}
                  editedImageMode={editedImageMode}
                  setEditedImageMode={setEditedImageMode}
                  editedImageScale={editedImageScale}
                  setEditedImageScale={setEditedImageScale}
                  editedImageRotate={editedImageRotate}
                  setEditedImageRotate={setEditedImageRotate}
                  editedImageFilter={editedImageFilter}
                  setEditedImageFilter={setEditedImageFilter}
                  isTranslatingId={isTranslatingId}
                  handleTranslate={handleTranslate}
                  editingShayari={editingShayari}
                  showToast={showToast}
                  textures={textures}
                  filterOptions={filterOptions}
                  premiumTextColors={premiumTextColors}
                  gradientTextColors={gradientTextColors}
                  HIGHLIGHT_COLORS={HIGHLIGHT_COLORS}
                  FONTS={FONTS}
                  customHideEmoji={customHideEmoji}
                  setCustomHideEmoji={setCustomHideEmoji}
                  customHideWatermark={false}
                  setCustomHideWatermark={() => setShowPremiumPopup(true)}
                  editedBgOpacity={editedBgOpacity}
                  setEditedBgOpacity={setEditedBgOpacity}
                  editedTextGradient={editedTextGradient}
                  setEditedTextGradient={setEditedTextGradient}
                />

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Feature Popup Modal */}
      <AnimatePresence>
        {showPremiumPopup && (
          <div 
            className="fixed inset-0 bg-black/65 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-fadeIn" 
            id="premium-popup-overlay"
            onClick={() => setShowPremiumPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl max-w-sm w-full overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]"
              id="premium-popup-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Premium Gradient Banner */}
              <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 h-2 w-full" />
              
              <div className="p-6 text-center space-y-4">
                {/* Premium Icon and Visual */}
                <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center border border-amber-200 dark:border-amber-800/50 animate-bounce shadow-sm">
                  <Crown className="w-6 h-6 text-amber-500" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-wider">
                    Premium Feature
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Watermark customization will be available in a future update. Upgrade to Premium after launch to remove or customize the watermark.
                  </p>
                </div>

                {/* Buttons Stack */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    disabled
                    className="flex-1 py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed border border-slate-200/40 dark:border-slate-700/30 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    <span>Coming Soon</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPremiumPopup(false)}
                    className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all active:scale-[0.97] shadow-md border border-slate-900 dark:border-white"
                  >
                    OK
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gemini Rate Limit / Quota Exceeded (429) Modal Dialog */}
      <RateLimitDialog
        isOpen={isRateLimitDialogOpen}
        onClose={() => setIsRateLimitDialogOpen(false)}
        onTryAgain={() => {
          setIsRateLimitDialogOpen(false);
          if (!isGenerateDisabledBy429) {
            const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
            handleGenerate(fakeEvent);
          }
        }}
        resetSeconds={rateLimitResetSeconds}
        isDisableCooldownActive={isGenerateDisabledBy429}
        disableCooldownSeconds={generateDisableCountdown}
      />

      {/* Edit Shayari Bottom Sheet */}
      <EditShayariBottomSheet
        isOpen={!!activeEditSheetId}
        shayari={
          generatedShayaris.find((s) => s.id === activeEditSheetId) ||
          savedShayaris.find((s) => s.id === activeEditSheetId) ||
          null
        }
        onUpdateText={updateShayariText}
        onSave={() => {
          showToast("Shayari saved successfully! ✨");
        }}
        onClose={() => {
          setActiveEditSheetId(null);
        }}
      />

    </div>
  );
}
