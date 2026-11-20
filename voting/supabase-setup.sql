-- Run in Supabase SQL Editor. This permits public anonymous ballot submission.
-- Caveat: one-vote-per-token only, not trusted user identity.
create table if not exists public.logo_votes (
  id bigint generated always as identity primary key,
  option_id smallint not null check (option_id between 1 and 6),
  voter_token text not null unique check (length(voter_token) between 8 and 128),
  created_at timestamptz not null default now()
);
alter table public.logo_votes enable row level security;
revoke all on public.logo_votes from anon, authenticated;
grant insert on public.logo_votes to anon, authenticated;
create policy "allow anonymous vote" on public.logo_votes for insert to anon, authenticated with check (option_id between 1 and 6 and length(voter_token) between 8 and 128);
-- No SELECT policy: public visitors cannot read ballots or aggregate results.
