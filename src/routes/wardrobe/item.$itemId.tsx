import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useClothingStore } from '@/stores/clothingStore'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trash } from 'lucide-react'

export const Route = createFileRoute('/wardrobe/item/$itemId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      itemId: params.itemId
    };
  },
})

function RouteComponent() {
  const { itemId } = Route.useLoaderData()
  const navigate = useNavigate()
  const items = useClothingStore((state) => state.items)
  const removeItem = useClothingStore((state) => state.removeItem)

  const item = items.find(i => i.id === itemId)

  if (!item) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-4">Item niet gevonden</p>
        <Button onClick={() => navigate({ to: '/wardrobe' })}>
          Terug naar kledingkast
        </Button>
      </div>
    )
  }

  const handleDelete = () => {
    if (confirm(`Weet je zeker dat je "${item.name}" wilt verwijderen?`)) {
      removeItem(itemId)
      navigate({ to: '/wardrobe' })
    }
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/wardrobe' })}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Terug naar kledingkast
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Foto links */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden border">
            <img
              src={item.images.thumbnail}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="w-full"
          >
            <Trash className="mr-2 h-4 w-4" />
            Verwijder item
          </Button>
        </div>

        {/* Details rechts */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
            {item.brand && (
              <p className="text-lg text-muted-foreground">{item.brand}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {item.category && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categorie</p>
                <p className="text-base capitalize">{item.category}</p>
              </div>
            )}

            {item.subcategory && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subcategorie</p>
                <p className="text-base capitalize">{item.subcategory}</p>
              </div>
            )}

            {item.size && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Maat</p>
                <p className="text-base">{item.size}</p>
              </div>
            )}

            {item.color && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Kleur</p>
                <p className="text-base capitalize">{item.color}</p>
              </div>
            )}

            {item.style && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stijl</p>
                <p className="text-base capitalize">{item.style}</p>
              </div>
            )}

            {item.material && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Materiaal</p>
                <p className="text-base capitalize">{item.material}</p>
              </div>
            )}

            {item.season && item.season.length > 0 && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Seizoen</p>
                <p className="text-base capitalize">{item.season.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
