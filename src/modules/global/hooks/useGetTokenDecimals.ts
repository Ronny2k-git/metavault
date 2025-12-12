import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import type { Address } from 'viem'
import { erc20Abi } from 'viem'
import { sepolia } from 'viem/chains'
import { useChainId } from 'wagmi'
import { readContract } from 'wagmi/actions'

export function useGetTokenDecimals() {
  const chainId = useChainId()
  const { t } = useTranslation('global', { keyPrefix: 'globalMessages' })

  const getTokenDecimal = async (tokenAddress: Address) => {
    if (chainId != sepolia.id) {
      toast.error(t('wrongNetwork'))
      throw new Error('Wrong network')
    }

    const decimals = await readContract(wagmiAppConfig, {
      abi: erc20Abi,
      address: tokenAddress,
      functionName: 'decimals',
    })

    return decimals
  }

  return { getTokenDecimal }
}
