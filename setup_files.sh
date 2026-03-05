#!/bin/bash
# ══════════════════════════════════════════════════════
# Script de setup EDS Inventario Digital
# Ejecutar desde la raíz del proyecto: bash setup_files.sh
# ══════════════════════════════════════════════════════

echo "🚀 Creando estructura de archivos EDS Inventario..."

# Crear carpetas
mkdir -p src/lib src/contexts src/hooks src/components src/pages

# ──────────────────────────────────────────
# src/index.css
# ──────────────────────────────────────────
cat > src/index.css << 'ENDOFFILE'
:root{--bg:#0c0d10;--surface:#14151a;--surface2:#1e1f26;--border:#2a2b35;--border2:#333440;--accent:#e8b84b;--text:#f2efe9;--muted:#7b7c8e;--muted2:#555668;--green:#3ecf7a;--red:#e05252;--blue:#5b8de0;--r:12px;--rs:8px;--rxs:6px}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;font-size:15px;-webkit-font-smoothing:antialiased}
input,button,select,textarea{font-family:inherit}
::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:9px}
.btn{padding:9px 18px;border-radius:var(--rs);font-weight:600;font-size:.85rem;cursor:pointer;border:1px solid transparent;transition:all .15s;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.btn-pri{background:var(--accent);color:#111}.btn-pri:hover{background:#cfa038}
.btn-sec{background:var(--surface2);border-color:var(--border);color:var(--text)}.btn-sec:hover{background:var(--border)}
.btn-dng{background:rgba(224,82,82,.12);color:var(--red);border-color:rgba(224,82,82,.3)}.btn-dng:hover{background:var(--red);color:#fff}
.btn-ghost{background:none;border-color:var(--border);color:var(--muted)}.btn-ghost:hover{color:var(--text);background:var(--surface2)}
.btn-sm{padding:6px 12px;font-size:.75rem}.btn-full{width:100%;justify-content:center;padding:12px}
.fg{margin-bottom:14px}.fl{display:block;font-size:.75rem;color:var(--muted);margin-bottom:5px;font-weight:500}
.fi{width:100%;background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:var(--rs);padding:10px 12px;font-size:.88rem;transition:border-color .15s}.fi:focus{outline:none;border-color:var(--accent)}.fi::placeholder{color:var(--muted2)}
.fi-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:99px;font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.4px}
.badge::before{content:'';width:6px;height:6px;border-radius:50%;background:currentColor}
.badge-open{background:rgba(62,207,122,.12);color:var(--green);border:1px solid rgba(62,207,122,.3)}
.badge-closed{background:rgba(224,82,82,.12);color:var(--red);border:1px solid rgba(224,82,82,.3)}
.badge-admin{background:rgba(232,184,75,.15);color:var(--accent);border:1px solid rgba(232,184,75,.3)}
.badge-user{background:rgba(91,141,224,.15);color:var(--blue);border:1px solid rgba(91,141,224,.3)}
.banner{border-radius:var(--r);padding:11px 16px;font-size:.82rem;display:flex;align-items:center;gap:8px;margin-bottom:14px}
.banner-info{background:rgba(91,141,224,.08);border:1px solid rgba(91,141,224,.2);color:var(--blue)}
.banner-warn{background:rgba(232,184,75,.07);border:1px solid rgba(232,184,75,.2);color:var(--accent)}
.banner-danger{background:rgba(224,82,82,.08);border:1px solid rgba(224,82,82,.2);color:var(--red)}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:200;display:flex;align-items:flex-end;justify-content:center;backdrop-filter:blur(4px)}
@media(min-width:600px){.overlay{align-items:center;padding:16px}}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:20px 20px 0 0;width:100%;max-height:92vh;overflow-y:auto;animation:slideUp .25s ease}
@media(min-width:600px){.modal{border-radius:var(--r);max-width:480px;max-height:88vh;animation:fadeIn .2s ease}}
@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
.modal-drag{width:40px;height:4px;background:var(--border2);border-radius:9px;margin:10px auto 0}
@media(min-width:600px){.modal-drag{display:none}}
.mhead{display:flex;align-items:center;padding:16px 20px;border-bottom:1px solid var(--border);gap:10px}
.mtitle{font-family:'Syne',sans-serif;font-weight:700;font-size:.95rem;flex:1}
.mclose{background:none;border:none;color:var(--muted);cursor:pointer;font-size:1.1rem;padding:4px 8px;border-radius:var(--rxs);line-height:1;transition:all .15s}.mclose:hover{background:var(--border2);color:var(--text)}
.mbody{padding:20px}.mfoot{padding:14px 20px;border-top:1px solid var(--border);display:flex;gap:8px;justify-content:flex-end}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(80px);background:var(--surface2);border:1px solid var(--border);color:var(--text);padding:11px 20px;border-radius:99px;font-size:.82rem;font-weight:500;z-index:9999;transition:transform .3s;white-space:nowrap;pointer-events:none;max-width:90vw}
.toast.show{transform:translateX(-50%) translateY(0)}.toast.ok{border-color:var(--green);color:var(--green)}.toast.err{border-color:var(--red);color:var(--red)}.toast.info{border-color:var(--blue);color:var(--blue)}
.tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
table{width:100%;border-collapse:collapse;font-size:.82rem}
thead th{background:var(--surface2);padding:9px 10px;text-align:center;font-weight:600;font-size:.68rem;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);white-space:nowrap}
thead th:first-child{text-align:left;padding-left:16px}
tbody tr{border-bottom:1px solid var(--border);transition:background .1s}tbody tr:hover{background:rgba(255,255,255,.015)}tbody tr:last-child{border-bottom:none}tbody tr.selected{background:rgba(232,184,75,.05)}
td{padding:8px 10px;text-align:center;vertical-align:middle}td:first-child{text-align:left;padding-left:16px;font-weight:500;word-break:break-word}
.num-in{background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:var(--rxs);padding:5px 6px;width:68px;text-align:center;font-size:.82rem;transition:border-color .15s}.num-in:focus{outline:none;border-color:var(--accent)}.num-in:disabled{opacity:.35;cursor:not-allowed}
.sector-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;margin-bottom:16px}
.sector-head{display:flex;align-items:center;gap:10px;padding:13px 16px;cursor:pointer;user-select:none;transition:background .1s}.sector-head:hover{background:rgba(255,255,255,.02)}
.s-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.s-name{font-family:'Syne',sans-serif;font-weight:700;font-size:.95rem;flex:1}
.s-meta{font-size:.73rem;color:var(--muted);text-align:right}
.s-chev{color:var(--muted);font-size:.75rem;transition:transform .2s;flex-shrink:0}.s-chev.collapsed{transform:rotate(-90deg)}
.vcell{font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;color:var(--accent)}.vcell.neg{color:var(--red)}.vcell.zero{color:var(--muted2)}
.color-picker{display:flex;flex-wrap:wrap;gap:8px}
.cp-dot{width:26px;height:26px;border-radius:50%;cursor:pointer;border:3px solid transparent;transition:border-color .15s,transform .15s}.cp-dot:hover{transform:scale(1.15)}.cp-dot.sel{border-color:white}
.confirm-icon{font-size:2.5rem;text-align:center;margin-bottom:10px}
.confirm-msg{text-align:center;color:var(--muted);font-size:.88rem;line-height:1.6}
.drop-zone{border:2px dashed var(--border2);border-radius:var(--r);padding:32px;text-align:center;cursor:pointer;transition:all .2s}.drop-zone:hover,.drop-zone.drag{border-color:var(--accent);background:rgba(232,184,75,.04)}
@media(max-width:540px){.num-in{width:56px;font-size:.78rem}thead th,td{padding:7px 5px;font-size:.75rem}td:first-child{padding-left:10px;max-width:100px}thead th:first-child{padding-left:10px}}
ENDOFFILE

