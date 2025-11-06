import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/outfits/$outfitsId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/outfits/$outfitsId"!</div>
}
