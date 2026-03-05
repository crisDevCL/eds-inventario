import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSectores } from '../hooks/useSectores'

export default function Layout() {
  const { profile, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { sectores } = useSectores()

  const isInventario = location.pathname === '/'

  function handleSectorClick(id) {
    window.dispatchEvent(new CustomEvent('sectorChange', { detail: id }))
  }

  return (
    <div>
      <header style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)', position:'sticky', top:0, zIndex:90 }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', gap:10, padding:'0 14px', height:56 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:'1.1rem', color:'var(--accent)', letterSpacing:'-.5px' }}>⛽ EDS</div>
            <div style={{ color:'var(--muted)', fontSize:'.68rem', marginTop:-2 }}>Inventario Digital</div>
          </div>
          <span className={`badge badge-${isAdmin ? 'admin' : 'user'}`}>{isAdmin ? 'Admin' : 'Usuario'}</span>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/historial')}>📋</button>
          {isAdmin && <button className="btn btn-ghost btn-sm" onClick={() => navigate('/config')}>⚙️</button>}
          <button className="btn btn-ghost btn-sm" onClick={() => { signOut(); navigate('/login') }}>Salir</button>
        </div>
      </header>

      {isInventario && sectores.length > 0 && (
        <div style={{ background:'var(--surface)', borderBottom:'1px solid var(--border)', position:'sticky', top:56, zIndex:89 }}>
          <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 10px', display:'flex', gap:2, overflowX:'auto', scrollbarWidth:'none', height:46, alignItems:'center' }}>
            {sectores.map(s => (
              <div key={s.id} onClick={() => handleSectorClick(s.id)}
                style={{ padding:'6px 14px', borderRadius:99, fontSize:'.77rem', fontWeight:500, cursor:'pointer', whiteSpace:'nowrap', color:'var(--muted)', border:'1px solid transparent', display:'flex', alignItems:'center', gap:6, flexShrink:0, transition:'all .15s' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--surface2)'; e.currentTarget.style.color='var(--text)' }}
                onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color='var(--muted)' }}
              >
                <span style={{ width:7, height:7, borderRadius:'50%', background:s.color, display:'inline-block', flexShrink:0 }} />
                {s.nombre}
              </div>
            ))}
          </div>
        </div>
      )}

      <main style={{ maxWidth:1100, margin:'0 auto', padding:'18px 14px 100px' }}>
        <Outlet />
      </main>
    </div>
  )
}
