import { useTranslation } from 'react-i18next'
import { LanguageSelect } from '@/features/Converter/components/LanguageSelect'
import { InfoModal } from '@/features/InfoModal/components/InfoModal'

export const ConverterHeader = () => {
  const { t } = useTranslation()

  return (
    <header className="flex items-start justify-between gap-3 border-b border-zinc-800/80 pb-4">
      <div className="min-w-0 flex-1">
        <h1 className="mt-1 text-base font-semibold tracking-tight text-zinc-100">
          {t('app.title')}
        </h1>
        <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{t('app.description')}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <InfoModal />
        <LanguageSelect />
      </div>
    </header>
  )
}
