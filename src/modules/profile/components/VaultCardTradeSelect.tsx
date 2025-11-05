import { formatNumber } from '@/modules/global/utils'
import { CheckBox } from '@/ui/components'

type VaultCardTradeSelectProps = {
  vaultLogo?: string
  vaultName?: string
  vaultDate?: string
  amount?: number
  tokenName?: string
  checked?: boolean
  selected: (checked: boolean) => void
}

export function VaultCardTradeSelect({
  vaultLogo,
  vaultName,
  vaultDate,
  amount,
  tokenName,
  checked = false,
  selected,
}: VaultCardTradeSelectProps) {
  return (
    <CheckBox
      className="flex gap-4 w-full justify-between p-3 my-2 rounded-xl bg-black/30 hover:bg-black/50 data-[state=checked]:bg-sky-600/20 
        data-[state=checked]:border data-[state=checked]:border-blue-300"
      checked={checked}
      onCheckedChange={(value) => selected(!!value)}
    >
      <div className="flex items-center gap-4">
        <img className="size-9 rounded-full border border-blue-300" src={vaultLogo || '/default-icon.webp'} />

        <div className="flex flex-col items-start">
          <span className="font-semibol text-white text-start">{vaultName}</span>
          <span className="text-gray-300 text-sm">{vaultDate}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {tokenName && (
          <span className={`text-sm flex gap-2 text-white`}>
            Token: <div className="text-blue-400 font-semibold">{tokenName}</div>
          </span>
        )}
        {amount != null && (
          <span className={`text-sm flex gap-2 text-white`}>
            Deposited: <div className="text-blue-400 font-semibold">{formatNumber(amount || 0)}</div>
          </span>
        )}
      </div>
    </CheckBox>
  )
}
