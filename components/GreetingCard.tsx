"use client";

import { BouquetIllustration } from "@/components/BouquetIllustration";
import { motion } from "framer-motion";
import { Link2, Share2 } from "lucide-react";
import { useCallback, useState } from "react";

const SIGNATURE = "Pratyaksh";

type Props = {
  name: string;
  message: string;
  /** Copy / Share stay disabled until the user submits their review. */
  reviewComplete: boolean;
};

export function GreetingCard({ name, message, reviewComplete }: Props) {
  const [copyHint, setCopyHint] = useState<string | null>(null);

  const handleCopyLink = useCallback(async () => {
    if (!reviewComplete) return;
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setCopyHint("Link copied!");
      window.setTimeout(() => setCopyHint(null), 2200);
    } catch {
      setCopyHint("Couldn’t copy — try again.");
      window.setTimeout(() => setCopyHint(null), 2200);
    }
  }, [reviewComplete]);

  const handleShare = useCallback(async () => {
    if (!reviewComplete) return;
    const url = typeof window !== "undefined" ? window.location.href : "";
    const preview =
      message.length > 320 ? `${message.slice(0, 317).trimEnd()}…` : message;
    const shareData = {
      title: "A little bouquet for you",
      text: `Dear ${name},\n\n${preview}`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setCopyHint("Shared!");
      } else {
        await navigator.clipboard.writeText(url);
        setCopyHint("Link copied!");
      }
      window.setTimeout(() => setCopyHint(null), 2200);
    } catch {
      setCopyHint(null);
    }
  }, [name, message, reviewComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="flex w-full max-w-md flex-col items-center"
    >
      <h2 className="font-script text-5xl text-rose-900 md:text-6xl">Fell special</h2>
      <p className="mt-3 font-letter text-sm tracking-wide text-slate-700">
        Hi, I made this bouquet for you!
      </p>

      <div className="relative mt-8 flex w-full flex-col items-center">
        {/* Bouquet + soft glow (stems continue behind the letter) */}
        <div className="relative z-10 flex justify-center pb-2">
          <div className="relative">
            <div
              className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-100/90 via-pink-100/70 to-rose-50/80 blur-[2px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/55"
              aria-hidden
            />
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <BouquetIllustration className="relative z-10 h-[280px] w-[240px] drop-shadow-[0_12px_24px_rgba(190,100,130,0.25)]" />
            </motion.div>
          </div>
        </div>

        {/* Letter card — overlaps bouquet stems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
          className="relative z-20 -mt-14 w-full border border-pink-200/90 bg-white/75 px-7 py-8 shadow-[0_8px_40px_rgba(219,39,119,0.12)] backdrop-blur-md md:px-9"
        >
          <p className="font-letter text-[15px] leading-relaxed text-slate-800">
            Dear {name},
          </p>
          <p className="mt-4 max-w-prose whitespace-pre-line font-letter text-[15px] leading-[1.85] text-slate-700">
            {message}
          </p>
          <p className="mt-8 font-letter text-[15px] leading-relaxed text-slate-800">
           Yours Sincerely,
            <br />
            {SIGNATURE}
          </p>
        </motion.div>
      </div>

      <div className="mt-8 flex w-full flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={handleCopyLink}
          disabled={!reviewComplete}
          title={reviewComplete ? undefined : "Submit your review below first"}
          className="font-letter flex min-w-[140px] items-center justify-center gap-2 border border-slate-900/90 bg-slate-900 px-5 py-3 text-xs font-normal uppercase tracking-[0.2em] text-white shadow-md transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Link2 className="h-4 w-4" aria-hidden />
          Copy link
        </button>
        <button
          type="button"
          onClick={handleShare}
          disabled={!reviewComplete}
          title={reviewComplete ? undefined : "Submit your review below first"}
          className="font-letter flex min-w-[140px] items-center justify-center gap-2 border border-slate-900/90 bg-slate-900 px-5 py-3 text-xs font-normal uppercase tracking-[0.2em] text-white shadow-md transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Share2 className="h-4 w-4" aria-hidden />
          Share
        </button>
      </div>
      {!reviewComplete && (
        <p className="mt-3 max-w-sm text-center font-letter text-xs text-rose-800/90">
          Submit your review below (dropdown + message) to unlock Copy &amp; Share — and to leave without a
          browser warning.
        </p>
      )}
      {copyHint && (
        <p className="mt-3 font-letter text-sm text-rose-700" role="status">
          {copyHint}
        </p>
      )}
    </motion.div>
  );
}
