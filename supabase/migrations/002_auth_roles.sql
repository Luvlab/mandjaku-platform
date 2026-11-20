-- Run in Supabase SQL editor after 001_manjak_tables.sql
-- Project: ajjgdxlkmkqkdimidgux

-- ── User profiles (extends auth.users) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.manjak_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',   -- superadmin | editor | ambassador | partner | user
  locale TEXT DEFAULT 'fr',
  bio TEXT,
  country TEXT,
  city TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.manjak_profiles ENABLE ROW LEVEL SECURITY;
-- A profile holds a mail address, so it is not public: a user reads their own
-- row and administrators read all rows.
CREATE POLICY "self_read_profile" ON public.manjak_profiles FOR SELECT USING (auth.uid() = id);

-- Is the caller a superadmin or editor? SECURITY DEFINER so the check itself
-- is not blocked by row level security.
CREATE OR REPLACE FUNCTION public.manjak_is_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.manjak_profiles
    WHERE id = auth.uid() AND role IN ('superadmin', 'editor')
  );
$$;

-- A user may edit their own profile. Administrators may edit any profile.
-- Nobody inserts or deletes profiles with the public key: the signup trigger
-- below creates the row, and deleting the auth user removes it.
CREATE POLICY "self_update_profile" ON public.manjak_profiles FOR UPDATE
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "admin_read_profiles" ON public.manjak_profiles FOR SELECT USING (public.manjak_is_admin());
CREATE POLICY "admin_update_profiles" ON public.manjak_profiles FOR UPDATE
  USING (public.manjak_is_admin()) WITH CHECK (public.manjak_is_admin());

-- The role lives in the same row as the profile, so guard it separately:
-- only an administrator (or the service role / SQL editor) may change a role.
-- Without this a user could set their own role to superadmin.
CREATE OR REPLACE FUNCTION public.manjak_protect_role()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role
     AND auth.uid() IS NOT NULL
     AND NOT public.manjak_is_admin() THEN
    RAISE EXCEPTION 'Only an administrator can change a role';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS manjak_protect_role ON public.manjak_profiles;
CREATE TRIGGER manjak_protect_role
  BEFORE UPDATE ON public.manjak_profiles
  FOR EACH ROW EXECUTE FUNCTION public.manjak_protect_role();

-- Admin-managed tables from 001: writing for administrators only.
CREATE POLICY "admin_write_merch" ON public.manjak_merch FOR ALL
  USING (public.manjak_is_admin()) WITH CHECK (public.manjak_is_admin());
CREATE POLICY "admin_write_classifieds" ON public.manjak_classifieds FOR ALL
  USING (public.manjak_is_admin()) WITH CHECK (public.manjak_is_admin());
