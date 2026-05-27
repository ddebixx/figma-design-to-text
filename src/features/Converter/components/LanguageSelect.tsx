import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SUPPORTED_LANGUAGES } from '@/consts/supportedLanguages'
import { LANGUAGE_TRIGGER_CLASS } from '@/features/Converter/consts/glassPanelStyles'
import { EXPORT_SELECT_CONTENT_CLASS } from '@/features/Converter/export/consts/exportSelectStyles'
import { persistLanguage } from '@/lib/i18n'
import { findSupportedLanguage } from '@/utils/findSupportedLanguage'

const LANGUAGE_TRIGGER_WITH_FLAG_CLASS = twMerge(LANGUAGE_TRIGGER_CLASS, '[&>svg]:hidden')

const LANGUAGE_SELECT_ITEM_CLASS = 'text-xs text-zinc-200 focus:bg-zinc-800 focus:text-zinc-200'

export const LanguageSelect = () => {
  const { t, i18n: i18nInstance } = useTranslation()
  const activeLanguage = findSupportedLanguage(i18nInstance.language)

  const handleLanguageChange = (languageCode: string) => {
    const selectedLanguage = findSupportedLanguage(languageCode)

    void i18nInstance.changeLanguage(selectedLanguage.code)
    persistLanguage(selectedLanguage.code)
  }

  return (
    <Select value={activeLanguage.code} onValueChange={handleLanguageChange}>
      <SelectTrigger className={LANGUAGE_TRIGGER_WITH_FLAG_CLASS} aria-label={t('language.label')}>
        <span className="text-lg leading-none" aria-hidden>
          {activeLanguage.flag}
        </span>
        <SelectValue className="sr-only" />
      </SelectTrigger>

      <SelectContent
        className={EXPORT_SELECT_CONTENT_CLASS}
        position="popper"
        align="end"
        sideOffset={6}
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <SelectItem
            key={language.code}
            value={language.code}
            className={LANGUAGE_SELECT_ITEM_CLASS}
          >
            <span className="text-base leading-none" aria-hidden>
              {language.flag}
            </span>
            <span>{language.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
