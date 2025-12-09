import i18n from '@/i18n'
import { useEffect, useState } from 'react'

export function LanguageSwitcher() {
  const [lang, setLang] = useState(i18n.language)

  useEffect(() => {
    const handler = (lng: string) => setLang(lng)
    i18n.on('languageChanged', handler)
    return () => i18n.off('languageChanged', handler)
  }, [])

  return (
    <select
      className="border-1 bg-purple-950/60 border-purple-900 p-2 px-4 rounded-xl outline-none"
      value={lang}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="pt">Portuguese</option>
      <option value="ko">Korean</option>
      <option value="zh-CN">Chinese</option>
      <option value="es">Spanish</option>
    </select>
  )
}
