"use client";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Image from "next/image";
import { useState } from "react";

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
  previewImage: string;
  colors: string[];
}

const TEMPLATES: Template[] = [
  {
    id: "template-1",
    name: "Jurnal Dapur",
    domain: process.env.NEXT_PUBLIC_ASSETS_URL + "/templates/template-1.html",
    category: "BISTRO",
    subcategory: "FRENCH",
    description:
      "Sebuah dapur kecil di Jalan Linden tempat roti dilipat dengan tangan, kaldu mendidih sejak pagi, dan menu harian mengikuti apa yang diberi pasar.",
    price: 290000,
    rating: 4.9,
    usedCount: 48,
    badge: { label: "TRENDING", type: "trending" },
    previewImage:
      process.env.NEXT_PUBLIC_ASSETS_URL + "/templates/template-1.png",
    colors: [],
  },
  {
    id: "template-2",
    name: "Fine Dining",
    domain: process.env.NEXT_PUBLIC_ASSETS_URL + "/templates/template-2.html",
    category: "FINE DINING",
    subcategory: "FINE DINING",
    description:
      "Tujuh menu cicipan yang dirancang malam ini oleh dapur kami — bahan musiman dari kebun mitra, dimasak perlahan, disajikan dengan tenang. Setiap kursi punya ceritanya sendiri.",
    price: 290000,
    rating: 4.9,
    usedCount: 12,
    previewImage:
      process.env.NEXT_PUBLIC_ASSETS_URL + "/templates/template-2.png",
    colors: [],
  },
  {
    id: "template-3",
    name: "Katering Nusantara",
    domain: process.env.NEXT_PUBLIC_ASSETS_URL + "/templates/template-3.html",
    category: "INDONESIA",
    subcategory: "KATERING",
    description:
      "Setiap pesta layak punya menu yang dirancang khusus. Kasigo Catering menyajikan masakan rumahan dengan bahan segar dari pasar pagi, disajikan hangat untuk 20 sampai 2.000 tamu Anda.",
    price: 290000,
    rating: 4.9,
    usedCount: 31,
    badge: { label: "TRENDING", type: "trending" },
    previewImage:
      process.env.NEXT_PUBLIC_ASSETS_URL + "/templates/template-3.png",
    colors: [],
  },
];

function BadgePill({
  type,
  label,
}: {
  type: "trending" | "new" | "premium";
  label: string;
}) {
  const styles = {
    trending: "bg-amber-500 text-white",
    new: "bg-[var(--brand-deep)] text-white",
    premium: "bg-black text-white",
  };
  return (
    <span
      className={`text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full ${styles[type]}`}
    >
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
        <div className="relative h-52 overflow-hidden bg-gray-100">
          {/* Badge */}
          {template.badge && (
            <div className="absolute top-3 left-3 z-10">
              <BadgePill
                type={template.badge.type}
                label={template.badge.label}
              />
            </div>
          )}

          <Image
            src={template.previewImage}
            alt={template.name}
            fill
            className="object-cover object-top"
          />
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
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="#f59e0b"
              stroke="none"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="font-medium text-(--fg)">
              {template.rating.toFixed(1)}
            </span>
            <span className="text-(--fg-subtle)">·</span>
            <span>{template.usedCount} dipakai</span>
          </div>
        </div>

        {/* CTA row */}
        <div className="flex gap-2 pt-3 mt-1 border-t border-(--border)">
          <a
            href={`${template.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 rounded-lg text-sm font-semibold border border-(--border) text-(--fg-muted) hover:border-(--border-strong) hover:text-(--fg) transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Preview
          </a>
          <a
            href={`https://wa.me/6285273580367?text=${encodeURIComponent(`mau pake template yang ini dong, #${template.id}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2 rounded-lg text-sm font-semibold bg-(--brand) text-white hover:opacity-90 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            Pilih
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [activeCategory, setActiveCategory] = useState<Category>("SEMUA");
  const [sortBy, setSortBy] = useState("Terpopuler");

  const filtered = TEMPLATES.filter(
    (t) => activeCategory === "SEMUA" || t.category === activeCategory,
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
          <div
            className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 border border-[var(--border)]"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <div
              className="size-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "var(--brand)" }}
            >
              K
            </div>
            <span className="text-sm font-semibold text-(--fg)">
              Kasigo Storefront
            </span>
            <span className="text-(--fg-subtle)">·</span>
            <span className="text-sm text-(--brand-deep) font-medium">
              Template marketplace
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-extrabold text-(--fg) leading-[1.1] mb-5">
            Template website siap pakai{" "}
            <span style={{ color: "var(--brand-deep)" }}>
              untuk
              <br />
              Warung, kafe & restoran kamu.
            </span>
          </h1>

          <p className="text-lg text-(--fg-muted) max-w-2xl mb-7 leading-relaxed">
            Pilih desain, ganti foto dan menu, terbit dalam 10 menit. Setiap
            template sudah terhubung dengan kasir Kasigo — pesanan dari menu QR
            otomatis masuk ke dapur.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-x-8 gap-y-2.5 mb-8">
            {[].map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 text-sm text-(--fg-muted)"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--brand-deep)"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {f}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-sm text-(--fg-muted) font-medium">
              Mau desain yang sesuai mau kamu?
            </p>
            <a
              href="https://wa.me/6285273580367"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.492a.75.75 0 0 0 .921.921l5.647-1.471A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 0 1-4.953-1.355l-.355-.212-3.683.958.977-3.567-.232-.368A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              Tanya via WhatsApp
            </a>
          </div>
        </section>

        {/* Filter + Grid */}
        <section id="templates-grid" className="max-w-7xl mx-auto px-6 pb-20">
          {/* Weekly update notice */}
          <div className="flex items-center gap-2 mb-6 text-sm text-(--fg-muted)">
            <span className="inline-flex items-center gap-1.5 bg-white border border-(--border) rounded-full px-3 py-1.5">
              <span className="size-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
              <span className="font-medium text-(--fg)">
                Template baru ditambahkan setiap minggu
              </span>
            </span>
          </div>

          {/* Template grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sorted.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-20 text-(--fg-muted)">
              <p className="text-lg font-medium mb-1">
                Belum ada template di kategori ini.
              </p>
              <p className="text-sm">
                Segera hadir — daftarkan email kamu untuk notifikasi.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
