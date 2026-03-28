/**
 * Each greeting is ~25–35 words total. Random pick via `pickRandomMessage`.
 */
export const HEARTWARMING_MESSAGES: string[] = [
  `You are like morning light—soft, warm, impossible to ignore. Let this note be a tiny hug: rest, breathe, know you matter. You deserve kindness today, and I’m cheering for you so loudly!`,

  `Darling soul, you are not “too much.” You are magic—kind, brave, still trying. Drink something cozy, smile once, remember joy is allowed. The world is prettier with you in it, exactly as you are.`,

  `Hey you—yes, you! Permission to rest without guilt and dream without apologizing. You’ve survived hard days; that matters. May something small delight you today. You are loved exactly as you are.`,

  `Sweet human, imagine ribbon and good intentions beside your tea. Talk to yourself like someone you’re proud of. May laughter surprise you. You are valued—not for perfect performance, but for being real.`,

  `You carry warmth like a lantern—steady glow, honest heart. If doubt whispers, answer: you belong here. May peace visit you today, even briefly. Sending sparkles and affection, beautiful you.`,

  `Precious one, I folded good thoughts into this note—fragile, sincere, meant to last. Celebrate one tiny win today. You don’t have to be perfect to be precious. Big love from my heart to yours!`,

  `Hello, starlight—this is a gift on an ordinary day, just because you exist. Be gentle; try again tomorrow without shame. You’re cherished for who you are when no one is clapping. Carry that truth softly.`,

  `Sweetness, you are spring after winter—promise, color, miracles ahead. Softness is strength; you don’t earn rest like a paycheck. Sip something lovely, look at the sky, keep blooming on your timeline.`,

  `Darling bean, may your playlist feel perfect and your heart feel lighter. You’re still here, still capable of wonder—hero stuff. Let kindness land like confetti. You’re amazing and worth celebrating today.`,

  `If happiness were a garden, you’d be why the flowers bloomed. Don’t shrink; the world needs your voice. Small steps count as courage. This note cheers for you—stay soft, stay brave, always.`,

  `Sweet friend, you’re a miracle in motion—breath by breath, even on tired days. May a melody feel like a hug today. Protect your peace. You deserve love that never asks you to perform perfection.`,

  `Hello, lovely—this note is confetti pressed flat: festive, yours. You bring tenderness everywhere; that’s magic. Steal one minute of stillness. Good things can find you—you’re not disqualified from joy.`,

  `You’re sunshine in a person—warm, bright, hard to ignore. Let this letter be fresh air for a crowded heart. You’re loved and capable now—not someday. Big hugs, hope, and sparkles always!`,

  `Read this slowly: you are seen, valued, wrapped in soft wishes. Celebrate one tiny win; getting through counts. You’re not alone in ache or hope. Stay tender—cherished today and on ordinary days too.`,

  `Precious heart, you’re not behind—you’re on your path, blooming in your season. You deserve love through ordinary days. May today bring a gentle moment like a hug. You’re enough; keep going gently.`,

  `Lovely soul, this whispers one truth: you matter, especially when you forget. Your laugh makes rooms safer. Rest is allowed; dreams are allowed. Sending glitter and courage—you’re cherished beyond measure.`,

  `Darling star, you’re soft light in a loud world—steady warmth, real humanity. If your heart feels heavy, keep this paper hug. May something lovely surprise you. You’re a miracle worth celebrating!`,

  `Sweet human, a tiny ceremony: ribbon, your drink, and “you matter.” Let something silly delight you—joy isn’t a reward for productivity. You’re brave enough to feel. Grateful you exist—truly.`,

  `Hey you—smile in the mirror, rest without guilt, dream in glitter. Life is messy; you still choose care—that’s grace. Breathe: in, out. You’re cherished as you are—pastel wishes and warm hugs!`,

  `Darling one, you may want beauty, peace, laughter—and you may receive them without apologizing. Your open heart is breathtaking. You matter. Stay brave: the world is prettier with you in it, messy and all.`,
];

export function pickRandomMessage(): string {
  const i = Math.floor(Math.random() * HEARTWARMING_MESSAGES.length);
  return HEARTWARMING_MESSAGES[i];
}
