import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");

  const sections = [
    {
      title: t("language"),
      links: [
        { href: "/?tab=alphabet", label: tn("alphabet") },
        { href: "/?tab=learn", label: tn("learn") },
        { href: "/?tab=dictionary", label: tn("dictionary") },
        { href: "/?tab=keyboard", label: tn("keyboard") },
      ],
    },
    {
      title: t("culture_history"),
      links: [
        { href: "/?tab=history", label: tn("history") },
        { href: "/?tab=culture", label: tn("culture") },
        { href: "/?tab=media", label: tn("media") },
      ],
    },
    {
      title: t("project"),
      links: [
        { href: "/?tab=keyboard", label: "QMK / VIA" },
        { href: "mailto:info@luvlab.io", label: "Contact" },
      ],
    },
  ];

  return (
    <footer style={{ background: "var(--surface2)", borderTop: "1px solid var(--border)" }}>
      <div className="h-1 kente-stripe" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-white"
                style={{ background: "linear-gradient(135deg, #009E49, #007A38)" }}>
                M
              </div>
              <div>
                <div className="font-bold text-base" style={{ color: "var(--text)" }}>Mandjaku</div>
                <div className="text-xs italic" style={{ color: "var(--text-muted)" }}>Kabu lëp Manjak</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>
              {t("description")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/les_manjaques"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                📸 Instagram
              </a>
              <a
                href="https://github.com/Luvlab/mandjaku-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                ⭐ GitHub
              </a>
            </div>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#009E49" }}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="text-sm transition-colors"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href as "/"}
                        className="text-sm transition-colors"
                        style={{ color: "var(--text-muted)" }}
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

        {/* Flag colors strip + copyright */}
        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "#009E49" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#FCD116" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#CE1126" }} />
            <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>
              © 2025 LUVlab.io · {t("copyright")}
            </span>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t("speakers_note")}</p>
        </div>
      </div>
    </footer>
  );
}
