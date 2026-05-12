"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Zap, Tag, UserPlus, LogIn } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--bg-cream)]">
      {/* Minimal header */}
      <header className="border-b border-[var(--border)] bg-[var(--bg-cream)]">
        <div className="container flex h-[68px] items-center justify-between">
          <Link href="/" className="kasigo-wordmark">
            <span className="kasigo-mark">K</span>
            <span>Kasigo</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
          >
            <ArrowLeft size={14} />
            Kembali ke beranda
          </Link>
        </div>
      </header>

      <main className="container">
        <div className="grid min-h-[calc(100vh-69px)] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2">
          {/* ── Left column ─────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            {/* Error badge */}
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-red-600">
              <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
              Error 404 · Order Not Found
            </span>

            {/* Heading */}
            <h1 className="h-display">
              Halaman ini
              <br />
              <em className="italic text-[var(--accent)]">batal di dapur.</em>
            </h1>

            {/* Body copy */}
            <p className="lede max-w-[480px]">
              Pesanan kamu nggak nyampe ke kitchen — mungkin link-nya udah
              berubah, salah ketik, atau halamannya udah kita pindah. Coba
              balik ke menu utama atau pilih shortcut di bawah.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="btn btn-accent btn-lg">
                <Home size={17} />
                Balik ke beranda
              </Link>
              <button
                onClick={() => router.back()}
                className="btn btn-secondary btn-lg"
              >
                <ArrowLeft size={17} />
                Halaman sebelumnya
              </button>
            </div>

            {/* Quick nav */}
            <div className="flex flex-col gap-4">
              <span className="shout text-[var(--fg-muted)]">
                Atau langsung ke
              </span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    href: "/#features",
                    Icon: Zap,
                    label: "Fitur",
                    sub: "Lihat semua modul Kasigo",
                  },
                  {
                    href: "/#pricing",
                    Icon: Tag,
                    label: "Harga",
                    sub: "Mulai dari gratis",
                  },
                  {
                    href: "/signup",
                    Icon: UserPlus,
                    label: "Daftar gratis",
                    sub: "Coba 14 hari, tanpa CC",
                  },
                  {
                    href: "/signin",
                    Icon: LogIn,
                    label: "Masuk",
                    sub: "Akses dashboard kamu",
                  },
                ].map(({ href, Icon, label, sub }) => (
                  <Link
                    key={href}
                    href={href}
                    className="card flex items-center gap-3 p-4 transition-all hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
                  >
                    <span className="text-[var(--accent)]">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-[var(--fg)]">
                        {label}
                      </span>
                      <span className="block text-xs text-[var(--fg-muted)]">
                        {sub}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column — floating receipt illustration ─ */}
          <div className="relative hidden h-[520px] lg:flex">
            {/* Decorative back card */}
            <div className="card absolute top-[70px] left-[50px] h-[340px] w-[250px] rotate-[5deg] opacity-30" />

            {/* Receipt card — main float */}
            <div className="card animate-float-receipt absolute top-[55px] left-[35px] z-10 w-[240px] p-5">
              <div className="mb-4 text-center">
                <div className="text-base font-bold text-[var(--fg)]">
                  Kasigo POS
                </div>
                <div className="mt-0.5 text-xs text-[var(--fg-muted)]">
                  Meja 04 · 04:04 PM
                </div>
              </div>
              <div className="divider-soft mb-3" />
              <div className="flex flex-col gap-2.5 text-sm">
                {[
                  ["1x Nasi Goreng", "??,???"],
                  ["2x Es Teh Manis", "??,???"],
                  ["1x Halaman ini", "??,???"],
                ].map(([item, price]) => (
                  <div
                    key={item}
                    className="flex justify-between text-[var(--fg-muted)] line-through"
                  >
                    <span>{item}</span>
                    <span>{price}</span>
                  </div>
                ))}
              </div>
              <div className="divider-soft my-3" />
              <div className="flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--fg-muted)]">Subtotal</span>
                  <span className="text-[var(--fg-muted)]">–</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--fg-muted)]">Status</span>
                  <span className="font-bold text-red-500">VOID</span>
                </div>
              </div>
            </div>

            {/* VOID 404 stamp */}
            <div className="animate-float-stamp absolute top-[90px] right-[60px] z-20 rounded-xl bg-red-500 px-5 py-4 text-center text-white shadow-lg">
              <div className="text-2xl font-black tracking-widest">VOID</div>
              <div className="text-base font-bold">404</div>
            </div>

            {/* Order #404 cancelled badge */}
            <div className="animate-float-badge absolute top-[15px] left-[15px] z-30 flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--fg)] shadow-md">
              <span className="size-2 rounded-full bg-red-500" />
              Order #404 · cancelled
            </div>

            {/* Kitchen display chat bubble */}
            <div className="animate-float-chat absolute bottom-[120px] left-[-5px] z-20 max-w-[185px] rounded-2xl rounded-bl-sm bg-[var(--accent)] px-4 py-3 text-xs font-medium text-white shadow-lg">
              Pesanannya nggak ada di sistem nih chef...
              <span className="mt-1 block text-[10px] opacity-70">
                — kitchen display
              </span>
            </div>

            {/* NOT FOUND label */}
            <div className="animate-float-pill absolute bottom-[75px] right-[55px] z-20 rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--fg)] shadow-md">
              NOT FOUND
            </div>

            {/* /halaman-ini search result pill */}
            <div className="animate-float-search absolute bottom-[20px] right-[70px] z-20 flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs text-[var(--fg-muted)] shadow-md">
              <span className="text-[var(--fg-subtle)]">⌕</span>
              /halaman-ini · 0 hasil
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
