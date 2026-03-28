/** Required dropdown — value saved to Supabase `review_choice`. */
export const REVIEW_CHOICE_OPTIONS = [
  { value: "", label: "Choose how you felt…" },
  { value: "Absolutely loved it!", label: "Absolutely loved it! 💕" },
  { value: "So cute & heartwarming", label: "So cute & heartwarming" },
  { value: "Made my whole day", label: "Made my whole day" },
  { value: "Beautiful & cozy vibes", label: "Beautiful & cozy vibes" },
  { value: "I smiled the whole time", label: "I smiled the whole time" },
  { value: "Want more like this!", label: "Want more like this!" },
] as const;
