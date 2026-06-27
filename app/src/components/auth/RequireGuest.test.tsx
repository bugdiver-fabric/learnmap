import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'

import { RequireGuest } from '@/components/auth/RequireGuest'
import { createMockUser } from '@/contexts/AuthContext'
import { renderWithProviders } from '@/test/test-utils'

describe('RequireGuest', () => {
  it('renders guest routes for unauthenticated users', () => {
    renderWithProviders(
      <Routes>
        <Route element={<RequireGuest />}>
          <Route path="/login" element={<h1>Sign in</h1>} />
        </Route>
      </Routes>,
      { route: '/login', authUser: null },
    )

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('redirects authenticated onboarded users to the dashboard', () => {
    renderWithProviders(
      <Routes>
        <Route element={<RequireGuest />}>
          <Route path="/login" element={<h1>Sign in</h1>} />
        </Route>
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>,
      { route: '/login' },
    )

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('redirects authenticated but not onboarded users to onboarding', () => {
    renderWithProviders(
      <Routes>
        <Route element={<RequireGuest />}>
          <Route path="/login" element={<h1>Sign in</h1>} />
        </Route>
        <Route path="/onboarding" element={<h1>Welcome to LearnMap</h1>} />
      </Routes>,
      {
        route: '/login',
        authUser: createMockUser({ onboardedAt: null }),
      },
    )

    expect(
      screen.getByRole('heading', { name: 'Welcome to LearnMap' }),
    ).toBeInTheDocument()
  })

  it('shows loading while the session is checked', () => {
    renderWithProviders(
      <Routes>
        <Route element={<RequireGuest />}>
          <Route path="/login" element={<h1>Sign in</h1>} />
        </Route>
      </Routes>,
      { route: '/login', authLoading: true },
    )

    expect(screen.getByText('Loading session…')).toBeInTheDocument()
  })
})
