"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MANJAK_ALPHABET, NOMINAL_CLASSES, TONES, PROVERBS } from "@/data/alphabet";
import type { Letter } from "@/data/alphabet";

type Filter = "all" | "vowel" | "consonant" | "digraph";

/** Renders a Manjaku script SVG or falls back to the Latin symbol text */
function SymbolDisplay({
  letter,
  size = "sm",
}: {
  letter: Letter;
  size?: "sm" | "lg";
}) {
  const [svgError, setSvgError] = useState(false);

  if (letter.svg && !svgError) {
    return (
      <img
        src={`/alphabet-svg/${letter.svg}`}
        alt={`Symbole Manjaku pour ${letter.latin}`}
        width={size === "lg" ? 120 : 56}
        height={size === "lg" ? 120 : 56}
        className={`rounded-lg ${size === "lg" ? "rounded-xl" : ""}`}
        style={{
          objectFit: "contain",
          background: "#000",
          display: "block",
        }}
        onError={() => setSvgError(true)}
      />
    );
  }

  // Fallback to text
  return (
    <div
      className={`font-black text-gradient ${size === "lg" ? "text-5xl" : "text-2xl"}`}
    >
      {letter.symbol.split("/")[0].trim()}
    </div>
  );
}

export default function AlphabetTab({ isActive = true }: { isActive?: boolean }) {
  const t = useTranslations("alphabet");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Letter | null>(null);
  const [sketchExpanded, setSketchExpanded] = useState<number | null>(null);

  const filtered = MANJAK_ALPHABET.filter(
    (l) => filter === "all" || l.category === filter
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

      {/* ── Historical Sketches ─────────────────────────────────────── */}
      <div className="mb-10">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white"
              style={{ background: "linear-gradient(135deg,#009E49,#007A38)" }}
            >
              ✍
            </div>
            <div>
              <div className="font-bold text-sm" style={{ color: "var(--text)" }}>
                Croquis originaux — Historique de l&apos;écriture Manjaku
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                Esquisses à la main, août 2024 — à l&apos;origine du système d&apos;écriture
              </div>
            </div>
            <span
              className="ml-auto text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(252,209,22,0.12)", color: "#B8960A", border: "1px solid rgba(252,209,22,0.3)" }}
            >
              Référence historique
            </span>
          </div>

          {/* Sketches grid */}
          <div className="grid grid-cols-2 gap-0">
            {[1, 2].map((n) => (
              <button
                key={n}
                onClick={() => setSketchExpanded(sketchExpanded === n ? null : n)}
                className="relative group overflow-hidden"
                style={{
                  borderRight: n === 1 ? "1px solid var(--border)" : "none",
                  aspectRatio: "1",
                  background: "#111",
                  cursor: "zoom-in",
                }}
              >
                <img
                  src={`/alphabet-svg/sketch_alphabet_${n}.jpg`}
                  alt={`Croquis original de l'alphabet Manjaku — page ${n}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.9,
                    transition: "opacity 0.2s, transform 0.3s",
                  }}
                  className="group-hover:opacity-100 group-hover:scale-[1.02]"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs font-semibold"
                  style={{
                    background: "linear-gradient(transparent,rgba(0,0,0,0.75))",
                    color: "#fff",
                  }}
                >
                  Page {n} — Esquisse originale
                </div>
                <div
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#fff", fontSize: "18px" }}
                >
                  ⊕
                </div>
              </button>
            ))}
          </div>

          {/* Expanded sketch lightbox */}
          {sketchExpanded !== null && (
            <div className="px-4 pb-4 pt-3" style={{ background: "#0a0a0a" }}>
              <img
                src={`/alphabet-svg/sketch_alphabet_${sketchExpanded}.jpg`}
                alt={`Croquis alphabet Manjaku — page ${sketchExpanded}`}
                style={{
                  width: "100%",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
              <p className="text-xs mt-3 text-center" style={{ color: "#888" }}>
                Croquis à la main des symboles Manjaku, 12 août 2024.
                Ces esquisses ont servi de base à la vectorisation du système d&apos;écriture.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Filters ───────────────────────────────────────────────────── */}
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

      {/* ── Letter grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-12">
        {filtered.map((letter) => {
          const isSelected = selected?.id === letter.id;
          const hasSvg = !!letter.svg;
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
              {hasSvg ? (
                <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <SymbolDisplay letter={letter} size="sm" />
                </div>
              ) : (
                <div className="text-2xl font-black text-gradient w-14 h-14 flex items-center justify-center">
                  {letter.symbol.split("/")[0].trim()}
                </div>
              )}
              <div className="text-xs font-mono font-bold" style={{ color: "var(--text)" }}>
                {letter.latin.split("/")[0].trim()}
              </div>
              <div className="text-xs font-mono" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
                {letter.pronunciation}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Selected letter detail ─────────────────────────────────────── */}
      {selected && (
        <div className="card p-5 mb-12" style={{ border: "2px solid rgba(0,158,73,0.30)" }}>
          <div className="flex items-start gap-5">
            {/* SVG or text symbol */}
            <div className="flex-shrink-0">
              {selected.svg ? (
                <div className="rounded-xl overflow-hidden" style={{ width: 100, height: 100 }}>
                  <SymbolDisplay letter={selected} size="lg" />
                </div>
              ) : (
                <div className="text-5xl font-black text-gradient w-[100px] h-[100px] flex items-center justify-center">
                  {selected.symbol.split("/")[0].trim()}
                </div>
              )}
            </div>

            <div className="flex-1">
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
                    style={{ background: "rgba(0,158,73,0.1)", color: "#009E49", border: "1px solid rgba(0,158,73,0.3)" }}
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
              className="text-2xl leading-none"
              style={{ color: "var(--text-muted)" }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ── Tones ──────────────────────────────────────────────────────── */}
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

      {/* ── Nominal classes ────────────────────────────────────────────── */}
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

      {/* ── Proverbs ───────────────────────────────────────────────────── */}
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
