import { ECOSYSTEMS } from '@/modules/global/constants'
import { createFileRoute } from '@tanstack/react-router'
import { Tabs } from 'radix-ui'

export const Route = createFileRoute('/profile')({
  component: Profile,
})

function Profile() {
  return (
    <div className="page background flex flex-col gap-1 items-center justify-cente py-20 text-white">
      <Tabs.Root defaultValue="ethereum">
        <Tabs.List className="flex gap-4">
          {ECOSYSTEMS.map((ecosystem, index) => (
            <Tabs.Trigger
              key={index}
              value={ecosystem}
              className="data-[state=active]:bg-sky-600 py-2 px-4 rounded-xl hover:bg-sky-600 cursor-pointer"
            >
              {ecosystem}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className="flex items-center gap-4 py-4">
          <div className="w-1/2 h-px bg-sky-300" />
          Wallets
          <div className="w-1/2 h-px  bg-sky-300" />
        </div>
        <Tabs.Content value="ethereum"></Tabs.Content>
        <Tabs.Content value="solana"></Tabs.Content>
        <Tabs.Content value="move"></Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
