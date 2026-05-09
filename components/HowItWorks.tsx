import { Store, LayoutList, Rocket } from 'lucide-react';
import { ElementType } from 'react';

interface HowItWorksProps {
  lang: 'id' | 'en';
  rhythm: boolean;
}

interface Step {
  n: string;
  Icon: ElementType;
  titleId: string;
  titleEn: string;
  bodyId: string;
  bodyEn: string;
}

const steps: Step[] = [
  {
    n: '01',
    Icon: Store,
    titleId: 'Daftarkan restoran kamu',
    titleEn: 'Register your restaurant',
    bodyId: 'Isi nama restoran, alamat, dan logo. Pilih outlet atau langsung mulai pakai paket gratis.',
    bodyEn: 'Fill in your restaurant name, address, and logo. Pick outlets or jump straight into the free plan.',
  },
  {
    n: '02',
    Icon: LayoutList,
    titleId: 'Setup meja dan menu',
    titleEn: 'Set up tables and menu',
    bodyId: 'Tambah daftar meja dan menu — atau import dari Excel. Cetak QR untuk tiap meja langsung dari dashboard.',
    bodyEn: 'Add your tables and menu — or import from Excel. Print a QR for each table directly from the dashboard.',
  },
  {
    n: '03',
    Icon: Rocket,
    titleId: 'Mulai terima pesanan',
    titleEn: 'Start taking orders',
    bodyId: 'Pelanggan scan QR, pesan dari HP. Pesanan langsung muncul di dashboard, dapur, dan kasir kamu.',
    bodyEn: 'Guests scan, order from their phone. Orders appear instantly on the dashboard, kitchen, and cashier.',
  },
];

export default function HowItWorks({ lang, rhythm }: HowItWorksProps) {
  return (
    <section className={`section${!rhythm ? ' bg-soft' : ''}`} id="how">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 64px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: 16 }}>
            <span className="dot" />
            <span>{lang === 'id' ? 'Cara Kerja' : 'How it works'}</span>
          </div>
          <h2 className="h-section">
            {lang === 'id' ? 'Tiga langkah, sepuluh menit, selesai.' : 'Three steps, ten minutes, done.'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {steps.map(({ n, Icon, titleId, titleEn, bodyId, bodyEn }, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '32px 28px',
                position: 'relative',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: 14 }}>
                STEP {n}
              </div>
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: 'var(--brand-soft)', color: 'var(--brand)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                <Icon size={24} />
              </div>
              <h3 className="h-card" style={{ marginBottom: 10 }}>{lang === 'id' ? titleId : titleEn}</h3>
              <p style={{ margin: 0, color: 'var(--fg-muted)', fontSize: 15, lineHeight: 1.55 }}>
                {lang === 'id' ? bodyId : bodyEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
