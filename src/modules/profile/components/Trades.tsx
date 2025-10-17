import { Icon } from '@/ui/components'
import { Button } from '@/ui/components/Button'

export function Trades() {
  return (
    <div className="h-[33.1rem] flex flex-col items-center justify-center">
      <div className="flex flex-col w-full gap-8 sm:items-center">
        <h1 className="sm:text-4xl text-3xl text-center">
          Deposit or Remove <br /> <span className="sm:text-3xl text-2xl text-gray-300">(anytime, anywhere)</span>
        </h1>
        <div>
          <div className="w-full card-transaction relative sm:min-w-[30rem] flex flex-col items-center justify-center p-2 gap-1 rounded-3xl ">
            <div className="w-full h-30 bg-gray-600 rounded-3xl"></div>
            <button
              className="absolute top-28 h-10 w-10 bg-gray-900 hover:bg-gray-950 flex items-center rounded-xl justify-center 
            cursor-pointer border-2 border-blue-800"
            >
              <Icon>Arrow_Downward</Icon>
            </button>
            <div className="w-full h-30 bg-transparent border border-blue-800 rounded-3xl"></div>

            <Button variant={'primary'} size={'xl'}>
              Deposit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
