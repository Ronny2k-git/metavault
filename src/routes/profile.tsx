import type { CreateTabSteps } from '@/modules/create/types'
import { useGetUserProfileData } from '@/modules/global/hooks'
import { abreviateAddress } from '@/modules/global/utils'
import { connectorIcons } from '@/modules/global/utils/connectorIcons'
import { EditProfileForm, Trades, UserVaults } from '@/modules/profile/components'
import { PROFILE_TABS, PROFILE_TABS_INFO } from '@/modules/profile/constants'
import { Card, Divider, Icon } from '@/ui/components'
import { Tabs } from '@/ui/components/Tabs'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { useAccount } from 'wagmi'
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
  const { address, connector } = useAccount()
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/profile' })
  const { data: userProfileData } = useGetUserProfileData(address!)

  const tabList = PROFILE_TABS_INFO

  const profileData = userProfileData?.[0]

  return (
    <div className="background-image min-h-screen flex flex-col p-4 w-full items-center pb-10 text-white">
      <div className="w-full max-w-4xl">
        <Card className="h-auto border-1 border-blue-800 shadow-2xs rounded-3xl my-10 px-4 py-4" variant={'basic2'}>
          <div className={'w-full flex gap-4 md:gap-8 max-md:flex-col justify-between '}>
            <div className="flex items-center gap-4 ml-2">
              <img
                className="min-h-14 min-w-14 max-h-14 max-w-14 border-2 border-blue-700 object-cover  rounded-full"
                src={profileData?.avatarUrl || '/homeImage.png'}
              />
              <div className="flex flex-col">
                <h1 className="text-3xl">Your Profile</h1>
                <h2 className="text-sm text-gray-300">Explore your vaults, make trades and edit your profile.</h2>
              </div>
            </div>
            <div className="bg-black/30 border border-blue-400 flex max-md:w-full items-center px-4 py-2 gap-2 rounded-3xl">
              {address && connector ? (
                <img
                  src={connectorIcons[connector.id.toLowerCase()]}
                  alt={`${connector.name}`}
                  className="rounded-full size-10"
                />
              ) : (
                <Icon className="!text-4xl">wallet</Icon>
              )}
              <div className="flex flex-col">
                <div className="flex gap-2 items-center">
                  <h2 className="text-sm text-gray-300">{!address ? 'Connect wallet' : 'Signed in as'}</h2>
                </div>
                <span className="text-lg text-blue-200">{address && abreviateAddress(address)}</span>
                {!address && <span className="text-sm">Connect your wallet to see your profile data</span>}
              </div>
            </div>
          </div>
        </Card>

        <Divider className="mb-12" />

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
              value: 'edit-profile',
              content: <EditProfileForm />,
            },
          ]}
        />
      </div>
    </div>
  )
}
