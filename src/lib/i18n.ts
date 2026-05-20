import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { SUPPORTED_LANGUAGE_CODES, type SupportedLanguageCode } from '@/consts/supportedLanguages'
import de from '@/locales/de.json'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'
import it from '@/locales/it.json'
import ja from '@/locales/ja.json'
import pl from '@/locales/pl.json'
import uk from '@/locales/uk.json'
import zh from '@/locales/zh.json'
import { detectBrowserLanguage } from '@/utils/detectBrowserLanguage'
import { normalizeLanguageCode } from '@/utils/findSupportedLanguage'

const I18N_STORAGE_KEY = 'figson-language'

const resources = {
  en: { translation: en },
  de: { translation: de },
  fr: { translation: fr },
  pl: { translation: pl },
  uk: { translation: uk },
  zh: { translation: zh },
  it: { translation: it },
  ja: { translation: ja },
}

const readStoredLanguage = (): SupportedLanguageCode | null => {
  try {
    const storedValue = localStorage.getItem(I18N_STORAGE_KEY)

    if (!storedValue) {
      return null
    }

    if (SUPPORTED_LANGUAGE_CODES.includes(storedValue as SupportedLanguageCode)) {
      return storedValue as SupportedLanguageCode
    }
  } catch {
    return null
  }

  return null
}

const initialLanguage = normalizeLanguageCode(
  readStoredLanguage() ?? detectBrowserLanguage(SUPPORTED_LANGUAGE_CODES),
)

const i18nInitPromise = i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export const persistLanguage = (languageCode: SupportedLanguageCode): void => {
  try {
    localStorage.setItem(I18N_STORAGE_KEY, languageCode)
  } catch {
    return
  }
}

export const waitForI18n = (): Promise<void> => i18nInitPromise.then(() => undefined)

export { i18n }
