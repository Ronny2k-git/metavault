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
      primary: 'bg-gradient-to-t from-purple-950 to-violet-900 hover:to-violet-950 border border-violet-400',
      secondary: 'bg-gradient-to-t from-gray-700 to-gray-800 hover:from-gray-600 border border-gray-500',
      tertiary: 'bg-gray-500 hover:bg-gray-600',
      white: 'bg-gray-100 hover:bg-gray-200 text-black',
      gradient: 'bg-gradient-to-r from-purple-800 to-violet-700 hover:to-violet-800 shadow-2xs shadow-violet-300',
      black: 'bg-black/30 border border-violet-400 hover:bg-black/40 shadow-[0_0_10px_rgba(139,92,246,0.4)]',
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
  disabled?: boolean
}

export function Button({
  size,
  variant = 'primary',
  iconLeft,
  iconRight,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        `${disabled ? '!cursor-not-allowed opacity-80' : ''}`,
        buttonStyle({ variant: variant, size }),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {iconLeft && <div className="flex mr-2">{iconLeft}</div>}
      {children}
      {iconRight && <div className="flex ml-2">{iconRight}</div>}
    </button>
  )
}
