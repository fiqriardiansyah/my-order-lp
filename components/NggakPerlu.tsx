interface NggakPerluProps {
  lang: "id" | "en";
}

const barriers = [
  {
    strikeId: "Alat mahal",
    strikeEn: "Expensive hardware",
    descId:
      "Pakai HP dan laptop yang sudah ada. Kasigo jalan di browser — tidak perlu mesin atau perangkat tambahan.",
    descEn:
      "Use the devices you already own. Kasigo runs in the browser — no extra machines or gadgets needed.",
    color: "var(--brand)",
    decorationColor: "rgba(250,172,104,0.5)",
    blobColor: "rgba(250,172,104,0.12)",
  },
  {
    strikeId: "Kontrak panjang",
    strikeEn: "Long contracts",
    descId:
      "Mulai gratis, berhenti kapan saja. Tanpa biaya tersembunyi, tanpa komitmen jangka panjang yang mengikat.",
    descEn:
      "Start free, stop anytime. No hidden fees, no long-term commitments locking you in.",
    color: "var(--accent)",
    decorationColor: "rgba(15,110,86,0.45)",
    blobColor: "rgba(15,110,86,0.08)",
  },
  {
    strikeId: "Hari khusus buat belajar",
    strikeEn: "Special training days",
    descId:
      "Setup selesai dalam 5 menit. Tim kamu bisa langsung pakai tanpa pelatihan yang memakan waktu.",
    descEn:
      "Setup done in 5 minutes. Your team starts right away without lengthy training sessions.",
    color: "#7c3aed",
    decorationColor: "rgba(124,58,237,0.4)",
    blobColor: "rgba(124,58,237,0.08)",
  },
];

export default function NggakPerlu({ lang }: NggakPerluProps) {
  return (
    <section
      className="section"
      id="no-barriers"
      style={{ background: "var(--bg-cream)" }}
    >
      <div className="container">
        <div
          style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 56px" }}
        >
          <div
            className="eyebrow"
            style={{ justifyContent: "center", marginBottom: 16 }}
          >
            <span className="dot" />
            <span>{lang === "id" ? "Tanpa hambatan" : "Zero barriers"}</span>
          </div>
          <h2 className="h-section">
            {lang === "id"
              ? "Tiga hal yang nggak perlu kamu khawatirkan."
              : "Three things you don't need to worry about."}
          </h2>
          <p className="lede" style={{ marginTop: 16 }}>
            {lang === "id"
              ? "Kasigo dibuat sesederhana mungkin — untuk restoran Indonesia yang punya banyak urusan lain."
              : "Kasigo is built to be simple — for Indonesian restaurants that already have a full plate."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {barriers.map(
            (
              {
                strikeId,
                strikeEn,
                descId,
                descEn,
                color,
                decorationColor,
                blobColor,
              },
              i,
            ) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  padding: "32px 28px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Circle blob */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: -24,
                    right: -24,
                    width: 90,
                    height: 90,
                    background: blobColor,
                    borderRadius: "50%",
                  }}
                />

                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    color,
                    marginBottom: 10,
                    position: "relative",
                  }}
                >
                  {lang === "id" ? "NGGAK PERLU —" : "NO NEED FOR —"}
                </div>

                <h3
                  className="h-card"
                  style={{
                    marginBottom: 14,
                    textDecoration: "line-through",
                    textDecorationColor: decorationColor,
                    textDecorationThickness: 2,
                    position: "relative",
                  }}
                >
                  {lang === "id" ? strikeId : strikeEn}
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--fg-muted)",
                    position: "relative",
                  }}
                >
                  {lang === "id" ? descId : descEn}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
