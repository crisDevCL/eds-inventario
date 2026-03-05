import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import InventarioPage from './pages/InventarioPage'
import HistorialPage from './pages/HistorialPage'
import VerDiaPage from './pages/VerDiaPage'
import ConfigPage from './pages/ConfigPage'
import Layout from './components/Layout'
import Toast from './components/Toast'

function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()
  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)' }}>
      Cargando...
    </div>
  )
  if (!session) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<InventarioPage />} />
          <Route path="historial" element={<HistorialPage />} />
          <Route path="historial/:fecha" element={<VerDiaPage />} />
          <Route path="config" element={<ConfigPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast />
    </>
  )
}