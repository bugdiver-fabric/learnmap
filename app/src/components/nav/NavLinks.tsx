import { Link, NavLink, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    isActive
      ? 'bg-accent text-accent-foreground'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
  )

type NavLinksProps = {
  className?: string
  onNavigate?: () => void
}

export function NavLinks({ className, onNavigate }: NavLinksProps) {
  const { pathname } = useLocation()
  const isBrowseActive =
    pathname === '/browse' || pathname.startsWith('/roadmaps/')

  return (
    <div className={cn('flex flex-col gap-1 md:flex-row md:items-center', className)}>
      <NavLink to="/dashboard" className={navLinkClassName} onClick={onNavigate}>
        Dashboard
      </NavLink>
      <Link
        to="/browse"
        aria-current={isBrowseActive ? 'page' : undefined}
        className={navLinkClassName({ isActive: isBrowseActive })}
        onClick={onNavigate}
      >
        Browse Roadmaps
      </Link>
    </div>
  )
}

export function isBrowseSectionActive(pathname: string): boolean {
  return pathname === '/browse' || pathname.startsWith('/roadmaps/')
}
