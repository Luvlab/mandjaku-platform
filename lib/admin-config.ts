/**
 * Admin access configuration.
 *
 * ADMIN_EMAILS env var overrides the default list (comma-separated).
 * ADMIN_FRANCE_ONLY_EMAILS env var overrides the France-restricted list.
 *
 * countryRestriction: ISO-3166-1 alpha-2 code, or null for no restriction.
 */

export interface AdminEmailEntry {
  email: string;
  /** ISO country code that restricts this account, e.g. "FR". null = unrestricted. */
  countryRestriction: string | null;
  /** Display name for the login UI */
  displayName?: string;
}

/** Default whitelist — override with env vars in production. */
const DEFAULT_ENTRIES: AdminEmailEntry[] = [
  {
    email: "gordoncyrus@gmail.com",
    countryRestriction: null,
  },
  {
    email: process.env.ADMIN_EURELIE_EMAIL ?? "eurely-@hotmail.fr",
    countryRestriction: "FR",
    displayName: "Eurelie Gomis",
  },
];

function parseOverride(
  envVar: string | undefined,
  restriction: string | null,
): AdminEmailEntry[] | null {
  if (!envVar) return null;
  return envVar
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .map((email) => ({ email, countryRestriction: restriction }));
}

/** Resolved whitelist (env overrides applied). */
export function getAdminWhitelist(): AdminEmailEntry[] {
  const envAll = process.env.ADMIN_EMAILS;
  if (envAll) {
    // Full override: use ADMIN_EMAILS + ADMIN_FRANCE_ONLY_EMAILS
    const unrestricted = parseOverride(envAll, null) ?? [];
    const franceOnly =
      parseOverride(process.env.ADMIN_FRANCE_ONLY_EMAILS, "FR") ?? [];
    // France-only overrides unrestricted for matching emails
    const franceEmails = new Set(franceOnly.map((e) => e.email));
    const merged = unrestricted.map((entry) =>
      franceEmails.has(entry.email)
        ? { ...entry, countryRestriction: "FR" }
        : entry,
    );
    // Add any france-only emails not in unrestricted list
    const mergedEmails = new Set(merged.map((e) => e.email));
    for (const fo of franceOnly) {
      if (!mergedEmails.has(fo.email)) merged.push(fo);
    }
    return merged;
  }
  return DEFAULT_ENTRIES.map((e) => ({
    ...e,
    email: e.email.toLowerCase(),
  }));
}

/** Lookup a single entry by email (case-insensitive). */
export function getAdminEntry(email: string): AdminEmailEntry | null {
  const normalised = email.trim().toLowerCase();
  return getAdminWhitelist().find((e) => e.email === normalised) ?? null;
}

/**
 * Check IP country access for an email.
 * Returns null if OK, or an error message string if blocked.
 */
export function checkCountryAccess(
  email: string,
  ipCountry: string | null,
): string | null {
  const entry = getAdminEntry(email);
  if (!entry) return "Adresse email non autorisée.";
  if (!entry.countryRestriction) return null; // no restriction

  // Skip check in development (no Vercel headers)
  if (process.env.NODE_ENV === "development") return null;

  if (!ipCountry) {
    // Can't determine country — block to be safe for restricted accounts
    return `Accès limité à ${entry.countryRestriction}. Impossible de vérifier votre localisation.`;
  }

  if (ipCountry.toUpperCase() !== entry.countryRestriction.toUpperCase()) {
    return `Accès réservé à la France. Votre connexion provient de : ${ipCountry}.`;
  }

  return null; // allowed
}
