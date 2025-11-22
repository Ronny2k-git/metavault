import { BaseVaultCard, BaseVaultRow } from '@/components'
import { Pagination } from '@/modules/global/components/Pagination'
import { formatDate, formatNumber, getStatus } from '@/modules/global/utils'
import { Divider, EmptyBanner, Icon, Input } from '@/ui/components'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useGetAllVaultsCreated, useVaultSearch } from '../hooks'
import { getTotalVaultAmount } from '../utils'
import { ProfileHeading } from './ProfileHeading'
import { VaultCardSkeleton } from './VaultCardSkeleton'
import { VaulRowSkeleton } from './VaultRowSkeleton'

export function UserVaults() {
  const [livePage, setLivePage] = useState(1)
  const [completedPage, setCompletedPage] = useState(1)
  const { address } = useAccount()

  // Get live, coming and completed vaults.
  const { data: liveVaults, isLoading: isLoadingLive } = useGetAllVaultsCreated({
    userAddress: address!,
    page: livePage,
    limit: 6,
    live: true,
  })
  const { data: completedVaults, isLoading: isLoadingCompleted } = useGetAllVaultsCreated({
    userAddress: address!,
    page: completedPage,
    limit: 10,
    live: false,
  })

  // Filter the live and completed vaults by search value
  const {
    value: filteredLiveVaults,
    search: searchLiveVaults,
    setValue: setSearchLiveVaults,
  } = useVaultSearch({
    fields: liveVaults?.items,
    initialQuery: '',
  })

  const {
    value: filteredCompletedVaults,
    search: searchCompletedVaults,
    setValue: setSearchCompletedVaults,
  } = useVaultSearch({
    fields: completedVaults?.items,
    initialQuery: '',
  })

  // Filter to show only completed vaults that have any deposited value
  const vaultsToWithdraw = completedVaults?.items.filter(
    (v) => getTotalVaultAmount({ assetTokenDecimals: 8 }, v.swaps) > 0,
  )

  console.log(vaultsToWithdraw)
  return (
    <div className="flex flex-col w-full">
      <Divider />

      {/* User live vaults */}
      <section>
        <ProfileHeading
          id="user-live-vaults"
          className="mt-12"
          icon={<Icon className="!text-4xl">live_tv</Icon>}
          title="Live Vaults"
          subtitle="To deposit into live vaults, go to the Trades tab."
          valueLabel="Total Live Vaults"
          value={liveVaults?.total || 0}
        />
        <Input
          className="w-full sm:max-w-[27rem]"
          iconLeft={<Icon className="text-blue-300">search</Icon>}
          inputSize={'sm'}
          label="Search Vault"
          placeholder="Search your vaults by address,name, creator and chain name."
          value={searchLiveVaults}
          onChange={(e) => setSearchLiveVaults(e.target.value)}
        />

        {(!address || !filteredLiveVaults?.length) && !isLoadingLive && (
          <EmptyBanner
            className="mt-10 text-center"
            icon={<Icon className="!text-7xl text-white">sentiment_dissatisfied</Icon>}
            message="No Live Vaults found"
            subMessage="Please, check your filters or Connect your wallet"
            buttonLabel="Create Your Vault"
          />
        )}
        {isLoadingLive ? (
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
                tokenName={vault.assetTokenName!}
                startDate={vault.startDate}
                endDate={vault.endDate}
                description={vault.description}
                status={getStatus({
                  startDate: String(vault.startDate),
                  endDate: String(vault.endDate),
                })}
                deposited={getTotalVaultAmount(vault, vault.swaps) || 0}
                address={vault.address}
              />
            ))}
          </div>
        )}
        <div className="flex gap-2 w-full justify-center">
          {liveVaults && liveVaults?.totalPages > 1 && (
            <Pagination
              key={livePage}
              page={livePage}
              totalPages={liveVaults?.totalPages!}
              onChange={setLivePage}
              scrollId="user-live-vaults"
            />
          )}
        </div>
      </section>

      {/* User completed vaults to withdraw*/}
      <section>
        {/* {
      FINISH THIS SECTION LATER: 

      TO DO: 
      2 PROBABLY I WILL USE THE BASE VAULT CARD, MAKE THE NECESSARY CHANGES.
      3 ADD A SUBTITLE UNDER THE MAIN TITLE.
        } */}
        <ProfileHeading
          id="user-completed-vaults-to-withdraw"
          className="mt-24"
          icon={<Icon className="!text-4xl">award_star</Icon>}
          title="Vaults to Withdraw"
          subtitle="Your completed vaults that have any deposited value to withdraw"
          valueLabel="Total Vaults To Withdraw"
          value={1 || 0}
        />

        {!address && !isLoadingCompleted && (
          <EmptyBanner
            className="mt-10 text-center"
            icon={<Icon className="!text-7xl text-white">sentiment_dissatisfied</Icon>}
            message="No Live Vaults found"
            subMessage="Please, check your filters or Connect your wallet"
            buttonLabel="Create Your Vault"
          />
        )}
        {isLoadingCompleted ? (
          <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-4 my-10">
            {Array.from({ length: 6 }).map((_, index) => (
              <VaultCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-4 my-10">
            {vaultsToWithdraw?.map((vault, index) => (
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
                tokenName={vault.assetTokenName!}
                startDate={vault.startDate}
                endDate={vault.endDate}
                description={vault.description}
                status={getStatus({
                  startDate: String(vault.startDate),
                  endDate: String(vault.endDate),
                })}
                deposited={getTotalVaultAmount(vault, vault.swaps) || 0}
                address={vault.address}
              />
            ))}
          </div>
        )}
      </section>

      {/* User completed vaults */}
      <section>
        <ProfileHeading
          id="user-completed-vaults"
          className="mt-24"
          icon={<Icon className="!text-4xl">bookmark_check</Icon>}
          title="Completed Vaults"
          valueLabel="Total Completed Vaults"
          value={completedVaults?.total || 0}
        />

        <Input
          className="w-full sm:max-w-[27rem]"
          iconLeft={<Icon className="text-blue-300">search</Icon>}
          inputSize={'sm'}
          label="Search Vault"
          placeholder="Search your vaults by address,name, creator and chain name."
          value={searchCompletedVaults}
          onChange={(e) => setSearchCompletedVaults(e.target.value)}
        />
        {(!address || !filteredCompletedVaults?.length) && !isLoadingCompleted && (
          <EmptyBanner
            className="mt-10 text-center"
            icon={<Icon className="!text-7xl text-white">sentiment_dissatisfied</Icon>}
            message="No Completed Vaults found"
            subMessage="Please, check your filters or Connect your wallet"
            buttonLabel="Create Your Vault"
          />
        )}
        {isLoadingCompleted ? (
          <div className="flex flex-col gap-2 my-8 overflow-x-auto p-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <VaulRowSkeleton key={index} />
            ))}
          </div>
        ) : filteredCompletedVaults?.length ? (
          <div className="w-full flex flex-col overflow-x-auto mt-6">
            <table className="w-full min-w-[48rem] border-separate border-spacing-y-2 border-spacing-x-0">
              <thead>
                <tr className="[&_td]:text-nowrap ">
                  <td colSpan={5} className="p-0">
                    <div className="flex items-center h-10 px-2">
                      <div className="flex-1 pl-30">Project Name</div>
                      <div className="w-32 text-center">Min deposit</div>
                      <div className="w-32 text-center">Max deposit</div>
                      <div className="w-32 text-center">End Date</div>
                      <div className="w-24 text-center">View</div>
                    </div>
                  </td>
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
                    tx={vault.address}
                    status={getStatus({
                      startDate: String(vault.startDate),
                      endDate: String(vault.endDate),
                    })}
                  />
                ))}
              </tbody>
            </table>
            {completedVaults && completedVaults?.totalPages > 1 && (
              <Pagination
                key={completedPage}
                page={completedPage}
                totalPages={completedVaults?.totalPages!}
                onChange={setCompletedPage}
                scrollId="user-completed-vaults"
              />
            )}
          </div>
        ) : null}
      </section>
    </div>
  )
}
