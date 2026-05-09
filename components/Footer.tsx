'use client';

interface FooterProps {
  lang: 'id' | 'en';
}

const socialLinks = [
  {
    label: 'Instagram',
    svg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    svg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M18.244 2H21.5l-7.523 8.59L22.7 22h-6.79l-5.32-6.95L4.5 22H1.24l8.04-9.18L1.3 2h6.96l4.81 6.36L18.244 2zm-1.19 18h1.86L7.04 4H5.06l11.994 16z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    svg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S0 4.881 0 3.5C0 2.12 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.49 0h4.37v1.91h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.65c0-1.59-.03-3.63-2.21-3.63-2.22 0-2.56 1.73-2.56 3.52V22H7.71V8z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    svg: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M23.5 6.5a3 3 0 0 0-2.1-2.12C19.55 4 12 4 12 4s-7.55 0-9.4.38A3 3 0 0 0 .5 6.5C.12 8.36.12 12 .12 12s0 3.64.38 5.5a3 3 0 0 0 2.1 2.12C4.45 20 12 20 12 20s7.55 0 9.4-.38a3 3 0 0 0 2.1-2.12c.38-1.86.38-5.5.38-5.5s0-3.64-.38-5.5zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
      </svg>
    ),
  },
];

export default function Footer({ lang }: FooterProps) {
  const cols = lang === 'id' ? [
    { title: 'Produk', links: ['Fitur', 'Harga', 'QR Menu', 'Dashboard', 'Untuk Multi-outlet'] },
    { title: 'Perusahaan', links: ['Tentang', 'Blog', 'Karir', 'Kontak'] },
    { title: 'Bantuan', links: ['Pusat bantuan', 'Hubungi sales', 'Status sistem', 'Syarat & ketentuan'] },
  ] : [
    { title: 'Product', links: ['Features', 'Pricing', 'QR Menu', 'Dashboard', 'For Multi-outlet'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
    { title: 'Support', links: ['Help center', 'Talk to sales', 'System status', 'Terms & privacy'] },
  ];

  return (
    <footer style={{ borderTop: '1px solid var(--border)', paddingTop: 64, paddingBottom: 32, background: '#fff' }}>
      <div className="container">
        <div
          style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3, 1fr)', gap: 48, marginBottom: 56 }}
          className="footer-grid"
        >
          <div>
            <a className="kasigo-wordmark" href="#top">
              <span className="kasigo-mark">K</span>
              <span>Kasigo</span>
            </a>
            <p style={{ marginTop: 16, fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.55, maxWidth: 320 }}>
              {lang === 'id'
                ? 'Sistem manajemen restoran & kafe untuk Indonesia. Dari QR menu sampai struk kasir.'
                : 'Restaurant & cafe management built for Indonesia. From QR menu to cashier receipt.'}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: 9999,
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--fg-muted)', transition: 'all 150ms',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--brand)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'var(--brand)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--fg-muted)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <h4 className="shout" style={{ color: 'var(--fg-muted)', margin: 0, marginBottom: 16 }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((l, k) => (
                  <li key={k}>
                    <a
                      href="#"
                      style={{ fontSize: 14, color: 'var(--fg)', transition: 'color 150ms' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--brand)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg)')}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--fg-muted)' }}>
            © 2025 Kasigo. {lang === 'id' ? 'Semua hak dilindungi.' : 'All rights reserved.'}
          </p>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--fg-muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: 'var(--green-600)', display: 'block' }} />
            {lang === 'id' ? 'Semua sistem normal' : 'All systems normal'}
          </p>
        </div>
      </div>
    </footer>
  );
}
