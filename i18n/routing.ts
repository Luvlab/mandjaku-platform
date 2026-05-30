import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en", "pt", "de", "es", "zh", "ja", "sw", "ff", "wo"],
  defaultLocale: "fr",
  localePrefix: "always",
});
