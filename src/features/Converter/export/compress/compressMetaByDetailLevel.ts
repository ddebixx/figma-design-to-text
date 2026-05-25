import type { ConversionMeta } from '@/types/conversionPayloadSchema'
import type { ExportDetailLevel } from '@/features/Converter/export/types/exportSettings'
import type { JsonObject } from '@/utils/isJsonObject'

export const compressMetaByDetailLevel = (
  meta: ConversionMeta,
  detailLevel: ExportDetailLevel,
): JsonObject => {
  if (detailLevel === 'balanced') {
    return {
      fileName: meta.fileName,
      pageName: meta.pageName,
      selectionCount: meta.selectionCount,
      detailLevel,
    }
  }

  return {
    pageName: meta.pageName,
    selectionCount: meta.selectionCount,
    detailLevel,
  }
}
