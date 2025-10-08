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
        <h1 className="text-4xl text-center">Create Your Vault</h1>
        <hr className="w-full h-0.5 mt-4 mb-8 border border-cyan-400 " />
        <CreateVaultForm />
      </div>
    </div>
  )
}
