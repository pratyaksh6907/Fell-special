"use client";

import { GreetingCard } from "@/components/GreetingCard";
import { CursorBloomTrail } from "@/components/CursorBloomTrail";
import { ReviewSection } from "@/components/ReviewSection";
import { ThankYouToast } from "@/components/ThankYouToast";
import { insertAppReview, insertGeneratedGreeting } from "@/lib/greetingDb";
import { pickRandomMessage } from "@/lib/messages";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const PETAL_BURST_VECTORS = [
  { x: -82, y: -48, r: -28, delay: 0 },
  { x: -58, y: -76, r: -10, delay: 0.02 },
  { x: -24, y: -94, r: 6, delay: 0.04 },
  { x: 10, y: -98, r: 18, delay: 0.06 },
  { x: 40, y: -86, r: 22, delay: 0.08 },
  { x: 72, y: -62, r: 34, delay: 0.1 },
  { x: -92, y: -12, r: -20, delay: 0.04 },
  { x: 90, y: -6, r: 24, delay: 0.08 },
  { x: -68, y: 24, r: -16, delay: 0.1 },
  { x: 66, y: 20, r: 16, delay: 0.14 },
  { x: -42, y: 36, r: -8, delay: 0.16 },
  { x: 36, y: 34, r: 14, delay: 0.18 },
];

