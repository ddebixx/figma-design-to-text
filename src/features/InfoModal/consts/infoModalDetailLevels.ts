import { FocusIcon, SlidersHorizontalIcon, ZapIcon } from 'lucide-react'
import { EXPORT_DETAIL_LEVEL_OPTIONS } from '@/features/Converter/export/consts/exportSettings'
import { ExportDetailLevel } from '@/features/Converter/export/types/exportSettings'
import type { InfoModalDetailLevelDefinition } from '@/features/InfoModal/types/infoModalDetailLevel'

const DETAIL_LEVEL_ICONS: Record<ExportDetailLevel, InfoModalDetailLevelDefinition['icon']> = {
  [ExportDetailLevel.PRECISE]: FocusIcon,
  [ExportDetailLevel.BALANCED]: SlidersHorizontalIcon,
  [ExportDetailLevel.EFFICIENT]: ZapIcon,
}

export const INFO_MODAL_DETAIL_LEVELS: InfoModalDetailLevelDefinition[] =
  EXPORT_DETAIL_LEVEL_OPTIONS.map((detailLevel) => ({
    detailLevel,
    icon: DETAIL_LEVEL_ICONS[detailLevel],
  }))
