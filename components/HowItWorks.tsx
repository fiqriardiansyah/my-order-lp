import {
  QrCode,
  BookOpen,
  ShoppingCart,
  ChefHat,
  CreditCard,
  ArrowDown,
} from "lucide-react";
import { ElementType } from "react";

interface HowItWorksProps {
  lang: "id" | "en";
  rhythm: boolean;
}

interface Step {
  Icon: ElementType;
  titleId: string;
  titleEn: string;
  bodyId: string;
  bodyEn: string;
}

const customerSteps: Step[] = [
  {
    Icon: QrCode,
    titleId: "Scan QR di meja",
    titleEn: "Scan QR at the table",
    bodyId: "Nggak perlu install app. Buka kamera HP, menu langsung muncul.",
    bodyEn: "No app needed. Open the phone camera, menu appears instantly.",
  },
  {
    Icon: BookOpen,
    titleId: "Lihat menu",
    titleEn: "Browse the menu",
    bodyId:
      "Menu lengkap dengan foto dan harga — tampilan enak di HP kapan saja.",
    bodyEn: "Full menu with photos and prices, beautiful on any phone.",
  },
  {
    Icon: ShoppingCart,
    titleId: "Pesan sendiri",
    titleEn: "Order themselves",
    bodyId:
      "Pilih menu, tambah catatan, konfirmasi — tanpa perlu tunggu waiter.",
    bodyEn: "Pick items, add notes, confirm — no waiting for a waiter.",
  },
];

const restaurantSteps: Step[] = [
  {
    Icon: ChefHat,
    titleId: "Dapur langsung terima",
    titleEn: "Kitchen receives instantly",
    bodyId:
      "Pesanan muncul di kitchen display saat itu juga — meja, menu, dan catatan pelanggan. Nggak ada yang kelewat.",
    bodyEn:
      "Order appears on kitchen display instantly — table, items, and customer notes. Nothing gets missed.",
  },
  {
    Icon: CreditCard,
    titleId: "Kasir tutup tagihan dalam detik",
    titleEn: "Cashier closes in seconds",
    bodyId:
      "Struk langsung terbit dan bisa di print",
    bodyEn:
      "Receipt is publish and printed",
  },
];

export default function HowItWorks({ lang, rhythm }: HowItWorksProps) {
  return (
    <section className={`section${!rhythm ? " bg-soft" : ""}`} id="how">
      <div className="container">
        {/* Header */}
        <div
          style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}
        >
          <div
            className="eyebrow"
            style={{ justifyContent: "center", marginBottom: 16 }}
          >
            <span className="dot" />
            <span>{lang === "id" ? "Cara Kerja" : "How it works"}</span>
          </div>
          <h2 className="h-section">
            {lang === "id"
              ? "Dari scan QR ke tagihan terbayar — dalam hitungan menit."
              : "From QR scan to paid bill — in a matter of minutes."}
          </h2>
          <p className="lede" style={{ marginTop: 16 }}>
            {lang === "id"
              ? "Alur yang simpel untuk pelanggan, otomatis untuk dapur dan kasir kamu."
              : "Simple for guests, automatic for your kitchen and cashier."}
          </p>
        </div>

        {/* Two-column journey */}
        <div className="journey-grid">
          {/* Customer side */}
          <div
            style={{
              background: "var(--brand-tint)",
              border: "1px solid rgba(250,172,104,0.25)",
              borderRadius: 24,
              padding: "36px 32px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--brand-deep)",
                marginBottom: 28,
              }}
            >
              {lang === "id" ? "👤 Untuk Pelanggan" : "👤 For Guests"}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {customerSteps.map(
                ({ Icon, titleId, titleEn, bodyId, bodyEn }, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: "var(--brand)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div style={{ paddingTop: 4 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 15,
                            color: "var(--fg)",
                            marginBottom: 4,
                          }}
                        >
                          {lang === "id" ? titleId : titleEn}
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            color: "var(--fg-muted)",
                            lineHeight: 1.55,
                          }}
                        >
                          {lang === "id" ? bodyId : bodyEn}
                        </div>
                      </div>
                    </div>
                    {i < customerSteps.length - 1 && (
                      <div style={{ paddingLeft: 21, margin: "12px 0" }}>
                        <ArrowDown
                          size={16}
                          style={{ color: "var(--brand)", opacity: 0.4 }}
                        />
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Restaurant side */}
          <div
            style={{
              background: "var(--accent-soft)",
              border: "1px solid rgba(15,110,86,0.18)",
              borderRadius: 24,
              padding: "36px 32px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 28,
              }}
            >
              {lang === "id" ? "🍽️ Untuk Restoran" : "🍽️ For Your Restaurant"}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {restaurantSteps.map(
                ({ Icon, titleId, titleEn, bodyId, bodyEn }, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: "var(--accent)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div style={{ paddingTop: 4 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 15,
                            color: "var(--fg)",
                            marginBottom: 4,
                          }}
                        >
                          {lang === "id" ? titleId : titleEn}
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            color: "var(--fg-muted)",
                            lineHeight: 1.55,
                          }}
                        >
                          {lang === "id" ? bodyId : bodyEn}
                        </div>
                      </div>
                    </div>
                    {i < restaurantSteps.length - 1 && (
                      <div style={{ paddingLeft: 21, margin: "12px 0" }}>
                        <ArrowDown
                          size={16}
                          style={{ color: "var(--accent)", opacity: 0.4 }}
                        />
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>

            {/* Indonesia-specific badges */}
            <div
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid rgba(15,110,86,0.15)",
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {[
                "WhatsApp",
                lang === "id" ? "Bahasa Indonesia" : "Full Indonesian",
              ].map((badge) => (
                <span
                  key={badge}
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(15,110,86,0.2)",
                    borderRadius: 9999,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--accent)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Setup time banner */}
        <div
          style={{
            marginTop: 20,
            padding: "22px 40px",
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--brand)",
            }}
          >
            {lang === "id" ? "< 5 menit" : "Under 5 minutes"}
          </span>
          <span style={{ fontSize: 15, color: "var(--fg-muted)" }}>
            {lang === "id"
              ? "dari daftar sampai pesanan pertama masuk ke dapur kamu"
              : "from sign-up to your first order hitting the kitchen"}
          </span>
        </div>
      </div>
    </section>
  );
}
