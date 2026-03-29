"use client";

import { BouquetIllustration } from "@/components/BouquetIllustration";
import { Bouquet3DScene } from "@/components/Bouquet3DScene";
import { motion } from "framer-motion";
import { Link2, Share2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const SIGNATURE = "Pratyaksh";

type Props = {
  name: string;
  message: string;
  /** Copy / Share stay disabled until the user submits their review. */
  reviewComplete: boolean;
  onRevealChange?: (revealed: boolean) => void;
};

export function GreetingCard({ name, message, reviewComplete, onRevealChange }: Props) {
  const [copyHint, setCopyHint] = useState<string | null>(null);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  useEffect(() => {
    setEnvelopeOpened(false);
    onRevealChange?.(false);
  }, [name, message, onRevealChange]);

  const handleOpenEnvelope = useCallback(() => {
    setEnvelopeOpened(true);
    onRevealChange?.(true);
  }, [onRevealChange]);

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
      className="flower-stage flex w-full max-w-2xl flex-col items-center"
    >
      <div className="relative text-center">
        <div className="aurora-orb -left-16 top-3 h-20 w-20 bg-rose-200/70" aria-hidden />
        <div className="aurora-orb -right-14 top-8 h-16 w-16 bg-amber-200/70" aria-hidden />
        <h2 className="font-script text-5xl text-rose-900 md:text-7xl">Fell special</h2>
      </div>
      <p className="mt-3 rounded-full border border-white/80 bg-white/55 px-4 py-1 font-letter text-sm tracking-wide text-slate-700 shadow-sm backdrop-blur-sm">
        A hand-tied bouquet wrapped in a little love note.
      </p>

      <div className="relative mt-8 flex w-full flex-col items-center">
        {!envelopeOpened ? (
          <motion.button
            type="button"
            onClick={handleOpenEnvelope}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="relative mt-2 w-full max-w-xl cursor-pointer rounded-[1.9rem] border border-rose-200/80 bg-gradient-to-b from-[#fffaf1] via-[#ffe9f3] to-[#ffd6e8] p-6 shadow-[0_24px_48px_rgba(118,55,84,0.2)]"
          >
            <motion.div
              className="absolute inset-x-5 top-5 h-[42%] rounded-[1.4rem] bg-gradient-to-b from-[#ffe2ed] to-[#ffcce1]"
              animate={{ rotateX: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
            <div className="relative z-10 flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-[1.2rem] border border-white/80 bg-white/65 backdrop-blur-sm">
              <span className="wax-seal flex h-14 w-14 items-center justify-center rounded-full border-4 border-white/70 text-sm font-semibold text-white">
                For You
              </span>
              <p className="font-serif text-xl text-rose-950">Tap to open your gift envelope</p>
              <p className="font-letter text-xs uppercase tracking-[0.24em] text-rose-800/80">
                cinematic bloom reveal
              </p>
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="pointer-events-none absolute left-[16%] top-7 h-4 w-4 animate-drift rounded-full bg-rose-300/80" aria-hidden />
            <div className="pointer-events-none absolute right-[12%] top-14 h-3 w-3 animate-drift rounded-full bg-amber-300/85 [animation-delay:600ms]" aria-hidden />
            <div className="pointer-events-none absolute left-[28%] top-28 h-2 w-2 animate-twinkle rounded-full bg-white/90" aria-hidden />
            <div className="pointer-events-none absolute right-[24%] top-20 h-2 w-2 animate-twinkle rounded-full bg-white/80 [animation-delay:900ms]" aria-hidden />

            <div className="relative z-10 mx-auto flex w-full max-w-xl justify-center pb-4">
              <div className="relative w-full">
                <div
                  className="pointer-events-none absolute left-1/2 top-[48%] -z-10 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-100/90 via-pink-100/70 to-rose-50/80 blur-[3px]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-[43%] -z-10 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/55"
                  aria-hidden
                />

                <motion.div
                  animate={{ y: [0, -7, 0], rotate: [0, 1.8, 0, -1.5, 0] }}
                  transition={{ repeat: Infinity, duration: 6.2, ease: "easeInOut" }}
                  className="mx-auto h-[340px] w-full max-w-xl"
                >
                  <Bouquet3DScene className="h-[340px] w-full" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 5.4, ease: "easeInOut" }}
                  className="pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2"
                >
                  <BouquetIllustration className="h-[290px] w-[246px] opacity-70 drop-shadow-[0_18px_30px_rgba(118,55,84,0.28)]" />
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="gift-letter relative z-20 mx-auto -mt-10 w-full max-w-xl overflow-hidden px-7 py-10 backdrop-blur-md md:px-11"
            >
              <div className="pointer-events-none absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border-4 border-white/70 wax-seal" aria-hidden />
              <div className="pointer-events-none absolute left-0 top-0 h-6 w-full bg-gradient-to-r from-rose-100/60 via-amber-100/60 to-rose-100/60" aria-hidden />
              <div className="pointer-events-none absolute bottom-0 left-0 h-6 w-full bg-gradient-to-r from-rose-100/55 via-white/10 to-rose-100/55" aria-hidden />

              <p className="font-letter text-[15px] leading-relaxed text-slate-900">
                Dear {name},
              </p>
              <p className="mt-5 max-w-prose whitespace-pre-line font-letter text-[15px] leading-[1.9] text-slate-700">
                {message}
              </p>
              <p className="mt-8 font-letter text-[15px] leading-relaxed text-slate-800">
                Yours Sincerely,
                <br />
                {SIGNATURE}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="petal-chip h-4 w-4" aria-hidden />
                <span className="petal-chip h-3 w-3 opacity-85" aria-hidden />
                <span className="text-xs uppercase tracking-[0.3em] text-rose-700/75">gift letter edition</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 flex w-full flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={handleCopyLink}
          disabled={!reviewComplete || !envelopeOpened}
          title={reviewComplete ? undefined : "Submit your review below first"}
          className="font-letter flex min-w-[150px] items-center justify-center gap-2 rounded-full border border-rose-900/80 bg-rose-900 px-6 py-3 text-xs font-normal uppercase tracking-[0.18em] text-white shadow-md transition hover:-translate-y-0.5 hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Link2 className="h-4 w-4" aria-hidden />
          Copy link
        </button>
        <button
          type="button"
          onClick={handleShare}
          disabled={!reviewComplete || !envelopeOpened}
          title={reviewComplete ? undefined : "Submit your review below first"}
          className="font-letter flex min-w-[150px] items-center justify-center gap-2 rounded-full border border-rose-900/80 bg-rose-900 px-6 py-3 text-xs font-normal uppercase tracking-[0.18em] text-white shadow-md transition hover:-translate-y-0.5 hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-40"
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
