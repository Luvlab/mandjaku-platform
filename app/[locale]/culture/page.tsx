import { CULTURAL_FACTS } from "@/data/history";
import { PROVERBS } from "@/data/alphabet";

const MUSIC_INSTRUMENTS = [
  { name: "Tambour", emoji: "🥁", desc: "Instrument central des cérémonies Manjak. Chaque rythme transmet un message codé. Les tambourinaires sont des griots respectés." },
  { name: "Balafon", emoji: "🎵", desc: "Xylophone à lames de bois avec calebasses résonantes. Son son cristallin accompagne les fêtes de récolte et les funérailles." },
  { name: "Kora", emoji: "🎸", desc: "Harpe-luth à 21 cordes, partagée avec les peuples Mandé. Instrument de narration par excellence, la kora chante l'histoire des clans." },
  { name: "Flûte", emoji: "🎶", desc: "Flûtes en bambou utilisées lors des rites de passage. Leurs mélodies accompagnent les initiés dans leur transition vers l'âge adulte." },
];

const RITES = [
  {
    name: "Le Fanado",
    emoji: "🔥",
    description: "Rite d'initiation masculin. Les jeunes garçons sont retirés du village pendant plusieurs semaines et instruits par les anciens sur les responsabilités de l'homme Manjak : courage, respect des ancêtres, connaissance des traditions.",
  },
  {
    name: "Rites Féminins",
    emoji: "🌺",
    description: "Cérémonies célébrant la transition des jeunes filles vers l'âge adulte. Elles incluent des enseignements sur la gestion du foyer, la sagesse féminine, et la transmission des savoirs culinaires et artisanaux.",
  },
  {
    name: "Funérailles",
    emoji: "🕊️",
    description: "Les funérailles Manjak sont élaborées et peuvent durer plusieurs jours. Les ancêtres sont vénérés et leur esprit (bëpëk) est invoqué. La musique, la danse et les sacrifices permettent à l'âme du défunt de rejoindre les ancêtres.",
  },
  {
    name: "Rites Agricoles",
    emoji: "🌾",
    description: "Avant les semailles du riz et après la récolte, des cérémonies de remerciement aux esprits de la terre sont organisées. Ces rites garantissent la fertilité de la terre et la prospérité de la communauté.",
  },
  {
    name: "Mariage",
    emoji: "💛",
    description: "Le mariage Manjak est une affaire de clans autant que d'individus. La dot (payée en bétail ou en liquide) renforce les alliances entre lignages. Les festivités durent plusieurs jours avec musique et danses rituelles.",
  },
  {
    name: "Libation aux Ancêtres",
    emoji: "🌿",
    description: "Pratique quotidienne de vénération. On verse de l'alcool de palme ou de l'eau sur le sol pour appeler les esprits des ancêtres et leur demander protection, sagesse et abondance.",
  },
];

const TEXTILES_INFO = [
  { title: "Tissu Manjak", desc: "Tissus à bandes colorées aux motifs géométriques. Chaque motif a une signification : clan, statut social, occasion festive ou deuil." },
  { title: "Vannerie", desc: "Les paniers et nattes tressés par les femmes Manjak sont réputés pour leur finesse. Ils servent de récipients, de décorations et de cadeaux de prestige." },
  { title: "Poterie", desc: "Art ancestral transmis de mère en fille. Les poteries Manjak (jarres, cruches, récipients rituels) sont décorées de motifs incisés et polies à la main." },
];

