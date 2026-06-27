import { ChevronRight } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'

import { getBreadcrumbSegments } from '@/lib/breadcrumb'

export function Breadcrumb() {
  const { pathname } = useLocation()
  const { id: roadmapId } = useParams()
  const segments = getBreadcrumbSegments(pathname, roadmapId)

  if (!segments || segments.length === 0) {
    return null
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="border-border bg-muted/30 border-b"
    >
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-2 text-sm sm:px-6">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1

          return (
            <li key={segment.href} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden
                  className="text-muted-foreground size-3.5 shrink-0"
                />
              ) : null}
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-foreground font-medium"
                >
                  {segment.label}
                </span>
              ) : (
                <Link
                  to={segment.href}
                  className="text-muted-foreground hover:text-foreground rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {segment.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
