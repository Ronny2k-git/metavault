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
    }),
  ),
})

function Profile() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/profile' })

  const tabList = PROFILE_TABS_INFO

  return (
    <div className="background flex flex-col p-4 w-full items-center py-20 text-white">
      {/* <Tabs.Root
        value={search.tab}
        className="w-full max-w-4xl"
        onValueChange={(value) => {
          navigate({ search: { tab: value as 'user-vaults' | 'trades' } })
        }}
      >
        <Tabs.List className="flex gap-0.5 max-md:flex-col">
          {PROFILE_TABS.map((profile, index) => (
            <Tabs.Trigger
              key={index}
              value={profile.value}
              className="w-full h-full flex max-md:py-4 py-10 items-center justify-center data-[state=active]:border-b-2 data-[state=active]:border-b-white 
              border-sky-500 data-[state=active]:bg-[linear-gradient(0deg,#2989f7,#001d8f)] data-[state=active]:hover:bg-[linear-gradient(0deg,#0471ff,#001d8f)] 
                cursor-pointer md:rounded-tr-xl md:rounded-tl-xl"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Icon>{profile.icon}</Icon>
                  <span className="text-lg md:text-2xl">{profile.label}</span>
                </div>
                <span className="text-sm text-gray-200">{profile.description}</span>
              </div>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content className="mt-10" value={'user-vaults'}>
          <UserVaults />
        </Tabs.Content>
        <Tabs.Content className="mt-10" value={'trades'}>
          <Trades />
        </Tabs.Content>
      </Tabs.Root> */}
      <Tabs
        variant={'blue'}
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
  )
}
