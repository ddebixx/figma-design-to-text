import { DEFAULT_EXPORT_FILE_NAME } from '@/features/Converter/export/consts/exportSettings'
import { downloadExportOutput } from '@/features/Converter/export/download/downloadExportOutput'
import { resolveExportFormatLabel } from '@/features/Converter/export/resolve/resolveExportFormatLabel'
import type { ExportOutputFormat } from '@/features/Converter/export/types/exportSettings'
import { LoadingOperationType } from '@/features/Converter/workflow/types/loadingOperation'
import type { StatusMessageState } from '@/features/Converter/workflow/types/statusMessage'
import { i18n } from '@/lib/i18n'

type TriggerExportDownloadParams = {
  previewOutput: string
  outputFormat: ExportOutputFormat
  setLoadingOperation: (operation: LoadingOperationType) => void
  setStatusMessage: (message: StatusMessageState) => void
}

export const triggerExportDownload = (params: TriggerExportDownloadParams): void => {
  if (!params.previewOutput) {
    params.setStatusMessage({ variant: 'error', text: i18n.t('status.noOutput') })
    return
  }

  params.setLoadingOperation(LoadingOperationType.DOWNLOADING)
  params.setStatusMessage({ variant: 'info', text: i18n.t('status.downloading') })

  try {
    downloadExportOutput({
      content: params.previewOutput,
      fileName: DEFAULT_EXPORT_FILE_NAME,
      outputFormat: params.outputFormat,
    })

    const formatLabel = resolveExportFormatLabel(params.outputFormat)

    params.setStatusMessage({
      variant: 'success',
      text: i18n.t('status.downloadSuccess', { format: formatLabel }),
    })
  } catch {
    params.setStatusMessage({ variant: 'error', text: i18n.t('status.downloadError') })
  } finally {
    params.setLoadingOperation(LoadingOperationType.NONE)
  }
}
