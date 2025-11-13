import { twMerge } from 'tailwind-merge'

type DividerProps = {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return <div className={twMerge(`w-full h-[2px] my-4 bg-gradient-to-r via-cyan-500 col-span-full`, className)} />
}
