'use client'

import { CreateVaultForm } from '@/modules/create/components'
import { CREATE_TAB_STEPS } from '@/modules/create/constants'
import type { CreateTabSteps } from '@/modules/create/types'
import { Tabs } from '@/ui/components/Tabs'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import z from 'zod'

export const Route = createFileRoute('/create-vault')({
  ssr: false,
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      tab: z.enum(CREATE_TAB_STEPS, 'vault-data').default('vault-data'),
    }),
  ),
})

function RouteComponent() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/create-vault' })

  return (
    <div className="min-h-screen background px-4 flex flex-col gap-1 items-center text-white">
      <div className="max-w-4xl my-14 w-full">
        <Tabs
          search={search.tab}
          onValueChange={(value) => {
            navigate({ search: { tab: value as CreateTabSteps } })
          }}
          key={search.tab}
          tabList={{
            value: search.tab,
            description: '',
            label: '',
            icon: '',
          }}
        />
        <hr className="w-full h-0.5 mt-4 mb-8 border border-cyan-400 " />
        <CreateVaultForm />
      </div>
    </div>
  )
}