export default function HomePage() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [reviewChoice, setReviewChoice] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [burstTick, setBurstTick] = useState(0);
  const [greetingSaveError, setGreetingSaveError] = useState<string | null>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    if (!cardVisible || reviewSubmitted) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [cardVisible, reviewSubmitted]);

  const handleGenerate = useCallback(async () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setLoading(true);
    setGreetingSaveError(null);
    setReviewChoice("");
    setReviewText("");
    setReviewSubmitted(false);
    setCardRevealed(false);
    setReviewError(null);
    setBurstTick((prev) => prev + 1);
    const chosen = pickRandomMessage();

    const { error } = await insertGeneratedGreeting({
      userName: trimmed,
      message: chosen,
    });

    if (error) {
      setGreetingSaveError(error.message);
    } else {
      setGreetingSaveError(null);
    }

    setDisplayName(trimmed);
    setMessage(chosen);
    setCardVisible(true);
    setLoading(false);
  }, [name]);

  const handleSubmitReview = useCallback(async () => {
    const trimmedName = displayName.trim();
    const trimmedReview = reviewText.trim();
    const choice = reviewChoice.trim();
    if (!trimmedName || !trimmedReview || !choice) return;

    setReviewSubmitting(true);
    setReviewError(null);

    const { error } = await insertAppReview({
      userName: trimmedName,
      reviewText: trimmedReview,
      reviewChoice: choice,
    });

    setReviewSubmitting(false);

    if (error) {
      setReviewError(error.message);
      return;
    }

    setReviewSubmitted(true);
    setToastOpen(true);
    window.setTimeout(() => setToastOpen(false), 4200);
  }, [displayName, reviewText, reviewChoice]);

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center overflow-hidden px-4 pb-24 pt-16 md:px-8">
      <CursorBloomTrail />

      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <motion.div
          className="aurora-orb left-[-8%] top-[6%] h-44 w-44 bg-rose-200/70"
          animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        />
        <motion.div
          className="aurora-orb right-[-6%] top-[16%] h-52 w-52 bg-amber-200/65"
          animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
        />
        <motion.div
          className="aurora-orb left-[35%] bottom-[8%] h-60 w-60 bg-emerald-200/45"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />

        {[...Array(7)].map((_, i) => (
          <motion.span
            key={`petal-${i}`}
            className="petal-chip"
            style={{
              left: `${8 + i * 13}%`,
              top: `${18 + (i % 3) * 22}%`,
              width: `${8 + (i % 3) * 2}px`,
              height: `${8 + (i % 3) * 2}px`,
            }}
            animate={{ y: [0, -16, 0], rotate: [0, 16, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.8 + i * 0.4, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-1.5 text-sm text-slate-700 shadow-sm backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-blush-deep" aria-hidden />
          Blooming 3D Love Notes
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-rose-950 md:text-6xl">
          A cinematic bouquet, made just for you
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-rose-900/75 md:text-base">
          Type a name and unwrap a dreamy flower-and-letter moment with layered motion, glossy details,
          and a keepsake card designed to feel hand-crafted.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="mt-12 w-full max-w-md rounded-3xl border border-white/60 bg-white/45 p-5 shadow-[0_25px_40px_rgba(108,44,74,0.15)] backdrop-blur-xl"
      >
        <label htmlFor="user-name" className="block text-sm font-medium text-rose-900/80">
          Your name
        </label>
        <input
          id="user-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex"
          className="mt-2 w-full rounded-2xl border border-rose-100/80 bg-white/70 px-5 py-3.5 text-slate-900 shadow-inner outline-none backdrop-blur-sm transition placeholder:text-slate-400 focus:border-blush-deep focus:ring-4 focus:ring-blush-deep/25"
        />

        <div className="relative mt-6">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !name.trim()}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#df5f94] via-[#e98cb3] to-[#f2b95f] py-4 text-lg font-semibold text-white shadow-lg shadow-pink-400/45 transition hover:-translate-y-0.5 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                >
                  <Sparkles className="h-6 w-6 text-white/90" aria-hidden />
                </motion.span>
                Weaving magic…
              </>
            ) : (
              <>
                <Wand2 className="h-6 w-6 transition group-hover:rotate-12" aria-hidden />
                Generate Magic
              </>
            )}
          </button>

          <AnimatePresence>
            {burstTick > 0 && (
              <motion.div
                key={`burst-${burstTick}`}
                className="pointer-events-none absolute left-1/2 top-1/2 z-10"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                aria-hidden
              >
                {PETAL_BURST_VECTORS.map((vec, idx) => (
                  <motion.span
                    key={`petal-burst-${idx}`}
                    className="absolute h-3 w-3 rounded-full bg-gradient-to-br from-rose-100 via-pink-300 to-rose-500 shadow-[0_6px_16px_rgba(188,65,117,0.45)]"
                    initial={{ x: 0, y: 0, scale: 0.6, rotate: 0, opacity: 0.95 }}
                    animate={{ x: vec.x, y: vec.y, scale: [0.8, 1, 0.8], rotate: vec.r, opacity: 0 }}
                    transition={{ duration: 0.95, ease: "easeOut", delay: vec.delay }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {greetingSaveError && (
        <p className="mt-4 max-w-md text-center text-sm text-amber-800" role="alert">
          Greeting saved locally; cloud sync failed: {greetingSaveError}
        </p>
      )}

      <div className="mt-14 flex w-full flex-col items-center">
        <AnimatePresence mode="wait">
          {cardVisible && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex w-full flex-col items-center"
            >
              <GreetingCard
                name={displayName}
                message={message}
                reviewComplete={reviewSubmitted}
                onRevealChange={setCardRevealed}
              />
              {cardRevealed ? (
                <ReviewSection
                  userName={displayName}
                  reviewChoice={reviewChoice}
                  reviewText={reviewText}
                  onChoiceChange={setReviewChoice}
                  onReviewChange={setReviewText}
                  onSubmit={handleSubmitReview}
                  submitting={reviewSubmitting}
                  submitted={reviewSubmitted}
                />
              ) : (
                <p className="mt-10 text-center text-sm text-rose-900/70">
                  Open your gift envelope to reveal the letter and unlock the review section.
                </p>
              )}
              {reviewError && (
                <p className="mt-4 text-center text-sm text-red-700" role="alert">
                  {reviewError}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ThankYouToast visible={toastOpen} />
    </main>
  );
}
