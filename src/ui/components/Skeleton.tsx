import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const skeletonVariants = cva('animate-pulse', {
  variants: {
    variant: {
      accent: '[&_div]:bg-purple-950/70 bg-black/20',
      dimmed: '[&_div]:bg-violet-900/40 bg-purple-800/70',
      black: '[&_div]:bg-[#1a0b2e] bg-black/30',
    },
  },
  defaultVariants: {
    variant: 'accent',
  },
})

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

export function Skeleton({ variant = 'accent', className, ...props }: SkeletonProps) {
  return <div className={skeletonVariants({ className, variant })} {...props} />
}
