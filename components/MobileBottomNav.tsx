"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

type Tab = "home" | "alphabet" | "learn" | "history" | "culture" | "dictionary" | "keyboard" | "media" | "market" | "studio";

interface Props {
  activeTab: Tab;
  onSwitch: (tab: Tab) => void;
}

const PRIMARY: { id: Tab; emoji: string }[] = [
  { id: "home", emoji: "🏠" },
  { id: "learn", emoji: "📚" },
  { id: "alphabet", emoji: "🔤" },
  { id: "dictionary", emoji: "📖" },
  { id: "market", emoji: "🛍️" },
];

const MORE: { id: Tab; emoji: string }[] = [
  { id: "history", emoji: "🏺" },
  { id: "culture", emoji: "🎭" },
  { id: "keyboard", emoji: "⌨️" },
  { id: "media", emoji: "🎬" },
  { id: "studio", emoji: "✏️" },
];

export default function MobileBottomNav({ activeTab, onSwitch }: Props) {
  const t = useTranslations("nav");
  const a = useTranslations("a11y");
  const [showMore, setShowMore] = useState(false);

  // Escape closes the "more" drawer
  useEffect(() => {
    if (!showMore) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowMore(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showMore]);
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
            id="more-sections"
            role="group"
            aria-label={a("more_sections")}
            className="absolute bottom-16 left-0 right-0 rounded-t-2xl p-4 pb-2 border-t"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div aria-hidden="true" className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: "var(--border)" }} />
            <div className="grid grid-cols-4 gap-2">
              {MORE.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { onSwitch(tab.id); setShowMore(false); }}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all"
                  style={{
                    background: activeTab === tab.id ? "rgba(0,158,73,0.12)" : "var(--surface2)",
                    color: activeTab === tab.id ? "#009E49" : "var(--text-muted)",
                  }}
                >
                  <span className="text-2xl" aria-hidden="true">{tab.emoji}</span>
                  <span className="text-xs font-medium">{t(tab.id)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <nav
        aria-label={a("sections")}
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
                aria-current={active ? "page" : undefined}
                className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-all"
                style={{ color: active ? "#009E49" : "var(--text-muted)" }}
              >
                <span className="text-xl" aria-hidden="true">{tab.emoji}</span>
                <span className="text-xs font-medium">{t(tab.id)}</span>
                {active && (
                  <span
                    aria-hidden="true"
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
            aria-expanded={showMore}
            aria-controls="more-sections"
            className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-all"
            style={{ color: inMore ? "#009E49" : "var(--text-muted)" }}
          >
            <span className="text-xl" aria-hidden="true">☰</span>
            <span className="text-xs font-medium">{a("more")}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
