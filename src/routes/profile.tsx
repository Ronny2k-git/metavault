import { PROFILE_TABS } from '@/modules/global/constants'
import { Icon } from '@/ui/components'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { Tabs } from 'radix-ui'
import z from 'zod'

export const Route = createFileRoute('/profile')({
  component: Profile,
  validateSearch: zodValidator(
    z.object({
      tab: z.enum(['user-vaults', 'trades']).default('user-vaults'),
    }),
  ),
})

function Profile() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/profile' })

  return (
    <div className="page background flex flex-col gap-1 items-center py-20 text-white">
      <Tabs.Root
        value={search.tab}
        className="max-w-4xl max-md:w-full"
        onValueChange={(value) => {
          navigate({ search: { tab: value as 'user-vaults' | 'trades' } })
        }}
      >
        <Tabs.List className="flex gap-0.5 max-md:flex-col w-full">
          {PROFILE_TABS.map((profile, index) => (
            <Tabs.Trigger
              key={index}
              value={profile.value}
              className="flex items-center justify-center data-[state=active]:border-b-2 data-[state=active]:border-b-white 
              border-sky-500 data-[state=active]:bg-[linear-gradient(0deg,#2989f7,#001d8f)] data-[state=active]:hover:bg-[linear-gradient(0deg,#0471ff,#001d8f)] 
               py-4 md:px-16 md:py-12 cursor-pointer md:rounded-tr-xl md:rounded-tl-xl"
            >
              <div className="flex flex-col ">
                <div className="flex items-center gap-1">
                  <Icon>{profile.icon}</Icon>
                  <span className="text-xl">{profile.label}</span>
                </div>
                <span className="text-sm text-gray-200">{profile.description}</span>
              </div>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content className="mt-20" value={'user-vaults'}>
          dddddddddddddddddddddddd
        </Tabs.Content>
        <Tabs.Content className="mt-20" value={'trades'}>
          eefff
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
