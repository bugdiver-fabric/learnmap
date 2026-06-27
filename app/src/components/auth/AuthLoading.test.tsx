import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AuthLoading } from '@/components/auth/AuthLoading'
import { renderWithProviders } from '@/test/test-utils'

describe('AuthLoading', () => {
  it('shows an accessible loading state', () => {
    renderWithProviders(<AuthLoading />)

    expect(screen.getByText('Loading session…')).toBeInTheDocument()
    expect(document.querySelector('[aria-busy="true"]')).toBeInTheDocument()
  })
})
