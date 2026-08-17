import React, { useState } from "react";
import { 
  Type, Palette, Layout, Image as ImageIcon, Languages, AlignLeft, AlignCenter, AlignRight,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Check, Sparkles, Sliders, Upload, Trash2, X, Highlighter
} from "lucide-react";
import { convertTailwindGradientToCss, solidsMap } from "../backgroundUtils";
import { HIGHLIGHT_COLORS as DEFAULT_HIGHLIGHT_COLORS, resolveHighlightHex, HighlightColorOption } from "../utils/highlightUtils";

interface EditorControlsProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
  editedSher: string;
  setEditedSher: (val: string) => void;
  editedEmoji: string;
  setEditedEmoji: (val: string) => void;
  editedRatio: "1:1" | "4:5" | "9:16" | "16:9";
  setEditedRatio: (val: "1:1" | "4:5" | "9:16" | "16:9") => void;
  bgTab: "cardStyles" | "solids" | "gradients" | "trending" | "textures" | "luxury";
  setBgTab: (val: "cardStyles" | "solids" | "gradients" | "trending" | "textures" | "luxury") => void;
  editedBgColor: string;
  setEditedBgColor: (val: string) => void;
  editedBgGradient: string;
  setEditedBgGradient: (val: string) => void;
  editedBgTexture: string;
  setEditedBgTexture: (val: string) => void;
  loadedCardStyles?: string[];
  isLoadingStyles?: boolean;
  editedCardStyleBg?: string;
  setEditedCardStyleBg?: (val: string) => void;
  selectedCategory?: string;
  setSelectedCategory?: (val: string) => void;
  editedFontClass: string;
  setEditedFontClass: (val: string) => void;
  editedIsBold: boolean;
  setEditedIsBold: (val: boolean) => void;
  editedTextSize: string;
  handleIncreaseTextSize: () => void;
  handleDecreaseTextSize: () => void;
  convertTextSizeToPx: (size: string) => number;
  handleAutoFitText: () => void;
  editedLineSpacing: number;
  setEditedLineSpacing: (val: number) => void;
  editedTextBoxWidth: number;
  setEditedTextBoxWidth: (val: number) => void;
  editedTextBoxHeight: number;
  setEditedTextBoxHeight: (val: number) => void;
  editedTextWrapping: "wrap" | "nowrap";
  setEditedTextWrapping: (val: "wrap" | "nowrap") => void;
  editedTextColor: string;
  setEditedTextColor: (val: string) => void;
  editedTextShadow: boolean;
  setEditedTextShadow: (val: boolean) => void;
  editedHighlightKeywords: boolean;
  setEditedHighlightKeywords: (val: boolean) => void;
  editedHighlightColor: string;
  setEditedHighlightColor: (val: string) => void;
  textPos: { x: number; y: number };
  setTextPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  handleMoveText: (dir: "up" | "down" | "left" | "right") => void;
  editedImage: string | null;
  setEditedImage: (val: string | null) => void;
  imagePos: { x: number; y: number };
  setImagePos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editedImageMode: "small" | "fit" | "fill" | "contain" | "cover";
  setEditedImageMode: (val: "small" | "fit" | "fill" | "contain" | "cover") => void;
  editedImageScale: number;
  setEditedImageScale: (val: number) => void;
  editedImageRotate: number;
  setEditedImageRotate: (val: number) => void;
  editedImageFilter: string;
  setEditedImageFilter: (val: string) => void;
  isTranslatingId: string | null;
  handleTranslate: any;
  editingShayari: any;
  showToast: (msg: string) => void;
  textures: any[];
  filterOptions: any[];
  premiumTextColors: any[];
  gradientTextColors: any[];
  HIGHLIGHT_COLORS: any[];
  FONTS: any[];
  customHideEmoji: boolean;
  setCustomHideEmoji: (val: boolean) => void;
  customHideWatermark: boolean;
  setCustomHideWatermark: (val: boolean) => void;
  editedBgOpacity?: number;
  setEditedBgOpacity?: (val: number) => void;
  editedTextGradient?: string;
  setEditedTextGradient?: (val: string) => void;
}

