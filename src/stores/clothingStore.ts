import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ClothingItem {
  id: string
  name: string
  category: 'shirt' | 'pants' | 'shoes' | 'accessory'
  imageUrl: string // of base64
  color: string
  season: string[]
}

interface ClothingStore {
  items: ClothingItem[]
  addItem: (item: ClothingItem) => void
  removeItem: (id: string) => void
  updateItem: (id: string, item: Partial<ClothingItem>) => void
}

export const useClothingStore = create<ClothingStore>()(
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
      name: 'clothing-storage', // LocalStorage key
    }
  )
)