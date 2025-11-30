import { Card, Icon } from '@/ui/components'
import { twMerge } from 'tailwind-merge'

export type CardRouterProps = {
  title?: string
  img?: string
  desc?: string
  className?: string
  tab: string
  path?: string
  onSelectTab?: (tab: string) => void
  onNavigate?: (path: string) => void
}

export function CardRouter({ title, img, desc, path, onSelectTab, onNavigate, tab, className }: CardRouterProps) {
  const handleClick = () => {
    if (tab) return onSelectTab?.(tab)
    if (path) return onNavigate?.(path)
  }

  return (
    <div onClick={handleClick}>
      <Card variant={'disabled'} className={twMerge('max-md:h-30 h-60 rounded-2xl p-4', className)}>
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-300">{title}</h1>
            <Icon className="text-gray-300">arrow_forward</Icon>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <img className="h-12 w-12" src={img} />
          </div>

          <p className="text-sm text-gray-400">{desc}</p>
        </div>
      </Card>
    </div>
  )
}
