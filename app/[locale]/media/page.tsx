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

export default function MediaPage() {
  return (
    <div className="min-h-screen pattern-bg pt-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C8882A]/30 text-[#C8882A] text-sm font-medium mb-6">
          🎬 Médias & Ressources
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4">
          <span className="text-gradient">Médias Manjak</span>
        </h1>
        <p className="text-[#F5EDD3]/60 max-w-2xl mx-auto">
          Documentaires, musique, danses traditionnelles et ressources pour explorer
          la culture Manjak par l&apos;image et le son.
        </p>
      </div>

      {/* Videos grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-2xl font-black mb-8">
          <span className="text-gradient">Vidéos & Documentaires</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {YOUTUBE_VIDEOS.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl overflow-hidden hover:border-[#C8882A]/40 transition-all group"
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-video bg-[#C8882A]/10 flex items-center justify-center relative overflow-hidden">
                <div className="text-4xl group-hover:scale-110 transition-transform">▶</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-white/60 text-xs">{v.channel}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-[#F5EDD3] font-medium text-sm leading-snug group-hover:text-[#E8A94A] transition-colors">
                  {v.title}
                </div>
                <div className="text-[#F5EDD3]/30 text-xs mt-2">YouTube →</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* External resources */}
      <section className="bg-[#0A0E13] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black mb-8">
            <span className="text-gradient">Ressources Externes</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {EXTERNAL_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-2xl p-6 hover:border-[#C8882A]/40 transition-all group"
              >
                <div className="text-4xl mb-3">{link.icon}</div>
                <div className="text-[#F5EDD3] font-bold mb-2 group-hover:text-[#E8A94A] transition-colors">
                  {link.title}
                </div>
                <p className="text-[#F5EDD3]/50 text-sm">{link.desc}</p>
                <div className="text-[#C8882A]/60 text-xs mt-3 group-hover:text-[#C8882A] transition-colors">
                  Visiter →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional textiles gallery placeholder */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black mb-4">
          <span className="text-gradient">Galerie Culturelle</span>
        </h2>
        <p className="text-[#F5EDD3]/50 mb-8">
          Textiles, poterie, architecture et vie quotidienne du peuple Manjak
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="aspect-square glass rounded-xl flex flex-col items-center justify-center gap-2 text-center p-4"
            >
              <div className="text-4xl">
                {["🧵", "🏺", "🥁", "🌾", "🐟", "🌴", "🏘️", "🎭"][i]}
              </div>
              <div className="text-[#F5EDD3]/30 text-xs">
                {["Textiles", "Poterie", "Tambours", "Riziculture", "Pêche", "Palmier", "Village", "Danses"][i]}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 glass rounded-xl p-4 text-center">
          <p className="text-[#F5EDD3]/40 text-sm">
            📸 La galerie photo complète sera ajoutée avec des images de la communauté Manjak.{" "}
            <a href="mailto:info@luvlab.io" className="text-[#C8882A] hover:underline">
              Partagez vos photos.
            </a>
          </p>
        </div>
      </section>

      {/* Community section */}
      <section className="bg-[#0A0E13] py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-8 sm:p-10">
            <div className="text-5xl mb-4">🌍</div>
            <h2 className="text-2xl font-black mb-4 text-gradient">
              Rejoindre la Communauté
            </h2>
            <p className="text-[#F5EDD3]/60 mb-8 leading-relaxed">
              Que vous soyez Manjak de Guinée-Bissau, du Sénégal, de Gambie ou de la
              diaspora en Europe — cette plateforme est la vôtre. Partagez, contribuez
              et aidez à préserver une culture millénaire.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://www.instagram.com/les_manjaques"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl glass border border-[#C8882A]/30 text-[#C8882A] font-bold hover:bg-[#C8882A]/10 transition-colors"
              >
                📸 Instagram
              </a>
              <a
                href="mailto:info@luvlab.io"
                className="px-6 py-3 rounded-xl bg-[#C8882A] text-white font-bold hover:bg-[#9B6810] transition-colors"
              >
                📧 Nous écrire
              </a>
              <Link
                href="/learn"
                className="px-6 py-3 rounded-xl glass text-[#F5EDD3] font-bold hover:border-[#C8882A]/30 transition-colors"
              >
                📚 Apprendre la langue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
