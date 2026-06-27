import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type AuthUser = {
  id: string
  email: string
  displayName: string
  avatarUrl: string | null
  onboardedAt: string | null
}

const DEFAULT_MOCK_USER: AuthUser = {
  id: '00000000-0000-4000-8000-000000000001',
  email: 'dev@learnmap.io',
  displayName: 'Dev User',
  avatarUrl: null,
  onboardedAt: '2026-01-01T00:00:00.000Z',
}

const SESSION_STORAGE_KEY = 'learnmap.mockSession'

type AuthContextValue = {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  isOnboarded: boolean
  signOut: () => void
  completeOnboarding: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') {
    return DEFAULT_MOCK_USER
  }

  const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (raw === 'signed-out') {
    return null
  }

  return DEFAULT_MOCK_USER
}

function writeStoredSession(user: AuthUser | null) {
  if (typeof window === 'undefined') {
    return
  }

  if (user) {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY)
  } else {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, 'signed-out')
  }
}

export type AuthProviderProps = {
  children: ReactNode
  /** Test override — skips async session bootstrap when set */
  initialUser?: AuthUser | null
  initialLoading?: boolean
}

export function AuthProvider({
  children,
  initialUser,
  initialLoading,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    initialUser !== undefined ? initialUser : null,
  )
  const [isLoading, setIsLoading] = useState(
    initialLoading ?? initialUser === undefined,
  )

  useEffect(() => {
    if (initialUser !== undefined) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setUser(readStoredUser())
      setIsLoading(false)
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [initialUser])

  const signOut = useCallback(() => {
    setUser(null)
    writeStoredSession(null)
  }, [])

  const completeOnboarding = useCallback(() => {
    setUser((current) => {
      if (!current) {
        return current
      }

      const onboardedUser = {
        ...current,
        onboardedAt: new Date().toISOString(),
      }
      writeStoredSession(onboardedUser)
      return onboardedUser
    })
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      isOnboarded: user?.onboardedAt != null,
      signOut,
      completeOnboarding,
    }),
    [completeOnboarding, isLoading, signOut, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function createMockUser(
  overrides: Partial<AuthUser> = {},
): AuthUser {
  return { ...DEFAULT_MOCK_USER, ...overrides }
}
