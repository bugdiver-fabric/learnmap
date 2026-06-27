import { Link, useParams } from 'react-router-dom'

export function RoadmapViewerPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Sample Roadmap</h1>
      <p className="text-muted-foreground text-sm">
        Roadmap viewer placeholder for <code className="text-foreground">{id}</code>.
      </p>
      <Link
        to={`/roadmaps/${id}/edit`}
        className="text-primary text-sm underline-offset-4 hover:underline"
      >
        Open edit view (breadcrumb demo)
      </Link>
    </div>
  )
}
