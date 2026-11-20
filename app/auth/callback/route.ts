import { withBase } from "@/lib/base-path";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { findAdmin, countryError } from "@/lib/admin-config";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Only allow a path on this site, never another host ("//evil" or "@evil").
  const nextParam = searchParams.get("next") ?? "";
  const next = /^\/(?![\/\\])/.test(nextParam) ? nextParam : "/fr/admin";

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {}
          },
        },
      },
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // ── IP / country check (second gate) ──────────────────────────────────
      // Vercel injects x-vercel-ip-country; Cloudflare injects cf-ipcountry
      const ipCountry =
        request.headers.get("x-vercel-ip-country") ??
        request.headers.get("cf-ipcountry") ??
        null;

      const email = data.user.email ?? "";
      const entry = await findAdmin(supabase, email);
      const blocked = entry ? countryError(entry, ipCountry) : "Adresse email non autorisée.";

      if (blocked) {
        // Sign the user back out and redirect to an error page
        await supabase.auth.signOut();
        const errorMsg = encodeURIComponent(blocked);
        return NextResponse.redirect(
          `${origin}${withBase("/fr/admin")}?error=geo_blocked&msg=${errorMsg}`,
        );
      }

      return NextResponse.redirect(`${origin}${withBase(next)}`);
    }
  }

  return NextResponse.redirect(`${origin}${withBase("/fr")}?error=auth`);
}
