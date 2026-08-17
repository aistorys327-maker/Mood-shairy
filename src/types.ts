export interface HighlightPhrase {
  phrase: string;
  color: string;
}

export interface Shayari {
  id: string;
  sher: string;
  transliteration: string;
  translation: string;
  poet: string;
  mood: string;
  title?: string;
  highlights?: HighlightPhrase[];
  isAI?: boolean;
  
  // Custom edit overrides
  originalSher?: string;
  customBgColor?: string;
  customBgGradient?: string;
  customBgTexture?: string;
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
  customTextX?: number;
  customTextY?: number;
  customTextScale?: number;
  customTextRotate?: number;
  customTextShadow?: boolean;
  customImageFilter?: string;
  customHighlightKeywords?: boolean;
  customHighlightColor?: string;
  customLineSpacing?: number;
  customTextBoxWidth?: number;
  customTextBoxHeight?: number;
  customTextWrapping?: "wrap" | "nowrap";
  customHideEmoji?: boolean;
  customHideWatermark?: boolean;
  // Future Premium Watermark Features
  customWatermarkText?: string;
  customWatermarkPosition?: "top" | "bottom" | "center" | "top-right" | "top-left" | "bottom-right" | "bottom-left";
  customWatermarkOpacity?: number;
  customWatermarkEnabled?: boolean;
  isCustomized?: boolean;
  customCardStyleBg?: string;
  customBgOpacity?: number;
  customTextGradient?: string;
  customAnimation?: string;
}
