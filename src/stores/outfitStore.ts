import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface outfitItem {
  id: string
  images: string[] & {
    thumbnail: string
  }
  name: string
  category: string
  subcategory: string
  brand: string
  size: string
  style: string
  material: string
  imageUrl: string
  color: string
  season: string[]
}

interface outfitStore {
  items: outfitItem[]
  addItem: (item: outfitItem) => void
  removeItem: (id: string) => void
  updateItem: (id: string, item: Partial<outfitItem>) => void
}

export const useOutfitStore = create<outfitStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item] 
      })),
      removeItem: (id) => set((state) => ({ 
        items: state.items.filter(i => i.id !== id) 
      })),
      updateItem: (id, updates) => set((state) => ({
        items: state.items.map(i => i.id === id ? {...i, ...updates} : i)
      }))
    }),
    {
      name: 'outfit-storage',
    }
  )
)