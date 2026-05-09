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
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            <span className="dot" />
            <span>{lang === 'id' ? 'Masalah' : 'The problem'}</span>
          </div>
          <h2 className="h-section">
            {lang === 'id'
              ? 'Restoran berkembang, tapi sistemnya masih pakai bon kertas.'
              : 'Restaurants are growing, but the system is still paper tickets.'}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {items.map(({ Icon, titleId, titleEn, bodyId, bodyEn }, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '8px 0' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'var(--brand-soft)', color: 'var(--brand)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={22} />
              </div>
              <h3 className="h-card">{lang === 'id' ? titleId : titleEn}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 15 }}>{lang === 'id' ? bodyId : bodyEn}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
