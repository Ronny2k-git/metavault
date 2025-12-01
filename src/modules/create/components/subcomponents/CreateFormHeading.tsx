import { Icon } from '@/ui/components'
import { twMerge } from 'tailwind-merge'

type CreateFormHeadingProps = {
  title: string
  subTitle?: string
  icon: string
  className?: string
}

export function CreateFormHeading({ title, subTitle, icon, className }: CreateFormHeadingProps) {
  return (
    <div className={twMerge('flex max-sm:flex-col gap-2 sm:items-center text-white', className)}>
      <div className="flex gap-2">
        <h1 className="text-2xl">{title}</h1>
        <Icon className="!text-3xl text-indigo-300">{icon}</Icon>
      </div>
      <h2 className="text-gray-300">{subTitle}</h2>
    </div>
  )
}
