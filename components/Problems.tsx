import { ScrollText, ClockAlert, EyeOff } from 'lucide-react';
import { ElementType } from 'react';

interface ProblemsProps {
  lang: 'id' | 'en';
}

interface ProblemItem {
  Icon: ElementType;
  titleId: string;
  titleEn: string;
  bodyId: string;
  bodyEn: string;
}

const items: ProblemItem[] = [
  {
    Icon: ScrollText,
    titleId: 'Pesanan manual chaos',
    titleEn: 'Order chaos',
    bodyId: 'Catatan pesanan tertinggal di bon, salah meja, salah menu. Pelanggan menunggu, dapur bingung.',
    bodyEn: 'Paper tickets get lost, wrong tables, wrong items. Customers wait, kitchen scrambles.',
  },
  {
    Icon: ClockAlert,
    titleId: 'Service meja lambat',
    titleEn: 'Slow table service',
    bodyId: 'Pelanggan harus melambai-lambai untuk panggil waiter. Antrian panjang di kasir saat jam ramai.',
    bodyEn: 'Guests wave for the waiter. Long queues at the cashier when it gets busy.',
  },
  {
    Icon: EyeOff,
    titleId: 'Nggak tahu apa yang terjadi',
    titleEn: 'No real-time visibility',
    bodyId: 'Owner di rumah, manager di outlet lain — mau cek omzet hari ini saja harus telpon kasir.',
    bodyEn: "Owner at home, manager at another outlet — just to check today's revenue means a phone call.",
  },
];

export default function Problems({ lang }: ProblemsProps) {
  return (
    <section className="section" id="problems">
      <div className="container">
        <div style={{ maxWidth: 680, marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            <span className="dot" />
            <span>{lang === 'id' ? 'Masalah' : 'The problem'}</span>
          </div>
          <h2 className="h-section">
            {lang === 'id'
              ? 'Restoran berkembang, tapi sistemnya masih pakai bon kertas.'
              : "Restaurants are growing, but the system's still paper tickets."}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {items.map(({ Icon, titleId, titleEn, bodyId, bodyEn }, i) => (
            <div
              key={i}
              className="animate-angry-shake"
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '28px 24px',
                position: 'relative',
                overflow: 'hidden',
                animationDelay: `${i * 1.8}s`,
              }}
            >
              {/* Red top stripe */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: 'linear-gradient(90deg, #ef4444 0%, #f97316 100%)',
                }}
              />

              {/* "Sebelum Kasigo" tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: '#ef4444',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: 9999,
                  padding: '3px 10px',
                  marginBottom: 18,
                }}
              >
                {lang === 'id' ? 'Sebelum Kasigo' : 'Before Kasigo'}
              </div>

              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 11,
                    background: '#fef2f2',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="h-card" style={{ marginBottom: 8 }}>
                    {lang === 'id' ? titleId : titleEn}
                  </h3>
                  <p className="muted" style={{ margin: 0, fontSize: 14 }}>
                    {lang === 'id' ? bodyId : bodyEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
