import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CULTURAL_FACTS } from "@/data/history";
import { MANJAK_ALPHABET } from "@/data/alphabet";

const HERO_LETTERS = ["A", "B", "D", "E", "K", "M", "N", "S"];

export default async function HomePage() {
  const t = await getTranslations("home");
  const featuredLetters = MANJAK_ALPHABET.filter((l) => HERO_LETTERS.includes(l.id)).slice(0, 8);

  const quickLinks = [
    { href: "/alphabet" as const, icon: "🔤", label: t("cta_alphabet"), desc: "24 lettres · IPA · symboles originaux" },
    { href: "/learn" as const,    icon: "📚", label: t("cta_learn"),    desc: "Leçons interactives & quiz" },
    { href: "/history" as const,  icon: "🏺", label: t("section_explore"), desc: "Des origines à aujourd'hui" },
    { href: "/culture" as const,  icon: "🎭", label: t("section_culture"), desc: "Musique, rites, proverbes" },
    { href: "/dictionary" as const, icon: "📖", label: "Dictionnaire", desc: "Mandjaku · FR · EN · PT" },
    { href: "/keyboard" as const, icon: "⌨️", label: "Clavier", desc: "Windows · macOS · Android · HarmonyOS" },
  ];

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex flex-col items-center justify-center pt-14 overflow-hidden pattern-bg"
        style={{ background: "linear-gradient(160deg, var(--bg) 60%, rgba(0,158,73,0.06) 100%)" }}
      >
        {/* Guinea-Bissau flag stripe accent */}
        <div className="absolute top-0 left-0 right-0 h-1 kente-stripe" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">

          {/* Heritage tagline */}
          <div className="badge badge-green mb-6 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#009E49] animate-pulse" />
            {t("tag")}
          </div>

          {/* Main title */}
          <h1 className="heading-xl mb-4">
            <span className="text-gradient">Mandjaku</span>
          </h1>

          <p className="text-xl font-medium mb-3" style={{ color: "var(--text)" }}>
            {t("subtitle")}
          </p>

          {/* Heritage quote */}
          <blockquote
            className="text-base italic mb-6 max-w-xl mx-auto"
            style={{ color: "var(--text-muted)", borderLeft: "3px solid #009E49", paddingLeft: "1rem", textAlign: "left" }}
          >
            &ldquo;The Manjaku are a civilization of weavers and kings.&rdquo;
          </blockquote>

          <p className="body-lg max-w-2xl mx-auto mb-10">
            {t("description")}{" "}
            <strong style={{ color: "#009E49" }}>{t("speakers")}</strong>{" "}
            {t("countries")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <Link href="/alphabet" className="btn btn-primary text-base px-6 py-3">
              🔤 {t("cta_alphabet")}
            </Link>
            <Link href="/learn" className="btn btn-outline text-base px-6 py-3">
              📚 {t("cta_learn")}
            </Link>
          </div>

          {/* Floating letter strip */}
          <div className="flex justify-center gap-2 flex-wrap">
            {featuredLetters.map((letter, i) => (
              <div
                key={letter.id}
                className="letter-glow rounded-xl px-4 py-3 text-center animate-fade-up"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                <div className="text-2xl font-black text-gradient">{letter.symbol.split("/")[0].trim()}</div>
                <div className="text-xs mt-0.5 font-mono" style={{ color: "var(--text-muted)" }}>{letter.latin}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to top, var(--bg), transparent)" }} />
      </section>

      {/* ── Stats ── */}
      <section className="section-alt border-y" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="kente-stripe h-1 rounded-full mb-8 opacity-70" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
      </section>

      {/* ── Quick links ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="badge badge-green mb-3">{t("section_explore")}</div>
          <h2 className="heading-lg" style={{ color: "var(--text)" }}>{t("section_explore_sub")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card card-hover p-6 block group"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-semibold text-base mb-1 transition-colors group-hover:text-[#009E49]"
                style={{ color: "var(--text)" }}>
                {item.label}
              </div>
              <div className="body-sm">{item.desc}</div>
              <div className="mt-4 text-sm font-semibold" style={{ color: "#009E49" }}>
                Découvrir →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Culture highlights ── */}
      <section className="section-alt py-20 border-y" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="badge badge-green mb-3">{t("section_culture")}</div>
            <h2 className="heading-lg" style={{ color: "var(--text)" }}>{t("section_culture_sub")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CULTURAL_FACTS.slice(0, 8).map((fact) => (
              <div key={fact.title} className="card card-hover p-5">
                <div className="text-2xl mb-3">{fact.icon}</div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#009E49" }}>
                  {fact.category}
                </div>
                <div className="font-semibold text-sm mb-2" style={{ color: "var(--text)" }}>{fact.title}</div>
                <p className="text-xs leading-relaxed line-clamp-3" style={{ color: "var(--text-muted)" }}>
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/culture" className="btn btn-outline">
              {t("see_culture")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Alphabet teaser ── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-10 text-center" style={{ border: "1px solid rgba(0,158,73,0.25)", background: "rgba(0,158,73,0.04)" }}>
          <div className="badge badge-green mb-4 mx-auto">{t("section_alphabet")}</div>
          <h2 className="heading-lg mb-4" style={{ color: "var(--text)" }}>
            {t("section_alphabet_sub")}
          </h2>
          <p className="body-lg max-w-2xl mx-auto mb-8">
            Les anciens du peuple Manjak développent 24 symboles graphiques uniques —
            un projet historique de préservation culturelle depuis <strong style={{ color: "var(--text)" }}>Cacheu, Guinée-Bissau</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {MANJAK_ALPHABET.slice(0, 16).map((letter) => (
              <div
                key={letter.id}
                className="alpha-chip w-12 h-12 rounded-lg flex items-center justify-center text-lg font-black"
              >
                {letter.symbol.split("/")[0].trim()}
              </div>
            ))}
          </div>
          <Link href="/alphabet" className="btn btn-primary">
            {t("explore_alphabet")}
          </Link>
        </div>
      </section>
    </div>
  );
}
