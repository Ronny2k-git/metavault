import type { VaultDataFormType } from '@/modules/create/schemas/VaultDataFormSchema'
import type { vaultStatus } from '@/modules/global/types'
import { Button } from '@/ui/components/Button'

interface BaseVaultRowProps extends Omit<VaultDataFormType, 'salt' | 'assetToken' | 'creatorName' | 'description'> {
  status: vaultStatus
  endDate: string
  tx: string
  buttonLabel: string
  children?: React.ReactNode
}

export function BaseVaultRow(data: BaseVaultRowProps) {
  return (
    <tr>
      <td colSpan={5}>
        <div className="background-vault-row border border-purple-800/80 rounded-lg h-20 flex items-center">
          <div className="flex items-center flex-1">
            <img src={data.banner} className="h-18 w-32 object-cover rounded-md" alt="vault-banner" />
            <div className="flex flex-col mx-4">
              <div>{data.vaultName}</div>
              <div className="flex gap-2 items-center mt-1">
                <img src={data.logo} className="size-5 rounded-full" />
                <div className="text-xs">{data.network}</div>
              </div>
            </div>
          </div>

          <div className="w-32 text-center">{data.minDeposit}</div>
          <div className="w-32 text-center">{data.maxDeposit}</div>
          <div className="w-32 text-end">{data.endDate}</div>

          <div className="w-24 mr-4">
            <a href={`https://sepolia.etherscan.io/address/${data.tx}`}>
              <Button className="max-w-20 mx-6 border border-violet-500" size="xs">
                {data.buttonLabel}
              </Button>
            </a>
          </div>
        </div>
      </td>
    </tr>
  )
}
