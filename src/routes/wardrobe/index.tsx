import { createFileRoute, Outlet } from '@tanstack/react-router'
import { WardrobeList } from '../../components/WardrobeList'

export const Route = createFileRoute('/wardrobe/')({
  component: WardrobePage,
})

function WardrobePage() {
  return (
    <>
      <WardrobeList />
      <Outlet />
    </>
  )
}