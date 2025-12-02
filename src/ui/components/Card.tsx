import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ComponentPropsWithRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const cardStyle = cva('w-full flex flex-col h-auto', {
  variants: {
    variant: {
      basic: 'bg-[#120325]/50 border border-[#4c1d74]',
      basic2:
        'bg-[linear-gradient(180deg,#0b091d,#1d0b3d)] shadow-[0_0_10px_0px_rgba(109,40,217,0.7)] border border-[#4c1d95]',
      gradient: 'bg-[linear-gradient(45deg,#0b031d,#2d0a6b)] shadow-[0_0_20px_2px_rgba(124,58,237,0.45)] text-white',
      gradient2: 'bg-linear-to-b from-[#150530] to-[#0b031d] border border-[#3b0d66] text-white',
      glow: 'text-white shadow-[0_0_15px_5px_rgba(139,92,246,0.35)]',
      secondary: 'bg-black/20 border border-[#3b0d66]',
      tertiary: 'bg-black/25 hover:bg-black/35 border border-purple-900/70',
      ghost: 'bg-[#5b21b6]/15 shadow-md hover:bg-[#5b21b6]/10',
      disabled: 'bg-[#1a0730] cursor-not-allowed border border-[#3b0d66]',
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
