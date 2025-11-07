import React, { useState } from 'react'
import { useClothingStore } from '@/stores/clothingStore'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/wardrobe/toevoegen')({
  component: AddItemModal,
})



function AddItemModal() {
  const navigate = useNavigate()
  const addItem = useClothingStore((state) => state.addItem)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [brand, setBrand] = useState('')
  const [size, setSize] = useState('')
  const [style, setStyle] = useState('')
  const [color, setColor] = useState('')
  const [material, setMaterial] = useState('')

  // Close modal functie
  const handleClose = () => {
    navigate({ to: '/wardrobe' })
  }

  // Afbeelding kiezen en preview genereren
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      setPreview(URL.createObjectURL(file))
    } else {
      setFile(null)
      setPreview(null)
    }
  }

  // Item opslaan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !name) return

    // Lees afbeelding als base64 string
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    const base64 = await toBase64(file)

    addItem({
      id: Date.now().toString(),
      images: Object.assign([], { thumbnail: base64 }),
      name,
      category,
      imageUrl: base64,
      color,
      season: [],
      subcategory,
      brand,
      size,
      style,
      material,
    })
    handleClose()
  }

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Item toevoegen</DialogTitle>
          <DialogDescription>
            Vul de tags in voor je kledingstuk.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid w-full gap-3">
            <Label htmlFor="picture">Afbeelding kiezen</Label>
            <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="name">Naam item</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Bijv. T-shirt" />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="category">Categorie</Label>
            <Input id="category" value={category} onChange={e => setCategory(e.target.value)} placeholder="Bijv. sweaters" />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="subcategory">Subcategorie / Type</Label>
            <Input id="subcategory" value={subcategory} onChange={e => setSubcategory(e.target.value)} placeholder="Bijv. crewneck" />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="brand">Merk</Label>
            <Input id="brand" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Bijv. Avirex" />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="size">Maat</Label>
            <Input id="size" value={size} onChange={e => setSize(e.target.value)} placeholder="Bijv. M" />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="style">Style</Label>
            <Input id="style" value={style} onChange={e => setStyle(e.target.value)} placeholder="Bijv. casual" />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="color">Kleur</Label>
            <Input id="color" value={color} onChange={e => setColor(e.target.value)} placeholder="Bijv. blauw" />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="material">Materiaal</Label>
            <Input id="material" value={material} onChange={e => setMaterial(e.target.value)} placeholder="Bijv. katoen" />
          </div>
          <div className="grid w-full gap-3">
            <Label>Afbeelding preview</Label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 rounded border object-contain"
              />
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Annuleren</Button>
            </DialogClose>
            <Button type="submit" disabled={!file || !name}>Opslaan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}