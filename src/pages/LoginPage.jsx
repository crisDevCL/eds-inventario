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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'linear-gradient(135deg, #0d2260 0%, #1a4fd6 50%, #38aef5 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Círculos decorativos de fondo */}
      <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', background:'rgba(255,255,255,.04)', top:-150, right:-100, pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:350, height:350, borderRadius:'50%', background:'rgba(255,255,255,.04)', bottom:-100, left:-80, pointerEvents:'none' }} />

      {/* Card */}
      <div style={{
        background: 'rgba(255,255,255,.97)',
        border: '1.5px solid rgba(255,255,255,.8)',
        borderRadius: 24,
        padding: '44px 36px',
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 24px 64px rgba(13,34,96,.3)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 70, height: 70,
            background: 'linear-gradient(135deg, #1a4fd6 0%, #38aef5 100%)',
            borderRadius: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem',
            margin: '0 auto 14px',
            boxShadow: '0 8px 24px rgba(26,79,214,.35)'
          }}>⛽</div>
          <div style={{ fontFamily:'Plus Jakarta Sans', fontWeight:800, fontSize:'1.6rem', color:'#0d2260', letterSpacing:'-.04em' }}>
            EDS Inventario
          </div>
          <div style={{ color:'#5a78b0', fontSize:'.88rem', marginTop:4, fontWeight:500 }}>
            Sistema de Inventario Digital
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="fg">
            <label className="fl">Email</label>
            <input
              className="fi"
              type="email"
              placeholder="usuario@eds.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="fg">
            <label className="fl">Contraseña</label>
            <input
              className="fi"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div style={{
              background: '#fee2e2', border: '1.5px solid rgba(220,38,38,.25)',
              borderRadius: 8, padding: '10px 14px',
              color: '#dc2626', fontSize: '.88rem',
              textAlign: 'center', marginBottom: 14, fontWeight: 500
            }}>
              ⚠️ {error}
            </div>
          )}

          <button className="btn btn-pri btn-full" type="submit" disabled={loading}
            style={{ fontSize:'1rem', padding:'13px', marginTop:4 }}>
            {loading ? '⏳ Ingresando...' : 'Ingresar →'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div style={{ color:'rgba(255,255,255,.4)', fontSize:'.75rem', marginTop:24, fontWeight:500 }}>
        EDS Inventario Digital
      </div>
    </div>
  )
}
