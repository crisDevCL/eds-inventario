import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function fmtDate(s) {
    if (!s) return '—'
    const [y, m, d] = s.split('-')
    const M = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return `${+d} ${M[+m - 1]} ${y}`
}

export default function HistorialPage() {
    const [dias, setDias] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterMonth, setFilterMonth] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchDias()
    }, [filterMonth])

    async function fetchDias() {
        setLoading(true)
        let query = supabase.from('dias').select('id, fecha, cerrado, data').eq('cerrado', true).order('fecha', { ascending: false })
        if (filterMonth) {
            const [y, m] = filterMonth.split('-')
            const from = `${y}-${m}-01`
            const to = `${y}-${m}-31`
            query = query.gte('fecha', from).lte('fecha', to)
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.2rem' }}>📋 Historial</div>
                    <div style={{ color: 'var(--muted)', fontSize: '.75rem' }}>Días cerrados guardados en Supabase</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <input type="month" className="fi" style={{ width: 'auto', padding: '7px 10px', fontSize: '.8rem' }}
                        value={filterMonth} onChange={e => setFilterMonth(e.target.value)} />
                    {filterMonth && <button className="btn btn-ghost btn-sm" onClick={() => setFilterMonth('')}>✕</button>}
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 40 }}>Cargando...</div>
            ) : !dias.length ? (
                <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60 }}>
                    📭 No hay días cerrados{filterMonth ? ' en este mes' : ''} aún.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {dias.map(dia => {
                        const total = calcTotal(dia.data)
                        return (
                            <div key={dia.id}
                                onClick={() => navigate(`/historial/${dia.fecha}`)}
                                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'border-color .15s' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontFamily: 'Syne', fontWeight: 700 }}>{fmtDate(dia.fecha)}</div>
                                    <div style={{ fontSize: '.73rem', color: 'var(--muted)' }}>{dia.fecha}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent)' }}>{total}</div>
                                    <div style={{ fontSize: '.73rem', color: 'var(--muted)' }}>total vendido</div>
                                </div>
                                <div style={{ color: 'var(--muted)' }}>›</div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}