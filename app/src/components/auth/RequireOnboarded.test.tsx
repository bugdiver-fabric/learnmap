import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'

import { RequireOnboarded } from '@/components/auth/RequireOnboarded'
import { createMockUser } from '@/contexts/AuthContext'
import { renderWithProviders } from '@/test/test-utils'

function ProtectedPage() {
  return <h1>Dashboard</h1>
}

describe('RequireOnboarded', () => {
  it('renders child routes when the user is onboarded', () => {
    renderWithProviders(
      <Routes>
        <Route element={<RequireOnboarded />}>
          <Route path="/dashboard" element={<ProtectedPage />} />
        </Route>
      </Routes>,
      { route: '/dashboard' },
    )

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('redirects users who have not onboarded', () => {
    renderWithProviders(
      <Routes>
        <Route element={<RequireOnboarded />}>
          <Route path="/dashboard" element={<ProtectedPage />} />
        </Route>
        <Route path="/onboarding" element={<h1>Welcome to LearnMap</h1>} />
      </Routes>,
      {
        route: '/dashboard',
        authUser: createMockUser({ onboardedAt: null }),
      },
    )

    expect(
      screen.getByRole('heading', { name: 'Welcome to LearnMap' }),
    ).toBeInTheDocument()
  })
})
