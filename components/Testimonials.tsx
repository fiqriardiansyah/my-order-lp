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
      "Awalnya ragu, takut staf saya yang gaptek nggak bisa. Eh ternyata setengah hari langsung jalan. Yang paling berasa: dulu meja pojok sering kelewat, sekarang masuk antrian dapur otomatis. Pelanggan nggak perlu teriak-teriak manggil lagi.",
    quoteEn:
      "I was worried my less tech-savvy staff wouldn't cope. Half a day later we were running. The biggest change: our corner tables used to get missed, now orders go straight to the kitchen queue. No more guests shouting for service.",
    name: "Rini Wijayanti",
    roleId: "Owner",
    roleEn: "Owner",
    venue: "Warung Bu Rini · Jakarta Selatan",
    rating: 5,
    color: "#fbbf24",
  },
  // {
  //   quoteId:
  //     "Pas lagi ramai ada staf yang izin mendadak, staf pengganti baru hari pertama langsung bisa handle meja sendiri karena semua kelihatan di layar. Biasanya butuh 3–4 hari training. Itu yang bikin saya yakin sama Kasigo.",
  //   quoteEn:
  //     "We had a staff no-show on a busy day. Their replacement — first day ever — handled tables on their own because everything's visible on screen. Usually takes 3–4 days to train someone. That's when I knew Kasigo was the one.",
  //   name: "Dika Prasetyo",
  //   roleId: "Manager",
  //   roleEn: "Manager",
  //   venue: "Kopi Murni · Bandung",
  //   rating: 5,
  //   color: "#0f6e56",
  // },
  {
    quoteId:
      "Bulan lalu ketahuan cabang Rungkut revenue-nya tiba-tiba turun. Ternyata ada menu yang sering habis tapi nggak di-toggle, jadi pelanggan pesan terus lalu dibatalin. Sekarang keliatan langsung dari dashboard, nggak perlu nunggu laporan akhir bulan.",
    quoteEn:
      "Last month I caught a revenue dip at my Rungkut branch. Turns out staff weren't toggling sold-out items, so guests kept ordering things we couldn't serve. Now I see it in real-time — no more waiting for the monthly report.",
    name: "Budi Santoso",
    roleId: "Owner · 3 outlet",
    roleEn: "Owner · 3 outlets",
    venue: "Sate Pak Budi · Surabaya",
    rating: 5,
    color: "#dc2626",
  },
  {
    quoteId:
      "Tamu yang biasanya malu manggil pelayan sekarang pesan sendiri dari HP. Kelihatan sepele, tapi pesanan per meja naik lumayan — orang jadi lebih berani tambah order kalau nggak harus nunggu staf lewat.",
    quoteEn:
      "Guests who were too shy to flag down staff now just order from their phones. Seems small, but orders per table went up noticeably — people add more when they don't have to wait for someone to walk by.",
    name: "Yuliana Dewi",
    roleId: "Owner",
    roleEn: "Owner",
    venue: "Kafe Pelangi · Yogyakarta",
    rating: 5,
    color: "#7c3aed",
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
                value: "50+",
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
