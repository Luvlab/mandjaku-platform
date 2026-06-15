"use client";
import { useState, useEffect, useCallback } from "react";
import { MANJAK_ALPHABET, MANJAK_DIGITS } from "@/data/alphabet";
import {
  type FontFamily,
  PRESET_FAMILIES,
  loadFamilies,
  saveFamilies,
} from "@/data/fonts";
import { SymbolPreview, buildSvgString, downloadSvg } from "./SymbolPreview";
import { useSvgPaths, prefetchSvgs } from "./useSvgPaths";

// ── Studio symbol index ──────────────────────────────────────────────────────
interface StudioSymbol {
  id: string;
  label: string;
  sub: string;
  svg: string;
  type: "letter" | "digit";
}

const LETTER_SYMBOLS: StudioSymbol[] = MANJAK_ALPHABET
  .filter((l) => !!l.svg)
  .map((l) => ({
    id: l.id,
    label: l.latin.split("/")[0].trim(),
    sub: l.pronunciation,
    svg: l.svg!,
    type: "letter" as const,
  }));

const DIGIT_SYMBOLS: StudioSymbol[] = MANJAK_DIGITS.map((d) => ({
  id: `digit_${d.value}`,
  label: d.value.toString(),
  sub: d.label,
  svg: d.svg,
  type: "digit" as const,
}));

const ALL_SYMBOLS = [...LETTER_SYMBOLS, ...DIGIT_SYMBOLS];
const ALL_SVG_FILES = ALL_SYMBOLS.map((s) => s.svg);

// ── Helpers ──────────────────────────────────────────────────────────────────
function uid() {
  return `custom-${Date.now().toString(36)}`;
}

function resolveStyle(family: FontFamily, symbolId?: string) {
  const override = symbolId ? (family.overrides[symbolId] ?? {}) : {};
  return {
    strokeWidth: override.strokeWidth ?? family.strokeWidth,
    strokeLinecap: override.strokeLinecap ?? family.strokeLinecap,
    strokeLinejoin: override.strokeLinejoin ?? family.strokeLinejoin,
    bgColor: override.bgColor ?? family.bgColor,
    fgColor: override.fgColor ?? family.fgColor,
  };
}

