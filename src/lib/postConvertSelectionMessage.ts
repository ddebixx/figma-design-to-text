import { PluginMessageType } from '@/types/shared'

export const postConvertSelectionMessage = (): void => {
  parent.postMessage({ pluginMessage: { type: PluginMessageType.CONVERT_SELECTION } }, '*')
}
