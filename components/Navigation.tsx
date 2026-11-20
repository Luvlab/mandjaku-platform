"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

export default function Navigation() {
  const t = useTranslations("nav");
  const a = useTranslations("a11y");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);


  return (
    <nav
      aria-label={a("main_nav")}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? "var(--surface)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" aria-label={`Manjaku, ${t("home")}`} className="flex items-center gap-2.5 group flex-shrink-0">
            <span
              className="h-8 px-3 rounded-lg flex items-center justify-center font-black text-white text-base tracking-tight"
              style={{ background: "linear-gradient(135deg, #009E49, #007A38)" }}
            >
              Manjaku
            </span>
            <span className="hidden sm:block text-xs font-medium opacity-50" style={{ color: "var(--text)" }}>Kabu lëp Manjak</span>
          </Link>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <LanguageSwitcher />
            <UserMenu />
          </div>
        </div>
      </div>

    </nav>
  );
}