// ── Sub-components ───────────────────────────────────────────────────────────
function Cap({ value, onChange }: { value: string; onChange: (v: "round" | "square" | "butt") => void }) {
  const opts: { v: "round" | "square" | "butt"; label: string }[] = [
    { v: "round", label: "Round" },
    { v: "square", label: "Square" },
    { v: "butt", label: "Butt" },
  ];
  return (
    <div className="flex gap-1">
      {opts.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className="text-xs px-2 py-1 rounded transition-all"
          style={{
            background: value === o.v ? "#009E49" : "var(--surface2)",
            color: value === o.v ? "#fff" : "var(--text-muted)",
            border: value === o.v ? "none" : "1px solid var(--border)",
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Join({ value, onChange }: { value: string; onChange: (v: "round" | "miter" | "bevel") => void }) {
  const opts: { v: "round" | "miter" | "bevel"; label: string }[] = [
    { v: "round", label: "Round" },
    { v: "miter", label: "Miter" },
    { v: "bevel", label: "Bevel" },
  ];
  return (
    <div className="flex gap-1">
      {opts.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className="text-xs px-2 py-1 rounded transition-all"
          style={{
            background: value === o.v ? "#009E49" : "var(--surface2)",
            color: value === o.v ? "#fff" : "var(--text-muted)",
            border: value === o.v ? "none" : "1px solid var(--border)",
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ── Selected symbol panel ────────────────────────────────────────────────────
function SelectedPanel({
  symbol,
  family,
  onUpdateOverride,
  onClearOverride,
}: {
  symbol: StudioSymbol;
  family: FontFamily;
  onUpdateOverride: (id: string, patch: Partial<FontFamily>) => void;
  onClearOverride: (id: string) => void;
}) {
  const data = useSvgPaths(symbol.svg);
  const override = family.overrides[symbol.id] ?? {};
  const hasOverride = Object.keys(override).length > 0;
  const resolved = resolveStyle(family, symbol.id);
  const [copied, setCopied] = useState(false);
  const [previewSize, setPreviewSize] = useState(200);

  function exportThis() {
    if (!data) return;
    const svg = buildSvgString(data.paths, {
      strokeWidth: resolved.strokeWidth,
      bgColor: resolved.bgColor,
      fgColor: resolved.fgColor,
      strokeLinecap: resolved.strokeLinecap,
      strokeLinejoin: resolved.strokeLinejoin,
    });
    downloadSvg(svg, `manjak_${symbol.id}_${family.id}.svg`);
  }

  function copySvg() {
    if (!data) return;
    const svg = buildSvgString(data.paths, {
      strokeWidth: resolved.strokeWidth,
      bgColor: resolved.bgColor,
      fgColor: resolved.fgColor,
      strokeLinecap: resolved.strokeLinecap,
      strokeLinejoin: resolved.strokeLinejoin,
    });
    navigator.clipboard.writeText(svg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Big preview */}
      <div className="flex flex-col items-center gap-2">
        <SymbolPreview
          filename={symbol.svg}
          strokeWidth={resolved.strokeWidth}
          strokeColor={resolved.fgColor}
          bgColor={resolved.bgColor}
          strokeLinecap={resolved.strokeLinecap}
          strokeLinejoin={resolved.strokeLinejoin}
          size={previewSize}
          style={{ borderRadius: 8 }}
        />
        <div className="flex gap-1">
          {[100, 160, 220].map((s) => (
            <button
              key={s}
              onClick={() => setPreviewSize(s)}
              className="text-xs px-2 py-1 rounded"
              style={{
                background: previewSize === s ? "rgba(0,158,73,0.15)" : "var(--surface2)",
                color: previewSize === s ? "#009E49" : "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              {s}px
            </button>
          ))}
        </div>
        <div className="text-center">
          <div className="font-bold text-sm" style={{ color: "var(--text)" }}>{symbol.label}</div>
          <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{symbol.sub}</div>
        </div>
      </div>

      {/* Per-symbol override */}
      <div
        className="rounded-xl p-3"
        style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>
            Override pour ce symbole
          </span>
          {hasOverride && (
            <button
              onClick={() => onClearOverride(symbol.id)}
              className="text-xs px-2 py-0.5 rounded"
              style={{ background: "rgba(206,17,38,0.1)", color: "#CE1126", border: "1px solid rgba(206,17,38,0.2)" }}
            >
              Effacer
            </button>
          )}
        </div>
        <div className="space-y-2">
          <div>
            <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
              Épaisseur: <span className="font-mono font-bold" style={{ color: "#009E49" }}>{resolved.strokeWidth}</span>
            </div>
            <input
              type="range" min={5} max={180} step={1}
              value={resolved.strokeWidth}
              onChange={(e) => onUpdateOverride(symbol.id, { strokeWidth: Number(e.target.value) })}
              className="w-full accent-green-600"
            />
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="flex gap-2">
        <button
          onClick={exportThis}
          disabled={!data}
          className="flex-1 text-xs py-2 rounded-lg font-semibold transition-all disabled:opacity-40"
          style={{ background: "#009E49", color: "#fff" }}
        >
          ↓ Export SVG
        </button>
        <button
          onClick={copySvg}
          disabled={!data}
          className="flex-1 text-xs py-2 rounded-lg font-semibold transition-all disabled:opacity-40"
          style={{ background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)" }}
        >
          {copied ? "✓ Copié !" : "<> Copier SVG"}
        </button>
      </div>
    </div>
  );
}

// ── Main studio ──────────────────────────────────────────────────────────────
export default function FontStudio() {
  const [families, setFamilies] = useState<FontFamily[]>(PRESET_FAMILIES);
  const [activeFamilyId, setActiveFamilyId] = useState("regular");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "letters" | "digits">("all");
  const [newFamilyName, setNewFamilyName] = useState("");
  const [addingFamily, setAddingFamily] = useState(false);
  const [exportingAll, setExportingAll] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    setFamilies(loadFamilies());
    prefetchSvgs(ALL_SVG_FILES);
  }, []);

  const activeFamily = families.find((f) => f.id === activeFamilyId) ?? families[0];

  // Persist on change
  useEffect(() => {
    saveFamilies(families);
  }, [families]);

  const updateFamily = useCallback((patch: Partial<FontFamily>) => {
    setFamilies((prev) =>
      prev.map((f) => (f.id === activeFamilyId ? { ...f, ...patch } : f))
    );
  }, [activeFamilyId]);

  const updateOverride = useCallback((symbolId: string, patch: Partial<FontFamily>) => {
    setFamilies((prev) =>
      prev.map((f) =>
        f.id === activeFamilyId
          ? { ...f, overrides: { ...f.overrides, [symbolId]: { ...f.overrides[symbolId], ...patch } } }
          : f
      )
    );
  }, [activeFamilyId]);

  const clearOverride = useCallback((symbolId: string) => {
    setFamilies((prev) =>
      prev.map((f) => {
        if (f.id !== activeFamilyId) return f;
        const next = { ...f.overrides };
        delete next[symbolId];
        return { ...f, overrides: next };
      })
    );
  }, [activeFamilyId]);

  function createFamily() {
    const name = newFamilyName.trim() || "Nouvelle famille";
    const base = activeFamily;
    const newF: FontFamily = {
      ...base,
      id: uid(),
      name,
      description: "Famille personnalisée",
      overrides: {},
      isPreset: false,
    };
    setFamilies((prev) => [...prev, newF]);
    setActiveFamilyId(newF.id);
    setNewFamilyName("");
    setAddingFamily(false);
  }

  function deleteFamily(id: string) {
    if (PRESET_FAMILIES.some((f) => f.id === id)) return; // never delete presets
    setFamilies((prev) => prev.filter((f) => f.id !== id));
    if (activeFamilyId === id) setActiveFamilyId("regular");
  }

  async function exportAll() {
    setExportingAll(true);
    const visible = filteredSymbols;
    for (const sym of visible) {
      await new Promise<void>((resolve) => {
        // Small delay to avoid browser throttling
        setTimeout(() => {
          const cached = (window as any).__svgCache?.[sym.svg];
          if (!cached) { resolve(); return; }
          const resolved = resolveStyle(activeFamily, sym.id);
          const svg = buildSvgString(cached.paths, {
            strokeWidth: resolved.strokeWidth,
            bgColor: resolved.bgColor,
            fgColor: resolved.fgColor,
            strokeLinecap: resolved.strokeLinecap,
            strokeLinejoin: resolved.strokeLinejoin,
          });
          downloadSvg(svg, `manjak_${sym.id}_${activeFamily.id}.svg`);
          resolve();
        }, 80);
      });
    }
    setExportingAll(false);
  }

  const filteredSymbols =
    filter === "letters"
      ? LETTER_SYMBOLS
      : filter === "digits"
      ? DIGIT_SYMBOLS
      : ALL_SYMBOLS;

  const selectedSymbol = selectedId ? ALL_SYMBOLS.find((s) => s.id === selectedId) : null;

  const GREEN = "#009E49";

  return (
    <div>
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="badge badge-green mb-2">Font Studio</div>
        <h2 className="heading-lg" style={{ color: "var(--text)" }}>Atelier de polices Manjaku</h2>
        <p className="body-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Ajustez les poids, les tracés et créez des familles typographiques. Exportez en SVG.
        </p>
      </div>

      {/* ── Family tabs ─────────────────────────────────────── */}
      <div
        className="rounded-2xl p-4 mb-6"
        style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
          Familles typographiques
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {families.map((f) => {
            const active = f.id === activeFamilyId;
            return (
              <div key={f.id} className="flex items-center gap-1">
                <button
                  onClick={() => setActiveFamilyId(f.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: active ? GREEN : "var(--surface2)",
                    color: active ? "#fff" : "var(--text)",
                    border: active ? "none" : "1px solid var(--border)",
                  }}
                >
                  {/* Mini glyph preview for 'A' */}
                  <SymbolPreview
                    filename="letter_A.svg"
                    strokeWidth={resolveStyle(f).strokeWidth}
                    strokeColor={resolveStyle(f).fgColor}
                    bgColor={resolveStyle(f).bgColor}
                    strokeLinecap={resolveStyle(f).strokeLinecap}
                    strokeLinejoin={resolveStyle(f).strokeLinejoin}
                    size={20}
                    style={{ borderRadius: 3, flexShrink: 0 }}
                  />
                  {f.name}
                </button>
                {!f.isPreset && active && (
                  <button
                    onClick={() => deleteFamily(f.id)}
                    className="text-xs px-1.5 py-1 rounded"
                    title="Supprimer cette famille"
                    style={{ color: "#CE1126", background: "rgba(206,17,38,0.08)", border: "1px solid rgba(206,17,38,0.2)" }}
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}

          {/* Add new family */}
          {addingFamily ? (
            <div className="flex items-center gap-1">
              <input
                autoFocus
                value={newFamilyName}
                onChange={(e) => setNewFamilyName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") createFamily(); if (e.key === "Escape") setAddingFamily(false); }}
                placeholder="Nom de la famille…"
                className="text-sm px-3 py-1.5 rounded-lg outline-none"
                style={{ border: "1px solid #009E49", background: "var(--surface2)", color: "var(--text)", width: 180 }}
              />
              <button onClick={createFamily} className="text-xs px-2 py-1.5 rounded-lg font-semibold" style={{ background: GREEN, color: "#fff" }}>OK</button>
              <button onClick={() => setAddingFamily(false)} className="text-xs px-2 py-1.5 rounded-lg" style={{ background: "var(--surface2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>✕</button>
            </div>
          ) : (
            <button
              onClick={() => setAddingFamily(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all"
              style={{ background: "var(--surface2)", color: "var(--text-muted)", border: "1px dashed var(--border)" }}
            >
              + Nouvelle famille
            </button>
          )}
        </div>

        {/* Active family description */}
        {activeFamily && (
          <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>
            {activeFamily.description}
          </p>
        )}
      </div>

      {/* ── Controls + Grid + Detail (3-column on desktop) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-6">

        {/* LEFT — Family controls */}
        <div className="space-y-4">
          <div
            className="rounded-2xl p-4"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
              {activeFamily?.name}
            </div>

            {/* Stroke width */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Épaisseur du trait</span>
                <span className="font-mono text-sm font-bold" style={{ color: GREEN }}>{activeFamily?.strokeWidth}</span>
              </div>
              <input
                type="range" min={5} max={180} step={1}
                value={activeFamily?.strokeWidth ?? 60}
                onChange={(e) => updateFamily({ strokeWidth: Number(e.target.value) })}
                className="w-full accent-green-600"
              />
              {/* Stroke width reference markers */}
              <div className="flex justify-between text-[9px] mt-0.5" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
                <span>Thin</span><span>Regular</span><span>Bold</span><span>Heavy</span>
              </div>
            </div>

            {/* Linecap */}
            <div className="mb-4">
              <div className="text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>Terminaison (linecap)</div>
              <Cap value={activeFamily?.strokeLinecap ?? "round"} onChange={(v) => updateFamily({ strokeLinecap: v })} />
            </div>

            {/* Linejoin */}
            <div className="mb-4">
              <div className="text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>Jonction (linejoin)</div>
              <Join value={activeFamily?.strokeLinejoin ?? "round"} onChange={(v) => updateFamily({ strokeLinejoin: v })} />
            </div>

            {/* Colors */}
            <div className="mb-4">
              <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Couleurs</div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>Fond</span>
                  <input
                    type="color"
                    value={activeFamily?.bgColor ?? "#000000"}
                    onChange={(e) => updateFamily({ bgColor: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer border"
                    style={{ borderColor: "var(--border)", padding: 1 }}
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>Trait</span>
                  <input
                    type="color"
                    value={activeFamily?.fgColor ?? "#ffffff"}
                    onChange={(e) => updateFamily({ fgColor: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer border"
                    style={{ borderColor: "var(--border)", padding: 1 }}
                  />
                </div>
                <button
                  onClick={() => updateFamily({ bgColor: activeFamily.fgColor, fgColor: activeFamily.bgColor })}
                  className="text-xs px-2 py-1 rounded ml-1 transition-all"
                  title="Inverser les couleurs"
                  style={{ background: "var(--surface2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
                >
                  ⇄
                </button>
              </div>
            </div>

            {/* Live preview of 'A' */}
            <div className="flex justify-center mt-2">
              <SymbolPreview
                filename="letter_A.svg"
                strokeWidth={resolveStyle(activeFamily).strokeWidth}
                strokeColor={resolveStyle(activeFamily).fgColor}
                bgColor={resolveStyle(activeFamily).bgColor}
                strokeLinecap={resolveStyle(activeFamily).strokeLinecap}
                strokeLinejoin={resolveStyle(activeFamily).strokeLinejoin}
                size={80}
                style={{ borderRadius: 10 }}
              />
            </div>
          </div>

          {/* Export all */}
          <button
            onClick={exportAll}
            disabled={exportingAll}
            className="w-full text-sm py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
            style={{ background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)" }}
          >
            {exportingAll ? "Export en cours…" : `↓ Exporter tous (${filteredSymbols.length} SVG)`}
          </button>
        </div>

        {/* CENTRE — Symbol grid */}
        <div>
          {/* Filter */}
          <div className="flex gap-2 mb-4">
            {(["all", "letters", "digits"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
                style={{
                  background: filter === f ? GREEN : "var(--surface2)",
                  color: filter === f ? "#fff" : "var(--text-muted)",
                  border: filter === f ? "none" : "1px solid var(--border)",
                }}
              >
                {f === "all" ? `Tout (${ALL_SYMBOLS.length})` : f === "letters" ? `Lettres (${LETTER_SYMBOLS.length})` : `Chiffres (${DIGIT_SYMBOLS.length})`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
            {filteredSymbols.map((sym) => {
              const resolved = resolveStyle(activeFamily, sym.id);
              const isSelected = selectedId === sym.id;
              const hasOverride = Object.keys(activeFamily.overrides[sym.id] ?? {}).length > 0;
              return (
                <button
                  key={sym.id}
                  onClick={() => setSelectedId(isSelected ? null : sym.id)}
                  className="flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all"
                  style={{
                    border: isSelected ? `2px solid ${GREEN}` : "1px solid var(--border)",
                    background: isSelected ? "rgba(0,158,73,0.06)" : "var(--surface)",
                    position: "relative",
                  }}
                >
                  {hasOverride && (
                    <span
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                      style={{ background: GREEN }}
                      title="Override actif"
                    />
                  )}
                  <SymbolPreview
                    filename={sym.svg}
                    strokeWidth={resolved.strokeWidth}
                    strokeColor={resolved.fgColor}
                    bgColor={resolved.bgColor}
                    strokeLinecap={resolved.strokeLinecap}
                    strokeLinejoin={resolved.strokeLinejoin}
                    size={64}
                    style={{ borderRadius: 6 }}
                  />
                  <span className="text-xs font-bold" style={{ color: "var(--text)", lineHeight: 1 }}>
                    {sym.label}
                  </span>
                  <span className="text-[9px] font-mono" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
                    {sym.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Selected symbol detail */}
        <div>
          {selectedSymbol ? (
            <div
              className="rounded-2xl p-4 sticky top-28"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <SelectedPanel
                symbol={selectedSymbol}
                family={activeFamily}
                onUpdateOverride={updateOverride}
                onClearOverride={clearOverride}
              />
            </div>
          ) : (
            <div
              className="rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3"
              style={{ border: "1px dashed var(--border)", background: "var(--surface)", minHeight: 200 }}
            >
              <div className="text-3xl">↖</div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Cliquez sur un symbole pour l&apos;éditer
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Font comparison strip ─────────────────────────────── */}
      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
          Comparaison des familles — A B S 0 1
        </div>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {families.map((f, fi) => {
            const resolved = resolveStyle(f);
            return (
              <div
                key={f.id}
                className="flex items-center gap-4 px-5 py-3"
                style={{
                  borderBottom: fi < families.length - 1 ? "1px solid var(--border)" : "none",
                  background: f.id === activeFamilyId ? "rgba(0,158,73,0.04)" : "var(--surface)",
                }}
              >
                <div className="w-36 flex-shrink-0">
                  <div className="text-xs font-semibold" style={{ color: "var(--text)" }}>{f.name}</div>
                  <div className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>
                    sw:{resolved.strokeWidth} · {resolved.strokeLinecap}
                  </div>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {["letter_A.svg", "letter_B.svg", "letter_S.svg", MANJAK_DIGITS[0].svg, MANJAK_DIGITS[1].svg].map((svg) => (
                    <SymbolPreview
                      key={svg}
                      filename={svg}
                      strokeWidth={resolved.strokeWidth}
                      strokeColor={resolved.fgColor}
                      bgColor={resolved.bgColor}
                      strokeLinecap={resolved.strokeLinecap}
                      strokeLinejoin={resolved.strokeLinejoin}
                      size={36}
                      style={{ borderRadius: 4 }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
