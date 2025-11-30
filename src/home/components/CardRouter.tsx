import { Card, Icon } from '@/ui/components'
import { twMerge } from 'tailwind-merge'

export type CardRouterProps = {
  title?: string
  desc?: string
  className?: string
  tab: string
  path?: string
  onSelectTab?: (tab: string) => void
  onNavigate?: (path: string) => void
}

export function CardRouter({ title, desc, path, onSelectTab, onNavigate, tab, className }: CardRouterProps) {
  const handleClick = () => {
    if (tab) return onSelectTab?.(tab)
    if (path) return onNavigate?.(path)
  }

  return (
    <div onClick={handleClick}>
      <Card variant={'secondary'} className={twMerge('h-60 rounded-2xl p-4', className)}>
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-300">{title}</h1>
            <Icon className="text-gray-300">arrow_forward</Icon>
          </div>
          <p className="text-sm text-gray-400">{desc}</p>
        </div>
      </Card>
    </div>
  )
}
