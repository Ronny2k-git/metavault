import { formatBigIntToNumber, formatDate, toUpperCaseFirst } from '@/modules/global/utils'
import { Card } from '@/ui/components'
import { useAccount } from 'wagmi'
import { useGetAllUserTransactions } from '../hooks'

export function UserCardRowTrades({ id }: { id: string }) {
  const { address } = useAccount()
  const { data: userTransactions, isLoading } = useGetAllUserTransactions()

  // WIRING UP THE CARD ROW TRADES LATER WITH THE DATABASE DATA

  console.log(userTransactions)

  const mockData = [
    { type: 'Deposit', token: 'ETH', amount: 0.2, date: '2025-11-03 10:30' },
    { type: 'Withdraw', token: 'USDC', amount: 150, date: '2025-11-02 18:45' },
    { type: 'Deposit', token: 'DAI', amount: 50, date: '2025-11-01 14:12' },
    { type: 'Withdraw', token: 'USDC', amount: 150, date: '2025-11-02 18:45' },
    { type: 'Withdraw', token: 'UST', amount: 1500, date: '2025-11-02 18:15' },
    { type: 'Deposit', token: 'DAI', amount: 500, date: '2025-11-01 14:12' },
  ]

  return (
    <Card id={id} className="w-full flex flex-col gap-4 p-4 min-h-80 rounded-2xl shadow-2xs" variant={'gradient'}>
      <h3 className="text-lg font-semibold text-white">Your Recent Transactions</h3>

      <div className="flex flex-col gap-2">
        {/* Card row */}
        {isLoading || !address ? (
          <div>Loading...</div>
        ) : (
          userTransactions?.map((tx, index) => (
            <div
              key={`tx_${tx.txHash}_${index}`}
              className="flex justify-between items-center p-2 rounded-xl bg-black/30 hover:bg-black/50 transition cursor-pointer"
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
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
