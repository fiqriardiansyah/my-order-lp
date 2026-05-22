"use client";

import { useState, useRef, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type Category =
  | "SEMUA"
  | "KAFE & KOPI"
  | "BISTRO"
  | "ASIA & JEPANG"
  | "INDONESIA"
  | "BAKERY"
  | "VEGAN & HEALTHY"
  | "FINE DINING";

interface Template {
  id: string;
  name: string;
  domain: string;
  category: Exclude<Category, "SEMUA">;
  subcategory: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  usedCount: number;
  badge?: { label: string; type: "trending" | "new" | "premium" };
  previewBg: string;
  previewText: string;
  previewTextColor: string;
  previewAccent: string;
  colors: string[];
}

const TEMPLATES: Template[] = [
  {
    id: "maison-classique",
    name: "Maison Classique",
    domain: "bistromaison.id",
    category: "BISTRO",
    subcategory: "FRENCH",
    description:
      "Layout serif elegan dengan tiga kolom galeri. Cocok untuk bistro, brasserie, dan kafe konsep Eropa.",
    price: 290000,
    rating: 4.9,
    usedCount: 142,
    badge: { label: "TRENDING", type: "trending" },
    previewBg: "#f5ede0",
    previewText: "Bonjour, Jakarta",
    previewTextColor: "#2d1a0e",
    previewAccent: "#c49a5e",
    colors: ["#8B6914", "#C4A35A", "#3D2B1F", "#F5E8D0"],
  },
  {
    id: "tokyo-slurp",
    name: "Tokyo Slurp",
    domain: "ramentokyo.id",
    category: "ASIA & JEPANG",
    subcategory: "JEPANG",
    description:
      "Bold & assertive — tipografi tebal dengan aksen merah Jepang. Cocok untuk ramen shop dan izakaya.",
    price: 240000,
    rating: 4.8,
    usedCount: 89,
    badge: { label: "BARU", type: "new" },
    previewBg: "#1a0000",
    previewText: "Sup Tonkotsu",
    previewTextColor: "#ffffff",
    previewAccent: "#cc1414",
    colors: ["#CC1414", "#1A0000", "#FFFFFF", "#FFD700"],
  },
  {
    id: "tanah-merah",
    name: "Tanah Merah",
    domain: "tanahmerah.eco",
    category: "VEGAN & HEALTHY",
    subcategory: "HEALTHY",
    description:
      "Hijau, jujur, dan bersih. Highlight ingredient lokal, badge sertifikasi, dan filter dietary.",
    price: 260000,
    rating: 4.7,
    usedCount: 54,
    previewBg: "#1e3d2f",
    previewText: "Makanan sehat dari kebun.",
    previewTextColor: "#e8f5e9",
    previewAccent: "#4caf50",
    colors: ["#1E3D2F", "#4CAF50", "#8BC34A", "#E8F5E9"],
  },
  {
    id: "rosa-co",
    name: "Rosa & Co",
    domain: "rosabakery.id",
    category: "BAKERY",
    subcategory: "PASTRY",
    description:
      'Hangat dan personal — serif italic dengan palet pink lembut. Ada bagian "roti hari ini" dan pre-order.',
    price: 220000,
    rating: 4.9,
    usedCount: 76,
    previewBg: "#fce8e4",
    previewText: "Roti hangat tiap pagi.",
    previewTextColor: "#6b2d3e",
    previewAccent: "#e8a0a0",
    colors: ["#E8A0A0", "#6B2D3E", "#FDE8E8", "#C9626A"],
  },
  {
    id: "genji-minimal",
    name: "Genji Minimal",
    domain: "omakase-genji.com",
    category: "FINE DINING",
    subcategory: "SUSHI",
    description:
      "Hampir tidak ada ornamen — fokus ke wordmark, ruang kosong, dan satu titik merah. Untuk yang serius.",
    price: 380000,
    originalPrice: 460000,
    rating: 5.0,
    usedCount: 31,
    badge: { label: "PREMIUM", type: "premium" },
    previewBg: "#8b8f7a",
    previewText: "GENJI",
    previewTextColor: "#f5f5f0",
    previewAccent: "#8b1a1a",
    colors: ["#8B8F7A", "#F5F5F0", "#8B1A1A", "#2C2C28"],
  },
  {
    id: "prime-co",
    name: "Prime & Co",
    domain: "primesteakhouse.id",
    category: "FINE DINING",
    subcategory: "STEAKHOUSE",
    description:
      "Dark mode, aksen emas, dan reservation flow yang kuat. Cocok untuk steakhouse dan grill premium.",
    price: 360000,
    rating: 4.8,
    usedCount: 47,
    previewBg: "#0d0d0d",
    previewText: "The Cut Above",
    previewTextColor: "#d4a853",
    previewAccent: "#d4a853",
    colors: ["#0D0D0D", "#D4A853", "#1A1A1A", "#8B6914"],
  },
  {
    id: "verde-coffee",
    name: "Verde Coffee",
    domain: "verdecoffee.id",
    category: "KAFE & KOPI",
    subcategory: "ESPRESSO BAR",
    description:
      "Minimalis modern dengan sentuhan hijau forest. Tampilkan menu biji kopi, brewing method, dan barista notes.",
    price: 250000,
    rating: 4.8,
    usedCount: 103,
    badge: { label: "BARU", type: "new" },
    previewBg: "#2d4a3e",
    previewText: "Single Origin",
    previewTextColor: "#e8f0eb",
    previewAccent: "#7ab893",
    colors: ["#2D4A3E", "#7AB893", "#E8F0EB", "#C4D9CC"],
  },
  {
    id: "violet-bar",
    name: "Violet Bar",
    domain: "violetbar.id",
    category: "KAFE & KOPI",
    subcategory: "COCKTAIL BAR",
    description:
      "Moody dan dramatis — tipografi display besar, latar gelap ungu, dan menu cocktail yang menggoda.",
    price: 310000,
    rating: 4.6,
    usedCount: 38,
    previewBg: "#1a0d2e",
    previewText: "Sip the Night",
    previewTextColor: "#c9a6e8",
    previewAccent: "#7b35c4",
    colors: ["#1A0D2E", "#7B35C4", "#C9A6E8", "#2D1A50"],
  },
  {
    id: "rumah-padang",
    name: "Rumah Padang Murni",
    domain: "rumahpadangmurni.id",
    category: "INDONESIA",
    subcategory: "PADANG",
    description:
      "Autentik dan ramah keluarga — dengan foto lauk berderet, sistem pesan nasi campur, dan harga transparan.",
    price: 200000,
    rating: 4.7,
    usedCount: 215,
    badge: { label: "BARU", type: "new" },
    previewBg: "#7d1a1a",
    previewText: "Masakan Minang Asli",
    previewTextColor: "#fdebd0",
    previewAccent: "#e8a040",
    colors: ["#7D1A1A", "#E8A040", "#FDEBD0", "#2D0A0A"],
  },
  {
    id: "nusantara-grill",
    name: "Nusantara Grill",
    domain: "nusantaragrill.id",
    category: "INDONESIA",
    subcategory: "GRILL",
    description:
      "Batik pattern halus sebagai background, menu BBQ lokal, dan booking meja langsung dari website.",
    price: 270000,
    originalPrice: 310000,
    rating: 4.5,
    usedCount: 62,
    previewBg: "#2a1a08",
    previewText: "Bara & Bumbu",
    previewTextColor: "#f5d98c",
    previewAccent: "#d4691e",
    colors: ["#2A1A08", "#D4691E", "#F5D98C", "#5C3010"],
  },
  {
    id: "brown-bear",
    name: "Brown Bear Café",
    domain: "brownbearcafe.id",
    category: "KAFE & KOPI",
    subcategory: "ALL-DAY DINING",
    description:
      "Cozy dan welcoming — foto besar, menu brunch, dan loyalty program yang mudah diakses.",
    price: 230000,
    rating: 4.9,
    usedCount: 118,
    previewBg: "#4a2c0a",
    previewText: "Coffee & Comfort",
    previewTextColor: "#fef3e2",
    previewAccent: "#c67c3a",
    colors: ["#4A2C0A", "#C67C3A", "#FEF3E2", "#8B4513"],
  },
  {
    id: "lotus-garden",
    name: "Lotus Garden",
    domain: "lotusgarden.id",
    category: "ASIA & JEPANG",
    subcategory: "CHINESE",
    description:
      "Elegan oriental dengan aksen merah dan emas. Dim sum menu, reservasi meja VIP, dan catering events.",
    price: 300000,
    rating: 4.6,
    usedCount: 44,
    previewBg: "#f5f0e8",
    previewText: "蓮花園",
    previewTextColor: "#8b1a1a",
    previewAccent: "#d4a853",
    colors: ["#8B1A1A", "#D4A853", "#F5F0E8", "#2D0A0A"],
  },
];

const CATEGORIES: { label: Category; count: number }[] = [
  { label: "SEMUA", count: 36 },
  { label: "KAFE & KOPI", count: 8 },
  { label: "BISTRO", count: 6 },
  { label: "ASIA & JEPANG", count: 5 },
  { label: "INDONESIA", count: 7 },
  { label: "BAKERY", count: 4 },
  { label: "VEGAN & HEALTHY", count: 3 },
  { label: "FINE DINING", count: 3 },
];

const SORT_OPTIONS = ["Terpopuler", "Terbaru", "Harga Terendah", "Rating Tertinggi"];

function BadgePill({ type, label }: { type: "trending" | "new" | "premium"; label: string }) {
  const styles = {
    trending: "bg-amber-500 text-white",
    new: "bg-[var(--brand-deep)] text-white",
    premium: "bg-black text-white",
  };
  return (
    <span className={`text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full ${styles[type]}`}>
      {label}
    </span>
  );
}

function BrowserChrome({ domain }: { domain: string }) {
  return (
    <div className="bg-white border-b border-gray-100 px-3 py-2 flex items-center gap-2">
      <div className="flex gap-1 shrink-0">
        <div className="size-2.5 rounded-full bg-red-400" />
        <div className="size-2.5 rounded-full bg-yellow-400" />
        <div className="size-2.5 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 bg-gray-100 rounded text-[11px] text-gray-400 px-3 py-0.5 text-center truncate">
        {domain}
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: Template }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden bg-white cursor-pointer transition-all duration-200"
      style={{
        boxShadow: hovered
          ? "0 0 0 2px var(--brand), 0 12px 32px -8px rgba(0,0,0,0.14)"
          : "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Browser chrome + preview */}
      <div className="relative">
        <BrowserChrome domain={template.domain} />

        {/* Preview area */}
        <div
          className="relative h-52 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: template.previewBg }}
        >
          {/* Badge */}
          {template.badge && (
            <div className="absolute top-3 left-3 z-10">
              <BadgePill type={template.badge.type} label={template.badge.label} />
            </div>
          )}

          {/* Preview content */}
          <div className="text-center px-6 select-none">
            <p
              className="text-xl font-bold leading-tight"
              style={{
                color: template.previewTextColor,
                fontFamily: template.id === "maison-classique" || template.id === "lotus-garden"
                  ? "Georgia, serif"
                  : template.id === "genji-minimal"
                  ? "var(--font-sans)"
                  : "inherit",
                letterSpacing: template.id === "genji-minimal" ? "0.2em" : undefined,
                fontStyle: template.id === "maison-classique" || template.id === "rosa-co" ? "italic" : undefined,
              }}
            >
              {template.previewText}
            </p>
            <div
              className="mt-2 h-0.5 w-12 mx-auto rounded"
              style={{ background: template.previewAccent, opacity: 0.7 }}
            />
            {template.id === "rosa-co" && (
              <p className="mt-2 text-xs font-semibold" style={{ color: template.previewAccent }}>
                Mulai Rp 18k
              </p>
            )}
          </div>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-200"
            style={{
              background: "rgba(0,0,0,0.45)",
              opacity: hovered ? 1 : 0,
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white text-white text-sm font-medium hover:bg-white/10 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Pratinjau
              </button>
              <button
                className="px-4 py-2 rounded-full text-white text-sm font-semibold transition-colors"
                style={{ background: "var(--brand-deep)" }}
              >
                Pakai template
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card info */}
      <div className="p-4">
        <p className="text-[11px] font-semibold tracking-widest text-(--fg-subtle) mb-1">
          {template.category} · {template.subcategory}
        </p>
        <h3 className="font-bold text-(--fg) text-base leading-snug mb-1.5">
          {template.name}
        </h3>
        <p className="text-sm text-(--fg-muted) leading-relaxed mb-3 line-clamp-2">
          {template.description}
        </p>

        {/* Price + rating row */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-(--fg) text-base">
                Rp {template.price.toLocaleString("id-ID")}
              </span>
              {template.originalPrice && (
                <span className="text-xs text-(--fg-subtle) line-through">
                  Rp {template.originalPrice.toLocaleString("id-ID")}
                </span>
              )}
            </div>
            <span className="text-xs text-(--fg-muted)">/ sekali bayar</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-(--fg-muted)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="font-medium text-(--fg)">{template.rating.toFixed(1)}</span>
            <span className="text-(--fg-subtle)">·</span>
            <span>{template.usedCount} dipakai</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-white text-sm font-medium text-(--fg) hover:border-(--border-strong) transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="21" y1="10" x2="7" y2="10" />
          <line x1="21" y1="6" x2="3" y2="6" />
          <line x1="21" y1="14" x2="3" y2="14" />
          <line x1="21" y1="18" x2="7" y2="18" />
        </svg>
        {value}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 bg-white rounded-xl border border-[var(--border)] shadow-lg py-1 z-20 min-w-[160px]">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-[var(--bg-soft)] ${
                opt === value ? "font-semibold text-(--brand-deep)" : "text-(--fg)"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TemplatesPage() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [activeCategory, setActiveCategory] = useState<Category>("SEMUA");
  const [sortBy, setSortBy] = useState("Terpopuler");

  const filtered = TEMPLATES.filter(
    (t) => activeCategory === "SEMUA" || t.category === activeCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Harga Terendah") return a.price - b.price;
    if (sortBy === "Rating Tertinggi") return b.rating - a.rating;
    if (sortBy === "Terbaru") return b.usedCount - a.usedCount; // placeholder
    return b.usedCount - a.usedCount; // Terpopuler
  });

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main style={{ background: "var(--bg-cream)" }} className="min-h-screen">
        {/* Hero section */}
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 border border-[var(--border)]"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <div
              className="size-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "var(--brand)" }}
            >
              K
            </div>
            <span className="text-sm font-semibold text-(--fg)">Kasigo Storefront</span>
            <span className="text-(--fg-subtle)">·</span>
            <span className="text-sm text-(--brand-deep) font-medium">Template marketplace</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-extrabold text-(--fg) leading-[1.1] mb-5">
            Template website siap pakai{" "}
            <span style={{ color: "var(--brand-deep)" }}>untuk<br />restoran & kafe kamu.</span>
          </h1>

          <p className="text-lg text-(--fg-muted) max-w-2xl mb-7 leading-relaxed">
            Pilih desain, ganti foto dan menu, terbit dalam 10 menit. Setiap template sudah
            terhubung dengan kasir Kasigo — pesanan dari menu QR otomatis masuk ke dapur.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-x-8 gap-y-2.5 mb-8">
            {[
              "Mobile-friendly & cepat",
              "Domain custom (.id)",
              "QR menu & pesanan online",
              "Update sendiri, tanpa coding",
            ].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-(--fg-muted)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--brand-deep)" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {f}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap">
            <a
              href="#templates-grid"
              className="btn btn-primary"
            >
              Lihat semua template
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="btn btn-secondary"
            >
              Cara kerjanya
            </a>
          </div>
        </section>

        {/* Filter + Grid */}
        <section id="templates-grid" className="max-w-7xl mx-auto px-6 pb-20">
          {/* Filter bar */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-3 flex-1 min-w-0 overflow-x-auto">
              {CATEGORIES.map(({ label, count }) => {
                const active = activeCategory === label;
                return (
                  <button
                    key={label}
                    onClick={() => setActiveCategory(label)}
                    className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all shrink-0"
                    style={{
                      background: active ? "var(--fg)" : "white",
                      color: active ? "white" : "var(--fg-muted)",
                      border: active ? "1px solid var(--fg)" : "1px solid var(--border)",
                      boxShadow: active ? "none" : "0 1px 2px rgba(0,0,0,0.04)",
                    }}
                  >
                    {label}
                    <span
                      className="text-xs"
                      style={{ opacity: active ? 0.7 : 0.6 }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="shrink-0 ml-2">
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {/* Template grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-20 text-(--fg-muted)">
              <p className="text-lg font-medium mb-1">Belum ada template di kategori ini.</p>
              <p className="text-sm">Segera hadir — daftarkan email kamu untuk notifikasi.</p>
            </div>
          )}
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
