type VaultCardTradeSelectProps = {
  vaultName?: string
  vaultDate?: string
  amount?: number
  tokenName?: string
}

export function VaultCardTradeSelect({ vaultName, vaultDate, amount, tokenName }: VaultCardTradeSelectProps) {
  return (
    <div className="flex justify-between items-center p-3 my-2 rounded-xl bg-black/30 hover:bg-black/30 transition">
      <div className="flex items-center gap-4">
        <input type="checkbox" className={`h-4 w-4 bg-sky-600 rounded-full`} />

        <div className="flex flex-col">
          <span className="font-semibol text-white">{vaultName}</span>
          <span className="text-gray-300 text-sm">{vaultDate}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {tokenName && (
          <span className={`text-sm flex gap-2 text-white`}>
            Token: <div className="text-blue-400 font-semibold">{tokenName}</div>
          </span>
        )}
        {amount && (
          <span className={`text-sm flex gap-2 text-white`}>
            Deposited: <div className="text-blue-400 font-semibold">{amount || 0}K</div>
          </span>
        )}
      </div>
    </div>
  )
}
