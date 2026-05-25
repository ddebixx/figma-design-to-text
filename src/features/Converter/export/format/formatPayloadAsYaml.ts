import { dump } from 'js-yaml'
import type { ExportRenderablePayload } from '@/types/conversionPayloadSchema'

export const formatPayloadAsYaml = (payload: ExportRenderablePayload): string => {
  try {
    return dump(payload, { indent: 2, lineWidth: -1, noRefs: true })
  } catch {
    return ''
  }
}
