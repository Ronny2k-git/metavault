import { FaFileContract } from 'react-icons/fa'
import { LiaReact } from 'react-icons/lia'
import { PiVaultFill } from 'react-icons/pi'

export const PROJECT_ROUTES = [
  {
    path: '/',
    label: 'Home',
    icon: <LiaReact className="size-6" />,
  },
  {
    path: '/create-vault',
    label: 'Create - Vault',
    icon: <PiVaultFill className="size-6" />,
  },
  {
    path: '/start-deposit',
    label: 'Start - Deposit',
    icon: <FaFileContract className="size-6" />,
  },
]
