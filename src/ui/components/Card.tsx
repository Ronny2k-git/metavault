import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ComponentPropsWithRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const cardStyle = cva('w-full flex flex-col h-auto', {
  variants: {
    variant: {
      basic: 'bg-[#234adb] border border-cyan-400 ',
      basic2:
        'bg-[linear-gradient(45deg,#0b1e3a,#043afe)] shadow-[0_0_20px_5px_rgba(35,135,242,0.6)] border border-cyan-400',
      gradient: 'bg-[linear-gradient(45deg,#0b1e3a,#041e78)] shadow-[0_0_20px_2px_rgba(69,107,246,0.6)] text-white',
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
