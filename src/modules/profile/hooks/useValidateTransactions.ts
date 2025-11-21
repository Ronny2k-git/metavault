import { baseVaultType } from '../components'

export type useValidateTransactionsProps = {
  selectedVault: baseVaultType | null
  tokenBalance: number
  totalDeposited: number
}

export function useValidateTransactions({ selectedVault, tokenBalance, totalDeposited }: useValidateTransactionsProps) {
  const validate = (amount: number, type: 'deposit' | 'withdraw') => {
    if (!selectedVault) return 'Select a vault first'

    const rules = [
      {
        invalid: type === 'deposit' && amount > tokenBalance,
        message: 'Insufficient token balance',
      },
      {
        invalid: type === 'deposit' && amount < Number(selectedVault?.minDeposit),
        message: 'Amount is lower than the minimum deposit',
      },
      {
        invalid: type === 'deposit' && amount > Number(selectedVault?.maxDeposit),
        message: 'Amount exceeds the maximum deposit',
      },
      {
        invalid: type === 'withdraw' && amount > totalDeposited,
        message: 'Amount exceeds the deposited vaut value',
      },
    ]

    for (const rule of rules) {
      if (rule.invalid) return rule.message
    }
    return null
  }

  return { validate }
}
