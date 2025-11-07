import React, { useState } from 'react'
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
  const [preview, setPreview] = useState<string | null>(null)

  // Close modal functie
  const handleClose = () => {
    navigate({ to: '/wardrobe' })
  }

  // Afbeelding kiezen en preview genereren
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Item toevoegen</DialogTitle>
          <DialogDescription>
            Zorg ervoor dat je een afbeelding kiest waar alleen het item op staat.
            
          </DialogDescription>
        </DialogHeader>
        {/* Inhoud van de modal */}
        <div className="grid gap-4">
          <div className="grid w-full gap-3">
            <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="username-1">Afbeelding preview</Label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 rounded border object-contain"
              />
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuleren</Button>
          </DialogClose>
          <Button type="submit">Opslaan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}