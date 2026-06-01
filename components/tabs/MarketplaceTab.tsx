"use client";

import { useState } from "react";

type MerchItem = { id: string; title: string; price: string; category: string; emoji: string; desc: string; tag?: string };
type Ad = { id: string; title: string; desc: string; category: string; price: string | null; location: string; flag: string; featured?: boolean };

const MERCH: MerchItem[] = [
  { id:"1", title:"T-shirt Mandjaku", price:"29.90€", category:"Vêtements", emoji:"👕", desc:"Imprimé avec l'alphabet Manjak — 100% coton bio", tag:"Bestseller" },
  { id:"2", title:"Hoodie Kabu lëp Manjak", price:"54.90€", category:"Vêtements", emoji:"🧥", desc:"Sweat brodé avec le proverbe Manjak" },
  { id:"3", title:"Tote Bag Kente", price:"19.90€", category:"Accessoires", emoji:"👜", desc:"Couleurs du kente — vert, jaune, rouge", tag:"Eco" },
  { id:"4", title:"Poster Alphabet A2", price:"24.90€", category:"Art", emoji:"🖼️", desc:"Les 24 lettres avec prononciations — livré roulé" },
  { id:"5", title:"Mug Mandjaku", price:"14.90€", category:"Accessoires", emoji:"☕", desc:"24 lettres et prononciation sur céramique" },
  { id:"6", title:"Casquette Manjak", price:"34.90€", category:"Vêtements", emoji:"🧢", desc:"Broderie logo Mandjaku — 6 coloris" },
  { id:"7", title:"Bracelet Kente", price:"12.90€", category:"Accessoires", emoji:"📿", desc:"Artisanal — couleurs Guinée-Bissau", tag:"Artisanat" },
  { id:"8", title:"Carnet Alphabet", price:"9.90€", category:"Papeterie", emoji:"📓", desc:"A5 avec alphabet illustré — idéal pour apprendre" },
];

const ADS: Ad[] = [
  { id:"1", title:"Cours de Mandjaku en ligne", desc:"Cours via Zoom, tous niveaux. Méthode communicative avec exercices et quiz inclus.", category:"Cours", price:"30€/h", location:"Paris", flag:"🇫🇷", featured:true },
  { id:"2", title:"Tissus traditionnels Manjak", desc:"Tissus authentiques importés de Guinée-Bissau. Plusieurs motifs disponibles à Lisbonne.", category:"Artisanat", price:"45€/m", location:"Lisbonne", flag:"🇵🇹", featured:true },
  { id:"3", title:"Musicien Manjak — événements", desc:"Percussions traditionnelles pour mariages, expositions, événements culturels.", category:"Services", price:"Sur devis", location:"Paris", flag:"🇫🇷" },
  { id:"4", title:"Association Mandjaku Lisbonne", desc:"Rejoignez notre association — réunions mensuelles, événements culturels au Portugal.", category:"Communauté", price:null, location:"Lisbonne", flag:"🇵🇹", featured:true },
];

const CAT_COLORS: Record<string, string> = {
  "Vêtements":"#009E49", "Accessoires":"#FCD116", "Art":"#CE1126", "Papeterie":"#7C3AED",
  "Cours":"#009E49", "Artisanat":"#FCD116", "Services":"#0EA5E9", "Communauté":"#CE1126",
};

