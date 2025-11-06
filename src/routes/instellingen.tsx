import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/instellingen')({
  component: Instellingen,
})

function Instellingen() {
  return (
    <div className="p-2">
      <h3>Instellingen</h3>
      <p>Hier kun je je instellingen aanpassen.</p>
    </div>
  )
}
