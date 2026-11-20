import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // French, Portuguese, English, in that priority. The other message files
  // (de, es, zh, ja, sw, ff, wo) stay in /messages but are switched off until
  // every page is fully translated and checked in them.
  locales: ["fr", "pt", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
});
