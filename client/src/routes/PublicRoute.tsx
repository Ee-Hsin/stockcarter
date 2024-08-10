import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/dashboard" />
  } else {
    return <>{children}</>
  }
}
