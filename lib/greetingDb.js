import { supabase } from "./supabaseClient";

/**
 * Persists a generated greeting to Supabase.
 * @param {{ userName: string; message: string }} row
 * @returns {Promise<{ error: Error | null }>}
 */
export async function insertGeneratedGreeting({ userName, message }) {
  const { error } = await supabase.from("generated_greetings").insert({
    user_name: userName,
    message,
  });
  return { error: error ? new Error(error.message) : null };
}

/**
 * Saves developer feedback to Supabase.
 * @param {{ userName: string; reviewText: string; reviewChoice: string }} row
 * @returns {Promise<{ error: Error | null }>}
 */
export async function insertAppReview({ userName, reviewText, reviewChoice }) {
  const { error } = await supabase.from("app_reviews").insert({
    user_name: userName,
    review_text: reviewText,
    review_choice: reviewChoice,
  });
  return { error: error ? new Error(error.message) : null };
}
