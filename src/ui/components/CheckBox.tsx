import type { Checkbox } from 'radix-ui'
import { Checkbox as PrimitiveCheckBox } from 'radix-ui'
import { twMerge } from 'tailwind-merge'

interface CheckBoxProps extends React.ComponentPropsWithoutRef<typeof Checkbox.Root> {
  children?: React.ReactNode
  className?: string
}

export function CheckBox({ children, className, ...props }: CheckBoxProps) {
  return (
    <PrimitiveCheckBox.Root
      {...props}
      className={twMerge('flex w-full items-center cursor-pointer transition ', className)}
    >
      {children}
    </PrimitiveCheckBox.Root>
  )
}
