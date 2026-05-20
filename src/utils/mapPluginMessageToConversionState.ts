import { type ConversionState, PluginMessageType, type PluginToUiMessage } from '@/types/shared'

export const mapPluginMessageToConversionState = (
  message: PluginToUiMessage,
): ConversionState | null => {
  switch (message.type) {
    case PluginMessageType.CONVERSION_RESULT:
      return { status: 'success', payload: message.payload }
    case PluginMessageType.PLUGIN_ERROR:
      return { status: 'error', errorMessage: message.payload }
    default:
      return null
  }
}
