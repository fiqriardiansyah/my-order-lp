interface SocialProofProps {
  lang: 'id' | 'en';
  rhythm: boolean;
}

const venues = [
  { name: 'Warung Ibu', typeId: 'Warung', typeEn: 'Warung', color: '#fbbf24' },
  { name: 'Kopi Kenangan Lokal', typeId: 'Cafe', typeEn: 'Cafe', color: '#0f6e56' },
  { name: 'Sate Pak Budi', typeId: 'Sate', typeEn: 'Sate', color: '#dc2626' },
  { name: 'Mie Aceh Bang Jali', typeId: 'Resto', typeEn: 'Resto', color: '#7c3aed' },
  { name: 'Es Teler Asli', typeId: 'Minuman', typeEn: 'Drinks', color: '#0ea5e9' },
  { name: 'Nasi Padang Sederhana', typeId: 'Resto', typeEn: 'Resto', color: '#ea580c' },
];

export default function SocialProof({ lang, rhythm }: SocialProofProps) {
  return (
    <section
      className={rhythm ? 'bg-soft' : ''}
      style={{ padding: '56px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <p className="shout" style={{ color: 'var(--fg-muted)', margin: 0 }}>
            {lang === 'id'
              ? 'Dipercaya oleh 500+ restoran dan kafe di Indonesia'
              : 'Trusted by 500+ restaurants & cafes across Indonesia'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px 36px', maxWidth: 1000 }}>
            {venues.map((v, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.7 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 7,
                  background: v.color, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 12,
                }}>{v.name.charAt(0)}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.1, color: 'var(--fg)' }}>{v.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {lang === 'id' ? v.typeId : v.typeEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
