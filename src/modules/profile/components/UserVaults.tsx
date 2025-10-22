import { BaseVaultCard, BaseVaultRow, ProfileHeading } from '@/components'
import { getStatus } from '@/modules/global/utils'
import { Divider, Icon } from '@/ui/components'
import { useGetAllCreatedVaults } from '../hooks'

export function UserVaults() {
  const { data: createdVaults } = useGetAllCreatedVaults()

  const createdLiveVaults = createdVaults?.filter((vault) => {
    const status = getStatus({
      startDate: String(vault.startDate),
      endDate: String(vault.endDate),
    })
    return ['live', 'coming'].includes(status)
  })

  const createdCompletedVaults = createdVaults?.filter((vault) => {
    return getStatus({ startDate: String(vault.startDate), endDate: String(vault.endDate) }) === 'ended'
  })

  return (
    <div className="flex flex-col w-full">
      <Divider />

      <ProfileHeading
        className="my-12"
        icon={<Icon className="!text-4xl">live_tv</Icon>}
        title="Live Vaults"
        status="live"
        vaults={createdLiveVaults?.length || 0}
      />

      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-4 mb-20">
        {createdLiveVaults?.map((vault, index) => (
          <BaseVaultCard
            key={`live_vault_${index}`}
            banner={vault.banner}
            logo={vault.logo}
            vaultName={vault.vaultName}
            discordIcon={vault.discord}
            telegramIcon={vault.telegram}
            twitterIcon={vault.twitter}
            creatorName={vault.creatorName}
            network={'Sepolia'}
            minDeposit={vault.minDeposit}
            maxDeposit={vault.maxDeposit}
            startDate={vault.startDate}
            endDate={vault.endDate}
            description={vault.description}
            status={getStatus({
              startDate: String(vault.startDate),
              endDate: String(vault.endDate),
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
        vaults={createdCompletedVaults?.length || 0}
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
            {createdCompletedVaults?.map((vault, index) => (
              <BaseVaultRow
                key={`completed_vault_${index}`}
                banner={vault.banner}
                logo={vault.logo}
                vaultName={vault.vaultName}
                network={'Sepolia'}
                minDeposit={vault.minDeposit}
                maxDeposit={vault.maxDeposit}
                endDate={vault.endDate.toLocaleDateString()}
                tx="0x1896caaf59a5ab0de34af09d79f233683fb70dff818bc5dc87e60220adb22ddb"
                status={getStatus({
                  startDate: String(vault.startDate),
                  endDate: String(vault.endDate),
                })}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
