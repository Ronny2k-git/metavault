import { Icon } from '@/ui/components'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { Tabs as PrimitiveTabs } from 'radix-ui'
import type { ComponentPropsWithRef } from 'react'

export type TabsProps = ComponentPropsWithRef<'div'> & {
  tabList: ReadonlyArray<{
    value: string
    step?: string
    label: string
    icon?: string
    description: string
  }>
  tabContent?: Array<{ value: string; content: React.ReactNode }>
  search: string
  onValueChange: (value: string) => void
  className?: string
} & VariantProps<typeof tabTrigger>

const tabTrigger = cva(`w-full h-full flex items-center justify-center cursor-pointer`, {
  variants: {
    variant: {
      blue: 'data-[state=active]:bg-[linear-gradient(0deg,#2970f7,#001d7f)] data-[state=active]:hover:bg-[linear-gradient(0deg,#0471ff,#001d8f)]',
      default: '',
    },
    size: {
      default: 'py-4 ',
      md: 'py-6',
      lg: 'py-8 min-w-[15rem] max-sm:text-lg md:text-xl lg:text-2xl rounded-t-xl data-[state=active]:border-b-2 data-[state=active]:border-b-white',
    },
  },
  defaultVariants: {
    variant: 'blue',
    size: 'default',
  },
})

export function Tabs({ search, onValueChange, tabList, tabContent, variant = 'default', size = 'default' }: TabsProps) {
  return (
    <PrimitiveTabs.Root value={search} className="w-full max-w-4xl" onValueChange={onValueChange}>
      <PrimitiveTabs.List className="flex gap-0.5">
        {tabList.map((tab) => (
          <PrimitiveTabs.Trigger key={tab.value} value={tab.value} className={tabTrigger({ variant, size })}>
            <div className="flex flex-col">
              <span className="text-lg text-left">{tab.step}</span>
              <div className="flex items-center gap-2">
                <Icon>{tab.icon}</Icon>
                <span>{tab.label}</span>
              </div>
              <span className="text-sm text-left text-gray-200">{tab.description}</span>
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
