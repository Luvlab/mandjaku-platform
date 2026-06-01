"use client";

import { useState } from "react";
import type { UserRole } from "@/components/AuthProvider";

const LOCALES = [
  { code: "fr", label: "🇫🇷 FR", name: "Français" },
  { code: "en", label: "🇬🇧 EN", name: "English" },
  { code: "pt", label: "🇵🇹 PT", name: "Português" },
  { code: "de", label: "🇩🇪 DE", name: "Deutsch" },
  { code: "es", label: "🇪🇸 ES", name: "Español" },
  { code: "zh", label: "🇨🇳 ZH", name: "中文" },
  { code: "ja", label: "🇯🇵 JA", name: "日本語" },
  { code: "sw", label: "🇹🇿 SW", name: "Swahili" },
  { code: "ff", label: "🌍 FF", name: "Fulani" },
  { code: "wo", label: "🌍 WO", name: "Wolof" },
];

const PLATFORMS = [
  { id: "instagram", label: "Instagram",  emoji: "📸", limit: 2200, recommended: 125 },
  { id: "twitter",   label: "Twitter / X", emoji: "🐦", limit: 280,  recommended: 240 },
  { id: "facebook",  label: "Facebook",   emoji: "👥", limit: 63206, recommended: 400 },
  { id: "whatsapp",  label: "WhatsApp",   emoji: "💬", limit: 65536, recommended: null },
  { id: "tiktok",    label: "TikTok",     emoji: "🎵", limit: 2200,  recommended: 150 },
  { id: "linkedin",  label: "LinkedIn",   emoji: "💼", limit: 3000,  recommended: 700 },
];

const POST_TYPES = [
  { id: "general",       label: "Post général",          emoji: "📝" },
  { id: "word_of_week",  label: "Mot de la semaine",     emoji: "📖" },
  { id: "cultural_fact", label: "Fait culturel",         emoji: "🏺" },
  { id: "lesson_promo",  label: "Promo leçon",           emoji: "📚" },
  { id: "event",         label: "Événement",             emoji: "📢" },
];

const DEFAULT_HASHTAGS: Record<string, string[]> = {
  fr: ["#mandjaku", "#guinéebissau", "#langueafricaine", "#culturemanjak", "#apprendrelemanjak"],
  en: ["#mandjaku", "#guineabissau", "#africanlanguage", "#manjakculture", "#learnmanjak"],
  pt: ["#mandjaku", "#guinébissau", "#línguaafricana", "#culturamandjak"],
  de: ["#mandjaku", "#guineabissau", "#afrikanischesprache", "#manjakkultur"],
  es: ["#mandjaku", "#guineabissau", "#lenguaafricana", "#culturamandjak"],
  sw: ["#mandjaku", "#guineabissau", "#lughaafrika", "#utamadunimandjak"],
  ff: ["#mandjaku", "#guinébissau", "#demngal", "#laawol"],
  wo: ["#mandjaku", "#guinébissau", "#lámmiogu", "#dóomi"],
};

type PostContent = Record<string, string>;

type DraftPost = {
  post_type: string;
  content: PostContent;
  platforms: string[];
  hashtags: string[];
  image_url: string;
  scheduled_at: string;
  status: "draft" | "scheduled";
};

const EMPTY_DRAFT: DraftPost = {
  post_type: "general",
  content: {},
  platforms: ["instagram", "twitter"],
  hashtags: [],
  image_url: "",
  scheduled_at: "",
  status: "draft",
};

const TEMPLATES = [
  {
    name: "Mot de la semaine",
    type: "word_of_week",
    content: {
      fr: "📖 Mot de la semaine en Mandjaku !\n\n« {mot} » signifie « {traduction} »\n\nPrononciation : {prononciation}\n\nApprenez le Mandjaku gratuitement sur mandjaku.com 🌍",
      en: "📖 Mandjaku word of the week!\n\n« {word} » means « {translation} »\n\nPronunciation: {pronunciation}\n\nLearn Mandjaku for free at mandjaku.com 🌍",
      pt: "📖 Palavra Mandjaku da semana!\n\n« {palavra} » significa « {tradução} »\n\nPronúncia: {pronúncia}\n\nAprenda Mandjaku gratuitamente em mandjaku.com 🌍",
    },
  },
  {
    name: "Fait culturel",
    type: "cultural_fact",
    content: {
      fr: "🌍 Le saviez-vous ?\n\n{fait_culturel}\n\nLa civilisation Mandjaku est riche et millénaire.\nDécouvrez-en plus sur mandjaku.com 🏺",
      en: "🌍 Did you know?\n\n{cultural_fact}\n\nMandjaku civilization is ancient and rich.\nDiscover more at mandjaku.com 🏺",
    },
  },
  {
    name: "Nouvelle leçon",
    type: "lesson_promo",
    content: {
      fr: "📚 Nouvelle leçon disponible !\n\n{titre_leçon}\n\nQuiz, vocabulaire, alphabet Mandjaku — tout gratuit.\n➡️ mandjaku.com",
      en: "📚 New lesson available!\n\n{lesson_title}\n\nQuizzes, vocabulary, Mandjaku alphabet — all free.\n➡️ mandjaku.com",
    },
  },
];

