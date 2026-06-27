import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { createMockUser } from '@/contexts/AuthContext'
import { renderWithProviders } from '@/test/test-utils'

import App from './App'

describe('App routing integration', () => {
  it('redirects / to the dashboard inside AppShell', () => {
    renderWithProviders(<App />, { route: '/' })

    expect(
      screen.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('keeps the top nav visible when navigating between shell routes', async () => {
    const user = userEvent.setup()

    renderWithProviders(<App />, { route: '/dashboard' })

    await user.click(screen.getByRole('link', { name: 'Browse Roadmaps' }))

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Browse Roadmaps' }),
    ).toBeInTheDocument()
  })

  it('renders login outside the app shell for guests', () => {
    renderWithProviders(<App />, {
      route: '/login',
      authUser: null,
    })

    expect(
      screen.getByRole('heading', { name: 'Sign in' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('banner')).not.toBeInTheDocument()
  })

  it('renders a 404 page for unknown routes', () => {
    renderWithProviders(<App />, { route: '/unknown-route' })

    expect(
      screen.getByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument()
  })

  it('runs the full onboarding to dashboard flow', async () => {
    const user = userEvent.setup()

    renderWithProviders(<App />, {
      route: '/dashboard',
      authUser: createMockUser({ onboardedAt: null }),
    })

    expect(
      screen.getByRole('heading', { name: 'Welcome to LearnMap' }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Continue to dashboard' }),
    )

    expect(
      screen.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument()
  })
})
