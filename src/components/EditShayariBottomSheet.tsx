import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Edit3 } from "lucide-react";
import { Shayari } from "../types";

interface Props {
  isOpen: boolean;
  shayari: Shayari | null;
  onUpdateText: (id: string, newText: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export const EditShayariBottomSheet: React.FC<Props> = ({
  isOpen,
  shayari,
  onUpdateText,
  onSave,
  onClose
}) => {
  const [text, setText] = useState("");
  const initialTextRef = useRef("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (shayari && isOpen) {
      setText(shayari.sher || "");
      initialTextRef.current = shayari.sher || "";
      const timer = setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          const len = textareaRef.current.value.length;
          textareaRef.current.setSelectionRange(len, len);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [shayari?.id, isOpen]);

  if (!isOpen || !shayari) return null;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    onUpdateText(shayari.id, val);
  };

  const handleCancel = () => {
    if (initialTextRef.current !== text) {
      onUpdateText(shayari.id, initialTextRef.current);
    }
    onClose();
  };

  const handleSave = () => {
    onSave();
    onClose();
  };

  const lineCount = text.split("\n").filter((l) => l.length > 0).length || (text.length > 0 ? 1 : 0);
  const charCount = text.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[110] transition-opacity"
          />

          {/* Clean White Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-[120] max-w-lg md:max-w-2xl mx-auto bg-white border-t border-slate-200/90 rounded-t-[24px] shadow-2xl flex flex-col h-[45vh] max-h-[420px] min-h-[290px] overflow-hidden pointer-events-auto"
          >
            {/* Top Handle */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

            {/* Sheet Header */}
            <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center text-[#FF2D8D]">
                  <Edit3 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Edit Shayari</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Card preview updates live as you type</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-mono font-bold bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                  {charCount} chars • {lineCount} {lineCount === 1 ? "line" : "lines"}
                </span>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Multiline Textarea Body */}
            <div className="flex-1 p-3.5 min-h-0 flex flex-col bg-slate-50/50">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                placeholder="Type or paste your custom shayari here..."
                className="w-full flex-1 p-3 text-sm sm:text-base font-semibold leading-relaxed text-slate-900 bg-white border border-slate-200/90 rounded-2xl focus:outline-none focus:border-[#FF2D8D] focus:ring-2 focus:ring-[#FF2D8D]/20 resize-none shadow-2xs font-sans placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>

            {/* Footer Actions */}
            <div className="px-4 py-2.5 border-t border-slate-100 bg-white flex items-center justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF2D8D] to-[#7B2FF7] hover:opacity-95 shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Shayari</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
