import { BaseVaultCard, BaseVaultRow, ProfileHeading } from '@/components'
import { useDebounce } from '@/modules/global/hooks'
import { formatDate, formatNumber, getChainName, getStatus } from '@/modules/global/utils'
import { Divider, EmptyBanner, Icon, Input } from '@/ui/components'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useGetAllCreatedVaults } from '../hooks'
import { VaultCardSkeleton } from './VaultCardSkeleton'

export function UserVaults() {
  const { address } = useAccount()
  const { data: createdVaults, isLoading } = useGetAllCreatedVaults(address!)
  const [searchLive, setSearchLive] = useState('')
  const [searchCompleted, setSearchCompleted] = useState('')
  const searchLiveDebounce = useDebounce(searchLive, 200)
  const searchCompletedDebounce = useDebounce(searchCompleted, 200)

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

  const filteredLiveVaults = createdLiveVaults?.filter((vault) => {
    return (
      vault.address.toLocaleLowerCase().includes(searchLiveDebounce.toLocaleLowerCase()) ||
      vault.vaultName.toLocaleLowerCase().includes(searchLiveDebounce.toLocaleLowerCase()) ||
      vault.creatorName.toLocaleLowerCase().includes(searchLiveDebounce.toLocaleLowerCase()) ||
      getChainName(vault.chainId).toLocaleLowerCase().includes(searchLiveDebounce.toLocaleLowerCase())
    )
  })

  const filteredCompletedVaults = createdCompletedVaults?.filter((vault) => {
    return (
      vault.address.toLocaleLowerCase().includes(searchCompletedDebounce.toLocaleLowerCase()) ||
      vault.vaultName.toLocaleLowerCase().includes(searchCompletedDebounce.toLocaleLowerCase()) ||
      vault.creatorName.toLocaleLowerCase().includes(searchCompletedDebounce.toLocaleLowerCase()) ||
      getChainName(vault.chainId).toLocaleLowerCase().includes(searchCompletedDebounce.toLocaleLowerCase())
    )
  })

  return (
    <div className="flex flex-col w-full">
      <Divider />
      <ProfileHeading
        className="mt-12 mb-4"
        icon={<Icon className="!text-4xl">live_tv</Icon>}
        title="Live Vaults"
        status="live"
        vaults={createdLiveVaults?.length || 0}
      />
      <Input
        className="w-full sm:max-w-[27rem]"
        iconLeft={<Icon className="text-blue-300">search</Icon>}
        inputSize={'sm'}
        label="Search Vault"
        placeholder="Search your live vaults by name, creator and chain name."
        onChange={(e) => setSearchLive(e.target.value)}
      />
      {(!address || !filteredLiveVaults?.length) && !isLoading && (
        <EmptyBanner
          className="mt-10 text-center"
          icon={<Icon className="!text-7xl text-white">sentiment_dissatisfied</Icon>}
          message="No Live Vaults found"
          subMessage="Please, check your filters or Connect your wallet"
          buttonLabel="Create Your Vault"
        />
      )}

      {isLoading ? (
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-4 my-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <VaultCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-4 my-10">
          {filteredLiveVaults?.map((vault, index) => (
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
      )}
      <ProfileHeading
        className="mt-24 mb-4"
        icon={<Icon className="!text-4xl">bookmark_check</Icon>}
        title="Completed Vaults"
        status="ended"
        vaults={createdCompletedVaults?.length || 0}
      />
      <Input
        className="w-full sm:max-w-[27rem]"
        iconLeft={<Icon className="text-blue-300">search</Icon>}
        inputSize={'sm'}
        label="Search Vault"
        placeholder="Search your completed vaults by name, creator and chain name."
        onChange={(e) => setSearchCompleted(e.target.value)}
      />
      {(!address || !filteredCompletedVaults?.length) && !isLoading && (
        <EmptyBanner
          className="mt-10 text-center"
          icon={<Icon className="!text-7xl text-white">sentiment_dissatisfied</Icon>}
          message="No Completed Vaults found"
          subMessage="Please, check your filters or Connect your wallet"
          buttonLabel="Create Your Vault"
        />
      )}
      {isLoading ? (
        <div>Loading ...</div>
      ) : filteredCompletedVaults?.length ? (
        <div className="w-full overflow-x-auto custom-scrollbar mt-10" style={{ paddingBottom: '8px' }}>
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
              {filteredCompletedVaults.map((vault, index) => (
                <BaseVaultRow
                  key={`completed_vault_${index}`}
                  banner={vault.banner}
                  logo={vault.logo}
                  vaultName={vault.vaultName}
                  network={'Sepolia'}
                  minDeposit={vault.minDeposit}
                  maxDeposit={formatNumber(Number(vault.maxDeposit))}
                  endDate={formatDate(Number(vault.endDate))}
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
      ) : null}
    </div>
  )
}
