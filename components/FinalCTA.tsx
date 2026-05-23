"use client";

import { ArrowRight, MessageCircle, Zap } from "lucide-react";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

interface FinalCTAProps {
  lang: "id" | "en";
}

export default function FinalCTA({ lang }: FinalCTAProps) {
  return (
    <section className="section" style={{ paddingTop: 64, paddingBottom: 96 }}>
      <div className="container">
        <div
          className="cta-inner"
          style={{
            background: "linear-gradient(135deg, #faac68 0%, #e08a3e 100%)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Dot pattern */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.1,
              backgroundImage:
                "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
              backgroundSize: "28px 28px",
              pointerEvents: "none",
            }}
          />

          {/* Glow orb top-right */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            {/* Pill eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 9999,
                padding: "6px 16px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              <Zap size={12} fill="currentColor" />
              {lang === "id" ? "Gratis · Tanpa kontrak" : "Free · No contracts"}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                gap: 48,
                alignItems: "center",
              }}
              className="cta-grid"
            >
              <div>
                <h2
                  className="h-section"
                  style={
                    { color: "#fff", maxWidth: 600 } as React.CSSProperties
                  }
                >
                  {lang === "id"
                    ? "Biar Anda punya lebih banyak waktu untuk hal yang paling penting."
                    : "More time for what matters most — serving great food."}
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    marginTop: 18,
                    maxWidth: 520,
                    fontSize: 17,
                    lineHeight: 1.6,
                  }}
                >
                  {lang === "id"
                    ? "Setup gratis, siap dalam 5 menit. Tim kami bantu kamu setup menu pertama — lengkap dengan QRIS dan WhatsApp."
                    : "Free setup, ready in 5 minutes. We help with your first menu — QRIS and WhatsApp included."}
                </p>

                {/* Inline trust row */}
                <div
                  style={{
                    display: "flex",
                    gap: 20,
                    marginTop: 22,
                    flexWrap: "wrap",
                  }}
                >
                  {(lang === "id"
                    ? [
                        "✓ Gratis selamanya",
                        "✓ QRIS & WhatsApp",
                        "✓ Tim support aktif",
                      ]
                    : [
                        "✓ Forever free tier",
                        "✓ QRIS & WhatsApp",
                        "✓ Active support",
                      ]
                  ).map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  alignItems: "stretch",
                  minWidth: 220,
                }}
              >
                <a
                  href="/signup"
                  className="btn btn-lg"
                  style={{
                    background: "#fff",
                    color: "var(--brand-deep)",
                    fontWeight: 700,
                    fontSize: 16,
                    padding: "18px 32px",
                    justifyContent: "center",
                  }}
                >
                  {lang === "id" ? "Mulai Gratis Sekarang" : "Start Free Now"}
                  <ArrowRight size={16} />
                </a>
                <button
                  className="btn btn-lg"
                  onClick={() =>
                    window.Calendly?.initPopupWidget({
                      url: "https://calendly.com/fiqriardiansyah/demo-kasigo",
                    })
                  }
                  style={{
                    background: "transparent",
                    color: "#fff",
                    border: "1.5px solid rgba(255,255,255,0.4)",
                    padding: "18px 32px",
                    fontSize: 15,
                    justifyContent: "center",
                  }}
                >
                  <MessageCircle size={15} />
                  {lang === "id" ? "Booking Demo" : "Book a Demo"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
