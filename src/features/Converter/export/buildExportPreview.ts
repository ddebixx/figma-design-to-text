import { compressExportPayload } from '@/features/Converter/export/compress/compressExportPayload'
import { formatPayloadAsJson } from '@/features/Converter/export/format/formatPayloadAsJson'
import { formatPayloadAsMarkdown } from '@/features/Converter/export/format/formatPayloadAsMarkdown'
import { formatPayloadAsText } from '@/features/Converter/export/format/formatPayloadAsText'
import { formatPayloadAsYaml } from '@/features/Converter/export/format/formatPayloadAsYaml'
import type {
  ExportDetailLevel,
  ExportOutputFormat,
} from '@/features/Converter/export/types/exportSettings'
import type { ConversionPayload, ExportRenderablePayload } from '@/types/conversionPayloadSchema'

type PayloadFormatter = (payload: ExportRenderablePayload) => string

const FORMAT_RENDERER: Record<ExportOutputFormat, PayloadFormatter> = {
  json: formatPayloadAsJson,
  yaml: formatPayloadAsYaml,
  markdown: formatPayloadAsMarkdown,
  text: formatPayloadAsText,
}

type BuildExportPreviewParams = {
  payload: ConversionPayload
  detailLevel: ExportDetailLevel
  outputFormat: ExportOutputFormat
}

export const buildExportPreview = (params: BuildExportPreviewParams): string => {
  const compressedPayload = compressExportPayload(params.payload, params.detailLevel)
  const formatPayload = FORMAT_RENDERER[params.outputFormat]

  return formatPayload(compressedPayload)
}
