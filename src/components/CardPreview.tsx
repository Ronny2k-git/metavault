'use client'

export function CardPreview() {
  //   const [selectedNetwork] = useAtom(selectedNetworkAtom);
  //   const [vaultName] = useAtom(vaultNameAtom);
  //   const [vaultLogo] = useAtom(vaultLogoAtom);
  //   const [bannerUrl] = useAtom(bannerUrlAtom);
  //   const [minDeposit] = useAtom(minDepositAtomCreate);
  //   const [maxDeposit] = useAtom(maxDepositAtomCreate);
  //   const [startDate] = useAtom(startDateAtom);
  //   const [endDate] = useAtom(endDateAtom);

  return (
    <div>
      <div className="w-full max-w-[20rem] md:min-w-[20rem] border h-[27.5rem] rounded-md mt-12 border-cyan-400">
        <div className="w-full h-fit aspect-video flex-grow-0">
          <img
            className="rounded-md mb-2 h-[17rem] w-full object-cover"
            src={'/default-banner.jpg'}
            onError={(e) => (e.currentTarget.src = '/default-banner.jpg')}
          />
          <div className="flex gap-2 mx-2">
            <img
              className="size-10 rounded-full object-cover"
              src={'/default-icon.webp'}
            />
            <div className=" font-normal text-white text-base -mb-6">
              {'Unammed'}
              <br />
              <div className="text-[10px] -mt-2">{'No chain selected'}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col my-2 mx-2 gap-0.5">
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Minimum Deposit</h3>
            <div className="text-gray-300">{0}</div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Max dep.per wallet</h3>
            <div className="text-gray-300">{0}</div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Start Date</h3>
            <div className="text-gray-300">
              {new Date().toLocaleDateString('en-US')}
            </div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>End Date</h3>
            <div className="text-gray-300">
              {new Date().toLocaleDateString('en-US')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
