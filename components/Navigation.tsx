"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

export default function Navigation() {
  const t = useTranslations("nav");
  const a = useTranslations("a11y");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Nav links only used in the mobile menu — desktop navigation is handled
  // by the TabApp sticky tab strip (avoids double menu on desktop).
  const NAV_LINKS = [
    { href: "/", label: t("home") },
    { href: "/?tab=alphabet", label: t("alphabet") },
    { href: "/?tab=learn", label: t("learn") },
    { href: "/?tab=history", label: t("history") },
    { href: "/?tab=culture", label: t("culture") },
    { href: "/?tab=dictionary", label: t("dictionary") },
    { href: "/?tab=keyboard", label: t("keyboard") },
    { href: "/?tab=media", label: t("media") },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

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
          <Link href="/" aria-label={`Manjak, ${t("home")}`} className="flex items-center gap-2.5 group flex-shrink-0">
            <span
              className="h-8 px-3 rounded-lg flex items-center justify-center font-black text-white text-base tracking-tight"
              style={{ background: "linear-gradient(135deg, #009E49, #007A38)" }}
            >
              Manjak
            </span>
            <span className="hidden sm:block text-xs font-medium opacity-50" style={{ color: "var(--text)" }}>Kabu lëp Manjak</span>
          </Link>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <LanguageSwitcher />
            <UserMenu />
            {/* Mobile hamburger */}
            <button
              className="lg:hidden ml-1 w-8 h-8 flex items-center justify-center rounded-md transition-colors"
              style={{ color: "var(--text-muted)" }}
              onClick={() => setOpen(!open)}
              aria-label={a(open ? "menu_close" : "menu_open")}
              aria-expanded={open}
            >
              {open ? (
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="h-1 kente-stripe" />
        </div>
      )}
    </nav>
  );
}
