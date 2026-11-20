import { supabase } from "@/lib/supabase";
import { SEO_DEFAULTS, type TabSeo } from "@/data/seo";
import en from "@/content/en.json";
import pt from "@/content/pt.json";

const TABLES: Record<string, Record<string, string>> = {
  en: en as Record<string, string>,
  pt: pt as Record<string, string>,
};

/** The site's public address. Everything is served under /manjak on luvlab.io. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.luvlab.io/manjak";

const fixName = (s: string) => s.replace(/Mandjaku/g, "Manjaku");

// Texts that used to promise keyboard downloads for every system. They may
// still sit in the database row; when they do, the corrected default is used.
const RETIRED = [/Téléchargements pour tous OS/, /^Téléchargez le clavier/, /pour tous les systèmes d'exploitation/, /pour toutes les plateformes/];
const retired = (s: string) => RETIRED.some((r) => r.test(s));

/**
 * Search engine texts for one tab, in the page's language.
 *
 * French is the source: the row an administrator edited in the database, or
 * the default from data/seo.ts. For Portuguese and English each text is looked
 * up in the content translations; a French text with no translation (an
 * edited row, for example) falls back to the translated default, so a page
 * never shows a title in another language than its own.
 */
export async function getTabSeo(tab: string, locale: string): Promise<TabSeo> {
  const fallback = SEO_DEFAULTS[tab] ?? SEO_DEFAULTS.home;
  let row: TabSeo = fallback;
  try {
    const { data } = await supabase.from("manjak_seo_config").select("*").eq("id", tab).single();
    if (data) row = { ...fallback, ...(data as Partial<TabSeo>) };
  } catch {
    // keep the default
  }
  const table = TABLES[locale];
  const tr = (value: string | null | undefined, def: string) => {
    const fr = value && !retired(value) ? fixName(value) : fixName(def);
    if (!table) return fr;
    return table[fr] ?? table[fixName(def)] ?? fixName(def);
  };
  return {
    id: row.id,
    title: tr(row.title, fallback.title),
    description: tr(row.description, fallback.description),
    og_title: tr(row.og_title, fallback.og_title),
    og_description: tr(row.og_description, fallback.og_description),
    keywords: (row.keywords ?? fallback.keywords).map((k) => (table ? table[k] ?? k : k)),
    og_image_headline: tr(row.og_image_headline, fallback.og_image_headline),
    og_image_sub: tr(row.og_image_sub, fallback.og_image_sub),
  };
}
