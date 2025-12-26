import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  fill?: boolean
  grad?: number
  wght?: 100 | 200 | 300 | 400 | 500 | 600 | 700
  opsz?: number
}

export function Icon({ fill, grad, wght, opsz, children, className, ...props }: IconProps) {
  const style = {
    ...props.style,
    fontVariationSettings: `'wght' ${wght ?? 400}, 'FILL' ${fill ? 1 : 0}, 'GRAD' ${grad ?? 0}, 'opsz' ${opsz ?? 24}`,
  }

  // The stylesheet was imported on the _root file
  return (
    <span
      translate="no"
      {...props}
      className={twMerge(className, 'material-symbols-rounded notranslate')}
      style={style}
    >
      {children}
    </span>
  )
}
