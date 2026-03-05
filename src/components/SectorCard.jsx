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
