import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { isBrowseSectionActive, NavLinks } from '@/components/nav/NavLinks'
import { renderWithProviders } from '@/test/test-utils'

describe('NavLinks', () => {
  it('highlights Dashboard on the dashboard route', () => {
    renderWithProviders(<NavLinks />, { route: '/dashboard' })

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('highlights Browse Roadmaps on the browse route', () => {
    renderWithProviders(<NavLinks />, { route: '/browse' })

    expect(
      screen.getByRole('link', { name: 'Browse Roadmaps' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  it('highlights Browse Roadmaps on roadmap routes', () => {
    renderWithProviders(<NavLinks />, { route: '/roadmaps/demo' })

    expect(
      screen.getByRole('link', { name: 'Browse Roadmaps' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  it('calls onNavigate when a link is clicked', async () => {
    const onNavigate = vi.fn()
    const user = userEvent.setup()

    renderWithProviders(<NavLinks onNavigate={onNavigate} />, {
      route: '/dashboard',
    })

    await user.click(screen.getByRole('link', { name: 'Dashboard' }))

    expect(onNavigate).toHaveBeenCalledOnce()
  })
})

describe('isBrowseSectionActive', () => {
  it('returns true for browse and roadmap paths', () => {
    expect(isBrowseSectionActive('/browse')).toBe(true)
    expect(isBrowseSectionActive('/roadmaps/demo')).toBe(true)
  })

  it('returns false for other paths', () => {
    expect(isBrowseSectionActive('/dashboard')).toBe(false)
  })
})
