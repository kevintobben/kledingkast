import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'

const RootLayout = () => (

  <SidebarProvider>
    <div className="w-full flex min-h-screen justify-center">
      <div className="flex w-full max-w-6xl min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-center">
              <NavigationMenu>
                <NavigationMenuList className="hidden md:flex gap-6 items-center">
                  <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                      <Link to="/" className="[&.active]:font-semibold [&.active]:text-primary [&.active]:underline">Home</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                      <Link to="/wardrobe" className="[&.active]:font-semibold [&.active]:text-primary [&.active]:underline">Kledingkast</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                      <Link to="/outfits" className="[&.active]:font-semibold [&.active]:text-primary [&.active]:underline">Outfits</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                      <Link to="/instellingen" className="[&.active]:font-semibold [&.active]:text-primary [&.active]:underline">Instellingen</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
                <div className="md:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <button
                        aria-label="Open menu"
                        className="rounded-md p-2 text-muted-foreground hover:bg-muted/80"
                      >
                        <MenuIcon className="size-5" />
                      </button>
                    </SheetTrigger>
                    <SheetContent side="bottom">
                      <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                      </SheetHeader>
                      <nav className="flex flex-col gap-2 p-2">
                        <Link
                          to="/"
                          className="py-2 [&.active]:font-semibold [&.active]:text-primary [&.active]:underline"
                        >
                          Home
                        </Link>
                        <Link
                          to="/wardrobe"
                          className="py-2 [&.active]:font-semibold [&.active]:text-primary [&.active]:underline"
                        >
                          Kledingkast
                        </Link>
                        <Link
                          to="/outfits"
                          className="py-2 [&.active]:font-semibold [&.active]:text-primary [&.active]:underline"
                        >
                          Outfits
                        </Link>
                        <Link
                          to="/instellingen"
                          className="py-2 [&.active]:font-semibold [&.active]:text-primary [&.active]:underline"
                        >
                          Instellingen
                        </Link>
                      </nav>
                    </SheetContent>
                  </Sheet>
                </div>
              </NavigationMenu>
            </div>
          </header>
          <main className="px-6 pb-8 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
      <TanStackRouterDevtools />
    </div>
  </SidebarProvider>
)

export const Route = createRootRoute({ component: RootLayout })