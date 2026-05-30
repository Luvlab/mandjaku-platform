"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const NAV_LINKS = [
    { href: "/", label: t("home"), icon: "🏠" },
    { href: "/alphabet", label: t("alphabet"), icon: "🔤" },
    { href: "/learn", label: t("learn"), icon: "📚" },
    { href: "/history", label: t("history"), icon: "🏺" },
    { href: "/culture", label: t("culture"), icon: "🎭" },
    { href: "/dictionary", label: t("dictionary"), icon: "📖" },
    { href: "/keyboard", label: t("keyboard"), icon: "⌨️" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D1117]/95 backdrop-blur-md border-b border-[#C8882A]/20 shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C8882A] to-[#9B6810] flex items-center justify-center text-base font-black text-white shadow-lg group-hover:shadow-[#C8882A]/40 transition-shadow">
              M
            </div>
            <span className="font-bold text-lg text-gradient hidden sm:block">
              Mandjaku
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-[#C8882A]/20 text-[#E8A94A] border border-[#C8882A]/30"
                    : "text-[#F5EDD3]/70 hover:text-[#F5EDD3] hover:bg-white/5"
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language switcher + mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block h-6 w-16 rounded-full kente-stripe opacity-60" />
            <LanguageSwitcher />
            <button
              className="md:hidden p-2 rounded-lg text-[#F5EDD3]/70 hover:text-[#F5EDD3] hover:bg-white/5 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all ${open ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0D1117]/98 border-t border-[#C8882A]/20 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === link.href
                  ? "bg-[#C8882A]/20 text-[#E8A94A] border border-[#C8882A]/30"
                  : "text-[#F5EDD3]/70 hover:text-[#F5EDD3] hover:bg-white/5"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <div className="h-1 mx-4 mt-3 rounded-full kente-stripe opacity-40" />
        </div>
      </div>
    </nav>
  );
}
