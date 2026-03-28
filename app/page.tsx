"use client";

import { GreetingCard } from "@/components/GreetingCard";
import { ReviewSection } from "@/components/ReviewSection";
import { ThankYouToast } from "@/components/ThankYouToast";
import { insertAppReview, insertGeneratedGreeting } from "@/lib/greetingDb";
import { pickRandomMessage } from "@/lib/messages";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

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
  const [toastOpen, setToastOpen] = useState(false);
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
    setReviewError(null);
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
    <main className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center px-4 pb-24 pt-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/40 px-4 py-1 text-sm text-slate-600 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-blush-deep" aria-hidden />
          Welcome in
        </p>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Let&apos;s Make Your Day ✨
        </h1>
        <p className="mt-3 max-w-md text-slate-600">
          Your name becomes a one-of-a-kind greeting — soft, sincere, and made for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="mt-12 w-full max-w-md"
      >
        <label htmlFor="user-name" className="block text-sm font-medium text-slate-700">
          Your name
        </label>
        <input
          id="user-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex"
          className="mt-2 w-full rounded-2xl border border-white/80 bg-white/60 px-5 py-3.5 text-slate-900 shadow-inner outline-none backdrop-blur-sm transition placeholder:text-slate-400 focus:border-blush-deep focus:ring-4 focus:ring-blush-deep/25"
        />

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !name.trim()}
          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-400 via-pink-400 to-blush-deep py-4 text-lg font-semibold text-white shadow-lg shadow-pink-400/40 transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full flex-col items-center"
            >
              <GreetingCard
                name={displayName}
                message={message}
                reviewComplete={reviewSubmitted}
              />
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
