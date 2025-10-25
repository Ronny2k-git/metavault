import React from 'react'
import { twMerge } from 'tailwind-merge'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  className?: string
  error?: string
}

export function TextArea({ label, className, placeholder = '', error, ...props }: InputFieldProps) {
  return (
    <label className={twMerge(`relative flex flex-col`, className)}>
      <textarea
        placeholder={placeholder}
        className={`peer bg-[#0a2278] w-full pt-8 text-m text-gray-200 ${className} w-full px-4 rounded-3xl 
        border outline-none ${error ? 'shadow-[0_0_5px_1px_rgba(255_1_1)] border-0' : 'border-transparent'}
        placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-gray-300`}
        {...props}
      />
      <div
        className=" absolute left-4 top-2
        text-blue-300 transition-all
        pointer-events-none
        peer-placeholder-shown:top-5
        peer-placeholder-shown:text-blue-300
        peer-placeholder-shown:text-base
        peer-focus:top-2
        peer-focus:text-blue-300"
      >
        {label}
      </div>
      {error && <span className="mt-1 pl-2 text-sm text-red-400">{error}</span>}
    </label>
  )
}
