"use client";

import { useTranslations } from "next-intl";
import { HISTORY_ERAS, GEOGRAPHY } from "@/data/history";

export default function HistoryTab() {
  const t = useTranslations("history");

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="badge badge-green mb-3 mx-auto">{t("tag")}</div>
        <h2 className="heading-lg" style={{ color: "var(--text)" }}>
          {t("title")}
        </h2>
        <p className="body-lg max-w-2xl mx-auto mt-3">{t("description")}</p>
      </div>

      <div className="kente-stripe h-1 rounded-full mb-10 opacity-70" />

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto mb-16">
        <div
          className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5"
          style={{ background: "linear-gradient(to bottom, #009E49, rgba(0,158,73,0.2))" }}
        />
        {HISTORY_ERAS.map((era, i) => (
          <div
            key={era.id}
            className={`relative flex gap-6 mb-10 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
          >
            <div
              className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full mt-6 z-10"
              style={{ background: "#009E49", border: "3px solid var(--bg)" }}
            />
            <div className={`ml-14 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pr-10" : "sm:pl-10"}`}>
              <div className="card p-5 card-hover">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#009E49" }}>
                  {era.period}
                </div>
                <h3 className="font-bold text-base mb-3" style={{ color: "var(--text)" }}>{era.title}</h3>
                <div className="space-y-2">
                  {era.content.map((paragraph, j) => (
                    <p key={j} className="body-sm leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden sm:block sm:w-1/2" />
          </div>
        ))}
      </div>

      {/* Geography */}
      <div className="mb-10">
        <div className="badge badge-green mb-4">{t("geography_title")}</div>
        <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: "#009E49" }}>
          {t("primary_regions")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {GEOGRAPHY.primaryRegions.map((region) => (
            <div key={region.country} className="card p-5">
              <div className="text-2xl mb-3">
                {region.country === "Guinée-Bissau" ? "🇬🇼" : region.country === "Sénégal" ? "🇸🇳" : "🇬🇲"}
              </div>
              <div className="font-bold text-base mb-1" style={{ color: "var(--text)" }}>{region.country}</div>
              <div className="body-sm mb-2">{region.regions.join(" · ")}</div>
              <div className="text-lg font-bold" style={{ color: "#009E49" }}>{region.population}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{t("speakers_est")}</div>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: "#009E49" }}>
          {t("diaspora")}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {GEOGRAPHY.diaspora.map((d) => (
            <div key={d.country} className="card p-4 text-center">
              <div className="text-xl mb-2">
                {d.country === "Portugal" ? "🇵🇹" : d.country === "France" ? "🇫🇷" : d.country === "Suède" ? "🇸🇪" : d.country === "Espagne" ? "🇪🇸" : "🇮🇹"}
              </div>
              <div className="font-bold text-sm" style={{ color: "var(--text)" }}>{d.country}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{d.city}</div>
              <div className="text-xs mt-1 opacity-60" style={{ color: "#009E49" }}>{d.notes}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Resistance */}
      <div className="card p-8 text-center" style={{ border: "1px solid rgba(0,158,73,0.25)", background: "rgba(0,158,73,0.04)" }}>
        <div className="text-4xl mb-4">⚔️</div>
        <h2 className="heading-md mb-5" style={{ color: "var(--text)" }}>{t("resistance_title")}</h2>
        <div className="grid sm:grid-cols-2 gap-5 text-left mb-6">
          <p className="body-lg">
            Malgré des siècles de pressions extérieures — traite négrière, colonisation portugaise —
            le peuple Manjak a préservé sa culture, sa langue et son identité.
          </p>
          <p className="body-lg">
            Aujourd&apos;hui, cette résilience se manifeste dans le projet d&apos;un alphabet propre
            au Mandjaku — un acte de souveraineté culturelle porté par les anciens.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "🌊", text: "Peuple côtier & maritime" },
            { icon: "🌾", text: "Maîtres de la riziculture" },
            { icon: "📜", text: "Créateurs de leur alphabet" },
          ].map((item) => (
            <div key={item.text} className="card p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
