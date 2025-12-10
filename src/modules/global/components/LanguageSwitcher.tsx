import i18n from '@/i18n'
import { Icon } from '@/ui/components'
import { useEffect, useState } from 'react'

export function LanguageSwitcher() {
  const [lang, setLang] = useState(i18n.language)

  useEffect(() => {
    const handler = (lng: string) => setLang(lng)
    i18n.on('languageChanged', handler)
    return () => i18n.off('languageChanged', handler)
  }, [])

  return (
    <div className="relative inline-block">
      <select
        className="appearance-none border-1 bg-black/20 hover:bg-black/40 border-purple-900/70 p-2 px-4 pr-10 rounded-xl outline-none cursor-pointer"
        value={lang}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="pt">Portuguese</option>
        <option value="ko">Korean</option>
        <option value="zh-CN">Chinese</option>
        <option value="es">Spanish</option>
      </select>

      <Icon className="absolute z-1 text-gray-300 right-2 top-1/2 -translate-y-1/2">captive_portal</Icon>
    </div>
  )
}
