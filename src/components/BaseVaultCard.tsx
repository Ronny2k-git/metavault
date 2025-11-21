import type { VaultDataFormType } from '@/modules/create/schemas/VaultDataFormSchema'
import { CountDownClock } from '@/modules/global/components'
import type { vaultStatus } from '@/modules/global/types'
import { formatDate, formatNumber } from '@/modules/global/utils'
import { Card, Icon } from '@/ui/components'
import { DiscordIcon, TelegramIcon, TwitterIcon } from '@/ui/components/icons'
import { Collapsible } from 'radix-ui'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { StatusChip } from './StatusChip'

interface BaseVaultProps extends Omit<VaultDataFormType, 'assetToken' | 'salt'> {
  description: string
  tokenName?: string
  startDate: Date
  endDate: Date
  status: vaultStatus
  discordIcon?: React.ReactNode
  telegramIcon?: React.ReactNode
  twitterIcon?: React.ReactNode
  address?: string
  deposited?: number
  children?: React.ReactNode
}

export function BaseVaultCard(data: BaseVaultProps) {
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

        <div className="flex gap-2 items-center">
          {data.discordIcon && (
            <a className="hover:mb-1 hover:border-b-1" href={String(data.discordIcon)}>
              <DiscordIcon />
            </a>
          )}
          {data.telegramIcon && (
            <a className="hover:mb-1 hover:border-b-1" href={String(data.telegramIcon)}>
              <TelegramIcon />
            </a>
          )}
          {data.twitterIcon && (
            <a className="hover:mb-1 hover:border-b-1" href={String(data.twitterIcon)}>
              <TwitterIcon />
            </a>
          )}
        </div>
      </div>

      <section className="flex flex-col mt-4 mb-2 mx-2 gap-0.5 text-[15px]">
        <div className="flex justify-between">
          <h3>Creator</h3>
          <div className="text-gray-300">{data.creatorName || 'unnamed'}</div>
        </div>

        {data.tokenName && (
          <div className="flex justify-between">
            <h3>TokenName:</h3>
            <div className="text-gray-300">{data.tokenName || 'Unknown'}</div>
          </div>
        )}

        <div className="flex justify-between">
          <div className="flex gap-1">
            <h3>Min dep:</h3>
            <div className="text-gray-300">{data.minDeposit || 0}</div>
          </div>
          <div className="flex gap-1">
            <h3>Start:</h3>
            <div className="text-gray-300">{formatDate(Number(data.startDate)) || '00/00/0000'}</div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-1">
            <h3>Max dep:</h3>
            <div className="text-gray-300">{formatNumber(Number(data.maxDeposit)) || 0}</div>
          </div>

          <div className="flex gap-1">
            <h3>End:</h3>
            <div className="text-gray-300">{formatDate(Number(data.endDate)) || '00/00/0000'}</div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-1">
          <h3>{data.status === 'coming' ? 'Starts in:' : 'Finish in:'}</h3>

          <CountDownClock startDate={data.startDate} endDate={data.endDate} />
        </div>
      </section>

      <div className="h-0.5 mt-2 w-full bg-gradient-to-r via-sky-500" />

      <section className="flex flex-col px-2">
        {data.deposited != null && (
          <Card variant={'tertiary'} className="items-center mt-3 py-2 rounded-lg">
            <p className="text-sm text-white">Total Deposited</p>
            <p className="text-xl font-bold text-blue-300">{formatNumber(data.deposited)}</p>
          </Card>
        )}

        {data.address && (
          <div className="flex items-center justify-between">
            <h3>View Vault</h3>
            <a href={`https://sepolia.etherscan.io/address/${data.address}`}>
              <Icon className="mt-1 hover:border-b-1 text-sky-300">eye_tracking</Icon>
            </a>
          </div>
        )}
        {data.children}
      </section>

      <div className="relative mb-2 mx-1">
        <Collapsible.Root>
          <Collapsible.Trigger className="group w-full" asChild>
            <button className="relative p-1 mt-2 text-sm w-full bg-black/20 hover:bg-black/30  rounded-full cursor-pointer">
              <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 left-4 top-1/2 -translate-y-1/2 size-5" />
              Vault Description
              <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 right-4 top-1/2 -translate-y-1/2 size-5" />
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content className="w-full mt-3 absolute z-1">
            <div
              className={`${data.status === 'live' ? 'bg-[#023dbc]' : 'bg-[#234adb]'} py-2 px-3 min-h-16 break-all rounded-md text-gray-300 border border-cyan-300`}
            >
              <span>{data.description}</span>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </Card>
  )
}
