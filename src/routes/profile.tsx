import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: Profile,
})

function Profile() {
  return (
    <div className="page background flex flex-col gap-1 items-center bg-center justify-center text-white">
      Hello "/start-deposit"!
      <button className="size-6 bg-gray-300 rounded-full"></button>
    </div>
  )
}
