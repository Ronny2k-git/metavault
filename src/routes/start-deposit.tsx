import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/start-deposit')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="page background flex flex-col gap-1 items-center bg-center justify-center text-white">
      Hello "/start-deposit"!
    </div>
  )
}
