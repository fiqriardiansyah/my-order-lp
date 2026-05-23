"use client";

import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Lang = "id" | "en";

const TEMPLATES = [
  {
    name: "Jurnal Dapur",
    category: "BISTRO",
    previewImage:
      process.env.NEXT_PUBLIC_ASSETS_URL + "/templates/template-1.png",
  },
  {
    name: "Fine Dining",
    category: "FINE DINING",
    previewImage:
      process.env.NEXT_PUBLIC_ASSETS_URL + "/templates/template-2.png",
  },
];

const copy = {
  id: {
    badge: "Template Siap Pakai",
    title: "Landing page untuk warung & kafe kamu",
    body: "Pilih desain, ganti konten, terbit dalam 10 menit.",
    cta: "Lihat Semua Template →",
  },
  en: {
    badge: "Ready-made Templates",
    title: "Landing page for your café & restaurant",
    body: "Pick a design, swap the content, live in 10 minutes.",
    cta: "View All Templates →",
  },
};

export default function SalesNotification({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [current, setCurrent] = useState(0);
  const t = copy[lang];
  const total = TEMPLATES.length;

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % total),
    [total],
  );
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  // show after 5 s
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // auto-advance every 3 s once visible
  useEffect(() => {
    if (!visible || dismissed) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [visible, dismissed, next]);

  if (dismissed || !visible) return null;

  const tpl = TEMPLATES[current];

  return (
    <div className="fixed bottom-5 right-5 z-50 w-72 rounded-2xl bg-white shadow-2xl border border-neutral-100 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
      {/* Carousel image */}
      <div className="relative h-40 bg-neutral-100 overflow-hidden group">
        <Image
          key={tpl.previewImage}
          src={tpl.previewImage!}
          alt={tpl.name}
          fill
          className="object-cover object-top transition-opacity duration-300"
          sizes="288px"
        />

        {/* Dark scrim for top controls */}
        <div className="absolute inset-x-0 top-0 h-10 bg-linear-to-b from-black/40 to-transparent" />

        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Tutup"
          className="absolute top-2 right-2 size-6 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
        >
          <X size={12} />
        </button>

        {/* Prev / Next arrows — visible on hover */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 size-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next"
            >
              <ChevronRight size={14} />
            </button>
          </>
        )}

        {/* Dot indicator + template label */}
        <div className="absolute bottom-2 inset-x-0 flex flex-col items-center gap-1">
          {total > 1 && (
            <div className="flex gap-1">
              {TEMPLATES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-4 bg-white"
                      : "w-1 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
          <span className="text-[10px] font-semibold text-white/90 tracking-widest uppercase drop-shadow">
            {tpl.category} · {tpl.name}
          </span>
        </div>
      </div>

      {/* Text content */}
      <div className="px-4 pt-3 pb-4">
        <span className="inline-block rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold tracking-wide px-2 py-0.5 uppercase">
          {t.badge}
        </span>
        <p className="mt-1.5 text-sm font-bold text-neutral-800 leading-snug">
          {t.title}
        </p>
        <p className="mt-0.5 text-xs text-neutral-500 leading-relaxed">
          {t.body}
        </p>
        <a
          href="/templates"
          onClick={() => setDismissed(true)}
          className="mt-3 flex items-center justify-center w-full rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold py-2 transition-colors"
        >
          {t.cta}
        </a>
      </div>
    </div>
  );
}
