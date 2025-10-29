import { Card, Divider, Icon } from '@/ui/components'
import { Button } from '@/ui/components/Button'

export function Trades() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Divider />
      <div className="flex flex-col w-full gap-8 sm:items-center mb-5 mt-12">
        <h1 className="sm:text-4xl text-3xl text-center">
          Deposit or Withdraw <br /> <span className="sm:text-3xl text-2xl text-gray-300">(anytime, anywhere)</span>
        </h1>
        <div>
          <Card
            variant={'glow'}
            className="relative mb-20 sm:min-w-[30rem] flex flex-col items-center p-2 gap-1 rounded-3xl "
          >
            <Card variant={'secondary'} className="h-30 p-4 border-0 rounded-3xl">
              CARD
            </Card>
            <button
              className="absolute top-28 h-10 w-10 bg-gray-900 hover:bg-gray-950 flex items-center rounded-xl justify-center 
            cursor-pointer border-2 border-blue-800"
            >
              <Icon>Arrow_Downward</Icon>
            </button>
            <Card variant={'tertiary'} className="h-30 p-4 border-0 rounded-3xl">
              CARD
            </Card>

            <Button variant={'primary'} size={'xl'}>
              Deposit
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
