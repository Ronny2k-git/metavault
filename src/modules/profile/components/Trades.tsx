import { useGetTokenDecimals, useGetVaultBalance } from '@/modules/global/hooks'
import { scrollToConteiner } from '@/modules/global/utils'
import { vaultInteractionAbi } from '@/modules/global/utils/vaultInteractionAbi'
import { wagmiAppConfig } from '@/modules/wallet-connection/wagmi'
import { Card, Divider, Icon, Input } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'
import { readContract } from 'wagmi/actions'
import { useDeposit, useSaveUserSwap, useWithdraw } from '../hooks'
import type { DepositSchemaType, WithdrawSchemaType } from '../schemas/TradesSchemas'
import { DepositSchema, WithdrawSchema } from '../schemas/TradesSchemas'
import { DepositCard } from './DepositCard'
import { UserCardRowTrades } from './UserCardRowTrades'
import { WithdrawCard } from './WithdrawCard'

export function Trades() {
  const [activeCard, setActiveCard] = useState<'Deposit' | 'Withdraw' | null>('Deposit')
  const { deposit } = useDeposit()
  const { withdraw } = useWithdraw()
  const saveSwap = useSaveUserSwap()
  const { getTokenDecimal } = useGetTokenDecimals()
  const account = useAccount()
  const { data: vaultBalance } = useGetVaultBalance('0x46743403477492c68e1372C83326Aa479DE6Fc62')

  // Deposit Form
  const depositForm = useForm<DepositSchemaType>({
    resolver: zodResolver(DepositSchema),
    defaultValues: { amount: 0 },
  })

  // Withdraw Form
  const withdrawForm = useForm<WithdrawSchemaType>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: { amount: 0 },
  })

  useEffect(() => {
    ;(async () => {
      const maxTest = await readContract(wagmiAppConfig, {
        abi: vaultInteractionAbi,
        address: '0x46743403477492c68e1372C83326Aa479DE6Fc62',
        functionName: 'maxDepositPerWallet',
      })
      const minTest = await readContract(wagmiAppConfig, {
        abi: vaultInteractionAbi,
        address: '0x46743403477492c68e1372C83326Aa479DE6Fc62',
        functionName: 'minDeposit',
      })

      console.log(minTest)
      console.log(maxTest)

      console.log('minDeposit (formatted):', formatUnits(minTest, 18))
      console.log('maxDeposit (formatted):', formatUnits(maxTest, 18))
    })()
  }, [])

  const handleDeposit = async (data: DepositSchemaType) => {
    // get token decimals
    const decimals = await getTokenDecimal('0xc08385eC8C8cC3fdE37C7E9CC3022e069a965650')

    // 1. Deposit in the vault
    const depositTx = await deposit({
      tokenAddress: '0xc08385eC8C8cC3fdE37C7E9CC3022e069a965650',
      amount: BigInt(parseUnits(data.amount.toString(), Number(decimals))),
      spenderAddress: '0x46743403477492c68e1372C83326Aa479DE6Fc62',
    })

    console.log('Deposit tx', depositTx)

    // 2. Save the transaction in the database
    await saveSwap.mutateAsync({
      data: {
        amount: String(parseUnits(data.amount.toString(), Number(decimals))),
        sender: String(account.address),
        txHash: String(depositTx?.hash),
        type: 'deposit',
        vaultId: 34,
      },
    })

    console.log('✅ Deposit saved successfully!')

    // TO DO LATER

    // 1 VALIDATE ALL ERRORS, BALANCE, MIN,(DEPOSIT), MAX,(DEPOSIT),
    //   CONNECT WALLET, AND FOR WITHDRAW VERIFY IF THE AMOUNT IS EQUAL OR
    //   SMALLER THAN DEPOSITED VAULT VALUE.

    console.log('Deposit', data)
    // 4. Move to the recent transactions table
    scrollToConteiner('user-recent-transactions')
  }

  const handleWithdraw = async (data: WithdrawSchemaType) => {
    const decimals = await getTokenDecimal('0xfAb19e8992B0564ab99F7c0098979595124f0Bc3')

    await withdraw({
      tokenAddress: '0xfAb19e8992B0564ab99F7c0098979595124f0Bc3',
      amount: BigInt(parseUnits(data.amount.toString(), Number(decimals))),
      spenderAddress: '0xd13196932EEcA5FafB1D9348859b3E1151cC7BAc',
    })

    console.log('Withdraw', data)
    // Move to the recent transactions table
    scrollToConteiner('user-recent-transactions')
  }

  return (
    <div className="h-full w-full flex flex-col relative">
      <Divider />

      <div className="flex flex-col w-full gap-8 my-12">
        <h1 className="sm:text-4xl text-3xl text-center">
          Deposit or Withdraw <br /> <span className="sm:text-3xl text-2xl text-gray-300">(anytime, anywhere)</span>
        </h1>
        <h2 className="flex items-center justify-center gap-2 text-gray-300 ">
          <Icon className="text-yellow-500 ">error</Icon>
          Deposits are only allowed in live vaults
        </h2>
        <div className="w-full flex flex-col items-center gap-8">
          <Card
            variant={'gradient'}
            className="relative w-full max-w-[30rem] min-h-81 flex flex-col items-center p-2 gap-2 rounded-3xl "
          >
            <button
              className={`absolute ${activeCard === 'Deposit' ? 'top-44' : 'top-31'} z-1 h-11 w-11 bg-gray-900 hover:bg-black/40 flex items-center rounded-xl justify-center 
            cursor-pointer border-2 border-blue-900`}
              onClick={() => {
                setActiveCard(activeCard === 'Deposit' ? 'Withdraw' : 'Deposit')
                depositForm.reset()
                withdrawForm.reset()
              }}
            >
              <Icon>Arrow_Downward</Icon>
            </button>

            {/* Deposit in a vault */}
            <DepositCard
              title="Deposit"
              variant={'secondary'}
              disabled={activeCard === 'Withdraw'}
              trigger={
                activeCard === 'Deposit' && (
                  <Button className={`absolute right-6 h-7 max-w-32 rounded-3xl text-sm`}>Select Vault</Button>
                )
              }
              register={depositForm.register}
              error={depositForm.formState}
            />

            {/* Withdraw in a vault */}
            <WithdrawCard
              title="Withdraw"
              variant={'secondary'}
              disabled={activeCard === 'Deposit'}
              trigger={
                activeCard === 'Withdraw' && (
                  <Button className={`absolute right-6 h-7 max-w-32 rounded-3xl text-sm`}>Select Vault</Button>
                )
              }
              register={withdrawForm.register}
              error={withdrawForm.formState}
            />
            <Button
              className="text-lg"
              variant={'primary'}
              size={'xl'}
              onClick={() => {
                if (activeCard === 'Deposit') {
                  depositForm.handleSubmit(handleDeposit)()
                } else {
                  withdrawForm.handleSubmit(handleWithdraw)()
                }
              }}
            >
              {activeCard}
            </Button>
          </Card>
          <p className="text-center max-sm:text-base text- max-w-[30rem] text-gray-300 mb-4">
            Deposit or withdraw in a vault on sepolia ethereum network anytime, anywhere
          </p>
        </div>
        <Divider />

        {/* User Transactions */}
        <Input
          className="w-full sm:max-w-[27rem]"
          iconLeft={<Icon className="text-blue-300">search</Icon>}
          inputSize={'sm'}
          label="Search transaction"
          placeholder="Search your transactions by tx hash"
        />

        <UserCardRowTrades id={'user-recent-transactions'} />
      </div>
    </div>
  )
}
