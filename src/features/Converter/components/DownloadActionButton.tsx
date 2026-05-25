import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { SECONDARY_BUTTON_CLASS } from '@/features/Converter/consts/glassPanelStyles'
import { resolveExportFormatLabel } from '@/features/Converter/export/resolve/resolveExportFormatLabel'
import type { ExportOutputFormat } from '@/features/Converter/export/types/exportSettings'

type DownloadActionButtonProps = {
  outputFormat: ExportOutputFormat
  isDownloading: boolean
  isDisabled: boolean
  onDownloadClick: () => void
}

export const DownloadActionButton = ({
  outputFormat,
  isDownloading,
  isDisabled,
  onDownloadClick,
}: DownloadActionButtonProps) => {
  const { t } = useTranslation()
  const formatLabel = resolveExportFormatLabel(outputFormat)

  const buttonClass = twMerge(SECONDARY_BUTTON_CLASS, (isDisabled || isDownloading) && 'opacity-50')

  return (
    <Button
      type="button"
      variant="outline"
      className={buttonClass}
      onClick={onDownloadClick}
      disabled={isDisabled || isDownloading}
      aria-busy={isDownloading}
    >
      {isDownloading ? <Spinner className="mr-2" /> : null}
      {isDownloading
        ? t('actions.downloading')
        : t('actions.download', { format: formatLabel })}
    </Button>
  )
}
