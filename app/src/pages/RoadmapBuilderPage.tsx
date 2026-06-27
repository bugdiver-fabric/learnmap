import { Link, useParams } from 'react-router-dom'

export function RoadmapBuilderPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Roadmap</h1>
      <p className="text-muted-foreground text-sm">
        Builder placeholder for <code className="text-foreground">{id}</code>.
      </p>
      <Link
        to={`/roadmaps/${id}`}
        className="text-primary text-sm underline-offset-4 hover:underline"
      >
        Back to roadmap viewer
      </Link>
    </div>
  )
}