export default function MarketplaceTab() {
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
        <div className="badge badge-green mb-3 mx-auto">🛍️ Marketplace Manjak</div>
        <h2 className="heading-lg" style={{ color:"var(--text)" }}>Boutique & Communauté</h2>
        <p className="body-lg max-w-xl mx-auto mt-2">Merch officiel, artisanat et annonces de la communauté Mandjaku mondiale</p>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2 mb-8 justify-center flex-wrap">
        {[
          { id:"merch" as const, label:"🛍️ Boutique POD" },
          { id:"ads" as const, label:"📌 Annonces" },
          { id:"post" as const, label:"✏️ Poster une annonce" },
        ].map((s) => (
          <button key={s.id} onClick={() => setSection(s.id)}
            className="btn"
            style={{ background: section===s.id ? "#009E49" : "var(--surface2)", color: section===s.id ? "#fff" : "var(--text-muted)", border: section===s.id ? "none" : "1px solid var(--border)" }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* ── MERCH ── */}
      {section === "merch" && (
        <div>
          {/* Category filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
            {merchCats.map((c) => (
              <button key={c} onClick={() => setFilter(c)}
                className="btn flex-shrink-0 text-sm py-2 px-4"
                style={{ background: filter===c ? "#009E49" : "var(--surface2)", color: filter===c ? "#fff" : "var(--text-muted)", border: filter===c ? "none" : "1px solid var(--border)" }}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {filtered.map((item) => (
              <div key={item.id} className="card card-hover overflow-hidden flex flex-col">
                {/* Image placeholder */}
                <div className="aspect-square flex items-center justify-center text-5xl relative"
                  style={{ background: `linear-gradient(135deg, ${CAT_COLORS[item.category] ?? "#009E49"}15, ${CAT_COLORS[item.category] ?? "#009E49"}05)` }}>
                  {item.emoji}
                  {item.tag && (
                    <span className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "#009E49", color: "#fff" }}>{item.tag}</span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs font-semibold mb-1" style={{ color: CAT_COLORS[item.category] ?? "#009E49" }}>{item.category}</div>
                  <div className="font-bold text-sm mb-1 leading-snug" style={{ color:"var(--text)" }}>{item.title}</div>
                  <p className="text-xs leading-relaxed flex-1" style={{ color:"var(--text-muted)" }}>{item.desc}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-black text-base" style={{ color:"#009E49" }}>{item.price}</span>
                    <button className="btn btn-primary text-xs py-1.5 px-3">Acheter</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* POD info */}
          <div className="card p-6 text-center" style={{ border:"1px solid rgba(0,158,73,0.25)", background:"rgba(0,158,73,0.03)" }}>
            <div className="text-3xl mb-3">🖨️</div>
            <h3 className="font-bold mb-2" style={{ color:"var(--text)" }}>Print on Demand — Expédition mondiale</h3>
            <p className="body-sm max-w-md mx-auto">Tous les produits sont imprimés à la demande par nos partenaires Printful et expédiés depuis l'Europe. Livraison 5–10 jours ouvrés.</p>
            <a href="mailto:info@luvlab.io" className="btn btn-outline mt-4 inline-flex">📦 Proposer un produit</a>
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
                  <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background:"rgba(0,158,73,0.15)", color:"#009E49" }}>À la une</span>
                )}
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5" style={{ color: CAT_COLORS[ad.category] ?? "#009E49" }}>
                    {ad.category==="Cours"?"📚":ad.category==="Artisanat"?"🧵":ad.category==="Services"?"🎵":"🤝"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: CAT_COLORS[ad.category] ?? "#009E49" }}>{ad.category}</div>
                    <div className="font-bold mb-1" style={{ color:"var(--text)" }}>{ad.title}</div>
                    <p className="text-sm leading-relaxed" style={{ color:"var(--text-muted)" }}>{ad.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor:"var(--border)" }}>
                  <div className="flex items-center gap-2">
                    <span>{ad.flag}</span>
                    <span className="text-xs" style={{ color:"var(--text-muted)" }}>{ad.location}</span>
                  </div>
                  {ad.price && (
                    <span className="font-black text-sm" style={{ color:"#009E49" }}>{ad.price}</span>
                  )}
                </div>
                <button className="btn btn-outline text-sm w-full justify-center py-2">Contacter</button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => setSection("post")} className="btn btn-primary">✏️ Publier une annonce</button>
          </div>
        </div>
      )}

      {/* ── POST AD ── */}
      {section === "post" && (
        <div className="max-w-lg mx-auto">
          {posted ? (
            <div className="card p-10 text-center animate-fade-up">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="heading-md mb-3" style={{ color:"#009E49" }}>Annonce soumise !</h3>
              <p className="body-sm mb-6">Votre annonce sera validée et publiée sous 24h. Merci de contribuer à la communauté Mandjaku !</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => { setPosted(false); setForm({ title:"",desc:"",category:"Cours",price:"",location:"",email:"" }); }} className="btn btn-outline">Nouvelle annonce</button>
                <button onClick={() => setSection("ads")} className="btn btn-primary">Voir les annonces</button>
              </div>
            </div>
          ) : (
            <div className="card p-6">
              <div className="badge badge-green mb-4">✏️ Nouvelle annonce</div>
              <h3 className="heading-md mb-6" style={{ color:"var(--text)" }}>Publier dans la communauté</h3>
              <form onSubmit={(e) => { e.preventDefault(); setPosted(true); }} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>Catégorie</label>
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="cms-input">
                    {["Cours","Artisanat","Services","Communauté","Événement","Emploi","Autre"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>Titre</label>
                  <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="cms-input" placeholder="Ex: Cours de Mandjaku débutants" />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>Description</label>
                  <textarea required value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} className="cms-input" rows={4} placeholder="Décrivez votre offre ou service…" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>Prix (optionnel)</label>
                    <input value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="cms-input" placeholder="Ex: 30€/h" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>Ville / Pays</label>
                    <input required value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className="cms-input" placeholder="Paris, France" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color:"var(--text)" }}>Email de contact</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="cms-input" placeholder="votre@email.com" />
                </div>
                <button type="submit" className="btn btn-primary w-full justify-center py-3">Soumettre l'annonce</button>
                <p className="text-xs text-center" style={{ color:"var(--text-muted)" }}>Validation sous 24h · Gratuit pour la communauté Mandjaku</p>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
