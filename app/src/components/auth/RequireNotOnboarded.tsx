import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/contexts/AuthContext'

export function RequireNotOnboarded() {
  const { isOnboarded } = useAuth()

  if (isOnboarded) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
