import { createBrowserClient } from "@supabase/ssr";

// Fallback placeholder — keeps the client from throwing when env vars aren't set yet.
// Auth calls will simply fail gracefully until real credentials are configured.
const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "https://placeholder.supabase.co";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON);
}

export const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co";

