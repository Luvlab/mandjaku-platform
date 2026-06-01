"use client";

import { useState, useEffect, useCallback } from "react";

type SeoRow = {
  id: string;
  title: string;
  description: string;
  og_title: string;
  og_description: string;
  keywords: string[];
  og_image_headline: string;
  og_image_sub: string;
  updated_at?: string;
};

const TAB_LABELS: Record<string, string> = {
  home:       "🏠 Accueil",
  alphabet:   "🔤 Alphabet",
  learn:      "📚 Apprendre",
  history:    "🏺 Histoire",
  culture:    "🎭 Culture",
  dictionary: "📖 Dictionnaire",
  keyboard:   "⌨️ Clavier",
  media:      "🎬 Médias",
};

export default function SeoPanel({ password }: { password: string }) {
  const [rows, setRows]         = useState<SeoRow[]>([]);
  const [activeTab, setActiveTab] = useState("home");
  const [form, setForm]         = useState<SeoRow | null>(null);
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [preview, setPreview]   = useState(false);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo");
      const json = await res.json();
      setRows(json.rows ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRows(); }, [fetchRows]);

  useEffect(() => {
    if (!rows.length) return;
    const row = rows.find((r) => r.id === activeTab);
    if (row) setForm({ ...row, keywords: row.keywords ?? [] });
  }, [rows, activeTab]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({
          ...form,
          keywords: typeof form.keywords === "string"
            ? (form.keywords as string).split(",").map((k) => k.trim()).filter(Boolean)
            : form.keywords,
        }),
      });
      if (res.ok) { setSaveMsg("Sauvegardé ✓"); await fetchRows(); }
      else setSaveMsg("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(""), 3000);
    }
  }

  const update = (field: keyof SeoRow, value: string) =>
    setForm((f) => f ? { ...f, [field]: value } : f);

  return (
    <div className="flex gap-6">
      {/* Tab sidebar */}
      <aside className="w-48 flex-shrink-0">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>Pages</p>
        <nav className="space-y-1">
          {Object.entries(TAB_LABELS).map(([id, label]) => {
            const row = rows.find((r) => r.id === id);
            const active = activeTab === id;
            return (
              <button key={id} onClick={() => setActiveTab(id)} className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background: active ? "rgba(0,158,73,0.12)" : "transparent",
                  color: active ? "#009E49" : "var(--text-muted)",
                  fontWeight: active ? 600 : 400,
                  border: active ? "1px solid rgba(0,158,73,0.25)" : "1px solid transparent",
                }}>
                {label}
                {row?.updated_at && (
                  <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
                    {new Date(row.updated_at).toLocaleDateString("fr")}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Editor */}
      <main className="flex-1 min-w-0">
        {loading ? (
          <div className="card p-10 text-center" style={{ color: "var(--text-muted)" }}>Chargement…</div>
        ) : !form ? (
          <div className="card p-10 text-center" style={{ color: "var(--text-muted)" }}>Sélectionnez une page</div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="heading-md" style={{ color: "var(--text)" }}>{TAB_LABELS[activeTab]}</h2>
                <p className="body-sm mt-1">SEO, Open Graph &amp; réseaux sociaux</p>
              </div>
              <div className="flex items-center gap-3">
                {saveMsg && (
                  <span className="text-sm font-medium" style={{ color: saveMsg.includes("✓") ? "#009E49" : "#CE1126" }}>{saveMsg}</span>
                )}
                <button
                  type="button"
                  onClick={() => setPreview((p) => !p)}
                  className="btn text-sm py-1.5"
                  style={{ background: "var(--surface2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
                >
                  {preview ? "✕ Aperçu" : "👁 Aperçu OG"}
                </button>
                <button type="submit" disabled={saving} className="btn btn-primary">
                  {saving ? "Sauvegarde…" : "Sauvegarder"}
                </button>
              </div>
            </div>

            {/* SEO */}
            <div className="card p-6 space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-green">🔍 SEO</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Balises meta pour Google</span>
              </div>
              <Field label="Titre de la page" hint="~60 car. recommandés" count={form.title?.length}>
                <input value={form.title} onChange={(e) => update("title", e.target.value)} className="cms-input" maxLength={120} required />
              </Field>
              <Field label="Meta description" hint="~160 car. recommandés" count={form.description?.length}>
                <textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="cms-input" rows={3} maxLength={320} required />
              </Field>
              <Field label="Mots-clés" hint="Séparés par des virgules">
                <input
                  value={Array.isArray(form.keywords) ? form.keywords.join(", ") : form.keywords}
                  onChange={(e) => update("keywords", e.target.value as unknown as string)}
                  className="cms-input"
                  placeholder="manjak, langue africaine, guinée-bissau"
                />
              </Field>
            </div>

            {/* Open Graph */}
            <div className="card p-6 space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-green">📲 Open Graph</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>Partage Facebook, Twitter, WhatsApp</span>
              </div>
              <Field label="Titre OG" hint="~70 car.">
                <input value={form.og_title ?? ""} onChange={(e) => update("og_title", e.target.value)} className="cms-input" maxLength={100} />
              </Field>
              <Field label="Description OG" hint="~200 car.">
                <textarea value={form.og_description ?? ""} onChange={(e) => update("og_description", e.target.value)} className="cms-input" rows={2} maxLength={280} />
              </Field>
            </div>

            {/* OG image */}
            <div className="card p-6 space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-green">🖼 Thumbnail OG</span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>1200×630 — généré dynamiquement</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Titre principal">
                  <input value={form.og_image_headline ?? ""} onChange={(e) => update("og_image_headline", e.target.value)} className="cms-input" placeholder="Mandjaku" />
                </Field>
                <Field label="Sous-titre image">
                  <input value={form.og_image_sub ?? ""} onChange={(e) => update("og_image_sub", e.target.value)} className="cms-input" placeholder="Kabu lëp Manjak" />
                </Field>
              </div>
              {preview && (
                <OGPreview
                  headline={form.og_image_headline ?? "Mandjaku"}
                  sub={form.og_image_sub ?? ""}
                  description={form.og_description ?? form.description}
                />
              )}
            </div>

            {/* Social card preview */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="badge badge-green">📱 Aperçu carte sociale</span>
              </div>
              <SocialCardPreview
                title={form.og_title ?? form.title}
                description={form.og_description ?? form.description}
                url={`mandjaku.com${activeTab !== "home" ? `?tab=${activeTab}` : ""}`}
              />
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

function Field({ label, hint, count, children }: { label: string; hint?: string; count?: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-semibold" style={{ color: "var(--text)" }}>{label}</label>
        <div className="flex items-center gap-3">
          {count !== undefined && (
            <span className="text-xs tabular-nums" style={{ color: count > 100 ? "#CE1126" : "var(--text-muted)" }}>{count} car.</span>
          )}
          {hint && <span className="text-xs" style={{ color: "var(--text-muted)" }}>{hint}</span>}
        </div>
      </div>
      {children}
    </div>
  );
}

function OGPreview({ headline, sub, description }: { headline: string; sub: string; description: string }) {
  return (
    <div className="rounded-2xl overflow-hidden mt-4" style={{ background: "#0F1419", border: "1px solid var(--border)", aspectRatio: "1200/630", position: "relative", padding: "5% 7%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div className="kente-stripe h-1.5 rounded-full absolute top-0 left-0 right-0" />
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm" style={{ background: "linear-gradient(135deg,#009E49,#007A38)", flexShrink: 0 }}>M</div>
        <div>
          <div className="text-xs font-bold" style={{ color: "#F1F5F9" }}>Mandjaku</div>
          <div className="text-xs" style={{ color: "#94A3B8" }}>Kabu lëp Manjak</div>
        </div>
        <div className="ml-auto px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(0,158,73,0.15)", border: "1px solid rgba(0,158,73,0.3)", color: "#00C45A" }}>mandjaku.com</div>
      </div>
      <div>
        <div className="font-black text-gradient leading-none" style={{ fontSize: "clamp(24px,6vw,56px)", letterSpacing: "-2px" }}>{headline || "Mandjaku"}</div>
        <div className="font-semibold mt-1" style={{ fontSize: "clamp(14px,3vw,24px)", color: "#F1F5F9" }}>{sub}</div>
        <div className="mt-2 leading-relaxed" style={{ fontSize: "clamp(10px,1.5vw,15px)", color: "#94A3B8", maxWidth: "75%" }}>{description}</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#009E49" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FCD116" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#CE1126" }} />
        <span className="text-xs ml-1" style={{ color: "#4A6380" }}>Guinée-Bissau · Sénégal · Gambie</span>
      </div>
      <div className="kente-stripe h-1 rounded-full absolute bottom-0 left-0 right-0" />
    </div>
  );
}

function SocialCardPreview({ title, description, url }: { title: string; description: string; url: string }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>Twitter / X</p>
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border-str)", maxWidth: "440px" }}>
          <div className="aspect-[1200/630] rounded-t-xl" style={{ background: "linear-gradient(135deg,#009E49,#007A38)", position: "relative" }}>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <div className="font-black text-white text-2xl">{title}</div>
            </div>
          </div>
          <div className="px-3 py-2" style={{ background: "var(--surface2)" }}>
            <div className="text-sm font-bold truncate" style={{ color: "var(--text)" }}>{title}</div>
            <div className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{description}</div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)", opacity: 0.6 }}>{url}</div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>WhatsApp / iMessage</p>
        <div className="flex gap-3 p-3 rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--surface2)", maxWidth: "360px" }}>
          <div className="w-16 h-16 rounded-lg flex-shrink-0" style={{ background: "linear-gradient(135deg,#009E49,#007A38)" }} />
          <div className="min-w-0">
            <div className="text-xs font-semibold" style={{ color: "#009E49" }}>mandjaku.com</div>
            <div className="text-sm font-bold leading-tight mt-0.5 line-clamp-2" style={{ color: "var(--text)" }}>{title}</div>
            <div className="text-xs mt-1 line-clamp-2" style={{ color: "var(--text-muted)" }}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
