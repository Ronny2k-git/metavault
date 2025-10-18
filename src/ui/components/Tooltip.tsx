import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type TooltipProps = {
  trigger: ReactNode
  content: string
  className?: string
}

export function Tooltip({ trigger, content, className }: TooltipProps) {
  return (
    <div className={twMerge(`relative group`, className)}>
      {trigger}
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2  whitespace-nowrap opacity-0 group-hover:opacity-100 
          transition-all duration-300"
      >
        {content}
      </span>
    </div>
  )
}
