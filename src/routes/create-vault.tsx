'use client'

import { CreateVaultForm } from '@/modules/create/components'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-vault')({
  ssr: false,
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen background px-4 flex flex-col gap-1 items-center text-white">
      <div className="max-w-2xl my-10 w-full">
        <div className="flex gap-6 flex-col">
          <h1 className="text-4xl text-center">Create Your Vault</h1>
          <div className="w-full h-0.5 mb-8 bg-cyan-300" />
          <CreateVaultForm />
        </div>
      </div>
    </div>
  )
}
