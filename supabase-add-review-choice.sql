-- Run once in Supabase SQL Editor if `app_reviews` already exists without `review_choice`:

alter table public.app_reviews
  add column if not exists review_choice text not null default '';
