import { Link } from 'react-router-dom'

import { MobileNav } from '@/components/nav/MobileNav'
import { NavLinks } from '@/components/nav/NavLinks'
import { UserMenu } from '@/components/nav/UserMenu'

export function TopNav() {
  return (
    <header className="border-border bg-background sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          to="/dashboard"
          className="text-foreground focus-visible:ring-ring shrink-0 rounded-md text-base font-semibold tracking-tight focus-visible:ring-2 focus-visible:outline-none"
        >
          LearnMap
        </Link>

        <nav
          aria-label="Main"
          className="hidden flex-1 items-center gap-1 md:flex"
        >
          <NavLinks />
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 md:flex-none">
          <MobileNav />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
