import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  lang: 'id' | 'en';
}

export default function FinalCTA({ lang }: FinalCTAProps) {
  return (
    <section className="section" style={{ paddingTop: 64, paddingBottom: 96 }}>
      <div className="container">
        <div style={{
          background: 'var(--brand)', color: '#fff',
          borderRadius: 28, padding: '72px 56px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0, opacity: 0.18,
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
          }} />

          <div
            style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 40, alignItems: 'center' }}
            className="cta-grid"
          >
            <div>
              <h2 className="h-section" style={{ color: '#fff', maxWidth: 640 } as React.CSSProperties}>
                {lang === 'id'
                  ? 'Kelola restoran kamu lebih mudah, mulai hari ini.'
                  : 'Run your restaurant easier, starting today.'}
              </h2>
              <p className="lede" style={{ color: 'rgba(255,255,255,0.85)', marginTop: 18, maxWidth: 560 }}>
                {lang === 'id'
                  ? 'Setup gratis, tanpa kartu kredit. Tim kami bantu kamu setup menu pertama.'
                  : 'Free setup, no credit card. Our team helps you build your first menu.'}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
              <a href="/signup" className="btn btn-lg" style={{ background: '#fff', color: 'var(--brand)', padding: '18px 32px', fontSize: 16 }}>
                {lang === 'id' ? 'Mulai Gratis Sekarang' : 'Start Free Now'}
                <ArrowRight size={16} />
              </a>
              <button className="btn btn-lg" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', padding: '18px 32px' }}>
                {lang === 'id' ? 'Booking Demo' : 'Book a Demo'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
