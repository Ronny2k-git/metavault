import { Card } from '@/ui/components'

export function UserCardRowTrades({ id }: { id: string }) {
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
        {mockData.map((tx, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-2 rounded-xl bg-black/30 hover:bg-black/50 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-8 w-8 flex items-center justify-center rounded-full ${
                  tx.type === 'Deposit' ? 'bg-green-500' : 'bg-red-500'
                } text-white`}
              >
                {tx.type[0]}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">{tx.type}</span>
                <span className="text-gray-300 text-sm">{tx.date}</span>
              </div>
            </div>
            <span className={`font-semibold ${tx.type === 'Deposit' ? 'text-green-400' : 'text-red-400'}`}>
              {tx.amount} {tx.token}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
