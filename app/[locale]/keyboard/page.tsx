"use client";

import { useState } from "react";
import { KEYBOARD_DOWNLOADS, QMK_VIA_INFO, VIRTUAL_KEYBOARD_LAYOUT } from "@/data/keyboards";

export default function KeyboardPage() {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [output, setOutput] = useState("");

  const handleKeyPress = (key: string) => {
    setPressedKey(key);
    setOutput((prev) => prev + key);
    setTimeout(() => setPressedKey(null), 200);
  };

  return (
    <div className="min-h-screen pattern-bg pt-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C8882A]/30 text-[#C8882A] text-sm font-medium mb-6">
          ⌨️ Clavier Mandjaku
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4">
          <span className="text-gradient">Télécharger le Clavier</span>
        </h1>
        <p className="text-[#F5EDD3]/60 max-w-2xl mx-auto">
          Le clavier Mandjaku est disponible pour toutes les plateformes —
          Windows, macOS, Linux, Android, iOS, HarmonyOS et web. Écrivez en
          Mandjaku sur n&apos;importe quel appareil.
        </p>
      </div>

      {/* Virtual keyboard demo */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <h2 className="text-xl font-bold mb-4 text-[#F5EDD3]">
            🖥️ Clavier Virtuel Mandjaku — Essai en ligne
          </h2>

          {/* Text output */}
          <div className="bg-[#0D1117] rounded-xl px-4 py-3 mb-4 min-h-16 flex items-center">
            <span className="text-[#E8A94A] text-xl font-bold break-all">
              {output || <span className="text-[#F5EDD3]/20 font-normal text-base">Cliquez sur les touches pour écrire en Mandjaku...</span>}
            </span>
          </div>

          {/* Keyboard rows */}
          <div className="space-y-2 mb-4">
            {VIRTUAL_KEYBOARD_LAYOUT.rows.map((row, i) => (
              <div key={i} className="flex flex-wrap gap-1.5 justify-center">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    className={`min-w-10 h-10 px-3 rounded-lg text-sm font-bold transition-all ${
                      pressedKey === key
                        ? "bg-[#C8882A] text-white scale-95 shadow-lg shadow-[#C8882A]/40"
                        : "glass text-[#F5EDD3] hover:bg-[#C8882A]/20 hover:text-[#E8A94A]"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}

            {/* Special keys row */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {VIRTUAL_KEYBOARD_LAYOUT.specialKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`px-4 h-10 rounded-lg text-sm font-bold transition-all border border-[#B85C38]/40 ${
                    pressedKey === key
                      ? "bg-[#B85C38] text-white scale-95"
                      : "glass text-[#D4876A] hover:bg-[#B85C38]/20"
                  }`}
                >
                  {key}
                </button>
              ))}
              <button
                onClick={() => handleKeyPress(" ")}
                className="w-40 h-10 rounded-lg text-xs font-medium glass text-[#F5EDD3]/40 hover:text-[#F5EDD3] hover:bg-white/5 transition-all"
              >
                Espace
              </button>
              <button
                onClick={() => setOutput((p) => p.slice(0, -1))}
                className="px-4 h-10 rounded-lg text-sm font-bold glass text-[#F5EDD3]/60 hover:text-[#F5EDD3] hover:bg-white/5 transition-all"
              >
                ⌫
              </button>
              <button
                onClick={() => setOutput("")}
                className="px-4 h-10 rounded-lg text-xs glass text-[#F5EDD3]/40 hover:text-[#F5EDD3]/70 transition-all"
              >
                Effacer
              </button>
            </div>
          </div>

          <p className="text-[#F5EDD3]/30 text-xs text-center">
            Ce clavier virtuel permet d&apos;écrire des caractères Mandjaku directement dans votre navigateur.
          </p>
        </div>
      </section>

      {/* Downloads grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-black text-center mb-4">
          <span className="text-gradient">Téléchargements par Plateforme</span>
        </h2>
        <p className="text-center text-[#F5EDD3]/50 mb-10">
          Compatible avec toutes les plateformes majeures, incluant HarmonyOS
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {KEYBOARD_DOWNLOADS.map((kb) => (
            <div
              key={kb.os}
              className={`glass rounded-2xl p-5 flex flex-col ${kb.available ? "border-[#2D5016]/40" : ""}`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="text-3xl flex-shrink-0">{kb.osIcon}</div>
                <div>
                  <div className="text-[#F5EDD3] font-bold">{kb.os}</div>
                  <div className="text-[#F5EDD3]/40 text-xs">{kb.version}</div>
                </div>
              </div>

              <p className="text-[#F5EDD3]/50 text-xs leading-relaxed mb-4 flex-1">
                {kb.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-[#F5EDD3]/30 text-xs">{kb.format}</span>
                <span className="text-[#F5EDD3]/30 text-xs">{kb.size}</span>
              </div>

              {kb.available ? (
                <a
                  href={kb.downloadFile}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#2D5016] to-[#4A7A28] text-white font-bold text-sm text-center hover:shadow-lg transition-all"
                >
                  ⬇ Utiliser maintenant
                </a>
              ) : (
                <div className="w-full py-2.5 rounded-xl bg-[#C8882A]/10 border border-[#C8882A]/20 text-[#C8882A] text-xs text-center">
                  🔜 Bientôt disponible
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Installation instructions accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-black text-center mb-10">
          <span className="text-gradient">Guides d&apos;Installation</span>
        </h2>
        <div className="space-y-4">
          {KEYBOARD_DOWNLOADS.map((kb) => (
            <details key={kb.os} className="glass rounded-2xl group">
              <summary className="px-6 py-4 flex items-center gap-3 cursor-pointer list-none">
                <span className="text-xl">{kb.osIcon}</span>
                <span className="text-[#F5EDD3] font-bold flex-1">{kb.os}</span>
                <span className="text-[#F5EDD3]/40 text-sm">{kb.version}</span>
                <span className="text-[#C8882A] ml-2 group-open:rotate-180 transition-transform inline-block">▼</span>
              </summary>
              <div className="px-6 pb-6">
                <ol className="space-y-2">
                  {kb.instructions.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#F5EDD3]/60">
                      <span className="w-6 h-6 rounded-full bg-[#C8882A]/20 text-[#C8882A] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
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
      </section>

      {/* QMK / VIA section */}
      <section id="qmk" className="bg-[#0A0E13] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 sm:p-10">
            <div className="flex items-start gap-6 mb-6">
              <div className="text-4xl">⌨️</div>
              <div>
                <h2 className="text-2xl font-black text-gradient mb-2">{QMK_VIA_INFO.title}</h2>
                <p className="text-[#F5EDD3]/60 leading-relaxed">{QMK_VIA_INFO.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-[#C8882A] text-sm font-semibold uppercase tracking-wider mb-3">
                Claviers supportés
              </div>
              <div className="flex flex-wrap gap-2">
                {QMK_VIA_INFO.supportedBoards.map((board) => (
                  <span key={board} className="px-3 py-1 rounded-lg bg-[#C8882A]/10 text-[#E8A94A] text-sm border border-[#C8882A]/20">
                    {board}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {QMK_VIA_INFO.instructions.map((step, i) => (
                <div key={i} className="flex gap-3 text-sm text-[#F5EDD3]/60">
                  <span className="w-6 h-6 rounded-full bg-[#C8882A]/20 text-[#C8882A] flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>

            <a
              href={QMK_VIA_INFO.downloadFile}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C8882A]/20 border border-[#C8882A]/40 text-[#C8882A] font-bold hover:bg-[#C8882A]/30 transition-colors"
            >
              ⬇ Télécharger la config QMK (bientôt)
            </a>
          </div>
        </div>
      </section>

      {/* 3D Keycaps section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 sm:p-10 text-center">
          <div className="text-5xl mb-4">🖨️</div>
          <h2 className="text-2xl font-black mb-4">
            <span className="text-gradient">Keycaps 3D — Impression à domicile</span>
          </h2>
          <p className="text-[#F5EDD3]/60 max-w-2xl mx-auto mb-6 leading-relaxed">
            Des fichiers 3D pour imprimer vos propres keycaps Mandjaku sont disponibles.
            Compatible avec les claviers Keychron (K2, K3, K6, K8) et le GK61.
            Imprimez en PLA ou ABS et personnalisez vos touches avec les symboles Mandjaku.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[".STL", ".BLEND", ".STP"].map((fmt) => (
              <div key={fmt} className="bg-[#C8882A]/10 rounded-xl p-4">
                <div className="text-[#C8882A] font-black text-xl mb-1">{fmt}</div>
                <div className="text-[#F5EDD3]/40 text-xs">Format disponible</div>
              </div>
            ))}
          </div>
          <a
            href="mailto:info@luvlab.io"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#C8882A]/30 text-[#C8882A] hover:bg-[#C8882A]/10 transition-colors"
          >
            📧 Demander les fichiers 3D
          </a>
        </div>
      </section>
    </div>
  );
}
