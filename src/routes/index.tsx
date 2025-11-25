import { FEATURES_SECTION, WORKS_SECTION } from '@/modules/global/constants'
import { scrollToConteiner } from '@/modules/global/utils'
import { Card, Divider, Icon } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { Link, createFileRoute } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])

  return (
    <div>
      <main className="page background-image text-white min-h-screen flex flex-col items-center">
        <header className="pt-20 pb-12 text-center flex flex-col items-center max-w-4xl px-6">
          <motion.img
            src={'/homeImage.png'}
            className="max-h-[17rem] max-w-[17rem] mb-4 rounded-full "
            alt="logo"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 60 }}
            transition={{ duration: 1 }}
          />
          <div className="flex flex-col relative gap-8 sm:mb-6 items-center">
            <motion.h1
              className="text-7xl max-[468px]:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Meta Vault
            </motion.h1>
            <img
              className="sm:absolute h-[20rem] animate-pulse max-sm:-m-14 left-[21rem] -bottom-4"
              src="/banners/mascot2.png"
            />
          </div>

          <h2 className="text-2xl text-gray-200 mb-2">Decentralized. Secure. Yours.</h2>
          <h3 className="text-lg text-gray-300 max-w-xl">
            Create your vault and secure your crypto today — built for transparency and control.
          </h3>

          <div className="flex w-full justify-center max-[500px]:flex-col gap-2 mt-8">
            <Button
              className="flex sm:max-w-[13rem] w-full "
              variant={'secondary'}
              size={'xl'}
              onClick={() => requestAnimationFrame(() => scrollToConteiner('features-section'))}
            >
              Get Started Guide
            </Button>

            <Link className="sm:max-w-[13rem] w-full" to={'/create-vault'}>
              <Button variant={'primary'} size={'xl'}>
                Create Vault
              </Button>
            </Link>
          </div>

          <p className="text-gray-300 text-sm mt-4">Explore freely — no wallet required.</p>
        </header>

        <Divider className="h-0.5 mb-12" />

        {/* FEATURES SECTION */}
        <section id="features-section" className=" max-w-4xl w-full">
          <h2 className="flex flex-col text-3xl font-semibold items-center mb-12">Why Use Meta Vault?</h2>
          <div className="flex flex-col gap-8">
            {FEATURES_SECTION.map(({ icon, title, desc, srcVideo }, index) => {
              const isEven = index % 2 === 0

              return (
                <div
                  className={`flex gap-8 md::gap-16 items-center max-md:flex-col ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <Card
                    key={title}
                    className="md:max-h-[15rem] md:max-w-[25rem] max-w-[35rem] items-center justify-center rounded-2xl"
                    variant={'ghost'}
                  >
                    <video autoPlay loop muted playsInline className="rounded-2xl p-3 w-full h-full object-cover">
                      <source src={srcVideo} />
                    </video>
                  </Card>
                  <div className="flex flex-col w-full max-md:items-center max-md:max-w-[25rem] gap-2">
                    <h3 className="flex gap-2 items-center text-2xl font-semibold mb-1  ">
                      <Icon className="text-blue-400 !text-5xl">{icon}</Icon>
                      {title}
                    </h3>

                    <p className="text-base text-gray-300 max-sm:text-center">{desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="mt-24 w-full text-center max-w-5xl">
          <h2 className="text-3xl font-semibold mb-12">How it works</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 ">
            {WORKS_SECTION.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 120 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center gap-3 text-white"
              >
                <Card
                  className="flex w-full min-h-[15rem] items-center justify-center p-4 rounded-2xl "
                  variant={'ghost'}
                >
                  <div className="bg-blue-500/30 h-16 w-16 mb-4 flex items-center justify-center rounded-full">
                    <Icon className="text-blue-400 !text-4xl">{icon}</Icon>
                  </div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-gray-300 max-w-xs">{desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL HEADER */}
        <section id="final-header" className="mt-28 pb-[26rem] flex flex-col items-center text-center gap-4 px-6">
          <h2 className="text-3xl font-bold">Ready to build your vault?</h2>
          <p className="text-gray-300 text-lg max-w-md">
            Start protecting your crypto in minutes with Meta Vault on Sepolia.
          </p>
          <Link className="flex max-w-[15rem] w-full mt-4" to="/create-vault">
            <Button variant={'primary'} size={'xl'}>
              Get Started
            </Button>
          </Link>

          {/* {ADD HERE LATER THE TITLE, SOMENTHING LIKE: NOTHING MORE TO EXPLORE ....
          IT WILL LOOK LIKE THE DISCORD TITLE.
          } */}
        </section>
      </main>
      <div className="relative z-[40] w-full flex justify-center">
        <img
          className="z-[40] absolute max-md:hidden max-w-4xl -top-[13rem] object-cover max-h-[32.5rem] left-1/2 -translate-1/2"
          src="/banners/footer-banner1.png"
        />

        <img
          className="z-[40] absolute max-max-w-4xl object-cover -top-[15rem] h-[40rem] max-md:pl-10 md:pr-6 left-1/2 -translate-1/2"
          src="/banners/mascot.png"
        />
      </div>
    </div>
  )
}
