import { useTranslation } from 'react-i18next'
import { baseVaultType } from '../components'

export type useValidateTransactionsProps = {
  selectedVault: baseVaultType | null
  tokenBalance: number
  totalDeposited: number
}

export type useValidateProps = {
  amount: number
  type: 'deposit' | 'withdraw'
}

export function useValidateTransactions({ selectedVault, tokenBalance, totalDeposited }: useValidateTransactionsProps) {
  const { t } = useTranslation('profile', { keyPrefix: 'status' })

  const validate = ({ amount, type }: useValidateProps) => {
    if (!selectedVault) return t('validateTransaction.select')

    const rules = [
      {
        invalid: type === 'deposit' && amount > tokenBalance,
        message: t('validateTransaction.balance'),
      },
      {
        invalid: type === 'deposit' && amount + totalDeposited > Number(selectedVault.maxDeposit),
        message: `${t('validateTransaction.maxDeposit')} ${amount} + ${totalDeposited}`,
      },
      {
        invalid: type === 'deposit' && amount < Number(selectedVault?.minDeposit),
        message: t('validateTransaction.minDeposit'),
      },
      {
        invalid: type === 'deposit' && amount > Number(selectedVault?.maxDeposit),
        message: t('validateTransaction.maxDeposit'),
      },
      {
        invalid: type === 'withdraw' && amount > totalDeposited,
        message: t('validateTransaction.withdraw'),
      },
    ]

    for (const rule of rules) {
      if (rule.invalid) return rule.message
    }
    return null
  }

  return { validate }
}
