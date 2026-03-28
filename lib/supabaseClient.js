/**
 * Supabase browser client for Next.js (App Router).
 *
 * ENVIRONMENT VARIABLES (Vercel + local):
 * ---------------------------------------
 * Create `.env.local` in the project root (never commit real keys).
 *
 *   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
 *
 * In Vercel: Project → Settings → Environment Variables → add the same names.
 * "NEXT_PUBLIC_*" is exposed to the browser; use Row Level Security (RLS) on
 * `generated_greetings` and `app_reviews` to allow INSERT for anon role, or
 * restrict via Supabase policies as needed.
 *
 * SQL (run in Supabase SQL editor):
 * ---------------------------------
 * create table public.generated_greetings (
 *   id uuid primary key default gen_random_uuid(),
 *   user_name text not null,
 *   message text not null,
 *   created_at timestamptz default now()
 * );
 * create table public.app_reviews (
 *   id uuid primary key default gen_random_uuid(),
 *   user_name text not null,
 *   review_text text not null,
 *   review_choice text not null default '',
 *   created_at timestamptz default now()
 * );
 * -- Example RLS for public inserts (tune for production):
 * alter table public.generated_greetings enable row level security;
 * alter table public.app_reviews enable row level security;
 * create policy "Allow anon insert greetings" on public.generated_greetings
 *   for insert to anon with check (true);
 * create policy "Allow anon insert reviews" on public.app_reviews
 *   for insert to anon with check (true);
 */

import { createClient } from "@supabase/supabase-js";

// Placeholders allow `next build` / prerender without .env. Replace with real
// values in `.env.local` or Vercel — inserts will fail until you do.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

if (
  (!process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
  typeof window !== "undefined"
) {
  console.warn(
    "[supabase] Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY for live data."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
