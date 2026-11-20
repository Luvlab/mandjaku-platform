"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MANJAK_ALPHABET as ALPHABET_FR, MANJAK_DIGITS as DIGITS_FR, NOMINAL_CLASSES as CLASSES_FR, TONES as TONES_FR, PROVERBS as PROVERBS_FR } from "@/data/alphabet";
import type { Letter } from "@/data/alphabet";
import { ELDER_SKETCHES } from "@/data/manjaku-glyphs";
import ManjakuGlyph, { ManjakuGlyphDefs } from "@/components/ManjakuGlyph";
import type { GlyphVariant } from "@/components/ManjakuGlyph";
import { useC, useLocalized } from "@/lib/content";

type Filter = "all" | "vowel" | "consonant" | "digraph";

export default function AlphabetTab({ isActive = true }: { isActive?: boolean }) {
  const c = useC();
  const MANJAK_ALPHABET = useLocalized(ALPHABET_FR);
  const MANJAK_DIGITS = useLocalized(DIGITS_FR);
  const NOMINAL_CLASSES = useLocalized(CLASSES_FR);
  const TONES = useLocalized(TONES_FR);
  // A proverb is only shown once it has its Manjak text: people come here to learn it in Manjak.
  const PROVERBS = useLocalized(PROVERBS_FR).filter((p) => p.manjak);
  const t = useTranslations("alphabet");
  const a = useTranslations("a11y");
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
            className="flex flex-wrap items-center gap-3 px-4 py-4"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#CE1126,#8B0000)" }}
            >
              ✍
            </div>
            <div className="flex-1 min-w-[12rem]">
              <div className="font-bold text-sm" style={{ color: "var(--text)" }}>
                {c("Croquis des anciens — Origine de l'écriture Manjaku")}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {c("Esquisses originales à la main, août 2024")}
              </div>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
              style={{
                background: "rgba(252,209,22,0.12)",
                color: "#B8960A",
                border: "1px solid rgba(252,209,22,0.3)",
              }}
            >
              {c("Référence historique")}
            </span>
          </div>

          {/* 4-photo grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {ELDER_SKETCHES.map((sketch, n) => (
              <button
                key={n}
                onClick={() => setSketchPhoto(sketchPhoto === n ? null : n)}
                aria-expanded={sketchPhoto === n}
                aria-label={`${a("enlarge")}: ${c(sketch.label)}`}
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
                  alt=""
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
                  {c(sketch.label)}
                </div>
              </button>
            ))}
          </div>

          {/* Lightbox */}
          {sketchPhoto !== null && (
            <div style={{ background: "#0a0a0a", padding: "16px" }} role="status" aria-live="polite">
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
                {c(ELDER_SKETCHES[sketchPhoto].label)} {c("— Croquis à la main des symboles Manjaku, 12 août 2024. Ces esquisses sont à l'origine du système d'écriture vectorisé.")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Style Toggle: Clean ↔ Sketch ─────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 mb-6" role="group" aria-labelledby="alpha-style-label">
        <span id="alpha-style-label" className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
          {c("Style d'affichage :")}
        </span>
        {(["clean", "sketch"] as GlyphVariant[]).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            aria-pressed={variant === v}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            style={{
              background: variant === v ? "#009E49" : "var(--surface2)",
              color: variant === v ? "#fff" : "var(--text-muted)",
              border: variant === v ? "none" : "1px solid var(--border)",
            }}
          >
            <span aria-hidden="true">{v === "clean" ? "✦ " : "✍ "}</span>{v === "clean" ? c("Vectorisé") : c("Croquis")}
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
              aria-pressed={active}
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
              aria-pressed={isSelected}
              aria-label={`${letter.latin}, ${catLabel(letter.category)}, ${letter.pronunciation}${hasGlyph ? "" : `. ${a("no_glyph")}`}`}
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
                    title=""
                    size={52}
                    variant={variant}
                    color="#009E49"
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

      {/* ── Numbers / Chiffres ───────────────────────────────────────────────── */}
      <div className="mb-12">
        <div className="badge badge-green mb-3">{c("Chiffres Manjak")}</div>
        <p className="body-sm mb-5">
          {c("Le système de numération Manjaku possède des symboles graphiques uniques pour les chiffres 0 à 9, développés par les anciens avec la même logique géométrique que l'alphabet.")}
        </p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {MANJAK_DIGITS.map((digit) => (
            <div
              key={digit.value}
              className="card rounded-xl p-2 text-center flex flex-col items-center"
              style={{ gap: "6px", border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="w-14 h-14 flex items-center justify-center">
                <ManjakuGlyph
                  id={`digit_${digit.value}`}
                  title={`${a("symbol_for")} ${digit.value}`}
                  size={52}
                  color="#009E49"
                  variant={variant}
                />
              </div>
              <div
                className="text-lg font-black"
                style={{ color: "#009E49", lineHeight: 1 }}
              >
                {digit.value}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {digit.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Selected letter detail ────────────────────────────────────────────── */}
      {/* Always in the page so screen readers announce the letter when it is chosen */}
      <div role="region" aria-live="polite" aria-label={a("letter_details")}>
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
                <ManjakuGlyph id={selected.id} title={`${a("symbol_for")} ${selected.latin}`} size={88} color="#009E49" variant={variant} />
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
                    {c("Symbole Manjaku ✓")}
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
              aria-label={a("close")}
              className="text-2xl leading-none flex-shrink-0"
              style={{ color: "var(--text-muted)" }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      )}
      </div>

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
              {/* Manjak text — shown only when verified original text exists */}
              {proverb.manjak ? (
                <div className="text-lg font-bold italic mb-2" style={{ color: "#009E49" }}>
                  &ldquo;{proverb.manjak}&rdquo;
                </div>
              ) : (
                <div className="text-lg font-bold italic mb-2" style={{ color: "var(--text)" }}>
                  &ldquo;{proverb.french}&rdquo;
                </div>
              )}
              {/* Translation, in the visitor's language only */}
              {proverb.manjak && (
                <div className="text-sm mb-1" style={{ color: "var(--text)" }}>
                  {proverb.french}
                </div>
              )}
              {/* Source badge */}
              {proverb.source && (
                <div className="mt-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--surface2)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {proverb.source}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
