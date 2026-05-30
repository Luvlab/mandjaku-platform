"use client";

import { useState } from "react";
import { MANJAK_ALPHABET, NOMINAL_CLASSES, TONES, PROVERBS } from "@/data/alphabet";
import type { Letter } from "@/data/alphabet";

type Filter = "all" | "vowel" | "consonant" | "digraph";

export default function AlphabetPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Letter | null>(null);

  const filtered = MANJAK_ALPHABET.filter(
    (l) => filter === "all" || l.category === filter
  );

  const filterButtons: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "Tous", count: MANJAK_ALPHABET.length },
    { key: "vowel", label: "Voyelles", count: MANJAK_ALPHABET.filter((l) => l.category === "vowel").length },
    { key: "consonant", label: "Consonnes", count: MANJAK_ALPHABET.filter((l) => l.category === "consonant").length },
    { key: "digraph", label: "Digrammes", count: MANJAK_ALPHABET.filter((l) => l.category === "digraph").length },
  ];

  const categoryColor = (cat: string) => {
    if (cat === "vowel") return "border-[#2D5016]/60 bg-[#2D5016]/10 text-[#6AB040]";
    if (cat === "consonant") return "border-[#C8882A]/60 bg-[#C8882A]/10 text-[#E8A94A]";
    return "border-[#B85C38]/60 bg-[#B85C38]/10 text-[#D4876A]";
  };

  return (
    <div className="min-h-screen pattern-bg pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C8882A]/30 text-[#C8882A] text-sm font-medium mb-6">
          🔤 Alphabet Mandjaku
        </div>
        <h1 className="text-4xl sm:text-6xl font-black mb-6">
          <span className="text-gradient">L&apos;Alphabet Manjak</span>
        </h1>
        <p className="max-w-3xl mx-auto text-[#F5EDD3]/60 text-lg leading-relaxed">
          La langue Mandjaku utilise un alphabet basé sur le latin, avec des adaptations
          spécifiques. En Guinée-Bissau l&apos;alphabet compte{" "}
          <strong className="text-[#C8882A]">29 lettres</strong>, au Sénégal{" "}
          <strong className="text-[#C8882A]">36 lettres</strong>. Les anciens Manjak
          développent également des symboles graphiques uniques pour chaque son.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {filterButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                filter === btn.key
                  ? "bg-[#C8882A] text-white shadow-lg shadow-[#C8882A]/30"
                  : "glass text-[#F5EDD3]/60 hover:text-[#F5EDD3] hover:border-[#C8882A]/40"
              }`}
            >
              {btn.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                filter === btn.key ? "bg-white/20" : "bg-[#C8882A]/20 text-[#C8882A]"
              }`}>
                {btn.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Letter grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((letter) => (
            <button
              key={letter.id}
              onClick={() => setSelected(selected?.id === letter.id ? null : letter)}
              className={`glass rounded-2xl p-5 text-center letter-glow transition-all hover:scale-105 border-2 ${
                selected?.id === letter.id
                  ? "border-[#C8882A] bg-[#C8882A]/10"
                  : "border-transparent hover:border-[#C8882A]/30"
              } ${categoryColor(letter.category)}`}
            >
              <div className="text-4xl font-black mb-2 text-gradient">
                {letter.symbol.split("/")[0].trim()}
              </div>
              <div className="text-[#F5EDD3]/50 text-xs mb-1">{letter.latin}</div>
              <div className="text-[#F5EDD3]/30 text-xs font-mono">{letter.pronunciation}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Letter detail panel */}
      {selected && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4">
          <div className="max-w-2xl mx-auto glass rounded-2xl p-6 border border-[#C8882A]/40 shadow-2xl">
            <div className="flex items-start gap-6">
              <div className="text-6xl font-black text-gradient flex-shrink-0">
                {selected.symbol.split("/")[0].trim()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-[#F5EDD3] text-xl">{selected.latin}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor(selected.category)}`}>
                    {selected.category === "vowel" ? "Voyelle" : selected.category === "consonant" ? "Consonne" : "Digramme"}
                  </span>
                </div>
                <div className="text-[#C8882A] font-mono text-lg mb-3">{selected.pronunciation}</div>
                <div className="bg-[#C8882A]/10 rounded-xl px-4 py-3 mb-2">
                  <span className="text-[#E8A94A] font-bold">{selected.example}</span>
                  <span className="text-[#F5EDD3]/40 mx-2">→</span>
                  <span className="text-[#F5EDD3]/70">{selected.meaning}</span>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-[#F5EDD3]/40 hover:text-[#F5EDD3] text-2xl leading-none"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tones section */}
      <section className="bg-[#0A0E13] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-10">
            <span className="text-gradient">Les Tons en Mandjaku</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TONES.map((tone) => (
              <div key={tone.name} className="glass rounded-2xl p-6 text-center">
                <div className="text-5xl font-black text-gradient mb-3">{tone.mark}</div>
                <div className="text-[#F5EDD3] font-bold text-lg mb-2">{tone.name}</div>
                <p className="text-[#F5EDD3]/50 text-sm">{tone.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 glass rounded-2xl p-6">
            <h3 className="text-[#C8882A] font-semibold mb-3">Voyelles longues vs courtes</h3>
            <p className="text-[#F5EDD3]/60 text-sm leading-relaxed">
              En Mandjaku, la longueur vocalique change le sens du mot. Une voyelle longue est
              généralement notée en doublant la lettre (ex: <strong className="text-[#E8A94A]">aa</strong>,{" "}
              <strong className="text-[#E8A94A]">ii</strong>, <strong className="text-[#E8A94A]">uu</strong>).
              Ce trait distinctif est fondamental pour la bonne compréhension et production de la langue.
            </p>
          </div>
        </div>
      </section>

      {/* Nominal classes */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-center mb-4">
          <span className="text-gradient">Classes Nominales</span>
        </h2>
        <p className="text-center text-[#F5EDD3]/50 mb-10">
          En Mandjaku, les noms sont classés par préfixes selon leur catégorie sémantique
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NOMINAL_CLASSES.map((cls) => (
            <div key={cls.number} className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-[#C8882A]/20 flex items-center justify-center text-[#C8882A] font-black text-sm">
                  {cls.number}
                </span>
                <code className="text-[#E8A94A] font-mono font-bold">{cls.prefix}</code>
              </div>
              <div className="text-[#F5EDD3]/70 text-sm mb-3">{cls.description}</div>
              <div className="space-y-1">
                {cls.examples.map((ex) => (
                  <div key={ex} className="text-[#F5EDD3]/40 text-xs bg-white/3 rounded-lg px-3 py-1.5">
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proverbs */}
      <section className="bg-[#0A0E13] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-10">
            <span className="text-gradient">Proverbes Manjak</span>
          </h2>
          <div className="space-y-6">
            {PROVERBS.map((proverb, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <div className="text-[#E8A94A] font-bold text-xl mb-2 italic">
                  &ldquo;{proverb.manjak}&rdquo;
                </div>
                <div className="text-[#F5EDD3]/70 mb-1">🇫🇷 {proverb.french}</div>
                <div className="text-[#F5EDD3]/50 text-sm">🇬🇧 {proverb.english}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
