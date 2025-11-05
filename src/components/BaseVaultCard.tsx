import type { VaultDataFormType } from '@/modules/create/schemas/VaultDataFormSchema'
import type { vaultStatus } from '@/modules/global/types'
import { formatDate, formatNumber } from '@/modules/global/utils'
import { Card, Icon } from '@/ui/components'
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
    <Card variant={`${data.status === 'live' ? 'basic2' : 'basic'}`} className={'relative lg:max-w-[20rem] rounded-lg'}>
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

      <div className="flex flex-col mt-4 mb-2 mx-2 gap-0.5 text-[15px]">
        <div className="flex justify-between">
          <h3 className="text-gray-300">Creator</h3>
          <div>{data.creatorName || 'unnamed'}</div>
        </div>
        <div className="flex justify-between">
          <h3 className="text-gray-300">Min dep per wallet</h3>
          <div>{data.minDeposit || 0}</div>
        </div>

        <div className="flex justify-between">
          <h3 className="text-gray-300">Max dep per wallet</h3>
          <div>{formatNumber(Number(data.maxDeposit)) || 0}</div>
        </div>

        <div className="h-0.5 my-2 w-full bg-gradient-to-r via-sky-500" />

        <div className="flex justify-between">
          <h3 className="text-gray-300">Start Date</h3>
          <div>{formatDate(Number(data.startDate)) || '00/00/0000'}</div>
        </div>
        <div className="flex justify-between">
          <h3 className="text-gray-300">End Date</h3>
          <div>{formatDate(Number(data.endDate)) || '00/00/0000'}</div>
        </div>

        {data.deposited != null && (
          <div className="text-center mt-3 mb-2 bg-blue-900/50 border border-blue-500/40 py-2 rounded-lg">
            <p className="text-sm text-gray-300">Total Deposited</p>
            <p className="text-xl font-bold text-white">{data.deposited}</p>
          </div>
        )}

        {data.address && (
          <div className="flex justify-between">
            <h3 className="text-gray-300">View Vault</h3>
            <a href={`https://sepolia.etherscan.io/address/${data.address}`}>
              <Icon className="mt-1 hover:border-b-1 text-sky-300">eye_tracking</Icon>
            </a>
          </div>
        )}
        {data.children}
      </div>
      <div className="relative mb-2 mx-1">
        <Collapsible.Root>
          <Collapsible.Trigger className="group w-full" asChild>
            <button className="relative p-1 mt-2 text-sm w-full bg-sky-600 hover:bg-sky-500  rounded-full cursor-pointer">
              <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 left-4 top-1/2 -translate-y-1/2 size-5" />
              Description
              <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 right-4 top-1/2 -translate-y-1/2 size-5" />
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content className="w-full mt-3 absolute z-1">
            <div
              className={`${data.status === 'live' ? 'bg-[#0e3ad8]' : 'bg-[#234adb]'} py-2 px-3 min-h-16 break-all rounded-md text-gray-300 border border-cyan-300`}
            >
              <span>{data.description}</span>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </Card>
  )
}

// import type { VaultDataFormType } from '@/modules/create/schemas/VaultDataFormSchema'
// import type { vaultStatus } from '@/modules/global/types'
// import { formatDate, formatNumber } from '@/modules/global/utils'
// import { Card, Icon } from '@/ui/components'
// import { DiscordIcon, TelegramIcon, TwitterIcon } from '@/ui/components/icons'
// import { Collapsible } from 'radix-ui'
// import { MdKeyboardArrowDown } from 'react-icons/md'
// import { StatusChip } from './StatusChip'

// interface BaseVaultProps extends Omit<VaultDataFormType, 'assetToken' | 'salt'> {
//   description: string
//   startDate?: Date
//   endDate?: Date
//   status: vaultStatus
//   discordIcon?: React.ReactNode
//   telegramIcon?: React.ReactNode
//   twitterIcon?: React.ReactNode
//   address?: string
//   deposited?: number
//   children?: React.ReactNode
// }

// export function BaseVaultCard(data: BaseVaultProps) {
//   const isValidUrl = (url: string) => {
//     try {
//       new URL(url)
//       return true
//     } catch {
//       return false
//     }
//   }

//   return (
//     <Card
//       variant={data.status === 'live' ? 'basic2' : 'basic'}
//       className="relative w-full lg:max-w-[22rem] rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-gradient-to-b from-[#0a0a1f] to-[#0b1133]"
//     >
//       {/* Status */}
//       <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
//         <StatusChip status={data.status} />
//       </div>

