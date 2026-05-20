import { useTranslation } from 'react-i18next'
import { ConvertActionButton } from '@/features/Converter/components/ConvertActionButton'
import { ConverterStatusLabel } from '@/features/Converter/components/ConverterStatusLabel'
import { DownloadActionButton } from '@/features/Converter/components/DownloadActionButton'
import { SECTION_CLASS } from '@/features/Converter/consts/glassPanelStyles'
import type { StatusMessageState } from '@/features/Converter/types/statusMessage'

type ConverterActionsProps = {
  isProcessing: boolean
  isDownloading: boolean
  hasJsonOutput: boolean
  statusMessage: StatusMessageState
  onConvertClick: () => void
  onDownloadClick: () => void
}

export const ConverterActions = ({
  isProcessing,
  isDownloading,
  hasJsonOutput,
  statusMessage,
  onConvertClick,
  onDownloadClick,
}: ConverterActionsProps) => {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="export-heading" className={SECTION_CLASS}>
      <h2 id="export-heading" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {t('export.heading')}
      </h2>
      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{t('export.description')}</p>

      <div className="mt-4 grid grid-cols-[1.35fr_1fr] gap-2">
        <ConvertActionButton isProcessing={isProcessing} onConvertClick={onConvertClick} />
        <DownloadActionButton
          isDownloading={isDownloading}
          isDisabled={!hasJsonOutput}
          onDownloadClick={onDownloadClick}
        />
      </div>

      <ConverterStatusLabel statusMessage={statusMessage} />
    </section>
  )
}
