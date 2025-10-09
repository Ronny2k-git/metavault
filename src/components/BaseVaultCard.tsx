import type { VaultCreateFormType } from '@/modules/create/schemas/VaultCreateFormSchema'
import type { vaultStatus } from '@/modules/global/types'
import { Collapsible } from 'radix-ui'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { StatusChip } from './StatusChip'

interface BaseVaultProps
  extends Omit<VaultCreateFormType, 'salt' | 'assetToken'> {
  description: string
  status: vaultStatus
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
    <div className="w-full relative max-w-[20rem] background-vault-card md:min-w-[20rem] border h-auto rounded-md border-cyan-400">
      <div className="absolute w-full flex justify-center">
        <StatusChip status={data.status} />
      </div>
      <img
        className="rounded-md mb-2 h-[17rem] w-full object-cover"
        src={isValidUrl(data.banner) ? data.banner : '/default-banner.jpg'}
        onError={(e) => (e.currentTarget.src = '/default-banner.jpg')}
      />
      <div className="flex gap-2 mx-2">
        <img
          className="size-10 rounded-full object-cover"
          src={isValidUrl(data.logo) ? data.logo : '/default-icon.webp'}
          onError={(e) => (e.currentTarget.src = '/default-icon.webp')}
        />
        <div className="text-white">
          {data.vaultName || 'Unammed'}
          <div className="text-xs -mt-0.5">
            {data.network || 'No chain selected'}
          </div>
        </div>
      </div>
      <div className="flex flex-col my-2 mx-2 gap-0.5">
        <div className="flex font-SpaceGrotesk justify-between">
          <h3>Minimum Deposit</h3>
          <div className="text-gray-300">{data.minDeposit || 0}</div>
        </div>
        <div className="flex font-SpaceGrotesk justify-between">
          <h3>Max dep.per wallet</h3>
          <div className="text-gray-300">{data.maxDeposit || 0}</div>
        </div>
        <div className="flex font-SpaceGrotesk justify-between">
          <h3>Start Date</h3>
          <div className="text-gray-300">{data.startDate || '00/00/0000'}</div>
        </div>
        <div className="flex font-SpaceGrotesk justify-between">
          <h3>End Date</h3>
          <div className="text-gray-300">{data.endDate || '00/00/0000'}</div>
        </div>

        <Collapsible.Root>
          <Collapsible.Trigger className="group w-full" asChild>
            <button className="relative p-1 mt-2 text-sm w-full bg-sky-600 hover:bg-sky-500  rounded-full cursor-pointer">
              <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 right-4 top-1 size-5" />
              Description
              <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 left-4 top-1 size-5" />
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content className="mt-2">
            <div className="py-2 px-3 min-h-16 text-md break-all rounded-md text-gray-300 border border-cyan-300">
              <span className="text-gray-300">{data.description}</span>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </div>
  )
}
