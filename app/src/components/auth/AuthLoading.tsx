import { Loader2 } from 'lucide-react'

export function AuthLoading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="bg-background flex min-h-svh items-center justify-center"
    >
      <Loader2
        aria-hidden
        className="text-muted-foreground size-8 animate-spin"
      />
      <span className="sr-only">Loading session…</span>
    </div>
  )
}
