import type { VaultDataFormType } from '@/modules/create/schemas/VaultDataFormSchema'
import { CountDownClock } from '@/modules/global/components'
import type { vaultStatus } from '@/modules/global/types'
import { formatDate, formatNumber } from '@/modules/global/utils'
import { Card, Icon } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { DiscordIcon, TelegramIcon, TwitterIcon } from '@/ui/components/icons'
import { Collapsible } from 'radix-ui'
import { useTranslation } from 'react-i18next'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { StatusChip } from './StatusChip'

interface BaseVaultProps extends Omit<VaultDataFormType, 'assetToken' | 'salt'> {
  description: string
  tokenName?: string
  startDate: Date
  endDate: Date
  status: vaultStatus
  discord?: React.ReactNode
  telegram?: React.ReactNode
  twitter?: React.ReactNode
  address?: string
  deposited?: number
  onWithdrawChange?: () => void
  children?: React.ReactNode
}

export function BaseVaultCard(data: BaseVaultProps) {
  const { t } = useTranslation('global', { keyPrefix: 'baseVaultCard' })

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <Card variant={`${data.status === 'live' ? 'basic2' : 'basic'}`} className={'relative lg:max-w-[23rem] rounded-lg'}>
      <div className="absolute w-full flex justify-center">
        <StatusChip status={data.status} />
      </div>

      <img
        className="rounded-lg mb-2 h-[14rem] w-full object-cover"
        src={isValidUrl(data.banner) ? data.banner : '/default-banner.jpg'}
        onError={(e) => (e.currentTarget.src = '/default-banner.jpg')}
      />
      <div className="w-full flex justify-between px-2">
        <div className="flex gap-2 mx-">
          <img
            className="size-10 rounded-full object-cover"
            src={isValidUrl(data.logo) ? data.logo : '/default-icon.webp'}
            onError={(e) => (e.currentTarget.src = '/default-icon.webp')}
          />
          <div className="flex flex-col">
            {data.vaultName || 'Unammed'}
            <div className="text-xs -mt-0.5">{data.network || 'No chain selected'}</div>
          </div>
        </div>

        {/* User Vault Socials */}
        <div className="flex gap-2 items-center">
          {data.discord && (
            <a className="hover:mb-1 hover:border-b-1" href={String(data.discord)}>
              <DiscordIcon />
            </a>
          )}
          {data.telegram && (
            <a className="hover:mb-1 hover:border-b-1" href={String(data.telegram)}>
              <TelegramIcon />
            </a>
          )}
          {data.twitter && (
            <a className="hover:mb-1 hover:border-b-1" href={String(data.twitter)}>
              <TwitterIcon />
            </a>
          )}
        </div>
      </div>

      <section className="flex flex-col mt-4 mb-2 mx-2 gap-0.5 text-[15px]">
        <div className="flex justify-between">
          <h3>{t('creator')}</h3>
          <div className="text-indigo-300">{data.creatorName || 'unnamed'}</div>
        </div>

        {data.tokenName && (
          <div className="flex justify-between">
            <h3>{t('tokenName')}:</h3>
            <div className="text-indigo-300">{data.tokenName || 'Unknown'}</div>
          </div>
        )}

        {/* Vault data */}
        <div className="flex justify-between">
          <div className="flex gap-1">
            <h3>{t('minDeposit')}:</h3>
            <div className="text-indigo-300">{data.minDeposit || 0}</div>
          </div>
          <div className="flex gap-1">
            <h3>{t('start')}:</h3>
            <div className="text-indigo-300">{formatDate(Number(data.startDate)) || '00/00/0000'}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <h3>{t('maxDeposit')}:</h3>
            <div className="text-indigo-300">{formatNumber(Number(data.maxDeposit)) || 0}</div>
          </div>

          <div className="flex gap-1">
            <h3>{t('end')}:</h3>
            <div className="text-indigo-300">{formatDate(Number(data.endDate)) || '00/00/0000'}</div>
          </div>
        </div>

        {data.status != 'ended' ? (
          <div className="flex flex-col items-center mt-3">
            <h3>{data.status === 'coming' ? t('countdownLabels.start') : t('countdownLabels.end')}</h3>

            <CountDownClock startDate={data.startDate} endDate={data.endDate} />
          </div>
        ) : (
          <Card variant={'tertiary'} className="items-center mt-3 py-2 rounded-lg">
            <p className="text-base text-white">{t('status.ended')}: </p>
            <p className="text-lg font-bold text-indigo-300">{formatDate(data.endDate, 'long')}</p>
          </Card>
        )}
      </section>

      <div className="h-0.5 mt-2 w-full bg-gradient-to-r via-purple-900/90" />

      <section className="flex flex-col px-2">
        {data.status != 'ended' && data.deposited != null ? (
          <Card variant={'tertiary'} className="items-center mt-3 py-2 rounded-lg">
            <p className="text-sm text-white">{t('deposited')}</p>
            <p className="text-xl font-bold text-indigo-300">{formatNumber(data.deposited)}</p>
          </Card>
        ) : (
          <Button
            variant="gradient"
            className=" rounded-3xl my-4 py-3"
            onClick={data.onWithdrawChange}
            iconLeft={<Icon className="text-indigo-300">account_balance_wallet</Icon>}
          >
            {t('withdraw')}
          </Button>
        )}

        {data.address && (
          <div className="flex items-center justify-between">
            <h3>{t('view')}</h3>
            <a href={`https://sepolia.etherscan.io/address/${data.address}`}>
              <Icon className="mt-1 hover:border-b-1 text-indigo-300">eye_tracking</Icon>
            </a>
          </div>
        )}
        {data.children}
      </section>

      <div className="relative mb-2 mx-1">
        <Collapsible.Root>
          <Collapsible.Trigger className="group w-full" asChild>
            <Button className="relative p-1 mt-2 text-sm w-ful rounded-full cursor-pointer" variant={'gradient'}>
              <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 left-4 top-1/2 -translate-y-1/2 size-5" />
              {t('desc')}
              <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 right-4 top-1/2 -translate-y-1/2 size-5" />
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content className="w-full mt-3 absolute z-1">
            <Card
              className="py-2 px-3 min-h-16 break-all rounded-md"
              variant={data.status === 'live' ? 'basic2' : 'basic'}
            >
              <span>{data.description}</span>
            </Card>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </Card>
  )
}
