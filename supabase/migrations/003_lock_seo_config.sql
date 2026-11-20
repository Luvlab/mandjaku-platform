-- NOT YET APPLIED to the live LUVLAB project (as of 2026-11-20). Run this in the Supabase SQL editor.
-- manjak_seo_config had a policy "anon_write" (FOR ALL, USING true) that let any
-- visitor change or delete the search engine texts with the public key.
-- Reading stays public. Writing now goes through /api/admin/seo with the
-- service role key (SUPABASE_SERVICE_ROLE_KEY on the server).
DROP POLICY IF EXISTS "anon_write" ON public.manjak_seo_config;
