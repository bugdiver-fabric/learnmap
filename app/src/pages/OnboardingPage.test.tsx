import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'

import { RequireNotOnboarded } from '@/components/auth/RequireNotOnboarded'
import { createMockUser } from '@/contexts/AuthContext'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { renderWithProviders } from '@/test/test-utils'

describe('OnboardingPage', () => {
  it('completes onboarding and navigates to the dashboard', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <Routes>
        <Route element={<RequireNotOnboarded />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>,
      {
        route: '/onboarding',
        authUser: createMockUser({ onboardedAt: null }),
      },
    )

    await user.click(
      screen.getByRole('button', { name: 'Continue to dashboard' }),
    )

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    })
  })
})
