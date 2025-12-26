import { AppCardExplore } from '@/home/components'
import { GlobalLoader } from '@/modules/global/components'
import { FEATURES_SECTION_PATHS, WORKS_SECTION_ICONS } from '@/modules/global/constants'
import { scrollToConteiner } from '@/modules/global/utils'
import { BrandLogo, Card, Divider, Icon } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/')({
  component: HomePage,
  ssr: 'data-only',
  pendingComponent: () => <GlobalLoader />,
})

function HomePage() {
  const { t } = useTranslation('home')

  const translatedFeatures = t('mapped.features', { returnObjects: true }) as Array<{ title: string; desc: string }>
  const translatedHow = t('mapped.how', { returnObjects: true }) as Array<{ title: string; desc: string }>

  return (
    <div className="w-full flex flex-col text-white">
      <div
        className="relative w-full flex pt-20 pb-40 bg-[url('/banners/header-banner3.png')]
        bg-cover bg-bottom"
      >
        {/* HOME PAGE HEADER */}
        <header className="w-full flex justify-center items-center">
          <div className="p-8 md:pt-24 flex flex-col max-md:items-center">
            <BrandLogo logoStyle="h-24 max-[460px]:h-18 mb-8" />

            {/* SUBTITLE */}
            <h2 className="text-2xl text-gray-200 mb-2 max-md:text-center">{t('header.subtitle')}</h2>

            {/* DESCRIPTION */}
            <h3 className="text-lg text-gray-300 max-w-xl max-md:text-center">{t('header.description')}</h3>

            <div className="flex w-full max-md:justify-center items-center max-[880px]:flex-col gap-2 mt-8">
              <Button
                className="flex min-[880px]:max-w-[16rem] w-full"
                variant="secondary"
                size="xl"
                onClick={() => requestAnimationFrame(() => scrollToConteiner('features-section'))}
              >
                {t('header.startGuide')}
              </Button>

              {/* APP CARD PAGES */}
              <AppCardExplore
                className="max-w-4xl h-auto"
                trigger={
                  <Button className="min-[880px]:max-w-[16rem] w-full" variant="primary" size="xl">
                    {t('header.exploreDapps')}
                  </Button>
                }
              />
            </div>

            {/* NO WALLET REQUIRED */}
            <p className="text-gray-300 text-sm mt-4">{t('header.noWalletRequired')}</p>
          </div>

          {/* RIGHT IMAGE */}
          <img
            className="max-md:hidden max-h-[22rem] mt-20"
            src="/banners/vault.png"
            loading="eager"
            fetchPriority="high"
          />
        </header>
      </div>

      <main className="relative min-h-screen flex flex-col items-center bg-[url('/banners/secondary-banner.png')] bg-cover bg-left">
        <Divider className="h-px m-12" />

        {/* ===== FEATURES SECTION ===== */}
        <section id="features-section" className="max-w-4xl w-full p-4">
          <h2 className="flex flex-col text-3xl font-semibold items-center mb-12">{t('featuresSection.title')}</h2>

          <div className="flex flex-col gap-8">
            {FEATURES_SECTION_PATHS.map(({ icon, srcVideo }, index) => {
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`flex gap-8 md:gap-16 items-center max-md:flex-col ${
                    isEven ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <Card
                    className="md:max-h-[15rem] md:max-w-[25rem] max-w-[35rem] items-center justify-center rounded-2xl"
                    variant="ghost"
                  >
                    <div className="rounded-2xl p-3 w-full h-full overflow-hidden">
                      <video autoPlay loop muted className="rounded-2xl w-full h-full object-cover block">
                        <source src={srcVideo} />
                      </video>
                    </div>
                  </Card>

                  <div className="flex flex-col w-full max-md:items-center max-md:max-w-[25rem] gap-2">
                    <h3 className="flex gap-2 items-center text-2xl font-semibold mb-1">
                      <Icon className="text-indigo-400 !text-5xl">{icon}</Icon>

                      {translatedFeatures[index].title}
                    </h3>

                    <p className="text-base text-gray-300 max-sm:text-center">{translatedFeatures[index].desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ===== HOW IT WORKS SECTION ===== */}
        <section className="mt-24 w-full text-center max-w-5xl p-4">
          <h2 className="text-3xl font-semibold mb-12">{t('howItWorks.title')}</h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
            {WORKS_SECTION_ICONS.map(({ icon }, index) => (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 120 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center gap-3 text-white"
              >
                <Card className="flex w-full min-h-[15rem] items-center justify-center p-4 rounded-2xl" variant="ghost">
                  <div className="bg-indigo-500/30 h-16 w-16 mb-4 flex items-center justify-center rounded-full">
                    <Icon className="text-indigo-400 !text-4xl">{icon}</Icon>
                  </div>

                  <h3 className="text-xl font-semibold">{translatedHow[index].title}</h3>
                  <p className="text-gray-300 max-w-xs">{translatedHow[index].desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== FINAL HEADER SECTION ===== */}
        <section id="final-header" className="my-28 pb-[25rem] flex flex-col items-center text-center gap-4 px-6">
          <p className="uppercase font-extrabold max-sm:text-3xl max-w-[50rem] text-[clamp(2.5rem,2vw,10rem)] mt-16">
            {t('finalHeader.title')}
          </p>

          <Link className="flex max-w-[15rem] w-full mt-4" to="/create-vault">
            <Button variant="primary" size="xl">
              {t('finalHeader.getStarted')}
            </Button>
          </Link>
        </section>
      </main>

      {/* FOOTER BANNERS */}
      <div className="relative z-[40] w-full flex justify-center">
        <img
          className="absolute max-md:hidden max-w-4xl -top-[13rem] object-cover max-h-[32.5rem] left-1/2 -translate-1/2"
          src="/banners/footer-banner.png"
        />
        <div className="relative w-full">
          <img
            className="h-[6.5rem] animate-gentle-swing absolute max-max-w-4xl object-cover -top-[18.5rem] max-md:pl-4 md:pr-12 left-1/2 -translate-1/2"
            src="/banners/key.png"
          />

          <img
            className="absolute max-max-w-4xl object-cover -top-[5rem] h-[27rem] max-md:pl-4 md:pr-12 left-1/2 -translate-1/2"
            src="/banners/mascot.png"
          />
        </div>
      </div>
    </div>
  )
}
