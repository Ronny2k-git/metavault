import type { vaultStatus } from '@/modules/global/types'
import { twMerge } from 'tailwind-merge'

type ProfileHeadingProps = {
  icon: React.ReactNode
  title: string
  vaults?: number
  status: vaultStatus
  className?: string
}

export function ProfileHeading({ icon, title, vaults, status, className }: ProfileHeadingProps) {
  return (
    <div className={twMerge('w-full flex gap-4 justify-between max-sm:flex-col', className)}>
      <div className="flex gap-2">
        {icon}
        <h1 className="text-3xl">{title}</h1>
      </div>
      <div className="flex flex-col items-center mx-2">
        <span className="text-lg">{`Total ${status} vaults:`}</span>
        <div className="text-2xl text-sky-400">{vaults}</div>
      </div>
    </div>
  )
}
