import { BaseVaultCard, BaseVaultRow, ProfileHeading } from '@/components'
import { getStatus } from '@/modules/global/utils'
import { Icon } from '@/ui/components'

export function UserVaults() {
  return (
    <div className="flex flex-col w-full">
      <hr className="text-sky-500" />
      <ProfileHeading
        className="my-12"
        icon={<Icon className="!text-4xl">live_tv</Icon>}
        title="Live Vaults"
        status="live"
        vaults="3"
      />

      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-4 mb-20">
        {Array.from({ length: 3 }, (_, index) => (
          <BaseVaultCard
            key={index}
            banner={''}
            logo={''}
            vaultName={'Test'}
            network={'sepolia'}
            minDeposit={'1'}
            maxDeposit={'100000000'}
            startDate={'2025-10-18'}
            endDate={'2025-10-24'}
            description={'This is a simple phrase to testing the description field'}
            status={getStatus({
              startDate: '2025-10-11',
              endDate: '2025-10-31',
            })}
          >
            Countdown will be stay here
          </BaseVaultCard>
        ))}
      </div>

      <ProfileHeading
        className="my-12"
        icon={<Icon className="!text-4xl">bookmark_check</Icon>}
        title="Completed Vaults"
        status="ended"
        vaults="10"
      />

      {Array.from({ length: 10 }, (_, index) => (
        <div className="w-full flex my-1">
          <BaseVaultRow
            key={index}
            banner={'/default-icon.webp'}
            vaultName={'Test Vault name'}
            network={'sepolia'}
            minDeposit={'1'}
            maxDeposit={'100000000'}
            startDate={'2025-10-18'}
            endDate={'2025-10-24'}
            description={'This is a simple phrase to testing the description field'}
            status={getStatus({
              startDate: '2025-10-11',
              endDate: '2025-10-31',
            })}
          />
        </div>
      ))}
    </div>
  )
}
