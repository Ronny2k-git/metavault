import type { VaultCreateFormType } from '@/modules/create/schemas/VaultCreateFormSchema'
import type { vaultStatus } from '@/modules/global/types'

interface BaseVaultRowProps extends Omit<VaultCreateFormType, 'salt' | 'assetToken'> {
  description: string
  status: vaultStatus
  tx: string
  children?: React.ReactNode
}

export function BaseVaultRow(data: BaseVaultRowProps) {
  return (
    <tr className="background-vault-row border text-gray-300 border-cyan-400 rounded-lg h-16">
      <td>
        <div className="flex items-center">
          <img
            src={data.banner}
            className="h-15 w-28 aspect-square object-cover rounded-[inherit]"
            alt="vault-banner"
          />
          <div className="flex flex-col mx-4">
            <div>{data.vaultName}</div>
            <div className="flex gap-2 items-center mt-1">
              <img src={data.logo} className="min-w-5 max-w-5 min-h-5 max-h-5 rounded-full" />
              <div className="text-xs">sepolia</div>
            </div>
          </div>
        </div>
      </td>
      <td align="center">{data.minDeposit}</td>
      <td align="center">{data.maxDeposit}</td>
      <td align="center">{data.endDate}</td>
      <td align="center">
        <a href={`https://sepolia.etherscan.io/tx/${data.tx}`}>
          <div className="h-7 w-16 bg-sky-500 hover:bg-sky-600 rounded-full flex text-xs items-center justify-center">
            View
          </div>
        </a>
      </td>
    </tr>
  )
}
