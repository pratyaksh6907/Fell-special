-- Run this in Supabase: SQL Editor → New query → Paste → Run
-- (Creates tables + RLS so the browser anon key can INSERT)

-- Tables (match lib/greetingDb.js column names)
create table if not exists public.generated_greetings (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists public.app_reviews (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  review_text text not null,
  review_choice text not null default '',
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.generated_greetings enable row level security;
alter table public.app_reviews enable row level security;

-- Allow anonymous users (your Next.js app in the browser) to insert rows
drop policy if exists "Allow anon insert greetings" on public.generated_greetings;
create policy "Allow anon insert greetings"
  on public.generated_greetings
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anon insert reviews" on public.app_reviews;
create policy "Allow anon insert reviews"
  on public.app_reviews
  for insert
  to anon
  with check (true);

-- Optional: let you read data in the Dashboard Table Editor as authenticated user
-- (Uncomment if you want authenticated users to SELECT; anon still cannot read without a policy.)
-- create policy "Allow authenticated read greetings" on public.generated_greetings
--   for select to authenticated using (true);
-- create policy "Allow authenticated read reviews" on public.app_reviews
--   for select to authenticated using (true);
