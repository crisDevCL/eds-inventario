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
