'use client';

import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import DashboardMockup from './mockups/DashboardMockup';
import PhoneMockup from './mockups/PhoneMockup';

interface HeroProps {
  lang: 'id' | 'en';
}

export default function Hero({ lang }: HeroProps) {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', paddingTop: 56, paddingBottom: 48 }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 80% 20%, var(--brand-soft) 0%, transparent 55%)',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 56,
          alignItems: 'center',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <div className="eyebrow" style={{ marginBottom: 20, justifyContent: 'center' }}>
              <span className="dot" />
              <span>{lang === 'id' ? 'Untuk Restoran & Kafe Indonesia' : 'For Indonesian restaurants & cafes'}</span>
            </div>
            <h1 className="h-display">
              {lang === 'id' ? (
                <>Kelola restoran kamu <span style={{ color: 'var(--brand)', fontStyle: 'italic' }}>tanpa drama</span>.</>
              ) : (
                <>Run your restaurant <span style={{ color: 'var(--brand)', fontStyle: 'italic' }}>without the drama</span>.</>
              )}
            </h1>
            <p className="lede" style={{ marginTop: 22, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              {lang === 'id'
                ? 'QR menu untuk pelanggan, dashboard real-time untuk staf. Satu aplikasi untuk meja, pesanan, dapur, dan kasir — siap pakai dalam 10 menit.'
                : 'QR menu for guests, real-time dashboard for staff. One app for tables, orders, kitchen and cashier — set up in under 10 minutes.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32, justifyContent: 'center' }}>
              <a href="/signup" className="btn btn-primary btn-lg">
                {lang === 'id' ? 'Coba Gratis 14 Hari' : 'Try Free for 14 Days'}
                <ArrowRight size={16} />
              </a>
              <button className="btn btn-secondary btn-lg">
                <Play size={14} />
                {lang === 'id' ? 'Lihat Demo' : 'Watch Demo'}
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 28, fontSize: 13, color: 'var(--fg-muted)', justifyContent: 'center' }}>
              {[
                lang === 'id' ? 'Tanpa kartu kredit' : 'No credit card',
                lang === 'id' ? 'Setup 10 menit' : '10-min setup',
                'Bahasa Indonesia',
              ].map((text, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--brand)' }} />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Mockups */}
          <div className="hero-mock-wrap" style={{ position: 'relative', minHeight: 480, paddingRight: 100, paddingBottom: 60 }}>
            <div style={{ position: 'relative', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              <DashboardMockup />
              <div
                style={{ position: 'absolute', right: -120, bottom: -50, transform: 'rotate(5deg)' }}
                className="hero-phone"
              >
                <PhoneMockup />
              </div>
              {/* Live badge */}
              <div style={{
                position: 'absolute', left: -16, top: 30,
                background: '#fff', border: '1px solid var(--border)', borderRadius: 12,
                padding: '10px 14px', boxShadow: 'var(--shadow-md)',
                display: 'flex', alignItems: 'center', gap: 10,
                transform: 'rotate(-3deg)',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 9999, background: 'var(--green-600)', boxShadow: '0 0 0 4px #bbf7d0', display: 'block' }} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.1 }}>{lang === 'id' ? 'Pesanan baru' : 'New order'}</div>
                  <div style={{ fontSize: 10, color: 'var(--fg-muted)' }}>{lang === 'id' ? 'Meja 03 · 2 menit lalu' : 'Table 03 · 2 min ago'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
