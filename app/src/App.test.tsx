import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { getBreadcrumbSegments } from '@/lib/breadcrumb'
import { createMockUser } from '@/contexts/AuthContext'
import { TopNav } from '@/components/nav/TopNav'
import { renderWithProviders } from '@/test/test-utils'

import App from './App'

describe('App shell routing (#14)', () => {
  it('redirects / to the dashboard inside AppShell', () => {
    renderWithProviders(<App />, { route: '/' })

    expect(
      screen.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
  })

  it('renders shell-backed browse page with primary nav links', () => {
    renderWithProviders(<App />, { route: '/browse' })

    expect(
      screen.getByRole('heading', { name: 'Browse Roadmaps' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'LearnMap' })).toHaveAttribute(
      'href',
      '/dashboard',
    )
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Browse Roadmaps' }),
    ).toBeInTheDocument()
  })

  it('keeps the top nav visible when navigating between shell routes', async () => {
    const user = userEvent.setup()

    renderWithProviders(<App />, { route: '/dashboard' })

    expect(screen.getByRole('banner')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Browse Roadmaps' }))

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Browse Roadmaps' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Browse Roadmaps' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  it('renders the login page outside AppShell', () => {
    renderWithProviders(<App />, {
      route: '/login',
      authUser: null,
    })

    expect(
      screen.getByRole('heading', { name: 'Sign in' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('banner')).not.toBeInTheDocument()
  })
})

describe('TopNav (#14)', () => {
  it('links the LearnMap logo to /dashboard', () => {
    renderWithProviders(<TopNav />, { route: '/dashboard' })

    expect(screen.getByRole('link', { name: 'LearnMap' })).toHaveAttribute(
      'href',
      '/dashboard',
    )
  })

  it('highlights Dashboard on the dashboard route', () => {
    renderWithProviders(<TopNav />, { route: '/dashboard' })

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('highlights Browse Roadmaps on the browse route', () => {
    renderWithProviders(<TopNav />, { route: '/browse' })

    expect(
      screen.getByRole('link', { name: 'Browse Roadmaps' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  it('highlights Browse Roadmaps on roadmap routes', () => {
    renderWithProviders(<TopNav />, {
      route: '/roadmaps/frontend-basics',
    })

    expect(
      screen.getByRole('link', { name: 'Browse Roadmaps' }),
    ).toHaveAttribute('aria-current', 'page')
  })
})

describe('UserMenu (#15)', () => {
  it('shows the user details and navigates to login on sign out', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    renderWithProviders(<App />, { route: '/dashboard' })

    await user.click(screen.getByRole('button', { name: 'Open user menu' }))

    expect(await screen.findByText('Dev User')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Profile & Settings' })).toHaveAttribute(
      'href',
      '/settings',
    )

    await user.click(screen.getByRole('menuitem', { name: 'Sign out' }))

    expect(
      screen.getByRole('heading', { name: 'Sign in' }),
    ).toBeInTheDocument()
  })
})

describe('Breadcrumb (#16)', () => {
  it('returns null for top-level pages', () => {
    expect(getBreadcrumbSegments('/dashboard')).toBeNull()
    expect(getBreadcrumbSegments('/browse')).toBeNull()
  })

  it('renders breadcrumb navigation on nested roadmap pages', () => {
    renderWithProviders(<App />, { route: '/roadmaps/demo-id' })

    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(
      within(breadcrumb).getByRole('link', { name: 'Browse Roadmaps' }),
    ).toHaveAttribute('href', '/browse')
    expect(within(breadcrumb).getByText('Sample Roadmap')).toBeInTheDocument()
  })

  it('does not render breadcrumb on dashboard', () => {
    renderWithProviders(<App />, { route: '/dashboard' })

    expect(
      screen.queryByRole('navigation', { name: 'Breadcrumb' }),
    ).not.toBeInTheDocument()
  })
})

describe('Mobile nav (#17)', () => {
  it('opens a drawer with the same primary links', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    renderWithProviders(<App />, { route: '/dashboard' })

    await user.click(
      screen.getByRole('button', { name: 'Open navigation menu' }),
    )

    const drawer = await screen.findByRole('dialog')
    expect(
      within(drawer).getByRole('link', { name: 'Dashboard' }),
    ).toBeInTheDocument()
    expect(
      within(drawer).getByRole('link', { name: 'Browse Roadmaps' }),
    ).toBeInTheDocument()
  })
})

describe('Route guards and 404 (#18)', () => {
  it('redirects unauthenticated users to login', () => {
    renderWithProviders(<App />, {
      route: '/dashboard',
      authUser: null,
    })

    expect(
      screen.getByRole('heading', { name: 'Sign in' }),
    ).toBeInTheDocument()
  })

  it('redirects authenticated but not onboarded users to onboarding', () => {
    renderWithProviders(<App />, {
      route: '/dashboard',
      authUser: createMockUser({ onboardedAt: null }),
    })

    expect(
      screen.getByRole('heading', { name: 'Welcome to LearnMap' }),
    ).toBeInTheDocument()
  })

  it('shows a loading state while the session is checked', () => {
    renderWithProviders(<App />, {
      route: '/dashboard',
      authLoading: true,
    })

    expect(screen.getByText('Loading session…')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Dashboard' }),
    ).not.toBeInTheDocument()
  })

  it('renders a 404 page with a link back to the dashboard', async () => {
    renderWithProviders(<App />, { route: '/unknown-route' })

    expect(
      screen.getByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to dashboard' })).toHaveAttribute(
      'href',
      '/dashboard',
    )
  })

  it('allows onboarding completion to reach the dashboard', async () => {
    const user = userEvent.setup()

    renderWithProviders(<App />, {
      route: '/onboarding',
      authUser: createMockUser({ onboardedAt: null }),
    })

    await user.click(
      screen.getByRole('button', { name: 'Continue to dashboard' }),
    )

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Dashboard' }),
      ).toBeInTheDocument()
    })
  })
})
