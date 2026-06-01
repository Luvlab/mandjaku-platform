"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase-browser";
import type { UserRole } from "@/components/AuthProvider";

type Profile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  role: UserRole;
  locale: string;
  country: string | null;
  city: string | null;
  created_at: string;
};

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  superadmin: { label: "Super Admin",  color: "#009E49" },
  editor:     { label: "Éditeur",      color: "#0EA5E9" },
  ambassador: { label: "Ambassadeur",  color: "#FCD116" },
  partner:    { label: "Partenaire",   color: "#7C3AED" },
  user:       { label: "Membre",       color: "#6B7280" },
};

const ROLE_TABS: { id: string; label: string; emoji: string }[] = [
  { id: "all",       label: "Tous",          emoji: "👥" },
  { id: "ambassador",label: "Ambassadeurs",  emoji: "🌍" },
  { id: "partner",   label: "Partenaires",   emoji: "🤝" },
  { id: "editor",    label: "Éditeurs",      emoji: "✏️" },
  { id: "user",      label: "Membres",       emoji: "👤" },
];

export default function UsersPanel() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const supabase = createClient();

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("manjak_profiles")
        .select("*")
        .order("created_at", { ascending: false });
      setProfiles((data as Profile[]) ?? []);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => { fetchProfiles(); }, [fetchProfiles]);

  async function updateRole(id: string, role: UserRole) {
    setUpdatingId(id);
    try {
      await supabase.from("manjak_profiles").update({ role }).eq("id", id);
      setProfiles((p) => p.map((u) => u.id === id ? { ...u, role } : u));
    } finally {
      setUpdatingId(null);
    }
  }

  const filtered = profiles.filter((p) => {
    const matchRole = filterRole === "all" || p.role === filterRole;
    const matchSearch = !search || (
      (p.full_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (p.email ?? "").toLowerCase().includes(search.toLowerCase())
    );
    return matchRole && matchSearch;
  });

  const counts = profiles.reduce((acc, p) => {
    acc[p.role] = (acc[p.role] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total membres", value: profiles.length, color: "#009E49" },
          { label: "Ambassadeurs", value: counts.ambassador ?? 0, color: "#FCD116" },
          { label: "Partenaires", value: counts.partner ?? 0, color: "#7C3AED" },
          { label: "Éditeurs", value: (counts.editor ?? 0) + (counts.superadmin ?? 0), color: "#0EA5E9" },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1.5 flex-wrap">
          {ROLE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterRole(tab.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: filterRole === tab.id ? "rgba(0,158,73,0.12)" : "var(--surface2)",
                color: filterRole === tab.id ? "#009E49" : "var(--text-muted)",
                border: `1px solid ${filterRole === tab.id ? "rgba(0,158,73,0.25)" : "var(--border)"}`,
              }}
            >
              {tab.emoji} {tab.label}
              <span className="text-xs opacity-60">
                {tab.id === "all" ? profiles.length : counts[tab.id] ?? 0}
              </span>
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom ou email…"
          className="cms-input flex-1 text-sm py-1.5"
        />
      </div>

      {/* User list */}
      {loading ? (
        <div className="card p-10 text-center" style={{ color: "var(--text-muted)" }}>Chargement…</div>
      ) : filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <div className="text-3xl mb-3">👥</div>
          <p style={{ color: "var(--text-muted)" }}>
            {profiles.length === 0
              ? "Aucun compte enregistré pour l'instant. Les comptes apparaissent ici après la première connexion."
              : "Aucun résultat."}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((user) => {
            const roleInfo = ROLE_LABELS[user.role] ?? ROLE_LABELS.user;
            const initials = (user.full_name ?? user.email ?? "?")[0].toUpperCase();
            return (
              <div key={user.id} className="card p-4 flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm overflow-hidden"
                  style={{ background: `linear-gradient(135deg,${roleInfo.color},${roleInfo.color}99)` }}
                >
                  {user.avatar_url
                    ? <img src={user.avatar_url} alt={initials} className="w-full h-full object-cover" />
                    : initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>
                      {user.full_name ?? "Sans nom"}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: `${roleInfo.color}20`, color: roleInfo.color }}>
                      {roleInfo.label}
                    </span>
                    {user.country && (
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>📍 {user.country}</span>
                    )}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {user.email} · {user.locale?.toUpperCase()} · Inscrit {new Date(user.created_at).toLocaleDateString("fr")}
                  </div>
                </div>

                {/* Role changer */}
                <select
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value as UserRole)}
                  disabled={updatingId === user.id}
                  className="text-sm rounded-lg px-2 py-1.5 border transition-all"
                  style={{
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    opacity: updatingId === user.id ? 0.5 : 1,
                  }}
                >
                  <option value="user">Membre</option>
                  <option value="ambassador">Ambassadeur</option>
                  <option value="partner">Partenaire</option>
                  <option value="editor">Éditeur</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
            );
          })}
        </div>
      )}

      {/* Invite box */}
      <div className="card p-5" style={{ border: "1px solid rgba(0,158,73,0.2)", background: "rgba(0,158,73,0.03)" }}>
        <div className="badge badge-green mb-3">🔗 Lien d'invitation</div>
        <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
          Partagez ce lien pour inviter des ambassadeurs ou partenaires. Leur compte sera créé lors de leur première connexion Google.
        </p>
        <div className="flex gap-2">
          <input
            readOnly
            value={typeof window !== "undefined" ? `${window.location.origin}/fr?invite=manjak2026` : ""}
            className="cms-input flex-1 text-sm font-mono"
          />
          <button
            onClick={() => navigator.clipboard?.writeText(`${window.location.origin}/fr?invite=manjak2026`)}
            className="btn btn-primary text-sm px-4"
          >
            Copier
          </button>
        </div>
      </div>
    </div>
  );
}
