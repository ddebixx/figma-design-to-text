import {
  ExportDetailLevel,
  ExportOutputFormat,
  type ExportSettings,
} from '@/features/Converter/export/types/exportSettings'

export const DEFAULT_EXPORT_FILE_NAME = 'figson-export'

export const DEFAULT_EXPORT_SETTINGS: ExportSettings = {
  detailLevel: ExportDetailLevel.BALANCED,
  outputFormat: ExportOutputFormat.YAML,
}

export const EXPORT_DETAIL_LEVEL_OPTIONS = [
  ExportDetailLevel.PRECISE,
  ExportDetailLevel.BALANCED,
  ExportDetailLevel.EFFICIENT,
] as const

export const EXPORT_OUTPUT_FORMAT_OPTIONS = [
  ExportOutputFormat.JSON,
  ExportOutputFormat.YAML,
  ExportOutputFormat.MARKDOWN,
  ExportOutputFormat.TEXT,
] as const
