"use client";

import { useState } from "react";
import { useC, useLocalized } from "@/lib/content";

type MerchItem = { id: string; title: string; price: string; category: string; emoji: string; desc: string; tag?: string };
type Ad = { id: string; title: string; desc: string; category: string; price: string | null; location: string; flag: string; featured?: boolean };

const MERCH: MerchItem[] = [
  { id:"1", title:"T-shirt Manjaku", price:"29.90€", category:"Vêtements", emoji:"👕", desc:"Imprimé avec l'alphabet Manjak — 100% coton bio", tag:"Bestseller" },
  { id:"2", title:"Hoodie Kabu lëp Manjak", price:"54.90€", category:"Vêtements", emoji:"🧥", desc:"Sweat brodé avec le proverbe Manjak" },
  { id:"3", title:"Tote Bag Kente", price:"19.90€", category:"Accessoires", emoji:"👜", desc:"Couleurs du kente — vert, jaune, rouge", tag:"Eco" },
  { id:"4", title:"Poster Alphabet A2", price:"24.90€", category:"Art", emoji:"🖼️", desc:"Les 24 lettres avec prononciations — livré roulé" },
  { id:"5", title:"Mug Manjaku", price:"14.90€", category:"Accessoires", emoji:"☕", desc:"24 lettres et prononciation sur céramique" },
  { id:"6", title:"Casquette Manjak", price:"34.90€", category:"Vêtements", emoji:"🧢", desc:"Broderie logo Manjaku — 6 coloris" },
  { id:"7", title:"Bracelet Kente", price:"12.90€", category:"Accessoires", emoji:"📿", desc:"Artisanal — couleurs Guinée-Bissau", tag:"Artisanat" },
  { id:"8", title:"Carnet Alphabet", price:"9.90€", category:"Papeterie", emoji:"📓", desc:"A5 avec alphabet illustré — idéal pour apprendre" },
];

const ADS: Ad[] = [
  { id:"1", title:"Cours de Manjaku en ligne", desc:"Cours via Zoom, tous niveaux. Méthode communicative avec exercices et quiz inclus.", category:"Cours", price:"30€/h", location:"Paris", flag:"🇫🇷", featured:true },
  { id:"2", title:"Tissus traditionnels Manjak", desc:"Tissus authentiques importés de Guinée-Bissau. Plusieurs motifs disponibles à Lisbonne.", category:"Artisanat", price:"45€/m", location:"Lisbonne", flag:"🇵🇹", featured:true },
  { id:"3", title:"Musicien Manjak — événements", desc:"Percussions traditionnelles pour mariages, expositions, événements culturels.", category:"Services", price:"Sur devis", location:"Paris", flag:"🇫🇷" },
  { id:"4", title:"Association Manjaku Lisbonne", desc:"Rejoignez notre association — réunions mensuelles, événements culturels au Portugal.", category:"Communauté", price:null, location:"Lisbonne", flag:"🇵🇹", featured:true },
];

const CAT_COLORS: Record<string, string> = {
  "Vêtements":"#009E49", "Accessoires":"#FCD116", "Art":"#CE1126", "Papeterie":"#7C3AED",
  "Cours":"#009E49", "Artisanat":"#FCD116", "Services":"#0EA5E9", "Communauté":"#CE1126",
};

export default function MarketplaceTab() {
  const c = useC();
  const [section, setSection] = useState<"merch" | "ads" | "post">("merch");
  const [filter, setFilter] = useState("Tout");
  const [form, setForm] = useState({ title:"", desc:"", category:"Cours", price:"", location:"", email:"" });
  const [posted, setPosted] = useState(false);

  const merchCats = ["Tout", ...Array.from(new Set(MERCH.map((m) => m.category)))];
  const filtered = filter === "Tout" ? MERCH : MERCH.filter((m) => m.category === filter);

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="badge badge-green mb-3 mx-auto"><span aria-hidden="true">🛍️</span> {c("Marketplace Manjak")}</div>
        <h2 className="heading-lg" style={{ color:"var(--text)" }}>{c("Boutique & Communauté")}</h2>
        <p className="body-lg max-w-xl mx-auto mt-2">{c("Merch officiel, artisanat et annonces de la communauté Manjaku mondiale")}</p>
        <p role="note" className="text-sm font-semibold max-w-xl mx-auto mt-4 rounded-xl px-4 py-3" style={{ background: "rgba(252,209,22,0.12)", border: "1px solid rgba(252,209,22,0.4)", color: "var(--text)" }}>
          {c("Aperçu : la boutique et les annonces ne sont pas encore ouvertes. Les articles, les prix et les annonces ci-dessous sont des exemples. Rien ne peut être acheté ni publié pour le moment.")}
        </p>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2 mb-8 justify-center flex-wrap">
        {[
          { id:"merch" as const, label:"🛍️ Boutique POD" },
          { id:"ads" as const, label:"📌 Annonces" },
          { id:"post" as const, label:"✏️ Poster une annonce" },
        ].map((s) => (
          <button key={s.id} onClick={() => setSection(s.id)} aria-pressed={section === s.id}
            className="btn"
            style={{ background: section===s.id ? "#009E49" : "var(--surface2)", color: section===s.id ? "#fff" : "var(--text-muted)", border: section===s.id ? "none" : "1px solid var(--border)" }}>
            {c(s.label)}
          </button>
        ))}
      </div>

      {/* ── MERCH ── */}
      {section === "merch" && (
        <div>
          {/* Category filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
            {merchCats.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} aria-pressed={filter === cat}
                className="btn flex-shrink-0 text-sm py-2 px-4"
                style={{ background: filter===cat ? "#009E49" : "var(--surface2)", color: filter===cat ? "#fff" : "var(--text-muted)", border: filter===cat ? "none" : "1px solid var(--border)" }}>
                {c(cat)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {filtered.map((item) => (
              <div key={item.id} className="card card-hover overflow-hidden flex flex-col">
                {/* Image placeholder */}
                <div aria-hidden="true" className="aspect-square flex items-center justify-center text-5xl relative"
                  style={{ background: `linear-gradient(135deg, ${CAT_COLORS[item.category] ?? "#009E49"}15, ${CAT_COLORS[item.category] ?? "#009E49"}05)` }}>
                  {item.emoji}
                  {item.tag && (
                    <span className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "#009E49", color: "#fff" }}>{c(item.tag)}</span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs font-semibold mb-1" style={{ color: CAT_COLORS[item.category] ?? "#009E49" }}>{c(item.category)}</div>
                  <div className="font-bold text-sm mb-1 leading-snug" style={{ color:"var(--text)" }}>{c(item.title)}</div>
                  <p className="text-xs leading-relaxed flex-1" style={{ color:"var(--text-muted)" }}>{c(item.desc)}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                    <span className="font-black text-base" style={{ color:"#009E49" }}>{item.price}</span>
                    <button disabled aria-label={`${c(item.title)} : ${c("Bientôt")}`} className="btn btn-primary text-xs py-1.5 px-3" style={{ opacity: 0.5 }}>{c("Bientôt")}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* POD info */}
          <div className="card p-6 text-center" style={{ border:"1px solid rgba(0,158,73,0.25)", background:"rgba(0,158,73,0.03)" }}>
            <div className="text-3xl mb-3">🖨️</div>
            <h3 className="font-bold mb-2" style={{ color:"var(--text)" }}>{c("Print on Demand — Expédition mondiale")}</h3>
            <p className="body-sm max-w-md mx-auto">{c("Tous les produits sont imprimés à la demande par nos partenaires Printful et expédiés depuis l'Europe. Livraison 5–10 jours ouvrés.")}</p>
            <a href="mailto:info@luvlab.io" className="btn btn-outline mt-4 inline-flex">{c("📦 Proposer un produit")}</a>
          </div>
        </div>
      )}

      {/* ── ADS ── */}
      {section === "ads" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {ADS.map((ad) => (
              <div key={ad.id} className="card card-hover p-5 flex flex-col gap-3 relative">
                {ad.featured && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background:"rgba(0,158,73,0.15)", color:"#009E49" }}>{c("À la une")}</span>
                )}
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5" style={{ color: CAT_COLORS[ad.category] ?? "#009E49" }}>
                    {ad.category==="Cours"?"📚":ad.category==="Artisanat"?"🧵":ad.category==="Services"?"🎵":"🤝"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: CAT_COLORS[ad.category] ?? "#009E49" }}>{c(ad.category)}</div>
                    <div className="font-bold mb-1" style={{ color:"var(--text)" }}>{c(ad.title)}</div>
                    <p className="text-sm leading-relaxed" style={{ color:"var(--text-muted)" }}>{c(ad.desc)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor:"var(--border)" }}>
                  <div className="flex items-center gap-2">
                    <span>{ad.flag}</span>
                    <span className="text-xs" style={{ color:"var(--text-muted)" }}>{ad.location}</span>
                  </div>
                  {ad.price && (
                    <span className="font-black text-sm" style={{ color:"#009E49" }}>{c(ad.price)}</span>
                  )}
                </div>
                <button disabled className="btn btn-outline text-sm w-full justify-center py-2" style={{ opacity: 0.5 }}>{c("Contact bientôt disponible")}</button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => setSection("post")} className="btn btn-primary">{c("✏️ Publier une annonce")}</button>
          </div>
        </div>
      )}

      {/* ── POST AD ── */}
      {section === "post" && (
        <div className="max-w-lg mx-auto">
          {posted ? (
            <div className="card p-10 text-center animate-fade-up" role="status">
              <div className="text-6xl mb-4" aria-hidden="true">📝</div>
              <h3 className="heading-md mb-3" style={{ color:"#009E49" }}>{c("Annonce non envoyée")}</h3>
              <p className="body-sm mb-6">{c("La publication d'annonces n'est pas encore ouverte. Votre annonce n'a été ni envoyée ni enregistrée. Pour la proposer dès maintenant, écrivez à info@luvlab.io.")}</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => { setPosted(false); setForm({ title:"",desc:"",category:"Cours",price:"",location:"",email:"" }); }} className="btn btn-outline">{c("Nouvelle annonce")}</button>
                <button onClick={() => setSection("ads")} className="btn btn-primary">{c("Voir les annonces")}</button>
              </div>
            </div>
          ) : (
            <div className="card p-6">
              <div className="badge badge-green mb-4">{c("✏️ Nouvelle annonce")}</div>
              <h3 className="heading-md mb-6" style={{ color:"var(--text)" }}>{c("Publier dans la communauté")}</h3>
              <form onSubmit={(e) => { e.preventDefault(); setPosted(true); }} className="space-y-4">
                <div>
                  <label htmlFor="ad-f1" className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>{c("Catégorie")}</label>
                  <select id="ad-f1" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="cms-input">
                    {["Cours","Artisanat","Services","Communauté","Événement","Emploi","Autre"].map((cat) => <option key={cat} value={cat}>{c(cat)}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="ad-f2" className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>{c("Titre")}</label>
                  <input id="ad-f2" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="cms-input" placeholder={c("Ex: Cours de Manjaku débutants")} />
                </div>
                <div>
                  <label htmlFor="ad-f3" className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>{c("Description")}</label>
                  <textarea id="ad-f3" required value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} className="cms-input" rows={4} placeholder={c("Décrivez votre offre ou service…")} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="ad-f4" className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>{c("Prix (optionnel)")}</label>
                    <input id="ad-f4" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="cms-input" placeholder={c("Ex: 30€/h")} />
                  </div>
                  <div>
                    <label htmlFor="ad-f5" className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>{c("Ville / Pays")}</label>
                    <input id="ad-f5" required value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className="cms-input" placeholder={c("Paris, France")} />
                  </div>
                </div>
                <div>
                  <label htmlFor="ad-f6" className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>{c("Email de contact")}</label>
                  <input id="ad-f6" required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="cms-input" placeholder={c("votre@email.com")} />
                </div>
                <button type="submit" className="btn btn-primary w-full justify-center py-3">{c("Soumettre l'annonce")}</button>
                <p className="text-xs text-center" style={{ color:"var(--text-muted)" }}>{c("Aperçu : le formulaire n'envoie rien pour le moment.")}</p>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
