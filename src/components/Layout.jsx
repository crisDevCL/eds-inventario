import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSectores } from '../hooks/useSectores'

export default function Layout() {
  const { isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { sectores } = useSectores()
  const isInventario = location.pathname === '/'

  function handleSectorClick(id) {
    window.dispatchEvent(new CustomEvent('sectorChange', { detail: id }))
  }

  return (
    <div>
      {/* ── HEADER ── */}
      <header style={{
        background: 'linear-gradient(135deg, #0d2260 0%, #1a4fd6 60%, #2d6ef5 100%)',
        position: 'sticky', top: 0, zIndex: 90,
        boxShadow: '0 4px 20px rgba(13,34,96,.25)'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', height: 62 }}>
          {/* Logo */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'rgba(255,255,255,.15)',
              border: '1.5px solid rgba(255,255,255,.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', flexShrink: 0
            }}>⛽</div>
            <div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.05rem', color: '#fff', letterSpacing: '-.03em', lineHeight: 1.1 }}>
                EDS Inventario
              </div>
              <div style={{ color: 'rgba(255,255,255,.55)', fontSize: '.68rem', fontWeight: 500, lineHeight: 1 }}>
                Sistema Digital
              </div>
            </div>
          </div>

          {/* Botones */}
          <button onClick={() => navigate('/historial')} style={{
            background: 'rgba(255,255,255,.12)', border: '1.5px solid rgba(255,255,255,.2)',
            color: '#fff', padding: '7px 14px', borderRadius: 8, cursor: 'pointer',
            fontSize: '.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
            transition: 'background .15s', fontFamily: 'Plus Jakarta Sans'
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.12)'}>
            📋 <span style={{ display: 'none' }}>Historial</span>
          </button>

          {isAdmin && (
            <button onClick={() => navigate('/config')} style={{
              background: 'rgba(255,255,255,.12)', border: '1.5px solid rgba(255,255,255,.2)',
              color: '#fff', padding: '7px 14px', borderRadius: 8, cursor: 'pointer',
              fontSize: '.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
              transition: 'background .15s', fontFamily: 'Plus Jakarta Sans'
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.12)'}>
              ⚙️
            </button>
          )}

          <button onClick={() => { signOut(); navigate('/login') }} style={{
            background: 'rgba(255,255,255,.1)', border: '1.5px solid rgba(255,255,255,.2)',
            color: 'rgba(255,255,255,.85)', padding: '7px 14px', borderRadius: 8, cursor: 'pointer',
            fontSize: '.82rem', fontWeight: 600, transition: 'all .15s', fontFamily: 'Plus Jakarta Sans'
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,.3)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = 'rgba(255,255,255,.85)' }}>
            Salir
          </button>
        </div>
      </header>

      {/* ── SELECTOR DE SECTORES — TARJETAS HORIZONTALES ── */}
      {isInventario && sectores.length > 0 && (
        <div style={{
          background: 'linear-gradient(180deg, #1a4fd6 0%, #1443b8 100%)',
          borderBottom: '3px solid rgba(13,34,96,.2)',
          boxShadow: '0 6px 24px rgba(13,34,96,.18)'
        }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            padding: '14px 16px',
            display: 'flex', gap: 10,
            overflowX: 'auto', scrollbarWidth: 'none',
            alignItems: 'stretch',
          }}>
            {sectores.map((s, i) => (
              <SectorTab key={s.id} sector={s} index={i} onClick={() => handleSectorClick(s.id)} />
            ))}
          </div>
        </div>
      )}

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '22px 16px 100px' }}>
        <Outlet />
      </main>
    </div>
  )
}

function SectorTab({ sector, index, onClick }) {
  const ICONS = ['🏪','🛣️','🔧','🗺️','💧','⚡','🎁','📦','🛢️','🔩']
  const icon = ICONS[index % ICONS.length]

  return (
    <button
      onClick={onClick}
      style={{
        background: 'rgba(255,255,255,.1)',
        border: '1.5px solid rgba(255,255,255,.18)',
        borderRadius: 12,
        padding: '10px 16px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        minWidth: 90,
        flexShrink: 0,
        transition: 'all .18s cubic-bezier(.4,0,.2,1)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Plus Jakarta Sans',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,.22)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,.1)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      onMouseDown={e => e.currentTarget.style.transform = 'translateY(0) scale(.97)'}
      onMouseUp={e => e.currentTarget.style.transform = 'translateY(-2px)'}
    >
      {/* Barra de color superior */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3, background: sector.color,
        borderRadius: '10px 10px 0 0'
      }} />

      {/* Ícono con color del sector */}
      <div style={{
        width: 34, height: 34, borderRadius: 9,
        background: sector.color + '30',
        border: `1.5px solid ${sector.color}60`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.1rem',
        flexShrink: 0,
      }}>
        {icon}
      </div>

      {/* Nombre */}
      <div style={{
        fontSize: '.7rem',
        fontWeight: 700,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 1.2,
        maxWidth: 80,
        wordBreak: 'break-word',
        letterSpacing: '-.01em'
      }}>
        {sector.nombre}
      </div>

      {/* Cantidad productos */}
      <div style={{
        fontSize: '.62rem',
        color: 'rgba(255,255,255,.55)',
        fontWeight: 500,
      }}>
        {sector.productos?.length || 0} prod.
      </div>
    </button>
  )
}
