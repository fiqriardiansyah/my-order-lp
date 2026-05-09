"use client";

import { useState } from "react";
import { Signal, Wifi, BatteryFull } from "lucide-react";

const menuItems = [
  {
    name: "Nasi Goreng Spesial",
    price: "32.000",
    popular: true,
    color: "#fbbf24",
    initials: "NG",
  },
  {
    name: "Mie Ayam Pangsit",
    price: "28.000",
    popular: false,
    color: "#f97316",
    initials: "MA",
  },
  {
    name: "Ayam Bakar Madu",
    price: "45.000",
    popular: false,
    color: "#dc2626",
    initials: "AB",
  },
];

const categories = ["All", "Makanan", "Minuman", "Cemilan"];

export default function PhoneMockup() {
  const [cart] = useState(2);

  return (
    <div
      style={{
        width: 230,
        background: "#0a0a0a",
        borderRadius: 36,
        padding: 8,
        boxShadow: "var(--shadow-xl), 0 0 0 1px rgb(0 0 0 / 0.1)",
      }}
    >
      <div
        style={{
          background: "#f7f4ee",
          borderRadius: 28,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 18px 4px",
            fontSize: 10,
            fontWeight: 600,
          }}
        >
          <span>9:41</span>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <Signal size={10} />
            <Wifi size={10} />
            <BatteryFull size={12} />
          </div>
        </div>

        {/* Header */}
        <div
          style={{
            padding: "8px 14px 10px",
            background: "#fff",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9999,
                background: "linear-gradient(135deg, #fde68a, #fbbf24)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 12,
                color: "#7c2d12",
              }}
            >
              WI
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.1 }}>
                Warung Ibu
              </div>
              <div style={{ fontSize: 9, color: "var(--fg-muted)" }}>
                Jakarta Selatan
              </div>
            </div>
            <div
              style={{
                background: "var(--brand)",
                color: "#fff",
                padding: "3px 8px",
                borderRadius: 9999,
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              Meja 12
            </div>
          </div>
        </div>

        {/* Category chips */}
        <div
          style={{
            display: "flex",
            gap: 6,
            padding: "10px 14px 8px",
            overflow: "hidden",
          }}
        >
          {categories.map((c, i) => (
            <span
              key={i}
              style={{
                padding: "4px 10px",
                borderRadius: 9999,
                fontSize: 10,
                fontWeight: 600,
                background: i === 1 ? "var(--accent)" : "#fff",
                color: i === 1 ? "#fff" : "var(--fg)",
                border: i === 1 ? "none" : "1px solid var(--border)",
                whiteSpace: "nowrap",
              }}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Menu items */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "0 14px 80px",
          }}
        >
          {menuItems.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 10,
                display: "flex",
                gap: 10,
                alignItems: "center",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  background: item.color,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {item.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span
                    style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.15 }}
                  >
                    {item.name}
                  </span>
                  {item.popular && (
                    <span
                      style={{
                        background: "var(--accent)",
                        color: "#fff",
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontSize: 8,
                        fontWeight: 700,
                      }}
                    >
                      POP
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--accent)",
                    marginTop: 2,
                  }}
                >
                  Rp {item.price}
                </div>
              </div>
              <button
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  background: "var(--brand)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 14,
                  lineHeight: 1,
                }}
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* Floating cart */}
        <div
          style={{
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 14,
            background: "var(--brand)",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 10px 28px -8px rgb(250 172 104 / 0.55)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                width: 22,
                height: 22,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {cart}
            </div>
            <span style={{ fontSize: 11, fontWeight: 700 }}>Place Order</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700 }}>Rp 87,500</span>
        </div>
      </div>
    </div>
  );
}
