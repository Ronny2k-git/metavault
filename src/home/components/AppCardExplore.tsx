import { Modal } from '@/ui/components'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { CARD_ROUTER_PATHS } from '../utils'
import { CardRouter } from './CardRouter'

export type AppCardExploreProps = {
  trigger: React.ReactNode
  className?: string
}

export function AppCardExplore({ trigger, className }: AppCardExploreProps) {
  const navigate = useNavigate()
  const { t } = useTranslation('home')

  const translatedCards = t('explore.cards', { returnObjects: true }) as Array<{ title: string; desc: string }>

  return (
    <Modal
      className={twMerge('max-w-4xl max-h-[90vh] overflow-y-auto', className)}
      variant={'gradient2'}
      title={t('explore.title')}
      titleStyle="text-3xl flex justify-center"
      trigger={trigger}
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(193px,1fr))] gap-4 m-3">
        {CARD_ROUTER_PATHS.map((value, index) => (
          <CardRouter
            key={index}
            className="hover:border-x-4 hover:border-t-4 hover:scale-105 cursor-pointer"
            title={translatedCards[index].title}
            img={value.img}
            desc={translatedCards[index].desc}
            path={value.path}
            tab={value.tab!}
            onSelectTab={(tab) => navigate({ to: '/profile', search: { tab } })}
            onNavigate={(path) => navigate({ to: path })}
          />
        ))}
      </div>
    </Modal>
  )
}
