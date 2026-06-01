import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAdminEntry, checkCountryAccess } from "@/lib/admin-config";
import { supabaseConfigured } from "@/lib/supabase-browser";

export async function POST(req: NextRequest) {
  if (!supabaseConfigured) {
    return NextResponse.json(
      { error: "Supabase non configuré. Utilisez le mot de passe d'urgence." },
      { status: 503 },
    );
  }

  let email: string;
  let redirectTo: string | undefined;

  try {
    const body = await req.json();
    email = body.email ?? "";
    redirectTo = body.redirectTo;
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const normalised = email.trim().toLowerCase();
  if (!normalised) {
    return NextResponse.json({ error: "Email requis." }, { status: 400 });
  }

  // ── Whitelist check ────────────────────────────────────────────────────────
  const entry = getAdminEntry(normalised);
  if (!entry) {
    // Return a generic message to avoid leaking which emails are valid
    return NextResponse.json(
      { error: "Si cette adresse est autorisée, vous recevrez un email sous peu." },
      { status: 200 }, // 200 to avoid enumeration attacks
    );
  }

  // ── IP / country check ─────────────────────────────────────────────────────
  // Vercel injects x-vercel-ip-country; Cloudflare injects cf-ipcountry
  const ipCountry =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    null;

  const countryError = checkCountryAccess(normalised, ipCountry);
  if (countryError) {
    return NextResponse.json({ error: countryError }, { status: 403 });
  }

  // ── Send OTP ───────────────────────────────────────────────────────────────
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (req.headers.get("origin") || "https://manjak-app.vercel.app");

  const callbackUrl = `${siteUrl}/auth/callback?next=${encodeURIComponent(
    redirectTo ?? "/fr/admin",
  )}`;

  const { error } = await supabase.auth.signInWithOtp({
    email: normalised,
    options: {
      emailRedirectTo: callbackUrl,
      shouldCreateUser: false, // only works for existing accounts
    },
  });

  if (error) {
    console.error("[magic-link] Supabase OTP error:", error.message);
    // Don't leak internal errors — return a generic success to prevent enumeration
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}
