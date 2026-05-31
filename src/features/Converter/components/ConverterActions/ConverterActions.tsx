import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { ConvertActionButton } from '@/features/Converter/components/ConvertActionButton'
import { ConverterStatusLabel } from '@/features/Converter/components/ConverterStatusLabel'
import { DownloadActionButton } from '@/features/Converter/components/DownloadActionButton'
import { ExportSettingsPanel } from '@/features/Converter/components/ExportSettingsPanel'
import { SECTION_CLASS } from '@/features/Converter/consts/styles'
import { EXPORT_TWO_COLUMN_GRID_CLASS } from '@/features/Converter/export/consts/exportSelectStyles'
import type {
  ExportDetailLevel,
  ExportOutputFormat,
  ExportSettings,
} from '@/features/Converter/export/types/exportSettings'
import type { StatusMessageState } from '@/features/Converter/workflow/types/statusMessage'

type ConverterActionsProps = {
  isProcessing: boolean
  isDownloading: boolean
  hasPreviewOutput: boolean
  exportSettings: ExportSettings
  statusMessage: StatusMessageState
  onConvertClick: () => void
  onDownloadClick: () => void
  onDetailLevelChange: (detailLevel: ExportDetailLevel) => void
  onOutputFormatChange: (outputFormat: ExportOutputFormat) => void
}

export const ConverterActions = ({
  isProcessing,
  isDownloading,
  hasPreviewOutput,
  exportSettings,
  statusMessage,
  onConvertClick,
  onDownloadClick,
  onDetailLevelChange,
  onOutputFormatChange,
}: ConverterActionsProps) => {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="export-heading" className={SECTION_CLASS}>
      <h2 id="export-heading" className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {t('export.heading')}
      </h2>
      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{t('export.description')}</p>

      <ExportSettingsPanel
        exportSettings={exportSettings}
        onDetailLevelChange={onDetailLevelChange}
        onOutputFormatChange={onOutputFormatChange}
      />

      <div className={twMerge('mt-4', EXPORT_TWO_COLUMN_GRID_CLASS)}>
        <ConvertActionButton isProcessing={isProcessing} onConvertClick={onConvertClick} />
        <DownloadActionButton
          outputFormat={exportSettings.outputFormat}
          isDownloading={isDownloading}
          isDisabled={!hasPreviewOutput}
          onDownloadClick={onDownloadClick}
        />
      </div>

      <ConverterStatusLabel statusMessage={statusMessage} />
    </section>
  )
}
