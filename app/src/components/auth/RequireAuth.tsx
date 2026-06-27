import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { AuthLoading } from '@/components/auth/AuthLoading'
import { useAuth } from '@/contexts/AuthContext'

export function RequireAuth() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <AuthLoading />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
