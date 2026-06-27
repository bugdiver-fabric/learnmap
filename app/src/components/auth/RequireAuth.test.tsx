import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'

import { RequireAuth } from '@/components/auth/RequireAuth'
import { renderWithProviders } from '@/test/test-utils'

function ProtectedPage() {
  return <h1>Protected content</h1>
}

describe('RequireAuth', () => {
  it('renders child routes when authenticated', () => {
    renderWithProviders(
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<ProtectedPage />} />
        </Route>
      </Routes>,
      { route: '/dashboard' },
    )

    expect(
      screen.getByRole('heading', { name: 'Protected content' }),
    ).toBeInTheDocument()
  })

  it('redirects unauthenticated users to login', () => {
    renderWithProviders(
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<ProtectedPage />} />
        </Route>
        <Route path="/login" element={<h1>Sign in</h1>} />
      </Routes>,
      { route: '/dashboard', authUser: null },
    )

    expect(
      screen.getByRole('heading', { name: 'Sign in' }),
    ).toBeInTheDocument()
  })

  it('shows loading while the session is checked', () => {
    renderWithProviders(
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<ProtectedPage />} />
        </Route>
      </Routes>,
      { route: '/dashboard', authLoading: true },
    )

    expect(screen.getByText('Loading session…')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Protected content' }),
    ).not.toBeInTheDocument()
  })
})
