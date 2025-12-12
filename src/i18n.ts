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

// Profile Page: 3 Pages
import enProfile from '@/locales/en/profile.json'
import esProfile from '@/locales/es/profile.json'
import koProfile from '@/locales/ko/profile.json'
import ptProfile from '@/locales/pt/profile.json'
import zhCnProfile from '@/locales/zh-CN/profile.json'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: { global: enGlobal, home: enHome, create: enCreate, profile: enProfile },
    es: { global: esGlobal, home: esHome, create: esCreate, profile: esProfile },
    ko: { global: koGlobal, home: koHome, create: koCreate, profile: koProfile },
    pt: { global: ptGlobal, home: ptHome, create: ptCreate, profile: ptProfile },
    'zh-CN': { global: zhCnGlobal, home: zhCnHome, create: zhCnCreate, profile: zhCnProfile },
  },
})

export default i18n