export default function CulturePage() {
  return (
    <div className="min-h-screen pattern-bg pt-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C8882A]/30 text-[#C8882A] text-sm font-medium mb-6">
          🎭 Culture & Traditions Manjak
        </div>
        <h1 className="text-4xl sm:text-6xl font-black mb-6">
          <span className="text-gradient">Culture Vivante</span>
        </h1>
        <p className="max-w-3xl mx-auto text-[#F5EDD3]/60 text-lg leading-relaxed">
          La culture Manjak est un tissu vivant de musique, de rites sacrés, d&apos;artisanat et
          de littérature orale. Transmise de génération en génération, elle défie le temps et
          la distance.
        </p>
      </div>

      {/* Cultural facts grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CULTURAL_FACTS.map((fact) => (
            <div key={fact.title} className="glass rounded-2xl p-6 hover:border-[#C8882A]/30 transition-all">
              <div className="text-4xl mb-3">{fact.icon}</div>
              <div className="text-[#C8882A] text-xs font-semibold uppercase tracking-wider mb-2">{fact.category}</div>
              <div className="text-[#F5EDD3] font-bold mb-2">{fact.title}</div>
              <p className="text-[#F5EDD3]/50 text-sm leading-relaxed">{fact.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Music section */}
      <section className="bg-[#0A0E13] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-4">
            <span className="text-gradient">Musique & Instruments</span>
          </h2>
          <p className="text-center text-[#F5EDD3]/50 mb-10">
            La musique est l&apos;âme du peuple Manjak — chaque tambour raconte une histoire
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MUSIC_INSTRUMENTS.map((inst) => (
              <div key={inst.name} className="glass rounded-2xl p-6 flex gap-5">
                <div className="text-5xl flex-shrink-0">{inst.emoji}</div>
                <div>
                  <div className="text-[#F5EDD3] font-bold text-lg mb-2">{inst.name}</div>
                  <p className="text-[#F5EDD3]/50 text-sm leading-relaxed">{inst.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube videos */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#F5EDD3] mb-6 text-center">
              Documentaires & Musique Manjak
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: "6OqK15Pc19Y", title: "Musique Traditionnelle Manjak" },
                { id: "v38vNjGzC2M", title: "Chants et Danses Mandjaku" },
                { id: "uP4FAnGmIRo", title: "Culture Manjak — Documentaire" },
                { id: "Dz7h4c2gG_E", title: "Rites et Cérémonies" },
              ].map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-xl p-4 flex items-center gap-4 hover:border-[#C8882A]/40 transition-all group"
                >
                  <div className="w-16 h-12 rounded-lg bg-[#C8882A]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C8882A]/30 transition-colors">
                    <div className="text-[#C8882A] text-2xl">▶</div>
                  </div>
                  <div>
                    <div className="text-[#F5EDD3]/70 text-sm font-medium group-hover:text-[#F5EDD3] transition-colors">
                      {video.title}
                    </div>
                    <div className="text-[#F5EDD3]/30 text-xs mt-1">YouTube →</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rites de passage */}
      <section id="rites" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-center mb-4">
          <span className="text-gradient">Rites de Passage</span>
        </h2>
        <p className="text-center text-[#F5EDD3]/50 mb-10">
          Les cérémonies qui structurent la vie Manjak de la naissance à la mort
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {RITES.map((rite) => (
            <div key={rite.name} className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{rite.emoji}</div>
                <div>
                  <div className="text-[#F5EDD3] font-bold text-lg mb-2">{rite.name}</div>
                  <p className="text-[#F5EDD3]/50 text-sm leading-relaxed">{rite.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Textiles & Artisanat */}
      <section className="bg-[#0A0E13] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-4">
            <span className="text-gradient">Artisanat & Textiles</span>
          </h2>
          <div className="h-2 rounded-full kente-stripe mx-auto max-w-xs mb-10 opacity-60" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEXTILES_INFO.map((item) => (
              <div key={item.title} className="glass rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🧵</div>
                <div className="text-[#F5EDD3] font-bold mb-2">{item.title}</div>
                <p className="text-[#F5EDD3]/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proverbs */}
      <section id="proverbes" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-center mb-4">
          <span className="text-gradient">Littérature Orale</span>
        </h2>
        <p className="text-center text-[#F5EDD3]/50 mb-10">
          Proverbes, contes et sagesse du peuple Manjak transmis de génération en génération
        </p>
        <div className="space-y-4">
          {PROVERBS.map((p, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <div className="text-[#E8A94A] text-xl font-bold italic mb-3">
                &ldquo;{p.manjak}&rdquo;
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="text-[#F5EDD3]/60 text-sm">🇫🇷 {p.french}</span>
                <span className="text-[#F5EDD3]/40 text-sm">🇬🇧 {p.english}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 glass rounded-2xl p-6 text-center">
          <p className="text-[#F5EDD3]/50 text-sm">
            La tradition orale Manjak est immense. Contes, épopées familiales, chants rituels —
            chaque récit est un fil dans le tissu de la mémoire collective du peuple.
            Ce projet vise à documenter et numériser ce patrimoine inestimable.
          </p>
        </div>
      </section>
    </div>
  );
}
