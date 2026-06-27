import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TopNav } from '@/components/nav/TopNav'
import { renderWithProviders } from '@/test/test-utils'

describe('TopNav', () => {
  it('links the LearnMap logo to /dashboard', () => {
    renderWithProviders(<TopNav />, { route: '/dashboard' })

    expect(screen.getByRole('link', { name: 'LearnMap' })).toHaveAttribute(
      'href',
      '/dashboard',
    )
  })

  it('exposes main navigation landmarks', () => {
    renderWithProviders(<TopNav />, { route: '/dashboard' })

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
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
