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
