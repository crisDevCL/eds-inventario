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
            .on('postgres_changes', { event: '*', schema: 'public', table: 'dias', filter: `fecha=eq.${fecha}` }, fetchDia)
            .subscribe()
        return () => supabase.removeChannel(chan)
    }, [fecha, fetchDia])

    const diaData = dia?.data || {}
    const isClosed = !!dia?.cerrado

    async function persistData(newData) {
        if (dia?.id) {
            const { data } = await supabase.from('dias').update({ data: newData, updated_at: new Date().toISOString() }).eq('id', dia.id).select().single()
            setDia(data)
        } else {
            const { data } = await supabase.from('dias').insert({ fecha, data: newData, cerrado: false }).select().single()
            setDia(data)
        }
    }

    function getOrInit(data, sid, pid) {
        const d = JSON.parse(JSON.stringify(data))
        if (!d[sid]) d[sid] = {}
        if (!d[sid][pid]) d[sid][pid] = { inicial: '', repos: [], final: '' }
        return d
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
            const { data } = await supabase.from('dias').update({ cerrado: true, cerrado_at: new Date().toISOString() }).eq('id', dia.id).select().single()
            setDia(data)
        } else {
            const { data } = await supabase.from('dias').insert({ fecha, data: {}, cerrado: true, cerrado_at: new Date().toISOString() }).select().single()
            setDia(data)
        }
    }

    return { dia, diaData, isClosed, loading, updateField, addRepo, removeRepo, updateRepo, cerrarDia, refetch: fetchDia }
}