const PRESET_GRADIENTS = [
  { name: "Pink Purple", value: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)" },
  { name: "Sunset Glow", value: "linear-gradient(135deg, #f97316 0%, #eab308 50%, #ec4899 100%)" },
  { name: "Peach Soft", value: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)" },
  { name: "Blue Purple", value: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)" },
  { name: "Dark Neon", value: "linear-gradient(135deg, #090d16 0%, #06b6d4 100%)" },
  { name: "Gold Cream", value: "linear-gradient(135deg, #fef3c7 0%, #fde047 50%, #f59e0b 100%)" },
  { name: "Rose Glow", value: "linear-gradient(135deg, #FF2D8D 0%, #f43f5e 50%, #ec4899 100%)" },
  { name: "Lavender", value: "linear-gradient(135deg, #ddd6fe 0%, #c084fc 100%)" },
  { name: "Sky Blue", value: "linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%)" },
  { name: "Emerald Mint", value: "linear-gradient(135deg, #059669 0%, #10b981 50%, #06b6d4 100%)" },
  { name: "Black Gold", value: "linear-gradient(135deg, #09090b 0%, #27272a 50%, #d97706 100%)" },
  { name: "Soft White", value: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)" },
  { name: "Sunset Velvet", value: "linear-gradient(135deg, #FF007A 0%, #7B00FF 100%)" },
  { name: "Royal Indigo", value: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)" },
  { name: "Emerald Forest", value: "linear-gradient(135deg, #064E3B 0%, #047857 100%)" },
  { name: "Midnight Obsidian", value: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" },
  { name: "Rose Violet", value: "linear-gradient(135deg, #881337 0%, #4C0519 100%)" },
  { name: "Gold Dusk", value: "linear-gradient(135deg, #78350F 0%, #B45309 100%)" },
  { name: "Peach Blush", value: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)" },
  { name: "Soft Cream", value: "linear-gradient(135deg, #FEFCE8 0%, #FEF08A 100%)" },
  { name: "Deep Cyber Violet", value: "linear-gradient(135deg, #2e1065 0%, #581c87 50%, #030712 100%)" },
  { name: "Coral Sunrise", value: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)" },
];

const PRESET_SOLIDS = [
  { name: "Pure White", value: "#FFFFFF" },
  { name: "Soft Slate", value: "#F8FAFC" },
  { name: "Light Gray", value: "#F1F5F9" },
  { name: "Rose Tint", value: "#FFF1F2" },
  { name: "Mint Tint", value: "#F0FDFA" },
  { name: "Cream Tint", value: "#FEFCE8" },
  { name: "Dark Slate", value: "#0F172A" },
  { name: "Deep Indigo", value: "#1E1B4B" },
];

const PRESET_TEXT_COLORS = [
  { label: "Black", value: "text-slate-900", colorHex: "#0F172A" },
  { label: "Charcoal", value: "text-slate-700", colorHex: "#334155" },
  { label: "White", value: "text-white", colorHex: "#FFFFFF" },
  { label: "Navy", value: "text-blue-900", colorHex: "#1E3A8A" },
  { label: "Royal Blue", value: "text-blue-600", colorHex: "#2563EB" },
  { label: "Sky Blue", value: "text-sky-500", colorHex: "#0EA5E9" },
  { label: "Emerald", value: "text-emerald-800", colorHex: "#065F46" },
  { label: "Mint", value: "text-emerald-500", colorHex: "#10B981" },
  { label: "Purple", value: "text-purple-900", colorHex: "#581C87" },
  { label: "Violet", value: "text-violet-600", colorHex: "#7C3AED" },
  { label: "Hot Pink", value: "text-pink-500", colorHex: "#EC4899" },
  { label: "Rose Red", value: "text-rose-600", colorHex: "#E11D48" },
  { label: "Orange", value: "text-orange-600", colorHex: "#EA580C" },
  { label: "Gold", value: "text-amber-600", colorHex: "#D97706" },
  { label: "Chocolate", value: "text-amber-950", colorHex: "#451A03" },
  { label: "Warm Sand", value: "text-stone-600", colorHex: "#57534E" },
];

const PRESET_GRADIENT_TEXTS = [
  { name: "Pink → Purple", value: "linear-gradient(to right, #ec4899, #8b5cf6)" },
  { name: "Blue → Purple", value: "linear-gradient(to right, #3b82f6, #9333ea)" },
  { name: "Orange → Pink", value: "linear-gradient(to right, #f97316, #ec4899)" },
  { name: "Gold → Orange", value: "linear-gradient(to right, #eab308, #ea580c)" },
  { name: "White → Pink", value: "linear-gradient(to right, #ffffff, #f472b6)" },
  { name: "Black → Gray", value: "linear-gradient(to right, #0f172a, #64748b)" },
  { name: "Emerald → Cyan", value: "linear-gradient(to right, #10b981, #06b6d4)" },
  { name: "Rose → Gold", value: "linear-gradient(to right, #f43f5e, #f59e0b)" },
];

export const PoetryCardEditorControls: React.FC<EditorControlsProps> = ({
  activeTool,
  setActiveTool,
  editedSher,
  setEditedSher,
  editedEmoji,
  setEditedEmoji,
  editedRatio,
  setEditedRatio,
  editedBgColor,
  setEditedBgColor,
  editedBgGradient,
  setEditedBgGradient,
  loadedCardStyles = [],
  editedCardStyleBg = "",
  setEditedCardStyleBg,
  editedFontClass,
  setEditedFontClass,
  editedIsBold,
  setEditedIsBold,
  editedTextSize,
  handleIncreaseTextSize,
  handleDecreaseTextSize,
  handleAutoFitText,
  editedLineSpacing,
  setEditedLineSpacing,
  editedTextBoxWidth,
  setEditedTextBoxWidth,
  editedTextColor,
  setEditedTextColor,
  editedTextShadow,
  setEditedTextShadow,
  editedHighlightKeywords = false,
  setEditedHighlightKeywords,
  editedHighlightColor = "gold",
  setEditedHighlightColor,
  textPos,
  setTextPos,
  handleMoveText,
  editedImage,
  setEditedImage,
  handleImageUpload,
  editedImageMode,
  setEditedImageMode,
  editedImageScale,
  setEditedImageScale,
  editedImageFilter,
  setEditedImageFilter,
  isTranslatingId,
  handleTranslate,
  editingShayari,
  filterOptions = [],
  FONTS = [],
  customHideEmoji,
  setCustomHideEmoji,
  editedBgOpacity = 1.0,
  setEditedBgOpacity,
  editedTextGradient = "",
  setEditedTextGradient,
}) => {
  const [failedCardStyles, setFailedCardStyles] = useState<Set<string>>(new Set());
  const validCardStyles = loadedCardStyles.filter((s) => Boolean(s) && !failedCardStyles.has(s));

  // Determine active tool (text, background, layout, image)
  const currentTool = 
    activeTool === "background" || activeTool === "layout" || activeTool === "image" 
      ? activeTool 
      : "text";

  const handleSelectCardStyle = (styleUrl: string) => {
    if (setEditedCardStyleBg) {
      setEditedCardStyleBg(styleUrl);
    }
    setEditedBgGradient("");
    setEditedBgColor("");
  };

  const handleSelectGradient = (gradValue: string) => {
    setEditedBgGradient(gradValue);
    if (setEditedCardStyleBg) setEditedCardStyleBg("");
    setEditedBgColor("");
  };

  const handleSelectSolid = (colorValue: string) => {
    setEditedBgColor(colorValue);
    if (setEditedCardStyleBg) setEditedCardStyleBg("");
    setEditedBgGradient("");
  };

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col bg-white overflow-y-auto p-2.5 md:p-3 select-none space-y-2">
      {/* STICKY 4-BUTTON TAB BAR DIRECTLY BELOW CARD PREVIEW */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md pb-2 pt-0.5 border-b border-slate-100 shrink-0">
        <div className="grid grid-cols-4 gap-1.5 w-full">
          <button
            type="button"
            onClick={() => setActiveTool("text")}
            className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              currentTool === "text"
                ? "bg-slate-900 text-white shadow-xs border border-slate-900"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60"
            }`}
          >
            <Type className={`w-3.5 h-3.5 ${currentTool === "text" ? "text-indigo-400" : "text-indigo-600"}`} />
            <span>Text</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTool("background")}
            className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              currentTool === "background"
                ? "bg-slate-900 text-white shadow-xs border border-slate-900"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60"
            }`}
          >
            <Palette className={`w-3.5 h-3.5 ${currentTool === "background" ? "text-rose-400" : "text-rose-600"}`} />
            <span>Bg</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTool("layout")}
            className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              currentTool === "layout"
                ? "bg-slate-900 text-white shadow-xs border border-slate-900"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60"
            }`}
          >
            <Layout className={`w-3.5 h-3.5 ${currentTool === "layout" ? "text-amber-400" : "text-amber-600"}`} />
            <span>Layout</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTool("image")}
            className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              currentTool === "image"
                ? "bg-slate-900 text-white shadow-xs border border-slate-900"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60"
            }`}
          >
            <ImageIcon className={`w-3.5 h-3.5 ${currentTool === "image" ? "text-emerald-400" : "text-emerald-600"}`} />
            <span>Image</span>
          </button>
        </div>
      </div>

      {/* ACTIVE SECTION CONTENTS */}
      <div className="flex-1 space-y-3 pb-3">
        {/* ================= 1. TEXT ================= */}
        {currentTool === "text" && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Poetry Input & Quick Translations */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">Verse Text</label>
                <div className="flex items-center gap-1">
                  {["hindi", "urdu", "hinglish"].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      disabled={isTranslatingId === "modal"}
                      onClick={() => {
                        handleTranslate(
                          lang as any,
                          editedSher,
                          (translated: string) => setEditedSher(translated),
                          editingShayari?.poet,
                          editingShayari?.mood,
                          "modal"
                        );
                      }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-all border border-slate-200/60 capitalize cursor-pointer"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={editedSher}
                onChange={(e) => setEditedSher(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800 leading-relaxed outline-none transition-all shadow-2xs"
                placeholder="Type or paste poetry verse..."
              />
            </div>

            {/* Typography Font Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">Font Family</label>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {FONTS.map((font) => {
                  const isSelected = editedFontClass === font.class;
                  return (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => setEditedFontClass(font.class)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border cursor-pointer transition-all shrink-0 ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 font-bold shadow-2xs"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className={font.class}>{font.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Text Color Options: Solid or Gradient */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">Text Color / Style</label>
                {editedTextGradient && (
                  <button
                    type="button"
                    onClick={() => setEditedTextGradient && setEditedTextGradient("")}
                    className="text-[10px] font-bold text-rose-500 hover:text-rose-600 cursor-pointer"
                  >
                    Clear Gradient
                  </button>
                )}
              </div>

              {/* Solid Colors */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Solid Text Colors</span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {PRESET_TEXT_COLORS.map((c) => {
                    const isSelected = !editedTextGradient && editedTextColor === c.value;
                    return (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => {
                          setEditedTextColor(c.value);
                          if (setEditedTextGradient) setEditedTextGradient("");
                        }}
                        className={`py-1.5 px-1 rounded-xl border text-[10px] font-bold cursor-pointer transition-all flex flex-col items-center justify-center gap-0.5 ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-2xs scale-[1.03]"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0 shadow-2xs" style={{ backgroundColor: c.colorHex }} />
                        <span className="truncate max-w-[50px]">{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gradient Text Options */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Gradient Text Effects</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {PRESET_GRADIENT_TEXTS.map((gt) => {
                    const isSelected = editedTextGradient === gt.value;
                    return (
                      <button
                        key={gt.name}
                        type="button"
                        onClick={() => {
                          if (setEditedTextGradient) setEditedTextGradient(gt.value);
                        }}
                        className={`py-2 px-2 rounded-xl border text-[10px] font-extrabold cursor-pointer transition-all flex items-center justify-center ${
                          isSelected
                            ? "border-[#FF2D8D] ring-2 ring-[#FF2D8D]/50 bg-rose-50/50 shadow-2xs scale-[1.02]"
                            : "border-slate-200/80 bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <span 
                          style={{ 
                            backgroundImage: gt.value,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            color: "transparent"
                          }}
                        >
                          {gt.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Keyword Highlighting & Accent Color Controls */}
            <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                    <Highlighter className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Keyword Highlights & Accent Color</span>
                    <span className="text-[10px] text-slate-500">Colorize emotional phrases with vivid poetic accents</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (setEditedHighlightKeywords) {
                      setEditedHighlightKeywords(!editedHighlightKeywords);
                    }
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    editedHighlightKeywords ? "bg-amber-500" : "bg-slate-300"
                  }`}
                  title={editedHighlightKeywords ? "Disable Highlights" : "Enable Highlights"}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      editedHighlightKeywords ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {editedHighlightKeywords && (
                <div className="pt-2 border-t border-slate-200/80 space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Select Highlight Accent Color</span>
                    <span className="text-[9px] font-medium text-slate-400">
                      Active: <strong className="text-slate-700 capitalize">{DEFAULT_HIGHLIGHT_COLORS.find(c => c.id === editedHighlightColor)?.name || editedHighlightColor || "Gold"}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-[190px] overflow-y-auto pr-1">
                    {DEFAULT_HIGHLIGHT_COLORS.map((c) => {
                      const isSelected = (editedHighlightColor || "gold") === c.id || (editedHighlightColor || "").toLowerCase() === c.colorHex.toLowerCase();
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            if (setEditedHighlightKeywords) setEditedHighlightKeywords(true);
                            if (setEditedHighlightColor) setEditedHighlightColor(c.id);
                          }}
                          className={`py-1.5 px-1 rounded-xl border text-[10px] font-bold cursor-pointer transition-all flex flex-col items-center justify-center gap-1 ${
                            isSelected
                              ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20 scale-[1.03]"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                          }`}
                        >
                          <span 
                            className={`w-4 h-4 rounded-full border shadow-2xs transition-transform ${isSelected ? "scale-110 border-white ring-1 ring-slate-900" : "border-black/10"}`} 
                            style={{ backgroundColor: c.colorHex }} 
                          />
                          <span className="truncate text-[9px] max-w-[52px] leading-tight">{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Font Weight & Alignment */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 block">Font Weight</label>
                <button
                  type="button"
                  onClick={() => setEditedIsBold(!editedIsBold)}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    editedIsBold
                      ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="font-extrabold text-sm">B</span>
                  <span>{editedIsBold ? "Bold" : "Normal"}</span>
                </button>
              </div>

              {/* Text Alignment */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 block">Text Alignment</label>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => handleMoveText("left")}
                    className="flex-1 py-1 rounded-lg text-slate-700 hover:bg-white flex items-center justify-center cursor-pointer transition-all"
                    title="Align Left"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveText("up")}
                    className="flex-1 py-1 rounded-lg bg-white text-slate-900 shadow-2xs font-bold flex items-center justify-center cursor-pointer transition-all"
                    title="Center Text"
                  >
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveText("right")}
                    className="flex-1 py-1 rounded-lg text-slate-700 hover:bg-white flex items-center justify-center cursor-pointer transition-all"
                    title="Align Right"
                  >
                    <AlignRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Size Controls */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">Text Size</label>
                <button
                  type="button"
                  onClick={handleAutoFitText}
                  className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" /> Auto Fit Size
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDecreaseTextSize}
                  className="w-10 h-9 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer active:scale-95 transition-all text-base"
                >
                  -
                </button>
                <span className="flex-1 text-center text-xs font-bold text-slate-800 bg-slate-100 py-2 rounded-xl">
                  {editedTextSize.replace("text-", "").toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={handleIncreaseTextSize}
                  className="w-10 h-9 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer active:scale-95 transition-all text-base"
                >
                  +
                </button>
              </div>
            </div>

            {/* Emoji Controls */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">Emoji Ornament</label>
                <button
                  type="button"
                  onClick={() => setCustomHideEmoji(!customHideEmoji)}
                  className="text-[10px] font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  {customHideEmoji ? "Show Emoji" : "Hide Emoji"}
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={4}
                  value={editedEmoji}
                  onChange={(e) => setEditedEmoji(e.target.value)}
                  className="w-14 text-center py-1.5 text-xs border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500"
                  placeholder="✨"
                />
                <div className="flex gap-1 overflow-x-auto no-scrollbar flex-1">
                  {["✨", "❤️", "🥀", "💔", "🤝", "😎", "😂", "🌹", "🕯️"].map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setEditedEmoji(em)}
                      className={`p-1.5 rounded-lg border text-xs cursor-pointer hover:bg-slate-100 transition-all shrink-0 ${
                        editedEmoji === em ? "border-indigo-500 bg-indigo-50" : "border-slate-200"
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. BACKGROUND ================= */}
        {currentTool === "background" && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Loaded Card Style Images */}
            {validCardStyles.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">Card Background Images</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[150px] overflow-y-auto pr-1 no-scrollbar">
                  {validCardStyles.map((styleUrl, idx) => {
                    const isSelected = editedCardStyleBg === styleUrl;
                    return (
                      <button
                        key={`card-style-${idx}`}
                        type="button"
                        onClick={() => handleSelectCardStyle(styleUrl)}
                        className={`relative h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-[1.02] shadow-2xs ${
                          isSelected ? "border-indigo-600 ring-2 ring-indigo-200 scale-[1.02]" : "border-slate-200"
                        }`}
                      >
                        <img
                          src={styleUrl}
                          alt={`Style ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={() => {
                            setFailedCardStyles((prev) => new Set([...prev, styleUrl]));
                          }}
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-indigo-900/30 flex items-center justify-center text-white">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Gradient Options */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">Gradients</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_GRADIENTS.map((g) => {
                  const isSelected = editedBgGradient === g.value;
                  return (
                    <button
                      key={g.name}
                      type="button"
                      onClick={() => handleSelectGradient(g.value)}
                      style={{ backgroundImage: g.value }}
                      className={`h-10 rounded-xl border text-xs font-bold text-white flex items-center justify-center cursor-pointer shadow-2xs transition-all hover:scale-[1.02] ${
                        isSelected ? "ring-2 ring-indigo-600 ring-offset-1 border-white" : "border-transparent"
                      }`}
                    >
                      <span className="drop-shadow-xs text-[10px] font-bold">{g.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Solid Colors */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">Solid Colors</label>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {PRESET_SOLIDS.map((s) => {
                  const isSelected = editedBgColor === s.value;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => handleSelectSolid(s.value)}
                      style={{ backgroundColor: s.value }}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all shrink-0 shadow-2xs ${
                        isSelected ? "ring-2 ring-indigo-600 ring-offset-1 border-slate-900" : "border-slate-200 text-slate-800"
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Background Opacity Slider */}
            <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Background Opacity</span>
                <span className="text-[#FF2D8D] font-extrabold">{Math.round((editedBgOpacity ?? 1) * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round((editedBgOpacity ?? 1) * 100)}
                onChange={(e) => {
                  if (setEditedBgOpacity) {
                    setEditedBgOpacity(Number(e.target.value) / 100);
                  }
                }}
                className="w-full accent-[#FF2D8D] cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block">Adjust opacity for card style images, uploaded photos, and gradient backgrounds</span>
            </div>

            {/* Reset Background button */}
            <button
              type="button"
              onClick={() => {
                if (setEditedCardStyleBg) setEditedCardStyleBg("");
                setEditedBgGradient("");
                setEditedBgColor("");
              }}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Background</span>
            </button>
          </div>
        )}

        {/* ================= 3. LAYOUT ================= */}
        {currentTool === "layout" && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Aspect Ratio Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">Aspect Ratio</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { ratio: "9:16", label: "Story (9:16)" },
                  { ratio: "1:1", label: "Square (1:1)" },
                  { ratio: "4:5", label: "Post (4:5)" },
                  { ratio: "16:9", label: "Banner (16:9)" },
                ].map((r) => {
                  const isSelected = editedRatio === r.ratio;
                  return (
                    <button
                      key={r.ratio}
                      type="button"
                      onClick={() => setEditedRatio(r.ratio as any)}
                      className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{r.ratio}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Position Adjustment Pad */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">Position Verse</label>
                <button
                  type="button"
                  onClick={() => setTextPos({ x: 0, y: 0 })}
                  className="text-[10px] font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  Reset Position
                </button>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMoveText("left")}
                  className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 active:scale-95 transition-all cursor-pointer"
                  title="Move Left"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveText("up")}
                    className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 active:scale-95 transition-all cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveText("down")}
                    className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 active:scale-95 transition-all cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleMoveText("right")}
                  className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 active:scale-95 transition-all cursor-pointer"
                  title="Move Right"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sliders: Card Padding / Width & Line Spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Card Padding / Width</span>
                  <span>{editedTextBoxWidth}%</span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={100}
                  value={editedTextBoxWidth}
                  onChange={(e) => setEditedTextBoxWidth(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Line Spacing</span>
                  <span>{editedLineSpacing.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min={1.2}
                  max={2.8}
                  step={0.1}
                  value={editedLineSpacing}
                  onChange={(e) => setEditedLineSpacing(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Text Shadow Toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-slate-50/70">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Text Drop Shadow</span>
                <span className="text-[10px] text-slate-500">Adds soft contrast shadow behind verse</span>
              </div>
              <button
                type="button"
                onClick={() => setEditedTextShadow(!editedTextShadow)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  editedTextShadow ? "bg-indigo-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    editedTextShadow ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* ================= 4. IMAGE ================= */}
        {currentTool === "image" && (
          <div className="space-y-3.5 animate-fadeIn">
            {/* Prominent Upload Button */}
            <label className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-2xs">
              <Upload className="w-4 h-4 text-indigo-600" />
              <span>{editedImage ? "Replace Card Photo" : "Upload Custom Image"}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

            {editedImage && (
              <div className="space-y-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                {/* Photo Header & Remove Action */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Uploaded Photo Controls</span>
                  <button
                    type="button"
                    onClick={() => setEditedImage(null)}
                    className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

                {/* Photo Fit Mode */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 block">Image Display Mode</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(["small", "contain", "cover", "fill"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setEditedImageMode(mode)}
                        className={`py-1.5 rounded-xl text-[11px] font-bold capitalize transition-all border cursor-pointer ${
                          editedImageMode === mode
                            ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo Scale Slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span>Photo Scale</span>
                    <span>{Math.round(editedImageScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2.0}
                    step={0.05}
                    value={editedImageScale}
                    onChange={(e) => setEditedImageScale(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                {/* Photo Filter Presets */}
                {filterOptions.length > 0 && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 block">Photo Filter</label>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                      {filterOptions.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setEditedImageFilter(f.value)}
                          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold shrink-0 border cursor-pointer ${
                            editedImageFilter === f.value
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
