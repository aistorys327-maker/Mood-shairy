export interface Shayari {
  id: string;
  sher: string;
  transliteration: string;
  translation: string;
  poet: string;
  mood: string;
  isAI?: boolean;
  
  // Custom edit overrides
  originalSher?: string;
  customBgColor?: string;
  customBgGradient?: string;
  customTextColor?: string;
  customFontClass?: string;
  customTextSize?: string;
  customIsBold?: boolean;
  customEmoji?: string;
  customImage?: string;
  customImageX?: number;
  customImageY?: number;
  customImageMode?: "small" | "fit" | "fill" | "contain" | "cover";
  customImageScale?: number;
  customImageRotate?: number;
  customRatio?: "1:1" | "4:5" | "9:16" | "16:9";
}
