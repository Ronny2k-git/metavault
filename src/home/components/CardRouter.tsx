import { Card, Icon } from '@/ui/components'
import { twMerge } from 'tailwind-merge'

export type CardRouterProps = {
  title?: string
  img?: string
  altImage?: string
  desc?: string
  className?: string
  tab: string
  path?: string
  onSelectTab?: (tab: string) => void
  onNavigate?: (path: string) => void
}

export function CardRouter({
  title,
  altImage,
  img,
  desc,
  path,
  onSelectTab,
  onNavigate,
  tab,
  className,
}: CardRouterProps) {
  const handleClick = () => {
    if (tab) return onSelectTab?.(tab)
    if (path) return onNavigate?.(path)
  }

  return (
    <Card
      onClick={handleClick}
      variant={'disabled'}
      className={twMerge('relative max-md:h-38 h-60 rounded-2xl p-4', className)}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xl break-words font-semibold text-indigo-300">{title}</span>

          <Icon className="text-gray-300">arrow_forward</Icon>
        </div>
        <div className="hidde md:flex max-md:absolute bottom-2 right-2 md:mt-2 items-center justify-center">
          <img alt={altImage} className="h-12 w-12 max-md:h-7 max-md:w-7" src={img} />
        </div>

        <p className="text-sm max-md:pr-4 py-2 text-gray-400">{desc}</p>
      </div>
    </Card>
  )
}
