import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wardrobe/item/$itemId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return { 
      itemId: params.itemId 
    };
  },
})

function RouteComponent() {
  const { itemId } = Route.useLoaderData();
  return <div>{`Hello "/wardrobe/item/${itemId}"!`}</div>
}
