"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth, isAdminRole } from "./AuthProvider";
import { Link } from "@/i18n/navigation";

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  superadmin: { label: "Super Admin",  color: "#009E49" },
  editor:     { label: "Éditeur",      color: "#0EA5E9" },
  ambassador: { label: "Ambassadeur",  color: "#FCD116" },
  partner:    { label: "Partenaire",   color: "#7C3AED" },
  user:       { label: "Membre",       color: "#6B7280" },
};

export default function UserMenu() {
  const { user, profile, loading, signInWithGoogle, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading) {
    return <div className="w-8 h-8 rounded-full animate-pulse" style={{ background: "var(--surface2)" }} />;
  }

  if (!user) {
    return (
      <button
        onClick={() => signInWithGoogle()}
        className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all"
        style={{ background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
      >
        <GoogleIcon />
        <span className="hidden sm:inline">Connexion</span>
      </button>
    );
  }

  const roleKey = profile?.role ?? "user";
  const roleInfo = ROLE_LABELS[roleKey] ?? ROLE_LABELS.user;
  const initials = (profile?.full_name ?? user.email ?? "?")[0].toUpperCase();
  const showAdmin = isAdminRole(roleKey) || roleKey === "ambassador" || roleKey === "partner";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 rounded-full overflow-hidden font-bold text-white text-sm flex items-center justify-center transition-all ring-2 ring-offset-1"
        style={{
          background: profile?.avatar_url ? undefined : `linear-gradient(135deg,${roleInfo.color},${roleInfo.color}99)`,
          outline: open ? `2px solid ${roleInfo.color}` : "none",
        }}
        title={profile?.full_name ?? user.email ?? ""}
      >
        {profile?.avatar_url
          ? <img src={profile.avatar_url} alt={initials} className="w-full h-full object-cover" />
          : initials}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-2xl border py-1.5 z-[60]"
          style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--shadow-lg)" }}
        >
          {/* Header */}
          <div className="px-4 py-2.5 border-b" style={{ borderColor: "var(--border)" }}>
            <div className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>
              {profile?.full_name ?? "Utilisateur"}
            </div>
            <div className="text-xs truncate mb-1.5" style={{ color: "var(--text-muted)" }}>{user.email}</div>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${roleInfo.color}20`, color: roleInfo.color }}
            >
              {roleInfo.label}
            </span>
          </div>

          {/* Links */}
          <div className="py-1">
            {showAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-2.5 px-4 py-2 text-sm transition-colors"
                style={{ color: "var(--text-muted)" }}
                onClick={() => setOpen(false)}
              >
                {isAdminRole(roleKey) ? "⚙️" : roleKey === "ambassador" ? "🌍" : "🤝"}
                {isAdminRole(roleKey) ? "Admin CMS" : roleKey === "ambassador" ? "Espace ambassadeur" : "Espace partenaire"}
              </Link>
            )}

            <button
              onClick={() => { signOut(); setOpen(false); }}
              className="flex items-center gap-2.5 px-4 py-2 text-sm w-full text-left transition-colors"
              style={{ color: "#CE1126" }}
            >
              <span>↩</span> Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
