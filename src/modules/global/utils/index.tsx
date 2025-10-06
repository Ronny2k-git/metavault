export function abreviateAddress(address: string | null | undefined) {
  if (!address) return ''
  return `${address.slice(0, 5)}...${address.slice(-4)}`.toLocaleLowerCase()
}
