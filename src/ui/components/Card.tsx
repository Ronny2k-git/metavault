import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ComponentPropsWithRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const cardStyle = cva('w-full flex flex-col h-auto', {
  variants: {
    variant: {
      basic: 'bg-blue-700/70 border border-blue-400',
      basic2:
        'bg-[linear-gradient(180deg,#011e62,#0c42ca)] shadow-[0_0_10px_0px_rgba(30,135,242,0.6)] border-1 border-blue-400',
      gradient: 'bg-[linear-gradient(45deg,#0b1e3a,#041e78)] shadow-[0_0_20px_2px_rgba(69,107,246,0.6)] text-white',
      gradient2: 'bg-linear-to-b from-blue-800 to-blue-950 border border-blue-800 text-white',
      glow: 'text-white shadow-[0_0_15px_5px_rgba(37,139,255,0.4)]',
      secondary: 'bg-black/15 border border-blue-800',
      tertiary: 'bg-black/20 hover:bg-black/30',
      ghost: 'bg-blue-500/20 shadow-md hover:bg-blue-500/10',
      disabled: 'bg-blue-700/20 cursor-not-allowed border border-blue-800',
    },
  },
})

export type CardProps = ComponentPropsWithRef<'div'> & {
  className?: string
} & VariantProps<typeof cardStyle>

export function Card({ variant = 'basic', className, children, ...props }: CardProps) {
  return (
    <div className={twMerge(cardStyle({ variant }), className)} {...props}>
      {children}
    </div>
  )
}
