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

    return { sectores, loading, addSector, updateSector, deleteSector, addProducto, updateProducto, deleteProducto, deleteProductos, importProductos, refetch: fetchSectores }
}