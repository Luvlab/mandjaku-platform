import { createClient } from "@supabase/supabase-js";

// Env vars may be absent during Next.js static-page-data collection at build
// time. Fall back to placeholder values so module evaluation doesn't throw —
// any actual network calls at runtime will use the real injected values.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-anon-key";

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
