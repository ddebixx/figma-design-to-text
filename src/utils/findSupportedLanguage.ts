import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
  type SupportedLanguageCode,
} from '@/consts/supportedLanguages'

export const normalizeLanguageCode = (languageCode: string): SupportedLanguageCode => {
  const baseLanguageCode = languageCode.split('-')[0]

  if (isSupportedLanguageCode(baseLanguageCode)) {
    return baseLanguageCode
  }

  return 'en'
}

export const findSupportedLanguage = (languageCode: string): SupportedLanguage => {
  const normalizedCode = normalizeLanguageCode(languageCode)
  const matchedLanguage = SUPPORTED_LANGUAGES.find((language) => language.code === normalizedCode)

  if (matchedLanguage) {
    return matchedLanguage
  }

  return SUPPORTED_LANGUAGES[0]
}

export const isSupportedLanguageCode = (value: string): value is SupportedLanguageCode => {
  return SUPPORTED_LANGUAGES.some((language) => language.code === value)
}
