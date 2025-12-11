import type { vaultStatus } from '@/modules/global/types'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

export type StatusChipProps = {
  status: vaultStatus
  className?: string
}

const mappedPoolStatus: Record<vaultStatus, { color: string }> = {
  live: { color: 'bg-green-600 border-green-700' },
  coming: { color: 'bg-orange-400 border-orange-700' },
  ended: { color: 'bg-red-400 border-red-700' },
  undefined: { color: 'bg-gray-500 border-gray-700' },
}

export function StatusChip({ status, className }: StatusChipProps) {
  const { t } = useTranslation('global', { keyPrefix: 'baseVaultCard.status' })

  const mappedStatus = mappedPoolStatus[status]

  return (
    <div
      className={twMerge(
        `w-32 h-5 bg-cyan-600 rounded-full border flex items-center justify-center text-sm 
         ${mappedStatus.color}`,
        className,
      )}
    >
      <span className="text-black">{t(status)}</span>
    </div>
  )
}
