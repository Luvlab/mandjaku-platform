"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CULTURAL_FACTS } from "@/data/history";
import { MANJAK_ALPHABET } from "@/data/alphabet";
import AlphabetTab from "./tabs/AlphabetTab";
import LearnTab from "./tabs/LearnTab";
import HistoryTab from "./tabs/HistoryTab";
import CultureTab from "./tabs/CultureTab";
import DictionaryTab from "./tabs/DictionaryTab";
import KeyboardTab from "./tabs/KeyboardTab";
import MediaTab from "./tabs/MediaTab";
import MarketplaceTab from "./tabs/MarketplaceTab";
import FontStudio from "./studio/FontStudio";
import MobileBottomNav from "./MobileBottomNav";

type Tab = "home" | "alphabet" | "learn" | "history" | "culture" | "dictionary" | "keyboard" | "media" | "market" | "studio";

interface TabAppProps {
  initialTab: string;
}

function HomeTab() {
  const t = useTranslations("home");
  const featuredLetters = MANJAK_ALPHABET.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <div
        className="rounded-2xl p-8 sm:p-12 text-center mb-10 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, var(--surface) 60%, rgba(0,158,73,0.06) 100%)", border: "1px solid var(--border)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 kente-stripe" />
        <div className="badge badge-green mb-5 mx-auto">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#009E49" }} />
          {t("tag")}
        </div>
        <h1 className="heading-xl mb-3">
          <span className="text-gradient">Mandjaku</span>
        </h1>
        <p className="text-lg font-medium mb-3" style={{ color: "var(--text)" }}>{t("subtitle")}</p>
        <blockquote
          className="text-sm italic mb-5 max-w-md mx-auto text-left"
          style={{ color: "var(--text-muted)", borderLeft: "3px solid #009E49", paddingLeft: "1rem" }}
        >
          &ldquo;The Manjaku are a civilization of weavers and kings.&rdquo;
        </blockquote>
        <p className="body-lg max-w-xl mx-auto mb-6">
          {t("description")}{" "}
          <strong style={{ color: "#009E49" }}>{t("speakers")}</strong>{" "}
          {t("countries")}
        </p>
        {/* Floating letters */}
        <div className="flex justify-center gap-2 flex-wrap">
          {featuredLetters.map((letter, i) => (
            <div
              key={letter.id}
              className="letter-glow rounded-xl px-3 py-2 text-center animate-fade-up"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", animationDelay: `${i * 50}ms` }}
            >
              <div className="text-xl font-black text-gradient">{letter.symbol.split("/")[0].trim()}</div>
              <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{letter.latin}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="section-alt rounded-2xl p-6 mb-10 border" style={{ borderColor: "var(--border)" }}>
        <div className="kente-stripe h-0.5 rounded-full mb-6 opacity-70" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "~300K", label: t("stats_speakers") },
            { value: "3", label: t("stats_countries") },
            { value: "24", label: t("stats_letters") },
            { value: "6", label: t("stats_classes") },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-gradient">{s.value}</div>
              <div className="text-sm mt-1 font-medium" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Culture highlights */}
      <div className="mb-10">
        <div className="badge badge-green mb-3">{t("section_culture")}</div>
        <h2 className="heading-md mb-5" style={{ color: "var(--text)" }}>{t("section_culture_sub")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CULTURAL_FACTS.slice(0, 4).map((fact) => (
            <div key={fact.title} className="card card-hover p-4">
              <div className="text-2xl mb-2">{fact.icon}</div>
              <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#009E49" }}>{fact.category}</div>
              <div className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>{fact.title}</div>
              <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>{fact.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alphabet teaser */}
      <div className="card p-8 text-center" style={{ border: "1px solid rgba(0,158,73,0.25)", background: "rgba(0,158,73,0.04)" }}>
        <div className="badge badge-green mb-3 mx-auto">{t("section_alphabet")}</div>
        <h2 className="heading-md mb-3" style={{ color: "var(--text)" }}>{t("section_alphabet_sub")}</h2>
        <div className="flex flex-wrap justify-center gap-2 my-5">
          {MANJAK_ALPHABET.slice(0, 12).map((letter) => (
            <div key={letter.id} className="alpha-chip w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black">
              {letter.symbol.split("/")[0].trim()}
            </div>
          ))}
        </div>
        <Link href="/alphabet" className="btn btn-primary">
          {t("explore_alphabet")}
        </Link>
      </div>
    </div>
  );
}

export default function TabApp({ initialTab }: TabAppProps) {
  const t = useTranslations("nav");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>((initialTab as Tab) || "home");

  const TABS: { id: Tab; label: string; emoji: string }[] = [
    { id: "home", label: t("home"), emoji: "🏠" },
    { id: "alphabet", label: t("alphabet"), emoji: "🔤" },
    { id: "learn", label: t("learn"), emoji: "📚" },
    { id: "history", label: t("history"), emoji: "🏺" },
    { id: "culture", label: t("culture"), emoji: "🎭" },
    { id: "dictionary", label: t("dictionary"), emoji: "📖" },
    { id: "keyboard", label: t("keyboard"), emoji: "⌨️" },
    { id: "media", label: t("media"), emoji: "🎬" },
    { id: "market", label: "Boutique", emoji: "🛍️" },
    { id: "studio", label: "Font Studio", emoji: "✏️" },
  ];

  const switchTab = useCallback(
    (tab: Tab) => {
      setActiveTab(tab);
      router.replace(tab === "home" ? "." : `?tab=${tab}`, { scroll: false });
    },
    [router]
  );

  return (
    <div className="min-h-screen pt-16 pb-20 lg:pb-0">
      {/* Sticky tab bar */}
      <div
        className="sticky top-14 z-40 border-b"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-none gap-0.5 py-1">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => switchTab(tab.id)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0"
                  style={{
                    background: active ? "rgba(0,158,73,0.12)" : "transparent",
                    color: active ? "#009E49" : "var(--text-muted)",
                    fontWeight: active ? 600 : 500,
                    borderBottom: active ? "2px solid #009E49" : "2px solid transparent",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <span className="text-base">{tab.emoji}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-0.5 kente-stripe opacity-40" />
      </div>

      {/* All tabs pre-mounted — CSS display toggle for instant switching */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div style={{ display: activeTab === "home" ? "block" : "none" }}><HomeTab /></div>
        <div style={{ display: activeTab === "alphabet" ? "block" : "none" }}><AlphabetTab isActive={activeTab === "alphabet"} /></div>
        <div style={{ display: activeTab === "learn" ? "block" : "none" }}><LearnTab /></div>
        <div style={{ display: activeTab === "history" ? "block" : "none" }}><HistoryTab /></div>
        <div style={{ display: activeTab === "culture" ? "block" : "none" }}><CultureTab /></div>
        <div style={{ display: activeTab === "dictionary" ? "block" : "none" }}><DictionaryTab /></div>
        <div style={{ display: activeTab === "keyboard" ? "block" : "none" }}><KeyboardTab /></div>
        <div style={{ display: activeTab === "media" ? "block" : "none" }}><MediaTab /></div>
        <div style={{ display: activeTab === "market" ? "block" : "none" }}><MarketplaceTab /></div>
        <div style={{ display: activeTab === "studio" ? "block" : "none" }}><FontStudio /></div>
      </div>

      <MobileBottomNav activeTab={activeTab} onSwitch={switchTab} />
    </div>
  );
}
