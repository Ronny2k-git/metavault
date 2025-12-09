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
    label?: string
    labelIcon?: string
    descriptionIcon?: string
    descriptionIconStyle?: string
    description?: string
    descriptionColor?: string
    disabled?: boolean
  }>
  tabContent?: Array<{ value: string; content: React.ReactNode }>
  icon?: React.ReactNode
  search: string
  onValueChange: (value: string) => void
  className?: string
} & VariantProps<typeof tabTrigger>

const tabTrigger = cva(`relative w-full h-full flex flex-col items-center justify-center cursor-pointer`, {
  variants: {
    variant: {
      purple:
        'before:absolute before:inset-0 data-[state=active]:before:bg-[linear-gradient(0deg,#0c0124,#5C1D959D)] data-[state=active]:hover:before:brightness-110',
      default:
        'before:absolute before:inset-0 data-[state=active]:before:bg-[linear-gradient(0deg,#080126,#4a0f70)] data-[state=active]:hover:before:brightness-110',
      operation: `
          before:absolute before:inset-0 before:rounded-t-2xl before:bg-black/20
          data-[state=active]:before:bg-gradient-to-t data-[state=active]:before:from-purple-950/80 border-2 border-purple-900/70 rounded-xl data-[state=active]:before:to-violet-950/20
          hover:before:bg-black/30 data-[state=active]:text-white
        `,
    },
    size: {
      default: 'py-4 before:rounded-t-xl data-[state=active]:border-b-2 data-[state=active]:border-b-indigo-300',
      md: 'py-6 min-w-[15rem] text-xl before:rounded-t-3xl data-[state=active]:border-b-2 data-[state=active]:border-b-indigo-300',
      lg: 'py-8 text-left min-w-[15rem] text-xl lg:text-2xl before:rounded-t-3xl data-[state=active]:border-b-2 data-[state=active]:border-b-indigo-300',
      operation: 'py-2 text-base before:rounded-xl',
    },
  },
  defaultVariants: {
    variant: 'purple',
    size: 'default',
  },
})

export function Tabs({
  search,
  onValueChange,
  tabList,
  icon,
  tabContent,
  className,
  variant = 'default',
  size = 'default',
}: TabsProps) {
  return (
    <PrimitiveTabs.Root value={search} className="w-full " onValueChange={onValueChange}>
      <PrimitiveTabs.List className={`flex ${icon ? 'gap-12' : 'gap-2'} overflow-x-auto`}>
        {tabList.map((tab, index) => (
          <div className={`w-full flex items-center relative ${variant != 'operation' ? 'mb-6' : ''}`}>
            <PrimitiveTabs.Trigger
              id={`tab-${tab.value}`}
              key={tab.value}
              value={tab.value}
              className={twMerge(
                tabTrigger({ variant, size }),
                tab.disabled ? 'flex cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100',
                className,
              )}
              disabled={tab.disabled}
            >
              <div className="flex flex-col z-0">
                <span className="sm:text-lg">{tab.step}</span>
                <div className={tab.labelIcon && 'flex items-center justify-center gap-2'}>
                  <Icon>{tab.labelIcon}</Icon>
                  <span>{tab.label}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Icon className={tab.descriptionIconStyle}>{tab.descriptionIcon}</Icon>
                  <span className={twMerge('text-base', tab.descriptionColor)}>{tab.description}</span>
                </div>
              </div>
            </PrimitiveTabs.Trigger>
            {icon && index < tabList.length - 1 && (
              <span className="absolute right-0 top-1/2 pt-4 -translate-y-1/2 translate-x-10">{icon}</span>
            )}
          </div>
        ))}
      </PrimitiveTabs.List>
      {tabContent?.map(({ value, content }) => (
        <PrimitiveTabs.Content key={value} value={value}>
          {content}
        </PrimitiveTabs.Content>
      ))}
    </PrimitiveTabs.Root>
  )
}
