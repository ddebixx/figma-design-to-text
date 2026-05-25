import type { ExportRenderablePayload } from '@/types/conversionPayloadSchema'

export const formatPayloadAsJson = (payload: ExportRenderablePayload): string => {
  try {
    return JSON.stringify(payload, null, 2)
  } catch {
    return ''
  }
}
