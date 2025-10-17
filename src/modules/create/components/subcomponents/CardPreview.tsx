import { BaseVaultCard } from '@/components'
import { getStatus } from '@/modules/global/utils'
import { useAtom } from 'jotai'
import { confirmFormAtom, userFormAtom, vaultFormAtom } from '../../atoms/createAtoms'

export function CardPreview() {
  const [vaultData] = useAtom(vaultFormAtom)
  const [userData] = useAtom(userFormAtom)
  const [confirmData] = useAtom(confirmFormAtom)

  return (
    <BaseVaultCard
      banner={vaultData.banner}
      logo={vaultData.logo}
      vaultName={vaultData.vaultName}
      network={vaultData.network}
      creatorName={vaultData.creatorName}
      minDeposit={vaultData.minDeposit}
      maxDeposit={vaultData.maxDeposit}
      startDate={confirmData.startDate}
      endDate={confirmData.endDate}
      description={vaultData.description}
      status={getStatus({
        startDate: confirmData.startDate,
        endDate: confirmData.endDate,
      })}
    />
  )
}
