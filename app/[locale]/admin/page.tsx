"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useAuth, isAdminRole, canPostContent } from "@/components/AuthProvider";
import { supabaseConfigured } from "@/lib/supabase-browser";
import SeoPanel from "@/components/admin/SeoPanel";
import MarketingPanel from "@/components/admin/MarketingPanel";
import UsersPanel from "@/components/admin/UsersPanel";

type AdminSection = "seo" | "marketing" | "users";

// ── Magic Link form ────────────────────────────────────────────────────────────
function MagicLinkForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();

      if (!res.ok && data.error && res.status === 403) {
        // Geo-blocked or explicitly denied — show the message
        setStatus("error");
        setErrorMsg(data.error);
      } else {
        // Always show "sent" for other cases — avoids email enumeration
        setStatus("sent");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Erreur réseau. Veuillez réessayer.");
    }
  };

  if (status === "sent") {
    return (
      <div
        className="rounded-xl px-4 py-4 text-sm text-center"
        style={{ background: "rgba(0,158,73,0.08)", border: "1px solid rgba(0,158,73,0.25)" }}
      >
        <div className="text-2xl mb-2">✉️</div>
        <div className="font-semibold mb-1" style={{ color: "#009E49" }}>Lien envoyé !</div>
        <div style={{ color: "var(--text-muted)" }}>
          Si cette adresse est autorisée, vous recevrez un lien de connexion dans quelques instants.
          <br />Vérifiez vos spams si besoin.
        </div>
        <button
          onClick={() => { setStatus("idle"); setEmail(""); }}
          className="mt-3 text-xs underline"
          style={{ color: "var(--text-muted)" }}
        >
          Utiliser une autre adresse
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
        Connexion par lien magique
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        required
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
        style={{
          background: "var(--surface2)",
          border: "1px solid var(--border)",
          color: "var(--text)",
        }}
      />
      {status === "error" && (
        <p
          className="text-xs rounded-lg px-3 py-2"
          style={{ background: "rgba(206,17,38,0.08)", color: "#CE1126", border: "1px solid rgba(206,17,38,0.2)" }}
        >
          🔒 {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary w-full justify-center"
        style={{ opacity: status === "loading" ? 0.6 : 1 }}
      >
        {status === "loading" ? "Envoi en cours…" : "Recevoir le lien de connexion"}
      </button>
      <p className="text-xs text-center" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
        🇫🇷 Certains accès sont restreints par zone géographique.
      </p>
    </form>
  );
}

const SECTIONS = [
  { id: "seo",       label: "SEO",           emoji: "🔍", roles: ["superadmin","editor"] },
  { id: "marketing", label: "Marketing",     emoji: "📣", roles: ["superadmin","editor","ambassador","partner"] },
  { id: "users",     label: "Comptes",       emoji: "👥", roles: ["superadmin","editor"] },
] as const;

export default function AdminPage() {
  const { user, profile, loading, signInWithGoogle } = useAuth();
  const [section, setSection] = useState<AdminSection>("seo");

  // Legacy password for emergency fallback
  const [password, setPassword] = useState("");
  const [legacyAuthed, setLegacyAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showLegacy, setShowLegacy] = useState(false);

  // Geo-block error surfaced from the auth callback via URL param
  const [geoError, setGeoError] = useState("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "geo_blocked") {
      const msg = params.get("msg") ?? "Accès refusé depuis votre pays.";
      setGeoError(decodeURIComponent(msg));
      // Clean the URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const role = profile?.role ?? "user";
  const hasAccess = legacyAuthed || (!!user && canPostContent(role));
  const isAdmin = legacyAuthed || isAdminRole(role);

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl mx-auto mb-4 animate-pulse" style={{ background: "var(--surface2)" }} />
          <p style={{ color: "var(--text-muted)" }}>Chargement…</p>
        </div>
      </div>
    );
  }

  // ── Not authenticated ────────────────────────────────────────────────────────
  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg)" }}>
        <div className="card p-10 w-full max-w-sm text-center">
          {/* Logo */}
          <div
            className="w-12 h-12 rounded-xl mx-auto mb-6 flex items-center justify-center font-black text-white text-xl"
            style={{ background: "linear-gradient(135deg,#009E49,#007A38)" }}
          >M</div>
          <div className="badge badge-green mb-4 mx-auto">Admin CMS</div>
          <h1 className="heading-md mb-2" style={{ color: "var(--text)" }}>Mandjaku Admin</h1>
          <p className="body-sm mb-6">Pour les éditeurs, ambassadeurs et partenaires</p>

          {/* Geo-block error banner */}
          {geoError && (
            <div
              className="rounded-xl px-4 py-3 text-sm mb-5 text-left"
              style={{ background: "rgba(206,17,38,0.08)", border: "1px solid rgba(206,17,38,0.25)", color: "#CE1126" }}
            >
              🔒 {geoError}
            </div>
          )}

          {/* ── Supabase not configured warning ── */}
          {!supabaseConfigured && (
            <div
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm mb-4"
              style={{ background: "rgba(252,209,22,0.1)", border: "1px solid rgba(252,209,22,0.3)", color: "#B8960A" }}
            >
              ⚠️ Supabase non configuré — utilisez le mot de passe
            </div>
          )}

          {supabaseConfigured && (
            <>
              {/* Google Sign In */}
              <button
                onClick={() => signInWithGoogle()}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all mb-4"
                style={{ background: "#fff", border: "1.5px solid #E5E7EB", color: "#374151", boxShadow: "0 1px 3px rgba(0,0,0,.08)" }}
              >
                <GoogleIcon size={20} />
                Se connecter avec Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>ou</span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>

              {/* Magic link — primary passwordless option */}
              <MagicLinkForm />

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>ou</span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>
            </>
          )}

          {/* Legacy password — emergency fallback */}
          {(showLegacy || !supabaseConfigured) ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await fetch("/api/admin/seo", {
                  headers: { "x-admin-password": password },
                });
                if (res.ok) { setLegacyAuthed(true); setAuthError(""); }
                else setAuthError("Mot de passe incorrect");
              }}
              className="space-y-3"
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe admin"
                className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)" }}
                autoFocus={!supabaseConfigured}
              />
              {authError && <p className="text-sm" style={{ color: "#CE1126" }}>{authError}</p>}
              <button type="submit" className="btn btn-primary w-full justify-center">
                Connexion
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowLegacy(true)}
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Accès d&apos;urgence par mot de passe
            </button>
          )}

          <div className="mt-6 pt-6 border-t space-y-3" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Connectez-vous avec votre compte Google ou lien magique autorisé.
            </p>
            <Link href="/" className="text-sm block" style={{ color: "var(--text-muted)" }}>
              ← Retour au site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Access denied (signed in but no role) ────────────────────────────────────
  if (user && !canPostContent(role) && !legacyAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg)" }}>
        <div className="card p-10 w-full max-w-sm text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="heading-md mb-3" style={{ color: "var(--text)" }}>Accès limité</h2>
          <p className="body-sm mb-6">
            Votre compte est enregistré comme <strong>{role}</strong>. Contactez un administrateur pour obtenir l'accès éditeur ou ambassadeur.
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Connecté en tant que : {user.email}
          </p>
          <Link href="/" className="btn btn-primary mx-auto">← Retour au site</Link>
        </div>
      </div>
    );
  }

  // Determine which section to show first for non-admin roles
  const visibleSections = SECTIONS.filter((s) =>
    legacyAuthed || isAdmin || s.roles.includes(role as never)
  );
  const activeSection = visibleSections.find((s) => s.id === section) ? section
    : (visibleSections[0]?.id ?? "marketing") as AdminSection;

  // ── Admin UI ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-14" style={{ background: "var(--bg)" }}>
      {/* Admin bar */}
      <div
        className="sticky top-14 z-40 border-b px-4 sm:px-6 flex items-center justify-between h-12"
        style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-white text-xs"
            style={{ background: "linear-gradient(135deg,#009E49,#007A38)" }}>M</div>
          <span className="font-bold text-sm" style={{ color: "var(--text)" }}>Mandjaku CMS</span>

          {/* Section tabs */}
          <div className="flex items-center gap-1 ml-2">
            {visibleSections.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id as AdminSection)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: activeSection === s.id ? "rgba(0,158,73,0.12)" : "transparent",
                  color: activeSection === s.id ? "#009E49" : "var(--text-muted)",
                  border: activeSection === s.id ? "1px solid rgba(0,158,73,0.25)" : "1px solid transparent",
                }}
              >
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {profile && (
            <span className="text-xs hidden sm:block" style={{ color: "var(--text-muted)" }}>
              {profile.full_name ?? profile.email}
            </span>
          )}
          <Link href="/" className="btn text-xs py-1 px-2.5" style={{ background: "var(--surface2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
            ← Site
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeSection === "seo" && (isAdmin || legacyAuthed) && (
          <SeoPanel password={legacyAuthed ? password : "supabase-auth"} />
        )}
        {activeSection === "marketing" && (
          <MarketingPanel role={role as import("@/components/AuthProvider").UserRole} />
        )}
        {activeSection === "users" && (isAdmin || legacyAuthed) && (
          <UsersPanel />
        )}
      </div>
    </div>
  );
}

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
