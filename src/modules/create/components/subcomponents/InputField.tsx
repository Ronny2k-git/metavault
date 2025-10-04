import type { ForwardedRef } from 'react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  type?: React.HTMLInputTypeAttribute
  className?: string
  error?: string
}

function InputFieldFn(
  { placeholder, className, type, error, ...props }: InputFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    //  className="w-full relative"
    <div className={twMerge('relative flex flex-col', className)}>
      <input
        ref={ref}
        type={type}
        className={`h-11 w-full px-4 rounded-md ${error ? 'border-red-300' : 'border-cyan-400'}
         placeholder:text-gray-300 focus:border-black border outline-none`}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <span className="absolute top-11 text-sm text-red-400">{error}</span>
      )}
    </div>
  )
}

export const InputField = React.forwardRef(InputFieldFn)
InputField.displayName = 'InputField'
