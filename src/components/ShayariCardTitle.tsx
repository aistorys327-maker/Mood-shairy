import React from "react";

interface ShayariCardTitleProps {
  title: string;
  ratio?: string;
  isLightBg?: boolean;
  textColor?: string;
  hasTextShadow?: boolean;
}

export const ShayariCardTitle: React.FC<ShayariCardTitleProps> = ({
  title,
  ratio = "9:16",
  isLightBg = true,
  textColor,
  hasTextShadow = false,
}) => {
  if (!title || !title.trim()) return null;
  const cleanTitle = title.trim();
  const len = cleanTitle.length;

  // Heading target: approximately 28–32px (scales proportionally with card aspect ratio)
  let minPx = 24;
  let baseCqw = 7.8;
  let maxPx = 32;

  if (ratio === "16:9") {
    if (len <= 16) {
      minPx = 20;
      baseCqw = 4.8;
      maxPx = 26;
    } else if (len <= 28) {
      minPx = 18;
      baseCqw = 4.0;
      maxPx = 22;
    } else {
      minPx = 16;
      baseCqw = 3.4;
      maxPx = 19;
    }
  } else {
    if (len <= 16) {
      minPx = 24;
      baseCqw = 7.8;
      maxPx = 32;
    } else if (len <= 28) {
      minPx = 22;
      baseCqw = 6.8;
      maxPx = 28;
    } else {
      minPx = 20;
      baseCqw = 5.8;
      maxPx = 24;
    }
  }

  const isDarkCard =
    !isLightBg ||
    (textColor &&
      (textColor.includes("text-white") ||
        textColor.includes("text-slate-100") ||
        textColor.includes("text-zinc-100")));

  const titleColor = isDarkCard ? "#FFFFFF" : "#111111";

  // Keep emoji on the same line as the preceding word by using a non-breaking space (\u00A0)
  const displayTitle = cleanTitle.replace(
    /\s+([\p{Extended_Pictographic}\u200d\uFE0F\uFE0E]+)$/u,
    "\u00A0$1"
  );

  return (
    <div
      className="w-full flex justify-center items-center text-center z-10 box-border"
      style={{
        paddingLeft: "16px",
        paddingRight: "16px",
        marginTop: "0px",
        marginBottom: "var(--title-verse-gap, 28px)",
        boxSizing: "border-box",
      }}
    >
      <h2
        className="font-bold text-center select-none max-w-full inline-block"
        style={{
          fontSize: `clamp(${minPx}px, ${baseCqw}cqw, ${maxPx}px)`,
          lineHeight: "1.25",
          fontWeight: 700,
          letterSpacing: "0.2px",
          color: titleColor,
          fontFamily:
            "'Playfair Display', 'Cinzel', 'Noto Serif Devanagari', 'Noto Nastaliq Urdu', Georgia, serif",
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          wordBreak: "normal",
          overflowWrap: "break-word",
          whiteSpace: "normal",
          padding: "0 4px",
          margin: "0 auto",
          textShadow: hasTextShadow
            ? "0 2px 8px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(0, 0, 0, 0.3)"
            : undefined,
        }}
      >
        {displayTitle}
      </h2>
    </div>
  );
};


