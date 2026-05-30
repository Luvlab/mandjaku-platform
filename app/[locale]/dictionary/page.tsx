"use client";

import { useState } from "react";
import { DICTIONARY, CATEGORIES } from "@/data/dictionary";

export default function DictionaryPage() {
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
    <div className="min-h-screen pattern-bg pt-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C8882A]/30 text-[#C8882A] text-sm font-medium mb-6">
          📖 Dictionnaire Mandjaku
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4">
          <span className="text-gradient">Dictionnaire</span>
        </h1>
        <p className="text-[#F5EDD3]/60">
          Mandjaku · Français · English · Português
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un mot en Mandjaku, Français, English ou Português..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass rounded-xl px-5 py-4 pl-12 text-[#F5EDD3] placeholder-[#F5EDD3]/30 focus:outline-none focus:border-[#C8882A]/60 transition-colors text-sm"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F5EDD3]/30 text-lg">🔍</span>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F5EDD3]/30 hover:text-[#F5EDD3] text-xl leading-none"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Language toggle */}
          <div className="flex rounded-xl overflow-hidden border border-[#C8882A]/20">
            {(["fr", "en", "pt"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  lang === l ? "bg-[#C8882A]/30 text-[#E8A94A]" : "text-[#F5EDD3]/50 hover:text-[#F5EDD3]"
                }`}
              >
                {l === "fr" ? "🇫🇷" : l === "en" ? "🇬🇧" : "🇵🇹"}
              </button>
            ))}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  category === cat.id
                    ? "bg-[#C8882A] text-white"
                    : "glass text-[#F5EDD3]/50 hover:text-[#F5EDD3]"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="text-[#F5EDD3]/40 text-sm">
          {filtered.length} mot{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
          {search && <span className="text-[#C8882A]"> pour &ldquo;{search}&rdquo;</span>}
          {" · "}Traduction : <span className="text-[#C8882A]">{langLabel}</span>
        </div>
      </div>

      {/* Dictionary entries */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-[#F5EDD3]/50">Aucun résultat pour &ldquo;{search}&rdquo;</p>
            </div>
          ) : (
            filtered.map((entry) => (
              <div
                key={`${entry.manjak}-${entry.category}`}
                className="glass rounded-xl p-5 flex flex-wrap items-center gap-6 hover:border-[#C8882A]/20 transition-all"
              >
                <div className="min-w-0">
                  <div className="text-[#E8A94A] font-black text-xl mb-0.5">{entry.manjak}</div>
                  {entry.pronunciation && (
                    <div className="text-[#C8882A]/60 font-mono text-xs">[{entry.pronunciation}]</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[#F5EDD3] font-semibold">
                    {entry[translationKey]}
                  </div>
                  {entry.nominalClass && (
                    <div className="text-[#F5EDD3]/30 text-xs mt-0.5">Classe {entry.nominalClass}</div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 rounded-full text-xs bg-[#C8882A]/10 text-[#C8882A]/70">
                    {CATEGORIES.find((c) => c.id === entry.category)?.emoji}{" "}
                    {CATEGORIES.find((c) => c.id === entry.category)?.label}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Contribute CTA */}
      <section className="bg-[#0A0E13] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🤝</div>
          <h2 className="text-2xl font-black mb-4 text-gradient">Contribuer au Dictionnaire</h2>
          <p className="text-[#F5EDD3]/60 mb-6 leading-relaxed">
            Ce dictionnaire est en constante évolution. Si vous êtes locuteur Mandjaku ou connaissez
            des mots et expressions à ajouter, contactez-nous pour enrichir cette ressource collective.
          </p>
          <a
            href="mailto:info@luvlab.io"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C8882A] text-white font-bold hover:bg-[#9B6810] transition-colors"
          >
            📧 Contribuer
          </a>
        </div>
      </section>
    </div>
  );
}
