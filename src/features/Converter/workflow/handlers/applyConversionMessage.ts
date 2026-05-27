import { LoadingOperationType } from '@/features/Converter/workflow/types/loadingOperation'
import type { StatusMessageState } from '@/features/Converter/workflow/types/statusMessage'
import { i18n } from '@/lib/i18n'
import { ConversionPayloadSchema } from '@/types/conversionPayloadSchema'
import { type ConversionState, PluginMessageType, type PluginToUiMessage } from '@/types/shared'

type ApplyConversionMessageParams = {
  message: PluginToUiMessage
  setConversionState: (state: ConversionState) => void
  setLoadingOperation: (operation: LoadingOperationType) => void
  setStatusMessage: (message: StatusMessageState) => void
}

const mapPluginMessageToConversionState = (message: PluginToUiMessage): ConversionState | null => {
  if (message.type === PluginMessageType.PLUGIN_ERROR) {
    return { status: 'error', errorMessage: message.payload }
  }

  if (message.type !== PluginMessageType.CONVERSION_RESULT) {
    return null
  }

  const payloadResult = ConversionPayloadSchema.safeParse(message.payload)

  if (!payloadResult.success) {
    return { status: 'error', errorMessage: i18n.t('status.invalidPayload') }
  }

  return { status: 'success', payload: payloadResult.data }
}

const resolveConversionStatusMessage = (conversionState: ConversionState): StatusMessageState => {
  if (conversionState.status === 'error') {
    return {
      variant: 'error',
      text: conversionState.errorMessage || i18n.t('status.processingError'),
    }
  }

  return { variant: 'success', text: i18n.t('status.processingSuccess') }
}

export const applyConversionMessage = (params: ApplyConversionMessageParams): void => {
  const nextState = mapPluginMessageToConversionState(params.message)

  if (!nextState) {
    return
  }

  params.setConversionState(nextState)
  params.setLoadingOperation(LoadingOperationType.NONE)
  params.setStatusMessage(resolveConversionStatusMessage(nextState))
}
