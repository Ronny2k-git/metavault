export const PROJECT_ROUTES = [
  {
    path: '/',
    label: 'Home',
    icon: 'home',
  },
  {
    path: '/create-vault',
    label: 'Create - Vault',
    icon: 'add_circle',
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: 'account_circle',
  },
]

export const ECOSYSTEMS = ['ethereum', 'solana', 'move']

export const FEATURES_SECTION = [
  {
    srcVideo: '/videos/',
    icon: 'encrypted_add_circle',
    title: 'Secure by Design',
    desc: 'Your vault runs on immutable smart contracts. No custodians, no intermediaries — only verifiable on-chain security. Your assets stay 100% under your control.',
  },
  {
    srcVideo: '/videos/fastEdited.mp4',
    icon: 'rocket_launch',
    title: 'Fast Transactions',
    desc: 'Built on the Sepolia network for near-instant confirmations. Deposits and withdrawals settle in seconds, ensuring a smooth and responsive experience.',
  },
  {
    srcVideo: '/videos/transparent.mp4',
    icon: 'fact_check',
    title: 'Transparent Vaults',
    desc: 'Monitor balances and activity in real time with data pulled directly from the blockchain. Full visibility into every action, whenever you need it.',
  },
]

export const WORKS_SECTION = [
  {
    icon: 'wallet',
    title: '1. Connect your wallet',
    desc: 'Use MetaMask or WalletConnect to get started instantly.',
  },
  {
    icon: 'create',
    title: '2. Create a Vault',
    desc: 'Set parameters and deploy your secure vault into the blockchain in minutes.',
  },
  {
    icon: 'savings',
    title: '3. Deposit & Track',
    desc: 'Deposit tokens and monitor vault performance in real time.',
  },
]
