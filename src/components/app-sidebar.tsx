import {
  HomeIcon,
  Shirt,
  Layers,
  Settings,
} from "lucide-react"

import type { ComponentType } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Link } from '@tanstack/react-router'

// Sidebar menu items
const items: { title: string; to: string; icon?: ComponentType<{ size?: number }> }[] = [
  {
    title: "Home",
    to: "/",
    icon: HomeIcon,
  },
  {
    title: "Kledingkast",
    to: "/wardrobe",
    icon: Shirt,
  },
  {
    title: "Outfits",
    to: "/outfits",
    icon: Layers,
  },
  {
    title: "Instellingen",
    to: "/instellingen",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigeer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.to}
                      className={
                        "flex items-center gap-2 px-2 py-1 text-muted-foreground [&.active]:text-primary [&.active]:font-semibold"
                      }
                    >
                      {/** render icon only if provided */}
                      {item.icon ? (
                        // `item.icon` is a component (e.g. lucide-react icon)
                        // assign to Uppercase to treat as a component
                        (() => {
                          const Icon = item.icon
                          return <Icon size={18} />
                        })()
                      ) : null}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
