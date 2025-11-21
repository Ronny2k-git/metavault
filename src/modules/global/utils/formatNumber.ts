import { formatUnits } from 'viem'

// Function used to format a number based on provided value.
const defaultNumberFormatter = new Intl.NumberFormat('en', {
  compactDisplay: 'short',
  unitDisplay: 'narrow',
  minimumSignificantDigits: 2,
  maximumSignificantDigits: 4,
})

export function formatNumber(value: number | bigint) {
  return defaultNumberFormatter.format(value)
}

// Function format big int to number
export function formatBigIntToNumber(value: bigint, decimals: number) {
  return formatNumber(Number(formatUnits(value, decimals) || 0))
}
