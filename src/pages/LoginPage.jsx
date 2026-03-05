import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch {
      setError('Email o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, padding:'36px 32px', width:'100%', maxWidth:380 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontFamily:'Syne', fontWeight:800, fontSize:'2.2rem', color:'var(--accent)', letterSpacing:-1 }}>⛽ EDS</div>
          <div style={{ color:'var(--muted)', fontSize:'.82rem', marginTop:4 }}>Sistema de Inventario Digital</div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="fg">
            <label className="fl">Email</label>
            <input className="fi" type="email" placeholder="usuario@eds.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required />
          </div>
          <div className="fg">
            <label className="fl">Contraseña</label>
            <input className="fi" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required />
          </div>
          {error && <div style={{ color:'var(--red)', fontSize:'.82rem', textAlign:'center', marginBottom:12 }}>{error}</div>}
          <button className="btn btn-pri btn-full" type="submit" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
        </form>
      </div>
    </div>
  )
}
