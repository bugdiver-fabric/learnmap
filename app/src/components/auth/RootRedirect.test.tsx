import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'

import { RootRedirect } from '@/components/auth/RootRedirect'
import { createMockUser } from '@/contexts/AuthContext'
import { renderWithProviders } from '@/test/test-utils'

describe('RootRedirect', () => {
  it('redirects unauthenticated users to login', () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<h1>Sign in</h1>} />
      </Routes>,
      { route: '/', authUser: null },
    )

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('redirects authenticated but not onboarded users to onboarding', () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/onboarding" element={<h1>Welcome to LearnMap</h1>} />
      </Routes>,
      {
        route: '/',
        authUser: createMockUser({ onboardedAt: null }),
      },
    )

    expect(
      screen.getByRole('heading', { name: 'Welcome to LearnMap' }),
    ).toBeInTheDocument()
  })

  it('redirects authenticated onboarded users to the dashboard', () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>,
      { route: '/' },
    )

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('shows loading while the session is checked', () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<RootRedirect />} />
      </Routes>,
      { route: '/', authLoading: true },
    )

    expect(screen.getByText('Loading session…')).toBeInTheDocument()
  })
})
