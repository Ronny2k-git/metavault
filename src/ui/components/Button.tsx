import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ComponentPropsWithRef } from 'react'
import { twMerge } from 'tailwind-merge'

const buttonStyle = cva('w-full flex items-center justify-center cursor-pointer', {
  variants: {
    size: {
      xs: 'p-1.5 rounded-full text-xs',
      sm: 'p-1.5 rounded-full text-sm',
      md: 'p-2 rounded-full text-md',
      lg: 'p-3 rounded-full text-lg',
      base: 'p-2 rounded-md text-md',
      xl: 'p-4 rounded-full text-xl',
    },
    variant: {
      primary: 'bg-sky-600 hover:bg-sky-700',
      secondary: 'bg-gray-600 hover:bg-gray-700',
      tertiary: 'bg-gray-400 hover:bg-gray-500',
      white: 'bg-gray-100 hover:bg-gray-200 text-black',
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-600 shadow-2xs shadow-white  hover:to-cyan-700',
    },
  },
  defaultVariants: {
    size: 'base',
    variant: 'primary',
  },
})

interface ButtonProps extends ComponentPropsWithRef<'button'>, VariantProps<typeof buttonStyle> {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  className?: string
}

export function Button({ size, variant = 'primary', iconLeft, iconRight, children, className, ...props }: ButtonProps) {
  return (
    <button className={twMerge(buttonStyle({ variant, size }), className)} {...props}>
      {iconLeft && <div className="flex mr-2">{iconLeft}</div>}
      {children}
      {iconRight && <div className="flex ml-2">{iconRight}</div>}
    </button>
  )
}