CREATE POLICY "admin_write_symbols" ON public.manjak_symbols FOR ALL
  USING (public.manjak_is_admin()) WITH CHECK (public.manjak_is_admin());

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  _role TEXT := 'user';
BEGIN
  -- Check if this email is in manjak_admins and inherit role
  SELECT role INTO _role FROM public.manjak_admins WHERE email = NEW.email;
  IF _role IS NULL THEN _role := 'user'; END IF;

  INSERT INTO public.manjak_profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url',
    _role
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── Ambassador profiles ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.manjak_ambassadors (
  id UUID PRIMARY KEY REFERENCES public.manjak_profiles(id) ON DELETE CASCADE,
  reach INTEGER DEFAULT 0,
  platforms TEXT[],
  languages TEXT[],
  approved BOOLEAN DEFAULT false,
  approved_by UUID,
  approved_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.manjak_ambassadors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_ambassadors" ON public.manjak_ambassadors FOR SELECT USING (approved = true);
CREATE POLICY "admin_all_ambassadors" ON public.manjak_ambassadors FOR ALL USING (public.manjak_is_admin()) WITH CHECK (public.manjak_is_admin());

-- ── Partner profiles ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.manjak_partners (
  id UUID PRIMARY KEY REFERENCES public.manjak_profiles(id) ON DELETE CASCADE,
  company_name TEXT,
  website TEXT,
  category TEXT,   -- school | media | ngo | business | cultural
  description TEXT,
  logo_url TEXT,
  approved BOOLEAN DEFAULT false,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.manjak_partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_partners" ON public.manjak_partners FOR SELECT USING (approved = true);
CREATE POLICY "admin_all_partners" ON public.manjak_partners FOR ALL USING (public.manjak_is_admin()) WITH CHECK (public.manjak_is_admin());

-- ── Social media posts ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.manjak_social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.manjak_profiles(id),
  post_type TEXT DEFAULT 'general',   -- general | word_of_week | cultural_fact | lesson_promo | event
  content JSONB NOT NULL DEFAULT '{}', -- {fr:"...", en:"...", pt:"..."}
  platforms TEXT[] DEFAULT '{}',       -- instagram | twitter | facebook | whatsapp | tiktok | linkedin
  hashtags JSONB DEFAULT '{}',         -- {fr:["#tag1"], en:["#tag2"]}
  image_url TEXT,
  status TEXT DEFAULT 'draft',         -- draft | scheduled | published
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.manjak_social_posts ENABLE ROW LEVEL SECURITY;
-- Only roles that may post content (administrators, ambassadors, partners).
CREATE OR REPLACE FUNCTION public.manjak_can_post()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.manjak_profiles
    WHERE id = auth.uid() AND role IN ('superadmin', 'editor', 'ambassador', 'partner')
  );
$$;
CREATE POLICY "poster_read_posts" ON public.manjak_social_posts FOR SELECT USING (public.manjak_can_post());
CREATE POLICY "poster_write_posts" ON public.manjak_social_posts FOR ALL USING (public.manjak_can_post()) WITH CHECK (public.manjak_can_post());

-- ── Content templates ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.manjak_post_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  post_type TEXT DEFAULT 'general',
  content JSONB NOT NULL DEFAULT '{}',
  hashtags JSONB DEFAULT '{}',
  platforms TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES public.manjak_profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.manjak_post_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_templates" ON public.manjak_post_templates FOR SELECT USING (true);
CREATE POLICY "admin_write_templates" ON public.manjak_post_templates FOR ALL USING (public.manjak_is_admin()) WITH CHECK (public.manjak_is_admin());

-- Seed templates
INSERT INTO public.manjak_post_templates (name, post_type, content, hashtags, platforms) VALUES
  ('Mot de la semaine', 'word_of_week', '{"fr":"📖 Mot de la semaine en Mandjaku !\n\n« {mot} » — {traduction}\n\nPrononciation : {prononc}\n\nApprenez la langue Mandjaku gratuitement sur mandjaku.com 🌍","en":"📖 Mandjaku word of the week!\n\n« {word} » — {translation}\n\nPronunciation: {pronunc}\n\nLearn Mandjaku for free at mandjaku.com 🌍","pt":"📖 Palavra Mandjaku da semana!\n\n« {palavra} » — {tradução}\n\nPronúncia: {pronunc}\n\nAprenda Mandjaku gratuitamente em mandjaku.com 🌍"}', '{"fr":["#mandjaku","#motdelasemaine","#langueafricaine","#guinéebissau","#manjak"],"en":["#mandjaku","#wordoftheweek","#africanlanguage","#guineabissau"],"pt":["#mandjaku","#palavradasemana","#língua","#guinébissau"]}', ARRAY['instagram','twitter','facebook']),
  ('Fait culturel', 'cultural_fact', '{"fr":"🌍 Le saviez-vous ?\n\n{fait}\n\nLa culture Mandjaku est riche et millénaire. Découvrez-en plus sur mandjaku.com 🏺","en":"🌍 Did you know?\n\n{fact}\n\nMandjaku culture is ancient and rich. Discover more at mandjaku.com 🏺","pt":"🌍 Você sabia?\n\n{fato}\n\nA cultura Mandjaku é rica e milenar. Descubra mais em mandjaku.com 🏺"}', '{"fr":["#mandjaku","#culturafricaine","#guinéebissau","#histoire"],"en":["#mandjaku","#africanculture","#guineabissau","#history"]}', ARRAY['instagram','facebook','twitter']),
  ('Nouvelle leçon', 'lesson_promo', '{"fr":"📚 Nouvelle leçon disponible !\n\n{titre_leçon}\n\nApprenez le Mandjaku gratuitement — quiz, alphabet, vocabulaire.\n➡️ mandjaku.com","en":"📚 New lesson available!\n\n{lesson_title}\n\nLearn Mandjaku for free — quizzes, alphabet, vocabulary.\n➡️ mandjaku.com"}', '{"fr":["#mandjaku","#apprendre","#langue","#éducation"],"en":["#mandjaku","#learn","#language","#education"]}', ARRAY['instagram','twitter','whatsapp']),
  ('Événement communautaire', 'event', '{"fr":"📢 Événement Mandjaku !\n\n{titre}\n📅 {date}\n📍 {lieu}\n\nJoignez-vous à nous ! {lien}","en":"📢 Mandjaku Event!\n\n{title}\n📅 {date}\n📍 {location}\n\nJoin us! {link}"}', '{"fr":["#mandjaku","#événement","#communauté","#guinéebissau"],"en":["#mandjaku","#event","#community"]}', ARRAY['instagram','facebook','whatsapp'])
ON CONFLICT DO NOTHING;
