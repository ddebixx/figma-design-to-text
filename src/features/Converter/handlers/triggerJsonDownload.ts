import { DEFAULT_EXPORT_FILE_NAME } from '@/features/Converter/consts/exportFileName'
import { LoadingOperationType } from '@/features/Converter/types/loadingOperation'
import type { StatusMessageState } from '@/features/Converter/types/statusMessage'
import { i18n } from '@/lib/i18n'
import type { ConversionState } from '@/types/shared'
import { downloadJson } from '@/utils/downloadJson'

type TriggerJsonDownloadParams = {
  conversionState: ConversionState
  setLoadingOperation: (operation: LoadingOperationType) => void
  setStatusMessage: (message: StatusMessageState) => void
}

export const triggerJsonDownload = (params: TriggerJsonDownloadParams): void => {
  if (params.conversionState.status !== 'success') {
    params.setStatusMessage({
      variant: 'error',
      text: i18n.t('status.noOutput'),
    })
    return
  }

  params.setLoadingOperation(LoadingOperationType.DOWNLOADING)
  params.setStatusMessage({
    variant: 'info',
    text: i18n.t('status.downloading'),
  })

  try {
    downloadJson(params.conversionState.payload, DEFAULT_EXPORT_FILE_NAME)
    params.setStatusMessage({
      variant: 'success',
      text: i18n.t('status.downloadSuccess'),
    })
  } catch {
    params.setStatusMessage({
      variant: 'error',
      text: i18n.t('status.downloadError'),
    })
  } finally {
    params.setLoadingOperation(LoadingOperationType.NONE)
  }
}
