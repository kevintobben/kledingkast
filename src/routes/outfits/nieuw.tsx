import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/outfits/nieuw')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/outfits/nieuw"!</div>
}
