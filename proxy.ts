/**
 * Next.js 16 proxy (replaces middleware.ts from earlier versions).
 *
 * 1. Geo-based locale redirect on "/" — reads x-vercel-ip-country (Vercel)
 *    or cf-ipcountry (Cloudflare) and sends the visitor to the right locale.
 *    Result is cached in a NEXT_LOCALE cookie (30 days) so repeat visits
 *    skip the geo lookup and land directly.
 * 2. All other locale routing delegated to next-intl.
 */

import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

// ── Country → locale ──────────────────────────────────────────────────────
// Guinea-Bissau (GW) is the Manjak origin country — maps to Portuguese.
const GEO_LOCALE: Record<string, string> = {
  // Lusophone (Guinea-Bissau first — highest priority for this platform)
  GW: "pt", PT: "pt", BR: "pt", AO: "pt", MZ: "pt", CV: "pt", ST: "pt", TL: "pt",
  // Francophone — France + West Africa
  FR: "fr", BE: "fr", LU: "fr",
  SN: "fr", ML: "fr", CI: "fr", BF: "fr", BJ: "fr", NE: "fr",
  TG: "fr", CM: "fr", GA: "fr", CG: "fr", CD: "fr",
  MG: "fr", DJ: "fr", KM: "fr",
  DZ: "fr", MA: "fr", TN: "fr",
  // English-speaking
  GM: "en", GB: "en", US: "en", CA: "en", AU: "en", NZ: "en", IE: "en",
  NG: "en", GH: "en", SL: "en", LR: "en", ZA: "en", ZW: "en", ZM: "en",
  MW: "en", BW: "en", NA: "en",
  // German
  DE: "de", AT: "de",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  VE: "es", EC: "es", BO: "es", PY: "es", UY: "es",
  CU: "es", DO: "es", GT: "es", HN: "es", SV: "es", NI: "es", CR: "es", PA: "es",
  // Chinese
  CN: "zh", TW: "zh", HK: "zh", MO: "zh", SG: "zh",
  // Japanese
  JP: "ja",
  // Swahili — East Africa
  KE: "sw", TZ: "sw", UG: "sw", RW: "sw", BI: "sw",
  // Fula / Fulfulde — Guinea (Conakry)
  GN: "ff",
  // Wolof — Senegal is already "fr" above; wo locale available via switcher
};

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Respect an explicit locale cookie — user already chose their language
  const hasLocaleCookie = req.cookies.has("NEXT_LOCALE");

  if (pathname === "/" && !hasLocaleCookie) {
    const country =
      req.headers.get("x-vercel-ip-country") ??
      req.headers.get("cf-ipcountry") ??
      "";

    const geoLocale = GEO_LOCALE[country.toUpperCase()];
    if (geoLocale) {
      const url = req.nextUrl.clone();
      url.pathname = `/${geoLocale}`;
      // Preserve any query params (e.g. ?tab=alphabet)
      const res = NextResponse.redirect(url, { status: 307 });
      // Cache for 30 days so repeat visits skip the geo check
      res.cookies.set("NEXT_LOCALE", geoLocale, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "lax",
      });
      return res;
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)" ],
};
