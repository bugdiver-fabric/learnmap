import { Navigate } from 'react-router-dom'

import { AuthLoading } from '@/components/auth/AuthLoading'
import { useAuth } from '@/contexts/AuthContext'

export function RootRedirect() {
  const { isAuthenticated, isLoading, isOnboarded } = useAuth()

  if (isLoading) {
    return <AuthLoading />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />
  }

  return <Navigate to="/dashboard" replace />
}
