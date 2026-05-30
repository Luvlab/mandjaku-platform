import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CULTURAL_FACTS } from "@/data/history";
import { MANJAK_ALPHABET } from "@/data/alphabet";

const HERO_LETTERS = ["A", "B", "D", "E", "K", "M", "N", "S"];

export default async function HomePage() {
  const t = await getTranslations("home");
  const featuredLetters = MANJAK_ALPHABET.filter((l) => HERO_LETTERS.includes(l.id)).slice(0, 6);

  const quickLinks = [
    { href: "/alphabet" as const, label: t("cta_alphabet"), icon: "🔤", desc: "24 lettres avec prononciation" },
    { href: "/learn" as const, label: t("cta_learn"), icon: "📚", desc: "Leçons interactives & quiz" },
    { href: "/history" as const, label: t("section_explore"), icon: "🏺", desc: "Des origines à aujourd'hui" },
    { href: "/culture" as const, label: t("section_culture"), icon: "🎭", desc: "Musique, rites, proverbes" },
    { href: "/dictionary" as const, label: "Dictionnaire", icon: "📖", desc: "Mandjaku · FR · EN · PT" },
    { href: "/keyboard" as const, label: "Clavier", icon: "⌨️", desc: "Windows · Mac · Android · HarmonyOS" },
  ];

  return (
    <div className="pattern-bg">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#C8882A]/10 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#2D5016]/15 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#D4A017]/8 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C8882A]/30 text-[#C8882A] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#C8882A] animate-pulse" />
            {t("tag")}
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="text-gradient">{t("title")}</span>
            <br />
            <span className="text-[#F5EDD3]/80 text-3xl sm:text-4xl lg:text-5xl font-light">
              {t("subtitle")}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-[#F5EDD3]/60 text-lg sm:text-xl leading-relaxed mb-10">
            {t("description")}{" "}
            <strong className="text-[#C8882A]">{t("speakers")}</strong>{" "}
            {t("countries")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/alphabet"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#C8882A] to-[#9B6810] text-white font-bold text-lg hover:shadow-lg hover:shadow-[#C8882A]/30 transition-all hover:scale-105"
            >
              🔤 {t("cta_alphabet")}
            </Link>
            <Link
              href="/learn"
              className="px-8 py-4 rounded-xl glass border border-[#C8882A]/30 text-[#F5EDD3] font-bold text-lg hover:border-[#C8882A]/60 transition-all hover:scale-105"
            >
              📚 {t("cta_learn")}
            </Link>
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            {featuredLetters.map((letter, i) => (
              <div
                key={letter.id}
                className="glass letter-glow rounded-2xl p-4 text-center cursor-pointer hover:scale-110 transition-transform"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="text-3xl font-black text-gradient mb-1">{letter.symbol}</div>
                <div className="text-[#F5EDD3]/40 text-xs">{letter.latin}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D1117] to-transparent" />
      </section>

      {/* Stats banner */}
      <section className="py-8 bg-[#161B22] border-y border-[#C8882A]/15">
        <div className="max-w-6xl mx-auto px-4">
          <div className="kente-stripe h-1 rounded-full mb-8 opacity-60" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "~300K", label: t("stats_speakers") },
              { value: "3", label: t("stats_countries") },
              { value: "24", label: t("stats_letters") },
              { value: "6", label: t("stats_classes") },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-black text-gradient">{stat.value}</div>
                <div className="text-[#F5EDD3]/50 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick access */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            <span className="text-gradient">{t("section_explore")}</span>
          </h2>
          <p className="text-[#F5EDD3]/50">{t("section_explore_sub")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glass rounded-2xl p-6 group hover:border-[#C8882A]/40 hover:bg-[#C8882A]/5 transition-all"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="font-bold text-[#F5EDD3] text-lg mb-1 group-hover:text-[#E8A94A] transition-colors">
                {item.label}
              </div>
              <div className="text-[#F5EDD3]/40 text-sm">{item.desc}</div>
              <div className="mt-4 text-[#C8882A]/60 text-sm font-medium group-hover:text-[#C8882A] transition-colors">
                →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Culture highlights */}
      <section className="py-20 bg-[#0A0E13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              <span className="text-gradient">{t("section_culture")}</span>
            </h2>
            <p className="text-[#F5EDD3]/50">{t("section_culture_sub")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CULTURAL_FACTS.slice(0, 8).map((fact) => (
              <div
                key={fact.title}
                className="glass rounded-2xl p-5 hover:border-[#C8882A]/30 transition-all"
              >
                <div className="text-3xl mb-3">{fact.icon}</div>
                <div className="text-[#C8882A] text-xs font-semibold uppercase tracking-wider mb-1">
                  {fact.category}
                </div>
                <div className="text-[#F5EDD3] font-bold text-sm mb-2">{fact.title}</div>
                <p className="text-[#F5EDD3]/40 text-xs leading-relaxed line-clamp-3">
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/culture"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#C8882A]/30 text-[#C8882A] hover:bg-[#C8882A]/10 transition-all"
            >
              {t("see_culture")}
            </Link>
          </div>
        </div>
      </section>

      {/* Alphabet teaser */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 sm:p-12 text-center">
          <div className="text-5xl mb-4">🔤</div>
          <h2 className="text-3xl font-black mb-4">
            <span className="text-gradient">{t("section_alphabet")}</span>
          </h2>
          <p className="text-[#F5EDD3]/60 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("section_alphabet_sub")}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {MANJAK_ALPHABET.slice(0, 12).map((letter) => (
              <div
                key={letter.id}
                className="w-14 h-14 rounded-xl bg-[#C8882A]/10 border border-[#C8882A]/20 flex items-center justify-center text-xl font-black text-[#E8A94A] hover:bg-[#C8882A]/20 transition-colors"
              >
                {letter.symbol.split("/")[0].trim()}
              </div>
            ))}
          </div>
          <Link
            href="/alphabet"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#C8882A] to-[#9B6810] text-white font-bold hover:shadow-lg hover:shadow-[#C8882A]/30 transition-all"
          >
            {t("explore_alphabet")}
          </Link>
        </div>
      </section>
    </div>
  );
}
