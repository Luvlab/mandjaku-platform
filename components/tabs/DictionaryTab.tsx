"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DICTIONARY, CATEGORIES } from "@/data/dictionary";

export default function DictionaryTab() {
  const t = useTranslations("dictionary");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [lang, setLang] = useState<"fr" | "en" | "pt">("fr");

  const filtered = DICTIONARY.filter((entry) => {
    const matchCat = category === "all" || entry.category === category;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      entry.manjak.toLowerCase().includes(q) ||
      entry.french.toLowerCase().includes(q) ||
      entry.english.toLowerCase().includes(q) ||
      entry.portuguese.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const translationKey = lang === "fr" ? "french" : lang === "en" ? "english" : "portuguese";
  const langLabel = lang === "fr" ? "🇫🇷 Français" : lang === "en" ? "🇬🇧 English" : "🇵🇹 Português";

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="badge badge-green mb-3 mx-auto">{t("tag")}</div>
        <h2 className="heading-lg" style={{ color: "var(--text)" }}>{t("title")}</h2>
        <p className="body-sm mt-2">{t("subtitle")}</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder={t("search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl px-5 py-4 pl-12 text-sm focus:outline-none transition-colors"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg" style={{ color: "var(--text-muted)" }}>🔍</span>
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xl leading-none"
            style={{ color: "var(--text-muted)" }}
          >
            ×
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Language toggle */}
        <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {(["fr", "en", "pt"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="px-4 py-2 text-sm font-medium transition-colors"
              style={{
                background: lang === l ? "rgba(0,158,73,0.15)" : "var(--surface)",
                color: lang === l ? "#009E49" : "var(--text-muted)",
              }}
            >
              {l === "fr" ? "🇫🇷 FR" : l === "en" ? "🇬🇧 EN" : "🇵🇹 PT"}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className="px-3 py-2 rounded-xl text-xs font-medium transition-all"
              style={{
                background: category === cat.id ? "#009E49" : "var(--surface2)",
                color: category === cat.id ? "#fff" : "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 body-sm">
        {filtered.length} {t("results")}
        {search && <span style={{ color: "#009E49" }}> {t("for")} &ldquo;{search}&rdquo;</span>}
        {" · "}{t("translation")}: <span style={{ color: "#009E49" }}>{langLabel}</span>
      </div>

      {/* Entries */}
      <div className="space-y-3 mb-12">
        {filtered.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="body-sm">Aucun résultat pour &ldquo;{search}&rdquo;</p>
          </div>
        ) : (
          filtered.map((entry) => (
            <div
              key={`${entry.manjak}-${entry.category}`}
              className="card card-hover p-4 flex flex-wrap items-center gap-5"
            >
              <div className="min-w-0">
                <div className="text-xl font-black" style={{ color: "#009E49" }}>{entry.manjak}</div>
                {entry.pronunciation && (
                  <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>[{entry.pronunciation}]</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold" style={{ color: "var(--text)" }}>{entry[translationKey]}</div>
                {entry.nominalClass && (
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{t("class")} {entry.nominalClass}</div>
                )}
              </div>
              <span
                className="badge text-xs"
                style={{ background: "rgba(0,158,73,0.08)", color: "#009E49", border: "1px solid rgba(0,158,73,0.20)" }}
              >
                {CATEGORIES.find((c) => c.id === entry.category)?.emoji}{" "}
                {CATEGORIES.find((c) => c.id === entry.category)?.label}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Contribute */}
      <div className="card p-8 text-center" style={{ border: "1px solid rgba(0,158,73,0.20)", background: "rgba(0,158,73,0.04)" }}>
        <div className="text-4xl mb-4">🤝</div>
        <h3 className="heading-md mb-3" style={{ color: "var(--text)" }}>{t("contribute_title")}</h3>
        <p className="body-lg max-w-lg mx-auto mb-5">{t("contribute_sub")}</p>
        <a href="mailto:info@luvlab.io" className="btn btn-primary">
          📧 {t("contribute_btn")}
        </a>
      </div>
    </div>
  );
}
