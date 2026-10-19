-- Run this in Supabase SQL Editor. Public votes are anonymous and contain only a role category.
create table if not exists public.community_votes (
  id bigint generated always as identity primary key,
  role text not null check (role in ('student','professional','researcher','career','other')),
  created_at timestamptz not null default now()
);
alter table public.community_votes enable row level security;
-- Visitors may read aggregate-source rows and submit a vote; no update/delete permissions are granted.
create policy "Anyone can read poll votes" on public.community_votes for select to anon using (true);
create policy "Anyone can submit a poll vote" on public.community_votes for insert to anon with check (true);
grant select, insert on public.community_votes to anon;
