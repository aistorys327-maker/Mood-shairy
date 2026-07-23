import React, { useEffect, useState } from "react";
import { Clock, X, RefreshCw, Sparkles, AlertTriangle } from "lucide-react";

interface RateLimitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTryAgain: () => void;
  resetSeconds: number | null; // Valid reset time in seconds provided by API response, or null
  isDisableCooldownActive?: boolean;
  disableCooldownSeconds?: number;
}

export const RateLimitDialog: React.FC<RateLimitDialogProps> = ({
  isOpen,
  onClose,
  onTryAgain,
  resetSeconds,
  isDisableCooldownActive = false,
  disableCooldownSeconds = 0,
}) => {
  const [countdown, setCountdown] = useState<number | null>(resetSeconds);

  useEffect(() => {
    // Only set countdown if resetSeconds is a valid positive number
    if (typeof resetSeconds === "number" && resetSeconds > 0) {
      setCountdown(resetSeconds);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCountdown(null);
    }
  }, [resetSeconds, isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500" />

        {/* Header Icon & Title */}
        <div className="flex items-start justify-between gap-3 pt-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 shadow-xs">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                AI is temporarily busy
              </h3>
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mt-0.5">
                Rate Limit Exceeded (429)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Message Content */}
        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="font-medium text-slate-800 dark:text-slate-200">
            You have reached the current AI request limit.
          </p>
          <p>
            Please wait a while and try again.
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/80 leading-normal">
            Free Gemini API limits reset automatically after some time depending on Google's quota policy.
          </p>

          {/* Countdown timer only if API provides valid reset time */}
          {countdown !== null && countdown > 0 ? (
            <div className="flex items-center gap-2.5 p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl text-amber-800 dark:text-amber-300 font-semibold text-xs">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 animate-spin" />
              <span>
                Resets in: <strong className="font-mono font-bold text-amber-900 dark:text-amber-100 text-sm ml-1">{countdown}s</strong>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 p-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-slate-700 dark:text-slate-300 font-medium text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Please try again in a few minutes.</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-150 dark:border-slate-800/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isDisableCooldownActive) {
                onClose();
                onTryAgain();
              }
            }}
            disabled={isDisableCooldownActive}
            className={`px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isDisableCooldownActive ? "animate-spin" : ""}`} />
            <span>
              {isDisableCooldownActive
                ? `Wait (${disableCooldownSeconds}s)`
                : "Try Again"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
