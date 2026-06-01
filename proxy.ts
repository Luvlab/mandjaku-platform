import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const GEO_LOCALE: Record<string, string> = {
  GW: "pt", PT: "pt", BR: "pt", AO: "pt", MZ: "pt", CV: "pt", ST: "pt",
  SN: "fr", FR: "fr", CI: "fr", CM: "fr", ML: "fr", GN: "fr", BF: "fr",
  TG: "fr", BJ: "fr", GA: "fr", CG: "fr", MG: "fr", DJ: "fr",
  GM: "en", GB: "en", US: "en", CA: "en", AU: "en", NG: "en", GH: "en",
  ZA: "en", SL: "en", LR: "en",
  DE: "de", AT: "de",
  ES: "es", MX: "es", AR: "es", CO: "es", PE: "es", VE: "es",
  CN: "zh", TW: "zh", HK: "zh",
  JP: "ja",
  TZ: "sw", KE: "sw", UG: "sw", RW: "sw",
};

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocaleCookie = req.cookies.has("NEXT_LOCALE");

  if (pathname === "/" && !hasLocaleCookie) {
    const country = req.headers.get("x-vercel-ip-country") ?? "";
    const geoLocale = GEO_LOCALE[country];
    if (geoLocale) {
      const url = req.nextUrl.clone();
      url.pathname = `/${geoLocale}`;
      const res = NextResponse.redirect(url);
      res.cookies.set("NEXT_LOCALE", geoLocale, { maxAge: 60 * 60 * 24 * 30, path: "/" });
      return res;
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)" ],
};
