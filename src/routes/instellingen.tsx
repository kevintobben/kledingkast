import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/instellingen')({
  component: InstellingenPage,
})
function InstellingenPage() {

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mijn Instellingen</h1>
        </div>
      </div>



      {/* Modal outlet - hier renderen child routes */}
      <Outlet />
    </>
  )
}