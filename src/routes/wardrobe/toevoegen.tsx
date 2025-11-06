// routes/wardrobe/toevoegen.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
// import { AddItemForm } from '@/components/AddItemForm'

export const Route = createFileRoute('/wardrobe/toevoegen')({
  component: AddItemModal,
})

function AddItemModal() {
  const navigate = useNavigate()

  // Close modal functie
  const handleClose = () => {
    navigate({ to: '/wardrobe' })
  }

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nieuw Item Toevoegen</DialogTitle>
        </DialogHeader>
        
        {/* <AddItemForm 
          onSuccess={handleClose}
          onCancel={handleClose}
        /> */}
      </DialogContent>
    </Dialog>
  )
}