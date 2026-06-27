export type BreadcrumbSegment = {
  label: string
  href: string
}

export function getBreadcrumbSegments(
  pathname: string,
  roadmapId?: string,
): BreadcrumbSegment[] | null {
  if (
    pathname === '/dashboard' ||
    pathname === '/browse' ||
    pathname === '/settings'
  ) {
    return null
  }

  if (roadmapId && pathname.startsWith('/roadmaps/')) {
    const segments: BreadcrumbSegment[] = [
      { label: 'Browse Roadmaps', href: '/browse' },
    ]

    if (pathname.endsWith('/edit')) {
      segments.push({
        label: 'Sample Roadmap',
        href: `/roadmaps/${roadmapId}`,
      })
      segments.push({ label: 'Edit', href: pathname })
      return segments
    }

    segments.push({ label: 'Sample Roadmap', href: pathname })
    return segments
  }

  return null
}
