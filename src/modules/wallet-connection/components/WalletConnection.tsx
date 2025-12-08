'use client'

import { ECOSYSTEMS } from '@/modules/global/constants'
import { formatNumber } from '@/modules/global/utils'
import { Icon, Modal } from '@/ui/components'
import { Tabs } from 'radix-ui'
import { useEffect, useState } from 'react'
import { sepolia } from 'viem/chains'
import { useAccount, useBalance } from 'wagmi'
import { EthereumConnectors, MoveConnectors, SolanaConnectors } from '../subcomponents'

type WalletConnectionProps = {
  trigger?: React.ReactNode
}

export default function WalletConnection({ trigger }: WalletConnectionProps) {
  const [open, setOpen] = useState(false)
  const account = useAccount()
  const userAddress = account.address

  const { data: sepoliaBalance } = useBalance({
    address: userAddress,
    chainId: sepolia.id,
    query: { enabled: !!userAddress },
  })

  // Close the wallet connection when the user connects or disconnects their wallet.
  useEffect(() => {
    if (userAddress) {
      const timer = setTimeout(() => {
        setOpen(false)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      setOpen(false)
    }
  }, [userAddress])

  return (
    <Modal
      className="flex w-full min-h-[28rem] h-auto max-sm:max-w-[20rem] sm:max-w-[45rem]"
      variant={'gradient'}
      title="Ecosystem"
      isOpen={open}
      onOpenChange={setOpen}
      trigger={trigger}
    >
      <div className="flex w-full">
        <Tabs.Root defaultValue="ethereum">
          <Tabs.List className="flex gap-4">
            {ECOSYSTEMS.map((ecosystem, index) => (
              <Tabs.Trigger className="group" key={index} value={ecosystem}>
                <div
                  className=" text-sm px-4 py-2 rounded-2xl bg-transparent shadow-none group-data-[state=active]:bg-purple-950/60
                  group-data-[state=active]:border-b-2 border-indigo-300
                  "
                >
                  {ecosystem}
                </div>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="flex items-center gap-4 py-4">
            <div className="w-1/2 h-0.5 bg-gradient-to-l via-purple-900" />
            Wallets
            <div className="w-1/2 h-0.5  bg-gradient-to-l via-purple-900" />
          </div>
          <Tabs.Content value="ethereum">
            <EthereumConnectors />
          </Tabs.Content>
          <Tabs.Content value="solana">
            <SolanaConnectors />
          </Tabs.Content>
          <Tabs.Content value="move">
            <MoveConnectors />
          </Tabs.Content>
        </Tabs.Root>
        <section className="max-sm:hidden sm:flex -mt-10">
          {/*Vertical divider */}
          <div className="min-h-[26rem] mx-8 -mt-1 w-[1px] bg-gradient-to-b via-purple-900 " />

          {/*Right section  */}
          <div className="flex flex-col md:gap-6 max-md:gap-4 items-center">
            <div className=" w-60 bottom-[24rem] mb-4 text-sm font-semibold h-8 flex items-center justify-center bg-black/15 rounded-full">
              Balance:
              <p className="mx-2 text-indigo-300">{formatNumber(Number(sepoliaBalance?.formatted || 0))} sepolia</p>
            </div>

            <p className="text-xs uppercase tracking-widest= text-indigo-300">Learn</p>

            <h2 className="text-2xl font-semibold text-white mb-4">What Is a Wallet?</h2>

            <div className="flex gap-4 items-center">
              <Icon className="!text-4xl p-3.5 -mt-6 bg-indigo-500/30 text-indigo-300 rounded-full">wifi_home</Icon>
              <div className="flex flex-col w-full text-white max-w-[15rem] text-sm mb-4 leading-relaxed">
                <p>Your digital home</p>
                <h3 className="text-gray-400">
                  The place where your assets are safely stored, such as ETH, tokens, and NFTs.
                </h3>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Icon className="!text-4xl p-3.5 -mt-6 bg-indigo-500/30 text-indigo-300 rounded-full">
                captive_portal
              </Icon>

              <div className="text-white max-w-[15rem] text-sm mb-4 leading-relaxed">
                <p>A new way to log in</p>
                <h3 className="text-gray-400">Send, receive, and manage everything you own on the blockchain.</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  )
}

// {!menuOpen && (
//         <div className="flex transition-shadow duration-300">
//           <button
//             className={`hidden sm:flex p-2 px-4 md:mx-8 items-center gap-2
//               ${userAddress ? 'bg-sky-600 hover:bg-sky-500' : 'bg-gray-600 hover:bg-gray-500'}  rounded-lg cursor-pointer`}
//             type="button"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <FaWallet />
//             {userAddress
//               ? `${abreviateAddress(account.address)}`
//               : 'Connect Wallet'}
//           </button>
//           <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
//             <FaWallet
//               className="size-5 cursor-pointer hover:bg-gray-400 rounded-sm"
//               color={userAddress ? 'cyan' : 'gray'}
//             />
//           </button>
//         </div>
//       )}

//       {menuOpen && (
//         <>
//           <div className="fixed inset-0 bg-black/30 backdrop-blur-sm " />
//           <div className="flex flex-col h-[30rem] w-full max-w-[22rem] py-4 px-4 background rounded-xl gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//             <div className="flex justify-between">
//               <h1>Ecosystem</h1>
//               <button
//                 className="cursor-pointer"
//                 onClick={() => setMenuOpen(!menuOpen)}
//               >
//                 <IoCloseCircle className="size-6 hover:bg-sky-300 rounded-full" />
//               </button>
//             </div>
//             <Tabs.Root defaultValue="ethereum">
//               <Tabs.List className="flex gap-4">
//                 {ECOSYSTEMS.map((ecosystem, index) => (
//                   <Tabs.Trigger
//                     key={index}
//                     value={ecosystem}
//                     className="data-[state=active]:bg-sky-600 py-2 px-4 rounded-xl hover:bg-sky-600 cursor-pointer"
//                   >
//                     {ecosystem}
//                   </Tabs.Trigger>
//                 ))}
//               </Tabs.List>

//               <div className="flex items-center gap-4 py-4">
//                 <div className="w-1/2 h-px bg-sky-300" />
//                 Wallets
//                 <div className="w-1/2 h-px  bg-sky-300" />
//               </div>
//               <Tabs.Content value="ethereum">
//                 <EthereumConnectors />
//               </Tabs.Content>
//               <Tabs.Content value="solana">
//                 <SolanaConnectors />
//               </Tabs.Content>
//               <Tabs.Content value="move">
//                 <MoveConnectors />
//               </Tabs.Content>
//             </Tabs.Root>
//           </div>
//         </>
//       )}
