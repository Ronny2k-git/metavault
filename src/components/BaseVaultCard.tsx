import type { VaultDataFormType } from '@/modules/create/schemas/VaultDataFormSchema'
import type { vaultStatus } from '@/modules/global/types'
import { formatDate, formatNumber } from '@/modules/global/utils'
import { Card } from '@/ui/components'
import { DiscordIcon, TelegramIcon, TwitterIcon } from '@/ui/components/icons'
import { Collapsible } from 'radix-ui'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { StatusChip } from './StatusChip'

interface BaseVaultProps extends Omit<VaultDataFormType, 'assetToken' | 'salt'> {
  description: string
  startDate?: Date
  endDate?: Date
  status: vaultStatus
  discordIcon?: React.ReactNode
  telegramIcon?: React.ReactNode
  twitterIcon?: React.ReactNode
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
    <Card variant={`${data.status === 'live' ? 'basic2' : 'basic'}`} className={'relative lg:max-w-[20rem] rounded-md'}>
      <div className="absolute w-full flex justify-center">
        <StatusChip status={data.status} />
      </div>
      <img
        className="rounded-md mb-2 h-[17rem] w-full object-cover"
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

      <div className="flex flex-col my-4 mx-2 gap-0.5">
        <div className="flex font-SpaceGrotesk justify-between">
          <h3>Creator</h3>
          <div className="text-gray-300">{data.creatorName || 'unnamed'}</div>
        </div>
        <div className="flex font-SpaceGrotesk justify-between">
          <h3>Min dep per wallet</h3>
          <div className="text-gray-300">{data.minDeposit || 0}</div>
        </div>
        <div className="flex font-SpaceGrotesk justify-between">
          <h3>Max dep per wallet</h3>
          <div className="text-gray-300">{formatNumber(Number(data.maxDeposit)) || 0}</div>
        </div>
        <div className="flex font-SpaceGrotesk justify-between">
          <h3>Start Date</h3>
          <div className="text-gray-300">{formatDate(Number(data.startDate)) || '00/00/0000'}</div>
        </div>
        <div className="flex font-SpaceGrotesk justify-between">
          <h3>End Date</h3>
          <div className="text-gray-300">{formatDate(Number(data.endDate)) || '00/00/0000'}</div>
        </div>

        {data.children}
      </div>
      <div className="relative my-2 mx-1">
        <Collapsible.Root>
          <Collapsible.Trigger className="group w-full" asChild>
            <button className="relative p-1 mt-2 text-sm w-full bg-sky-600 hover:bg-sky-500  rounded-full cursor-pointer">
              <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 right-4 top-1 size-5" />
              Description
              <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 left-4 top-1 size-5" />
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content className="w-full mt-3 absolute z-1">
            <div
              className={`${data.status === 'live' ? 'bg-[#0a2278]' : 'bg-[#234adb]'} py-2 px-3 min-h-16 text-md break-all rounded-md text-gray-300 border border-cyan-300`}
            >
              <span className="text-gray-300">{data.description}</span>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </Card>
  )
}
