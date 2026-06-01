"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { KEYBOARD_DOWNLOADS, QMK_VIA_INFO, VIRTUAL_KEYBOARD_LAYOUT } from "@/data/keyboards";

export default function KeyboardTab() {
  const t = useTranslations("keyboard");
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [output, setOutput] = useState("");

  const handleKeyPress = (key: string) => {
    setPressedKey(key);
    setOutput((prev) => prev + key);
    setTimeout(() => setPressedKey(null), 200);
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="badge badge-green mb-3 mx-auto">{t("tag")}</div>
        <h2 className="heading-lg" style={{ color: "var(--text)" }}>{t("title")}</h2>
        <p className="body-lg max-w-2xl mx-auto mt-3">{t("subtitle")}</p>
      </div>

      {/* Virtual keyboard */}
      <div className="card p-6 mb-12">
        <h3 className="font-bold text-base mb-4" style={{ color: "var(--text)" }}>
          🖥️ {t("virtual_title")}
        </h3>
        <div
          className="rounded-xl px-4 py-3 mb-4 min-h-16 flex items-center"
          style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
        >
          <span className="text-xl font-bold break-all" style={{ color: output ? "#009E49" : "var(--text-muted)", fontWeight: output ? 700 : 400 }}>
            {output || t("virtual_placeholder")}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {VIRTUAL_KEYBOARD_LAYOUT.rows.map((row, i) => (
            <div key={i} className="flex flex-wrap gap-1.5 justify-center">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className="min-w-10 h-10 px-3 rounded-lg text-sm font-bold transition-all"
                  style={{
                    background: pressedKey === key ? "#009E49" : "var(--surface2)",
                    color: pressedKey === key ? "#fff" : "var(--text)",
                    border: "1px solid var(--border)",
                    transform: pressedKey === key ? "scale(0.95)" : "scale(1)",
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {VIRTUAL_KEYBOARD_LAYOUT.specialKeys.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="px-4 h-10 rounded-lg text-sm font-bold transition-all"
                style={{
                  background: pressedKey === key ? "#CE1126" : "var(--surface2)",
                  color: pressedKey === key ? "#fff" : "#CE1126",
                  border: "1px solid rgba(206,17,38,0.25)",
                }}
              >
                {key}
              </button>
            ))}
            <button
              onClick={() => handleKeyPress(" ")}
              className="w-40 h-10 rounded-lg text-xs font-medium transition-all"
              style={{ background: "var(--surface2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
            >
              {t("space")}
            </button>
            <button
              onClick={() => setOutput((p) => p.slice(0, -1))}
              className="px-4 h-10 rounded-lg text-sm font-bold transition-all"
              style={{ background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)" }}
            >
              ⌫
            </button>
            <button
              onClick={() => setOutput("")}
              className="px-4 h-10 rounded-lg text-xs transition-all"
              style={{ background: "var(--surface2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
            >
              {t("clear")}
            </button>
          </div>
        </div>
      </div>

      {/* Downloads */}
      <div className="mb-12">
        <div className="badge badge-green mb-3">{t("downloads_title")}</div>
        <p className="body-sm mb-6">{t("downloads_sub")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {KEYBOARD_DOWNLOADS.map((kb) => (
            <div
              key={kb.os}
              className="card p-5 flex flex-col"
              style={{ borderColor: kb.available ? "rgba(0,158,73,0.30)" : "var(--border)" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-2xl flex-shrink-0">{kb.osIcon}</div>
                <div>
                  <div className="font-bold text-sm" style={{ color: "var(--text)" }}>{kb.os}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{kb.version}</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "var(--text-muted)" }}>{kb.description}</p>
              <div className="flex justify-between items-center mb-4 text-xs" style={{ color: "var(--text-muted)" }}>
                <span>{kb.format}</span>
                <span>{kb.size}</span>
              </div>
              {kb.available ? (
                <a
                  href={kb.downloadFile}
                  className="btn btn-primary w-full justify-center text-sm"
                >
                  ⬇ {t("use_now")}
                </a>
              ) : (
                <div
                  className="text-xs text-center py-2.5 rounded-xl"
                  style={{ background: "rgba(0,158,73,0.08)", color: "#009E49", border: "1px solid rgba(0,158,73,0.20)" }}
                >
                  🔜 {t("coming_soon")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Installation accordion */}
      <div className="mb-12">
        <h3 className="heading-md mb-6" style={{ color: "var(--text)" }}>{t("install_title")}</h3>
        <div className="space-y-3">
          {KEYBOARD_DOWNLOADS.map((kb) => (
            <details key={kb.os} className="card group" style={{ padding: 0 }}>
              <summary className="px-6 py-4 flex items-center gap-3 cursor-pointer list-none">
                <span className="text-lg">{kb.osIcon}</span>
                <span className="font-bold flex-1 text-sm" style={{ color: "var(--text)" }}>{kb.os}</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{kb.version}</span>
                <span className="text-sm" style={{ color: "#009E49" }}>▼</span>
              </summary>
              <div className="px-6 pb-5">
                <ol className="space-y-2">
                  {kb.instructions.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ background: "rgba(0,158,73,0.15)", color: "#009E49" }}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* QMK */}
      <div className="card p-7 mb-8">
        <div className="flex items-start gap-5 mb-5">
          <div className="text-3xl">⌨️</div>
          <div>
            <h3 className="heading-md mb-2" style={{ color: "var(--text)" }}>{t("qmk_title")}</h3>
            <p className="body-lg">{QMK_VIA_INFO.description}</p>
          </div>
        </div>
        <div className="mb-5">
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#009E49" }}>
            {t("supported_boards")}
          </div>
          <div className="flex flex-wrap gap-2">
            {QMK_VIA_INFO.supportedBoards.map((board) => (
              <span key={board} className="badge" style={{ background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)" }}>
                {board}
              </span>
            ))}
          </div>
        </div>
        <ol className="space-y-2 mb-5">
          {QMK_VIA_INFO.instructions.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "rgba(0,158,73,0.15)", color: "#009E49" }}>
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <a href={QMK_VIA_INFO.downloadFile} className="btn btn-outline">
          ⬇ Télécharger config QMK
        </a>
      </div>

      {/* 3D keycaps */}
      <div className="card p-8 text-center">
        <div className="text-4xl mb-4">🖨️</div>
        <h3 className="heading-md mb-3" style={{ color: "var(--text)" }}>{t("keycaps_title")}</h3>
        <p className="body-lg max-w-2xl mx-auto mb-5">
          Des fichiers 3D pour imprimer vos propres keycaps Mandjaku.
          Compatible avec les claviers Keychron (K2, K3, K6, K8) et le GK61.
        </p>
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-5">
          {[".STL", ".BLEND", ".STP"].map((fmt) => (
            <div key={fmt} className="card p-3 text-center">
              <div className="font-black text-base" style={{ color: "#009E49" }}>{fmt}</div>
            </div>
          ))}
        </div>
        <a href="mailto:info@luvlab.io" className="btn btn-outline">
          📧 {t("request_files")}
        </a>
      </div>
    </div>
  );
}
