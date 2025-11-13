import { FEATURES_SECTION, WORKS_SECTION } from '@/modules/global/constants'
import { Divider, Icon } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="page background-image text-white min-h-screen flex flex-col items-center">
      <header className="pt-20 pb-12 text-center flex flex-col items-center max-w-4xl px-6">
        <motion.img
          src={'/homeImage.png'}
          className="max-h-[22rem] max-w-[22rem] rounded-full "
          alt="logo"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 60 }}
          transition={{ duration: 1 }}
        />

        <div className="flex gap-3 mb-6 items-center">
          <motion.h1
            className="text-6xl max-[465px]:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Meta Vault
          </motion.h1>
        </div>

        <h2 className="text-2xl text-gray-200 mb-2">Decentralized. Secure. Yours.</h2>
        <h3 className="text-lg text-gray-300 max-w-xl">
          Create your vault and secure your crypto today — built for transparency and control.
        </h3>

        <Link className="flex max-w-[15rem] w-full mt-8" to="/create-vault">
          <Button variant={'primary'} size={'xl'}>
            Start Now
          </Button>
        </Link>
        <p className="text-gray-300 text-sm mt-2">No wallet? You can explore first.</p>
      </header>

      <Divider className="h-0.5 mb-8" />

      {/* FEATURES SECTION */}
      <section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] max-w-4xl gap-8 px-6 w-full">
        {FEATURES_SECTION.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="bg-blue-500/20 p-6 flex flex-col items-center rounded-2xl shadow-md hover:bg-blue-500/10 hover:scale-105 transition"
          >
            <Icon className="text-blue-400 !text-5xl mb-3">{icon}</Icon>
            <h3 className="text-xl font-semibold mb-1">{title}</h3>
            <p className="text-gray-300 text-center">{desc}</p>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="mt-24 text-center px-6 max-w-5xl">
        <h2 className="text-3xl font-semibold mb-12">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-12">
          {WORKS_SECTION.map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 120 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center gap-3 text-white"
            >
              <div className="bg-blue-500/30 h-16 w-16 flex items-center justify-center rounded-full">
                <Icon className="text-blue-400 !text-4xl">{icon}</Icon>
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-300 max-w-xs">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL HEADER */}
      <section className="my-28 flex flex-col items-center text-center gap-4 px-6">
        <h2 className="text-3xl font-bold">Ready to build your vault?</h2>
        <p className="text-gray-300 text-lg max-w-md">
          Start protecting your crypto in minutes with Meta Vault on Sepolia.
        </p>
        <Link className="flex max-w-[15rem] w-full mt-4" to="/create-vault">
          <Button variant={'primary'} size={'xl'}>
            Create Vault
          </Button>
        </Link>
      </section>
    </main>
  )
}
