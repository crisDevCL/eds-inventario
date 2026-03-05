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
    const M = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const D = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const dt = new Date(s + 'T12:00:00')
    return `${D[dt.getDay()]} ${+d} de ${M[+m - 1]} de ${y}`
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

    if (loading) return <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 40 }}>Cargando...</div>
    if (!dia) return <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 40 }}>Día no encontrado.</div>

    const data = dia.data || {}
    let globalTotal = 0; let globalHas = false

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.15rem' }}>{fmtDateLong(fecha)}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '.75rem' }}>{fecha} · Cerrado</div>
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
                    <div key={s.id} className="sector-card" style={{ marginBottom: 14 }}>
                        <div className="sector-head" style={{ cursor: 'default' }}>
                            <div className="s-dot" style={{ background: s.color }} />
                            <div className="s-name">{s.nombre}</div>
                            <div className="s-meta">vendido: <strong style={{ color: 'var(--accent)' }}>{sHas ? numFmt(sTotal) : '—'}</strong></div>
                        </div>
                        <div className="tbl-wrap">
                            <table>
                                <thead><tr><th style={{ textAlign: 'left' }}>Producto</th><th>Unid</th><th>Inicial</th><th>Repo</th><th>Final</th><th>Vendido</th></tr></thead>
                                <tbody>
                                    {prods.map(p => {
                                        const pd = sData[p.id]; const v = calcV(pd)
                                        const repos = (pd.repos || []).reduce((a, x) => a + (parseFloat(x) || 0), 0)
                                        const vStr = v === null ? '—' : numFmt(v)
                                        const vC = v === null ? 'zero' : v < 0 ? 'neg' : ''
                                        return <tr key={p.id}>
                                            <td>{p.nombre}</td>
                                            <td style={{ color: 'var(--muted)', fontSize: '.72rem' }}>{p.unidad}</td>
                                            <td>{pd.inicial !== '' ? pd.inicial : '—'}</td>
                                            <td>{repos > 0 ? '+' + repos : '—'}</td>
                                            <td>{pd.final !== '' ? pd.final : '—'}</td>
                                            <td className={`vcell ${vC}`}>{vStr}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            })}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 16 }}>
                    <div style={{ fontSize: '.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 6 }}>Total vendido</div>
                    <div style={{ fontFamily: 'Syne', fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>{globalHas ? numFmt(globalTotal) : '—'}</div>
                </div>
            </div>
        </div>
    )
}