import { Check, Printer, Utensils, Store } from 'lucide-react';
import Link from 'next/link';

interface PricingProps {
  lang: 'id' | 'en';
  rhythm: boolean;
}

interface FeatureItem {
  id: string;
  en: string;
  available: boolean;
}

interface FeatureSection {
  titleId: string;
  titleEn: string;
  items: FeatureItem[];
}

interface Tier {
  id: string;
  name: string;
  badgeId: string;
  badgeEn: string;
  badgeClass: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  price: string;
  priceNoteId?: string;
  priceNoteEn?: string;
  taglineId: string;
  taglineEn: string;
  sections: FeatureSection[];
  ctaId: string;
  ctaEn: string;
  popular?: boolean;
}

const tiers: Tier[] = [
  {
    id: 'gratis',
    name: 'Gratis',
    badgeId: 'Gratis',
    badgeEn: 'Free',
    badgeClass: 'bg-[var(--green-50)] text-[var(--green-600)]',
    Icon: Printer,
    price: '0',
    priceNoteId: 'Selamanya gratis, tanpa kartu kredit',
    priceNoteEn: 'Always free, no credit card needed',
    taglineId: 'Untuk warung & kafe kecil yang baru mulai',
    taglineEn: 'For small cafes just getting started',
    ctaId: 'Mulai Gratis',
    ctaEn: 'Start Free',
    sections: [
      {
        titleId: 'RESTORAN & MENU',
        titleEn: 'RESTAURANT & MENU',
        items: [
          { id: '1 lokasi restoran', en: '1 restaurant location', available: true },
          { id: '30 menu item', en: '30 menu items', available: true },
          { id: '10 meja + QR code', en: '10 tables + QR code', available: true },
          { id: 'Foto menu (upload gambar)', en: 'Menu photos (upload images)', available: true },
          { id: 'Live branded menu untuk pelanggan', en: 'Live branded menu for customers', available: true },
        ],
      },
      {
        titleId: 'OPERASIONAL',
        titleEn: 'OPERATIONS',
        items: [
          { id: 'Order real-time ke dapur', en: 'Real-time orders to kitchen', available: true },
          { id: 'Kanban dapur', en: 'Kitchen Kanban board', available: true },
          { id: 'Kasir & cetak struk termal', en: 'Cashier & thermal receipt printing', available: true },
          { id: '3 staff (owner + 2)', en: '3 staff accounts (owner + 2)', available: true },
          { id: 'Diskon & promo', en: 'Discounts & promotions', available: false },
        ],
      },
      {
        titleId: 'ANALITIK',
        titleEn: 'ANALYTICS',
        items: [
          { id: 'Ringkasan harian', en: 'Daily summary', available: true },
          { id: 'Grafik & laporan lengkap', en: 'Full charts & reports', available: false },
          { id: 'Export Excel', en: 'Export to Excel', available: false },
        ],
      },
    ],
  },
  {
    id: 'warung',
    name: 'Warung',
    badgeId: 'Paling populer',
    badgeEn: 'Most popular',
    badgeClass: 'bg-[var(--blue-50)] text-[var(--blue-600)]',
    Icon: Utensils,
    price: '99.000',
    priceNoteId: 'atau Rp 950.000 / tahun (hemat 2 bulan)',
    priceNoteEn: 'or Rp 950,000 / year (save 2 months)',
    taglineId: 'Untuk restoran aktif yang ingin tumbuh',
    taglineEn: 'For active restaurants looking to grow',
    ctaId: 'Mulai Sekarang',
    ctaEn: 'Get Started',
    popular: true,
    sections: [
      {
        titleId: 'RESTORAN & MENU',
        titleEn: 'RESTAURANT & MENU',
        items: [
          { id: '1 lokasi restoran', en: '1 restaurant location', available: true },
          { id: 'Unlimited menu item', en: 'Unlimited menu items', available: true },
          { id: 'Unlimited meja + QR code', en: 'Unlimited tables + QR code', available: true },
          { id: 'Foto menu + kategori custom', en: 'Menu photos + custom categories', available: true },
          { id: 'Menu item modifier & varian', en: 'Menu item modifiers & variants', available: true },
        ],
      },
      {
        titleId: 'OPERASIONAL',
        titleEn: 'OPERATIONS',
        items: [
          { id: 'Order real-time ke dapur', en: 'Real-time orders to kitchen', available: true },
          { id: 'Kanban dapur', en: 'Kitchen Kanban board', available: true },
          { id: 'Kasir & cetak struk termal', en: 'Cashier & thermal receipt printing', available: true },
          { id: '10 staff', en: '10 staff accounts', available: true },
          { id: 'Diskon, promo & happy hour', en: 'Discounts, promos & happy hour', available: true },
          { id: 'Tombol panggil pelayan', en: 'Waiter call button', available: true },
          { id: 'Toggle menu habis (stok)', en: 'Mark items as sold out', available: true },
        ],
      },
      {
        titleId: 'ANALITIK',
        titleEn: 'ANALYTICS',
        items: [
          { id: 'Grafik pendapatan & tren', en: 'Revenue charts & trends', available: true },
          { id: 'Top menu item', en: 'Top menu items report', available: true },
          { id: 'Export Excel', en: 'Export to Excel', available: true },
          { id: 'Laporan perbandingan periode', en: 'Period comparison reports', available: false },
        ],
      },
    ],
  },
  {
    id: 'restoran',
    name: 'Restoran',
    badgeId: 'Restoran',
    badgeEn: 'Restaurant',
    badgeClass: 'bg-[var(--amber-50)] text-[var(--amber-600)]',
    Icon: Store,
    price: '249.000',
    priceNoteId: 'atau Rp 2.390.000 / tahun (hemat 2 bulan)',
    priceNoteEn: 'or Rp 2,390,000 / year (save 2 months)',
    taglineId: 'Untuk chain & multi-lokasi',
    taglineEn: 'For chains & multi-location brands',
    ctaId: 'Mulai Sekarang',
    ctaEn: 'Get Started',
    sections: [
      {
        titleId: 'RESTORAN & MENU',
        titleEn: 'RESTAURANT & MENU',
        items: [
          { id: '5 lokasi restoran', en: '5 restaurant locations', available: true },
          { id: 'Unlimited menu item', en: 'Unlimited menu items', available: true },
          { id: 'Unlimited meja + QR code', en: 'Unlimited tables + QR code', available: true },
          { id: 'Semua fitur menu Warung', en: 'All Warung menu features', available: true },
          { id: 'Sinkronisasi menu antar lokasi', en: 'Menu sync across locations', available: true },
        ],
      },
      {
        titleId: 'OPERASIONAL',
        titleEn: 'OPERATIONS',
        items: [
          { id: 'Semua fitur operasional Warung', en: 'All Warung operational features', available: true },
          { id: 'Unlimited staff', en: 'Unlimited staff accounts', available: true },
          { id: 'Peran manager per lokasi', en: 'Manager role per location', available: true },
          { id: 'Notifikasi WhatsApp ke dapur & kasir', en: 'WhatsApp notifications to kitchen & cashier', available: true },
          { id: 'Sesi kasir & laporan shift', en: 'Cashier sessions & shift reports', available: true },
        ],
      },
      {
        titleId: 'ANALITIK',
        titleEn: 'ANALYTICS',
        items: [
          { id: 'Dashboard semua lokasi', en: 'All-locations dashboard', available: true },
          { id: 'Laporan perbandingan periode', en: 'Period comparison reports', available: true },
          { id: 'Export Excel semua lokasi', en: 'Export Excel for all locations', available: true },
          { id: 'Laporan per shift kasir', en: 'Per cashier shift reports', available: true },
        ],
      },
    ],
  },
];

