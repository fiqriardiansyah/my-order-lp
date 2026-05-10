'use client';

import { useState, useEffect } from 'react';

interface NavProps {
  lang: 'id' | 'en';
  setLang: (lang: 'id' | 'en') => void;
}

export default function Nav({ lang, setLang }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#features', label: lang === 'id' ? 'Fitur' : 'Features' },
    { href: '#how', label: lang === 'id' ? 'Cara Kerja' : 'How it works' },
    { href: '#pricing', label: lang === 'id' ? 'Harga' : 'Pricing' },
    { href: '#testimonials', label: lang === 'id' ? 'Testimoni' : 'Testimonials' },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,1)',
      backdropFilter: scrolled ? 'saturate(180%) blur(8px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'border-color 200ms, background 200ms',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <a href="#top" className="kasigo-wordmark">
          <span className="kasigo-mark">K</span>
          <span>Kasigo</span>
        </a>
        <nav className="nav-links" style={{ display: 'flex', gap: 32 }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg-muted)', transition: 'color 150ms' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-muted)')}
            >{l.label}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            title="Switch language"
            style={{
              fontSize: 11, fontWeight: 700, color: 'var(--fg-muted)',
              border: '1px solid var(--border)', borderRadius: 9999,
              padding: '5px 10px', letterSpacing: '0.04em', cursor: 'pointer',
            }}
          >
            {lang === 'id' ? 'ID' : 'EN'}
          </button>
          <a href="/signin" style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg-muted)' }} className="hide-on-mobile">
            {lang === 'id' ? 'Masuk' : 'Sign in'}
          </a>
          <a href="/signup" className="btn btn-primary">
            {lang === 'id' ? 'Mulai Gratis' : 'Start Free'}
          </a>
        </div>
      </div>
    </header>
  );
}
