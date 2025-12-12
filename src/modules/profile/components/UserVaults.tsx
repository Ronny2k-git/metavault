import { BaseVaultCard, BaseVaultRow } from '@/components'
import { Pagination } from '@/modules/global/components/Pagination'
import { useGetVaultBalance } from '@/modules/global/hooks'
import { formatBigIntToNumber, formatDate, formatNumber, getChainName, getStatus } from '@/modules/global/utils'
import { TransactionCardDialog } from '@/modules/transactions/components'
import { Divider, EmptyBanner, Icon, Input, Spinner } from '@/ui/components'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('global')
  const { t: t2 } = useTranslation('profile', { keyPrefix: 'userVaults' })

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
    messages: {
      approve: t2('status.approve'),
      simulate: t2('status.simulate'),
      withdraw: t2('status.withdraw'),
      success: t2('status.success'),
    },
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

    toast.success(t2('status.success'), { duration: 4000 })

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
          title={t2('heading.live.title')}
          subtitle={t2('heading.live.subtitle')}
          valueLabel={t2('heading.live.info')}
          value={liveVaults?.total || 0}
        />
        <Input
          className="w-full sm:max-w-[27rem]"
          iconLeft={<Icon className="text-indigo-300">search</Icon>}
          inputSize={'sm'}
          label={t2('inputs.info.label')}
          placeholder={t2('inputs.info.placeholder')}
          value={searchLiveVaults}
          onChange={(e) => setSearchLiveVaults(e.target.value)}
        />

        {(!address || !filteredLiveVaults?.length) && !isLoadingLive && (
          <EmptyBanner
            className="mt-10 text-center"
            icon={<Icon className="!text-7xl text-white">sentiment_dissatisfied</Icon>}
            message={t('emptyBanner.userVaults.live.message')}
            subMessage={t('emptyBanner.userVaults.live.subMessage')}
            buttonLabel={t('emptyBanner.userVaults.live.buttonLabel')}
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
              totalPages={liveVaults?.totalPages}
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
          title={t2('heading.toWithdraw.title')}
          subtitle={t2('heading.toWithdraw.subtitle')}
          valueLabel={t2('heading.toWithdraw.info')}
          value={vaultsToWithdraw?.length || 0}
        />
        <Input
          className="w-full sm:max-w-[27rem]"
          iconLeft={<Icon className="text-indigo-300">search</Icon>}
          inputSize={'sm'}
          label={t2('inputs.info.label')}
          placeholder={t2('inputs.info.placeholder')}
          value={searchVaultsToWithdraw}
          onChange={(e) => setSearchVaultsToWithdraw(e.target.value)}
        />

        {(!address || !filteredVaultsToWithdraw?.length) && !isLoadingCompleted && (
          <EmptyBanner
            className="mt-10 text-center"
            icon={<Icon className="!text-7xl text-white">sentiment_dissatisfied</Icon>}
            message={t('emptyBanner.userVaults.toWithdraw.message')}
            subMessage={t('emptyBanner.userVaults.toWithdraw.subMessage')}
            buttonLabel={t('emptyBanner.userVaults.toWithdraw.buttonLabel')}
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
            {withdrawStatus || t2('status.wait')}
          </div>
        </TransactionCardDialog>
      </section>

      {/* User completed vaults */}
      <section>
        <ProfileHeading
          id="user-completed-vaults"
          className="mt-24"
          icon={<Icon className="!text-4xl">bookmark_check</Icon>}
          title={t2('heading.completed.title')}
          subtitle={t2('heading.completed.subtitle')}
          valueLabel={t2('heading.completed.info')}
          value={filteredCompletedVaults?.length || 0}
        />

        <Input
          className="w-full sm:max-w-[27rem]"
          iconLeft={<Icon className="text-indigo-300">search</Icon>}
          inputSize={'sm'}
          label={t2('inputs.info.label')}
          placeholder={t2('inputs.info.placeholder')}
          value={searchCompletedVaults}
          onChange={(e) => setSearchCompletedVaults(e.target.value)}
        />
        {(!address || !searchfilteredCompletedVaults?.length) && !isLoadingCompleted && (
          <EmptyBanner
            className="mt-10 text-center"
            icon={<Icon className="!text-7xl text-white">sentiment_dissatisfied</Icon>}
            message={t('emptyBanner.userVaults.completed.message')}
            subMessage={t('emptyBanner.userVaults.completed.subMessage')}
            buttonLabel={t('emptyBanner.userVaults.completed.buttonLabel')}
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
                      <div className="flex-1 pl-30">{t('table.header.name')}</div>
                      <div className="w-32 text-center">{t('table.header.minDeposit')}</div>
                      <div className="w-32 text-center">{t('table.header.maxDeposit')}</div>
                      <div className="w-32 text-center">{t('table.header.end')}</div>
                      <div className="w-24 text-center">{t('table.header.view')}</div>
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
                    network={t('table.baseVaultRow.network')}
                    minDeposit={vault.minDeposit}
                    maxDeposit={formatNumber(Number(vault.maxDeposit))}
                    endDate={formatDate(Number(vault.endDate))}
                    tx={vault.address}
                    status={getStatus({
                      startDate: String(vault.startDate),
                      endDate: String(vault.endDate),
                    })}
                    buttonLabel={t('table.baseVaultRow.buttonLabel')}
                  />
                ))}
              </tbody>
            </table>
            {completedVaults && completedVaults?.totalPages > 1 && (
              <Pagination
                key={completedPage}
                page={completedPage}
                totalPages={completedVaults?.totalPages}
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
