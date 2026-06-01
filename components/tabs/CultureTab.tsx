"use client";

import { useTranslations } from "next-intl";
import { CULTURAL_FACTS } from "@/data/history";
import { PROVERBS } from "@/data/alphabet";

const MUSIC_INSTRUMENTS = [
  { name: "Tambour", emoji: "🥁", desc: "Instrument central des cérémonies Manjak. Chaque rythme transmet un message codé. Les tambourinaires sont des griots respectés." },
  { name: "Balafon", emoji: "🎵", desc: "Xylophone à lames de bois avec calebasses résonantes. Son son cristallin accompagne les fêtes de récolte et les funérailles." },
  { name: "Kora", emoji: "🎸", desc: "Harpe-luth à 21 cordes partagée avec les peuples Mandé. Instrument de narration par excellence, elle chante l'histoire des clans." },
  { name: "Flûte", emoji: "🎶", desc: "Flûtes en bambou utilisées lors des rites de passage. Leurs mélodies accompagnent les initiés dans leur transition." },
];

const RITES = [
  { name: "Le Fanado", emoji: "🔥", description: "Rite d'initiation masculin. Les jeunes garçons sont instruits par les anciens sur les responsabilités de l'homme Manjak : courage, respect des ancêtres, connaissance des traditions." },
  { name: "Rites Féminins", emoji: "🌺", description: "Cérémonies célébrant la transition des jeunes filles. Enseignements sur la sagesse féminine et la transmission des savoirs artisanaux." },
  { name: "Funérailles", emoji: "🕊️", description: "Les funérailles Manjak peuvent durer plusieurs jours. Les ancêtres sont vénérés et leur esprit (bëpëk) est invoqué. La musique et la danse permettent à l'âme du défunt de rejoindre les ancêtres." },
  { name: "Rites Agricoles", emoji: "🌾", description: "Avant les semailles du riz et après la récolte, des cérémonies de remerciement aux esprits de la terre sont organisées." },
  { name: "Mariage", emoji: "💛", description: "Le mariage Manjak est une affaire de clans. La dot renforce les alliances entre lignages. Les festivités durent plusieurs jours avec musique et danses rituelles." },
  { name: "Libation aux Ancêtres", emoji: "🌿", description: "Pratique de vénération — on verse de l'alcool de palme sur le sol pour appeler les esprits des ancêtres et leur demander protection et sagesse." },
];

const TEXTILES = [
  { title: "Tissu Manjak", desc: "Tissus à bandes colorées aux motifs géométriques. Chaque motif a une signification : clan, statut social, occasion festive ou deuil." },
  { title: "Vannerie", desc: "Les paniers et nattes tressés par les femmes Manjak sont réputés pour leur finesse. Ils servent de récipients, de décorations et de cadeaux de prestige." },
  { title: "Poterie", desc: "Art ancestral transmis de mère en fille. Les poteries Manjak sont décorées de motifs incisés et polies à la main." },
];

export default function CultureTab() {
  const t = useTranslations("culture");

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="badge badge-green mb-3 mx-auto">{t("tag")}</div>
        <h2 className="heading-lg" style={{ color: "var(--text)" }}>{t("title")}</h2>
        <p className="body-lg max-w-2xl mx-auto mt-3">
          La culture Manjak est un tissu vivant de musique, de rites sacrés, d&apos;artisanat et
          de littérature orale. Transmise de génération en génération, elle défie le temps.
        </p>
      </div>

      {/* Cultural facts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {CULTURAL_FACTS.map((fact) => (
          <div key={fact.title} className="card card-hover p-5">
            <div className="text-3xl mb-3">{fact.icon}</div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#009E49" }}>
              {fact.category}
            </div>
            <div className="font-bold text-sm mb-2" style={{ color: "var(--text)" }}>{fact.title}</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{fact.description}</p>
          </div>
        ))}
      </div>

      {/* Music */}
      <div className="mb-12">
        <div className="badge badge-green mb-3">{t("music_title")}</div>
        <p className="body-sm mb-6">{t("music_sub")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MUSIC_INSTRUMENTS.map((inst) => (
            <div key={inst.name} className="card p-5 flex gap-4">
              <div className="text-4xl flex-shrink-0">{inst.emoji}</div>
              <div>
                <div className="font-bold mb-2" style={{ color: "var(--text)" }}>{inst.name}</div>
                <p className="body-sm leading-relaxed">{inst.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* YouTube links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {[
            { id: "6OqK15Pc19Y", title: "Musique Traditionnelle Manjak" },
            { id: "v38vNjGzC2M", title: "Chants et Danses Mandjaku" },
          ].map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover p-4 flex items-center gap-4"
            >
              <div
                className="w-14 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,158,73,0.10)" }}
              >
                <span style={{ color: "#009E49" }}>▶</span>
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: "var(--text)" }}>{video.title}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>YouTube →</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Rites */}
      <div className="mb-12">
        <div className="badge badge-green mb-3">{t("rites_title")}</div>
        <p className="body-sm mb-6">{t("rites_sub")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RITES.map((rite) => (
            <div key={rite.name} className="card p-5">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{rite.emoji}</div>
                <div>
                  <div className="font-bold mb-2" style={{ color: "var(--text)" }}>{rite.name}</div>
                  <p className="body-sm leading-relaxed">{rite.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Textiles */}
      <div className="mb-12">
        <div className="badge badge-green mb-3">{t("textiles_title")}</div>
        <div className="kente-stripe h-1 rounded-full max-w-xs mb-6 opacity-70" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEXTILES.map((item) => (
            <div key={item.title} className="card p-5 text-center">
              <div className="text-3xl mb-3">🧵</div>
              <div className="font-bold mb-2" style={{ color: "var(--text)" }}>{item.title}</div>
              <p className="body-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Oral literature */}
      <div>
        <div className="badge badge-green mb-3">{t("oral_title")}</div>
        <p className="body-sm mb-5">{t("oral_sub")}</p>
        <div className="space-y-4">
          {PROVERBS.map((p, i) => (
            <div key={i} className="card p-5">
              <div className="text-lg font-bold italic mb-3" style={{ color: "#009E49" }}>
                &ldquo;{p.manjak}&rdquo;
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="text-sm" style={{ color: "var(--text)" }}>🇫🇷 {p.french}</span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>🇬🇧 {p.english}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="card mt-4 p-5 text-center">
          <p className="body-sm">
            La tradition orale Manjak est immense — contes, épopées familiales, chants rituels.
            Ce projet vise à documenter et numériser ce patrimoine inestimable.
          </p>
        </div>
      </div>
    </div>
  );
}
