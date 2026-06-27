import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export function OnboardingPage() {
  const { completeOnboarding } = useAuth()

  return (
    <div className="space-y-4 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome to LearnMap</h1>
      <p className="text-muted-foreground text-sm">
        Confirm your display name to continue. Full onboarding arrives with EP-001.
      </p>
      <Button type="button" onClick={completeOnboarding}>
        Continue to dashboard
      </Button>
    </div>
  )
}
