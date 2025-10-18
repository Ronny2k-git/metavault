import React from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: React.HTMLInputTypeAttribute
  label: string
  className?: string
  error?: string
}

export function Input({ label, className, type = 'text', placeholder = '', error, ...props }: InputProps) {
  return (
    <label className={twMerge(`relative flex flex-col`, className)}>
      <input
        placeholder={placeholder}
        type={type}
        className={`peer input-style min-h-16 pt-4 text-gray-200 ${className} w-full px-4 rounded-3xl 
        border outline-none ${error ? 'shadow-[0_0_5px_1px_rgba(255_1_1)] border-0' : 'border-transparent'}
        placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-gray-300`}
        {...props}
      />
      <div
        className="absolute left-4 top-1.5
        text-blue-300 transition-all
        pointer-events-none
        peer-placeholder-shown:top-5
        peer-placeholder-shown:text-blue-300
        peer-placeholder-shown:text-base
        peer-focus:top-1.5
        peer-focus:text-blue-300"
      >
        {label}
      </div>
      {error && <span className="absolute top-[3.9rem] pl-2 text-sm text-red-400">{error}</span>}
    </label>
  )
}
