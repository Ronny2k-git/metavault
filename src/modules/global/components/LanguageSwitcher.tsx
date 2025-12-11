import i18n from '@/i18n'
import { Card } from '@/ui/components'
import { Button } from '@/ui/components/Button'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', label: 'en', flag: '🇺🇸' },
  { code: 'pt', label: 'pt', flag: '🇧🇷' },
  { code: 'es', label: 'es', flag: '🇪🇸' },
  { code: 'ko', label: 'ko', flag: '🇰🇷' },
  { code: 'zh-CN', label: 'zhcn', flag: '🇨🇳' },
]

export function LanguageSwitcher() {
  const [lang, setLang] = useState(i18n.language)
  const [open, setOpen] = useState(false)
  const { t } = useTranslation('global', { keyPrefix: 'header.languageSelector' })

  useEffect(() => {
    const handler = (lng: string) => setLang(lng)
    i18n.on('languageChanged', handler)
    return () => i18n.off('languageChanged', handler)
  }, [])

  const selected = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  return (
    <div className="relative inline-block">
      <Button
        className="flex px-4 gap-3 max-h-12 shadow-2xs rounded-xl border-purple-900/70"
        variant={'black'}
        onClick={() => setOpen(!open)}
      >
        <span>{selected.flag}</span>
        {t(selected?.label)}
      </Button>

      {open && (
        <Card
          className="absolute flex flex-col gap-1 right-0 mt-2 border-purple-900/70 rounded-xl shadow-lg z-50 w-44 p-2"
          variant={'gradient2'}
        >
          {LANGUAGES.map((langItem) => (
            <Button
              key={langItem.code}
              className="flex bg-transparent border-none items-center justify-start w-full gap-3 px-3 rounded-lg hover:bg-purple-950/40"
              variant={'primary'}
              onClick={() => {
                i18n.changeLanguage(langItem.code)
                setOpen(!open)
              }}
            >
              <span className="text-xl">{langItem.flag}</span>
              <span>{t(langItem.label)}</span>
            </Button>
          ))}
        </Card>
      )}
    </div>
  )
}

// return (
//     <div className="relative inline-block">
//       <select
//         className="appearance-none border-1 bg-black/20 hover:bg-black/40 border-purple-900/70 p-2 px-4 pr-10 rounded-xl outline-none cursor-pointer"
//         value={lang}
//         onChange={(e) => i18n.changeLanguage(e.target.value)}
//       >
//         <option value="" disabled hidden>
//           Select Language
//         </option>
//         <option value="en">{t('en')}</option>
//         <option value="pt">{t('pt')}</option>
//         <option value="ko">{t('ko')}</option>
//         <option value="zh-CN">{t('zhcn')}</option>
//         <option value="es">{t('es')}</option>
//       </select>

//       <Icon className="absolute z-1 text-gray-300 right-2 top-1/2 -translate-y-1/2">captive_portal</Icon>
//     </div>
//   )
