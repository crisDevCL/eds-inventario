import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'

export function useDia(fecha) {
    const [dia, setDia] = useState(null)
    const [loading, setLoading] = useState(true)
    // localData guarda el estado local SIN esperar a Supabase
    const [localData, setLocalData] = useState({})
    const debounceTimer = useRef(null)
    const pendingData = useRef(null)
    const diaRef = useRef(null)

    const fetchDia = useCallback(async () => {
        if (!fecha) return
        setLoading(true)
        const { data } = await supabase.from('dias').select('*').eq('fecha', fecha).maybeSingle()
        setDia(data || null)
        diaRef.current = data || null
        setLocalData(data?.data || {})
        setLoading(false)
    }, [fecha])

    useEffect(() => {
        fetchDia()
        const chan = supabase.channel(`dia-${fecha}`)
            .on('postgres_changes', {
                event: '*', schema: 'public', table: 'dias',
                filter: `fecha=eq.${fecha}`
            }, (payload) => {
                // Solo actualiza desde realtime si no hay cambios pendientes locales
                if (!pendingData.current) {
                    setDia(payload.new)
                    diaRef.current = payload.new
                    setLocalData(payload.new?.data || {})
                }
            })
            .subscribe()
        return () => {
            supabase.removeChannel(chan)
            if (debounceTimer.current) clearTimeout(debounceTimer.current)
        }
    }, [fecha, fetchDia])

    const isClosed = !!dia?.cerrado

    function getOrInit(data, sid, pid) {
        const d = JSON.parse(JSON.stringify(data))
        if (!d[sid]) d[sid] = {}
        if (!d[sid][pid]) d[sid][pid] = { inicial: '', repos: [], final: '' }
        return d
    }

    // Guarda en Supabase con debounce de 800ms
    function scheduleSave(newData) {
        pendingData.current = newData
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
        debounceTimer.current = setTimeout(async () => {
            const dataToSave = pendingData.current
            pendingData.current = null
            const currentDia = diaRef.current
            if (currentDia?.id) {
                const { data } = await supabase
                    .from('dias')
                    .update({ data: dataToSave, updated_at: new Date().toISOString() })
                    .eq('id', currentDia.id)
                    .select().single()
                setDia(data)
                diaRef.current = data
            } else {
                const { data } = await supabase
                    .from('dias')
                    .insert({ fecha, data: dataToSave, cerrado: false })
                    .select().single()
                setDia(data)
                diaRef.current = data
            }
        }, 800) // 800ms de espera antes de guardar
    }

    async function updateField(sid, pid, field, value) {
        if (isClosed) return
        const d = getOrInit(localData, sid, pid)
        d[sid][pid][field] = value
        setLocalData(d)       // actualiza UI al instante
        scheduleSave(d)       // guarda en Supabase con delay
    }

    async function addRepo(sid, pid) {
        if (isClosed) return
        const d = getOrInit(localData, sid, pid)
        d[sid][pid].repos.push('')
        setLocalData(d)
        scheduleSave(d)
    }

    async function removeRepo(sid, pid, idx) {
        if (isClosed) return
        const d = getOrInit(localData, sid, pid)
        d[sid][pid].repos.splice(idx, 1)
        setLocalData(d)
        scheduleSave(d)
    }

    async function updateRepo(sid, pid, idx, value) {
        if (isClosed) return
        const d = getOrInit(localData, sid, pid)
        d[sid][pid].repos[idx] = value
        setLocalData(d)
        scheduleSave(d)
    }

    async function cerrarDia() {
        if (isClosed) return
        // Cancelar cualquier save pendiente y guardar inmediatamente
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
        const dataToUse = pendingData.current || localData
        pendingData.current = null
        const currentDia = diaRef.current
        if (currentDia?.id) {
            const { data } = await supabase
                .from('dias')
                .update({ data: dataToUse, cerrado: true, cerrado_at: new Date().toISOString() })
                .eq('id', currentDia.id)
                .select().single()
            setDia(data)
            diaRef.current = data
        } else {
            const { data } = await supabase
                .from('dias')
                .insert({ fecha, data: dataToUse, cerrado: true, cerrado_at: new Date().toISOString() })
                .select().single()
            setDia(data)
            diaRef.current = data
        }
    }

    return {
        dia,
        diaData: localData,  // usa localData en vez de dia.data
        isClosed,
        loading,
        updateField,
        addRepo,
        removeRepo,
        updateRepo,
        cerrarDia,
        refetch: fetchDia
    }
}