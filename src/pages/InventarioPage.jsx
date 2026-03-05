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
    const M = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const D = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const dt = new Date(s + 'T12:00:00')
    return `${D[dt.getDay()]} ${+d} de ${M[+m - 1]} de ${y}`
}

export default function InventarioPage() {
    const { isAdmin } = useAuth()
    const [fecha, setFecha] = useState(todayStr())
    const [activeSector, setActiveSector] = useState(null)
    const [confirmCierre, setConfirmCierre] = useState(false)

    const { sectores, addProducto, updateProducto, deleteProducto, deleteProductos, importProductos } = useSectores()
    const { diaData, isClosed, loading, updateField, addRepo, removeRepo, updateRepo, cerrarDia } = useDia(fecha)

    // Listen to sector tab clicks from Layout
    useEffect(() => {
        const handler = (e) => setActiveSector(e.detail)
        window.addEventListener('sectorChange', handler)
        return () => window.removeEventListener('sectorChange', handler)
    }, [])

    // Auto-select first sector
    useEffect(() => {
        if (sectores.length && !activeSector) setActiveSector(sectores[0].id)
    }, [sectores])

    const currentSector = sectores.find(s => s.id === activeSector)

    async function handleCerrarDia() {
        await cerrarDia()
        setConfirmCierre(false)
        showToast('✅ Día cerrado y guardado en Supabase', 'ok')
    }

    return (
        <div>
            {/* Date bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.2rem' }}>
                        {fmtDateLong(fecha)}
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: '.75rem' }}>
                        {fecha === todayStr() ? 'Hoy' : fecha}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span className={`badge badge-${isClosed ? 'closed' : 'open'}`}>
                        {isClosed ? 'Cerrado' : 'Abierto'}
                    </span>
                    <input type="date" className="fi" style={{ width: 'auto', padding: '7px 10px', fontSize: '.8rem' }}
                        value={fecha} onChange={e => setFecha(e.target.value)} />
                    {isAdmin && !isClosed && (
                        <button className="btn btn-pri btn-sm" onClick={() => setConfirmCierre(true)}>
                            ✅ Cerrar día
                        </button>
                    )}
                </div>
            </div>

            {isClosed && <div className="banner banner-danger">🔒 Día cerrado — solo lectura</div>}
            {!isClosed && isAdmin && <div className="banner banner-warn">⚠️ Al cerrar el día los datos quedan guardados y no se pueden modificar.</div>}

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 40 }}>Cargando...</div>
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
                <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60 }}>
                    Sin sectores. Creá uno en ⚙️ Configuración.
                </div>
            )}

            {confirmCierre && (
                <Modal title="Cerrar el día" onClose={() => setConfirmCierre(false)}
                    footer={<>
                        <button className="btn btn-sec" onClick={() => setConfirmCierre(false)}>Cancelar</button>
                        <button className="btn btn-pri" onClick={handleCerrarDia}>Confirmar cierre</button>
                    </>}>
                    <div className="confirm-icon">🔒</div>
                    <div className="confirm-msg">
                        Vas a cerrar el inventario del<br />
                        <strong style={{ color: 'var(--text)' }}>{fmtDateLong(fecha)}</strong><br /><br />
                        Esta acción <strong style={{ color: 'var(--red)' }}>no se puede deshacer</strong>.
                    </div>
                </Modal>
            )}
        </div>
    )
}