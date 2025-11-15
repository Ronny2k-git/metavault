'use client'

import { ECOSYSTEMS } from '@/modules/global/constants'
import { Icon, Modal } from '@/ui/components'
import { Tabs } from 'radix-ui'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { EthereumConnectors, MoveConnectors, SolanaConnectors } from '../subcomponents'

type WalletConnectionProps = {
  trigger?: React.ReactNode
}

export default function WalletConnection({ trigger }: WalletConnectionProps) {
  const account = useAccount()
  const connectedWallet = account.address
  const [open, setOpen] = useState(false)

  // Close the modal when the user connects or disconnects their wallet.
  useEffect(() => {
    if (connectedWallet) {
      const timer = setTimeout(() => {
        setOpen(false)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      setOpen(false)
    }
  }, [connectedWallet])

  return (
    <Modal
      className="flex w-full min-h-[28rem] h-auto max-sm:max-w-[23rem] sm:max-w-[45rem]"
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
              <Tabs.Trigger
                key={index}
                value={ecosystem}
                className="data-[state=active]:bg-gradient-to-b to-sky-600 from-blue-800 data-[state=active]:border-b-2 text-sm shadow-white py-2 px-4 rounded-2xl data-[state=inactive]:hover:opacity-85 cursor-pointer"
              >
                {ecosystem}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <div className="flex items-center gap-4 py-4">
            <div className="w-1/2 h-px bg-sky-300" />
            Wallets
            <div className="w-1/2 h-px  bg-sky-300" />
          </div>
          <Tabs.Content className="w-full" value="ethereum">
            <EthereumConnectors />
          </Tabs.Content>
          <Tabs.Content value="solana">
            <SolanaConnectors />
          </Tabs.Content>
          <Tabs.Content value="move">
            <MoveConnectors />
          </Tabs.Content>
        </Tabs.Root>
        <section className="hidden sm:flex">
          {/*Vertical divider */}
          <div className="min-h-[30rem] mx-8 -mt-20 w-0.5 bg-gradient-to-t via-sky-500 " />

          {/*Right section  */}
          <div className="flex flex-col gap-6 items-center">
            <p className="text-xs uppercase tracking-widest text-blue-300">Learn</p>

            <h2 className="text-2xl font-semibold text-white mb-4">What Is a Wallet?</h2>

            <div className="flex gap-4 items-center">
              <Icon className="!text-4xl p-3.5 -mt-6 bg-blue-500/30 text-blue-300 rounded-full">wifi_home</Icon>
              <div className="flex flex-col w-full text-white max-w-[15rem] text-sm mb-4 leading-relaxed">
                <p>Your digital home</p>
                <h3 className="text-gray-400">
                  The place where your assets are safely stored, such as ETH, tokens, and NFTs.
                </h3>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Icon className="!text-4xl p-3.5 -mt-6 bg-blue-500/30 text-blue-300 rounded-full">captive_portal</Icon>

              <div className="text-white max-w-[15rem] text-sm mb-4 leading-relaxed">
                <p>A new way to log in</p>
                <h3 className="text-gray-400">
                  Send, receive, and manage everything you own on the blockchain, always under your full control.
                </h3>
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
//               ${connectedWallet ? 'bg-sky-600 hover:bg-sky-500' : 'bg-gray-600 hover:bg-gray-500'}  rounded-lg cursor-pointer`}
//             type="button"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <FaWallet />
//             {connectedWallet
//               ? `${abreviateAddress(account.address)}`
//               : 'Connect Wallet'}
//           </button>
//           <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
//             <FaWallet
//               className="size-5 cursor-pointer hover:bg-gray-400 rounded-sm"
//               color={connectedWallet ? 'cyan' : 'gray'}
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
