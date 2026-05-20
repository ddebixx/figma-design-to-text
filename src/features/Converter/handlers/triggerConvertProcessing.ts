import { LoadingOperationType } from '@/features/Converter/types/loadingOperation'
import type { StatusMessageState } from '@/features/Converter/types/statusMessage'
import { i18n } from '@/lib/i18n'
import { postConvertSelectionMessage } from '@/lib/postConvertSelectionMessage'

type TriggerConvertProcessingParams = {
  setLoadingOperation: (operation: LoadingOperationType) => void
  setStatusMessage: (message: StatusMessageState) => void
}

export const triggerConvertProcessing = (params: TriggerConvertProcessingParams): void => {
  params.setLoadingOperation(LoadingOperationType.PROCESSING)
  params.setStatusMessage({
    variant: 'info',
    text: i18n.t('status.processing'),
  })
  postConvertSelectionMessage()
}
