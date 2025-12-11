// Global: Footer and Header
import enGlobal from '@/locales/en/global.json'
import esGlobal from '@/locales/es/global.json'
import koGlobal from '@/locales/ko/global.json'
import ptGlobal from '@/locales/pt/global.json'
import zhCnGlobal from '@/locales/zh-CN/global.json'

// Home Page
import enHome from '@/locales/en/home.json'
import esHome from '@/locales/es/home.json'
import koHome from '@/locales/ko/home.json'
import ptHome from '@/locales/pt/home.json'
import zhCnHome from '@/locales/zh-CN/home.json'

// Creation Page: 3 Steps
import enCreate from '@/locales/en/create.json'
import esCreate from '@/locales/es/create.json'
import koCreate from '@/locales/ko/create.json'
import ptCreate from '@/locales/pt/create.json'
import zhCnCreate from '@/locales/zh-CN/create.json'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: { global: enGlobal, home: enHome, create: enCreate },
    es: { global: esGlobal, home: esHome, create: esCreate },
    ko: { global: koGlobal, home: koHome, create: koCreate },
    pt: { global: ptGlobal, home: ptHome, create: ptCreate },
    'zh-CN': { global: zhCnGlobal, home: zhCnHome, create: zhCnCreate },
  },
})

export default i18n
