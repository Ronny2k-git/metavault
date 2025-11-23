import type { Swap } from '@prisma/client'
import { formatUnits } from 'viem'

{
  /*
Function used to get the total amount deposited in an vault
returning a number.
   */
}
export function getTotalVaultAmount(vault: { assetTokenDecimals: number }, swaps: Array<Partial<Swap>>): number {
  const total = swaps.reduce((acc, swap) => {
    const amount = BigInt(swap.amount ?? 0)

    if (swap.type === 'deposit') return acc + amount
    if (swap.type === 'withdraw') return acc - amount
    return acc
  }, 0n)

  return Number(formatUnits(total, vault.assetTokenDecimals))
}

{
  /*
Function used to get the total amount deposited in an vault
returning a bigint.
   */
}
export function getVaultRawAmount(swaps: Array<Partial<Swap>>): bigint {
  return swaps.reduce((acc, swap) => {
    const amount = BigInt(swap.amount ?? 0)

    if (swap.type === 'deposit') return acc + amount
    if (swap.type === 'withdraw') return acc - amount
    return acc
  }, 0n)
}
