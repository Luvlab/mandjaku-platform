/**
 * Admin access configuration.
 *
 * ADMIN_EMAILS env var holds the list (comma-separated).
 * ADMIN_FRANCE_ONLY_EMAILS env var holds the France-restricted list.
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

/**
 * No addresses live in the code. The whitelist comes only from the server
 * environment: ADMIN_EMAILS (comma-separated, no country limit) and
 * ADMIN_FRANCE_ONLY_EMAILS (comma-separated, France only).
 */

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
  const unrestricted = parseOverride(process.env.ADMIN_EMAILS, null) ?? [];
  const franceOnly =
    parseOverride(process.env.ADMIN_FRANCE_ONLY_EMAILS, "FR") ?? [];
  // A France-only entry wins over an unrestricted one for the same address.
  const franceEmails = new Set(franceOnly.map((e) => e.email));
  return [
    ...unrestricted.filter((e) => !franceEmails.has(e.email)),
    ...franceOnly,
  ];
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
