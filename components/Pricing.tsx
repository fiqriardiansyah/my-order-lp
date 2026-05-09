import { Check } from 'lucide-react';

interface PricingProps {
  lang: 'id' | 'en';
  rhythm: boolean;
}

interface Tier {
  id: string;
  name: string;
  price: string;
  popular?: boolean;
  taglineId: string;
  taglineEn: string;
  featuresId: string[];
  featuresEn: string[];
  ctaId: string;
  ctaEn: string;
}

const tiers: Tier[] = [
  {
    id: 'free',
    name: 'Gratis',
    price: '0',
    taglineId: 'Buat coba-coba dulu',
    taglineEn: 'Try the basics',
    featuresId: ['Sampai 3 meja', 'QR menu unlimited', 'Live order dashboard', '1 staff account', 'Email support'],
    featuresEn: ['Up to 3 tables', 'Unlimited QR menu', 'Live order dashboard', '1 staff account', 'Email support'],
    ctaId: 'Mulai Gratis',
    ctaEn: 'Start Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '149.000',
    popular: true,
    taglineId: 'Untuk restoran yang serius',
    taglineEn: 'For serious operators',
    featuresId: ['Meja unlimited', 'Semua fitur — Kitchen, Floor, Cashier', 'Multi-role staff (5 akun)', 'Reports & analytics', 'Print + WhatsApp receipt', 'Priority chat support'],
    featuresEn: ['Unlimited tables', 'All modules — Kitchen, Floor, Cashier', 'Multi-role staff (5 accounts)', 'Reports & analytics', 'Print + WhatsApp receipts', 'Priority chat support'],
    ctaId: 'Coba 14 Hari Gratis',
    ctaEn: 'Try 14 Days Free',
  },
  {
    id: 'biz',
    name: 'Bisnis',
    price: '299.000',
    taglineId: 'Buat yang sudah multi-outlet',
    taglineEn: 'For multi-outlet brands',
    featuresId: ['Semua di Pro, plus:', 'Multi-outlet management', 'Staff unlimited', 'Custom domain per outlet', 'Dedicated account manager', 'API & integrations'],
    featuresEn: ['Everything in Pro, plus:', 'Multi-outlet management', 'Unlimited staff', 'Custom domain per outlet', 'Dedicated account manager', 'API & integrations'],
    ctaId: 'Hubungi Sales',
    ctaEn: 'Talk to Sales',
  },
];

export default function Pricing({ lang, rhythm }: PricingProps) {
  return (
    <section className={`section${rhythm ? ' bg-cream' : ''}`} id="pricing">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 16 }}>
            <span className="dot" />
            <span>{lang === 'id' ? 'Harga' : 'Pricing'}</span>
          </div>
          <h2 className="h-section">
            {lang === 'id' ? 'Harga jujur, tanpa biaya transaksi.' : 'Honest pricing, zero transaction fees.'}
          </h2>
          <p className="lede" style={{ marginTop: 16 }}>
            {lang === 'id' ? 'Mulai gratis. Upgrade kapan kamu butuh.' : "Start free. Upgrade when you're ready."}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, alignItems: 'stretch' }}>
          {tiers.map((t) => {
            const isPro = !!t.popular;
            const features = lang === 'id' ? t.featuresId : t.featuresEn;
            return (
              <div
                key={t.id}
                style={{
                  background: isPro ? 'var(--brand)' : '#fff',
                  color: isPro ? '#fff' : 'var(--fg)',
                  border: isPro ? '1px solid var(--brand-deep)' : '1px solid var(--border)',
                  borderRadius: 18,
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transform: isPro ? 'translateY(-8px)' : 'none',
                  boxShadow: isPro ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                }}
              >
                {isPro && (
                  <span style={{
                    position: 'absolute', top: -12, right: 24,
                    background: 'var(--accent)', color: '#fff',
                    padding: '5px 12px', borderRadius: 9999,
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    {lang === 'id' ? 'Paling Populer' : 'Most Popular'}
                  </span>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{t.name}</h3>
                </div>
                <p style={{ margin: 0, fontSize: 13, opacity: isPro ? 0.85 : 0.7, color: isPro ? '#fff' : 'var(--fg-muted)' }}>
                  {lang === 'id' ? t.taglineId : t.taglineEn}
                </p>

                <div style={{ marginTop: 22, marginBottom: 22, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.8 }}>Rp</span>
                  <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{t.price}</span>
                  <span style={{ fontSize: 13, opacity: isPro ? 0.85 : 0.6 }}>/ {lang === 'id' ? 'bulan' : 'month'}</span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {features.map((f, k) => (
                    <li key={k} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, lineHeight: 1.5 }}>
                      <Check size={16} style={{ marginTop: 2, color: isPro ? '#fff' : 'var(--brand)', flexShrink: 0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn-lg"
                  style={{
                    marginTop: 28,
                    background: isPro ? '#fff' : 'var(--brand)',
                    color: isPro ? 'var(--brand)' : '#fff',
                    width: '100%',
                  }}
                >
                  {lang === 'id' ? t.ctaId : t.ctaEn}
                </button>
              </div>
            );
          })}
        </div>

        <p style={{ textAlign: 'center', marginTop: 40, fontSize: 13, color: 'var(--fg-muted)' }}>
          {lang === 'id'
            ? 'Semua paket termasuk: tanpa biaya transaksi · update fitur otomatis · server di Indonesia'
            : 'All plans include: zero transaction fees · automatic updates · Indonesia-based servers'}
        </p>
      </div>
    </section>
  );
}
