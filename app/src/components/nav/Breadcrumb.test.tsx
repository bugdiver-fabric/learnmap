import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'

import { Breadcrumb } from '@/components/nav/Breadcrumb'
import { AppShell } from '@/layouts/AppShell'
import { RoadmapViewerPage } from '@/pages/RoadmapViewerPage'
import { renderWithProviders } from '@/test/test-utils'

describe('Breadcrumb', () => {
  it('does not render on top-level pages', () => {
    renderWithProviders(
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Breadcrumb />} />
        </Route>
      </Routes>,
      { route: '/dashboard' },
    )

    expect(
      screen.queryByRole('navigation', { name: 'Breadcrumb' }),
    ).not.toBeInTheDocument()
  })

  it('renders clickable segments on nested roadmap pages', () => {
    renderWithProviders(
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/roadmaps/:id" element={<RoadmapViewerPage />} />
        </Route>
      </Routes>,
      { route: '/roadmaps/demo-id' },
    )

    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(
      within(breadcrumb).getByRole('link', { name: 'Browse Roadmaps' }),
    ).toHaveAttribute('href', '/browse')
    expect(within(breadcrumb).getByText('Sample Roadmap')).toBeInTheDocument()
  })
})
