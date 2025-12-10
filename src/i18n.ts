// Global: Footer and Header
import enGlobal from '@/locales/en/global.json'
import esGlobal from '@/locales/es/global.json'
import koGlobal from '@/locales/ko/global.json'
import ptGlobal from '@/locales/pt/global.json'
import zhCnGlobal from '@/locales/zh-cn/global.json'

// Home
import enHome from '@/locales/en/home.json'
import esHome from '@/locales/es/home.json'
import koHome from '@/locales/ko/home.json'
import ptHome from '@/locales/pt/home.json'
import zhCnHome from '@/locales/zh-cn/home.json'

// Home: Explore dApps card
import enExplore from '@/locales/en/explore.json'
import esExplore from '@/locales/es/explore.json'
import koExplore from '@/locales/ko/explore.json'
import ptExplore from '@/locales/pt/explore.json'
import zhCnExplore from '@/locales/zh-cn/explore.json'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: { global: enGlobal, home: enHome, explore: enExplore },
    es: { global: esGlobal, home: esHome, explore: esExplore },
    ko: { global: koGlobal, home: koHome, explore: koExplore },
    pt: { global: ptGlobal, home: ptHome, explore: ptExplore },
    'zh-CN': { global: zhCnGlobal, home: zhCnHome, explore: zhCnExplore },
  },
})

export default i18n
