import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'

import { AppShell } from '@/layouts/AppShell'
import { renderWithProviders } from '@/test/test-utils'

describe('AppShell', () => {
  it('renders persistent top nav and page content', () => {
    renderWithProviders(
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Route>
      </Routes>,
      { route: '/dashboard' },
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('does not show breadcrumb on top-level pages', () => {
    renderWithProviders(
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Route>
      </Routes>,
      { route: '/dashboard' },
    )

    expect(
      screen.queryByRole('navigation', { name: 'Breadcrumb' }),
    ).not.toBeInTheDocument()
  })
})
