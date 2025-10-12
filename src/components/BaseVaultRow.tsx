import type { VaultCreateFormType } from '@/modules/create/schemas/VaultCreateFormSchema'
import type { vaultStatus } from '@/modules/global/types'

interface BaseVaultRowProps extends Omit<VaultCreateFormType, 'salt' | 'assetToken' | 'logo'> {
  description: string
  status: vaultStatus
  children?: React.ReactNode
}

export function BaseVaultRow(data: BaseVaultRowProps) {
  return (
    <tr className="w-full background-vault-row relative border h-16 rounded-lg border-cyan-400">
      <td className="rounded-[inherit] h-[inherit] ">
        <div className="flex h-[inherit] overflow-hidden z-0 gap- items-center rounded-[inherit] p p4 relative">
          <img
            src={data.banner}
            className="h-15 w-28 aspect-square object-cover rounded-[inherit]"
            alt="vault-banner"
          />
          <div className="flex flex-col mx-4">
            <div>{data.vaultName}</div>
            <div className="flex gap-2 mt-1">
              <img src={data.network} className="min-w-4 max-w-4 min-h-4 max-h-4 rounded-full" />
              <div className="opacity-50 text-xs">{'sepolia'}</div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}
