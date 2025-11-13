import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useClothingStore } from '@/stores/clothingStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Trash, Pencil, X, Check } from 'lucide-react'
import { useState } from 'react'

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

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: item?.name || '',
    category: item?.category || '',
    subcategory: item?.subcategory || '',
    brand: item?.brand || '',
    size: item?.size || '',
    style: item?.style || '',
    color: item?.color || '',
    material: item?.material || '',
  })

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
    setIsEditing(true)
    setEditForm({
      name: item.name,
      category: item.category,
      subcategory: item.subcategory,
      brand: item.brand,
      size: item.size,
      style: item.style,
      color: item.color,
      material: item.material,
    })
  }

  const handleSave = () => {
    updateItem(itemId, editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditForm({
      name: item.name,
      category: item.category,
      subcategory: item.subcategory,
      brand: item.brand,
      size: item.size,
      style: item.style,
      color: item.color,
      material: item.material,
    })
  }

  const handleDelete = () => {
    if (confirm(`Weet je zeker dat je "${item.name}" wilt verwijderen?`)) {
      removeItem(itemId)
      navigate({ to: '/wardrobe' })
    }
  }

  return (
    <div className="item-container space-y-6">
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

        {!isEditing ? (
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
        ) : (
          <div className='flex justify-between gap-4'>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-auto"
            >
              <X className="mr-2 h-4 w-4" />
                Annuleren
            </Button>

            <Button
              variant="default"
              onClick={handleSave}
              className="w-auto"
            >
              <Check className="mr-2 h-4 w-4" />
                Opslaan
            </Button>
          </div>
        )}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="item-foto-container space-y-4 col-span-1">
          <div className="h-96 w-full flex items-center justify-center overflow-hidden">
            <img
              src={item.images.thumbnail}
              alt={item.name}
              className="h-full object-contain"
            />
          </div>
        </div>

        {/* Details rechts */}
        <div className="item-details-container space-y-6 col-span-2">
          {!isEditing ? (
            <>
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
            </>
          ) : (
            <div className="space-y-4">
              <div className="grid w-full gap-3">
                <Label htmlFor="edit-name">Naam item</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                  placeholder="Bijv. T-shirt"
                />
              </div>
              <div className="grid w-full gap-3">
                <Label htmlFor="edit-category">Categorie</Label>
                <Input
                  id="edit-category"
                  value={editForm.category}
                  onChange={e => setEditForm({...editForm, category: e.target.value})}
                  placeholder="Bijv. sweaters"
                />
              </div>
              <div className="grid w-full gap-3">
                <Label htmlFor="edit-subcategory">Subcategorie / Type</Label>
                <Input
                  id="edit-subcategory"
                  value={editForm.subcategory}
                  onChange={e => setEditForm({...editForm, subcategory: e.target.value})}
                  placeholder="Bijv. crewneck"
                />
              </div>
              <div className="grid w-full gap-3">
                <Label htmlFor="edit-brand">Merk</Label>
                <Input
                  id="edit-brand"
                  value={editForm.brand}
                  onChange={e => setEditForm({...editForm, brand: e.target.value})}
                  placeholder="Bijv. Avirex"
                />
              </div>
              <div className="grid w-full gap-3">
                <Label htmlFor="edit-size">Maat</Label>
                <Input
                  id="edit-size"
                  value={editForm.size}
                  onChange={e => setEditForm({...editForm, size: e.target.value})}
                  placeholder="Bijv. M"
                />
              </div>
              <div className="grid w-full gap-3">
                <Label htmlFor="edit-style">Style</Label>
                <Input
                  id="edit-style"
                  value={editForm.style}
                  onChange={e => setEditForm({...editForm, style: e.target.value})}
                  placeholder="Bijv. casual"
                />
              </div>
              <div className="grid w-full gap-3">
                <Label htmlFor="edit-color">Kleur</Label>
                <Input
                  id="edit-color"
                  value={editForm.color}
                  onChange={e => setEditForm({...editForm, color: e.target.value})}
                  placeholder="Bijv. blauw"
                />
              </div>
              <div className="grid w-full gap-3">
                <Label htmlFor="edit-material">Materiaal</Label>
                <Input
                  id="edit-material"
                  value={editForm.material}
                  onChange={e => setEditForm({...editForm, material: e.target.value})}
                  placeholder="Bijv. katoen"
                />
              </div>
            </div>
          )}

        </div>
      </div>

      <div className='item-outfits-container'>

        <h2 className="text-2xl font-semibold mb-4">Outfits met dit item</h2>
        <p className="text-base text-muted-foreground">Deze functionaliteit is nog in ontwikkeling.</p>
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            key={item.id}
            className="group cursor-pointer"
          >
            <div className="outfit-img-container rounded-lg overflow-hidden" style={{ height: '400px' }}>
              <img
                src={item.images.thumbnail}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="outfit-name">
              <p className="text-md font-medium">
                {item.name}
              </p>
            </div>
          </div>
        </div> */}

      </div>

    </div>
  )
}
