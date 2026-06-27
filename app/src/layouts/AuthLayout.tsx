import type { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background flex min-h-svh items-center justify-center p-6">
      <div className="border-border bg-card w-full max-w-md rounded-xl border p-8 shadow-sm">
        {children}
      </div>
    </div>
  )
}
