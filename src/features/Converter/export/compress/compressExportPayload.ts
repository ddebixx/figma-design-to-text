import { compressMetaByDetailLevel } from '@/features/Converter/export/compress/compressMetaByDetailLevel'
import { compressNodeByDetailLevel } from '@/features/Converter/export/compress/compressNodeByDetailLevel'
import type { ExportDetailLevel } from '@/features/Converter/export/types/exportSettings'
import type { ConversionPayload, ExportRenderablePayload } from '@/types/conversionPayloadSchema'

export const compressExportPayload = (
  payload: ConversionPayload,
  detailLevel: ExportDetailLevel,
): ExportRenderablePayload => {
  if (detailLevel === 'precise') {
    return payload
  }

  return {
    meta: compressMetaByDetailLevel(payload.meta, detailLevel),
    nodes: payload.nodes.map((node) => compressNodeByDetailLevel(node, detailLevel)),
  }
}
