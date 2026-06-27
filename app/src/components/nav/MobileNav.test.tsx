import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { MobileNav } from '@/components/nav/MobileNav'
import { renderWithProviders } from '@/test/test-utils'

describe('MobileNav', () => {
  it('opens a drawer with primary navigation links', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 })

    renderWithProviders(<MobileNav />, { route: '/dashboard' })

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
