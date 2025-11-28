import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const inputStyle = cva(
  `
  peer no-spinner w-full 
  bg-gradient-to-l from-purple-950/40 to-violet-800/40
  pt-4 
  border 
  outline-none 
  border-transparent 
  placeholder:text-purple-300 
  placeholder:opacity-0 
  focus:placeholder:opacity-100 
  text-purple-100
  `,
  {
    variants: {
      variant: {
        error: 'shadow-[0_0_10px_1px_rgba(255,0,0,0.7)] border-0 !text-white',
        default: 'placeholder:text-purple-300 focus:border-violet-400',
      },
      size: {
        default: 'h-12 px-4 rounded-md',
        sm: 'h-10 px-4 rounded-full text-sm',
        xl: 'h-16 px-4 rounded-3xl',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  },
)

type InputVariants = VariantProps<typeof inputStyle>

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  type?: React.HTMLInputTypeAttribute
  label: string
  inputSize?: InputVariants['size']
  inputVariant?: InputVariants['variant']
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  className?: string
  error?: string
  showErrorStyle?: boolean
}

export function Input({
  label,
  iconLeft,
  iconRight,
  inputSize,
  inputVariant,
  className,
  type = 'text',
  placeholder = '',
  error,
  showErrorStyle = true,
  ...props
}: InputProps) {
  const effectiveVariant = error && showErrorStyle ? 'error' : inputVariant

  return (
    <label className={twMerge(`flex flex-col`, className)}>
      <div className="relative flex w-full items-center">
        {iconLeft && <div className="absolute left-4 pt-1.5">{iconLeft}</div>}

        <input
          placeholder={placeholder}
          type={type}
          className={twMerge(
            inputStyle({ variant: effectiveVariant, size: inputSize }),
            error && 'text-red-400',
            iconLeft && 'pl-13',
            iconRight && 'pr-13',
            className,
          )}
          {...props}
        />

        {iconRight && <div className="absolute right-4 pt-1.5">{iconRight}</div>}

        <span
          className={`
            absolute left-4 top-1/4
            text-purple-300 transition-all
            pointer-events-none
            peer-placeholder-shown:top-1/2 -translate-y-1/2
            peer-focus:top-1/4
            peer-focus:text-purple-300
            ${iconLeft ? 'pl-9' : ''}
          `}
        >
          {label}
        </span>
      </div>

      {error && <span className="mt-1 pl-2 text-sm text-red-400">{error}</span>}
    </label>
  )
}
