'use client'

import { ECOSYSTEMS } from '@/modules/global/constants'
import { abreviateAddress } from '@/modules/global/utils'
import { Icon, Modal } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { Tabs } from 'radix-ui'
import { useEffect, useState } from 'react'
import { FaWallet } from 'react-icons/fa'
import { useAccount } from 'wagmi'
import { EthereumConnectors, MoveConnectors, SolanaConnectors } from '../subcomponents'

export default function WalletConnection() {
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
      className="!min-h-[28rem] h-auto"
      title="Ecosystem"
      isOpen={open}
      onOpenChange={setOpen}
      trigger={
        <div>
          <Button
            className="w-full px-6 hidden sm:flex"
            size={'base'}
            variant={connectedWallet ? 'primary' : 'secondary'}
            iconLeft={<Icon>wallet</Icon>}
          >
            {connectedWallet ? `${abreviateAddress(account.address)}` : 'Connect Wallet'}
          </Button>
          <FaWallet
            className="sm:hidden size-5 cursor-pointer hover:bg-gray-400 rounded-sm"
            color={connectedWallet ? 'cyan' : 'gray'}
          />
        </div>
      }
    >
      <Tabs.Root defaultValue="ethereum">
        <Tabs.List className="flex gap-4">
          {ECOSYSTEMS.map((ecosystem, index) => (
            <Tabs.Trigger
              key={index}
              value={ecosystem}
              className="data-[state=active]:bg-sky-600 py-2 px-4 rounded-xl hover:opacity-85 cursor-pointer"
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
