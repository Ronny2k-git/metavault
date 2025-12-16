import { Pagination } from '@/modules/global/components/Pagination'
import { useDebounce } from '@/modules/global/hooks'
import { formatBigIntToNumber, formatDate, formatNumber, toUpperCaseFirst } from '@/modules/global/utils'
import { Card, EmptyBanner, Icon } from '@/ui/components'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { useAccount } from 'wagmi'
import { useGetAllUserTransactions } from '../hooks'
import { UserTransactionRowSkeleton } from './UserTransactionRowSkeleton'

export type baseTransactionType = ReturnType<typeof useGetAllUserTransactions>['data']

export type UserCardRowTradesProps = {
  userTransactions: baseTransactionType
  isLoading?: boolean
  page: number
  onPageChange: (page: number) => void
  searchTransaction: string
  className?: string
}

export function UserCardRowTrades({
  userTransactions,
  isLoading,
  page,
  onPageChange,
  searchTransaction,
  className,
}: UserCardRowTradesProps) {
  const { address } = useAccount()
  const debouncedValue = useDebounce(searchTransaction, 300)
  const { t: tCardTransaction } = useTranslation('profile', { keyPrefix: 'operation.transactions' })
  const { t: tBanner } = useTranslation('global', { keyPrefix: 'emptyBanner.operation.transactions' })

  // Filter the user recent transactions by type and tx hash.
  const filteredTransactions = userTransactions?.items.filter((t) => {
    const searchLower = debouncedValue.toLowerCase()

    return t.txHash.toLowerCase() === searchLower || t.type.toLowerCase().includes(searchLower)
  })

  return (
    <div className={twMerge('flex flex-col items-center justify-center gap-8', className)}>
      {(!address || !filteredTransactions?.length) && !isLoading ? (
        <EmptyBanner
          icon={<Icon className="!text-7xl text-white">sentiment_dissatisfied</Icon>}
          message={tBanner('message')}
          subMessage={tBanner('subMessage')}
          buttonLabel={tBanner('buttonLabel')}
        />
      ) : (
        <Card
          id={'user-recent-transactions'}
          className="w-full flex flex-col gap-4 p-4 min-h-[28rem] rounded-2xl shadow-2xs"
          variant={'gradient'}
        >
          <h3 className="text-lg font-semibold text-white">{tCardTransaction('mainCard.title')}</h3>

          <div className=" flex flex-col gap-2">
            {/* Card row transaction */}
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => <UserTransactionRowSkeleton key={index} />)
              : filteredTransactions?.map((tx, index) => (
                  <a href={`https://sepolia.etherscan.io/tx/${tx.txHash}`} title={tCardTransaction('mainCard.view')}>
                    <div
                      key={`tx_${tx.txHash}_${index}`}
                      className="flex justify-between items-center [460px]:flex-col gap-4 px-4 py-2 rounded-xl bg-black/30 hover:bg-black/50 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-8 w-8 flex items-center justify-center rounded-full ${
                            tx.type === 'deposit' ? 'bg-green-500' : 'bg-red-500'
                          } text-white`}
                        >
                          {tx.type[0].toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-white">
                            {toUpperCaseFirst(tCardTransaction(`mainCard.cardTransaction.${tx.type}`))}
                          </span>
                          <span className="text-gray-300 text-sm">{formatDate(tx.createdAt, 'long')}</span>
                        </div>
                      </div>
                      <span className={`font-semibold ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                        {formatNumber(formatBigIntToNumber(BigInt(tx.amount), tx.vault.assetTokenDecimals))}{' '}
                        {tx.vault.assetTokenSymbol}
                      </span>
                    </div>
                  </a>
                ))}
          </div>
        </Card>
      )}

      {userTransactions && userTransactions.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={userTransactions?.totalPages}
          scrollId="user-transactions-heading"
          onChange={onPageChange}
        />
      )}
    </div>
  )
}