//       {/* Banner + Logo + Info */}
//       <div className="relative h-[14rem]">
//         <img
//           src={isValidUrl(data.banner) ? data.banner : '/default-banner.jpg'}
//           onError={(e) => (e.currentTarget.src = '/default-banner.jpg')}
//           alt={`${data.vaultName} banner`}
//           className="object-cover w-full h-full"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

//         <div className="absolute bottom-3 left-3 flex items-center gap-3">
//           <img
//             src={isValidUrl(data.logo) ? data.logo : '/default-icon.webp'}
//             onError={(e) => (e.currentTarget.src = '/default-icon.webp')}
//             alt={`${data.vaultName} logo`}
//             className="size-12 rounded-full border border-white/30 shadow-md object-cover"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-white">{data.vaultName || 'Unnamed Vault'}</h2>
//             <p className="text-sm text-gray-300">{data.network || 'No chain selected'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Socials */}
//       <div className="flex justify-end items-center gap-3 px-4 pt-2">
//         {data.discordIcon && (
//           <a
//             href={String(data.discordIcon)}
//             aria-label="Discord link"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:scale-110 transition-transform"
//           >
//             <DiscordIcon />
//           </a>
//         )}
//         {data.telegramIcon && (
//           <a
//             href={String(data.telegramIcon)}
//             aria-label="Telegram link"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:scale-110 transition-transform"
//           >
//             <TelegramIcon />
//           </a>
//         )}
//         {data.twitterIcon && (
//           <a
//             href={String(data.twitterIcon)}
//             aria-label="Twitter link"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:scale-110 transition-transform"
//           >
//             <TwitterIcon />
//           </a>
//         )}
//       </div>

//       {/* Vault Info */}
//       <div className="flex flex-col gap-2 mt-4 mx-4 mb-3">
//         <div className="flex justify-between text-sm text-gray-400">
//           <span>Creator</span>
//           <span className="text-gray-100 font-medium">{data.creatorName || 'Unnamed'}</span>
//         </div>
//         <div className="flex justify-between text-sm text-gray-400">
//           <span>Min dep / wallet</span>
//           <span className="text-gray-100 font-medium">{formatNumber(Number(data.minDeposit))}</span>
//         </div>
//         <div className="flex justify-between text-sm text-gray-400">
//           <span>Max dep / wallet</span>
//           <span className="text-gray-100 font-medium">{formatNumber(Number(data.maxDeposit))}</span>
//         </div>

//         <div className="h-px bg-white/10 my-1" />

//         <div className="flex justify-between text-sm text-gray-400">
//           <span>Start</span>
//           <span className="text-gray-100 font-medium">{formatDate(Number(data.startDate))}</span>
//         </div>
//         <div className="flex justify-between text-sm text-gray-400">
//           <span>End</span>
//           <span className="text-gray-100 font-medium">{formatDate(Number(data.endDate))}</span>
//         </div>

//         {data.deposited && (
//           <div className="text-center mt-3 bg-blue-900/30 border border-blue-500/40 py-2 rounded-lg">
//             <p className="text-sm text-gray-300">Total Deposited</p>
//             <p className="text-xl font-bold text-white">{data.deposited}K</p>
//           </div>
//         )}

//         {data.address && (
//           <div className="flex justify-between items-center mt-2">
//             <span className="text-sm text-gray-400">View Vault</span>
//             <a
//               href={`https://sepolia.etherscan.io/address/${data.address}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-sky-400 hover:text-sky-300"
//               aria-label="View on Etherscan"
//             >
//               <Icon className="text-sky-300">eye_tracking</Icon>
//             </a>
//           </div>
//         )}

//         {data.children}
//       </div>

//       {/* Description */}
//       <div className="relative mx-3 mb-3">
//         <Collapsible.Root>
//           <Collapsible.Trigger className="group w-full" asChild>
//             <button className="relative p-2 mt-2 text-sm w-full bg-sky-600 hover:bg-sky-500 rounded-full cursor-pointer transition-colors">
//               <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 left-4 top-1/2 -translate-y-1/2 size-5" />
//               Description
//               <MdKeyboardArrowDown className="absolute transition-transform duration-300 group-data-[state=open]:rotate-180 right-4 top-1/2 -translate-y-1/2 size-5" />
//             </button>
//           </Collapsible.Trigger>

//           <Collapsible.Content className="w-full mt-3 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
//             <div
//               className={`${
//                 data.status === 'live' ? 'bg-[#0e3ad8]/40' : 'bg-[#234adb]/30'
//               } py-2 px-3 min-h-16 text-sm rounded-md text-gray-200 border border-blue-500/30`}
//             >
//               {data.description}
//             </div>
//           </Collapsible.Content>
//         </Collapsible.Root>
//       </div>
//     </Card>
//   )
// }
