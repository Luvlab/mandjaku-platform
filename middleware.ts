/**
 * Next.js middleware — runs on the Edge before every request.
 *
 * Two responsibilities:
 *  1. IP / geo-based locale selection: when a visitor hits "/" we read
 *     Vercel's x-vercel-ip-country header and redirect them to the best-
 *     matching locale (e.g. GW → /pt, SN → /fr, GB → /en).
 *  2. next-intl routing: all other locale-prefix work (strip/add prefix,
 *     Accept-Language fallback, canonical redirects) is delegated to the
 *     next-intl middleware.
 */

import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

// ── Supported locales (mirrors i18n/routing.ts) ───────────────────────────
const LOCALES = ["fr", "en", "pt", "de", "es", "zh", "ja", "sw", "ff", "wo"] as const;
type Locale = (typeof LOCALES)[number];

const DEFAULT_LOCALE: Locale = "fr";

// ── Country → locale map ──────────────────────────────────────────────────
// Priority given to West African / Lusophone countries where the Manjak
// diaspora is most concentrated.
const COUNTRY_LOCALE: Record<string, Locale> = {
  // Guinea-Bissau (Manjak origin country) → Portuguese
  GW: "pt",
  // Lusophone Africa & Brazil
  PT: "pt", AO: "pt", MZ: "pt", CV: "pt", ST: "pt", BR: "pt", TL: "pt",
  // French-speaking (France + West Africa)
  FR: "fr", BE: "fr", LU: "fr", CH: "fr",  // CH also has DE, but fr is safe
  SN: "fr", ML: "fr", CI: "fr", BF: "fr", BJ: "fr",
  TG: "fr", NE: "fr", CM: "fr", GA: "fr", CG: "fr", CD: "fr",
  MG: "fr", DJ: "fr", KM: "fr",
  // Maghreb → French (most commonly accessed language online)
  DZ: "fr", MA: "fr", TN: "fr",
  // English-speaking
  GB: "en", US: "en", CA: "en", AU: "en", NZ: "en", IE: "en",
  NG: "en", GH: "en", SL: "en", LR: "en", GM: "en",
  ZA: "en", ZW: "en", ZM: "en", MW: "en", BW: "en",
  // German
  DE: "de", AT: "de",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  VE: "es", EC: "es", BO: "es", PY: "es", UY: "es",
  CU: "es", DO: "es", GT: "es", HN: "es", SV: "es", NI: "es",
  CR: "es", PA: "es",
  // Chinese
  CN: "zh", TW: "zh", HK: "zh", MO: "zh", SG: "zh",
  // Japanese
  JP: "ja",
  // Swahili (East Africa)
  KE: "sw", TZ: "sw", UG: "sw", RW: "sw", BI: "sw", ET: "sw",
  // Fula / Fulah
  GN: "ff",  // Guinea (Conakry) — override fr above; Fula is strong here
  // Wolof — Senegal (SN already mapped to fr; wo is available but fr is safer)
  // Users can always switch manually via the locale switcher
};

/** Resolve the best locale for a given ISO 3166-1 alpha-2 country code. */
function localeForCountry(country: string | null | undefined): Locale {
  if (!country) return DEFAULT_LOCALE;
  return COUNTRY_LOCALE[country.toUpperCase()] ?? DEFAULT_LOCALE;
}

// ── next-intl middleware (handles everything except the root redirect) ─────
const intlMiddleware = createMiddleware(routing);

// ── Main middleware ────────────────────────────────────────────────────────
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_vercel") ||
    /\.[a-z]+$/i.test(pathname)   // e.g. .svg, .png, .ico, .woff2
  ) {
    return NextResponse.next();
  }

  // ── Root path: geo-detect and redirect to locale ──────────────────────
  if (pathname === "/") {
    // Vercel injects x-vercel-ip-country automatically in production.
    // Cloudflare uses cf-ipcountry as a fallback.
    const country =
      request.headers.get("x-vercel-ip-country") ??
      request.headers.get("cf-ipcountry");

    const locale = localeForCountry(country);
    const target = new URL(`/${locale}`, request.url);
    // Preserve any query params (e.g. ?tab=alphabet)
    target.search = request.nextUrl.search;

    return NextResponse.redirect(target, { status: 307 });
  }

  // ── Everything else: delegate to next-intl ────────────────────────────
  return intlMiddleware(request);
}

// ── Matcher ───────────────────────────────────────────────────────────────
// Run on all paths except Next.js internals, Vercel internals, and API routes.
export const config = {
  matcher: [
    // Match root and all locale-prefixed paths
    "/",
    "/(fr|en|pt|de|es|zh|ja|sw|ff|wo)/:path*",
    // Match everything that isn't a file or Next.js internal
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
