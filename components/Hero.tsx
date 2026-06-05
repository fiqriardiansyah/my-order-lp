"use client";

import { ArrowRight, Play, CheckCircle2, Zap } from "lucide-react";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}
import DashboardMockup from "./mockups/DashboardMockup";
import PhoneMockup from "./mockups/PhoneMockup";

interface HeroProps {
  lang: "id" | "en";
}

const trustItems = {
  id: ["Gratis", "Mudah Digunakan", "Tidak Perlu Kontrak"],
  en: ["Free", "Easy to Use", "No Contract"],
};

export default function Hero({ lang }: HeroProps) {
  return (
    <section id="top" className="hero-section">
      {/* Dark gradient overlay — left-heavy so text stays readable */}
      <div aria-hidden className="absolute inset-0 pointer-events-none hero-overlay" />

      {/* Subtle brand glow on top-left */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 10% 0%, rgba(250,172,104,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="container relative">
        <div className="hero-grid">
          {/* Left column: text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-6 rounded-full text-[13px] font-semibold hero-badge"
              style={{ padding: "6px 16px" }}
            >
              <Zap size={13} fill="currentColor" />
              {lang === "id"
                ? "Siap pakai dalam 5 menit"
                : "Ready in 5 minutes"}
            </div>

            <h1 className="h-display">
              {lang === "id" ? (
                <>
                  Cara paling gampang bikin restoran kamu{" "}
                  <span className="text-(--brand) italic">siap digital</span>.
                </>
              ) : (
                <>
                  The easiest way to bring your restaurant{" "}
                  <span className="text-(--brand) italic">online</span>.
                </>
              )}
            </h1>

            <p className="lede mt-5.5 mx-auto sm:max-w-140 lg:mx-0">
              {lang === "id"
                ? "Pelanggan scan QR, lihat menu, dan langsung pesan sendiri. Dapur terima pesanan saat itu juga — nggak perlu alat mahal, nggak perlu kontrak."
                : "Guests scan QR, browse the menu, and order themselves. Kitchen gets orders instantly — no expensive hardware, no contracts."}
            </p>

            <div className="flex flex-col items-stretch gap-3 mt-8 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start sm:items-center">
              <a
                href="/signup"
                className="btn btn-primary btn-lg justify-center"
              >
                {lang === "id" ? "Mulai Gratis" : "Get Started Free"}
                <ArrowRight size={16} />
              </a>
              <button
                className="btn hero-btn-glass btn-lg"
                onClick={() =>
                  window.Calendly?.initPopupWidget({
                    url: "https://calendly.com/fiqriardiansyah/demo-kasigo",
                  })
                }
              >
                <Play size={14} />
                {lang === "id" ? "Booking Demo" : "Booking Demo"}
              </button>
            </div>

            {/* Trust row */}
            <div className="flex items-center justify-center lg:justify-start gap-5 mt-6 flex-wrap">
              {trustItems[lang].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-[6px] text-[13px] hero-trust-item"
                >
                  <CheckCircle2
                    size={14}
                    className="shrink-0"
                    style={{ color: "var(--brand)" }}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right column: Mockups */}
          <div className="hero-mock-wrap hidden sm:block">
            <div className="hero-mock-inner relative max-w-140 mx-auto">
              <DashboardMockup />
              <div className="hero-phone absolute -right-30 -bottom-12.5 rotate-[5deg]">
                <PhoneMockup />
              </div>
              <div className="hero-live-badge absolute -left-4 top-7.5 bg-white border border-(--border) rounded-xl py-2.5 px-3.5 shadow-(--shadow-md) flex items-center gap-2.5 -rotate-3">
                <span className="size-2 rounded-full bg-(--green-600) shadow-[0_0_0_4px_#bbf7d0] block" />
                <div>
                  <div className="text-[11px] font-bold leading-[1.1]">
                    {lang === "id" ? "Pesanan baru" : "New order"}
                  </div>
                  <div className="text-[10px] text-(--fg-muted)">
                    {lang === "id"
                      ? "Meja 03 · 2 menit lalu"
                      : "Table 03 · 2 min ago"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
