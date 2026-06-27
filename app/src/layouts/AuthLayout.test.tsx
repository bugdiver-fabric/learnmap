import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AuthLayout } from '@/layouts/AuthLayout'
import { renderWithProviders } from '@/test/test-utils'

describe('AuthLayout', () => {
  it('renders children inside a centred card layout', () => {
    renderWithProviders(
      <AuthLayout>
        <h1>Sign in</h1>
      </AuthLayout>,
    )

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument()
  })
})