export default function Pricing({ lang, rhythm }: PricingProps) {
  return (
    <section className={`section${rhythm ? ' bg-cream' : ''}`} id="pricing">
      <div className="container">
        <div className="text-center max-w-[680px] mx-auto mb-14">
          <div className="eyebrow justify-center mb-4">
            <span className="dot" />
            <span>{lang === 'id' ? 'Harga' : 'Pricing'}</span>
          </div>
          <h2 className="h-section">
            {lang === 'id' ? 'Harga jujur, tanpa biaya transaksi.' : 'Honest pricing, zero transaction fees.'}
          </h2>
          <p className="lede mt-4">
            {lang === 'id' ? 'Mulai gratis. Upgrade kapan kamu butuh.' : "Start free. Upgrade when you're ready."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {tiers.map((t) => {
            const isPop = !!t.popular;
            return (
              <div
                key={t.id}
                className={`rounded-[18px] p-8 flex flex-col bg-white ${
                  isPop
                    ? 'border-2 border-[var(--blue-600)] shadow-[var(--shadow-lg)]'
                    : 'border border-[var(--border)] shadow-[var(--shadow-sm)]'
                }`}
              >
                <span
                  className={`inline-flex self-start px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.06em] mb-4 ${t.badgeClass}`}
                >
                  {lang === 'id' ? t.badgeId : t.badgeEn}
                </span>

                <t.Icon size={22} className="text-[var(--fg-muted)] mb-3" />

                <h3 className="text-[22px] font-bold tracking-tight m-0">
                  {t.name}
                </h3>

                <p className="text-[13px] text-[var(--fg-muted)] mt-1 mb-0">
                  {lang === 'id' ? t.taglineId : t.taglineEn}
                </p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-[13px] font-semibold opacity-80">Rp</span>
                  <span className="text-[42px] font-bold tracking-[-0.03em] leading-none">{t.price}</span>
                  <span className="text-[13px] text-[var(--fg-muted)]">/ {lang === 'id' ? 'bulan' : 'month'}</span>
                </div>

                {t.priceNoteId && (
                  <p className="text-[12px] text-[var(--fg-muted)] mt-1 mb-5">
                    {lang === 'id' ? t.priceNoteId : t.priceNoteEn}
                  </p>
                )}

                <div className="flex flex-col gap-4 flex-1">
                  {t.sections.map((section, si) => (
                    <div key={si}>
                      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--fg-subtle)] mb-2 mt-1">
                        {lang === 'id' ? section.titleId : section.titleEn}
                      </p>
                      <ul className="list-none p-0 m-0 flex flex-col gap-2">
                        {section.items.map((item, ii) => (
                          <li key={ii} className="flex gap-2.5 items-start text-[13.5px] leading-snug">
                            {item.available ? (
                              <Check
                                size={14}
                                className="mt-0.5 text-[var(--green-600)] shrink-0"
                              />
                            ) : (
                              <span className="w-3.5 shrink-0 mt-0.5 flex items-center justify-center">
                                <span className="block w-2 h-px bg-[var(--fg-subtle)]" />
                              </span>
                            )}
                            <span
                              className={
                                item.available
                                  ? ''
                                  : 'line-through text-[var(--fg-subtle)]'
                              }
                            >
                              {lang === 'id' ? item.id : item.en}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <Link
                  href={t.id === 'gratis' ? '/signup' : `/signup?plan=${t.id}`}
                  className={`btn btn-lg mt-7 w-full text-center ${isPop ? 'btn-accent' : 'btn-primary'}`}
                >
                  {lang === 'id' ? t.ctaId : t.ctaEn}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center mt-10 text-[13px] text-[var(--fg-muted)]">
          {lang === 'id'
            ? 'Semua paket termasuk: tanpa biaya transaksi · update fitur otomatis · server di Indonesia'
            : 'All plans include: zero transaction fees · automatic updates · Indonesia-based servers'}
        </p>
      </div>
    </section>
  );
}
