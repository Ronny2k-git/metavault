import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { Tabs as PrimitiveTabs } from 'radix-ui'
import type { ComponentPropsWithRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Icon } from './Icon'

export type TabsProps = ComponentPropsWithRef<'div'> & {
  tabList: ReadonlyArray<{
    value: string
    step?: string
    label: string
    icon?: string
    iconStyle?: string
    description: string
    descriptionColor?: string
    disabled?: boolean
  }>
  tabContent?: Array<{ value: string; content: React.ReactNode }>
  search: string
  onValueChange: (value: string) => void
  className?: string
} & VariantProps<typeof tabTrigger>

const tabTrigger = cva(`relative w-full h-full flex flex-col items-center justify-center cursor-pointer`, {
  variants: {
    variant: {
      blue: 'before:absolute before:inset-0 data-[state=active]:before:bg-[linear-gradient(0deg,#2960f7,#000d5f)] data-[state=active]:hover:before:brightness-90',
      default: '',
    },
    size: {
      default: 'py-4 ',
      md: 'py-6 min-w-[15rem] text-xl before:rounded-t-3xl data-[state=active]:border-b-2 data-[state=active]:border-b-white',
      lg: 'py-8 text-left min-w-[15rem] text-xl lg:text-2xl before:rounded-t-3xl data-[state=active]:border-b-2 data-[state=active]:border-b-white',
    },
  },
  defaultVariants: {
    variant: 'blue',
    size: 'default',
  },
})

export function Tabs({ search, onValueChange, tabList, tabContent, variant = 'default', size = 'default' }: TabsProps) {
  return (
    <PrimitiveTabs.Root value={search} className="w-full " onValueChange={onValueChange}>
      <PrimitiveTabs.List className="flex gap-1 overflow-x-auto custom-scrollbar pb-3">
        {tabList.map((tab) => (
          <PrimitiveTabs.Trigger
            id={`tab-${tab.value}`}
            key={tab.value}
            value={tab.value}
            className={twMerge(
              tabTrigger({ variant, size }),
              tab.disabled ? 'flex cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100',
            )}
            disabled={tab.disabled}
          >
            <div className="flex flex-col z-0">
              <span className="sm:text-lg">{tab.step}</span>
              <span>{tab.label}</span>
              <div className="flex items-center gap-2 mt-1">
                <Icon className={tab.iconStyle}>{tab.icon}</Icon>
                <span className={twMerge('text-base', tab.descriptionColor)}>{tab.description}</span>
              </div>
            </div>
          </PrimitiveTabs.Trigger>
        ))}
      </PrimitiveTabs.List>
      {tabContent?.map(({ value, content }) => (
        <PrimitiveTabs.Content className="mt-5" value={value}>
          {content}
        </PrimitiveTabs.Content>
      ))}
    </PrimitiveTabs.Root>
  )
}
