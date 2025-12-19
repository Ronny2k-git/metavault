import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { twMerge } from 'tailwind-merge'

interface CheckBoxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  children?: React.ReactNode
  className?: string
}

export function CheckBox({ children, className, ...props }: CheckBoxProps) {
  return (
    <CheckboxPrimitive.Root {...props} className={twMerge('flex w-full cursor-pointer transition ', className)}>
      {children}
    </CheckboxPrimitive.Root>
  )
}
