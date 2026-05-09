'use client';

import {
  LayoutDashboard,
  ClipboardList,
  Grid3x3,
  UtensilsCrossed,
  Users,
  BarChart3,
} from 'lucide-react';

type OrderStatus = 'new' | 'prep' | 'ready' | 'paid';

interface KanbanCardProps {
  table: number;
  items: { qty: number; name: string }[];
  age: string;
  status: OrderStatus;
  sla: 'green' | 'amber' | 'red';
  served?: number[];
}

function KanbanCard({ table, items, age, status, sla, served }: KanbanCardProps) {
  const slaColor =
    sla === 'green' ? 'var(--green-600)' : sla === 'amber' ? '#f59e0b' : 'var(--red-500)';
  return (
    <div style={{
      background: '#fff',
      borderRadius: 8,
      border: '1px solid var(--border)',
      borderLeft: `3px solid ${slaColor}`,
      padding: '10px 12px',
      boxShadow: 'var(--shadow-xs)',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700 }}>Table {table}</span>
          <span style={{ fontSize: 10, color: 'var(--fg-muted)' }}>· #{1240 + table}</span>
        </div>
        <span className={`pill pill-${status}`} style={{ fontSize: 9, padding: '2px 6px' }}>
          {status === 'new' && (
            <span className="animate-pulse-badge" style={{ display: 'inline-block' }}>NEW</span>
          )}
          {status === 'prep' && 'PREP'}
          {status === 'ready' && 'READY'}
          {status === 'paid' && 'PAID'}
        </span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--fg)', lineHeight: 1.45 }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              textDecoration: served?.includes(i) ? 'line-through' : 'none',
              color: served?.includes(i) ? 'var(--fg-subtle)' : 'inherit',
            }}
          >
            <span>{it.qty}× {it.name}</span>
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 10,
        color: slaColor,
        fontWeight: 600,
      }}>
        <span>{age}</span>
        <span style={{ color: 'var(--fg-muted)', fontWeight: 500 }}>Sarah K.</span>
      </div>
    </div>
  );
}

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: false, badge: undefined as number | undefined },
  { label: 'Live Orders', icon: ClipboardList, active: true, badge: 4 },
  { label: 'Tables', icon: Grid3x3, active: false, badge: undefined },
  { label: 'Menu', icon: UtensilsCrossed, active: false, badge: undefined },
  { label: 'Staff', icon: Users, active: false, badge: undefined },
  { label: 'Reports', icon: BarChart3, active: false, badge: undefined },
];

export default function DashboardMockup() {
  return (
    <div style={{
      width: '100%',
      background: '#fafafa',
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-xl)',
    }}>
      {/* Window chrome */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '10px 14px',
        background: '#f3f4f6',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ width: 11, height: 11, borderRadius: 99, background: '#fb7185', display: 'block' }} />
        <span style={{ width: 11, height: 11, borderRadius: 99, background: '#fbbf24', display: 'block' }} />
        <span style={{ width: 11, height: 11, borderRadius: 99, background: '#34d399', display: 'block' }} />
        <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: 'var(--fg-muted)' }}>
          app.kasigo.id/dashboard
        </div>
      </div>

      {/* Body: sidebar + content */}
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', minHeight: 360 }}>
        {/* Sidebar */}
        <div style={{ background: '#fafaf8', borderRight: '1px solid var(--border)', padding: '16px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 6px', marginBottom: 16 }}>
            <div className="kasigo-mark" style={{ width: 24, height: 24, fontSize: 13, borderRadius: 6 }}>K</div>
            <span style={{ fontWeight: 700, fontSize: 13 }}>Kasigo</span>
          </div>
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 8px',
                  borderRadius: 6,
                  background: item.active ? '#fff' : 'transparent',
                  border: item.active ? '1px solid var(--border)' : '1px solid transparent',
                  boxShadow: item.active ? 'var(--shadow-xs)' : 'none',
                  fontSize: 11.5,
                  fontWeight: item.active ? 600 : 500,
                  color: item.active ? 'var(--fg)' : 'var(--fg-muted)',
                  marginBottom: 2,
                }}
              >
                <Icon size={13} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    background: 'var(--brand)',
                    color: '#fff',
                    fontSize: 9,
                    fontWeight: 700,
                    padding: '1px 5px',
                    borderRadius: 9999,
                  }}>{item.badge}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Content: Kanban */}
        <div style={{ padding: '14px 14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>Live Orders</div>
              <div style={{ fontSize: 10, color: 'var(--fg-muted)' }}>12 active · 4 needs attention</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ background: '#fff', border: '1px solid var(--border)', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, color: 'var(--fg)' }}>Today</span>
              <span style={{ background: 'var(--brand)', color: '#fff', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600 }}>+ Order</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--fg-muted)', letterSpacing: '0.08em', padding: '0 2px' }}>TO COOK · 2</div>
              <KanbanCard table={3} items={[{ qty: 2, name: 'Nasi Goreng' }, { qty: 1, name: 'Es Teh Manis' }]} age="2m ago" status="new" sla="green" />
              <KanbanCard table={7} items={[{ qty: 1, name: 'Mie Ayam' }]} age="just now" status="new" sla="green" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--fg-muted)', letterSpacing: '0.08em', padding: '0 2px' }}>PREPARING · 2</div>
              <KanbanCard table={12} items={[{ qty: 1, name: 'Sate Ayam' }, { qty: 2, name: 'Lontong' }]} age="5m ago" status="prep" sla="amber" served={[1]} />
              <KanbanCard table={5} items={[{ qty: 3, name: 'Ayam Bakar' }]} age="3m ago" status="prep" sla="amber" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--fg-muted)', letterSpacing: '0.08em', padding: '0 2px' }}>READY · 1</div>
              <KanbanCard table={9} items={[{ qty: 2, name: 'Gado-Gado' }, { qty: 1, name: 'Jus Alpukat' }]} age="6m ago" status="ready" sla="green" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
