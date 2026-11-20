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
  // Countries whose own language is not offered yet get English,
  // except Guinea (Conakry), which gets French.
  DE: "en", AT: "en", ES: "en", MX: "en", AR: "en", CO: "en", CL: "en", PE: "en",
  CN: "en", TW: "en", HK: "en", SG: "en", JP: "en",
  KE: "en", TZ: "en", UG: "en", RW: "fr", BI: "fr",
  SE: "en", NO: "en", DK: "en", FI: "en", NL: "en", IT: "en", CH: "fr",
  GN: "fr", MR: "fr",
};

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Respect an explicit locale cookie — user already chose their language
  const hasLocaleCookie = req.cookies.has("NEXT_LOCALE");

  if (pathname === "/" && !hasLocaleCookie) {
    // x-client-country is set by luvlab.io, which proxies /manjak here and
    // knows the visitor's own country.
    const country =
      (req.headers.get("x-client-country") || null) ??
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
  // "/" is listed on its own: with a basePath the pattern below does not match the root
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)" ],
};
