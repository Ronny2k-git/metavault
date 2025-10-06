'use client'

import { useAtom } from 'jotai'
import { vaultFormAtom } from '../../atoms'

export function CardPreview() {
  const [formData] = useAtom(vaultFormAtom)

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <div>
      <div className="w-full max-w-[20rem] md:min-w-[20rem] border h-[27.5rem] rounded-md mt-12 border-cyan-400">
        <div className="w-full h-fit aspect-video flex-grow-0">
          <img
            className="rounded-md mb-2 h-[17rem] w-full object-cover"
            src={
              isValidUrl(formData.banner)
                ? formData.banner
                : '/default-banner.jpg'
            }
            onError={(e) => (e.currentTarget.src = '/default-banner.jpg')}
          />
          <div className="flex gap-2 mx-2">
            <img
              className="size-10 rounded-full object-cover"
              src={
                isValidUrl(formData.logo) ? formData.logo : '/default-icon.webp'
              }
              onError={(e) => (e.currentTarget.src = '/default-icon.webp')}
            />
            <div className=" font-normal text-white text-base -mb-6">
              {formData.vaultName || 'Unammed'}
              <br />
              <div className="text-[10px] -mt-0.5">
                {formData.network || 'No chain selected'}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col my-2 mx-2 gap-0.5">
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Minimum Deposit</h3>
            <div className="text-gray-300">{formData.minDeposit || 0}</div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Max dep.per wallet</h3>
            <div className="text-gray-300">{formData.maxDeposit || 0}</div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Start Date</h3>
            <div className="text-gray-300">
              {formData.startDate || '00/00/0000'}
            </div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>End Date</h3>
            <div className="text-gray-300">
              {formData.endDate || '00/00/0000'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
