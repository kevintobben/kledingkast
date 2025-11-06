import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useClothingStore } from '@/stores/clothingStore'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/outfits/')({
  component: OutfitsPage,
})

function OutfitsPage() {
  const navigate = useNavigate()
  const items = useClothingStore((state) => state.items)

  return (
    <>
      {/* Background content - blijft zichtbaar onder modal */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mijn outfits</h1>
          
          <Button 
            onClick={() => navigate({ to: '/outfits/nieuw' })}
            size="lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Outfit Toevoegen
          </Button>
        </div>

        {/* Grid met items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate({ to: '/wardrobe/item/$itemId', params: { itemId: item.id } })}
              className="group relative aspect-square rounded-lg overflow-hidden border hover:border-primary transition-colors"
            >
              <img 
                src={item.images.thumbnail} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 from-black/60 to-transparent p-3">
                <p className="text-white text-sm font-medium truncate">
                  {item.name}
                </p>
              </div>
            </button>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="mb-4">Je hebt nog geen outfits</p>
            <Button onClick={() => navigate({ to: '/outfits/nieuw' })}>
              Voeg je eerste outfit toe
            </Button>
          </div>
        )}
      </div>

      {/* Modal outlet - hier renderen child routes */}
      <Outlet />
    </>
  )
}