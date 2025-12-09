import { BaseVaultCard } from '@/components'
import { getStatus } from '@/modules/global/utils'
import { useAtom } from 'jotai'
import { confirmFormAtom, userVaultFormAtom, vaultFormAtom } from '../../atoms/createAtoms'

export function CardPreview() {
  const [vaultData] = useAtom(vaultFormAtom)
  const [userData] = useAtom(userVaultFormAtom)
  const [confirmData] = useAtom(confirmFormAtom)

  return (
    <BaseVaultCard
      banner={vaultData.banner}
      logo={vaultData.logo}
      vaultName={vaultData.vaultName}
      discord={userData.discord}
      telegram={userData.telegram}
      twitter={userData.twitter}
      network={vaultData.network}
      creatorName={vaultData.creatorName}
      minDeposit={vaultData.minDeposit}
      maxDeposit={vaultData.maxDeposit}
      startDate={new Date(confirmData.startDate)}
      endDate={new Date(confirmData.endDate)}
      description={vaultData.description}
      status={getStatus({
        startDate: confirmData.startDate,
        endDate: confirmData.endDate,
      })}
      deposited={0}
    />
  )
}
