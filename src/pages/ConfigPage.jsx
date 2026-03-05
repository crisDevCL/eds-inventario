import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSectores } from '../hooks/useSectores'
import Modal from '../components/Modal'
import { showToast } from '../components/Toast'

const COLORS = ['#e8b84b', '#e8733a', '#4be8a0', '#5b8de0', '#9b6fe0', '#e05252', '#4bcce8', '#e8e84b', '#e080b8', '#80e840', '#e84b9b', '#4b9be8']

export default function ConfigPage() {
    const { isAdmin } = useAuth()
    const { sectores, addSector, updateSector, deleteSector } = useSectores()
    const [sectorModal, setSectorModal] = useState(null) // null | { mode: 'add'|'edit', sector? }
    const [form, setForm] = useState({ nombre: '', color: COLORS[0] })

    if (!isAdmin) return <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60 }}>Acceso restringido.</div>

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
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.2rem' }}>⚙️ Configuración</div>
                <div style={{ color: 'var(--muted)', fontSize: '.75rem' }}>Solo administradores</div>
            </div>

            {/* Usuarios info */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)', marginBottom: 14 }}>
                <div style={{ padding: '13px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontFamily: 'Syne', fontWeight: 700, flex: 1 }}>👥 Gestión de usuarios</div>
                </div>
                <div style={{ padding: 16 }}>
                    <div className="banner banner-info">
                        Los usuarios se crean desde el panel de Supabase: <strong>Authentication → Users → Invite user</strong>.
                        Después de crear el usuario, ejecutá este SQL para asignarle rol admin:
                    </div>
                    <pre style={{ marginTop: 8 }}>{`UPDATE profiles SET role = 'admin' WHERE id = 'UUID_DEL_USUARIO';`}</pre>
                </div>
            </div>

            {/* Sectores */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r)' }}>
                <div style={{ padding: '13px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontFamily: 'Syne', fontWeight: 700, flex: 1 }}>📁 Sectores</div>
                    <button className="btn btn-pri btn-sm" onClick={openAdd}>+ Sector</button>
                </div>
                <div style={{ padding: 16 }}>
                    {sectores.map(s => (
                        <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--rs)', padding: '10px 12px', marginBottom: 8 }}>
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                            <div style={{ flex: 1, fontWeight: 500 }}>{s.nombre} <span style={{ color: 'var(--muted)', fontSize: '.72rem' }}>({s.productos?.length || 0} prod.)</span></div>
                            <button className="btn btn-ghost btn-sm" onClick={() => openEdit(s)}>✏️</button>
                        </div>
                    ))}
                </div>
            </div>

            {sectorModal && (
                <Modal title={sectorModal.mode === 'add' ? 'Nuevo sector' : 'Editar sector'} onClose={() => setSectorModal(null)}
                    footer={<>
                        {sectorModal.mode === 'edit' && <button className="btn btn-dng" style={{ marginRight: 'auto' }} onClick={handleDeleteSector}>Eliminar</button>}
                        <button className="btn btn-sec" onClick={() => setSectorModal(null)}>Cancelar</button>
                        <button className="btn btn-pri" onClick={handleSaveSector}>{sectorModal.mode === 'add' ? 'Crear' : 'Guardar'}</button>
                    </>}>
                    <div className="fg">
                        <label className="fl">Nombre</label>
                        <input className="fi" autoFocus value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
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