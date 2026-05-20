import type { StatusMessageState } from '@/features/Converter/types/statusMessage'
import { i18n } from '@/lib/i18n'
import type { ConversionState } from '@/types/shared'

type NotifyConversionResultParams = {
  conversionState: ConversionState
  setStatusMessage: (message: StatusMessageState) => void
}

export const notifyConversionResult = (params: NotifyConversionResultParams): void => {
  if (params.conversionState.status === 'success') {
    params.setStatusMessage({
      variant: 'success',
      text: i18n.t('status.processingSuccess'),
    })
    return
  }

  if (params.conversionState.status === 'error') {
    params.setStatusMessage({
      variant: 'error',
      text: params.conversionState.errorMessage || i18n.t('status.processingError'),
    })
  }
}
