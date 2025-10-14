import type { ForwardedRef } from 'react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: React.HTMLInputTypeAttribute
  label: string
  className?: string
  error?: string
}

function InputFieldFn(
  { label, className, type = 'text', placeholder = '', error, ...props }: InputFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className={twMerge('relative flex flex-col', className)}>
      <input
        placeholder={placeholder}
        ref={ref}
        type={type}
        className={`peer input-style min-h-14 pt-3 text-m text-gray-200 ${className} w-full px-4 rounded-3xl focus:border-black 
        border outline-none ${error ? 'shadow-[0_0_5px_1px_rgba(255_1_1)] border-0' : 'border-transparent'}
        placeholder:opacity-0 focus:placeholder:opacity-100`}
        {...props}
      />
      <label
        className={twMerge(`
          absolute left-4
          text-blue-300 transition-all
          pointer-events-none
          peer-placeholder-shown:top-5
          peer-placeholder-shown:text-blue-300
          peer-placeholder-shown:text-base
          peer-focus:top-0
          peer-focus:text-blue-300
        `)}
      >
        {label}
      </label>
      {error && <span className="absolute top-13.5 pl-2 text-sm text-red-400">{error}</span>}
    </div>
  )
}

export const InputField = React.forwardRef(InputFieldFn)
