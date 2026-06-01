import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon);

export type SeoConfig = {
  id: string;
  title: string;
  description: string;
  og_title: string | null;
  og_description: string | null;
  keywords: string[] | null;
  og_image_headline: string | null;
  og_image_sub: string | null;
  updated_at: string;
};
