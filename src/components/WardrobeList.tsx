import { useClothingStore } from '@/stores/clothingStore'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

function groupBy<T>(array: T[], key: (item: T) => string) {
  return array.reduce((result, item) => {
    const group = key(item) || 'Overig'
    if (!result[group]) result[group] = []
    result[group].push(item)
    return result
  }, {} as Record<string, T[]>)
}

export function WardrobeList() {
  const navigate = useNavigate()
  const items = useClothingStore((state) => state.items)

  // Groepeer op categorie (case-insensitive, lege = 'Overig')
  const grouped = groupBy(items, item => (item.category || 'Overig').trim().toLowerCase())

  // Sorteer categorieën alfabetisch, maar zet 'Overig' altijd achteraan
  const sortedCategories = Object.keys(grouped)
    .sort((a, b) => {
      if (a === 'overig') return 1
      if (b === 'overig') return -1
      return a.localeCompare(b)
    })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mijn Kledingkast</h1>
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

      {items.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="mb-4">Je hebt nog geen items toegevoegd</p>
          <Button onClick={() => navigate({ to: '/wardrobe/toevoegen' })}>
            Voeg je eerste item toe
          </Button>
        </div>
      )}

      {sortedCategories.map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 capitalize">
            {category}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {grouped[category].map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-lg overflow-hidden border hover:border-primary transition-colors cursor-pointer"
                onClick={() => navigate({ to: '/wardrobe/item/$itemId', params: { itemId: item.id } })}
              >
                <img
                  src={item.images.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-sm font-medium truncate">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}