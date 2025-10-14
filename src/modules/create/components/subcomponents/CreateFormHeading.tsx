import { Icon } from '@/ui/components'
import { twMerge } from 'tailwind-merge'

type CreateFormHeadingProps = {
  title: string
  icon: string
  className?: string
}

export function CreateFormHeading({ title, icon, className }: CreateFormHeadingProps) {
  return (
    <div className={twMerge('flex gap-2 items-center text-white', className)}>
      <h1 className="text-2xl">{title}</h1>
      <Icon className="!text-3xl text-sky-300">{icon}</Icon>
    </div>
  )
}
