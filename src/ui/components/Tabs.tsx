import { Icon } from '@/ui/components'
import { Tabs as PrimitiveTabs } from 'radix-ui'

export type TabsProps = {
  tabList: {
    value: string
    label: string
    icon?: string
    description: string
  }
  tabContent?: Array<{ value: string; content: React.ReactNode }>
  search: string
  onValueChange: () => void
  className?: string
}

export function Tabs({ search, onValueChange, tabList, tabContent }: TabsProps) {
  return (
    <PrimitiveTabs.Root value={search} className="w-full max-w-4xl" onValueChange={onValueChange}>
      <PrimitiveTabs.List className="flex gap-0.5 max-md:flex-col">
        <PrimitiveTabs.Trigger
          key={tabList.value}
          value={tabList.value}
          className="w-full h-full flex max-md:py-4 py-10 items-center justify-center data-[state=active]:border-b-2 data-[state=active]:border-b-white 
                      border-sky-500 data-[state=active]:bg-[linear-gradient(0deg,#2989f7,#001d8f)] data-[state=active]:hover:bg-[linear-gradient(0deg,#0471ff,#001d8f)] 
                        cursor-pointer md:rounded-tr-xl md:rounded-tl-xl"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Icon>{tabList.icon}</Icon>
              <span className="text-lg md:text-2xl">{tabList.label}</span>
            </div>
            <span className="text-sm text-gray-200">{tabList.description}</span>
          </div>
        </PrimitiveTabs.Trigger>
      </PrimitiveTabs.List>
      {tabContent?.map(({ value, content }) => (
        <PrimitiveTabs.Content className="mt-10" value={value}>
          {content}
        </PrimitiveTabs.Content>
      ))}
    </PrimitiveTabs.Root>
  )
}
