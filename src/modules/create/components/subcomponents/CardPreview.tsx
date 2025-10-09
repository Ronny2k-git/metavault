import { BaseVaultCard } from '@/components'
import { getStatus } from '@/modules/global/utils'
import { useAtom } from 'jotai'
import { vaultFormAtom } from '../../atoms'

export function CardPreview() {
  const [formData] = useAtom(vaultFormAtom)

  return (
    <BaseVaultCard
      banner={formData.banner}
      logo={formData.logo}
      vaultName={formData.vaultName}
      network={formData.network}
      minDeposit={formData.minDeposit}
      maxDeposit={formData.maxDeposit}
      startDate={formData.startDate}
      endDate={formData.endDate}
      description={formData.description}
      status={getStatus({
        startDate: formData.startDate,
        endDate: formData.endDate,
      })}
    />
  )
}
