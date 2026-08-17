import React, { useState, useEffect, useRef, useCallback } from "react";
import { Pencil, Check, Maximize2 } from "lucide-react";
import { Shayari } from "../types";

interface Props {
  shayari: Shayari;
  isActive: boolean;
  onSave: (id: string, updates: Partial<Shayari>) => void;
  onUpdateText?: (id: string, newText: string) => void;
  onClose: () => void;
  children: React.ReactNode;
}

export const PoetryMoveResizeWrapper: React.FC<Props> = ({
  shayari,
  isActive,
  onSave,
  onUpdateText,
  onClose,
  children
}) => {
  const [localX, setLocalX] = useState(shayari.customTextX || 0);
  const [localY, setLocalY] = useState(shayari.customTextY || 0);
  const [localScale, setLocalScale] = useState(shayari.customTextScale || 1.0);
  const [localRotate, setLocalRotate] = useState(shayari.customTextRotate || 0);
  const [isEditingText, setIsEditingText] = useState(false);
  const [editText, setEditText] = useState(shayari.sher || "");
  const [isDragging, setIsDragging] = useState(false);
  const [isPinching, setIsPinching] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Multi-touch & Pointer tracking
  const activePointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const isPinchingRef = useRef(false);
  const pinchStartRef = useRef({
    startDistance: 1,
    initialScale: 1.0,
    initialFontSize: 24,
    centerX: 0,
    centerY: 0,
  });

  const dragStartRef = useRef({ x: 0, y: 0, initialX: 0, initialY: 0 });
  const isDraggingRef = useRef(false);
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resizeStartRef = useRef({
    startX: 0,
    startY: 0,
    initialScale: 1.0,
    initialFontSize: 24,
    centerX: 0,
    centerY: 0,
    startDistance: 1,
  });
  const isResizingRef = useRef(false);
  const baselineFontSizeRef = useRef<number>(24);
  const currentScaleRef = useRef<number>(shayari.customTextScale || 1.0);

  // Sync state with incoming props only when not actively interacting
  useEffect(() => {
    if (!isDraggingRef.current && !isResizingRef.current && !isPinchingRef.current) {
      setLocalX(shayari.customTextX || 0);
      setLocalY(shayari.customTextY || 0);
      setLocalScale(shayari.customTextScale || 1.0);
      setLocalRotate(shayari.customTextRotate || 0);
      setEditText(shayari.sher || "");
      currentScaleRef.current = shayari.customTextScale || 1.0;
    }
  }, [shayari.customTextX, shayari.customTextY, shayari.customTextScale, shayari.customTextRotate, shayari.sher]);

  // Reset editing, dragging & pinching mode when deactivated
  useEffect(() => {
    if (!isActive) {
      setIsEditingText(false);
      setIsDragging(false);
      setIsPinching(false);
      isDraggingRef.current = false;
      isResizingRef.current = false;
      isPinchingRef.current = false;
      activePointersRef.current.clear();
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }
    }
  }, [isActive]);

  // Measure base font size when activated
  useEffect(() => {
    if (isActive && containerRef.current) {
      const pEl = containerRef.current.querySelector("p") || containerRef.current.querySelector("span") || containerRef.current;
      if (pEl) {
        const computed = parseFloat(window.getComputedStyle(pEl).fontSize);
        if (!isNaN(computed) && computed > 0) {
          baselineFontSizeRef.current = computed / (shayari.customTextScale || 1.0);
        }
      }
    }
  }, [isActive, shayari.id]);

  // Auto-focus and adjust textarea height when entering text editing mode
  useEffect(() => {
    if (isEditingText && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      const len = textarea.value.length;
      textarea.setSelectionRange(len, len);
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(64, textarea.scrollHeight)}px`;
    }
  }, [isEditingText]);

  // Handle outside taps to close & save
  useEffect(() => {
    if (!isActive) return;

    const handleDocumentClick = (e: PointerEvent) => {
      if (containerRef.current?.contains(e.target as Node)) {
        return;
      }
      const target = e.target as HTMLElement;
      if (target.closest("[data-move-button='true']")) {
        return;
      }
      setIsEditingText(false);
      setIsDragging(false);
      setIsPinching(false);
      isDraggingRef.current = false;
      isPinchingRef.current = false;
      activePointersRef.current.clear();
      onClose();
    };

    document.addEventListener("pointerdown", handleDocumentClick);
    return () => {
      document.removeEventListener("pointerdown", handleDocumentClick);
    };
  }, [isActive, onClose]);

  // Disable page scrolling while interacting
  useEffect(() => {
    if (!isActive) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalHtmlTouchAction = document.documentElement.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.touchAction = "none";

    const preventDefault = (e: Event) => {
      e.stopPropagation();
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.style.touchAction = originalHtmlTouchAction;

      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };
  }, [isActive]);

  // Safe clamping logic guaranteeing at least 16px padding on all sides of the card
  const clampPositionWithinCard = useCallback((rawX: number, rawY: number) => {
    const textBoxEl = textBoxRef.current || containerRef.current;
    const cardEl = cardRef.current || (textBoxEl?.closest(".shayari-card") as HTMLElement) || document.getElementById(`shayari-card-${shayari.id}`);
    
    if (!textBoxEl || !cardEl) {
      return { x: rawX, y: rawY };
    }

    const cardW = cardEl.clientWidth || 340;
    const cardH = cardEl.clientHeight || 500;
    const boxW = textBoxEl.offsetWidth || 240;
    const boxH = textBoxEl.offsetHeight || 120;

    const safePadding = 16; // 16px padding from all sides

    const maxDeltaX = Math.max(0, (cardW - boxW) / 2 - safePadding);
    const maxDeltaY = Math.max(0, (cardH - boxH) / 2 - safePadding);

    const clampedX = Math.max(-maxDeltaX, Math.min(maxDeltaX, rawX));
    const clampedY = Math.max(-maxDeltaY, Math.min(maxDeltaY, rawY));

    return { x: clampedX, y: clampedY };
  }, [shayari.id]);

  // Helper to get current font size px
  const getCurrentFontSizePx = useCallback(() => {
    const textBoxEl = textBoxRef.current || containerRef.current;
    if (!textBoxEl) return 24;
    const pEl = textBoxEl.querySelector("p") || textBoxEl.querySelector("span");
    if (pEl) {
      const computed = parseFloat(window.getComputedStyle(pEl).fontSize);
      if (!isNaN(computed) && computed > 0) return computed;
    }
    const computed = parseFloat(window.getComputedStyle(textBoxEl).fontSize);
    return !isNaN(computed) && computed > 0 ? computed : 24;
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isResizingRef.current || isEditingText) return;
    
    // Check if clicked inside interactive controls
    const target = e.target as HTMLElement;
    if (
      target.closest("[data-resize-handle='true']") ||
      target.closest("[data-edit-button='true']") ||
      target.closest("[data-rotate-btn='true']") ||
      target.tagName.toLowerCase() === "textarea" ||
      target.tagName.toLowerCase() === "button"
    ) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    // Register active pointer
    activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const cardEl = (containerRef.current?.closest(".shayari-card") as HTMLElement) || document.getElementById(`shayari-card-${shayari.id}`);
    if (cardEl) {
      cardRef.current = cardEl;
    }

    // MULTI-TOUCH PINCH DETECTED (2 or more pointers)
    if (activePointersRef.current.size >= 2) {
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }
      isDraggingRef.current = false;
      setIsDragging(false);
      isPinchingRef.current = true;
      setIsPinching(true);

      const points: Array<{ x: number; y: number }> = Array.from(activePointersRef.current.values());
      const p1 = points[0];
      const p2 = points[1];
      if (!p1 || !p2) return;
      const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      const centerX = (p1.x + p2.x) / 2;
      const centerY = (p1.y + p2.y) / 2;

      const currentFontSize = getCurrentFontSizePx();
      const baseline = currentFontSize / (localScale || 1.0);
      baselineFontSizeRef.current = baseline || 24;

      pinchStartRef.current = {
        startDistance: Math.max(1, distance),
        initialScale: localScale,
        initialFontSize: currentFontSize,
        centerX,
        centerY,
      };

      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(15);
      }
      return;
    }

    // SINGLE-TOUCH DRAG / LONG-PRESS DETECTED
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialX: localX,
      initialY: localY
    };

    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }

    longPressTimeoutRef.current = setTimeout(() => {
      if (activePointersRef.current.size === 1) {
        isDraggingRef.current = true;
        setIsDragging(true);
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(20);
        }
      }
    }, 180);
    
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isResizingRef.current || isEditingText) return;

    // Update active pointer position
    if (activePointersRef.current.has(e.pointerId)) {
      activePointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    // HANDLE PINCH ZOOM
    if (activePointersRef.current.size >= 2 || isPinchingRef.current) {
      e.preventDefault();
      e.stopPropagation();

      const points: Array<{ x: number; y: number }> = Array.from(activePointersRef.current.values());
      if (points.length >= 2) {
        const p1 = points[0];
        const p2 = points[1];
        if (!p1 || !p2) return;
        const currentDistance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        const { startDistance, initialFontSize } = pinchStartRef.current;

        // Smooth gradual pinch sensitivity: fingers moving apart/together scales font size
        const deltaDistance = currentDistance - startDistance;
        const deltaFontSize = deltaDistance * 0.12;

        // Strict boundaries: min 14px, max 72px
        const targetFontSize = Math.max(14, Math.min(72, initialFontSize + deltaFontSize));
        const baseline = baselineFontSizeRef.current || 24;
        const newScale = Math.max(0.35, Math.min(3.2, targetFontSize / baseline));

        setLocalScale(newScale);
        currentScaleRef.current = newScale;

        // Keep clamped safely inside card boundaries
        const clamped = clampPositionWithinCard(localX, localY);
        if (clamped.x !== localX || clamped.y !== localY) {
          setLocalX(clamped.x);
          setLocalY(clamped.y);
        }

        onSave(shayari.id, {
          customTextScale: newScale,
          customTextX: clamped.x,
          customTextY: clamped.y,
          isCustomized: true
        });
      }
      return;
    }

    // HANDLE SINGLE POINTER DRAG
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const distanceMoved = Math.hypot(dx, dy);

    // If moved more than 4px, activate drag mode immediately
    if (distanceMoved > 4 && !isDraggingRef.current) {
      isDraggingRef.current = true;
      setIsDragging(true);
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }
    }

    if (!isDraggingRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    const rawX = dragStartRef.current.initialX + dx;
    const rawY = dragStartRef.current.initialY + dy;

    const clamped = clampPositionWithinCard(rawX, rawY);
    setLocalX(clamped.x);
    setLocalY(clamped.y);

    onSave(shayari.id, {
      customTextX: clamped.x,
      customTextY: clamped.y,
      isCustomized: true
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    activePointersRef.current.delete(e.pointerId);

    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    // If pointers dropped below 2, end pinch mode
    if (isPinchingRef.current && activePointersRef.current.size < 2) {
      isPinchingRef.current = false;
      setIsPinching(false);

      const finalScale = currentScaleRef.current;
      const clamped = clampPositionWithinCard(localX, localY);
      setLocalScale(finalScale);
      setLocalX(clamped.x);
      setLocalY(clamped.y);

      onSave(shayari.id, {
        customTextScale: finalScale,
        customTextX: clamped.x,
        customTextY: clamped.y,
        isCustomized: true
      });
      return;
    }

    // End single pointer drag mode
    if (isDraggingRef.current && activePointersRef.current.size === 0) {
      e.preventDefault();
      e.stopPropagation();
      
      isDraggingRef.current = false;
      setIsDragging(false);

      const clamped = clampPositionWithinCard(localX, localY);
      setLocalX(clamped.x);
      setLocalY(clamped.y);

      onSave(shayari.id, {
        customTextX: clamped.x,
        customTextY: clamped.y,
        isCustomized: true
      });
    }
  };

  const handleResizeStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const textBoxEl = textBoxRef.current || containerRef.current;
    const cardEl = (textBoxEl?.closest(".shayari-card") as HTMLElement) || document.getElementById(`shayari-card-${shayari.id}`);
    if (!textBoxEl) return;
    
    if (cardEl) {
      cardRef.current = cardEl;
    }

    isResizingRef.current = true;

    const rect = textBoxEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startDistance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    // Measure base font size
    const currentFontSize = getCurrentFontSizePx();
    const baseline = currentFontSize / (localScale || 1.0);
    baselineFontSizeRef.current = baseline || 24;

    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialScale: localScale,
      initialFontSize: currentFontSize,
      centerX,
      centerY,
      startDistance: startDistance || 1
    };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleResizeMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isResizingRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const { centerX, centerY, startDistance, initialFontSize } = resizeStartRef.current;
    const currentDistance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    
    // Smooth controlled sensitivity: 10px drag = 1.3px font size change
    const deltaDistance = currentDistance - startDistance;
    const deltaFontSize = deltaDistance * 0.13;

    // Min font size: 14px, Max font size: 72px
    const targetFontSize = Math.max(14, Math.min(72, initialFontSize + deltaFontSize));
    const baseline = baselineFontSizeRef.current || 24;
    const newScale = Math.max(0.35, Math.min(3.2, targetFontSize / baseline));

    setLocalScale(newScale);
    currentScaleRef.current = newScale;

    // Keep clamped inside card during resize
    const clamped = clampPositionWithinCard(localX, localY);
    if (clamped.x !== localX || clamped.y !== localY) {
      setLocalX(clamped.x);
      setLocalY(clamped.y);
    }

    onSave(shayari.id, {
      customTextScale: newScale,
      customTextX: clamped.x,
      customTextY: clamped.y,
      isCustomized: true
    });
  };

  const handleResizeEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isResizingRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const finalScale = currentScaleRef.current;
    setLocalScale(finalScale);

    // Final clamp to ensure 16px safe bounds
    const clamped = clampPositionWithinCard(localX, localY);
    setLocalX(clamped.x);
    setLocalY(clamped.y);

    onSave(shayari.id, {
      customTextScale: finalScale,
      customTextX: clamped.x,
      customTextY: clamped.y,
      customTextRotate: localRotate,
      isCustomized: true
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setEditText(val);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(64, textareaRef.current.scrollHeight)}px`;
    }
    onUpdateText?.(shayari.id, val);
    onSave(shayari.id, { sher: val, isCustomized: true });
  };

  const displayFontSizePx = Math.max(14, Math.min(72, Math.round((baselineFontSizeRef.current || 24) * localScale)));
  const isInteracting = isDragging || isPinching;

  if (!isActive) {
    return (
      <div
        ref={containerRef}
        style={{
          transform: `translate(${localX}px, ${localY}px) rotate(${localRotate}deg)`,
          "--font-size-scale": localScale,
          touchAction: "auto",
        } as React.CSSProperties}
        className="relative select-none z-10 w-full flex flex-col items-center justify-center text-center"
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        transform: `translate(${localX}px, ${localY}px) rotate(${localRotate}deg)`,
        "--font-size-scale": localScale,
        touchAction: "none",
      } as React.CSSProperties}
      className="relative select-none z-30 cursor-move w-full flex flex-col items-center justify-center text-center"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Floating Black Editing Box */}
      <div
        ref={textBoxRef}
        className={`relative max-w-[90%] min-w-[220px] w-auto inline-flex flex-col items-center justify-center bg-[#09090B]/95 text-white rounded-[22px] border px-5 pt-8 pb-7 select-none backdrop-blur-md transition-all duration-150 ${
          isInteracting
            ? "ring-2 ring-pink-500 border-pink-500 shadow-[0_24px_60px_rgba(236,72,153,0.45),0_12px_30px_rgba(0,0,0,0.8)] scale-[1.02]"
            : "border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_6px_20px_rgba(0,0,0,0.35)]"
        }`}
      >
        {/* Rotation tools at top center */}
        <div
          data-download-ignore="true"
          className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#09090B]/95 border border-white/20 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-md z-50 pointer-events-auto backdrop-blur-xs select-none"
        >
          <button
            type="button"
            data-rotate-btn="true"
            onClick={(e) => {
              e.stopPropagation();
              const next = Math.max(-15, localRotate - 3);
              setLocalRotate(next);
              onSave(shayari.id, { customTextRotate: next, isCustomized: true });
            }}
            className="hover:text-pink-400 cursor-pointer px-1 transition-colors"
            title="Rotate Left -3°"
          >
            ↺ -3°
          </button>
          <span className="text-white/30">|</span>
          <button
            type="button"
            data-rotate-btn="true"
            onClick={(e) => {
              e.stopPropagation();
              const next = Math.min(15, localRotate + 3);
              setLocalRotate(next);
              onSave(shayari.id, { customTextRotate: next, isCustomized: true });
            }}
            className="hover:text-pink-400 cursor-pointer px-1 transition-colors"
            title="Rotate Right +3°"
          >
            ↻ +3°
          </button>
        </div>

        {/* Top-Right: Edit icon (pencil) */}
        <button
          type="button"
          data-download-ignore="true"
          data-edit-button="true"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditingText((prev) => !prev);
          }}
          className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all border shadow-xs pointer-events-auto z-40 ${
            isEditingText
              ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400/80 scale-105"
              : "bg-white/15 hover:bg-white/25 text-white/90 hover:text-white border-white/20 hover:scale-105"
          }`}
          title={isEditingText ? "Done Editing Text" : "Edit Shayari Text"}
        >
          {isEditingText ? (
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <Pencil className="w-3.5 h-3.5 stroke-[2]" />
          )}
        </button>

        {/* Content: Either live editable textarea or white text on black background */}
        {isEditingText ? (
          <div className="w-full flex flex-col items-center justify-center pointer-events-auto">
            <textarea
              ref={textareaRef}
              value={editText}
              onChange={handleTextChange}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-full bg-transparent text-white text-center font-bold text-sm sm:text-base leading-relaxed outline-none border-b border-white/30 focus:border-pink-400 resize-none p-1 transition-colors font-sans placeholder:text-white/40"
              placeholder="Type your shayari here..."
            />
            <span className="text-[9px] text-pink-300/80 mt-1 font-medium select-none">
              Live preview • Tap ✓ when done
            </span>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center text-center text-white [&_*]:!text-white [&_*]:!drop-shadow-none">
            {children}
          </div>
        )}

        {/* Bottom-Left: Font Size indicator (e.g. 32px) with highlighted glow during pinch/resize */}
        <div
          data-download-ignore="true"
          className={`absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono font-bold select-none pointer-events-none flex items-center gap-1 shadow-2xs backdrop-blur-xs transition-all duration-150 ${
            isPinching || isResizingRef.current
              ? "bg-pink-600 text-white border border-pink-400 shadow-md scale-105"
              : "bg-white/15 border border-white/20 text-white/90"
          }`}
        >
          <span>{displayFontSizePx}px</span>
          {isPinching && (
            <span className="text-[8px] uppercase tracking-wider font-sans text-pink-200">Pinch</span>
          )}
        </div>

        {/* Bottom-Right: Larger, easy-to-grab resize handle with diagonal icon */}
        <div
          data-download-ignore="true"
          data-resize-handle="true"
          className="absolute -bottom-2.5 -right-2.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-zinc-950 shadow-[0_4px_16px_rgba(0,0,0,0.5)] cursor-nwse-resize flex items-center justify-center pointer-events-auto select-none hover:scale-110 active:scale-95 transition-transform border-2 border-pink-500 z-50 group"
          onPointerDown={handleResizeStart}
          onPointerMove={handleResizeMove}
          onPointerUp={handleResizeEnd}
          onPointerCancel={handleResizeEnd}
          title="Drag diagonally to resize text (14px - 72px)"
        >
          <Maximize2 className="w-4 h-4 text-zinc-900 group-hover:text-pink-600 transition-colors rotate-90 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
