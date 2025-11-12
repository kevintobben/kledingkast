import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useClothingStore } from '@/stores/clothingStore'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trash, Pencil } from 'lucide-react'

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
  const updateItem = useClothingStore((state) => state.updateItem)

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

  const handleEdit = () => {
    if (confirm(`Weet je zeker dat je "${item.name}" wilt bewerken?`)) {
      updateItem(itemId, item)
      navigate({ to: `/wardrobe/item/${itemId}` })  // Navigeer terug naar het item na bewerken
    }
  }

  const handleDelete = () => {
    if (confirm(`Weet je zeker dat je "${item.name}" wilt verwijderen?`)) {
      removeItem(itemId)
      navigate({ to: '/wardrobe' })
    }
  }

  return (
    <div className="kleding-info-container space-y-6">
      <div className="flex items-center">

        <div className='grow'>
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/wardrobe' })}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar kledingkast
          </Button>
        </div>

        <div className='flex justify-between gap-4'>
          <Button
            variant="default"
            onClick={handleEdit}
            className="w-auto"
          >
            <Pencil className="mr-2 h-4 w-4" />
              Bewerk item
          </Button>
                
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="w-auto"
          >
            <Trash className="mr-2 h-4 w-4" />
              Verwijder item
          </Button>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Foto links */}
        <div className="kleding-foto space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden border">
            <img
              src={item.images.thumbnail}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Details rechts */}
        <div className="kleding-details-container space-y-6">
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
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Outfits met dit item</h2>
            <p className="text-base text-muted-foreground">Deze functionaliteit is nog in ontwikkeling.</p>
            <div className="flex flex-wrap gap-2">
              {/* Hier komen de outfits waarin dit item voorkomt */}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
