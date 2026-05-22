"use client";

import { ArrowRight, Play, CheckCircle2 } from "lucide-react";

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

export default function Hero({ lang }: HeroProps) {
  return (
    <section id="top" className="hero-section">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,var(--brand-soft)_0%,transparent_55%)]"
      />

      <div className="container relative">
        <div className="hero-grid">
          <div className="text-center max-w-180 mx-auto">
            <div className="eyebrow mb-5 justify-center">
              <span className="dot" />
              <span>
                {lang === "id"
                  ? "Untuk Restoran & Kafe Indonesia"
                  : "For Indonesian restaurants & cafes"}
              </span>
            </div>
            <h1 className="h-display">
              {lang === "id" ? (
                <>
                  Kelola restoran kamu{" "}
                  <span className="text-(--brand) italic">tanpa drama</span>.
                </>
              ) : (
                <>
                  Run your restaurant{" "}
                  <span className="text-(--brand) italic">
                    without the drama
                  </span>
                  .
                </>
              )}
            </h1>
            <p className="lede mt-5.5 mx-auto sm:max-w-140">
              {lang === "id"
                ? "QR menu untuk pelanggan, dashboard real-time untuk staf. Satu aplikasi untuk meja, pesanan, dapur, dan kasir — siap pakai dalam 10 menit."
                : "QR menu for guests, real-time dashboard for staff. One app for tables, orders, kitchen and cashier — set up in under 10 minutes."}
            </p>
            <div className="flex flex-col items-stretch gap-3 mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:items-center">
              <a
                href="/signup"
                className="btn btn-primary btn-lg justify-center"
              >
                {lang === "id" ? "Mulai Gratis" : "Get Started Free"}
                <ArrowRight size={16} />
              </a>
              <button
                className="btn btn-secondary btn-lg"
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
          </div>

          {/* Mockups */}
          <div className="hero-mock-wrap hidden sm:block">
            <div className="hero-mock-inner relative max-w-140 mx-auto">
              <DashboardMockup />
              <div className="hero-phone absolute -right-30 -bottom-12.5 rotate-[5deg]">
                <PhoneMockup />
              </div>
              {/* Live badge */}
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
