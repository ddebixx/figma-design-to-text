import {
  resolveExportFileExtension,
  resolveExportMimeType,
} from '@/features/Converter/export/resolve/resolveExportOutput'
import type { ExportOutputFormat } from '@/features/Converter/export/types/exportSettings'

type DownloadExportOutputParams = {
  content: string
  fileName: string
  outputFormat: ExportOutputFormat
}

export const downloadExportOutput = (params: DownloadExportOutputParams): void => {
  const mimeType = resolveExportMimeType(params.outputFormat)
  const fileExtension = resolveExportFileExtension(params.outputFormat)
  const blob = new Blob([params.content], { type: mimeType })
  const downloadUrl = URL.createObjectURL(blob)
  const anchorElement = document.createElement('a')

  anchorElement.href = downloadUrl
  anchorElement.download = `${params.fileName}.${fileExtension}`
  anchorElement.click()

  URL.revokeObjectURL(downloadUrl)
}
