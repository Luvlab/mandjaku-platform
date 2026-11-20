"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import en from "@/content/en.json";
import pt from "@/content/pt.json";

/**
 * Content translation.
 *
 * The site's long texts (history, culture, lessons, keyboard guides, shop…)
 * are written in French in the data files and components. French is the
 * source; content/en.json and content/pt.json map each French string to its
 * translation. A string with no entry is shown as it is, which is right for
 * Manjak words, names and numbers.
 *
 * After changing French text, run `node scripts/extract-content.mjs` to see
 * which strings still lack a translation.
 */
const TABLES: Record<string, Record<string, string>> = {
  en: en as Record<string, string>,
  pt: pt as Record<string, string>,
};

function deepMap<T>(value: T, table: Record<string, string>): T {
  if (typeof value === "string") return (table[value] ?? value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => deepMap(v, table)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = deepMap(v, table);
    return out as T;
  }
  return value;
}

/** c("texte français") → the text in the visitor's language. */
export function useC() {
  const locale = useLocale();
  return useMemo(() => {
    const table = TABLES[locale];
    return (s: string) => (table ? table[s] ?? s : s);
  }, [locale]);
}

/** A copy of a data structure with every French string translated. */
export function useLocalized<T>(data: T): T {
  const locale = useLocale();
  return useMemo(() => {
    const table = TABLES[locale];
    return table ? deepMap(data, table) : data;
  }, [data, locale]);
}

/** fill("Exercice {n} sur {total}", { n: 2, total: 5 }) */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
