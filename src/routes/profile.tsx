import type { CreateTabSteps } from '@/modules/create/types'
import { Trades, UserVaults } from '@/modules/profile/components'
import { PROFILE_TABS, PROFILE_TABS_INFO } from '@/modules/profile/constants'
import { Tabs } from '@/ui/components/Tabs'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import z from 'zod'

export const Route = createFileRoute('/profile')({
  component: Profile,
  validateSearch: zodValidator(
    z.object({
      tab: z.enum(PROFILE_TABS, 'user-vaults').default('user-vaults'),
      // search: fallback(z.string(), '').default(''),
    }),
  ),
  ssr: 'data-only',
})

function Profile() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/profile' })

  const tabList = PROFILE_TABS_INFO

  return (
    <div className="background min-h-screen flex flex-col p-4 w-full items-center py-20 text-white">
      <div className="w-full max-w-4xl">
        <Tabs
          variant={'default'}
          size={'md'}
          search={search.tab}
          onValueChange={(value) => {
            navigate({ search: { tab: value as CreateTabSteps } })
          }}
          key={search.tab}
          tabList={tabList}
          tabContent={[
            {
              value: 'user-vaults',
              content: <UserVaults />,
            },
            {
              value: 'trades',
              content: <Trades />,
            },
            {
              value: 'test',
              content: 'test',
            },
          ]}
        />
      </div>
    </div>
  )
}
