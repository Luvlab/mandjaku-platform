"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const YOUTUBE_VIDEOS = [
  { id: "6OqK15Pc19Y", title: "Musique Traditionnelle Manjak", channel: "Communauté Mandjaku" },
  { id: "v38vNjGzC2M", title: "Chants & Danses Mandjaku", channel: "Culture Manjak" },
  { id: "uP4FAnGmIRo", title: "Documentaire — Peuple Manjak", channel: "Africa Heritage" },
  { id: "cf0gwcZMB1I", title: "Les Manjak de Guinée-Bissau", channel: "Afriques en scène" },
  { id: "Dz7h4c2gG_E", title: "Rites et Cérémonies Manjak", channel: "Ethnologie" },
  { id: "cdmEudPoRNQ", title: "Mandjaku — Langue Atlantique", channel: "Linguistique" },
  { id: "6h0pMnwM9L8", title: "Diaspora Manjak en Europe", channel: "Afrique diaspora" },
  { id: "ir9XDvuYpcY", title: "Cuisine & Traditions Manjak", channel: "Saveurs du monde" },
];

const EXTERNAL_LINKS = [
  {
    title: "Instagram — Les Manjaques",
    url: "https://www.instagram.com/les_manjaques",
    desc: "Communauté Manjak sur Instagram — photos, vidéos, actualités",
    icon: "📸",
  },
  {
    title: "WAVF Schools — Manjak Community",
    url: "https://www.wavschools.org",
    desc: "Organisation éducative soutenant les communautés Manjak",
    icon: "🏫",
  },
  {
    title: "Scoot West Africa",
    url: "https://scootwestafrica.com",
    desc: "Voyages et culture en Afrique de l'Ouest — Cacheu, Guinée-Bissau",
    icon: "🌍",
  },
];

const GALLERY_ITEMS = [
  { icon: "🧵", label: "Textiles" },
  { icon: "🏺", label: "Poterie" },
  { icon: "🥁", label: "Tambours" },
  { icon: "🌾", label: "Riziculture" },
  { icon: "🐟", label: "Pêche" },
  { icon: "🌴", label: "Palmier" },
  { icon: "🏘️", label: "Village" },
  { icon: "🎭", label: "Danses" },
];

export default function MediaTab() {
  const t = useTranslations("nav");

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="badge badge-green mb-3 mx-auto">🎬 Médias & Ressources</div>
        <h2 className="heading-lg" style={{ color: "var(--text)" }}>Médias Manjak</h2>
        <p className="body-lg max-w-2xl mx-auto mt-3">
          Documentaires, musique, danses traditionnelles et ressources pour explorer
          la culture Manjak par l&apos;image et le son.
        </p>
      </div>

      {/* Videos grid */}
      <div className="mb-12">
        <h3 className="heading-md mb-6" style={{ color: "var(--text)" }}>
          <span className="text-gradient">Vidéos & Documentaires</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {YOUTUBE_VIDEOS.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover overflow-hidden block"
            >
              <div
                className="aspect-video flex items-center justify-center relative overflow-hidden"
                style={{ background: "rgba(0,158,73,0.08)" }}
              >
                <div className="text-3xl z-10 relative">▶</div>
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }}
                />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-white/70 text-xs">{v.channel}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="font-medium text-sm leading-snug mb-1" style={{ color: "var(--text)" }}>{v.title}</div>
                <div className="text-xs" style={{ color: "#009E49" }}>YouTube →</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* External links */}
      <div className="mb-12">
        <h3 className="heading-md mb-6" style={{ color: "var(--text)" }}>
          <span className="text-gradient">Ressources Externes</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {EXTERNAL_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover p-6 block"
            >
              <div className="text-3xl mb-3">{link.icon}</div>
              <div className="font-bold mb-2" style={{ color: "var(--text)" }}>{link.title}</div>
              <p className="body-sm mb-3">{link.desc}</p>
              <div className="text-sm font-medium" style={{ color: "#009E49" }}>Visiter →</div>
            </a>
          ))}
        </div>
      </div>

      {/* Gallery placeholder */}
      <div className="mb-12">
        <h3 className="heading-md mb-2" style={{ color: "var(--text)" }}>
          <span className="text-gradient">Galerie Culturelle</span>
        </h3>
        <p className="body-sm mb-6">Textiles, poterie, architecture et vie quotidienne du peuple Manjak</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {GALLERY_ITEMS.map((item) => (
            <div key={item.label} className="card aspect-square flex flex-col items-center justify-center gap-2 text-center p-3">
              <div className="text-3xl">{item.icon}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{item.label}</div>
            </div>
          ))}
        </div>
        <div className="card mt-4 p-4 text-center">
          <p className="body-sm">
            📸 La galerie photo complète sera ajoutée avec des images de la communauté Manjak.{" "}
            <a href="mailto:info@luvlab.io" style={{ color: "#009E49" }}>Partagez vos photos.</a>
          </p>
        </div>
      </div>

      {/* Community */}
      <div className="card p-8 text-center" style={{ border: "1px solid rgba(0,158,73,0.25)", background: "rgba(0,158,73,0.04)" }}>
        <div className="text-4xl mb-4">🌍</div>
        <h2 className="heading-md mb-4" style={{ color: "var(--text)" }}>Rejoindre la Communauté</h2>
        <p className="body-lg max-w-2xl mx-auto mb-6">
          Que vous soyez Manjak de Guinée-Bissau, du Sénégal, de Gambie ou de la diaspora en Europe —
          cette plateforme est la vôtre. Partagez, contribuez et aidez à préserver une culture millénaire.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://www.instagram.com/les_manjaques"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            📸 Instagram
          </a>
          <a href="mailto:info@luvlab.io" className="btn btn-primary">
            📧 Nous écrire
          </a>
          <Link href="/learn" className="btn" style={{ background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)" }}>
            📚 {t("learn")}
          </Link>
        </div>
      </div>
    </div>
  );
}
