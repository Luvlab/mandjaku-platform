import { withBase } from "@/lib/base-path";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { findAdmin, countryError } from "@/lib/admin-config";
import { supabaseConfigured } from "@/lib/supabase-browser";

export async function POST(req: NextRequest) {
  if (!supabaseConfigured) {
    return NextResponse.json(
      { error: "Supabase non configuré. Utilisez le mot de passe d'urgence." },
      { status: 503 },
    );
  }

  let email: string;

  try {
    const body = await req.json();
    email = body.email ?? "";
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const normalised = email.trim().toLowerCase();
  if (!normalised) {
    return NextResponse.json({ error: "Email requis." }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  // ── Administrator list check ───────────────────────────────────────────────
  const entry = await findAdmin(supabase, normalised);
  if (!entry) {
    // Same answer as for a listed address, so the list cannot be probed here
    return NextResponse.json({ allowed: false });
  }

  // ── IP / country check ─────────────────────────────────────────────────────
  // Vercel injects x-vercel-ip-country; Cloudflare injects cf-ipcountry
  const ipCountry =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    null;

  const blocked = countryError(entry, ipCountry);
  if (blocked) {
    return NextResponse.json({ error: blocked }, { status: 403 });
  }

  // The link itself is requested by the browser (see MagicLinkForm): the
  // sign-in code can only be exchanged by the browser that asked for it.
  return NextResponse.json({ allowed: true });
}
