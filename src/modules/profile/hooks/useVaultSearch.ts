import { useDebounce } from '@/modules/global/hooks'
import { getChainName } from '@/modules/global/utils'
import { useState } from 'react'
import type { baseVaultType } from '../components'

type useVaultSearchProps = {
  initialQuery: string
  fields?: Array<baseVaultType>
  onSearch?: (value: string) => void
}

export function useVaultSearch({ fields, initialQuery, onSearch }: useVaultSearchProps) {
  const [search, setSearch] = useState(initialQuery)

  const debouncedValue = useDebounce(search, 300, onSearch)
  const searchLower = debouncedValue.toLowerCase()

  const filteredVaults = fields?.filter(
    (vault) =>
      vault.address.toLowerCase() === searchLower ||
      vault.vaultName.toLowerCase().includes(searchLower) ||
      vault.creatorName.toLowerCase().includes(searchLower) ||
      getChainName(vault.chainId).toLowerCase().includes(searchLower),
  )
  return { value: filteredVaults, search, setValue: setSearch }
}
