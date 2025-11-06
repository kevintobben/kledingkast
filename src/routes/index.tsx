import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welkom bij je Kledingkast</h1>
      <p className="text-muted-foreground mb-8">
        Beheer je kledingstukken en creëer outfits
      </p>
      <div className="flex justify-center gap-4">
        <Link 
          to="/wardrobe" 
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg"
        >
          Naar Kledingkast
        </Link>
        <Link 
          to="/wardrobe" 
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg"
        >
          Naar Outfits
        </Link>
      </div>
    </div>
  )
}