# ──────────────────────────────────────────
# src/main.jsx
# ──────────────────────────────────────────
cat > src/main.jsx << 'ENDOFFILE'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
ENDOFFILE

# ──────────────────────────────────────────
# src/App.jsx
# ──────────────────────────────────────────
cat > src/App.jsx << 'ENDOFFILE'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import InventarioPage from './pages/InventarioPage'
import HistorialPage from './pages/HistorialPage'
import VerDiaPage from './pages/VerDiaPage'
import ConfigPage from './pages/ConfigPage'
import Layout from './components/Layout'
import Toast from './components/Toast'

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', color:'var(--muted)' }}>
      Cargando...
    </div>
  )
  if (!session) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<InventarioPage />} />
          <Route path="historial" element={<HistorialPage />} />
          <Route path="historial/:fecha" element={<VerDiaPage />} />
          <Route path="config" element={<ConfigPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast />
    </>
  )
}
ENDOFFILE

# ──────────────────────────────────────────
# src/lib/supabase.js
# ──────────────────────────────────────────
cat > src/lib/supabase.js << 'ENDOFFILE'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
ENDOFFILE

# ──────────────────────────────────────────
# src/contexts/AuthContext.jsx
# ──────────────────────────────────────────
cat > src/contexts/AuthContext.jsx << 'ENDOFFILE'
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) fetchProfile(session.user.id)
      else { setProfile(null); setLoading(false) }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('role, nombre')
      .eq('id', userId)
      .single()
    setProfile(data)
    setLoading(false)
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{
      session, profile, loading,
      isAdmin: profile?.role === 'admin',
      signIn, signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
ENDOFFILE

# ──────────────────────────────────────────
# src/hooks/useSectores.js
# ──────────────────────────────────────────
cat > src/hooks/useSectores.js << 'ENDOFFILE'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSectores() {
  const [sectores, setSectores] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchSectores() {
    const { data, error } = await supabase
      .from('sectores')
      .select(`id, nombre, color, orden, productos (id, nombre, unidad, orden)`)
      .order('orden', { ascending: true })
      .order('orden', { ascending: true, foreignTable: 'productos' })
    if (!error && data) setSectores(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchSectores()
    const chan = supabase.channel('sectores-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sectores' }, fetchSectores)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'productos' }, fetchSectores)
      .subscribe()
    return () => supabase.removeChannel(chan)
  }, [])

  async function addSector(nombre, color) {
    const maxOrden = sectores.length ? Math.max(...sectores.map(s => s.orden || 0)) + 1 : 0
    const { data, error } = await supabase.from('sectores').insert({ nombre, color, orden: maxOrden }).select().single()
    if (error) throw error
    return data
  }
  async function updateSector(id, updates) {
    const { error } = await supabase.from('sectores').update(updates).eq('id', id)
    if (error) throw error
  }
  async function deleteSector(id) {
    const { error } = await supabase.from('sectores').delete().eq('id', id)
    if (error) throw error
  }
  async function addProducto(sectorId, nombre, unidad = 'un') {
    const sector = sectores.find(s => s.id === sectorId)
    const maxOrden = sector?.productos?.length ? Math.max(...sector.productos.map(p => p.orden || 0)) + 1 : 0
    const { data, error } = await supabase.from('productos').insert({ sector_id: sectorId, nombre, unidad, orden: maxOrden }).select().single()
    if (error) throw error
    return data
  }
  async function updateProducto(id, updates) {
    const { error } = await supabase.from('productos').update(updates).eq('id', id)
    if (error) throw error
  }
  async function deleteProducto(id) {
    const { error } = await supabase.from('productos').delete().eq('id', id)
    if (error) throw error
  }
  async function deleteProductos(ids) {
    const { error } = await supabase.from('productos').delete().in('id', ids)
    if (error) throw error
  }
  async function importProductos(sectorId, nombres) {
    const sector = sectores.find(s => s.id === sectorId)
    const existing = new Set((sector?.productos || []).map(p => p.nombre.toUpperCase()))
    const nuevos = nombres.filter(n => !existing.has(n.toUpperCase()))
    if (!nuevos.length) return 0
    const maxOrden = sector?.productos?.length ? Math.max(...sector.productos.map(p => p.orden || 0)) + 1 : 0
    const rows = nuevos.map((nombre, i) => ({ sector_id: sectorId, nombre, unidad: 'un', orden: maxOrden + i }))
    const { error } = await supabase.from('productos').insert(rows)
    if (error) throw error
    return nuevos.length
  }

  return {
    sectores, loading,
    addSector, updateSector, deleteSector,
    addProducto, updateProducto, deleteProducto, deleteProductos, importProductos,
    refetch: fetchSectores
  }
}
ENDOFFILE

