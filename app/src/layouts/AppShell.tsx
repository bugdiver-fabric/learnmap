import { Outlet } from 'react-router-dom'

import { Breadcrumb } from '@/components/nav/Breadcrumb'
import { TopNav } from '@/components/nav/TopNav'

export function AppShell() {
  return (
    <div className="bg-background flex min-h-svh flex-col">
      <TopNav />
      <Breadcrumb />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
