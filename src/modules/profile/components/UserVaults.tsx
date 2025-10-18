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
            creatorName="Test"
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
      <div className="w-full overflow-x-auto custom-scrollbar" style={{ paddingBottom: '8px' }}>
        <table className="w-full min-w-[46rem]">
          <thead>
            <tr className="[&_td]:text-nowrap">
              <td align="center" className="pr-16">
                Project Name
              </td>
              <td align="center">Min deposit</td>
              <td align="center">Max deposit</td>
              <td align="center">End Date</td>
              <td align="center">View</td>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, index) => (
              <BaseVaultRow
                key={index}
                banner={'/default-icon.webp'}
                logo={'/icon.png'}
                vaultName={'Test Vault name'}
                network={'sepolia'}
                minDeposit={'1'}
                maxDeposit={'100000000'}
                startDate={'2025-10-18'}
                endDate={'2025-10-24'}
                tx="0x1896caaf59a5ab0de34af09d79f233683fb70dff818bc5dc87e60220adb22ddb"
                description={'This is a simple phrase to testing the description field'}
                status={getStatus({
                  startDate: '2025-10-11',
                  endDate: '2025-10-13',
                })}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
