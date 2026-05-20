export const PluginMessageType = {
  CONVERT_SELECTION: 'CONVERT_SELECTION',
  CONVERSION_RESULT: 'CONVERSION_RESULT',
  PLUGIN_ERROR: 'PLUGIN_ERROR',
} as const

export type PluginMessageType = (typeof PluginMessageType)[keyof typeof PluginMessageType]

export type UiToPluginMessage = {
  type: typeof PluginMessageType.CONVERT_SELECTION
}

export type PluginToUiMessage =
  | { type: typeof PluginMessageType.CONVERSION_RESULT; payload: unknown }
  | { type: typeof PluginMessageType.PLUGIN_ERROR; payload: string }

export type ConversionState =
  | { status: 'idle' }
  | { status: 'success'; payload: unknown }
  | { status: 'error'; errorMessage: string }
