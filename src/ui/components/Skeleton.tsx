import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const skeletonVariants = cva('animate-pulse', {
  variants: {
    variant: {
      accent: '[&_div]:bg-blue-500/50 bg-blue-800',
      dimmed: '[&_div]:bg-sky-500/50 bg-blue-500/80',
      black: '[&_div]:bg-[#0a2268] bg-black/30',
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
