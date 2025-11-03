import { Card, Divider, Icon } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { useState } from 'react'
import { DepositCard } from './DepositCard'
import { UserCardRowTrades } from './UserCardRowTrades'
import { WithdrawCard } from './WithdrawCard'

export function Trades() {
  const [activeCard, setActiveCard] = useState<'Deposit' | 'Withdraw' | null>('Deposit')

  return (
    <div className="h-full w-full flex flex-col relative">
      <Divider />

      <div className="flex flex-col w-full gap-8 items-center mt-12">
        <h1 className="sm:text-4xl text-3xl text-center">
          Deposit or Withdraw <br /> <span className="sm:text-3xl text-2xl text-gray-300">(anytime, anywhere)</span>
        </h1>
        <div className="w-full flex flex-col items-center">
          <Card
            variant={'gradient'}
            className="relative w-full max-w-[30rem] min-h-81 flex flex-col items-center p-2 gap-1 rounded-3xl "
          >
            <button
              className="absolute top-31 h-10 w-10 bg-gray-900 hover:bg-black/40 flex items-center rounded-xl justify-center 
            cursor-pointer border-2 border-blue-900"
              onClick={() => setActiveCard(activeCard === 'Deposit' ? 'Withdraw' : 'Deposit')}
            >
              <Icon>Arrow_Downward</Icon>
            </button>

            {/* Deposit in a vault */}
            <DepositCard
              title="Deposit"
              variant={'secondary'}
              disabled={activeCard === 'Withdraw'}
              trigger={<Button className={`h-7 max-w-44 rounded-3xl text-sm `}>Select Vault and Token</Button>}
            />

            {/* Withdraw in a vault */}
            <WithdrawCard
              title="Withdraw"
              variant={'secondary'}
              disabled={activeCard === 'Deposit'}
              trigger={<Button className={`h-7 max-w-44 rounded-3xl text-sm `}>Select Vault and Token</Button>}
            />
            <Button className="text-lg" variant={'primary'} size={'xl'}>
              {activeCard}
            </Button>
          </Card>
        </div>
        <p className="text-center max-sm:text-base text-lg max-w-[30rem] text-gray-300 mb-5">
          Deposit or withdraw in a vault on sepolia ethereum network anytime, anywhere
        </p>

        <Divider />

        {/* User Transactions */}
        <UserCardRowTrades />
      </div>
    </div>
  )
}
