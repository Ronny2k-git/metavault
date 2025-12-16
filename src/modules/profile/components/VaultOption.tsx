import { Icon } from '@/ui/components'

export type VaultCardTradeSelectProps = {
  vaultName?: string
  vaultDate?: string
  amount?: string
  info: string
  tokenSymbol?: string
  selected: boolean
  onSelect: () => void
}

export function VaultOption({
  vaultName,
  vaultDate,
  info,
  amount,
  tokenSymbol,
  selected,
  onSelect,
}: VaultCardTradeSelectProps) {
  return (
    <button
      onClick={onSelect}
      className="
        w-full flex items-center justify-between bg-black/20 border border-purple-900/50  px-4 py-3 my-2 rounded-2xl cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-7 w-7 justify-center bg-black/30 border border-purple-900/50 rounded-full">
          <Icon className={`!text-xl ${selected ? 'text-indigo-300 borde rounded-full' : 'text-transparent'}`}>
            check
          </Icon>
        </div>

        <div className="flex flex-col items-start text-left">
          <span className="text-white font-medium">{vaultName}</span>
          <span className="text-gray-400 text-sm">{vaultDate}</span>
        </div>
      </div>

      <div className="flex flex-col items-end text-sm">
        <span className="text-gray-400">{info}</span>
        <span className="text-indigo-300 font-semibold">
          {amount} {tokenSymbol}
        </span>
      </div>
    </button>
  )
}
