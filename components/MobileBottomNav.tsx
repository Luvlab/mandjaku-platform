"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Tab = "home" | "alphabet" | "learn" | "history" | "culture" | "dictionary" | "keyboard" | "media" | "market" | "studio";

interface Props {
  activeTab: Tab;
  onSwitch: (tab: Tab) => void;
}

const PRIMARY: { id: Tab; emoji: string; label: string }[] = [
  { id: "home", emoji: "🏠", label: "Accueil" },
  { id: "learn", emoji: "📚", label: "Apprendre" },
  { id: "alphabet", emoji: "🔤", label: "Alphabet" },
  { id: "dictionary", emoji: "📖", label: "Dico" },
  { id: "market", emoji: "🛍️", label: "Boutique" },
];

const MORE: { id: Tab; emoji: string; label: string }[] = [
  { id: "history", emoji: "🏺", label: "Histoire" },
  { id: "culture", emoji: "🎭", label: "Culture" },
  { id: "keyboard", emoji: "⌨️", label: "Clavier" },
  { id: "media", emoji: "🎬", label: "Médias" },
  { id: "studio", emoji: "✏️", label: "Studio" },
];

export default function MobileBottomNav({ activeTab, onSwitch }: Props) {
  const [showMore, setShowMore] = useState(false);
  const inMore = MORE.some((t) => t.id === activeTab);

  return (
    <>
      {/* More drawer */}
      {showMore && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMore(false)}
        >
          <div
            className="absolute bottom-16 left-0 right-0 rounded-t-2xl p-4 pb-2 border-t"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: "var(--border)" }} />
            <div className="grid grid-cols-4 gap-2">
              {MORE.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { onSwitch(tab.id); setShowMore(false); }}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all"
                  style={{
                    background: activeTab === tab.id ? "rgba(0,158,73,0.12)" : "var(--surface2)",
                    color: activeTab === tab.id ? "#009E49" : "var(--text-muted)",
                  }}
                >
                  <span className="text-2xl">{tab.emoji}</span>
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t flex items-center safe-bottom"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        {/* Kente line */}
        <div className="absolute top-0 left-0 right-0 h-px kente-stripe" />

        <div className="flex w-full">
          {PRIMARY.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { onSwitch(tab.id); setShowMore(false); }}
                className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-all"
                style={{ color: active ? "#009E49" : "var(--text-muted)" }}
              >
                <span className="text-xl">{tab.emoji}</span>
                <span className="text-xs font-medium">{tab.label}</span>
                {active && (
                  <span
                    className="absolute top-0 h-0.5 w-8 rounded-full"
                    style={{ background: "#009E49" }}
                  />
                )}
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setShowMore((s) => !s)}
            className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-all"
            style={{ color: inMore ? "#009E49" : "var(--text-muted)" }}
          >
            <span className="text-xl">☰</span>
            <span className="text-xs font-medium">Plus</span>
          </button>
        </div>
      </nav>
    </>
  );
}
