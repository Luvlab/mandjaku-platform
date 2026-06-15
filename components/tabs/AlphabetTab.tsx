"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MANJAK_ALPHABET, NOMINAL_CLASSES, TONES, PROVERBS } from "@/data/alphabet";
import type { Letter } from "@/data/alphabet";
import { ELDER_SKETCHES } from "@/data/manjaku-glyphs";
import ManjakuGlyph, { ManjakuGlyphDefs } from "@/components/ManjakuGlyph";
import type { GlyphVariant } from "@/components/ManjakuGlyph";

type Filter = "all" | "vowel" | "consonant" | "digraph";

export default function AlphabetTab({ isActive = true }: { isActive?: boolean }) {
  const t = useTranslations("alphabet");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Letter | null>(null);
  const [variant, setVariant] = useState<GlyphVariant>("clean");
  const [sketchPhoto, setSketchPhoto] = useState<number | null>(null);

  const filtered = MANJAK_ALPHABET.filter(
    (l) => filter === "all" || l.category === filter,
  );

  const filterBtns: { key: Filter; label: string }[] = [
    { key: "all", label: t("filter_all") },
    { key: "vowel", label: t("filter_vowels") },
    { key: "consonant", label: t("filter_consonants") },
    { key: "digraph", label: t("filter_digraphs") },
  ];

  const catLabel = (cat: string) =>
    cat === "vowel"
      ? t("category_vowel")
      : cat === "consonant"
        ? t("category_consonant")
        : t("category_digraph");

  const catStyle = (cat: string): React.CSSProperties =>
    cat === "vowel"
      ? { background: "rgba(0,158,73,0.10)", borderColor: "rgba(0,158,73,0.30)", color: "#009E49" }
      : cat === "consonant"
        ? { background: "rgba(206,17,38,0.08)", borderColor: "rgba(206,17,38,0.25)", color: "#CE1126" }
        : { background: "rgba(252,209,22,0.10)", borderColor: "rgba(252,209,22,0.30)", color: "#B8960A" };

  return (
    <div>
      {/* Shared SVG filter defs (sketch mode) — rendered once, zero layout impact */}
      <ManjakuGlyphDefs />

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div className="text-center mb-8">
        <div className="badge badge-green mb-3 mx-auto">{t("tag")}</div>
        <h2 className="heading-lg" style={{ color: "var(--text)" }}>{t("title")}</h2>
        <p className="body-lg max-w-2xl mx-auto mt-3">
          {t("description")}{" "}
          <strong style={{ color: "#009E49" }}>{t("gb_letters")}</strong>,{" "}
          {t("sn_letters")}. {t("description2")}
        </p>
      </div>

      {/* ── Elders' Sketch Gallery ────────────────────────────────────────────── */}
      <div className="mb-10">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#CE1126,#8B0000)" }}
            >
              ✍
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: "var(--text)" }}>
                Croquis des anciens — Origine de l&apos;écriture Manjaku
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                Esquisses originales à la main, août 2024
              </div>
            </div>
            <span
              className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
              style={{
                background: "rgba(252,209,22,0.12)",
                color: "#B8960A",
                border: "1px solid rgba(252,209,22,0.3)",
              }}
            >
              Référence historique
            </span>
          </div>

          {/* 4-photo grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {ELDER_SKETCHES.map((sketch, n) => (
              <button
                key={n}
                onClick={() => setSketchPhoto(sketchPhoto === n ? null : n)}
                className="relative group overflow-hidden"
                style={{
                  borderRight: n < 3 ? "1px solid var(--border)" : "none",
                  borderBottom: sketchPhoto === n ? "2px solid #CE1126" : "none",
                  aspectRatio: "1",
                  background: "#111",
                  cursor: "zoom-in",
                }}
              >
                <img
                  src={sketch.src}
                  alt={sketch.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: sketchPhoto === n ? 1 : 0.82,
                    transition: "opacity 0.2s, transform 0.3s",
                  }}
                  className="group-hover:opacity-100 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-xs font-semibold"
                  style={{
                    background: "linear-gradient(transparent,rgba(0,0,0,0.8))",
                    color: "#fff",
                  }}
                >
                  {sketch.label}
                </div>
              </button>
            ))}
          </div>

          {/* Lightbox */}
          {sketchPhoto !== null && (
            <div style={{ background: "#0a0a0a", padding: "16px" }}>
              <img
                src={ELDER_SKETCHES[sketchPhoto].src}
                alt={ELDER_SKETCHES[sketchPhoto].label}
                style={{
                  width: "100%",
                  maxHeight: "72vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
              <p className="text-xs mt-3 text-center" style={{ color: "#888" }}>
                {ELDER_SKETCHES[sketchPhoto].label} — Croquis à la main des symboles Manjaku,
                12 août 2024. Ces esquisses sont à l&apos;origine du système d&apos;écriture vectorisé.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Style Toggle: Clean ↔ Sketch ─────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
          Style d&apos;affichage :
        </span>
        {(["clean", "sketch"] as GlyphVariant[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            style={{
              background: variant === v ? "#009E49" : "var(--surface2)",
              color: variant === v ? "#fff" : "var(--text-muted)",
              border: variant === v ? "none" : "1px solid var(--border)",
            }}
          >
            {v === "clean" ? "✦ Vectorisé" : "✍ Croquis"}
          </button>
        ))}
      </div>

      {/* ── Filters ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {filterBtns.map((btn) => {
          const count =
            btn.key === "all"
              ? MANJAK_ALPHABET.length
              : MANJAK_ALPHABET.filter((l) => l.category === btn.key).length;
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

      {/* ── Letter grid ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-12">
        {filtered.map((letter) => {
          const isSelected = selected?.id === letter.id;
          const hasGlyph = !!letter.svg;

          return (
            <button
              key={letter.id}
              onClick={() => setSelected(isSelected ? null : letter)}
              className="card letter-glow rounded-xl p-2 text-center transition-all hover:scale-105 flex flex-col items-center"
              style={{
                border: isSelected ? "2px solid #009E49" : "1px solid var(--border)",
                background: isSelected ? "rgba(0,158,73,0.08)" : "var(--surface)",
                gap: "6px",
              }}
            >
              {/* Glyph */}
              <div className="w-14 h-14 flex items-center justify-center">
                {hasGlyph ? (
                  <ManjakuGlyph
                    id={letter.id}
                    size={52}
                    variant={variant}
                    color={isSelected ? "#009E49" : "#7a8a7e"}
                  />
                ) : (
                  <span className="text-2xl font-black text-gradient">
                    {letter.symbol.split("/")[0].trim()}
                  </span>
                )}
              </div>

              <div className="text-xs font-mono font-bold" style={{ color: "var(--text)" }}>
                {letter.latin.split("/")[0].trim()}
              </div>
              <div
                className="text-xs font-mono leading-tight"
                style={{ color: "var(--text-muted)", opacity: 0.7 }}
              >
                {letter.pronunciation}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Selected letter detail ────────────────────────────────────────────── */}
      {selected && (
        <div className="card p-5 mb-12" style={{ border: "2px solid rgba(0,158,73,0.30)" }}>
          <div className="flex items-start gap-5">
            {/* Large glyph */}
            <div
              className="flex-shrink-0 rounded-2xl flex items-center justify-center"
              style={{
                width: 110,
                height: 110,
                background: "var(--surface2)",
                color: "#009E49",
                border: "1px solid var(--border)",
              }}
            >
              {selected.svg ? (
                <ManjakuGlyph id={selected.id} size={88} color="#009E49" variant={variant} />
              ) : (
                <span className="text-5xl font-black text-gradient">
                  {selected.symbol.split("/")[0].trim()}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="font-bold text-lg" style={{ color: "var(--text)" }}>
                  {selected.latin}
                </span>
                <span
                  className="badge text-xs"
                  style={{ border: "1px solid", ...catStyle(selected.category) }}
                >
                  {catLabel(selected.category)}
                </span>
                {selected.svg && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: "rgba(0,158,73,0.1)",
                      color: "#009E49",
                      border: "1px solid rgba(0,158,73,0.3)",
                    }}
                  >
                    Symbole Manjaku ✓
                  </span>
                )}
              </div>
              <div className="font-mono text-base mb-3" style={{ color: "#009E49" }}>
                {selected.pronunciation}
              </div>
              <div className="rounded-xl px-4 py-3" style={{ background: "var(--surface2)" }}>
                <span className="font-bold" style={{ color: "#009E49" }}>
                  {selected.example}
                </span>
                <span style={{ color: "var(--text-muted)" }}> → </span>
                <span style={{ color: "var(--text)" }}>{selected.meaning}</span>
              </div>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="text-2xl leading-none flex-shrink-0"
              style={{ color: "var(--text-muted)" }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ── Tones ────────────────────────────────────────────────────────────── */}
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

      {/* ── Nominal classes ───────────────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="badge badge-green mb-3">{t("classes_title")}</div>
        <p className="body-sm mb-5">{t("classes_sub")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NOMINAL_CLASSES.map((cls) => (
            <div key={cls.number} className="card p-4">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ background: "rgba(0,158,73,0.15)", color: "#009E49" }}
                >
                  {cls.number}
                </span>
                <code className="font-mono font-bold text-sm" style={{ color: "#009E49" }}>
                  {cls.prefix}
                </code>
              </div>
              <p className="body-sm mb-3">{cls.description}</p>
              <div className="space-y-1">
                {cls.examples.map((ex) => (
                  <div
                    key={ex}
                    className="text-xs rounded-lg px-3 py-1.5"
                    style={{ background: "var(--surface2)", color: "var(--text-muted)" }}
                  >
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Proverbs ─────────────────────────────────────────────────────────── */}
      <div>
        <div className="badge badge-green mb-3">{t("proverbs_title")}</div>
        <div className="space-y-4 mt-5">
          {PROVERBS.map((proverb, i) => (
            <div key={i} className="card p-5">
              <div className="text-lg font-bold italic mb-2" style={{ color: "#009E49" }}>
                &ldquo;{proverb.manjak}&rdquo;
              </div>
              <div className="text-sm mb-1" style={{ color: "var(--text)" }}>
                🇫🇷 {proverb.french}
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                🇬🇧 {proverb.english}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
