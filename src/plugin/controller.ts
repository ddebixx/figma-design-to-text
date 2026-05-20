/// <reference types="@figma/plugin-typings" />

import { PluginMessageType, type UiToPluginMessage } from '../types/shared'
import { PLUGIN_UI_CONFIG } from './constants'
import { buildConversionPayload } from './serialization/buildConversionPayload'

figma.showUI(__html__, PLUGIN_UI_CONFIG)

figma.ui.onmessage = (rawMessage: unknown) => {
  handleUiMessage(rawMessage as UiToPluginMessage)
}

function handleUiMessage(message: UiToPluginMessage): void {
  switch (message.type) {
    case PluginMessageType.CONVERT_SELECTION:
      handleConvertSelection()
      break
  }
}

function handleConvertSelection(): void {
  try {
    const conversionPayload = buildConversionPayload()
    figma.ui.postMessage({
      type: PluginMessageType.CONVERSION_RESULT,
      payload: conversionPayload,
    })
  } catch (error) {
    figma.ui.postMessage({
      type: PluginMessageType.PLUGIN_ERROR,
      payload: formatErrorMessage(error),
    })
  }
}

function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred during conversion.'
}
