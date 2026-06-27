import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'

import { RequireNotOnboarded } from '@/components/auth/RequireNotOnboarded'
import { createMockUser } from '@/contexts/AuthContext'
import { renderWithProviders } from '@/test/test-utils'

describe('RequireNotOnboarded', () => {
  it('renders child routes when the user has not onboarded', () => {
    renderWithProviders(
      <Routes>
        <Route element={<RequireNotOnboarded />}>
          <Route path="/onboarding" element={<h1>Welcome to LearnMap</h1>} />
        </Route>
      </Routes>,
      {
        route: '/onboarding',
        authUser: createMockUser({ onboardedAt: null }),
      },
    )

    expect(
      screen.getByRole('heading', { name: 'Welcome to LearnMap' }),
    ).toBeInTheDocument()
  })

  it('redirects onboarded users to the dashboard', () => {
    renderWithProviders(
      <Routes>
        <Route element={<RequireNotOnboarded />}>
          <Route path="/onboarding" element={<h1>Welcome to LearnMap</h1>} />
        </Route>
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>,
      { route: '/onboarding' },
    )

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })
})
