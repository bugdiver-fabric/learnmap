import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'

import { UserMenu } from '@/components/nav/UserMenu'
import { LoginPage } from '@/pages/LoginPage'
import { renderWithProviders } from '@/test/test-utils'

describe('UserMenu', () => {
  it('shows avatar initials when no avatar URL is set', () => {
    renderWithProviders(<UserMenu />, { route: '/dashboard' })

    expect(screen.getByText('DU')).toBeInTheDocument()
  })

  it('shows the user details in the dropdown', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    renderWithProviders(<UserMenu />, { route: '/dashboard' })

    await user.click(screen.getByRole('button', { name: 'Open user menu' }))

    expect(await screen.findByText('Dev User')).toBeInTheDocument()
    expect(screen.getByText('dev@learnmap.io')).toBeInTheDocument()
  })

  it('links Profile & Settings to /settings', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    renderWithProviders(<UserMenu />, { route: '/dashboard' })

    await user.click(screen.getByRole('button', { name: 'Open user menu' }))
    await screen.findByText('Dev User')

    expect(
      screen.getByRole('menuitem', { name: 'Profile & Settings' }),
    ).toHaveAttribute('href', '/settings')
  })

  it('signs out and navigates to login', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    renderWithProviders(
      <Routes>
        <Route path="/dashboard" element={<UserMenu />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>,
      { route: '/dashboard' },
    )

    await user.click(screen.getByRole('button', { name: 'Open user menu' }))
    await screen.findByText('Dev User')
    await user.click(screen.getByRole('menuitem', { name: 'Sign out' }))

    expect(
      screen.getByRole('heading', { name: 'Sign in' }),
    ).toBeInTheDocument()
  })

  it('renders nothing when there is no user', () => {
    renderWithProviders(<UserMenu />, {
      route: '/dashboard',
      authUser: null,
    })

    expect(
      screen.queryByRole('button', { name: 'Open user menu' }),
    ).not.toBeInTheDocument()
  })
})