# ──────────────────────────────────────────
# src/hooks/useDia.js
# ──────────────────────────────────────────
cat > src/hooks/useDia.js << 'ENDOFFILE'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useDia(fecha) {
  const [dia, setDia] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchDia = useCallback(async () => {
    if (!fecha) return
    setLoading(true)
    const { data } = await supabase.from('dias').select('*').eq('fecha', fecha).maybeSingle()
    setDia(data || null)
    setLoading(false)
  }, [fecha])

  useEffect(() => {
    fetchDia()
    const chan = supabase.channel(`dia-${fecha}`)
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'dias',
        filter: `fecha=eq.${fecha}`
      }, fetchDia)
      .subscribe()
    return () => supabase.removeChannel(chan)
  }, [fecha, fetchDia])

  const diaData = dia?.data || {}
  const isClosed = !!dia?.cerrado

  function getOrInit(data, sid, pid) {
    const d = JSON.parse(JSON.stringify(data))
    if (!d[sid]) d[sid] = {}
    if (!d[sid][pid]) d[sid][pid] = { inicial: '', repos: [], final: '' }
    return d
  }

  async function persistData(newData) {
    if (dia?.id) {
      const { data } = await supabase
        .from('dias')
        .update({ data: newData, updated_at: new Date().toISOString() })
        .eq('id', dia.id)
        .select().single()
      setDia(data)
    } else {
      const { data } = await supabase
        .from('dias')
        .insert({ fecha, data: newData, cerrado: false })
        .select().single()
      setDia(data)
    }
  }

  async function updateField(sid, pid, field, value) {
    if (isClosed) return
    const d = getOrInit(diaData, sid, pid)
    d[sid][pid][field] = value
    await persistData(d)
  }
  async function addRepo(sid, pid) {
    if (isClosed) return
    const d = getOrInit(diaData, sid, pid)
    d[sid][pid].repos.push('')
    await persistData(d)
  }
  async function removeRepo(sid, pid, idx) {
    if (isClosed) return
    const d = getOrInit(diaData, sid, pid)
    d[sid][pid].repos.splice(idx, 1)
    await persistData(d)
  }
  async function updateRepo(sid, pid, idx, value) {
    if (isClosed) return
    const d = getOrInit(diaData, sid, pid)
    d[sid][pid].repos[idx] = value
    await persistData(d)
  }
  async function cerrarDia() {
    if (isClosed) return
    if (dia?.id) {
      const { data } = await supabase
        .from('dias')
        .update({ cerrado: true, cerrado_at: new Date().toISOString() })
        .eq('id', dia.id)
        .select().single()
      setDia(data)
    } else {
      const { data } = await supabase
        .from('dias')
        .insert({ fecha, data: {}, cerrado: true, cerrado_at: new Date().toISOString() })
        .select().single()
      setDia(data)
    }
  }

  return { dia, diaData, isClosed, loading, updateField, addRepo, removeRepo, updateRepo, cerrarDia, refetch: fetchDia }
}
ENDOFFILE

# ──────────────────────────────────────────
# src/components/Toast.jsx
# ──────────────────────────────────────────
cat > src/components/Toast.jsx << 'ENDOFFILE'
import { useEffect, useState } from 'react'

const listeners = new Set()

export function showToast(message, type = '') {
  listeners.forEach(fn => fn({ message, type }))
}

export default function Toast() {
  const [toast, setToast] = useState({ message: '', type: '', show: false })

  useEffect(() => {
    let timer
    const handler = ({ message, type }) => {
      setToast({ message, type, show: true })
      clearTimeout(timer)
      timer = setTimeout(() => setToast(t => ({ ...t, show: false })), 2800)
    }
    listeners.add(handler)
    return () => { listeners.delete(handler); clearTimeout(timer) }
  }, [])

  return (
    <div className={`toast ${toast.show ? 'show' : ''} ${toast.type}`}>
      {toast.message}
    </div>
  )
}
ENDOFFILE

# ──────────────────────────────────────────
# src/components/Modal.jsx
# ──────────────────────────────────────────
cat > src/components/Modal.jsx << 'ENDOFFILE'
import { useEffect } from 'react'

export default function Modal({ title, children, footer, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}>
      <div className="modal">
        <div className="modal-drag" />
        <div className="mhead">
          <div className="mtitle">{title}</div>
          {onClose && <button className="mclose" onClick={onClose}>✕</button>}
        </div>
        <div className="mbody">{children}</div>
        {footer && <div className="mfoot">{footer}</div>}
      </div>
    </div>
  )
}
ENDOFFILE

# ──────────────────────────────────────────
# src/components/Layout.jsx
# ──────────────────────────────────────────
cat > src/components/Layout.jsx << 'ENDOFFILE'
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
ENDOFFILE

# ──────────────────────────────────────────
# src/components/SectorCard.jsx
# ──────────────────────────────────────────
cat > src/components/SectorCard.jsx << 'ENDOFFILE'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Modal from './Modal'
import { showToast } from './Toast'
import * as XLSX from 'xlsx'

const COLORS = ['#e8b84b','#e8733a','#4be8a0','#5b8de0','#9b6fe0','#e05252','#4bcce8','#e8e84b','#e080b8','#80e840']

function numFmt(n) {
  if (n === null || n === undefined) return '—'
  return parseFloat(n.toFixed(2)).toString()
}
function calcVendido(pd) {
  if (!pd || (pd.inicial === '' && pd.final === '')) return null
  const ini = parseFloat(pd.inicial) || 0
  const fin = parseFloat(pd.final) || 0
  const repos = (pd.repos || []).reduce((a, x) => a + (parseFloat(x) || 0), 0)
  return ini + repos - fin
}

