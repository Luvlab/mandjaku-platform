import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /admin → /fr/admin (default locale)
      { source: "/admin", destination: "/fr/admin", permanent: false },
      // bare tab routes → SPA with locale
      { source: "/alphabet",   destination: "/fr?tab=alphabet",   permanent: false },
      { source: "/learn",      destination: "/fr?tab=learn",      permanent: false },
      { source: "/history",    destination: "/fr?tab=history",    permanent: false },
      { source: "/culture",    destination: "/fr?tab=culture",    permanent: false },
      { source: "/dictionary", destination: "/fr?tab=dictionary", permanent: false },
      { source: "/keyboard",   destination: "/fr?tab=keyboard",   permanent: false },
      { source: "/market",     destination: "/fr?tab=market",     permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
