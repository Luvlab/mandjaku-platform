import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client with the service role key.
 *
 * Writes to admin-managed tables go through this client, from API routes that
 * have already checked who is asking. The public (anon) key can only read.
 * Returns null when SUPABASE_SERVICE_ROLE_KEY is not set, so callers can
 * answer with a clear error instead of failing silently.
 */
export function getAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
