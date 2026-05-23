'use client';

import { QrCode, ClipboardList, LayoutGrid, ChefHat, CreditCard, UsersRound } from 'lucide-react';
import { ElementType } from 'react';

interface FeaturesProps {
  lang: 'id' | 'en';
  rhythm: boolean;
}

interface FeatureItem {
  Icon: ElementType;
  titleId: string;
  titleEn: string;
  bodyId: string;
  bodyEn: string;
}

const items: FeatureItem[] = [
  {
    Icon: QrCode,
    titleId: 'QR Menu',
    titleEn: 'QR Menu',
    bodyId: 'Pelanggan scan QR di meja, langsung pesan dari HP mereka. Nggak perlu install apa-apa.',
    bodyEn: 'Guests scan a QR at the table and order from their phone. No app install required.',
  },
  {
    Icon: ClipboardList,
    titleId: 'Live Order Dashboard',
    titleEn: 'Live Order Dashboard',
    bodyId: 'Setiap pesanan masuk real-time. SLA timer otomatis warna merah kalau lambat.',
    bodyEn: 'Every order arrives in real time. SLA timers turn red automatically when things slow down.',
  },
  {
    Icon: LayoutGrid,
    titleId: 'Floor View',
    titleEn: 'Floor View',
    bodyId: 'Staf lihat status semua meja sekaligus — mana kosong, mana lagi makan, mana minta bill.',
    bodyEn: "Staff see every table's status at a glance — empty, eating, bill requested.",
  },
  {
    Icon: ChefHat,
    titleId: 'Kitchen Display',
    titleEn: 'Kitchen Display',
    bodyId: 'Dapur tahu persis apa yang harus dimasak, untuk meja mana, dengan catatan apa.',
    bodyEn: 'Kitchen knows exactly what to cook, for which table, with which note.',
  },
  {
    Icon: CreditCard,
    titleId: 'Cashier & Billing',
    titleEn: 'Cashier & Billing',
    bodyId: 'Tutup bill cepat, cetak struk atau kirim ke WhatsApp. Bisa split bill juga.',
    bodyEn: 'Close bills fast. Print receipts or send to WhatsApp. Split bills too.',
  },
  {
    Icon: UsersRound,
    titleId: 'Multi-role Access',
    titleEn: 'Multi-role Access',
    bodyId: 'Owner, manager, kasir, dapur, floor staff — masing-masing dapat view yang sesuai.',
    bodyEn: 'Owner, manager, cashier, kitchen, floor — each gets their own focused view.',
  },
];

export default function Features({ lang, rhythm }: FeaturesProps) {
  return (
    <section className={`section${rhythm ? ' bg-soft' : ''}`} id="features">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, alignItems: 'end', marginBottom: 56 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              <span className="dot" />
              <span>{lang === 'id' ? 'Fitur' : 'Features'}</span>
            </div>
            <h2 className="h-section">
              {lang === 'id' ? 'Semua yang restoran butuhkan, dalam satu app.' : 'Everything a restaurant needs, in one app.'}
            </h2>
          </div>
          <p className="lede" style={{ maxWidth: 460 }}>
            {lang === 'id'
              ? 'Dari scan QR pelanggan sampai struk kasir — semua tersambung. Nggak perlu langganan 5 tools terpisah.'
              : "From the customer's QR scan to the cashier's receipt — all connected. No need for five separate subscriptions."}
          </p>
        </div>
        <div className="features-grid">
          {items.map(({ Icon, titleId, titleEn, bodyId, bodyEn }, i) => (
            <div
              key={i}
              className="feature-card"
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '26px 24px 28px',
                transition: 'border-color 200ms, transform 200ms',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--brand)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: 'var(--brand)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}>
                <Icon size={20} />
              </div>
              <h3 className="h-card" style={{ marginBottom: 8 }}>{lang === 'id' ? titleId : titleEn}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--fg-muted)' }}>
                {lang === 'id' ? bodyId : bodyEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
