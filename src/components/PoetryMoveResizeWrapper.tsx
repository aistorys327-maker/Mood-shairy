import React, { useState, useEffect, useRef } from "react";
import { Shayari } from "../types";

interface Props {
  shayari: Shayari;
  isActive: boolean;
  onSave: (id: string, updates: Partial<Shayari>) => void;
  onClose: () => void;
  children: React.ReactNode;
}

export const PoetryMoveResizeWrapper: React.FC<Props> = ({
  shayari,
  isActive,
  onSave,
  onClose,
  children
}) => {
  const [localX, setLocalX] = useState(shayari.customTextX || 0);
  const [localY, setLocalY] = useState(shayari.customTextY || 0);
  const [localScale, setLocalScale] = useState(shayari.customTextScale || 1.0);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement | null>(null);

  const dragStartRef = useRef({ x: 0, y: 0, initialX: 0, initialY: 0 });
  const isDraggingRef = useRef(false);

  const resizeStartRef = useRef({ startX: 0, startY: 0, initialScale: 1.0, centerX: 0, centerY: 0, startDistance: 1 });
  const isResizingRef = useRef(false);
  const baselineFontSizeRef = useRef<number>(24);

  const targetScaleRef = useRef<number>(1.0);
  const currentScaleRef = useRef<number>(1.0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Sync state with incoming props
  useEffect(() => {
    setLocalX(shayari.customTextX || 0);
    setLocalY(shayari.customTextY || 0);
    setLocalScale(shayari.customTextScale || 1.0);
    currentScaleRef.current = shayari.customTextScale || 1.0;
  }, [shayari.customTextX, shayari.customTextY, shayari.customTextScale]);

  // Sync local ref for smooth loop
  useEffect(() => {
    currentScaleRef.current = localScale;
  }, [localScale]);

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
      onClose();
    };

    document.addEventListener("pointerdown", handleDocumentClick);
    return () => {
      document.removeEventListener("pointerdown", handleDocumentClick);
    };
  }, [isActive, onClose]);

  // Completely disable page & container scrolling when editing is active
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

  // Block touch behaviors inside the selection box to avoid browser scroll interference
  useEffect(() => {
    if (!isActive) return;

    const el = containerRef.current;
    if (!el) return;

    const preventDefault = (e: Event) => {
      e.stopPropagation();
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    el.addEventListener("touchstart", preventDefault, { passive: false });
    el.addEventListener("touchmove", preventDefault, { passive: false });
    el.addEventListener("touchend", preventDefault, { passive: false });

    return () => {
      el.removeEventListener("touchstart", preventDefault);
      el.removeEventListener("touchmove", preventDefault);
      el.removeEventListener("touchend", preventDefault);
    };
  }, [isActive]);

  const handleMoveStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isResizingRef.current) return;
    
    // Check if we hit the resize handle
    const target = e.target as HTMLElement;
    if (target.closest("[data-resize-handle='true']")) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    
    const cardEl = containerRef.current?.closest(".shayari-card") as HTMLElement;
    if (!cardEl) return;
    cardRef.current = cardEl;

    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialX: localX,
      initialY: localY
    };
    
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleMoveMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    
    const rawX = dragStartRef.current.initialX + dx;
    const rawY = dragStartRef.current.initialY + dy;

    const textBoxEl = containerRef.current;
    const cardEl = cardRef.current;
    
    if (textBoxEl && cardEl) {
      const W = cardEl.clientWidth;
      const H = cardEl.clientHeight;
      const w = textBoxEl.offsetWidth;
      const h = textBoxEl.offsetHeight;

      const marginTop = 54;
      const marginBottom = 44;
      const marginLeft = 24;
      const marginRight = 24;

      const minTx = marginLeft - (W - w) / 2;
      const maxTx = (W - w) / 2 - marginRight;
      const minTy = marginTop - (H - h) / 2;
      const maxTy = (H - h) / 2 - marginBottom;

      const clampedX = minTx <= maxTx ? Math.max(minTx, Math.min(maxTx, rawX)) : 0;
      const clampedY = minTy <= maxTy ? Math.max(minTy, Math.min(maxTy, rawY)) : 0;

      setLocalX(clampedX);
      setLocalY(clampedY);
    } else {
      setLocalX(rawX);
      setLocalY(rawY);
    }
  };

  const handleMoveEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    
    isDraggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    onSave(shayari.id, {
      customTextX: localX,
      customTextY: localY,
      isCustomized: true
    });
  };

  const startScalingLoop = () => {
    if (animationFrameIdRef.current !== null) return;

    const tick = () => {
      if (!isResizingRef.current) {
        animationFrameIdRef.current = null;
        return;
      }

      const current = currentScaleRef.current;
      const target = targetScaleRef.current;
      const next = current + (target - current) * 0.15;

      if (Math.abs(target - next) < 0.0001) {
        setLocalScale(target);
        currentScaleRef.current = target;
      } else {
        setLocalScale(next);
        currentScaleRef.current = next;
      }

      animationFrameIdRef.current = requestAnimationFrame(tick);
    };

    animationFrameIdRef.current = requestAnimationFrame(tick);
  };

  const stopScalingLoop = () => {
    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  const handleResizeStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const textBoxEl = containerRef.current;
    const cardEl = textBoxEl?.closest(".shayari-card") as HTMLElement;
    if (!textBoxEl || !cardEl) return;
    
    cardRef.current = cardEl;
    isResizingRef.current = true;

    const rect = textBoxEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startDistance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    // Measure baseline size in pixels to enforce limits precisely
    const pEl = textBoxEl.querySelector("p");
    let currentFontSize = 24;
    if (pEl) {
      currentFontSize = parseFloat(window.getComputedStyle(pEl).fontSize) || 24;
    } else {
      currentFontSize = parseFloat(window.getComputedStyle(textBoxEl).fontSize) || 24;
    }
    const baseline = currentFontSize / (localScale || 1.0);
    baselineFontSizeRef.current = baseline || 24;

    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialScale: localScale,
      centerX,
      centerY,
      startDistance: startDistance || 1
    };

    targetScaleRef.current = localScale;
    currentScaleRef.current = localScale;
    startScalingLoop();

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleResizeMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isResizingRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const { centerX, centerY, startDistance, initialScale } = resizeStartRef.current;
    const currentDistance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    
    // Precise slower mapping:
    // deltaFontSize = deltaDistance * 0.05
    // - 5 px drag = 0.25 px font size change
    // - 25 px drag = 1.25 px font size change (~1 px)
    // - 100 px drag = 5 px font size change (4-5 px)
    // - 300 px drag = 15 px font size change (~15 px)
    const deltaDistance = currentDistance - startDistance;
    const deltaFontSize = deltaDistance * 0.05;

    const baseline = baselineFontSizeRef.current;
    const targetScale = initialScale + (deltaFontSize / baseline);

    // Enforce limits: Min 12px, Max 120px
    const minScale = 12 / baseline;
    const maxScale = 120 / baseline;
    const finalScale = Math.max(minScale, Math.min(maxScale, targetScale));

    targetScaleRef.current = finalScale;
  };

  const handleResizeEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isResizingRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = false;
    stopScalingLoop();
    e.currentTarget.releasePointerCapture(e.pointerId);

    // Re-clamp position after resize
    const textBoxEl = containerRef.current;
    const cardEl = cardRef.current;
    let finalX = localX;
    let finalY = localY;

    if (textBoxEl && cardEl) {
      const W = cardEl.clientWidth;
      const H = cardEl.clientHeight;
      const w = textBoxEl.offsetWidth;
      const h = textBoxEl.offsetHeight;

      const marginTop = 54;
      const marginBottom = 44;
      const marginLeft = 24;
      const marginRight = 24;

      const minTx = marginLeft - (W - w) / 2;
      const maxTx = (W - w) / 2 - marginRight;
      const minTy = marginTop - (H - h) / 2;
      const maxTy = (H - h) / 2 - marginBottom;

      finalX = minTx <= maxTx ? Math.max(minTx, Math.min(maxTx, localX)) : 0;
      finalY = minTy <= maxTy ? Math.max(minTy, Math.min(maxTy, localY)) : 0;
      
      setLocalX(finalX);
      setLocalY(finalY);
    }

    onSave(shayari.id, {
      customTextScale: currentScaleRef.current,
      customTextX: finalX,
      customTextY: finalY,
      isCustomized: true
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        transform: `translate(${localX}px, ${localY}px)`,
        "--font-size-scale": localScale,
        touchAction: isActive ? "none" : "auto",
      } as React.CSSProperties}
      className={`relative select-none ${isActive ? "z-30 cursor-move" : "z-10"}`}
      onPointerDown={isActive ? handleMoveStart : undefined}
      onPointerMove={isActive ? handleMoveMove : undefined}
      onPointerUp={isActive ? handleMoveEnd : undefined}
    >
      {/* Wrapper to allow exact bounding box around children text lines */}
      <div className={`relative inline-block ${isActive ? "p-3.5 border-2 border-dashed border-amber-500/80 bg-amber-500/[0.04] rounded-2xl" : ""}`}>
        {/* The actual children poetry text */}
        {children}

        {/* Selection Box overlay with resize handle when active */}
        {isActive && (
          <div
            data-resize-handle="true"
            className="absolute bottom-0 right-0 w-8 h-8 -mr-4 -mb-4 bg-white border-2 border-amber-500 rounded-full shadow-lg cursor-se-resize flex items-center justify-center pointer-events-auto z-50 hover:scale-110 active:scale-95 transition-transform"
            onPointerDown={handleResizeStart}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
            title="Drag to resize text"
          >
            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
