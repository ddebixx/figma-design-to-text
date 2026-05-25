import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  EXPORT_DETAIL_LEVEL_OPTIONS,
  EXPORT_OUTPUT_FORMAT_OPTIONS,
} from '@/features/Converter/export/consts/exportSettings'
import { EXPORT_SELECT_CONTENT_CLASS, EXPORT_TWO_COLUMN_GRID_CLASS } from '@/features/Converter/export/consts/exportSelectStyles'
import type {
  ExportDetailLevel,
  ExportOutputFormat,
  ExportSettings,
} from '@/features/Converter/export/types/exportSettings'

type ExportSettingsPanelProps = {
  exportSettings: ExportSettings
  onDetailLevelChange: (detailLevel: ExportDetailLevel) => void
  onOutputFormatChange: (outputFormat: ExportOutputFormat) => void
}

const EXPORT_SELECT_TRIGGER_CLASS = twMerge(
  'h-9 w-full border-zinc-700 bg-zinc-900/80 text-xs text-zinc-100',
)

const EXPORT_SELECT_ITEM_CLASS = 'text-xs text-zinc-200 focus:bg-zinc-800 focus:text-zinc-200'

export const ExportSettingsPanel = ({
  exportSettings,
  onDetailLevelChange,
  onOutputFormatChange,
}: ExportSettingsPanelProps) => {
  const { t } = useTranslation()

  return (
    <div className={twMerge('mt-4', EXPORT_TWO_COLUMN_GRID_CLASS)}>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="export-detail-level">{t('export.detailLevel.label')}</Label>
        <Select value={exportSettings.detailLevel} onValueChange={onDetailLevelChange}>
          <SelectTrigger id="export-detail-level" className={EXPORT_SELECT_TRIGGER_CLASS}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={EXPORT_SELECT_CONTENT_CLASS} position="popper">
            {EXPORT_DETAIL_LEVEL_OPTIONS.map((detailLevel) => (
              <SelectItem
                key={detailLevel}
                value={detailLevel}
                className={EXPORT_SELECT_ITEM_CLASS}
              >
                {t(`export.detailLevel.options.${detailLevel}.label`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-[11px] leading-relaxed text-zinc-500">
          {t(`export.detailLevel.options.${exportSettings.detailLevel}.hint`)}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="export-output-format">{t('export.outputFormat.label')}</Label>
        <Select value={exportSettings.outputFormat} onValueChange={onOutputFormatChange}>
          <SelectTrigger id="export-output-format" className={EXPORT_SELECT_TRIGGER_CLASS}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className={EXPORT_SELECT_CONTENT_CLASS} position="popper">
            {EXPORT_OUTPUT_FORMAT_OPTIONS.map((outputFormat) => (
              <SelectItem
                key={outputFormat}
                value={outputFormat}
                className={EXPORT_SELECT_ITEM_CLASS}
              >
                {t(`export.outputFormat.options.${outputFormat}.label`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-[11px] leading-relaxed text-zinc-500">
          {t(`export.outputFormat.options.${exportSettings.outputFormat}.hint`)}
        </p>
      </div>
    </div>
  )
}
