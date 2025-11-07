// routes/wardrobe/index.tsx
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useClothingStore } from '@/stores/clothingStore'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/wardrobe/')({
  component: WardrobePage,
})

function WardrobePage() {
  const navigate = useNavigate()
  const items = useClothingStore((state) => state.items)

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mijn Kledingkast</h1>
          {/* Toon de + knop alleen als er items zijn */}
          {items.length > 0 && (
            <Button 
              onClick={() => navigate({ to: '/wardrobe/toevoegen' })}
              size="lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Item Toevoegen
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative aspect-square rounded-lg overflow-hidden border hover:border-primary transition-colors">
              <img 
                src={item.images.thumbnail} 
                alt={item.name}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 from-black/60 to-transparent p-3 flex justify-between items-center">
                <p className="text-white text-sm font-medium truncate">
                  {/* {item.name} */}
                </p>
                {/* <Button
                  onClick={() => useClothingStore.getState().removeItem(item.id)}
                  className="ml-2 text-xs text-red-600 bg-transparent hover:bg-red-100"
                  title="Verwijder item"
                >
                  <Trash />
                </Button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Toon de "Voeg je eerste item toe" alleen als er geen items zijn */}
        {items.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="mb-4">Je hebt nog geen items toegevoegd</p>
            <Button onClick={() => navigate({ to: '/wardrobe/toevoegen' })}>
              Voeg je eerste item toe
            </Button>
          </div>
        )}
      </div>

      <Outlet />
    </>
  )
}