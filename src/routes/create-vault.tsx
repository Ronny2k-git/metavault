'use client'

import { confirmFormValidAtom, userFormValidAtom, vaultFormValidAtom } from '@/modules/create/atoms'
import { VaultDataForm } from '@/modules/create/components'
import { ConfirmAndCreateForm } from '@/modules/create/components/ConfirmAndCreateForm'
import { UserDataForm } from '@/modules/create/components/UserDataForm'
import { CREATE_TAB_STEPS } from '@/modules/create/constants'
import type { CreateTabSteps } from '@/modules/create/types'
import { getCreateInfoSteps } from '@/modules/create/utils'
import { GlobalLoader, WalletConnectionRequired } from '@/modules/global/components'
import { Icon } from '@/ui/components'
import { Tabs } from '@/ui/components/Tabs'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { useAtomValue } from 'jotai'
import z from 'zod'

export const Route = createFileRoute('/create-vault')({
  ssr: false,
  component: CreateVault,
  validateSearch: zodValidator(
    z.object({
      tab: z.enum(CREATE_TAB_STEPS, 'vault-data').default('vault-data'),
    }),
  ),
  pendingComponent: () => <GlobalLoader />,
})

function CreateVault() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/create-vault' })

  const vaultFormValid = useAtomValue(vaultFormValidAtom)
  const userFormValid = useAtomValue(userFormValidAtom)
  const confirmFormValid = useAtomValue(confirmFormValidAtom)

  const tabList = getCreateInfoSteps(vaultFormValid, userFormValid, confirmFormValid)

  return (
    <div className=" page min-h-screen background-image flex flex-col gap-1 items-center text-white overflow-x-auto">
      <div className="max-w-4xl mt-14 w-full">
        <WalletConnectionRequired />

        <Tabs
          icon={<Icon className="!text-4xl text-indigo-300">keyboard_double_arrow_right</Icon>}
          variant={'blue'}
          size={'lg'}
          search={search.tab}
          onValueChange={(value) => {
            navigate({ search: { tab: value as CreateTabSteps } })
          }}
          key={search.tab}
          tabList={tabList}
          tabContent={[
            {
              value: 'vault-data',
              content: <VaultDataForm />,
            },
            {
              value: 'user-data',
              content: <UserDataForm />,
            },
            {
              value: 'confirm-create',
              content: <ConfirmAndCreateForm />,
            },
          ]}
        />
      </div>
    </div>
  )
}
