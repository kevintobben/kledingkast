# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "kledingkast" (wardrobe in Dutch), a React-based wardrobe management application where users can catalog their clothing items and create outfits. The app runs entirely client-side with persistent storage via Zustand.

## Commands

### Development
```bash
npm run dev          # Start Vite dev server
npm run build        # Type-check with tsc -b, then build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build locally
```

## Architecture

### Routing: TanStack Router (File-based)
The app uses `@tanstack/react-router` with file-based routing. Routes are automatically generated from `src/routes/` into `src/routeTree.gen.ts` by the TanStack Router plugin.

**Important routing patterns:**
- Routes defined in `src/routes/` using `createFileRoute()`
- `__root.tsx` contains the root layout with navigation and `<Outlet />`
- Modal routes (e.g., `/wardrobe/toevoegen`) are rendered as dialogs that navigate back on close
- The router is created in `main.tsx` and must be registered for type safety

### State Management: Zustand with Persistence
Two main stores handle all application state:

**`src/stores/clothingStore.ts`** - Manages clothing items
- Persists to localStorage as `clothing-storage`
- Actions: `addItem`, `removeItem`, `updateItem`
- Items include metadata: name, category, subcategory, brand, size, style, material, color, season, images (stored as base64)

**`src/stores/outfitStore.ts`** - Manages outfits
- Persists to localStorage as `outfit-storage`
- Similar structure to clothingStore but for outfit combinations

**Key state pattern:**
```tsx
const items = useClothingStore((state) => state.items)
const addItem = useClothingStore((state) => state.addItem)
// Or access directly: useClothingStore.getState().removeItem(id)
```

### Image Handling
Images are converted to base64 strings and stored directly in Zustand/localStorage. The pattern:
1. User selects file via `<input type="file">`
2. FileReader converts to base64 data URL
3. Base64 string stored in `imageUrl` and `images.thumbnail`
4. Images displayed with `<img src={base64String} />`

### UI Components
Built with Radix UI primitives and Tailwind CSS:
- Components in `src/components/ui/` (shadcn-style)
- TailwindCSS v4 via `@tailwindcss/vite` plugin
- Path alias `@/` maps to `src/` (configured in `vite.config.ts`)

### Layout Structure
- Root layout (`__root.tsx`) provides:
  - Centered container (max-w-6xl)
  - `<AppSidebar />` component
  - Responsive navigation (desktop: NavigationMenu, mobile: Sheet with hamburger)
  - Active link styling via `[&.active]` Tailwind classes
  - TanStack Router DevTools in development

### Data Grouping Pattern
Items are grouped by category using a `groupBy` utility function (see `WardrobeList.tsx:6-13`). Categories are case-insensitive and sorted alphabetically, with "Overig" (Other) always last.

## Type Safety
- TypeScript with strict configuration
- Router types auto-generated and registered via module augmentation in `main.tsx`
- Zustand stores are fully typed with interfaces

## Development Notes
- Uses Rolldown-based Vite (`rolldown-vite@7.1.14`) for faster builds
- Auto code-splitting enabled in TanStack Router plugin
- React 19 with StrictMode enabled
- DevTools available for router debugging
