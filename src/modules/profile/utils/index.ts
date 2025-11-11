import type { Swap } from '@prisma/client'
import { formatUnits } from 'viem'

// Function used to get the total amount deposited in an vault
export function getTotalVaultAmount(vault: { assetTokenDecimals: number }, swaps: Array<Partial<Swap>>): number {
  const deposited = swaps.reduce((acc, swap) => {
    const amount = Number(formatUnits(BigInt(swap.amount!), vault.assetTokenDecimals))

    if (swap.type === 'deposit') return acc + amount
    if (swap.type === 'withdraw') return acc - amount
    return acc
  }, 0)

  return deposited
}
