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
CREATE POLICY "public_read_profiles" ON public.manjak_profiles FOR SELECT USING (true);
CREATE POLICY "self_write_profile" ON public.manjak_profiles FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

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
$$ LANGUAGE plpgsql SECURITY DEFINER;

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
CREATE POLICY "admin_all_ambassadors" ON public.manjak_ambassadors FOR ALL USING (true) WITH CHECK (true);

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
CREATE POLICY "admin_all_partners" ON public.manjak_partners FOR ALL USING (true) WITH CHECK (true);

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
CREATE POLICY "authed_read_posts" ON public.manjak_social_posts FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authed_write_posts" ON public.manjak_social_posts FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

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
CREATE POLICY "authed_write_templates" ON public.manjak_post_templates FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- Seed templates
INSERT INTO public.manjak_post_templates (name, post_type, content, hashtags, platforms) VALUES
  ('Mot de la semaine', 'word_of_week', '{"fr":"📖 Mot de la semaine en Mandjaku !\n\n« {mot} » — {traduction}\n\nPrononciation : {prononc}\n\nApprenez la langue Mandjaku gratuitement sur mandjaku.com 🌍","en":"📖 Mandjaku word of the week!\n\n« {word} » — {translation}\n\nPronunciation: {pronunc}\n\nLearn Mandjaku for free at mandjaku.com 🌍","pt":"📖 Palavra Mandjaku da semana!\n\n« {palavra} » — {tradução}\n\nPronúncia: {pronunc}\n\nAprenda Mandjaku gratuitamente em mandjaku.com 🌍"}', '{"fr":["#mandjaku","#motdelasemaine","#langueafricaine","#guinéebissau","#manjak"],"en":["#mandjaku","#wordoftheweek","#africanlanguage","#guineabissau"],"pt":["#mandjaku","#palavradasemana","#língua","#guinébissau"]}', ARRAY['instagram','twitter','facebook']),
  ('Fait culturel', 'cultural_fact', '{"fr":"🌍 Le saviez-vous ?\n\n{fait}\n\nLa culture Mandjaku est riche et millénaire. Découvrez-en plus sur mandjaku.com 🏺","en":"🌍 Did you know?\n\n{fact}\n\nMandjaku culture is ancient and rich. Discover more at mandjaku.com 🏺","pt":"🌍 Você sabia?\n\n{fato}\n\nA cultura Mandjaku é rica e milenar. Descubra mais em mandjaku.com 🏺"}', '{"fr":["#mandjaku","#culturafricaine","#guinéebissau","#histoire"],"en":["#mandjaku","#africanculture","#guineabissau","#history"]}', ARRAY['instagram','facebook','twitter']),
  ('Nouvelle leçon', 'lesson_promo', '{"fr":"📚 Nouvelle leçon disponible !\n\n{titre_leçon}\n\nApprenez le Mandjaku gratuitement — quiz, alphabet, vocabulaire.\n➡️ mandjaku.com","en":"📚 New lesson available!\n\n{lesson_title}\n\nLearn Mandjaku for free — quizzes, alphabet, vocabulary.\n➡️ mandjaku.com"}', '{"fr":["#mandjaku","#apprendre","#langue","#éducation"],"en":["#mandjaku","#learn","#language","#education"]}', ARRAY['instagram','twitter','whatsapp']),
  ('Événement communautaire', 'event', '{"fr":"📢 Événement Mandjaku !\n\n{titre}\n📅 {date}\n📍 {lieu}\n\nJoignez-vous à nous ! {lien}","en":"📢 Mandjaku Event!\n\n{title}\n📅 {date}\n📍 {location}\n\nJoin us! {link}"}', '{"fr":["#mandjaku","#événement","#communauté","#guinéebissau"],"en":["#mandjaku","#event","#community"]}', ARRAY['instagram','facebook','whatsapp'])
ON CONFLICT DO NOTHING;
