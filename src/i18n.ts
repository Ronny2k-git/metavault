import enHome from '@/locales/en/home.json'
import esHome from '@/locales/es/home.json'
import koHome from '@/locales/ko/home.json'
import ptHome from '@/locales/pt/home.json'
import zhCnHome from '@/locales/zh-cn/home.json'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: { home: enHome },
    pt: { home: ptHome },
    es: { home: esHome },
    ko: { home: koHome },
    'zh-CN': { home: zhCnHome },
  },
})

export default i18n
