"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQProps {
  lang: "id" | "en";
}

interface FAQItem {
  qId: string;
  qEn: string;
  aId: string;
  aEn: string;
}

const items: FAQItem[] = [
  {
    qId: "Apakah perlu install aplikasi?",
    qEn: "Do I need to install an app?",
    aId: "Tidak perlu. Pelanggan cukup scan QR code di meja menggunakan kamera HP biasa, menu langsung terbuka di browser. Staf juga bisa pakai dari browser laptop atau tablet — nggak perlu install apa-apa.",
    aEn: "No. Guests just scan the table's QR with their phone camera and the menu opens in the browser. Staff also use it from any laptop or tablet browser — no install required.",
  },
  {
    qId: "Bagaimana cara pelanggan memesan?",
    qEn: "How do guests order?",
    aId: "Pelanggan scan QR di meja, pilih kategori, tambah ke keranjang, isi nama (opsional), lalu klik Place Order. Pesanan langsung muncul di dashboard kamu dan kitchen display dalam hitungan detik.",
    aEn: "They scan the QR, pick a category, add to cart, enter their name (optional), then tap Place Order. The order shows up on your dashboard and kitchen display within seconds.",
  },
  {
    qId: "Apakah bisa digunakan di banyak cabang?",
    qEn: "Can I use it across multiple outlets?",
    aId: "Bisa, mulai dari paket Restoran. Setiap outlet punya menu, meja, dan staff sendiri, tapi owner tetap bisa lihat report semua outlet dari satu dashboard.",
    aEn: "Yes, starting from the Restaurant plan. Each outlet has its own menu, tables, and staff, but the owner can see reports across all outlets from one dashboard.",
  },
  {
    qId: "Bagaimana dengan keamanan data?",
    qEn: "How secure is the data?",
    aId: "Server kami di Indonesia (Jakarta region), backup otomatis tiap jam, dan data terenkripsi end-to-end. Akses staf dibatasi per role — kasir nggak bisa lihat report owner, dapur nggak bisa edit menu.",
    aEn: "Our servers are in Indonesia (Jakarta region), automated hourly backups, and end-to-end encryption. Staff access is scoped by role — cashiers can't see owner reports, kitchen can't edit the menu.",
  },
  {
    qId: "Apakah ada paket gratis?",
    qEn: "Is there a free plan?",
    aId: "Ada. Paket Gratis bisa dipakai selamanya tanpa kartu kredit — cocok untuk warung atau kafe kecil yang baru mulai.",
    aEn: "Yes. The Free plan is available forever with no credit card required — perfect for small cafes just getting started.",
  },
];

export default function FAQ({ lang }: FAQProps) {
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="container-tight">
        <div className="faq-grid">
          <div style={{ position: "sticky", top: 96 }} className="faq-aside">
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              <span className="dot" />
              <span>FAQ</span>
            </div>
            <h2 className="h-section">
              {lang === "id"
                ? "Pertanyaan yang sering ditanya."
                : "Questions, answered."}
            </h2>
            <p className="lede" style={{ marginTop: 16 }}>
              {lang === "id"
                ? "Masih ada pertanyaan? "
                : "Got more questions? "}
              <a
                href="https://wa.me/6285273580367"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--brand)",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                {lang === "id" ? "Chat tim kami." : "Chat our team."}
              </a>
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  style={{
                    borderTop: "1px solid var(--border)",
                    borderBottom:
                      i === items.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "20px 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--fg)",
                      }}
                    >
                      {lang === "id" ? item.qId : item.qEn}
                    </span>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 9999,
                        background: isOpen ? "var(--brand)" : "var(--bg-soft)",
                        color: isOpen ? "#fff" : "var(--fg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "background 200ms",
                      }}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? 280 : 0,
                      overflow: "hidden",
                      transition: "max-height 280ms ease",
                    }}
                  >
                    <p
                      className="faq-answer"
                      style={{
                        margin: 0,
                        paddingBottom: 24,
                        paddingRight: 56,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "var(--fg-muted)",
                      }}
                    >
                      {lang === "id" ? item.aId : item.aEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
