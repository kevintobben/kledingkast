import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/outfits/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/outfits/"!</div>
}
