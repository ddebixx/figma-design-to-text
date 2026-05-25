export const ExportDetailLevel = {
  PRECISE: 'precise',
  BALANCED: 'balanced',
  EFFICIENT: 'efficient',
} as const

export type ExportDetailLevel = (typeof ExportDetailLevel)[keyof typeof ExportDetailLevel]

export const ExportOutputFormat = {
  JSON: 'json',
  YAML: 'yaml',
  MARKDOWN: 'markdown',
  TEXT: 'text',
} as const

export type ExportOutputFormat = (typeof ExportOutputFormat)[keyof typeof ExportOutputFormat]

export type ExportSettings = {
  detailLevel: ExportDetailLevel
  outputFormat: ExportOutputFormat
}
