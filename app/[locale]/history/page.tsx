import { HISTORY_ERAS, GEOGRAPHY } from "@/data/history";

export default function HistoryPage() {
  return (
    <div className="min-h-screen pattern-bg pt-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C8882A]/30 text-[#C8882A] text-sm font-medium mb-6">
          🏺 Histoire du Peuple Manjak
        </div>
        <h1 className="text-4xl sm:text-6xl font-black mb-6">
          <span className="text-gradient">Les Sindjak</span>
          <br />
          <span className="text-[#F5EDD3]/70 text-2xl sm:text-3xl font-light">
            Un peuple de la Sénégambie
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-[#F5EDD3]/60 text-lg leading-relaxed">
          Les Manjak (Mandjaku, Manjaco, Sindjak) sont un peuple d&apos;Afrique de l&apos;Ouest
          profondément lié à la côte atlantique. Agriculteurs, pêcheurs et navigateurs,
          ils ont résisté aux vagues de colonisation tout en préservant une culture et une
          langue d&apos;une richesse exceptionnelle.
        </p>
      </div>

      {/* Kente divider */}
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <div className="h-2 rounded-full kente-stripe opacity-50" />
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C8882A] via-[#C8882A]/40 to-transparent" />

          {HISTORY_ERAS.map((era, i) => (
            <div key={era.id} className={`relative flex gap-8 mb-16 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
              {/* Timeline node */}
              <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#C8882A] border-4 border-[#0D1117] mt-8 z-10 animate-pulse-glow" />

              {/* Content */}
              <div className={`ml-16 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}`}>
                <div className="glass rounded-2xl p-6 hover:border-[#C8882A]/30 transition-all">
                  <div className="text-[#C8882A] text-xs font-semibold uppercase tracking-wider mb-2">
                    {era.period}
                  </div>
                  <h2 className="text-[#F5EDD3] text-xl font-bold mb-4">{era.title}</h2>
                  <div className="space-y-3">
                    {era.content.map((paragraph, j) => (
                      <p key={j} className="text-[#F5EDD3]/60 text-sm leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden sm:block sm:w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Geography */}
      <section className="bg-[#0A0E13] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-10">
            <span className="text-gradient">Géographie Manjak</span>
          </h2>

          <h3 className="text-[#C8882A] font-semibold uppercase tracking-wider text-sm mb-6">
            Régions principales
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {GEOGRAPHY.primaryRegions.map((region) => (
              <div key={region.country} className="glass rounded-2xl p-6">
                <div className="text-2xl mb-3">
                  {region.country === "Guinée-Bissau" ? "🇬🇼" : region.country === "Sénégal" ? "🇸🇳" : "🇬🇲"}
                </div>
                <div className="text-[#F5EDD3] font-bold text-lg mb-2">{region.country}</div>
                <div className="text-[#F5EDD3]/50 text-sm mb-3">{region.regions.join(" · ")}</div>
                <div className="text-[#C8882A] font-semibold text-lg">{region.population}</div>
                <div className="text-[#F5EDD3]/30 text-xs">locuteurs estimés</div>
              </div>
            ))}
          </div>

          <h3 className="text-[#C8882A] font-semibold uppercase tracking-wider text-sm mb-6">
            Diaspora en Europe
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {GEOGRAPHY.diaspora.map((d) => (
              <div key={d.country} className="glass rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">
                  {d.country === "Portugal" ? "🇵🇹" : d.country === "France" ? "🇫🇷" : d.country === "Suède" ? "🇸🇪" : d.country === "Espagne" ? "🇪🇸" : "🇮🇹"}
                </div>
                <div className="text-[#F5EDD3] font-bold text-sm">{d.country}</div>
                <div className="text-[#F5EDD3]/40 text-xs mt-1">{d.city}</div>
                <div className="text-[#C8882A]/60 text-xs mt-1">{d.notes}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Resistance section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 sm:p-12">
          <div className="text-5xl mb-4 text-center">⚔️</div>
          <h2 className="text-3xl font-black text-center mb-6">
            <span className="text-gradient">Un Peuple de Résistants</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 text-[#F5EDD3]/60 text-sm leading-relaxed">
            <div>
              <p>
                Malgré des siècles de pressions extérieures — traite négrière, colonisation
                portugaise, influence des religions monothéistes — le peuple Manjak a su
                préserver l&apos;essentiel de sa culture, de sa langue et de son identité.
              </p>
            </div>
            <div>
              <p>
                Aujourd&apos;hui, cette résilience se manifeste dans le projet de création d&apos;un
                alphabet propre à la langue Mandjaku — un acte de souveraineté culturelle porté
                par les anciens et soutenu par la diaspora mondiale.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { icon: "🌊", text: "Peuple côtier & maritime" },
              { icon: "🌾", text: "Maîtres de la riziculture" },
              { icon: "📜", text: "Créateurs de leur alphabet" },
            ].map((item) => (
              <div key={item.text} className="bg-[#C8882A]/10 rounded-xl p-4">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-[#F5EDD3]/70 text-xs">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
