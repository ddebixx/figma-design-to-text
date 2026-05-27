import { z } from 'zod'
import type { PluginToUiMessage } from './shared'
import { PluginMessageType } from './shared'

const PluginErrorMessageSchema = z.object({
  type: z.literal(PluginMessageType.PLUGIN_ERROR),
  payload: z.string(),
})

const ConversionResultMessageSchema = z.object({
  type: z.literal(PluginMessageType.CONVERSION_RESULT),
  payload: z.unknown(),
})

export const PluginToUiMessageSchema = z.discriminatedUnion('type', [
  ConversionResultMessageSchema,
  PluginErrorMessageSchema,
])

export const parsePluginToUiMessage = (value: unknown): PluginToUiMessage | null => {
  const parseResult = PluginToUiMessageSchema.safeParse(value)

  if (!parseResult.success) {
    return null
  }

  return parseResult.data
}
