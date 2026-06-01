-- Run this in your Supabase SQL editor: ajjgdxlkmkqkdimidgux

-- ── Admin users ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.manjak_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'editor',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.manjak_admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_admins" ON public.manjak_admins FOR SELECT USING (true);
CREATE POLICY "anon_write_admins" ON public.manjak_admins FOR ALL USING (true) WITH CHECK (true);

INSERT INTO public.manjak_admins (email, name, role) VALUES
  ('gordoncyrus@gmail.com', 'Gordon Cyrus', 'superadmin'),
  ('eurelie.gomis@gmail.com', 'Eurelie Gomis', 'editor')
ON CONFLICT (email) DO NOTHING;

-- ── User progress ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.manjak_user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  unit_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  stars INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_id, lesson_id)
);
ALTER TABLE public.manjak_user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "open_progress" ON public.manjak_user_progress FOR ALL USING (true) WITH CHECK (true);

-- ── Marketplace merch ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.manjak_merch (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price_eur NUMERIC(10,2) NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'clothing',
  tags TEXT[],
  printful_product_id TEXT,
  buy_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.manjak_merch ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_merch" ON public.manjak_merch FOR SELECT USING (active = true);
CREATE POLICY "anon_write_merch" ON public.manjak_merch FOR ALL USING (true) WITH CHECK (true);

INSERT INTO public.manjak_merch (title, description, price_eur, category, tags) VALUES
  ('T-shirt Mandjaku', 'T-shirt imprimé avec l''alphabet Manjak — 100% coton bio', 29.90, 'clothing', ARRAY['t-shirt','alphabet','guinée-bissau']),
  ('Hoodie Kabu lëp Manjak', 'Sweat à capuche avec le proverbe Manjak brodé', 54.90, 'clothing', ARRAY['hoodie','proverbe']),
  ('Tote Bag Kente', 'Tote bag aux couleurs du kente — vert, jaune, rouge', 19.90, 'accessories', ARRAY['tote','kente']),
  ('Poster Alphabet A2', 'Poster A2 de l''alphabet Mandjaku complet avec prononciations', 24.90, 'art', ARRAY['poster','alphabet','éducation']),
  ('Mug Mandjaku', 'Mug avec les 24 lettres et leur prononciation', 14.90, 'accessories', ARRAY['mug','alphabet']),
  ('Casquette Manjak', 'Casquette brodée logo Mandjaku — 6 couleurs', 34.90, 'clothing', ARRAY['casquette','logo']),
  ('Bracelet Kente', 'Bracelet artisanal aux couleurs de la Guinée-Bissau', 12.90, 'accessories', ARRAY['bracelet','kente','artisanat']),
  ('Carnet Alphabet', 'Carnet A5 avec l''alphabet illustré — idéal pour apprendre', 9.90, 'stationery', ARRAY['carnet','éducation'])
ON CONFLICT DO NOTHING;

-- ── Community classifieds ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.manjak_classifieds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10,2),
  price_negotiable BOOLEAN DEFAULT false,
  currency TEXT DEFAULT 'EUR',
  location TEXT,
  country TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  contact_name TEXT,
  image_urls TEXT[],
  tags TEXT[],
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '60 days'),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.manjak_classifieds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_classifieds" ON public.manjak_classifieds FOR SELECT USING (active = true);
CREATE POLICY "anon_write_classifieds" ON public.manjak_classifieds FOR ALL USING (true) WITH CHECK (true);

INSERT INTO public.manjak_classifieds (title, description, category, price, location, country, contact_email, featured) VALUES
  ('Cours de Mandjaku en ligne', 'Cours de langue Mandjaku via Zoom, tous niveaux. Méthode communicative avec exercices et quiz.', 'cours', 30.00, 'Paris', 'FR', 'info@luvlab.io', true),
  ('Tissus traditionnels Manjak — Lisbonne', 'Tissus authentiques importés directement de Guinée-Bissau. Plusieurs motifs disponibles.', 'artisanat', 45.00, 'Lisbonne', 'PT', 'info@luvlab.io', true),
  ('Musicien Manjak disponible pour événements', 'Percussions traditionnelles Manjak pour vos événements culturels, mariages, expositions.', 'services', NULL, 'Paris', 'FR', 'info@luvlab.io', false),
  ('Association Mandjaku Lisbonne', 'Rejoignez notre association pour les événements culturels Manjak au Portugal — réunions mensuelles.', 'communauté', NULL, 'Lisbonne', 'PT', 'info@luvlab.io', true)
ON CONFLICT DO NOTHING;

-- ── Alphabet symbols (SVG paths) ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.manjak_symbols (
  id TEXT PRIMARY KEY,
  latin TEXT NOT NULL,
  svg_path TEXT,
  svg_viewbox TEXT DEFAULT '0 0 100 100',
  category TEXT,
  pronunciation TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.manjak_symbols ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_symbols" ON public.manjak_symbols FOR SELECT USING (true);
CREATE POLICY "anon_write_symbols" ON public.manjak_symbols FOR ALL USING (true) WITH CHECK (true);
