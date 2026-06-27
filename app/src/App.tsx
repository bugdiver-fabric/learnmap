import { Route, Routes } from 'react-router-dom'

import { RequireAuth } from '@/components/auth/RequireAuth'
import { RequireGuest } from '@/components/auth/RequireGuest'
import { RequireNotOnboarded } from '@/components/auth/RequireNotOnboarded'
import { RequireOnboarded } from '@/components/auth/RequireOnboarded'
import { RootRedirect } from '@/components/auth/RootRedirect'
import { AppShell } from '@/layouts/AppShell'
import { AuthLayout } from '@/layouts/AuthLayout'
import { CatalogPage } from '@/pages/CatalogPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { RoadmapBuilderPage } from '@/pages/RoadmapBuilderPage'
import { RoadmapViewerPage } from '@/pages/RoadmapViewerPage'
import { SettingsPage } from '@/pages/SettingsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route element={<RequireGuest />}>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<RequireNotOnboarded />}>
          <Route
            path="/onboarding"
            element={
              <AuthLayout>
                <OnboardingPage />
              </AuthLayout>
            }
          />
        </Route>

        <Route element={<RequireOnboarded />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/browse" element={<CatalogPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/roadmaps/:id" element={<RoadmapViewerPage />} />
            <Route path="/roadmaps/:id/edit" element={<RoadmapBuilderPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
