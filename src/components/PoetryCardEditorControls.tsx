import React from "react";
import { 
  Edit3, Layout, Palette, Type, Ruler, Paintbrush, Sparkles, Move, Image as ImageIcon,
  Languages, Upload, ZoomIn, ZoomOut, RotateCw, RotateCcw, Highlighter,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play
} from "lucide-react";
import { convertTailwindGradientToCss, solidsMap, resolveTailwindColor } from "../backgroundUtils";

interface EditorControlsProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
  editedSher: string;
  setEditedSher: (val: string) => void;
  editedEmoji: string;
  setEditedEmoji: (val: string) => void;
  editedRatio: "1:1" | "4:5" | "9:16" | "16:9";
  setEditedRatio: (val: "1:1" | "4:5" | "9:16" | "16:9") => void;
  bgTab: "solids" | "gradients" | "trending" | "textures";
  setBgTab: (val: "solids" | "gradients" | "trending" | "textures") => void;
  editedBgColor: string;
  setEditedBgColor: (val: string) => void;
  editedBgGradient: string;
  setEditedBgGradient: (val: string) => void;
  editedBgTexture: string;
  setEditedBgTexture: (val: string) => void;
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
}

export const PoetryCardEditorControls: React.FC<EditorControlsProps> = ({
  activeTool,
  setActiveTool,
  editedSher,
  setEditedSher,
  editedEmoji,
  setEditedEmoji,
  editedRatio,
  setEditedRatio,
  bgTab,
  setBgTab,
  editedBgColor,
  setEditedBgColor,
  editedBgGradient,
  setEditedBgGradient,
  editedBgTexture,
  setEditedBgTexture,
  editedFontClass,
  setEditedFontClass,
  editedIsBold,
  setEditedIsBold,
  editedTextSize,
  handleIncreaseTextSize,
  handleDecreaseTextSize,
  convertTextSizeToPx,
  handleAutoFitText,
  editedLineSpacing,
  setEditedLineSpacing,
  editedTextBoxWidth,
  setEditedTextBoxWidth,
  editedTextBoxHeight,
  setEditedTextBoxHeight,
  editedTextWrapping,
  setEditedTextWrapping,
  editedTextColor,
  setEditedTextColor,
  editedTextShadow,
  setEditedTextShadow,
  editedHighlightKeywords,
  setEditedHighlightKeywords,
  editedHighlightColor,
  setEditedHighlightColor,
  textPos,
  setTextPos,
  handleMoveText,
  editedImage,
  setEditedImage,
  imagePos,
  setImagePos,
  handleImageUpload,
  editedImageMode,
  setEditedImageMode,
  editedImageScale,
  setEditedImageScale,
  editedImageRotate,
  setEditedImageRotate,
  editedImageFilter,
  setEditedImageFilter,
  isTranslatingId,
  handleTranslate,
  editingShayari,
  showToast,
  textures,
  filterOptions,
  premiumTextColors,
  gradientTextColors,
  HIGHLIGHT_COLORS,
  FONTS,
  customHideEmoji,
  setCustomHideEmoji,
  customHideWatermark,
  setCustomHideWatermark,
}) => {
  return (
    <div className="flex-[2_1_0%] flex flex-col w-full bg-white dark:bg-slate-900 overflow-hidden min-h-[220px] md:min-h-[260px]" id="modal-controls-section">
      {/* Active Tool Controls Compact Panel */}
      <div className="flex-1 overflow-y-auto p-5 pb-16 space-y-5 scrollbar-thin">
        {activeTool === "verse" && (
          <div className="space-y-4 animate-fadeIn">
            {/* EDIT POETRY TEXT */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-450 uppercase tracking-widest block">Poetry Text (Sher)</label>
              <textarea
                value={editedSher}
                onChange={(e) => setEditedSher(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800 leading-relaxed outline-none transition-all"
                placeholder="Enter shayari text here..."
              />
            </div>

            {/* TRANSLATE QUICK ACTION */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-slate-450 uppercase tracking-wider flex items-center gap-1 select-none">
                  <Languages className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Instant Translate Verse</span>
                </span>
                {isTranslatingId === "modal" && (
                  <span className="text-[8px] font-bold text-indigo-600 animate-pulse">Translating...</span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "hindi", name: "Hindi (हिन्दी)" },
                  { id: "urdu", name: "Urdu (اردو)" },
                  { id: "hinglish", name: "Hinglish" }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    disabled={isTranslatingId === "modal"}
                    onClick={() => {
                      handleTranslate(lang.id as any, editedSher, (translated: string) => {
                        setEditedSher(translated);
                      }, editingShayari.poet, editingShayari.mood, "modal");
                    }}
                    className="py-2 px-1.5 rounded-lg text-[9px] font-extrabold text-center cursor-pointer transition-all bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 disabled:opacity-50 shadow-2xs"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* EDIT MOOD EMOJI */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-450 uppercase tracking-widest block">Custom Card Emoji</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={8}
                  value={editedEmoji}
                  onChange={(e) => setEditedEmoji(e.target.value)}
                  className="w-20 text-center px-2 py-2 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-bold outline-none"
                />
                <div className="flex gap-1.5 overflow-x-auto flex-1 pb-1 scrollbar-thin">
                  {["✨", "❤️", "😢", "💔", "🤝", "😎", "😂", "💪", "🌹", "🕯️", "🌧️", "🌌"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setEditedEmoji(emoji)}
                      className={`px-2.5 py-1.5 border rounded-lg text-xs cursor-pointer transition-all hover:bg-slate-50 shrink-0 ${
                        editedEmoji === emoji ? "border-indigo-500 bg-indigo-50 font-bold text-indigo-700" : "border-slate-100 bg-white"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* EMOJI & WATERMARK TOGGLES */}
            <div className="grid grid-cols-2 gap-3.5 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div>
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Emoji Display</span>
                  <span className="text-[8px] text-slate-400">Show centered emoji</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCustomHideEmoji(!customHideEmoji)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    !customHideEmoji ? "bg-indigo-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      !customHideEmoji ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div>
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Watermark</span>
                  <span className="text-[8px] text-slate-400">Show card watermark</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCustomHideWatermark(!customHideWatermark)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    !customHideWatermark ? "bg-indigo-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      !customHideWatermark ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>
        )}

        {activeTool === "ratio" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Select Ratio</label>
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
            <p className="text-[9px] text-slate-400 font-medium leading-relaxed mt-1">
              {editedRatio === "1:1" && "⬜ Square (1:1): Perfect for Instagram grid posts and standard feeds."}
              {editedRatio === "4:5" && "📱 Portrait (4:5): Optimized for high-density mobile feeds."}
              {editedRatio === "9:16" && "🎬 Story (9:16): Ideal for Instagram Stories, TikToks, and vertical sharing."}
              {editedRatio === "16:9" && "🖥️ Landscape (16:9): Best for widescreen displays and banners."}
            </p>
          </div>
        )}

        {activeTool === "background" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-black text-slate-450 uppercase tracking-widest block">Background Style</label>
              <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50/80 px-2 py-0.5 rounded-full border border-indigo-100">
                {editedBgTexture ? "Texture Active" : editedBgGradient ? "Gradient Active" : "Solid Active"}
              </span>
            </div>

            {/* Tab Selector */}
            <div className="flex p-0.5 bg-slate-100 rounded-xl">
              {["solids", "gradients", "trending", "textures"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setBgTab(tab as any)}
                  className={`flex-1 py-1.5 text-center text-[11px] font-bold rounded-lg cursor-pointer transition-all capitalize ${
                    bgTab === tab
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab === "solids" ? "Solids" : tab === "gradients" ? "Gradients" : tab === "trending" ? "Trending 🔥" : "Textures 🎨"}
                </button>
              ))}
            </div>

            {/* Swatches Grid */}
            <div className="space-y-2">
              {bgTab === "solids" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] text-slate-400">
                    <span className="font-bold uppercase tracking-wider">Aesthetic Solids</span>
                  </div>
                  <div className="grid grid-cols-8 gap-2">
                    {[
                      { name: "Cream Soft", bg: "bg-slate-50" },
                      { name: "Slate Dusk", bg: "bg-slate-900" },
                      { name: "Sand Glow", bg: "bg-amber-50/90" },
                      { name: "Velvet Rose", bg: "bg-rose-50/90" },
                      { name: "Sage Green", bg: "bg-emerald-50/90" },
                      { name: "Midnight Navy", bg: "bg-indigo-950" },
                      { name: "Golden Ebony", bg: "bg-amber-950" },
                      { name: "Purple Night", bg: "bg-purple-950" },
                      { name: "Warm Orange", bg: "bg-orange-50" },
                      { name: "Sky Mist", bg: "bg-sky-50" },
                      { name: "Teal Fresh", bg: "bg-teal-50" },
                      { name: "Pure Pitch", bg: "bg-zinc-950" },
                      { name: "Plum Dark", bg: "bg-fuchsia-950" },
                      { name: "Ocean Blue", bg: "bg-blue-900" },
                      { name: "Emerald Moss", bg: "bg-emerald-900" },
                      { name: "Clay Terracotta", bg: "bg-orange-900" },
                      { name: "Rose Quartz", bg: "bg-rose-100" },
                      { name: "Mint Ice", bg: "bg-teal-100/70" },
                      { name: "Lavender Mist", bg: "bg-purple-100/70" },
                      { name: "Pale Marigold", bg: "bg-amber-100/70" },
                      { name: "Soft Olive", bg: "bg-lime-50" },
                      { name: "Charcoal Mist", bg: "bg-slate-700" },
                      { name: "Cocoa Gold", bg: "bg-amber-900" },
                      { name: "Crimson Velvet", bg: "bg-rose-950" }
                    ].map((item) => {
                      const isActive = editedBgColor === item.bg && !editedBgGradient;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => {
                            setEditedBgColor(item.bg);
                            setEditedBgGradient("");
                            setEditedBgTexture("");
                          }}
                          style={{ backgroundColor: solidsMap[item.bg] || (item.bg.startsWith("bg-[") ? item.bg.slice(4, -1) : resolveTailwindColor(item.bg.replace("bg-", ""))) }}
                          className={`aspect-square w-full rounded-xl border border-slate-200/60 shadow-xs relative cursor-pointer transition-all hover:scale-110 focus:outline-none flex items-center justify-center ${
                            item.bg
                          } ${
                            isActive
                              ? "ring-2 ring-indigo-500 ring-offset-1 scale-105 border-transparent"
                              : "hover:border-slate-300"
                          }`}
                          title={item.name}
                        >
                          {isActive && (
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              item.bg.includes("950") || item.bg.includes("900") || item.bg.includes("slate-9") || item.bg.includes("black") || item.bg.includes("pitch") || item.bg.includes("slate-7") || item.bg.includes("amber-9")
                                ? "bg-white"
                                : "bg-slate-800"
                            }`} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {bgTab === "gradients" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] text-slate-400">
                    <span className="font-bold uppercase tracking-wider">Luxury Gradients</span>
                  </div>
                  <div className="grid grid-cols-8 gap-2">
                    {[
                      { name: "Instagram Gradient", grad: "from-fuchsia-600 via-pink-500 to-orange-400" },
                      { name: "Sunset", grad: "from-amber-500 via-rose-500 to-violet-600" },
                      { name: "Sunrise", grad: "from-orange-400 via-amber-300 to-cyan-200" },
                      { name: "Ocean", grad: "from-cyan-500 via-blue-600 to-indigo-900" },
                      { name: "Sky", grad: "from-sky-400 via-blue-400 to-indigo-500" },
                      { name: "Aurora", grad: "from-teal-400 via-emerald-500 to-indigo-900" },
                      { name: "Galaxy", grad: "from-purple-900 via-indigo-950 to-pink-900" },
                      { name: "Neon Purple", grad: "from-fuchsia-600 via-purple-700 to-indigo-850" },
                      { name: "Rose Gold", grad: "from-rose-300 via-pink-200 to-amber-200" },
                      { name: "Royal Gold", grad: "from-yellow-600 via-amber-500 to-yellow-800" },
                      { name: "Forest", grad: "from-emerald-900 via-green-950 to-teal-950" },
                      { name: "Aqua", grad: "from-teal-300 via-cyan-400 to-blue-500" },
                      { name: "Cotton Candy", grad: "from-pink-300 via-purple-200 to-sky-300" },
                      { name: "Deep Space", grad: "from-slate-900 via-purple-950 to-slate-950" },
                      { name: "Midnight", grad: "from-blue-950 via-indigo-950 to-slate-950" },
                      { name: "Cherry Blossom", grad: "from-rose-100 via-pink-100 to-teal-50" },
                      { name: "Vintage Sepia", grad: "from-amber-100 to-amber-200" },
                      { name: "Cosmic Indigo", grad: "from-violet-600 to-indigo-700" },
                      { name: "Solar Eclipse", grad: "from-amber-950 via-stone-900 to-zinc-950" },
                      { name: "Mint Emerald", grad: "from-teal-300 via-emerald-100 to-indigo-200" },
                      { name: "Nordic Cold", grad: "from-slate-900 to-zinc-900" },
                      { name: "Royal Lavender", grad: "from-purple-800 to-indigo-900" },
                      { name: "Romantic Rosewood", grad: "from-rose-400 to-pink-600" },
                      { name: "Sunset Serenade", grad: "from-amber-200 via-orange-100 to-rose-200" },
                      { name: "Stardust", grad: "from-indigo-200 via-slate-100 to-amber-100" },
                      { name: "Forest Moss", grad: "from-emerald-400 to-cyan-500" },
                      { name: "Plum Velvet", grad: "from-fuchsia-800 to-pink-600" },
                      { name: "Sandalwood", grad: "from-amber-200 via-rose-200 to-teal-100" },
                      { name: "Ice Palace", grad: "from-blue-200 via-cyan-100 to-indigo-300" },
                      { name: "Sufi Night", grad: "from-violet-950 via-slate-900 to-zinc-950" },
                      { name: "Copper Glow", grad: "from-orange-400 via-amber-500 to-rose-500" },
                      { name: "Peppermint", grad: "from-teal-100 via-emerald-100 to-sky-100" }
                    ].map((item) => {
                      const isActive = editedBgGradient === item.grad;
                      return (
                        <button
                          key={`bg-grad-tab-${item.name}`}
                          type="button"
                          onClick={() => {
                            setEditedBgGradient(item.grad);
                            setEditedBgColor("");
                            setEditedBgTexture("");
                          }}
                          style={{ backgroundImage: convertTailwindGradientToCss(item.grad) }}
                          className={`aspect-square w-full rounded-xl border border-slate-200/60 shadow-xs relative cursor-pointer transition-all hover:scale-110 focus:outline-none bg-gradient-to-br flex items-center justify-center ${
                            item.grad
                          } ${
                            isActive
                              ? "ring-2 ring-indigo-500 ring-offset-1 scale-105 border-transparent"
                              : "hover:border-slate-300"
                          }`}
                          title={item.name}
                        >
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {bgTab === "trending" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] text-slate-400">
                    <span className="font-bold uppercase tracking-wider">Trending Styles</span>
                  </div>
                  <div className="grid grid-cols-8 gap-2">
                    {[
                      { name: "Instagram Gradient", grad: "from-fuchsia-600 via-pink-500 to-orange-400" },
                      { name: "Sunset", grad: "from-amber-500 via-rose-500 to-violet-600" },
                      { name: "Sunrise", grad: "from-orange-400 via-amber-300 to-cyan-200" },
                      { name: "Ocean", grad: "from-cyan-500 via-blue-600 to-indigo-900" },
                      { name: "Sky", grad: "from-sky-400 via-blue-400 to-indigo-500" },
                      { name: "Aurora", grad: "from-teal-400 via-emerald-500 to-indigo-900" },
                      { name: "Galaxy", grad: "from-purple-900 via-indigo-950 to-pink-900" },
                      { name: "Neon Purple", grad: "from-fuchsia-600 via-purple-700 to-indigo-850" },
                      { name: "Rose Gold", grad: "from-rose-300 via-pink-200 to-amber-200" },
                      { name: "Royal Gold", grad: "from-yellow-600 via-amber-500 to-yellow-800" },
                      { name: "Forest", grad: "from-emerald-900 via-green-950 to-teal-950" },
                      { name: "Aqua", grad: "from-teal-300 via-cyan-400 to-blue-500" },
                      { name: "Cotton Candy", grad: "from-pink-300 via-purple-200 to-sky-300" },
                      { name: "Deep Space", grad: "from-slate-900 via-purple-950 to-slate-950" },
                      { name: "Midnight", grad: "from-blue-950 via-indigo-950 to-slate-950" },
                      { name: "Matcha Latte", grad: "from-emerald-100 via-green-100 to-stone-100" },
                      { name: "Lavender Dream", grad: "from-violet-200 via-purple-100 to-pink-100" },
                      { name: "Cyberpunk Neon", grad: "from-purple-600 via-fuchsia-500 to-cyan-400" },
                      { name: "Peach Sorbet", grad: "from-orange-200 via-amber-100 to-rose-200" },
                      { name: "Holographic Foil", grad: "from-teal-200 via-indigo-100 to-pink-200" },
                      { name: "Warm Oatmeal", grad: "from-amber-50 via-stone-100 to-amber-100" },
                      { name: "Sage & Clay", grad: "from-emerald-50 via-stone-100 to-orange-100" },
                      { name: "Bubblegum Sweet", grad: "from-pink-300 via-purple-300 to-indigo-300" },
                      { name: "Velvet Plum", grad: "from-fuchsia-900 via-purple-950 to-slate-950" },
                      { name: "Soft Olive", grad: "from-lime-950 via-emerald-950 to-zinc-950" },
                      { name: "Desert Dusk", grad: "from-orange-800 via-rose-900 to-indigo-950" },
                      { name: "Mint Emerald", grad: "from-teal-300 via-emerald-100 to-indigo-200" },
                      { name: "Royal Lavender", grad: "from-purple-800 to-indigo-900" },
                      { name: "Solar Eclipse", grad: "from-amber-950 via-stone-900 to-zinc-950" },
                      { name: "Cherry Blossom", grad: "from-rose-100 via-pink-100 to-teal-50" },
                      { name: "Nordic Cold", grad: "from-slate-900 to-zinc-900" },
                      { name: "Boho Terracotta", grad: "from-orange-900 via-amber-900 to-stone-900" },
                      { name: "Lemon Meringue", grad: "from-yellow-100 via-amber-100 to-orange-100" },
                      { name: "Sweet Lavender", grad: "from-purple-200 via-violet-100 to-pink-100" },
                      { name: "Golden Hour", grad: "from-orange-300 via-yellow-200 to-amber-300" },
                      { name: "Stardust", grad: "from-indigo-200 via-slate-100 to-amber-100" },
                      { name: "Forest Moss", grad: "from-emerald-400 to-cyan-500" },
                      { name: "Plum Velvet", grad: "from-fuchsia-800 to-pink-600" },
                      { name: "Sandalwood", grad: "from-amber-200 via-rose-200 to-teal-100" },
                      { name: "Ice Palace", grad: "from-blue-200 via-cyan-100 to-indigo-300" },
                      { name: "Sufi Night", grad: "from-violet-950 via-slate-900 to-zinc-950" },
                      { name: "Copper Glow", grad: "from-orange-400 via-amber-500 to-rose-500" },
                      { name: "Peppermint", grad: "from-teal-100 via-emerald-100 to-sky-100" }
                    ].map((item) => {
                      const isActive = editedBgGradient === item.grad;
                      return (
                        <button
                          key={`trending-grad-tab-${item.name}`}
                          type="button"
                          onClick={() => {
                            setEditedBgGradient(item.grad);
                            setEditedBgColor("");
                            setEditedBgTexture("");
                          }}
                          style={{ backgroundImage: convertTailwindGradientToCss(item.grad) }}
                          className={`aspect-square w-full rounded-xl border border-slate-200/60 shadow-xs relative cursor-pointer transition-all hover:scale-110 focus:outline-none bg-gradient-to-br flex items-center justify-center ${
                            item.grad
                          } ${
                            isActive
                              ? "ring-2 ring-indigo-500 ring-offset-1 scale-105 border-transparent"
                              : "hover:border-slate-300"
                          }`}
                          title={item.name}
                        >
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {bgTab === "textures" && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] text-slate-400">
                    <span className="font-bold uppercase tracking-wider">Texture Backdrops</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {textures.map((item) => {
                      const isActive = editedBgTexture === item.id;
                      return (
                        <button
                          key={`texture-tab-${item.id}`}
                          type="button"
                          onClick={() => {
                            setEditedBgTexture(item.id);
                            setEditedBgColor(item.bgColor);
                            setEditedBgGradient("");
                            if (item.textColor) {
                              setEditedTextColor(item.textColor);
                            }
                          }}
                          style={{ ...item.style }}
                          className={`aspect-square w-full rounded-xl border border-slate-200/60 shadow-xs relative overflow-hidden cursor-pointer transition-all hover:scale-110 focus:outline-none flex flex-col items-center justify-end p-1.5 ${
                            isActive
                              ? "ring-2 ring-indigo-500 ring-offset-1 scale-105 border-transparent"
                              : "hover:border-slate-300"
                          }`}
                          title={item.name}
                        >
                          {item.overlay}
                          <span className={`relative z-10 text-[8px] font-black tracking-wider uppercase text-center truncate w-full ${
                            item.id === "wooden" || item.id === "smoke" || item.id === "glass" || item.id === "blur" || item.id === "frosted_glass" ? "text-white/90" : "text-slate-800/90"
                          }`}>
                            {item.name}
                          </span>
                          {isActive && (
                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 border border-white z-20" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTool === "font" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Font Style Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Font Family</label>
              <div className="flex flex-row flex-nowrap gap-2 overflow-x-auto py-2 px-2 border border-slate-100 rounded-xl bg-slate-50/70 no-scrollbar w-full scroll-smooth">
                {FONTS.map((font) => {
                  const isSelected = editedFontClass === font.class;
                  return (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => {
                        setEditedFontClass(font.class);
                      }}
                      className={`p-1.5 rounded-lg border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between h-[50px] min-h-[50px] w-[95px] min-w-[95px] max-w-[105px] shrink-0 ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-sm scale-[1.01]"
                          : "bg-white border-slate-200/60 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`text-[7px] md:text-[8px] font-mono tracking-tight font-bold uppercase line-clamp-1 ${isSelected ? "text-indigo-200" : "text-slate-400"}`}>
                        {font.name}
                      </span>
                      <span className={`text-[10px] md:text-[11px] mt-0.5 line-clamp-1 block leading-tight font-medium ${font.class}`}>
                        ग़ज़ल Aa
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Weight Toggle */}
            <div className="space-y-1.5 pt-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Font Weight</label>
              <button
                type="button"
                onClick={() => setEditedIsBold(!editedIsBold)}
                className={`w-full py-2.5 px-3 border rounded-xl text-xs font-bold transition-all ${
                  editedIsBold
                    ? "bg-indigo-600 border-transparent text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {editedIsBold ? "Bold Weight: Active" : "Normal Weight: Regular"}
              </button>
            </div>
          </div>
        )}

        {activeTool === "size" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Font Size Selection */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Font Size ({convertTextSizeToPx(editedTextSize)}px)
                </label>
                <button
                  type="button"
                  onClick={handleAutoFitText}
                  className="text-[9px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-wider flex items-center gap-0.5 cursor-pointer hover:underline transition-all active:scale-95 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100"
                >
                  <Sparkles className="w-2.5 h-2.5 text-indigo-500" />
                  Auto-Fit
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDecreaseTextSize}
                  disabled={convertTextSizeToPx(editedTextSize) <= 18}
                  className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 disabled:opacity-40 font-extrabold text-sm rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-[0.97]"
                  title="Decrease Size (A−)"
                >
                  A−
                </button>
                <button
                  type="button"
                  onClick={handleIncreaseTextSize}
                  disabled={convertTextSizeToPx(editedTextSize) >= 72}
                  className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 disabled:opacity-40 font-extrabold text-sm rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-[0.97]"
                  title="Increase Size (A+)"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Line Spacing (Line Height) Selection */}
            <div className="space-y-1.5 pt-3.5 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                  Line Spacing (Leading)
                </label>
                <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                  {editedLineSpacing.toFixed(2)}x
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="3.5"
                step="0.05"
                value={editedLineSpacing}
                onChange={(e) => setEditedLineSpacing(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[8px] text-slate-400 block">Drag to adjust the gap between poetry lines.</span>
            </div>

            {/* Text Box Width Selection */}
            <div className="space-y-1.5 pt-3.5 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                  Text Box Width
                </label>
                <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                  {editedTextBoxWidth}%
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                step="1"
                value={editedTextBoxWidth}
                onChange={(e) => setEditedTextBoxWidth(parseInt(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[8px] text-slate-400 block">Control the bounds and horizontal margin of the text area.</span>
            </div>

            {/* Text Box Height Selection */}
            <div className="space-y-1.5 pt-3.5 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                  Text Box Height (Container Height)
                </label>
                <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                  {editedTextBoxHeight}%
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="1"
                value={editedTextBoxHeight}
                onChange={(e) => setEditedTextBoxHeight(parseInt(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[8px] text-slate-400 block">Control the vertical distribution height occupied by the poetry content.</span>
            </div>

            {/* Text Wrapping Mode Toggle */}
            <div className="space-y-1.5 pt-3.5 border-t border-slate-100">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Text Wrapping Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEditedTextWrapping("wrap")}
                  className={`py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    editedTextWrapping === "wrap"
                      ? "bg-indigo-600 border-transparent text-white shadow-xs"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Wrap Text (Word-Wrap)
                </button>
                <button
                  type="button"
                  onClick={() => setEditedTextWrapping("nowrap")}
                  className={`py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    editedTextWrapping === "nowrap"
                      ? "bg-indigo-600 border-transparent text-white shadow-xs"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  No Wrap (Single Line)
                </button>
              </div>
              <span className="text-[8px] text-slate-400 block">Toggle whether long verses wrap words onto new lines.</span>
            </div>
          </div>
        )}

        {activeTool === "color" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Text Color Selection */}
            <div className="space-y-1.5 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                  Text Color: <span className="text-indigo-600 font-extrabold normal-case">
                    {premiumTextColors.find(item => item.value === editedTextColor)?.name || 
                     gradientTextColors.find(item => item.value === editedTextColor)?.name || 
                     "Custom"}
                  </span>
                </label>
                <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-full">
                  {premiumTextColors.length} Solid Presets
                </span>
              </div>

              {/* Quick Swatches Grid */}
              <div className="grid grid-cols-8 gap-2 p-2 bg-white rounded-xl border border-slate-200/60 max-h-[110px] overflow-y-auto scrollbar-thin">
                {premiumTextColors.map((color) => {
                  const isActive = editedTextColor === color.value;
                  return (
                    <button
                      key={`color-preset-${color.name}-${color.value}`}
                      type="button"
                      onClick={() => {
                        setEditedTextColor(color.value);
                        showToast(`Text color: ${color.name} 🎨`);
                      }}
                      className={`aspect-square w-full rounded-full cursor-pointer transition-all hover:scale-115 flex items-center justify-center relative ${color.bgClass} ${
                        isActive
                          ? "ring-2 ring-indigo-500 ring-offset-2 scale-105 shadow-xs"
                          : "hover:border-slate-300 border border-slate-200/60"
                      }`}
                      title={`${color.name} (${color.category})`}
                    >
                      {isActive && (
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          color.value.includes("white") || 
                          color.value.includes("50") || 
                          color.value.includes("100") || 
                          color.name === "Yellow" || 
                          color.name === "Mint" || 
                          color.name === "Silver" || 
                          color.name === "Cream"
                            ? "bg-slate-800"
                            : "bg-white"
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gradient Text Color Selection */}
            <div className="space-y-1.5 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                  Gradient Text Colors
                </label>
                <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 border border-indigo-100/50 px-2 py-0.5 rounded-full">
                  {gradientTextColors.length} Gradient Presets
                </span>
              </div>

              {/* Gradient Swatches Grid */}
              <div className="grid grid-cols-8 gap-2 p-2 bg-white rounded-xl border border-slate-200/60 max-h-[110px] overflow-y-auto scrollbar-thin">
                {gradientTextColors.map((color) => {
                  const isActive = editedTextColor === color.value;
                  return (
                    <button
                      key={`color-grad-${color.value}`}
                      type="button"
                      onClick={() => {
                        setEditedTextColor(color.value);
                        showToast(`Gradient text: ${color.name} ✨`);
                      }}
                      className={`aspect-square w-full rounded-full cursor-pointer transition-all hover:scale-115 flex items-center justify-center relative ${color.bgClass} ${
                        isActive
                          ? "ring-2 ring-indigo-500 ring-offset-2 scale-105 shadow-xs"
                          : "hover:border-slate-300 border border-slate-200/60"
                      }`}
                      title={color.name}
                    >
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dropdown Selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Select Palette Preset</label>
              <select
                value={editedTextColor}
                onChange={(e) => {
                  setEditedTextColor(e.target.value);
                  const matched = premiumTextColors.find(c => c.value === e.target.value) || gradientTextColors.find(c => c.value === e.target.value);
                  if (matched) {
                    showToast(`Selected: ${matched.name} 🎨`);
                  }
                }}
                className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-bold text-slate-700 bg-white outline-none"
              >
                {Array.from(new Set(premiumTextColors.map(c => c.category))).map(category => (
                  <optgroup label={`Solid - ${category}`} key={category}>
                    {premiumTextColors.filter(c => c.category === category).map(color => (
                      <option key={`opt-solid-${color.value}`} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
                <optgroup label="Premium Gradient Text Colors">
                  {gradientTextColors.map(color => (
                    <option key={`opt-grad-${color.value}`} value={color.value}>
                      {color.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        )}

        {activeTool === "effects" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Visual Image Filter */}
            {editedImage && (
              <div className="space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  <span>Visual Image Filter</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
                  {filterOptions.map((filter) => (
                    <button
                      key={`filter-eff-${filter.id}`}
                      type="button"
                      onClick={() => {
                        setEditedImageFilter(filter.value);
                        showToast(`${filter.name} filter applied!`);
                      }}
                      className={`px-1 py-1 text-[9px] font-bold rounded-lg border transition-all cursor-pointer text-center ${
                        editedImageFilter === filter.value
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Text Shadow Toggle */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Text Shadow</label>
              <button
                type="button"
                onClick={() => setEditedTextShadow(!editedTextShadow)}
                className={`w-full py-2.5 px-4 border rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  editedTextShadow
                    ? "bg-indigo-600 border-transparent text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${editedTextShadow ? "text-amber-300 fill-amber-300" : "text-slate-400"}`} />
                <span>{editedTextShadow ? "Soft Black Shadow: Enabled" : "Add Soft Black Shadow"}</span>
              </button>
            </div>

            {/* Highlight Keywords Toggle */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Keyword Highlighting</label>
              <button
                type="button"
                onClick={() => setEditedHighlightKeywords(!editedHighlightKeywords)}
                className={`w-full py-2.5 px-4 border rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  editedHighlightKeywords
                    ? "bg-indigo-600 border-transparent text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Highlighter className={`w-3.5 h-3.5 ${editedHighlightKeywords ? "text-amber-300" : "text-slate-400"}`} />
                <span>{editedHighlightKeywords ? "Poetic Keyword Highlight: Active ✨" : "Enable Poetic Keyword Highlighting"}</span>
              </button>
            </div>

            {/* Highlight Color Picker */}
            {editedHighlightKeywords && (
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Highlight Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {HIGHLIGHT_COLORS.map((c) => {
                    const isSelected = editedHighlightColor === c.id;
                    return (
                      <button
                        key={`highlight-c-${c.id}`}
                        type="button"
                        onClick={() => setEditedHighlightColor(c.id)}
                        className={`p-2 rounded-xl border flex items-center gap-1.5 justify-start transition-all duration-200 hover:scale-[1.03] active:scale-95 text-[11px] font-bold ${
                          isSelected
                            ? "border-slate-800 bg-slate-900 text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full shrink-0 ${c.bgClass} border border-black/10`} />
                        <span className="truncate">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTool === "position" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Text Repositioning */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-455 uppercase tracking-widest block">Reposition Text</label>
                <button
                  type="button"
                  onClick={() => setTextPos({ x: 0, y: 0 })}
                  className="text-[9px] font-black text-slate-500 hover:text-indigo-600 uppercase tracking-wider bg-slate-100 hover:bg-indigo-50 px-2 py-0.5 rounded border border-slate-200 transition-all active:scale-95 cursor-pointer"
                >
                  Reset Position
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="text-[10px] text-slate-500 max-w-[170px] leading-relaxed select-none">
                  <p className="font-bold text-slate-700 mb-0.5">Micro-Positioning</p>
                  <p className="text-[9px]">Tap arrows to offset the Shayari text inside the card.</p>
                </div>
                
                {/* D-Pad Layout */}
                <div className="flex flex-col items-center justify-center shrink-0">
                  <div className="grid grid-cols-3 gap-1 w-28">
                    <div />
                    <button
                      type="button"
                      onClick={() => handleMoveText("up")}
                      className="py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-600 rounded-lg flex items-center justify-center cursor-pointer transition-all active:scale-95"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <div />
                    
                    <button
                      type="button"
                      onClick={() => handleMoveText("left")}
                      className="py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-600 rounded-lg flex items-center justify-center cursor-pointer transition-all active:scale-95"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex flex-col items-center justify-center text-[8px] font-mono font-black text-slate-400">
                      <span>{textPos.x}</span>
                      <span>{textPos.y}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleMoveText("right")}
                      className="py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-600 rounded-lg flex items-center justify-center cursor-pointer transition-all active:scale-95"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    
                    <div />
                    <button
                      type="button"
                      onClick={() => handleMoveText("down")}
                      className="py-1.5 bg-white hover:bg-indigo-50 border border-slate-200 text-slate-700 hover:text-indigo-600 rounded-lg flex items-center justify-center cursor-pointer transition-all active:scale-95"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <div />
                  </div>
                </div>
              </div>
            </div>

            {/* Image Repositioning Fine-Tuning */}
            {editedImage && (
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-455 uppercase tracking-widest flex items-center gap-1">
                    <Move className="w-3 h-3 text-indigo-500" />
                    <span>Reposition Image</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setImagePos({ x: 0, y: 0 })}
                    className="text-[9px] font-black text-slate-500 hover:text-indigo-600 uppercase tracking-wider bg-slate-100 hover:bg-indigo-50 px-2 py-0.5 rounded border border-slate-200 transition-all active:scale-95 cursor-pointer"
                  >
                    Reset Image
                  </button>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="text-[10px] text-slate-400 max-w-[150px] leading-relaxed select-none">
                    <p className="font-bold text-slate-700 mb-0.5">Image Offsets</p>
                    <p className="text-[8px]">Drag image directly on the live card or fine-tune here.</p>
                    <div className="font-mono bg-slate-150 px-1.5 py-0.5 rounded text-[8px] text-slate-500 inline-block mt-1">
                      X: {imagePos.x}px | Y: {imagePos.y}px
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1 w-24 h-24 bg-white p-1 rounded-xl border border-slate-150">
                    <div />
                    <button
                      type="button"
                      onClick={() => setImagePos((prev) => ({ ...prev, y: prev.y - 5 }))}
                      className="flex items-center justify-center p-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded border border-slate-200 active:scale-90 transition-all cursor-pointer"
                    >
                      ▲
                    </button>
                    <div />
                    
                    <button
                      type="button"
                      onClick={() => setImagePos((prev) => ({ ...prev, x: prev.x - 5 }))}
                      className="flex items-center justify-center p-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded border border-slate-200 active:scale-90 transition-all cursor-pointer"
                    >
                      ◀
                    </button>
                    <button
                      type="button"
                      onClick={() => setImagePos({ x: 0, y: 0 })}
                      className="flex items-center justify-center p-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded border border-indigo-150 active:scale-90 transition-all cursor-pointer text-[8px] font-bold"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setImagePos((prev) => ({ ...prev, x: prev.x + 5 }))}
                      className="flex items-center justify-center p-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded border border-slate-200 active:scale-90 transition-all cursor-pointer"
                    >
                      ▶
                    </button>
                    
                    <div />
                    <button
                      type="button"
                      onClick={() => setImagePos((prev) => ({ ...prev, y: prev.y + 5 }))}
                      className="flex items-center justify-center p-1 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded border border-slate-200 active:scale-90 transition-all cursor-pointer"
                    >
                      ▼
                    </button>
                    <div />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTool === "image" && (
          <div className="space-y-4 animate-fadeIn">
            <label className="text-[10px] font-black text-slate-450 uppercase tracking-widest block">Upload Custom Image Decorator</label>
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="modal-image-uploader-tool"
                  className="hidden"
                />
                <label
                  htmlFor="modal-image-uploader-tool"
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
                      { id: "fit", label: "Fit" },
                      { id: "fill", label: "Fill" },
                      { id: "contain", label: "Contain" },
                      { id: "cover", label: "Cover" },
                    ].map((mode) => (
                      <button
                        key={`img-mode-${mode.id}`}
                        type="button"
                        onClick={() => setEditedImageMode(mode.id as any)}
                        className={`px-1 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer text-center ${
                          editedImageMode === mode.id
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
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
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex gap-1 flex-wrap pt-1">
                    {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 3.0].map((preset) => (
                      <button
                        key={`scale-preset-${preset}`}
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
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Persistent Horizontal Toolbar - Always visible, never scrollable away */}
      <div className="w-full bg-slate-50 dark:bg-slate-900 border-t border-slate-150 dark:border-slate-800 py-3 px-4 shrink-0 flex gap-2 items-center overflow-x-auto scrollbar-none sticky bottom-0 z-30 shadow-2xs">
        {[
          { id: "verse", label: "Verse", icon: Edit3 },
          { id: "ratio", label: "Ratio", icon: Layout },
          { id: "background", label: "Background", icon: Palette },
          { id: "font", label: "Font", icon: Type },
          { id: "size", label: "Size", icon: Ruler },
          { id: "color", label: "Color", icon: Paintbrush },
          { id: "effects", label: "Effects", icon: Sparkles },
          { id: "position", label: "Position", icon: Move },
          { id: "image", label: "Image", icon: ImageIcon }
        ].map((tool) => {
          const isActive = activeTool === tool.id;
          const IconComp = tool.icon;
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => {
                setActiveTool(tool.id);
                showToast(`${tool.label} tool opened!`);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md scale-105"
                  : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
              title={tool.label}
            >
              <IconComp className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-indigo-500"}`} />
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
