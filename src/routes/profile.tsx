import type { CreateTabSteps } from '@/modules/create/types'
import { GlobalLoader } from '@/modules/global/components'
import { useGetUserProfileData } from '@/modules/global/hooks'
import { abreviateAddress } from '@/modules/global/utils'
import { connectorIcons } from '@/modules/global/utils/connectorIcons'
import { EditProfileForm, Operation, UserVaults } from '@/modules/profile/components'
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
  pendingComponent: () => <GlobalLoader />,
})

function Profile() {
  const { address, connector } = useAccount()
  const search = Route.useSearch()
  const navigate = useNavigate({ from: '/profile' })
  const { data: userProfileData } = useGetUserProfileData(address!)

  const tabList = PROFILE_TABS_INFO
  const profileData = userProfileData?.[0]

  {
    /*
  
  FILES TO TRANSLATE LATER
  
  SAVE LATER THE SELECTED LANGUAGE TO LOCAL STORAGE 
  
  1 CREATION PAGE: {
  1.1 ConfirmAndCreateFormSchema.ts
  1.2 userProfileDataFormSchema.ts
  1.3 UserVaultDataFormSchema.ts
  1.4 VaultDataFormSchema.ts
  }
  
  2 PROFILE PAGE: {
  2.6 operationSchema.ts (validations)
  2.7 DepositCard.tsx
  2.8 WithdrawCard.tsx
  2.9 EditProfileForm.tsx
  2.10 Operation.tsx
  2.11 UserCardRowTrades.tsx
  }
  
  3 GLOBAL: {
  3.1 NotFoundPage.tsx
  }   
      */
  }

  return (
    <div className="background-image page min-h-screen flex flex-col w-full items-center pb-10 text-white">
      <div className="w-full max-w-4xl">
        {/* PROFILE USER CARD INFO */}
        <Card
          className="h-auto border-purple-900/50 shadow-lg shadow-black/40 rounded-3xl my-10 px-6 py-6"
          variant={'basic2'}
        >
          <div className={'w-full flex gap-4 md:gap-8 max-md:flex-col justify-between '}>
            {/* LEFT SIDE — AVATAR + TEXT */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  className=" min-h-18 min-w-18 max-h-18 max-w-18 my-1 rounded-full object-cover border-2 border-purple-900/50 shadow-md"
                  src={profileData?.avatarUrl || '/user.png'}
                />

                <span className=" absolute bottom-1 right-0 size-5 rounded-full bg-green-500  border-2 border-gray-900 " />
              </div>

              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">Your Profile</h1>
                <h2 className="text-sm text-gray-300 ">Explore your vaults, make trades and edit your profile.</h2>
              </div>
            </div>
            {/* RIGHT SIDE — WALLET */}
            <div className="bg-black/30 border border-purple-900/50 flex max-md:w-full items-center px-4 py-2 gap-2 rounded-3xl">
              {address && connector ? (
                <img
                  src={connectorIcons[connector.id.toLowerCase()]}
                  alt={`${connector.name}`}
                  className="rounded-full size-12"
                />
              ) : (
                <Icon className="!text-4xl">wallet</Icon>
              )}

              <div className="flex flex-col">
                <span className="text-sm text-gray-300">{address ? 'Connected Wallet' : 'Wallet not connected'}</span>
                <span className="text-lg font-semibold text-indigo-300">{address && abreviateAddress(address)}</span>
                {!address && <span className="text-sm text-red-300">Connect your wallet to see your profile data</span>}
              </div>
            </div>
          </div>
        </Card>

        <Divider className="mb-12 " />

        <Tabs
          variant={'purple'}
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
              value: 'operation',
              content: <Operation />,
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
