import { Star } from "lucide-react";

interface TestimonialsProps {
  lang: "id" | "en";
  rhythm: boolean;
}

interface Testimonial {
  quoteId: string;
  quoteEn: string;
  name: string;
  roleId: string;
  roleEn: string;
  venue: string;
  rating: number;
  color: string;
}

const items: Testimonial[] = [
  {
    quoteId:
      "Sebelum pakai Kasigo, weekend itu chaos — bon kebakar, salah meja, antrian kasir panjang. Sekarang pelanggan pesan sendiri dari HP, dapur kami auto tau. Game changer.",
    quoteEn:
      "Weekends used to be chaos — burnt tickets, wrong tables, long cashier queues. Now guests order from their phones and the kitchen knows automatically. Game changer.",
    name: "Rini Wijayanti",
    roleId: "Owner",
    roleEn: "Owner",
    venue: "Warung Ibu — Jakarta",
    rating: 5,
    color: "#fbbf24",
  },
  {
    quoteId:
      "Yang paling kepake itu Floor View. Staff baru pun langsung paham meja mana yang minta bill, mana yang udah selesai. Training jadi 1 hari aja.",
    quoteEn:
      "The Floor View is what we use most. Even new staff understand which tables want the bill and which are done. Training is now one day.",
    name: "Andre Hartono",
    roleId: "Manager",
    roleEn: "Manager",
    venue: "Kopi Kenangan Lokal — Bandung",
    rating: 5,
    color: "#0f6e56",
  },
  {
    quoteId:
      "Saya bisa cek omzet 3 outlet dari rumah. Multi-role accessnya bersih, kasir cuma lihat yang dia perlu, owner lihat semua. Worth banget.",
    quoteEn:
      "I can check revenue for three outlets from home. The multi-role access is clean — cashiers see only what they need, owners see everything. Totally worth it.",
    name: "Pak Budi Santoso",
    roleId: "Owner, 3 outlet",
    roleEn: "Owner, 3 outlets",
    venue: "Sate Pak Budi — Surabaya",
    rating: 5,
    color: "#dc2626",
  },
];

export default function Testimonials({ lang, rhythm }: TestimonialsProps) {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
            alignItems: "end",
            marginBottom: 48,
          }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              <span className="dot" />
              <span>{lang === "id" ? "Testimoni" : "Testimonials"}</span>
            </div>
            <h2 className="h-section">
              {lang === "id"
                ? "Owner restoran cerita sendiri."
                : "Restaurant owners say it best."}
            </h2>
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[
              {
                value: "200+",
                labelId: "restoran aktif",
                labelEn: "active venues",
              },
              {
                value: "4.9",
                labelId: "rating rata-rata",
                labelEn: "average rating",
              },
              {
                value: "2.4×",
                labelId: "tabel turnover",
                labelEn: "table turnover",
              },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--brand)",
                  }}
                >
                  {stat.value}
                </div>
                <div className="muted" style={{ fontSize: 13 }}>
                  {lang === "id" ? stat.labelId : stat.labelEn}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {items.map((t, i) => (
            <figure
              key={i}
              style={{
                margin: 0,
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "28px 28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star
                    key={k}
                    size={16}
                    style={{ color: "var(--accent)", fill: "var(--accent)" }}
                  />
                ))}
              </div>
              <blockquote
                style={
                  {
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--fg)",
                    textWrap: "pretty",
                  } as React.CSSProperties
                }
              >
                {lang === "id" ? t.quoteId : t.quoteEn}
              </blockquote>
              <figcaption
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginTop: "auto",
                  paddingTop: 8,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 9999,
                    background: t.color,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "-0.02em",
                    flexShrink: 0,
                  }}
                >
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--fg-muted)",
                      lineHeight: 1.3,
                    }}
                  >
                    {lang === "id" ? t.roleId : t.roleEn} · {t.venue}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
