import { Navigate, Outlet } from 'react-router-dom'

import { AuthLoading } from '@/components/auth/AuthLoading'
import { useAuth } from '@/contexts/AuthContext'

export function RequireGuest() {
  const { isAuthenticated, isLoading, isOnboarded } = useAuth()

  if (isLoading) {
    return <AuthLoading />
  }

  if (isAuthenticated && isOnboarded) {
    return <Navigate to="/dashboard" replace />
  }

  if (isAuthenticated && !isOnboarded) {
    return <Navigate to="/onboarding" replace />
  }

  return <Outlet />
}
