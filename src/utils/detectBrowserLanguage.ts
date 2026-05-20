import type { SupportedLanguageCode } from '@/consts/supportedLanguages'

export const detectBrowserLanguage = (
  supportedCodes: readonly SupportedLanguageCode[],
): SupportedLanguageCode => {
  const browserSegment = navigator.language.split('-')[0]?.toLowerCase() ?? 'en'

  if (supportedCodes.includes(browserSegment as SupportedLanguageCode)) {
    return browserSegment as SupportedLanguageCode
  }

  return 'en'
}
