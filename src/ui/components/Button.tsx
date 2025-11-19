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
      primary: ' bg-gradient-to-t from-blue-700 to-sky-700 hover:to-sky-600 border border-blue-400',
      secondary: 'bg-gradient-to-t from-gray-600 to-gray-700 hover:from-gray-500 border border-gray-400',
      tertiary: 'bg-gray-400 hover:bg-gray-500',
      white: 'bg-gray-100 hover:bg-gray-200 text-black',
      gradient: 'bg-gradient-to-r from-blue-700 to-sky-600 hover:to-sky-700 shadow-2xs shadow-blue-300  ',
      black: 'bg-black/30 border border-blue-400 hover:bg-black/40',
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
        `${disabled ? '!cursor-not-allowed opacity-50' : ''}`,
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
