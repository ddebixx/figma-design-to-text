import { notifyConversionResult } from '@/features/Converter/handlers/notifyConversionResult'
import { LoadingOperationType } from '@/features/Converter/types/loadingOperation'
import type { StatusMessageState } from '@/features/Converter/types/statusMessage'
import type { ConversionState, PluginToUiMessage } from '@/types/shared'
import { mapPluginMessageToConversionState } from '@/utils/mapPluginMessageToConversionState'

type ApplyConversionMessageParams = {
  message: PluginToUiMessage
  setConversionState: (state: ConversionState) => void
  setLoadingOperation: (operation: LoadingOperationType) => void
  setStatusMessage: (message: StatusMessageState) => void
}

export const applyConversionMessage = (params: ApplyConversionMessageParams): void => {
  const nextState = mapPluginMessageToConversionState(params.message)

  if (!nextState) {
    return
  }

  params.setConversionState(nextState)
  params.setLoadingOperation(LoadingOperationType.NONE)
  notifyConversionResult({
    conversionState: nextState,
    setStatusMessage: params.setStatusMessage,
  })
}
