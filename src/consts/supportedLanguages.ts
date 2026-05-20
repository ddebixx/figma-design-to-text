export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
] as const

export const SUPPORTED_LANGUAGE_CODES = SUPPORTED_LANGUAGES.map(
  (language) => language.code,
) as readonly SupportedLanguageCode[]

export type SupportedLanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code']

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]