export default function MarketingPanel({ role }: { role: UserRole }) {
  const [section, setSection] = useState<"composer" | "scheduled" | "hashtags">("composer");
  const [draft, setDraft] = useState<DraftPost>({ ...EMPTY_DRAFT });
  const [activeLang, setActiveLang] = useState("fr");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [customHashtag, setCustomHashtag] = useState("");
  const [scheduledPosts, setScheduledPosts] = useState<(DraftPost & { id: string; created_at: string })[]>([]);

  const currentContent = draft.content[activeLang] ?? "";
  const currentHashtags = [...(DEFAULT_HASHTAGS[activeLang] ?? []), ...draft.hashtags];

  function setContent(val: string) {
    setDraft((d) => ({ ...d, content: { ...d.content, [activeLang]: val } }));
  }

  function togglePlatform(id: string) {
    setDraft((d) => ({
      ...d,
      platforms: d.platforms.includes(id)
        ? d.platforms.filter((p) => p !== id)
        : [...d.platforms, id],
    }));
  }

  function addHashtag() {
    if (!customHashtag.trim()) return;
    const tag = customHashtag.startsWith("#") ? customHashtag.trim() : `#${customHashtag.trim()}`;
    setDraft((d) => ({ ...d, hashtags: [...d.hashtags, tag] }));
    setCustomHashtag("");
  }

  function loadTemplate(tpl: typeof TEMPLATES[0]) {
    setDraft((d) => ({
      ...d,
      post_type: tpl.type,
      content: { ...d.content, ...(tpl.content as PostContent) },
    }));
  }

  async function saveDraft(scheduleNow = false) {
    setSaving(true);
    try {
      const post = {
        ...draft,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        status: scheduleNow ? ("scheduled" as const) : ("draft" as const),
      };
      setScheduledPosts((p) => [post, ...p]);
      setDraft({ ...EMPTY_DRAFT });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  const filledLangs = LOCALES.filter((l) => draft.content[l.code]?.trim().length > 0);

  return (
    <div className="space-y-6">
      {/* Section tabs */}
      <div className="flex gap-2 border-b pb-4" style={{ borderColor: "var(--border)" }}>
        {[
          { id: "composer",  label: "✏️ Composer", },
          { id: "scheduled", label: `📅 Planifiés (${scheduledPosts.length})` },
          { id: "hashtags",  label: "#️⃣ Hashtags" },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id as typeof section)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: section === s.id ? "rgba(0,158,73,0.12)" : "transparent",
              color: section === s.id ? "#009E49" : "var(--text-muted)",
              border: section === s.id ? "1px solid rgba(0,158,73,0.25)" : "1px solid transparent",
            }}
          >
            {s.label}
          </button>
        ))}
        {saved && (
          <span className="ml-auto text-sm font-medium self-center" style={{ color: "#009E49" }}>
            Post sauvegardé ✓
          </span>
        )}
      </div>

      {/* ── Composer ── */}
      {section === "composer" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: content */}
          <div className="xl:col-span-2 space-y-5">
            {/* Post type */}
            <div className="card p-5">
              <label className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{ color: "var(--text-muted)" }}>
                Type de post
              </label>
              <div className="flex flex-wrap gap-2">
                {POST_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setDraft((d) => ({ ...d, post_type: t.id }))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: draft.post_type === t.id ? "rgba(0,158,73,0.15)" : "var(--surface2)",
                      color: draft.post_type === t.id ? "#009E49" : "var(--text-muted)",
                      border: `1px solid ${draft.post_type === t.id ? "rgba(0,158,73,0.35)" : "var(--border)"}`,
                    }}
                  >
                    {t.emoji} {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language tabs + content */}
            <div className="card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Contenu par langue
                </label>
                <div className="flex items-center gap-1.5">
                  {filledLangs.map((l) => (
                    <span key={l.code} className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(0,158,73,0.12)", color: "#009E49" }}>
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lang selector */}
              <div className="flex flex-wrap gap-1.5">
                {LOCALES.map((l) => {
                  const filled = !!draft.content[l.code]?.trim();
                  const active = activeLang === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => setActiveLang(l.code)}
                      className="px-3 py-1 rounded-lg text-sm font-medium transition-all relative"
                      style={{
                        background: active ? "rgba(0,158,73,0.15)" : "var(--surface2)",
                        color: active ? "#009E49" : "var(--text-muted)",
                        border: `1px solid ${active ? "rgba(0,158,73,0.35)" : filled ? "rgba(0,158,73,0.2)" : "var(--border)"}`,
                      }}
                    >
                      {l.label}
                      {filled && !active && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: "#009E49" }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={currentContent}
                  onChange={(e) => setContent(e.target.value)}
                  className="cms-input w-full"
                  rows={8}
                  placeholder={`Rédigez votre post en ${LOCALES.find((l) => l.code === activeLang)?.name}…\n\nUtilisez des variables comme {mot}, {traduction} pour les templates.`}
                  lang={activeLang}
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {PLATFORMS.filter((p) => draft.platforms.includes(p.id)).map((p) => {
                    const len = currentContent.length;
                    const over = len > p.limit;
                    const warn = p.recommended && len > p.recommended;
                    return (
                      <span
                        key={p.id}
                        className="text-xs font-mono px-1.5 py-0.5 rounded"
                        style={{
                          background: over ? "rgba(206,17,38,0.15)" : warn ? "rgba(252,209,22,0.15)" : "var(--surface2)",
                          color: over ? "#CE1126" : warn ? "#B8960A" : "var(--text-muted)",
                        }}
                      >
                        {p.emoji} {len}/{p.recommended ?? p.limit}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--text-muted)" }}>
                  URL de l'image (optionnel)
                </label>
                <input
                  value={draft.image_url}
                  onChange={(e) => setDraft((d) => ({ ...d, image_url: e.target.value }))}
                  className="cms-input"
                  placeholder="https://..."
                  type="url"
                />
              </div>
            </div>

            {/* Hashtags for this lang */}
            <div className="card p-5 space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Hashtags — {LOCALES.find((l) => l.code === activeLang)?.name}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {currentHashtags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(0,158,73,0.1)", color: "#009E49", border: "1px solid rgba(0,158,73,0.2)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={customHashtag}
                  onChange={(e) => setCustomHashtag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHashtag())}
                  className="cms-input flex-1"
                  placeholder="#nouveau-hashtag"
                />
                <button onClick={addHashtag} className="btn btn-primary py-2 px-4 text-sm">
                  +
                </button>
              </div>
              {draft.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {draft.hashtags.map((tag, i) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 cursor-pointer"
                      style={{ background: "rgba(206,17,38,0.08)", color: "#CE1126", border: "1px solid rgba(206,17,38,0.2)" }}
                      onClick={() => setDraft((d) => ({ ...d, hashtags: d.hashtags.filter((_, j) => j !== i) }))}
                    >
                      {tag} ✕
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: platforms + schedule + templates */}
          <div className="space-y-5">
            {/* Platforms */}
            <div className="card p-5 space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Plateformes
              </label>
              {PLATFORMS.map((p) => {
                const active = draft.platforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-sm"
                    style={{
                      background: active ? "rgba(0,158,73,0.1)" : "var(--surface2)",
                      border: `1px solid ${active ? "rgba(0,158,73,0.3)" : "var(--border)"}`,
                      color: active ? "#009E49" : "var(--text-muted)",
                    }}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      {p.emoji} {p.label}
                    </span>
                    <span className="text-xs opacity-60">
                      {p.recommended ? `~${p.recommended}` : "∞"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Schedule */}
            <div className="card p-5 space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Programmation
              </label>
              <input
                type="datetime-local"
                value={draft.scheduled_at}
                onChange={(e) => setDraft((d) => ({ ...d, scheduled_at: e.target.value }))}
                className="cms-input text-sm"
              />
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => saveDraft(false)}
                disabled={saving || filledLangs.length === 0}
                className="btn w-full justify-center text-sm py-2.5"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
              >
                💾 Sauvegarder brouillon
              </button>
              <button
                onClick={() => saveDraft(true)}
                disabled={saving || filledLangs.length === 0}
                className="btn btn-primary w-full justify-center text-sm py-2.5"
              >
                {draft.scheduled_at ? "📅 Planifier" : "🚀 Publier maintenant"}
              </button>
            </div>

            {/* Templates */}
            <div className="card p-5 space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Templates
              </label>
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.name}
                  onClick={() => loadTemplate(tpl)}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all"
                  style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)" }}
                >
                  <div className="font-medium">{tpl.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {Object.keys(tpl.content).map((l) => l.toUpperCase()).join(" · ")}
                  </div>
                </button>
              ))}
            </div>

            {/* Preview card */}
            {currentContent && (
              <div className="card p-4">
                <label className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{ color: "var(--text-muted)" }}>
                  Aperçu Instagram
                </label>
                <div className="rounded-xl overflow-hidden" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
                  {draft.image_url && (
                    <div className="aspect-square bg-gradient-to-br from-[#009E49] to-[#007A38] flex items-center justify-center text-4xl">
                      🖼
                    </div>
                  )}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black" style={{ background: "linear-gradient(135deg,#009E49,#007A38)" }}>M</div>
                      <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>mandjaku.official</span>
                    </div>
                    <p className="text-xs leading-relaxed whitespace-pre-wrap line-clamp-5" style={{ color: "var(--text)" }}>
                      {currentContent}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Scheduled posts ── */}
      {section === "scheduled" && (
        <div className="space-y-3">
          {scheduledPosts.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-3xl mb-3">📅</div>
              <p style={{ color: "var(--text-muted)" }}>Aucun post planifié pour l'instant.</p>
              <button onClick={() => setSection("composer")} className="btn btn-primary mt-4 mx-auto">
                Créer un post
              </button>
            </div>
          ) : scheduledPosts.map((post) => (
            <div key={post.id} className="card p-4 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ background: post.status === "scheduled" ? "rgba(0,158,73,0.12)" : "var(--surface2)", color: post.status === "scheduled" ? "#009E49" : "var(--text-muted)" }}>
                    {post.status === "scheduled" ? "📅 Planifié" : "💾 Brouillon"}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {POST_TYPES.find((t) => t.id === post.post_type)?.emoji} {POST_TYPES.find((t) => t.id === post.post_type)?.label}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {post.platforms.map((p) => PLATFORMS.find((pl) => pl.id === p)?.emoji).join(" ")}
                  </span>
                </div>
                <p className="text-sm line-clamp-2" style={{ color: "var(--text)" }}>
                  {post.content.fr ?? post.content.en ?? Object.values(post.content)[0]}
                </p>
                <div className="text-xs mt-1.5 flex items-center gap-3" style={{ color: "var(--text-muted)" }}>
                  <span>{Object.keys(post.content).filter((k) => post.content[k]).length} langues</span>
                  {post.scheduled_at && <span>📅 {new Date(post.scheduled_at).toLocaleString("fr")}</span>}
                  <span>Créé {new Date(post.created_at).toLocaleDateString("fr")}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => { setDraft({ ...post }); setSection("composer"); }}
                  className="btn text-xs py-1.5 px-3"
                  style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  ✏️ Éditer
                </button>
                <button
                  onClick={() => setScheduledPosts((p) => p.filter((sp) => sp.id !== post.id))}
                  className="btn text-xs py-1.5 px-3"
                  style={{ background: "rgba(206,17,38,0.08)", border: "1px solid rgba(206,17,38,0.2)", color: "#CE1126" }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Hashtag manager ── */}
      {section === "hashtags" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOCALES.map((lang) => (
            <div key={lang.code} className="card p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-base">{lang.label}</span>
                <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>{lang.name}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(DEFAULT_HASHTAGS[lang.code] ?? []).map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(0,158,73,0.08)", color: "#009E49", border: "1px solid rgba(0,158,73,0.18)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="text-xs font-medium py-1.5 px-3 rounded-lg w-full"
                onClick={() => { setActiveLang(lang.code); setSection("composer"); }}
                style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
              >
                Composer en {lang.name} →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
