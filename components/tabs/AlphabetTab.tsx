"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MANJAK_ALPHABET, NOMINAL_CLASSES, TONES, PROVERBS } from "@/data/alphabet";
import type { Letter } from "@/data/alphabet";

type Filter = "all" | "vowel" | "consonant" | "digraph";

export default function AlphabetTab({ isActive = true }: { isActive?: boolean }) {
  const t = useTranslations("alphabet");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Letter | null>(null);

  const filtered = MANJAK_ALPHABET.filter((l) => filter === "all" || l.category === filter);

  const filterBtns: { key: Filter; label: string }[] = [
    { key: "all", label: t("filter_all") },
    { key: "vowel", label: t("filter_vowels") },
    { key: "consonant", label: t("filter_consonants") },
    { key: "digraph", label: t("filter_digraphs") },
  ];

  const catLabel = (cat: string) =>
    cat === "vowel" ? t("category_vowel") : cat === "consonant" ? t("category_consonant") : t("category_digraph");

  const catStyle = (cat: string): React.CSSProperties =>
    cat === "vowel"
      ? { background: "rgba(0,158,73,0.10)", borderColor: "rgba(0,158,73,0.30)", color: "#009E49" }
      : cat === "consonant"
      ? { background: "rgba(206,17,38,0.08)", borderColor: "rgba(206,17,38,0.25)", color: "#CE1126" }
      : { background: "rgba(252,209,22,0.10)", borderColor: "rgba(252,209,22,0.30)", color: "#B8960A" };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="badge badge-green mb-3 mx-auto">{t("tag")}</div>
        <h2 className="heading-lg" style={{ color: "var(--text)" }}>{t("title")}</h2>
        <p className="body-lg max-w-2xl mx-auto mt-3">
          {t("description")}{" "}
          <strong style={{ color: "#009E49" }}>{t("gb_letters")}</strong>,{" "}
          {t("sn_letters")}. {t("description2")}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {filterBtns.map((btn) => {
          const count = btn.key === "all" ? MANJAK_ALPHABET.length : MANJAK_ALPHABET.filter((l) => l.category === btn.key).length;
          const active = filter === btn.key;
          return (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              className="btn"
              style={{
                background: active ? "#009E49" : "var(--surface2)",
                color: active ? "#fff" : "var(--text-muted)",
                border: active ? "none" : "1px solid var(--border)",
              }}
            >
              {btn.label}
              <span
                style={{
                  padding: "1px 8px",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  background: active ? "rgba(255,255,255,0.2)" : "rgba(0,158,73,0.12)",
                  color: active ? "#fff" : "#009E49",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Letter grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-12">
        {filtered.map((letter) => {
          const isSelected = selected?.id === letter.id;
          return (
            <button
              key={letter.id}
              onClick={() => setSelected(isSelected ? null : letter)}
              className="card letter-glow rounded-xl p-3 text-center transition-all hover:scale-105"
              style={{
                border: isSelected ? "2px solid #009E49" : "1px solid var(--border)",
                background: isSelected ? "rgba(0,158,73,0.08)" : "var(--surface)",
              }}
            >
              <div className="text-2xl font-black text-gradient">
                {letter.symbol.split("/")[0].trim()}
              </div>
              <div className="text-xs mt-1 font-mono" style={{ color: "var(--text-muted)" }}>{letter.latin}</div>
              <div className="text-xs font-mono" style={{ color: "var(--text-muted)", opacity: 0.6 }}>{letter.pronunciation}</div>
            </button>
          );
        })}
      </div>

      {/* Selected letter detail */}
      {selected && (
        <div className="card p-5 mb-12" style={{ border: "2px solid rgba(0,158,73,0.30)" }}>
          <div className="flex items-start gap-5">
            <div className="text-5xl font-black text-gradient flex-shrink-0">
              {selected.symbol.split("/")[0].trim()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-lg" style={{ color: "var(--text)" }}>{selected.latin}</span>
                <span
                  className="badge text-xs"
                  style={{ border: "1px solid", ...catStyle(selected.category) }}
                >
                  {catLabel(selected.category)}
                </span>
              </div>
              <div className="font-mono text-base mb-3" style={{ color: "#009E49" }}>{selected.pronunciation}</div>
              <div className="rounded-xl px-4 py-3" style={{ background: "var(--surface2)" }}>
                <span className="font-bold" style={{ color: "#009E49" }}>{selected.example}</span>
                <span style={{ color: "var(--text-muted)" }}> → </span>
                <span style={{ color: "var(--text)" }}>{selected.meaning}</span>
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="text-2xl leading-none" style={{ color: "var(--text-muted)" }}>×</button>
          </div>
        </div>
      )}

      {/* Tones */}
      <div className="mb-12">
        <div className="badge badge-green mb-3">{t("tones_title")}</div>
        <p className="body-sm mb-5">{t("tones_sub")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TONES.map((tone) => (
            <div key={tone.name} className="card p-5 text-center">
              <div className="text-4xl font-black text-gradient mb-2">{tone.mark}</div>
              <div className="font-bold mb-2" style={{ color: "var(--text)" }}>{tone.name}</div>
              <p className="body-sm">{tone.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nominal classes */}
      <div className="mb-12">
        <div className="badge badge-green mb-3">{t("classes_title")}</div>
        <p className="body-sm mb-5">{t("classes_sub")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NOMINAL_CLASSES.map((cls) => (
            <div key={cls.number} className="card p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ background: "rgba(0,158,73,0.15)", color: "#009E49" }}>
                  {cls.number}
                </span>
                <code className="font-mono font-bold text-sm" style={{ color: "#009E49" }}>{cls.prefix}</code>
              </div>
              <p className="body-sm mb-3">{cls.description}</p>
              <div className="space-y-1">
                {cls.examples.map((ex) => (
                  <div key={ex} className="text-xs rounded-lg px-3 py-1.5" style={{ background: "var(--surface2)", color: "var(--text-muted)" }}>
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proverbs */}
      <div>
        <div className="badge badge-green mb-3">{t("proverbs_title")}</div>
        <div className="space-y-4 mt-5">
          {PROVERBS.map((proverb, i) => (
            <div key={i} className="card p-5">
              <div className="text-lg font-bold italic mb-2" style={{ color: "#009E49" }}>
                &ldquo;{proverb.manjak}&rdquo;
              </div>
              <div className="text-sm mb-1" style={{ color: "var(--text)" }}>🇫🇷 {proverb.french}</div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>🇬🇧 {proverb.english}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
