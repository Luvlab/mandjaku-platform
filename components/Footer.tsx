import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");

  const sections = [
    {
      title: t("language"),
      links: [
        { href: "/alphabet", label: tn("alphabet") },
        { href: "/learn", label: tn("learn") },
        { href: "/dictionary", label: tn("dictionary") },
        { href: "/keyboard", label: tn("keyboard") },
      ],
    },
    {
      title: t("culture_history"),
      links: [
        { href: "/history", label: tn("history") },
        { href: "/culture", label: tn("culture") },
        { href: "/culture", label: "Rites & Musique" },
        { href: "/culture", label: "Proverbes" },
      ],
    },
    {
      title: t("project"),
      links: [
        { href: "/keyboard", label: "QMK / VIA" },
        { href: "/media", label: tn("media") },
        { href: "mailto:info@luvlab.io", label: "Contact" },
      ],
    },
  ];

  return (
    <footer className="bg-[#080C10] border-t border-[#C8882A]/20 pattern-bg">
      <div className="h-1 kente-stripe w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8882A] to-[#9B6810] flex items-center justify-center text-lg font-black text-white">
                M
              </div>
              <span className="font-bold text-xl text-gradient">Mandjaku</span>
            </div>
            <p className="text-[#F5EDD3]/50 text-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/les_manjaques"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5EDD3]/40 hover:text-[#C8882A] transition-colors text-sm"
                aria-label="Instagram"
              >
                📸 Instagram
              </a>
            </div>
          </div>

          {/* Links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[#C8882A] font-semibold text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="text-[#F5EDD3]/50 hover:text-[#F5EDD3] text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href as "/"}
                        className="text-[#F5EDD3]/50 hover:text-[#F5EDD3] text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#C8882A]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#F5EDD3]/30 text-xs">
            © 2025 LUVlab.io · {t("copyright")}
          </p>
          <p className="text-[#F5EDD3]/30 text-xs">{t("speakers_note")}</p>
        </div>
      </div>
    </footer>
  );
}
