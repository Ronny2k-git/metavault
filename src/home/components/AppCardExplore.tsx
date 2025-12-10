import { Modal } from '@/ui/components'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
// import { CARD_ROUTER_INFO } from '../utils'
import { CardRouter } from './CardRouter'

export type AppCardExploreProps = {
  trigger: React.ReactNode
  className?: string
}

export const CARD_ROUTER_INFO = [
  { id: 'createVault', path: '/create-vault', img: '/icons/create.png', tab: null },
  { id: 'userVaults', img: '/icons/manage.png', tab: 'user-vaults' },
  { id: 'operation', img: '/icons/trade.png', tab: 'operation' },
  { id: 'editProfile', img: '/icons/edit.png', tab: 'edit-profile' },
]

export function AppCardExplore({ trigger, className }: AppCardExploreProps) {
  const navigate = useNavigate()
  const { t } = useTranslation('explore')

  return (
    <Modal
      className={twMerge('max-w-4xl max-h-[90vh] overflow-y-auto', className)}
      variant={'gradient2'}
      title={t('title')}
      titleStyle="text-3xl flex justify-center"
      trigger={trigger}
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(193px,1fr))] gap-4 m-3">
        {CARD_ROUTER_INFO.map((value, index) => (
          <CardRouter
            key={index}
            className="hover:border-x-4 hover:border-t-4 hover:scale-105 cursor-pointer"
            title={t(`items.${value.id}.title`)}
            img={value.img}
            desc={t(`items.${value.id}.desc`)}
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
