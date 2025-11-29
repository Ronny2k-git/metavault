import { Modal } from '@/ui/components'
import { twMerge } from 'tailwind-merge'
import { CARD_ROUTER_INFO } from '../utils'
import { CardRouter } from './CardRouter'

export type AppCardExploreProps = {
  trigger: React.ReactNode
  className?: string
}

export function AppCardExplore({ trigger, className }: AppCardExploreProps) {
  return (
    <Modal className={twMerge('max-w-4xl overflow-y-auto', className)} variant={'gradient2'} title="" trigger={trigger}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 m-2">
        {CARD_ROUTER_INFO.map((value, index) => (
          <CardRouter className="hover:border-x-4 hover:border-t-4 hover:scale-110 cursor-pointer" />
        ))}
      </div>
    </Modal>
  )
}
