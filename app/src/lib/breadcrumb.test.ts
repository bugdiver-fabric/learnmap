import { describe, expect, it } from 'vitest'

import { getBreadcrumbSegments } from './breadcrumb'

describe('getBreadcrumbSegments', () => {
  it('returns null for top-level pages', () => {
    expect(getBreadcrumbSegments('/dashboard')).toBeNull()
    expect(getBreadcrumbSegments('/browse')).toBeNull()
    expect(getBreadcrumbSegments('/settings')).toBeNull()
  })

  it('builds segments for a roadmap viewer page', () => {
    expect(getBreadcrumbSegments('/roadmaps/abc', 'abc')).toEqual([
      { label: 'Browse Roadmaps', href: '/browse' },
      { label: 'Sample Roadmap', href: '/roadmaps/abc' },
    ])
  })

  it('builds segments for a roadmap edit page', () => {
    expect(getBreadcrumbSegments('/roadmaps/abc/edit', 'abc')).toEqual([
      { label: 'Browse Roadmaps', href: '/browse' },
      { label: 'Sample Roadmap', href: '/roadmaps/abc' },
      { label: 'Edit', href: '/roadmaps/abc/edit' },
    ])
  })
})
