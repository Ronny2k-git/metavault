import { cardStyle } from '@/ui/components'
import { VariantProps } from 'class-variance-authority'
import { baseVaultType } from '../components'

export interface baseVaultCardTradesProps {
  variant: VariantProps<typeof cardStyle>['variant']
  title: 'Deposit' | 'Withdraw'
  vaultBalance: bigint
  tokenBalance: bigint
  tempVault: baseVaultType | null
  setTempVault: React.Dispatch<React.SetStateAction<baseVaultType | null>>
  selectedVault: baseVaultType | null
  setSelectedVault: React.Dispatch<React.SetStateAction<baseVaultType | null>>
}
