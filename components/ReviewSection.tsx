"use client";

import { REVIEW_CHOICE_OPTIONS } from "@/lib/reviewOptions";
import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";

type Props = {
  userName: string;
  reviewChoice: string;
  reviewText: string;
  onChoiceChange: (v: string) => void;
  onReviewChange: (v: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  submitted: boolean;
};

export function ReviewSection({
  userName,
  reviewChoice,
  reviewText,
  onChoiceChange,
  onReviewChange,
  onSubmit,
  submitting,
  submitted,
}: Props) {
  const canSubmit =
    Boolean(reviewChoice.trim()) && Boolean(reviewText.trim()) && !submitting && !submitted;

  if (submitted) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-14 w-full max-w-lg rounded-3xl border border-emerald-200/90 bg-emerald-50/50 p-8 text-center shadow-glass backdrop-blur-xl"
      >
        <p className="font-serif text-xl font-semibold text-emerald-900">Thank you!</p>
        <p className="mt-2 text-emerald-800">
          Your review is saved. You can leave this page or use Copy / Share on the card anytime.
        </p>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45 }}
      className="mt-14 w-full max-w-lg rounded-3xl border border-pink-200/80 bg-white/35 p-8 shadow-glass backdrop-blur-xl"
    >
      <h3 className="font-serif text-2xl font-semibold text-slate-900">Developer Feedback</h3>
      <p className="mt-2 text-slate-600">
        Did this make you smile? Please leave a quick review before you go — it means a lot!
      </p>
      <p className="mt-1 text-sm text-slate-500">
        We&apos;ll attach your name:{" "}
        <span className="font-medium text-slate-700">{userName || "—"}</span>
      </p>

      <label htmlFor="review-mood" className="mt-6 block text-sm font-medium text-slate-700">
        How did this feel? <span className="text-rose-600">*</span>
      </label>
      <select
        id="review-mood"
        value={reviewChoice}
        onChange={(e) => onChoiceChange(e.target.value)}
        className="mt-2 w-full cursor-pointer rounded-2xl border-2 border-pink-200/90 bg-white/70 px-4 py-3 text-slate-800 shadow-inner outline-none transition focus:border-blush-deep focus:ring-2 focus:ring-blush-deep/30"
      >
        {REVIEW_CHOICE_OPTIONS.map((opt) => (
          <option key={opt.label + opt.value} value={opt.value} disabled={opt.value === ""}>
            {opt.label}
          </option>
        ))}
      </select>

      <label htmlFor="review" className="mt-5 block text-sm font-medium text-slate-700">
        Your message <span className="text-rose-600">*</span>
      </label>
      <textarea
        id="review"
        rows={4}
        value={reviewText}
        onChange={(e) => onReviewChange(e.target.value)}
        placeholder="Share what you loved or what we could improve…"
        className="mt-2 w-full resize-y rounded-2xl border-2 border-pink-200/90 bg-white/60 px-4 py-3 text-slate-800 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-blush-deep focus:ring-2 focus:ring-blush-deep/30"
      />

      <button
        type="button"
        onClick={onSubmit}
        disabled={!canSubmit}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 px-8 py-3 font-medium text-white shadow-lg shadow-pink-300/50 transition hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Heart className="h-5 w-5 fill-white/30" aria-hidden />
            Send Love
          </>
        )}
      </button>
    </motion.section>
  );
}
