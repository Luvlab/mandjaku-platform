"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, { label: string; flag: string }> = {
  fr: { label: "Français", flag: "🇫🇷" },
  en: { label: "English", flag: "🇬🇧" },
  pt: { label: "Português", flag: "🇵🇹" },
  de: { label: "Deutsch", flag: "🇩🇪" },
  es: { label: "Español", flag: "🇪🇸" },
  zh: { label: "中文", flag: "🇨🇳" },
  ja: { label: "日本語", flag: "🇯🇵" },
  sw: { label: "Kiswahili", flag: "🇰🇪" },
  ff: { label: "Fulfulde", flag: "🌍" },
  wo: { label: "Wolof", flag: "🌍" },
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  const current = LOCALE_LABELS[locale];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#F5EDD3]/70 hover:text-[#F5EDD3] hover:bg-white/5 border border-transparent hover:border-[#C8882A]/20 transition-all"
        aria-label={t("language_switcher")}
      >
        <span>{current?.flag}</span>
        <span className="hidden sm:block">{current?.label}</span>
        <span className="text-[10px] opacity-60">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-[#0D1117]/98 border border-[#C8882A]/20 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-[100]">
          <div className="py-1">
            {routing.locales.map((loc) => {
              const info = LOCALE_LABELS[loc];
              return (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors ${
                    loc === locale
                      ? "text-[#E8A94A] bg-[#C8882A]/15"
                      : "text-[#F5EDD3]/60 hover:text-[#F5EDD3] hover:bg-white/5"
                  }`}
                >
                  <span>{info?.flag}</span>
                  <span>{info?.label}</span>
                  {loc === locale && <span className="ml-auto text-[#C8882A]">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
