import { twMerge } from 'tailwind-merge'

interface InputFieldProps {
  placeholder: string
  type?: React.HTMLInputTypeAttribute
  className?: string
}

export function InputField({ placeholder, className, type }: InputFieldProps) {
  return (
    <input
      type={type}
      className={twMerge(
        'h-10 w-full px-4 rounded-md border-1 placeholder:text-gray-300 border-cyan-400',
        className,
      )}
      placeholder={placeholder}
    />
  )
}
