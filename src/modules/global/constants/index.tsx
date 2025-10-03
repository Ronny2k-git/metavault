import { IoCreateSharp } from 'react-icons/io5'
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
    icon: <IoCreateSharp className="size-6" />,
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: <PiVaultFill className="size-6" />,
  },
]
