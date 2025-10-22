import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const inputStyle = cva(
  'peer w-full bg-[#0a2278] pt-4 border outline-none border-transparent placeholder:opacity-0 focus:placeholder:opacity-100',
  {
    variants: {
      variant: {
        error: 'shadow-[0_0_5px_1px_rgba(255_1_1)] border-0',
        default: 'placeholder:text-gray-300',
      },
      size: {
        default: 'h-12 px-4 rounded-md',
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
  ...props
}: InputProps) {
  const effectiveVariant = error ? 'error' : inputVariant

  return (
    <label className={twMerge(`relative flex flex-col`, className)}>
      {iconLeft && <div className="absolute left-4 top-1/2 -translate-y-1/2">{iconLeft}</div>}
      <input
        placeholder={placeholder}
        type={type}
        className={twMerge(
          inputStyle({ variant: effectiveVariant, size: inputSize }),
          iconLeft && 'pl-14',
          iconRight && 'pr-14',
          className,
        )}
        {...props}
      />
      {iconRight && <div className="absolute right-4 top-1/2 -translate-y-1/2">{iconRight}</div>}
      <span
        className={`absolute left-4 top-1/4
        text-blue-300 transition-all
        pointer-events-none
        peer-placeholder-shown:top-1/2 -translate-y-1/2
        peer-placeholder-shown:text-blue-300
        peer-placeholder-shown:text-base
        peer-focus:top-1/4
        peer-focus:text-blue-300 ${iconLeft ? 'pl-10' : ''}`}
      >
        {label}
      </span>
      {error && <span className="mt-0.5 pl-2 text-sm text-red-400">{error}</span>}
    </label>
  )
}
