import type { vaultStatus } from '@/modules/global/types'
import { twMerge } from 'tailwind-merge'

export type StatusChipProps = {
  status: vaultStatus
  className?: string
}

const mappedPoolStatus: Record<vaultStatus, { label: string; color: string }> =
  {
    live: { label: 'Live', color: 'bg-green-600 border-green-700' },
    coming: { label: 'Coming soon', color: 'bg-orange-400 border-orange-700' },
    ended: { label: 'Completed', color: 'bg-red-400 border-red-700' },
    undefined: { label: 'Undefined', color: 'bg-gray-500 border-gray-700' },
  }

export function StatusChip({ status, className }: StatusChipProps) {
  const mappedStatus = mappedPoolStatus[status]
  return (
    <div
      className={twMerge(
        `w-32 h-5 bg-cyan-600 rounded-full border flex items-center justify-center text-sm 
         ${mappedStatus.color}`,
        className,
      )}
    >
      <span className="text-white">{mappedStatus.label}</span>
    </div>
  )
}
