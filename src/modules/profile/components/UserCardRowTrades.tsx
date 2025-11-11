import { formatBigIntToNumber, formatDate, toUpperCaseFirst } from '@/modules/global/utils'
import { Card, Icon } from '@/ui/components'
import { useAccount } from 'wagmi'
import { useGetAllUserTransactions } from '../hooks'
import { UserTransactionRowSkeleton } from './UserTransactionRowSkeleton'

export function UserCardRowTrades({ id }: { id: string }) {
  const { address } = useAccount()
  const { data: userTransactions, isLoading } = useGetAllUserTransactions()

  return (
    <Card id={id} className="w-full flex flex-col gap-4 p-4 min-h-[29rem] rounded-2xl shadow-2xs" variant={'gradient'}>
      <h3 className="text-lg font-semibold text-white">Your Recent Transactions</h3>

      {!address && !isLoading && (
        <div className="flex flex-1 w-full h-full flex-col items-center justify-center gap-4 text-sky-600 mb-6 ">
          <Icon className="!text-6xl">sentiment_dissatisfied</Icon>
          <h2 className="text-4xl max-sm:text-2xl text-center">No transactions found</h2>
          <p className="text-md text-center sm:px-4 py-2 break-words sm:py-1 text-blue-300 rounded-full">
            Deposit or withdraw in a vault or connect you wallet
          </p>
        </div>
      )}

      <div className=" flex flex-col gap-2">
        {/* Card row */}
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => <UserTransactionRowSkeleton key={index} />)
          : userTransactions?.map((tx, index) => (
              <a href={`https://sepolia.etherscan.io/tx/${tx.txHash}`} title="View your transaction on the blockchain">
                <div
                  key={`tx_${tx.txHash}_${index}`}
                  className="flex justify-between items-center px-4 py-2 rounded-xl bg-black/30 hover:bg-black/50 transition cursor-pointer"
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
                      <span className="font-semibold text-white">{toUpperCaseFirst(tx.type)}</span>
                      <span className="text-gray-300 text-sm">{formatDate(tx.createdAt)}</span>
                    </div>
                  </div>
                  <span className={`font-semibold ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                    {formatBigIntToNumber(BigInt(tx.amount), tx.vault.assetTokenDecimals)} {tx.vault.assetTokenSymbol}
                  </span>
                  {/* <a href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}>
                <Button className="max-w-16 mx-4 px-4 text-white" size="xs">
                  view
                </Button>
              </a> */}
                </div>
              </a>
            ))}
      </div>
    </Card>
  )
}
