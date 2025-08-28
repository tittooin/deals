import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/useAuth'

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useAuth()
  if (!initialized) return null
  if (!user) return <Navigate to="/auth" replace />
  return <>{children}</>
}