export default function SectorCard({ sector, diaData, isClosed, onUpdateField, onAddRepo, onRemoveRepo, onUpdateRepo, onAddProducto, onEditProducto, onDeleteProducto, onDeleteProductos, onImportProductos }) {
  const { isAdmin } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState({})
  const [editModal, setEditModal] = useState(null)
  const [addModal, setAddModal] = useState(false)
  const [importModal, setImportModal] = useState(false)
  const [importPreview, setImportPreview] = useState(null)
  const [form, setForm] = useState({ nombre: '', unidad: 'un' })

  const sData = diaData[sector.id] || {}
  let sectorTotal = 0; let hasAny = false
  sector.productos?.forEach(p => {
    const v = calcVendido(sData[p.id])
    if (v !== null) { sectorTotal += v; hasAny = true }
  })

  const selectedCount = Object.values(selected).filter(Boolean).length
  const anySelected = selectedCount > 0

  function toggleSel(pid, checked) { setSelected(s => ({ ...s, [pid]: checked })) }
  function clearSel() { setSelected({}) }

  async function handleBulkDelete() {
    const ids = Object.entries(selected).filter(([, v]) => v).map(([k]) => k)
    await onDeleteProductos(ids)
    setSelected({})
    showToast(`${ids.length} productos eliminados`, 'ok')
  }
  async function handleAddProducto() {
    if (!form.nombre.trim()) { showToast('Ingresá un nombre', 'err'); return }
    await onAddProducto(sector.id, form.nombre.trim(), form.unidad || 'un')
    setAddModal(false); setForm({ nombre: '', unidad: 'un' })
    showToast('Producto agregado', 'ok')
  }
  async function handleEditProducto() {
    await onEditProducto(editModal.producto.id, { nombre: form.nombre, unidad: form.unidad })
    setEditModal(null); showToast('Guardado', 'ok')
  }
  async function handleDeleteProducto() {
    await onDeleteProducto(editModal.producto.id)
    setEditModal(null); showToast('Eliminado', 'ok')
  }
  function openEdit(producto) {
    setForm({ nombre: producto.nombre, unidad: producto.unidad })
    setEditModal({ producto })
  }
  function processXlsx(file) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      const wb = XLSX.read(ev.target.result, { type: 'array' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
      if (!rows.length) { showToast('Archivo vacío', 'err'); return }
      const colCounts = (rows[0] || []).map((_, ci) => rows.slice(1).filter(r => typeof r[ci] === 'string' && r[ci].trim()).length)
      const bestCol = colCounts.indexOf(Math.max(...colCounts))
      const products = rows.slice(1).map(r => String(r[bestCol] || '').trim()).filter(Boolean)
      const existing = new Set(sector.productos?.map(p => p.nombre.toUpperCase()) || [])
      setImportPreview({
        news: products.filter(n => !existing.has(n.toUpperCase())),
        dups: products.filter(n => existing.has(n.toUpperCase()))
      })
    }
    reader.readAsArrayBuffer(file)
  }
  async function confirmImport() {
    if (!importPreview?.news?.length) return
    const count = await onImportProductos(sector.id, importPreview.news)
    setImportModal(false); setImportPreview(null)
    showToast(`${count} productos importados`, 'ok')
  }

  return (
    <div className="sector-card">
      <div className="sector-head" onClick={() => setCollapsed(c => !c)}>
        <div className="s-dot" style={{ background: sector.color }} />
        <div className="s-name">{sector.nombre}</div>
        <div className="s-meta">{sector.productos?.length || 0} prod · vendido: <strong style={{ color: 'var(--accent)' }}>{hasAny ? numFmt(sectorTotal) : '—'}</strong></div>
        <div className={`s-chev ${collapsed ? 'collapsed' : ''}`}>▼</div>
      </div>

      {!collapsed && (
        <div>
          {isAdmin && !isClosed && (
            <div style={{ display:'flex', gap:8, padding:'10px 14px', borderBottom:'1px solid var(--border)', background:'var(--surface2)', flexWrap:'wrap', alignItems:'center' }}>
              {anySelected ? (
                <>
                  <span style={{ fontSize:'.8rem', color:'var(--red)', flex:1 }}>📋 {selectedCount} seleccionado{selectedCount > 1 ? 's' : ''}</span>
                  <button className="btn btn-dng btn-sm" onClick={handleBulkDelete}>🗑️ Eliminar</button>
                  <button className="btn btn-ghost btn-sm" onClick={clearSel}>✕</button>
                </>
              ) : (
                <>
                  <button className="btn btn-ghost btn-sm" onClick={() => setImportModal(true)}>📥 Importar Excel</button>
                  <button className="btn btn-pri btn-sm" onClick={() => { setForm({ nombre:'', unidad:'un' }); setAddModal(true) }}>+ Producto</button>
                </>
              )}
            </div>
          )}

          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  {isAdmin && !isClosed && <th style={{ width:36, padding:'9px 6px' }}></th>}
                  <th style={{ textAlign:'left' }}>Producto</th>
                  <th>Unidad</th>
                  <th>Inicial</th>
                  <th>Repo.</th>
                  <th>Final</th>
                  <th>Vendido</th>
                  {isAdmin && <th></th>}
                </tr>
              </thead>
              <tbody>
                {(sector.productos || []).map(p => {
                  const pd = sData[p.id] || { inicial: '', repos: [], final: '' }
                  const v = calcVendido(pd)
                  const vStr = v === null ? '—' : numFmt(v)
                  const vClass = v === null ? 'zero' : v < 0 ? 'neg' : ''
                  const repos = pd.repos || []
                  return (
                    <tr key={p.id} className={selected[p.id] ? 'selected' : ''}>
                      {isAdmin && !isClosed && (
                        <td style={{ textAlign:'center', padding:'8px 6px' }}>
                          <input type="checkbox" checked={!!selected[p.id]} onChange={e => toggleSel(p.id, e.target.checked)} style={{ accentColor:'var(--accent)' }} />
                        </td>
                      )}
                      <td>{p.nombre}</td>
                      <td style={{ color:'var(--muted)', fontSize:'.72rem' }}>{p.unidad}</td>
                      <td>
                        <input className="num-in" type="number" min="0" step="any"
                          value={pd.inicial !== '' ? pd.inicial : ''}
                          onChange={e => onUpdateField(sector.id, p.id, 'inicial', e.target.value)}
                          placeholder="0" disabled={isClosed || !isAdmin} />
                      </td>
                      <td>
                        <div style={{ display:'flex', flexDirection:'column', gap:3, alignItems:'center' }}>
                          {repos.map((r, ri) => (
                            <div key={ri} style={{ display:'flex', alignItems:'center', gap:3 }}>
                              <input className="num-in" type="number" min="0" step="any" value={r}
                                onChange={e => onUpdateRepo(sector.id, p.id, ri, e.target.value)}
                                disabled={isClosed || !isAdmin} />
                              {isAdmin && !isClosed && (
                                <button onClick={() => onRemoveRepo(sector.id, p.id, ri)}
                                  style={{ background:'none', border:'none', color:'var(--muted2)', cursor:'pointer', fontSize:'.9rem', padding:'1px 3px' }}>×</button>
                              )}
                            </div>
                          ))}
                          {isAdmin && !isClosed && (
                            <button onClick={() => onAddRepo(sector.id, p.id)}
                              style={{ fontSize:'.68rem', color:'var(--accent)', background:'none', border:'none', cursor:'pointer', padding:'1px 4px' }}>+repo</button>
                          )}
                        </div>
                      </td>
                      <td>
                        <input className="num-in" type="number" min="0" step="any"
                          value={pd.final !== '' ? pd.final : ''}
                          onChange={e => onUpdateField(sector.id, p.id, 'final', e.target.value)}
                          placeholder="0" disabled={isClosed || !isAdmin} />
                      </td>
                      <td className={`vcell ${vClass}`}>{vStr}</td>
                      {isAdmin && (
                        <td>
                          <button onClick={() => openEdit(p)} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', padding:'4px 6px', borderRadius:6, fontSize:'.85rem' }}>✏️</button>
                        </td>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {isAdmin && !isClosed && (
            <button onClick={() => { setForm({ nombre:'', unidad:'un' }); setAddModal(true) }}
              style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 16px', width:'100%', background:'none', border:'none', borderTop:'1px dashed var(--border)', color:'var(--muted)', cursor:'pointer', fontSize:'.78rem' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--muted)'}>
              ＋ Agregar producto
            </button>
          )}
        </div>
      )}

      {addModal && (
        <Modal title="Nuevo producto" onClose={() => setAddModal(false)}
          footer={<><button className="btn btn-sec" onClick={() => setAddModal(false)}>Cancelar</button><button className="btn btn-pri" onClick={handleAddProducto}>Agregar</button></>}>
          <div className="fg"><label className="fl">Nombre del producto</label>
            <input className="fi" autoFocus placeholder="Ej: MOBIL 1 5W-30 1L" value={form.nombre}
              onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && handleAddProducto()} /></div>
          <div className="fg"><label className="fl">Unidad de medida</label>
            <input className="fi" placeholder="un / lt / kg" value={form.unidad}
              onChange={e => setForm(f => ({ ...f, unidad: e.target.value }))} /></div>
        </Modal>
      )}

      {editModal && (
        <Modal title="Editar producto" onClose={() => setEditModal(null)}
          footer={<><button className="btn btn-dng" style={{ marginRight:'auto' }} onClick={handleDeleteProducto}>Eliminar</button><button className="btn btn-sec" onClick={() => setEditModal(null)}>Cancelar</button><button className="btn btn-pri" onClick={handleEditProducto}>Guardar</button></>}>
          <div className="fg"><label className="fl">Nombre</label><input className="fi" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} /></div>
          <div className="fg"><label className="fl">Unidad</label><input className="fi" value={form.unidad} onChange={e => setForm(f => ({ ...f, unidad: e.target.value }))} /></div>
        </Modal>
      )}

      {importModal && (
        <Modal title={`Importar Excel — ${sector.nombre}`} onClose={() => { setImportModal(false); setImportPreview(null) }}
          footer={<><button className="btn btn-sec" onClick={() => { setImportModal(false); setImportPreview(null) }}>Cerrar</button>{importPreview?.news?.length > 0 && <button className="btn btn-pri" onClick={confirmImport}>Importar {importPreview.news.length} nuevos</button>}</>}>
          <div className="banner banner-info">📋 El archivo debe tener los nombres en la primera columna con encabezado en fila 1.</div>
          <div className="drop-zone"
            onClick={() => document.getElementById(`xlsx_${sector.id}`).click()}
            onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drag') }}
            onDragLeave={e => e.currentTarget.classList.remove('drag')}
            onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drag'); processXlsx(e.dataTransfer.files[0]) }}>
            <div style={{ fontSize:'2rem', marginBottom:8 }}>📂</div>
            <p>Tocá o arrastrá un archivo Excel (.xlsx, .xls, .csv)</p>
          </div>
          <input type="file" id={`xlsx_${sector.id}`} accept=".xlsx,.xls,.csv" style={{ display:'none' }}
            onChange={e => { if (e.target.files[0]) processXlsx(e.target.files[0]) }} />
          {importPreview && (
            <div style={{ marginTop:14 }}>
              <p style={{ fontSize:'.82rem', marginBottom:8 }}>
                <strong style={{ color:'var(--green)' }}>{importPreview.news.length}</strong> nuevos ·{' '}
                <strong style={{ color:'var(--muted)' }}>{importPreview.dups.length}</strong> ya existen
              </p>
              <div style={{ maxHeight:200, overflowY:'auto' }}>
                <table style={{ fontSize:'.78rem' }}>
                  <thead><tr><th style={{ textAlign:'left' }}>Producto</th><th>Estado</th></tr></thead>
                  <tbody>
                    {importPreview.news.map(n => <tr key={n}><td>{n}</td><td style={{ color:'var(--green)' }}>✅ Nuevo</td></tr>)}
                    {importPreview.dups.map(n => <tr key={n}><td>{n}</td><td style={{ color:'var(--muted)' }}>⏩ Existe</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}
ENDOFFILE

# ──────────────────────────────────────────
# src/pages/LoginPage.jsx
# ──────────────────────────────────────────
cat > src/pages/LoginPage.jsx << 'ENDOFFILE'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch {
      setError('Email o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, padding:'36px 32px', width:'100%', maxWidth:380 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:'2.2rem', color:'var(--accent)', letterSpacing:-1 }}>⛽ EDS</div>
          <div style={{ color:'var(--muted)', fontSize:'.82rem', marginTop:4 }}>Sistema de Inventario Digital</div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="fg">
            <label className="fl">Email</label>
            <input className="fi" type="email" placeholder="usuario@eds.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required />
          </div>
          <div className="fg">
            <label className="fl">Contraseña</label>
            <input className="fi" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required />
          </div>
          {error && <div style={{ color:'var(--red)', fontSize:'.82rem', textAlign:'center', marginBottom:12 }}>{error}</div>}
          <button className="btn btn-pri btn-full" type="submit" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
        </form>
      </div>
    </div>
  )
}
ENDOFFILE

# ──────────────────────────────────────────
# src/pages/InventarioPage.jsx
# ──────────────────────────────────────────
cat > src/pages/InventarioPage.jsx << 'ENDOFFILE'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSectores } from '../hooks/useSectores'
import { useDia } from '../hooks/useDia'
import SectorCard from '../components/SectorCard'
import Modal from '../components/Modal'
import { showToast } from '../components/Toast'

function todayStr() { return new Date().toISOString().split('T')[0] }
function fmtDateLong(s) {
  if (!s) return '—'
  const [y, m, d] = s.split('-')
  const M = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  const D = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
  const dt = new Date(s + 'T12:00:00')
  return `${D[dt.getDay()]} ${+d} de ${M[+m-1]} de ${y}`
}

export default function InventarioPage() {
  const { isAdmin } = useAuth()
  const [fecha, setFecha] = useState(todayStr())
  const [activeSector, setActiveSector] = useState(null)
  const [confirmCierre, setConfirmCierre] = useState(false)
  const { sectores, addProducto, updateProducto, deleteProducto, deleteProductos, importProductos } = useSectores()
  const { diaData, isClosed, loading, updateField, addRepo, removeRepo, updateRepo, cerrarDia } = useDia(fecha)

  useEffect(() => {
    const handler = (e) => setActiveSector(e.detail)
    window.addEventListener('sectorChange', handler)
    return () => window.removeEventListener('sectorChange', handler)
  }, [])

  useEffect(() => {
    if (sectores.length && !activeSector) setActiveSector(sectores[0].id)
  }, [sectores, activeSector])

  const currentSector = sectores.find(s => s.id === activeSector)

  async function handleCerrarDia() {
    await cerrarDia()
    setConfirmCierre(false)
    showToast('✅ Día cerrado y guardado', 'ok')
  }

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, flexWrap:'wrap' }}>
        <div style={{ flex:1, minWidth:160 }}>
          <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1.2rem' }}>{fmtDateLong(fecha)}</div>
          <div style={{ color:'var(--muted)', fontSize:'.75rem' }}>{fecha === todayStr() ? 'Hoy' : fecha}</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
          <span className={`badge badge-${isClosed ? 'closed' : 'open'}`}>{isClosed ? 'Cerrado' : 'Abierto'}</span>
          <input type="date" className="fi" style={{ width:'auto', padding:'7px 10px', fontSize:'.8rem' }}
            value={fecha} onChange={e => setFecha(e.target.value)} />
          {isAdmin && !isClosed && (
            <button className="btn btn-pri btn-sm" onClick={() => setConfirmCierre(true)}>✅ Cerrar día</button>
          )}
        </div>
      </div>

      {isClosed && <div className="banner banner-danger">🔒 Día cerrado — solo lectura</div>}
      {!isClosed && isAdmin && <div className="banner banner-warn">⚠️ Al cerrar el día los datos quedan guardados y no se pueden modificar.</div>}

      {loading ? (
        <div style={{ textAlign:'center', color:'var(--muted)', padding:40 }}>Cargando...</div>
      ) : currentSector ? (
        <SectorCard
          key={currentSector.id}
          sector={currentSector}
          diaData={diaData}
          isClosed={isClosed}
          onUpdateField={updateField}
          onAddRepo={addRepo}
          onRemoveRepo={removeRepo}
          onUpdateRepo={updateRepo}
          onAddProducto={addProducto}
          onEditProducto={updateProducto}
          onDeleteProducto={deleteProducto}
          onDeleteProductos={deleteProductos}
          onImportProductos={importProductos}
        />
      ) : (
        <div style={{ textAlign:'center', color:'var(--muted)', padding:60 }}>
          Sin sectores. Creá uno en ⚙️ Configuración.
        </div>
      )}

      {confirmCierre && (
        <Modal title="Cerrar el día" onClose={() => setConfirmCierre(false)}
          footer={<><button className="btn btn-sec" onClick={() => setConfirmCierre(false)}>Cancelar</button><button className="btn btn-pri" onClick={handleCerrarDia}>Confirmar cierre</button></>}>
          <div className="confirm-icon">🔒</div>
          <div className="confirm-msg">
            Vas a cerrar el inventario del<br />
            <strong style={{ color:'var(--text)' }}>{fmtDateLong(fecha)}</strong><br /><br />
            Esta acción <strong style={{ color:'var(--red)' }}>no se puede deshacer</strong>.
          </div>
        </Modal>
      )}
    </div>
  )
}
ENDOFFILE

# ──────────────────────────────────────────
# src/pages/HistorialPage.jsx
# ──────────────────────────────────────────
cat > src/pages/HistorialPage.jsx << 'ENDOFFILE'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function fmtDate(s) {
  if (!s) return '—'
  const [y, m, d] = s.split('-')
  const M = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  return `${+d} ${M[+m-1]} ${y}`
}
function fmtDateLong(s) {
  if (!s) return '—'
  const [y, m, d] = s.split('-')
  const M = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  const D = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
  const dt = new Date(s + 'T12:00:00')
  return `${D[dt.getDay()]} ${+d} de ${M[+m-1]} de ${y}`
}

export default function HistorialPage() {
  const [dias, setDias] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterMonth, setFilterMonth] = useState('')
  const navigate = useNavigate()

  useEffect(() => { fetchDias() }, [filterMonth])

  async function fetchDias() {
    setLoading(true)
    let query = supabase.from('dias').select('id, fecha, cerrado, data').eq('cerrado', true).order('fecha', { ascending: false })
    if (filterMonth) {
      const [y, m] = filterMonth.split('-')
      query = query.gte('fecha', `${y}-${m}-01`).lte('fecha', `${y}-${m}-31`)
    }
    const { data } = await query
    setDias(data || [])
    setLoading(false)
  }

  function calcTotal(data) {
    let t = 0
    Object.values(data || {}).forEach(sector => {
      Object.values(sector).forEach(pd => {
        if (!pd || (pd.inicial === '' && pd.final === '')) return
        const ini = parseFloat(pd.inicial) || 0
        const fin = parseFloat(pd.final) || 0
        const repos = (pd.repos || []).reduce((a, x) => a + (parseFloat(x) || 0), 0)
        t += ini + repos - fin
      })
    })
    return parseFloat(t.toFixed(2))
  }

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, flexWrap:'wrap' }}>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1.2rem' }}>📋 Historial</div>
          <div style={{ color:'var(--muted)', fontSize:'.75rem' }}>Días cerrados guardados en Supabase</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <input type="month" className="fi" style={{ width:'auto', padding:'7px 10px', fontSize:'.8rem' }}
            value={filterMonth} onChange={e => setFilterMonth(e.target.value)} />
          {filterMonth && <button className="btn btn-ghost btn-sm" onClick={() => setFilterMonth('')}>✕</button>}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign:'center', color:'var(--muted)', padding:40 }}>Cargando...</div>
      ) : !dias.length ? (
        <div style={{ textAlign:'center', color:'var(--muted)', padding:60 }}>
          📭 No hay días cerrados{filterMonth ? ' en este mes' : ''} aún.
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
          {dias.map(dia => {
            const total = calcTotal(dia.data)
            return (
              <div key={dia.id} onClick={() => navigate(`/historial/${dia.fecha}`)}
                style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r)', padding:'14px 16px', display:'flex', alignItems:'center', gap:12, cursor:'pointer', transition:'border-color .15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Syne', fontWeight:700 }}>{fmtDate(dia.fecha)}</div>
                  <div style={{ fontSize:'.73rem', color:'var(--muted)' }}>{fmtDateLong(dia.fecha)}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:'1.1rem', color:'var(--accent)' }}>{total}</div>
                  <div style={{ fontSize:'.73rem', color:'var(--muted)' }}>total vendido</div>
                </div>
                <div style={{ color:'var(--muted)' }}>›</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
ENDOFFILE

# ──────────────────────────────────────────
# src/pages/VerDiaPage.jsx
# ──────────────────────────────────────────
cat > src/pages/VerDiaPage.jsx << 'ENDOFFILE'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function numFmt(n) { return parseFloat(n.toFixed(2)).toString() }
function calcV(pd) {
  if (!pd || (pd.inicial === '' && pd.final === '')) return null
  const ini = parseFloat(pd.inicial) || 0, fin = parseFloat(pd.final) || 0
  const r = (pd.repos || []).reduce((a, x) => a + (parseFloat(x) || 0), 0)
  return ini + r - fin
}
function fmtDateLong(s) {
  if (!s) return '—'
  const [y, m, d] = s.split('-')
  const M = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  const D = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
  const dt = new Date(s + 'T12:00:00')
  return `${D[dt.getDay()]} ${+d} de ${M[+m-1]} de ${y}`
}

export default function VerDiaPage() {
  const { fecha } = useParams()
  const navigate = useNavigate()
  const [dia, setDia] = useState(null)
  const [sectores, setSectores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('dias').select('*').eq('fecha', fecha).maybeSingle(),
      supabase.from('sectores').select('id, nombre, color, productos(id, nombre, unidad)').order('orden').order('orden', { foreignTable: 'productos' })
    ]).then(([{ data: d }, { data: s }]) => {
      setDia(d); setSectores(s || []); setLoading(false)
    })
  }, [fecha])

  if (loading) return <div style={{ textAlign:'center', color:'var(--muted)', padding:40 }}>Cargando...</div>
  if (!dia) return <div style={{ textAlign:'center', color:'var(--muted)', padding:40 }}>Día no encontrado.</div>

  const data = dia.data || {}
  let globalTotal = 0; let globalHas = false

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, flexWrap:'wrap' }}>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1.15rem' }}>{fmtDateLong(fecha)}</div>
          <div style={{ color:'var(--muted)', fontSize:'.75rem' }}>{fecha} · Cerrado</div>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/historial')}>← Historial</button>
      </div>

      {sectores.map(s => {
        const sData = data[s.id] || {}
        const prods = (s.productos || []).filter(p => sData[p.id] && (sData[p.id].inicial !== '' || sData[p.id].final !== ''))
        if (!prods.length) return null
        let sTotal = 0; let sHas = false
        prods.forEach(p => { const v = calcV(sData[p.id]); if (v !== null) { sTotal += v; sHas = true; globalTotal += v; globalHas = true } })
        return (
          <div key={s.id} className="sector-card" style={{ marginBottom:14 }}>
            <div className="sector-head" style={{ cursor:'default' }}>
              <div className="s-dot" style={{ background: s.color }} />
              <div className="s-name">{s.nombre}</div>
              <div className="s-meta">vendido: <strong style={{ color:'var(--accent)' }}>{sHas ? numFmt(sTotal) : '—'}</strong></div>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead><tr><th style={{ textAlign:'left' }}>Producto</th><th>Unid</th><th>Inicial</th><th>Repo</th><th>Final</th><th>Vendido</th></tr></thead>
                <tbody>
                  {prods.map(p => {
                    const pd = sData[p.id]; const v = calcV(pd)
                    const repos = (pd.repos || []).reduce((a, x) => a + (parseFloat(x) || 0), 0)
                    return (
                      <tr key={p.id}>
                        <td>{p.nombre}</td>
                        <td style={{ color:'var(--muted)', fontSize:'.72rem' }}>{p.unidad}</td>
                        <td>{pd.inicial !== '' ? pd.inicial : '—'}</td>
                        <td>{repos > 0 ? '+' + repos : '—'}</td>
                        <td>{pd.final !== '' ? pd.final : '—'}</td>
                        <td className={`vcell ${v === null ? 'zero' : v < 0 ? 'neg' : ''}`}>{v === null ? '—' : numFmt(v)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}

      <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r)', padding:16, marginTop:8 }}>
        <div style={{ fontSize:'.68rem', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:6 }}>Total vendido global</div>
        <div style={{ fontFamily:'Syne', fontSize:'1.5rem', fontWeight:800, color:'var(--accent)' }}>{globalHas ? numFmt(globalTotal) : '—'}</div>
      </div>
    </div>
  )
}
ENDOFFILE

# ──────────────────────────────────────────
# src/pages/ConfigPage.jsx
# ──────────────────────────────────────────
cat > src/pages/ConfigPage.jsx << 'ENDOFFILE'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSectores } from '../hooks/useSectores'
import Modal from '../components/Modal'
import { showToast } from '../components/Toast'

const COLORS = ['#e8b84b','#e8733a','#4be8a0','#5b8de0','#9b6fe0','#e05252','#4bcce8','#e8e84b','#e080b8','#80e840','#e84b9b','#4b9be8']

export default function ConfigPage() {
  const { isAdmin } = useAuth()
  const { sectores, addSector, updateSector, deleteSector } = useSectores()
  const [sectorModal, setSectorModal] = useState(null)
  const [form, setForm] = useState({ nombre: '', color: COLORS[0] })

  if (!isAdmin) return <div style={{ textAlign:'center', color:'var(--muted)', padding:60 }}>Acceso restringido.</div>

  async function handleSaveSector() {
    if (!form.nombre.trim()) { showToast('Ingresá un nombre', 'err'); return }
    if (sectorModal?.mode === 'edit') {
      await updateSector(sectorModal.sector.id, { nombre: form.nombre, color: form.color })
      showToast('Sector actualizado', 'ok')
    } else {
      await addSector(form.nombre.trim(), form.color)
      showToast('Sector creado', 'ok')
    }
    setSectorModal(null)
  }
  async function handleDeleteSector() {
    await deleteSector(sectorModal.sector.id)
    setSectorModal(null)
    showToast('Sector eliminado', 'ok')
  }
  function openAdd() { setForm({ nombre: '', color: COLORS[0] }); setSectorModal({ mode: 'add' }) }
  function openEdit(s) { setForm({ nombre: s.nombre, color: s.color }); setSectorModal({ mode: 'edit', sector: s }) }

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontFamily:'Syne', fontWeight:700, fontSize:'1.2rem' }}>⚙️ Configuración</div>
        <div style={{ color:'var(--muted)', fontSize:'.75rem' }}>Solo administradores</div>
      </div>

      <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r)', marginBottom:14 }}>
        <div style={{ padding:'13px 16px', borderBottom:'1px solid var(--border)' }}>
          <div style={{ fontFamily:'Syne', fontWeight:700 }}>👥 Gestión de usuarios</div>
        </div>
        <div style={{ padding:16 }}>
          <div className="banner banner-info">
            Los usuarios se crean desde Supabase: <strong>Authentication → Users → Add user</strong>.
            Para hacer admin a un usuario, ejecutá en SQL Editor:
          </div>
          <pre style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--rs)', padding:'12px 14px', fontSize:'.78rem', overflowX:'auto', marginTop:8 }}>
            {`UPDATE profiles SET role = 'admin' WHERE id = 'UUID_DEL_USUARIO';`}
          </pre>
        </div>
      </div>

      <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r)' }}>
        <div style={{ padding:'13px 16px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ fontFamily:'Syne', fontWeight:700, flex:1 }}>📁 Sectores</div>
          <button className="btn btn-pri btn-sm" onClick={openAdd}>+ Sector</button>
        </div>
        <div style={{ padding:16 }}>
          {sectores.map(s => (
            <div key={s.id} style={{ display:'flex', alignItems:'center', gap:10, background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--rs)', padding:'10px 12px', marginBottom:8 }}>
              <div style={{ width:10, height:10, borderRadius:'50%', background:s.color, flexShrink:0 }} />
              <div style={{ flex:1, fontWeight:500 }}>{s.nombre} <span style={{ color:'var(--muted)', fontSize:'.72rem' }}>({s.productos?.length || 0} prod.)</span></div>
              <button className="btn btn-ghost btn-sm" onClick={() => openEdit(s)}>✏️ Editar</button>
            </div>
          ))}
        </div>
      </div>

      {sectorModal && (
        <Modal title={sectorModal.mode === 'add' ? 'Nuevo sector' : 'Editar sector'} onClose={() => setSectorModal(null)}
          footer={<>
            {sectorModal.mode === 'edit' && <button className="btn btn-dng" style={{ marginRight:'auto' }} onClick={handleDeleteSector}>Eliminar</button>}
            <button className="btn btn-sec" onClick={() => setSectorModal(null)}>Cancelar</button>
            <button className="btn btn-pri" onClick={handleSaveSector}>{sectorModal.mode === 'add' ? 'Crear' : 'Guardar'}</button>
          </>}>
          <div className="fg">
            <label className="fl">Nombre del sector</label>
            <input className="fi" autoFocus value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} onKeyDown={e => e.key === 'Enter' && handleSaveSector()} />
          </div>
          <div className="fg">
            <label className="fl">Color</label>
            <div className="color-picker">
              {COLORS.map(c => (
                <div key={c} className={`cp-dot ${form.color === c ? 'sel' : ''}`} style={{ background: c }}
                  onClick={() => setForm(f => ({ ...f, color: c }))} />
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
ENDOFFILE

# ──────────────────────────────────────────
# index.html (con Google Fonts)
# ──────────────────────────────────────────
cat > index.html << 'ENDOFFILE'
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>EDS Inventario Digital</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
ENDOFFILE

echo ""
echo "✅ ¡Todos los archivos creados!"
echo ""
echo "Ahora ejecutá:"
echo "  git add ."
echo "  git commit -m 'feat: add all source files'"
echo "  git push"
echo ""
echo "Vercel va a redeployar automáticamente 🚀"
