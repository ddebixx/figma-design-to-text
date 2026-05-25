import type { ExportOutputFormat } from '@/features/Converter/export/types/exportSettings'

type ExportFormatConfig = {
  mimeType: string
  fileExtension: string
}

const EXPORT_FORMAT_CONFIG: Record<ExportOutputFormat, ExportFormatConfig> = {
  json: { mimeType: 'application/json', fileExtension: 'json' },
  yaml: { mimeType: 'text/yaml', fileExtension: 'yaml' },
  markdown: { mimeType: 'text/markdown', fileExtension: 'md' },
  text: { mimeType: 'text/plain', fileExtension: 'txt' },
}

export const resolveExportMimeType = (outputFormat: ExportOutputFormat): string => {
  return EXPORT_FORMAT_CONFIG[outputFormat].mimeType
}

export const resolveExportFileExtension = (outputFormat: ExportOutputFormat): string => {
  return EXPORT_FORMAT_CONFIG[outputFormat].fileExtension
}
