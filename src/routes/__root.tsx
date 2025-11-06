import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/wardrobe" className="[&.active]:font-bold">
        Kledingkast
      </Link>
      <Link to="/outfits" className="[&.active]:font-bold">
        Outfits
      </Link>
        <Link to="/instellingen" className="[&.active]:font-bold">
          Instellingen
        </Link>
    </div>
    <hr />
    <main className="container mx-auto px-4 py-8">
      <Outlet />
    </main>
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })