"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type Props = {
  visible: boolean;
};

export function ThankYouToast({ visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-rose-100/90 bg-white/92 px-6 py-4 shadow-[0_18px_36px_rgba(104,43,74,0.22)] backdrop-blur-md"
        >
          <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-500" aria-hidden />
          <div>
            <p className="font-serif text-lg font-semibold text-rose-950">Thank you!</p>
            <p className="text-sm text-rose-900/70">Your note means the world.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
