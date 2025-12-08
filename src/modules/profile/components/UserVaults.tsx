import { BaseVaultCard, BaseVaultRow } from '@/components'
import { Pagination } from '@/modules/global/components/Pagination'
import { useGetVaultBalance } from '@/modules/global/hooks'
import { formatBigIntToNumber, formatDate, formatNumber, getChainName, getStatus } from '@/modules/global/utils'
import { TransactionCardDialog } from '@/modules/transactions/components'
import { Divider, EmptyBanner, Icon, Input, Spinner } from '@/ui/components'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Address } from 'viem'
import { sepolia } from 'viem/chains'
import { useAccount } from 'wagmi'
import { useGetAllVaultsCreated, useSaveUserSwap, useVaultSearch, useWithdraw } from '../hooks'
import { getTotalVaultAmount, getVaultRawAmount } from '../utils'
import { baseVaultType } from './DepositCard'
import { ProfileHeading } from './ProfileHeading'
import { VaultCardSkeleton } from './VaultCardSkeleton'
import { VaulRowSkeleton } from './VaultRowSkeleton'

export function UserVaults() {
  const [livePage, setLivePage] = useState(1)
  const [completedPage, setCompletedPage] = useState(1)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [selectedVault, setSelectedVault] = useState<baseVaultType | null>(null)
  const { address } = useAccount()
  const saveSwap = useSaveUserSwap()
  const queryClient = useQueryClient()

  // Vault data
  const { data: vaultBalance } = useGetVaultBalance(selectedVault?.address as Address)

  // Get live, coming and completed vaults.
  const { data: liveVaults, isLoading: isLoadingLive } = useGetAllVaultsCreated({
    userAddress: address!,
    page: livePage,
    limit: 6,
    live: true,
  })
  const {
    data: completedVaults,
    isLoading: isLoadingCompleted,
    refetch: refetchCompletedVaults,
  } = useGetAllVaultsCreated({
    userAddress: address!,
    page: completedPage,
    limit: 10,
    live: false,
  })

  // Withdraw hook
  const { withdraw, status: withdrawStatus } = useWithdraw({
    onSuccess: () => {
      refetchCompletedVaults()
      setWithdrawOpen(false)
    },
    onError: () => {
      setWithdrawOpen(false)
    },
  })

  // Filter to show only completed vaults that have any deposited value
  const vaultsToWithdraw = completedVaults?.items.filter(
    (v) => getTotalVaultAmount({ assetTokenDecimals: v.assetTokenDecimals }, v.swaps) > 0,
  )

  // Filter to show only completed vaults that doesn't have any deposited value to withdraw
  const filteredCompletedVaults = completedVaults?.items.filter(
    (v) => getTotalVaultAmount({ assetTokenDecimals: v.assetTokenDecimals }, v.swaps) === 0,
  )

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
    value: filteredVaultsToWithdraw,
    search: searchVaultsToWithdraw,
    setValue: setSearchVaultsToWithdraw,
  } = useVaultSearch({
    fields: vaultsToWithdraw,
    initialQuery: '',
  })

  const {
    value: searchfilteredCompletedVaults,
    search: searchCompletedVaults,
    setValue: setSearchCompletedVaults,
  } = useVaultSearch({
    fields: filteredCompletedVaults,
    initialQuery: '',
  })

  const handleWithdrawAll = async (vault: baseVaultType) => {
    // 1. Open the card dialog
    setSelectedVault(vault)
    setWithdrawOpen(true)

    // 2. Withdraw all vault value
    const withdrawTx = await withdraw({
      amount: getVaultRawAmount(vault.swaps),
      spenderAddress: vault?.address as Address,
      tokenAddress: vault?.assetTokenAddress as Address,
    })

    // 3. Save transaction on the database
    await saveSwap.mutateAsync({
      data: {
        amount: String(getVaultRawAmount(vault.swaps)),
        sender: String(address),
        txHash: String(withdrawTx?.hash),
        type: 'withdraw',
        vaultId: vault.id,
      },
    })

    toast.success('Withdraw made successfully', { duration: 4000 })

    // 4. Refetch the completed vaults and user transactions
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['get-user-transactions', address] }),
      queryClient.invalidateQueries({ queryKey: ['vaults', address] }),
    ])
  }

  return (
    <div className="flex flex-col w-full">
      <Divider className="mt-12" />

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
          iconLeft={<Icon className="text-indigo-300">search</Icon>}
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
                discord={vault.discord}
                telegram={vault.telegram}
                twitter={vault.twitter}
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
        <ProfileHeading
          id="user-completed-vaults-to-withdraw"
          className="mt-24"
          icon={<Icon className="!text-4xl">award_star</Icon>}
          title="Vaults to Withdraw"
          subtitle="Your completed vaults that have any deposited value to withdraw"
          valueLabel="Total Vaults To Withdraw"
          value={vaultsToWithdraw?.length || 0}
        />
        <Input
          className="w-full sm:max-w-[27rem]"
          iconLeft={<Icon className="text-indigo-300">search</Icon>}
          inputSize={'sm'}
          label="Search Vault"
          placeholder="Search your vaults by address,name, creator and chain name."
          value={searchVaultsToWithdraw}
          onChange={(e) => setSearchVaultsToWithdraw(e.target.value)}
        />

        {(!address || !filteredVaultsToWithdraw?.length) && !isLoadingCompleted && (
          <EmptyBanner
            className="mt-10 text-center"
            icon={<Icon className="!text-7xl text-white">sentiment_dissatisfied</Icon>}
            message="No Vaults to Withdraw found"
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
            {filteredVaultsToWithdraw?.map((vault, index) => (
              <BaseVaultCard
                key={`live_vault_${index}`}
                banner={vault.banner}
                logo={vault.logo}
                vaultName={vault.vaultName}
                discord={vault.discord}
                telegram={vault.telegram}
                twitter={vault.twitter}
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
                onWithdrawChange={() => {
                  handleWithdrawAll(vault)
                }}
              />
            ))}
          </div>
        )}
        <TransactionCardDialog
          className="min-h-64"
          title="Confirm your Remotion"
          subtitle="You Withdraw"
          chainName={getChainName(sepolia.id)}
          info={selectedVault?.vaultName}
          vaultLogo={selectedVault?.logo}
          value={formatBigIntToNumber(vaultBalance || 0n, selectedVault?.assetTokenDecimals || 0) || 0}
          tokenSymbol={selectedVault?.assetTokenSymbol || ''}
          isOpen={withdrawOpen}
          onOpenChange={setWithdrawOpen}
        >
          <div className="flex items-center gap-2">
            {withdrawStatus && <Spinner />}
            {withdrawStatus || 'Waiting...'}
          </div>
        </TransactionCardDialog>
      </section>

      {/* User completed vaults */}
      <section>
        <ProfileHeading
          id="user-completed-vaults"
          className="mt-24"
          icon={<Icon className="!text-4xl">bookmark_check</Icon>}
          title="Completed Vaults"
          valueLabel="Total Completed Vaults"
          value={filteredCompletedVaults?.length || 0}
        />

        <Input
          className="w-full sm:max-w-[27rem]"
          iconLeft={<Icon className="text-indigo-300">search</Icon>}
          inputSize={'sm'}
          label="Search Vault"
          placeholder="Search your vaults by address,name, creator and chain name."
          value={searchCompletedVaults}
          onChange={(e) => setSearchCompletedVaults(e.target.value)}
        />
        {(!address || !searchfilteredCompletedVaults?.length) && !isLoadingCompleted && (
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
        ) : searchfilteredCompletedVaults?.length ? (
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
                {searchfilteredCompletedVaults.map((vault, index) => (
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
