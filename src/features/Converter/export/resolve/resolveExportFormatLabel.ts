import type { ExportOutputFormat } from '@/features/Converter/export/types/exportSettings'
import { i18n } from '@/lib/i18n'

export const resolveExportFormatLabel = (outputFormat: ExportOutputFormat): string => {
  return i18n.t(`export.outputFormat.options.${outputFormat}.label`)
}
