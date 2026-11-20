-- NOT YET APPLIED (as of 2026-11-20). Run in the Supabase SQL editor of the LUVLAB project.
-- Replaces 003: it also closes the open write rule on manjak_seo_config.
--
-- Administrators are kept in the database, never in this public repository.
-- After running this file, add the people by hand in the SQL editor:
--   insert into public.manjak_admins (email, name, role, country) values
--     ('<address>', '<name>', 'superadmin', null),   -- no country limit
--     ('<address>', '<name>', 'editor', 'FR');       -- sign-in from France only

create table if not exists public.manjak_admins (
  email text primary key,
  name text,
  role text not null default 'editor' check (role in ('superadmin','editor')),
  country text,                       -- ISO code if sign-in is limited to one country, else null
  created_at timestamptz not null default now()
);
alter table public.manjak_admins enable row level security;
-- No policies on purpose: the public and signed-in keys can neither read nor write the list.
revoke all on public.manjak_admins from anon, authenticated;

-- Role of the signed-in user, or null.
create or replace function public.manjak_my_role()
returns text language sql stable security definer set search_path = public as $$
  select role from public.manjak_admins
  where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''));
$$;

-- Sign-in gate: is this address an administrator, and is it limited to a country?
-- Returns no row for unknown addresses. Reveals nothing but yes/no for one address.
create or replace function public.manjak_admin_gate(p_email text)
returns table (country text) language sql stable security definer set search_path = public as $$
  select a.country from public.manjak_admins a where lower(a.email) = lower(trim(p_email));
$$;

grant execute on function public.manjak_my_role() to anon, authenticated;
grant execute on function public.manjak_admin_gate(text) to anon, authenticated;

-- Search engine texts: everyone reads, only administrators write.
drop policy if exists "anon_write" on public.manjak_seo_config;
drop policy if exists "admin_write" on public.manjak_seo_config;
create policy "admin_write" on public.manjak_seo_config for all
  using (public.manjak_my_role() in ('superadmin','editor'))
  with check (public.manjak_my_role() in ('superadmin','editor'));
