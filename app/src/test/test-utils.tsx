import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'

import {
  AuthProvider,
  createMockUser,
  type AuthUser,
} from '@/contexts/AuthContext'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

type RenderWithProvidersOptions = RenderOptions & {
  route?: string
  authUser?: AuthUser | null
  authLoading?: boolean
}

export function renderWithProviders(
  ui: ReactElement,
  {
    route = '/',
    authUser = createMockUser(),
    authLoading = false,
    ...options
  }: RenderWithProvidersOptions = {},
) {
  const queryClient = createTestQueryClient()

  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider initialUser={authUser} initialLoading={authLoading}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>,
    options,
  )
}
